import * as React from "react";
import { Box, Grid } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function EmployeeAttendencePieChart({ pieData }) {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        boxShadow: "none",
        width: "50%",
        border: "1px solid #8f9995",
        padding: "10px",
      }}
    >
      <Grid xs={12} md={9} lg={7}>
        <PieChart
          colors={[
            "rgb(0, 98, 169)",
            "rgb(206, 11, 11)",
            "rgb(205, 138, 0)",
            "rgb(255, 88, 6)",
          ]}
          series={[
            {
              arcLabel: (item) => `${Number(item?.value)}%`,
              arcLabelMinAngle: 30,
              data: [
                {
                  id: 0,
                  value: 25,
                  label: "Employees Present",
                },
                {
                  id: 1,
                  value: 25,
                  label: "Employees Absent",
                },
                {
                  id: 1,
                  value: 30,
                  label: "WFH",
                },
                {
                  id: 1,
                  value: 20,
                  label: "Employees Leaves",
                },
              ],
              cx: 130,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontWeight: "bold",
            },
          }}
          width={500}
          height={240}
        />
      </Grid>
    </Box>
  );
}
