import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Typography } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DirectionsWalkSharpIcon from "@mui/icons-material/DirectionsWalkSharp";
import EventIcon from "@mui/icons-material/Event";
import SettingHoliday from "./SettingHoliday";
import SettingsAddUser from "./SettingsAddUser";
import SettingsLeave from "./SettingsLeave";
import SettingsProject from "./SettingsProject";
import SettingsSkiilSet from "./SettingsSkiilSet";
import SettingsCategory from "./SettingsCategory";

function TextFieldsGrid() {
  const [selectedTab, setSelectedTab] = useState("AddUser");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            m: "25px 0px 20px 25px",
            borderRadius: "10px",
            height: "auto",
            backgroundColor: "#161e54",
            padding: "10px",
          }}
        >
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
        </Box>
      </Box>
      {selectedTab === "AddUser" && <SettingsAddUser />}
      {selectedTab === "holiday" && <SettingHoliday />}
      {selectedTab === "leaves" && <SettingsLeave />}
      {selectedTab === "category" && <SettingsCategory />}
      {selectedTab === "project" && <SettingsProject />}
      {selectedTab === "skillset" && <SettingsSkiilSet />}
    </div>
  );
}

export default TextFieldsGrid;
