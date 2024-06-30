// LoginPage.js
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrainingCard from "./TrainingCard";
import Grid from "@mui/material/Grid";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Checkbox,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";
import { toast } from "react-toastify";

const field = [
  {
    courseName: "Full Stack",
    courseDescription:
      "Topics Covered - HTML, CSS, React JS, Node JS, Express Js, MongoDB",
    color: "#FDEBF9",
  },
  {
    courseName: "DATA SCIENCE",
    courseDescription:
      "Topics Covered - Basics of Python, Pandas, Matplotlib, SKlearn, Scipy and ML Regression and Prediction Models.",
    color: "#F3F8EB",
  },
  {
    courseName: "REACT NATIVE",
    courseDescription:
      "Topics Covered - Basics of React, React Native topics and Syntax, Project for Whatsapp Replica with React Native.",
    color: "#E8F0FB",
  },
  {
    courseName: "VUE JS",
    courseDescription:
      "Topics Covered - HTML, CSS, Vue JS, Creating a dynamic Dashboard for professional use at organizational Level.",
    color: "#F3F8EB",
  },
  {
    courseName: "PYTHON",
    courseDescription:
      "Topics Covered - Python Basics, Intermediate and Advanced Python with Django Framework.",
    color: "#E8F0FB",
  },
  {
    courseName: "SAP ABAP",
    courseDescription: "Topics Covered - Basics of ABAP Programming Language.",
    color: "#FDEBF9",
  },
  {
    courseName: "SAP - HR",
    courseDescription:
      "Topics Covered - HTML, CSS, React JS, Node JS, Express Js, MongoDB",
    color: "#E8F0FB",
  },
  {
    courseName: "SAP - CDS",
    courseDescription:
      "Topics Covered - HTML, CSS, React JS, Node JS, Express Js, MongoDB",
    color: "#F3F8EB",
  },
];

export default function TrainingsPage(props) {
  const[isLoading , setIsLoading] = React.useState(true);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rows , setRows] = React.useState([])
  const [courses, setfields] = React.useState([]);
  const [trainingId , setTrainingId] = React.useState(null);
  const handleCheckboxChange = (rowId) => {
    const isSelected = selectedRows.includes(rowId);
    setSelectedRows((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  }; 
  const {user} = useAuth();

 ///chetan code
 const [trainingCards, setTrainingCards] = React.useState("");

 const getUserTraining = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URI}/training/get-user-training` , {
      emp_id : user?.user_id
    }, {
      headers : {
        "x-access-token" : user?.token
      }
    });
    setRows(res?.data?.data?.map((item) => ({
      id: item?.training_id[8],
      empid: user?.user_id,
      courses: item?.course_name,
      coursedescription: item?.course_description,
      completedinprogress: item?.progress_status,
      approvedon: "Nov 1, 22",
      approvedrejected: item?.status,
      manager: "HR",
    })));

  }catch(error){
    if(error?.response?.message){
      toast.error(error?.response?.message);
    }
    if(error?.response?.data?.message){
      console.log("true");
      const item = error?.response?.data?.message
      toast.error(item);
    }
    console.log(error);
  }
 }

 const fecthTrainings = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URI}/training/training-cards` , {
      headers : {
        "x-access-token" : user?.token
      }
    });
    setfields(res?.data?.data?.map((item , i) => (
      {
        courseName : item?.course_name ,
        trainindId : item?.training_id,
        roadmapurl : item?.roadmap_url,
        courseDescription : item?.course_description,
        color : field[i%field.length].color
      }
    )));
  }catch(error){
    if(error?.response?.message){
      toast.error(error?.response?.message);
    }
    if(error?.response?.data?.message){
      console.log("true");
      const item = error?.response?.data?.message
      toast.error(item);
    }
    console.log(error);
  }
 }

 const requestTraining = async (requestData) => {
  try{
    const res = await axios.post(`${process.env.REACT_APP_API_URI}/training/request-new-training`, requestData , {
      headers : {
        "x-access-token" : user?.token
      }
    });
    setIsLoading(false);
    toast.success(res?.data?.message);
    console.log(res);
  }catch(error){
    setIsLoading(false);
    if(error?.response?.message){
      toast.error(error?.response?.message);
    }
    if(error?.response?.data?.message){
      console.log("true");
      const item = error?.response?.data?.message
      toast.error(item);
    }
  }
 }
 const handleRequest = (val) => {
  const requestData = {
    emp_id: user?.user_id,
    training_id: val,
    request_type: "training",
    progress_status: "in progress"
  };
  setIsLoading(true);
  requestTraining(requestData);
 }
  React.useEffect(() => {
    // Axios GET request
    // axios.get(`${process.env.REACT_APP_API_URI}/training/training-cards` , {
    //   headers : {
    //     "x-access-token" : user?.token
    //   }
    // })
    //   .then(response => {
    //     console.log('Training Cards:', response.data.message);
    //     // Update state with the fetched data
    //     setTrainingCards(response?.data?.data);
    //     setfields(trainingCards?.map((item , i) => (
    //       {
    //         courseName : item?.course_name ,
    //         trainindId : item?.training_id,
    //         roadmapurl : item?.roadmap_url,
    //         courseDescription : item?.course_description,
    //         color : field[i].color
    //       }
    //     )));

    //   })
    //   .catch(error => {
    //     console.error('Error fetching training cards:', error);
    //     // Handle error as needed
    //   });
    const fetchData = async () => {
      await Promise.all(
        [
          fecthTrainings(),
          getUserTraining()
        ]
      );
      setIsLoading(false);
    }
    fetchData();
  }, []);


  // React.useEffect(() => {
  //   // Data to be sent in the request
  //   const requestData = {
  //     emp_id: user?.user_id,
  //     training_id: "AMTRAN005",
  //     request_type: "training",
  //     progress_status: "in progress"
  //   };

  //   // Axios POST request
  //   axios.post(`${process.env.REACT_APP_API_URI}/training/request-new-training`, requestData , {
  //     headers : {
  //       "x-access-token" : user?.token
  //     }
  //   })
  //     .then(response => {
  //       console.log('Response:', response);
  //       // Handle response as needed
  //     })  
  //     .catch(error => {
  //       console.error('Error:', error);
  //       // Handle error as needed
  //     });
  // }, []); // Empty dependency array means this effect runs only once after initial render

