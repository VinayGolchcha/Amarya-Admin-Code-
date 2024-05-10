import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import dayjs from "dayjs";

export default function SettingsProject() {
  const [formData, setFormData] = useState([
    {
      "Project Name": "",
      "Client Name": "",
      "Project Lead": "",
      "Project Manager": "",
      "Start Of The Project": null,
      "End Of The Project": null,
      "Project Status": "",
      Categor: "",
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
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    // Fetch projects from API
    fetch(
      `${apiUrl}/project/fetch-all-projects`
    )
      .then((response) => response.json())
      .then((data) => {
        const adjustedData = data.data.map((item) => {
          const currentYear = new Date().getFullYear();
          const capitalizeFirstLetter = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          };
          const startMonth = item.start_month
            ? `${capitalizeFirstLetter(item.start_month)} ${currentYear}`
            : null;
          const endMonth = item.end_month
            ? `${capitalizeFirstLetter(item.end_month)} ${currentYear}`
            : null;

          console.log("Start month:", startMonth);
          // console.log("End month:", item.end_month);
          return {
            "Project Name": item.project,
            "Client Name": item.client_name,
            "Project Lead": item.project_lead,
            "Project Manager": item.project_lead,
            "Start Of The Project": startMonth,
            "End Of The Project": endMonth,
            "Project Status": item.project_status,
            Category: item.category,
          };
        });
        setFormData(adjustedData);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const handleAddNew = () => {
    setFormData([
      ...formData,
      {
        projectName: "",
        clienName: "",
        projectLead: "",
        projecManager: "",
        startOfProject: null,
        endOfProject: null,
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
    const newDataItem = { ...newFormData[index] };

    // Map the fieldName to the corresponding key in the data
    switch (fieldName) {
      case "Project Name":
        newDataItem.project = value;
        break;
      case "Client Name":
        newDataItem.client_name = value;
        break;
      case "Project Lead":
        newDataItem.project_lead = value;
        break;
      case "Project Manager":
        newDataItem.project_manager = value;
        break;
      case "Start Of The Project":
        newDataItem.start_month = value;
        break;
      case "End Of The Project":
        newDataItem.end_month = value;
        break;
      case "Project Status":
        newDataItem.project_status = value;
        break;
      case "Category":
        newDataItem.category = value;
        break;
      default:
        break;
    }

    newFormData[index] = newDataItem;
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
                          value={dayjs(data[item]) || ""} // Accessing the value using the label as the key
                          sx={{
                            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              borderWidth: "2px",
                              borderColor: "#b3b3b3",
                              borderRadius: "10px",
                            },
                            margin: "10px 0px",
                          }}
                          onChange={(date) =>
                            handleInputChange(index, item, date)
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
                          value={dayjs(data[item]) || ""} // Accessing the value using the label as the key
                          sx={{
                            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              borderWidth: "2px",
                              borderColor: "#b3b3b3",
                              borderRadius: "10px",
                            },
                            margin: "10px 0px",
                          }}
                          onChange={(date) =>
                            handleInputChange(index, item, date)
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
                        value={data[item]} // Set the value to the date from data
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
                        onChange={(date) =>
                          handleInputChange(index, item, date)
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
