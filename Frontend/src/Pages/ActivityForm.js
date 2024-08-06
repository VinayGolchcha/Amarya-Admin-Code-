
// import React, { useRef, useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   FormControl,
//   Select,
//   MenuItem,
//   Input,
//   InputLabel,
//   Box,
//   FormLabel,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';
// import CloseIcon from '@mui/icons-material/Close';

// function MyForm({ onAddNotification, selectedTab, handleAddAnnouncement, selectedNoti , isEdit , edit }) {
//   const [files, setFiles] = useState([]); // State for uploaded file
//   const [eventType, setEventType] = useState("");
//   const [title, setTitle] = useState("");
//   const [priority, setPriority] = useState("");
//   const [description, setDescription] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [publicIds , setPublicIds] = useState(new Set());
//   console.log(edit);
//   useEffect(() => {
//       setEventType(selectedNoti.event_type);
//       setTitle(selectedNoti.title);
//       setPriority(selectedNoti.priority);
//       setDescription(selectedNoti.description);
//       setFromDate(selectedNoti.from_date ? new Date(selectedNoti.from_date).toISOString().split('T')[0] : "");
//       setToDate(selectedNoti.to_date ? new Date(selectedNoti.to_date).toISOString().split('T')[0] : "");
//       setFiles(selectedNoti?.images);
//   }, [selectedNoti]);

//   const handleDeletePics = (id) => {
//     console.log("handle Delete pics is calling")
//     publicIds.add(id)
//     setFiles(files?.map((item) => item?.public_id != id));
//     console.log(publicIds);
//   }

//   const handleDeleteEditImageSelection = (id) => {
//     handleDeletePics(id);
//   }

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//     // const validFiles =[];
//     // let invalid = false;

//     // selectedFiles.forEach((file) => {
//     //   if(file.type.match(/image.*/)){
//     //     validFiles.push(file);
//     //     toast.success(`${file.name} is selected successfully`);
//     //   }else{
//     //     invalid = true
//     //     toast.error(`${file.name} is not a valid image file.`);
//     //   }
//     // })
//     // if(validFiles.length > 0){
//     //   setFiles(validFiles);
//     // }else{
//     //   setFiles([]);
//     // }
//     // if (invalid) {
//     //   toast.error("Some files were not valid images and were not uploaded.");
//     // }

//   };


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     let body ;
//     if(selectedTab === "announcement"){
//       body = {
//         event_type: "announcement",
//         priority,
//         from_date: fromDate,
//         to_date: toDate,
//         title,
//         description,
//       };
//     }else {
//      body = {
//         event_type: "activity",
//         priority,
//         from_date: fromDate,
//         to_date: toDate,
//         title,
//         description,
//         files : files
//        }
//     }
//     if(edit){
//       body.public_ids = publicIds
//     }
//     console.log(body);
//     console.log("selected activty id" , selectedNoti?.activity_id)
//     edit === true ? handleAddAnnouncement(body, selectedTab !== "activity" ? selectedNoti._id : selectedNoti?.activity_id) : handleAddAnnouncement(body);
//     if (!fromDate || !description) {
//       toast.error("Please fill all the fields");
//       return;
//     }

//     const formattedDate = new Date(fromDate);
//     const options = { day: "numeric", month: "short", year: "numeric" };
//     const formattedDateString = formattedDate.toLocaleDateString("en-GB", options);
//     const formattedDateFullString = formattedDateString.replace(/(\d+)([a-z]+)/i, "$1$2");

//     // if (selectedTab === "activity") {
//     //   const newNotification = {
//     //     type: body.event_type,
//     //     message: body.description,
//     //     date: formattedDateFullString,
//     //     image: URL.createObjectURL(file),
//     //   };

//     // if (selectedTab === "activity") {
//     //   const newNotification = {
//     //     type: body.event_type,
//     //     message: body.description,
//     //     date: formattedDateFullString,
//     //     image: URL.createObjectURL(file),
//     //   };

//     //   onAddNotification(newNotification);
//     //   setFile(null);
//     // }

//     setEventType("");
//     setTitle("");
//     setPriority("");
//     setFromDate("");
//     setToDate("");
//     setDescription("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={2} sx={{ padding: "20px" }}>
//         <Grid item xs={6}>
//           <TextField
//             label=" Event Type"
//             value={ selectedTab }
//             disabled
//             onChange={(e) => setEventType(selectedTab)}
//             sx={{ backgroundColor: "rgb(250, 250, 250)" }}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Title"
//             value={ title }
//             onChange={(e) => setTitle(e.target.value)}
//             sx={{ backgroundColor: "rgb(250, 250, 250)" }}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Priority"
//             value={ priority }
//             onChange={(e) => setPriority(e.target.value)}


