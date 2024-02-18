import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Button, Typography } from "@mui/material";

function TextFieldsGrid() {
  const [selectedTab, setSelectedTab] = useState("AddUser");

  const designationOptions = ["Web Developer", "Sap Developer", "ML Developer"];
  const designationTypeOptions = [
    "Senior Employee",
    "Junior Employee",
    "Intern",
  ];
  const cityOptions = ["Jabalpur", "Satna", "Delhi"];

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <Typography
        sx={{
          color: "#161E54",
          fontWeight: "bold",
          m: "25px 0px 20px 25px",
          font: {
            lg: "normal normal 600 20px/25px Poppins",
            md: "normal normal 600 20px/25px Poppins",
            sm: "normal normal 600 16px/25px Poppins",
            xs: "normal normal 600 16px/25px Poppins",
          },
        }}
      >
        Settings
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          background: " #7C85C170",
          borderRadius: "50px",
          margin: "10px 60px 0px 30px",
        }}
      >
        <Button
          sx={{
            width: "50%",
            // background: selectedTab === "AddUser" ? "#161E54" : "none",
            background: "#161E54",
            // color: selectedTab === "AddUser" ? "white" : "black",
            color: "white",
            borderRadius: "50px",
            border: "none",
            "&:hover": {
              // Remove hover effect
              background: "#161E54",
            // color: selectedTab === "AddUser" ? "white" : "black",
            color: "white",
              border: "none",
            },
          }}
          variant="outlined"
          onClick={() => handleTabChange("AddUser")}
          disableRipple
        >
          <img
            src="Images/Vector.png"
            style={{ marginRight: "15px", width: "20px" }}
          />{" "}
          Add User
        </Button>
        <Button
          sx={{
            width: "50%",
            // color: selectedTab === "Other" ? "white" : "black",
            color:"white",
            fontWeight:"600",
            // background: selectedTab === "Other" ? "#161E54" : "none",
            border: "none",
            borderRadius: "50px",
            "&:hover": {
              // Remove hover effect
              border: "none",
            },
          }}
          variant="outlined"
          onClick={() => handleTabChange("Other")}
          disableRipple
        >
          <img
            src="Images/Vector.png"
            style={{ marginRight: "15px", width: "20px" }}
          />{" "}
          Other Option
        </Button>
      </div>
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
    </div>
  );
}

export default TextFieldsGrid;
