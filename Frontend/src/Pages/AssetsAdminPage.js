import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditDeleteIcons from "../Components/EditDeleteIcons";
import AddEditModal from "../Components/AddEditModal";
import AddNewAssets from "../Components/AddNewAsset";
import { ToastContainer } from "react-toastify";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
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
        onClick={handleNextButtonClick}
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
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
//hiii boss

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  inId,
  dop,
  photo,
  assingnee,
  item,
  description,
  issued_From,
  issued_Till,
  repairs,
  in_Warranty,
  warranty_End
) {
  return {
    inId,
    dop,
    photo,
    assingnee,
    item,
    description,
    issued_From,
    issued_Till,
    repairs,
    in_Warranty,
    warranty_End,
  };
}

const rows = [
  createData(
    "AM1211",
    "1st Jan ‘21",
    "laptop",
    "Sanjana Jain",
    "Laptop",
    "Your text here",
    "1st Jan ‘21",
    "Present",
    "1-time",
    "YES",
    "14th Dec ‘23"
  ),
  createData(
    "AM1201",
    "14th Jan ‘21",
    "laptop",
    "Shubham Soni",
    "Charger",
    "Your text here",
    " 14th Jan ‘21",
    "Present",
    "2-time",
    "No",
    "15th Jan ‘23"
  ),
  createData(
    "AM1222",
    "24th Jul ‘21",
    "laptop",
    "Harshal Tiwari",
    "Headphone",
    "Your text here",
    "24th Jul ‘21",
    "Present",
    "0-time",
    "YES",
    "24th Feb ‘23"
  ),
  createData(
    "AM1277",
    "10th Jun ‘21",
    "laptop",
    "Tizil Nema",
    "Keyboard",
    "Your text here",
    "10th Jun ‘21",
    "18th Aug’23",
    "1-time",
    "No",
    "14th Dec ‘23"
  ),
  createData(
    "AM1220",
    "15th Dec ‘21",
    "laptop",
    "Kishan Chourasiya",
    "Mouse",
    "Your text here",
    "1st Jan ‘21",
    "Present",
    "1-time",
    "YES",
    "14th Dec ‘23"
  ),
  createData(
    "AM1266",
    "20th Aug ‘21",
    "laptop",
    "Prabhat Gupta",
    "Stand",
    "Your text here",
    "1st Jan ‘21",
    "Present",
    "1-time",
    "YES",
    "14th Dec ‘23"
  ),
];
let row;
export default function AssetsAdminPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [assetsData, setAssetsData] = React.useState(rows);
  const [isAdd, setIsAdd] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const checkedvalue = assetsData.map((user) => {
        return { ...user, isChecked: checked };
      });
      setAssetsData(checkedvalue);
      setSelectedRows(checkedvalue.filter((item) => item?.isChecked === true));
    } else {
      const checkedvalue = assetsData.map((user) =>
        user.inId === name ? { ...user, isChecked: checked } : user
      );
      setAssetsData(checkedvalue);
      setSelectedRows(checkedvalue.filter((item) => item?.isChecked === true));
    }
  };
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleDelete() {
    const updatedItems = assetsData.filter((item) => item?.isChecked !== true);
    setAssetsData(updatedItems);
  }

  const renderItemImage = (type) => {
    let imageUrl;
    if (type === "Laptop") {
      imageUrl = "images/Laptop.png";
    } else if (type === "Mouse") {
      imageUrl = "images/Mouse.png";
    } else if (type === "Stand") {
      imageUrl = "images/Stand.png";
    } else if (type === "Keyboard") {
      imageUrl = "images/keyboard.png";
    } else if (type === "Headphone") {
      imageUrl = "images/Headphone.png";
    } else if (type === "Charger") {
      imageUrl = "images/Charger.png";
    }
    return <img src={imageUrl} />;
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            margin: "12px 0px",
            width: "630px",
            height: "42px",
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "42px",
            color: "#121843",
          }}
        >
          Assets
        </Typography>
        <Box sx={{ boxSizing: "border-box" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1B204A" }}>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="allselect"
                      checked={
                        !assetsData.some((user) => user?.isChecked !== true)
                      }
                      style={{ height: "40px", width: "20px" }}
                      onChange={handleChange}
                    />
                    <br />
                    Invt. Id{" "}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      padding: "8px",
                    }}
                  >
                    D.O.P
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      padding: "8px",
                    }}
                  >
                    Photo
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      padding: "8px",
                    }}
                  >
                    Assignee
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      padding: "8px",
                    }}
                  >
                    Item
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      padding: "8px",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      padding: "8px",
                    }}
                  >
                    Issued From
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      padding: "8px",
                    }}
                  >
                    Issued Till
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      padding: "8px",
                    }}
                  >
                    In Warranty
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins",
                      padding: "8px",
                    }}
                  >
                    End of warranty
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? assetsData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : assetsData
                ).map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ fontFamily: "Poppins" }}
                    >
                      {/* <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                        alt="Check"
                        style={{ filter: "invert(1)" }}
                      /> */}
                      <input
                        type="checkbox"
                        name={row.inId}
                        checked={row?.isChecked || false}
                        onChange={handleChange}
                        style={{ height: "40px", width: "20px" }}
                      />
                      <br />
                      {row.inId}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: "Poppins", padding: "8px" }}
                    >
                      {row.dop}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: "Poppins", padding: "8px" }}
                    >
                      {renderItemImage(row.item)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: "Poppins", padding: "8px" }}
                    >
                      {row.assingnee}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: "Poppins", padding: "8px" }}
                    >
                      {row.item}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: "Poppins", padding: "8px" }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: "Poppins", padding: "8px" }}
                    >
                      {row.issued_From}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: "Poppins", padding: "8px" }}
                    >
                      {row.issued_Till}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: "Poppins", padding: "8px" }}
                    >
                      {row.in_Warranty}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: "Poppins", padding: "8px" }}
                    >
                      {row.warranty_End}
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={12} style={{ borderBottom: "none" }} />
                  </TableRow>
                )}
              </TableBody>
              <TableRow>
                <TableCell colSpan={12} sx={{ textAlign: "center" }}>
                  {/* <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/Add_ring_duotone.png`}
                    alt="add"
                    onClick={handleOpen}
                  /> */}
                  <AddOutlinedIcon
                    onClick={handleOpen}
                    color="action"
                    sx={{
                      borderRadius: "50px",
                      backgroundColor: "rgb(222, 225, 231)",
                      width: "30px",
                      height: "30px",
                      margin: "0px 2px",
                      padding: "4px",
                    }}
                  />
                  <AddNewAssets
                    assetsData={assetsData}
                    handleAdd={setAssetsData}
                    handleClose={handleClose}
                    open={open}
                  />
                  <EditDeleteIcons
                    deleteAction={handleDelete}
                    rows={selectedRows}
                  />
                </TableCell>
              </TableRow>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={12}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
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
      <ToastContainer />
    </>
  );
}
