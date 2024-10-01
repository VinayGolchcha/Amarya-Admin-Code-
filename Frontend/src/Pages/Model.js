import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CloseIcon from "@mui/icons-material/Close";
import "./../App.css";
import { useAuth } from "../Components/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function Model({ closeModel, closeOtpP, email }) {
  const [password, setPassword] = useState("");
  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);
  const [confirm_password, setConfirm_password] = useState("");
  const [otp , setOtp] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleUpdate = async () => {
    try {
      if(otp.length < 4 || otp.length > 4){
        toast.error("Otp must contain 4 digit only");
        console.log(true);
        return;
      }
      const response = await axios.post(`${apiUrl}/user/update-password`, {
        password,
        confirm_password,
        email,
        otp
      });
      if (response.data.success) {
        toast.success("Password updated successfully");
        closeModel(false);
        closeOtpP(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // error.response.data.errors.forEach((err) => {
          toast.error(error.response.data.errors[0].msg);
        // });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred");
      }
      console.log("Error data:", error);
    }
  };

  ///
  return (
    <>
    <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
        }}
        className="modelbackgroundd"
      >
        <div
          style={{
            position: "fixed",
            zIndex: "1000",
            width: "77%",
            height: "300px",
            borderRadius: "10px",

            top: "50%",
            left: "50%",

            transform: "translate(-50%,-50%)",
            // backgroundColor: "rgb(50, 50, 116)",
          }}
          className="modelcontainer"
        >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
        }}
        className="modelbackground"
      >
        <div
          style={{
            position: "fixed",
            zIndex: "1000",
            width: "118%",
            height: "500px",
            borderRadius: "10px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            // backgroundColor: "rgb(50, 50, 116)",
            background: "#161E54",
          }}
          className="modelcontainer"
        >
          <Button
            sx={{
              zIndex: "1",
              position: "absolute",
              right: "25px",
              background: "white",
              borderRadius: "50%",
              width: "10px",
              padding: "0",
              minWidth: "30px",
              height: "30px",
              color: "black",
              top: "10px",
            }}
            variant="contained"
            color="primary"
            onClick={() => closeModel(false)}
          >
            <CloseIcon />
          </Button>
          <Button
            sx={{
              zIndex: "1",
              position: "absolute",
              left: "8px",
              background: "none",
              borderRadius: "50%",
              width: "10px",
              padding: "0",
              minWidth: "30px",
              height: "30px",
              color: "white",
              top: "10px",
            }}
            variant="contained"
            color="primary"
            onClick={() => closeModel(false)}
          >
            <ArrowBackIcon />
          </Button>

          <div>
            <h1>Set Password</h1>
            <p>
              Please enter otp and create a new password and ensure you <br></br> remember it
              for future use
            </p>
            {/* <TextField
              id="filled-basic"
              label="Your Email"
              variant="filled"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginY: 1,
                width: "75%",
                borderRadius: "5px",
                border: "1px solid #FF5151",
                backgroundColor: "white",
              }}
            />
            <br></br>
            <br></br> */}
            <TextField
              id="filled-basic"
              label="otp"
              variant="filled"
              type="number"
              required
              onChange={(e) => setOtp(e.target.value)}
              inputProps={{ maxLength: 4 }}
              sx={{
                marginY: 1,
                width: "75%",
                borderRadius: "5px",

                border: "1px solid #FF5151",
                backgroundColor: "white",
              }}
            />
            <br/>
            <TextField
              id="filled-basic"
              label="New Password"
              variant="filled"
              type={showPassword ? "text" :"password"}
              required
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { color: "black" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "black" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                marginY: 1,
                width: "75%",
                borderRadius: "5px",

                border: "1px solid #FF5151",
                backgroundColor: "white",
              }}
            />
            {/* <div>{res}</div> */}
            <br></br>
            {/* <br></br> */}
            <TextField
              id="filled-basic"
              label="Confirm Password"
              variant="filled"
              type={showConfirmPassword ? "text" : "password"}
              required
              onChange={(e) => setConfirm_password(e.target.value)}
              InputProps={{
                style: { color: "black" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: "black" }}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                marginY: 1,
                width: "75%",
                borderRadius: "5px",
                border: "1px solid #FF5151",
                backgroundColor: "white",
              }}
            />
            <Button
              sx={{
                marginTop: "10px",
                width: "75%", // Set button width to 100%
                background: "#FF5151",

                padding: "10px",
                color: "white",
                fontWeight: 600,

                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#FF5151",
                },
              }}
              variant="contained"
              color="primary"
              onClick={handleUpdate}
            >
              Update Password
            </Button>
            <br></br>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
export default Model;
