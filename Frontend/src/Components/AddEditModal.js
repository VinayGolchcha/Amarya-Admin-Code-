import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "./AuthContext";

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

export default function AddEditModal({ rows }) {
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly

  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    asset_type: "",
    item: "",
    purchase_date: "",
    warranty_period: "",
    price: "",
    model_number: "",
    item_description: "",
    image_url: "",
    file: null,
  });

  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(rows);

  useEffect(() => {
    if (rows.length === 1) {
      const rowData = rows[0];
      setEditedData({
        asset_type: rowData.asset_type || "",
        item: rowData.item || "",
        purchase_date: rowData.dop || "",
        warranty_period: rowData.warranty_period || "",
        price: rowData.price || "",
        model_number: rowData.model_number || "",
        item_description: rowData.description || "",
        image_url: rowData.photo || "",
      });
    }
  }, [rows]);

  function handleUpdate() {
    const formData = new FormData();
    formData.append("asset_type", editedData.asset_type);
    formData.append("item", editedData.item);
    formData.append("purchase_date", editedData.purchase_date);
    formData.append("warranty_period", editedData.warranty_period);
    formData.append("price", editedData.price);
    formData.append("model_number", editedData.model_number);
    formData.append("item_description", editedData.item_description);
    if (editedData.file) {
      formData.append("file", editedData.file);
    }

    axios
      .put(`${apiUrl}/asset/admin/update-asset/${rows[0]?.inId}`, formData, {
        headers: {
          "x-access-token": token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Asset updated successfully");
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Error updating asset");
        console.error("Error updating asset:", error);
      });
  }

  function handleOpen() {
    if (rows.length === 0) {
      toast.warning("Please select the row to edit the record", {
        position: "top-right",
      });
    } else if (rows.length === 1) {
      setOpen(true);
    } else if (rows.length > 1) {
      toast.warning("Cannot edit multiple records", {
        position: "top-right",
      });
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setEditedData((prevState) => ({
        ...prevState,
        file: files[0],
      }));
    } else {
      setEditedData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
                fontFamily: "Prosto One",
                fontWeight: "600",
              }}
              variant="h6"
            >
              Edit
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} htmlFor="asset_type">
                  Asset Type
                </label>
                <br />
                <input
                  type="text"
                  id="asset_type"
                  name="asset_type"
                  style={inputControl}
                  value={editedData.asset_type}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} htmlFor="item">
                  Item
                </label>
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
                <label style={labelStyle} htmlFor="item_description">
                  Item Description
                </label>
                <br />
                <input
                  type="text"
                  id="item_description"
                  name="item_description"
                  style={inputControl}
                  value={editedData.item_description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} htmlFor="model_number">
                  Model Number
                </label>
                <br />
                <input
                  type="text"
                  id="model_number"
                  name="model_number"
                  style={inputControl}
                  value={editedData.model_number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} htmlFor="purchase_date">
                  Purchase Date
                </label>
                <br />
                <input
                  type="date"
                  id="purchase_date"
                  name="purchase_date"
                  style={inputControl}
                  value={editedData.purchase_date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} htmlFor="price">
                  Price
                </label>
                <br />
                <input
                  type="number"
                  id="price"
                  name="price"
                  style={inputControl}
                  value={editedData.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} htmlFor="image_url">
                  Image
                </label>
                <br />
                <input
                  type="file"
                  id="image_url"
                  name="file"
                  style={inputControl}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <label style={labelStyle} htmlFor="warranty_period">
                  Warranty Period
                </label>
                <br />
                <input
                  type="number"
                  id="warranty_period"
                  name="warranty_period"
                  style={inputControl}
                  value={editedData.warranty_period}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div style={{ textAlign: "center", padding: "15px" }}>
                  <Button
                    variant="contained"
                    color="error"
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
