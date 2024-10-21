import AttendencePieChart from "./AttendencePieChart";
import EmployeeBarChart from "./EmployeeBarChart";
import "../Components/Calendar.css";
import AttendenceTable from "./AttendenceTable";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";

export default function AttendenceHomePage() {
  const [list, setList] = useState([]);
  const [weekBarChartData, setWeekBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { encryptionKey } = useAuth();
  const apiUrl = process.env.REACT_APP_API_MESSENGER_URI;
  function formatDate(date) {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JS
    const yyyy = date.getFullYear();
    setDate(`${dd}/${mm}/${yyyy}`);
    return `${yyyy}-${mm}-${dd}`;
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `${apiUrl}/attendance/fetch-user-present-attendance`,
          {
            headers: {
              "x-encryption-key": encryptionKey,
            },
          }
        );
        setList(response?.data?.data);
      } catch (error) {
        if (error?.response?.message) {
          console.log("error>>>>>>>>>>>", error);
        }
      }
    }
    async function getWeeklyPresentCount() {
      try {
        const response = await axios.get(
          `${apiUrl}/attendance/fetch-weekly-present-count`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key": encryptionKey,
            },
          }
        );
        setWeekBarChartData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching weekly present count:", error);
      }
    }
    async function getEmployeePersent() {
      try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const date = await formatDate(yesterday);
        const response = await axios.get(
          `${apiUrl}/attendance/get-user-attendance-percentage?date=${date}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key": encryptionKey,
            },
          }
        );
        setPieChartData(response?.data?.data);
      } catch (error) {
        if (error?.response?.message) {
        }
      }
    }
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        getData(),
        getWeeklyPresentCount(),
        getEmployeePersent(),
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, [encryptionKey, apiUrl]);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div style={{ margin: "20px 0px" }}>
        <div className="flex-to-display">
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <AttendencePieChart pieData={pieChartData} date={date} />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EmployeeBarChart barData={weekBarChartData} />
            </Grid>
          </Grid>
        </div>
        <div style={{ margin: "20px 0px 0px 0px" }}>
          <AttendenceTable listData={list} />
        </div>
      </div>
    );
  }
}
