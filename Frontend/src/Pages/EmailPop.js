import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import "./../App.css";
import OtpP from "./OtpPop";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../Components/AuthContext";

function EmailP({ closeEmailP, openOtpP, setEmail }) {
  const [email, setEmailInput] = useState("");
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || "");

const handleUpdate = async () => {
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/update-password",
        {
         email,
        }
      );
      console.log(response);
      setEmail(email);
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
          // height: "100vh",
          // width: "100vw",
          // position: "absolute",
          // top: "57px",
          // left: "117px",
          // zIndex: "11",
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
            // backgroundColor: "rgb(50, 50, 116)",
            background:"#161E54",

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
              padding:"0",
              minWidth:"30px",
              height: "30px",
              color: "white",
              top:"10px",

            }}
            variant="contained"
            color="primary"
            onClick={() => closeEmailP(false)}
          >
            < ArrowBackIcon />
          </Button>
         

          <div>
            <h1>Enter Email</h1>
            <p >
             Enter Your Email To Verify
            </p>  
        <TextField
              id="filled-basic"
              label="Your Email"
              variant="filled"
              type="email"
              required
              onChange={(e) => setEmailInput(e.target.value)}
              sx={{
                marginY: 1,
                width: "75%",
                borderRadius: "5px",
                border: "1px solid #FF5151",
                backgroundColor: "white",
              }}
            />
            <br></br>
            <br></br>
           
            <Button
              sx={{
                marginTop: "10px",
                width: "75%", // Set button width to 100%
                background: "#FF5151",

                padding: "10px",
                color: "white",
                fontWeight: 600,
               
                textTransform:"none",
               
              }}
              variant="contained"
              color="primary"
              // onClick={handleUpdate}
          
             
              
            >
               
              Send OTP
              
            </Button>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
export default EmailP;
