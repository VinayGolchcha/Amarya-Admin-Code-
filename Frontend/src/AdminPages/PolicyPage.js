import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
  IconButton,
  FormLabel,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../Components/AuthContext';


export default function PolicyPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileBuffer , setFileBuffer] = useState(null);
  const [file, setFile] = useState([]);
  const [policies , setPolicies] = useState([]);
  const [selectedPolicy , setSelectedPolicy] = useState(null);
  const {user} = useAuth();
  const [policyContents, setPolicyContents] = React.useState('Welcome, Purpose, Human Resource Policy, Equal Employment Policy, Dress code Policy, Attendance Policy, Leave Policy, Learning and Development Policy, Prevention of Sexual Harassment Policy, Employee Separation Policy, Cooperative Social Responsibility Policy, Energizing Work Relation Policy');

  const handleChange = (event) => {
    setPolicyContents(event.target.value);
    
  };

  const handleSave = () => {
    const body = {
      policy_heads : policyContents,
      file : file
    }
    addPolicy(body)
  }
  const addPolicy = async (body)  => {
    try{
      const formData = new FormData();
      Object.keys(body).forEach((key) => {
        formData.append(key , body[key]);
      })
      // file?.forEach((f) => {
      //   formData.append("file" , f);
      // })
      const res = await axios.post(`${process.env.REACT_APP_API_URI}/policy/admin/add-policy` , formData , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      console.log(res);
      toast.success(res?.data?.message);
      fecthPolicies()
    }catch(err){
      console.log(err);
    }
  }
  const fecthPolicies = async () => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/policy/fetch-policy` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      console.log(response);
      setPolicies(response?.data?.data);
      console.log(policies);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=> {
    fecthPolicies()
  },[])

  const convertBase64 = (file) => {
    return new Promise((resolve , reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error)
      };
    });
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const file = event.target.files[0];
      console.log(file);
    const base64 = await convertBase64(file);
    setFileBuffer(base64.toString().split(',')[1]);
      setFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    if(!id){
      alert("please select the file to delete");
      return;
    }else{
    try{
      const res = await axios.delete(`${process.env.REACT_APP_API_URI}/policy/admin/delete-policy/${id}` , {
        headers : {
          "x-access-token" : user?.token
        }
      });
      console.log(res);
      fecthPolicies();
      toast.error(res?.data?.message);
    }catch(err){
      console.log(err);
    }}
  };

  return (
    <Container sx={{marginTop : "5%"}}>
      <ToastContainer/>
     <FormControl fullWidth margin="normal">
      <FormLabel htmlFor="policy-contents" sx={{fontWeight : 700 , color : "black"}}>Add Policy Contents</FormLabel>
      <TextField
        id="policy-contents"
        value={policyContents}
        onChange={handleChange}
        multiline
        rows={4}
        variant="outlined"
        fullWidth
      />
    </FormControl>
      <Grid container spacing={2} alignItems="center">
        <Grid item >
          <IconButton aria-label="upload pdf" component="label" sx={{"&:hover":{
            background:"none"
          }}}>
            <img src='Images/policy/upload-button.png' alt='upload icon' width="25%" />
            <input hidden type="file" onChange={handleFileChange} />
          </IconButton>
          <Typography sx={{fontFamily: "Saira Stencil One", textAlign : "center" , fontSize : "20px"}}>UPLOAD PDF</Typography>
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            disabled
            value={selectedFile ? selectedFile.name : ''}
            label="Upload PDF"
            InputProps={{
              endAdornment: (
                <IconButton color="primary" aria-label="upload pdf" component="label" sx={{display : "flex" , justifyContent : "end"}}>
                  <img src="Images/policy/icons8-attachment-64.png" width = "40%" alt='attachment' />
                  <input hidden type="file" onChange={handleFileChange} />
                </IconButton>
              ),
            }}
          />
          <Box sx={{width : "100%" , textAlign : "center" , padding : "10px"
          }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ background: "#FF5151", color: "#FFFFFF" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box my={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <div aria-label="upload pdf" component="label" style={{display : "flex"  , justifyContent : "center" ,alignItems : "center"}}>
              <img src='Images/policy/delete-button.png' alt='delete icon' width="25%" style={{cursor : "pointer" , marginLeft : "2%"}} onClick={() => handleDelete(selectedPolicy)}/>
            </div>
            <Typography sx={{fontFamily: "Saira Stencil One", textAlign : "center" , fontSize : "20px"}} >DELETE PDF</Typography>
          </Grid>
          <Grid item xs sx={{marginLeft : "1%"}}>
            <FormControl fullWidth>
              <InputLabel id="delete-pdf-label">Delete PDF</InputLabel>
              <Select
                labelId="delete-pdf-label"
                id="delete-pdf"
                label="Delete PDF"
                onChange={(event) => setSelectedPolicy(event.target.value)}
                IconComponent={() => (<img src="Images/policy/dropdown.png" alt="drow down" width = "20px" style={ { marginRight : "4%"}}/>)}
              >
                {policies?.map((item, index) => (
                  <MenuItem key={item?._id} value={item?._id}>
                    {item?.policy_heads.toString().split(",")[0]}...
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        
        </Grid>
      </Box>
    </Container>
  );
}