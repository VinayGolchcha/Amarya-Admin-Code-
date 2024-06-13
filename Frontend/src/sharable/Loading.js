import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
export default function Loading(){
    return(
        <Box
      sx={{
        backgroundColor: "rgb(66, 92, 90)",
        // height: { ...[eventList.length === 0 ? "100vh" : "auto"] },
        minHeight: "100vh",
        minHeight: "100vh",
        display : "flex",
        paddingTop : "10%" , 
        justifyContent : "center",
      }}
    >
        <CircularProgress color="inherit" />
    </Box>
    );
}