import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const EmployeeCountPieChart = () => {
  const employeeLocationData = [
    { location: "Location A", employees: 30 },
    { location: "Location B", employees: 15 },
    { location: "Location B", employees: 20 },
    { location: "Location B", employees: 8 },
    // ... add data for other locations
  ];

  const pieChartData = employeeLocationData.map((locationData) => ({
    name: locationData.location,
    value: locationData.employees,
  }));
  // Colors for the Pie Chart
  const pieChartColors = [
    "#6570CB",
    "#4853AE",
    "#4169E1",
    "#FF6347",
    "#8A2BE2",
    "#FF4500",
  ];

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", margin: "10px", boxShadow: "none" }}
    >
      <Typography
        variant="h4"
        sx={{
          // margin: "25px 0px 15px 0px",
          font: {
            lg: "normal normal 600 22px/35px Poppins",
            md: "normal normal 600 22px/35px Poppins",
            sm: "normal normal 600 20px/30px Poppins",
            xs: "normal normal 600 22px/30px Poppins",
          },
          color: "#00000099",
        }}
      >
        Employee Count
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end", marginTop: "12px" }}>
        <Box>
          <Typography
            component="span"
            sx={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              padding: "5px 12px",
              borderRadius: "4px",
              margin: "0px 5px",
              fontFamily: "Inter",
            }}
          >
            Location
          </Typography>
        </Box>
        <Box>
          <Typography
            component="span"
            sx={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              padding: "5px 12px",
              borderRadius: "4px",
              margin: "0px 5px",
              fontFamily: "Inter",
            }}
          >
            Team
          </Typography>
        </Box>
      </Box>
      <PieChart width={500} height={300}>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {pieChartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={pieChartColors[index % pieChartColors.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="middle"
          align="right"
          layout="vertical"
          wrapperStyle={{ background: "#F2F2F7", padding: "10px" }}
        />
      </PieChart>
    </Paper>
  );
};

export default EmployeeCountPieChart;
