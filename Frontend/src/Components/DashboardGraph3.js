import React from 'react';
import { Box, Typography } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';

export default function DashboardGraph3({ pointsData }) {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const yearData = pointsData.map(year => ({
    id: year.year.toString(),
    label: year.year.toString(),
    data: months.map(month => year.points ?? '--'),
    area: false,
    showMark: false,
    curve: "linear",
  }));

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
          series={yearData}
          height={320}
        />
      </Box>
    </Box>
  );
}
