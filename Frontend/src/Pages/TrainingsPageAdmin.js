import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrainingCard from "./TrainingCard";
import Grid from "@mui/material/Grid";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import Filter from "../Components/Filter";
import axios from "axios";
import AddTraining from "../Components/AddTraining";
import { useAuth } from "../Components/AuthContext";
import EditTraining from "../Components/EditTraining";
import Loading from "../sharable/Loading";
import ConfirmDelete from "../Components/ConfirmDelete";
import { ToastContainer, toast } from "react-toastify";




const field = [
  {
    courseName: "FULL STACK",
    courseDescription:
      "Topics Covered -  CSS, React JS, Node JS, Express Js, MongoDB",
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


export default function TrainingsPageAdmin( ) {
  const [openConDel, setOpenConDel] = React.useState(false);
  const handleOpenConDel = () => setOpenConDel(true);
  const handleCloseConDel = () => setOpenConDel(false);
  const [ id , setId] = React.useState(null);
  const [isLoading , setIsLoading] = React.useState(true);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [courses, setfields] = React.useState([]);
  const [page, pagechange] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowperpage, rowperpagechange] = React.useState(5);
  const [filter, setFilter] = React.useState(false);
  const [courseStatus, setCourseStatus] = React.useState("All");
  let [filteredData, setFilteredData] = React.useState([]);
  const [searchEmp , setSearchEmp] = React.useState("");
  const [edit , setEdit] = React.useState(false);
  const [editOpen , setEditOpen] = React.useState(false);
  const [deleteItem , setDelete] = React.useState(false);
  const {user} = useAuth();
  let [data , setData] = React.useState([]);
  const [selectedTr , setSelectedTr] = React.useState({});
  const handleEditTr = () => {
    setEdit(!edit);
  }
  const handleClick = () => {
    setOpen(!open);
  }

  //chetancode
  const [trainingCards, setTrainingCards] = React.useState([]);
  

  const [trainingId, setTrainingId] = React.useState(null);
  const [updatedTraining, setUpdatedTraining] = React.useState({
    course_description: "HTML, CSS, React JS, Node JS, Express Js, MongoDB",
    details: "HTML, CSS, React JS, Node JS, Express Js, MongoD"
  });

  const handleReset = () => {
    setEdit(false);
  }
  const dateFormat = (dateStr) => {
    let [day, month, year] = dateStr.split('-');

    // Create a date object
    let date = new Date(`20${year}-${month}-${day}`);

    // Format the date components
    let options = { year: '2-digit', month: 'long', day: '2-digit' };
    let formattedDate = date.toLocaleDateString('en-US', options);

    // Adjust the formatted string to the required format
    let parts = formattedDate.split(' ');
    let result = `${parts[2]}, ${parts[0]} ${parts[1].replace(',', '')}`;

    return result;
  }
  
  const addTraining = async (body) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URI}/training/admin/add-new-training` , body , {
        headers : {
          "x-access-token" : user?.token
        }
      })
      setOpen(false);
      fecthTrainings();
      toast.success("Training added successfully");
    }catch(error){
      console.log(error);
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        console.log("true");
        const item = error?.response?.data?.message
        toast.error(item);
      }
      const errors = error?.response?.data?.errors;
        errors?.forEach((item) => {
          toast.error(item?.msg);
        });
    }
  }
  
  const fecthTrainings = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/training/training-cards` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      const size = 
      setfields(res?.data?.data?.map((item , i) => (
        {
          courseName : item?.course_name ,
          trainindId : item?.training_id,
          roadmapurl : item?.roadmap_url,
          courseDescription : item?.course_description,
          color : field[i%field.length]?.color
        }
      )));
      console.log("courses on the trainings " , courses);
      setIsLoading(false);
    }catch(error){
      console.log(error);
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
  
   const getAllUserTrainings = async() => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/training/admin/display-all-users-training-data` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      setFilteredData(res?.data?.data?.map((item) => ({
          id: item?.training_id,
          empid: item?.emp_id,
          courses: item?.course_name,
          coursedescription: item?.course_description,
          completedinprogress: item?.progress_status,
          approvedon: item?.approval_date,
          approvedrejected: "Approved",
          manager: "HR",
      })));
      const newData = res?.data?.data?.map(item => ({
        id: item?.training_id,
        empid: item?.emp_id,
        courses: item?.course_name,
        coursedescription: item?.course_description,
        completedinprogress: item?.progress_status,
        approvedon: item?.approval_date,
        approvedrejected: "Approved",
        manager: "HR",
      }));
      setData(newData)
      console.log(data , typeof data);
      data = data?.filter(item =>
        item.empid.toLowerCase().includes(searchEmp.toLowerCase())
      );
    }catch(error){
      console.log(error);
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
  // Function to handle the update operation
  const handleUpdate = (id , body) => {
    // Log the updated training data
    // console.log('Updated Training Data:', updatedTraining);
    
    // Axios PUT request
    axios.put(`${process.env.REACT_APP_API_URI}/training/admin/update-training/${id}`, body , {
      headers : {
        "x-access-token" : user?.token
      }
    })
      .then(response => {
        console.log('Update Training Response:', response);
        toast.success("Training updated successfully");
        // Optionally, you can perform any additional actions after successful update
        handleEditClose();
        fecthTrainings();
      })
      .catch(error => {
        console.error('Error updating training:', error);
        const errors = error?.response?.data?.errors;
        errors.forEach((item) => {
          toast.error(item?.msg);
        });
        if(error?.response?.message){
          toast.error(error?.response?.message);
        }
        if(error?.response?.data?.message){
          console.log("true");
          const item = error?.response?.data?.message
          toast.error(item);
        }
        // Handle error as needed
      });
  };

  // Function to handle the delete operation
  const handleDelete = () => {
    setDelete(!deleteItem);
  }
  const handleConfirmDelete = (id) => {
    handleOpenConDel();
    setId(id);
  }
  const handleDeleteApi = async (val) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URI}/training/admin/delete-training/${val}`, {
              headers : {
                "x-access-token" : user?.token
              } // Include training ID in the request body
            });
            console.log(response);
            handleEditClose(false);
      fecthTrainings();
      toast.success("Training deleted successfully");
      handleCloseConDel();
    } catch (error) {
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        console.log("true");
        const item = error?.response?.data?.message
        toast.error(item);
      }
      console.log(error.response.data.message);
    }
    // Axios DELETE request
    // await axios.delete("http://localhost:4000/api/v1/training/admin/delete-training",{
      
    // training_id : "AMTRAN007",
    
    // })
    
    //   .then(response => {
    //     console.log('Delete Training Response:', response);
    //     // Optionally, you can perform any additional actions after successful deletion
    //   })
    //   .catch(error => {
    //     console.error('Error deleting training:', error);
    //     // Handle error as needed
    //   });
  };

  React.useEffect(() => {
    // Axios GET request
    const fecthData = async () => {
      setIsLoading(true);
      await Promise.all([
        fecthTrainings(),
        getAllUserTrainings()
      ]);
      setIsLoading(false);
    }
    fecthData();
  }, []);
  ///

    

  /////

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };
  const handleCheckboxChange = (rowId) => {
    const isSelected = selectedRows?.includes(rowId);
    setSelectedRows((prevSelected) =>
      isSelected
        ? prevSelected?.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  function handleChangeFilter() {
    setFilter(!filter);
    setData(filteredData);
  }

  function handleSelect(value) {
    const selectedStatus = value;
    setCourseStatus(selectedStatus);
    const newData = filteredData?.filter((item) => {
      if (selectedStatus === "All") {
        return true;
      } else {
        return item.completedinprogress == selectedStatus.toString().toLowerCase();
      }
    });
    setData(newData);
  }
  
  function handleFilterEmp(e) {
    setSearchEmp(e.target.value);

  }

  function handleEditClose(){
    setEditOpen(false);
  }
  function handleTrId(){
    setData(data?.sort((a, b) => a?.id?.[8] - b?.id?.[8]));
  }

  let row;
  // const slicedData = data.slice(page * rowperpage, (page + 1) * rowperpage);
  if(isLoading){
    return(
      <Loading/>
    )
  }else{
    return (
      <Box sx={{ display: "flex" }}>
        <ToastContainer/>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: 100,
          }}
        >
          <ConfirmDelete open={openConDel} handleClose={handleCloseConDel} handleIncomeDelete ={handleDeleteApi} id ={id}/>
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
            <Grid container spacing={2} onClick = {handleReset} >
              {courses?.map((course) => {
                return <TrainingCard field={course}   key={course.training_id}  logo= {DeleteOutlineIcon} edit={edit} deleteItem = {deleteItem} handleDeleteApi = {handleConfirmDelete} setTrainingId = {setTrainingId} setSelectedTr = {setSelectedTr} setEditOpen = {setEditOpen}/>;
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
                <AddTraining handleClose={handleClose} open={open} addTraining = {addTraining}/>
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
                  onClick={handleEditTr}
                >
                  Update Training
                </Button>
                <>
                <EditTraining handleClose={handleEditClose} open={editOpen} selectedTr = {selectedTr} handleUpdate={handleUpdate}/>
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
                  onClick={handleDelete}
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
                fontSize: {lg : "20px" , md : "20px" , sm : "20px" , xs : "15px"},
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
              sx={{fontFamily : 'Poppins' , color : '#FF5151'}}
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
                    <Box sx={{display : 'flex'}}>
                      <img src="Check.svg" style={{ margin: "-4px 6px" }} />
                      Tr.No
                      {/* {filter && <FilterAltIcon onClick={handleTrId} />} */}
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
                      minWidth : '124px',
                    }}
                  >
                    Status {
                      filter && <Filter handleSelect = {handleSelect}/>
                    }
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
    {filter ? (
      data?.map((row, i) => (
        <TableRow key={i}>
          <TableCell style={{ fontFamily: "Poppins" , minWidth: "144px"}}>
          <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                      alt="Check"
                      sx={{filter: "invert(1)"  , marginLeft : "25px"}}
                    />
            {row.id}
          </TableCell>
          <TableCell style={{ fontFamily: "Poppins" }}>
            {row.courses}
          </TableCell>
          <TableCell style={{ fontFamily: "Poppins" }}>
            {row.empid}
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
        </TableRow>
      ))
    ) : filteredData?.length > 0 ? (
      filteredData?.map((row, i) => (
        <TableRow key={i}>
          <TableCell style={{ fontFamily: "Poppins" }}>
          <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                      alt="Check"
                      sx={{filter: "invert(1)" , marginLeft : "25px"}}
                    />
            {row.id}
          </TableCell>
          <TableCell style={{ fontFamily: "Poppins" }}>
            {row.courses}
          </TableCell>
          <TableCell style={{ fontFamily: "Poppins" }}>
            {row.empid}
          </TableCell>
          <TableCell style={{ fontFamily: "Poppins" }}>
            {row.coursedescription}
          </TableCell>
          <TableCell style={{ fontFamily: "Poppins" }}>
            {row.completedinprogress}
          </TableCell>
          <TableCell style={{ fontFamily: "Poppins", minWidth : "120px" }}>
            {row?.approvedon===null ? "-" : dateFormat(row?.approvedon)}
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={6}>
          <Alert severity="warning" sx={{ width: '100%' }}>
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
      </Box>
    );
  }
}