//             sx={{ backgroundColor: " rgb(250, 250, 250)" }}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Description"
//             value={ description }
//             onChange={(e) => setDescription(e.target.value)}
//             sx={{ backgroundColor: "rgb(250, 250, 250)" }}
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={5}
//           />

// {selectedTab === "activity" && (
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
//           {/* <InputLabel
//             htmlFor="file-upload"
//             sx={{
//               marginTop: '5px',
//               border: '1px solid rgb(202, 199, 199)',
//               borderRadius: '4px',
//               width: 'fit-content',
//               padding: '1px 5px',
//               backgroundColor: 'rgb(250, 250, 250)',
//               cursor: 'pointer',
//             }}
//           >
//             Choose Images
//           </InputLabel> */}
//           {/* <Input
//             id="file-upload"
//             type="file"
//             accept=".jpg, .jpeg, .png"
//             onChange={handleFileChange}
//             sx={{ display: 'none' }}
//             multiple 
            
//           /> */}
//           {/* <TextField
//             variant="outlined"
//             sx={{
//               "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline" : {
//                 borderWidth : "0px" ,
//                 borderBottom : "0px"
//               }
//             }}
//             fullWidth
//             InputProps={{
//               inputComponent: Input,
//               inputProps: {
//                 type: 'file',
//                 multiple: true,
//                 onChange: handleFileChange,
//               },
//             }}
//           /> */}
//           <FormControl fullWidth >
//             <Input
//               id="file-input"
//               type="file"
//               inputProps={{ multiple: true }}
//               onChange={handleFileChange}
//               disableUnderline
//             />
//           </FormControl>
//           {files?.length > 0 && (!edit) && (
//             <Typography
//               sx={{ color: 'green', marginTop: '5px', padding: '1px 5px' }}
//             >
//               {files.length} Image(s) uploaded
//             </Typography>
//           )}
//           {files?.length > 0 && (files?.map((item) => {
//             return(
//               <Typography
//               sx={{ color: 'green', marginTop: '5px', padding: '1px 5px' , display : "flex"}}
//             >
//              <Box
//              >{item?.original_filename}</Box>
//              <Box>
//                <CloseIcon onClick={handleDeleteEditImageSelection(item?.public_id)}/>
//              </Box>
//             </Typography>);
//           }))
//           }
//         </Box>
//       )}
//         </Grid>
//         <Grid
//           container
//           spacing={2}
//           sx={{ paddingLeft: "20px", marginTop: "-8%" }}
//         >
//           <Grid item xs={2.5}>
//             <Typography variant="body1" color="#686868">
//               From:
//             </Typography>
//             <TextField
//               type="date"
//               value={ fromDate }
//               onChange={(e) => setFromDate(e.target.value)}
//               variant="outlined"
//               fullWidth
//               sx={{ marginLeft: "20px", backgroundColor: "rgb(250, 250, 250)" }}
//             />
//           </Grid>
//           <Grid item xs={2.5}>
//             <Typography
//               variant="body1"
//               sx={{ marginLeft: "20px", color: "#686868" }}
//             >
//               To:
//             </Typography>
//             <TextField
//               type="date"
//               value={ toDate }
//               onChange={(e) => setToDate(e.target.value)}
//               variant="outlined"
//               fullWidth
//               sx={{ marginLeft: "30px", backgroundColor: "rgb(250, 250, 250)" }}
//             />
//           </Grid>
//         </Grid>
//         <Grid item xs={10} style={{ textAlign: "right" }}>
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ background: "#FF5151", color: "#FFFFFF" }}
//           >
//             Click to Save
//           </Button>
//         </Grid>
//       </Grid>
//       <ToastContainer />
//     </form>
//   );
// }

// export default MyForm;
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  Input,
  Box,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

