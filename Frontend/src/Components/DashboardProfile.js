import React from 'react'
import { Box, Button, Typography } from "@mui/material";

export default function DashboardProfile() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src='Images/avatar.jpg' width={"150px"} height={"150px"} style={{ borderRadius: '50%' }}></img>
                    <Typography sx={{
                        fontFamily: "Prompt", fontSize: "24px", fontWeight: 600, lineHeight: "36px", color: "#2A282F"
                    }} variant='h4'>Sanjana Jain</Typography>
                    <Typography sx={{
                        fontFamily: "Inter", fontSize: "24px", fontWeight: 600, lineHeight: "28px", color: "#2A282F"
                    }} variant='h5'>Node JS Developer (TL)</Typography>
                </Box>
                <Box>
                    <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                        <Box >
                            <Typography sx={{
                                p: 0, mt: "16px",
                                fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "18px", color: "##000000"
                            }} variant='h6'><pre style={{ margin: 0, padding: 0 }}>Id     :</pre></Typography>
                            <Typography sx={{
                                p: 0, mt: "12px",
                                fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "18px", color: "##000000"
                            }} variant='h6'><pre style={{ margin: 0, padding: 0 }}>Phone  :</pre></Typography>
                            <Typography sx={{
                                p: 0, mt: "12px",
                                fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "18px", color: "##000000"
                            }} variant='h6'><pre style={{ margin: 0, padding: 0 }}>DOB    :</pre></Typography>
                            <Typography sx={{
                                p: 0, mt: "12px",
                                fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "18px", color: "##000000"
                            }} variant='h6'><pre style={{ margin: 0, padding: 0 }}>Email  :</pre></Typography>
                            <Typography sx={{
                                p: 0, mt: "12px",
                                fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "18px", color: "##000000"
                            }} variant='h6'><pre style={{ margin: 0, padding: 0 }}>Domain :</pre></Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                            <Typography sx={{
                                p: 0, mt: "16px",
                                fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "18px", color: "#000000"
                            }} variant='h6'>AMEMP00021</Typography>
                            <Typography sx={{
                                p: 0, mt: "12px",
                                fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "18px", color: "#000000"
                            }} variant='h6'>8431xxxxxxx</Typography>
                            <Typography sx={{
                                p: 0, mt: "12px",
                                fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "18px", color: "#000000"
                            }} variant='h6'>22/02/1999</Typography>
                            <Typography sx={{
                                p: 0, mt: "12px",
                                fontFamily: "Inter", fontSize: "12px", fontWeight: 600, lineHeight: "18px", color: "#000000"
                            }} variant='h6'> ujjwal.upadhyay</Typography>
                            <Typography sx={{
                                p: 0, mt: "12px",
                                fontFamily: "Inter", fontSize: "12px", fontWeight: 600, lineHeight: "18px", color: "#000000"
                            }} variant='h6'> @amaryaconsultancy.com</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Button variant="contained" sx={{
                            m: 2, width: "90%", padding: "10px 16px 10px 16px", color: '#FFFFFF', font: 'Poppins 500', borderRadius: "4px", backgroundColor: "#FF5151",
                            textTransform: "none", "&:hover": {
                                backgroundColor: "#FF5151",
                            },
                        }}>Visit Profile</Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}
