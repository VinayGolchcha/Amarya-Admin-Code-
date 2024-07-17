import React from "react";
import { Box, Typography } from "@mui/material";

export default function DashboardPosComp() {
  return (
    <Box sx={{ textAlign: "center", margin: "15px 0px" }}>
      <Typography
        sx={{
          fontFamily: "Prompt",
          fontSize: "44px",
          fontWeight: 500,
          lineHeight: "66.53px",
          color: "#0A166C",
        }}
        variant="h2"
      >
        Boost Your Energy And Improve Posture!!!!
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Box sx={{ margin: "0px 20px" }}>
          <img src="Images/positionImages/1.svg"></img>
          <Typography
            sx={{
              fontFamily: "Prompt",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              color: "#161E54",
            }}
            variant="h2"
          >
            1. Seated Cresent Moon Pose
          </Typography>
        </Box>
        <Box>
          <img src="Images/positionImages/2.svg"></img>
          <Typography
            sx={{
              fontFamily: "Prompt",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              color: "#161E54",
            }}
            variant="h2"
          >
            2. Cow Face Arms
          </Typography>
        </Box>
        <Box>
          <img src="Images/positionImages/3.svg"></img>
          <Typography
            sx={{
              fontFamily: "Prompt",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              color: "#161E54",
            }}
            variant="h2"
          >
            3. Arm Stretch
          </Typography>
        </Box>
        <Box>
          <img src="Images/positionImages/4.svg"></img>
          <Typography
            sx={{
              fontFamily: "Prompt",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              color: "#161E54",
            }}
            variant="h2"
          >
            4. Knee Hug
          </Typography>
        </Box>
        <Box>
          <img src="Images/positionImages/5.svg"></img>
          <Typography
            sx={{
              fontFamily: "Prompt",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              color: "#161E54",
            }}
            variant="h2"
          >
            5. Dancer Pose
          </Typography>
        </Box>
        <Box>
          <img src="Images/positionImages/6.svg"></img>
          <Typography
            sx={{
              fontFamily: "Prompt",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "28px",
              color: "#161E54",
            }}
            variant="h2"
          >
            6. Seated Twist
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
