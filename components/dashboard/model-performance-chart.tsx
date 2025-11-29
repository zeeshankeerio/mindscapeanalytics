"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      displayColors: false,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y}%`
        }
      }
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
  },
}

const initialData: ChartData<"line"> = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Model Accuracy",
      data: [95.2, 96.5, 97.1, 97.8, 98.2, 98.5, 98.8],
      borderColor: "rgb(168, 85, 247)",
      backgroundColor: "rgba(168, 85, 247, 0.1)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgb(168, 85, 247)",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: "Training Progress",
      data: [85, 88, 90, 92, 94, 96, 98],
      borderColor: "rgb(236, 72, 153)",
      backgroundColor: "rgba(236, 72, 153, 0.1)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgb(236, 72, 153)",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}

export function ModelPerformanceChart() {
  const chartRef = useRef<ChartJS<"line">>(null)
  const [data, setData] = useState<ChartData<"line">>(initialData)

  useEffect(() => {
    const chart = chartRef.current
    if (chart) {
      const ctx = chart.ctx
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height)
      gradient.addColorStop(0, "rgba(168, 85, 247, 0.2)")
      gradient.addColorStop(1, "rgba(168, 85, 247, 0)")
      setData(prevData => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor: index === 0 ? gradient : dataset.backgroundColor,
        })),
      }))
    }
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset, index) => ({
          ...dataset,
          data: dataset.data.map((value) => {
            const numValue = typeof value === 'number' ? value : 0
            if (index === 0) {
              // Model Accuracy
              return Math.min(100, numValue + (Math.random() * 0.1))
            } else {
              // Training Progress
              return Math.min(100, numValue + (Math.random() * 0.5))
            }
          }),
        })),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-[300px] w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg" />
      <Line ref={chartRef} options={options} data={data} />
      <div className="absolute top-2 right-2 flex gap-2">
        <div className="flex items-center gap-1 text-xs">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span className="text-muted-foreground">Model Accuracy</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <div className="w-2 h-2 rounded-full bg-pink-500" />
          <span className="text-muted-foreground">Training Progress</span>
        </div>
      </div>
    </motion.div>
  )
} 