import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function EmployeeAttendencePieChart() {
    return (
        <div style={{ width: '50%', border: '1px solid black', borderRadius: '10px', display: 'flex', justifyContent: 'flex-start' }}>
            <PieChart
                container={{
                    style: {
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '100%',
                    },
                }}
                colors={['rgb(110, 167, 208)', 'rgb(0, 120, 206)', 'rgb(0, 98, 169)', 'rgb(184, 208, 236)']}
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'Present' },
                            { id: 1, value: 15, label: 'Abscent' },
                            { id: 2, value: 15, label: 'Work From Home' },
                            { id: 3, value: 15, label: 'Leaves' },
                        ],
                    },
                ]}
                width={500}
                height={200}
            /></div>
    );
}
