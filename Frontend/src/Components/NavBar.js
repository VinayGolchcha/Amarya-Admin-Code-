import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { Avatar, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    outline: '1px solid',
    outlineColor: '#b4b4b4',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fafafa',
    '&:hover': {
        backgroundColor: '#fafafa',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        width: '50%',  // Adjust the width as needed
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(0em + ${theme.spacing(2)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '28ch',
        },
    },
}));



const NavBar = ({ handleDrawerToggle }) => {
    const [arrow, updateArrow] = React.useState(false);
    const toggleArrow = () => {
        updateArrow(!arrow);
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onMouseUp={toggleArrow}
            sx={{ marginTop: '2.5rem' }}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {/* <AccountCircle /> */}
                    <Avatar alt="Cindy Baker" src="/avatar.jpg" sx={{ width: 24, height: 24, backgroundColor: '#262626' }} />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Search sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: '#b4b4b4' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            sx={{ marginRight: 1 }}
                        >
                            <Badge badgeContent={1} color="error">
                                <NotificationsIcon sx={{ color: '#b4b4b4' }} />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{ marginRight: 1 }}>
                            <Badge badgeContent={0} color="error">
                                {/* <MailIcon /> */}
                                <TextsmsIcon sx={{ color: '#b4b4b4' }} />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{ marginRight: 1 }}>
                            <Badge badgeContent={0} color="error">
                                <Avatar sx={{}} alt="Cindy Baker" src="/avatar.jpg" />
                            </Badge>
                        </IconButton>
                        <IconButton disableRipple onMouseDown={handleProfileMenuOpen} onMouseUp={toggleArrow} size="small" color="inherit" sx={{ marginRight: 1 }}>
                            <div>
                                <Typography sx={{ display: 'flex' }}>Sanjana Jain
                                    {arrow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </Typography>

                            </div>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '46px', // Set the left margin
                        width: 'calc(100% - 20px)', // Adjust the width to include the left margin
                        borderBottom: '0.1px solid #f1f1f1',
                    }}
                />
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

export default NavBar;