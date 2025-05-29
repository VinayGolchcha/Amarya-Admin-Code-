import { Box, FormControl, FormLabel, Grid, MenuItem, Modal, Select, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AddProject({open , handleClose , index , handleInputChange , handleSaveNewProject ,labels , categories}) {
    return (
        <Modal open={open} onClose={handleClose} sx={{
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            overflow : "auto"
        }}>
            <Box
                key={index}
                sx={{
                    borderRadius: "10px",
                    padding: "30px",
                    boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                    margin: "10px 0px",
                    width: "70%",
                    backgroundColor : "white"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "10px",
                        width: "100%"
                    }}
                >
                    <SaveIcon
                        color="action"
                        onClick={() => {
                            handleSaveNewProject(index)       
                        }}
                        sx={{
                            borderRadius: "50px",
                            backgroundColor: "rgb(222, 225, 231)",
                            width: "30px",
                            height: "30px",
                            margin: "0px 2px 50px 10px",
                            padding: "4px",
                            cursor: "pointer",
                        }}
                    />

                </Box>
                <Grid container spacing={4}>
                    {labels?.map((item, i) => 
                        (<Grid item lg={4} md={4} xs={10} key={i}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ color: "black", fontWeight: "600" }}>
                                    {item}
                                </FormLabel>
                                {item === "Start Of The Project" && (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label={'"month", "year"'}
                                            views={["month", "year"]}
                                            value={""}
                                            sx={{
                                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                    borderWidth: "2px",
                                                    borderColor: "#b3b3b3",
                                                    borderRadius: "10px",
                                                },
                                                margin: "10px 0px",
                                            }}
                                            onChange={(date) =>
                                                handleInputChange(index, item, date)
                                            }
                                        />
                                    </LocalizationProvider>
                                )}
                                {item === "End Of The Project" && (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label={'"month", "year"'}
                                            views={["month", "year"]}
                                            value={""}
                                            sx={{
                                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                    borderWidth: "2px",
                                                    borderColor: "#b3b3b3",
                                                    borderRadius: "10px",
                                                },
                                                margin: "10px 0px",
                                            }}
                                            onChange={(date) =>
                                                handleInputChange(index, item, date)
                                            }
                                        />
                                    </LocalizationProvider>
                                )}
                                {item === "Project Status" && (
                                    <Select
                                        onChange={(e) =>
                                            handleInputChange(index, item, e.target.value)
                                        }
                                        sx={{
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderWidth: "2px",
                                                borderColor: "#b3b3b3",
                                                borderRadius: "10px",
                                            },
                                            margin: "10px 0px",
                                        }}
                                    
                                    >
                                        <MenuItem value={"completed"}>
                                            Completed
                                        </MenuItem>
                                        <MenuItem value={"in progress"}>
                                            In Progress
                                        </MenuItem>
                                    </Select>
                                )}
                                {item === "Category" ? (
                                    <Select
                                        onChange={(e) =>
                                            handleInputChange(index, item, e.target.value)
                                        }
                                        sx={{
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderWidth: "2px",
                                                borderColor: "#b3b3b3",
                                                borderRadius: "10px",
                                            },
                                            margin: "10px 0px",
                                        }}
                                        
                                    >
                                        {categories?.map((category) => (
                                            <MenuItem key={category._id} value={category.value}>
                                                {category.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : (
                                    item !== "End Of The Project" &&
                                    item !== "Start Of The Project" &&
                                    item !== "Project Status" && (
                                        <TextField
                                            type="text"
                                            fullWidth
                                            sx={{
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderWidth: "2px",
                                                    borderColor: "#b3b3b3",
                                                    borderRadius: "10px",
                                                },
                                                margin: "10px 0px",
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) =>
                                                handleInputChange(index, item, e.target.value)
                                            }
                                            
                                        />
                                    )
                                )}
                            </FormControl>
                        </Grid>)
                        )}
                </Grid>
            </Box>
        </Modal>
    )
}