'use client'

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJs.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ accounts}: DoughnutChartProps) => {
    const accountName = accounts?.map((acc) => acc.name);
    const balances = accounts?.map((acc) => acc.currentBalance)

    const data = {
        datasets: [{
            label: "Banks",
            data: balances,
            backgroundColor: [
                '#0747b6', '#2265d8','#2f91fa'
            ]

        }],
        label: accountName
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