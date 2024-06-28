import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { List, ListItem } from "@mui/material";
import { Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import NotificationContext from "../ContextProvider/NotificationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

export default function NotificationPopUp() {
  const navigate = useNavigate();
  const { notifications, setNotifications } = useContext(NotificationContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user } = useAuth();
  const token = encodeURIComponent(user?.token || "");

  useEffect(() => {
    if (notifications?.length === 0) {
      axios
        .get(`${apiUrl}/announcement/fetch-announcement`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.success) {
            setNotifications(data.data);
          } else {
            console.error("Error fetching notifications:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, []);

  const handleNotificationClick = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].read = true;
    setNotifications(updatedNotifications);
    navigate("/announcements");
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Box variant="text" {...bindTrigger(popupState)}>
            <Badge
              badgeContent={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              color="error"
            >
              <NotificationsIcon sx={{ color: "#b4b4b4" }} fontSize="large" />
            </Badge>
          </Box>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                width: { xs: "100%", sm: "300px", md: "400px" },
                maxWidth: "100%",
              },
            }}
          >
            <Box sx={{ borderBottom: "1px solid lightgray" }}>
              <Typography sx={{ p: 2 }}>Notifications</Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  padding: "6px 16px",
                }}
              >
                <Box
                  sx={{
                    width: "fit-content",
                    padding: "6px 13px 8px 8px",
                    backgroundColor: "#9B64001A",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const updatedNotifications = notifications.map(
                      (notification) => ({
                        ...notification,
                        read: true,
                      })
                    );
                    setNotifications(updatedNotifications);
                  }}
                >
                  Mark all as read
                </Box>
              </Typography>
              <Typography
                sx={{
                  padding: "0px 16px",
                  fontWeight: "600",
                  position: "relative",
                  top: "-7px",
                }}
              >
                Unread
              </Typography>
            </Box>
            <Box
              sx={{
                width: "auto",
                height: "241px",
                overflow: "auto",
                margin: "4px 0px",
              }}
            >
              <List sx={{ width: "100%", padding: "4px 0px" }}>
                {notifications?.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      width: "100%",
                      backgroundColor: item.read ? "#fff" : "#0061FE14",
                      border: "0.5px solid #E0E0E0",
                      padding: "8px 16px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleNotificationClick(index)}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {!item.read && (
                        <Box
                          sx={{
                            height: "6px",
                            width: "6px",
                            backgroundColor: "#9B0032",
                            borderRadius: "50%",
                            marginRight: "8px",
                          }}
                        ></Box>
                      )}
                      <img
                        src={`${process.env.PUBLIC_URL}/Images/logo1.svg`}
                        // src="logo1.svg"
                        alt="logo"
                        style={{
                          borderRadius: "50%",
                          height: "35px",
                          width: "35px",
                          marginRight: "8px",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "400",
                            fontFamily: "Poppins",
                            fontSize: "0.9rem",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "0.8rem",
                            color: "#555",
                          }}
                        >
                          {item.description.length > 90
                            ? `${item.description.slice(0, 90)}...`
                            : item.description}
                        </Typography>
                        <Typography sx={{ color: "gray", fontSize: "0.75rem" }}>
                          {item.from_date}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
