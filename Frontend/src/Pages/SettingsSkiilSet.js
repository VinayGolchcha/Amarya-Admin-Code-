import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

export default function SettingsSkiilSet() {
  const [formData, setFormData] = useState([
    { _id: "", skill: "" },
    { _id: "", skill: "" },
    { _id: "", skill: "" },
    { _id: "", skill: "" },
    { _id: "", skill: "" },
    { _id: "", skill: "" },
    { _id: "", skill: "" },
    { _id: "", skill: "" },
    { _id: "", skill: "" },
    { _id: "", skill: "" },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [originalFormData, setOriginalFormData] = useState([]);
  const len = formData.length;
  const midPoint = Math.floor(formData.length / 2);
  useEffect(() => {
    // Fetch skills data when component mounts
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    // Make a fetch request to the API endpoint
    fetch(
      "https://tense-ruby-poncho.cyclic.app/api/v1/skillset/admin/fetch-skills"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.success || !data.data) {
          throw new Error("Invalid response format");
        }

        const skills = data.data;

        setFormData(
          data.data.map((skill) => ({ _id: skill._id, skill: skill.skill }))
        );
        setOriginalFormData(skills.map((skill) => ({ ...skill })));

        // console.log(skills);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., show error message to the user)
      });
  };

  const handleAddNew = () => {
    setFormData([...formData, { skill: "" }]);
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
      // Iterate through formData and extract only the skills that have been edited
      const editedSkills = formData.filter(
        (data, index) => data.skill !== originalFormData[index].skill
      );
      console.log(editedSkills);
      // Send API requests to update each edited skill
      editedSkills.forEach((editedSkill) => {
        fetch(
          `https://tense-ruby-poncho.cyclic.app/api/v1/skillSet/admin/update-skill/${editedSkill._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ skill: editedSkill.skill }), // Send the updated skill value
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update skill");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Skill updated successfully:", data);
          })
          .catch((error) => {
            console.error("Error updating skill:", error);
          });
      });

      // After updating all edited skills, reset editMode
      setEditMode(false);
    }
  };

  const handleInputChange = (index, fieldName, value) => {
    console.log(value);
    const newFormData = [...formData];
    newFormData[index][fieldName] = value;
    setFormData(newFormData);
  };

  const handleInputClick = (index) => {
    console.log(index);
    if (deleteMode) {
      setSelectedInputIndex(index);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, m: "25px 0px 20px 25px" }}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          {formData.slice(0, midPoint).map((data, index) => (
            <FormControl fullWidth>
              <FormLabel sx={{ color: "black", fontWeight: "600" }}>
                Skill {index + 1}
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
                value={data.skill}
                onChange={(e) =>
                  handleInputChange(index, "skill", e.target.value)
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
                Skill {index + midPoint + 1}
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
                value={data.skill}
                onChange={(e) =>
                  handleInputChange(index + midPoint, "skill", e.target.value)
                }
                disabled={!editMode}
                onClick={() => handleInputClick(index + midPoint)}
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
