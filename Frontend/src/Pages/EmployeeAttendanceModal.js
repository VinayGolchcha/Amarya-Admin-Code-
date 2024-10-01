import "../Components/Calendar.css";
import EmployeeAttendencePieChart from "./EmployeeAttendencePieChart";
import { Box, Button, Grid, Typography } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Calendar from "../Components/Calendar";

export default function EmployeeAttendenceModal() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "80%",
        padding: "16px",
        backgroundColor: "white",
        overflowY: "scroll",
        overflowX: "scroll",
        margin: "5%",
        height: "80%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            font: {
              lg: "normal normal bold 20px/35px Poppins",
              md: "normal normal bold 20px/35px Poppins",
              sm: "normal normal bold 18px/30px Poppins",
              xs: "normal normal bold 18px/30px Poppins",
            },
          }}
        >
          Employees Attendance
        </Typography>
        <Button
          sx={{
            marginLeft: "5px",
            cursor: "pointer",
            backgroundColor: "#b9b9b9",
            color: "#181d60",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Download Report
          <FileDownloadOutlinedIcon
            sx={{
              marginLeft: "5px",
              backgroundColor: "#181d60",
              color: "white",
              borderRadius: "50%",
            }}
          />
        </Button>
      </Box>
      <hr />
      <Box sx={{ display: "flex", gap: "2rem", alignItems: "stretch" }}>
        <EmployeeAttendencePieChart />
        <Grid xs={12} md={9} lg={7} sx={{ width: "100%" }}>
          <Box
            sx={{
              borderRadius: "20px",
              border: "1px solid rgba(0, 0, 0, 0.30)",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box className="flex-to-display">
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "50%",
                  textAlign: "left",
                }}
              >
                Employees Name
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "10%",
                  textAlign: "left",
                }}
              >
                :
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "40%",
                  textAlign: "left",
                }}
              >
                Ankit
              </Typography>
            </Box>
            <Box className="flex-to-display">
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "50%",
                  textAlign: "left",
                }}
              >
                Employees Id
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "10%",
                  textAlign: "left",
                }}
              >
                :
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "40%",
                  textAlign: "left",
                }}
              >
                345677
              </Typography>
            </Box>
            <Box className="flex-to-display">
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "50%",
                  textAlign: "left",
                }}
              >
                Number of Working Days
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "10%",
                  textAlign: "left",
                }}
              >
                :
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "40%",
                  textAlign: "left",
                }}
              >
                24
              </Typography>
            </Box>
            <Box className="flex-to-display">
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "50%",
                  textAlign: "left",
                }}
              >
                Number of Present Days
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "10%",
                  textAlign: "left",
                }}
              >
                :
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "40%",
                  textAlign: "left",
                }}
              >
                24
              </Typography>
            </Box>
            <Box className="flex-to-display">
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "50%",
                  textAlign: "left",
                }}
              >
                Number of Leaves
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "10%",
                  textAlign: "left",
                }}
              >
                :
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "40%",
                  textAlign: "left",
                }}
              >
                24
              </Typography>
            </Box>
            <Box className="flex-to-display">
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "50%",
                  textAlign: "left",
                }}
              >
                Number of WFH
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "10%",
                  textAlign: "left",
                }}
              >
                :
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "40%",
                  textAlign: "left",
                }}
              >
                24
              </Typography>
            </Box>
            <Box className="flex-to-display">
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "50%",
                  textAlign: "left",
                }}
              >
                Number of Absent
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "10%",
                  textAlign: "left",
                }}
              >
                :
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  font: {
                    lg: "normal normal bold 12px/35px Poppins",
                    md: "normal normal bold 12px/35px Poppins",
                    sm: "normal normal bold 12px/30px Poppins",
                    xs: "normal normal bold 12px/30px Poppins",
                  },
                  width: "40%",
                  textAlign: "left",
                }}
              >
                24
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Box>
      <Calendar />
    </Box>
  );
}
