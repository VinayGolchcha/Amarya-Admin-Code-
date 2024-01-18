import React from 'react'
import { Box, Typography } from "@mui/material";

export default function ProjectCardsDashboard() {
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ gap: 4, display: "flex", flexDirection: "column" }}>
                {/* card1 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#FFEFE7" }}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Total Completed Projects
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "36px", lineHeight: '38px', color: '#161E54' }} variant='p'>
                        5
                    </Typography>
                </Box>
                {/* card2 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#FFEFE7" }}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Time with current client.
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "36px", lineHeight: '38px', color: '#161E54' }} variant='p'>
                        9
                    </Typography>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '38px', color: '#161E54' }} variant='p'>
                        months
                    </Typography>
                </Box>
                {/* card3 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#FFEFE7" }}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Working Technologies
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '25px', color: '#161E54' }} variant='p'>
                        Node js, Express js, MongoDB
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ gap: 8, display: "flex", flexDirection: "column", justifyContent: "center", ml: 2 }}>
                {/* card4 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#E8F0FB" }}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Current Project
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "34px", lineHeight: '36px', color: '#161E54' }} variant='p'>
                        Shephertz
                    </Typography>
                </Box>
                {/* card5 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#F3F8EB" }}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Project Manager
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "28px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Sumit Kumar
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
