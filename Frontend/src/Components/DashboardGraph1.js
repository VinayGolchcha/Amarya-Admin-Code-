import React from 'react'
import { Box, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

export default function DashboardGraph1() {
    const data = [
        { value: 60, label: 'Shephertz', color: '#0A166C' },
        { value: 15, label: 'Saathi', color: '#1B59F875' },
        { value: 25, label: 'Amarya Admin\nPanel', color: '#0A166C38' },
    ];

    const size = {
        // width: 750,
        height: 330,
    };

    const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 36,
        fontWeight: 700
    }));

    function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
            <StyledText x={left + width / 2} y={top + height / 2}>
                {children}
            </StyledText>
        );
    }

    return (
        <Box sx={{ p: 4, pt: 6, border: '1px solid #E0E0E0', borderRadius: "12px" }}>
            <Box>
                <Typography sx={{ fontFamily: "Inter", fontWeight: "500", fontSize: "41px", lineHeight: '50px', color: '#4D4D4D' }} variant='h2'>
                    Projects
                </Typography>
                <Typography sx={{ fontFamily: "Inter", fontWeight: "700", fontSize: "70px", lineHeight: '85px', color: '#4D4D4D' }} variant='p'>
                    3
                </Typography>
            </Box>
            <Box sx={{ mt: -3 }}>
                <PieChart series={[{
                    data,
                    paddingAngle: 5,
                    innerRadius: 95,
                    outerRadius: 165,
                    cornerRadius: 8
                }]} {...size} slotProps={{
                    legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'left' },
                        itemMarkWidth: 32,
                        itemMarkHeight: 21,
                        itemGap: 10,
                        labelStyle: {
                            fontSize: 28,
                            fill: '#000000B2',
                            fontWeight: 700
                        },
                        // hidden: true
                    },
                }} margin={{ top: 0, left: 280, right: 0, bottom: 0 }}>
                    <PieCenterLabel>2023</PieCenterLabel>
                </PieChart>
            </Box>
        </Box >
    )
}
