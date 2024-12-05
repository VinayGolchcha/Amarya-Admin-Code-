import Modal from "@mui/material/Modal";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DashboardGraph2 from "../Components/DashboardGraph2";
import DashboardGraph3 from "../Components/DashboardGraph3";
import CloseIcon from '@mui/icons-material/Close';


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
const PerformanceModal = ({handleClose , open}) => {
    return(
        <>
            <Modal open={open} onClose={handleClose} style={{
                overflowX : "auto"
            }}>
            <Box sx={{ p: 1 , backgroundColor : "White" , overflow : "auto" }}>
                <Box style={{cursor : "pointer"}} onClick={() => handleClose()}><CloseIcon/></Box>
                <Grid
                    container
                    spacing={2}
                    sx={{ margin: "6px 0px", justifyContent: "center" }}
                    >
                        <Grid item lg={5} md={10} sm={10} xs={10}>
                            <DashboardGraph2 pointsData={[]} />
                        </Grid>
                        <Grid item lg={5} md={10} sm={10} xs={10}>
                            <DashboardGraph3 pointsData={[]} />
                        </Grid>

                </Grid>
            </Box>
            </Modal>
        </>
    )
}

export default PerformanceModal;