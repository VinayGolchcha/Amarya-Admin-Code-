import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ProjectOverview from "../Components/ProjectOverview";
import EmployeeCountPieChart from "../Components/AdminPieChart";
import AdminPerformace from "../Components/AdminPerformace";
import { Button, List, ListItem } from "@mui/material";
import AdminActivity from "./AdminActivity";
import AdminProjectSummy from "./AdminProjectSummy";
import DashboardPosComp from "../Components/DashboardPosComp";
import AdminApprovals from "./AdminApprovals";
import axios from "axios";
import { useAuth } from '../Components/AuthContext';
import { ToastContainer, toast } from "react-toastify";
import Loading from "../sharable/Loading";
import { useNavigate } from "react-router-dom";

const suggSum = [
  {
    date: "12th Dec 2023",
    description: "Something Something Something",
  },
  {
    date: "12th Dec 2023",
    description: "Something Something Something",
  },
  {
    date: "12th Dec 2023",
    description: "Something Something Something",
  },
  {
    date: "12th Dec 2023",
    description: "Something Something Something",
  },
  {
    date: "12th Dec 2023",
    description: "Something Something Something",
  },
];

const announceNoti = [
  {
    date: "12th Dec 2023",
    description: "Outing schedule for every departement",
  },
  {
    date: "12th Dec 2023",
    description:
      "IT Department need two more talents for UX/UI Designer position",
  },
  {
    date: "12th Dec 2023",
    description: "Outing schedule for every departement",
  },
];
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projectOverview , setProjectOverview] = useState([]);
  const [feedback , setFeedback] = useState([]);
  const [projects , setProjects] = useState([]);
  const [onGoingProjects , setOnGoingProjects] = useState(null);
  const [totalProjects , setTotalProjects] = useState(null);
  const [approvalData , setApprovalData] = useState([]);
  const [activityAnnoucements , setActivityAnnoucements] = useState([]);
  const [apiData , setApidata] = useState([]);
  const [suggDes , setSuggDes] = useState(null);
  const [annDes , setAnnDes] = useState(null);
  const [isLoading , setIsLoading] = useState(true);
  const [activityData , setActivityData] = useState([]);

  const {user , setActiveItem} = useAuth();

  const handleClick = (id) => {
    const updatedNewFeedback = feedback?.map((item) => {
      if(item._id == id){
        return {...item , isActive : !item?.isActive}
      }else{
        return item;
      }
    });
    setFeedback(updatedNewFeedback);
  }

  const handleAnnDesChange = (id) => {
    const updatedNewActivityAnnoucements = activityAnnoucements?.map((item) => {
      if(item._id == id){
        return {...item , isActive : !item?.isActive}
      }else{
        return item;
      }
    });
    setActivityAnnoucements(updatedNewActivityAnnoucements);
  } 
  const handleAnnClick = () => {
    setSuggDes(null);
    setAnnDes(null);
  }
  const approvalReq = async (body) => {
    try{
      const res = await axios.put(`${process.env.REACT_APP_API_URI}/approval/admin/approval` , body , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      toast.success(res?.data?.message);
      fetchApprovalData();
    }catch(error){
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        const item = error?.response?.data?.message
        toast.error(item);
      }
    }
  }
  const fetchFeedback = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/userDashboard/admin/fetch-user-feedback` , {
        headers : {
          "x-access-token" : user?.token,
        }
      })
      const newFeedbak = res?.data?.data?.map((item) => (
        {...item , isActive : false}
      ))
      setFeedback(newFeedbak);
    }catch(error){
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        const item = error?.response?.data?.message
        toast.error(item);
      }
      console.log(error);
    }
  }
  const fetchApprovalData = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/dashboard/admin/fetch-approval-data` , {
        headers : {
          "x-access-token" : user?.token,
        }
      });
      setApprovalData(res?.data?.data);
    }catch(error){
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        const item = error?.response?.data?.message
        toast.error(item);
      }
      console.log(error);
    }
  }

  const fecthActAnn = async() => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/dashboard/admin/fetch-activity-announcement` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      const newActivityAnnoucements = res?.data?.data?.announcement_data?.map((item) => (
        {...item , isActive : false}
      ));
      setActivityAnnoucements(newActivityAnnoucements);
      setActivityData(res?.data?.data?.activity_data)
    }catch(error){
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        const item = error?.response?.data?.message
        toast.error(item);
      }
      console.log(error);
    }

  }
  const fetchProjects = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/project/fetch-all-projects` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      setProjects(res?.data?.data);
      const fecthedProjects = res?.data?.data
      const inprogress = 0 ;
      const projectInProgress = fecthedProjects.filter((item) => item.project_status === "In Progress");
      setOnGoingProjects(projectInProgress.length);
      setTotalProjects(res?.data?.data?.length);
      setOnGoingProjects()
    }catch(error){
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        const item = error?.response?.data?.message
        toast.error(item);
      }
      console.log(error);
    }
  }
  const adminDashboardApi = async() => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/dashboard/admin/admin-dashboard` , {
        headers : {
          "x-access-token" : user?.token
        }
      })
      setApidata(res?.data?.data);
    }catch(error){
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        const item = error?.response?.data?.message
        toast.error(item);
      }
      console.log(error);
    }
  }
  const dateFormat = (date) => {
    const reqFormat = new Date(date);
    const dateList = reqFormat.toString().split(" ");
    const stringFormat = dateList[2]+" "+ dateList[1]+" " + dateList[3];
    return stringFormat;
  }
  
  useEffect(()=> {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchFeedback(),
        fetchProjects(),
        fetchApprovalData(),
        fecthActAnn(),
        adminDashboardApi()
      ]);
      setIsLoading(false);
    }
    fetchData();
    
  },[]);

  if(isLoading){
    return(
      <Loading/>
    )
  }else{

    return (
      <Box >
        <ToastContainer/>
        <Typography
          variant="h4"
          sx={{
            margin: "25px 0px 15px 0px",
            font: {
              lg: "normal normal 400 22px/35px Poppins",
              md: "normal normal 400 22px/35px Poppins",
              sm: "normal normal 400 20px/30px Poppins",
              xs: "normal normal 400 22px/30px Poppins",
            },
            color: "#161E54",
          }}
        >
          Welcome Admin !
        </Typography>
        <Grid container spacing={2} sx={{
          display : {md : "flex" },
          justifyContent : "center"
        }}>
          {/* <Box sx={{ display: "flex" }}> */}
          <Grid item xs={12} md={9} lg={7}>
              <Box
                sx={{
                  borderRadius: "20px",
                  border: "1px solid rgba(0, 0, 0, 0.30)",
                  width: "auto",
                  
                }}
              >
                <ProjectOverview apiData = {apiData}/>
              </Box>
            </Grid>
            <Grid item xs={12} md={9} lg={5}>
              <Box
                sx={{
                  borderRadius: "20px",
                  border: "1px solid rgba(0, 0, 0, 0.30)",
                  height : "100%"
                }}
              >
                <AdminPerformace />
              </Box>
            </Grid>
          {/* </Box> */}
        </Grid>
        <Grid container spacing={2} sx={{
          display : {md : "flex" },
          justifyContent : "center"
        }}>
          <Grid item xs={12} md={9} lg={7}>
            <Box
              sx={{
                borderRadius: "20px",
                border: "1px solid rgba(0, 0, 0, 0.30)",
                marginTop: "30px",
                marginRight: "20px",
                width: "100%",
              }}
            >
              <EmployeeCountPieChart teamEmployeeCount = {apiData?.get_employee_team_count}/>
            </Box>
          </Grid>
          <Grid item xs={12} md={9} lg={5}>
            <Box
              sx={{
                height : "100%",
                width: "100%",
                marginTop: "30px",
              }}
            >
              <AdminActivity activityAnnoucements = {activityData}/>
            </Box>
          </Grid>
        </Grid>
        <AdminProjectSummy projects = {apiData?.project_details}/>
  
        <DashboardPosComp/>
        <Grid container spacing={2} sx={{
          display : {md : "flex" },
          justifyContent : {md : "center"}
        }}>
          <Grid item xs={12} md={9} lg={6} >
            <Box
              sx={{
                border: "1px solid #0000004D",
                // marginTop: "25px",
                // width: "fit-content",
                width: "100%",
                borderRadius: "12px",
                marginRight: "20px",
                height : "100%"
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  backgroundColor: "#1B204A",
                  color: "#FFFFFF",
                  borderRadius: "12px 12px 0px 0px",
                  padding: "6px 16px",
                }}
              >
                Suggestions Summary
              </Typography>
              <Box sx={{ padding: "0px 8px 8px 8px" }}>
                <List sx={{ paddingBottom: "4px" }}>
                  {feedback?.slice(0,5)?.map((item) => {
                    return (
                      <ListItem
                        sx={{
                          padding: "4px",
                          // width: "100%",
                          border: "1px solid #00000033",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            height: "100%",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            padding: "20px",
                            fontFamily: "Poppins",
                            color: "#222B45",
                            fontWeight: "400",
                            //overflow: "auto",
                            //whiteSpace: "nowrap",
                            //textOverflow: "ellipsis",
                            maxWidth: "70%"
                          }}
                        >
                          {item.isActive ? item?.description : item?.description?.slice(0,20)}
                          
                        </Typography>
                        <Box sx={{display : "flex"}}>
                          <Box
                            sx={{
                              height: "100%",
                              padding : "8px",
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "Poppins",
                              color: "#00000099",
                              fontWeight: "600",
                            }}
                          >
                  
                            <img src="icons/3dots.svg" style={{cursor : "pointer"}} onClick={() => handleClick(item?._id)}/>
                          </Box>
                          <Typography
                            sx={{
                              height: "100%",
                              width: "100%",
                              padding : "4px",
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "Poppins",
                              color: "#222B45",
                              fontWeight: "600",
                              
                            }}
                          >
                            {dateFormat(item.date)}
                          </Typography>
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9} lg={6}>
            <Box
              sx={{
                border: "1px solid #0000004D",
                // marginTop: "25px",
                width: "fit-content",
                borderRadius: "12px",
                width: "100%",
                height : "100%"
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#1B204A",
                  color: "#FFFFFF",
                  borderRadius: "12px 12px 0px 0px",
                  padding: "6px 16px",
                }}
              >
                <Typography sx={{ fontFamily: "Poppins" }}>
                  New Announcement/Notice
                </Typography>
              </Box>
              <Box sx={{ margin: "0px 8px 8px 8px", marginTop: "1.5%" }}>
                <List sx={{ paddingBottom: "0px" }}>
                  {activityAnnoucements?.map((item) => {
                    return (
                      <ListItem
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "4px",
                          border: "1px solid #00000033",
                          marginBottom: "8px",
                          backgroundColor: "#FAFAFA",
                          borderRadius: "6px",
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            width: "250px",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            padding: "20px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              color: "#303030",
                              fontWeight: "400",
                            }}
                          >
                            {item.isActive ? item?.description : item?.description?.slice(0,20)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            height: "100%",
                            width: "23%",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Poppins",
                            color: "#00000099",
                            fontWeight: "600",
                          }}
                        >
                          
                          <img src="icons/3dots.svg" style={{cursor : "pointer"}} onClick={() => handleAnnDesChange(item?._id)} />
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    textTransform: "none",
                    fontFamily: "Poppins",
                    width: "100%",
                    border: "1px solid #00000033",
                    color: "#FF5151",
                    fontWeight: "500",
                    borderRadius: "0px 0px 10px 10px",
                    marginTop: "1%",
                  }}
                  onClick={() => {
                    navigate("/anouncement")
                  }}
                >
                  New Announcement/Notice
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <AdminApprovals approvalData = {approvalData} approvalReq={approvalReq}/>
      </Box>
    );
  }
};

export default AdminDashboard;
