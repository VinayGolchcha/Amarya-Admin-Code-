import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";

export default function SettingsProject() {
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || "");
  const [isLoading, setLoading] = useState(true);

  const [formData, setFormData] = useState([]);

  const [categories, setCategories] = useState([]); // State to store categories
  const [editMode, setEditMode] = useState(null);
  const [newProjectIndex, setNewProjectIndex] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

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

  useEffect(() => {
    fetchProjects();
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const fetchProjects = () => {
    fetch(`${apiUrl}/project/fetch-all-projects`, {
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
        console.log(formData);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/category/fetch-all-categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      const data = await response.json();
      if (data.success) {
        const categoryOptions = data?.data?.map(({ _id, category }) => ({
          _id, // Keep _id separate
          value: category, // Use the label as the value displayed to the user
          label: category,
        }));
        setCategories(categoryOptions);
        console.log("category:", categoryOptions); // Log fetched categories
        return categoryOptions;
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddNew = () => {
    const newProject = {
      "Project Name": "",
      "Client Name": "",
      "Project Lead": "",
      "Project Manager": "",
      "Start Of The Project": null,
      "End Of The Project": null,
      "Project Status": "",
      Category: "",
      category_id: null,
    };

    setFormData([...formData, newProject]);
    setNewProjectIndex(formData.length);
  };

  const formatMonthYear = (dateString) => {
    return dayjs(dateString).format("MMM YY");
  };

  const handleSaveNewProject = async (index) => {
    const newProject = formData[index];
    const newProjectData = {
      project: newProject["Project Name"],
      client_name: newProject["Client Name"],
      project_manager: newProject["Project Manager"],
      project_lead: newProject["Project Lead"],
      project_status: newProject["Project Status"],
      start_month: newProject["Start Of The Project"]
        ? dayjs(newProject["Start Of The Project"]).format("MMM YY")
        : null,
      end_month: newProject["End Of The Project"]
        ? dayjs(newProject["End Of The Project"]).format("MMM YY")
        : null,
      category_id: newProject.category_id, // Use category_id
    };

    try {
      const response = await fetch(`${apiUrl}/project/admin/create-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(newProjectData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && data.errors.length > 0) {
          data.errors.forEach((error) => toast.error(error.msg));
        } else {
          toast.error("Failed to create project");
        }
        return;
      }

      console.log("Project created successfully:", data);
      setNewProjectIndex(null);
      setEditMode(null);
      fetchProjects();
      toast.success("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Error creating project");
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
          toast.success("Project deleted successfully!");
          fetchProjects();
        } else {
          console.error("Error deleting project:", data.error);
          if (data.errors && data.errors.length > 0) {
            data.errors.forEach((error) => toast.error(error.msg));
          } else {
            toast.error("Error deleting project");
          }
        }
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
        toast.error("Error deleting project");
      });
  };

  const handleSave = (index) => {
    const projectToUpdate = formData[index];
    const { project_id, category_id } = projectToUpdate;
    const id = project_id;

    const updatedProject = {
      project: projectToUpdate["Project Name"],
      client_name: projectToUpdate["Client Name"],
      project_manager: projectToUpdate["Project Manager"],
      project_lead: projectToUpdate["Project Lead"],
      project_status: projectToUpdate["Project Status"],
      start_month: projectToUpdate["Start Of The Project"]
        ? dayjs(projectToUpdate["Start Of The Project"]).format("MMM YY")
        : null,
      end_month: projectToUpdate["End Of The Project"]
        ? dayjs(projectToUpdate["End Of The Project"]).format("MMM YY")
        : null,
      category_id: projectToUpdate.category_id,
    };

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
          toast.success("Project updated successfully!");
          fetchProjects();
        } else {
          console.error("Error updating project:", data.error);
          if (data.errors && data.errors.length > 0) {
            data.errors.forEach((error) => toast.error(error.msg));
          } else {
            toast.error("Error updating project");
          }
        }
      })
      .catch((error) => {
        console.error("Error updating project:", error);
        toast.error("Error updating project");
      });
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
        const selectedCategory = categories.find(
          (category) => category.value === value
        );
        newDataItem["Category"] = value;
        newDataItem.category_id = selectedCategory?._id || null; // Set category_id
        break;
      default:
        break;
    }

    newFormData[index] = newDataItem;
    setFormData(newFormData);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Box>
        {formData?.map((data, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              margin: "10px 0px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
              }}
            >
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
              {editMode === index || newProjectIndex === index ? (
                <SaveIcon
                  color="action"
                  onClick={() => {
                    newProjectIndex === index
                      ? handleSaveNewProject(index)
                      : handleSave(index);
                  }}
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
                    {item === "Project Status" && (
                      <Select
                        value={data[item]}
                        onChange={(e) =>
                          handleInputChange(index, item, e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "2px",
                            borderColor: "#b3b3b3",
                            borderRadius: "10px",
                          },
                          margin: "10px 0px",
                        }}
                        disabled={
                          editMode !== index && newProjectIndex !== index
                        }
                      >
                        <MenuItem value={"completed"}>
                          Completed
                        </MenuItem>
                        <MenuItem value={"in progress"}>
                          In Progress
                        </MenuItem>
                      </Select>
                    )}
                    {item === "Category" ? (
                      <Select
                        value={data[item]}
                        onChange={(e) =>
                          handleInputChange(index, item, e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "2px",
                            borderColor: "#b3b3b3",
                            borderRadius: "10px",
                          },
                          margin: "10px 0px",
                        }}
                        disabled={
                          editMode !== index && newProjectIndex !== index
                        }
                      >
                        {categories?.map((category) => (
                          <MenuItem key={category._id} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      item !== "End Of The Project" &&
                      item !== "Start Of The Project" &&
                      item !== "Project Status" && (
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
                          disabled={
                            editMode !== index && newProjectIndex !== index
                          }
                        />
                      )
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
}
