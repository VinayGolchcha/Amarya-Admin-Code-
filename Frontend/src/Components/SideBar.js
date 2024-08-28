import * as React from "react";
import { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
// import CssBaseline from '@mui/material/CssBaseline';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

import { useNavigate, useLocation } from "react-router-dom";

import {
  Dashboard as DashboardIcon,
  PersonAddAlt1 as PersonAddAlt1Icon,
  InsertInvitation as InsertInvitationIcon,
  Groups as GroupsIcon,
  GroupWork as GroupWorkIcon,
  HeadsetMic as HeadsetMicIcon,
  Settings as SettingsIcon,

} from "@mui/icons-material";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { useAuth } from "./AuthContext";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const drawerWidth = 240;

const SideBar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = createTheme();
  const responsiveTheme = responsiveFontSizes(theme);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, activeItem, setActiveItem , email , password } = useAuth();
  const [showLogin , setShowLogin] = useState(false);


   const handleExtensionClick = async (item) => {
    if(item === "Messenger"){
      try{
        setShowLogin(true);
        const response = await axios.post(`${process.env.REACT_APP_API_MESSENGER_URI}/user/ghost-login` ,{
          email : email,
          password : password
        } );
        setShowLogin(false);
        window.open("https://messenger-app-amarya-fe.vercel.app/chats", '_blank');
      }catch(err){
        setShowLogin(false);
        toast.error("Could not login");
      }
    }
  }

  const menu = [
    { text: "Dashboard", link: "dashboard", icon: <DashboardIcon /> },
    { text: "Assets", link: "assets", icon: <PersonAddAlt1Icon /> },
    // Only include "Leave Planner" if user's role is not "admin"
    { text: "Leave Planner", link: "leaves", icon: <InsertInvitationIcon /> },
    { text: "Trainings", link: "trainings", icon: <GroupsIcon /> },
    { text: "Worksheet", link: "worksheet", icon: <GroupWorkIcon /> },
  ].filter(Boolean); //

  const other = [
    { text: "Policies", link: "policies", icon: <HeadsetMicIcon /> },
    user?.role === "admin" && {
      text: "Settings",
      link: "settings",
      icon: <SettingsIcon />,
    },
  ];

  const extensions = [
    user?.role === "user" && {
      text: "Messenger",
      icon: <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/messenger.png`}
              alt="icon"
              sx={{height:"20px" , width : "20px"}}
            />,
    },
    user?.role === "user" && {
      text: "Attendance",
      icon: <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/Object-detection.png`}
              alt="icon"
              sx={{height:"20px" , width : "20px"}}
            />,
    },
  ];

  useEffect(() => {
    // Extract the last part of the pathname (e.g., 'dashboard', 'assets')
    const currentPath = location.pathname.split("/").pop();
    const currPathVar = currentPath || "dashboard";
    setActiveItem(currPathVar);
    if (
      !menu.some((item) => item.link === currentPath) &&
      !other.some((item) => item.link === currentPath)
    ) {
      setActiveItem("dashboard");
    }
  }, []);

  const handleItemClick = (text) => {
    setActiveItem(text);
    navigate(`/${text}`); // Update URL on item click
  };

  const drawer = (
    <div style={{ backgroundColor: "#fafafa" }}>
      <Toolbar />
      <ThemeProvider theme={responsiveTheme}>
        <Typography
          sx={{
            fontFamily: "Trade Winds, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            padding: "8px 16px",
            marginTop: "-40px",
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "2.5rem",
          }}
        >
          Amarya
        </Typography>
      </ThemeProvider>
      {/* <Divider /> */}
      <Typography
        variant="caption"
        sx={{ fontWeight: "700", color: "#b1b1b1", padding: "0px 16px" }}
      >
        MAIN MENU
      </Typography>
      <List>
        {menu.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              color: activeItem === item.link ? "#ff5151" : "default",
              "&:hover": { backgroundColor: "#eeeeee" },
            }}
            onClick={() => handleItemClick(item.link)}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{ color: activeItem === item.link ? "#ff5151" : "rgba(0, 0, 0, 0.3)" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
      <Typography
        variant="caption"
        sx={{ fontWeight: "700", color: "#b1b1b1", padding: "0px 16px" }}
      >
        OTHER
      </Typography>
      <List>
        {other.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              color: activeItem === item.link ? "#ff5151" : "default",
              "&:hover": { backgroundColor: "#eeeeee" },
            }}
            onClick={() => handleItemClick(item.link)}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{ color: activeItem === item.link ? "#ff5151" : "rgba(0, 0, 0, 0.3)" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Typography
        variant="caption"
        sx={{ fontWeight: "700", color: "#b1b1b1", padding: "0px 16px" ,  display: user?.role === "admin" && "none"   }}
      >
        EXTENSIONS
      </Typography>
      <List sx={{ display: user?.role === "admin" && "none"}}>
        {extensions.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
          >
            <ListItemButton sx={{"&:hover" : {
              backgroundColor : "white"
            } , cursor : "default"}}>
              <ListItemIcon
                sx={{ color: activeItem === item.link ? "#ff5151" : "rgba(0, 0, 0, 0.3)" }}
              >
                {item.icon}
              </ListItemIcon>
              <Button sx={{backgroundColor: "#FF5151", fontSize : "0.8rem", fontFamily : "Poppins", color : "white" , borderRadius : "8px" , textTransform : "none" ,width : "65%",cursor : "pointer" , boxShadow: "0px 4px 6px -1px #FF5151", "&:hover" : {
                backgroundColor: "#FF5151",
              },
              ...(showLogin && {
                "&.MuiButtonBase-root.MuiButton-root.Mui-disabled": {
                  backgroundColor: "#FF5151",
                  color: "white",
                },
              }),
              }} disabled = {item.text === "Messenger" && showLogin} onClick={() => handleExtensionClick(item.text)}>{showLogin && item.text === "Messenger" ? <>Loading...</> : <>{item.text}</>}</Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#fafafa",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#fafafa",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
