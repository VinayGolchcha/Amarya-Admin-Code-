import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsAddUser() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const designationOptions = ["Web Developer", "Sap Developer", "ML Developer"];
  const designationTypeOptions = [
    "Senior Employee",
    "Junior Employee",
    "Intern",
  ];
  const cityOptions = ["Jabalpur", "Satna", "Delhi"];

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    state_name: "Madhya Pradesh",
    city_name: "",
    blood_group: "",
    mobile_number: "",
    emergency_contact_number: "",
    emergency_contact_person_info: "",
    address: "",
    dob: "",
    designation: "",
    designation_type: "",
    joining_date: "",
    experience: 0,
    completed_projects: 0,
    teams: 0,
    gender: "",
    file: "",

  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      console.log(files[0]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const formatDateString = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDateForInput = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      dob: formData.dob,
      joining_date: formData.joining_date,
    };

    // Create a new FormData instance
    const formDataToSend = new FormData();
    for (const key in updatedFormData) {
      if (updatedFormData.hasOwnProperty(key)) {
        formDataToSend.append(key, updatedFormData[key]);
      }
    }

    console.log("submit Data:", updatedFormData);
    try {
      const response = await axios.post(
        `${apiUrl}/user/admin/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("User data saved successfully!");
    } catch (error) {
      console.error("Error saving user data:", error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((error) => {
          toast.error(error.msg);
        });
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div style={{ margin: "20px 50px 50px 20px" }}>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3.5}>
          {[...Array(5)].map((_, rowIndex) => (
            <Grid container item spacing={8} key={rowIndex}>
              {[...Array(rowIndex === 4 ? 3 : 3)].map((_, colIndex) => (
                <Grid item xs={colIndex === 0 ? 4 : 4} key={colIndex}>
                  {rowIndex === 0 && colIndex === 0 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.first_name}
                      label="First Name"
                      name="first_name"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : rowIndex === 0 && colIndex === 1 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.last_name}
                      label="Last Name"
                      name="last_name"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : rowIndex === 0 && colIndex === 2 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.designation}
                      select
                      label="Designation"
                      name="designation"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      {/* <MenuItem  value={formData.designation}>
                        {formData.designation}
                      </MenuItem> */}
                      {designationOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : rowIndex === 1 && colIndex === 0 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.email}
                      name="email"
                      label="Email"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : rowIndex === 1 && colIndex === 1 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.username}
                      name="username"
                      label="Username"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : rowIndex === 1 && colIndex === 2 ? (
                    <TextField
                      onChange={handleChange}
                      select
                      value={formData.designation_type}
                      label="Designation Type"
                      name="designation_type"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      {/* <MenuItem  value={formData.designationType}>
                      {formData.designationType}
                      </MenuItem> */}
                      {designationTypeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : rowIndex === 2 && colIndex === 0 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.mobile_number}
                      label="Contact Number"
                      name="mobile_number"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : rowIndex === 2 && colIndex === 1 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.password}
                      label="Password"
                      name="password"
                      type="password"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : rowIndex === 2 && colIndex === 2 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.joining_date}
                      label="Joining Date"
                      name="joining_date"
                      type="date"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : rowIndex === 3 && colIndex === 0 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.emergency_contact_person_info}
                      label="Emergency Contact Person Name"
                      name="emergency_contact_person_info"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : rowIndex === 3 && colIndex === 1 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.emergency_contact_number}
                      label="Emergency Contact Number"
                      name="emergency_contact_number"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : rowIndex === 3 && colIndex === 2 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.teams}
                      name="teams"
                      label="Team"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : rowIndex === 4 && colIndex === 0 ? (
                    <Grid item xs={12}>
                      <TextField
                        onChange={handleChange}
                        value={formData.gender}
                        label="gender"
                        name="gender"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "2px",
                            borderColor: "#b3b3b3",
                            borderRadius: "10px",
                          },
                        }}
                      />
                    </Grid>
                  ) : rowIndex === 4 && colIndex === 1 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.dob}
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : rowIndex === 4 && colIndex === 2 ? (
                    <TextField
                      onChange={handleChange}
                      value={formData.experience}
                      label="Experience"
                      name="experience"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  ) : null}
                </Grid>
              ))}
            </Grid>
          ))}
          <Grid container item spacing={10}>
            <Grid item xs={4}>
              <TextField
                onChange={handleChange}
                value={formData.address}
                label="Address"
                name="address"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#b3b3b3",
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleChange}
                value={formData.blood_group}
                label="Blood Group"
                name="blood_group"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#b3b3b3",
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                type="file"
                name="file"
                onChange={handleChange}
                // sx={{
                //   [theme.breakpoints.up("md")]: {
                //     width: "80%",
                //   },
                //   "& .MuiOutlinedInput-notchedOutline": {
                //     borderWidth: "2px",
                //     borderColor: "#b3b3b3",
                //     borderRadius: "10px",
                //   },
                // }}
              />
            </Grid>
          </Grid>
          <Grid item xs={7} style={{ textAlign: "right" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ background: "#FF5151", color: "#FFFFFF" }}
            >
              Click to Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