// 



  let row;
  console.log(courses);
  if(isLoading){
    return(
      <Loading/>
    );
  }else{
      return (
        <Box sx={{ display: "flex" }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: 100,
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
              Training
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
            <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
              <Table>
                <TableHead>
                  <TableRow style={{ fontFamily: "Poppins" }}>
                    <TableCell
                      style={{
                        backgroundColor: "#161e54",
                        color: "#ffffff",
                        fontFamily: "Poppins",
                        minWidth: "104px",
                        height: "40px",
                      }}
                    >
                      <img
                        src="Check.svg"
                        style={{ margin: "-4px 2px", marginRight: "4px" }}
                      />
                      Tr.Id
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#161e54",
                        color: "#ffffff",
                        fontFamily: "Poppins",
                      }}
                    >
                      Employee ID
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#161e54",
                        color: "#ffffff",
                        fontFamily: "Poppins",
                      }}
                    >
                      Courses
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#161e54",
                        color: "#ffffff",
                        fontFamily: "Poppins",
                      }}
                    >
                      Course Description
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
                      Approved On
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#161e54",
                        color: "#ffffff",
                        fontFamily: "Poppins",
                      }}
                    >
                      Approval Status
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
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        <Box
                          component="img"
                          src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                          alt="Check"
                          style={{ filter: "invert(1)" }}
                          sx={{ paddingRight: "9px" }}
                        />
                        {row.id}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row.empid}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row.courses}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row.coursedescription}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row.completedinprogress}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row.approvedon}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row.approvedrejected}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row.manager}
                      </TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexWrap: "wrap",
                p: 1,
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                {courses?.map((course, i) => {
                  return <TrainingCard field={course} i={i} setTrainingId = {setTrainingId}  handleRequest = {handleRequest} />;
                })}
              </Grid>
              
            </Box>
          </Box>
          {/* <div style={{position:"absolute", top:"0", zIndex:"200"}}>{trainingCards}</div> */}
        </Box>
      );

  }
}
