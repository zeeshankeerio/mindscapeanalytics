"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, AnimatePresence, useSpring } from "framer-motion"
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

// Enhanced modern option configuration
const createOptions = (isDarkMode = true): ChartOptions<"bar"> => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  animation: {
    duration: 850,
    easing: 'easeOutQuint'
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: isDarkMode ? "rgba(15, 15, 25, 0.95)" : "rgba(255, 255, 255, 0.95)",
      titleColor: isDarkMode ? "#fff" : "#000",
      bodyColor: isDarkMode ? "rgba(255, 255, 255, 0.8)" : "#333",
      padding: 14,
      borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      borderWidth: 1,
      displayColors: true,
      boxWidth: 12,
      boxHeight: 12,
      boxPadding: 3,
      usePointStyle: true,
      titleFont: {
        weight: 'bold',
        size: 13,
      },
      bodyFont: {
        size: 12,
      },
      cornerRadius: 8,
      callbacks: {
        title: function(tooltipItems) {
          return `${tooltipItems[0].label} Usage`;
        },
        label: function(context) {
          const value = context.parsed.y;
          let status = "Optimal";
          let statusColor = "#10b981"; // Emerald
          
          if (value > 80) {
            status = "Critical";
            statusColor = "#ef4444"; // Red
          }
          else if (value > 65) {
            status = "Warning";
            statusColor = "#f59e0b"; // Amber
          }
          
          return [
            `${context.dataset.label}: ${value.toFixed(1)}%`,
            `Status: ${status}`
          ];
        },
        labelTextColor: function(context) {
          const value = context.parsed.y;
          if (value > 80) return "#ef4444"; // Red for critical
          if (value > 65) return "#f59e0b"; // Amber for warning
          return "#10b981"; // Emerald for normal
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
        color: isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
        font: {
          weight: 'bold',
          size: 11
        },
        padding: 10
      },
      border: {
        display: false
      }
    },
    y: {
      grid: {
        color: isDarkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)",
        tickBorderDash: [4, 4]
      },
      ticks: {
        color: isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
        font: {
          size: 11
        },
        padding: 10,
        count: 5
      },
      border: {
        display: false
      },
      max: 100,
      beginAtZero: true
    },
  },
});

// Create custom colors based on values
const getBarColors = (values: number[]) => {
  return values.map(value => {
    if (value > 80) return {
      background: "rgba(239, 68, 68, 0.85)", // Red
      border: "#ef4444"
    };
    if (value > 65) return {
      background: "rgba(245, 158, 11, 0.85)", // Amber
      border: "#f59e0b"
    };
    return {
      background: "rgba(16, 185, 129, 0.85)", // Emerald
      border: "#10b981"
    };
  });
}

const initialData: ChartData<"bar"> = {
  labels: ["CPU", "Memory", "Storage", "Network", "GPU"],
  datasets: [
    {
      label: "Usage",
      data: [65, 75, 45, 85, 60],
      backgroundColor: [
        "rgba(16, 185, 129, 0.85)", // Emerald
        "rgba(245, 158, 11, 0.85)", // Amber
        "rgba(16, 185, 129, 0.85)", // Emerald
        "rgba(239, 68, 68, 0.85)",  // Red
        "rgba(16, 185, 129, 0.85)", // Emerald
      ],
      borderColor: [
        "#10b981", // Emerald
        "#f59e0b", // Amber
        "#10b981", // Emerald
        "#ef4444", // Red
        "#10b981", // Emerald
      ],
      borderWidth: 2,
      borderRadius: 12,
      borderSkipped: false,
      barThickness: 36,
    },
  ],
}

