"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowRight,
  Filter,
  Download,
  Users,
  Calendar,
  RefreshCcw,
  Activity,
  DollarSign,
  Clock,
  Target,
  ChevronDown,
  Gauge,
  AlertCircle,
} from "lucide-react"
import dynamic from "next/dynamic"
import SegmentMetricsDashboard from "./segment-metrics-dashboard"

// Chart components with no SSR
const DynamicSegmentationChart = dynamic(() => import("./segmentation-chart"), { ssr: false })
const DynamicSegmentationPieChart = dynamic(() => import("./segmentation-pie-chart"), { ssr: false })

// Types for our component
export interface UserSegment {
  id: string
  name: string
  size: number
  totalValue: number
  conversionRate: number
  engagementScore: number
  retentionRate: number
  avgSessionTime: number
  avgOrderValue: number
  purchaseFrequency: number
  growthRate: number
  churnRisk: number
}

export interface UserSegmentationProps {
  height?: number
  compact?: boolean
  refreshTrigger?: number
  showDataLabels?: boolean
  segmentData?: UserSegment[]
  onError?: (error: Error) => void
}

// Mock data for user segments
const defaultSegments: UserSegment[] = [
  {
    id: "high-value",
    name: "High-Value Customers",
    size: 15,
    totalValue: 42500,
    conversionRate: 8.5,
    engagementScore: 9.2,
    retentionRate: 92,
    avgSessionTime: 12.5,
    avgOrderValue: 250,
    purchaseFrequency: 3.2,
    growthRate: 4.8,
    churnRisk: 12,
  },
  {
    id: "regular",
    name: "Regular Customers",
    size: 35,
    totalValue: 31000,
    conversionRate: 5.2,
    engagementScore: 7.5,
    retentionRate: 78,
    avgSessionTime: 8.2,
    avgOrderValue: 120,
    purchaseFrequency: 1.8,
    growthRate: 2.2,
    churnRisk: 28,
  },
  {
    id: "occasional",
    name: "Occasional Buyers",
    size: 25,
    totalValue: 15000,
    conversionRate: 3.1,
    engagementScore: 5.4,
    retentionRate: 45,
    avgSessionTime: 4.8,
    avgOrderValue: 85,
    purchaseFrequency: 0.8,
    growthRate: 1.5,
    churnRisk: 42,
  },
  {
    id: "new-users",
    name: "New Users",
    size: 20,
    totalValue: 8500,
    conversionRate: 2.8,
    engagementScore: 4.7,
    retentionRate: 35,
    avgSessionTime: 3.5,
    avgOrderValue: 65,
    purchaseFrequency: 0.5,
    growthRate: 8.5,
    churnRisk: 58,
  },
  {
    id: "at-risk",
    name: "At-Risk Users",
    size: 5,
    totalValue: 3000,
    conversionRate: 0.9,
    engagementScore: 2.1,
    retentionRate: 15,
    avgSessionTime: 1.2,
    avgOrderValue: 45,
    purchaseFrequency: 0.2,
    growthRate: -5.2,
    churnRisk: 89,
  },
]

/**
 * Helper function to get segment color based on segment ID
 */
const getSegmentColor = (segmentId: string): string => {
  const colorMap: Record<string, string> = {
    "high-value": "#22c55e", // green
    "regular": "#3b82f6", // blue
    "occasional": "#a855f7", // purple
    "new-users": "#eab308", // yellow
    "at-risk": "#ef4444", // red
  }
  return colorMap[segmentId] || "#cbd5e1" // default gray
}

/**
 * Error boundary component to catch errors in the chart rendering
 */
const ErrorFallback = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-full p-4 border border-red-300 bg-red-50 rounded-md">
    <div className="text-center">
      <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
      <p className="text-sm text-red-600">{message}</p>
    </div>
  </div>
)

