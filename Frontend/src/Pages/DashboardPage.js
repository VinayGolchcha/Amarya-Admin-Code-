import React, { useContext, useEffect } from "react";
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


export default function DashboardPage() {

  return (
    <>
      <Box sx={{ p: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ margin: "6px 0px", justifyContent: "space-between" }}
        >
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <AnnouncementComp />
          </Grid>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <RecentActivity />
          </Grid>
          <Grid
            item
            lg={3}
            md={0}
            sm={0}
            xs={0}
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            <DashboardProfile />
          </Grid>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <ProjectCardsDashboard />
          </Grid>
          <Grid item lg={7} md={12} sm={12} xs={12}>
            <DashboardGraph1 />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <DashboardGraph2 />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <DashboardGraph3 />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DashboardPosComp />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FeedbackForm />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
