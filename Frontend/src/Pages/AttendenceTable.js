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
import Loading from "../sharable/Loading";

export default function UndetectedPeople({ listData }) {
  const [list, setList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For preview
  const [open, setOpen] = useState(false); // For modal control
  const [page, setPage] = useState(0);
  const [openSaveModal, setOpenSaveModal] = useState(false); // For modal control
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [time, setTime] = useState("in-time");
  const [employee, setEmployee] = useState("");
  const [employeeData, setEmployeeData] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { encryptionKey } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;

  useEffect(() => {
    setList(listData);
  }, [listData]);

  async function getData() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/attendance/fetch-user-present-attendance`,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      setList(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.message) {
        console.log("error>>>>>>>>>>>", error);
      }
    }
  }
  async function getEmployeeList() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/user/fetch-all-employee-ids`,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      let arr = [];
      response?.data?.data.map((emp) =>
        arr.push({ name: emp.name, id: emp.emp_id })
      );
      if (arr.length > 0) arr.unshift({ name: "None", id: "none" });
      setEmployeeList(arr);
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.message) {
        console.log("error>>>>>>>>>>>", error);
      }
    }
  }

  function formatDate(date) {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JS
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
  async function updateEmployeeList() {
    try {
      setIsLoading(true);
      let date = formatDate(new Date(employeeData?.in_time));
      let body = {
        markedEmpId: employeeData?.emp_id,
        missedEmpId: employee,
        updateType: time,
        date: date,
      };
      await axios.put(
        `${apiUrl}/attendance/update-missmatched-attendance`,
        body,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      setIsLoading(false);
    } catch (error) {
      console.log("error>>>>>>>>>>>", error);
    }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const EditRowData = (e) => {
    setEmployeeData(e);
    getEmployeeList();
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

  if (isLoading) {
    return <Loading />;
  } else {
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
              onClick={getData}
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
                  <TableRow key={i}>
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
                        <EditIcon onClick={() => EditRowData(row)} />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={list?.length}
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
                onChange={(e) => setTime(e.target.value)}
                sx={{ minWidth: 120 }}
              >
                {[
                  { name: "In Time", value: "in-time" },
                  { name: "Out Time", value: "out-time" },
                ]?.map((time) => (
                  <MenuItem value={time.value}>{time.name}</MenuItem>
                ))}
              </Select>
              <Select
                labelId="demo-simple-select-label"
                value={employee}
                id="demo-simple-select"
                sx={{ minWidth: 120 }}
                onChange={(e) => setEmployee(e.target.value)}
              >
                {employeeList?.map((emp) => {
                  return <MenuItem value={emp.id}>{emp.name}</MenuItem>;
                })}
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
              <Button
                variant="contained"
                color="error"
                onClick={updateEmployeeList}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
}
