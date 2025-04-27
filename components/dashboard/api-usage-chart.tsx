"use client"

import { useEffect, useRef, useState, useMemo } from "react"
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
          return `${context.dataset.label}: ${context.parsed.y}`
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
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "API Requests",
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgb(59, 130, 246)",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: "Error Rate",
      data: [0.5, 0.3, 0.4, 0.2, 0.3, 0.1, 0.2],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgb(239, 68, 68)",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}

interface ApiUsageChartProps {
  data?: {
    labels: string[];
    datasets: {
      name: string;
      data: number[];
    }[];
    total: number;
  }
}

export function ApiUsageChart({ data: externalData }: ApiUsageChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null)
  
  // Transform external data to Chart.js format if provided
  const transformedData = useMemo(() => {
    if (!externalData) return initialData;
    
    return {
      labels: externalData.labels,
      datasets: externalData.datasets.map((dataset, index) => {
        const colors = [
          "rgb(59, 130, 246)", // blue
          "rgb(16, 185, 129)", // green
          "rgb(245, 158, 11)", // amber
          "rgb(239, 68, 68)"   // red
        ];
        
        return {
          label: dataset.name,
          data: dataset.data,
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length].replace("rgb", "rgba").replace(")", ", 0.1)"),
          fill: true,
          tension: 0.4,
          pointBackgroundColor: colors[index % colors.length],
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        };
      })
    };
  }, [externalData]);
  
  const [data, setData] = useState<ChartData<"line">>(transformedData);

  // Memoize options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => options, []);

  useEffect(() => {
    const chart = chartRef.current
    if (chart) {
      const ctx = chart.ctx
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height)
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)")
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)")
      
      // Only update the first dataset with the gradient
      setData(prevData => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor: index === 0 ? gradient : dataset.backgroundColor,
        })),
      }))
    }
  }, [transformedData])

  // Optimize real-time updates with throttling
  useEffect(() => {
    // Skip realtime updates if external data is provided
    if (externalData) return;
    
    let animationFrameId: number;
    let lastUpdateTime = 0;
    const updateInterval = 5000; // 5 seconds between updates
    
    const updateData = (timestamp: number) => {
      if (timestamp - lastUpdateTime >= updateInterval) {
        lastUpdateTime = timestamp;
        
        setData(prevData => ({
          ...prevData,
          datasets: prevData.datasets.map((dataset, index) => ({
            ...dataset,
            data: dataset.data.map((value, i, arr) => {
              // Handle null or Point object cases
              if (value === null || typeof value !== 'number') {
                return value;
              }
              
              if (index === 0) {
                // API Requests
                return Math.max(0, value + (Math.random() * 1000 - 500))
              } else {
                // Error Rate
                return Math.max(0, Math.min(100, value + (Math.random() * 0.2 - 0.1)))
              }
            }),
          })),
        }));
      }
      
      animationFrameId = requestAnimationFrame(updateData);
    };
    
    animationFrameId = requestAnimationFrame(updateData);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [externalData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-[300px] w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg" />
      <Line ref={chartRef} options={memoizedOptions} data={data} />
      <div className="absolute top-2 right-2 flex gap-2">
        <div className="flex items-center gap-1 text-xs">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-muted-foreground">API Requests</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-muted-foreground">Error Rate</span>
        </div>
      </div>
    </motion.div>
  )
} 