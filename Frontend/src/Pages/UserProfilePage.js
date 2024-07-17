import { useState, useEffect, React, useContext } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  Grid,
  Container,
  TextField,
  Button,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/system";
import { AuthProvider, useAuth } from "../Components/AuthContext";
import ProjectDetails from "../Components/ProjectDetails";
import { toast } from "react-toastify";
import Loading from "../sharable/Loading";
import Avatar from "@mui/material/Avatar";

const UserProfilePage = () => {
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);

  // const [file,setFile] = useState("");

  //   const [formData, setFormData] = useState({
  //     firstName: "",
  //     lastName: "Jain",
  //     email: "abc@mail.com",
  //     bloodGroup: "O-",
  //     gender: "female",
  //     username: "Sanjana",
  //     contactNumber: "+91-9865321245",
  //     dob: new Date("1800-01-01").toISOString().substring(0, 10),
  //     address: "APR Conlony Jabalpur",
  //     city: "Jabalpur",
  //     state: "Madhya Pradesh",
  //     ecpna: "None",
  //     ecn: "0",
  //   });a
  const { user, setProfilePhoto } = useAuth();
  console.log(user);
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    state_name: "Madhya Pradesh",
    city_name: "",
    file: "",
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
  });
  const inputFields = [
    { type: "text", label: "First Name", field: "first_name" },
    { type: "text", label: "Last name", field: "last_name" },
    { type: "email", label: "Email", field: "email" },
    { type: "text", label: "Blood Group", field: "blood_group" },
    { type: "text", label: "Contact Number", field: "mobile_number" },
    { type: "date", label: "DOB", field: "dob" },
    { type: "text", label: "Address", field: "address" },
    { type: "text", label: "Gender", field: "gender" },
    { type: "text", label: "Username", field: "username" },
    {
      type: "text",
      label: "Emergency Contact Person Name/Address",
      field: "emergency_contact_person_info",
    },
    {
      type: "text",
      label: "Emergency Contact Number",
      field: "emergency_contact_number",
    },
  ];

  const cardsData = [
    {
      value: 17,
      info: "Projects done",
    },
    {
      value: "92%",
      info: "Performance",
    },
    {
      value: 5,
      info: "Teams",
    },
    {
      value: 243,
      info: "Client reports",
    },
  ];

  const [projectsData, setProjectsData] = useState({
    currentProject: {
      project_id: null,
      emp_id: "",
      tech: "",
      team_id: null,
      start_month: "",
      end_month: "",
      project_manager: "",
    },
    projects: [],
  });
  const projectDetailsFields = [
    { type: "text", label: "Project ID", field: "project_id" },
    // { type: "text", label: "Current Project", field: "current_project" },
    { type: "text", label: "Working Technology", field: "tech" },
    // { type: "text", label: "Team ID", field: "team_id" },
    { type: "text", label: "Start Month", field: "start_month" },
    { type: "text", label: "End Month", field: "end_month" },
    { type: "text", label: "Project Manager", field: "project_manager" },
  ];
  const projectTimelineFields = [
    { type: "text", label: "Started on", field: "start_month" },
    { type: "text", label: "Completed on", field: "end_month" },
    { type: "text", label: "Client", field: "client_name" },
    { type: "text", label: "Project", field: "project" },
    { type: "text", label: "Team", field: "team" },
  ];

  const [projectTimeline, setProjectTimeline] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
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

  const handleEditClick = (flag) => {
    if (flag === "UP") {
      setIsEditing(true);
    } else if (flag === "PD") {
      setIsEditing2(true);
    }
  };
  // const handleCreateProject = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${apiUrl}/project/create-user-project`,
  //       projectsData.currentProject
  //     );
  //     console.log("Project created successfully:", response.data);
  //     // Optionally, you can perform additional actions after project creation
  //   } catch (error) {
  //     console.error("Error creating project:", error.message);
  //   }
  //   setIsEditing(false);
  // };
  // const fetchUserProject = async () => {
  //   try {
  //     const empId = user.user_id; // Example employee ID
  //     const response = await axios.get(
  //       `https://amarya-admin-backend-code.onrender.com/api/v1/project/fetch-user-project/${empId}`,
  //       {
  //         headers: {
  //           "x-access-token": token,
  //         },
  //       }
  //     );
  //     // setProjectsData(response.data);
  //     const fetchedProject = response.data.data[0]; // Assuming only one project is fetched
  //     setProjectsData((prevState) => ({
  //       ...prevState,
  //       currentProject: {
  //         project_id: fetchedProject.project_id,
  //         emp_id: fetchedProject.emp_id,
  //         tech: fetchedProject.tech,
  //         team_id: fetchedProject.team_id,
  //         start_month: fetchedProject.start_month,
  //         end_month: fetchedProject.end_month,
  //         project_manager: fetchedProject.project_manager,
  //       },
  //     }));
  //     console.log(fetchedProject);
  //   } catch (error) {
  //     console.error("Error fetching user project:", error.message);
  //   }
  // };

  // const handleUpdateProject = async () => {
  //   if (isEditing2 === false) return;

  //   try {
  //     const empId = user.user_id; // Example employee ID
  //     const projectId = projectsData.currentProject.project_id;
  //     const response = await axios.put(
  //       `https://amarya-admin-backend-code.onrender.com/api/v1/project/update-user-project/${empId}/${projectId}`,
  //       projectsData.currentProject,
  //       {
  //         headers: {
  //           "x-access-token": token,
  //         },
  //       }
  //     );
  //     if (response.data.success) {
  //       console.log("Project updated successfully:", response.data);
  //       setIsEditing2(false);
  //     } else {
  //       console.error("Error updating project:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error updating project:", error.message);
  //   }
  // };

  const handleDoubleClick = (field) => {
    // document.getElementById("test").disabled = false;
    console.log("hello");
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleKeyPress = (e, field) => {
    if (e.key === "Enter") {
      setIsEditing((prev) => ({ ...prev, [field]: false }));
      // Call your save function here
      console.log("Saved data:", formData[field]);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  const fetchProjectTimeline = async () => {
    try {
      const empId = user.user_id; // Example employee ID
      const response = await axios.get(
        `https://amarya-admin-backend-code.onrender.com/api/v1/project/fetch-user-project-timeline/${empId}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setProjectsData((prevState) => ({
        ...prevState,
        projects: response.data.data,
      }));
      console.log(projectsData);
    } catch (error) {
      console.error("Error fetching project timeline:", error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const empId = user.user_id; // Example employee ID

      // console.log(empId);
      const response = await axios.post(
        `https://amarya-admin-backend-code.onrender.com/api/v1/user/get-user-profile/${empId}`,
        // Request body
        {},
        // Request configuration object
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      const userData = response.data.data[0][0]; // Extracting user data from the response
      setFormData({
        ...formData,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        state_name: "Madhya Pradesh",
        city_name: userData.city_name,
        file: userData.profile_picture,
        blood_group: userData.blood_group,
        mobile_number: userData.mobile_number,
        emergency_contact_number: userData.emergency_contact_number,
        emergency_contact_person_info: userData.emergency_contact_person_info,
        address: userData.address,
        dob: formatDateString(userData.dob.split("T")[0]),
        designation: userData.designation,
        designation_type: userData.designation_type,
        joining_date: formatDateString(userData.joining_date.split("T")[0]),
        experience: userData.experience,
        completed_projects: userData.completed_projects,
        teams: userData.teams,
        gender: userData.gender,
        public_id: userData.public_id === null ? "" : userData.public_id,
      });
      console.log(userData);
      setProfilePhoto(userData.profile_picture); // Set the profile photo in context
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      // toast.error("Error fetching user data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchProjectTimeline();
  }, []);

  function formatDate2(inputDate) {
    // Split the input date by the appropriate delimiter
    const parts = inputDate.split(/[\/\-]/);

    // Rearrange the parts to match the desired format (YYYY-MM-DD)
    const formattedDate = `${parts[2]}-${parts[0].padStart(
      2,
      "0"
    )}-${parts[1].padStart(2, "0")}`;
    console.log(formattedDate);
    return formattedDate;
  }
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("designation", formData.designation);
    // formDataToSend.append("joining_date", formatDate2(formData.joining_date));
    formDataToSend.append("username", formData.username);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("public_id", formData.public_id);
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("mobile_number", formData.mobile_number);
    formDataToSend.append(
      "emergency_contact_number",
      formData.emergency_contact_number
    );
    formDataToSend.append(
      "emergency_contact_person_info",
      formData.emergency_contact_person_info
    );

    if (formData.file) {
      formDataToSend.append("file", formData.file);
      setProfilePhoto(formData.profile_picture); // Set the profile photo in context
      console.log(formData.file);
    }

    try {
      const id = user?.user_id;

      const response = await axios.put(
        `https://amarya-admin-backend-code.onrender.com/api/v1/user/update-user-profile/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      );
      console.log(response.data);
      toast.success("User profile updated successfully.");
      fetchUserData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };

  cardsData.forEach((item) => {
    switch (item.info) {
      case "Projects done":
        item.value = formData.completed_projects;
        break;
      case "Client reports":
        item.value = formData.client_report;
        break;
      case "Performance":
        // If formData value is a string representing a percentage
        // then remove '%' and convert to a number
        item.value = parseInt(formData.performance) || 0;
        break;
      case "Teams":
        item.value = formData.teams;
        break;
      // Add more cases if needed for other info fields
      default:
        break;
    }
  });
  function formatDate(inputDate) {
    // Convert input string to Date object
    var dateParts = inputDate.split("/");
    var date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);

    // Extract month and year
    var month = date.toLocaleString("default", { month: "short" });
    var year = date.getFullYear();

    // Format as "Month Year"
    var formattedDate = month + " " + year;

    return formattedDate;
  }

  var inputDate = "08/11/2021";
  var formattedDate = formatDate(inputDate);
  console.log(formattedDate); // Output: "Aug 2021"

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "2% 2.3%",
            "@media (max-width:960px)": {
              flexDirection: "column", // Change direction to column on smaller screens
            },
          }}
        >
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
              User profile
              <IconButton onClick={() => handleEditClick("UP")}>
                <EditIcon />
              </IconButton>
            </Typography>

            <Container maxWidth="lg" sx={{ padding: "0 !important" }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  {inputFields?.map((item, index) => (
                    <Grid item xs={12} md={index === 6 ? 12 : 6} key={index}>
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
                        value={
                          item.field === "dob"
                            ? formatDateForInput(formData[item.field])
                            : formData[item.field]
                        }
                        onChange={handleChange}
                        disabled={item.field === "dob" ? true : !isEditing}
                        sx={{
                          [theme.breakpoints.up("md")]: {
                            width: index === 6 ? "90%" : "80%",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "2px",
                            borderColor: "#b3b3b3",
                            borderRadius: "10px",
                          },
                        }}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: "600", overflow: "hidden" }}
                    >
                      Profile Picture
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="file"
                      name="file"
                      onChange={handleChange}
                      disabled={!isEditing}
                      sx={{
                        [theme.breakpoints.up("md")]: {
                          width: "80%",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "2px",
                          borderColor: "#b3b3b3",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                {isEditing && (
                  <Button
                    onClick={handleUserUpdate}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "1rem" }}
                  >
                    Save Changes
                  </Button>
                )}
              </form>
            </Container>
          </Box>
          <Box
            sx={{
              flexGrow: "1",
              [theme.breakpoints.up("lg")]: {
                maxWidth: "40%",
              },
              [theme.breakpoints.down("md")]: {
                marginTop: "2rem",
              },
            }}
          >
            <Container
              maxWidth="md"
              sx={{
                backgroundColor: "#777492",
                borderRadius: "20px",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginTop: "2%",
                  padding: "2%",
                  height: "100%",
                }}
              >
                <Card
                  elevation={3}
                  sx={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "2%",
                    borderRadius: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardContent>
                      <div style={{ fontWeight: "900" }}>
                        <Typography variant="button" color="#79838b">
                          {formData.designation}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption" color="#b8c5d0">
                          Type
                        </Typography>
                      </div>
                      <div>
                        <Typography color="#79838b">
                          {formData.designation_type}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption" color="#b8c5d0">
                          Joined
                        </Typography>
                      </div>
                      <div>
                        <Typography color="#79838b">
                          {formatDate(formData.joining_date)}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption" color="#b8c5d0">
                          Experience
                        </Typography>
                      </div>
                      <div>
                        <Typography color="#79838b">
                          {formData.experience} years
                        </Typography>
                      </div>
                    </CardContent>
                    {formData.file ? (
                      <CardMedia
                        component="img"
                        src={formData.file}
                        alt="Profile"
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          marginRight: "1rem",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                        sx={{ marginRight: -1 }}
                      >
                        <Avatar alt={user?.username} src={formData.file} />
                      </IconButton>
                    )}
                  </Box>
                </Card>
                <box>
                  <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
                    <Chip
                      label="Work"
                      sx={{
                        backgroundColor: "#4bc9fe",
                        color: "white",
                        fontWeight: "700",
                        marginBottom: "0",
                      }}
                    />
                  </Box>
                  <Grid container spacing={2} sx={{ display: "flex" }}>
                    {cardsData?.map((item) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        key={item.info}
                        sx={{ display: "flex" }}
                      >
                        <Card
                          elevation={2}
                          sx={{
                            borderRadius: "20px",
                            flex: 1,
                            flexDirection: "column",
                            textAlign: "center",
                          }}
                        >
                          <CardContent>
                            <Typography
                              sx={{
                                fontSize: "3vw",
                              }}
                              gutterBottom
                              color="#6e7880"
                            >
                              {!item.value ? 0 : item.value}
                            </Typography>
                            <Typography variant="subtitle1" color="#9fadb8">
                              {item.info}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </box>
              </Box>
            </Container>
          </Box>
        </Box>
        {user?.role === "user" && (
          <Box
            sx={{ display: "flex", flexDirection: "column", margin: "2% 2.3%" }}
          >
            <ProjectDetails />
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
                Project Timeline
              </Typography>
              <Container sx={{ padding: "0 !important", marginTop: "10px" }}>
                <form onSubmit={handleSubmit}>
                  {projectsData?.projects?.map((project, index) => (
                    <Grid container spacing={1} key={project.id}>
                      {projectTimelineFields.map((item, index) => (
                        <Grid
                          item
                          xs={12}
                          md={index === 0 || index === 1 ? "1.5" : "3"}
                          key={index}
                        >
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{ fontWeight: "600", overflow: "hidden" }}
                          >
                            {item.label}
                          </Typography>
                          <TextField
                            fullWidth
                            id="text"
                            variant="outlined"
                            type={item.type}
                            name={item.field}
                            value={
                              item.field === "startedOn" ||
                              item.field === "completedOn"
                                ? project[item.field].toLocaleString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })
                                : project[item.field]
                            }
                            onChange={handleChange}
                            onDoubleClick={handleDoubleClick}
                            onBlur={() => handleBlur(item.field)}
                            onKeyPress={(e) => handleKeyPress(e, item.field)}
                            disabled
                            sx={{
                              [theme.breakpoints.up("md")]: {
                                width: "80%",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderWidth: "2px",
                                borderColor: "#b3b3b3",
                                borderRadius: "10px",
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </form>
              </Container>
            </Box>
          </Box>
        )}
      </Box>
    );
  }
};

export default UserProfilePage;
