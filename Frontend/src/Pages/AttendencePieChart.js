import * as React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function AttendencePieChart({ pieData, date }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [data, setData] = React.useState({});

  const chartSize = isSmallScreen
    ? { width: 300, height: 180, cx: 80, cy: 90 }
    : isMediumScreen
    ? { width: 400, height: 200, cx: 110, cy: 100 }
    : { width: 500, height: 240, cx: 130, cy: 120 };

  React.useEffect(() => {
    setData(pieData);
  }, [pieData]);

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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
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
          Employee Count
        </Typography>
        <Typography
          variant={isSmallScreen ? "body1" : "h6"}
          sx={{
            font: {
              lg: "normal normal 400 18px/24px Poppins",
              md: "normal normal 400 18px/24px Poppins",
              sm: "normal normal 400 14px/16px Poppins",
              xs: "normal normal 400 14px/16px Poppins",
            },
          }}
        >
          {date}
        </Typography>
      </Box>
      <PieChart
        colors={["rgb(72, 83, 174)", "rgb(194, 200, 242)"]}
        series={[
          {
            arcLabel: (item) => `${Number(item?.value)}%`,
            arcLabelMinAngle: 30,
            data: [
              {
                id: 0,
                value: Number(data?.present_percentage),
                label: "Employees Present",
              },
              {
                id: 1,
                value: Number(data?.absent_percentage),
                label: "Employees Absent",
              },
            ],
            cx: chartSize.cx,
            cy: chartSize.cy,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        width={chartSize.width}
        height={chartSize.height}
      />
      <Typography
        variant={isSmallScreen ? "body2" : "h6"}
        sx={{
          textAlign: "center",
          paddingTop: "15px",
          font: {
            lg: "normal normal 400 16px/22px Poppins",
            md: "normal normal 400 16px/22px Poppins",
            sm: "normal normal 400 16px/22px Poppins",
            xs: "normal normal 400 16px/22px Poppins",
          },
        }}
      >
        Total Employees Present -{`${data?.present_users}/${data?.total_users}`}
      </Typography>
    </Box>
  );
}
