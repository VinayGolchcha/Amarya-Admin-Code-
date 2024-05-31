// import React, { useRef, useState } from "react";
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
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';

// function MyForm({ onAddNotification, selectedTab , handleAddAnnouncement , selectedNoti }) {
//   console.log(selectedNoti);
//   const [file, setFile] = useState(null); // State for uploaded file
//   const eventTypeElement= useRef(null); // State for event type
//   const titleElement= useRef(null) // State for title
//   const priorityElement = useRef(null) // State for priority
//   const descriptionElement = useRef(null) // State for description
//   const fromDateElement = useRef(null) // State for from date
//   const toDateElement = useRef(null) // State for to date


//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     console.log(selectedFile);
//     // top be implemented when the photoes are uploaded successfully
//     // if (selectedFile && selectedFile.type.match(/image.*/)) {
//     //   setFile(selectedFile);
//     //   toast.success(`${selectedFile.name} is selected successfully`);
//     // } else {
//     //   setFile(null);
//     //   toast.error("Please upload a valid image file.");
//     // }
//   };


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(eventTypeElement.current.value)
//     const body = {
//       event_type: eventTypeElement.current.value,
//       priority: priorityElement.current.value,
//       from_date: fromDateElement.current.value,
//       to_date: toDateElement.current.value,
//       title: titleElement.current.value,
//       description: descriptionElement.current.value,
//       image_data : "https://www.pexels.com/photo/macbook-beside-iphone-on-white-linen-3201772/"
//   }
//   {selectedNoti ? handleAddAnnouncement(body , selectedNoti?._id) : handleAddAnnouncement(body)}

//     // Check if fromDate, description, and file are empty
  
//     // if(body.event_type === 'activity' && !file){
//     //   toast.error("Please fill all the fields and upload the image");
//     //   return;
//     // }

//     if (!fromDateElement || !descriptionElement) {
//       toast.error("Please fill all the fields" );
//       return;
//     }

//     // Format the date
//     const formattedDate = new Date(fromDateElement);
//     const options = { day: "numeric", month: "short", year: "numeric" };
//     const formattedDateString = formattedDate.toLocaleDateString(
//       "en-GB",
//       options
//     );
//     const formattedDateFullString = formattedDateString.replace(
//       /(\d+)([a-z]+)/i,
//       "$1$2"
//     );

//     // Create a new notification object
//     if(selectedTab === "acivity"){
//     const newNotification = { // Generate a unique ID
//       type: body.event_type,
//       message: body.description,
//       date: formattedDateFullString, // Using formatted date string
//       image: URL.createObjectURL(file), // Store image URL
//     };

//     // Update the notifications array
//     onAddNotification(newNotification);

//     // Reset form fields
//     setFile(null);}
//     eventTypeElement.current.value = "";
//     priorityElement.current.value = "";
//     fromDateElement.current.value = "";
//     toDateElement.current.value = "";
//     titleElement.current.value = "";
//     descriptionElement.current.value = "";
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={2} sx={{ padding: "20px" }}>
//         <Grid item xs={12}>
//           <Typography
//             variant="body1"
//             marginBottom="-10px"
//             color="#686868"
//             fontWeight="500"
//           >
//             Event Type:
//           </Typography>
//         </Grid>
//         <Grid item xs={6}>
//           <FormControl variant="outlined" fullWidth>
//             <Select
//               label="Event Type"
//               inputRef={eventTypeElement}
//               sx={{ minWidth: 120, backgroundColor: "rgb(250, 250, 250)" }}
//               defaultValue={selectedNoti?.event_type}
//             >
//               <MenuItem value="announcement">Announcement</MenuItem>
//               <MenuItem value="activity">Activity</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Title"
//             defaultValue={selectedNoti?.title}
//             inputRef={titleElement}
//             sx={{ backgroundColor: "rgb(250, 250, 250)" }}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Priority"
//             sx={{ backgroundColor: " rgb(250, 250, 250)" }}
//             defaultValue={selectedNoti?.priority}
//             inputRef={priorityElement}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Description"
//             inputRef={descriptionElement}
//             defaultValue={selectedNoti?.description}
//             sx={{ backgroundColor: "rgb(250, 250, 250)" }}
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={5}
//           />

