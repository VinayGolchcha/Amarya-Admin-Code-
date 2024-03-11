import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Typography } from "@mui/material";

export default function SettingsAddUser() {
  const designationOptions = ["Web Developer", "Sap Developer", "ML Developer"];
  const designationTypeOptions = [
    "Senior Employee",
    "Junior Employee",
    "Intern",
  ];
  const cityOptions = ["Jabalpur", "Satna", "Delhi"];

  return (
    <div style={{ margin: "20px 50px 50px 20px" }}>
      <Grid container spacing={3.5}>
        {[...Array(5)].map((_, rowIndex) => (
          <Grid container item spacing={8} key={rowIndex}>
            {[...Array(rowIndex === 4 ? 3 : 3)].map((_, colIndex) => (
              <Grid item xs={colIndex === 0 ? 4 : 4} key={colIndex}>
                {rowIndex === 0 && colIndex === 0 ? (
                  <TextField
                    label="First Name"
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
                    label="Last Name"
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
                    select
                    label="Designation"
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
                    select
                    label="Designation Type"
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
                    label="Contact Number"
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
                    label="Password"
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
                    label="Joining Date"
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
                    label="Emergency Contact Person Name"
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
                    label="Emergency Contact Number"
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
                    select
                    label="City"
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
                    label="Date of Birth"
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
                    label="Experience"
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
              label="Address"
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
              label="Completed Projects"
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
          >
            Click to Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
