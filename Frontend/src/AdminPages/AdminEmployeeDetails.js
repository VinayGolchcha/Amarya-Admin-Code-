import React, { useState, useEffect } from "react";
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
  FormControlLabel,
  Checkbox,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";

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

const AdminEmployeeDetails = ({ projects }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDesignation, setSelectedDesignation] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let data = projects;

    // Filter by name
    if (searchText) {
      data = data.filter((item) =>
        item.full_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== "All") {
      data = data.filter(
        (item) =>
          item.project_status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    // Filter by designation
    if (selectedDesignation !== "All") {
      data = data.filter(
        (item) =>
          item.designation?.toLowerCase() ===
          selectedDesignation.toLowerCase()
      );
      console.log("selected data" , selectedDesignation)
      console.log("filtered based on the designation",data)
    }

    setFilteredData(data);
  }, [projects, searchText, selectedStatus, selectedDesignation]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const covertToRespectiveYearAndMonth = (decimalValue) => {
    const years = Math.floor(decimalValue);
    const months = Math.round((decimalValue - years) * 12);
    return `${years} yr ${months} mon`
  }

  return (
    <div style={{margin : "35px 0px"}}>
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
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#00000099",
              margin: "12px 2px",
            }}
            variant="span"
          >
            Employee Details
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#00000099",
              margin: "12px 2px",
            }}
            variant="span"
          >
            Total Employee Count - {filteredData.length}
          </Typography>
          <FormControlLabel
            value="start"
            control={
              <Checkbox
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                onChange={() => setFilterEnabled(!filterEnabled)}
              />
            }
            label="Enable Filter"
            labelPlacement="start"
            sx={{ fontFamily: "Poppins", color: "#FF5151" }}
          />
        </Box>

        {/* Filter Inputs */}
        {filterEnabled && (
          <Box sx={{ display: "flex", gap: 2, my: 2 }}>
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              displayEmpty
              size="small"
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Allocated">Allocated</MenuItem>
              <MenuItem value="Not Yet Allocated">Not Yet Allocated</MenuItem>
            </Select>
            <Select
              value={selectedDesignation}
              onChange={(e) => {
                console.log(e.target.value)
                setSelectedDesignation(e.target.value)}}
              displayEmpty
              size="small"
            >
              <MenuItem value="All">All Designations</MenuItem>
              {
                [...new Set(projects.map(item => item.designation))].map((item) => <MenuItem value={item}>{item}</MenuItem>)
              }
            </Select>
          </Box>
        )}

        {/* Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="employee details table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1B204A" }}>
                <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                  S.No.
                </TableCell>
                <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                  Emp. Id
                </TableCell>
                <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                  Emp. Name
                </TableCell>
                <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                  Designation
                </TableCell>
                <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                  Joining Date
                </TableCell>
                <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                  Experience
                </TableCell>
                <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredData
              ).map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                  <TableCell>{row.emp_id}</TableCell>
                  <TableCell>{row.full_name}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell>{row.joining_date?.split("T")[0]}</TableCell>
                  <TableCell>{covertToRespectiveYearAndMonth(row.experience)}</TableCell>
                  <TableCell>{row.project_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default AdminEmployeeDetails;
