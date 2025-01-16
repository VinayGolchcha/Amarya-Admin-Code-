import "../Components/Calendar.css";
import EmployeeAttendencePieChart from "./EmployeeAttendencePieChart";
import { Box, Button, Grid, Typography } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Calendar from "../Components/Calendar";
import { useEffect, useState } from "react";
import Loading from "../sharable/Loading";
import { useAuth } from "../Components/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function EmployeeAttendenceModal({ empId, month, year }) {
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [calenderData, setCalenderData] = useState([]);
  const [empData, setEmpData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { encryptionKey } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;

  useEffect(() => {
    setSelectedYear(year || new Date().getFullYear());
    setSelectedMonth(month || new Date().getMonth());
    refreshData(month, year);
  }, [apiUrl, encryptionKey]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const generateYearOptions = () => {
    const startYear = new Date().getFullYear() - 5; // Adjust this range as needed
    const endYear = new Date().getFullYear()
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
        `${apiUrl}/attendance/get-attendance-summary?empId=${empId}&startDate=${startDate}&endDate=${endDate}`,
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
        `${apiUrl}/attendance/get-user-daily-attendance?empId=${empId}&startDate=${startDate}&endDate=${endDate}`,
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

  async function downloadReport() {
    let selectMonth = selectedMonth >= 10 ? selectedMonth : `0${selectedMonth}`;
    let endDate = `${selectedYear}-${selectMonth}-${getDaysInMonth(
      selectedYear,
      selectedMonth
    )}`;
    let startDate = `${selectedYear}-${selectMonth}-01`;
    try {
      setIsLoading(true);
      const response = await axios({
        url: `${apiUrl}/attendance/get-user-daily-attendance-excel?empId=${empId}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          "x-encryption-key": encryptionKey,
        },
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `report_${Number(selectedMonth)}_${selectedYear}.xlsx`;
      link.click();
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.message) {
        toast.error(error?.response?.message);
      }
      console.error("Error downloading the Excel file", error);
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

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Box
        sx={{
          position: "absolute",
          width: "80%",
          padding: "16px",
          backgroundColor: "white",
          overflowY: "scroll",
          overflowX: "scroll",
          height: "80%",
          top:"10%",
          left:"10%"
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
          <Box>
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
            <Button
              sx={{
                marginLeft: "5px",
                cursor: "pointer",
                backgroundColor: "#b9b9b9",
                color: "#181d60",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
              onClick={downloadReport}
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
        </Box>
        <hr />
        <Box sx={{ display: "flex", gap: "2rem", alignItems: "stretch" }}>
          <EmployeeAttendencePieChart pieData={empData} />
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
        <Calendar
          selectYear={selectedYear}
          selectMonth={selectedMonth}
          calenderData={calenderData}
        />
      </Box>
    );
  }
}
