import * as React from 'react';
import { Box, Grid } from "@mui/material";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function EmployeeAttendencePieChart() {

    
    return (
        <Box sx={{
            borderRadius: "20px",
            boxShadow: "none",
            width: "50%",
            border: "1px solid #8f9995",
            padding: "10px"
        }}>
            <Grid xs={12} md={9} lg={7}>
                <PieChart
                    colors={['rgb(110, 167, 208)', 'rgb(0, 120, 206)']}
                    series={[
                        {
                            arcLabel: (item) => `${item.value}%`,
                            arcLabelMinAngle: 45,
                            data: [
                                { id: 0, value: 110, label: 'Present' },
                                { id: 1, value: 15, label: 'Absent' },
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
            </Grid>
        </Box>
    );
}
