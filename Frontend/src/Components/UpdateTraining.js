import Modal from "@mui/material/Modal";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

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
export default function UpdateTraining({
  handleClose,
  open,
  selectedObj
}) {

  const itemNewInId = useRef("");
  const itemNewDop = useRef("");
  const itemNewAssignee = useRef("");
  const itemNewItem = useRef("");
  const itemNewDescription = useRef("");
  const itemNewIssuedFrom = useRef("");
  const itemNewIssuedTill = useRef("");
  const itemNewRepairs = useRef("");
  const itemNewInWarranty = useRef("");
  const itemNewEndWarranty = useRef("");

  function handleSubmit(event) {
    event.preventDefault();
    const newItem = [
      itemNewInId.current.value,
      itemNewDop.current.value,
      itemNewAssignee.current.value,
      itemNewItem.current.value,
      itemNewDescription.current.value,
      itemNewIssuedFrom.current.value,
      itemNewIssuedTill.current.value,
      itemNewRepairs.current.value,
      itemNewInWarranty.current.value,
      itemNewEndWarranty.current.value,
    ];
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
          <form onSubmit={handleSubmit}>
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
              Training 5
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
                  ref={itemNewInId}
                  value={selectedObj?.courseName}
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
                  ref={itemNewDop}
                  value={selectedObj?.courseDescription}
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
                  ref={itemNewAssignee}
                  value={selectedObj?.roadmapUrl}
                />
                <TextField
                  id="upload-text"
                  variant="outlined"
                  size="small"
                  sx={{width : "100%" , backgroundColor : "white"}}
                  value={file && file.name}
                  InputProps={{
                    style: {
                      color: "rgb(255, 255, 255)",
                      fontSize: { xs: "18px", md: "20px" },
                    },
                    endAdornment: (
                      <IconButton
                        edge="end"
                        component="label"
                        htmlFor="upload-file"
                        sx={{ color: "rgb(188, 189, 163)" }}
                      >
                        <img src="Images/file-uplaod.png" alt="upload-icon" height="20px" width="20px" />
                        <input
                          type="file"
                          id="upload-file"
                          style={{ display: "none" }}
                          accept="application/pdf"
                          onChange={handleFileChange}
                        />
                      </IconButton>
                    ),
                  }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                      fontSize: { xs: "18px", md: "20px" },
                    },
                  }}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <label for="item"  style={labelStyle}>
                  Deatails
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
                  ref={itemNewItem}
                  value={selectedObj?.details}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div style={{ textAlign: "center", padding: "15px" }}>
                  <Button variant="contained" color="error">
                    Save
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
