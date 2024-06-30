import React, { useContext, useEffect, useState } from "react";
import { Typography, Paper, Box } from "@mui/material";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";

const CustomBarChart = ({ data }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        margin: "10px",
        boxShadow: "none",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: "1.1rem",
          fontFamily: "Poppins",
          color: "#00000099",
          fontWeight: "700",
        }}
        gutterBottom
      >
        Performance
      </Typography>
      <Typography variant="body1" gutterBottom>
        Measure how fast you're growing monthly recurring revenue.
      </Typography>
      <ToastContainer/>
      <Box
        sx={{
          borderRadius: "20px",
          border: "1px solid rgba(0, 0, 0, 0.30)",
          padding: "30px 15px 15px 15px",
          // width: "300px", // Remove fixed width
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            borderRadius: "4px",
          }}
        >
          {data?.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "10px",
                width: "100%", // Ensure full width
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingRight: "10px", // Add space between percentage and team name
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    flex: 1,
                    color: "#222B45",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {`${item?.team_performance_percent}%`}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    flex: 1,
                    textAlign: "right",
                    marginLeft: "10px",
                    color: "#00000080",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  {`${item?.team_name?.toUpperCase()}`}
                </Typography>
              </div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#D8DFE8",
                  height: "15px",
                  margin: "10px 0", // Adjust margin
                  border: "1px solid #ccc",
                  position: "relative",
                  borderRadius: "6px", // Apply border radius
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${item.performance}%`,
                    backgroundColor: "#1024AF",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Paper>
  );
};

const AdminPerformance = () => {
  const [teamperformance , setTeamPerformance] = useState([]);
  const {user} = useAuth();
  const fetchPerformance = async () => {
    try{
      const res = await axios.get(`https://amarya-admin-backend-code.onrender.com/api/v1/worksheet/admin/calculate-team-performance` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      console.log(res);
      setTeamPerformance(res?.data?.data);
    }catch(error){
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        console.log("true");
        const item = error?.response?.data?.message
        toast.error(item);
      }
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPerformance();
  },[]);

  // Sample data for performance graph
  
  const teamPerformanceData = [
    { team: "Full Stack Team", performance: 92 },
    { team: "Data Science Team", performance: 40 },
    { team: "SAP Team", performance: 65 },
    { team: "HR/Management", performance: 85 },
    { team: "Other", performance: 70 },
    // ... add data for other teams
  ];

  return <CustomBarChart data={teamperformance} />;
};

export default AdminPerformance;
