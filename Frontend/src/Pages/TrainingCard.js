import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import LaunchIcon from "@mui/icons-material/Launch";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

export default function TrainingCard() {
  const [isFLip, setIsFlip] = useState(false);
  const [datascience, setDataScience] = useState(false);
  const [reactNative, setReactNative] = useState(false);
  const [vueJs, setVueJs] = useState(false);
  const [python, setPyhton] = useState(false);
  const [sapAbap, setSapAbap] = useState(false);
  const [sapHr, setSapHr] = useState(false);
  const [sapCDS, setSapCDS] = useState(false);
  function handleFlip(val) {
    if (val === "fullstack") {
      setIsFlip(!isFLip);
    } else if (val === "datascience") {
      setDataScience(!datascience);
    } else if (val === "reactnative") {
      setReactNative(!reactNative);
    } else if (val === "vue") {
      setVueJs(!vueJs);
    } else if (val === "python") {
      setPyhton(!python);
    } else if (val === "sapabap") {
      setSapAbap(!sapAbap);
    } else if (val === "saphr") {
      setSapHr(!sapHr);
    } else if (val === "sapcds") {
      setSapCDS(!sapCDS);
    }
  }
  return (
    <Box sx={{ flexGrow: 1 , flexWrap : 'wrap'}}>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box sx={{ minWidth: 275, width: 200 }}>
            <ReactCardFlip flipDirection="horizontal" isFlipped={isFLip}>
              <Card
                variant="outlined"
                sx={{ height: "100%", width: "100%", padding: "0px" }}
                onClick={() => handleFlip("fullstack")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#FDEBF9",
                    border: "10x solid #E0E0E0",
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
                    FULL STACK
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Prosto One",
                      fontSize: "0.8rem",
                      color: "#4A4949",
                    }}
                  >
                    Topics Covered - HTML, CSS, React JS, Node JS, Express Js,
                    MongoDB
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                sx={{ height: "100%", width: "100%", padding: "0px" }}
                onClick={() => handleFlip("fullstack")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#FDEBF9",
                    border: "10x solid #E0E0E0",
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
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box sx={{ minWidth: 275, width: 200 }}>
            <ReactCardFlip flipDirection="horizontal" isFlipped={datascience}>
              <Card
                variant="outlined"
                sx={{ height: "100%", width: "100%" }}
                onClick={() => handleFlip("datascience")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#F3F8EB",
                    border: "10x solid #E0E0E0",
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
                    DATA SCIENCE
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Prosto One",
                      fontSize: "0.8rem",
                      color: "#4A4949",
                    }}
                  >
                    Topics Covered - Basics of Python, Pandas, Matplotlib,
                    SKlearn, Scipy and ML Regression and Prediction Models.
                    <br />
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#E0E0E0",
                }}
                onClick={() => handleFlip("datascience")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#F3F8EB",
                    border: "10x solid #E0E0E0",
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
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box sx={{ minWidth: 275, width: 200 }}>
            <ReactCardFlip flipDirection="horizontal" isFlipped={reactNative}>
              <Card
                variant="outlined"
                sx={{ height: "100%", width: "100%" }}
                onClick={() => handleFlip("reactnative")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#E8F0FB",
                    border: "10x solid #E0E0E0",
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
                    REACT NATIVE
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Prosto One",
                      fontSize: "0.8rem",
                      color: "#4A4949",
                    }}
                  >
                    Topics Covered - Basics of React, React Native topics and
                    Syntax, Project for Whatsapp Replica with React Native.
                    <br />
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#E0E0E0",
                }}
                onClick={() => handleFlip("reactnative")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#E8F0FB",
                    border: "10x solid #E0E0E0",
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
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box sx={{ minWidth: 275, width: 200 }}>
            <ReactCardFlip flipDirection="horizontal" isFlipped={vueJs}>
              <Card
                variant="outlined"
                sx={{ height: "100%", width: "100%" }}
                onClick={() => handleFlip("vue")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#F3F8EB",
                    border: "10x solid #E0E0E0",
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
                    VUE JS
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Prosto One",
                      fontSize: "0.8rem",
                      color: "#4A4949",
                    }}
                  >
                    Topics Covered - HTML, CSS, Vue JS, Creating a dynamic
                    Dashboard for professional use at organizational Level.
                    <br />
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#E0E0E0",
                }}
                onClick={() => handleFlip("vue")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#F3F8EB",
                    border: "10x solid #E0E0E0",
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
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box sx={{ minWidth: 275, width: 200 }}>
            <ReactCardFlip flipDirection="horizontal" isFlipped={python}>
              <Card
                variant="outlined"
                sx={{ height: "100%", width: "100%" }}
                onClick={() => handleFlip("python")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#E8F0FB",
                    border: "10x solid #E0E0E0",
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
                    PYTHON
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Prosto One",
                      fontSize: "0.8rem",
                      color: "#4A4949",
                    }}
                  >
                    Topics Covered - Python Basics, Intermediate and Advanced
                    Python with Django Framework.
                    <br />
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                sx={{ height: "100%", width: "100%" }}
                onClick={() => handleFlip("python")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#E8F0FB",
                    border: "10x solid #E0E0E0",
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
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box sx={{ minWidth: 275, width: 200 }}>
            <ReactCardFlip flipDirection="horizontal" isFlipped={sapAbap}>
              <Card
                variant="outlined"
                sx={{ height: "100%", width: "100%" }}
                onClick={() => handleFlip("sapabap")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#FDEBF9",
                    border: "10x solid #E0E0E0",
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
                    SAP ABAP
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Prosto One",
                      fontSize: "0.8rem",
                      color: "#4A4949",
                    }}
                  >
                    Topics Covered - Basics of ABAP Programming Language.
                    <br />
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                sx={{ height: "100%", width: "100%" }}
                onClick={() => handleFlip("sapabap")}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#FDEBF9",
                    border: "10x solid #E0E0E0",
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
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexWrap : 'wrap',
            marginLeft: "16px",
            justifyContent: "center",
          }}
        >
          <Grid item lg={4} md={6} sm={6} xs={12} sx={{padding : '16px 0px 0px 0px'}}>
            <Box sx={{ minWidth: 275, width: 200 }}>
              <ReactCardFlip flipDirection="horizontal" isFlipped={sapHr}>
                <Card
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handleFlip("saphr")}
                >
                  <CardContent
                    sx={{
                      backgroundColor: "#E8F0FB",
                      border: "10x solid #E0E0E0",
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
                      SAP-HR
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Prosto One",
                        fontSize: "0.8rem",
                        color: "#4A4949",
                      }}
                    >
                      Topics Covered - HTML, CSS, React JS, Node JS, Express Js,
                      MongoDB
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handleFlip("saphr")}
                >
                  <CardContent
                    sx={{
                      backgroundColor: "#E8F0FB",
                      border: "10x solid #E0E0E0",
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
          <Grid item lg={4} md={6} sm={6} xs={12} sx={{padding: '16px 0px 0px 0px'}}>
            <Box sx={{ minWidth: 275, width: 200 }}>
              <ReactCardFlip flipDirection="horizontal" isFlipped={sapCDS}>
                <Card
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handleFlip("sapcds")}
                >
                  <CardContent
                    sx={{
                      backgroundColor: "#F3F8EB",
                      border: "10x solid #E0E0E0",
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
                      SAP-CDS
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Prosto One",
                        fontSize: "0.8rem",
                        color: "#4A4949",
                      }}
                    >
                      Topics Covered - HTML, CSS, React JS, Node JS, Express Js,
                      MongoDB
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handleFlip("sapcds")}
                >
                  <CardContent
                    sx={{
                      backgroundColor: "#F3F8EB",
                      border: "10x solid #E0E0E0",
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
        </Box>
      </Grid>
    </Box>
  );
}
