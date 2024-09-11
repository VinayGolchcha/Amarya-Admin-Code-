import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

function EmailVerification() {
//   const params = useParams();
  const [apiRes, setApiRes] = useState("")
  const [loading, setLoading] = useState(true);
  const [validUrl, setValidUrl] = useState(false);
  
//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         console.log("this is params",params)

//         const url = `${process.env.REACT_APP_API_URL}/api/user/${params.id}/verify/${params.token}`;
//         console.log("This is url",url)
//         const response = await axios.get(url);
//         console.log(response);
//         toast.success(response.data.message);
//         setApiRes(response.data.message)
//         setValidUrl(true);
//         // navigate('/signup'); 
//       } catch (error) {
//         console.log(error);
//         toast.error("Verification failed: " + (error.response?.data?.message || error.message));
//         setApiRes("Verification failed: " + (error.response?.data?.message || error.message))
//         setValidUrl(false);
//         // navigate('/'); // Redirect to home or any other page
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyEmail();
//   }, [params]);

  return (
    <div >
      {false ? (
        <div>Loading...</div>
      ) : true ? (
        <div style={{ alignContent : "center"}}> 
          
          <Typography variant='h4' style={{ display : "flex" , justifyContent : "center" , alignItems : "center" , marginTop : "100px" , fontSize : "2rem"}}>Email verified successfully</Typography>
                <Box sx={{height : "100%" , width : "100%", display : "flex" , justifyContent : "center" , alignItems : "center"}}>
                    <Box 
                        component="img"
                        src={`${process.env.PUBLIC_URL}/Images/Successfull.jpeg`}
                        alt="Check"
                        sx={{
                            height : "300px",
                            width : "300px"
                        }}
                    />
                    
                  </Box>
                  <Button variant='contained' textAlign="center">Go Back</Button>
          {/* <p>{apiRes}</p> */}
          {/* <Link to="/"> */}
            
          {/* </Link> */}
        </div>
      ) : (
        <div >
          <h1 >404 Not Found</h1>
          
          <p>{apiRes}</p>
          {/* <Link to="/"> */}
            <button >Go Back</button>
          {/* </Link> */}
        </div>
      )}
    </div>
  );
}

export default EmailVerification;
