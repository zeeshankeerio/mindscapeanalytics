"use client"

import { useEffect, useRef, useState, useMemo } from "react"
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

// Enhanced option configuration
const createOptions = (isDarkMode = true): ChartOptions<"bar"> => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  animation: {
    duration: 750,
    easing: 'easeOutQuart'
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.95)",
      titleColor: isDarkMode ? "#fff" : "#000",
      bodyColor: isDarkMode ? "#fff" : "#000",
      padding: 12,
      borderColor: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
      borderWidth: 1,
      displayColors: true,
      boxWidth: 10,
      boxHeight: 10,
      boxPadding: 3,
      usePointStyle: true,
      callbacks: {
        title: function(tooltipItems) {
          return `${tooltipItems[0].label} Usage`;
        },
        label: function(context) {
          const value = context.parsed.y;
          let status = "Normal";
          if (value > 80) status = "Critical";
          else if (value > 65) status = "Warning";
          
          return [
            `${context.dataset.label}: ${value.toFixed(1)}%`,
            `Status: ${status}`
          ];
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
        color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        font: {
          weight: 'bold'
        }
      },
    },
    y: {
      grid: {
        color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
      },
      max: 100,
      beginAtZero: true
    },
  },
});

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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const [updateInterval, setUpdateInterval] = useState<number>(3000) // 3 seconds default

  // Memoize options to prevent unnecessary re-renders
  const options = useMemo(() => createOptions(isDarkMode), [isDarkMode])

  // Advanced real-time updates with trend simulation
  useEffect(() => {
    // Keep track of trend directions for each metric
    const trends = new Array(data.datasets[0].data.length).fill(0).map(() => 
      Math.random() > 0.5 ? 1 : -1
    )
    
    const interval = setInterval(() => {
      setData(prevData => {
        // Create a deep copy of previous data to avoid mutating state directly
        const newData = {
          ...prevData,
          datasets: prevData.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: Array.isArray(dataset.backgroundColor) 
              ? [...dataset.backgroundColor] 
              : dataset.backgroundColor,
            borderColor: Array.isArray(dataset.borderColor) 
              ? [...dataset.borderColor] 
              : dataset.borderColor
          }))
        };
        
        // Update each metric with realistic trend behavior
        if (newData.datasets[0] && Array.isArray(newData.datasets[0].data)) {
          newData.datasets[0].data = newData.datasets[0].data.map((value, index) => {
            // Check if we should change trend direction (20% chance)
            if (Math.random() < 0.2) {
              trends[index] *= -1
            }
            
            // Calculate new value with trend
            const numValue = typeof value === 'number' ? value : 0
            const change = (Math.random() * 5) * trends[index]
            const newValue = Math.max(10, Math.min(98, numValue + change))
            
            // Update colors based on values
            const backgroundColor = newData.datasets[0].backgroundColor;
            const borderColor = newData.datasets[0].borderColor;
            
            if (Array.isArray(backgroundColor) && Array.isArray(borderColor)) {
              if (newValue > 80) {
                backgroundColor[index] = "rgba(239, 68, 68, 0.8)"; // Red for high usage
                borderColor[index] = "rgb(239, 68, 68)";
              } else if (newValue > 65) {
                backgroundColor[index] = "rgba(245, 158, 11, 0.8)"; // Yellow for warning
                borderColor[index] = "rgb(245, 158, 11)";
              } else {
                backgroundColor[index] = "rgba(16, 185, 129, 0.8)"; // Green for normal
                borderColor[index] = "rgb(16, 185, 129)";
              }
            }
            
            return newValue
          });
        }
        
        return newData;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  // Theme detection
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    
    setIsDarkMode(darkModeMediaQuery.matches)
    darkModeMediaQuery.addEventListener('change', handleChange)
    
    return () => darkModeMediaQuery.removeEventListener('change', handleChange)
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
      
      <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-2">
        {data.labels?.map((label, index) => {
          // Access safely with proper type checks
          const firstDataset = data.datasets[0];
          let backgroundColor = undefined;
          
          if (firstDataset && Array.isArray(firstDataset.backgroundColor)) {
            backgroundColor = firstDataset.backgroundColor[index] as string;
          }
          
          return (
            <div key={typeof label === 'string' ? label : `label-${index}`} className="flex items-center gap-1 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: backgroundColor
                }}
              />
              <span className="text-muted-foreground">{String(label)}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  )
} 