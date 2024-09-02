import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AttendenceHomePage from './AttendenceHomePage';
import { Typography } from '@mui/material';

const Attendence = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return <div>
        <Box style={{ margin: "20px 20px 20px 20px" , width:"100%" }}>
            <Typography
                variant="h4"
                sx={{
                    font: {
                        lg: "normal normal 300 22px/35px Poppins",
                        md: "normal normal 300 22px/35px Poppins",
                        sm: "normal normal 300 20px/30px Poppins",
                        xs: "normal normal 300 22px/30px Poppins",
                    },
                }}
            >
                Employees Attendance
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Home" {...a11yProps(0)} />
                    <Tab label="Camera Feeds" {...a11yProps(1)} />
                    <Tab label="Reports" {...a11yProps(2)} />
                    <Tab label="Unindentified People" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <AttendenceHomePage />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Camera Feeds
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Reports
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Unindentified People
            </CustomTabPanel>
        </Box>
    </div>
}

export default Attendence