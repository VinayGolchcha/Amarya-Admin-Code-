import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

export default function DashboardGraph1({ projectsThisYear }) {
  const [divWidth, setDivWidth] = useState(0);

  const size = {
    height: 330,
  };

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 36,
    fontWeight: 700,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  useEffect(() => {
    setDivWidth(document.getElementById("pie-chart")?.offsetWidth || 0);
    const handleResize = () => {
      setDivWidth(document.getElementById("pie-chart")?.offsetWidth || 0);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{ p: 4, pt: 6, border: "1px solid #E0E0E0", borderRadius: "12px" }}
      id="pie-chart"
    >
      <Box>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: "500",
            fontSize: "41px",
            lineHeight: "50px",
            color: "#4D4D4D",
          }}
          variant="h2"
        >
          Projects
        </Typography>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: "700",
            fontSize: "70px",
            lineHeight: "85px",
            color: "#4D4D4D",
          }}
          variant="p"
        >
          {projectsThisYear ? projectsThisYear.length : '--'}
        </Typography>
      </Box>
      <Box sx={{ mt: -3 }}>
        <PieChart
          series={[
            {
              data: projectsThisYear?.map(project => ({
                value: project.value || 0,
                label: project.label || '--',
                color: project.color || '#CCCCCC'
              })) || [],
              paddingAngle: 5,
              innerRadius: Math.max(Math.max(divWidth * 0.14, 95), 35),
              outerRadius: Math.max(Math.min(divWidth * 0.24, 165), 55),
              cornerRadius: 8,
            },
          ]}
          {...size}
          slotProps={{
            legend: {
              direction: "column",
              position: {
                vertical: divWidth > 700 ? "middle" : "bottom",
                horizontal: "left",
              },
              itemMarkWidth: 32,
              itemMarkHeight: 21,
              itemGap: 10,
              labelStyle: {
                fontSize: divWidth > 700 ? 28 : 18,
                fill: "#000000B2",
                fontWeight: 700,
              },
            },
          }}
          margin={{
            top: 0,
            left: divWidth > 800 ? divWidth * 0.25 : divWidth * 0.4,
            right: 0,
            bottom: 0,
          }}
        >
          <PieCenterLabel>2023</PieCenterLabel>
        </PieChart>
      </Box>
    </Box>
  );
}
