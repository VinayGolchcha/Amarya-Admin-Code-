import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ActivityForm from "./ActivityForm";
import axios from "axios";
import { toast } from "react-toastify";

const AdminNotificationTab = () => {
  const [selectedTab, setSelectedTab] = useState("announcement");
  const [selectedDate, setSelectedDate] = useState("All Dates"); // State for selected date
  const [showData, setShowData] = useState([]);
  const apiUrl= process.env.REACT_APP_API_URI ;
  console.log(apiUrl);
  const [notifications, setNotifications] = useState([
    
    // Add more notifications as needed
  ]);
  const [uniqueDates , setuniqueDates] = useState(["All Dates"])


  const fetchNotification = async () => {
    try{
      const resData = await axios.get(`${process.env.REACT_APP_API_URI}${selectedTab}/fetch-${selectedTab}`);
      setNotifications(resData.data.data);
      console.log(resData.data.data)
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }

  }

  const filterActiviyByDate = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}${selectedTab}/filter-${selectedTab}-by-date/2024-05-09`);
      const responseData = res.data.data
      setNotifications(responseData);
      console.log(notifications);
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  const handleAddAnnouncement = async (body) => {
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URI}${selectedTab}/admin/add-${selectedTab}`, body)
      console.log(res);
      toast.success(res.data.message);
      fetchNotification();
    }catch(error){
      toast.error(error.response.data.errors[0].msg);
    }
  }

  
  useEffect(() => {
    fetchNotification();
    setuniqueDates([...new Set(notifications?.map(notification => notification.from_date))])
  },[selectedTab]);
  
  useEffect(() => {
    setuniqueDates([...new Set(notifications?.map(notification => notification.from_date))]);
  }, [notifications]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    filterActiviyByDate();
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);// Reset date filter to "All Dates"
  };

  const handleAddNotification = (newNotification) => {
    setNotifications((prevNotifications) => [
      newNotification,
      ...prevNotifications,
    ]);
  };

  // const uniqueDates = [...new Set(notifications.map((n) => n.date))];
  // User
  // const uniqueDates = [
  //   "All Dates",
  //   ...new Set(
  //     notifications?.filter((n) => n.type === selectedTab).map((n) => n.created_at?.split('T')[0])
  //   ),
  // ];
  // if (!uniqueDates.includes("All Dates")) {
  //   uniqueDates.unshift("All Dates"); // Add "All Dates" option if not already present
  // }
  // console.log()
  const filteredNotifications = notifications?.filter((notification) => {
    if (selectedDate === "All Dates") {
      return notification.type === selectedTab;
    } else {
      return (
        true && notification?.created_at === selectedDate
      );
    }
  });

  const notificationPairs = [];
  for (let i = 0; i < filteredNotifications.length; i += 2) {
    const pair = [
      filteredNotifications[i],
      filteredNotifications[i + 1] || null, // Handle odd number of notifications
    ];
    notificationPairs.push(pair);
  }

  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "50px" }}>
      <Typography
        variant="h4"
        sx={{
          color: "#161E54",
          m: "0px 0px 5px 15px",
          font: {
            lg: "normal normal 600 20px/30px Poppins",
            md: "normal normal 600 25px/30px Poppins",
            sm: "normal normal 600 18px/25px Poppins",
            xs: "normal normal 600 18px/25px Poppins",
          },
        }}
      >
        Announcements & Activities
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          background: " #7C85C170",
          borderRadius: "50px",
        }}
      >
        <Button
          sx={{
            width: "50%",
            background: selectedTab === "announcement" ? "#161E54" : "none",
            color: selectedTab === "announcement" ? "white" : "black",
            borderRadius: "50px",
            border: "none",
            "&:hover": {
              // Remove hover effect
              border: "none",
            },
          }}
          variant="outlined"
          onClick={() => handleTabChange("announcement")}
          disableRipple
        >
          <img
            src="Images/Vector.png"
            style={{ marginRight: "15px", width: "20px" }}
          />{" "}
          Notifications/Announcements
        </Button>
        <Button
          sx={{
            width: "50%",
            color: selectedTab === "activity" ? "white" : "black",
            background: selectedTab === "activity" ? "#161E54" : "none",
            border: "none",
            borderRadius: "50px",
            "&:hover": {
              // Remove hover effect
              border: "none",
            },
          }}
          variant="outlined"
          onClick={() => handleTabChange("activity")}
          disableRipple
        >
          <img
            src="Images/Vector.png"
            style={{ marginRight: "15px", width: "20px" }}
          />{" "}
          Activities
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ borderRadius: "10px", background: "#7C85C170" }}
      >
        <Table style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  background: "#161E54",
                  width: "200%",
                  padding: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    ml: "15px",
                    font: {
                      lg: "normal normal 500 18px/25px Poppins",
                      md: "normal normal 500 18px/25px Poppins",
                      sm: "normal normal 500 16px/25px Poppins",
                      xs: "normal normal 500 16px/25px Poppins",
                    },
                  }}
                >
                  Recent Posts (By Admin)
                </Typography>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <Select
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{
                      height: "25px",
                      padding: "0px",
                      background: "white",
                      color: "#686868",
                    }}
                  >
                    {uniqueDates.map((date, index) => (
                      <MenuItem key={index} value={date}>
                        {date}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((pair, index) => (
              <TableRow key={index}>
                {notifications.map((notification, index) => (
                  <TableCell
                    key={index}
                    style={{ padding: "8px", width: "50%" }}
                  >
                    {notifications && (
                      <div
                        style={{
                          background: "white",
                          padding: "8px",
                          borderRadius: "12px",
                          position: "relative",
                          color: "#222B45",
                          paddingLeft: "15px",
                        }}
                      >
                        {notification?.title}
                        <div
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            background: "#fff",
                            padding: "8px",
                            borderRadius: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {notification?.date}
                        </div>
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          margin: "50px 0px 0px 0px",
          borderRadius: "10px",
          borderStyle: "solid",
          borderColor: "#686868",
          // borderBottom: "5px solid black",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            borderBottom: "1px solid #686868",
            color: "#686868",
            font: {
              lg: "normal normal 600 18px/25px Poppins",
              md: "normal normal 600 18px/25px Poppins",
              sm: "normal normal 600 16px/25px Poppins",
              xs: "normal normal 600 16px/25px Poppins",
            },
          }}
        >
          NEW EVENT !!!
        </Typography>
        <ActivityForm
          onAddNotification={handleAddAnnouncement}
          selectedTab={selectedTab}
        />
      </Box>
    </div>
  );
};

export default AdminNotificationTab;
