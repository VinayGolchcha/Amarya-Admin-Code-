import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useAuth } from "../Components/AuthContext";

export default function SettingsCategory() {
  const [formData, setFormData] = useState([
    { category: "", points: "" },
  ]);
  useEffect(() => {}, []);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [originalFormData, setOriginalFormData] = useState([]);
  const len = formData.length;
  const midPoint = Math.floor(formData.length / 2);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(`${apiUrl}/category/fetch-all-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.success || !data.data) {
          throw new Error("Invalid response format");
        }
        const categories = data.data;
        setOriginalFormData([...categories]);

        setFormData(
          data.data.map((category) => ({
            _id: category._id,
            category: category.category,
            points: category.points,
          }))
        );
        console.log(formData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddNew = () => {
    setFormData([...formData, { category: "", points: "" }]);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    if (deleteMode) {
      if (selectedInputIndex !== null) {
        const categoryId = formData[selectedInputIndex]._id;
        fetch(`${apiUrl}/category/admin/delete-category/${categoryId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete category");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Category deleted successfully:", data);
            const newFormData = [...formData];
            newFormData.splice(selectedInputIndex, 1);
            setFormData(newFormData);
            setSelectedInputIndex(null);
            setDeleteMode(false);
            fetchCategories();
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
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
      const editedCategories = formData.filter(
        (data, index) =>
          data &&
          originalFormData[index] &&
          data.category !== originalFormData[index].category
      );

      console.log(editedCategories);
      editedCategories.forEach((editedCategory) => {
        fetch(
          `${apiUrl}/category/admin/update-category/${editedCategory._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
            body: JSON.stringify({ category: editedCategory.category }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update category");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Category updated successfully:", data);
            fetchCategories();
          })
          .catch((error) => {
            console.error("Error updating category:", error);
          });
      });

      const newCategories = formData.filter((data) => !data._id);
      console.log(newCategories);
      newCategories.forEach((newCategory) => {
        fetch(`${apiUrl}/category/admin/create-category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ category: newCategory.category, points: "1" }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to create category");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Category created successfully:", data);
            fetchCategories(); // Refresh the categories after creation
          })
          .catch((error) => {
            console.error("Error creating category:", error);
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
    }
  };
  return (
    <Box sx={{ flexGrow: 1, m: "25px 0px 20px 25px" }}>
      <Grid container spacing={4} sx={{marginLeft:"6%"}}>
        <Grid item xs={4}>
          {formData.map((data, index) => (
            <FormControl fullWidth>
              <FormLabel sx={{ color: "black", fontWeight: "600" }}>
                Category {index + 1}
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
                value={data.category}
                onChange={(e) =>
                  handleInputChange(index, "category", e.target.value)
                }
                onClick={() => handleInputClick(index)}
                disabled={!editMode}
              />
            </FormControl>
          ))}
        </Grid>
        <Grid item xs={4}>
          {formData.map((data, index) => (
            <FormControl fullWidth>
              <FormLabel sx={{ color: "black", fontWeight: "600" }}>
                Points
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
                value={data.points}
                onChange={(e) =>
                  handleInputChange(index, "points", e.target.value)
                }
                onClick={() => handleInputClick(index)}
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
