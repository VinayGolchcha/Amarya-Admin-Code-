import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  CircularProgress,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useAuth } from "../Components/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsSkillSet() {
  const [formData, setFormData] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [originalFormData, setOriginalFormData] = useState([]);

  const len = formData.length;
  const midPoint = Math.floor(formData.length / 2);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false); // New state for loading
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    setLoading(true); // Start loading
    fetch(`${apiUrl}/skillset/fetch-skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          // Handle 404 Not Found
          setEditMode(true);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.success || !data.data) {
          throw new Error("Invalid response format");
        }

        const skills = data.data;

        setFormData(
          skills.map((skill) => ({ _id: skill._id, skill: skill.skill }))
        );
        setOriginalFormData([...skills]);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
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
      if (selectedInputIndex !== null) {
        const skillId = formData[selectedInputIndex]._id;
        fetch(`${apiUrl}/skillSet/admin/delete-skill/${skillId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete skill");
            }
            return response.json();
          })
          .then((data) => {
            const newFormData = [...formData];
            newFormData.splice(selectedInputIndex, 1);
            setFormData(newFormData);
            setSelectedInputIndex(null);
            setDeleteMode(false);
            toast.success("Skill deleted successfully.");
            fetchSkills();
          })
          .catch((error) => {
            toast.error("Failed to delete skill.");
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
      const editedSkills = formData.filter(
        (data, index) =>
          data &&
          originalFormData[index] &&
          data.skill !== originalFormData[index].skill
      );
      const newSkills = formData.filter(
        (data) => data && !data._id && data.skill
      );

      // Update existing skills
      editedSkills.forEach((editedSkill) => {
        fetch(`${apiUrl}/skillSet/admin/update-skill/${editedSkill._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ skill: editedSkill.skill }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update skill");
            }
            return response.json();
          })
          .then((data) => {
           
            fetchSkills();
            toast.success("Skill updated successfully.");
            setEditMode(false);
          })
          .catch((error) => {
            console.error("Error updating skill:", error);
            toast.error("Failed to update skill.");
          });
      });

      // Create new skills
      newSkills.forEach((newSkill) => {
        fetch(`${apiUrl}/skillSet/admin/create-skill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ skill: newSkill.skill }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to create skill");
            }
            return response.json();
          })
          .then((data) => {
         
            fetchSkills();
            toast.success("Skill created successfully.");
            // Update the form data with the newly created skill ID
            const updatedFormData = [...formData];
            const index = updatedFormData.findIndex(
              (item) => item && item.skill === newSkill.skill
            );
            if (index !== -1) {
              updatedFormData[index] = {
                _id: data.skill._id,
                skill: data.skill.skill,
              };
              setFormData(updatedFormData);
            }
            setEditMode(false);
          })
          .catch((error) => {
            console.error("Error creating skill:", error);
            // toast.error(error.message);
          });
      });
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

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: '100vh',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            m: "25px 0px 20px 25px",
          }}
        >
          <Grid container spacing={4} sx={{ marginLeft: "7%" }}>
            <Grid item lg={4} md = {4} xs ={8}>
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

            <Grid item lg={4} md = {4} xs ={8}>
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
                      handleInputChange(
                        index + midPoint,
                        "skill",
                        e.target.value
                      )
                    }
                    disabled={!editMode}
                    onClick={() => handleInputClick(index + midPoint)}
                  />
                </FormControl>
              ))}
            </Grid>

            <Grid item lg={4} md = {4} xs ={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  gap: "40px",
                  marginLeft : "25%"
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
      </Box>
    );
  }
}
