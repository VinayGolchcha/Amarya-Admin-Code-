import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Typography, Tooltip, IconButton, Drawer, List, ListItem, ListItemText, Menu } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DirectionsWalkSharpIcon from "@mui/icons-material/DirectionsWalkSharp";
import EventIcon from "@mui/icons-material/Event";
import MoreIcon from '@mui/icons-material/More';
import MenuIcon from "@mui/icons-material/Menu";
import SettingHoliday from "./SettingHoliday";
import SettingsAddUser from "./SettingsAddUser";
import SettingsLeave from "./SettingsLeave";
import SettingsProject from "./SettingsProject";
import SettingsSkiilSet from "./SettingsSkiilSet";
import SettingsCategory from "./SettingsCategory";
import env from "react-dotenv";
import SettingsTeams from "./SettingsTeams";
import PolicyPage from "../AdminPages/PolicyPage";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function TextFieldsGrid() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  // Define breakpoints
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); 
  const [selectedTab, setSelectedTab] = useState("AddUser");
  const array = ["AddUser" ,"holiday" , "leaves" ,"teams" , "category" , "policy" , "project" , "skillset"];

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setAnchorEl(null); // Close the dropdown after selecting a tab
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Typography
        sx={{
          color: "#161E54",
          fontWeight: "bold",
          m: "25px 0px 20px 25px",
          font: {
            lg: "normal normal 600 20px/25px Poppins",
            md: "normal normal 600 20px/25px Poppins",
            sm: "normal normal 600 16px/25px Poppins",
            xs: "normal normal 600 16px/25px Poppins",
          },
        }}
      >
        Settings
      </Typography>

      {isMdUp &&
              <Box sx={{ display: "flex", justifyContent: "center" , }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  // m: "25px 0px 20px 25px",
                  borderRadius: "10px",
                  height: "auto",
                  backgroundColor: "#161e54",
                  padding: "10px",
                }}
              >
                <Tooltip title="Add User" placement="top" arrow>
                  <Button
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": {
                        backgroundImage:
                          "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)",
                      },
                      margin: "0px 10px",
                      borderRadius: "72px",
                      backgroundImage:
                        selectedTab === "AddUser"
                          ? "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)"
                          : "none",
                    }}
                    onClick={() => {
                      handleTabChange("AddUser");
                    }}
                  >
                    <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/settings/userData.png`}
                      alt="userData"
                      sx={{ margin: "0px 10px", cursor: "pointer" }}
                    />
                  </Button>
                </Tooltip>
                <Tooltip title="Holiday" placement="top" arrow>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)",
                    },
                    margin: "0px 10px",
                    borderRadius: "72px",
                    backgroundImage:
                      selectedTab === "holiday"
                        ? "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)"
                        : "none",
                  }}
                  onClick={() => {
                    handleTabChange("holiday");
                  }}
                >
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/settings/holidays.png`}
                    alt="holidays"
                    sx={{ margin: "0px 10px", cursor: "pointer" }}
                  />
                </Button>
                </Tooltip>
                <Tooltip title="Leaves" placement="top" arrow>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)",
                    },
                    backgroundImage:
                      selectedTab === "leaves"
                        ? "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)"
                        : "none",
                    margin: "0px 10px",
                    borderRadius: "72px",
                  }}
                  onClick={() => {
                    handleTabChange("leaves");
                  }}
                >
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/settings/Leaves.png`}
                    alt="Leaves"
                    sx={{ margin: "0px 10px", cursor: "pointer" }}
                  />
                </Button>
                </Tooltip>
                <Tooltip title="Teams" placement="top" arrow>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)",
                    },
                    backgroundImage:
                      selectedTab === "teams"
                        ? "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)"
                        : "none",
                    margin: "0px 10px",
                    borderRadius: "72px",
                  }}
                  onClick={() => {
                    handleTabChange("teams");
                  }}
                >
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/settings/teams-icon.png`}
                    alt="Category"
                    sx={{ margin: "0px 10px", cursor: "pointer" , height : "47px" , width : "38px" }}
                  />
                </Button>
                </Tooltip>
                <Tooltip title="Category" placement="top" arrow>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)",
                    },
                    backgroundImage:
                      selectedTab === "category"
                        ? "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)"
                        : "none",
                    margin: "0px 10px",
                    borderRadius: "72px",
                  }}
                  onClick={() => {
                    handleTabChange("category");
                  }}
                >
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/settings/Category.png`}
                    alt="Category"
                    sx={{ margin: "0px 10px", cursor: "pointer" }}
                  />
                </Button>
                </Tooltip>
                <Tooltip title="Policy" placement="top" arrow>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)",
                    },
                    backgroundImage:
                      selectedTab === "policy"
                        ? "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)"
                        : "none",
                    margin: "0px 10px",
                    borderRadius: "72px",
                  }}
                  onClick={() => {
                    handleTabChange("policy");
                  }}
                >
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/settings/Vector.png`}
                    alt="Category"
                    sx={{ margin: "0px 10px", cursor: "pointer" , height : "60%"}}
                  />
                </Button>
                </Tooltip>
                <Tooltip title="Project" placement="top" arrow>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)",
                    },
                    backgroundImage:
                      selectedTab === "project"
                        ? "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)"
                        : "none",
                    margin: "0px 10px",
                    borderRadius: "72px",
                  }}
                  onClick={() => {
                    handleTabChange("project");
                  }}
                >
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/settings/Project.png`}
                    alt="Project"
                    sx={{ margin: "0px 10px", cursor: "pointer" }}
                  />
                </Button>
                </Tooltip>
                <Tooltip title="Skillset" placement="top" arrow>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)",
                    },
                    backgroundImage:
                      selectedTab === "skillset"
                        ? "linear-gradient(139.32deg, rgb(38, 203, 255) 2.928%,rgb(105, 128, 253) 111.948%)"
                        : "none",
                    margin: "0px 10px",
                    borderRadius: "72px",
                  }}
                  onClick={() => {
                    handleTabChange("skillset");
                  }}
                >
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/settings/Skillset.png`}
                    alt="Skillset"
                    sx={{ margin: "0px 10px", cursor: "pointer" }}
                  />
                </Button>
                </Tooltip>
              </Box>
            </Box>  
      }
      {!isMdUp &&  <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{marginLeft: "25px"}}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {array.map((tab) => (
              <MenuItem key={tab} onClick={() => handleTabChange(tab)}>
                {tab}
              </MenuItem>
            ))}
          </Menu>
        </>}
      <Box sx={{display:'flex',justifyContent:"center",alignItems:"center"}}>
      {selectedTab === "AddUser" && <SettingsAddUser />}
      {selectedTab === "holiday" && <SettingHoliday />}
      {selectedTab === "leaves" && <SettingsLeave />}
      {selectedTab === "category" && <SettingsCategory />}
      {selectedTab === "project" && <SettingsProject />}
      {selectedTab === "skillset" && <SettingsSkiilSet />}
      {selectedTab === "teams" && <SettingsTeams />}
      {selectedTab === "policy" && <PolicyPage/>}
      </Box>
    </div>
  );
}

export default TextFieldsGrid;
