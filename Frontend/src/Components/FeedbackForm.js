import React from 'react'
import { Box, Button, Typography, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from '@mui/x-date-pickers/internals/demo';

export default function FeedbackForm() {
    return (
        <Box sx={{ p: 2, mt: 2, border: '1px solid #E0E0E0', borderRadius: "12px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                    Suggestions and Feedback
                </Typography>
                {/* Date code starts here */}
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoItem components={['DatePicker']}>
                        <DatePicker label="Date" />
                    </DemoItem >
                </LocalizationProvider>
                {/* date code ends here */}
            </Box>
            <Typography sx={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "12px", lineHeight: '28px', color: '#686868' }}>
                Subject
            </Typography>
            <TextField
                fullWidth
                variant="filled"
                type="text"
                sx={{
                    border: "0.5px solid #E0E0E0", borderRadius: "6px"
                }}
            />
            <Typography sx={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "12px", lineHeight: '28px', color: '#686868' }}>
                Body
            </Typography>
            <TextField
                fullWidth
                variant="filled"
                multiline
                rows={4}
                type="text"
                sx={{
                    border: "0.5px solid #E0E0E0", borderRadius: "6px"
                }}
            />
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant="contained" sx={{
                    m: 2, float: "right", padding: "10px 16px 10px 16px", color: '#FFFFFF', font: 'Poppins 500', borderRadius: "4px", backgroundColor: "#FF5151",
                    textTransform: "none", "&:hover": {
                        backgroundColor: "#FF5151",
                    },
                }}>Send to admin</Button>
            </Box>
        </Box>
    )
}
