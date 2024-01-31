import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditDeleteIcons(){
    const [showEditMessage, setShowEditMessage] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    return(
    <Box sx={{ display: 'flex' }}>
      <div
        onMouseEnter={() => setShowEditMessage(true)}
        onMouseLeave={() => setShowEditMessage(false)}
      >
        <ModeEditOutlineOutlinedIcon onClick={handleOpen}/>
        {showEditMessage && <span>Edit</span>}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form>
            <div>
                <label style={{margin : '15px'}}>Inv.Id</label>
                <input type='text'/>
            </div>
            <div>
                <label style={{margin : '15px'}}>Inv.Id</label>
                <input type='text'/>
            </div>
            <div>
                <label style={{margin : '15px'}}>Inv.Id</label>
                <input type='text'/>
            </div>
            <div>
                <label style={{margin : '15px'}}>Inv.Id</label>
                <input type='text'/>
            </div>
            <div>
                <label style={{margin : '15px'}}>Inv.Id</label>
                <input type='text'/>
            </div>
            <div>
                <label style={{margin : '15px'}}>Inv.Id</label>
                <input type='text'/>
            </div>
            <div>
                <label style={{margin : '15px'}}>Inv.Id</label>
                <input type='text'/>
            </div>
            <div>
                <label style={{margin : '15px'}}>Inv.Id</label>
                <input type='text'/>
            </div>
            <div>
                <label style={{margin : '15px'}}>Inv.Id</label>
                <input type='text'/>
            </div>
        </form>
        </Box>
      </Modal>
      </div>

      <div
        onMouseEnter={() => setShowDeleteMessage(true)}
        onMouseLeave={() => setShowDeleteMessage(false)}
      >
        <DeleteOutlinedIcon />
        {showDeleteMessage && <span >Delete </span>}
      </div>
    </Box>

    );

}