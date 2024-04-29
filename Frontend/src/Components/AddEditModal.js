import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
export default function AddEditModal({ rows }) {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    inId: rows[0]?.inId || "",
    dop: rows[0]?.dop || "",
    assignee: rows[0]?.assignee || "",
    item: rows[0]?.item || "",
    description: rows[0]?.description || "",
    issuedFrom: rows[0]?.issuedFrom || "",
    issuedTill: rows[0]?.issuedTill || "",
    repairs: rows[0]?.repairs || "",
    inWarranty: rows[0]?.inWarranty || "",
    endWarranty: rows[0]?.endWarranty || "",
  });

  useEffect(() => {
    // Populate the edited data with the previous values when the modal opens
    if (rows.length === 1) {
      setEditedData({
        inId: rows[0]?.inId || "",
        dop: rows[0]?.dop || "",
        assignee: rows[0]?.assingnee || "", // Corrected property name
        item: rows[0]?.item || "",
        description: rows[0]?.description || "",
        issuedFrom: rows[0]?.issued_From || "", // Corrected property name
        issuedTill: rows[0]?.issued_Till || "", // Corrected property name
        repairs: rows[0]?.repairs || "",
        inWarranty: rows[0]?.in_Warranty || "", // Corrected property name
        endWarranty: rows[0]?.warranty_End || "", // Corrected property name
      });
    }
  }, [rows]);

  const apiUrl = process.env.REACT_APP_API_URL;

  function handleUpdate() {
    // Gather updated data from form fields
    // event.preventDefault();
    const updatedData = { ...editedData };

    // Send a request to update the asset data
    // You can use axios or fetch for this
    console.log(updatedData);
    axios
      .put(`${apiUrl}/asset/admin/update-asset/${updatedData.inId}`, updatedData)
      .then((response) => {
        // Handle successful update
        console.log("Asset updated successfully:", response.data);
        // handleClose(); // Optionally, close the modal
        setOpen(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating asset:", error);
      });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                fontFamily: "Poppins",
                fontWeight: "600",
              }}
              variant="h6"
            >
              Edit
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="inId">Inv.Id</label>
                <br />
                <input
                  type="text"
                  id="inId"
                  name="inId"
                  style={inputControl}
                  value={editedData.inId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="dop">D.O.P</label>
                <br />
                <input
                  type="text"
                  id="dop"
                  name="dop"
                  style={inputControl}
                  value={editedData.dop}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="assignee">Assignee</label>
                <br />
                <input
                  type="text"
                  id="assignee"
                  name="assignee"
                  style={inputControl}
                  value={editedData?.assignee}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="item">Item</label>
                <br />
                <input
                  type="text"
                  id="item"
                  name="item"
                  style={inputControl}
                  value={editedData.item}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label for="description">Description</label>
                <br />
                <input
                  type="text"
                  id="description"
                  name="description"
                  style={inputControl}
                  value={editedData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label htmlFor="isuedfrom">Issued From</label>
                <br />
                <input
                  type="text"
                  id="isuedfrom"
                  name="issuedFrom"
                  style={inputControl}
                  value={editedData.issuedFrom}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label htmlFor="issuedtill">Issued Till</label>
                <br />
                <input
                  type="text"
                  id="issuedtill"
                  name="issuedTill"
                  style={inputControl}
                  value={editedData.issuedTill}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label htmlFor="repairs">Repairs</label>
                <br />
                <input
                  type="text"
                  id="repairs"
                  name="repairs"
                  style={inputControl}
                  value={editedData.repairs}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label htmlFor="inwarranty">In Warranty</label>
                <br />
                <input
                  type="text"
                  id="inwarranty"
                  name="inWarranty"
                  style={inputControl}
                  value={editedData.inWarranty}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label htmlFor="endwarranty">End Warranty</label>
                <br />
                <input
                  type="text"
                  id="endwarranty"
                  name="endWarranty"
                  style={inputControl}
                  value={editedData.endWarranty}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div style={{ textAlign: "center", padding: "15px" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleUpdate}
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
