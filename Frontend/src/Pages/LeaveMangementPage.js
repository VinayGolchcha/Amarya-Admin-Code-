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
import { useAuth } from "../Components/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import Loading from "../sharable/Loading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const cls = "";

export default function LeaveMangementPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [fromDate, setFromDate] = React.useState((new Date()).toISOString().split('T')[0]);
  const [date , setDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [leaveType, setLeaveType] = React.useState("Casual Leave");
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [leaveOverviewData, setLeaveOverviewData] = React.useState([]);
  const [leaveTypes, setLeaveTypes] = React.useState([]); // State for le
  const [validateDuration , setValidateDuration] = React.useState(false);
  const apiUrl = process.env.REACT_APP_API_URI;


  ////

  // new code
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(null);

  const [loading, setLoading] = React.useState(true);

  const [errorr, setErrorr] = React.useState(null);
  const { user , encryptionKey} = useAuth();
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly
  const today = new Date();

  // const [error, setError]  = React.useState(null);

  // const handleClick = async() => {

  const leaveOverViewByDate = async (date) => {
    try {
      const res = await axios.post(
        `${apiUrl}/leave/fetch-leave-overview`,
        {
          emp_id: user?.user_id,
          date : date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey
          },
        }
      )
      setLeaveOverviewData(res?.data?.data)
    }catch(error){
      setLeaveOverviewData([]);
      if(error?.response?.message) {
        toast.error(error?.response?.message);
      }
      
    }
  };
  

  const leaveOverView = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/leave/fetch-leave-overview`,
        {
          emp_id: user?.user_id,
          status: "approved",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey
          },
        }
      );
      setLeaveOverviewData(res?.data?.data);
    } catch (error) {
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
    }
  };
  const fetchLeaveData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/leave/fetch-leave-type-and-count`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey
          },
        }
      );
      setLeaveTypes(response.data.data); // Update the leave types state
    } catch (error) {
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      console.error("Error fetching leave types:", error);
    }
  };

  const getUserLeaves = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/leave/user-all-leave-data`,
        {
          emp_id: user?.user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey
          },
        }
      );
      setRows(res?.data?.data || []); // Ensure to handle empty response data gracefully
    } catch (error) {
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      console.log(error);
    }
  };
  React.useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const response = await axios.get(
          // `${process.env.REACT_APP_BASE_URL}/api/v1/leave/get-all-leave-count/AMEMP010`
          `${apiUrl}/leave/get-user-leave-dashboard-data/${user?.user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key" : encryptionKey
            },
          }
        );
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setErrorr(error);
        if(error?.response?.message){
          toast.error(error?.response?.message);
        }
        setLoading(false);
      }
    }
    const fetchData = async () => {
      await Promise.all([getData(), getUserLeaves(), leaveOverView()]);
      fetchLeaveData(); // Fetch leave types on component mount
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const validateFromDate = new Date(fromDate);
      const validateToDate = new Date(toDate);
      if(validateFromDate > validateToDate){
        toast.warn("From date should be less than the to date");
        return;
      }
      const response = await axios.post(
        `${apiUrl}/leave/leave-request`,
        {
          emp_id: user?.user_id,
          leave_type: leaveType,
          from_date: fromDate,
          to_date: toDate,
          subject: subject,
          body: body,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey
          },
        }
      );

      toast.success(response?.data?.message);
      getUserLeaves();
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if(errors){
        toast.error(errors[0].msg);
      }
      console.error("Error:", error);
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response.data.message){
        toast.error(error?.response.data.message);
      }
    }
  };

  function handleToDateChange(newDate) {
    const dateObj = new Date(newDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObj.getDate()).padStart(2, '0');

    // Format the date manually as YYYY-MM-DD.
    const formattedDate = `${year}-${month}-${day}`;
    setToDate(formattedDate);
  }

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const datestr = newDate.toString().split(" ");
    return datestr[2] + " " + datestr[1];
  };
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

  function handleDateChange(newDate){
    const date = new Date(newDate);
    const isoDate = date?.toISOString()?.split("T")[0];
    leaveOverViewByDate(isoDate);
    setDate(isoDate);
    
  }

  const formattedLeaveDate = (date) => {
    const newdate = new Date(date);
    const dateStr = newdate.toString().split(" ");
    return dateStr[2] + " " + dateStr[1] + " " + dateStr[3];
  };
  const currentDate = new Date();

  let row;
  if (isLoading) {
    return (<Loading />);
  } else {
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
          <ToastContainer />
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
            {user?.user_id} - {user?.user_name}
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
              Today’s Date {today.toString().split(" ")[2]}
              {today.toString().split(" ")[1]} {today.toString().split(" ")[3]}
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
              {data?.user_data?.map((item) => (
                <Card
                  sx={{
                    minHeight: "91px",
                    minWidth: "144px",
                    width: "125px",
                    height: "70px",
                    margin: "10px 0px",
                    marginRight: "10px",
                    backgroundColor: "#FFEFE7",
                    padding: "3px 3px 3px 15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontFamily: "Poppins", fontWeight: "500" , fontSize : "0.9rem" }}>
                    {item?.leave_type}
                  </Typography>
                  <CardContent sx={{ padding: "0px" ,  "&:last-child": {
                      paddingBottom: "7px",
                    },}}>
                    <Typography
                      sx={{ fontWeight: "500", fontFamily: "Poppins" }}
                    >
                      <strong style={{ fontSize: "1.5rem" }}>
                        {item?.leave_taken_count}
                      </strong>
                      /{item?.leave_count}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
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
              Holidays List {today.toString().split(" ")[3]}
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
                {data?.holiday_list_data?.map((item) => (
                  <li style={{ fontFamily: "poppins" }}>
                    {formattedDate(item?.date)} - {item?.holiday}
                  </li>
                ))}
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
                    marginLeft: "15px",
                  }}
                >
                  Leave Application{" "}
                  <Box
                    sx={{
                      width: { lg: "35%", md: "40%", sm: "53%", xs: "63%" },
                    }}
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
                        format="dd/MM/yyyy"
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
                        format="dd/MM/yyyy"
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
                  required
                >
                  {leaveTypes?.map((type) => (
                    <MenuItem key={type.leave_type} value={type.leave_type}>
                      {type.leave_type}
                    </MenuItem>
                  ))}
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
                    marginLeft: "15px",
                  }}
                >
                  Leaves Overview
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        sx={{
                          width: {lg :"35%" , md : "35%" , sm : "35%" , xs : "66%"},
                          "&.MuiTextField-root .MuiInputBase-input::placeholder":
                            {
                              fontSize:
                                "14px" /* Adjust the font size as needed */,
                            },
                            "&.MuiFormLabel-root-MuiInputLabel-root" : {
                              fontSize : "14px"
                            }
                        }}
                        label="Select Date"
                        value={date}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
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
                    marginLeft: "10px",
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
                    {leaveOverviewData?.map((item) => (
                      <ListItem
                        sx={{
                          backgroundColor: "#fafafa",
                          margin: "5px 0px",
                          border: "0.5px solid #E0E0E0",
                          borderRadius: "6px",
                        }}
                      >
                        <ListItemText
                          primary={item?.leave_type}
                          secondary={
                            <React.Fragment>
                              {formattedLeaveDate(item?.from_date)} -{" "}
                              {formattedLeaveDate(item?.to_date)}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    ))}
                    {leaveOverviewData?.length === 0 && 
                       <ListItem
                       sx={{
                         backgroundColor: "#fafafa",
                         margin: "5px 0px",
                         border: "0.5px solid #E0E0E0",
                         borderRadius: "6px",
                       }}
                     >
                       <ListItemText
                         primary={""}
                         secondary={
                           <React.Fragment>
                             Leaves not found for the selected month
                           </React.Fragment>
                         }
                       />
                     </ListItem>
                    }
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
                      sx={{ paddingRight: "20px" }}
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
                    Status
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
                {rows?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Alert severity="warning">Leaves not found.</Alert>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows?.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell
                        style={{ fontFamily: "Poppins", minWidth: "110px" }}
                      >
                        <Box
                          component="img"
                          src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                          alt="Check"
                          style={{ filter: "invert(1)" }}
                          sx={{ paddingRight: "29px" }}
                        />
                        {index + 1}
                      </TableCell>
                      <TableCell
                        style={{ fontFamily: "Poppins", color: "#74828F" }}
                      >
                        {row.from_date}
                      </TableCell>
                      <TableCell
                        style={{ fontFamily: "Poppins", color: "#74828F" }}
                      >
                        {row.to_date}
                      </TableCell>
                      <TableCell
                        style={{ fontFamily: "Poppins", color: "#74828F" }}
                      >
                        {row.total_days}
                      </TableCell>
                      <TableCell
                        style={{ fontFamily: "Poppins", color: "#74828F" }}
                      >
                        {row.leave_type}
                      </TableCell>
                      <TableCell
                        style={{ fontFamily: "Poppins", color: "#74828F" }}
                      >
                        {row.status}
                      </TableCell>
                      <TableCell
                        style={{ fontFamily: "Poppins", color: "#74828F" }}
                      >
                        {row.manager}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}
