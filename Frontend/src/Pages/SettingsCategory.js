import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SettingsCategory() {
    const theme = useTheme();

    // Define breakpoints
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));

    // Set spacing based on screen size
    let spacing = 4; // default spacing
    if (isXs) spacing = 0.5;
    if (isSm) spacing = 1;
    if (isMd) spacing = 3;
    if (isLg) spacing = 4;
    if (isXl) spacing = 4;
  const [formData, setFormData] = useState([{ category: "", points: "" }]);
  useEffect(() => {}, []);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [originalFormData, setOriginalFormData] = useState([]);
  const len = formData.length;
  const midPoint = Math.floor(formData.length / 2);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user , encryptionKey} = useAuth();
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(`${apiUrl}/category/fetch-all-categories`, {
      method: "GET",
      credentials: 'include', // Include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "x-encryption-key" : encryptionKey
      },
    })
      .then((response) => {
        if (response.status === 404) {
          // Handle 404 Not Found
          setEditMode(true);
          setLoading(false);
          return null;
        }
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
        setLoading(false);
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
          credentials: 'include', // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Something went wrong, Please try again");
            }
            return response.json();
          })
          .then((data) => {
            const newFormData = [...formData];
            newFormData.splice(selectedInputIndex, 1);
            setFormData(newFormData);
            setSelectedInputIndex(null);
            setDeleteMode(false);
            toast.success("Category deleted successfully");
            fetchCategories();
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            toast.error(
              error.message || "Something went wrong, Please try again"
            );
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


      editedCategories.forEach((editedCategory) => {
        fetch(
          `${apiUrl}/category/admin/update-category/${editedCategory._id}`,
          {
            method: "PUT",
            credentials: 'include', // Include cookies in the request
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key" : encryptionKey
            },
            body: JSON.stringify({ category: editedCategory.category  , points : editedCategory.points}),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Something went wrong, Please try again");
            }
            return response.json();
          })
          .then((data) => {
            fetchCategories();
            toast.success("Category updated successfully");
          })
          .catch((error) => {
            console.error("Error updating category:", error);
            toast.error("Something went wrong, Please try again");
          });
      });

      const newCategories = formData.filter((data) => !data._id);
      newCategories.forEach((newCategory) => {
        fetch(`${apiUrl}/category/admin/create-category`, {
          method: "POST",
          credentials: 'include', // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey
          },
          body: JSON.stringify({ category: newCategory.category, points: newCategory.points }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Something went wrong, Please try again");
            }
            return response.json();
          })
          .then((data) => {
            toast.success("Category created successfully");
            fetchCategories(); // Refresh the categories after creation
          })
          .catch((error) => {
            console.error("Error creating category:", error);
            toast.error("Something went wrong, Please try again");
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
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Box sx={{ flexGrow: 1, m: "25px 0px 20px 25px" }}>
        <Grid container spacing={spacing} sx={{ marginLeft: "6%" }}>
          <Grid item xs={4}>
            {formData.map((data, index) => (
              <FormControl fullWidth>
                <FormLabel sx={{ color: "black", fontWeight: "600" , fontSize : {lg: "1rem" , md : "1rem" , sm : "1rem" ,xs : "15px"} }}>
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
                <FormLabel sx={{ color: "black", fontWeight: "600", fontSize : {lg: "1rem" , md : "1rem" , sm : "1rem" ,xs : "15px"} }}>
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
}
