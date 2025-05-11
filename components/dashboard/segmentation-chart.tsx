"use client"

import { useState, useCallback, useEffect } from "react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LabelList,
  Cell,
  ReferenceLine,
  Brush,
  Line,
  ComposedChart
} from "recharts"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

interface SegmentationChartProps {
  data: any[] | (() => any[])
  height?: number
  metric?: string
  onSegmentClick?: (segmentId: string) => void
  selectedSegment?: string | null
  showDataLabels?: boolean
  chartType?: 'bar' | 'grouped' | 'stacked' | 'composed'
  showBrush?: boolean
  animate?: boolean
  showAverage?: boolean
  secondaryMetric?: string
  onError?: (error: Error) => void
}

// Error fallback component
const ChartErrorFallback = () => (
  <div className="flex items-center justify-center h-full p-4 border border-red-300 bg-red-50 rounded-md">
    <div className="text-center">
      <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
      <p className="text-sm text-red-600">Failed to render chart</p>
    </div>
  </div>
)

// Custom tooltip with enhanced styling
const CustomTooltip = ({ active, payload, label, metric, secondaryMetric }: any) => {
  if (active && payload && payload.length) {
    const metricLabel = 
      metric === "value" ? "Total Value" :
      metric === "engagement" ? "Engagement Score" :
      metric === "retention" ? "Retention Rate" :
      metric === "conversion" ? "Conversion Rate" : 
      "Value"
    
    const valuePrefix = metric === "value" ? "$" : ""
    const valueSuffix = metric === "retention" || metric === "conversion" ? "%" : metric === "engagement" ? "/10" : ""
    
    const hasSecondaryMetric = secondaryMetric && payload.length > 1

    const secondaryMetricLabel = 
      secondaryMetric === "value" ? "Total Value" :
      secondaryMetric === "engagement" ? "Engagement Score" :
      secondaryMetric === "retention" ? "Retention Rate" :
      secondaryMetric === "conversion" ? "Conversion Rate" : 
      secondaryMetric === "growth" ? "Growth Rate" :
      secondaryMetric === "churn" ? "Churn Risk" :
      ""
    
    const secondaryValuePrefix = secondaryMetric === "value" ? "$" : ""
    const secondaryValueSuffix = secondaryMetric === "retention" || secondaryMetric === "conversion" || 
                                secondaryMetric === "growth" || secondaryMetric === "churn" ? "%" : 
                                secondaryMetric === "engagement" ? "/10" : ""
    
    return (
      <div className="bg-popover/95 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].fill || payload[0].color }} />
          <p className="font-semibold">{label}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm flex justify-between">
            <span>{metricLabel}:</span> 
            <span className="text-foreground font-medium ml-4">
              {valuePrefix}{payload[0].value.toLocaleString()}{valueSuffix}
            </span>
          </p>
          
          {hasSecondaryMetric && (
            <p className="text-muted-foreground text-sm flex justify-between">
              <span>{secondaryMetricLabel}:</span> 
              <span className="text-foreground font-medium ml-4">
                {secondaryValuePrefix}{payload[1].value.toLocaleString()}{secondaryValueSuffix}
              </span>
            </p>
          )}
          
          {payload[0].payload.size !== undefined && (
            <p className="text-muted-foreground text-sm flex justify-between">
              <span>Segment Size:</span> 
              <span className="text-foreground font-medium ml-4">
                {payload[0].payload.size}%
              </span>
            </p>
          )}
        </div>
      </div>
    )
  }
  return null
}

// Function to generate gradient IDs for each segment
const getGradientId = (segmentId: string) => `segment-gradient-${segmentId}`

