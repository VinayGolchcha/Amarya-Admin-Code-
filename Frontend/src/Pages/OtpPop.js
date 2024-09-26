import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./../App.css";
import Model from "./Model";

function OtpP({ closeOtpP }) {
    const [otp, setOtp] = useState("");
     const[openModel,setOpenModel]=useState(false)

const handleUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/update-password",
        {
         otp,
        }
      );
      console.log(response);
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
          top: "-250px",
        //   left: "800px",
          zIndex: "11",
        }}
        className="modelbackgroundd"
      >
        <div
          style={{
            position: "fixed",
            zIndex: "1000",
            width: "425px",
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
            onClick={() => closeOtpP(false)}
          >
            < ArrowBackIcon />
          </Button>
         

          <div>
            <h1>OTP Verification</h1>
            <p >
             Please Enter The OTP Sent To Your Email To <br></br>
            Complete The Verification process
            </p>  
        <TextField
              id="filled-basic"
              variant="filled"
              inputProps={{ maxLength: 1 }} 
              
              
            
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                marginY: 1,
                width: "8%",
                borderRadius: "5px",
                border: "1px solid #FF5151",
                backgroundColor: "white",
                
              }}
            />
            <TextField
              id="filled-basic"
              variant="filled"
              inputProps={{ maxLength: 1 }} 
              
            
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                marginY: 1,
                width: "8%",
                marginLeft:"15px",
                borderRadius: "5px",
                border: "1px solid #FF5151",
                backgroundColor: "white",
              }}
            />
            <TextField
              id="filled-basic"
              variant="filled"
              inputProps={{ maxLength: 1 }} 
              
            
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                marginY: 1,
                width: "8%",
                marginLeft:"15px",
                borderRadius: "5px",
                border: "1px solid #FF5151",
                backgroundColor: "white",
              }}
            />
            <TextField
              id="filled-basic"
              variant="filled"
              inputProps={{ maxLength: 1 }} 
              
            
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                marginY: 1,
                width: "8%",
                marginLeft:"15PX",
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
                width: "50%", // Set button width to 100%
                background: "#FF5151",

                padding: "10px",
                color: "white",
                fontWeight: 600,
               
                textTransform:"none",
               
              }}
              variant="contained"
              color="primary"
            //   onClick={handleUpdate}
              onClick={()=>setOpenModel(true)}
          
            >
              Verify otp
            </Button>
            { openModel && <Model closeModel={setOpenModel}/>}

            <br></br>
          </div>
        </div>
      </div>
    </>
  );
}
export default OtpP;