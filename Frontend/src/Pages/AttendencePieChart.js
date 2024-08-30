import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function AttendencePieChart() {
    return (
        <div style={{ width: '45%' }}>
            <PieChart
                colors={['rgb(72, 83, 174)', 'rgb(194, 200, 242)']}
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'Employees Present' },
                            { value: 15, label: 'Employees Abscent' },
                        ],
                    },
                ]}
                width={500}
                height={200}
            /></div>
    );
}
