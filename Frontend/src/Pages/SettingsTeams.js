import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

export default function SettingsTeams() {
  const [formData, setFormData] = useState([
    { _id: "", team: "" },
    { _id: "", team: "" },
    { _id: "", team: "" },
    { _id: "", team: "" },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const len = formData.length;
  const [originalFormData, setOriginalFormData] = useState([]);
  const midPoint = Math.floor(formData.length / 2);
  const apiUrl = process.env.REACT_APP_API_URL;
  

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    fetch(`${apiUrl}/team/fetch-all-teams`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.success || !data.data) {
          throw new Error("Invalid response format");
        }

        const teams = data.data;

        setFormData(
          data.data.map((team) => ({ _id: team._id, team: team.team }))
        );
        setOriginalFormData([...teams]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddNew = () => {
    setFormData([...formData, { team: "" }]);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    if (deleteMode) {
      if (selectedInputIndex !== null) {
        const teamId = formData[selectedInputIndex]._id;
        fetch(`${apiUrl}/team/admin/delete-team/${teamId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete team");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Team deleted successfully:", data);
            const newFormData = [...formData];
            newFormData.splice(selectedInputIndex, 1);
            setFormData(newFormData);
            setSelectedInputIndex(null);
            setDeleteMode(false);
          })
          .catch((error) => {
            console.error("Error deleting team:", error);
          });
      } else {
        setDeleteMode(false);
      }
    } else {
      setDeleteMode(true);
      setEditMode(true); // Enable all text fields
    }
  };
  

  const handleSave = () => {
    if (editMode) {
      const editedteam = formData.filter(
        (data, index) =>
          data &&
          originalFormData[index] &&
          data.team !== originalFormData[index].team
      );
      console.log(editedteam);
      const newteam = formData.filter((data) => data && !data._id && data.team);
      // Update existing team
      editedteam.forEach((editedteam) => {
        fetch(`${apiUrl}/team/admin/update-team/${editedteam._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ team: editedteam.team }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update team");
            }
            return response.json();
          })
          .then((data) => {
            console.log("team updated successfully:", data);
          })
          .catch((error) => {
            console.error("Error updating team:", error);
          });
      });

      // Create new team
      newteam.forEach((newteam) => {
        fetch(`${apiUrl}/team/admin/create-team`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ team: newteam.team }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to create team");
            }
            return response.json();
          })
          .then((data) => {
            console.log("team created successfully:", data);
            // Update the form data with the newly created team ID
            const updatedFormData = [...formData];
            console.log(updatedFormData);
            const index = updatedFormData.findIndex(
              (item) => item && item.team === newteam.team
            );
            if (index !== -1) {
              updatedFormData[index] = {
                _id: data.team._id,
                team: data.team.team,
              };
              setFormData(updatedFormData);
            }
          })
          .catch((error) => {
            console.error("Error creating team:", error);
          });
      });

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
