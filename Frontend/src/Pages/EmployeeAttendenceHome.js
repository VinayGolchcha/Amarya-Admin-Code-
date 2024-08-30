import '../Components/Calendar.css'
import EmployeeAttendencePieChart from './EmployeeAttendencePieChart';
import Calendar from '../Components/Calendar';

export default function EmployeeAttendenceHomePage() {
    return <div style={{ margin: "20px 0px" }}>
        
        <div style={{display:'flex'}}>
            <EmployeeAttendencePieChart />
            <div style={{width:'50%', padding:'1rem', border:'1px solid black', borderRadius:'10px'}}>
                <div className='flex-to-display'>
                    <div>Employee Name :</div>
                    <div>Ankit</div>
                </div>
                <div className='flex-to-display'>
                    <div>Employee Id :</div>
                    <div>345674</div>
                </div>
                <div className='flex-to-display'>
                    <div>Number of Working Days :</div>
                    <div>24</div>
                </div>
                <div className='flex-to-display'>
                    <div>Number of Present Days :</div>
                    <div>22</div>
                </div>
                <div className='flex-to-display'>
                    <div>Number of Leaves :</div>
                    <div>8</div>
                </div>
                <div className='flex-to-display'>
                    <div>Number of WFH :</div>
                    <div>6</div>
                </div>
                <div className='flex-to-display'>
                    <div>Number of Abscent :</div>
                    <div>2</div>
                </div>
            </div>
        </div>
        <div style={{ margin: "20px 0px 0px 0px" }}>
            <Calendar />
        </div>
    </div>
}