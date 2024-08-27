import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import RecentActivity from "../Components/RecentActivity";
import AnnouncementComp from "../Components/AnnouncementComp";
import ProjectCardsDashboard from "../Components/ProjectCardsDashboard";
import DashboardGraph1 from "../Components/DashboardGraph1";
import DashboardGraph2 from "../Components/DashboardGraph2";
import DashboardGraph3 from "../Components/DashboardGraph3";
import FeedbackForm from "../Components/FeedbackForm";
import DashboardPosComp from "../Components/DashboardPosComp";
import DashboardProfile from "../Components/DashboardProfile";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [activities, setActivities] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [projectsThisYear, setProjectsThisYear] = useState([]);
  const [pointsData, setPointsData] = useState({
    month_data: [],
    year_data: [],
  });
  const apiUrl = process.env.REACT_APP_API_URI;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const emp_id = user?.user_id; // Replace with actual employee ID if dynamic
        const dashboardResponse = await axios.get(
          `${apiUrl}/userDashboard/user-dashboard/${emp_id}`,
          {
            headers: {
              "x-encryption-key" : encryptionKey
            },
          }
        );
        // const pointsResponse = await axios.get(
        //   `${apiUrl}/userDashboard/get-user-points-data-for-graph/${emp_id}`,
        //   {
        //     headers: {
        //       "x-access-token": encodeURIComponent(user?.token || ""),
        //     },
        //   }
        // );

        // console.log(pointsResponse);
        const { data: dashboardData } = dashboardResponse.data;
        // const { data: pointsData } = pointsResponse.data;

        if (dashboardData.length > 0) {
          const data = dashboardData[0];
          setAnnouncements(data.announcement || []);
          setActivities(data.activity || []);
          setProfileData(data.emp_data || null);
          setCurrentProject(data.current_project || null);
          setProjectsThisYear(data.projects_this_year || []);
          localStorage.setItem('email' , data.emp_data.email);
        }

        setPointsData(pointsData.data || { month_data: [], year_data: [] });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    const fetchPointsData = async () => {
      try {
        const emp_id = user?.user_id; // Replace with actual employee ID if dynamic

        const pointsResponse = await axios.get(
          `${apiUrl}/userDashboard/get-user-points-data-for-graph/${emp_id}`,
          {
            headers: {
              "x-encryption-key" : encryptionKey
            },
          }
        );
        setPointsData(pointsData.data || { month_data: [], year_data: [] });
        // setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // setIsLoading(false);
      }
    };
    fetchDashboardData();
    fetchPointsData();
  }, []);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Box sx={{ p: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ margin: "6px 0px", justifyContent: "space-between" }}
        >
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <AnnouncementComp announcements={announcements} />
          </Grid>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <RecentActivity activities={activities} />
          </Grid>
          <Grid
            item
            lg={3}
            md={0}
            sm={0}
            xs={0}
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            <DashboardProfile profileData={profileData} />
          </Grid>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <ProjectCardsDashboard currentProject={currentProject} />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <DashboardGraph1 projectsThisYear={projectsThisYear} />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <DashboardGraph2 pointsData={pointsData.month_data} />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <DashboardGraph3 pointsData={pointsData.year_data} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DashboardPosComp />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FeedbackForm />
          </Grid>
        </Grid>
      </Box>
    );
  }
}