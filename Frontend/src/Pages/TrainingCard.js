import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import LaunchIcon from "@mui/icons-material/Launch";
import Typography from "@mui/material/Typography";
import { Card, Tooltip } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAuth } from "../Components/AuthContext";

export default function TrainingCard({
  field,
  i,
  setTrainingId,
  handleRequest,
  edit,
  deleteItem,
  handleDeleteApi,
  setSelectedTr,
  setEditOpen,
}) {
  const [isFLip, setIsFlip] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuth();
  const dynamicColor = field?.color;
  function handleFlip(val) {
    setIsFlip(!isFLip);
    setTrainingId(val);
  }
  const handleEditObj = (val) => {
    setSelectedTr(val);
    setEditOpen(true);

  };

  const  downloadPDF = (base64Data) =>  {
    // Create a hidden anchor element
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = `${field?.courseName}.pdf`;  // This sets the filename for the downloaded file
    
    // Append the link to the document
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Remove the link after the download
    document.body.removeChild(link);
}

  return (
    // <Box sx={{ flexGrow: 1 , flexWrap : 'wrap', p : 1}}>
    <Grid
      item
      lg={4}
      md={6}
      sm={12}
      xs={12}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{}}>
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFLip}>
          <Card
            variant="outlined"
            sx={{ height: "100%", width: "100%", padding: "0px" }}
            onClick={() => handleFlip(field?.trainindId)}
          >
            <CardContent
              sx={{
                backgroundColor: dynamicColor,
                padding: "10px",
                minHeight: "fit-content",
                height: "280px",
                width: "273px",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: "Prosto One",
                  color: "#161E54",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                color="text.secondary"
                gutterBottom
              >
                Training {field?.trainindId?.toString().slice(-2)}
                <>
                
                {user?.role === "user" && !edit && !deleteItem &&<> <Tooltip title="Request training" placement="top" arrow>
                <LaunchIcon sx={{
                  cursor : "pointer"
                }} onClick={() => handleRequest(field?.trainindId)} /></Tooltip></>}
                </>
                {edit && (
                  <EditIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleEditObj(field)}
                  />
                )}
                {deleteItem && (
                  <DeleteOutlineIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDeleteApi(field?.trainindId)}
                  />
                )}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: "Saira Stencil One",
                  textAlign: "center",
                  margin: "15px",
                  color: "#161E54",
                  fontSize: "1.8rem",
                }}
              >
                {field?.courseName}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Prosto One",
                  fontSize: "0.8rem",
                  color: "#4A4949",
                }}
              >
                {field?.courseDescription?.slice(0,201)}...
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ height: "100%", width: "100%", padding: "0px" }}
            onClick={handleFlip}
          >
            <CardContent
              sx={{
                backgroundColor: dynamicColor,
                padding: "10px",
                height: "280px",
                width: "273px",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: "Prosto One",
                  color: "#161E54",
                }}
                color="text.secondary"
                gutterBottom
              >
                Training
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Sedan SC",
                  fontSize: "25px",
                  color: "#3E4EB6",
                  textAlign: "center",
                  marginTop: "25px",
                  cursor: "pointer",
                }}
              >
                
                <button onClick={() => downloadPDF(field?.roadmapurl)} style={{border : "none" , 
                  backgroundColor : "transparent",
                  fontFamily: "Sedan SC",
                  fontSize: "25px",
                  color: "#3E4EB6",
                  textAlign: "center",
                  marginTop: "25px",
                  cursor: "pointer",}}>Click here to download the roadmap....</button>
                <br />
              </Typography>
            </CardContent>
          </Card>
        </ReactCardFlip>
      </Box>
    </Grid>
  );
}
