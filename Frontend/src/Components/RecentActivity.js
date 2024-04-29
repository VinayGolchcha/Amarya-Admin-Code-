import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function RecentActivity() {
  return (
    <Box sx={{ p: 0, border: "1px solid #E0E0E0", borderRadius: "12px" }}>
      <Box
        sx={{
          backgroundColor: "#1B204A",
          borderRadius: "10px 10px 0px 0px",
          padding: "10px 10px 10px 24px",
          color: "#FFFFFF",
        }}
      >
        Recent Activity (By Admin)
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: "17px",
          }}
          variant="h6"
        >
          10.40 AM, Fri 10 Sept 2021
        </Typography>
        <Typography
          sx={{
            mt: 2,
            fontFamily: "Poppins",
            fontSize: "25px",
            fontWeight: 500,
            lineHeight: "28px",
          }}
          variant="h6"
        >
          CSR Activity Planned this weekend!!
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "20px",
            marginTop: "12px",
          }}
          variant="h6"
        >
          Kindly check the requirements and terms of work and make sure
          everything is right. This Activity is mandatory for all and everyone
          has to bring unused warm clothes from their homes to provide them to
          the person in need.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "20px",
            marginTop: "12px",
          }}
          variant="h6"
        >
          We will be going to xyz place at 7 pm on Saturday and to jbh place at
          4pm on Sunday.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "20px",
            marginTop: "12px",
          }}
          variant="h6"
        >
          Come forward with a helping hand...
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          <Link to="/activities">
            <Button
              variant="contained"
              sx={{
                m: 2,
                float: "right",
                padding: "10px 16px 10px 16px",
                color: "#FFFFFF",
                font: "Poppins 500",
                borderRadius: "4px",
                backgroundColor: "#FF5151",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#FF5151",
                },
              }}
            >
              See All Activity
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
