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
    Autocomplete,
  } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
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
  import Alert from '@mui/material/Alert';
  import Loading from "../sharable/Loading";
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const cls = "";
  
  export default function AdminLeaveManagement() {
    const [isLoading , setIsLoading] = React.useState(true);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [leaveType, setLeaveType] = React.useState("Casual Leave");
    const [subject, setSubject] = React.useState("");
    const [body, setBody] = React.useState("");
    const [rows , setRows] = React.useState([]);
    const [leaveOverviewData , setLeaveOverviewData] = React.useState([]);
    const { user } = useAuth();
    const token = encodeURIComponent(user?.token || ""); 
    const [error, setError] = React.useState("");
    const [data, setData] = React.useState(null);
    const [employees, setEmployees] = React.useState([]);
    const [filterEmpId, setFilterEmpId] = React.useState(""); 
    const [loading, setLoading] = React.useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [errorr, setErrorr] = React.useState(null);
    const [filterDropdown, setFilterDropdown] = React.useState([]);
    const today = new Date();
  
    // const [error, setError]  = React.useState(null);
    
  
    // const handleClick = async() => {
      
  const handleFilterChange = (event, newValue) => {
    if (newValue) {
      setFilterEmpId(newValue.emp_id); // Set the employee ID for fetching data
      getData(newValue.emp_id); // Fetch worksheet data for selected employee
    } else {
      setFilterEmpId("");
    }
  };

      const fetchAllEmployees = async () => {
        try {
          const response = await fetch(`${apiUrl}/user/fetch-all-employee-ids`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data.success) {
            setEmployees(data.data); // Assuming data.data contains the list of employees
            setFilterDropdown(data.data.map((emp) => emp.emp_id)); // Assuming emp_id is the identifier
          } else {
            console.error("Failed to fetch employees:", data.message);
          }
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      };
  
    const leaveOverView = async () => {
      try{
        const res = await axios.post(`${process.env.REACT_APP_API_URI}/leave/fetch-leave-overview` ,{
          emp_id : user?.user_id,
          status : "approved"
        } , {
          headers : {
            "x-access-token" : user?.token
          }
        })
        setLeaveOverviewData(res?.data?.data)
      }catch(err){
        toast.error(err?.response?.message);
      }
    }
      
    const getUserLeaves = async() => {
      try{
        const res = await axios.get(`${process.env.REACT_APP_API_URI}/leave/user-all-leave-data` , {
          headers : {
            "x-access-token" : user?.token
          }
        });
        setRows(res?.data?.data);
      }catch(err){
        console.log(err);
      }
    }
    const getData = async ( empId) =>  {
      try {
        setLoading(true);

        const response = await axios.get(
          // `${process.env.REACT_APP_BASE_URL}/api/v1/leave/get-all-leave-count/AMEMP010`
          `${process.env.REACT_APP_API_URI}/leave/get-user-leave-dashboard-data/${empId}` , {
            headers : {
              "x-access-token" : user?.token
            }
          }
          // "https://localhost:4000/api/v1/training/request-new-training"
        );
        setData(response?.data?.data);

        setLoading(false);
      } catch (errorr) {
        setErrorr(errorr);

        setLoading(false);
      }
    }
    React.useEffect(() => {
      
      const fetchData = async () => {
        await Promise.all([
          getUserLeaves(),
          leaveOverView()
        ]);
        setIsLoading(false);
      }
      fetchAllEmployees();
      fetchData();
    },[]);
  
    const handleUpdate = async () => {
  
  
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URI}/leave/leave-request`,
          {
            emp_id: user?.user_id,
            leave_type: leaveType,
            from_date: fromDate,
            to_date: toDate,
            subject: subject,
            body: body,
          } , {
            headers : {
                "x-access-token" : user?.token
              }
            
          }
        );
  
        toast.success(response?.data?.message);
      } catch (error) {
        const errors = error?.response?.data?.errors;
        errors.forEach((item) => {
          toast.error(item?.msg);});
        console.error("Error:", error);
        
      }
    };
  
    function handleToDateChange(newDate) {
      const datee = new Date(newDate);
      const strDatee = datee.toISOString();
      const formatttedDate = strDatee.split("T")[0];
  
      setToDate(formatttedDate);
    }
  
    const formattedDate = (date) => {
      const newDate = new Date(date);
      const datestr = newDate.toString().split(" ");
      return datestr[2] + " " + datestr[1];
      
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
  
    const formattedLeaveDate = (date) => {
      const newdate = new Date(date);
      const dateStr = newdate.toString().split(" ");
      return dateStr[2] + " " + dateStr[1] + " " + dateStr[3];
    }
    const currentDate = new Date();
  
    let row;
    if(isLoading){
      return(
        <Loading/>
      );
    }else{
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
            <ToastContainer/>
            <Box sx={{display : "flex" , justifyContent : "space-between"}}>
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
            <FormControl sx={{ minWidth: 220, mt: "10px" }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ color: "#333333", fontWeight: "400" }}
          >
            {/* Select Employee */}
          </InputLabel>
          {/* Replace the Select component with Autocomplete */}
          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.name} // Display employee names
            filterOptions={(options, state) => {
              return options.filter(option =>
                option.name.toLowerCase().includes(state.inputValue.toLowerCase())
              );
            }}
            value={employees.find((emp) => emp.emp_id === filterEmpId) || null}
            onChange={handleFilterChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Employee"
                variant="standard"
              />
            )}
          />
        </FormControl>
            </Box>
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
                Today’s Date {today.toString().split(" ")[2] }{today.toString().split(" ")[1]} {today.toString().split(" ")[3]}
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
                {data?.user_data?.map((item) => (<Card
                  sx={{
                    minHeight : "110px" ,
                    minWidth : "144px",
                    width: "125px",
                    height: "70px",
                    margin: "10px 0px",
                    marginRight: "10px",
                    backgroundColor: "#FFEFE7",
                    padding: "3px 3px 3px 15px",
                    display : "flex" , 
                    flexDirection : "column" ,
                    justifyContent : "space-between"
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
                </Card>))}
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
                  {data?.holiday_list_data?.map((item) => (<li style={{ fontFamily: "poppins" }}>{formattedDate(item?.date)} - {item?.holiday}</li>))}
                </ol>
              </Card>
            </Box>
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
                  {rows?.length === 0 ?
                  (<TableRow >
                    <TableCell colSpan={8}>
                      <Alert severity="warning">Data not found.</Alert>
                    </TableCell>
                    
                  </TableRow>) : 
                  (rows?.map((row) => (
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
                  )))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      );
    }
  }
  