"use client"

import { useState, useCallback, useEffect } from "react"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Sector, 
  Tooltip, 
  Legend,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Label
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle } from "lucide-react"

interface SegmentationPieChartProps {
  data: any[] | (() => any[])
  height?: number
  onSegmentClick?: (segmentId: string) => void
  selectedSegment?: string | null
  variant?: 'pie' | 'donut' | 'radial' | '3d'
  startAngle?: number
  endAngle?: number
  animate?: boolean
  showLabels?: boolean
  innerRadius?: number
  outerRadius?: number
  paddingAngle?: number
  onError?: (error: Error) => void
}

// Helper to find segment index by name
const findSegmentIndex = (data: any[], segmentName: string) => {
  return data.findIndex(segment => segment.name === segmentName)
}

// Active shape for the pie chart when a segment is selected
const renderActiveShape = (props: any) => {
  const { 
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, 
    percent, value, name, totalValue 
  } = props

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 14}
        fill={fill}
      />
      <text
        x={cx}
        y={cy - 18}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-sm font-bold"
      >
        {name}
      </text>
      <text
        x={cx}
        y={cy + 2}
        dy={8}
        textAnchor="middle"
        fill="#999"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <text
        x={cx}
        y={cy + 22}
        dy={8}
        textAnchor="middle"
        fill="#666"
        className="text-xs"
      >
        {`$${totalValue?.toLocaleString()}`}
      </text>
    </g>
  )
}

// Enhanced active shape for 3D effect
const render3DActiveShape = (props: any) => {
  const { 
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, 
    percent, value, name, totalValue 
  } = props

  // Shadow definitions for 3D effect
  const shadowId = `shadow-${payload.name.replace(/\s+/g, '')}`
  const shadowUrl = `url(#${shadowId})`

  return (
    <g>
      <defs>
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feOffset result="offOut" in="SourceGraphic" dx={2} dy={2} />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation={3} />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter={shadowUrl}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 14}
        outerRadius={outerRadius + 18}
        fill={fill}
        filter={shadowUrl}
      />
      <text
        x={cx}
        y={cy - 18}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-sm font-bold"
        filter={shadowUrl}
      >
        {name}
      </text>
      <text
        x={cx}
        y={cy + 2}
        dy={8}
        textAnchor="middle"
        fill="#666"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <text
        x={cx}
        y={cy + 22}
        dy={8}
        textAnchor="middle"
        fill="#666"
        className="text-xs"
      >
        {`$${totalValue?.toLocaleString()}`}
      </text>
    </g>
  )
}

