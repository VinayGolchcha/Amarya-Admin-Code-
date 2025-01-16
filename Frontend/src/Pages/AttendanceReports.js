import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Tooltip,
  Grid,
  TextField,
} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import AssignmentReturnedOutlinedIcon from "@mui/icons-material/AssignmentReturnedOutlined";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import EmployeeAttendenceModal from "./EmployeeAttendanceModal";
import { useAuth } from "../Components/AuthContext";
import axios from "axios";
import Loading from "../sharable/Loading";

const AttendanceReports = React.memo(() => {
  const [page, setPage] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [empId, setEmpId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);
  const { encryptionKey } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;

  useEffect(() => {
    refreshGrid(month, year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, encryptionKey, month, year]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let fullData = data;

    if (searchText) {
      fullData = filteredItems.filter((item) =>
        item.emp_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredItems(fullData);
  }, [searchText]);

  const getWeeklyPresentCount = async (start, end) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/attendance/get-all-attendance-summary?startDate=${start}&endDate=${end}`,
        { headers: { "x-encryption-key": encryptionKey } }
      );
      setFilteredItems(response?.data?.data);
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.message) {
        toast.error(error?.response?.message);
      }
    }
  };

  const downloadReport = async (selectMonth, selectYear) => {
    const selectedMonth = selectMonth >= 10 ? selectMonth : `0${selectMonth}`;
    const endDate = `${selectYear}-${selectedMonth}-${getDaysInMonth(
      selectYear,
      selectMonth
    )}`;
    const startDate = `${selectYear}-${selectedMonth}-01`;

    try {
      setIsLoading(true);
      const response = await axios({
        url: `${apiUrl}/attendance/get-all-attendance-summary-excel?startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          "x-encryption-key": encryptionKey,
        },
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `report_${selectedMonth}_${selectYear}.xlsx`;
      link.click();
      setIsLoading(false);
    } catch (error) {
      toast.error(
        error?.response?.message || "Error downloading the Excel file"
      );
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    name: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));

  const refreshGrid = (selectMonth, selectYear) => {
    const selectedMonth = selectMonth >= 10 ? selectMonth : `0${selectMonth}`;
    const endDate = `${selectYear}-${selectedMonth}-${getDaysInMonth(
      selectYear,
      selectMonth
    )}`;
    const startDate = `${selectYear}-${selectedMonth}-01`;
    getWeeklyPresentCount(startDate, endDate);
  };

  const getYearList = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear - i).map((yr) => (
      <MenuItem key={yr} value={yr}>
        {yr}
      </MenuItem>
    ));
  };

  const handleOpen = (row) => {
    setEmpId(row?.emp_id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const onSearch = (value) => {
    console.log(filteredItems);
  };

  const handleMonthChange = (event) => setMonth(event.target.value);

  const handleYearChange = (event) => setYear(event.target.value);

  if (isLoading) {
    return <Loading />;
  } else {
    return (<div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <h1>kkkkkkkkkkkk</h1> */}
          <EmployeeAttendenceModal month={month} year={year} empId={empId} />
        </Modal>
      <Grid>
        <Box sx={{ textAlign: "end" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            onChange={handleMonthChange}
            sx={{ minWidth: 120 }}
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={year}
            onChange={handleYearChange}
            sx={{ minWidth: 120 }}
          >
            {getYearList()}
          </Select>
        </Box>
        <Box
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.30)",
            width: "auto",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              sx={{
                margin: "10px",
                color: "#161E54",
              }}
            >
              Employees List
            </Typography>
            <Typography
              variant="h6"
              sx={{
                margin: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <input
                type="text"
                placeholder="search here..."
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
                onChange={(e) => onSearch(e.target.value)}
              /> */}
              <TextField
                label="Search by Name"
                variant="outlined"
                size="small"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                sx={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  backgroundColor: "#b9b9b9",
                  color: "#181d60",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
                onClick={() => downloadReport(month, year)}
              >
                Download Report
                <FileDownloadOutlinedIcon
                  sx={{
                    marginLeft: "5px",
                    backgroundColor: "#181d60",
                    color: "white",
                    borderRadius: "50%",
                  }}
                />
              </Button>
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1B204A" }}>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt", padding: 1 }}
                  >
                    S.No.
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt", padding: 1 }}
                  >
                    Employee Id
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt", padding: 1 }}
                  >
                    Employee Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt", padding: 1 }}
                  >
                    Working Days
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt", padding: 1 }}
                  >
                    Prasent Days
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt", padding: 1 }}
                  >
                    Absent Days
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt", padding: 1 }}
                  >
                    Preview
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredItems?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredItems
                )?.map((row, i) => (
                  <TableRow key={i + 1}>
                    <TableCell
                      sx={{ padding: 0 }}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell sx={{ padding: 0 }} align="center">
                      {row.emp_id}
                    </TableCell>
                    <TableCell sx={{ padding: 0 }} align="center">
                      {row.emp_name}
                    </TableCell>
                    <TableCell sx={{ padding: 0 }} align="center">
                      {row.total_working_days}
                    </TableCell>
                    <TableCell sx={{ padding: 0 }} align="center">
                      {row.no_present_days}
                    </TableCell>
                    <TableCell sx={{ padding: 0 }} align="center">
                      {row.no_absent_days}
                    </TableCell>
                    <TableCell sx={{ padding: 0 }} align="center">
                      <Tooltip title="Preview" placement="top" arrow>
                        <AssignmentReturnedOutlinedIcon
                          sx={{ cursor: "pointer", color: "#7E8BE4" }}
                          onClick={() => handleOpen(row)}
                        />
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
            count={filteredItems?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Grid>
      </div>
    );
  }
});

export default AttendanceReports;
