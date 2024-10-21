import React, { useEffect, useRef, useState } from "react";
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
  TableFooter,
  TablePagination,
  IconButton,
  TextField,
  Tooltip,
  Grid,
} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EmployeeAttendenceHomePage from "./EmployeeAttendenceHome";
import MenuItem from "@mui/material/MenuItem";
import AssignmentReturnedOutlinedIcon from "@mui/icons-material/AssignmentReturnedOutlined";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EmployeeAttendenceModal from "./EmployeeAttendanceModal";
import { useAuth } from "../Components/AuthContext";
import axios from "axios";
import Loading from "../sharable/Loading";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleClick = (newPage) => {
    onPageChange(null, newPage);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={() => handleClick(0)}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={() => handleClick(page - 1)}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={() => handleClick(page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={() =>
          handleClick(Math.max(0, Math.ceil(count / rowsPerPage) - 1))
        }
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function AttendanceReports() {
  const [page, setPage] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);
  const { encryptionKey } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;

  useEffect(() => {
    refreshGrid(month, year);
  }, [apiUrl, encryptionKey]);

  async function getWeeklyPresentCount(start, end) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/attendance/get-all-attendance-summary?startDate=${start}&endDate=${end}`,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      setFilteredItems(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.message) {
      }
    }
  }

  function formatDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JS
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  async function downloadReport(selectMonth, selectYear) {
    let selectedMonth = selectMonth >= 10 ? selectMonth : `0${selectMonth}`;
    let endDate = `${selectYear}-${selectedMonth}-${getDaysInMonth(
      year,
      selectMonth
    )}`;
    let startDate = `${selectYear}-${selectedMonth}-01`;
    try {
      setIsLoading(true);
      let date = formatDate();
      const response = await axios({
        url: `${apiUrl}/attendance/get-all-attendance-summary-excel?startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
        responseType: "blob", // Important to get the response as a blob
        headers: {
          "Content-Type": "application/json",
          "x-encryption-key": encryptionKey,
        },
      });

      // Create a URL for the file and download it
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `report_${date}.xlsx`; // The filename you want to save as
      link.click();
      setIsLoading(false);
    } catch (error) {
      console.error("Error downloading the Excel file", error);
    }
  }

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const months = [
    { value: "1", name: "January" },
    { value: "2", name: "February" },
    { value: "3", name: "March" },
    { value: "4", name: "April" },
    { value: "5", name: "May" },
    { value: "6", name: "June" },
    { value: "7", name: "July" },
    { value: "8", name: "August" },
    { value: "9", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" },
  ];

  const refreshGrid = (selectMonth, selectYear) => {
    let selectedMonth = selectMonth >= 10 ? selectMonth : `0${selectMonth}`;
    let endDate = `${selectYear}-${selectedMonth}-${getDaysInMonth(
      year,
      selectMonth
    )}`;
    let startDate = `${selectYear}-${selectedMonth}-01`;
    getWeeklyPresentCount(startDate, endDate);
  };

  const getYearList = () => {
    const startYear = new Date().getFullYear() - 4; // Adjust this range as needed
    const endYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years.map((year) => (
      <MenuItem key={year} value={year}>
        {year}
      </MenuItem>
    ));
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    refreshGrid(event.target.value, year);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
    refreshGrid(month, event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <EmployeeAttendenceModal />
        </Modal>
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
        <Paper
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
              <input
                type="text"
                placeholder="search here..."
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
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
                      <Tooltip title="Save" placement="top" arrow>
                        <AssignmentReturnedOutlinedIcon
                          sx={{ cursor: "pointer", color: "#7E8BE4" }}
                          onClick={() => handleOpen()}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter sx={{ boxShadow: "none" }}>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    colSpan={6}
                    count={filteredItems?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    );
  }
}