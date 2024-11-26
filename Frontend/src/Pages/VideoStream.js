import React, { useState } from "react";
import "../Components/Calendar.css";
import ReactPlayer from "react-player";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const VideoStream = ({isCameraActive}) => {
  const videoSrc = "http://localhost:3001/hls/stream.m3u8"; // HLS playlist URL
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      {isCameraActive ? (
        <ReactPlayer
          url={videoSrc}
          playing={isPlaying}
          muted
          controls
          width="100%"
          height="auto"
          onPlay={handlePlay}
          onPause={handlePause}
          config={{
            file: {
              attributes: {
                autoPlay: true,
              },
            },
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "500px", // Adjust height as needed
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "1.5rem",
          }}
        >
          <VideocamOffIcon style={{ fontSize: "5rem", color: "#fff" }} />
          <span style={{ marginLeft: "10px" }}>Camera Off</span>
        </div>
      )}
    </div>
  );
};

export default VideoStream;
