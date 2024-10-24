import React, { useState } from "react";
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
} from "@mui/material";
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

const rows = [
  {
    sNo: 1,
    clientName: "ISUZU",
    projectLead: "Vinay Sir",
    project: "SAP - Admin",
    stats: "Delivered",
  },
  {
    sNo: 2,
    clientName: "Infrabeat",
    projectLead: "Vinay Sir",
    project: "SAP - HANA",
    stats: "In Progress",
  },
  {
    sNo: 3,
    clientName: "Shephertz",
    projectLead: "Vinay Sir",
    project: "React And Node JS",
    stats: "Delivered",
  },
  {
    sNo: 4,
    clientName: "SAP-Germany",
    projectLead: "Vinay Sir",
    project: "SAP - HR",
    stats: "In Progress",
  },
  {
    sNo: 5,
    clientName: "Kunal Sir",
    projectLead: "Vinay Sir",
    project: "Flutter and PHP",
    stats: "In Progress",
  },
];

const AdminEmployeeDetails = ({projects}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const covertToRespectiveYearAndMonth = (decimalValue) => {
    const years = Math.floor(decimalValue);
    const months = Math.round((decimalValue - years) * 12);
    return `${years}.${months}`
  }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
      <Box
        sx={{
          borderRadius: "15px",
          border: "1px solid #0000004D",
          p: 1,
          margin: "10px 0px",
        }}
      >
        <Box sx={{display : "flex" , justifyContent : "space-between"}}>
            <Typography
                sx={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    color: "#00000099",
                    margin: "12px 2px",
                }}
                variant="span"
                >
            {   " "}
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
            {   " "}
                Total Employee Count - {projects.length}
            </Typography>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1B204A" }}>
                  <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                    S.No.{" "}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Emp. Id
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Emp. Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Designation
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Joining date
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Experience
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? projects?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : projects
                )?.map((row , i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontFamily: "Poppins" }}
                    >
                      {page * rowsPerPage+i+1}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
                      {row.emp_id}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
                      {row.full_name}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
                      {row.designation}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
                      {row?.joining_date?.split("T")[0]}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
                      {covertToRespectiveYearAndMonth(row.experience)}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
                        {row.project_status}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: projects?.length },
                    ]}
                    colSpan={6}
                    count={projects?.length}
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
        </Box>
      </Box>
    </div>
  );
};

export default AdminEmployeeDetails;
