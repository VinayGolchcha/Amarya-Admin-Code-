import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyForm({ onAddNotification }) {
  const [eventType, setEventType] = useState(""); // State for event type
  const [title, setTitle] = useState(""); // State for title
  const [priority, setPriority] = useState(""); // State for priority
  const [description, setDescription] = useState(""); // State for description
  const [fromDate, setFromDate] = useState(""); // State for from date
  const [toDate, setToDate] = useState(""); // State for to date

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if fromDate and toDate are empty
    if (!fromDate || !description) {
      toast.error("Plese fill all the Fields");
      return;
    }

    // Format the date
    const formattedDate = new Date(fromDate);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDateString = formattedDate.toLocaleDateString(
      "en-GB",
      options
    );
    const formattedDateFullString = formattedDateString.replace(
      /(\d+)([a-z]+)/i,
      "$1$2"
    );

    // Create a new notification object
    const newNotification = {
      id: Math.random(), // Generate a unique ID
      type: eventType,
      message: description,
      date: formattedDateFullString, // Using formatted date string
    };

    // Update the notifications array
    onAddNotification(newNotification);

    // Reset form fields
    setEventType("");
    setTitle("");
    setPriority("");
    setDescription("");
    setFromDate("");
    setToDate("");
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
          <FormControl variant="filled" fullWidth>
            <Select
              label="Event Type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="announcement">Announcement</MenuItem>
              <MenuItem value="activity">Activity</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="filled"
            fullWidth
            multiline
            rows={5}
          />
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
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              variant="filled"
              fullWidth
              sx={{ marginLeft: "20px" }}
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
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              variant="filled"
              fullWidth
              sx={{ marginLeft: "30px" }}
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
