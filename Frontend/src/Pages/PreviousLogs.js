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
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SaveIcon from "@mui/icons-material/Save";
import TablePagination from "@mui/material/TablePagination";

const rows = [
  {
    sNo: 1,
    employeeId: "AM45656",
    employeeName: "Ankit koshta",
    date: "17-09-2020",
    time: "11:34:54 AM",
    image: "./Images/attendance/prashant.jpg",
    mode: "In",
  },
  {
    sNo: 2,
    employeeId: "AM45656",
    employeeName: "Ankit koshta",
    date: "17-09-2020",
    time: "11:34:54 AM",
    image: "./Images/attendance/prashant.jpg",
    mode: "Out",
  },
  {
    sNo: 3,
    employeeId: "AM45656",
    employeeName: "Ankit koshta",
    date: "17-09-2020",
    time: "11:34:54 AM",
    image: "./Images/attendance/prashant.jpg",
    mode: "In",
  },
  {
    sNo: 4,
    employeeId: "AM45656",
    employeeName: "Ankit koshta",
    date: "17-09-2020",
    time: "11:34:54 AM",
    image: "./Images/attendance/prashant.jpg",
    mode: "Out",
  },
  {
    sNo: 5,
    employeeId: "AM45656",
    employeeName: "Ankit koshta",
    date: "17-09-2020",
    time: "11:34:54 AM",
    image: "./Images/attendance/prashant.jpg",
    mode: "In",
  },
  {
    sNo: 6,
    employeeId: "AM45656",
    employeeName: "Ankit koshta",
    date: "17-09-2020",
    time: "11:34:54 AM",
    image: "./Images/attendance/prashant.jpg",
    mode: "Out",
  },
];

export default function UndetectedPeople({ approvalData, approvalReq }) {
  const [list, setList] = useState(rows);
  const [selectedImage, setSelectedImage] = useState(null); // For preview
  const [open, setOpen] = useState(false); // For modal control
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image for preview
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
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
          variant="h5"
          sx={{
            margin: "10px",
            font: {
              lg: "normal normal 400 22px/28px Poppins",
              md: "normal normal 400 22px/28px Poppins",
              sm: "normal normal 400 16px/22px Poppins",
              xs: "normal normal 400 16px/22px Poppins",
            },
            color: "#161E54",
          }}
        >
          Employees List
        </Typography>
        <Box
          sx={{
            margin: "10px",
            display: "flex",
            width: { sm: "50%" },
            justifyContent: "end",
          }}
        >
          <input
            type="text"
            placeholder="search here..."
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid black",
              width: { lg: "50%", md: "60%", sm: "100%" },
            }}
          />
          <RefreshOutlinedIcon
            sx={{
              marginLeft: "5px",
              cursor: "pointer",
              backgroundColor: "#181d60",
              color: "white",
              borderRadius: "50%",
            }}
          />
        </Box>
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
                  Employee Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Mode
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Time
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Detection
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
                    {row.employeeName}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {row.date}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {row.mode}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {row.time}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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

    </Box>
  );
}
