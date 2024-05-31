import { React, useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
// import CardComponenet from "../Components/AnnouncementCard";
import { useTheme } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoremIpsum } from "react-lorem-ipsum";
import { toast } from "react-toastify";
import axios from "axios";

export const activities = [
  {
    id: 1,
    title: "Activity 1",
    content: <LoremIpsum avgSentencesPerParagraph={4} />,
    details: <LoremIpsum avgSentencesPerParagraph={8} p={2} />,
    date: new Date("2023-09-19").toISOString().substring(0, 10),
    images: [
      "/Images/activities/activity1/1.jpg",
      "/Images/activities/activity1/2.jpg",
      "/Images/activities/activity1/3.jpg",
      "/Images/activities/activity1/4.jpg",
    ],
  },
  {
    id: 2,
    title: "Activity 2",
    content: <LoremIpsum avgSentencesPerParagraph={4} />,
    details: <LoremIpsum avgSentencesPerParagraph={8} p={2} />,
    date: new Date("2023-09-19").toISOString().substring(0, 10),
    images: [
      "/Images/activities/activity1/1.jpg",
      "/Images/activities/activity1/2.jpg",
      "/Images/activities/activity1/3.jpg",
      "/Images/activities/activity1/4.jpg",
    ],
  },
  {
    id: 3,
    title: "Activity 3",
    content: <LoremIpsum avgSentencesPerParagraph={4} />,
    details: <LoremIpsum avgSentencesPerParagraph={8} p={2} />,
    date: new Date("2023-09-19").toISOString().substring(0, 10),
    images: [
      "/Images/activities/activity1/1.jpg",
      "/Images/activities/activity1/2.jpg",
      "/Images/activities/activity1/3.jpg",
      "/Images/activities/activity1/4.jpg",
    ],
  },
  {
    id: 4,
    title: "Activity 4",
    content: <LoremIpsum avgSentencesPerParagraph={4} />,
    details: <LoremIpsum avgSentencesPerParagraph={8} p={2} />,
    date: new Date("2023-09-19").toISOString().substring(0, 10),
    images: [
      "/Images/activities/activity1/1.jpg",
      "/Images/activities/activity1/2.jpg",
      "/Images/activities/activity1/3.jpg",
      "/Images/activities/activity1/4.jpg",
    ],
  },
  {
    id: 5,
    title: "Activity 5",
    content: <LoremIpsum avgSentencesPerParagraph={4} />,
    details: <LoremIpsum avgSentencesPerParagraph={8} p={2} />,
    date: new Date("2023-09-19").toISOString().substring(0, 10),
    images: [
      "/Images/activities/activity1/1.jpg",
      "/Images/activities/activity1/2.jpg",
      "/Images/activities/activity1/3.jpg",
      "/Images/activities/activity1/4.jpg",
    ],
  },
  {
    id: 6,
    title: "Activity 6",
    content: <LoremIpsum avgSentencesPerParagraph={4} />,
    details: <LoremIpsum avgSentencesPerParagraph={8} p={2} />,
    date: new Date("2023-09-19").toISOString().substring(0, 10),
    images: [
      "/Images/activities/activity1/1.jpg",
      "/Images/activities/activity1/2.jpg",
      "/Images/activities/activity1/3.jpg",
      "/Images/activities/activity1/4.jpg",
    ],
  },
  {
    id: 7,
    title: "Activity 7",
    content: <LoremIpsum avgSentencesPerParagraph={4} />,
    details: <LoremIpsum avgSentencesPerParagraph={8} p={2} />,
    date: new Date("2023-09-19").toISOString().substring(0, 10),
    images: [
      "/Images/activities/activity1/1.jpg",
      "/Images/activities/activity1/2.jpg",
      "/Images/activities/activity1/3.jpg",
      "/Images/activities/activity1/4.jpg",
    ],
  },
  {
    id: 8,
    title: "Activity 8",
    content: <LoremIpsum avgSentencesPerParagraph={4} />,
    details: <LoremIpsum avgSentencesPerParagraph={8} p={2} />,
    date: new Date("2023-09-19").toISOString().substring(0, 10),
    images: [
      "/Images/activities/activity1/1.jpg",
      "/Images/activities/activity1/2.jpg",
      "/Images/activities/activity1/3.jpg",
      "/Images/activities/activity1/4.jpg",
    ],
  },
];

