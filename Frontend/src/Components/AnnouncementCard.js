import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CardComponenet = (props) =>{
    console.log(props)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return(
        <Card sx={{ borderRadius: '20px', backgroundColor: '#ffdcdc', margin:'0.5rem 0'}}>

                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: '700', marginBottom: '10px' }}>
                        {props.data.heading}
                    </Typography>
                    <Typography variant="h6" color="black" sx={{}}>
                        {props.data.content}
                    </Typography>
                    <Collapse in={!expanded}>
                        <Typography >
                            ....
                        </Typography>
                    </Collapse>
                </CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="h6">
                            {props.data.fullContent}
                        </Typography>
                    </CardContent>
                </Collapse>
                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', padding: '5px 16px', color: '#818181' }}>
                    <div>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label={expanded ? 'Read less' : 'Read more'}
                            sx={{ fontSize: '1rem' }}
                        >
                            {expanded ? 'Read less' : 'Read more'}
                        </ExpandMore>
                    </div>
                    {/* <div>
                        <IconButton aria-label="thumbsup" sx={{ marginRight: "1rem" }}>
                            <ThumbUpOutlinedIcon />
                        </IconButton>
                        <IconButton aria-label='chat'>

                            <ChatOutlinedIcon />
                        </IconButton>
                    </div> */}
                </div>
            </Card>

    )
}

export default CardComponenet;