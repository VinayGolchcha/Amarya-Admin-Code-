import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import axios from "axios";

export default function TrainingCard({ field, i, isActiveDeleteButton, logo }) {
  const [isFLip, setIsFlip] = useState(false);
  const dynamicColor = field.color;
  function handleFlip(val) {
    setIsFlip(!isFLip);
  }
  /////
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/training/admin/delete-training/${field.training_id}`
      );
      console.log(response.data); // Log success message or handle response as needed
    } catch (error) {
      console.error("Error deleting training:", error); // Handle error as needed
    }
  };

  const handleRequestTraining = async () => {
    try {
      const requestBody = {
        emp_id: "AMEMP003",
        training_id: "AMTRAN005",
        request_type: "training",
        progress_status: "in progress",
 };

      const response = await axios.post(
        "http://localhost:4000/api/v1/training/request-new-training",
        requestBody
      );
      console.log(response.data); // Log success message or handle response as needed
    } catch (error) {
      console.error("Error requesting new training:", error); // Handle error as needed
    }
  };

  return (
    // <Box sx={{ flexGrow: 1 , flexWrap : 'wrap', p : 1}}>
    <Grid item lg={4} md={6} sm={12} xs={12}>
      <Box sx={{ minWidth: 275, width: 200 }}>
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFLip}>
          <Card
            variant="outlined"
            sx={{ height: "100%", width: "100%", padding: "0px" }}
            onClick={handleFlip}
          >
            <CardContent
              sx={{
                backgroundColor: dynamicColor,
                padding: "10px",
                height: "238px",
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
                Training 
                {field.training_id.slice(-2)}
                {isActiveDeleteButton && (
                  <DeleteOutlineIcon   sx={{
                    marginLeft:"130px",
                  }} onClick={handleDelete} />
                )}
                <LaunchIcon onClick={handleRequestTraining} />
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
                {field.course_name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Prosto One",
                  fontSize: "0.8rem",
                  color: "#4A4949",
                }}
              >
                {field.course_description}
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
                height: "238px",
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
                }}
              >
                <p
                  onClick={() => {
                    console.log(field.roadmap_url);
                  }}
                >
                  Click here to download the roadmap....
                </p>
                <br />
              </Typography>
            </CardContent>
          </Card>
        </ReactCardFlip>
      </Box>
    </Grid>
  );
}
