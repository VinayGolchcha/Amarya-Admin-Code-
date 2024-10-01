import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Select,
  MenuItem,
  Modal,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const EmployeeList = [
  "None",
  "Ankit Soni",
  "Ankit koshta",
  "Prashant Panday",
  "Sanjana",
  "Kishan Chourasiya",
  "Ankit Soni",
  "Ankit koshta",
  "Prashant Panday",
  "Sanjana",
  ,
  "Ankit Soni",
  "Ankit koshta",
  "Prashant Panday",
  "Sanjana",
  ,
  "Ankit Soni",
  "Ankit koshta",
  "Prashant Panday",
  "Sanjana",
  ,
  "Ankit Soni",
  "Ankit koshta",
  "Prashant Panday",
  "Sanjana",
];
const rows = [
  {
    sNo: 1,
    employeeId: "AM45656",
    identifiedOn: "17-09-2020",
    identifiedAt: "11:34:54 AM",
    tag: "Outside",
    identification: "Approved",
    image: "./Images/attendance/IMG-20240918-WA0006.jpg",
    disableFlag: true,
  },
  {
    sNo: 2,
    employeeId: "AM45656",
    identifiedOn: "17-09-2020",
    identifiedAt: "11:34:54 AM",
    tag: "Employee",
    identification: "Approved",
    image: "./Images/attendance/prashant.jpg",
    disableFlag: true,
  },
];

export default function UndetectedPeople({ approvalData, approvalReq }) {
  const [list, setList] = useState(rows);
  const [selectedImage, setSelectedImage] = useState(null); // For preview
  const [open, setOpen] = useState(false); // For modal control
  const [openSaveModal, setOpenSaveModal] = useState(false); // For modal control

  const tags = ["Outside", "Employee"];

  const handleClick = (val, status) => {
    console.log("sdcfghjk");

    setOpenSaveModal(true);
  };

  const onTagSelection = (e, row) => {
    const updatedList = list.map((item) => {
      if (item.sNo === row.sNo) {
        return { ...item, tag: e.target.value, disableFlag: false }; // Update the tag for the correct row
      }
      return item; // Return other rows unchanged
    });
    setList(updatedList); // Update the state with the new list
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image for preview
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setOpenSaveModal(false); // Close the modal
  };

  return (
    <Box
      sx={{
        borderRadius: "15px",
        border: "1px solid #0000004D",
        p: 1,
        margin: "10px 0px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          component="span"
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            color: "#00000099",
            margin: "12px 2px",
            fontSize: "1.1rem",
          }}
        >
          Undetected People List
        </Typography>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1B204A" }}>
                <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                  S.No.
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Employee Id
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Identified On
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Identified At
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Tag
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Identification
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((row) => (
                <TableRow key={row.sNo}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    sx={{ padding: 0 }}
                  >
                    {row.sNo}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {row.employeeId}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {row.identifiedOn}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {row.identifiedAt}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={row?.tag}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none", // Remove the default border
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "none", // Remove border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "none", // Remove border when focused
                        },
                        padding: 0,
                      }}
                      onChange={(e) => onTagSelection(e, row)}
                    >
                      {tags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          {tag}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  {/* Image Column */}
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <img
                      src={row.image}
                      alt="Employee"
                      style={{ width: "50px", cursor: "pointer" }}
                      onClick={() => handleImageClick(row.image)} // Open image in modal
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <Tooltip title="Delete" placement="top" arrow>
                      <DeleteIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleClick(row, "deleted")}
                      />
                    </Tooltip>
                    <Tooltip title="Save" placement="top" arrow>
                      <SaveIcon onClick={() => handleClick(row, "rejected")} />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal for Image Preview */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 0,
            borderRadius: 2,
            height: "-webkit-fill-available",
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              style={{ maxWidth: "100%" }}
            />
          )}
        </Box>
      </Modal>

      {/* Modal for Image Save Employee details */}
      <Modal open={openSaveModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            margin: "auto",
            top: "50%",
            left: "50%",
            height: "80%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 0,
            borderRadius: 2,
            padding: 1,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#00000099",
              fontSize: "1.1rem",
              display: "flex",
              borderBottom: "1px solid black",
            }}
          >
            <SaveIcon sx={{ marginRight: 1 }} />
            Save As
          </Typography>
          <input type="text" style={{ width: "100%" }} />
          <Box
            sx={{
              overflowY: "scroll",
              height: "345px",
              padding: "0 40px 0 0",
              marginTop: 1,
            }}
          >
            {EmployeeList.map((el) => {
              return (
                <Box sx={{ marginBottom: "5px" }}>
                  <input type="radio" id={el} name="fav_language" value={el} />
                  <label for={el}>{el}</label>
                  <br />
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#00000099",
              padding: 2,
              textAlign: "center",
              fontSize: "1.1rem",
            }}
          >
            <Button variant="contained" color="error">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
