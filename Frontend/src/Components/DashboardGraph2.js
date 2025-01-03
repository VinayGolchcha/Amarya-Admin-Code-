import React, { memo } from 'react';
import { Box, Typography } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';

const DashboardGraph2 = ({ pointsData }) => {

  const barMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Map pointsData to barMonths
  const barData = barMonths.map((month, index) => {
    const monthKey = String(index + 1).padStart(2, '0'); // "01", "02", etc.
    return pointsData[monthKey] || 0; // Use 0 if no data for the month
  }); 

  return (
    <Box sx={{ p: 0, border: '1px solid rgba(0, 0, 0, 0.8)' }}>
      <Box sx={{ padding: 3, borderBottom: "2px solid #BCBCBC" }}>
        <Typography sx={{ fontFamily: "Prompt", fontWeight: "600", fontSize: "24px", lineHeight: '36px', color: '#828282' }} variant='p'>
          Points earned per month
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <BarChart
          series={[
            { data: barData, label: "Awarded Points" }
          ]}
          height={290}
          xAxis={[{ data: barMonths, scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          colors={['#3D4895']}
        />
      </Box>
    </Box>
  );
}

export default memo(DashboardGraph2);