export function SystemHealthChart() {
  const chartRef = useRef<ChartJS<"bar">>(null)
  const [data, setData] = useState<ChartData<"bar">>(initialData)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const [updateInterval, setUpdateInterval] = useState<number>(3000) 
  const [chartLoaded, setChartLoaded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [systemStatus, setSystemStatus] = useState<"optimal" | "warning" | "critical">("optimal")
  
  // Animated status indicator
  const pulseAnimation = useMemo(() => {
    if (systemStatus === "critical") {
      return {
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      };
    } else if (systemStatus === "warning") {
      return {
        scale: [1, 1.05, 1],
        opacity: [0.8, 0.9, 0.8]
      };
    }
    return {
      scale: 1,
      opacity: 0.8
    };
  }, [systemStatus]);

  // Memoize options to prevent unnecessary re-renders
  const options = useMemo(() => createOptions(isDarkMode), [isDarkMode])

  // Set chart as loaded after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Advanced real-time updates with trend simulation and color changes
  useEffect(() => {
    // Keep track of trend directions for each metric
    const trends = new Array(data.datasets[0].data.length).fill(0).map(() => 
      Math.random() > 0.5 ? 1 : -1
    )
    
    const interval = setInterval(() => {
      setData(prevData => {
        // Create a deep copy of previous data
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
          // Store the updated values to recalculate colors and system status
          const newValues: number[] = [];
          
          newData.datasets[0].data = newData.datasets[0].data.map((value, index) => {
            // Check if we should change trend direction (20% chance)
            if (Math.random() < 0.2) {
              trends[index] *= -1
            }
            
            // Calculate new value with trend
            const numValue = typeof value === 'number' ? value : 0
            // Smaller changes for more stability
            const change = (Math.random() * 4) * trends[index]
            // Add slight oscillation for realistic metrics
            const oscillation = Math.sin(Date.now() / 10000 + index) * 2
            const newValue = Math.max(15, Math.min(95, numValue + change + oscillation))
            
            newValues.push(newValue);
            return newValue;
          });
          
          // Update colors based on new values
          const colors = getBarColors(newValues);
          
          newData.datasets[0].backgroundColor = colors.map(c => c.background);
          newData.datasets[0].borderColor = colors.map(c => c.border);
          
          // Determine overall system status
          const maxValue = Math.max(...newValues);
          if (maxValue > 80) {
            setSystemStatus("critical");
          } else if (maxValue > 65) {
            setSystemStatus("warning");
          } else {
            setSystemStatus("optimal");
          }
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

  // Status indicator color
  const statusColor = useMemo(() => {
    switch (systemStatus) {
      case "critical": return "bg-red-500";
      case "warning": return "bg-amber-500";
      default: return "bg-emerald-500";
    }
  }, [systemStatus]);

  // Status text
  const statusText = useMemo(() => {
    switch (systemStatus) {
      case "critical": return "Critical";
      case "warning": return "Warning";
      default: return "Optimal";
    }
  }, [systemStatus]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[300px] w-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stylish background with effects */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-zinc-900/0 to-amber-900/5"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
        
        {/* Status-based glow effect */}
        <motion.div 
          className={`absolute inset-0 opacity-20 ${
            systemStatus === "critical" ? "bg-red-900/10" : 
            systemStatus === "warning" ? "bg-amber-900/10" : 
            "bg-emerald-900/10"
          }`}
          animate={{ 
            opacity: systemStatus === "critical" ? [0.1, 0.2, 0.1] : 
                    systemStatus === "warning" ? [0.05, 0.1, 0.05] : 0.05
          }}
          transition={{ 
            repeat: Infinity, 
            duration: systemStatus === "critical" ? 1.5 : 3 
          }}
        />
        
        {/* Dynamic glow spots */}
        <motion.div 
          className={`absolute top-1/4 left-1/3 w-32 h-32 rounded-full ${
            systemStatus === "critical" ? "bg-red-500/5" : 
            systemStatus === "warning" ? "bg-amber-500/5" : 
            "bg-emerald-500/5"
          } blur-3xl`}
          animate={{ 
            x: hovering ? [-5, 5] : 0,
            opacity: hovering ? [0.1, 0.15] : 0.05 
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse",
            duration: 4
          }}
        />
      </div>
      
      {/* Glass effect container */}
      <div className="absolute inset-0 rounded-xl backdrop-blur-[1px]"></div>
      
      {/* Loading animation */}
      <AnimatePresence>
        {!chartLoaded && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={`h-10 w-10 rounded-full border-2 ${
                systemStatus === "critical" ? "border-red-500" : 
                systemStatus === "warning" ? "border-amber-500" : 
                "border-emerald-500"
              } border-t-transparent`}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* System status indicator */}
      <div className="absolute top-2 left-2 z-20 flex items-center">
        <motion.div 
          className={`flex items-center gap-2 ${
            systemStatus === "critical" ? "bg-red-500/10" : 
            systemStatus === "warning" ? "bg-amber-500/10" : 
            "bg-emerald-500/10"
          } backdrop-blur-md px-3 py-1.5 rounded-full border ${
            systemStatus === "critical" ? "border-red-500/20" : 
            systemStatus === "warning" ? "border-amber-500/20" : 
            "border-emerald-500/20"
          }`}
        >
          <motion.div 
            className={`w-2.5 h-2.5 rounded-full ${statusColor}`}
            animate={pulseAnimation}
            transition={{ 
              repeat: Infinity, 
              duration: systemStatus === "critical" ? 0.8 : 
                      systemStatus === "warning" ? 1.5 : 3 
            }}
          />
          <span className="text-xs text-white/80">{statusText}</span>
        </motion.div>
      </div>
      
      {/* Main chart */}
      <div className="relative z-10 h-full w-full">
        <Bar ref={chartRef} options={options} data={data} />
      </div>
      
      {/* Legend with hover effects */}
      <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-2 z-20">
        {data.labels?.map((label, index) => {
          // Access safely with proper type checks
          const firstDataset = data.datasets[0];
          let backgroundColor = undefined;
          
          if (firstDataset && Array.isArray(firstDataset.backgroundColor)) {
            backgroundColor = firstDataset.backgroundColor[index];
          }
          
          return (
            <motion.div 
              key={String(label)}
              className="flex items-center gap-1.5 text-xs bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: backgroundColor as string
                }}
              />
              <span className="text-white/80">{String(label)}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  )
} 