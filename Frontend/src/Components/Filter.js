import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';



const Filter = ({handleSelect}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value) => {
    // Handle menu item click logic here

    // Close the m
    setAnchorEl(null);
  };

  const handleClose = () => {
    // Close the menu
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleMenuClick}>
      <FilterAltIcon sx={{color: "#ffffff", fontFamily: "Poppins"}} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect('All') }>All</MenuItem>
        <MenuItem onClick={() => handleSelect('Pending') }>Pending</MenuItem>
        <MenuItem onClick={() => handleSelect('In Progress') }>In Progress</MenuItem>
        <MenuItem onClick={() => handleSelect('Completed') }>Completed</MenuItem>
      </Menu>
      </>
  );
};

export default Filter;