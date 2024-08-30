import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function RecentActivity({ activities }) {
  // Sort activities by created_at in descending order to get the most recent one first
  const sortedActivities = activities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const navigate = useNavigate();
  // Get the most recent activity
  const recentActivity = sortedActivities.length > 0 ? sortedActivities[0] : null;
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
        Recent Activity (By Admin)
      </Box>
      <Box sx={{ p: 2 }}>
        {recentActivity ? (
          <Box>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: "17px",
              }}
              variant="h6"
            >
              {new Date(recentActivity.created_at).toLocaleString()}
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
              {recentActivity.title}
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
              {recentActivity.description}
            </Typography>
          </Box>
        ) : (
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
            No recent activities.
          </Typography>
        )}
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
              onClick={() => navigate("/activities")}
            >
              See All Activity
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