function MyForm({
  onAddNotification,
  selectedTab,
  handleAddAnnouncement,
  selectedNoti,
  isEdit,
  edit,
  setParentFiles ,
  setParentPublicIds,
  handleAddActivity,
  handleEditActivity
}) {
  const [files, setFiles] = useState([]); // State for uploaded files
  const [eventType, setEventType] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [publicIds, setPublicIds] = useState([]);

  useEffect(() => {
    if (edit) {
      setEventType(selectedNoti.event_type || "");
      setTitle(selectedNoti.title || "");
      setPriority(selectedNoti.priority || "");
      setDescription(selectedNoti.description || "");
      setFromDate(
        selectedNoti.from_date
          ? new Date(selectedNoti.from_date).toISOString().split("T")[0]
          : ""
      );
      setToDate(
        selectedNoti.to_date
          ? new Date(selectedNoti.to_date).toISOString().split("T")[0]
          : ""
      );
      setFiles(selectedNoti?.images || []);
    } else {
      resetForm();
    }
  }, [selectedNoti, edit]);

  const resetForm = useCallback(() => {
    setEventType("");
    setTitle("");
    setPriority("");
    setDescription("");
    setFromDate("");
    setToDate("");
    setFiles([]);
    setPublicIds([]);
  }, []);

  const handleDeletePics = 
    (id) => {
      setParentPublicIds((prev) => [...prev , id]);
      setFiles((prev) => prev.filter((item) => item?.public_id !== id));
    };

  

  const handleFileChange = (e) => {

    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setParentFiles(selectedFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fromDate || !description) {
      toast.error("Please fill all the fields");
      return;
    }

    let body = {
      event_type: selectedTab,
      priority,
      from_date: fromDate,
      to_date: toDate,
      title,
      description,
      // ...(selectedTab === "activity" && { files }),
      // ...(edit && selectedTab === "activity" && { public_ids: Array.from(publicIds) }),
    }; 
    if (selectedTab === "announcement") {
      if (edit) {
        handleAddAnnouncement(body, selectedNoti._id);
      } else {
        handleAddAnnouncement(body);
      }
    } else if (selectedTab === "activity") {
      if (edit) {
        handleEditActivity(body, selectedNoti?.activity_id);
      } else {
        handleAddActivity(body);
      }
    } 
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid item xs={6}>
          <TextField
            label="Event Type"
            value={selectedTab}
            disabled
            sx={{ backgroundColor: "rgb(250, 250, 250)" }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ backgroundColor: "rgb(250, 250, 250)" }}
            variant="outlined"
            fullWidth
          />
          
        </Grid>
        <Grid item xs={6}>
          {/* <TextField
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            sx={{ backgroundColor: "rgb(250, 250, 250)" }}
            variant="outlined"
            fullWidth
          /> */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              sx={{ backgroundColor: "rgb(250, 250, 250)" }}
              label="Age"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value={"low"}>low</MenuItem>
              <MenuItem value={"medium"}>medium</MenuItem>
              <MenuItem value={"high"}>high</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ backgroundColor: "rgb(250, 250, 250)" }}
            variant="outlined"
            fullWidth
            multiline
            rows={5}
          />
          {selectedTab === "activity" && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
              <FormControl fullWidth>
                <Input
                  id="file-input"
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={handleFileChange}
                  disableUnderline
                />
              </FormControl>
              {files?.length > 0 && !edit && (
                <Typography
                  sx={{ color: "green", marginTop: "5px", padding: "1px 5px" }}
                >
                  {files.length} Image(s) uploaded
                </Typography>
              )}
              {edit && files?.length > 0 &&
                files?.map((item) => {
                  // <Typography
                  //   key={item?.public_id}
                  //   sx={{
                  //     color: "green",
                  //     marginTop: "5px",
                  //     padding: "1px 5px",
                  //     display: "flex",
                  //   }}
                  // >
                  //   <Box sx={{display : "flex" , cursor: "pointer"}} onClick={() => handleDeletePics(item?.public_id)}>{item?.original_filename} 

                  //   <CloseIcon
                        
                  //       style={{  }}
                  //     />

                  //   </Box>
                  //   </Typography>
                    return(<div key={item?.public_id} style={{display : "flex"}}>
                    <span style={{color: "green",
                      marginTop: "5px",
                      padding: "1px 5px",
                      display: "flex"}}>{item?.original_filename}</span>
                    <CloseIcon
                    sx={{  cursor: "pointer" , marginTop : "7px" , color : "green"}}
                    onClick={() => handleDeletePics(item?.public_id)}
                  />
                  </div>);
                  
                })}
            </Box>
          )}
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ paddingLeft: "20px", marginTop: "-8%" , width : "50%"}}
        >
          <Grid item xs={6}>
            <Typography variant="body1" color="#686868">
              From:
            </Typography>
            <TextField
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginLeft:  {lg : "30px" , md : "30px" , sm : "30px" , xs : "0px"}, backgroundColor: "rgb(250, 250, 250)" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              sx={{ marginLeft: "20px", color: "#686868" }}
            >
              To:
            </Typography>
            <TextField
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginLeft: {lg : "30px" , md : "30px" , sm : "30px" , xs : "0px"}, backgroundColor: "rgb(250, 250, 250)" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={10} style={{ textAlign: "right" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ background: "#FF5151", color: "#FFFFFF"  , "&:hover" : {
              backgroundColor : "#FF5151"
            }}}
          >
            Click to Save
          </Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </form>
  );
}

export default MyForm;
