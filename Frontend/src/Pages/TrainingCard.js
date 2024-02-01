import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import LaunchIcon from "@mui/icons-material/Launch";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

export default function TrainingCard({field}) {
  const [isFLip, setIsFlip] = useState(false);
  const dynamicColor = field.color;
  function handleFlip(val) {
    setIsFlip(!isFLip);
  }
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
                    backgroundColor:  dynamicColor,
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
                    <LaunchIcon />
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Saira Stencil One",
                      textAlign: "center",
                      margin: "15px",
                      color: "#161E54",
                    }}
                  >
                    {field.courseName}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Prosto One",
                      fontSize: "0.8rem",
                      color: "#4A4949",
                    }}
                  >
                    {field.courseDescription}
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
                    backgroundColor: "#FDEBF9",
                    border: "10px solid #E0E0E0",
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
                    Click here to download the roadmap....
                    <br />
                  </Typography>
                </CardContent>
              </Card>
            </ReactCardFlip>
          </Box>
        </Grid>
          );
}