// Custom tooltip with enhanced styling
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    
    // Calculate contrast text color based on background
    const getContrastColor = (hexColor: string) => {
      // Convert hex to RGB
      const r = parseInt(hexColor.slice(1, 3), 16)
      const g = parseInt(hexColor.slice(3, 5), 16)
      const b = parseInt(hexColor.slice(5, 7), 16)
      
      // Calculate relative luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      
      // Return black for light colors, white for dark
      return luminance > 0.5 ? '#000000' : '#ffffff'
    }
    
    const backgroundColor = payload[0].color
    const textColor = getContrastColor(backgroundColor)
    
    return (
      <div 
        className="px-4 py-3 rounded-lg shadow-xl border border-border backdrop-blur-sm"
        style={{ 
          backgroundColor: `${backgroundColor}CC`, // Adding 80% opacity
          color: textColor
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: textColor }} />
          <p className="font-semibold text-sm">{data.name}</p>
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="flex justify-between items-center">
            <span className="opacity-80">Segment Size:</span> 
            <span className="font-medium">{data.value}%</span>
          </div>
          
          {data.totalValue !== undefined && (
            <div className="flex justify-between items-center">
              <span className="opacity-80">Total Value:</span> 
              <span className="font-medium">${data.totalValue?.toLocaleString()}</span>
            </div>
          )}
          
          {data.conversionRate !== undefined && (
            <div className="flex justify-between items-center">
              <span className="opacity-80">Conversion:</span> 
              <span className="font-medium">{data.conversionRate}%</span>
            </div>
          )}
          
          {data.engagementScore !== undefined && (
            <div className="flex justify-between items-center">
              <span className="opacity-80">Engagement:</span> 
              <span className="font-medium">{data.engagementScore}/10</span>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

// Create gradients for each segment
const renderGradients = (data: any[]) => {
  return (
    <defs>
      {data.map((entry, index) => {
        const id = `gradient-${index}`
        const color = entry.color || '#000000'
        return (
          <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={1} />
            <stop offset="100%" stopColor={color} stopOpacity={0.6} />
          </linearGradient>
        )
      })}
    </defs>
  )
}

// Generate 3D effect filter
const render3DFilter = () => (
  <defs>
    <filter id="shadow-3d" x="-20%" y="-20%" width="140%" height="140%">
      <feOffset result="offOut" in="SourceGraphic" dx={4} dy={4} />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation={5} />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
)

// Error fallback component
const ChartErrorFallback = () => (
  <div className="flex items-center justify-center h-full p-4 border border-red-300 bg-red-50 rounded-md">
    <div className="text-center">
      <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
      <p className="text-sm text-red-600">Failed to render chart</p>
    </div>
  </div>
)

export default function SegmentationPieChart({ 
  data, 
  height = 300,
  onSegmentClick,
  selectedSegment,
  variant = 'donut',
  startAngle = 0,
  endAngle = 360,
  animate = true,
  showLabels = true,
  innerRadius: customInnerRadius,
  outerRadius: customOuterRadius,
  paddingAngle = 4,
  onError,
}: SegmentationPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [chartData, setChartData] = useState<any[]>([])
  const [hasError, setHasError] = useState(false)
  
  // Get the data array from the data prop (which might be a function)
  const getDataArray = useCallback(() => {
    try {
      if (typeof data === 'function') {
        return data()
      }
      return data
    } catch (err) {
      setHasError(true)
      if (onError && err instanceof Error) {
        onError(err)
      }
      return []
    }
  }, [data, onError])
  
  // Default innerRadius and outerRadius based on variant
  const getInnerRadius = () => {
    if (customInnerRadius !== undefined) return customInnerRadius
    switch (variant) {
      case 'pie': return 0
      case 'donut': return 60
      case 'radial': return 40
      case '3d': return 60
      default: return 60
    }
  }
  
  const getOuterRadius = () => {
    if (customOuterRadius !== undefined) return customOuterRadius
    switch (variant) {
      case 'pie': return 80
      case 'donut': return 90
      case 'radial': return 120
      case '3d': return 90
      default: return 90
    }
  }
  
  const innerRadius = getInnerRadius()
  const outerRadius = getOuterRadius()

  // Prepare data with animation if enabled
  useEffect(() => {
    try {
      const dataArray = getDataArray()
      
      if (animate) {
        setChartData([])
        
        // Animate data appearance
        const timer = setTimeout(() => {
          setChartData(dataArray)
        }, 300)
        
        return () => clearTimeout(timer)
      } else {
        setChartData(dataArray)
      }
      
      // Update active index if selectedSegment changes
      if (selectedSegment) {
        const index = dataArray.findIndex((item: any) => 
          item.id === selectedSegment || 
          (item.name && item.name.toLowerCase().replace(/\s+/g, '-') === selectedSegment)
        )
        setActiveIndex(index >= 0 ? index : undefined)
      } else {
        setActiveIndex(undefined)
      }
    } catch (err) {
      setHasError(true)
      if (onError && err instanceof Error) {
        onError(err)
      }
    }
  }, [data, animate, selectedSegment, getDataArray, onError])

  // Handler for segment click
  const handleSegmentClick = (data: any, index: number) => {
    if (onSegmentClick) {
      // Map back from chart data to segment id
      const segmentName = data.name
      const segmentId = data.id || segmentName.toLowerCase().replace(/\s+/g, '-')
      onSegmentClick(segmentId)
    }
    
    // Track active index for radial chart
    if (variant === 'radial') {
      setActiveIndex(activeIndex === index ? undefined : index)
    }
  }

  // Render different chart types based on variant
  const renderChart = () => {
    if (hasError) {
      return <ChartErrorFallback />
    }

    switch (variant) {
      case 'radial':
        return (
          <RadialBarChart 
            innerRadius={innerRadius} 
            outerRadius={outerRadius} 
            data={chartData} 
            startAngle={startAngle} 
            endAngle={endAngle}
            cx="50%"
            cy="50%"
          >
            {renderGradients(chartData)}
            <PolarGrid />
            <PolarAngleAxis
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <PolarRadiusAxis />
            <RadialBar
              label={showLabels ? { fill: '#666666', position: 'insideStart', fontSize: 10 } : false}
              background
              dataKey="value"
              angleAxisId={0}
              onClick={(_, index) => handleSegmentClick(chartData[index], index)}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-${index})`}
                  className={`cursor-pointer hover:opacity-90 transition-opacity ${
                    activeIndex === index ? 'opacity-100' : activeIndex !== undefined ? 'opacity-50' : 'opacity-100'
                  }`}
                />
              ))}
            </RadialBar>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              formatter={(value, entry, index) => (
                <span className={`text-xs ${activeIndex === index ? 'font-medium' : ''}`}>{value}</span>
              )}
            />
          </RadialBarChart>
        )
      
      case '3d':
        return (
          <PieChart>
            {render3DFilter()}
            {renderGradients(chartData)}
            <Pie
              activeIndex={activeIndex !== undefined ? activeIndex : undefined}
              activeShape={render3DActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={paddingAngle}
              dataKey="value"
              startAngle={startAngle}
              endAngle={endAngle}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => 
                selectedSegment 
                  ? setActiveIndex(findSegmentIndex(chartData, selectedSegment)) 
                  : setActiveIndex(undefined)
              }
              onClick={(_, index) => handleSegmentClick(chartData[index], index)}
              filter="url(#shadow-3d)"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-${index})`}
                  stroke="#ffffff"
                  strokeWidth={1}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                />
              ))}
              {showLabels && chartData.map((entry, index) => {
                if (activeIndex === index) return null
                const segmentAngle = (entry.value / 100) * (endAngle - startAngle)
                const isTooSmall = segmentAngle < 20 // Skip labels for tiny segments
                if (isTooSmall) return null
                
                // Labels are handled through the active shape
                return null
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              formatter={(value, entry, index) => (
                <span className={`text-xs ${activeIndex === index ? 'font-medium' : ''}`}>{value}</span>
              )}
            />
          </PieChart>
        )
      
      case 'pie':
      case 'donut':
      default:
        return (
          <PieChart>
            {renderGradients(chartData)}
            <Pie
              activeIndex={activeIndex !== undefined ? activeIndex : undefined}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={paddingAngle}
              dataKey="value"
              startAngle={startAngle}
              endAngle={endAngle}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => 
                selectedSegment 
                  ? setActiveIndex(findSegmentIndex(chartData, selectedSegment)) 
                  : setActiveIndex(undefined)
              }
              onClick={(_, index) => handleSegmentClick(chartData[index], index)}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || `url(#gradient-${index})`}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              formatter={(value, entry, index) => (
                <span className={`text-xs ${activeIndex === index ? 'font-medium' : ''}`}>{value}</span>
              )}
              onClick={(data) => {
                const index = chartData.findIndex(item => item.name === data.value)
                handleSegmentClick(data, index)
              }}
            />
          </PieChart>
        )
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={variant}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>
    </AnimatePresence>
  )
} 