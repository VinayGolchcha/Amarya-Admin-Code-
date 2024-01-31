import React from 'react'
import { Box, Typography } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';

export default function DashboardGraph3() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ]
    const year1Data = [
        20, 21, 22, 23, 24, 78, 26, 27, 28, 29, 30, 31];

    const year2Data = [
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
    ];

    const year3Data = [
        41, 42, 43, 44, 45, 46, 47, 48, 49, 10, 51, 52
    ];
    return (
        <Box sx={{ p: 0 }}>
            <Box sx={{ padding: 3, borderBottom: "2px solid #BCBCBC" }}>
                <Typography sx={{ fontFamily: "Prompt", fontWeight: "600", fontSize: "24px", lineHeight: '36px', color: '#828282' }} variant='p'>
                    Points Earned along the years
                </Typography>

            </Box>
            <Box sx={{ p: 2 }}>
                <LineChart
                    xAxis={[
                        {
                            id: 'months',
                            data: months,
                        },
                    ]}
                    series={[
                        {
                            id: 'y1',
                            label: '2021',
                            data: year1Data,
                            area: false,
                            showMark: false,
                            curve: "linear",
                        },
                        {
                            id: 'y2',
                            label: '2022',
                            data: year2Data,
                            area: false,
                            showMark: false,
                            curve: "linear",
                        },
                        {
                            id: 'y3',
                            label: '2023',
                            data: year3Data,
                            area: false,
                            showMark: false,
                            curve: "linear",
                        },
                    ]}
                    height={320}
                />
            </Box>
        </Box>
    )
}
