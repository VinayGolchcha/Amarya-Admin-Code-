import React from 'react'
import { Box, Typography } from "@mui/material";

export default function ProjectCardsDashboard({ currentProject }) {
    // Fallback values if currentProject is null or fields are missing
    const completedProjects = currentProject?.completed_projects ?? '--';
    const projectDuration = currentProject?.project_duration ?? '--';
    const technologies = currentProject?.tech ?? '--';
    const currentProjectName = currentProject?.project ?? '--';
    const projectManager = currentProject?.project_manager ?? '--';

    return (
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Box sx={{ gap: 4, display: "flex", flexDirection: "column", width: "50%", maxWidth: "200px" }}>
                {/* card1 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#FFEFE7" }}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Total Completed Projects
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "36px", lineHeight: '38px', color: '#161E54' }} variant='p'>
                        {completedProjects}
                    </Typography>
                </Box>
                {/* card2 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#FFEFE7" }}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Time with current client.
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "36px", lineHeight: '38px', color: '#161E54' }} variant='p'>
                        {projectDuration}
                    </Typography>
                   {currentProject!==null && <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '38px', color: '#161E54' }} variant='p'>
                        months
                    </Typography>}
                </Box>
                {/* card3 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#FFEFE7",minWidth:"fit-content" }}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Working Technologies
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "30px", lineHeight: '25px', color: '#161E54' }} variant='p'>
                        {technologies}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ gap: 8, display: "flex", flexDirection: "column", justifyContent: "center", ml: 2, maxWidth: "200px" }}>
                {/* card4 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#E8F0FB", minWidth:"fit-content"}}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Current Project
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "30px", lineHeight: '36px', color: '#161E54' }} variant='p'>
                        {currentProjectName}
                    </Typography>
                </Box>
                {/* card5 */}
                <Box sx={{ p: "12px 12px 12px 20px", borderRadius: "10px", backgroundColor: "#F3F8EB" }}>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "18px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        Project Manager
                    </Typography>
                    <br></br>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "25px", lineHeight: '28px', color: '#161E54' }} variant='p'>
                        {projectManager}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
