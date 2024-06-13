import { useState, React, useEffect } from "react";
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
} from "@mui/material";
import { useTheme } from "@mui/system";
import axios from "axios";
import { username } from "react-lorem-ipsum";

const UserProfilePage = () => {
  const theme = useTheme();

  const isFormActive = false;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "Jain",
    email: "abc@mail.com",
    blood_group: "O-",
    gender: "female",
    username: "Sanjana",
    contact_number: "+91-9865321245",
    dob: new Date("1800-01-01").toISOString().substring(0, 10),
    address: "APR Conlony Jabalpur",
    city: "Jabalpur",
    state: "Madhya Pradesh",
    emergency_contact_person_info: "None",
    emergency_contact_number: "0",
  });

  const inputFields = [
    { type: "text", label: "First Name", field: "first_name" },
    { type: "text", label: "Last name", field: "last_name" },
    { type: "email", label: "Email", field: "email" },
    { type: "text", label: "Blood Group", field: "blood_group" },
    { type: "text", label: "Contact Number", field: "contact_number" },
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

  const [projectData, setProjectData] = useState({
    project_id: 1113,
    emp_id: "AMEMP003",
    team_id: 1113,
    tech: "vue.js",
    project_manager: "shubham",
    start_month: "20-01-2024",
    end_month: "20-08-2024",
    status: "in review",
  });

    const handleSaveProject = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/project/create-user-project`, projectData);
            console.log("API response:", response);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
        fetchUserProject();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/user/get-user-profile`, {
                emp_id: "AMEMP002"
            });
            console.log(response.data.data[0][0]); 
            setFormData(response.data.data[0][0]);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };
          

    const fetchUserProject = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URI}/project/fetch-user-project/${projectData.emp_id}`); 
            console.log(response.data); 
            setProjectData(response.data); 
        } catch (error) {
            console.error("Error fetching user project:", error);
        }
    };
    
           


    
   

    const cardsData = [
        {
            value: 17,
            info: 'Projects done'
        },
        {
            value: '92%',
            info: 'Performance'
        },
        {
            value: 5,
            info: 'Teams'
        },
        {
            value: 243,
            info: 'Client reports'
        }
    ]

  const projectsData = {
    currentProject: {
      currentProject: "Shephertz",
      projectManager: "Sumit Kumar",
      workingTechnologies: "Node Js, Express Js, Mongo DB",
      startMonth: "Mar 2023",
      endMonth: "Oct 2023",
    },
    projects: [
      {
        id: "1",
        startedOn: new Date("2023-11-01"),
        completedOn: new Date("2024-01-01"),
        client: "Internal",
        project: "Amarya Admin",
        team: "Full Stack",
      },
      {
        id: "2",
        startedOn: new Date("2023-01-01"),
        completedOn: new Date("2023-10-01"),
        client: "Shephertz",
        project: "Stockydodo",
        team: "Full Stack",
      },
      {
        id: "3",
        startedOn: new Date("2022-01-01"),
        completedOn: new Date("2022-11-01"),
        client: "BSW J Japan",
        project: "ODOO ERP",
        team: "Odoo ERP Team",
      },
    ],
  };
  const projectDetailsFields = [
    { type: "text", label: "Current Project", field: "currentProject" },
    { type: "text", label: "Project Manager", field: "projectManager" },
    {
      type: "text",
      label: "Working Technologies",
      field: "workingTechnologies",
    },
    { type: "text", label: "Start Month", field: "startMonth" },
    { type: "text", label: "End Month", field: "endMonth" },
  ];

  const projectTimelineFields = [
    { type: "text", label: "Started on", field: "startedOn" },
    { type: "text", label: "Completed on", field: "completedOn" },
    { type: "text", label: "Client", field: "client" },
    { type: "text", label: "Project", field: "project" },
    { type: "text", label: "Team", field: "team" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

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
          </Typography>
          <Container maxWidth="md" sx={{ padding: "0 !important" }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                {inputFields.map((item, index) => (
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
                      value={formData ? formData[item.field] : ""}
                      onChange={handleChange}
                      disabled={!isFormActive}
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
              </Grid>
              {isFormActive && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "20px" }}
                >
                  SAVE
                </Button>
              )}
            </form>
          </Container>
        </Box>
        <Box
          sx={{
            flexGrow: "1",
            [theme.breakpoints.up("lg")]: {
              maxWidth: "30%",
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
                        Node Js Developer (TL)
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption" color="#b8c5d0">
                        Type
                      </Typography>
                    </div>
                    <div>
                      <Typography color="#79838b">Senior Employee</Typography>
                    </div>
                    <div>
                      <Typography variant="caption" color="#b8c5d0">
                        Joined
                      </Typography>
                    </div>
                    <div>
                      <Typography color="#79838b">Sep 2018</Typography>
                    </div>
                    <div>
                      <Typography variant="caption" color="#b8c5d0">
                        Experience
                      </Typography>
                    </div>
                    <div>
                      <Typography color="#79838b">4 Years</Typography>
                    </div>
                  </CardContent>
                  <CardMedia
                    component="img"
                    height="200"
                    image="/Images/profile.jpg"
                    alt="green iguana"
                    sx={{
                      objectFit: "cover",
                      objectPosition: "center center",
                      borderRadius: "20px",
                      margin: "0.5rem",
                      maxWidth: "40%",
                    }}
                  />
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
                  {cardsData.map((item) => (
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
                            {item.value}
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
      <Box sx={{ display: "flex", flexDirection: "column", margin: "2% 2.3%" }}>
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
          </Typography>
          <Container sx={{ padding: "0 !important", marginTop: "10px" }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                {projectDetailsFields.map((item, index) => (
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
                      value={projectsData.currentProject[item.field]}
                      onChange={handleChange}
                      disabled={!isFormActive}
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
                <Button onClick={handleSaveProject} type="submit">
                  <img
                    src="/Images/icons8-save-100.png"
                    height="50%"
                    style={{ marginTop: "10px" }}
                  />
                </Button>
              </Grid>
              {isFormActive && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "20px" }}
                >
                  SAVE
                </Button>
              )}
            </form>
          </Container>
        </Box>
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
              {projectsData?.projects.map((project, index) => (
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
                        disabled={!isFormActive}
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
              {isFormActive && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "20px" }}
                >
                  SAVE
                </Button>
              )}
            </form>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfilePage;
