import { Box } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SettingsProject() {
  const [formData, setFormData] = useState([
    {
      projectName: "",
      clienName: "",
      projectLead: "",
      projecManager: "",
      startofproject: "",
      endofproject: "",
      projectStatus: "",
      category: "",
    },
  ]);
  const labels = [
    "Project Name",
    "Client Name",
    "Project Lead",
    "Project Manager",
    "Start Of The Project",
    "End Of The Project",
    "Project Status",
    "Category",
  ];
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);

  const handleAddNew = () => {
    setFormData([
      ...formData,
      {
        projectName: "",
        clienName: "",
        projectLead: "",
        projecManager: "",
        startofproject: "",
        endofproject: "",
        projectStatus: "",
        category: "",
      },
    ]);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    if (deleteMode) {
      const newFormData = [...formData];
      newFormData.splice(selectedInputIndex, 1);
      setFormData(newFormData);
      setSelectedInputIndex(null);
      setDeleteMode(false);
    } else {
      setDeleteMode(true);
    }
  };

  const handleSave = () => {
    if (editMode) {
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
      {formData.map((data, index) => (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0px",
            }}
          >
            <RemoveIcon
              color="action"
              onClick={handleDelete}
              sx={{
                borderRadius: "50px",
                backgroundColor: "rgb(222, 225, 231)",
                width: "30px",
                height: "30px",
                margin: "0px 2px",
                padding: "4px",
              }}
            />
          </Box>
          <Grid container spacing={4}>
            {labels.map((item, i) => (
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel sx={{ color: "black", fontWeight: "600" }}>
                    {item}
                  </FormLabel>
                  {item === "Start Of The Project" && (
                    <>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={'"month" , "year"'}
                          views={["month", "year"]}
                          sx={{
                            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              borderWidth: "2px",
                              borderColor: "#b3b3b3",
                              borderRadius: "10px",
                            },
                            margin: "10px 0px",
                          }}
                          onChange={(e) =>
                            handleInputChange(index, item, e.target.value)
                          }
                          onClick={() => handleInputClick(index)}
                        />
                      </LocalizationProvider>
                    </>
                  )}
                  {item === "End Of The Project" && (
                    <>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={'"month", "year"'}
                          views={["month", "year"]}
                          sx={{
                            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              borderWidth: "2px",
                              borderColor: "#b3b3b3",
                              borderRadius: "10px",
                            },
                            margin: "10px 0px",
                          }}
                          onChange={(e) =>
                            handleInputChange(index, item, e.target.value)
                          }
                          onClick={() => handleInputClick(index)}
                        />
                      </LocalizationProvider>
                    </>
                  )}
                  {item !== "End Of The Project" &&
                    item !== "Start Of The Project" && (
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
                        value={data.item}
                        onChange={(e) =>
                          handleInputChange(index, item, e.target.value)
                        }
                        onClick={() => handleInputClick(index)}
                        // disabled={!editMode}
                      />
                    )}
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </>
      ))}
      <Box
        sx={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}
      >
        <AddOutlinedIcon
          color="action"
          onClick={handleAddNew}
          sx={{
            borderRadius: "50px",
            backgroundColor: "rgb(222, 225, 231)",
            width: "30px",
            height: "30px",
            margin: "0px 2px",
            padding: "4px",
          }}
        />
      </Box>
    </Box>
  );
}
