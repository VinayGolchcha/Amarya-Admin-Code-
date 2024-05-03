// LoginPage.js
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrainingCard from "./TrainingCard";
import Grid from "@mui/material/Grid";
import LaunchIcon from "@mui/icons-material/Launch";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Checkbox,
} from "@mui/material";
import axios from "axios";

// const fields = [
//   {
//     courseName: "Full Stack",
//     courseDescription:
//       "Topics Covered - HTML, CSS, React JS, Node JS, Express Js, MongoDB",
//     color: "#FDEBF9",
//   },
//   {
//     courseName: "DATA SCIENCE",
//     courseDescription:
//       "Topics Covered - Basics of Python, Pandas, Matplotlib, SKlearn, Scipy and ML Regression and Prediction Models.",
//     color: "#F3F8EB",
//   },
//   {
//     courseName: "REACT NATIVE",
//     courseDescription:
//       "Topics Covered - Basics of React, React Native topics and Syntax, Project for Whatsapp Replica with React Native.",
//     color: "#E8F0FB",
//   },
//   {
//     courseName: "VUE JS",
//     courseDescription:
//       "Topics Covered - HTML, CSS, Vue JS, Creating a dynamic Dashboard for professional use at organizational Level.",
//     color: "#F3F8EB",
//   },
//   {
//     courseName: "PYTHON",
//     courseDescription:
//       "Topics Covered - Python Basics, Intermediate and Advanced Python with Django Framework.",
//     color: "#E8F0FB",
//   },
//   {
//     courseName: "SAP ABAP",
//     courseDescription: "Topics Covered - Basics of ABAP Programming Language.",
//     color: "#FDEBF9",
//   },
//   {
//     courseName: "SAP - HR",
//     courseDescription:
//       "Topics Covered - HTML, CSS, React JS, Node JS, Express Js, MongoDB",
//     color: "#E8F0FB",
//   },
//   {
//     courseName: "SAP - CDS",
//     courseDescription:
//       "Topics Covered - HTML, CSS, React JS, Node JS, Express Js, MongoDB",
//     color: "#F3F8EB",
//   },
// ];

export default function TrainingsPage(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [courses, setfields] = React.useState([]);
  const[coursess,setCoursess]=React.useState([]);
  const handleCheckboxChange = (rowId) => {
    const isSelected = selectedRows.includes(rowId);
    setSelectedRows((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  }; 

 ///chetan code
//  const [trainingCards, setTrainingCards] = React.useState("");
 React.useEffect(() => {
  axios.post('http://localhost:4000/api/v1/training/get-user-training', {
    emp_id: "AMEMP003"
  })
    .then(response => {
      console.log('User Training Data:', response.data);
      setCoursess(response.data.data); // Assuming response.data contains the course data
    })
    .catch(error => {
      console.error('Error fetching user training data:', error);
    });
}, []);

 

  React.useEffect(() => {
    // Axios GET request
    axios.get('http://localhost:4000/api/v1/training/training-cards')
      .then(response => {
        console.log('Training Cards:', response);
        // Update state with the fetched data
        setfields(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching training cards:', error);
        // Handle error as needed
      });
  }, []);


  

// 


  const rows = [
    {
      id: 1,
      empid: "AMEMP00012",
      courses: "Full Stack",
      coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
      completedinprogress: "Completed",
      approvedon: "Nov 1, 22",
      approvedrejected: "Approved",
      manager: "HR",
    },
    // Add more rows as needed
  ];
  let row;

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
          AMEMP00012 - Sanjana Jain
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
              {rows.map((row) => (
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
                    {row.training_id}
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
              ))}
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
            {courses.map((course, i) => {
              return <TrainingCard field={course} i={i} key={course.training_id} logo  = {LaunchIcon}  />;
            })}
          </Grid>
          
        </Box>
      </Box>
      {/* <div style={{position:"absolute", top:"0", zIndex:"200"}}>{trainingCards}</div> */}
    </Box>
  );
}