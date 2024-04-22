import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";

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
  width: { lg: "55%", md: "45%", sm: "50%", xs: "80%" },
  padding : {lg : "55px" , md: "45px", sm: "30px", xs: "25px" }
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
  fontWeight : "600",
  fontSize: { lg: "1rem", md: "1rem", sm: "1rem", xs: "0.9 rem" },
  color : "rgb(120, 120, 122)"
};
export default function AddEditModal({ rows }) {
  const [open, setOpen] = useState(false);
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
  }
  function handleOpen() {
    console.log(rows);
    if (rows.length === 0) {
      toast.warning("Please select the row to edit the record", {
        position: "top-right",
      });
    } else if (rows.length === 1) {
      setOpen(true);
    } else if (rows.length > 1) {
      toast.warning("Cannot edit the multiple records", {
        position: "top-right",
      });
    }
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <ModeEditOutlineOutlinedIcon
        onClick={handleOpen}
        color="action"
        sx={{
          borderRadius: "50px",
          backgroundColor: "rgb(222, 225, 231)",
          padding: "5px",
          width: "30px",
          height: "30px",
          margin: "0px 2px",
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
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
              Edit
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} for="inId">Asset Type</label>
                <br />
                <input
                  type="text"
                  id="inId"
                  style={inputControl}
                  value={rows[0]?.inId}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} for="dop">Item</label>
                <br />
                <input
                  type="text"
                  id="dop"
                  style={inputControl}
                  value={rows[0]?.dop}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} for="assignee">Item Description</label>
                <br />
                <input
                  type="text"
                  id="assignee"
                  style={inputControl}
                  value={rows[0]?.assingnee}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} for="item">Model Number</label>
                <br />
                <input
                  type="text"
                  id="item"
                  style={inputControl}
                  value={rows[0]?.item}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} for="description">Purchase Date</label>
                <br />
                <input
                  type="text"
                  id="description"
                  style={inputControl}
                  value={rows[0]?.description}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} for="isuedfrom">Price</label>
                <br />
                <input
                  type="text"
                  id="isuedfrom"
                  style={inputControl}
                  value={rows[0]?.issued_From}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} for="issuedtill">Image Url</label>
                <br />
                <input
                  type="text"
                  id="issuedtill"
                  style={inputControl}
                  value={rows[0]?.issued_Till}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} for="repairs">Warranty Period</label>
                <br />
                <input
                  type="text"
                  id="repairs"
                  style={inputControl}
                  value={rows[0]?.repairs}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div style={{ textAlign: "center", padding: "15px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                  >
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
