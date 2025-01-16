import Modal from "@mui/material/Modal";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DashboardGraph2 from "../Components/DashboardGraph2";
import DashboardGraph3 from "../Components/DashboardGraph3";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../Components/AuthContext";
import axios from "axios";
import Loading from "../sharable/Loading";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  flexGrow: "1",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "25px",
  fontFamily: "Poppins",
  border: "1px solid #FFFFFF",
  borderRadius: "16px",
  backgroundColor: "rgb(233, 235, 247)",
  width: { lg: "55%", md: "45%", sm: "50%", xs: "80%" },
  padding: { lg: "55px", md: "45px", sm: "30px", xs: "25px" },
};

const inputControl = {
  border: "none",
  borderRadius: "4px",
  height: "31px",
  width: "100%",
  padding: "5px",
  fontWeight: "500",
  margin: "2px 0px",
};

const labelStyle = {
  fontWeight: "600",
  fontSize: { lg: "1rem", md: "1rem", sm: "1rem", xs: "0.9 rem" },
  color: "rgb(120, 120, 122)",
};
const PerformanceModal = ({handleClose , open, emp_id}) => {
  const [isLoading , setIsLoading] = useState(false);
  const { user, encryptionKey} = useAuth();
  const [isDataReady, setIsDataReady] = useState(false);
  const [monthData, setmonthData] = useState({
    month_data : []
  });
  const [yearData, setYearData] = useState({
  });

  const apiUrl = process.env.REACT_APP_API_URI;
  // console.log("emaployeeeee" , emp_id)

    useEffect(() => {
      const fetchMonthData = async () => {
        try {
          // const emp_id = user?.user_id; // Replace with actual employee ID if dynamic
  
          const pointsResponse = await axios.get(
            `${apiUrl}/worksheet/all-month-weighted-average/${'2024'}/${emp_id}`,
            {
              headers: {
                "x-encryption-key" : encryptionKey
              },
            }
          );
          console.log("setsResponsemonth", pointsResponse.data.data)
          // console.log("setsResponse",{month_data : pointsResponse.data.data , year_data : pointsResponse.data.data})
          setmonthData({...monthData , month_data : pointsResponse.data.data});
          // console.log('pointsResponse', monthData);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      };
      const fetchYearData = async () => {
        try {
          // const emp_id = user?.user_id; // Replace with actual employee ID if dynamic
          const yearResponse = await axios.get(
            `${apiUrl}/worksheet/get-all-year-weighted-average/${emp_id}`,
            {
              headers: {
                "x-encryption-key" : encryptionKey
              },
            }
          );
          console.log("setsResponseyear", yearResponse.data.data)
          // console.log("setsResponse",{month_data : yearResponse.data.data , year_data : yearResponse.data.data})
          setYearData( yearResponse.data.data);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      }
      const fetchData = async () => {
        setIsLoading(true);
        console.log("before promise");
        
        await Promise.all([fetchMonthData(), fetchYearData()]);
        console.log("after promise");
        setIsLoading(false);
        setIsDataReady(true); // Set to true when both calls succeed
      };
  
      fetchData();

    },[emp_id]);
    


      return(
          <>
              <Modal open={open} onClose={handleClose} style={{
                  overflowX : "auto"
              }}>
              <Box sx={{ p: 1 , backgroundColor : "White" , overflow : "auto" }}>
                  <Box style={{cursor : "pointer"}} onClick={() => handleClose()}><CloseIcon/></Box>
                  {isLoading || !isDataReady ? <Loading/> :  
                  <Grid
                      container
                      spacing={2}
                      sx={{ margin: "6px 0px", justifyContent: "center" }}
                      > 
                          <Grid item lg={5} md={10} sm={10} xs={10}>
                              <DashboardGraph2 pointsData={monthData.month_data} />
                          </Grid>
                          <Grid item lg={5} md={10} sm={10} xs={10}>
                              <DashboardGraph3 pointsData={yearData} />
                          </Grid>
  
                  </Grid>}
              </Box>
              </Modal>
          </>
      )
}

export default PerformanceModal;