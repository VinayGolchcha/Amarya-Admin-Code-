import { Box } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

export default function SettingsTeams(){
    const [formData, setFormData] = useState([
        { team: "" },
        { team: "" },
        { team: "" },
        { team: "" },
        { team: "" },
        { team: "" },
        { team: "" },
        { team: "" },
        { team: "" },
        { team: "" },
      ]);
      const [editMode, setEditMode] = useState(false);
      const [deleteMode, setDeleteMode] = useState(false);
      const [selectedInputIndex, setSelectedInputIndex] = useState(null);
      const len = formData.length;
      const midPoint = Math.floor(formData.length / 2);
    
      const handleAddNew = () => {
        setFormData([...formData, { team: "" }]);
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
          console.log(selectedInputIndex);
        }
      };
    return (
        <Box sx={{ flexGrow: 1, m: "25px 0px 20px 25px" }}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            {formData.slice(0, midPoint).map((data, index) => (
              <FormControl fullWidth>
                <FormLabel sx={{ color: "black", fontWeight: "600" }}>
                  Team {index + 1}
                </FormLabel>
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
                  value={data.team}
                  onChange={(e) =>
                    handleInputChange(index, "team", e.target.value)
                  }
                  onClick={() => handleInputClick(index)}
                  disabled={!editMode}
                />
              </FormControl>
            ))}
          </Grid>
  
          <Grid item xs={4}>
            {formData.slice(midPoint, len).map((data, index) => (
              <FormControl fullWidth>
                <FormLabel sx={{ color: "black", fontWeight: "600" }}>
                    Team {index + midPoint + 1}
                </FormLabel>
  
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
                  value={data.team}
                  onChange={(e) =>
                    handleInputChange(index + midPoint, "team", e.target.value)
                  }
                  onClick={() => handleInputClick(index + midPoint)}
                  disabled={!editMode}
                />
              </FormControl>
            ))}
          </Grid>
  
          <Grid item xs={4}>
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