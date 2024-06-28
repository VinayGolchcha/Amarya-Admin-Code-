import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardComponent = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        borderRadius: "20px",
        backgroundColor: "#ffdcdc",
        margin: "0.5rem 0",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "700", marginBottom: "10px" }}
        >
          {props.data.title}
        </Typography>
        <Typography variant="h6" color="black">
          {expanded ? props.data.description : props.data.description.slice(0, 100) + (props.data.description.length > 100 ? '...' : '')}
        </Typography>
      </CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 16px",
          color: "#818181",
        }}
      >
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label={expanded ? "Read less" : "Read more"}
          sx={{ fontSize: "1rem" }}
        >
          {expanded ? "Read less" : "Read more"}
        </ExpandMore>
      </div>
    </Card>
  );
};

export default CardComponent;
