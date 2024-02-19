import React from "react";
import { Box, Typography, List, ListItem, Button } from "@mui/material";

const data = [
  {
    date: "16 Sat",
    description: "Warm Clothes Distribution on 16th Dec 2023",
    time: "12.02 PM",
  },
  {
    date: "20 Mon",
    description: "Plantation Acitivity near MBEB main office",
    time: "12.02 PM",
  },
  {
    date: "20 Mon",
    description: "Warm Clothes Distribution on 16th Dec 2023",
    time: "12.02 PM",
  },
];

const AdminActivity = () => {
  return (
    <div>
      <Box
        sx={{
          border: "1px solid #0000004D",
          borderRadius: "12px",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            backgroundColor: "#1B204A",
            color: "#FFFFFF",
            borderRadius: "12px 12px 0px 0px",
            padding: "6px 16px",
          }}
        >
          Activity Planned
        </Typography>
        <List sx={{ paddingBottom: "4px", margin: "0px 8px 8px 8px" }}>
          {data.map((item) => {
            return (
              <ListItem
                sx={{
                  padding: "4px",
                  border: "1px solid #00000033",
                  marginBottom: "4px",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "20%",
                    alignItems: "center",
                    padding: "16px 32px",
                    fontFamily: "Poppins",
                    backgroundImage: "linear-gradient(#00000080, #FFFFFF33)",
                    color: "#00000099",
                    fontWeight: "600",
                  }}
                >
                  {item.date.split(" ").map((itm, idx) => (
                    <Box key={idx}>{itm}</Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    height: "100%",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    padding: "20px",
                    fontFamily: "Poppins",
                    color: "#00000099",
                    fontWeight: "600",
                  }}
                >
                  {item.description}
                </Box>
                <Box
                  sx={{
                    height: "100%",
                    width: "23%",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Poppins",
                    color: "#00000099",
                    fontWeight: "600",
                  }}
                >
                  {item.time}
                </Box>
              </ListItem>
            );
          })}
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            margin: "0px 5px 10px 0px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            sx={{ textTransform: "none", fontFamily: "Poppins" }}
          >
            Post New Activity
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AdminActivity;
