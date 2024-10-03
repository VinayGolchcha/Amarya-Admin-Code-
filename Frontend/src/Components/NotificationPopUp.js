import { useContext, useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
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
import { toast } from "react-toastify";

export default function NotificationPopUp() {
  const navigate = useNavigate();
  const { notifications, setNotifications } = useContext(NotificationContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user  , encryptionKey} = useAuth();
  const token = encodeURIComponent(user?.token || "");
  const [isLoading , setIsLoading] = useState(false);

  const fetchNotification = async () => {
    if (notifications?.length === 0) {
      const empId = user.user_id
      axios
        .get(`${apiUrl}/announcement/fetch-announcement/${empId}`, {
          headers: {
            "x-encryption-key" : encryptionKey
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
  }

  const markOneAsRead = async (id , announcement) => {
    navigate(`/anouncement/${id}`,{
      state : {
        announcement
      }
    })
    setIsLoading(true);
    try{
      const newNotifications = notifications.map((item) => {
        if(item._id === id){
          return {...item , read : true}
        }else{
          return item
        }
      });
      setNotifications(newNotifications)
      const response = axios.get(`${apiUrl}/announcement/fetch-announcement-by-id/${id}/${user.user_id}`,{
        headers : {
          "x-encryption-key" : encryptionKey
        }
      });
      toast.success("Notification is read successfully");
      fetchNotification();
      setIsLoading(false);
    }catch(err){
      toast.error("Failed to read Notifications");
      fetchNotification();
      setIsLoading(false);
    }finally{

    }
  }

  const markAllAsRead = async () => {
    setIsLoading(true);
    try{
      const newNotifications = notifications.map((item) => {
          return {...item , read : true}
      });
      setNotifications(newNotifications)
      const empId = user.user_id;
      const allReadNotifications = notifications.map((notification) => {
        return notification._id
      });
      const body = {
        "ids" : allReadNotifications
      }
      const response = await axios.post(`${apiUrl}/announcement/mark-all-announcement-read/${empId}`, body ,{
        headers : {
          "x-encryption-key" : encryptionKey
        }
      });
      toast.success("Notifications are read successfully");
      fetchNotification();
      setIsLoading(false)
    }catch(err){
      console.log(err);
      fetchNotification();
      toast.error("Failed to read Notifications");
      setIsLoading(false)
    }finally{

    }
  }

  useEffect(() => {
    if (notifications?.length === 0) {
      setIsLoading(true)
      const empId = user.user_id
      axios
        .get(`${apiUrl}/announcement/fetch-announcement/${empId}`, {
          headers: {
            "x-encryption-key" : encryptionKey
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.success) {
            setNotifications(data.data);
            setIsLoading(false)
          } else {
            console.error("Error fetching notifications:", data.message);
            setIsLoading(false)
          }
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
          setIsLoading(false);
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
                <NotificationsIcon sx={{ color: "#b4b4b4" , "&:hover" : {
                  color : "black"
                }}} fontSize="large" />
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
                    onClick={markAllAsRead}
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
                {isLoading && <CircularProgress color="inherit"/>}
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
                      onClick={() => markOneAsRead(item?._id , item)}
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
                            {item?.title}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontFamily: "Poppins",
                              fontSize: "0.8rem",
                              color: "#555",
                            }}
                          >
                            {item.description.length > 50
                              ? `${item.description.slice(0, 50)}...`
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


