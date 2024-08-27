import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";
import { ToastContainer, toast } from "react-toastify";

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

const PoliciesPage = () => {
  const [policy, setPolicy] = useState([]);
  const [policyheading, setPolicyheading] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const { user , encryptionKey} = useAuth();
  const [fileBuffer, setFileBuffer] = useState(null);

  const fetchPolicy = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/policy/fetch-policy`, {
        headers: {
          "x-encryption-key" : encryptionKey
        }
      });
      const data = response?.data?.data || [];
      
        setPolicy(data);
        setPolicyheading(data?.policy_heads.split(","));
      
    } catch (error) {
      // if(error?.response?.message){
      //   toast.error(error?.response?.message);
      // }
      // if(error?.response?.data?.message){
      //   console.log("true");
      //   const item = error?.response?.data?.message
      //   toast.error(item);
      // }
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPolicy();
  }, [fetchPolicy]);

  const addPolicy = async (body) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URI}/policy/add-policy`,{
        headers : {
          "x-encryption-key" : encryptionKey
        }
      } , body);
    } catch (err) {
      console.error(err);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setFileBuffer(base64.toString().split(',')[1]);
  };

  const handleAddPolicy = () => {
    const body = {
      policy_type: "Equal Employment Opportunity Policy",
      image_data: fileBuffer
    };
    addPolicy(body);
  };

  // const downloadFile = async (val) => {
  //   try {
  //     console.log(val);
  //     if (val) {
  //       const imageUrl = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = imageUrl;
  //       a.download = "policies.pdf";
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(imageUrl);
  //       a.remove();
  //     } else {
  //       console.error('Image data not found in response');
  //     }
  //   } catch (error) {
  //     console.error('Error downloading the file:', error);
  //   }
  // };

  if (isLoading) {
    return <Loading />;
  }

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
      <ToastContainer/>
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
              {policyheading?.map((item, i) => (
                <li key={i} style={{ fontWeight: "600" }}>{item}</li>
              ))}
            </ul>
            {policyheading.length===0 && <Typography textAlign="center" variant="h4" style={{ fontWeight: "600" , width : "100%" }}>No Policy Exists</Typography>}
          </Box>
        </Grid>
      </Grid>
      <Box textAlign="center">
        <a
          style={{
            fontFamily: "Poppins",
            fontSize: '1.3rem',
            textAlign: "center",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline"
          }}
          href={`${policy?.file_url}`} download="foo.pdf" target="_blank"
        >
          CLICK HERE TO DOWNLOAD THE POLICY DOCUMENT
        </a>
      </Box>
    </Box>
  );
};

export default PoliciesPage;

