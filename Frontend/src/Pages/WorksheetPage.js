import React, { useState } from "react";
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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const teams = [
  { value: "", label: "Select Team" },
  { value: "FS", label: "Fullstack" },
  { value: "SAP", label: "SAP" },
  { value: "DataScience", label: "Data Science" },
  { value: "HR", label: "HR" },
  { value: "Admin", label: "Admin" },
];
// const categories = [
//   { value: "", label: "Select Category" },
//   { value: "ClientProject", label: "Client Project" },
//   { value: "InternalProject", label: "Internal Project" },
// ];

// const projects = [
//   { value: "", label: "Select Project" },
//   { value: "Shephertz", label: "Shephertz" },
//   { value: "AdminDashboard", label: "Admin Dashboard" },
//   { value: "ClothesDistribution", label: "Clothes Distribution" },
//   { value: "ReactJsProject", label: "React Js Project" },
// ];
// const skillsets = ["NodeJS", "ReactJS", "Python", "ML", "Javascript"];

const WorksheetPage = () => {
  const renderTableCells = (rowData) => {
    const cellData = [
      { key: "empid", label: "Emp Id." },
      { key: "team", label: "Team" },
      { key: "date", label: "Date" },
      { key: "category", label: "Category" },
      { key: "project", label: "Project" },
      { key: "description", label: "Description" },
      { key: "skillset", label: "Skillset" },
    ];

    return cellData.map((cell, index) => (
      <TableCell key={index}>
        <Typography
          sx={{
            color: "#4C4C4C",
            font: {
              lg: "normal normal 600 16px/25px Poppins",
              md: "normal normal 600 16px/25px Poppins",
              sm: "normal normal 600 16px/25px Poppins",
              xs: "normal normal 600 10px/16px Poppins",
            },
          }}
        >
          {Array.isArray(rowData[cell.key])
            ? rowData[cell.key].join(", ")
            : rowData[cell.key]}
        </Typography>
      </TableCell>
    ));
  };
  const [projects, setProjects] = useState([
    { value: "", label: "Select Project" },
    { value: "Shephertz", label: "Shephertz" },
    { value: "AdminDashboard", label: "Admin Dashboard" },
    { value: "ClothesDistribution", label: "Clothes Distribution" },
    { value: "ReactJsProject", label: "React Js Project" },
  ]);

  const [categories, setCategories] = useState([
    { value: "", label: "Select Category" },
    { value: "ClientProject", label: "Client Project" },
    { value: "InternalProject", label: "Internal Project" },
  ]);

  const [skillsets, setSkillsets] = useState([
    "NodeJS",
    "ReactJS",
    "Python",
    "ML",
    "Javascript",
  ]);

  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const [newRow, setNewRow] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [textValue, setTextValue] = useState("");

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange = (field) => {
    console.log(field + "hey");
    setSelectedOption(field);
  };

  const handleTextFieldChange = (field) => {
    console.log(field + "hey");
    setTextValue(field);
  };

  const addOptionToDropdown = () => {
    // const daySelect = document.getElementById("project");
    console.log(selectedOption);

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
      empid: randomId,
      team: "",
      date: today,
      category: "",
      project: "",
      description: "",
      skillset: [],
    });
  };
  // const handleAddRow = () => {
  //   if (newRow !== null) {
  //     return;
  //   }
  //   const randomId = Math.floor(Math.random() * 1000);
  //   const today = format(new Date(), "yyyy-MM-dd");

  //   const newRowData = {
  //     empid: randomId,
  //     team: "",
  //     date: today,
  //     category: "",
  //     project: "",
  //     description: "",
  //     skillset: [],
  //   };

  //   setRows((prevRows) => [newRowData, ...prevRows]);
  //   setNewRow({ ...newRowData }); // Update newRow with a copy of newRowData
  //   setEditingRowIndex(0); // Set to 0 for the newly added row
  //   setCurrentPage(0);
  // };

  //   const handleEditRow = (index) => {
  //     setEditingRowIndex(index);
  //   };

  const handleSaveRow = () => {
    if (editingRowIndex !== null) {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[editingRowIndex] = {
          ...updatedRows[editingRowIndex],
          ...newRow,
          checkbox: false,
        };
        return updatedRows;
      });
      setEditingRowIndex(null);
      setNewRow(null);
    } else {
      setRows((prevRows) => [...prevRows, { ...newRow, checkbox: false }]);
      setNewRow(null);
    }
  };
  // const handleSaveRow = () => {
  //   if (editingRowIndex !== null) {
  //     // Existing row editing logic remains the same
  //     setRows((prevRows) => {
  //       const updatedRows = [...prevRows];
  //       updatedRows[editingRowIndex] = { ...updatedRows[editingRowIndex], ...newRow, checkbox: false };
  //       return updatedRows;
  //     });
  //     setEditingRowIndex(null);
  //     setNewRow(null);
  //     console.log("In");
  //   } else {
  //     // Check if a row with the same empid and date exists
  //     const existingRowIndex = rows.findIndex(
  //       (row) => row.empid === newRow.empid && row.date === newRow.date
  //     );

  //     if (existingRowIndex !== -1) {
  //       // If the row exists, merge the data into that row
  //       setRows((prevRows) => {
  //         const mergedRow = { ...prevRows[existingRowIndex], ...newRow, checkbox: false };
  //         const updatedRows = [...prevRows];
  //         updatedRows[existingRowIndex] = mergedRow;
  //         return updatedRows;
  //       });
  //     } else {
  //       // If the row does not exist, add a new row to the state
  //       setRows((prevRows) => [...prevRows, { ...newRow, checkbox: false }]);
  //     }

  //     setNewRow(null);
  //   }
  // };

  const handleNewRowChange = (field, value) => {
    setNewRow((prevNewRow) => ({ ...prevNewRow, [field]: value }));
  };

  const handleSkillsetChange = (selectedSkills) => {
    handleNewRowChange("skillset", selectedSkills);
  };

  const tableHeaders = [
    "Emp Id.",
    "Team",
    "Date",
    "Category",
    "Project",
    "Description",
    "Skillset",
    "",
  ];

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
          color: "#161E54"
        }}
      >
        AMEMP00012 - Sanjana Jain
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
              {tableHeaders.map((header, index) => (
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
              .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ filter: "invert(1)" }}>
                    <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                      alt="Check"
                    />
                  </TableCell>
                  {renderTableCells(row)}
                  <TableCell>
                    <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/Save_duotone.png`}
                      alt="Check"
                      // onClick={handleSaveRow}
                      // sx={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            {newRow && (
              <TableRow>
                <TableCell style={{ filter: "invert(1)" }}>
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
                    sx={{ width: "80px" }}
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
                      {teams.map((team) => (
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
                    onChange={(e) => handleNewRowChange("date", e.target.value)}
                    sx={{ width: "120px" }}
                  />
                </TableCell>
                <TableCell>
                  <FormControl>
                    <InputLabel htmlFor="category-select">Category</InputLabel>
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
                      {categories.map((category) => (
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
                      {projects.map((project) => (
                        <MenuItem key={project.value} value={project.value}>
                          {project.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={newRow.description}
                    onChange={(e) =>
                      handleNewRowChange("description", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <FormControl>
                    <InputLabel htmlFor="skillset-select">Skillset</InputLabel>
                    <Select
                      multiple
                      id="skillset"
                      value={newRow.skillset}
                      onChange={(e) => handleSkillsetChange(e.target.value)}
                      label="skillset-select"
                      sx={{ width: "100px" }}
                      variant="standard"
                    >
                      {skillsets.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell>
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
          onPageChange={handleChangePage}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{
          margin: "25px 0px 20px 10px",
          font: {
            lg: "normal normal 300 22px/35px Poppins",
            md: "normal normal 300 22px/35px Poppins",
            sm: "normal normal 300 20px/30px Poppins",
            xs: "normal normal 300 22px/30px Poppins",
          },
        }}
      >
        Add new Property
      </Typography>
      <Box sx={{ borderRadius: "12px", border: "1px solid #BCBCBC" }}>
        <Typography
          variant="h4"
          sx={{
            margin: "25px 0px 20px 10px",
            font: {
              lg: "normal normal 600 18/25px Poppins",
              md: "normal normal 600 18/25px Poppins",
              sm: "normal normal 600 18px/25px Poppins",
              xs: "normal normal 600 16px/25px Poppins",
            },
            color: "#4C4C4C",
          }}
        >
          Select One from below:
        </Typography>
        <FormGroup
          sx={{
            paddingLeft: "20px",
            color: "#4C4C4C",
            font: {
              lg: "normal normal 600 18/25px Poppins",
              md: "normal normal 600 18/25px Poppins",
              sm: "normal normal 600 18px/25px Poppins",
              xs: "normal normal 600 16px/25px Poppins",
            },
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === "Project"}
                onChange={() => handleCheckboxChange("Project")}
              />
            }
            label="Project"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === "Category"}
                onChange={() => handleCheckboxChange("Category")}
              />
            }
            label="Category"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === "Skillset"}
                onChange={() => handleCheckboxChange("Skillset")}
              />
            }
            label="Skill Set"
          />
        </FormGroup>
        <Typography
          variant="h4"
          sx={{
            margin: "25px 0px 20px 20px",
            font: {
              lg: "normal normal 600 18/25px Poppins",
              md: "normal normal 600 18/25px Poppins",
              sm: "normal normal 600 18px/25px Poppins",
              xs: "normal normal 600 16px/25px Poppins",
            },
            color: "#4C4C4C",
          }}
        >
          Fill your property below
        </Typography>
        <TextField
          id="filled-basic"
          variant="filled"
          sx={{ margin: "0px 20px 20px 20px" }}
          onChange={(e) => handleTextFieldChange(e.target.value)}
        />
        <br />
        <box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FF5151",
              color: "white",
              border: "4px",
              margin: "10px 0px 20px 40%",
            }}
            onClick={addOptionToDropdown}
          >
            Click to Save
          </Button>
        </box>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default WorksheetPage;