export function UserSegmentationAnalysis({
  height = 400,
  compact = false,
  refreshTrigger = 0,
  showDataLabels = false,
  segmentData = defaultSegments,
  onError,
}: UserSegmentationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [activeView, setActiveView] = useState("overview")
  const [segments, setSegments] = useState<UserSegment[]>(segmentData)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("30d")
  const [metric, setMetric] = useState("value")
  const [chartType, setChartType] = useState<string>('donut')
  const [comparisonChartType, setComparisonChartType] = useState<string>('bar')

  // Reset error state when changing views
  useEffect(() => {
    setHasError(false)
    setErrorMessage("")
  }, [activeView])

  // Respond to refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger > 0) {
      handleRefresh()
    }
  }, [refreshTrigger])

  // Update segments when segmentData prop changes
  useEffect(() => {
    if (segmentData !== defaultSegments) {
      setSegments(segmentData)
    }
  }, [segmentData])

  /**
   * Handle refresh action - simulates API call for new data
   */
  const handleRefresh = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    
    // Simulate API call
    setTimeout(() => {
      try {
        // In a real app, this would be a fetch call to get new data
        
        // You could add randomization to the data for demo purposes
        const updatedSegments = segments.map(segment => ({
          ...segment,
          conversionRate: +(segment.conversionRate * (0.95 + Math.random() * 0.1)).toFixed(1),
          engagementScore: +(segment.engagementScore * (0.95 + Math.random() * 0.1)).toFixed(1),
          totalValue: Math.round(segment.totalValue * (0.95 + Math.random() * 0.1)),
        }))
        
        setSegments(updatedSegments)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setHasError(true)
        setErrorMessage("Failed to refresh data")
        if (onError && err instanceof Error) {
          onError(err)
        }
      }
    }, 800)
  }, [segments, onError])

  // Calculate total users - memoized to avoid recalculation
  const totalUsers = useMemo(() => 
    segments.reduce((acc, segment) => acc + segment.size, 0), 
    [segments]
  )
  
  /**
   * Get selected segment data object
   */
  const getSelectedSegmentData = useCallback(() => {
    if (!selectedSegment) return segments[0]
    return segments.find(segment => segment.id === selectedSegment) || segments[0]
  }, [selectedSegment, segments])

  /**
   * Format data for the chart based on active view and metric
   */
  const formatChartData = useMemo(() => {
    // Different formats based on the active view and metric
    if (activeView === "overview") {
      return segments.map(segment => ({
        name: segment.name,
        value: segment.size,
        totalValue: segment.totalValue,
        conversionRate: segment.conversionRate,
        color: getSegmentColor(segment.id),
        id: segment.id,
      }))
    }
    
    return segments.map(segment => ({
      name: segment.name,
      [metric]: 
        metric === "value" ? segment.totalValue :
        metric === "engagement" ? segment.engagementScore :
        metric === "retention" ? segment.retentionRate :
        metric === "conversion" ? segment.conversionRate :
        segment.size,
      color: getSegmentColor(segment.id),
      id: segment.id,
    }))
  }, [segments, activeView, metric])

  /**
   * Handle segment selection from charts or cards
   */
  const handleSegmentClick = useCallback((segmentId: string) => {
    setSelectedSegment(segmentId === selectedSegment ? null : segmentId)
  }, [selectedSegment])

  /**
   * Handle errors in chart rendering
   */
  const handleChartError = useCallback((error: Error) => {
    setHasError(true)
    setErrorMessage(error.message || "Failed to render chart")
    if (onError) {
      onError(error)
    }
  }, [onError])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-semibold">User Segmentation Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Segment users by behavior, demographics, and engagement to identify high-value groups
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] bg-background/50">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden sm:flex">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Schedule Reports</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="details">Segment Details</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Main visualization */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-base">Segment Distribution</CardTitle>
                    <CardDescription>User segments by size and value</CardDescription>
                  </div>
                  <Select defaultValue={chartType} onValueChange={(value) => setChartType(value as 'pie' | 'donut' | 'radial' | '3d')}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="donut">Donut Chart</SelectItem>
                      <SelectItem value="radial">Radial Chart</SelectItem>
                      <SelectItem value="3d">3D Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-[300px]">
                {hasError ? (
                  <ErrorFallback message={errorMessage || "Failed to render chart"} />
                ) : !compact ? (
                  <DynamicSegmentationPieChart 
                    data={formatChartData} 
                    height={300} 
                    onSegmentClick={handleSegmentClick}
                    selectedSegment={selectedSegment}
                    variant={chartType as 'pie' | 'donut' | 'radial' | '3d'}
                    animate={true}
                    showLabels={true}
                    onError={handleChartError}
                  />
                ) : null}
              </CardContent>
            </Card>

            {/* Key metrics */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Segment Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <SegmentMetricsDashboard 
                  segments={segments}
                  selectedSegment={selectedSegment}
                  onSelectSegment={handleSegmentClick}
                  animate={true}
                  showColorfulUI={false}
                />
              </CardContent>
            </Card>
          </div>

          {/* Segment cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {segments.map((segment) => (
              <Card 
                key={segment.id} 
                className={`overflow-hidden cursor-pointer transition-all ${
                  selectedSegment === segment.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSegmentClick(segment.id)}
              >
                <CardHeader className="pb-2" style={{ borderBottom: `2px solid ${getSegmentColor(segment.id)}` }}>
                  <CardTitle className="text-sm">{segment.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge>{segment.size}% of users</Badge>
                    <span className="text-xs text-muted-foreground">${segment.totalValue.toLocaleString()}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-3 pb-2 space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span>Engagement</span>
                      <span>{segment.engagementScore}/10</span>
                    </div>
                    <Progress value={segment.engagementScore * 10} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span>Retention</span>
                      <span>{segment.retentionRate}%</span>
                    </div>
                    <Progress value={segment.retentionRate} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span>Conversion</span>
                      <span>{segment.conversionRate}%</span>
                    </div>
                    <Progress value={segment.conversionRate * 10} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle className="text-base">Segment Comparison</CardTitle>
                  <CardDescription>Compare key metrics across segments</CardDescription>
                </div>
                <div className="mt-2 sm:mt-0">
                  <Select value={metric} onValueChange={setMetric}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="value">Total Value</SelectItem>
                      <SelectItem value="engagement">Engagement Score</SelectItem>
                      <SelectItem value="retention">Retention Rate</SelectItem>
                      <SelectItem value="conversion">Conversion Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[350px]">
              <div className="flex justify-end mb-2">
                <Select 
                  defaultValue={comparisonChartType} 
                  onValueChange={(value) => setComparisonChartType(value as 'bar' | 'grouped' | 'stacked' | 'composed')}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="grouped">Grouped Chart</SelectItem>
                    <SelectItem value="stacked">Stacked Chart</SelectItem>
                    <SelectItem value="composed">Composed Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {hasError ? (
                <ErrorFallback message={errorMessage || "Failed to render chart"} />
              ) : (
                <DynamicSegmentationChart 
                  data={formatChartData} 
                  height={300} 
                  metric={metric}
                  onSegmentClick={handleSegmentClick}
                  selectedSegment={selectedSegment}
                  showDataLabels={showDataLabels}
                  chartType={comparisonChartType as 'bar' | 'grouped' | 'stacked' | 'composed'}
                  showBrush={true}
                  animate={true}
                  showAverage={true}
                  secondaryMetric={metric === 'value' ? 'retention' : metric === 'retention' ? 'engagement' : 'value'}
                  onError={handleChartError}
                />
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Behavioral Metrics</CardTitle>
                <CardDescription>User activity and engagement patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {segments.map((segment) => (
                    <div 
                      key={`behavior-${segment.id}`} 
                      className={`p-3 rounded-md cursor-pointer transition-all ${
                        selectedSegment === segment.id ? 'bg-accent' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => handleSegmentClick(segment.id)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: getSegmentColor(segment.id) }}
                          />
                          <span className="font-medium text-sm">{segment.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{segment.size}%</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Engagement</p>
                          <p className="text-sm font-medium">{segment.engagementScore}/10</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Session Time</p>
                          <p className="text-sm font-medium">{segment.avgSessionTime} min</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Frequency</p>
                          <p className="text-sm font-medium">{segment.purchaseFrequency}/mo</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Economic Value</CardTitle>
                <CardDescription>Monetary contribution and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {segments.map((segment) => (
                    <div 
                      key={`value-${segment.id}`} 
                      className={`p-3 rounded-md cursor-pointer transition-all ${
                        selectedSegment === segment.id ? 'bg-accent' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => handleSegmentClick(segment.id)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: getSegmentColor(segment.id) }}
                          />
                          <span className="font-medium text-sm">{segment.name}</span>
                        </div>
                        <span className="text-sm font-medium">${segment.totalValue.toLocaleString()}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Avg Order</p>
                          <p className="text-sm font-medium">${segment.avgOrderValue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Growth</p>
                          <p className={`text-sm font-medium ${segment.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {segment.growthRate > 0 ? '+' : ''}{segment.growthRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Conversion</p>
                          <p className="text-sm font-medium">{segment.conversionRate}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Segment Details Tab */}
        <TabsContent value="details" className="space-y-4">
          {selectedSegment ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: getSegmentColor(getSelectedSegmentData().id) }}
                        /> 
                        {getSelectedSegmentData().name}
                      </CardTitle>
                      <CardDescription>
                        Detailed analysis and insights for this user segment
                      </CardDescription>
                    </div>
                    <Badge className="text-xs">{getSelectedSegmentData().size}% of users</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Total Value</p>
                      <p className="text-lg font-medium">${getSelectedSegmentData().totalValue.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Avg Order Value</p>
                      <p className="text-lg font-medium">${getSelectedSegmentData().avgOrderValue}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Retention Rate</p>
                      <p className="text-lg font-medium">{getSelectedSegmentData().retentionRate}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Churn Risk</p>
                      <p className="text-lg font-medium">{getSelectedSegmentData().churnRisk}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Engagement Score</p>
                      <p className="text-lg font-medium">{getSelectedSegmentData().engagementScore}/10</p>
                      <Progress value={getSelectedSegmentData().engagementScore * 10} className="h-1 mt-1" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Conversion Rate</p>
                      <p className="text-lg font-medium">{getSelectedSegmentData().conversionRate}%</p>
                      <Progress value={getSelectedSegmentData().conversionRate * 10} className="h-1 mt-1" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Avg Session Time</p>
                      <p className="text-lg font-medium">{getSelectedSegmentData().avgSessionTime} min</p>
                      <Progress value={getSelectedSegmentData().avgSessionTime * 6} className="h-1 mt-1" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Purchase Frequency</p>
                      <p className="text-lg font-medium">{getSelectedSegmentData().purchaseFrequency}/mo</p>
                      <Progress value={getSelectedSegmentData().purchaseFrequency * 20} className="h-1 mt-1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div>
                    <Badge 
                      variant="outline" 
                      className={getSelectedSegmentData().growthRate >= 0 ? 'text-green-500' : 'text-red-500'}
                    >
                      Growth Rate: {getSelectedSegmentData().growthRate > 0 ? '+' : ''}{getSelectedSegmentData().growthRate}%
                    </Badge>
                  </div>
                  <Button>Generate Detailed Report</Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Key Characteristics</CardTitle>
                    <CardDescription>Defining traits and patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-2 rounded-md bg-accent/50">
                        <span className="text-sm font-medium">Demographics</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getSelectedSegmentData().id === "high-value" && "Primarily 35-55 age range, higher income, urban locations"}
                          {getSelectedSegmentData().id === "regular" && "Diverse age range, mid-level income, suburban areas"}
                          {getSelectedSegmentData().id === "occasional" && "Younger demographic, 25-40, mixed income levels"}
                          {getSelectedSegmentData().id === "new-users" && "Diverse, skews towards younger users, 18-30 age range"}
                          {getSelectedSegmentData().id === "at-risk" && "Varied demographics, no clear pattern in age or income"}
                        </p>
                      </div>
                      <div className="p-2 rounded-md bg-accent/50">
                        <span className="text-sm font-medium">Behavior Patterns</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getSelectedSegmentData().id === "high-value" && "Regular purchases, high engagement with multiple products"}
                          {getSelectedSegmentData().id === "regular" && "Consistent usage, moderate engagement across core features"}
                          {getSelectedSegmentData().id === "occasional" && "Sporadic activity, focus on specific features"}
                          {getSelectedSegmentData().id === "new-users" && "Exploratory behavior, high initial engagement but inconsistent"}
                          {getSelectedSegmentData().id === "at-risk" && "Declining usage patterns, minimal engagement"}
                        </p>
                      </div>
                      <div className="p-2 rounded-md bg-accent/50">
                        <span className="text-sm font-medium">Channel Preference</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getSelectedSegmentData().id === "high-value" && "Multi-channel, high email open rates, direct engagement"}
                          {getSelectedSegmentData().id === "regular" && "Email and mobile app are primary channels"}
                          {getSelectedSegmentData().id === "occasional" && "Social media and mobile notifications preferred"}
                          {getSelectedSegmentData().id === "new-users" && "In-app notifications and tutorials most effective"}
                          {getSelectedSegmentData().id === "at-risk" && "Low response rate across all channels"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Recommended Actions</CardTitle>
                    <CardDescription>Suggested strategies for this segment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-2 rounded-md bg-accent/50">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Priority Level</span>
                          <Badge>
                            {getSelectedSegmentData().id === "high-value" && "High"}
                            {getSelectedSegmentData().id === "regular" && "Medium"}
                            {getSelectedSegmentData().id === "occasional" && "Medium"}
                            {getSelectedSegmentData().id === "new-users" && "High"}
                            {getSelectedSegmentData().id === "at-risk" && "Critical"}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-2 rounded-md bg-accent/50">
                        <span className="text-sm font-medium">Engagement Strategy</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getSelectedSegmentData().id === "high-value" && "Personalized offers, early access to new features, loyalty rewards"}
                          {getSelectedSegmentData().id === "regular" && "Feature education, upsell opportunities, personalized content"}
                          {getSelectedSegmentData().id === "occasional" && "Re-engagement campaigns, targeted promotions"}
                          {getSelectedSegmentData().id === "new-users" && "Onboarding optimization, first purchase incentives"}
                          {getSelectedSegmentData().id === "at-risk" && "Recovery campaign, exit survey, special retention offers"}
                        </p>
                      </div>
                      <div className="p-2 rounded-md bg-accent/50">
                        <span className="text-sm font-medium">Growth Opportunity</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getSelectedSegmentData().id === "high-value" && "Cross-selling premium features, referral programs, community building"}
                          {getSelectedSegmentData().id === "regular" && "Increasing purchase frequency, feature adoption expansion"}
                          {getSelectedSegmentData().id === "occasional" && "Improving retention, converting to regular users"}
                          {getSelectedSegmentData().id === "new-users" && "Accelerating onboarding, improving first-month experience"}
                          {getSelectedSegmentData().id === "at-risk" && "Identifying churn triggers, implementing preventative measures"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Implement Strategy</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Select a Segment</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mt-1">
                  Click on any segment from the overview or comparison tabs to view detailed insights and recommended actions
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setActiveView("overview")}>
                  Go to Overview
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 