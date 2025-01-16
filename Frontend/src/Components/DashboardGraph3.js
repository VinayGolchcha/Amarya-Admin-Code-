import React, { memo } from 'react';
import { Box, Typography } from "@mui/material";
import { BarChart } from '@mui/x-charts';

const DashboardGraph3 = ({ pointsData }) => {
  // debugger
  // console.log("pointsData>>>>>>>",Object.keys(pointsData));
  
  const currentYear = new Date().getFullYear();
  const mockYearArray = [currentYear-4, currentYear-3,currentYear-2, currentYear-1, currentYear]
  const yearsArray = Object.keys(pointsData).length ? Object.keys(pointsData)?.map((key) => key) : mockYearArray;
  const data = Object.keys(pointsData).length ? Object.values(pointsData)?.map((key) => key) : [0, 0, 0, 0, 0];

  const yearDataArray = [
    {
      id: "points",
      label: "Points",
      data: yearsArray, // Correctly mapped X-Y pairs
    },
  ];
  console.log("Year Graph Data:", yearDataArray);

  return (
    <Box sx={{ p: 0 , border: '1px solid rgba(0, 0, 0, 0.8)'}}>
      <Box sx={{ padding: 3, borderBottom: "2px solid #BCBCBC" }}>
        <Typography
          sx={{
            fontFamily: "Prompt",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: '36px',
            color: '#828282'
          }}
          variant="p"
        >
          Yearly weighted average(in %)
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <BarChart
          xAxis={[
            {
              id: 'years',
              data: yearsArray,
              scaleType: 'band' // Years for the X-axis
            },
          ]}
          series={[
            { data: data }
          ]} // Series with X-Y data
          height={320}
        />
      </Box>
    </Box>
  );
}

export default memo(DashboardGraph3);