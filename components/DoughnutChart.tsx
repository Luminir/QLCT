'use client'

import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  
    // 1 mẫu dataset
    const data = {
        datasets: [
            {
                label: "Banks",
                data: [1250, 2500, 3750], // số tiền của các ngân hàng mà bạn connect, ngân hàng 1, 2, 3 tương ứng với 1250, 2500, 3750
                backgroundColor: ['#006c00','#00bb00','#1eff1e'],
            }
        ],
        labels: ['Tài khoản 1', 'Tài khoản 2', 'Tài khoản 3']
    }
    return (
    <Doughnut data={data} 
    options={{
        cutout: '50%',
        plugins: {
            legend: {
                display: false
            }
        }
    }}/>)
}

export default DoughnutChart