import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import dayjs from "dayjs";
import { useAuth } from "../Components/AuthContext";

export default function SettingsProject() {
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly

  const [formData, setFormData] = useState([
    {
      "Project Name": "",
      "Client Name": "",
      "Project Lead": "",
      "Project Manager": "",
      "Start Of The Project": null,
      "End Of The Project": null,
      "Project Status": "",
      Category: "",
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

  const [editMode, setEditMode] = useState(null); // Track which project is being edited
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch(`${apiUrl}/project/fetch-all-projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const adjustedData = data?.data?.map((item) => {
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

          return {
            "Project Name": item.project,
            "Client Name": item.client_name,
            "Project Lead": item.project_lead,
            "Project Manager": item.project_lead,
            "Start Of The Project": startMonth,
            "End Of The Project": endMonth,
            "Project Status": item.project_status,
            Category: item.category,
            category_id: item.category_id,
            project_id: item.project_id,
          };
        });
        setFormData(adjustedData);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  };
  const handleAddNew = async () => {
    const newProject = {
      "Project Name": "",
      "Client Name": "",
      "Project Lead": "",
      "Project Manager": "",
      "Start Of The Project": null,
      "End Of The Project": null,
      "Project Status": "",
      Category: "",
    };

    setFormData([...formData, newProject]);
    setEditMode(formData.length); // Set the newly added project to edit mode

    try {
      const response = await fetch(`${apiUrl}/project/admin/create-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const data = await response.json();
      console.log("Project created successfully:", data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleEdit = (index) => {
    setEditMode(index);
  };

  const handleDelete = (index) => {
    const projectToDelete = formData[index];
    const { project_id, category_id } = projectToDelete;
    const id = project_id;

    fetch(`${apiUrl}/project/admin/delete-project/${id}/${category_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const newFormData = [...formData];
          newFormData.splice(index, 1);
          setFormData(newFormData);
        } else {
          console.error("Error deleting project:", data.error);
        }
      })
      .catch((error) => console.error("Error deleting project:", error));
  };

  const handleSave = (index) => {
    const projectToUpdate = formData[index];
    const { project_id, category_id } = projectToUpdate;
    const id = project_id;
    console.log(projectToUpdate);
    const updatedProject = {
      project: projectToUpdate["Project Name"],
      client_name: projectToUpdate["Client Name"],
      project_manager: projectToUpdate["Project Manager"],
      project_lead: projectToUpdate["Project Lead"],
      project_status: projectToUpdate["Project Status"],
      start_month: projectToUpdate["Start Of The Project"]
        ? dayjs(projectToUpdate["Start Of The Project"]).format("MMMM")
        : null,
      end_month: projectToUpdate["End Of The Project"]
        ? dayjs(projectToUpdate["End Of The Project"]).format("MMMM")
        : null,
    };
    console.log(updatedProject);

    fetch(`${apiUrl}/project/admin/update-project/${id}/${category_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEditMode(null);
        } else {
          console.error("Error updating project:", data.error);
        }
      })
      .catch((error) => console.error("Error updating project:", error));
  };

  const handleInputChange = (index, fieldName, value) => {
    const newFormData = [...formData];
    const newDataItem = { ...newFormData[index] };

    switch (fieldName) {
      case "Project Name":
        newDataItem["Project Name"] = value;
        break;
      case "Client Name":
        newDataItem["Client Name"] = value;
        break;
      case "Project Lead":
        newDataItem["Project Lead"] = value;
        break;
      case "Project Manager":
        newDataItem["Project Manager"] = value;
        break;
      case "Start Of The Project":
        newDataItem["Start Of The Project"] = value;
        break;
      case "End Of The Project":
        newDataItem["End Of The Project"] = value;
        break;
      case "Project Status":
        newDataItem["Project Status"] = value;
        break;
      case "Category":
        newDataItem["Category"] = value;
        break;
      default:
        break;
    }

    newFormData[index] = newDataItem;
    setFormData(newFormData);
  };

  return (
    <Box sx={{ flexGrow: 1, m: "25px 0px 20px 25px" }}>
      {formData?.map((data, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0px 0px 0px",
          }}
        >
          <Box>
            <RemoveIcon
              color="action"
              onClick={() => handleDelete(index)}
              sx={{
                borderRadius: "50px",
                backgroundColor: "rgb(222, 225, 231)",
                width: "30px",
                height: "30px",
                margin: "0px 2px 50px 10px",
                padding: "4px",
                cursor: "pointer",
              }}
            />
            {editMode === index ? (
              <SaveIcon
                color="action"
                onClick={() => handleSave(index)}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "rgb(222, 225, 231)",
                  width: "30px",
                  height: "30px",
                  margin: "0px 2px 50px 10px",
                  padding: "4px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <EditIcon
                color="action"
                onClick={() => handleEdit(index)}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "rgb(222, 225, 231)",
                  width: "30px",
                  height: "30px",
                  margin: "0px 2px 50px 10px",
                  padding: "4px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
          <Grid container spacing={4}>
            {labels?.map((item, i) => (
              <Grid item xs={4} key={i}>
                <FormControl fullWidth>
                  <FormLabel sx={{ color: "black", fontWeight: "600" }}>
                    {item}
                  </FormLabel>
                  {item === "Start Of The Project" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={'"month", "year"'}
                        views={["month", "year"]}
                        value={dayjs(data[item]) || ""}
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
                      />
                    </LocalizationProvider>
                  )}
                  {item === "End Of The Project" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={'"month", "year"'}
                        views={["month", "year"]}
                        value={dayjs(data[item]) || ""}
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
                      />
                    </LocalizationProvider>
                  )}
                  {item !== "End Of The Project" &&
                    item !== "Start Of The Project" && (
                      <TextField
                        value={data[item]}
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
                        onChange={(e) =>
                          handleInputChange(index, item, e.target.value)
                        }
                        disabled={editMode !== index}
                      />
                    )}
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Box>
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
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
}
