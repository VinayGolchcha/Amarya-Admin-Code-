import React, { useEffect, useRef, useState } from "react";
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
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import React, { useState, useEffect } from "react";
import axios from "axios";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditDeleteIcons from "../Components/EditDeleteIcons";
import AddEditModal from "../Components/AddEditModal";
import AddNewAssets from "../Components/AddNewAsset";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";
import ConfirmDelete from "../Components/ConfirmDelete";
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
  assignee,
  item,
  description,
  issued_From,
  issued_Till,
  repairs,
  in_Warranty,
  warranty_End,
  public_id ,// Add this parameter
  model
) {
  return {
    inId,
    dop,
    photo,
    assignee,
    item,
    description,
    issued_From,
    issued_Till,
    repairs,
    in_Warranty,
    warranty_End,
    public_id, // Ensure it's included in the returned object,
    model
  };
}

const rows = [];
let row;
export default function PendingAssests({ item }) {
  const [openConDel, setOpenConDel] = React.useState(false);
  const [id, setId] = React.useState(null);

  const handleCloseConDel = () => setOpenConDel(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [assetsData, setAssetsData] = React.useState(rows);
  const [isAdd, setIsAdd] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user, encryptionKey } = useAuth();
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly
  const [isApiHit, setIsApiHit] = React.useState(false);

  const handleOpenConDel = () => {
    if (selectedRows.length === 0) {
      toast.warning("Please select the row to delete");
    } else if (selectedRows.length > 1) {
      toast.warning("Can not delete the multiple rows");
      const checkedvalue = assetsData.map((user) => {
        return { ...user, isChecked: false };
      });
      setAssetsData(checkedvalue);
      setSelectedRows(checkedvalue.filter((item) => item?.isChecked === true));
    } else {
      setOpenConDel(true);
    }
  };
  const fetchAssets = async (itemParam) => {
    try {
      const response = await axios.get(
        `${apiUrl}/approval/admin/fetch-unassigned-asset-item?item=${itemParam}&asset_type=hardware`,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      if (response.data.success) {
        const apiAssets = response?.data?.data?.map((asset) => {
          return createData(
            asset.asset_id,
            new Date(asset.purchase_date).toLocaleDateString(),
            asset.image_url, // Use the correct field for the image URL
            asset.assignee ? asset.assignee : "-",
            asset.item,
            asset.item_description,
            asset.issued_from
              ? new Date(asset.issued_from).toLocaleDateString()
              : "-",
            asset.issued_till
              ? new Date(asset.issued_till).toLocaleDateString()
              : "-",
            null, // You need to fetch this value from the API or set it accordingly
            asset.warranty_period > 0 ? "YES" : "NO",
            asset.warranty_period
              ? new Date(
                  new Date(asset.purchase_date).setFullYear(
                    new Date(asset.purchase_date).getFullYear() +
                      asset.warranty_period
                  )
                ).toLocaleDateString()
              : null,
            asset.public_id,// Include public_id
            asset?.model_number
          );
        });
        setAssetsData(apiAssets);
      } else {
        console.error("Error fetching assets:", response.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    if (!item) {
      toast.error("No item type specified");
      setIsLoading(false);
      return;
    }
    fetchAssets(item);
  }, [item]);

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
      const delSelecedRows = checkedvalue.filter(
        (item) => item?.isChecked === true
      );
      const selectedIds = delSelecedRows.map((row) => row.inId);
      setId(selectedIds[0]);
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

  function handleDelete(id) {
    // Filter out the rows that are selected for deletion
    // const selectedIds = selectedRows.map((row) => row.inId);
    // console.log(selectedIds[0]);
    axios
      .delete(`${apiUrl}/asset/admin/delete-asset/${id}`, {
        headers: {
          "x-encryption-key": encryptionKey,
        },
      })
      .then((response) => {
        if (response.data.success) {
          fetchAssets();
          setSelectedRows([]);
          fetchAssets();
          handleCloseConDel();
          toast.success("Selected asset deleted successfully");
        } else {
          const errorMessage =
            response.data.message ||
            "An error occurred while deleting the asset";
          toast.error(errorMessage);
        }
      })
      .catch((error) => {
        console.error("Error deleting asset:", error);
        toast.error("An error occurred while deleting the asset");
        handleCloseConDel();
      });

    // const updatedItems = assetsData.filter((item) => item?.isChecked !== true);
    // setAssetsData(updatedItems);
  }

  const renderItemImage = (photoUrl) => {
    // console.log(photoUrl);
    return (
      <img
        src={photoUrl}
        alt="Asset"
        style={{ width: "50px", height: "50px" }}
      />
    );
  };
  if (isLoading) {
    return <Loading />;
  } else {
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
          <ConfirmDelete
            open={openConDel}
            handleClose={handleCloseConDel}
            handleIncomeDelete={handleDelete}
            id={id}
          />

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
                      Asset Id{" "}
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
                      Model Number
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assetsData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        align="center"
                        sx={{ fontFamily: "Poppins", padding: "16px" }}
                      >
                        This asset is no more available
                      </TableCell>
                    </TableRow>
                  ) : (
                    (rowsPerPage > 0
                      ? assetsData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : assetsData
                    ).map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ fontFamily: "Poppins" }}
                        >
                          {row.inId}
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
                          {row.model}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: assetsData?.length },
                      ]}
                      colSpan={12}
                      count={assetsData?.length}
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
}
