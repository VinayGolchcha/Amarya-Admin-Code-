import React, { useState, useEffect } from "react";
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
  Autocomplete,
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuth } from "../Components/AuthContext";

const teams = [
  { value: "", label: "Select Team" },
  { value: "FS", label: "Fullstack" },
  { value: "SAP", label: "SAP" },
  { value: "DataScience", label: "Data Science" },
  { value: "HR", label: "HR" },
  { value: "Admin", label: "Admin" },
];

const WorkSheet = () => {
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
  const renderTableCells2 = (rowData) => {
    const cellData = [
      { key: "empid", label: "Emp Id." },
      { key: "team", label: "Team" },
      { key: "date", label: "Date" },
      { key: "category", label: "Category" },
      { key: "project", label: "Project" },
      { key: "description", label: "Description" },
      { key: "skillset", label: "Skillset" },
      { key: "", label: "" },
    ];

    return cellData.map((cell, index) => (
      <TableCell key={index} sx={{ background: "#161E54" }}>
        <Typography
          sx={{
            color: "#FFFFFF",
            font: {
              lg: "normal normal 600 16px/25px Poppins",
              md: "normal normal 600 16px/25px Poppins",
              sm: "normal normal 600 16px/25px Poppins",
              xs: "normal normal 600 10px/16px Poppins",
            },
            display: "flex",
            alignItems: "center", // Align text and icon vertically
          }}
        >
          {cell.label}
          {["Team", "Project", "Category"].includes(cell.label) && (
            <ArrowDropDownIcon sx={{ marginLeft: "4px" }} />
          )}
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

  const [rows, setRows] = useState([
    {
      empid: "",
      team: "",
      date: "",
      category: "",
      project: "",
      description: "",
      skillset: [],
    },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [newRow, setNewRow] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [textValue, setTextValue] = useState("");

  const [filterEmpId, setFilterEmpId] = useState(""); // State to store the selected employee ID for filtering
  const [filterEmpName, setFilterEmpName] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };
  const fetchWorksheetDataForEmployee = async (empId) => {
    try {
      const response = await fetch(
        `${apiUrl}/worksheet/fetch-user-worksheet/${empId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.success) {
        const worksheetData = data?.data.map((rowData) => ({
          empid: rowData.emp_id,
          team: rowData.team,
          date: formatDate(rowData.created_at),
          category: rowData.category,
          project: rowData.project,
          description: rowData.description,
          // skillset: getSkillsetNameByIds(rowData.skill_set_id),
          skillset: rowData.skills || [], // Map skills to skillset
        }));
        setRows(worksheetData);
      } else {
        console.error("Failed to fetch worksheet data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching worksheet data:", error);
    }
  };

  const handleFilterChange = (event, newValue) => {
    if (newValue) {
      setFilterEmpId(newValue.emp_id); // Set the employee ID for fetching data
      setFilterEmpName(newValue.name);
      fetchWorksheetDataForEmployee(newValue.emp_id); // Fetch worksheet data for selected employee
    } else {
      setFilterEmpId("");
      setFilterEmpName("");
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const [selectedOption, setSelectedOption] = useState("");
  const [filterDropdown, setFilterDropdown] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const handleCheckboxChange = (field) => {
    setSelectedOption(field);
  };

  const handleTextFieldChange = (value) => {
    setTextValue(value);
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

  useEffect(() => {
    console.log("Updated Filter Dropdown:", filterDropdown);
  }, [filterDropdown]);

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

    setFilterDropdown((prevFilterDropdown) => [
      ...prevFilterDropdown,
      randomId.toString(), // Convert to string for consistency
    ]);
  };

  const handleSaveRow = () => {
    if (newRow !== null) {
      setRows((prevRows) => [...prevRows, { ...newRow, checkbox: false }]);
      setNewRow(null);
    } else {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[editingRowIndex] = {
          ...updatedRows[editingRowIndex],
          checkbox: false,
        };
        return updatedRows;
      });
      setEditingRowIndex(null);
    }
  };

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
  const [employees, setEmployees] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || ""); //

  useEffect(() => {
    // Fetch the list of all employees when the component mounts
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/fetch-all-employee-ids`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.success) {
        setEmployees(data.data); // Assuming data.data contains the list of employees
        setFilterDropdown(data.data.map((emp) => emp.emp_id)); // Assuming emp_id is the identifier
      } else {
        console.error("Failed to fetch employees:", data.message);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };

  return (
    <Box style={{ margin: "20px 20px 20px 20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: "25px",
            font: {
              lg: "normal normal 600 22px/35px Poppins",
              md: "normal normal 600 22px/35px Poppins",
              sm: "normal normal 600 20px/30px Poppins",
              xs: "normal normal 600 22px/30px Poppins",
            },
          }}
        >
          Worksheet Dashboard
        </Typography>
        <FormControl sx={{ minWidth: 220, mt: "10px" }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ color: "#333333", fontWeight: "400" }}
          >
            {/* Select Employee */}
          </InputLabel>
          {/* Replace the Select component with Autocomplete */}
          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.name} // Display employee names
            filterOptions={(options, state) => {
              return options.filter((option) =>
                option.name
                  .toLowerCase()
                  .includes(state.inputValue.toLowerCase())
              );
            }}
            value={employees.find((emp) => emp.emp_id === filterEmpId) || null}
            onChange={handleFilterChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Employee"
                variant="standard"
              />
            )}
          />
        </FormControl>
      </Box>
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
        {filterEmpName} - {filterEmpId}
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
              .filter((row) => {
                // Filter based on the selected employee ID
                return (
                  filterEmpId === "" ||
                  filterEmpId === "all" ||
                  row.empid.toString() === filterEmpId
                );
              })
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
                  {/* <TableCell>
                    <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/Images/Save_duotone.png`}
                      alt="Check"
                      onClick={handleSaveRow}
                      sx={{ cursor: "pointer" }}
                    />
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={handleChangePage}
        />
        {/* </Box> */}
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default WorkSheet;
