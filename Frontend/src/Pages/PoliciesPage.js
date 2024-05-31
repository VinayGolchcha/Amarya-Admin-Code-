// LoginPage.js
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PolicyTable from "../Components/PolicyTable";
import axios from 'axios';

import { Buffer } from 'buffer';
const headingStyle = {
  margin: "2px 0px",
};
const boxHeading = {
  display: "inline-block",
  width: "auto",
  backgroundColor: "rgb(142, 141, 138)",
  color: "rgb(211, 213, 223)",
  padding: "6px",
  borderRadius: "6px",
  fontSize: "0.9rem",
  fontWeight: "700",
};
const boxBody = {
  margin: "20px 0px",
  backgroundColor: "rgb(249, 248, 245)",
  padding: "15px 10px",
  borderRadius: "6px",
  fontSize: "0.9rem",
  boxShadow:
    "inset 0 12px 10px -10px rgb(205, 204, 202) , inset -5px 5px 5px -5px rgb(205, 204, 202), inset 5px 5px 5px -5px rgb(205, 204, 202)",
};

const tableHeadersLeave = ["Dates", "Day", "Occasion"];

const tableContentLeave = [
  { dates: "26-Jan-24", day: "Friday", occation: "Republic Day" },
  { dates: "25-Mar-24", day: "Monday", occation: "Holi" },
  { dates: "15-Aug-24", day: "Thursday", occation: "Independence Day" },
  { dates: "02-Oct-24", day: "Wednesday", occation: "Gandhi Jayanti" },
  { dates: "31-Oct-24", day: "Thursday", occation: "Diwali" },
];
const tableHeadersAppraisal = [
  "Joining Period",
  "Joining Period",
  "Joining Period",
];
const tableContentAppraisal = [
  {
    firstQuarter: "January-June",
    secondQuarter: "October",
    thirdQuarter: "April",
  },
  {
    firstQuarter: "July-December",
    secondQuarter: "April",
    thirdQuarter: "October",
  },
];
const PoliciesPage = () => {
  const [policy , setPolicy] = useState([]);
  const [policyheading , setPolicyheading] = useState([]);
  const [isLoading , setisLoading] = useState(false);

  const fetchPolicy = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/policy/fetch-policy`);
      setPolicy(response?.data?.data);
      console.log(response?.data?.data?.[0]?.policy_heads);
      setPolicyheading(response?.data?.data?.[0]?.policy_heads.split(","));
      setisLoading(true);
      console.log(policyheading);
  }catch(err){
    console.log(err);
  }
}
  useEffect(()=> {
    fetchPolicy()
  },[])
  const [fileBuffer , setFileBuffer] = useState(null);
  const addPolicy = async (body) => {
  
    try{
      const res = await axios.post("http://localhost:4000/api/v1/policy/add-policy" , body);
      console.log(res);

    }catch(err){
      console.log(err);

    }
  }
  const convertBase64 = (file) => {
    return new Promise((resolve , reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error)
      };
    });
  }
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setFileBuffer(base64.toString().split(',')[1]);
  }
  const handleAddPolicy = () => {

      const body = {
        policy_type : "Equal Employment Opportunity Policy",
        image_data : fileBuffer
      } 
    addPolicy(body);
  };
    const downloadFile = async (val) => {
      console.log(val)
      try {
        if (val?.file_data.data) {
          const binaryData = new Uint8Array(val?.file_data.data);
          const blob = new Blob([binaryData],{ type: 'application/pdf' }); // Adjust the MIME type as needed
          // Now you can use the blob, for example, to create an object URL
          
          const imageUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = imageUrl;
          a.download = "policies.pdf"; // Set the desired file name and extension
          document.body.appendChild(a);
          a.click();
          
          // Clean up the URL and remove the anchor element
          window.URL.revokeObjectURL(imageUrl);
          a.remove();
        } else {
          console.error('Image data not found in response');
        }
      
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
    }
    if(isLoading === false) {
      <Box sx={{
        flexGrow: 1,
        p: 3,}}>
      <CircularProgress color="inherit" />
      </Box>
    }else{

      return (
      
            
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: "100%",
                borderRadius: "10px",
                fontFamily: "Poppins",
                fontSize: "0.9rem",
              }}
            >
              <Typography
                sx={{
                  margin: "12px 0px",
                  width: "630px",
                  height: "42px",
                  fontFamily: "Poppins",
                  fontSize: "24px",
                  fontWeight: "600",
                  lineHeight: "42px",
                  color: "#121843",
                }}
              >
                Policies
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  item
                  lg={1}
                  md={1}
                  sm={2}
                  xs={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgb(142, 141, 138)",
                      height: "100%",
                      width: "100%",
                      color: "rgb(211, 213, 223)",
                      padding: "15px",
                      borderRadius: "6px",
                    }}
                  >
                    <Box sx={{ margin: "8px 0px" }}>
                      <p style={headingStyle}>T</p>
                      <p style={headingStyle}>A</p>
                      <p style={headingStyle}>B</p>
                      <p style={headingStyle}>L</p>
                      <p style={headingStyle}>E</p>
                    </Box>
                    <p style={headingStyle}>OF</p>
                    <Box sx={{ margin: "8px 0px" }}>
                      <p style={headingStyle}>C</p>
                      <p style={headingStyle}>O</p>
                      <p style={headingStyle}>N</p>
                      <p style={headingStyle}>T</p>
                      <p style={headingStyle}>E</p>
                      <p style={headingStyle}>N</p>
                      <p style={headingStyle}>T</p>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={11} md={11} sm={10} xs={9}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "rgb(249, 248, 245)",
                      height: "100%",
                      width: "100%",
                      padding: "15px",
                      borderRadius: "6px",
                      boxShadow:
                        "inset 0 12px 10px -10px rgb(205, 204, 202) , inset -5px 5px 5px -5px rgb(205, 204, 202), inset 5px 5px 5px -5px rgb(205, 204, 202)",
                    }}
                  >
                    <ul style={{ marginTop: "0px" }}>
                      {policyheading.map((item , i) => (<li key={i} style={{fontWeight : "600"}}>{item}</li>))}
                    </ul>
                  </Box>
                </Grid>
              </Grid>
              <Box textAlign="center">
                    <p href="" style={{fontFamily : "Poppins" , fontSize : '1.3rem' , textAlign : "center" , color : "blue" , cursor : "pointer" , textDecoration : "underline"}} onClick={() => downloadFile(policy[0])} >CLICK HERE TO DOWNLOAD THE POLICY DOCUMENT</p>
              </Box>
              
            </Box>
    
      );
    }
}

export default PoliciesPage;
