import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SaveIcon from "@mui/icons-material/Save";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { useAuth } from "../Components/AuthContext";

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

export default function PreviousLogs() {
  const { date } = useParams();
  const [list, setList] = useState(rows);
  const [selectedImage, setSelectedImage] = useState(null); // For preview
  const [open, setOpen] = useState(false); // For modal control
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { encryptionKey } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `${apiUrl}/attendance/get-user-attendance-date?date=${date}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key": encryptionKey,
            },
          }
        );
        setList(response?.data?.data);
      } catch (error) {
        if (error?.response?.message) {
        }
      }
    }
    getData();
  }, []);

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
                  In Time
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  In Detection
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Out Time
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                >
                  Out Detection
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
              {list?.map((row, i) => (
                <TableRow key={row.sNo}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    sx={{ padding: 0 }}
                  >
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {row.emp_id}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {row.emp_name}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {`${new Date(row.date).getDate()}/${
                      new Date(row.date).getMonth() + 1
                    }/${new Date(row.date).getFullYear()}`}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {new Date(row.in_time).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true, // This enables 12-hour format with AM/PM
                    })}
                  </TableCell>
                  {/* Image Column */}
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <img
                      src={`data:image/jpeg;base64,${row.in_snapshot}`}
                      alt="Employee"
                      style={{ width: "50px", cursor: "pointer" }}
                      onClick={() =>
                        handleImageClick(
                          `data:image/jpeg;base64,${row.in_snapshot}`
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {new Date(row.out_time).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true, // This enables 12-hour format with AM/PM
                    })}
                  </TableCell>
                  {/* Image Column */}
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <img
                      src={`data:image/jpeg;base64,${row.out_snapshot}`}
                      alt="Employee"
                      style={{ width: "50px", cursor: "pointer" }}
                      onClick={() =>
                        handleImageClick(
                          `data:image/jpeg;base64,${row.out_snapshot}`
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}></TableCell>
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
