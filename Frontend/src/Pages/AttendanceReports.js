import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function AttendanceReports() {

    const columns = [
        { id: 'S', label: 'S. No.', minWidth: 80 },
        { id: 'EmployeeId', label: 'Employee Id', minWidth: 170 },
        {
            id: 'EmployeeName',
            label: 'Employee Name',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'WorkingDays',
            label: 'Working Days',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'PresentDays',
            label: 'Present Days',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        }, ,
        {
            id: 'AbsentDays',
            label: 'Absent Days',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        }, ,
        {
            id: 'Preview',
            label: 'Preview',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
    ];

    function createData(S, EmployeeId, EmployeeName, WorkingDays, PresentDays, AbsentDays, Preview) {
        return { S, EmployeeId, EmployeeName, WorkingDays, PresentDays, AbsentDays, Preview };
    }

    const rows = [
        createData('1', 'India', 'IN', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(2, 'China', 'CN', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(3, 'Italy', 'IT', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(4, 'United States', 'US', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(5, 'Canada', 'CA', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(6, 'Australia', 'AU', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(7, 'Germany', 'DE', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(8, 'Ireland', 'IE', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(9, 'Mexico', 'MX', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(10, 'Japan', 'JP', 1324171354, 3287263, 1324171354, 3287263, 23456789),
        createData(11, 'France', 'FR', 1324171354, 3287263, 1324171354, 3287263, 23456789)
    ];


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [month, setMonth] = React.useState('01');

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
    return (
        <Grid>
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
                            font: {
                                lg: "normal normal 400 22px/35px Poppins",
                                md: "normal normal 400 22px/35px Poppins",
                                sm: "normal normal 400 20px/30px Poppins",
                                xs: "normal normal 400 22px/30px Poppins",
                            },
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
                            marginLeft: '5px', cursor: 'pointer', backgroundColor: '#b9b9b9', color: "#181d60", borderRadius: '10px', fontWeight: 'bold'
                        }} >
                            Download Report
                            <FileDownloadOutlinedIcon sx={{ marginLeft: '5px', backgroundColor: '#181d60', color: 'white', borderRadius: '50%' }} />
                        </Button>
                    </Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, backgroundColor: "rgb(22, 30, 84)", color: "white" }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid>
    );
}