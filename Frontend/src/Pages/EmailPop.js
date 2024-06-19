import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import OtpP from "./OtpPop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../Components/AuthContext";

function EmailP({ closeEmailP }) {
  const [email, setEmail] = useState("");
  const [openOtpP, setOpenOtpP] = useState(false);
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || "");

  const handleUpdate = async () => {
    try {
      // Replace with your actual API URL from environment variable
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.post(
        `${apiUrl}/user/send-otp-password-verification`,
        {
          email,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(response);
      setOpenOtpP(true);
    } catch (error) {
      console.log("Error data:", error.response.data.errors[0]?.msg);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: "57px",
          left: "117px",
          zIndex: "11",
        }}
        className="modelbackground"
      >
        <div
          style={{
            position: "absolute",
            zIndex: "1000",
            width: "600px",
            height: "300px",
            borderRadius: "10px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "#161E54",
          }}
          className="modelcontainer"
        >
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
            onClick={() => closeEmailP(false)}
          >
            <ArrowBackIcon />
          </Button>

          <div>
            <h1>Enter Email</h1>
            <p>Enter Your Email To Verify</p>
            <TextField
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
            <br />
            <br />
            <Button
              sx={{
                marginTop: "10px",
                width: "75%",
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
              Send OTP
            </Button>
            {openOtpP && <OtpP closeOtpP={setOpenOtpP} />}
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailP;
