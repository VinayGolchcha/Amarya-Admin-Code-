import AttendencePieChart from './AttendencePieChart';
import EmployeeBarChart from './EmployeeBarChart';
import '../Components/Calendar.css'
import AttendenceTable from './AttendenceTable';

export default function AttendenceHomePage() {
    return <div style={{ margin: "20px 0px" }}>
        <div className='flex-to-display'>
            <AttendencePieChart />
            <EmployeeBarChart />
        </div>
        <div style={{ margin: "20px 0px 0px 0px" }}>
            <AttendenceTable />
        </div>
    </div>
}