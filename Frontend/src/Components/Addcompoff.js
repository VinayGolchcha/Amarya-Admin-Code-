import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Grid from "@mui/material/Grid";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor : "white",
  "&.MuiModal-backdrop" : {
    backgroundColor : "#rgb(233, 235, 247)"
  },
  width: {lg : 400 , md : 400 , sm : 400 , xs : 350},
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius : "10px",
  p: 2,
  pb:4
};

// const style = {
//   flexGrow: "1",
//   display: "flex",
//   justifyContent: "center",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   padding: "25px",
//   fontFamily: "Poppins",
//   border: "1px solid #FFFFFF",
//   borderRadius: "16px",
//   backgroundColor: "rgb(233, 235, 247)",
//   width: { lg: "55%", md: "45%", sm: "50%", xs: "80%" },
//   padding: { lg: "55px", md: "45px", sm: "30px", xs: "25px" },
// };
const inputControl = {

  borderRadius: "4px",
  height: "31px",
  width: "100%",
  padding: "5px",
  fontWeight: "500",
  margin: "2px 0px",
  color : "black"
};
const labelStyle = {
  fontWeight: "600",
  fontSize: { lg: "1rem", md: "1rem", sm: "1rem", xs: "0.9rem" },
  color: "rgb(120, 120, 122)",
};


export default function Addcompoff({open , handleClose ,id , getUserLeaves}) {
    const [count , setCount] = React.useState(0);
    const [isLoading , setIsLoading] = React.useState(false);
    const { encryptionKey} = useAuth();
    const [error, setError] = React.useState("");
 
    const handleAddCompOff = async () => {
          try {
            setIsLoading(true);
    
            const response = await axios.post(
              // `${process.env.REACT_APP_BASE_URL}/api/v1/leave/get-all-leave-count/AMEMP010`
              `${process.env.REACT_APP_API_URI}/leave/admin/add-compensatory-leave`,{
                emp_id : id,
                count : count
              },
              {
                headers: {
                  "x-encryption-key" : encryptionKey
                },
              },
              // "https://localhost:4000/api/v1/training/request-new-training"
            );
            if(response.status===200){
                handleClose()
                toast.success("Leave added successfully");
                getUserLeaves(id)
            }
            setIsLoading(false);
          } catch (error) {
            setError(error);
    
            setIsLoading(false);
            if(error?.response?.message){
              toast.error(error?.response?.message);
            }
            console.log(error);
          }
        };
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography textAlign="end" sx={{cursor : "pointer"}} onClick={handleClose}><CloseIcon/></Typography>
          <Typography sx={{
            display : "flex",
            justifyContent : "center",
            padding : "10px 0px",
            fontSize: { lg: "1rem", md: "1rem", sm: "1rem", xs: "0.9rem" },
            fontWeight: "600",
          }}>
            Add compensatory Leave
          </Typography>

            <label htmlFor="count" style={labelStyle}>Leave Count</label>
            <input type="number" id="count" style={inputControl} onChange={(e) => {
                if(e.target.value<0){
                    toast.error("Count cannot be negative");
                }else{
                    setCount(e.target.value)
                }
            }} />

          <Box sx={{display : "flex" , justifyContent : "center"}}>
            <Button variant='contained' color='error' onClick={() => handleAddCompOff()} disabled={isLoading} >
                Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
