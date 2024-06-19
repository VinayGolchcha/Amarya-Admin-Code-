import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor : "white",
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius : "10px",
  p: 4,
};

export default function ConfirmDelete({open , handleClose , handleIncomeDelete , id}) {
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center" sx={{padding : "20px" , color : "black"}}>
            Are you sure want to delete
          </Typography>
          <Box sx={{display : "flex" , justifyContent : "center"}}>
            <Button variant='contained' color='error' onClick={() => handleIncomeDelete(id)} >
                Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
