import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Grid,
  DatePicker,
} from "@mui/material";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AssetsPage = () => {
  const [fullName, setFullName] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [selectedRequestTypes, setSelectedRequestTypes] = useState([]);
  const [selectedHardwareItems, setSelectedHardwareItems] = useState([]);
  const [requirement_type, setRequirementType] = useState("");
  const [details, setDetails] = useState("");
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [primary_purpose, setPrimaryPurposeChange] = useState("");
  const [assetData, setAssetData] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const requestTypes = [
    "Hardware",
    "Networking",
    "Email",
    "Server or Account Access",
  ];
  const hardwareItems = [
    "Laptop",
    "Mouse",
    "Headphones",
    "Keyboard",
    "Printer",
    "Battery",
  ];
  const purposeOptions = ["New Item", "Replacement", "Renewal"];
  const tableHeaders = [
    "Sr No.",
    "Name",
    "Item",
    "Invt Id.",
    "Issued From",
    "Issued Till",
    "Approved/Rejected",
    "Manager",
    "In Warranty",
  ];
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  };
  const tableContent = assetData.map((data, index) => ({
    srno: index + 1,
    name: data.name,
    item: data.item,
    invtid: data.asset_id,
    issuedfrom: formatDate(data.issued_from),
    issuedtill: formatDate(data.issued_till),
    approvedrejected: data.status,
    manager: "HR", // You may need to fill this data if available in your fetched data
    inwarranty: data.warranty_period > 0 ? "Yes" : "No",
  }));

  const formatKey = (header) => {
    return header.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  };
  const formattedContent = tableContent.map((row) => {
    const formattedRow = {};
    tableHeaders.forEach((header) => {
      const key = formatKey(header);
      formattedRow[key] = row[key];
    });
    return formattedRow;
  });

  const handleRequestTypeChange = (event) => {
    setSelectedRequestTypes(event.target.value);
  };
  const handlePrimaryPurpos = (event) => {
    setPrimaryPurposeChange(event.target.value);
  };
  const handleHardwareItemChange = (event) => {
    setSelectedHardwareItems(event.target.value);
  };

  const handleRequirementTypeChange = (event) => {
    setRequirementType(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleDeclarationChange = (event) => {
    setDeclarationChecked(event.target.checked);
  };

  const handleSendAsset = () => {
    const requestData = {
      emp_id: "AMEMP003",
      asset_type: selectedRequestTypes.length > 0 ? selectedRequestTypes : "",
      item: selectedHardwareItems.length > 0 ? selectedHardwareItems : "",
      requirement_type: requirement_type.length > 0 ? requirement_type : "",
      primary_purpose: primary_purpose,
      request_type: "Inventory",
      details: details,
    };

    console.log(requestData);

    axios
      .post(`${apiUrl}/asset/asset-request`, requestData)
      .then((response) => {
        // Handle successful response
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error sending data:", error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${apiUrl}/asset/user-asset`, {
          emp_id: "AMEMP001",
        });
        if (response.data.success) {
          setAssetData(response.data.data);
          console.log(assetData);
        } else {
          console.error("Error fetching asset data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching asset data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ margin: "20px 50px 20px 50px" }}>
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
        Asset Dashboard
      </Typography>
      <Box>
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
            background: "var(--Just-White, #FFF)", // Change the background color as needed
            marginBottom: "50px",
            borderRadius: "12px",
            border: "1px solid #BCBCBC",
            padding: "0px",
          }}
        >
          <TableContainer>
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
                        color: "white",
                        font: {
                          lg: "normal normal 100 14px/20px Poppins",
                          md: "normal normal 100 14px/20px Poppins",
                          sm: "normal normal 100 14px/20px Poppins",
                          xs: "normal normal 100 13px/18px Poppins",
                        },
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedContent.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell align="left">
                      <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/Images/Check (1).svg`}
                        alt="Check"
                        style={{ filter: "invert(1)" }}
                      />
                    </TableCell>
                    {tableHeaders.map((header, colIndex) => (
                      <TableCell
                        key={colIndex}
                        align="left"
                        sx={{
                          font: {
                            lg: "normal normal 600 14px/20px Poppins",
                            md: "normal normal 600 14px/20px Poppins",
                            sm: "normal normal 600 14px/20px Poppins",
                            xs: "normal normal 600 13px/18px Poppins",
                          },
                        }}
                      >
                        {row[formatKey(header)]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: "12px",
          border: "1px solid #BCBCBC",
          padding: "20px",
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            font: {
              lg: "normal normal 500 20px/30px Poppins",
              md: "normal normal 500 20px/30px Poppins",
              sm: "normal normal 500 18px/28px Poppins",
              xs: "normal normal 500 18px/28px Poppins",
            },
            color: "#4C4C4C",
            marginBottom: "20px",
          }}
        >
          Request Asset Form
        </Typography>

        {/* First Row */}
        <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              sx={{ backgroundColor: "rgb(250, 250, 250)" }}
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              label="Employee ID"
              sx={{ backgroundColor: "rgb(250, 250, 250)" }}
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Typography
              color="#686868"
              marginTop="-20px"
              sx={{
                marginLeft: "13%",
                font: {
                  lg: "normal normal 100 16px/25px Poppins",
                  md: "normal normal 100 16px/25px Poppins",
                  sm: "normal normal 100 16px/25px Poppins",
                  xs: "normal normal 100 15px/25px Poppins",
                },
              }}
            >
              Today’s Date
            </Typography>
            <TextField
              type="date"
              value={todayDate}
              onChange={(e) => setTodayDate(e.target.value)}
              sx={{ marginLeft: "13%", backgroundColor: "rgb(250, 250, 250)" }}
            />
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel
                component="legend"
                sx={{
                  font: {
                    lg: "normal normal 600 16px/26px Poppins",
                    md: "normal normal 600 16px/26px Poppins",
                    sm: "normal normal 600 16px/25px Poppins",
                    xs: "normal normal 600 15px/24px Poppins",
                  },
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Type of Request (choose all that apply)
              </FormLabel>
              <FormGroup>
                {requestTypes.map((type) => (
                  <FormControlLabel
                    key={type}
                    sx={{
                      color: "#4C4C4C",
                      "& .css-ahj2mt-MuiTypography-root": {
                        fontFamily: "Prompt",
                      },
                    }}
                    control={
                      <Checkbox
                        checked={selectedRequestTypes.includes(type)}
                        onChange={handleRequestTypeChange}
                        sx={{ fontFamily: "Prompt" }}
                        value={type}
                      />
                    }
                    label={type}
                  />
                ))}
                <FormControlLabel
                  sx={{ color: "#4C4C4C", fontFamily: "Prompt" }}
                  control={
                    <Checkbox
                      checked={selectedRequestTypes.includes("Other")}
                      onChange={handleRequestTypeChange}
                      value="Other"
                    />
                  }
                  label="Other"
                />
                <TextField
                  sx={{ backgroundColor: "rgb(250, 250, 250)" }}
                  variant="outlined"
                  fullWidth
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel
                component="legend"
                sx={{
                  font: {
                    lg: "normal normal 600 16px/26px Poppins",
                    md: "normal normal 600 16px/26px Poppins",
                    sm: "normal normal 600 16px/25px Poppins",
                    xs: "normal normal 600 15px/24px Poppins",
                  },
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                If Hardware (choose from)
              </FormLabel>
              <FormGroup>
                {hardwareItems.map((item) => (
                  <FormControlLabel
                    key={item}
                    sx={{
                      color: "#4C4C4C",
                      "& .css-ahj2mt-MuiTypography-root": {
                        fontFamily: "Prompt",
                      },
                    }}
                    control={
                      <Checkbox
                        checked={selectedHardwareItems.includes(item)}
                        onChange={handleHardwareItemChange}
                        sx={{ fontFamily: "Prompt" }}
                        value={item}
                      />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ marginLeft: "13%" }}>
              <FormLabel
                component="legend"
                sx={{
                  font: {
                    lg: "normal normal 600 16px/25px Poppins",
                    md: "normal normal 600 16px/25px Poppins",
                    sm: "normal normal 600 16px/25px Poppins",
                    xs: "normal normal 600 15px/24px Poppins",
                  },
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                New Item/Replacement/Renewal
              </FormLabel>
              <Select
                labelId="purpose-label"
                id="purpose"
                value={requirement_type}
                onChange={handleRequirementTypeChange}
                fullWidth
                size="small"
                sx={{ backgroundColor: "rgb(250, 250, 250)" }}
              >
                {purposeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Third Row */}
        <Grid container spacing={3} sx={{ marginTop: "35px" }}>
          <Grid item xs={4}>
            <TextField
              sx={{ backgroundColor: "rgb(250, 250, 250)" }}
              variant="outlined"
              label="Primary Purpose"
              fullWidth
              value={primary_purpose}
              onChange={handlePrimaryPurpos}
            />
          </Grid>
        </Grid>

        {/* Fourth Row */}
        <Grid container spacing={3} sx={{ marginTop: "1px" }}>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              label="Details"
              sx={{ backgroundColor: "rgb(250, 250, 250)" }}
              multiline
              rows={3}
              value={details}
              onChange={handleDetailsChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Fifth Row */}
        <Grid container spacing={3} sx={{ marginTop: "2px" }}>
          <Grid item xs={12}>
            <Typography
              sx={{
                font: {
                  lg: "normal normal 600 18px/26px Poppins",
                  md: "normal normal 600 16px/26px Poppins",
                  sm: "normal normal 600 16px/25px Poppins",
                  xs: "normal normal 600 15px/24px Poppins",
                },
                fontWeight: "bold",
                color: "#4C4C4C",
              }}
            >
              Declaration
            </Typography>
            <FormControlLabel
              sx={{
                font: {
                  lg: "normal normal 600 18px/26px Prompt",
                  md: "normal normal 600 16px/26px Prompt",
                  sm: "normal normal 600 16px/25px Prompt",
                  xs: "normal normal 600 15px/24px Prompt",
                },
                fontWeight: "bold",
                color: "#4C4C4C",
                "& .css-ahj2mt-MuiTypography-root": {
                  fontFamily: "Prompt",
                },
              }}
              control={
                <Checkbox
                  checked={declarationChecked}
                  onChange={handleDeclarationChange}
                  value="acknowledgeDeclaration"
                />
              }
              label="I hereby acknowledge that the requested assets will be used for official company business and that I am responsible for the proper care and return of these assets."
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FF5151",
              color: "white",
              border: "4px",
            }}
            onClick={handleSendAsset}
          >
            Send Request
          </Button>
        </Grid>
      </Box>
    </div>
  );
};

export default AssetsPage;
