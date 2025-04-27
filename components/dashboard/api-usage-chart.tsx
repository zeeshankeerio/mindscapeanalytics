"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

// Enhanced modern options
const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  animation: {
    duration: 800,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(17, 17, 27, 0.9)",
      titleColor: "#fff",
      bodyColor: "rgba(255, 255, 255, 0.8)",
      padding: 14,
      displayColors: false,
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
      boxPadding: 6,
      boxWidth: 8,
      boxHeight: 8,
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
        label: function(context) {
          let value = context.parsed.y;
          let formattedValue: string;
          
          // Format for better readability
          if (context.dataset.label === "API Requests") {
            formattedValue = value.toLocaleString();
          } else if (context.dataset.label === "Error Rate") {
            formattedValue = value.toFixed(2) + '%';
          } else {
            formattedValue = value.toString();
          }
          
          return `${context.dataset.label}: ${formattedValue}`;
        },
        title: function(tooltipItems) {
          return tooltipItems[0].label;
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
        color: "rgba(255, 255, 255, 0.6)",
        font: {
          size: 11,
        },
        padding: 10,
      },
      border: {
        display: false,
      }
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.06)",
        drawTicks: false,
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
        font: {
          size: 11,
        },
        padding: 10,
        callback: function(value) {
          if (typeof value === 'number' && value >= 1000) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          return value;
        }
      },
      border: {
        display: false,
      }
    },
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 3,
    },
    point: {
      radius: 4,
      borderWidth: 2,
      hoverRadius: 7,
      hoverBorderWidth: 3,
    }
  },
}

const initialData: ChartData<"line"> = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "API Requests",
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      borderColor: "rgb(99, 102, 241)", // Indigo
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgb(99, 102, 241)",
      pointBorderColor: "#000",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: "Error Rate",
      data: [0.5, 0.3, 0.4, 0.2, 0.3, 0.1, 0.2],
      borderColor: "rgb(244, 63, 94)", // Rose
      backgroundColor: "rgba(244, 63, 94, 0.2)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgb(244, 63, 94)",
      pointBorderColor: "#000",
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
  const [chartLoaded, setChartLoaded] = useState(false)
  
  // Transform external data to Chart.js format if provided
  const transformedData = useMemo(() => {
    if (!externalData) return initialData;
    
    return {
      labels: externalData.labels,
      datasets: externalData.datasets.map((dataset, index) => {
        const colors = [
          "rgb(99, 102, 241)", // indigo
          "rgb(244, 63, 94)",  // rose
          "rgb(234, 179, 8)",  // amber
          "rgb(34, 211, 238)"  // cyan
        ];
        
        return {
          label: dataset.name,
          data: dataset.data,
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length].replace("rgb", "rgba").replace(")", ", 0.2)"),
          fill: true,
          tension: 0.4,
          pointBackgroundColor: colors[index % colors.length],
          pointBorderColor: "#000",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        };
      })
    };
  }, [externalData]);
  
  const [data, setData] = useState<ChartData<"line">>(transformedData);
  const [hovering, setHovering] = useState(false);

  // Memoize options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => options, []);

  // Create advanced gradients for chart backgrounds
  useEffect(() => {
    const chart = chartRef.current
    if (chart) {
      const ctx = chart.ctx
      
      // Create primary dataset gradient (indigo)
      const primaryGradient = ctx.createLinearGradient(0, 0, 0, chart.height)
      primaryGradient.addColorStop(0, "rgba(99, 102, 241, 0.3)")
      primaryGradient.addColorStop(0.5, "rgba(99, 102, 241, 0.15)")
      primaryGradient.addColorStop(1, "rgba(99, 102, 241, 0)")
      
      // Create secondary dataset gradient (rose)
      const secondaryGradient = ctx.createLinearGradient(0, 0, 0, chart.height)
      secondaryGradient.addColorStop(0, "rgba(244, 63, 94, 0.3)")
      secondaryGradient.addColorStop(0.5, "rgba(244, 63, 94, 0.15)")
      secondaryGradient.addColorStop(1, "rgba(244, 63, 94, 0)")
      
      // Apply gradients to datasets
      setData(prevData => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor: index === 0 ? primaryGradient : secondaryGradient,
        })),
      }))
      
      setChartLoaded(true);
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
                // API Requests - more natural looking variance
                const baseChange = Math.random() * 5000 - 2500;
                const trend = Math.sin(i / arr.length * Math.PI) * 1000;
                return Math.max(0, value + baseChange + trend);
              } else {
                // Error Rate - small variance that keeps values low and realistic
                const baseLine = 0.15; // base error rate
                const variance = Math.random() * 0.3 - 0.15;
                return Math.max(0, Math.min(1.5, baseLine + variance));
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[300px] w-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stylized background elements */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        {/* Gradient base background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-zinc-900/0 to-rose-900/10"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Animated glow effects */}
        <motion.div 
          className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-indigo-500/10 blur-3xl"
          animate={{ 
            x: hovering ? [-10, 10] : 0,
            opacity: hovering ? [0.1, 0.15] : 0.05 
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse",
            duration: 3
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 right-1/4 w-32 h-32 rounded-full bg-rose-500/10 blur-3xl"
          animate={{ 
            x: hovering ? [10, -10] : 0,
            opacity: hovering ? [0.1, 0.15] : 0.05 
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse",
            duration: 4
          }}
        />
      </div>
      
      {/* Chart container with glass effect */}
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
              className="h-10 w-10 rounded-full border-2 border-indigo-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Actual chart */}
      <div className="relative z-10 h-full w-full">
        <Line ref={chartRef} options={memoizedOptions} data={data} />
      </div>
      
      {/* Legend with hover effects */}
      <div className="absolute top-2 right-2 flex gap-3 z-20">
        <motion.div 
          className="flex items-center gap-1.5 text-xs bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-white/80">API Requests</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-1.5 text-xs bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="text-white/80">Error Rate</span>
        </motion.div>
      </div>
    </motion.div>
  )
} 