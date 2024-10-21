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
  TablePagination,
  IconButton,
  TableFooter,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import { useAuth } from "../Components/AuthContext";
import axios from "axios";
import Loading from "../sharable/Loading";
import { useTheme } from "@emotion/react";

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

export default function UndetectedPeople({ approvalData, approvalReq }) {
  const [list, setList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For preview
  const [open, setOpen] = useState(false); // For modal control
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { encryptionKey } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;
  const tags = ["OUTSIDER", "EMPLOYEE"];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
    setPage(0);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image for preview
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getData() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/attendance/fetch-unknown-detections`,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      setList(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error>>>>>>>>>>>", error);
    }
  }

  async function deleteUnknown(row) {
    try {
      setIsLoading(true);
      await axios.delete(
        `${apiUrl}/attendance/delete-unknown-detection/${row?.id}`,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      await getData();
      setIsLoading(false);
    } catch (error) {
      console.log("error>>>>>>>>>>>", error);
    }
  }

  async function saveUnknown(row) {
    try {
      setIsLoading(true);
      let body = {
        tag: row.tag,
      };
      await axios.put(
        `${apiUrl}/attendance/update-unknown-detection/${row?.id}`,
        body,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      await getData();
      setIsLoading(false);
    } catch (error) {
      console.log("error>>>>>>>>>>>", error);
    }
  }

  const onTagSelection = (e, row) => {
    const updatedList = list.map((item) => {
      if (item.id === row.id) {
        saveUnknown({ ...item, tag: e.target.value });
        return { ...item, tag: e.target.value };
      }
      return item;
    });
    setList(updatedList);
  };

  useEffect(() => {
    getData();
  }, [encryptionKey, apiUrl]);

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
            component="span"
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#00000099",
              margin: "12px 2px",
              fontSize: "1.1rem",
            }}
          >
            Undetected People List
          </Typography>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1B204A" }}>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    S.No.
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Identified On
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Identified At
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Tag
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Identification
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
                {(rowsPerPage > 0
                  ? list?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : list
                )?.map((row, i) => (
                  <TableRow key={i + 1}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ padding: 0 }}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: 0 }}>
                      {`${new Date(row.created_at).getDate()}/${
                        new Date(row.created_at).getMonth() + 1
                      }/${new Date(row.created_at).getFullYear()}`}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: 0 }}>
                      {new Date(row.created_at).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true, // This enables 12-hour format with AM/PM
                      })}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: 0 }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={row?.tag}
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none", // Remove the default border
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none", // Remove border on hover
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none", // Remove border when focused
                          },
                          padding: 0,
                        }}
                        onChange={(e) => onTagSelection(e, row)}
                      >
                        {tags.map((tag) => {
                          return (
                            <MenuItem key={tag} value={tag}>
                              {tag}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    {/* Image Column */}
                    <TableCell align="center" sx={{ padding: 0 }}>
                      <img
                        src={`data:image/jpeg;base64,${row.snapshot}`}
                        alt="Employee"
                        style={{ width: "50px", cursor: "pointer" }}
                        onClick={() =>
                          handleImageClick(
                            `data:image/jpeg;base64,${row.snapshot}`
                          )
                        } // Open image in modal
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ padding: 0 }}>
                      <Tooltip title="Delete" placement="top" arrow>
                        <DeleteIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => deleteUnknown(row)}
                        />
                      </Tooltip>
                      {/* <Tooltip title="Save" placement="top" arrow>
                        <SaveIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => saveUnknown(row)}
                        />
                      </Tooltip> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter sx={{ boxShadow: "none" }}>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={6}
                    count={list?.length}
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
        {/* <Modal open={openSaveModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            margin: "auto",
            top: "50%",
            left: "50%",
            height: "80%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 0,
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
          <input type="text" style={{ width: "100%" }} />
          <Box
            sx={{
              overflowY: "scroll",
              height: "345px",
              padding: "0 40px 0 0",
              marginTop: 1,
            }}
          >
            {EmployeeList.map((el) => {
              return (
                <Box sx={{ marginBottom: "5px" }}>
                  <input type="radio" id={el} name="fav_language" value={el} />
                  <label for={el}>{el}</label>
                  <br />
                </Box>
              );
            })}
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
      </Modal> */}
      </Box>
    );
  }
}