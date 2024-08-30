import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Navigate, Route, Routes } from "react-router-dom";

import WorkSheet from "./Pages/WorksheetPage";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import AdminWorkSheet from "./AdminPages/AdminWorkSheet";
import DashboardPage from "./Pages/DashboardPage";
import AssetsPage from "./Pages/AssetsPage";
import LeaveManagementPage from "./Pages/LeaveMangementPage";
import PoliciesPage from "./Pages/PoliciesPage";
import SettingsPage from "./Pages/SettingsPage";
import TrainingsPage from "./Pages/TrainingsPage";
import AnnouncementPage from "./Pages/AnnouncementsPage";
import ActivitiesPage from "./Pages/ActivitiesPage";
import UserProfilePage from "./Pages/UserProfilePage";
import Attendence from "./Pages/AttendencePage";
import EmployeeAttendenceHomePage from "./Pages/EmployeeAttendenceHome";
import Calendar from './Components/Calendar'
import AdminDashboard from "./AdminPages/AdminDashboard";
import AdminAnnouncement from "./Pages/AdminAnnouncement";
import LoginPage from "./Pages/LoginPage";
import AssetsAdminPage from "./Pages/AssetsAdminPage";
import WorksheetPage from "./Pages/WorksheetPage";
import TrainingsPageAdmin from "./Pages/TrainingsPageAdmin";
import ActivityPage from "./Pages/ActivityPage";
import { useAuth } from "./Components/AuthContext";
import AdminLeaveManagement from "./Pages/AdminLeaveManagement";
import PrivateRoute from "./Pages/PrivateComponent";


const drawerWidth = 240;

const MainPage = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const { user } = useAuth(); // Using useAuth hook to access user data
  const role = user?.role;
  if (!user) {
    return <LoginPage />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!user) {
    return <LoginPage />;
  }

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
          {/* {role === "user" && <Route path="/" element={<DashboardPage />} />} */}
          {/* {role === "user" && <Route path="/assets" element={<AssetsPage />} />} */}
          <Route path="/leaves" element={role === "user" ? <LeaveManagementPage /> : <AdminLeaveManagement />} />
          {/* {role === "user" && (
            <Route path="/trainings" element={<TrainingsPage />} />
          )} */}
          {/* <Route path="/policies" element={<PoliciesPage />} />
          {role === "admin" && (
            <Route path="/settings" element={<SettingsPage />} />
          )}
          {role === "admin" && (
            <Route path="/trainings" element={<TrainingsPageAdmin />} />
          )} */}
          <Route path="/profile" element={<UserProfilePage />}></Route>
          <Route path="/Attendence" element={<Attendence/>}></Route>
          {/* <Route path="/Attendence" element={<Attendence/>}></Route> */}
          <Route path="/announcements" element={<AnnouncementPage />}></Route>
          <Route path="/activities" element={<ActivitiesPage />} />
          {/* {role === "admin" && (
            <Route path="/worksheet" element={<AdminWorkSheet />} />
          )} */}
          {/* {role === "user" && (
            <Route path="/worksheet" element={<WorksheetPage />} />
          )} */}

          {/* {role === "admin" && (
            <Route path="/assets" element={<AssetsAdminPage />} />
          )} */}
          {/* {role === "admin" && (<Route path="/" element={<AdminDashboard />} />)} */}
          {/* {role === "admin" && (<Route path="/anouncement" element={<AdminAnnouncement />} />)} */}
          <Route path="/activities/:activityId" element={<ActivityPage />} />
          {!user && <Route path="/login" element={<LoginPage />} />}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={role === "user" ? DashboardPage : AdminDashboard}
              />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute
                element={role === "user" ? DashboardPage : AdminDashboard}
              />
            }
          />
          <Route
            path="/assets"
            element={
              <PrivateRoute
                element={role === "user" ? AssetsPage : AssetsAdminPage}
              />
            }
          />
          <Route
            path="/trainings"
            element={
              <PrivateRoute
                element={role === "user" ? TrainingsPage : TrainingsPageAdmin}
              />
            }
          />
          <Route
            path="/policies"
            element={<PrivateRoute element={PoliciesPage} />}
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute element={role === "admin" ? SettingsPage : null} />
            }
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={UserProfilePage} />}
          />
          <Route
            path="/anouncement"
            element={
              <PrivateRoute
                element={
                  role === "admin" ? AdminAnnouncement : AnnouncementPage
                }
              />
            }
          />
          <Route
            path="/activities"
            element={<PrivateRoute element={ActivitiesPage} />}
          />
          <Route
            path="/worksheet"
            element={
              <PrivateRoute
                element={role === "user" ? WorksheetPage : AdminWorkSheet}
              />
            }
          />
          <Route
            path="/activities/:activityId"
            element={<PrivateRoute element={ActivityPage} />}
          />
          {/* <Route
            path="*"
            element={user ? <Navigate to="/" /> : <Navigate to="/login" />}
          /> */}
        </Routes>
      </Box>
    </Box>
  );
};

export default MainPage;
