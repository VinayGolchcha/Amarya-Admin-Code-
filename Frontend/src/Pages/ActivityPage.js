import { React, useState } from "react";
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import CardComponenet from "../Components/AnnouncementCard";
import { useTheme } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { activities } from "./ActivitiesPage";
// import Carousel from "./Carousel";

const ActivityPage = () => {
    const { activityId } = useParams();
    const activity = activities.find(obj => obj.id === parseInt(activityId));
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <ArrowBackIosIcon color="black" fontSize="28px" sx={{fontSize:'28px'}} />,
        prevArrow: <ArrowForwardIosIcon />,
    };
    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", margin: '4% 2.3%' }}>
            <Typography variant="h4" sx={{ color: '#ff5151', textAlign: 'center' }} gutterBottom>
                {activity.title}
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center" sx={{ width: '100%' }}>
                <Card
                    style={{
                        backgroundColor: '#e8f0fb',
                        border: 'solid 1px #74787e',
                        borderRadius: '15px',
                        height:'50vh',
                        width: '90%',
                        position:'relative'
                    }}
                >
                    <Slider {...sliderSettings} sx={{maxHeight:'fit-content'}}>
                        {activity.images.map((image, index) => (
                            <div key={index} style={{maxHeight:'fit-content'}}>
                                <img
                                    src={image}
                                    alt={`Slide ${index}`}
                                    style={{
                                        maxHeight:'50vh',
                                        width:'100%',
                                        objectFit: 'cover',
                                        overflow:'hidden'
                                    }}

                                />
                            </div>
                        ))}
                    </Slider>
                </Card>
            </Box>
            {/* <Carousel images={activity.images}/> */}
            <Box sx={{marginTop:'30px', textAlign:'center'}}>
                <Typography variant="h6">
                    {activity.details}
                </Typography>
            </Box>
        </Box>
    )
}

export default ActivityPage;