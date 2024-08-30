import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'EmployeeId', label: 'Employee Id', minWidth: 170 },
    {
        id: 'EmployeeName',
        label: 'Employee Name',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Date',
        label: 'Date',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
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

function createData(EmployeeId, EmployeeName, Date, InTime, InDetection, OutTime, OutDetection) {
    return { EmployeeId, EmployeeName, Date, InTime, InDetection, OutTime, OutDetection };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('China', 'CN', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('Italy', 'IT', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('United States', 'US', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('Canada', 'CA', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('Australia', 'AU', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('Germany', 'DE', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('Ireland', 'IE', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('Mexico', 'MX', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('Japan', 'JP', 1324171354, 3287263,1324171354, 3287263,23456789),
    createData('France', 'FR', 1324171354, 3287263,1324171354, 3287263,23456789)
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
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
