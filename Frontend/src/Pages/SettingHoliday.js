import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SettingHoliday() {
  const theme = useTheme();

  // Define breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  // Set spacing based on screen size
  let spacing = 8; // default spacing
  if (isXs) spacing = 0.5;
  if (isSm) spacing = 2;
  if (isMd) spacing = 3;
  if (isLg) spacing = 4;
  if (isXl) spacing = 5;
  const [formData, setFormData] = useState([
    { _id: "", date: "", day: "", holiday: "" },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [originalFormData, setOriginalFormData] = useState([]);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user , encryptionKey } = useAuth();
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly

  useEffect(() => {
    fetchHolidayData();
  }, []);

  const fetchHolidayData = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/leave/fetch-holiday-list`,
      {
        method: "GET",
        credentials: 'include', // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
          "x-encryption-key" : encryptionKey
        },
      }
    )
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
        const formattedData = data.data.map((item) => ({
          _id: item._id,
          date: formatDate(item.date),
          day: days[new Date(item.date).getDay()],
          holiday: item.holiday,
        }));
        setFormData(formattedData);
        const formattedOriginalData = data.data.map((item) => ({
          _id: item._id,
          holiday: item.holiday,
          date: formatDate(item.date),
          day: days[new Date(item.date).getDay()],
        }));
        setOriginalFormData(formattedOriginalData);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching holiday data:", error));
  };
  const formatDateForAPI = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };
  const formatDateForAPI2 = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getFullYear());
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const handleAddNew = () => {
    setFormData([...formData, { date: "", holiday: "" }]);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    if (deleteMode) {
      if (selectedInputIndex !== null) {
        const holidayId = formData[selectedInputIndex]._id;
        fetch(
          `${process.env.REACT_APP_API_URL}/leave/admin/delete-holiday/${holidayId}`,
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
              throw new Error("Failed to delete holiday");
              toast.error("Failed to delete holiday.");
            }
            return response.json();
          })
          .then((data) => {
            const newFormData = [...formData];
            newFormData.splice(selectedInputIndex, 1);
            setFormData(newFormData);
            setSelectedInputIndex(null);
            setDeleteMode(false);
            toast.success("Holiday deleted successfully.");
            fetchHolidayData();
          })
          .catch((error) => {
            console.error("Error deleting holiday:", error);
            toast.error("Failed to delete holiday.");
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
      const editedHolidays = formData.filter(
        (data, index) =>
          data &&
          originalFormData[index] &&
          (data.holiday !== originalFormData[index].holiday ||
            data.date !== originalFormData[index].date)
      );
      const newHolidays = formData.filter(
        (data) => data && !data._id && data.holiday
      );

      // Update existing holidays
      editedHolidays.forEach((editedHoliday) => {
        // const formattedDate = formatDateForAPI(editedHoliday.date);
        // console.log(formattedDate);
        const formattedDate = formatDateForAPI2(editedHoliday.date);
        fetch(
          `${process.env.REACT_APP_API_URL}/leave/admin/update-holiday/${editedHoliday._id}`,
          {
            method: "PUT",
            credentials: 'include', // Include cookies in the request
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key" : encryptionKey
            },
            body: JSON.stringify({
              date: formattedDate,
              holiday: editedHoliday.holiday,
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update holiday");
            }
            return response.json();
          })
          .then((data) => {
            fetchHolidayData();
            toast.success("Holiday updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating holiday:", error);
            toast.error("Failed to update Holiday.");
          });
      });

      // Create new holidays
      newHolidays.forEach((newHoliday) => {
        const formattedDate = formatDateForAPI2(newHoliday.date);
        fetch(
          `${process.env.REACT_APP_API_URL}/leave/admin/add-holiday`,
          {
            method: "POST",
            credentials: 'include', // Include cookies in the request
            headers: {
              "Content-Type": "application/json",
              "x-encryption-key" : encryptionKey
            },
            body: JSON.stringify({
              date: formattedDate,
              holiday: newHoliday.holiday,
            }),
          }
        )
          .then((response) => {
            if (!(response.ok)) {
              throw new Error("Failed to create holiday");
            }
            return response.json();
          })
          .then((data) => {
            // Update the form data with the newly created holiday ID
            const updatedFormData = [...formData];
            const index = updatedFormData.findIndex(
              (item) => item && item.date === newHoliday.date
            );
            if (index !== -1) {
              updatedFormData[index] = {
                _id: data?.holiday?._id,
                date: data?.holiday?.date,
                holiday: data?.holiday?.holiday,
              };
              setFormData(updatedFormData);
            }
            fetchHolidayData();
            toast.success("Holiday created successfully.");
          })
          .catch((error) => {
            console.error("Error creating holiday:", error);
            toast.success("Error creating holiday.");
          });
      });

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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Box sx={{ flexGrow: 1, m: "25px 0px 20px 25px" , margin : {md : "25px 0px 20px 0px"}}}>
        <Grid container spacing={spacing} sx={{ marginLeft: "2%" }}>
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
                  value={
                    data.date ? data.date.split("/").reverse().join("-") : ""
                  }
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
                  onClick={() => handleInputClick(index)}
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
}
