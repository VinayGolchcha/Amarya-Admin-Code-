import React from "react";
import { Box, Card, Typography } from "@mui/material";
import CardComponenet from "../Components/AnnouncementCard";
// import { styled } from '@mui/material/styles';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     marginLeft: 'auto',
//     // transform: `rotate(${expand ? '180deg' : '0deg'})`,
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

const data = [
    {
        heading: "We're Hiring! Node js developer Position Available Now",
        content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
        fullContent: "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
    },
    {
        heading: "We're Hiring! Node js developer Position Available Now222222222",
        content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
        fullContent: "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
    },
    {
        heading: "We're Hiring! Node js developer Position Available Now33333333",
        content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
        fullContent: "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
    },
];
const AnnouncementPage = () => {

    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", margin: '1% 3%' }}>
            <Typography variant="h5" sx={{ fontWeight: '700', color: '#121843' }} gutterBottom>
                Announcement Tab
            </Typography>
            {data.map((item, index) => (
                <CardComponenet data={item} key={index}/>
            ))}

            
        </Box>
    )
}

export default AnnouncementPage;