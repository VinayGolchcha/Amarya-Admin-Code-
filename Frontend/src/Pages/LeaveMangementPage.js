//
// LoginPage.js
import {
  Typography,
  Box,
  TextField,
  FormLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const cls = "";

export default function LeaveMangementPage() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [leaveType, setLeaveType] = React.useState("casual leave");
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  ////
  
  // new code
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(null);

  const [loading, setLoading] = React.useState(true);

  const [errorr, setErrorr] = React.useState(null);

  // const [error, setError]  = React.useState(null);
  
 console.log(data)
  // const handleClick = async() => {
  React.useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.REACT_APP_API_URI}/leave/get-all-leave-count/AMEMP010`
        );

        setData(response?.data.data);

        setLoading(false);
      } catch (errorr) {
        setErrorr(errorr);

        setLoading(false);
      }
    }
    getData();
  },[]);

  const handleUpdate = async () => {
    console.log(
      leaveType + " " + fromDate + " " + toDate + " " + subject + " " + body
    );

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/leave/leave-request`,
        {
          emp_id: "AMEMP010",
          leave_type: leaveType,
          from_date: fromDate,
          to_date: toDate,
          subject: subject,
          body: body,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function handleToDateChange(newDate) {
    const datee = new Date(newDate);
    const strDatee = datee.toISOString();
    const formatttedDate = strDatee.split("T")[0];

    setToDate(formatttedDate);
  }

  ////
  function handleFromDateChange(newDate) {
    const date = new Date(newDate);
    const strDate = date.toISOString();
    const formattedDate = strDate.split("T")[0];
    setFromDate(formattedDate);
    // If toDate is selected and it's less than fromDate, reset toDate
    if (toDate && newDate > toDate) {
      setToDate(null);
    }
  }
  function handleChange(e) {
    setLeaveType(e.target.value);
  }
  const currentDate = new Date();
  const rows = [
    {
      id: 1,
      startDate: "13-03-21",
      endDate: "15-03-21",
      days: "2",
      leaveType: "casual",
      extendedLeave: "casual",
      approvedrejected: "Approved",
      manager: "HR",
    },
    // Add more rows as needed
  ];
  let row;
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            margin: "12px 0px",
            width: "630px",
            height: "42px",
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "500",
            lineHeight: "42px",
            color: "#121843",
          }}
        >
          Leave Management
        </Typography>
        <Typography
          sx={{
            margin: "12px 0px",
            width: "542px",
            height: "28px",
            fontFamily: "Racing Sans One",
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "28px",
            color: "#121843",
          }}
        >
          AMEMP00012 - Sanjana Jain
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#161E54",
            height: "auto",
            width: "100%",
            p: 3,
            borderRadius: "10px",
            overflow: "auto",
          }}
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#FFFFFF",
              fontFamily: "Poppins",
              lineHeight: "25px",
            }}
          >
            Today’s Date 15th Sept 2021
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              marginTop: "10px",
              fontFamily: "Poppins",
              flexWrap: "wrap",
            }}
            spacing={2}
          >
            {data?.map((item , i) => {return (<Card
              sx={{
                width: "125px",
                height: "110px",
                margin: "10px 0px",
                marginRight: "10px",
                backgroundColor: "#FFEFE7",
                padding: "3px 3px 3px 15px",
              }}
            >
              <Typography sx={{ fontFamily: "Poppins", fontWeight: "500" }}>
                {item?.leave_type}
              </Typography>
              <CardContent sx={{ padding: "0px" }}>
                <Typography sx={{ fontWeight: "500", fontFamily: "Poppins" }}>
                  <strong style={{ fontSize: "1.5rem" }}>{item?.leave_taken_count}</strong>/{item?.leave_count}
                </Typography>
              </CardContent>
            </Card>)})}
            
          </Box>
          <Typography
            variant="h6"
            sx={{
              margin: "14px 0px",
              color: "#ffffffa6",
              fontFamily: "Poppins",
              lineHeight: "25px",
            }}
          >
            Holidays List 2021
          </Typography>
          <Card
            sx={{
              height: "48%",
              width: "fit-content",
              overflow: "auto",
              padding: "2px 12px",
            }}
          >
            <ol
              style={{
                fontFamily: "poppins",
                fontSize: "0.9rem",
                fontWeight: "400",
                paddingLeft: "1rem",
              }}
            >
              <li style={{ fontFamily: "poppins" }}>13th March - Holi</li>
              <li style={{ fontFamily: "poppins" }}>23rd Aug - Rakhi</li>
              <li style={{ fontFamily: "poppins" }}>
                15th Aug - Independence Day
              </li>
              <li style={{ fontFamily: "poppins" }}>
                2nd Oct - Gandhi Jayanti
              </li>
              <li style={{ fontFamily: "poppins" }}>8th Nov - Diwali</li>
            </ol>
          </Card>
        </Box>
        <Grid
          container
          spacing={1}
          sx={{ margin: "6px 0px", justifyContent: "space-between" }}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box
              p={1}
              sx={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                width: "auto",
                border: "1px solid #E0E0E0E0",
                borderRadius: "12px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  color: "#161E54",
                  fontSize: "1.4rem",
                }}
              >
                Leave Application{" "}
                <Box
                  sx={{ width: { lg: "35%", md: "40%", sm: "40%", xs: "43%" } }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      sx={{
                        margin: "4px 0px",
                        "&.MuiTextField-root .MuiInputBase-input::placeholder":
                          {
                            fontSize:
                              "14px" /* Adjust the font size as needed */,
                          },
                      }}
                      label="From Date"
                      value={fromDate}
                      minDate={currentDate}
                      onChange={handleFromDateChange}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                      slotProps={{ textField: { size: "small" } }}
                    />
                    <DatePicker
                      label="To Date"
                      sx={{
                        "&.MuiTextField-root .MuiInputBase-input::placeholder":
                          {
                            fontSize:
                              "14px" /* Adjust the font size as needed */,
                          },
                      }}
                      value={toDate}
                      minDate={fromDate} // Set the minDate based on fromDate
                      // onChange={(newDate) => setToDate(newDate)}
                      onChange={handleToDateChange}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: "12px" }}
              >
                Leave Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={leaveType}
                label="leaveType"
                sx={{ width: "100%", backgroundColor: "#fafafa" }}
                onChange={handleChange}
              >
                <MenuItem value={"casual leave"}>casual  </MenuItem>
                <MenuItem value={"Sick leave"}>Sick </MenuItem>
              </Select>
              <br />
              <FormLabel sx={{ fontSize: "12px" }}>Subject</FormLabel>
              <TextField
                variant="outlined"
                onChange={(e) => setSubject(e.target.value)}
                sx={{ width: "100%", backgroundColor: "#fafafa" }}
              />
              <FormLabel sx={{ margin: "2px 0px", fontSize: "12px" }}>
                Body
              </FormLabel>
              <TextField
                multiline
                rows={3}
                variant="outlined"
                onChange={(e) => setBody(e.target.value)}
                sx={{ width: "100%", backgroundColor: "#fafafa" }}
              />
            </Box>
            <Button
              variant="outlined"
              sx={{
                color: "red",
                borderColor: "white",
                border: "1px solid #E0E0E0E0",
                width: "100%",
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                textTransform: "none",
                marginTop: "9px",
                "&:hover": {
                  borderColor: "#E0E0E0E0",
                },
              }}
              onClick={handleUpdate}
            >
              Send to admin
            </Button>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box
              p={1}
              sx={{
                backgroundColor: "#FFFFFF",
                height: "auto",
                width: "auto",
                border: "1px solid #E0E0E0E0",
                borderRadius: "12px",
              }}
            >
              <Box
                sx={{
                  color: "#161E54",
                  fontSize: "1.4rem",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                Leaves Overview
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      width: "35%",
                      "&.MuiTextField-root .MuiInputBase-input::placeholder": {
                        fontSize: "14px" /* Adjust the font size as needed */,
                      },
                    }}
                    label={"MM/YYYY"}
                    views={["month", "year"]}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
                {/* date code ends here */}
              </Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: "#686868",
                  fontSize: "12px",
                  marginTop: "4px",
                }}
              >
                {" "}
                Details of Leave taken in the Past
              </Typography>
              <Box
                sx={{
                  width: "auto",
                  overflow: "auto",
                  margin: "4px 0px",
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    padding: "4px 0px",
                    height: { lg: "340px", md: "362px", sm: "305px" },
                  }}
                >
                  <ListItem
                    sx={{
                      backgroundColor: "#fafafa",
                      margin: "5px 0px",
                      border: "0.5px solid #E0E0E0",
                      borderRadius: "6px",
                    }}
                  >
                    <ListItemText
                      primary="Brother’s Marriage "
                      secondary={
                        <React.Fragment>
                          {"24th Jan 2021 - 26th Jan 2021"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <ListItem
                    sx={{
                      backgroundColor: "#fafafa",
                      margin: "5px 0px",
                      border: "0.5px solid #E0E0E0",
                      borderRadius: "6px",
                    }}
                  >
                    <ListItemText
                      primary="Rakhi Leave"
                      secondary={
                        <React.Fragment>{"15th Aug 2021"}</React.Fragment>
                      }
                    />
                  </ListItem>
                  <ListItem
                    sx={{
                      backgroundColor: "#fafafa",
                      margin: "5px 0px",
                      border: "0.5px solid #E0E0E0",
                      borderRadius: "6px",
                    }}
                  >
                    <ListItemText
                      primary="Due to personal reason "
                      secondary={
                        <React.Fragment>
                          {"1st Sep 2021 - 4th Sep 2021"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <ListItem
                    sx={{
                      backgroundColor: "#fafafa",
                      margin: "5px 0px",
                      border: "0.5px solid #E0E0E0",
                      borderRadius: "6px",
                    }}
                  >
                    <ListItemText
                      primary="Due to personal reason "
                      secondary={
                        <React.Fragment>
                          {"1st Sep 2021 - 4th Sep 2021"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Typography
          color="error"
          variant="h6"
          my={2}
          sx={{ fontFamily: "Preahvihear" }}
        >
          Leave Description
        </Typography>
        <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
          <Table>
            <TableHead>
              <TableRow style={{ fontFamily: "Poppins" }}>
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                    minWidth: "110px",
                    height: "40px",
                  }}
                >
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                    alt="Check"
                    sx={{ paddingRight: "10px" }}
                    // onClick= {handleClick}
                  />
                  S.no
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                  }}
                >
                  Start Date
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                  }}
                >
                  End Date
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                  }}
                >
                  Days
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                  }}
                >
                  Leave Type
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                  }}
                >
                  Extended Leave
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                  }}
                >
                  Approved/Rejected
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                  }}
                >
                  Manager
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    style={{ fontFamily: "Poppins", minWidth: "110px" }}
                  >
                    <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                      alt="Check"
                      style={{ filter: "invert(1)" }}
                      sx={{ paddingRight: "9px" }}
                    />
                    {row.id}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "Poppins", color: "#74828F" }}
                  >
                    {row.startDate}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "Poppins", color: "#74828F" }}
                  >
                    {row.endDate}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "Poppins", color: "#74828F" }}
                  >
                    {row.days}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "Poppins", color: "#74828F" }}
                  >
                    {row.leaveType}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "Poppins", color: "#74828F" }}
                  >
                    {row.extendedLeave}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "Poppins", color: "#74828F" }}
                  >
                    {row.approvedrejected}
                  </TableCell>
                  <TableCell
                    style={{ fontFamily: "Poppins", color: "#74828F" }}
                  >
                    {row.manager}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}