const ActivitiesPage = () => {
  const theme = useTheme();
  const [flippedCards, setFlippedCards] = useState([]);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [activiyData , setActivityData] = useState([]);

  const fetchNotification = async () => {
    try{
      const resData = await axios.get(`${process.env.REACT_APP_API_URI}/activity/fetch-activity`);
      setActivityData(resData.data.data);
      console.log(resData.data.data)
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  const fetchFeedback = async () => {
    try{
      const res = axios.get(`${process.env.REACT_APP_API_URI}/userDashboard/admin/fetch-user-feedback`)
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=> {
    fetchNotification();
  },[])

  const handleHoverIn = (id) => {
    setHoveredCard(id);
  };

  const handleHoverOut = () => {
    setHoveredCard(null);
  };

  const handleCardClick = (id) => {
    setFlippedCards((prevFlippedCards) => {
      if (prevFlippedCards.includes(id)) {
        return prevFlippedCards.filter((cardId) => cardId !== id);
      } else {
        return [...prevFlippedCards, id];
      }
    });
  };

  const isCardFlipped = (id) => flippedCards.includes(id);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "2% 2.3%" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "700", color: "#121843" }}
        gutterBottom
      >
        Activities Tab
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Grid container spacing={1}>
          {activiyData?.map((activity, index) => (
            <Grid key={activity.id} item xs={12} sm={12} md={6} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: index % 2 === 0 ? "column" : "column-reverse",
                  [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                  },
                }}
                gap={1}
              >
                <Link to={`/activities/${activity._id}`}>
                  <Card
                    style={{
                      flex: "0 0 calc(25% - 16px)",
                      backgroundColor: "#e8f0fb",
                      border: "solid 1px #74787e",
                      borderRadius: "0",
                      maxHeight: "300px",
                      height: "100%",
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => handleHoverIn(activity.id)}
                    onMouseLeave={handleHoverOut}
                  >
                    <Slider
                      {...sliderSettings}
                      sx={{ minHeight: "300px", height: "100%" }}
                    >
                      {activities[0].images.map((image, index) => (
                        <div
                          key={index}
                          style={{ minHeight: "300px", height: "100%" }}
                        >
                          <img
                            src={image}
                            alt={`Slide ${index}`}
                            style={{
                              minHeight: "300px",
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                              display: "block",
                              position: "relative",
                              opacity:
                                hoveredCard === activity.id ? "0.6" : "1",
                              transition: "opacity 0.3s ease-in-out",
                            }}
                          />
                        </div>
                      ))}
                    </Slider>
                    {hoveredCard === activity.id && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                          color: "#ffffff", // Set your desired text color
                          fontSize: "20px", // Set your desired font size
                          fontWeight: "bold", // Set your desired font weight
                        }}
                      >
                        Click to open
                      </div>
                    )}
                  </Card>
                </Link>
                <Card
                  id={activity.id}
                  style={{
                    flex: "0 0 calc(25% - 16px)", // Each card takes 25% of the container width with some margin
                    backgroundColor: "#e8f0fb",
                    border: "solid 1px #74787e",
                    borderRadius: "0",
                    transform: isCardFlipped(activity._id)
                      ? "rotateY(180deg)"
                      : "rotateY(0)",
                    transition: "transform 0.6s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(activity._id)}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1",
                      width: "100%",
                      height: "300px",
                      transform: isCardFlipped(activity._id)
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                  >
                    {isCardFlipped(activity._id) ? (
                      <Box
                        sx={{
                          padding: "0px 10px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="h5"
                          component="div"
                          color="#121843"
                        >
                          {activity.title}
                        </Typography>
                        <Typography sx={{ paddingTop: "5px" }} variant="body2">
                          {activity.description}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          padding: "0px 10px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="#74787e"
                          sx={{ fontWeight: "700" }}
                        >
                          {activity?.from_date?.split('T')[0]}
                        </Typography>
                        <Typography
                          variant="h4"
                          component="div"
                          color="#121843"
                        >
                          {activity.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "700" }}
                          color="#74787e"
                        >
                          Read more.....
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ActivitiesPage;
