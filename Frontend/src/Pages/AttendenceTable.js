import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from '@mui/material';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

const columns = [
    {
        id: 'S',
        label: 'S. No.',
        minWidth: 80,
        align: 'center'
    },
    {
        id: 'EmployeeId',
        label: 'Employee Id',
        minWidth: 120,
        align: 'center'
    },
    {
        id: 'EmployeeName',
        label: 'Employee Name',
        minWidth: 140,
        align: 'center',
    },
    {
        id: 'Date',
        label: 'Date',
        minWidth: 110,
        align: 'center',
    },
    {
        id: 'InTime',
        label: 'In Time',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    }, ,
    {
        id: 'InDetection',
        label: 'Detection',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    }, ,
    {
        id: 'OutTime',
        label: 'Out Time',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    }, ,
    {
        id: 'OutDetection',
        label: 'Detection',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    }
];

function createData(S, EmployeeId, EmployeeName, Date, InTime, InDetection, OutTime, OutDetection) {
    return { S, EmployeeId, EmployeeName, Date, InTime, InDetection, OutTime, OutDetection };
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

export default function AttendenceTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
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
                            lg: "normal normal 400 22px/28px Poppins",
                            md: "normal normal 400 22px/28px Poppins",
                            sm: "normal normal 400 16px/22px Poppins",
                            xs: "normal normal 400 16px/22px Poppins",
                        },
                        color: "#161E54",
                    }}
                >
                    Employees List
                </Typography>
                <Box
                    sx={{
                        margin: '10px',
                        display: 'flex',
                        width: { sm: "50%" },
                        justifyContent: "end"
                    }}
                >
                    <input type='text' placeholder='search here...' style={{ padding: '5px', borderRadius: '5px', border: '1px solid black', width: { lg: "50%", md: "60%", sm: "100%" } }} />
                    <RefreshOutlinedIcon sx={{ marginLeft: '5px', cursor: 'pointer', backgroundColor: '#181d60', color: 'white', borderRadius: '50%' }} />
                </Box>
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
    );
}
