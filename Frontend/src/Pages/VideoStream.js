import React from 'react';
import '../Components/Calendar.css'
import ReactPlayer from 'react-player';
import { Box } from '@mui/material';

const VideoStream = () => {
    return (
        // <Box sx={{border:'1px solid white'}}>
            <ReactPlayer
                className='react-player'
                url='https://www.youtube.com/watch?v=yjdQHb2elqI&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=8'
                width='100%'
                height='300px'
                muted
                playing
                controls
            />
        // </Box>
    );
};

export default VideoStream;