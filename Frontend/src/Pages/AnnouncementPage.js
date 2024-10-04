import { useLocation, useParams } from "react-router-dom";
import react from 'react';
export default function AnnouncementPage(){
    const {annoucementId} = useParams();
    const location = useLocation();
    const announcement = location.state;
    return (
        <Box sx={{ display: "flex", flexDirection: "column", margin: "1% 2.3%" }}>
            <Typography variant="h5" sx={{ fontWeight: "700", color: "#121843" }} gutterBottom>
                Announcement Tab
            </Typography>

                <CardComponenet key={announcement._id} data={announcement} />

            {notifications?.length === 0 && <Typography>No notifications available</Typography>} 
        </Box>
    );
}