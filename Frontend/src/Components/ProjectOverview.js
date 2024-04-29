import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Piechart from "../Components/AdminPieChart";
// Sample data (replace with your actual data)
const monthlyData = [
  { month: "Jan", started: 5, inProgress: 3 },
  { month: "Feb", started: 6, inProgress: 3 },
  { month: "Mar", started: 2, inProgress: 3 },
  { month: "April", started: 7, inProgress: 3 },
  { month: "May", started: 3, inProgress: 3 },
  { month: "June", started: 4, inProgress: 3 },
  { month: "July", started: 8, inProgress: 3 },
  { month: "Aug", started: 1, inProgress: 3 },
  { month: "Sep", started: 2, inProgress: 3 },
  { month: "Oct", started: 3, inProgress: 3 },
  { month: "Nov", started: 4, inProgress: 3 },
  { month: "Dec", started: 5, inProgress: 3 },
  // ... add data for other months
];

const teamData = [
  { team: "Team A", projects: 10, employees: 20 },
  { team: "Team B", projects: 8, employees: 15 },
  // ... add data for other teams
];

// ProjectOverview component
const sanitizedMonthlyData = monthlyData.map((month) => ({
  ...month,
  inProgress: month.inProgress || 0,
}));

const ProjectOverview = () => {
  const allMonthsData = monthlyData.map((monthData) => ({
    month: monthData.month,
    started: monthData.started,
    inProgress: monthData.inProgress || 0, // Ensure inProgress is defined, default to 0
  }));

  const dataKeys = Object.keys(sanitizedMonthlyData[0]).filter(
    (key) => key !== "month"
  );

  const ongoingProjects = sanitizedMonthlyData.reduce(
    (total, month) => total + month.inProgress,
    0
  );
  const teamAProjects =
    teamData.find((team) => team.team === "Team A")?.projects || 0;
  const teamBProjects =
    teamData.find((team) => team.team === "Team B")?.projects || 0;
  const totalEmployees = teamData.reduce(
    (total, team) => total + team.employees,
    0
  );

  return (
    <Box>
      <Paper
        // elevation={3}
        sx={{
          paddingRight: "20px",
          margin: "",
          borderRadius: "20px",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          color="#00000099"
          fontWeight="bold"
          marginLeft="46px"
          marginTop="15px"
          fontSize="1.1rem"
          fontFamily="Poppins"
        >
          Project Overview - 2023
        </Typography>
        {/* Monthly Project Status Bar Chart */}
        <BarChart
          width={550}
          height={400}
          data={allMonthsData}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          {/* <CartesianGrid horizontal={true} /> */}
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="started" fill="#1024AF" name="Projects Started" />
        </BarChart>
        {/* Team-wise Project and Employee Count */}
      </Paper>
      <Box
        // container
        // spacing={0}
        sx={{
          marginTop: "20px",
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          sx={{
            border: "0.9px solid #2A3344",
            padding: "20px",
            textAlign: "center",
            borderRadius: "0px 0px 0px 20px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#00000099",
              font: {
                lg: "normal normal 600 18px/25px Poppins",
                md: "normal normal 600 18px/25px Poppins",
                sm: "normal normal 600 16px/25px Poppins",
                xs: "normal normal 600 16px/25px Poppins",
              },
            }}
          >
            {ongoingProjects} <br />
            Ongoing Projects
          </Typography>
        </Box>
        <Box
          style={{
            border: "0.9px solid #2A3344",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#00000099",
              font: {
                lg: "normal normal 600 18px/25px Poppins",
                md: "normal normal 600 18px/25px Poppins",
                sm: "normal normal 600 16px/25px Poppins",
                xs: "normal normal 600 16px/25px Poppins",
              },
            }}
          >
            {teamAProjects}
            <br />
            Team A Projects
          </Typography>
        </Box>
        <Box
          style={{
            border: "0.9px solid #2A3344",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#00000099",
              font: {
                lg: "normal normal 600 18px/25px Poppins",
                md: "normal normal 600 18px/25px Poppins",
                sm: "normal normal 600 16px/25px Poppins",
                xs: "normal normal 600 16px/25px Poppins",
              },
            }}
          >
            {teamBProjects}
            <br />
            Team B Projects
          </Typography>
        </Box>
        <Box
          style={{
            border: "0.9px solid #2A3344",
            padding: "20px",
            textAlign: "center",
            borderRadius: "0px 0px 20px 0px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#00000099",
              font: {
                lg: "normal normal 600 18px/25px Poppins",
                md: "normal normal 600 18px/25px Poppins",
                sm: "normal normal 600 16px/25px Poppins",
                xs: "normal normal 600 16px/25px Poppins",
              },
            }}
          >
            {totalEmployees}/50 <br />
            Total Employees
          </Typography>
        </Box>
      </Box>{" "}
    </Box>
  );
};

export default ProjectOverview;
