import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

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
    profile_picture:
      "https://www.pexels.com/photo/woman-sitting-on-sofa-while-looking-at-phone-with-laptop-on-lap-920382/",
    blood_group: "B+",
    mobile_number: "",
    emergency_contact_number: "",
    emergency_contact_person_info: "",
    address: "",
    dob: "",
    designation: "",
    designationType: "",
    joining_date: "",
    experience: 0,
    completed_projects: 0,
    teams: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert keys from camelCase to snake_case
    // const formDataSnakeCase = Object.fromEntries(
    //   Object.entries(formData).map(([key, value]) => [
    //     key.replace(/[A-Z]/g, "_$&").toLowerCase(),
    //     value,
    //   ])
    // );

    console.log(formData);
    try {
      // Make HTTP POST request to the API URL using Axios
      const response = await axios.post(
        `${apiUrl}/user/admin/register`,
        formData
      );

      console.log("User data saved successfully!", response.data);
    } catch (error) {
      console.error("Error saving user data:", error.message);
    }
  };

  return (
    <div style={{ margin: "20px 50px 50px 20px" }}>
      <Grid container spacing={3.5}>
        {[...Array(5)].map((_, rowIndex) => (
          <Grid container item spacing={8} key={rowIndex}>
            {[...Array(rowIndex === 4 ? 3 : 3)].map((_, colIndex) => (
              <Grid item xs={colIndex === 0 ? 4 : 4} key={colIndex}>
                {rowIndex === 0 && colIndex === 0 ? (
                  <TextField
                    onChange={handleChange}
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
                    {designationOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : rowIndex === 1 && colIndex === 0 ? (
                  <TextField
                    onChange={handleChange}
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
                    {designationTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : rowIndex === 2 && colIndex === 0 ? (
                  <TextField
                    onChange={handleChange}
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
                  <TextField
                    onChange={handleChange}
                    select
                    label="City"
                    name="city_name"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "2px",
                        borderColor: "#b3b3b3",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    {cityOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : rowIndex === 4 && colIndex === 1 ? (
                  <TextField
                    onChange={handleChange}
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
        {/* Adding the 6th row separately */}
        <Grid container item spacing={10}>
          <Grid item xs={8}>
            <TextField
              onChange={handleChange}
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
              label="Completed Projects"
              name="completed_projects"
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
        </Grid>
        <Grid item xs={7} style={{ textAlign: "right" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ background: "#FF5151", color: "#FFFFFF" }}
            onClick={handleSubmit}
          >
            Click to Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
