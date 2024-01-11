import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import Drawer from '@mui/material/Drawer';

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";

import { Route, Routes } from "react-router-dom";

import DashboardPage from "./Pages/DashboardPage";
import AssetsPage from "./Pages/AssetsPage";
import LeaveManagementPage from "./Pages/LeaveMangementPage";
import PoliciesPage from "./Pages/PoliciesPage";
import SettingsPage from "./Pages/SettingsPage";
import TrainingsPage from "./Pages/TrainingsPage";
import WorkSheet from "./Pages/WorkSheetPage";
// import AnnouncementPage from './Pages/AnnouncementsPage';
import UserProfilePage from './Pages/UserProfilePage';

const drawerWidth = 240;

const MainPage = (props) => {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Remove this const when copying and pasting into your project.
  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          color: "#121843",
          boxShadow: "none",
          paddingRight: "0 !important",
        }}
      >
        <NavBar handleDrawerToggle={handleDrawerToggle} />
      </AppBar>
      <SideBar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          paddingTop: "8vh",
          scrollMarginRight: "",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/leaves" element={<LeaveManagementPage />} />
          <Route path="/trainings" element={<TrainingsPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/worksheet" element={<WorkSheet />} />
          <Route path="/profile" element={<UserProfilePage/>}></Route>
        </Routes>
      </Box>
    </Box>
  );
};

// MainPage.propTypes = {
/**
 * Injected by the documentation to work in an iframe.
 * Remove this when copying and pasting into your project.
 */
// window: PropTypes.func,
// };

export default MainPage;
