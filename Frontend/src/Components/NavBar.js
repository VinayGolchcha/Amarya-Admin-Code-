import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Avatar, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { List, ListItem } from "@mui/material";
import Popper from "@mui/material/Popper";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import NotificationPopUp from "./NotificationPopUp";
import { useAuth } from "./AuthContext";
import StickyNotes from "./StickyNotes";
import stringSimilarity from "string-similarity";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  outline: "1px solid",
  outlineColor: "#b4b4b4",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fafafa",
  "&:hover": {
    backgroundColor: "#fafafa",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    width: "50%", // Adjust the width as needed
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(0em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "28ch",
    },
  },
}));

const NavBar = ({ handleDrawerToggle }) => {
  const [routes , setRoutes] = React.useState([]);
  const { user, profilePhoto, setActiveItem } = useAuth();
  React.useEffect(() => {
    if(user?.role === "user"){
      setRoutes([
        "leaves",
        "profile",
        "announcements",
        "activities",
        "dashboard",
        "assets",
        "trainings",
        "policies",
        "worksheet",
      ])
    }else{
      setRoutes([
        "leaves",
        "profile",
        "anouncement",
        "dashboard",
        "assets",
        "trainings",
        "policies",
        "settings",
        "worksheet",
      ])
    }
  },[user])
  // const routes = [
  //   "leaves",
  //   "profile",
  //   "announcements",
  //   "activities",
  //   "dashboard",
  //   "assets",
  //   "trainings",
  //   "policies",
  //   "settings",
  //   "worksheet",
  // ];
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const token = encodeURIComponent(user?.token || ""); //

  const [arrow, updateArrow] = React.useState(false);
  const [stickeyNotesData, setStickeyNotesData] = React.useState([]);

  const [addIcon, setAddIcon] = React.useState(false);
  const [addTask, setAddTask] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchSuggestions, setSearchSuggestions] = React.useState([]);


  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchSuggestions(routes.filter(route => route.includes(query)));
  };

  const handleSearch = (query) => {
    const bestMatch = stringSimilarity.findBestMatch(query.toLowerCase(), routes);
    const closestMatch = bestMatch.bestMatch.target;

    setActiveItem(`${closestMatch}`);
    navigate(`/${closestMatch}`);
    setTimeout(() => {
      setSearchQuery("");// setting the search query after navigating to the page
    }, 400);
    setSearchSuggestions([]);
  };
  const handleGetNotes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/stickynotes/get-user-notes/${user?.user_id}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setStickeyNotesData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  function handleIconClick() {
    setAddIcon(!addIcon);
  }

  function handleAddTask(event) {
    setAddTask(event.target.value);
  }

  const handleDelete = async (id) => {
    const emp_id = id;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/stickynotes/delete-stickynotes/${id}/${user?.user_id}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setStickeyNotesData((prevStickyNotes) =>
        prevStickyNotes.filter((note) => note._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddStickyNote = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/stickynotes/add-stickynotes`,
        {
          emp_id: user?.user_id,
          note: addTask,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setStickeyNotesData((prevStickyNotes) => [
        ...prevStickyNotes,
        response.data.data,
      ]);
      setAddTask("");
      handleGetNotes();
    } catch (error) {
      console.log(error);
    }
  };
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAddStickyNote();
    }
  }
  const [anchorE2, setAnchorE2] = React.useState(null);

  const handleClick = (event) => {
    setAnchorE2(anchorE2 ? null : event.currentTarget);
  };
  React.useEffect(() => {
    handleGetNotes();
  }, []);
  const open = Boolean(anchorE2);
  const id = open ? "simple-popper" : undefined;
  const toggleArrow = () => {
    updateArrow(!arrow);
  };
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
  const handleLogOut = () => {
    logout();
    navigate("/login");
  };
  const handleOutSide = () => {
    setAnchorE2(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderSuggestions = () => {
    if (searchSuggestions.length === 0) {
      return null;
    }
    return (
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          zIndex: 1,
          borderBottomLeftRadius : "10px",
          borderBottomRightRadius:"10px",
          fontFamily : "Poppins"
        }}
      >
        {searchSuggestions.map((suggestion, index) => (
          <Box
            key={index}
            sx={{
              padding: "8px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
            onClick={() => {
              setSearchQuery(suggestion);
              setSearchSuggestions([]);
              handleSearch(suggestion);
            }}
          >
            {suggestion}
          </Box>
        ))}
      </Box>
    );
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      onMouseUp={toggleArrow}
      sx={{ marginTop: "2.5rem" }}
    >
      <MenuItem
        sx={{ color: "#ff5151", fontWeight: "bold" }}
      >
        {user?.user_id}
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/profile");
        }}
        sx={{ color: "#ff5151", fontWeight: "bold" }}
      >
        Visit Profile
      </MenuItem>
      <MenuItem
        onClick={handleLogOut}
        sx={{ color: "#ff5151", fontWeight: "bold" }}
      >
        Log Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
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
          <NotificationPopUp />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <StickyNotes/>
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
          <Avatar
            alt="Cindy Baker"
            src="/avatar.jpg"
            sx={{ width: 24, height: 24, backgroundColor: "#b4b4b4" ,"&:hover" : {
                color : "black"
              }}}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
        
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Search
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#b4b4b4" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setSearchSuggestions(routes)}
              onBlur={() => setTimeout(() => setSearchSuggestions([]), 200)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchQuery);
                }
              }}
            />
            {renderSuggestions()}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ marginRight: 1 ,
                 "&:hover": {
                    backgroundColor: "rgba(0,0,0,0)",
                 },
              }}
            >
              {/* code for Notifications Pop Up */}
              <NotificationPopUp />
            </IconButton>
            {/* code for stickey notes Pop Up*/}
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ marginRight: 1 ,
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0)",
                 },
              }}
            >
              <StickyNotes/>
            </IconButton>
            {user && ( // Conditional rendering for user profile information
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  sx={{ marginRight: -1 }}
                >
                  <Avatar
                    alt={user?.username}
                    src={profilePhoto} //src={profilePhoto || user?.profile_picture}
                  />
                </IconButton>
                <IconButton
                  disableRipple
                  onMouseDown={handleProfileMenuOpen}
                  onMouseUp={toggleArrow}
                  size="small"
                  color="inherit"
                  sx={{ marginRight: 1 }}
                >
                  <div>
                    <Typography sx={{ display: "flex" }}>
                      {user.username}
                      {arrow ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Typography>
                  </div>
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
            position: "absolute",
            bottom: "0",
            left: "46px", // Set the left margin
            width: "calc(100% - 20px)", // Adjust the width to include the left margin
            borderBottom: "0.1px solid #f1f1f1",
          }}
        />
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default NavBar;
