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
            width: "50%",
            border: "1px solid #8f9995"
        }}>
            <Typography
                variant="h4"
                sx={{
                    margin: "10px",
                    font: {
                        lg: "normal normal 400 22px/35px Poppins",
                        md: "normal normal 400 22px/35px Poppins",
                        sm: "normal normal 400 20px/30px Poppins",
                        xs: "normal normal 400 22px/30px Poppins",
                    },
                    color: "#161E54",
                }}
            >
                Weekly Employee Count
            </Typography>
            <Bar data={data} options={options} />
            <Typography
                variant="h5"
                sx={{
                    font: {
                        lg: "normal normal 400 22px/35px Poppins",
                        md: "normal normal 400 22px/35px Poppins",
                        sm: "normal normal 400 20px/30px Poppins",
                        xs: "normal normal 400 22px/30px Poppins",
                    },
                    color: "#161E54",
                    textAlign: 'center'
                }}
            >
                2024
            </Typography>
        </Box>
    )
};

export default EmployeeBarChart;
