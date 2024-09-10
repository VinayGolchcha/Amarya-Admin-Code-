import React, { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const rows = [
    {
        sNo: 1,
        employeeId: "er45656",
        employeeName: "Ankit koshta",
        identifiedOn: "17-09-2020",
        identifiedAt: "11:34:54 AM",
        tag: "Outside",
        identification: "Approved",
        action: "Approved",
    },
];

export default function UndetectedPeople({ approvalData, approvalReq }) {
    const [tag, setTag] = useState('Outside');

    const tags = ["Outside", "Employee"]

    const handleClick = (val, status) => {
        // if (val?.request_type.toLowerCase() === "inventory") {
        //     var regEx = /^[a-z0-9]+$/i;
        //     const isValid = regEx.test(foreignId);
        //     if (!isValid) {
        //         toast.error("Foreign id should be alphanumeric");
        //         return;
        //     }
        // }
    }
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
                            {rows?.map((row, i) => (
                                <TableRow
                                    key={row.sNo}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{ fontFamily: "Open Sans" }}
                                    >
                                        {row?.sNo}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontFamily: "Open Sans" }}>
                                        {row?.employeeId}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontFamily: "Open Sans" }}>
                                        {row?.employeeName}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontFamily: "Open Sans" }}>
                                        {row?.identifiedOn}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontFamily: "Open Sans" }}>
                                        {row?.identifiedAt}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontFamily: "Open Sans" }}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={tag}
                                            sx={{
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none', // Remove the default border
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none', // Remove border on hover
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none', // Remove border when focused
                                                },
                                            }}
                                        >
                                            {tags.map((tag) => (
                                                <MenuItem key={tag} value={tag}>
                                                    {tag}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontFamily: "Open Sans" }}>
                                        {row.identification}
                                    </TableCell>
                                    <TableCell align="center" sx={{ minWidth: "104px" }}>
                                        <Tooltip title="Delete" placement="top" arrow>
                                            <DeleteIcon sx={{
                                                cursor: "pointer"
                                            }} onClick={() => handleClick(row, "deleted")} /></Tooltip>
                                        <Tooltip title="Save" placement="top" arrow>
                                            <SaveIcon sx={{
                                                cursor: "pointer"
                                            }} onClick={() => handleClick(row, "rejected")} /></Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}