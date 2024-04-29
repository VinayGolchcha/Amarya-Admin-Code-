import { Box } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

export default function SettingsLeave() {
  const [formData, setFormData] = useState([
    { leaveType: "", gender: "", count: "" },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);

  const handleAddNew = () => {
    setFormData([...formData, { leaveType: "", gender: "", count: "" }]);
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
    const newFormData = [...formData];
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
              Leave Type
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
                value={data.leaveType}
                onChange={(e) =>
                  handleInputChange(index, "leaveType", e.target.value)
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
              Gender
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
                value={data.gender}
                onChange={(e) =>
                  handleInputChange(index, "gender", e.target.value)
                }
                disabled={!editMode}
              />
            ))}
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <FormLabel sx={{ color: "black", fontWeight: "600" }}>
              Count
            </FormLabel>
            {formData.map((data, index) => (
              <TextField
                key={index}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#b3b3b3",
                    borderRadius: "10px",
                  },
                  margin: "10px 0px",
                }}
                value={data.count}
                onChange={(e) =>
                  handleInputChange(index, "count", e.target.value)
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
