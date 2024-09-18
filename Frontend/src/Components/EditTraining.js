import Modal from "@mui/material/Modal";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";

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
  backgroundColor : "rgb(233, 235, 247)",
  width: { lg: "32%", md: "40%", sm: "50%", xs: "80%" },
};
const inputControl = {
  border: "none",
  borderRadius: "4px",
  height: "31px",
  width: "100%",
  padding: "5px",
  fontWeight : "500",
  margin: "2px 0px",
};
const labelStyle = {
  fontSize: { lg: "1rem", md: "1rem", sm: "1rem", xs: "0.9 rem" },
  color : "rgb(120, 120, 122)"
};
export default function EditTraining({
  handleClose,
  open,
  addTraining , 
  selectedTr ,
  handleUpdate,
  isApiHit,
  setIsApiHit
}) {

  const [courseName , setCouseName] = useState("");
  const [courseDescription , setCourseDescription] = useState("");
  const [roadmapUrl , setRoadmapUrl] = useState("");
  const [details , setDetails] = useState("");
  const [trId , setTrId] = useState(""); 

  useEffect(() => {
    setCouseName(selectedTr?.courseName);
    setCourseDescription(selectedTr?.courseDescription);
    setRoadmapUrl(selectedTr?.roadmapurl);
    setDetails("");
    setTrId(selectedTr?.trainindId);

  } , [selectedTr])

  function handleSubmit(event) {
    if(Number.isInteger(parseInt(courseName))){
      toast.warning("Course name should not be a number");
      return;
    }
    const newItem = {
      course_name : courseName,
      course_description : courseDescription,
      roadmap_url : roadmapUrl,
      details : details,

  };
  handleUpdate(trId , newItem);
    // handleAdd((prevData) => [...prevData, newItem]);
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form >
            <Typography
              sx={{
                textAlign: "center",
                margin: "10px",
                color: "#121843",
                fontFamily: "Prosto One",
                fontWeight: "600",
              }}
              variant="h6"
            >
              Training 
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <label for="inId" style={labelStyle}>
                  Course Name
                </label>
                <br />
                <input
                  type="text"
                  id="inId"
                  style={inputControl}
                  value={courseName}
                  onChange={(e) => setCouseName(e.target.value)}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <label for="dop" style={labelStyle}>
                  Course Description
                </label>
                <br />
                <input
                  type="text"
                  id="dop"
                  style={inputControl}
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <label for="assingnee" style={labelStyle}>
                  Roadmap Url
                </label>
                <br />
                <input
                  type="text"
                  id="assignee"
                  style={inputControl}
                  value={roadmapUrl}
                  onChange={(e) => setRoadmapUrl(e.target.value)}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <label for="item"  style={labelStyle}>
                  Details
                </label>
                <br />
                <textarea
                  type="text"
                  id="item"
                  rows="4" 
                  cols="50"
                  style={{border: "none",
                  borderRadius: "4px",
                  height: "50px",
                  width: "100%",
                  fontWeight : "500",
                  padding: "5px",
                  margin: "2px 0px",
                }}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div style={{ textAlign: "center", padding: "15px" }}>
                  <Button variant="contained" color="error" onClick={handleSubmit} disabled={isApiHit} sx={{
                     ...(isApiHit && {"&.MuiButtonBase-root.MuiButton-root.Mui-disabled": {
                      backgroundColor: "transparent",
                      color: "black",
                    },})
                  }}>
                  {isApiHit ? <CircularProgress color="inherit" size={20} sx={{width : "100%" , height : "100%"}}/> :<>Save</>}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
}
