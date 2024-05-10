import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrainingCard from "./TrainingCard";
import Grid from "@mui/material/Grid";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Checkbox,
  TablePagination,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Alert,
} from "@mui/material";

import { pink } from "@mui/material/colors";
import Filter from "../Components/Filter";
import AddTraining from "../Components/AddTraining";
import UpdateTraining from "../Components/UpdateTraining";

const fields = [
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
    roadmapUrl: "https://www.scaler.com/blog/sde-roadmap/",
    details: "This course is completed",
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

let data = [
  {
    id: 2,
    empid: "AMEM00024",
    courses: "Full Stack",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "Pending",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 1,
    empid: "AMEM00023",
    courses: "Full Stack",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "In Progress",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 1,
    empid: "AMEM00012",
    courses: "Full Stack",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "Completed",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 1,
    empid: "AMEM00020",
    courses: "Full Stack",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "Completed",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 2,
    empid: "AMEM00022",
    courses: "SAP ABAP",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "Pending",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 2,
    empid: "AMEM00010",
    courses: "SAP ABAP",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "Pending",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 2,
    empid: "AMEMP00013",
    courses: "SAP ABAP",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "In Progress",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 2,
    empid: "AMEMP00014",
    courses: "SAP ABAP",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "In Progress",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 2,
    empid: "AMEMP00021",
    courses: "Full Stack",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "Completed",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 3,
    empid: "AMEMP00024",
    courses: "Flutter",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "In Progress",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 4,
    empid: "AMEMP00020",
    courses: "Vue JS",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "In Progress",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 4,
    empid: "AMEMP00023",
    courses: "Vue JS",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "Completed",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 5,
    empid: "AMEMP00024",
    courses: "SAP CDS",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "Completed",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  {
    id: 6,
    empid: "AMEMP00024",
    courses: "Data Science",
    coursedescription: "HTML, CSS, React, Node JS, Express JS, MongoDB",
    completedinprogress: "Completed",
    approvedon: "Nov 1, 22",
    approvedrejected: "Approved",
    manager: "HR",
  },
  // Add more rows as needed
];

export default function TrainingsPageAdmin({ trainingId }) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [courses, setfields] = React.useState([]);
  const [page, pagechange] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowperpage, rowperpagechange] = React.useState(5);
  const [filter, setFilter] = React.useState(false);
  const [courseStatus, setCourseStatus] = React.useState("All");
  let [filteredData, setFilteredData] = React.useState([]);
  const [searchEmp, setSearchEmp] = React.useState("");
  // const [open, setOpen] = React.useState(false);
  const [openAddTraining,setOpenAddTraining] = React.useState(false);

  const [selectedField, setSelectedField] = React.useState({});

  const [isActiveDeleteButton, setIsActiveDeleteButton] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  function handleClose() {
    setOpen(false);
  };
  const handleAddTrainingClick = () => {
    setOpenAddTraining(!openAddTraining);
  };

  function handleAddTrainingClose() {
    setOpenAddTraining(false);
  }
  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };
  const handleCheckboxChange = (rowId) => {
    const isSelected = selectedRows.includes(rowId);
    setSelectedRows((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  function handleChangeFilter() {
    setFilter(!filter);
  }

  function handleSelect(value) {
    const selectedStatus = value;
    setCourseStatus(selectedStatus);
    const newData = data.filter((item) => {
      if (selectedStatus === "All") {
        return true;
      } else {
        return item.completedinprogress == selectedStatus;
      }
    });
    setFilteredData(newData);
  }
  // filteredData = filteredData.filter((item) =>
  //   item.empid.toLowerCase().includes(searchEmp.toLowerCase())
  // );
  function handleFilterEmp(e) {
    setSearchEmp(e.target.value);
  }
  function handleTrId() {
    setFilteredData(filteredData.sort((a, b) => a.id - b.id));
  }

  React.useEffect(() => {
    // Axios GET request
    axios
      .get("http://localhost:4000/api/v1/training/training-cards")
      .then((response) => {
        // console.log("insdeeee");
        console.log("Training Cards:", response.data.data);
        setfields(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching training cards:", error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/v1/training/admin/display-all-users-training-data"
      )
      .then((response) => {
        // console.log( response);
        console.log(response.data.data);
        // setFilteredData(response.data)
        setFilteredData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching training cards:", error);
      });
  }, []);
  // console.log("Thisssss",setInfo[1].training_id);

  let row;
  // const slicedData = data.slice(page * rowperpage, (page + 1) * rowperpage);
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
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
            p: 1,
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2}>
            {courses.map((course) => {
              return (
                <TrainingCard
                  setOpen={setOpen}
                  open={open}
                  field={course}
                  setSelectedField={setSelectedField}
                  isActiveDeleteButton={isActiveDeleteButton}
                  isEdit={isEdit}
                  key={course.training_id}
                  logo={DeleteOutlineIcon}
                />
              );
            })}
          </Grid>
        </Box>
        <Box sx={{ p: 1, marginBottom: "20px" }}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Button
                color="error"
                sx={{
                  height: "100%",
                  width: "100%",
                  border: "2px solid #E0E0E0",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  textTransform: "none",
                  fontFamily: "Poppins",
                }}
                onClick={handleClick}
              >
                Add Training
              </Button>
              <>
                <AddTraining
                  handleClose={handleAddTrainingClose}
                  open={openAddTraining}
                />
              </>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Button
                color="error"
                sx={{
                  height: "100%",
                  width: "100%",
                  border: "2px solid #E0E0E0",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  textTransform: "none",
                  fontFamily: "Poppins",
                }}
                // onClick={handleClick}
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              >
                Update Training
              </Button>
              <>
                <UpdateTraining
                  handleClose={handleClose}
                  open={open}
                  selectedObj={selectedField}
                />
              </>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Button
                color="error"
                sx={{
                  height: "100%",
                  width: "100%",
                  border: "2px solid #E0E0E0",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  textTransform: "none",
                  fontFamily: "Poppins",
                }}
                onClick={() => {
                  setIsActiveDeleteButton(!isActiveDeleteButton);
                }}
              >
                Delete Training
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Preahvihear",
          }}
        >
          <Typography
            sx={{
              color: "#FF5151",
              margin: "12px 0px",
              width: "542px",
              height: "28px",
              fontFamily: "Preahvihear",
              fontSize: "20px",
              lineHeight: "28px",
            }}
          >
            Training Description
          </Typography>
          <FormControlLabel
            value="start"
            control={
              <Checkbox
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                onChange={handleChangeFilter}
              />
            }
            label="Enable Filter"
            labelPlacement="start"
            sx={{ fontFamily: "Poppins", color: "#FF5151" }}
          />
        </Box>
        <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
          <Table>
            <TableHead>
              <TableRow style={{ fontFamily: "Poppins" }}>
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                    minWidth: "126px",
                    height: "40px",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <img src="Check.svg" style={{ margin: "-4px 6px" }} />
                    Tr.No
                    {filter && <FilterAltIcon onClick={handleTrId} />}
                  </Box>
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
                  Employee ID
                </TableCell>

                {/* //   style={{
              //     backgroundColor: "#161e54",
              //     color: "#ffffff",
              //     fontFamily: "Poppins",
              //     padding : '0px'
              //   }}
              // >
              //   <TextField id="standard-basic" InputProps={{ sx: { } }}  label="Emp Id" variant="outlined" size="small" onChange={handleFilterEmp} sx={{backgroundColor : 'white'}}/>
              // </TableCell>
              //   } */}
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
                    minWidth: "124px",
                  }}
                >
                  Status {filter && <Filter handleSelect={handleSelect} />}
                </TableCell>

                {/* // <TableCell
                  //   style={{
                  //     backgroundColor: "#161e54",
                  //     color: "#ffffff",
                  //     fontFamily: "Poppins",
                  //     paddingTop : '1px'
                  //         }}>
                  //       <FormControl
                  //         sx={{
                  //           backgroundColor: "#161e54",
                  //           color: "#ffffff",
                  //           fontFamily: "Poppins",
                  //           height: "100%",
                  //           width: "100%",
                  //         }}
                  //       >
                          
                  //         <NativeSelect
                  //           defaultValue={courseStatus}
                  //           inputProps={{
                  //             name: "status",
                  //             id: "uncontrolled-native",
                              
                  //           }}
                  //           // sx={{ color: 'white' }}
                  //           onChange={handleSelect}
                  //           sx={{backgroundColor : 'white' , paddingLeft : '2px'}}
                  //         >
                  //           <option value={"All"} style={{fontFamily: "Poppins", color: 'black'}}>All</option>
                  //           <option value={"Pending"} style={{fontFamily: "Poppins" , color: 'black'}}>Pending</option>
                  //           <option value={"In Progress"} style={{fontFamily: "Poppins" , color: 'black'}}>In Progress</option>
                  //           <option value={"Completed"} style={{fontFamily: "Poppins" , color: 'black'}}>Completed</option>
                  //         </NativeSelect>
                  //       </FormControl>
                  // </TableCell>
                  
                )} */}
                <TableCell
                  style={{
                    backgroundColor: "#161e54",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                  }}
                >
                  Approval
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData?.map((row, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                        {row?.training_id}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row?.course_name}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row?.emp_id}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row?.course_description}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row?.progress_status}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row.approvedon}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    {" "}
                    {/* Adjust the colSpan based on the number of columns */}
                    <Alert severity="warning" sx={{ width: "100%" }}>
                      No data found.
                    </Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowperpage}
          page={page}
          count={data.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination> */}
      </Box>

      {/* <ul>
        {setInfo?.map((info,i) => {
          <li key= {i}>info.course_description</li>;
        })}
      </ul> */}
    </Box>
  );
}
