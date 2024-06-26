import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";

export default function SettingsLeave() {
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
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || "");
  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = () => {
    fetch(`${apiUrl}/leave/fetch-leave-type-and-count`, {
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
        console.log(data);
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
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete leave type");
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
          })
          .catch((error) => {
            console.error("Error deleting leave type:", error);
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

      console.log(editedleaves);
      editedleaves.forEach((item) => {
        console.log(item);
        const leaveId = item._id;
        const leaveTypeId = item.leave_type_id;
        fetch(
          `${apiUrl}/leave/admin/update-leave-type-and-count/${leaveId}/${leaveTypeId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
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
              toast.error(response.message || "Leave Type Crea successfully");

              throw new Error("Failed to update leave type");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Leave type updated successfully:", data);
            toast.success(data.message || "Leave Type updated successfully");
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
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
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
            console.log("Leave type created successfully:", data);
            toast.success(data.message || "Leave Type Created successfully");
            fetchLeaveData();
            // Optionally update the form data with the newly created leave type ID
          })
          .catch((error) => {
            console.error("Error creating leave type:", error);
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
        <Grid container spacing={4} sx={{ marginLeft: "5%" }}>
          <Grid item xs={2.5}>
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
                  onClick={() => handleInputClick(index)}
                  disabled={!editMode}
                />
              ))}
            </FormControl>
          </Grid>

          <Grid item xs={1.5}>
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
              <FormLabel sx={{ color: "black", fontWeight: "600" }}>
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
