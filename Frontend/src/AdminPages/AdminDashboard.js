import React from "react";
import { Box, Typography } from "@mui/material";
import ProjectOverview from "../Components/ProjectOverview";
import EmployeeCountPieChart from "../Components/AdminPieChart";
import AdminPerformace from "../Components/AdminPerformace";
import { Button, List, ListItem } from "@mui/material";
import AdminActivity from "./AdminActivity";
import AdminProjectSummy from "./AdminProjectSummy";
import DashboardPosComp from "../Components/DashboardPosComp";
import AdminApprovals from "./AdminApprovals";

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
  return (
    <Box>
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
          sx={{ borderRadius: "20px", border: "1px solid rgba(0, 0, 0, 0.30)" }}
        >
          <ProjectOverview />
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
          <EmployeeCountPieChart />
        </Box>
        <Box
          sx={{
            width: "50%",
            marginTop: "30px",
          }}
        >
          <AdminActivity />
        </Box>
      </Box>
      <AdminProjectSummy />
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
              {suggSum.map((item) => {
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
                      {item.date}
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
              {announceNoti.map((item) => {
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
            >
              New Announcement/Notice
            </Button>
          </Box>
        </Box>
      </Box>
      <AdminApprovals />
    </Box>
  );
};

export default AdminDashboard;
