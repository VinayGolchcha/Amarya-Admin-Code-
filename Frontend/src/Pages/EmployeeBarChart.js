import React from 'react';
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const EmployeeBarChart = () => {

    const getWeakRange = () => {
        const today = new Date()
        const dayOfWeek = today.getDay()
        const startOfWeek = new Date(today)
        const endOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - dayOfWeek + 1)
        endOfWeek.setDate(today.getDate() + (6 - dayOfWeek - 1))

        const optionss = { day: 'numeric', month: 'short' }
        const startOfWeekFormatted = startOfWeek.toLocaleDateString('en-GB', optionss)
        const endOfWeekFormatted = endOfWeek.toLocaleDateString('en-GB', optionss)

        return `${startOfWeekFormatted} - ${endOfWeekFormatted}`;
    }

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2],
                backgroundColor: '#dce0e3',
                borderWidth: 1,
                borderRadius: 50, // Add border radius here
                Visibility: 'hidden'
            },
        ],
    };

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
                anchor: 'center',  // Position the label in the middle of the bar
                align: 'center',
                rotation: -90,       // Rotate the label 90 degrees
                color: 'black',
                font: {
                    weight: 'bold',
                },
                formatter: function (value, context) {
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
        <Box sx={{
            borderRadius: "20px",
            boxShadow: "none",
            width: "100%",
            height: "100%",
            border: "1px solid #8f9995",
            padding: "10px",
            overflow: "hidden"
        }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    // variant={isSmallScreen ? "h5" : "h4"}
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
                    // variant={isSmallScreen ? "body1" : "h6"}
                    sx={{
                        font: {
                            lg: "normal normal 400 18px/24px Poppins",
                            md: "normal normal 400 18px/24px Poppins",
                            sm: "normal normal 400 14px/16px Poppins",
                            xs: "normal normal 400 14px/16px Poppins",
                        },
                    }}
                >
                    {getWeakRange()}
                </Typography>
            </Box>
            <Bar data={data} options={options} />
            <Typography
                variant="h5"
                sx={{
                    font: {
                        lg: "normal normal 400 18px/24px Poppins",
                        md: "normal normal 400 18px/24px Poppins",
                        sm: "normal normal 400 14px/16px Poppins",
                        xs: "normal normal 400 14px/16px Poppins",
                    },
                    color: "#161E54",
                    textAlign: 'center'
                }}
            >
                {new Date().getFullYear()}
            </Typography>
        </Box>
    )
};

export default EmployeeBarChart;
