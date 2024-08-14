//

// LoginPage.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import "./EmailPop";
// import { EmailP } from "@mui/icons-material";
import EmailP from "./EmailPop";
import { useAuth } from "../Components/AuthContext";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import OtpP from "./OtpPop";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openOtpP, setOpenOtpP] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [email, setEmail] = useState("");
  //new
  // const[openModel,setOpenModel]=useState(false)
  const [openEmailP, setOpenEmailP] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          username,
          password,
        }
      );

      // Check response status
      if (response.status === 200) {
        // Redirect or handle successful login
        login(response.data.data[0]); // Pass user data to login function
        navigate("/");
      } else {
        console.error("Login failed");
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // Server responded with a non 2xx status code
        const { data } = error.response;
        if (data && data.message) {
          toast.error(data.message);
        } else {
          toast.error("Error logging in");
        }
      } else {
        // Request failed before getting to server (e.g., network issue)
        toast.error("Error logging in. Please check your network connection.");
      }
    }
  };
  // useEffect(() => {
  //   // Disable scrolling when the component mounts
  //   document.body.style.overflow = "hidden";

  //   // Enable scrolling when the component unmounts
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", lg: "row" },
        // height: "10vh",
        background: "#161E54",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50px",
        // minHeight: "95vh",
        // margin: "20px",
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 4,
          marginLeft: { xs: "0%", lg: "3.1%" },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: "center",
            background: "#161E54",
            boxShadow: "none",
            width: { xs: "80%", sm: "100%", md: "120%" },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "white",
              font: "normal normal 400 40px/55px Ribeye Marrow",
            }}
          >
            WELCOME
          </Typography>
          <TextField
            sx={{
              marginY: 1,
              width: "100%",
              backgroundColor: "#161E54",
              "& .MuiInput-underline:before": {
                borderBottomColor: "#FF5151",
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
              },
              "& .MuiInputBase-root": {
                color: "white",
              },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            label="Username"
            disabled ={openEmailP|| openOtpP}
            variant="standard"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            sx={{
              marginY: 1,
              width: "100%",
              backgroundColor: "#161E54",
              "& .MuiInput-underline:before": {
                borderBottomColor: "#FF5151",
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
              },
              "& .MuiInputBase-root": {
                color: "white",
              },
            }}
            InputProps={{
              style: { color: "white" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Password"
            disabled ={openEmailP|| openOtpP}
            variant="standard"
            type={showPassword ? "text" : "password"}
            value={password} // Ensure the value prop is set to the password state
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <Typography
            variant="body2"
            sx={{
              marginTop: 1,
              marginLeft: { xs: "30%", md: "48%" },
              color: "#FFFFFF",
            }}
          >
            <a
              href="#"
              onClick={() => {
                setOpenEmailP(true);
              }}
              style={{ color: "#FFFFFF", }}
            >
              Forgot/Reset Password?
            </a>
            {openEmailP && (
              <EmailP
                closeEmailP={setOpenEmailP}
                openOtpP={() => {
                  setOpenEmailP(false);
                  setOpenOtpP(true);
                }}
                setEmail={setEmail}
              />
            )}
            {openOtpP && <OtpP closeOtpP={setOpenOtpP} email={email} />}
          </Typography>
          <Button
            sx={{
              marginTop: "20px",
              width: "100%", // Set button width to 100%
              background: "#FF5151",
              padding: "10px",
              color: "#010101",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#FF5151",
              },
            }}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </Box>

      {/* Right Side (Image) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
          marginLeft: { xs: "46%", lg: "120px" },
          position: "relative",
          width: "50%",
        }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/Images/Rectangle 1.png`}
          sx={{
            objectFit: "cover",
            height: { xs: "50vh", sm: "60vh", md: "80vh", lg: "97vh" },
            borderBottomRightRadius: { xs: "0px", lg: "50px" },
          }}
        />
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/Images/young man sitting cross legged and looking at smartphone.png`}
          sx={{
            objectFit: "cover",
            position: "absolute",
            marginTop: { xs: "30%", md: "3%" },
            height: { xs: "50vh", sm: "60vh", md: "75vh", lg: "90vh" },
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
