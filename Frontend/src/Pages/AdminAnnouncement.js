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
  Grid,
} from "@mui/material";
import ActivityForm from "./ActivityForm";
import axios from 'axios';
import { toast } from "react-toastify";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";
import ConfirmDelete from "../Components/ConfirmDelete.js";


const AdminNotificationTab = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ id , setId] = useState(null);
  const [isLoading , setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("announcement");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [notifications, setNotifications] = useState([]);
  const [uniqueDates, setUniqueDates] = useState(["All Dates"]);
  const [edit, setEdit] = useState(false);
  const [selectedNoti, setSelectedNoti] = useState({});
  const { user , setActiveItem , activeItem , encryptionKey} = useAuth();
  const [files , setFiles] = useState([]);
  const [publicIds , setPublicIds] = useState([]);
  const [isApiHit , setIsApiHit] = React.useState(false);

  const handleEditSelection = (obj) => {
    setEdit(true);
    setSelectedNoti(obj);
  };
  const handleConfirmDelete = (id) => {
    handleOpen();
    setId(id);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setEdit(false);
    }
  };

  useEffect(() => {
    if (edit) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    // Clean up the event listener on component unmount or when isEditable changes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [edit]);

  useEffect(()=> {
    setActiveItem(null);
  },[activeItem])
  const handleDeleteNotification = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/${selectedTab}/admin/delete-${selectedTab}/${id}`, {
        headers: { "x-encryption-key" : encryptionKey },
      });
      handleClose();
      fetchNotification();
      toast.warning(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const fetchNotification = async () => {
    setIsLoading(true);
    try {
      const empId = user.user_id
      const resData = await axios.get(`${process.env.REACT_APP_API_URL}/${selectedTab}/fetch-${selectedTab}/${empId}`, {
        headers: { "x-encryption-key" : encryptionKey },
      });
      setNotifications(resData.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const filterActivityByDate = async (date) => {
    if (date === "All Dates") {
      fetchNotification();
      return;
    }
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/${selectedTab}/filter-${selectedTab}-by-date/${date}`, {
        headers: { "x-encryption-key" : encryptionKey },
      });
      setNotifications(res.data.data);
      toast.success("Notifications are filtered");
    } catch (error) {
      console.log(error);
      if(selectedTab !== "activity"){
        toast.error(error.message);
      }
    }
  };

  const handleAddAnnouncement = async (body) => {
    try {
      setIsApiHit(true);
      const formData = new FormData();
      Object.keys(body).forEach((key) => formData.append(key, body[key]));
      if (selectedTab === "activity") {
        body.files.forEach((file) => formData.append("files", file));
      }
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/${selectedTab}/admin/add-${selectedTab}`, selectedTab === "activity" ? formData : body , {
          headers: { "x-encryption-key" : encryptionKey  ,
            ...(selectedTab === "activity" && { "Content-Type": "multipart/form-data" }),
          },
        });
        toast.success(res.data.message);
        setIsApiHit(false);
        fetchNotification();
      }
      catch (error) {
        const errors = error?.response?.data?.errors;
        if(errors){
          toast.error(errors[0].msg);
        }
        if(error?.response?.message){
          toast.error(error?.response?.message);
        }
        if(error?.response?.data?.message){
          const item = error?.response?.data?.message
          toast.error(item);
        }
        setIsApiHit(false);
    }
  };

 const  handleAddActivity = async (body) => {
    try {
      setIsApiHit(true);
      const formData = new FormData();
      Object.keys(body).forEach((key) => formData.append(key, body[key]));
      files.forEach((file) => formData.append("files", file));
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/${selectedTab}/admin/add-${selectedTab}`, formData , {
        headers: { "x-encryption-key" : encryptionKey ,
          "Content-Type": "multipart/form-data" 
        },
      });
        toast.success(res.data.message);
        fetchNotification();
        setIsApiHit(false);
      }
      catch (error) {
        const errors = error?.response?.data?.errors;
        if(errors){
          toast.error(errors[0].msg);
        }
        if(error?.response?.message){
          toast.error(error?.response?.message);
        }
        if(error?.response?.data?.message){
          const item = error?.response?.data?.message
          toast.error(item);
        }
        setIsApiHit(false);
    }
  }

 const  handleEditActivity = async (body, id) => {
    try {
      setIsApiHit(true)
      const formData = new FormData();
        Object.keys(body).forEach((key) => formData.append(key, body[key]));
        files.forEach((file) => formData.append("files", file));
        const formattedPublicIds = "[" + publicIds?.map((id) => `"${id.trim()}"`).join(",") + "]";
        formData.append("public_ids" , formattedPublicIds);
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/${selectedTab}/admin/update-${selectedTab}/${id}`, formData , {
        headers: { "x-encryption-key" : encryptionKey ,
          "Content-Type": "multipart/form-data" 
         },
      });
      toast.success(res.data.message);
      fetchNotification();
      setEdit(false);
      setSelectedNoti({});
      setIsApiHit(false);
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if(errors){
        toast.error(errors[0].msg);
      }
      setIsApiHit(false);
    }
  }
  const handleEditAnnouncement = async (body, id) => {
    try {
      setIsApiHit(true);
      const formData = new FormData();
      if (selectedTab === "activity") {
        Object.keys(body).forEach((key) => formData.append(key, body[key]));
        files.forEach((file) => formData.append("files", file));
        const formattedPublicIds = "[" + publicIds?.map((id) => `"${id.trim()}"`).join(",") + "]";
        formData.append("public_ids" , formattedPublicIds);
      }
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/${selectedTab}/admin/update-${selectedTab}/${id}`, selectedTab === "activity" ? formData : body, {
        headers: { "x-encryption-key" : encryptionKey ,
          ...(selectedTab === "activity" && { "Content-Type": "multipart/form-data" }),
         },
      });
      toast.success(res.data.message);
      fetchNotification();
      setEdit(false);
      setSelectedNoti({});
      setIsApiHit(false);
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if(errors){
        toast.error(errors[0].msg);
      }
      setIsApiHit(false);
    }
  };

  useEffect(() => {
    fetchNotification();
    setEdit(false);
  }, [selectedTab]);

  useEffect(() => {
    setUniqueDates(["All Dates", ...new Set(notifications?.map((notification) => notification?.created_at?.split("T")[0]))]);
  }, [notifications]);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    filterActivityByDate(newDate);
  };

  const handleTabChange = (tab) => {
    setSelectedNoti({});
    setSelectedTab(tab);
    setSelectedDate("All Dates");
  };

  const handleAddNotification = (newNotification) => {
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
  };

  const filteredNotifications = notifications?.filter((notification) => selectedDate === "All Dates" || notification?.created_at?.split("T")[0] === selectedDate);

  const notificationPairs = [];
  for (let i = 0; i < filteredNotifications?.length; i += 2) {
    notificationPairs.push([filteredNotifications[i], filteredNotifications[i + 1] || null]);
  }
  if(isLoading){
    return(
      <Loading/>
    )
  }else{
    return (
      <div style={{ width: "90%", margin: "auto", marginTop: "50px" }}>
        <ConfirmDelete open={open} handleClose={handleClose} handleIncomeDelete ={handleDeleteNotification} id ={id}/>
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
            flexWrap : "wrap",
            background: " #7C85C170",
            borderRadius: "50px",
          }}
        >
          {["announcement", "activity"]?.map((tab) => (
            <Button
              key={tab}
              sx={{
                width: "50%",
                background: selectedTab === tab ? "#161E54" : "none",
                color: selectedTab === tab ? "white" : "black",
                borderRadius: "50px",
                border: "none",
                "&:hover": { border: "none" },
                fontSize : ( tab === "activity" ? {xs : "0.6rem" , sm : "0.7rem" , md :"0.875rem" , lg : "0.875rem"} : {xs : "0.398rem" , sm : "0.7rem" , md :"0.875rem" , lg : "0.875rem"})
              }}
              variant="outlined"
              onClick={() => handleTabChange(tab)}
              disableRipple
            >
              <Box
                component="img"
                src={'Images/Vector.png'}
                sx={{
                  marginRight: {xs : '10px', sm :'15px'},
                  width: {xs : '15px' , sm : '20px'}
                }}
              />
              {tab === "announcement" ? "Notifications/Announcements" : "Activities"}
            </Button>
          ))}
        </div>
        <TableContainer component={Paper} style={{ borderRadius: "10px", background: "#7C85C170" }}>
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
                    width: "100%",
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
                      {uniqueDates?.map((date, index) => (
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
              {notificationPairs?.map((pair, index) => (
                <TableRow key={index}>
                  <TableCell key={index} style={{ padding: "8px", width: "50%" }}>
                  <Grid container spacing={2}>
                  {pair?.map((notification, index) => (
                    
                    <Grid item xs={12} sm={6} key={index}>
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
                          {notification.description.slice(0, 15)}...
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
                            {new Date(notification.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric',
                            })}
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              background: "#fff",
                              padding: "8px",
                              borderRadius: "12px",
                              fontWeight: "600",
                              height: "100%",
                            }}
                          >
                            <img
                              src="Images/icons8-edit-30.png"
                              alt="edit-icon"
                              style={{ height: "100%", cursor: "pointer" }}
                              onClick={() => handleEditSelection(notification)}
                            />
                            <img
                              src="Images/icons8-delete-trash-24.png"
                              alt="delete-icon"
                              style={{ height: "100%", cursor: "pointer" }}
                              onClick={() => handleConfirmDelete(notification.event_type === "activity" ? notification.activity_id : notification._id)}
                            />
                          </div>
                        </div>
                      )}
                    </Grid>
                  ))}
                  </Grid>
                  </TableCell>
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
            {edit ? "Edit EVENT !!!" : "NEW EVENT !!!"}
          </Typography>
          <ActivityForm
            onAddNotification={handleAddNotification}
            selectedTab={selectedTab}
            handleAddAnnouncement={edit ? handleEditAnnouncement : handleAddAnnouncement}
            selectedNoti={selectedNoti}
            edit={edit}
            setParentFiles = {setFiles}
            setParentPublicIds = {setPublicIds}
            isEdit={setEdit}
            handleAddActivity={handleAddActivity}
            handleEditActivity={handleEditActivity}
            isApiHit={isApiHit}
            setIsApiHit={setIsApiHit}
          />
        </Box>
      </div>
    );
  }

};

export default AdminNotificationTab;
