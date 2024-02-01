import TextsmsIcon from "@mui/icons-material/Textsms";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { List, ListItem } from "@mui/material";
import Popper from "@mui/material/Popper";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";

export default function StickeyNotes() {
  const [addIcon, setAddIcon] = React.useState(false);
  const [addTask, setAddTask] = React.useState("");
  const [stickeyNotes, setStickeyNotes] = React.useState([
    "Conduct an inventory check of all IT assets, including hardware and software licenses.",
    "Perform a regular backup of important data and verify its integrity.",
  ]);
  const [anchorE2, setAnchorE2] = React.useState(null);

  const handleClick = (event) => {
    setAnchorE2(anchorE2 ? null : event.currentTarget);
  };
  const open = Boolean(anchorE2);
  const id = open ? "simple-popper" : undefined;

  function handleIconClick() {
    setAddIcon(!addIcon);
  }

  function handleAddTask(event) {
    setAddTask(event.target.value);
  }

  function handleDelete(index) {
    setStickeyNotes((prevStickyNotes) => {
      const newStickyNotes = [...prevStickyNotes];
      newStickyNotes.splice(index, 1);
      return newStickyNotes;
    });
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setStickeyNotes((prevStickyNotes) => [...prevStickyNotes, addTask]);
      setAddTask("");
    }
  }

  return (
    <div>
      {/* <button aria-describedby={id} type="button" onClick={handleClick}>
                                    Toggle Popper
                                </button> */}
      <Badge badgeContent={0} color="error">
        {/* <MailIcon /> */}
        <TextsmsIcon
          sx={{ color: "#b4b4b4" }}
          aria-describedby={id}
          onClick={handleClick}
        />
      </Badge>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorE2}
        sx={{
          marginTop: "20px",
          position: "relative",
          width: "100%", // Set width to 100% for full-width on all screen sizes
          maxWidth: {
            xs: "75%", // For extra small screens
            sm: "40%", // For small screens
            md: "40%", // For medium screens
            lg: "25%", // For large screens
          },
        }}
        placement="bottom-start"
      >
        <Box sx={{ bgcolor: "#FFEBEB", position: "relative", top: "25px", width: "100%" }}>
          <Box
            sx={{
              padding: addIcon ? "2px" : "8px",
              height: "64px",
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
                Add your task here…
                <Box>
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
                      borderColor: "transparent",
                    },
                  },
                }}
                value={addTask}
                onChange={handleAddTask}
                onKeyDown={handleKeyDown}
              />
            )}
          </Box>
          {stickeyNotes.map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 1,
                width: "100%",
                border: "1px solid #80808057",
                height: "auto",
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
                {item}
                <Box>
                  <CloseIcon onClick={() => handleDelete(index)} />
                </Box>
              </Typography>
            </Box>
          ))}
        </Box>
      </Popper>    </div>
  );
}
