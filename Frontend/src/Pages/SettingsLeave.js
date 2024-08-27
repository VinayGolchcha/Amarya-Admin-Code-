import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function SettingsLeave() {
  const theme = useTheme();

  // Define breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  // Set spacing based on screen size
  let spacing = 4; // default spacing
  if (isXs) spacing = 1;
  if (isSm) spacing = 1;
  if (isMd) spacing = 3;
  if (isLg) spacing = 4;
  if (isXl) spacing = 4;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([
    {
      leave_type: "",
      gender: "",
      leave_count: "",
      description: "",
      _id: null,
      leave_type_id: null,
    },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [originalFormData, setOriginalFormData] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const { user ,encryptionKey} = useAuth();
  const token = encodeURIComponent(user?.token || "");
  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = () => {
    fetch(`${apiUrl}/leave/fetch-leave-type-and-count`, {
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
        return response.json();
      })
      .then((data) => {
        const categories = data.data;
        setFormData(
          data.data.map((data) => ({
            leave_type: data.leave_type,
            gender: data.gender,
            leave_count: data.leave_count,
            description: data.description,
            _id: data._id,
            leave_type_id: data.leave_type_id,
          }))
        );
        setOriginalFormData([...categories]);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching leave data:", error));
  };

  const handleAddNew = () => {
    setFormData([...formData, { leave_type: "", gender: "", leave_count: "" }]);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    if (deleteMode) {
      if (selectedInputIndex !== null) {
        const leaveId = formData[selectedInputIndex]._id;
        const leaveTypeId = formData[selectedInputIndex].leave_type_id;
        fetch(
          `${apiUrl}/leave/admin/delete-leave-type-and-count/${leaveId}/${leaveTypeId}`,
          {
            method: "DELETE",
            credentials: 'include', // Include cookies in the request
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key" : encryptionKey
            },
          }
        )
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
            fetchLeaveData();
            toast.success("Leave deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting leave type:", error);
            toast.error(
              error.message || "Something went wrong, Please try again"
            );
          });
      } else {
        setDeleteMode(false);
      }
    } else {
      setDeleteMode(true);
      setEditMode(true);
    }
  };

  const handleSave = () => {
    if (editMode) {
      const editedleaves = formData.filter(
        (data, index) =>
          data &&
          originalFormData[index] &&
          data.leave_count !== originalFormData[index].leave_count
      );


      editedleaves.forEach((item) => {
        const leaveId = item._id;
        const leaveTypeId = item.leave_type_id;
        fetch(
          `${apiUrl}/leave/admin/update-leave-type-and-count/${leaveId}/${leaveTypeId}`,
          {
            method: "PUT",
            credentials: 'include', // Include cookies in the request
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key" : encryptionKey
            },
            body: JSON.stringify({
              leave_type: item.leave_type,
              gender: item.gender,
              leave_count: item.leave_count,
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              toast.error(
                response.message || "Something went wrong, Please try again"
              );

              throw new Error("Failed to update leave type");
            }
            return response.json();
          })
          .then((data) => {
            toast.success(data.message || "Leave type updated successfully");
            fetchLeaveData();
          })
          .catch((error) => {
            console.error("Error updating leave type:", error);
          });
      });

      const newLeaves = formData.filter((data) => !data._id);
      newLeaves.forEach((item) => {
        fetch(`${apiUrl}/leave/admin/add-leave-type-and-count`, {
          method: "POST",
          credentials: 'include', // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey
          },
          body: JSON.stringify({
            leave_type: item.leave_type,
            gender: item.gender,
            leave_count: item.leave_count,
            description: item.description,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to create leave type");
            }
            return response.json();
          })
          .then((data) => {
            toast.success(data.message || "Leave type created successfully");
            fetchLeaveData();
            // Optionally update the form data with the newly created leave type ID
          })
          .catch((error) => {
            console.error("Error creating leave type:", error);
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
  if (loading) {
    return <Loading />;
  } else {
    return (
      <Box sx={{ flexGrow: 1, m: "25px 0px 20px 5px" }}>
        <Grid container spacing={spacing} sx={{ marginLeft: "5%" }}>
          <Grid item xs={2.5}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: "black", fontWeight: "600" , fontSize : {lg : "1rem" , md : "1rem" , sm : "1rem" , xs : "10px" } }}>
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
                      fontSize : {xs : "15px"}
                    },
                    margin: "10px 0px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={data.leave_type}
                  onChange={(e) =>
                    handleInputChange(index, "leave_type", e.target.value)
                  }
                  onClick={() => handleInputClick(index)}
                  disabled={!editMode}
                />
              ))}
            </FormControl>
          </Grid>

          <Grid item xs={1.5}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: "black", fontWeight: "600" , fontSize : {lg : "1rem" , md : "1rem" , sm : "1rem" , xs : "10px" } }}>
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
                      fontSize : {xs : "15px"}
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
                  onClick={() => handleInputClick(index)}
                  disabled={!editMode}
                />
              ))}
            </FormControl>
          </Grid>

          <Grid item xs={1.5}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: "black", fontWeight: "600" , fontSize : {lg : "1rem" , md : "1rem" , sm : "1rem" , xs : "10px" }}}>
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
                      fontSize : {xs : "15px"}
                    },
                    margin: "10px 0px",
                  }}
                  value={data.leave_count}
                  onChange={(e) =>
                    handleInputChange(index, "leave_count", e.target.value)
                  }
                  onClick={() => handleInputClick(index)}
                  disabled={!editMode}
                />
              ))}
            </FormControl>
          </Grid>
          <Grid item xs={3.5}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: "black", fontWeight: "600" , fontSize : {lg : "1rem" , md : "1rem" , sm : "1rem" , xs : "10px" } }}>
                Description
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
                      fontSize : {xs : "15px"}
                    },
                    margin: "10px 0px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={data.description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                  onClick={() => handleInputClick(index)}
                  disabled={!editMode}
                />
              ))}
            </FormControl>
          </Grid>
          <Grid item xs={2}>
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
