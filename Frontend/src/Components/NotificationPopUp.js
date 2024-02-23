import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { List, ListItem } from "@mui/material";
import { Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

export default function NotificationPopUp() {
  const [notifications, setNotifications] = useState([
    {
      notificationTitle: "Renewal of Work From Home Policy!!!",
      notificationDescription:
        "Hi all. As of 27th Nov 2023, new work from home policy will be made effective due to...........",
      date: "10th Nov 2023",
    },
    {
      notificationTitle: "Get Ready For the Fun Friday Activity!!!!",
      notificationDescription:
        "This friday, at 4pm we will be having a new , more engaing fun friday....Be on time.",
      date: "15th Nov 2023",
    },
  ]);
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Box variant="text" {...bindTrigger(popupState)}>
            <Badge badgeContent={1} color="error">
              <NotificationsIcon sx={{ color: "#b4b4b4" }} />
            </Badge>
          </Box>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "start",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{}}
          >
            <Box sx={{ borderBottom: "1px solid lightgray" }}>
              <Typography sx={{ p: 2 }}>Notifications</Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  padding: "6px 0px 0px 0px",
                }}
              >
                <Box
                  sx={{
                    width: "fit-content",
                    padding: "6px 13px 8px 8px",
                    backgroundColor: "#9B64001A",
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
              <List sx={{ width: "100%", padding: "4px 0px", height: "270px" }}>
                {notifications.map((item) => {
                  return (
                    <ListItem
                      sx={{
                        width: "100%",
                        height: "128px",
                        backgroundColor: "#0061FE14",
                        border: "0.5px solid #E0E0E0",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          paddingTop: "5%",
                          display: "flex",
                        }}
                      >
                        <Box
                          sx={{
                            height: "6px",
                            width: "5px",
                            backgroundColor: "#9B0032",
                            borderRadius: "50px",
                            margin: "16px 8px",
                          }}
                        ></Box>
                        <img
                          src="amarya-logo.jpg"
                          style={{
                            borderRadius: "50px",
                            height: "35px",
                            width: "40px",
                            marginRight: "5px",
                          }}
                        />
                      </Box>
                      <Box sx={{ marginLeft: "20px", width: "100%" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "400",
                            fontFamily: "Poppins",
                            fontSize: "0.8rem",
                            margin: "9px 0px",
                          }}
                        >
                          {item.notificationTitle}
                        </Typography>
                        <Box
                          sx={{
                            borderTop: "2px solid #e6e8eb",
                            borderBottom: "2px solid #e6e8eb",
                            borderLeft: "2px solid #e6e8eb",
                            padding: "0px 16px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontFamily: "Poppins",
                              fontSize: "10px",
                              margin: "9px 0px",
                            }}
                          >
                            {item.notificationDescription}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: "gray", fontSize: "10px" }}>
                          {item.date}
                        </Typography>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
