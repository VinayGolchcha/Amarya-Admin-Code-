import { Box, Button, CircularProgress, FormLabel, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Components/AuthContext";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor : "white",
  "&.MuiModal-backdrop" : {
    backgroundColor : "#rgb(233, 235, 247)"
  },
  width: {lg : 400 , md : 400 , sm : 400 , xs : 350},
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius : "10px",
  p: 2,
  pb:4
};

const AdminAddUserLeave = ({ open, handleCloseAddUserLeave, id, getUserLeaves, data }) => {
    const [leaveType, setLeaveType] = useState("Casual Leave");
    const [fromDate, setFromDate] = useState(new Date(new Date()).toISOString().split('T')[0]);
    const [date , setDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [rows, setRows] = useState([]);
    const currentDate = new Date();
    const [file , setFile] = useState();
    const [isApiHit , setIsApiHit] = useState(false);
    const { user , encryptionKey} = useAuth();
    const apiUrl = process.env.REACT_APP_API_URI;

    
    function handleToDateChange(newDate) {
        const datee = new Date(newDate);
        const strDatee = datee.toISOString();
        const formatttedDate = strDatee.split("T")[0];

        setToDate(formatttedDate);
    }

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

      const handleUpdate = async () => {
        try {
          const validateFromDate = new Date(fromDate);
          const validateToDate = new Date(toDate);
          if(validateFromDate > validateToDate){
            toast.warn("From date should be less than the to date");
            return;
          }
          if(!leaveType.toLowerCase().includes("casual") && !leaveType.toLowerCase().includes("compensatory") && !file?.type.includes("image/")){
            toast.warn("file should be an image");
            return;
          }
          setIsApiHit(true);
          const dataToBeSend = {
            emp_id: id,
            leave_type: leaveType,
            from_date: fromDate,
            to_date: toDate,
            subject: subject,
            body: body,
            file : file,
          }
          console.log(dataToBeSend);
          const formData = new FormData();
          Object.keys(dataToBeSend).forEach((item) => {
            formData.append(item , dataToBeSend[item]);
            console.log("formdata" , formData)
          })
          const response = await axios.post(
            `${apiUrl}/leave/admin/add-employee-leave`,
            formData,
            {
              headers: {
                "x-encryption-key" : encryptionKey
              },
            }
          );
    
          toast.success(response?.data?.message);
          setIsApiHit(false);
          getUserLeaves(id);
        } catch (error) {
          setIsApiHit(false);
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

    return (
        <Modal
            open={open}
            onClose={handleCloseAddUserLeave}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography textAlign="end" sx={{ cursor: "pointer" }} onClick={handleCloseAddUserLeave}><CloseIcon /></Typography>
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
                        {data?.user_data?.map((type) => (
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
                    <FormLabel sx={{ margin: "2px 0px", fontSize: "12px" }}>
                        Upload File
                    </FormLabel>
                    <TextField
                        id="upload-text"
                        variant="outlined"
                        size="small"
                        sx={{ width: "100%", backgroundColor: "white" }}
                        value={file && file.name}
                        disabled
                        InputProps={{
                            style: {
                                fontSize: { xs: "18px", md: "20px" },
                            },
                            endAdornment: (
                                <IconButton
                                    edge="end"
                                    component="label"
                                    htmlFor="upload-file"
                                    sx={{ color: "rgb(188, 189, 163)" }}
                                >
                                    <img src="Images/file-uplaod.png" alt="upload-icon" height="20px" width="20px" />
                                    <input
                                        type="file"
                                        id="upload-file"
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </IconButton>
                            ),
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                                fontSize: { xs: "18px", md: "20px" },
                            },
                        }}
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
                        ...(isApiHit && {
                            "&.MuiButtonBase-root.MuiButton-root.Mui-disabled": {
                                backgroundColor: "transparent",
                                color: "black",
                            },
                        })
                    }}
                    onClick={handleUpdate}
                    disabled={isApiHit}
                >
                    {isApiHit ? <CircularProgress color="inherit" size={20} sx={{ width: "100%", height: "100%" }} /> : <>Send to admin</>}
                </Button>
            </Box>
        </Modal>
    )
}

export default AdminAddUserLeave