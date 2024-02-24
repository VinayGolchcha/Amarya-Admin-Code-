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
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";

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

const rows = [
  {
    sNo: 1,
    clientName: "LEAVE",
    projectLead: "17 Aug, 2020",
    project: "Diwali Holyday and Outing",
    stats: "Approved",
  },
  {
    sNo: 2,
    clientName: "INVENTORY",
    projectLead: "08 Oct, 2020",
    project: "New Headphones required as old ones are not working",
    stats: "Approved",
  },
  {
    sNo: 3,
    clientName: "TRAINING",
    projectLead: "27 Jun, 2020",
    project: "Request for react native Training",
    stats: "Approved",
  },
  {
    sNo: 4,
    clientName: "LEAVE",
    projectLead: "27 Jun, 2020",
    project: "Brother’s Marriage ",
    stats: "Pending",
  },
  {
    sNo: 5,
    clientName: "INVENTORY",
    projectLead: "23 Jul, 2020",
    project: "Replacement for old keyboard",
    stats: "Rejected",
  },
];

export default function AdminApprovals() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
          margin: "10px",
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
            {" "}
            Approvals
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              sx={{ border: "1px solid black", borderRadius: "9px" }}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
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
                    Request Type
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Subject
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow
                    key={row.sNo}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontFamily: "Open Sans" }}
                    >
                      {row.sNo}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Open Sans" }}>
                      {row.clientName}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Open Sans" }}>
                      {row.projectLead}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Open Sans" }}>
                      {row.project}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontFamily: "Open Sans", minwidth: "119px" }}
                    >
                      {row?.stats === "Approved" && (
                        <>
                          <img src="Images/circle(1).svg" /> {row.stats}
                        </>
                      )}
                      {row?.stats === "Pending" && (
                        <>
                          <span
                            style={{
                              margin: "0px 1px",
                              display: "inline-block",
                              width: "14px",
                              height: "11px",
                              borderRadius: "50px",
                              backgroundColor: "rgb(255, 180, 94)",
                            }}
                          ></span>{" "}
                          {row.stats}
                        </>
                      )}
                      {row?.stats === "Rejected" && (
                        <>
                          <img src="Images/circle.svg" /> {row.stats}
                        </>
                      )}
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: "104px" }}>
                      <FileDownloadDoneIcon sx={{ color: "#b1bacb" }} />
                      <NotInterestedIcon sx={{ color: "#b1bacb" }} />
                      <DeleteOutlineIcon sx={{ color: "#b1bacb" }} />
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter sx={{ boxShadow: "none" }}>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={6}
                    count={rows.length}
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
}
