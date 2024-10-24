import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const EmployeeBarChart = ({ barData }) => {
  const [firstDayWeek, setFirstDayWeek] = useState();
  const [lastDayWeek, setLastDayWeek] = useState();
  const [chartData, setChartData] = useState({
    labels: [], // Store the day names with dates here
    datasets: [
      {
        label: "Present Count",
        data: [], // Store the present counts here
        backgroundColor: "#dce0e3",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  });

  useEffect(() => {
    // Extract day names and counts with formatted date strings
    const labels = barData?.map((item, index) => {
      if (index === 0) {
        setLastDayWeek(
          new Date(item?.attendance_date)?.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })
        );
      }
      if (index === barData?.length - 1) {
        setFirstDayWeek(
          new Date(item?.attendance_date)?.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })
        );
      }
      return [
        item?.day_name,
        new Date(item?.attendance_date)?.toLocaleDateString("en-GB"),
      ];
    });
    const data = barData?.map((item) => item?.present_count);
    // Update the chart data state
    setChartData({
      labels,
      datasets: [
        {
          label: "Present Count",
          data,
          backgroundColor: "#dce0e3",
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    });
  }, [barData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      datalabels: {
        anchor: "center", // Position the label in the middle of the bar
        align: "center",
        // rotation: -90, // Rotate the label 90 degrees
        color: "black",
        font: {
          weight: "bold",
        },
        formatter: function (value) {
          return value; // Show the value inside the bar
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide grid lines on the y-axis
        },
      },
      y: {
        display: false,
        grid: {
          display: false, // Hide grid lines on the y-axis
        },
      },
    },
  };

  return (
    <Box
      sx={{
        borderRadius: "20px",
        boxShadow: "none",
        width: "100%",
        height: "100%",
        border: "1px solid #8f9995",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom:1 }}>
        <Typography
          sx={{
            font: {
              lg: "normal normal 600 22px/28px Poppins",
              md: "normal normal 600 22px/28px Poppins",
              sm: "normal normal 600 16px/22px Poppins",
              xs: "normal normal 600 16px/22px Poppins",
            },
            color: "#161E54",
          }}
        >
          Weekly Employee Count
        </Typography>
        <Typography
          sx={{
            font: {
              lg: "normal normal 400 18px/24px Poppins",
              md: "normal normal 400 18px/24px Poppins",
              sm: "normal normal 400 14px/16px Poppins",
              xs: "normal normal 400 14px/16px Poppins",
            },
          }}
        >
          {`${firstDayWeek}-${lastDayWeek}`}
        </Typography>
      </Box>
      <Bar data={chartData} options={options} />
      {/* <Typography
        variant="h5"
        sx={{
          font: {
            lg: "normal normal 400 18px/24px Poppins",
            md: "normal normal 400 18px/24px Poppins",
            sm: "normal normal 400 14px/16px Poppins",
            xs: "normal normal 400 14px/16px Poppins",
          },
          color: "#161E54",
          textAlign: "center",
        }}
      >
        {new Date().getFullYear()}
      </Typography> */}
    </Box>
  );
};

export default EmployeeBarChart;
