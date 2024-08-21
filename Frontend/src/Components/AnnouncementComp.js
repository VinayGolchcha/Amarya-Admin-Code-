import React from "react";
import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";

export default function AnnouncementComp({ announcements }) {
  const currentDate = new Date().toDateString();
  return (
    <Box sx={{ p: 0, border: "1px solid #E0E0E0", borderRadius: "12px" , height : "100%"}}>
      <Box
        sx={{
          backgroundColor: "#1B204A",
          borderRadius: "10px 10px 0px 0px",
          padding: "10px 10px 10px 24px",
          color: "#FFFFFF",
        }}
      >
        Announcements
        {/* date code starts here */}
        {/* <Accordion
          sx={{ margin: "0", height: "auto", zIndex: "1000", float: "right" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ minHeight: "25px", height: "25px", p: 1 }}
          > */}
            <Typography
              sx={{
                fontSize: "0.6rem",
                height: "30px",
                display: "flex",
                alignItems: "center",
                color: "gray",
                float: "right" ,
                backgroundColor : "white",
                padding : "8px",
                borderRadius : "4px"
              }}
            >
              {currentDate}
            </Typography>
          {/* </AccordionSummary> */}
          {/* <AccordionDetails
            sx={{ backgroundColor: "white", position: "absolute" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Select" />
              </DemoContainer>
            </LocalizationProvider>
          </AccordionDetails> */}
        {/* </Accordion> */}
        {/* date code ends here */}
      </Box>
      <Box sx={{ pt: 2, pb: 1 }}>
        {announcements.map((announcement, index) => index <2 && (
          <Box
            key={index}
            sx={{
              backgroundColor: "rgb(250, 250, 250)",
              borderRadius: "6px",
              padding: "12px 16px",
              color: "#303030",
              margin: "15px auto",
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ mr: 1, backgroundColor: "rgb(250, 250, 250)" }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                }}
              >
                {announcement.title}
              </Typography>
              <br />
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "10px",
                }}
              >
                {new Date(announcement.created_at).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ width: "50%", display: "contents" }}>
              {/* <Box sx={{ marginRight: "5px" }}>
                <img src="icons/pin.svg" alt="pin" />
              </Box> */}
              <Box>
                <img src="icons/3dots.svg" alt="options" />
              </Box>
            </Box>
          </Box>
        ))}
        <Link to="/announcements">
          <Button
            variant="text"
            sx={{
              marginLeft: "5%",
              marginBottom: "20px",
              width: "90%",
              border: "1px solid #E0E0E0",
              padding: "10px",
              color: "#FF5151",
              fontFamily: "Poppins",
              fontWeight: 500,
              borderRadius: "0px 0px 10px 10px",
              mt: 2,
            }}
          >
            See All Announcements
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
