import { Box, MenuItem, Select, Typography } from "@mui/material";
import VideoStream from "./VideoStream";
import VideocamIcon from "@mui/icons-material/Videocam";
import "../Components/Calendar.css";
import WifiIcon from "@mui/icons-material/Wifi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WifiOffIcon from "@mui/icons-material/WifiOff";

export default function CameraFeeds() {
  const [isChecked, setIsChecked] = useState(false);
  const today = new Date();
  const [date, setDate] = useState(formatDate(today));

  const navigate = useNavigate();
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  function formatDate(date) {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JS
    const yyyy = date.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  }

  function getDropdownDates() {
    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() - 2);

    return [formatDate(tomorrow), formatDate(yesterday), formatDate(today)];
  }

  function SelectDate(e) {
    setDate(e.target.value);
    navigate(`/Attendence/camera/${e.target.innerText}`);
  }

  const dropdownDates = getDropdownDates();

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "stretch" }}>
        <VideoStream />
        <VideoStream />
      </Box>
      <Box sx={{ display: "flex" }}>
        <VideoStream />
        <VideoStream />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          sx={{
            font: {
              lg: "normal normal bold 22px/35px Poppins",
              md: "normal normal bold 22px/35px Poppins",
              sm: "normal normal bold 20px/30px Poppins",
              xs: "normal normal bold 22px/30px Poppins",
            },
            margin: "15px 0",
          }}
        >
          Devices
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h4"
            sx={{
              font: {
                lg: "normal normal bold 17px/35px Poppins",
                md: "normal normal bold 17px/35px Poppins",
                sm: "normal normal bold 17px/30px Poppins",
                xs: "normal normal bold 17px/30px Poppins",
              },
              margin: "15px 0",
            }}
          >
            Previous Logs
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove the default border
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border when focused
              },
            }}
            onClick={(e) => {
              SelectDate(e);
            }}
          >
            {dropdownDates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          border: "1px solid #b1adad",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "10px",
            border: "1px solid #b1adad",
            padding: "10px",
            alignItems: "center",
            backgroundColor: "#F1F1F1",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <VideocamIcon />
            CPE351A
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {isChecked ? <WifiIcon /> : <WifiOffIcon />}
            <Box className="switch-container">
              <input
                type="checkbox"
                id="toggle"
                className="switch"
                checked={isChecked}
                onChange={handleToggle}
              />
              <label htmlFor="toggle" className="slider">
                {isChecked ? "ACTIVE" : "INACTIVE"}
              </label>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
