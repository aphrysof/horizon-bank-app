'use client'

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJs.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ accounts}: DoughnutChartProps) => {

    const data = {
        datasets: [{
            label: "Banks",
            data: [1200, 4500, 5680],
            backgroundColor: [
                '#0747b6', '#2265d8','#2f91fa'
            ]

        }],
        label: [
            "Bank 1", "Bank 2", "Bank 3"
        ]
    }
  return (
    <div className="w-full">
        <Doughnut data={data}
        options={{
            cutout: '60%'
        }}
        />
    </div>
  )
}

export default DoughnutChart