export default function SegmentationChart({ 
  data, 
  height = 300,
  metric = "value",
  onSegmentClick,
  selectedSegment,
  showDataLabels = false,
  chartType = 'bar',
  showBrush = false,
  animate = true,
  showAverage = false,
  secondaryMetric,
  onError,
}: SegmentationChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [averageValue, setAverageValue] = useState<number>(0)
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
  
  // Prepare data with animation if enabled
  useEffect(() => {
    try {
      const dataArray = getDataArray()
      
      if (animate) {
        setChartData([])
        
        // Calculate average for the reference line
        if (showAverage && dataArray.length > 0) {
          const sum = dataArray.reduce((acc, item) => {
            const val = item[metric] || 0
            return acc + val
          }, 0)
          setAverageValue(sum / dataArray.length)
        }
        
        // Animate data appearance
        const timer = setTimeout(() => {
          setChartData(dataArray)
        }, 300)
        
        return () => clearTimeout(timer)
      } else {
        setChartData(dataArray)
        
        // Calculate average without animation
        if (showAverage && dataArray.length > 0) {
          const sum = dataArray.reduce((acc, item) => {
            const val = item[metric] || 0
            return acc + val
          }, 0)
          setAverageValue(sum / dataArray.length)
        }
      }
    } catch (err) {
      setHasError(true)
      if (onError && err instanceof Error) {
        onError(err)
      }
    }
  }, [data, animate, metric, showAverage, getDataArray, onError])

  // Format Y-axis values based on metric
  const formatYAxis = (value: any, index: number): string => {
    if (metric === "value") {
      // Format currency values with k/M suffixes for better readability
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}k`
      }
      return `$${value}`
    }
    if (metric === "retention" || metric === "conversion" || metric === "growth" || metric === "churn") {
      return `${value}%`
    }
    if (metric === "engagement") {
      return value.toFixed(1)
    }
    return value.toString()
  }

  // Handler for bar click
  const handleBarClick = useCallback((data: any) => {
    if (onSegmentClick) {
      // Map back from chart data to segment id
      const segmentName = data.name
      const segmentId = data.id || segmentName.toLowerCase().replace(/\s+/g, '-')
      onSegmentClick(segmentId)
    }
  }, [onSegmentClick])

  // Get the primary metric key name for the data
  const metricKey = metric || "value"
  
  // Get the secondary metric key name if provided
  const secondaryMetricKey = secondaryMetric || null

  // Determine chart type and create appropriate visualization
  const renderChart = () => {
    switch (chartType) {
      case 'grouped':
        return (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: showBrush ? 60 : 10 }}
          >
            <defs>
              {chartData.map((entry) => {
                const segmentId = entry.id || entry.name.toLowerCase().replace(/\s+/g, '-')
                return (
                  <linearGradient key={segmentId} id={getGradientId(segmentId)} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={entry.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={entry.color} stopOpacity={0.3}/>
                  </linearGradient>
                )
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
            <XAxis 
              dataKey="name" 
              stroke="#88888860" 
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <YAxis 
              stroke="#88888860" 
              tick={{ fill: '#888888', fontSize: 12 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip metric={metric} secondaryMetric={secondaryMetricKey} />} />
            <Legend />
            
            {/* Primary metric */}
            <Bar 
              dataKey={metricKey} 
              onClick={handleBarClick}
              className="cursor-pointer"
              name={
                metric === "value" ? "Total Value" :
                metric === "engagement" ? "Engagement Score" :
                metric === "retention" ? "Retention Rate" :
                metric === "conversion" ? "Conversion Rate" : 
                "Value"
              }
            >
              {chartData.map((entry) => {
                const segmentId = entry.id || entry.name.toLowerCase().replace(/\s+/g, '-')
                const isSelected = selectedSegment && segmentId === selectedSegment
                
                return (
                  <Cell 
                    key={`cell-${segmentId}`} 
                    fill={`url(#${getGradientId(segmentId)})`}
                    stroke={isSelected ? "#ffffff" : "transparent"}
                    strokeWidth={isSelected ? 2 : 0}
                    className={`transition-all duration-200 ${
                      isSelected ? 'opacity-100' : selectedSegment ? 'opacity-50' : 'opacity-100'
                    }`}
                  />
                )
              })}
              {showDataLabels && (
                <LabelList 
                  dataKey={metricKey} 
                  position="top" 
                  formatter={(value: number) => {
                    if (metric === "value") return `$${value.toLocaleString()}`
                    if (metric === "retention" || metric === "conversion") return `${value}%`
                    return value.toString()
                  }}
                  className="text-xs"
                  fill="#888888"
                />
              )}
            </Bar>
            
            {/* Secondary metric if provided */}
            {secondaryMetricKey && (
              <Bar 
                dataKey={secondaryMetricKey} 
                className="cursor-pointer"
                name={
                  secondaryMetric === "value" ? "Total Value" :
                  secondaryMetric === "engagement" ? "Engagement Score" :
                  secondaryMetric === "retention" ? "Retention Rate" :
                  secondaryMetric === "conversion" ? "Conversion Rate" :
                  secondaryMetric === "growth" ? "Growth Rate" :
                  secondaryMetric === "churn" ? "Churn Risk" :
                  "Secondary Metric"
                }
                opacity={0.7}
              />
            )}
            
            {showAverage && (
              <ReferenceLine 
                y={averageValue} 
                stroke="#ff7300" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Average', 
                  position: 'right', 
                  fill: '#ff7300',
                  fontSize: 12 
                }} 
              />
            )}
            
            {showBrush && (
              <Brush 
                dataKey="name" 
                height={30} 
                stroke="#8884d8"
                startIndex={0}
                endIndex={Math.min(5, chartData.length - 1)}
              />
            )}
          </BarChart>
        )
      
      case 'stacked':
        return (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: showBrush ? 60 : 10 }}
            stackOffset="expand"
            barCategoryGap={20}
          >
            <defs>
              {chartData.map((entry) => {
                const segmentId = entry.id || entry.name.toLowerCase().replace(/\s+/g, '-')
                return (
                  <linearGradient key={segmentId} id={getGradientId(segmentId)} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={entry.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={entry.color} stopOpacity={0.3}/>
                  </linearGradient>
                )
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
            <XAxis 
              dataKey="name" 
              stroke="#88888860" 
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <YAxis 
              stroke="#88888860" 
              tick={{ fill: '#888888', fontSize: 12 }}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip content={<CustomTooltip metric={metric} secondaryMetric={secondaryMetricKey} />} />
            <Legend />
            
            <Bar 
              dataKey={metricKey} 
              onClick={handleBarClick}
              className="cursor-pointer"
              stackId="a"
            >
              {chartData.map((entry) => {
                const segmentId = entry.id || entry.name.toLowerCase().replace(/\s+/g, '-')
                const isSelected = selectedSegment && segmentId === selectedSegment
                
                return (
                  <Cell 
                    key={`cell-${segmentId}`} 
                    fill={`url(#${getGradientId(segmentId)})`}
                    stroke={isSelected ? "#ffffff" : "transparent"}
                    strokeWidth={isSelected ? 2 : 0}
                  />
                )
              })}
            </Bar>
            
            {secondaryMetricKey && (
              <Bar 
                dataKey={secondaryMetricKey} 
                stackId="a" 
                opacity={0.7}
              />
            )}
            
            {showBrush && (
              <Brush 
                dataKey="name" 
                height={30} 
                stroke="#8884d8"
                y={10}
              />
            )}
          </BarChart>
        )
        
      case 'composed':
        return (
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: showBrush ? 60 : 10 }}
          >
            <defs>
              {chartData.map((entry) => {
                const segmentId = entry.id || entry.name.toLowerCase().replace(/\s+/g, '-')
                return (
                  <linearGradient key={segmentId} id={getGradientId(segmentId)} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={entry.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={entry.color} stopOpacity={0.3}/>
                  </linearGradient>
                )
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
            <XAxis 
              dataKey="name" 
              stroke="#88888860" 
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <YAxis 
              stroke="#88888860" 
              tick={{ fill: '#888888', fontSize: 12 }}
              tickFormatter={formatYAxis}
              yAxisId="left"
            />
            {secondaryMetricKey && (
              <YAxis 
                orientation="right"
                stroke="#88888860" 
                tick={{ fill: '#888888', fontSize: 12 }}
                tickFormatter={(value) => {
                  if (secondaryMetric === "value") {
                    return value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`
                  }
                  if (secondaryMetric === "retention" || secondaryMetric === "conversion" || 
                      secondaryMetric === "growth" || secondaryMetric === "churn") {
                    return `${value}%`
                  }
                  return value.toString()
                }}
                yAxisId="right"
              />
            )}
            <Tooltip content={<CustomTooltip metric={metric} secondaryMetric={secondaryMetricKey} />} />
            <Legend />
            
            <Bar 
              dataKey={metricKey} 
              onClick={handleBarClick}
              className="cursor-pointer"
              yAxisId="left"
              name={
                metric === "value" ? "Total Value" :
                metric === "engagement" ? "Engagement Score" :
                metric === "retention" ? "Retention Rate" :
                metric === "conversion" ? "Conversion Rate" : 
                "Value"
              }
            >
              {chartData.map((entry) => {
                const segmentId = entry.id || entry.name.toLowerCase().replace(/\s+/g, '-')
                const isSelected = selectedSegment && segmentId === selectedSegment
                
                return (
                  <Cell 
                    key={`cell-${segmentId}`} 
                    fill={`url(#${getGradientId(segmentId)})`}
                    stroke={isSelected ? "#ffffff" : "transparent"}
                    strokeWidth={isSelected ? 2 : 0}
                    className={`transition-all duration-200 ${
                      isSelected ? 'opacity-100' : selectedSegment ? 'opacity-50' : 'opacity-100'
                    }`}
                  />
                )
              })}
            </Bar>
            
            {secondaryMetricKey && (
              <Line 
                type="monotone" 
                dataKey={secondaryMetricKey} 
                stroke="#ff7300" 
                yAxisId="right"
                name={
                  secondaryMetric === "value" ? "Total Value" :
                  secondaryMetric === "engagement" ? "Engagement Score" :
                  secondaryMetric === "retention" ? "Retention Rate" :
                  secondaryMetric === "conversion" ? "Conversion Rate" :
                  secondaryMetric === "growth" ? "Growth Rate" :
                  secondaryMetric === "churn" ? "Churn Risk" :
                  "Secondary Metric"
                }
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            )}
            
            {showAverage && (
              <ReferenceLine 
                y={averageValue} 
                yAxisId="left"
                stroke="#8884d8" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Average', 
                  position: 'right', 
                  fill: '#8884d8',
                  fontSize: 12 
                }} 
              />
            )}
            
            {showBrush && (
              <Brush 
                dataKey="name" 
                height={30} 
                stroke="#8884d8"
                startIndex={0}
                endIndex={Math.min(5, chartData.length - 1)}
                y={10}
              />
            )}
          </ComposedChart>
        )
        
      case 'bar':
      default:
        return (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: showBrush ? 60 : 10 }}
          >
            <defs>
              {chartData.map((entry) => {
                const segmentId = entry.id || entry.name.toLowerCase().replace(/\s+/g, '-')
                return (
                  <linearGradient key={segmentId} id={getGradientId(segmentId)} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={entry.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={entry.color} stopOpacity={0.3}/>
                  </linearGradient>
                )
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
            <XAxis 
              dataKey="name" 
              stroke="#88888860" 
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <YAxis 
              stroke="#88888860" 
              tick={{ fill: '#888888', fontSize: 12 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip metric={metric} />} />
            <Legend />
            <Bar 
              dataKey={metricKey} 
              onClick={handleBarClick}
              className="cursor-pointer"
            >
              {chartData.map((entry) => {
                const segmentId = entry.id || entry.name.toLowerCase().replace(/\s+/g, '-')
                const isSelected = selectedSegment && segmentId === selectedSegment
                
                return (
                  <Cell 
                    key={`cell-${segmentId}`} 
                    fill={`url(#${getGradientId(segmentId)})`}
                    stroke={isSelected ? "#ffffff" : "transparent"}
                    strokeWidth={isSelected ? 2 : 0}
                    className={`transition-all duration-200 ${
                      isSelected ? 'opacity-100' : selectedSegment ? 'opacity-50' : 'opacity-100'
                    }`}
                  />
                )
              })}
              {showDataLabels && (
                <LabelList 
                  dataKey={metricKey} 
                  position="top" 
                  formatter={(value: number) => {
                    if (metric === "value") return `$${value.toLocaleString()}`
                    if (metric === "retention" || metric === "conversion") return `${value}%`
                    return value.toString()
                  }}
                  className="text-xs"
                  fill="#888888"
                />
              )}
            </Bar>
            
            {showAverage && (
              <ReferenceLine 
                y={averageValue} 
                stroke="#ff7300" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Average', 
                  position: 'right', 
                  fill: '#ff7300',
                  fontSize: 12 
                }} 
              />
            )}
            
            {showBrush && (
              <Brush 
                dataKey="name" 
                height={30} 
                stroke="#8884d8"
                startIndex={0}
                endIndex={Math.min(5, chartData.length - 1)}
              />
            )}
          </BarChart>
        )
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chartType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        <ResponsiveContainer width="100%" height={height}>
          {hasError ? <ChartErrorFallback /> : renderChart()}
        </ResponsiveContainer>
      </motion.div>
    </AnimatePresence>
  )
} 