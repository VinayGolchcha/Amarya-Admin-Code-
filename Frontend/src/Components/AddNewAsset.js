import Modal from "@mui/material/Modal";
import { Box, Button, Typography } from "@mui/material";
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
  width: { lg: "32%", md: "40%", sm: "50%", xs: "80%" },
};
const inputControl = {
  border: "1px solid black",
  borderRadius: "4px",
  height: "31px",
  width: "100%",
  padding: "5px",
  margin: "2px 0px",
};
const labelStyle = {
  fontSize: { lg: "1rem", md: "1rem", sm: "1rem", xs: "0.9 rem" },
};
export default function AddNewAssets({
  assetsData,
  handleAdd,
  handleClose,
  open,
}) {
  console.log("addnewItem called");

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
    handleAdd((prevData) => [...prevData, newItem]);
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
                fontFamily: "Poppins",
                fontWeight: "600",
              }}
              variant="h6"
            >
              Add
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="inId" style={labelStyle}>
                  Inv.Id
                </label>
                <br />
                <input
                  type="text"
                  id="inId"
                  style={inputControl}
                  ref={itemNewInId}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="dop" style={labelStyle}>
                  D.O.P
                </label>
                <br />
                <input
                  type="text"
                  id="dop"
                  style={inputControl}
                  ref={itemNewDop}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="assingnee" style={labelStyle}>
                  Assignee
                </label>
                <br />
                <input
                  type="text"
                  id="assignee"
                  style={inputControl}
                  ref={itemNewAssignee}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="item" style={labelStyle}>
                  Item
                </label>
                <br />
                <input
                  type="text"
                  id="item"
                  style={inputControl}
                  ref={itemNewItem}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="description" style={labelStyle}>
                  Description
                </label>
                <br />
                <input
                  type="text"
                  id="description"
                  style={inputControl}
                  ref={itemNewDescription}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="isuedfrom" style={labelStyle}>
                  Issued From
                </label>
                <br />
                <input
                  type="text"
                  id="isuedfrom"
                  style={inputControl}
                  ref={itemNewIssuedFrom}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="issuedtill" style={labelStyle}>
                  Issued Till
                </label>
                <br />
                <input
                  type="text"
                  id="issuedtill"
                  style={inputControl}
                  ref={itemNewIssuedTill}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="repairs" style={labelStyle}>
                  Repairs
                </label>
                <br />
                <input
                  type="text"
                  id="repairs"
                  style={inputControl}
                  ref={itemNewRepairs}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="inwarranty" style={labelStyle}>
                  In Warranty
                </label>
                <br />
                <input
                  type="text"
                  id="inwarranty"
                  style={inputControl}
                  ref={itemNewInWarranty}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="endwarranty" style={labelStyle}>
                  End Warranty
                </label>
                <br />
                <input
                  type="text"
                  id="endwarranty"
                  style={inputControl}
                  ref={itemNewEndWarranty}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div style={{ textAlign: "center", padding: "15px" }}>
                  <Button variant="contained" color="success">
                    Submit
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
