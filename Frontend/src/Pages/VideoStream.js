import React from "react";
import ReactPlayer from "react-player";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const VideoStream = ({ isCameraActive }) => {
  const videoSrc = "http://localhost:3001/hls/stream.m3u8";

  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      {isCameraActive ? (
        <ReactPlayer
          url={videoSrc}
          playing
          muted
          controls
          width="100%"
          height="auto"
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            background: "#000",
          }}
        >
          <VideocamOffIcon style={{ fontSize: 50, color: "#fff" }} />
        </div>
      )}
    </div>
  );
};

export default VideoStream;
