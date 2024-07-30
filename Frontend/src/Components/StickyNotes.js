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

export default function StickyNotes(){
    const { logout } = useAuth();
  const { user, profilePhoto, setActiveItem } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const token = encodeURIComponent(user?.token || ""); //

  const [arrow, updateArrow] = React.useState(false);
  const [stickeyNotesData, setStickeyNotesData] = React.useState([]);

  const [addIcon, setAddIcon] = React.useState(false);
  const [addTask, setAddTask] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    // Navigate to the page based on the search query
    setActiveItem(`${searchQuery}`);
    navigate(`/${searchQuery}`);
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

    return(
        <div>
        {/* <button aria-describedby={id} type="button" onClick={handleClick}>
                            Toggle Popper
                        </button> */}
        <Badge badgeContent={0} color="error">
          {/* <MailIcon /> */}
          <TextsmsIcon
            sx={{ color: "#b4b4b4",  "&:hover" : {
              color : "black"
            } }}
            aria-describedby={id}
            onClick={handleClick}
          />
        </Badge>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorE2}
          sx={{ marginTop: "20px", position: "relative" }}
          placement="bottom-start"
        >
          <Box
            sx={{
              bgcolor: "#FFEBEB",
              position: "relative",
              top: "25px",
            }}
          >
            <Box
              sx={{
                padding: addIcon ? "2px" : "8px",
                height: "64px",
                width: "380px",
                border: "1px solid #80808057",
                borderRadius: "4px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {!addIcon ? (
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    fontFamily: "Lato",
                  }}
                >
                  Add your task here…{" "}
                  <Box>
                    {" "}
                    <AddIcon onClick={handleIconClick} />
                  </Box>
                </Typography>
              ) : (
                <TextField
                  sx={{
                    width: "100%",
                    height: "100%",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused": {
                        borderColor: "transparent", // Set the border color to transparent when focused
                      },
                    },
                  }}
                  value={addTask}
                  onChange={handleAddTask}
                  onKeyDown={handleKeyDown}
                />
              )}
            </Box>
            {stickeyNotesData?.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    p: 1,
                    width: "380px",
                    border: "1px solid #80808057",
                    height: "64px",
                    borderRadius: "4px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      fontFamily: "Lato",
                    }}
                  >
                    {item.note}{" "}
                    <Box>
                      <CloseIcon
                        onClick={() => handleDelete(item._id)}
                      />
                    </Box>
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Popper>
      </div>
    )
}