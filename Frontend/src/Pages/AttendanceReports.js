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
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EmployeeAttendenceHomePage from './EmployeeAttendenceHome';
import MenuItem from '@mui/material/MenuItem';
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
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
        employeeId: "AM45656",
        employeeName: "Ankit koshta",
        workingDays: "24",
        prasentDays: "18",
        absentDays: "6"
    }, {
        sNo: 2,
        employeeId: "AM45656",
        employeeName: "Ankit koshta",
        workingDays: "24",
        prasentDays: "18",
        absentDays: "6"
    }, {
        sNo: 3,
        employeeId: "AM45656",
        employeeName: "Ankit koshta",
        workingDays: "24",
        prasentDays: "18",
        absentDays: "6"
    }, {
        sNo: 4,
        employeeId: "AM45656",
        employeeName: "Ankit koshta",
        workingDays: "24",
        prasentDays: "18",
        absentDays: "6"
    },
];

export default function AttendanceReports() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [filteredItems, setFilteredItems] = useState(rows);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [foreignId, setForeignId] = useState("");
    const [month, setMonth] = React.useState('01');

    useEffect(() => {
        // if (search) {
        //     setFilteredItems(
        //         approvalData.filter((item) =>
        //             item?.request_type?.toLowerCase().includes(search.toLowerCase())
        //         )
        //     );
        // } else {
        //     setFilteredItems(approvalData);
        // }
    }, [search]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formattedDate = (date) => {
        const newDate = new Date(date);
        const dateStr = newDate.toString().split(" ");
        return dateStr[2] + " " + dateStr[1] + " " + dateStr[3];
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const months = [
        { value: '01', name: 'January' },
        { value: '02', name: 'February' },
        { value: '03', name: 'March' },
        { value: '04', name: 'April' },
        { value: '05', name: 'May' },
        { value: '06', name: 'June' },
        { value: '07', name: 'July' },
        { value: '08', name: 'August' },
        { value: '09', name: 'September' },
        { value: '10', name: 'October' },
        { value: '11', name: 'November' },
        { value: '12', name: 'December' },
    ];
    // for attendance modal

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const handleClick = (val, status) => {
        if (val?.request_type.toLowerCase() === "inventory" || foreignId.length !== 0) {
            var regEx = /^[a-z0-9]+$/i;
            const isValid = regEx.test(foreignId);
            if (!isValid) {
                toast.error("Foreign id should be alphanumeric");
                return;
            }
        }
        const body = {
            emp_id: val?.emp_id,
            item: val?.item, // In case of leave
            foreign_id: (val.foreign_id ? val.foreign_id : foreignId),
            asset_type: val?.request_type?.toLowerCase() === "inventory" ? val?.asset_type : "",
            status: status,
            request_type: val?.request_type
        };
        // approvalReq(body)
    }
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
            <Box sx={{ textAlign: 'end' }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    onChange={handleChange}
                    sx={{ minWidth: 120 }}
                >
                    {months.map((month) => (
                        <MenuItem key={month.value} value={month.value}>
                            {month.name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Paper sx={{
                border: "1px solid rgba(0, 0, 0, 0.30)",
                width: "auto",
            }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h5"
                        sx={{
                            margin: '10px',
                            color: "#161E54",
                        }}
                    >
                        Employees List
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            margin: '10px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <input type='text' placeholder='search here...' style={{ padding: '5px', borderRadius: '5px', border: '1px solid black' }} />
                        <Button sx={{
                            marginLeft: '5px', cursor: 'pointer', backgroundColor: '#b9b9b9', color: "#181d60", borderRadius: '10px', fontWeight: 'bold', fontSize: '14px'
                        }} >
                            Download Report
                            <FileDownloadOutlinedIcon sx={{ marginLeft: '5px', backgroundColor: '#181d60', color: 'white', borderRadius: '50%' }} />
                        </Button>
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="sticky table">
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
                                    Working Days
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                                >
                                    Prasent Days
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                                >
                                    Absent Days
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
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
                                <TableRow key={row.sNo}>
                                    <TableCell component="th" scope="row" align="center">
                                        {row.sNo}
                                    </TableCell>
                                    <TableCell align="center">{row.employeeId}</TableCell>
                                    <TableCell align="center">{row.employeeName}</TableCell>
                                    <TableCell align="center">{row.workingDays}</TableCell>
                                    <TableCell align="center">{row.prasentDays}</TableCell>
                                    <TableCell align="center">{row.absentDays}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Save" placement="top" arrow>
                                            <AssignmentReturnedOutlinedIcon
                                                sx={{ cursor: "pointer" , color:'#7E8BE4'}}
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
                                    rowsPerPageOptions={[
                                        5,
                                        10,
                                        25,
                                    ]}
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
