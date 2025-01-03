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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../Components/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../sharable/Loading";

export default function UndetectedPeople() {
  const [list, setList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For preview
  const [open, setOpen] = useState(false); // For modal control
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { encryptionKey } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;
  const tags = ["VISITOR", "EMPLOYEE"];

  const handleChangePage = (event, newPage) => {
    getData(newPage+1)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
    setPage(0);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getData(page = 1) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/attendance/fetch-unknown-detections?page=${page}`,
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
        toast.error(error?.response?.message);
      }
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
      if (error?.response?.message) {
        toast.error(error?.response?.message);
      }
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
      if (error?.response?.message) {
        toast.error(error?.response?.message);
      }
    }
  }

  const onTagSelection = (e, row) => {
    const updatedList = list?.data.map((item) => {
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
                {(list?.data
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
                    <TableCell align="center" sx={{ padding: 0 }}>
                      <img
                        src={`data:image/jpeg;base64,${row.snapshot}`}
                        alt="Employee"
                        style={{ width: "50px", cursor: "pointer" }}
                        onClick={() =>
                          handleImageClick(
                            `data:image/jpeg;base64,${row.snapshot}`
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ padding: 0 }}>
                      <Tooltip title="Delete" placement="top" arrow>
                        <DeleteIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => deleteUnknown(row)}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={list?.total_count}
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
}
