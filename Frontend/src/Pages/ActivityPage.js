// import { React, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// // import CardComponenet from "../Components/AnnouncementCard";
// import { useTheme } from "@mui/system";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { activities } from "./ActivitiesPage";

// const ActivityPage = () => {
//   const { activityId } = useParams();
//   console.log(activityId);
//   const activity = activities.find((obj) => obj.id === parseInt(activityId));
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     nextArrow: (
//       <ArrowBackIosIcon
//         color="black"
//         fontSize="28px"
//         sx={{ fontSize: "28px" }}
//       />
//     ),
//     prevArrow: <ArrowForwardIosIcon />,
//   };
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", margin: "4% 2.3%" }}>
//       <Typography
//         variant="h4"
//         sx={{ color: "#ff5151", textAlign: "center" }}
//         gutterBottom
//       >
//         {activity?.title}
//       </Typography>
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         justifyContent="center"
//         sx={{ width: "100%" }}
//       >
//         <Card
//           style={{
//             // flex: '0 0 calc(25% - 16px)',
//             backgroundColor: "#e8f0fb",
//             border: "solid 1px #74787e",
//             borderRadius: "15px",
//             // maxHeight: '50vh',
//             height: "50vh",
//             width: "90%",
//             position: "relative",
//           }}
//         >
//           <Slider {...sliderSettings} sx={{ maxHeight: "fit-content" }}>
//             {activity?.images.map((image, index) => (
//               <div key={index} style={{ maxHeight: "fit-content" }}>
//                 <img
//                   src={image}
//                   alt={`Slide ${index}`}
//                   style={{
//                     maxHeight: "50vh",
//                     width: "100%",
//                     // maxHeight: 'max-content',
//                     objectFit: "cover",
//                     overflow: "hidden",
//                   }}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </Card>
//         {activity?.content}
//       </Box>
//     </Box>
//   );
// };

// export default ActivityPage;

import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import CardComponenet from "../Components/AnnouncementCard";
import { useTheme } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { activities } from "./ActivitiesPage";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Components/AuthContext";
export const activity = {
  images: [
    "/Images/activities/activity1/1.jpg",
    "/Images/activities/activity1/2.jpg",
    "/Images/activities/activity1/3.jpg",
    "/Images/activities/activity1/4.jpg",
  ],
}

const ActivityPage = () => {
  const { activityId } = useParams();
  const activity = activities.find((obj) => obj.id === parseInt(activityId));
  const [sliderIndex, setSliderIndex] = useState(0);
  const [activityData , setActivityData] = useState({});
  const [images , setImages] = useState([]);
  const {user} = useAuth();

  const fechActivityById = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/activity/get-activity/${activityId}` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      console.log(res);
      setActivityData(res?.data?.data[0]);
      setImages(res?.data?.data[1]);
    }catch(err){
      console.log(err);
      toast.error(err);
    }
  }

  useEffect(() => {
    fechActivityById()
  },[activityId]);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <ArrowBackIosIcon />,
    prevArrow: <ArrowForwardIosIcon />,
    beforeChange: (current, next) => setSliderIndex(next),
  };

  const goToNextSlide = () => {
    const nextIndex = sliderIndex + 1;
    setSliderIndex(nextIndex >= activity.images.length ? 0 : nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex = sliderIndex - 1;
    setSliderIndex(prevIndex < 0 ? activity.images.length - 1 : prevIndex);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "4% 2.3%" }}>
      <Typography
        variant="h4"
        sx={{ color: "#ff5151", textAlign: "center" }}
        gutterBottom
      >
        {activityData?.title}
      </Typography>
      <Box
        flexWrap="wrap"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Card
          style={{
            backgroundColor: "#e8f0fb",
            border: "solid 1px #74787e",
            borderRadius: "15px",
            height: "50vh",
            width: "90%",
            position: "relative",
          }}
        >
          <Slider
            {...sliderSettings}
            initialSlide={sliderIndex}
            sx={{ maxHeight: "fit-content" }}
          >
            {images?.map((image, index) => (
              <div key={index} style={{ maxHeight: "fit-content" }}>
                <img
                  src={image?.image_url}
                  alt={`Slide ${index}`}
                  style={{
                    maxHeight: "50vh",
                    width: "100%",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                />
              </div>
            ))}
          </Slider>
          <ArrowBackIosIcon
            onClick={goToPrevSlide}
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              cursor: "pointer",
              color: "white",
            }}
          />
          <ArrowForwardIosIcon
            onClick={goToNextSlide}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              cursor: "pointer",
              color: "white",
            }}
          />
        </Card>
        <Box sx={{display : "flex" , justifyContent : "center"}}>
          {activityData?.description}
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityPage;
