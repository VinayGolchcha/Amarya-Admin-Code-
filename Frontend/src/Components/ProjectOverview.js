import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data (replace with your actual data)
const monthlyData = [
  { month: "Jan", started: 5, inProgress: 3 },
  { month: "Feb", started: 6, inProgress: 3 },
  { month: "Mar", started: 2, inProgress: 3 },
  { month: "Apr", started: 7, inProgress: 3 },
  { month: "May", started: 3, inProgress: 3 },
  { month: "Jun", started: 4, inProgress: 3 },
  { month: "Jul", started: 8, inProgress: 3 },
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
const sanitizedMonthlyData = monthlyData?.map((month) => ({
  ...month,
  inProgress: month.inProgress || 0,
}));

const ProjectOverview = ({ apiData }) => {
  const [yearSpan, setYearSpan] = useState("");
  const newSet = new Set();
  apiData?.live_projects_data?.map((item) => {
    const year = item?.month_start?.split(" ")[1];
    newSet.add(year);
  });

  const getYearSpan = () => {
    const v = "20";
    let yearStr = "";
    if (newSet.size === 1) {
      newSet.forEach((item) => {
        yearStr = v + item.toString();
      });
    }
    if (newSet.size > 1) {
      newSet.forEach((item) => {
        const actdata = v + item.toString();
        yearStr += actdata + "-";
      });
      yearStr = yearStr.slice(0, -1);
    }
    return yearStr;
  };

  const projectByMonth = apiData?.live_projects_data?.map((item) => {
    const month = item?.month_start?.toLowerCase();

    if (month.includes("january")) {
      return { month: "Jan", liveproject: item?.live_projects };
    } else if (month.includes("february")) {
      return { month: "Feb", liveproject: item?.live_projects };
    } else if (month.includes("march")) {
      return { month: "Mar", liveproject: item?.live_projects };
    } else if (month.includes("april")) {
      return { month: "Apr", liveproject: item?.live_projects };
    } else if (month.includes("may")) {
      return { month: "May", liveproject: item?.live_projects };
    } else if (month.includes("june")) {
      return { month: "Jun", liveproject: item?.live_projects };
    } else if (month.includes("july")) {
      return { month: "Jul", liveproject: item?.live_projects };
    } else if (month.includes("august")) {
      return { month: "Aug", liveproject: item?.live_projects };
    } else if (month.includes("september")) {
      return { month: "Sep", liveproject: item?.live_projects };
    } else if (month.includes("october")) {
      return { month: "Oct", liveproject: item?.live_projects };
    } else if (month.includes("november")) {
      return { month: "Nov", liveproject: item?.live_projects };
    } else if (month.includes("december")) {
      return { month: "Dec", liveproject: item?.live_projects };
    }

    return item;
  });

  const onGoingProjects = apiData?.project_details?.filter(
    (item) => item?.project_status?.toLowerCase() === "in progress"
  );

  // Ensure all months are included, even if there are no projects for that month
  const allMonths = [
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
  ];

  const allMonthsData = allMonths.map((month) => {
    const monthData = projectByMonth?.find((data) => data.month === month);
    return { month, liveproject: monthData ? monthData.liveproject : 0 };
  });

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
  const employeeWithClientCount = apiData?.employee_count_with_team?.find(
    (item) => item.employee_with_client_count !== undefined
  )?.employee_with_client_count;
  const totalEmployeeCount = apiData?.employee_count_with_team?.find(
    (item) => item.total_employee_count !== undefined
  )?.total_employee_count;

  return (
    <Box>
      <Paper
        sx={{
          paddingRight: "20px",
          margin: "",
          borderRadius: "20px",
          boxShadow: "none",
          width: "80%",
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
          Project Overview - {getYearSpan()} FY
        </Typography>
        {/* Monthly Project Status Bar Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={allMonthsData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
            <XAxis dataKey="month" minTickGap={1} interval={{lg : 1 , md : 1 , sm: 2 , xs : 3}} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="liveproject" fill="#1024AF" name="live project" />
          </BarChart>
        </ResponsiveContainer>
        {/* Team-wise Project and Employee Count */}
      </Paper>
      <Grid container sx={{ marginTop: "20px", width: "100%" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              border: "0.9px solid #2A3344",
              padding: "20px",
              textAlign: "center",
              borderRadius: {lg : "0px 0px 0px 20px" , md : "0px 0px 0px 20px"},
              height : "100%"
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
              {onGoingProjects?.length}
              <br />
              Ongoing Projects
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              border: "0.9px solid #2A3344",
              padding: "20px",
              textAlign: "center",
              height : "100%"
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
              {apiData?.employee_count_with_team[0] ?apiData?.employee_count_with_team[0][1]?.project_count || 0:0}
              <br />
              SAP Projects
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              border: "0.9px solid #2A3344",
              padding: "20px",
              textAlign: "center",
              height : "100%"
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
              {apiData?.employee_count_with_team[0][0] ? apiData?.employee_count_with_team[0][0]?.project_count || 0:0}
              <br />
              Full Stack and Data Science Projects
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              border: "0.9px solid #2A3344",
              padding: "20px",
              textAlign: "center",
              borderRadius: { lg : "0px 0px 20px 0px" ,  md: "0px 0px 20px 0px" , sm : "0px 0px 20px 0px" , xs : "0px 0px 20px 20px"},
              height : "100%"
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
              {employeeWithClientCount}/{totalEmployeeCount} <br />
              Employees count with client
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectOverview;

