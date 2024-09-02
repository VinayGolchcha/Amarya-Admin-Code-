import '../Components/Calendar.css'
import EmployeeAttendencePieChart from './EmployeeAttendencePieChart';
import { Box, Grid, Typography } from "@mui/material";
import Calendar from '../Components/Calendar';

export default function EmployeeAttendenceHomePage() {
    return (
        <Box style={{ margin: "20px 20px 20px 20px", width: "100%" }}>
            <Typography
                variant="h4"
                sx={{
                    font: {
                        lg: "normal normal 300 22px/35px Poppins",
                        md: "normal normal 300 22px/35px Poppins",
                        sm: "normal normal 300 20px/30px Poppins",
                        xs: "normal normal 300 22px/30px Poppins",
                    },
                }}
            >
                Employees Attendance
            </Typography>
            <Box sx={{ display: 'flex', gap:"2rem", alignItems: 'stretch'  }}>
                <EmployeeAttendencePieChart />
                <Grid xs={12} md={9} lg={7} sx={{ width: "100%" }}>
                    <Box sx={{
                        borderRadius: "20px",
                        border: "1px solid rgba(0, 0, 0, 0.30)",
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                    >
                        <Box className='flex-to-display'>
                            <div>Employee Name :</div>
                            <div>Ankit</div>
                        </Box>
                        <Box className='flex-to-display'>
                            <div>Employee Id :</div>
                            <div>345674</div>
                        </Box>
                        <Box className='flex-to-display'>
                            <div>Number of Working Days :</div>
                            <div>24</div>
                        </Box>
                        <Box className='flex-to-display'>
                            <div>Number of Present Days :</div>
                            <div>22</div>
                        </Box>
                        <Box className='flex-to-display'>
                            <div>Number of Leaves :</div>
                            <div>8</div>
                        </Box>
                        <Box className='flex-to-display'>
                            <div>Number of WFH :</div>
                            <div>6</div>
                        </Box>
                        <Box className='flex-to-display'>
                            <div>Number of Absent :</div>
                            <div>2</div>
                        </Box>
                    </Box>
                </Grid>
            </Box>
            <Box style={{ margin: "20px 0px 0px 0px" }}>
                <Calendar />
            </Box>
        </Box>)
}