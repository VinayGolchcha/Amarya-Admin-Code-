import AttendencePieChart from './AttendencePieChart';
import EmployeeBarChart from './EmployeeBarChart';
import '../Components/Calendar.css'
import AttendenceTable from './AttendenceTable';
import { Grid } from '@mui/material';

export default function AttendenceHomePage() {
    return <div style={{ margin: "20px 0px" }}>
        <div className='flex-to-display'>
            <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <AttendencePieChart />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <EmployeeBarChart />
                </Grid>
            </Grid>
        </div>
        <div style={{ margin: "20px 0px 0px 0px" }}>
            <AttendenceTable />
        </div>
    </div>
}