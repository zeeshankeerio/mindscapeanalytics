"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options: ChartOptions<"bar"> = {
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

const initialData: ChartData<"bar"> = {
  labels: ["CPU", "Memory", "Storage", "Network", "GPU"],
  datasets: [
    {
      label: "Usage",
      data: [65, 75, 45, 85, 60],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(239, 68, 68, 0.8)",
        "rgba(139, 92, 246, 0.8)",
      ],
      borderColor: [
        "rgb(59, 130, 246)",
        "rgb(16, 185, 129)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
        "rgb(139, 92, 246)",
      ],
      borderWidth: 1,
      borderRadius: 8,
      barThickness: 40,
    },
  ],
}

export function SystemHealthChart() {
  const chartRef = useRef<ChartJS<"bar">>(null)
  const [data, setData] = useState<ChartData<"bar">>(initialData)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        datasets: prevData.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map((value) => {
            const numValue = typeof value === 'number' ? value : 0
            const change = (Math.random() - 0.5) * 10
            return Math.max(0, Math.min(100, numValue + change))
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg" />
      <Bar ref={chartRef} options={options} data={data} />
      <div className="absolute top-2 right-2 flex flex-wrap gap-2">
        {data.labels.map((label, index) => (
          <div key={label} className="flex items-center gap-1 text-xs">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index] as string,
              }}
            />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
} 