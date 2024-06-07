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
import axios from 'axios';
import { toast } from "react-toastify";
import { useAuth } from "../Components/AuthContext";

const AdminNotificationTab = () => {
  const [selectedTab, setSelectedTab] = useState("announcement");
  const [selectedDate, setSelectedDate] = useState("All Dates"); // State for selected date
  const [notifications, setNotifications] = useState([]);
  const [uniqueDates , setUniqueDates] = useState(["All Dates"]);
  const [edit , setEdit] = useState(false);
  const [selectedNoti , setSelectedNoti] = useState({});
  const [file , setFile] = useState([]);
  const {user} = useAuth();
   
  const handleEditSelection = (obj) => {
    setEdit(true);
      setSelectedNoti(obj);
    console.log(selectedNoti)
  };

  const handleDeleteNotification = async(id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URI}/${selectedTab}/admin/delete-${selectedTab}/${id}` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      fetchNotification();
      toast.warning(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const fetchNotification = async () => {
    try {
      const resData = await axios.get(`${process.env.REACT_APP_API_URI}/${selectedTab}/fetch-${selectedTab}` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      setNotifications(resData.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const filterActiviyByDate = async (date) => {
    try {
      if (date === "All Dates") {
        fetchNotification();
      } else {
        const res = await axios.get(`${process.env.REACT_APP_API_URI}/${selectedTab}/filter-${selectedTab}-by-date/${date}` , {
          headers : {
            "x-access-token" : user?.token
          }
        });
        setNotifications(res.data.data);
        toast.success("Notifications are filtered");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleAddAnnouncement = async (body) => {
    try {
      const formData = new FormData();
      Object.keys(body).forEach((key) => {
        formData.append(key , body[key]);
      })
      if(selectedTab === "activity"){
        const files = body.files;
        files.forEach((f) => {
          formData.append("files" , f);
        })
      }
      
      const res = await axios.post(`${process.env.REACT_APP_API_URI}/${selectedTab}/admin/add-${selectedTab}`, selectedTab === "activity" ? formData : body , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      console.log(res);
      toast.success(res.data.message);
      fetchNotification();
      setEdit(false);
      selectedNoti({});
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]?.msg);
    }
  };

  const handeleEditAnnouncement = async (body , id) => {
    
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URI}/${selectedTab}/admin/update-${selectedTab}/${id}`, body , {
        headers : {
          "x-access-token" : user?.token
        }
      }
      );
      console.log(res);
      toast.success(res.data.message);
      fetchNotification();
    } catch (error) {
      toast.error(error?.response?.data?.errors);
    }
  };
  
  useEffect(() => {
    fetchNotification();
    setEdit(false);
  }, [selectedTab]);

  useEffect(() => {
    setUniqueDates(["All Dates", ...new Set(notifications?.map(notification => notification?.created_at?.split("T")[0]))]);
  }, [notifications]);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    filterActiviyByDate(newDate);
  };

  const handleTabChange = (tab) => {
    setSelectedNoti({});
    setSelectedTab(tab);
    setSelectedDate("All Dates"); // Reset date filter to "All Dates"
  };

  const handleAddNotification = (newNotification) => {
    setNotifications((prevNotifications) => [
      newNotification,
      ...prevNotifications,
    ]);
  };

  const filteredNotifications = notifications?.filter((notification) => {
    if (selectedDate === "All Dates") {
      return true;
    } else {
      return notification?.created_at?.split("T")[0] === selectedDate;
    }
  });

  const notificationPairs = [];
  for (let i = 0; i < filteredNotifications?.length; i += 2) {
    notificationPairs.push([
      filteredNotifications[i],
      filteredNotifications[i + 1] || null, // Handle odd number of notifications
    ]);
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
            {notificationPairs.map((pair, index) => (
              <TableRow key={index}>
                {pair.map((notification, index) => (
                  <TableCell
                    key={index}
                    style={{ padding: "8px", width: "50%" }}
                  >
                    {notification && (
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
                        {notification?.description?.slice(0, 15)}...
                        <div
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "15%",
                            background: "#fff",
                            padding: "8px",
                            borderRadius: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {new Date(notification?.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric'
                          })}
                        </div>
                        <div style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            background: "#fff",
                            padding: "8px",
                            borderRadius: "12px",
                            fontWeight: "600",
                            height : "100%"
                          }}>
                          <img src="Images/icons8-edit-30.png" alt="edit-icon" style={{height : "100%" , cursor : "pointer"}} onClick={() => handleEditSelection(notification)}/>
                          <img src="Images/icons8-delete-trash-24.png" alt="delete-icon" style={{height : "100%" , cursor : "pointer"}} onClick={() => handleDeleteNotification(notification?.event_type === "activity" ? notification?.activity_id : notification?._id)}/>
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
          {edit === false ? <>NEW EVENT !!!</> : <>Edit EVENT !!!</>}
        </Typography>
        <ActivityForm
          onAddNotification={handleAddNotification}
          selectedTab={selectedTab}
          handleAddAnnouncement={edit === false ? handleAddAnnouncement : handeleEditAnnouncement}
          selectedNoti={selectedNoti}
          edit={edit}
          isEdit={setEdit}
        />
      </Box>
    </div>
  );
}

export default AdminNotificationTab;
