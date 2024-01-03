import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
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
    // transform: `rotate(${expand ? '180deg' : '0deg'})`,
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
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like
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
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
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
                    <div>
                        <IconButton aria-label="thumbsup" sx={{ marginRight: "1rem" }}>
                            <ThumbUpOutlinedIcon />
                        </IconButton>
                        <IconButton aria-label='chat'>

                            <ChatOutlinedIcon />
                        </IconButton>
                    </div>
                </div>
            </Card>

    )
}

export default CardComponenet;