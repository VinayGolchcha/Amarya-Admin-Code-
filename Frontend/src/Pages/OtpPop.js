import { TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./../App.css";
import Model from "./Model";
import OtpInput from "./OtpInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OtpP({ closeOtpP, email }) {
  const [otp, setOtp] = useState("");
  const [openModel, setOpenModel] = useState(true);
  // Retrieve saved email from local storage

  // const handleUpdate = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URI}/user/verify-email-for-password-update`,
  //       {
  //         otp,
  //         email,
  //       }
  //     );
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       setOpenModel(true);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(
  //       "Error data:",
  //       error.response?.data?.message || error.message
  //     );
  //     toast.error(error.response?.data?.message || "An error occurred");
  //   }
  // };

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
          {/* <Button
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
            onClick={() => closeOtpP(false)}
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
            onClick={() => closeOtpP(false)}
          >
            <ArrowBackIcon />
          </Button>

          <div>
            <Typography variant="h1" sx={{fontSize : { lg : "55px" , md : "50px" , sm : "45px" , xs : "26px" , marginTop : "10px" }}}>OTP Verification</Typography>
            <p>
              Please Enter The OTP Sent To Your Email To <br></br>
              Complete The Verification process
            </p>
            <OtpInput numInputs={4} onOtpChange={setOtp} />
            
            <br></br>
            <br></br>

            <Button
              sx={{
                marginTop: "4px",
                width: "50%", // Set button width to 100%
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
              // onClick={()=>setOpenModel(true)}
            >
              Verify OTP
            </Button> */}
            {openModel && (
              <Model
                closeModel={setOpenModel}
                closeOtpP={closeOtpP}
                email={email}
              />
            )}
        </div>
      </div>
    </>
  );
}
export default OtpP;
