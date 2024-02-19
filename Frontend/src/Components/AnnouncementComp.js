import React from 'react'
import { Box, Button, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AnnouncementComp() {
    const currentDate = new Date().toDateString();
    return (
        <Box sx={{ p: 0, border: '1px solid #E0E0E0', borderRadius: "12px" }}>
            <Box sx={{ backgroundColor: "#1B204A", borderRadius: "10px 10px 0px 0px", padding: "10px 10px 10px 24px", color: "#FFFFFF", }}>
                Announcements
                {/* date code starts here */}
                <Accordion
                    sx={{ margin: "0", height: "auto", zIndex: '1000', float: "right" }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ minHeight: "25px", height: "25px", p: 1 }}
                    >
                        <Typography sx={{ fontSize: "0.6rem", height: '30px', display: 'flex', alignItems: 'center', color: 'gray' }}>
                            {currentDate}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: 'white', position: 'absolute' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker label="Select" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </AccordionDetails>
                </Accordion>
                {/* date code ends here */}
            </Box>
            <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ backgroundColor: "#E0E0E0", borderRadius: "6px", padding: "12px 16px 12px 16px", color: "#303030", margin: "15px auto", width: "90%", display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
                    <Box sx={{ mr: 1 }}>
                        <Typography sx={{
                            fontFamily: "Poppins", fontSize: "16px",
                        }} variant='p'>Outing schedule for every departement</Typography>
                        <br></br>
                        <Typography sx={{
                            fontFamily: "Roboto", fontSize: "10px",
                        }} variant='p'>5 Minutes ago</Typography>
                    </Box>
                    <Box sx={{ width: "50%", display: "contents" }}>
                        <Box sx={{ marginRight: "5px" }}>
                            <img src='icons/pin.svg'></img>
                        </Box>
                        <Box>
                            <img src='icons/3dots.svg'></img>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ backgroundColor: "#E0E0E0", borderRadius: "6px", padding: "12px 16px 12px 16px", color: "#303030", margin: "15px auto", width: "90%", display: "flex", alignItems: 'center' }}>
                    <Box sx={{ mr: 1 }}>
                        <Typography sx={{
                            fontFamily: "Poppins", fontSize: "16px",
                        }} variant='p'>IT Department need two more talents for UX/UI Designer position</Typography>
                        <br></br>
                        <Typography sx={{
                            fontFamily: "Roboto", fontSize: "10px",
                        }} variant='p'>Yesterday, 09:15 AM</Typography>
                    </Box>
                    <Box sx={{ width: "50%", display: "contents" }}>
                        <Box sx={{ marginRight: "5px" }}>
                            <img src='icons/pin.svg'></img>
                        </Box>
                        <Box>
                            <img src='icons/3dots.svg'></img>
                        </Box>
                    </Box>
                </Box>
                <Button variant="text" sx={{ marginLeft: "5%", marginBottom: '20px', width: "90%", border: '1px solid #E0E0E0', padding: "10px", color: '#FF5151', font: 'Poppins 500', borderRadius: "0px 0px 10px 10px", mt: 2 }}>See All Announcement</Button>
            </Box>
        </Box>
    )
}