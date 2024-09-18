import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAuth } from "./AuthContext";
import CircularProgress from '@mui/material/CircularProgress'
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FeedbackForm() {
  const { user , encryptionKey } = useAuth();
  const token = encodeURIComponent(user?.token || "");
  const [date, setDate] = useState(dayjs());
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const currentDate = dayjs();
  const [isApiHit , setIsApiHit] = useState(false);
  

  const handleSubmit = async () => {
    const feedbackData = {
      emp_id: user?.user_id, // Replace with actual employee ID if available
      date: date.format("YYYY-MM-DD"),
      subject,
      description,
    };
    if(!subject){
      toast.warn("Subject cannot be empty");
      return;
    }
    if(!description){
      toast.warn("Description cannot be empty");
      return;
    }
    if(description.length > 100){
      toast.error("Description must not be more than 100 characters");
      return;
    }
    try {
      setIsApiHit(true);
      const response = await fetch(
        `${apiUrl}/userDashboard/user-dashboard-feedback`,
        {
          method: "POST",
          credentials: 'include', // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey
          },
          body: JSON.stringify(feedbackData),
        }
      );
      if (response.ok) {
        // Handle successful submission (e.g., display a success message, clear form, etc.)
        toast.success("Feedback submitted successfully!");
        setSubject("");
        setDescription("");
        setIsApiHit(false);
      } else {
        // Handle error response
        console.error("Failed to submit feedback");
        setIsApiHit(false);
      }
    } catch (error) {
      console.error("An error occurred while submitting feedback:", error);
      setIsApiHit(false);
    }
  };

  return (
    <Box
      sx={{ p: 2, mt: 2, border: "1px solid #E0E0E0", borderRadius: "12px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "28px",
            color: "#161E54",
          }}
          variant="p"
        >
          Suggestions and Feedback
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            format="DD-MM-YYYY"
            minDate={currentDate}
            onChange={(newDate) => setDate(newDate)}
            sx={{ backgroundColor: "rgb(250, 250, 250)" }}
          />
        </LocalizationProvider>
      </Box>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: "400",
          fontSize: "12px",
          lineHeight: "28px",
          color: "#686868",
        }}
      >
        Subject
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        sx={{
          border: "0.5px solid #E0E0E0",
          borderRadius: "6px",
          backgroundColor: "rgb(250, 250, 250)",
        }}
      />
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: "400",
          fontSize: "12px",
          lineHeight: "28px",
          color: "#686868",
        }}
      >
        Body
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
          border: "0.5px solid #E0E0E0",
          borderRadius: "6px",
          backgroundColor: "rgb(250, 250, 250)",
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          sx={{
            m: 2,
            float: "right",
            padding: "10px 16px 10px 16px",
            color: "#FFFFFF",
            font: "Poppins 500",
            borderRadius: "4px",
            backgroundColor: "#FF5151",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FF5151",
            },
            ...(isApiHit && {"&.MuiButtonBase-root.MuiButton-root.Mui-disabled": {
                  backgroundColor: "transparent",
                  color: "black",
                },})
          }}
          
          onClick={handleSubmit}
          disabled={isApiHit}
        >
          {isApiHit ? <CircularProgress color="inherit" size={20} sx={{width : "100%" , height : "100%"}}/> : <>Send to admin</>}
        </Button>
      </Box>
    </Box>
  );
}
