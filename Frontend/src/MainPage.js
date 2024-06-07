import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import Drawer from '@mui/material/Drawer';
import WorkSheet from "./Pages/WorksheetPage";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import AdminWorkSheet from "./AdminPages/AdminWorkSheet";

import { Route, Routes } from "react-router-dom";

import DashboardPage from "./Pages/DashboardPage";
import AssetsPage from "./Pages/AssetsPage";
import LeaveManagementPage from "./Pages/LeaveMangementPage";
import PoliciesPage from "./Pages/PoliciesPage";
import SettingsPage from "./Pages/SettingsPage";
import TrainingsPage from "./Pages/TrainingsPage";
import AnnouncementPage from "./Pages/AnnouncementsPage";
import ActivitiesPage from "./Pages/ActivitiesPage";
import UserProfilePage from "./Pages/UserProfilePage";
import AdminDashboard from "./AdminPages/AdminDashboard";
import AdminAnnouncement from "./Pages/AdminAnnouncement";
import LoginPage from "./Pages/LoginPage";

import AssetsAdminPage from "./Pages/AssetsAdminPage";
import WorksheetPage from "./Pages/WorksheetPage";
import TrainingsPageAdmin from "./Pages/TrainingsPageAdmin";
import ActivityPage from "./Pages/ActivityPage";
import { useAuth } from "./Components/AuthContext";

const drawerWidth = 240;

const MainPage = (props) => {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const { user } = useAuth(); // Using useAuth hook to access user data
  const role = user?.role;
  if (!user) {
    return <LoginPage />;
  }

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
          {role === "user" && <Route path="/" element={<DashboardPage />} />}
          {role === "user" && <Route path="/assets" element={<AssetsPage />} />}
          <Route path="/leaves" element={<LeaveManagementPage />} />
          {role === "user" && (
            <Route path="/trainings" element={<TrainingsPage />} />
          )}
          <Route path="/policies" element={<PoliciesPage />} />
          {role === "admin" && (
            <Route path="/settings" element={<SettingsPage />} />
          )}
          {role === "admin" && (
            <Route path="/trainings" element={<TrainingsPageAdmin />} />
          )}
          <Route path="/profile" element={<UserProfilePage />}></Route>
          <Route path="/announcements" element={<AnnouncementPage />}></Route>
          <Route path="/activities" element={<ActivitiesPage />} />
          {role === "admin" && (
            <Route path="/worksheet" element={<AdminWorkSheet />} />
          )}
          {role === "user" && (
            <Route path="/worksheet" element={<WorksheetPage />} />
          )}

          {role === "admin" && (
            <Route path="/assets" element={<AssetsAdminPage />} />
          )}
          {role === "admin" && (<Route path="/" element={<AdminDashboard />} />)}
          {role === "admin" && (<Route path="/anouncement" element={<AdminAnnouncement />} />)}
          <Route path="/activities/:activityId" element={<ActivityPage />} />
          <Route path="/login" element={<LoginPage />} />
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
