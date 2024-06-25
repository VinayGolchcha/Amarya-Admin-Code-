import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CloseIcon from "@mui/icons-material/Close";
import "./../App.css";
import { useAuth } from "../Components/AuthContext";
function Model({ closeModel,closeOtpP, email }) {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`${apiUrl}/user/update-password`, {
        password,
        confirm_password,
        email,
      });
      if (response.status === 200) {
        closeModel(false);
        closeOtpP(false);
      }
    } catch (error) {
      console.log("Error data:", error.response.data.errors[0]?.msg);
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
        className="modelbackground"
      >
        <div
          style={{
            position: "fixed",
            zIndex: "1000",
            width: "700px",
            height: "400px",
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
              Please create a new password and ensure you <br></br> remember it
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
              label="New Password"
              variant="filled"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
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
              type="password"
              required
              onChange={(e) => setConfirm_password(e.target.value)}
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
    </>
  );
}
export default Model;
