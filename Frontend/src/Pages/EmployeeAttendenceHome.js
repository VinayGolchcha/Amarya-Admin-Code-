import "../Components/Calendar.css";
import EmployeeAttendencePieChart from "./EmployeeAttendencePieChart";
import { Box, Button, Grid, Typography } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Calendar from "../Components/Calendar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Components/AuthContext";
import axios from "axios";

export default function EmployeeAttendenceHomePage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
  const [calenderData, setCalenderData] = useState([]);
  const [empData, setEmpData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { encryptionKey, user } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;

  useEffect(() => {
    refreshData(selectedMonth, selectedYear);
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const generateYearOptions = () => {
    const startYear = new Date().getFullYear() - 5; // Adjust this range as needed
    const endYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  async function getUserDetails(month, year) {
    try {
      let selectMonth = month >= 10 ? month : `0${month}`;
      let endDate = `${year}-${selectMonth}-${getDaysInMonth(year, month)}`;
      let startDate = `${year}-${selectMonth}-01`;
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/attendance/get-attendance-summary?empId=${user?.user_id}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      setEmpData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.message) {
        toast.error(error?.response?.message);
      }
    }
  }

  async function getCalenderData(month, year) {
    try {
      let selectMonth = month >= 10 ? month : `0${month}`;
      let endDate = `${year}-${selectMonth}-${getDaysInMonth(year, month)}`;
      let startDate = `${year}-${selectMonth}-01`;
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/attendance/get-user-daily-attendance?empId=${user?.user_id}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "x-encryption-key": encryptionKey,
          },
        }
      );
      setCalenderData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.message) {
        toast.error(error?.response?.message);
      }
    }
  }

  const refreshData = async (month, year) => {
    setIsLoading(true);
    await Promise.all([
      getUserDetails(month, year),
      getCalenderData(month, year),
    ]);
    setIsLoading(false);
  };

  return (
    <Box style={{ margin: "30px 20px 20px 20px", backgroundColor: "white" }}>
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
          {empData?.emp_name} Attendance
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
      <Box sx={{ textAlign: "end" }}>
        <select
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            refreshData(e.target.value, selectedYear);
          }}
        >
          {Array.from({ length: 12 }, (v, k) => (
            <option key={k} value={k + 1}>
              {new Date(0, k).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            refreshData(selectedMonth, e.target.value);
          }}
        >
          {generateYearOptions()}
        </select>
      </Box>
      <Box sx={{ display: "flex", gap: "2rem", alignItems: "stretch" }}>
        <EmployeeAttendencePieChart pieData={empData} />
        <Grid sx={{ width: "100%" }}>
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
                {empData?.emp_name}
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
                {empData?.emp_id}
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
                {empData?.total_working_days}
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
                {empData?.no_present_days}
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
                {empData?.no_leaves}
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
                {empData?.work_from_home}
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
                {empData?.no_absent_days}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Box>
      <Box style={{ margin: "20px 0px 0px 0px" }}>
        <Calendar
          selectYear={selectedYear}
          selectMonth={selectedMonth}
          calenderData={calenderData}
        />
      </Box>
    </Box>
  );
}
