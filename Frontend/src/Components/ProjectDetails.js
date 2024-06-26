import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Container,
  FormControl,
  InputLabel,
  Select,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectDetails = () => {
  const { user } = useAuth();
  const [isEditing2, setIsEditing2] = useState(false);
  const [projectsData, setProjectsData] = useState({
    currentProject: {
      project_id: null,
      emp_id: "",
      tech: "",
      team_id: 1112,
      start_month: "",
      end_month: "",
      project_manager: "",
    },
    projects: [],
  });
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [newProject, setNewProject] = useState({
    project_id: "",
    emp_id: user?.user_id || "",
    tech: "",
    team_id: 1112,
    start_month: "",
    end_month: "",
    project_manager: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly

  const projectDetailsFields = [
    { type: "text", label: "Working Technology", field: "tech" },
    { type: "text", label: "Start Month", field: "start_month" },
    { type: "text", label: "End Month", field: "end_month" },
    { type: "text", label: "Project Manager", field: "project_manager" },
  ];
  const projectDetailsFields2 = [
    { type: "text", label: "Working Technology", field: "tech" },
    { type: "date", label: "Start Month", field: "start_month" },
    { type: "date", label: "End Month", field: "end_month" },
    { type: "text", label: "Project Manager", field: "project_manager" },
  ];
  const handleUpdateProject = async () => {
    if (isEditing2 === false) return;

    try {
      const empId = user.user_id; // Example employee ID
      const projectId = projectsData.currentProject.project_id;
      const updateData = {
        end_month: projectsData.currentProject.end_month,
        project_manager: projectsData.currentProject.project_manager,
        team_id: projectsData.currentProject.team_id,
      };

      const response = await axios.put(
        `${apiUrl}/project/update-user-project/${empId}/${projectId}`,
        updateData,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.data.success) {
        console.log("Project updated successfully:", response.data);
        setIsEditing2(false);
        toast.success(response.data.message);
        fetchUserProjects();
      } else {
        console.error(
          "Error updating project:",
          response.data.message ||
            response.data.errors
              .map((error) => `${error.path}: ${error.msg}`)
              .join(", ")
        );
        toast.error(
          response.data.message ||
            response.data.errors
              .map((error) => `${error.path}: ${error.msg}`)
              .join(", ")
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 errors specifically
        const errors = error.response.data.errors;
        const errorMessage = errors
          ? errors.map((err) => `${err.path}: ${err.msg}`).join(", ")
          : error.response.data.message;

        console.error("Error updating project:", errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setProjectsData((prevState) => ({
      ...prevState,
      currentProject: {
        ...prevState.currentProject,
        [name]: value,
      },
    }));
  };

  const handleEditClick = () => {
    setIsEditing2(!isEditing2);
  };

  const handleSaveClick2 = () => {
    setIsEditing2(false);
  };

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
          return {
            "Project Name": item.project,
            project_id: item.project_id,
          };
        });
        setAllProjects(adjustedData);
        console.log(adjustedData);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const fetchUserProjects = async () => {
    try {
      const empId = user?.user_id; // Example employee ID
      const response = await axios.get(
        `${apiUrl}/project/fetch-user-project/${empId}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      const fetchedProjects = response.data.data;
      console.log(fetchedProjects, "jkfs;f");
      if (fetchedProjects.length > 0) {
        setProjectsData((prevState) => ({
          ...prevState,
          projects: fetchedProjects,
        }));
        setSelectedProjectName(fetchedProjects[0].project_name);
        setProjectsData((prevState) => ({
          ...prevState,
          currentProject: fetchedProjects[0],
        }));
      }
    } catch (error) {
      console.error("Error fetching user projects:", error.message);
    }
  };

  useEffect(() => {
    fetchUserProjects();
    fetchProjects();
  }, []);

  const handleProjectChange = (e) => {
    const projectName = e.target.value;
    setSelectedProjectName(projectName);
    const selectedProject = projectsData.projects.find(
      (project) => project.project_name === selectedProjectName
    );
    setProjectsData((prevState) => ({
      ...prevState,
      currentProject: selectedProject,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;

    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateProject = async () => {
    try {
      const formattedProject = {
        ...newProject,
        start_month: formatDate(newProject.start_month),
        end_month: formatDate(newProject.end_month),
      };

      const response = await axios.post(
        `${apiUrl}/project/create-user-project`,
        formattedProject,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.data.success) {
        console.log("Project created successfully:", response.data);
        fetchUserProjects(); // Refresh the project list
        handleClose(); // Close the modal
        toast.success("Project created successfully:");
      } else {
        console.error("Error creating project:", response.data.message);
        if (response.data.errors && response.data.errors.length > 0) {
          const error = response.data.errors[0];
          toast.error(error.msg); // Display the specific error message
        } else {
          toast.error(
            response.data.message || "An error occurred. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error creating project:", error.message);
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404 && data.message) {
          toast.error(data.message); // Display the specific 404 error message
        } else if (data.errors) {
          const serverErrors = data.errors;
          if (serverErrors.length > 0) {
            const errorMsg = serverErrors.map((err) => err.msg).join(", ");
            toast.error(errorMsg); // Display server validation errors
          } else {
            toast.error("An error occurred. Please try again.");
          }
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  const formatDate = (date) => {
    const options = { year: "2-digit", month: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch", // Ensure equal height
        marginTop: "2%",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "700", color: "#121843" }}
        gutterBottom
      >
        Project Details
        <IconButton onClick={() => handleEditClick("PD")}>
          <EditIcon />
        </IconButton>
      </Typography>
      <Container sx={{ padding: "0 !important", marginTop: "10px" }}>
        <form>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px",
                  borderColor: "#b3b3b3",
                  borderRadius: "10px",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "600", overflow: "hidden" }}
              >
                Project
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Project</InputLabel>
                <Select
                  value={selectedProjectName || ""}
                  onChange={handleProjectChange}
                  label="Project ID"
                  disabled={!isEditing2}
                >
                  {projectsData?.projects?.map((project) => (
                    <MenuItem
                      key={project.project_id}
                      value={project.project_name}
                    >
                      {project.project_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {projectDetailsFields?.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "600", overflow: "hidden" }}
                >
                  {item.label}
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={item.type}
                  name={item.field}
                  value={projectsData?.currentProject[item.field]}
                  onChange={handleChange2}
                  disabled={!isEditing2}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "2px",
                      borderColor: "#b3b3b3",
                      borderRadius: "10px",
                    },
                  }}
                />
              </Grid>
            ))}
            <Button
              sx={{ display: "flex", flexDirection: "column" }}
              onClick={handleUpdateProject}
            >
              <img
                src="/Images/icons8-edit-64.png"
                height="50%"
                style={{ marginTop: "10px" }}
              />
              <Typography sx={{ color: "#B3B3B3", fontWeight: "600" }}>
                Edit
              </Typography>
            </Button>
            <Button sx={{ display: "flex", flexDirection: "column" }}>
              <img
                src="/Images/icons8-save-100.png"
                height="50%"
                style={{ marginTop: "10px" }}
                onClick={() => setIsEditing2(false)}
              />
              <Typography sx={{ color: "#B3B3B3", fontWeight: "600" }}>
                Save
              </Typography>
            </Button>

            <Button
              sx={{ display: "flex", flexDirection: "column" }}
              onClick={handleOpen}
            >
              <img
                src="/Images/icons8-add-96.png"
                height="50%"
                style={{ marginTop: "10px" }}
              />
              <Typography sx={{ color: "#B3B3B3", fontWeight: "600" }}>
                Add
              </Typography>
            </Button>
          </Grid>
        </form>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Add New Project
          </Typography>
          <form>
            {projectDetailsFields2?.map((item, index) => (
              <TextField
                key={index}
                fullWidth
                variant="outlined"
                margin="normal"
                type={item.type}
                name={item.field}
                label={item.label}
                value={newProject[item.field]}
                onChange={handleNewProjectChange}
                InputLabelProps={{
                  shrink:
                    item.field === "start_month" ||
                    item.field === "end_month" ||
                    newProject[item.field] !== "", // Add shrink prop
                }}
              />
            ))}
            <FormControl fullWidth margin="normal">
              <InputLabel>Project</InputLabel>
              <Select
                value={newProject.project_id}
                onChange={handleNewProjectChange}
                name="project_id"
              >
                {allProjects?.map((project) => (
                  <MenuItem key={project.project_id} value={project.project_id}>
                    {project["Project Name"]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateProject}
              sx={{ mt: 2 }}
            >
              Add Project
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProjectDetails;
