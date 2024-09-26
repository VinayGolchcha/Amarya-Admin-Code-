import React from 'react';
import { Box, Typography } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';

export default function DashboardGraph2({ pointsData }) {
  const barMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const barData = barMonths.map(month => pointsData[0]?.[month.toLowerCase()] ?? '--');

  return (
    <Box sx={{ p: 0, border: '1px solid rgba(0, 0, 0, 0.1)' }}>
      <Box sx={{ padding: 3, borderBottom: "2px solid #BCBCBC" }}>
        <Typography sx={{ fontFamily: "Prompt", fontWeight: "600", fontSize: "24px", lineHeight: '36px', color: '#828282' }} variant='p'>
          Points Earned per month
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
