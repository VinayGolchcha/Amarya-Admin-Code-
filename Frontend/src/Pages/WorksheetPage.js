import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  FormControlLabel,
  FormGroup,
  TableRow,
  Button,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, set } from "date-fns";
import { useAuth } from "../Components/AuthContext";
import Loading from "../sharable/Loading";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import axios from "axios";

const WorksheetPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const { user , encryptionKey} = useAuth();
  const token = encodeURIComponent(user?.token || ""); // Ensure the token is encoded properly
  
  const editWorksheetData = async () => {
    if (
      !editedRow.team ||
      !editedRow.category ||
      !editedRow.project ||
      !editedRow.skillset.length||
      !editedRow.hours
    ) {
      console.log("error in data called")
      toast.error("Please fill all the required fields.");
      return;
    }
    try{
      const selectedTeam = teams.find((team) => team.label === editedRow.team);
      const teamId = selectedTeam ? selectedTeam._id : null;
      const selectedCategory = categories.find(
        (category) => category.label === editedRow.category
      );
      const categoryId = selectedCategory ? selectedCategory._id : null;

      const skillSetIds = editedRow.skillset
        ? editedRow.skillset.map((skill) => skill._id).join(", ")
        : null;

      const selectedProject = projects.find(
        (project) => project.label === editedRow.project
      );

      const projectId = selectedProject ? selectedProject.project_id : null;


      // Prepare the data object
      const postData = {
        emp_id: user?.user_id,
        team_id: teamId,
        category_id: categoryId,
        skill_set_id: skillSetIds,
        project_id: projectId,
        description: editedRow.description,
        date: editedRow.date,
        hours: parseInt(editedRow.hours)
      };

      setIsLoading(true);
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/worksheet/update-worksheet/${editedRow.id}/${user?.user_id}` ,postData , {
        headers : {
          "x-encryption-key" : encryptionKey
        }
      });
    }catch(err){
      console.log(err);
    }finally{
      setEditedRow(null);
      const newRows = rows.map((row) => {
          return {...row, isEdit: false};
      });  
      setRows(newRows);
      fetchWorksheetDataForEmployee(user.user_id);
      setIsEdited(false);
    }
  }

  const renderTableCells = (rowData) => {
    const cellData = [
      { key: "empid", label: "Emp Id." },
      { key: "team", label: "Team" },
      { key: "date", label: "Date" },
      { key: "category", label: "Category" },
      { key: "project", label: "Project" },
      { key: "hours", label: "hours" },
      { key: "description", label: "Description" },
      { key: "skillset", label: "Skillset" },
    ];
    if(rowData.isEdit === true){
      return(        
      <>
      <TableCell>
        <TextField
          variant="standard"
          value={user.user_id}
          onChange={(e) =>
            handleEditRowChange("empid", e.target.value)
          }
          sx={{ width: "80px", marginTop: "15px" }}
          inputProps={{
            readOnly: true
          }}
        />
      </TableCell>
      <TableCell>
        <FormControl>
          <InputLabel htmlFor="team-select">Team</InputLabel>
          <Select
            value={editedRow?.team}
            onChange={(e) =>
              handleEditRowChange("team", e.target.value)
            }
            label="team-select"
            sx={{ width: "100px" }}
            variant="standard"
          >
            {teams?.map((team) => (
              <MenuItem key={team.value} value={team.value}>
                {team.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          type="date"
          value={editedRow?.date}
          onChange={(e) =>
            handleEditRowChange("date", e.target.value)
          }
          sx={{ width: "120px", marginTop: "15px" }}
          inputProps={{
            min: lastSeventhDate // Setting the minDate to 01/09/2023
          }}
        />
      </TableCell>
      <TableCell>
        <FormControl>
          <InputLabel htmlFor="category-select">
            Category
          </InputLabel>
          <Select
            id="category"
            value={editedRow?.category}
            onChange={(e) =>
              handleEditRowChange("category", e.target.value)
            }
            label="category-select"
            variant="standard"
            sx={{ width: "120px" }}
          >
            {categories?.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <FormControl>
          <InputLabel htmlFor="project-select">Project</InputLabel>
          <Select
            value={editedRow?.project}
            id="project"
            onChange={(e) =>
              handleEditRowChange("project", e.target.value)
            }
            label="project-select"
            sx={{ width: "100px" }}
            variant="standard"
          >
            {projects?.map((project) => (
              <MenuItem key={project.value} value={project.value}>
                {project.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          variant="standard"
          value={editedRow?.hours}
          onChange={(e) =>
            handleEditRowChange("hours", e.target.value)
          }
          sx={{ marginTop: "15px" }}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={editedRow?.description}
          onChange={(e) =>
            handleEditRowChange("description", e.target.value)
          }
          sx={{ marginTop: "15px" }}
        />
      </TableCell>
      <TableCell>
        <FormControl>
          <InputLabel htmlFor="skillset-select">
            Skillset
          </InputLabel>
          <Select
            multiple
            id="skillset"
            value={editedRow?.skillset}
            onChange={(e) => handleEditSkillsetChange(e.target.value)}
            label="skillset-select"
            sx={{ width: "100px" }}
            variant="standard"
          >
            {skillsets?.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      </>)
    }else{
      return cellData?.map((cell, index) => (
        <TableCell key={index}>
          <Typography
            sx={{
              color: "#4C4C4C",
              font: {
                lg: "normal normal 600 16px/20px Poppins",
                md: "normal normal 600 16px/20px Poppins",
                sm: "normal normal 600 16px/20px Poppins",
                xs: "normal normal 600 10px/16px Poppins",
              },
            }}
          >
            {
              cell.key === "skillset" && Array.isArray(rowData[cell.key])
                ? rowData[cell.key].map((skill) => skill.label).join(", ")
                : rowData[cell.key]?.label || rowData[cell.key] // Display label if available, otherwise display the value directly
            }
          </Typography>
        </TableCell>
      ));
    }

  };
  const [projects, setProjects] = useState([]);

  const [categories, setCategories] = useState([]);

  const [skillsets, setSkillsets] = useState([]);

  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // const rowsPerPage = 5;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [lastSeventhDate , setLastSeventhDate] = useState(null);

  const [newRow, setNewRow] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [selectedId , setSelectedId] = useState(null);
  const [isEdited , setIsEdited] = useState(false);
  const [editedRow , setEditedRow] = useState([]);
  const [isReadyData , setIsReadyData] = useState(false);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleEditChange = useCallback((toBeEditedRow) => {
    setIsEdited(true);
    
    const newRows = rows.map((row) => {
      if(row.id === toBeEditedRow.id){
        return {...row, isEdit: !row.isEdit};
      } else {
        return row;
      }
    });
  
    setRows(newRows);
    const skillsetValues = toBeEditedRow.skillset.split(',').map(skill => skill.trim());

    // Filter skillsets based on whether their value matches any value in skillsetValues array
    const comingSkillList = skillsets.filter(skill => skillsetValues.includes(skill.value));

    if (comingSkillList && comingSkillList.length > 0) {
      const flattenedSkills = comingSkillList.flat();
      setEditedRow({
        id: toBeEditedRow.id,
        empid: user?.user_id,
        team: toBeEditedRow.team,
        date: toBeEditedRow.date,
        category: toBeEditedRow.category,
        project: toBeEditedRow.project,
        hours: toBeEditedRow.hours || 0,
        description: toBeEditedRow.description,
        skillset: comingSkillList,
      });
    } else {
      console.log("comingSkillList is not initialized or empty");
    }
  }, [rows]);
  const handleTextFieldChange = (field) => {

    setTextValue(field);
  };

  const addOptionToDropdown = () => {
    // const daySelect = document.getElementById("project");


    if (selectedOption === "Project") {
      setProjects((prevArray) => [
        ...prevArray,
        { value: textValue, label: textValue },
      ]);
    } else if (selectedOption === "Category") {
      setCategories((prevArray) => [
        ...prevArray,
        { value: textValue, label: textValue },
      ]);
    } else if (selectedOption === "Skillset") {
      setSkillsets((prevArray) => [...prevArray, textValue]);
    }

    toast.success("Property saved successfully!", {
      position: "top-right",
      autoClose: 3000, // Close the toast automatically after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // setTextValue("");
  };
  const handleAddRow = () => {
    if (newRow !== null) {
      return;
    }

    const randomId = Math.floor(Math.random() * 1000);
    // Get today's date
    const today = format(new Date(), "yyyy-MM-dd");

    setNewRow({
      empid: user?.user_id,
      team: "",
      date: today,
      category: "",
      project: "",
      hours : "",
      description: "",
      skillset: [],
    });
  };



  const handleSaveRow = async () => {
    if (
      !newRow.team ||
      !newRow.category ||
      !newRow.project ||
      !newRow.skillset.length||
      !newRow.hours
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }

    try {
      // setRows((prevRows) => [...prevRows, { ...newRow, checkbox: false }]);
      setNewRow(null);

      const selectedTeam = teams.find((team) => team.label === newRow.team);
      const teamId = selectedTeam ? selectedTeam._id : null;
      const selectedCategory = categories.find(
        (category) => category.label === newRow.category
      );
      const categoryId = selectedCategory ? selectedCategory._id : null;

      const skillSetIds = newRow.skillset
        ? newRow.skillset.map((skill) => skill._id).join(", ")
        : null;

      const selectedProject = projects.find(
        (project) => project.label === newRow.project
      );

      const projectId = selectedProject ? selectedProject.project_id : null;


      // Prepare the data object
      const postData = {
        emp_id: user?.user_id,
        team_id: teamId,
        category_id: categoryId,
        skill_set_id: skillSetIds,
        project_id: projectId,
        description: newRow.description,
        date: newRow.date,
        hours: parseInt(newRow.hours)
      };

      // Send the data to the API endpoint
      const response = await fetch(`${apiUrl}/worksheet/create-worksheet`, {
        method: "POST",
        credentials: 'include', // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
          "x-encryption-key" : encryptionKey // Add your custom headers here
        },
        body: JSON.stringify(postData),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success("Data submitted successfully!");
        fetchWorksheetDataForEmployee(user.user_id);

      } else {
        fetchWorksheetDataForEmployee();
        toast.error("Failed to submit data: " + responseData.message);
      }
    } catch (error) {
      fetchWorksheetDataForEmployee();
      console.error("Error saving row and submitting data:", error);
      toast.error("An error occurred while saving row and submitting data.");
    }
  };

  const handleNewRowChange = (field, value) => {
    setNewRow((prevNewRow) => ({ ...prevNewRow, [field]: value }));
  };

const handleEditRowChange = (field, value) => {
  setEditedRow((prevNewRow) => ({ ...prevNewRow, [field]: value }));
};

  const handleSkillsetChange = (selectedSkills) => {
    handleNewRowChange("skillset", selectedSkills);
  };

  const handleEditSkillsetChange = (selectedSkills) => {
    handleEditRowChange("skillset", selectedSkills);
  };


  const apiUrl = process.env.REACT_APP_API_URL;

  const tableHeaders = [
    "Emp Id.",
    "Team",
    "Date",
    "Category",
    "Project",
    "Hours",
    "Description",
    "Skillset",
    "Action",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teams, categories, skills, and projects concurrently
        setIsLoading(true);
        const [teamsData, categoriesData, skillsData, projectsData] =
          await Promise.all([
            fetchTeams(),
            fetchCategories(),
            fetchSkills(),
            fetchProjects(),
          ]);

        // Set fetched data to state
        setTeams(teamsData);
        setCategories(categoriesData);
        setSkillsets(skillsData);
        setProjects(projectsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    // Check if all data is fetched successfully
    if (
      teams?.length > 0 &&
      categories?.length > 0 &&
      skillsets?.length > 0 &&
      projects?.length > 0
    ) {
      setIsReadyData(true);
    } else {
      console.error("Failed to fetch all required data.");
    }
  }, [teams , projects , categories , skillsets]); // Dependency on teams, categories, skills, and projects

  useEffect(() => {
    if(isReadyData){
      const empId = user?.user_id; // Replace this with the actual emp_id
      setIsLoading(true);
      fetchWorksheetDataForEmployee(empId);
    }
  },[isReadyData])

  useEffect(() => {
    const preSeventhDate = () => {
      const date = new Date();
      date.setDate(date.getDate() - 6);
      const newDate = date.toISOString().split('T')[0]
      setLastSeventhDate(newDate);
    }
    preSeventhDate();
  },[]);


  const fetchWorksheetDataForEmployee = async (empId) => {
    try {
      // Fetch worksheet data for the specified employee
      setIsLoading(true);
      const response = await fetch(
        `${apiUrl}/worksheet/fetch-user-worksheet/${empId}`,
        {
          method: "GET",
          credentials: 'include', // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
            "x-encryption-key" : encryptionKey // Add your custom headers here
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data.success) {
        setIsLoading(false);
        // Worksheet data fetched successfully
        const worksheetData = data?.data.map((rowData) => ({
          empid: rowData.emp_id, // Use emp_id from fetched data
          team: getTeamNameById(rowData.team_id), // Get team name by id
          date: formatDate(rowData.date), // Use date as date
          category: getCategoryNameById(rowData.category_id), // Get category name by id
          project: getProjectNameById(rowData.project_id), // Get project name by id (if available)
          description: rowData.description,
          skillset: getSkillsetNameByIds(rowData.skill_set_id), // Get skillset names by ids
          hours : rowData.hours,
          id : rowData._id,
          isEdit : false
        }));
        // Set the fetched data to your state variable (e.g., setRows)
        setRows(worksheetData);
      } else {
        setIsLoading(false);
        console.error("Failed to fetch worksheet data:", data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching worksheet data:", error);
    }
  };
  // Usage example:
  // Function to get team name by id
  const handleEditClick = () => {};
  const getTeamNameById = (teamId) => {
    const team = teams.find((team) => team._id === teamId);
    return team?.label;
  };

  // Function to get category name by id
  const getCategoryNameById = (categoryId) => {
    const category = categories.find((category) => category._id === categoryId);
    return category?.label;
  };

  // Function to get project name by id (if available)
  const getProjectNameById = (projectId) => {
    const project = projects.find(
      (project) => project.project_id === projectId
    );
    return project ? project.label : "Unknown";
  };

  // Function to get skillset names by ids
  const getSkillsetNameByIds = (skillsetIds) => {
    const skillsetNames = skillsets
      .filter((skill) => skillsetIds.includes(skill._id))
      .map((skill) => skill.label);
    return skillsetNames.length > 0 ? skillsetNames.join(", ") : "Unknown";
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiUrl}/project/fetch-all-projects`, {
        method: "GET",
        credentials: 'include', // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
          "x-encryption-key" : encryptionKey // Add your custom headers here
        },
      });
      const data = await response.json();
      if (data.success) {
        const projectOptions = data?.data?.map(({ project_id, project }) => ({
          project_id, // Keep _id separate
          value: project, // Use the label as the value displayed to the user
          label: project,
        }));
        setProjects(projectOptions);
        
        return projectOptions;
      } else {
        console.error("Failed to fetch projects:", data.message);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${apiUrl}/team/fetch-all-teams`, {
        method: "GET",
        credentials: 'include', // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
          "x-encryption-key" : encryptionKey // Add your custom headers here
        },
      });
      const data = await response.json();
      if (data.success) {
        const teamOptions = data?.data?.map(({ _id, team }) => ({
          _id, // Keep _id separate
          value: team, // Use the label as the value displayed to the user
          label: team,
        }));
        setTeams(teamOptions);
     
        return teamOptions;
      } else {
        console.error("Failed to fetch teams:", data.message);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/category/fetch-all-categories`, {
        method: "GET",
        credentials: 'include', // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
          "x-encryption-key" : encryptionKey // Add your custom headers here
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
        
        return categoryOptions;
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchSkills = async () => {
    try {
      const response = await fetch(`${apiUrl}/skillset/fetch-skills`, {
        method: "GET",
        credentials: 'include', // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
          "x-encryption-key" : encryptionKey // Add your custom headers here
        },
      });
      const data = await response.json();
      if (data.success) {
        const skillOptions = data?.data?.map(({ _id, skill }) => ({
          _id, // Keep _id separate
          value: skill, // Use the label as the value displayed to the user
          label: skill,
        }));
        setSkillsets(skillOptions);
        return skillOptions;
      } else {
        console.error("Failed to fetch skills:", data.message);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };
  
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Box style={{ margin: "20px 20px 20px 20px" }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: "25px",
            font: {
              lg: "normal normal 300 22px/35px Poppins",
              md: "normal normal 300 22px/35px Poppins",
              sm: "normal normal 300 20px/30px Poppins",
              xs: "normal normal 300 22px/30px Poppins",
            },
          }}
        >
          Worksheet Dashboard
        </Typography>
        <Typography
          variant="h4"
          sx={{
            margin: "5px",
            font: {
              lg: "normal normal 400 18px/25px Racing Sans One",
              md: "normal normal 400 16px/25px Racing Sans One",
              sm: "normal normal 400 16px/25px Racing Sans One",
              xs: "normal normal 400 10px/16px Racing Sans One",
            },
            color: "#161E54",
          }}
        >
          {user?.user_id} - {user?.user_name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "left",
            background: "var(--Just-White, #FFF)",
            borderRadius: "12px",
            border: "1px solid #BCBCBC",
            padding: "0px",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ background: "#161E54" }}>
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                    alt="Check"
                  />
                </TableCell>
                {tableHeaders?.map((header, index) => (
                  <TableCell
                    key={index}
                    align="left"
                    sx={{
                      background: "#161E54",
                      color: "#FFFFFF",
                      font: {
                        lg: "normal normal 500 14px/20px Poppins",
                        md: "normal normal 500 14px/20px Poppins",
                        sm: "normal normal 500 14px/20px Poppins",
                        xs: "normal normal 500 14px/20px Poppins",
                      },
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{}}>
              {rows
                ?.slice(
                  currentPage * rowsPerPage,
                  (currentPage + 1) * rowsPerPage
                )
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ filter: "invert(1)", alignItems: "center" }}
                    >
                      <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                        alt="Check"
                      />
                    </TableCell>
                    {renderTableCells(row)}
                    <TableCell sx={{minWidth : isEdited && "104px" , textAlign: "center"}}>
                      {/* <IconButton onClick={() => handleEditClick()}>
                        <EditIcon />
                      </IconButton> */}
                      {isEdited && <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/Images/Save_duotone.png`}
                        alt="Check"
                        onClick={editWorksheetData }
                        sx={{ cursor: "pointer" }}
                        
                      />}
                    {!isEdited && <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/worksheet/edit.png`}
                      alt="Check"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleEditChange(row)}
                    />}
                    
                    </TableCell>
                  </TableRow>
                ))}

              {newRow && (
                <TableRow>
                  <TableCell
                    style={{ filter: "invert(1)", alignItems: "center" }}
                  >
                    <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                      alt="Check"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      value={newRow.empid}
                      onChange={(e) =>
                        handleNewRowChange("empid", e.target.value)
                      }
                      sx={{ width: "80px", marginTop: "15px" }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl>
                      <InputLabel htmlFor="team-select">Team</InputLabel>
                      <Select
                        value={newRow.team}
                        onChange={(e) =>
                          handleNewRowChange("team", e.target.value)
                        }
                        label="team-select"
                        sx={{ width: "100px" }}
                        variant="standard"
                      >
                        {teams?.map((team) => (
                          <MenuItem key={team.value} value={team.value}>
                            {team.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      type="date"
                      value={newRow.date}
                      onChange={(e) =>
                        handleNewRowChange("date", e.target.value)
                      }
                      sx={{ width: "120px", marginTop: "15px" }}
                      inputProps={{
                        min: lastSeventhDate // Setting the minDate to 01/09/2023
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl>
                      <InputLabel htmlFor="category-select">
                        Category
                      </InputLabel>
                      <Select
                        id="category"
                        value={newRow.category}
                        onChange={(e) =>
                          handleNewRowChange("category", e.target.value)
                        }
                        label="category-select"
                        variant="standard"
                        sx={{ width: "120px" }}
                      >
                        {categories?.map((category) => (
                          <MenuItem key={category.value} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl>
                      <InputLabel htmlFor="project-select">Project</InputLabel>
                      <Select
                        value={newRow.project}
                        id="project"
                        onChange={(e) =>
                          handleNewRowChange("project", e.target.value)
                        }
                        label="project-select"
                        sx={{ width: "100px" }}
                        variant="standard"
                      >
                        {projects?.map((project) => (
                          <MenuItem key={project.value} value={project.value}>
                            {project.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      variant="standard"
                      value={newRow.hours}
                      onChange={(e) =>
                        handleNewRowChange("hours", e.target.value)
                      }
                      sx={{ marginTop: "15px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      value={newRow.description}
                      onChange={(e) =>
                        handleNewRowChange("description", e.target.value)
                      }
                      sx={{ marginTop: "15px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl>
                      <InputLabel htmlFor="skillset-select">
                        Skillset
                      </InputLabel>
                      <Select
                        multiple
                        id="skillset"
                        value={newRow.skillset}
                        onChange={(e) => handleSkillsetChange(e.target.value)}
                        label="skillset-select"
                        sx={{ width: "100px" }}
                        variant="standard"
                      >
                        {skillsets?.map((skill) => (
                          <MenuItem key={skill} value={skill}>
                            {skill.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell sx={{textAlign : "center"}}>
                    <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/Save_duotone.png`}
                      alt="Check"
                      onClick={handleSaveRow}
                      sx={{ cursor: "pointer" }}
                    />
                   
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TableCell sx={{ textAlign: "center", cursor: "pointer" }}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/Images/Add_ring_duotone.png`}
              alt="Check"
              onClick={handleAddRow}
            />
            
          </TableCell>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
          />
        </Box>
        <ToastContainer /> {/* Add the ToastContainer here */}
      </Box>
    );
  }
};

export default WorksheetPage;
