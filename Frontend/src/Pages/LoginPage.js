// LoginPage.js
import React, { useEffect } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

const LoginPage = () => {
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
        // height: "100vh",
        background: "#161E54",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50px",
        minHeight: "95vh",
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
            variant="standard"
            fullWidth
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
            }}
            label="Password"
            variant="standard"
            type="password"
            fullWidth
          />
          <Typography
            variant="body2"
            sx={{
              color: "white",
              marginTop: 1,
              marginLeft: { xs: "30%", md: "45%" },
            }}
          >
            Forgot/Reset Password?
          </Typography>
          <Button
            sx={{
              marginTop: "20px",
              width: "100%", // Set button width to 100%
              background: "#FF5151",
              padding: "10px",
              color: "#010101",
              fontWeight: 600,
            }}
            variant="contained"
            color="primary"
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
          marginLeft: { xs: "50%", lg: "0%" },
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
