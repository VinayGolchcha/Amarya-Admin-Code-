import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AttendenceHomePage from "./AttendenceHomePage";
import AttendanceReports from "./AttendanceReports";
import { Badge, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MoreIcon from "@mui/icons-material/More";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CameraFeeds from "./CameraFeeds";
import UndetectedPeople from "./UndetectedPeople";

const UndetectedIcon = ({ value }) => {
  return (
    // <Badge badgeContent={4} color="error" sx={{ mr: 1.1 }}>
    <SupervisedUserCircleIcon color={value === 3 ? "red" : "action"} />
    // </Badge>
  );
};

const Attendence = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  // Define breakpoints
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const array = ["Home", "Camera Feeds", "Reports", "Undetected"];
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleListChange = (value) => {
    setValue(value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <div>
      <Box style={{ margin: "20px 20px 20px 20px", width: "100%" }}>
        <Typography
          variant="h4"
          sx={{
            font: {
              lg: "normal normal 300 22px/35px Poppins",
              md: "normal normal 300 22px/35px Poppins",
              sm: "normal normal 300 20px/30px Poppins",
              xs: "normal normal 300 22px/30px Poppins",
            },
          }}
        >
          Employees Attendance
        </Typography>
        <Box>
          {isMdUp && (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "transparent", // Disables the indicator color
                },
              }}
            >
              <Tab
                icon={<HomeIcon />}
                label="Yolo Trackboard"
                {...a11yProps(0)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  "&.Mui-selected": {
                    color: "red",
                    fontWeight: "600",
                  },
                  "& .MuiTab-iconWrapper": { mr: 1 },
                }}
              />
              <Tab
                icon={<VideocamIcon />}
                label="Camera Feeds"
                {...a11yProps(1)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  "&.Mui-selected": {
                    color: "red",
                    fontWeight: "600",
                  },
                  "& .MuiTab-iconWrapper": { mr: 1 },
                }}
              />
              <Tab
                icon={<InsertChartIcon />}
                label="Reports"
                {...a11yProps(2)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  "&.Mui-selected": {
                    color: "red",
                    fontWeight: "600",
                  },
                  "& .MuiTab-iconWrapper": { mr: 1 },
                }}
              />
              <Tab
                icon={<UndetectedIcon value={value} />}
                label="Undetected"
                {...a11yProps(3)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  "&.Mui-selected": {
                    color: "red",
                    fontWeight: "600",
                  },
                }}
              />
            </Tabs>
          )}
          {!isMdUp && (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ marginLeft: "25px" }}
              >
                <MoreIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {array.map((tab, i) => (
                  <MenuItem key={tab} onClick={() => handleListChange(i)}>
                    {tab}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AttendenceHomePage />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CameraFeeds />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AttendanceReports />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <UndetectedPeople />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Attendence;