//           {selectedTab === "activity" && (
//             <Box sx={{ display: "flex" }}>
//               <InputLabel
//                 htmlFor="file-upload"
//                 sx={{
//                   marginTop: "5px",
//                   border: "1px solid rgb(202, 199, 199)",
//                   borderRadius: "4px",
//                   width: "fit-content",
//                   padding: "1px 5px",
//                   backgroundColor: "rgb(250, 250, 250)",
//                 }}
//               >
//                 Choose Image
//               </InputLabel>
//               <Input
//                 id="file-upload"
//                 type="file"
//                 accept=".jpg, .jpeg, .png"
//                 onChange={handleFileChange}
//                 sx={{ display: "none" }}
//               />
//               {file && (
//                 <Typography
//                   sx={{ color: "green", marginTop: "5px", padding: "1px 5px" }}
//                 >
//                   Image(s) uploaded
//                 </Typography>
//               )}
//             </Box>
//           )}
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
//               inputRef={fromDateElement}
//               defaultValue={selectedNoti?.from_date}
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
//               defaultValue={selectedNoti?.to_date}
//               inputRef={toDateElement}
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
import React, { useRef, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Input,
  InputLabel,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function MyForm({ onAddNotification, selectedTab, handleAddAnnouncement, selectedNoti , isEdit , edit }) {
  const [files, setFiles] = useState([]); // State for uploaded file
  const [eventType, setEventType] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (Object.keys(selectedNoti).length > 0 && edit) {
      setEventType(selectedNoti.event_type);
      setTitle(selectedNoti.title);
      setPriority(selectedNoti.priority);
      setDescription(selectedNoti.description);
      setFromDate(selectedNoti.from_date ? new Date(selectedNoti.from_date).toISOString().split('T')[0] : "");
      setToDate(selectedNoti.to_date ? new Date(selectedNoti.to_date).toISOString().split('T')[0] : "");
    }
  }, [selectedNoti]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles);
    const validFiles =[];
    let invalid = false;

    selectedFiles.forEach((file) => {
      if(file.type.match(/image.*/)){
        validFiles.push(file);
        toast.success(`${file.name} is selected successfully`);
      }else{
        invalid = true
        toast.error(`${file.name} is not a valid image file.`);
      }
    })
    if(validFiles.length > 0){
      setFiles(validFiles);
    }else{
      setFiles([]);
    }
    if (invalid) {
      toast.error("Some files were not valid images and were not uploaded.");
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let body ;
    if(selectedTab === "announcement"){
      body = {
        event_type: eventType,
        priority,
        from_date: fromDate,
        to_date: toDate,
        title,
        description,
      };
    }else {
     body = {
        event_type: eventType,
        priority,
        from_date: fromDate,
        to_date: toDate,
        title,
        description,
        files : files
       }
    }
    
    Object.keys(selectedNoti).length === 0 ? handleAddAnnouncement(body, selectedNoti._id) : handleAddAnnouncement(body);
    isEdit(!edit);
    if (!fromDate || !description) {
      toast.error("Please fill all the fields");
      return;
    }

    const formattedDate = new Date(fromDate);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDateString = formattedDate.toLocaleDateString("en-GB", options);
    const formattedDateFullString = formattedDateString.replace(/(\d+)([a-z]+)/i, "$1$2");

    // if (selectedTab === "activity") {
    //   const newNotification = {
    //     type: body.event_type,
    //     message: body.description,
    //     date: formattedDateFullString,
    //     image: URL.createObjectURL(file),
    //   };

    //   onAddNotification(newNotification);
    //   setFile(null);
    // }

    setEventType("");
    setTitle("");
    setPriority("");
    setFromDate("");
    setToDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            marginBottom="-10px"
            color="#686868"
            fontWeight="500"
          >
            Event Type:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <Select
              value={ eventType }
              onChange={(e) => setEventType(e.target.value)}
              sx={{ minWidth: 120, backgroundColor: "rgb(250, 250, 250)" }}
            >
              <MenuItem value="announcement">Announcement</MenuItem>
              <MenuItem value="activity">Activity</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Title"
            value={ title }
            onChange={(e) => setTitle(e.target.value)}
            sx={{ backgroundColor: "rgb(250, 250, 250)" }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Priority"
            value={ priority }
            onChange={(e) => setPriority(e.target.value)}
            sx={{ backgroundColor: " rgb(250, 250, 250)" }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description"
            value={ description }
            onChange={(e) => setDescription(e.target.value)}
            sx={{ backgroundColor: "rgb(250, 250, 250)" }}
            variant="outlined"
            fullWidth
            multiline
            rows={5}
          />

          {selectedTab === "activity" && (
            <Box sx={{ display: 'flex' }}>
                <InputLabel
                  htmlFor="file-upload"
                  sx={{
                    marginTop: '5px',
                    border: '1px solid rgb(202, 199, 199)',
                    borderRadius: '4px',
                    width: 'fit-content',
                    padding: '1px 5px',
                    backgroundColor: 'rgb(250, 250, 250)',
                    cursor: 'pointer',
                  }}
                >
                  Choose Images
                </InputLabel>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                  sx={{ display: 'none' }}
                />
                {files.length > 0 && (
                  <Typography
                    sx={{ color: 'green', marginTop: '5px', padding: '1px 5px' }}
                  >
                    {files.length} Image(s) uploaded
                  </Typography>
                )}
            </Box>
          )}
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ paddingLeft: "20px", marginTop: "-8%" }}
        >
          <Grid item xs={2.5}>
            <Typography variant="body1" color="#686868">
              From:
            </Typography>
            <TextField
              type="date"
              value={ fromDate }
              onChange={(e) => setFromDate(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginLeft: "20px", backgroundColor: "rgb(250, 250, 250)" }}
            />
          </Grid>
          <Grid item xs={2.5}>
            <Typography
              variant="body1"
              sx={{ marginLeft: "20px", color: "#686868" }}
            >
              To:
            </Typography>
            <TextField
              type="date"
              value={ toDate }
              onChange={(e) => setToDate(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginLeft: "30px", backgroundColor: "rgb(250, 250, 250)" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={10} style={{ textAlign: "right" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ background: "#FF5151", color: "#FFFFFF" }}
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
