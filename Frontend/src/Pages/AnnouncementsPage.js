import React, { useContext, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import CardComponenet from "../Components/AnnouncementCard";
import NotificationContext from "../ContextProvider/NotificationContext";
import axios from "axios";

const AnnouncementPage = () => {
    const { notifications, setNotifications } = useContext(NotificationContext);
    const apiUrl = process.env.REACT_APP_API_URL;
    

    useEffect(() => {
        if (notifications?.length === 0) {
            axios
                .get(`${apiUrl}/announcement
                    /fetch-announcement`)
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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", margin: "1% 2.3%" }}>
            <Typography variant="h5" sx={{ fontWeight: "700", color: "#121843" }} gutterBottom>
                Announcement Tab
            </Typography>
            {notifications?.length === 0 ? (
                <CircularProgress /> // Show loading indicator if notifications are being fetched
            ) : notifications?.map((notification) => (
                <CardComponenet key={notification.id} data={notification} />
            ))}
            {notifications?.length === 0 && <Typography>No notifications available</Typography>} 
        </Box>
    );
};

export default AnnouncementPage;
