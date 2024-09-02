import * as React from 'react';
import { Box, Grid, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function AttendencePieChart() {
    return (
        <Box sx={{
            borderRadius: "20px",
            boxShadow: "none",
            width: "100%",
            height : "100%",
            border: "1px solid #8f9995",
            padding: "10px"
        }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            font: {
                                lg: "normal normal 400 22px/35px Poppins",
                                md: "normal normal 400 22px/35px Poppins",
                                sm: "normal normal 400 20px/30px Poppins",
                                xs: "normal normal 400 22px/30px Poppins",
                            },
                            color: "#161E54",
                        }}
                    >
                        Employee Count
                    </Typography>
                    <Typography
                        variant="h6"
                    >
                        30/08/2024
                    </Typography>
                </Box>
                <PieChart
                    colors={['rgb(72, 83, 174)', 'rgb(194, 200, 242)']}
                    series={[
                        {
                            arcLabel: (item) => `${item.value}%`,
                            arcLabelMinAngle: 45,
                            data: [
                                { id: 0, value: 10, label: 'Employees Present' },
                                { id: 1, value: 15, label: 'Employees Absent' },
                            ],
                            cx: 130,
                        }, 
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontWeight: 'bold',
                        },
                    }}
                    width={500}
                    height={240}
                />
                <Typography
                    variant="h6"
                    sx={{ textAlign: "center", paddingTop: "5px" }}>
                    Total Employees Present - 24/40
                </Typography>
            
        </Box>
    );
}