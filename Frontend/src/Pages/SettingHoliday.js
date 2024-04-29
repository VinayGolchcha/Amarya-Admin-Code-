import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

export default function SettingHoliday() {
  const [formData, setFormData] = useState([
    { date: "", day: "", holiday: "" },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleAddNew = () => {
    setFormData([...formData, { date: "", holiday: "" }]);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    if (deleteMode) {
      const newFormData = [...formData];
      newFormData.splice(selectedInputIndex, 1);
      setFormData(newFormData);
      setSelectedInputIndex(null);
      setDeleteMode(false);
    } else {
      setDeleteMode(true);
    }
  };

  const handleSave = () => {
    if (editMode) {
      setEditMode(false);
    }
  };

  const handleInputChange = (index, fieldName, value) => {
    const date = new Date(value);
    const selectedDay = date.getDay();
    const dayOfTheWeek = days[selectedDay];
    const newFormData = [...formData];
    newFormData[index]["day"] = dayOfTheWeek;
    newFormData[index][fieldName] = value;
    setFormData(newFormData);
  };

  const handleInputClick = (index) => {
    if (deleteMode) {
      setSelectedInputIndex(index);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, m: "25px 0px 20px 25px" }}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <FormLabel sx={{ color: "black", fontWeight: "600" }}>
              Date
            </FormLabel>
            {formData.map((data, index) => (
              <TextField
                key={index}
                type="date"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#b3b3b3",
                    borderRadius: "10px",
                  },
                  margin: "10px 0px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={data.date}
                onChange={(e) =>
                  handleInputChange(index, "date", e.target.value)
                }
                onClick={() => handleInputClick(index)}
                disabled={!editMode}
              />
            ))}
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <FormLabel sx={{ color: "black", fontWeight: "600" }}>
              Day
            </FormLabel>
            {formData.map((data, index) => (
              <TextField
                key={index}
                type="text"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#b3b3b3",
                    borderRadius: "10px",
                  },
                  margin: "10px 0px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={data.day}
                disabled
              />
            ))}
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <FormLabel sx={{ color: "black", fontWeight: "600" }}>
              Holiday
            </FormLabel>
            {formData.map((data, index) => (
              <TextField
                key={index}
                label="Holiday"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#b3b3b3",
                    borderRadius: "10px",
                  },
                  margin: "10px 0px",
                }}
                value={data.holiday}
                onChange={(e) =>
                  handleInputChange(index, "holiday", e.target.value)
                }
                disabled={!editMode}
              />
            ))}
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center ",
              width: "100%",
              height: "100%",
              gap: "40px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{
                display: "block",
                backgroundColor: "#ff5151",
                width: "60%",
              }}
              onClick={handleAddNew}
            >
              Add New
            </Button>
            {editMode && (
              <Button
                variant="contained"
                color="error"
                sx={{
                  display: "block",
                  backgroundColor: "#ff5151",
                  width: "60%",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              sx={{
                display: "block",
                backgroundColor: "#ff5151",
                width: "60%",
              }}
              onClick={handleEdit}
            >
              {editMode ? "Cancel Edit" : "Edit"}
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                display: "block",
                backgroundColor: "#ff5151",
                width: "60%",
              }}
              onClick={handleDelete}
            >
              {deleteMode ? "Confirm Delete" : "Delete"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
