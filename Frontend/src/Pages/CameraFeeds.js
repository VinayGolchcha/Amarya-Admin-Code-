import { Box, MenuItem, Select, Typography } from "@mui/material";
import VideoStream from "./VideoStream";
import VideocamIcon from "@mui/icons-material/Videocam";
import "../Components/Calendar.css";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CameraFeeds() {
  const [cameraStates, setCameraStates] = useState({
    camera1: true,
    camera2: true,
  });

  const today = new Date();
  const [date, setDate] = useState(formatDate(today));
  const navigate = useNavigate();

  function formatDate(date) {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  function getDropdownDates() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() - 2);
    return [formatDate(tomorrow), formatDate(yesterday), formatDate(today)];
  }

  const SelectDate = (e) => {
    setDate(e.target.value);
    navigate(`/Attendence/camera/${e.target.innerText}`);
  };

  const handleToggle = (camera) => {
    setCameraStates((prevStates) => ({
      ...prevStates,
      [camera]: !prevStates[camera],
    }));
  };

  const dropdownDates = getDropdownDates();

  return (
    <Box>
      <Box
        sx={{ display: "flex", gap: 2, marginBottom: 2, minHeight: "200px" }}
      >
        <VideoStream isCameraActive={cameraStates.camera1} />
        <VideoStream isCameraActive={cameraStates.camera2} />
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
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
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
      <Box>
        {["camera1", "camera2"].map((camera, index) => (
          <Box
            key={camera}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
              padding: 2,
              border: "1px solid #b1adad",
              borderRadius: "10px",
              backgroundColor: "#F1F1F1",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <VideocamIcon />
              Camera {index + 1}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {cameraStates[camera] ? <WifiIcon /> : <WifiOffIcon />}
              <Box className="switch-container">
                <input
                  type="checkbox"
                  id={`toggle-${camera}`}
                  className="switch"
                  checked={cameraStates[camera]}
                  onChange={() => handleToggle(camera)}
                />
                <label htmlFor={`toggle-${camera}`} className="slider">
                  {cameraStates[camera] ? "ACTIVE" : "INACTIVE"}
                </label>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
