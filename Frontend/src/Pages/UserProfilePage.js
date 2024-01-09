import { useState, React } from "react";
import { Box, Typography, Card, Grid, Container, TextField, Button, CardContent, CardMedia, Chip } from "@mui/material";
import { useTheme } from '@mui/system';


const UserProfilePage = () => {
    const theme = useTheme();

    const isFormActive = false;

    const [formData, setFormData] = useState({
        firstName: 'Sanjana',
        lastName: 'Jain',
        email: 'abc@mail.com',
        bloodGroup: 'O-',
        contactNumber: '+91-9865321245',
        dob: new Date('1800-01-01').toISOString().substring(0, 10),
        address: 'APR Conlony Jabalpur',
        city: 'Jabalpur',
        state: 'Madhya Pradesh',
        ecpna: 'None',
        ecn: '0',
    });

    const inputFields = [
        { type: "text", label: "First Name", field: "firstName" },
        { type: "text", label: "Last name", field: "lastName" },
        { type: "email", label: "Email", field: "email" },
        { type: "text", label: "Blood Group", field: "bloodGroup" },
        { type: "text", label: "Contact Number", field: "contactNumber" },
        { type: "date", label: "DOB", field: "dob" },
        { type: "text", label: "Address", field: "address" },
        { type: "text", label: "City", field: "city" },
        { type: "text", label: "State", field: "state" },
        { type: "text", label: "Emergency Contact Person Name/Address", field: "ecpna" },
        { type: "text", label: "Emergency Contact Number", field: "ecn" }
    ];

    const cardsData = [
        {
            value: 17,
            info: 'Projects done'
        },
        {
            value: '92%',
            info: 'Performance'
        },
        {
            value: 5,
            info: 'Teams'
        },
        {
            value: 243,
            info: 'Client reports'
        }
    ]

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
    };

    return (
            <Box
                sx={{
                    display: "flex", flexDirection: "row", justifyContent: "space-between", margin: '2% 2.3%',
                    '@media (max-width:960px)': {
                        flexDirection: 'column', // Change direction to column on smaller screens
                    },
                }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch", // Ensure equal height
                    marginTop: "2%",
                }}>
                    <Typography variant="h5" sx={{ fontWeight: '700', color: '#121843' }} gutterBottom>
                    User profile
                </Typography>
                    <Container maxWidth="md" sx={{ padding: '0 !important' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                {inputFields.map((item, index) => (
                                    <Grid item xs={12} md={index === 6 ? 12 : 6} key={index}>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: '600', overflow: 'hidden' }}>
                                            {item.label}
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            type={item.type}
                                            name={item.field}
                                            value={formData[item.field]}
                                            onChange={handleChange}
                                            disabled={!isFormActive}
                                            sx={{
                                                [theme.breakpoints.up('md')]: {
                                                    width: index === 6 ? '90%' : '80%'
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderWidth: '2px',
                                                    borderColor: '#b3b3b3',
                                                },
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            {isFormActive &&
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            }
                        </form>
                    </Container>
                </Box>
                <Box sx={{
                    flexGrow: '1', [theme.breakpoints.up('lg')]: {
                        maxWidth: '30%'
                    },
                    [theme.breakpoints.down('md')]: {
                        marginTop: '2rem'
                    },
                }}>
                    <Container maxWidth="md" sx={{ backgroundColor: '#777492', borderRadius: '20px', height: '100%' }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'space-around', marginTop: '2%', padding: '2%', height: '100%' }}>

                            <Card elevation={3} sx={{ width: '100%', height: 'auto', marginBottom: '2%', borderRadius: '20px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                    <CardContent >
                                        <div style={{ fontWeight: '900' }}>
                                            <Typography variant="button" color='#79838b'>
                                                Node Js Developer (TL)
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="caption" color='#b8c5d0'>
                                                Type
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography color='#79838b'>
                                                Senior Employee
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="caption" color='#b8c5d0'>
                                                Joined
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography color='#79838b'>
                                                Sep 2018
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="caption" color='#b8c5d0'>
                                                Experience
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography color='#79838b'>
                                                4 Years
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image="/Images/profile.jpg"
                                        alt="green iguana"
                                        sx={{
                                            objectFit: 'cover',
                                            objectPosition: 'center center',
                                            borderRadius: '20px',
                                            margin: '0.5rem',
                                            maxWidth: '40%'
                                        }}
                                    />
                                </Box>

                            </Card>
                            <box>
                                <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>

                                    <Chip label="Work" sx={{ backgroundColor: '#4bc9fe', color: 'white', fontWeight: "700", marginBottom: '0' }} />
                                </Box>
                                <Grid container spacing={2} sx={{ display: 'flex' }}>
                                    {cardsData.map((item) => (
                                        <Grid item xs={12} sm={6} key={item.info} sx={{ display: 'flex' }}>
                                            <Card elevation={2} sx={{ borderRadius: '20px', flex: 1, flexDirection: 'column', textAlign: 'center' }}>
                                                <CardContent>
                                                    <Typography sx={{
                                                        fontSize: '3vw',

                                                    }} gutterBottom color="#6e7880">
                                                        {item.value}
                                                    </Typography>
                                                    <Typography variant="body2" color="#9fadb8">
                                                        {item.info}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </box>
                        </Box>
                    </Container>
                </Box>
            </Box>
    )
}

export default UserProfilePage;