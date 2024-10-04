import React, { useState, useEffect } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { useAuth } from "../Components/AuthContext";

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
  "Ankit Soni",
  "Ankit koshta",
  "Prashant Panday",
  "Sanjana",
  "Ankit Soni",
  "Ankit koshta",
  "Prashant Panday",
  "Sanjana",
  "Ankit Soni",
  "Ankit koshta",
  "Prashant Panday",
  "Sanjana",
];

export default function UndetectedPeople() {
  const [list, setList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For preview
  const [open, setOpen] = useState(false); // For modal control
  const [page, setPage] = useState(0);
  const [openSaveModal, setOpenSaveModal] = useState(false); // For modal control
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [time, setTime] = useState("In Time");
  const [employee, setEmployee] = useState("");
  const { encryptionKey } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `${apiUrl}/attendance/fetch-user-present-attendance`,
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
    async function getWeeklyPresentCount() {
      try {
        const response = await axios.get(
          `${apiUrl}/attendance/fetch-weekly-present-count`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key": encryptionKey,
            },
          }
        );
        // setList(response?.data?.data);
      } catch (error) {
        if (error?.response?.message) {
        }
      }
    }
    async function getEmployeePersent() {
      try {
        const response = await axios.get(
          `${apiUrl}/attendance/get-user-attendance-percentage?date=2024-09-27`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key": encryptionKey,
            },
          }
        );
        // setList(response?.data?.data);
      } catch (error) {
        if (error?.response?.message) {
        }
      }
    }
    const fetchData = async () => {
      await Promise.all([
        getData(),
        getWeeklyPresentCount(),
        getEmployeePersent(),
      ]);
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const EditRowData = () => {
    setOpenSaveModal(true);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSaveModal(false);
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
                  Detection
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
              {list?.map((row, i) => (
                // number++
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
                    {row.employeeName}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {`${new Date(row.in_time).getDate()}/${
                      new Date(row.in_time).getMonth() + 1
                    }/${new Date(row.in_time).getFullYear()}`}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    {new Date(row.in_time).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true, // This enables 12-hour format with AM/PM
                    })}
                  </TableCell>
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
                      hour12: true,
                    })}
                  </TableCell>
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
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <Tooltip title="Save" placement="top" arrow>
                      <EditIcon onClick={() => EditRowData(row, "rejected")} />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={list.length}
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

      {/* Modal for Image Save Employee details */}
      <Modal open={openSaveModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            margin: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
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
          <Box sx={{ marginTop: 1 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={time}
              sx={{ minWidth: 120 }}
            >
              {["In Time", "Out Time"].map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
            <Select
              labelId="demo-simple-select-label"
              value={employee}
              id="demo-simple-select"
              sx={{ minWidth: 120 }}
            >
              {EmployeeList.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
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
