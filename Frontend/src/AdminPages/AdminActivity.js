import React from "react";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const AdminActivity = ({activityAnnoucements}) => {
  const navigate = useNavigate();
  const getDateDay = (date) => {
    const newdate = new Date(date);
    const list = [];
    const currentdate = newdate.getDate();
    const currentday = newdate.getDay();
    const day = days[currentday];
    list.push(currentdate);
    list.push(day);
    return list;
  }
  function formatTime(isoString) {
    const date = new Date(isoString);
  
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const timeStr = hours + ':' + minutesStr + ' ' + ampm;
  
    return timeStr;
  }
  return (
      <Box
        sx={{
          border: "1px solid #0000004D",
          borderRadius: "12px",
          width: "100%",
          height: "93%",
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
          {activityAnnoucements?.slice(0,3)?.map((item) => {
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
                  {getDateDay(item?.created_at)?.map((itm, idx) => (
                    <Box key={idx}>{itm}</Box>
                  ))}
                </Box>
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  height : "100%",
                  width: "80%"
                }

                }>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
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
                    
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Poppins",
                    color: "#00000099",
                    fontWeight: "600",
                  }}
                >
                  {formatTime(item.created_at)}
                </Box>
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
            onClick={() => {
              navigate("/anouncement");
            }}
          >
            Post New Activity
          </Button>
        </Box>
      </Box>
  );
};

export default AdminActivity;
