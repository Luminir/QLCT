'use client'

import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const accountNames = accounts.map((a) => a.name);
    const balances = accounts.map((a) => a.currentBalance);

    // 1 mẫu dataset
    const data = {
        datasets: [
            {
                label: "Banks",
                data: balances, // số tiền của các ngân hàng mà bạn connect, ngân hàng 1, 2, 3 tương ứng với 1250, 2500, 3750
                backgroundColor: ['#006c00','#00bb00','#1eff1e'],
            }
        ],
        // labels: ['Tài khoản 1', 'Tài khoản 2', 'Tài khoản 3']
        labels: accountNames
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