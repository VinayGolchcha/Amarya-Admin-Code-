import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
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
  const [isLoading , setIsLoading] = useState(true);

  const {user} = useAuth();
  console.log(user);

  const approvalReq = async (body) => {
    try{
      const res = await axios.put(`${process.env.REACT_APP_API_URI}/approval/admin/approval` , body , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      toast.success(res?.data?.message);
      fetchApprovalData();
    }catch(err){
      console.log(err);
    }
  }
  const fetchFeedback = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/userDashboard/admin/fetch-user-feedback` , {
        headers : {
          "x-access-token" : user?.token,
        }
      })
      setFeedback(res?.data?.data);
    }catch(err){
      console.log(err);
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
      console.log(approvalData);
    }catch(err){
      console.log(err);
    }
  }

  const fecthActAnn = async() => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/dashboard/admin/fetch-activity-announcement` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      setActivityAnnoucements(res?.data?.data);
      console.log(activityAnnoucements);
    }catch(err){
      console.log(err);
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
    }catch(err){
      console.log(err);
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
      console.log(res);
    }catch(err){
      console.log(err);
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
      <Box>
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
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              borderRadius: "20px",
              border: "1px solid rgba(0, 0, 0, 0.30)",
              width: "auto",
            }}
          >
            <ProjectOverview apiData = {apiData}/>
          </Box>
          <Box
            sx={{
              borderRadius: "20px",
              border: "1px solid rgba(0, 0, 0, 0.30)",
              margin: "0px 5px 0px 25px",
            }}
          >
            <AdminPerformace />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              borderRadius: "20px",
              border: "1px solid rgba(0, 0, 0, 0.30)",
              marginTop: "30px",
              marginRight: "20px",
              width: "50%",
            }}
          >
            <EmployeeCountPieChart teamEmployeeCount = {apiData?.get_employee_team_count}/>
          </Box>
          <Box
            sx={{
              height : "100%",
              width: "50%",
              marginTop: "30px",
            }}
          >
            <AdminActivity activityAnnoucements = {activityAnnoucements?.activity_data}/>
          </Box>
        </Box>
        <AdminProjectSummy projects = {apiData?.project_details}/>
  
        <DashboardPosComp />
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              border: "1px solid #0000004D",
              // marginTop: "25px",
              // width: "fit-content",
              width: "60%",
              borderRadius: "12px",
              marginRight: "20px",
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
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Typography
                        sx={{
                          height: "100%",
                          width: "23%",
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
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid #0000004D",
              // marginTop: "25px",
              width: "fit-content",
              borderRadius: "12px",
              width: "40%",
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
                {activityAnnoucements?.announcement_data?.map((item) => {
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
                          {item.description}
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
                        <img src="icons/pin.svg" />
                        <img src="icons/3dots.svg" />
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
        </Box>
        <AdminApprovals approvalData = {approvalData} approvalReq={approvalReq}/>
      </Box>
    );
  }
};

export default AdminDashboard;
