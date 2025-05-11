"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  mockModelPerformance,
  mockPerformanceData,
  mockUsageData,
} from "@/lib/mock-data"
import {
  BarChart,
  Brain,
  Database,
  LineChart,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  CheckCircle,
  BarChart2,
  PieChart,
  ArrowRight,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  RefreshCcw,
  Download,
  ChevronDown,
  Users,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Add required interfaces
interface ChartProps {
  height?: number;
  compact?: boolean;
  refreshTrigger?: number;
  showDataLabels?: boolean;
}

// ApiUsageChart component props
interface ApiUsageChartProps {
  height?: number;
  compact?: boolean;
  refreshTrigger?: number;
  showDataLabels?: boolean;
  data?: {
    labels: string[];
    datasets: {
      name: string;
      data: number[];
    }[];
    total: number;
  }
}

// SystemHealthChart component props 
interface SystemHealthChartProps {
  height?: number;
  compact?: boolean;
  refreshTrigger?: number;
  showDataLabels?: boolean;
}

// Extend ModelPerformance type with missing properties
interface EnhancedModelPerformance {
  modelId: string;
  name: string;
  accuracy: number;
  averageLatency: number;
  totalRequests: number;
  status: string;
  errorRate: number;
}

// Import chart components with proper typing
import dynamic from "next/dynamic"
const ModelPerformanceChart = dynamic<ChartProps>(() => 
  import("@/components/dashboard/model-performance-chart").then(mod => mod.ModelPerformanceChart), 
  { ssr: false }
)
const ApiUsageChart = dynamic<ApiUsageChartProps>(() => 
  import("@/components/dashboard/api-usage-chart").then(mod => mod.ApiUsageChart), 
  { ssr: false }
)
const SystemHealthChart = dynamic<SystemHealthChartProps>(() => 
  import("@/components/dashboard/system-health-chart").then(mod => mod.SystemHealthChart), 
  { ssr: false }
)

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Define gradient and shadow styles for cards
  const gradients = {
    primary: "bg-gradient-to-br from-violet-600 to-indigo-600",
    secondary: "bg-gradient-to-br from-blue-500 to-cyan-400",
    success: "bg-gradient-to-br from-green-500 to-emerald-400",
    warning: "bg-gradient-to-br from-amber-500 to-yellow-400",
    danger: "bg-gradient-to-br from-red-500 to-rose-400",
    info: "bg-gradient-to-br from-sky-500 to-blue-400",
    purple: "bg-gradient-to-br from-purple-600 to-pink-600",
  }
  
  const shadows = {
    sm: "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
    md: "shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
    lg: "shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    xl: "shadow-[0_12px_32px_rgba(0,0,0,0.14)]",
  }

  // Convert model performance data to enhanced type with errorRate
  const enhancedModels = mockModelPerformance.map(model => ({
    ...model,
    // Add missing errorRate property - in a real app this would come from the API
    errorRate: Math.max(0.1, Math.min(5, (100 - model.accuracy) / 10))
  })) as EnhancedModelPerformance[]

  // Calculate metrics from enhanced model data
  const averageAccuracy = (enhancedModels.reduce((acc, curr) => acc + curr.accuracy, 0) / enhancedModels.length).toFixed(1)
  const averageLatency = (enhancedModels.reduce((acc, curr) => acc + curr.averageLatency, 0) / enhancedModels.length).toFixed(1)
  const totalRequests = enhancedModels.reduce((acc, curr) => acc + curr.totalRequests, 0)
  const errorRate = (enhancedModels.reduce((acc, curr) => acc + curr.errorRate, 0) / enhancedModels.length).toFixed(2)

  // Simulated trend data (would come from API in real app)
  const accuracyTrend = +1.2
  const latencyTrend = -0.8
  const requestsTrend = +15.3
  const errorRateTrend = -0.4

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshTrigger(prev => prev + 1)
      setIsLoading(false)
    }, 800)
  }

  // Filter models based on performance
  const highPerformingModels = enhancedModels.filter(model => model.accuracy > 90)
  const needsAttentionModels = enhancedModels.filter(model => model.errorRate > 1 || model.accuracy < 85)

  return (
    <div className="w-full space-y-4 pb-8 px-2 sm:px-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Monitor performance, usage, and trends across your AI models and APIs
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] sm:w-[140px] bg-background/50">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
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

      {/* Featured Analytics Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/analytics/segmentation">
          <Card className={`border-0 ${gradients.primary} text-white ${shadows.lg} hover:shadow-xl transition-all cursor-pointer h-full`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-medium">User Segmentation Analysis</CardTitle>
                <div className="flex items-center mt-1">
                  <Badge className="bg-white/20 text-white text-xs">Active</Badge>
                </div>
              </div>
              <div className="bg-white/10 p-2 rounded-full">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-white/80">
                Segment users by behavior, demographics, and engagement to identify high-value groups
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Badge variant="outline" className="text-xs border-white/30 text-white">Intermediate</Badge>
            </CardFooter>
          </Card>
        </Link>
        
        {/* Other analytics cards can be added here */}
        <Card className={`border-0 ${gradients.danger} text-white ${shadows.lg} hover:shadow-xl transition-all cursor-pointer h-full`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Anomaly Detection</CardTitle>
            <div className="bg-white/10 p-2 rounded-full">
              <AlertCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-white/80">
              Identify unusual patterns and outliers across system metrics and user behavior
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Badge variant="outline" className="text-xs border-white/30 text-white">Advanced</Badge>
          </CardFooter>
        </Card>
        
        <Card className={`border-0 ${gradients.secondary} text-white ${shadows.lg} hover:shadow-xl transition-all cursor-pointer h-full`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Correlation Analysis</CardTitle>
            <div className="bg-white/10 p-2 rounded-full">
              <BarChart2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-white/80">
              Discover hidden relationships between different data points and business outcomes
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Badge variant="outline" className="text-xs border-white/30 text-white">Advanced</Badge>
          </CardFooter>
        </Card>
        
        <Card className={`border-0 ${gradients.success} text-white ${shadows.lg} hover:shadow-xl transition-all cursor-pointer h-full`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Predictive Modeling</CardTitle>
            <div className="bg-white/10 p-2 rounded-full">
              <LineChart className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-white/80">
              Build and deploy custom ML models to predict specific business outcomes
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Badge variant="outline" className="text-xs border-white/30 text-white">Advanced</Badge>
          </CardFooter>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="w-full rounded-xl overflow-x-auto flex-nowrap overflow-scrolling-touch pb-1 bg-slate-800/5 p-1 backdrop-blur-sm">
          <TabsTrigger 
            value="overview" 
            className={`rounded-lg text-sm relative ${activeTab === "overview" ? 
              "bg-gradient-to-br from-violet-500/20 to-indigo-600/20 text-indigo-600 font-medium" : ""}`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="models" 
            className={`rounded-lg text-sm relative ${activeTab === "models" ? 
              "bg-gradient-to-br from-violet-500/20 to-indigo-600/20 text-indigo-600 font-medium" : ""}`}
          >
            Models
          </TabsTrigger>
          <TabsTrigger 
            value="api" 
            className={`rounded-lg text-sm relative ${activeTab === "api" ? 
              "bg-gradient-to-br from-violet-500/20 to-indigo-600/20 text-indigo-600 font-medium" : ""}`}
          >
            API Usage
          </TabsTrigger>
          <TabsTrigger 
            value="system" 
            className={`rounded-lg text-sm relative ${activeTab === "system" ? 
              "bg-gradient-to-br from-violet-500/20 to-indigo-600/20 text-indigo-600 font-medium" : ""}`}
          >
            System Health
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Key Metrics */}
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            <Card className={`border-0 ${shadows.md} overflow-hidden`}>
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${gradients.secondary} text-white`}>
                <CardTitle className="text-xs sm:text-sm font-medium">Average Accuracy</CardTitle>
                <div className="rounded-full bg-white/10 p-1">
                  <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-2 sm:pt-4">
                <div className="text-xl sm:text-2xl font-bold">{averageAccuracy}%</div>
                <div className="flex items-center mt-1">
                  <Badge className={`mr-1 text-xs ${accuracyTrend > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {accuracyTrend > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {Math.abs(accuracyTrend)}%
                  </Badge>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">vs last period</p>
                </div>
                <Progress className="h-1 mt-2 sm:mt-3" value={+averageAccuracy} />
              </CardContent>
            </Card>

            <Card className={`border-0 ${shadows.md} overflow-hidden`}>
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${gradients.danger} text-white`}>
                <CardTitle className="text-xs sm:text-sm font-medium">Average Latency</CardTitle>
                <div className="rounded-full bg-white/10 p-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-2 sm:pt-4">
                <div className="text-xl sm:text-2xl font-bold">{averageLatency}ms</div>
                <div className="flex items-center mt-1">
                  <Badge className={`mr-1 text-xs ${latencyTrend < 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {latencyTrend < 0 ? <ArrowDownRight className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1" />}
                    {Math.abs(latencyTrend)}%
                  </Badge>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">vs last period</p>
                </div>
                <Progress className="h-1 mt-2 sm:mt-3" value={100 - (+averageLatency/5*10)} />
              </CardContent>
            </Card>

            <Card className={`border-0 ${shadows.md} overflow-hidden`}>
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${gradients.success} text-white`}>
                <CardTitle className="text-xs sm:text-sm font-medium">Total Requests</CardTitle>
                <div className="rounded-full bg-white/10 p-1">
                  <BarChart className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-2 sm:pt-4">
                <div className="text-xl sm:text-2xl font-bold">{(totalRequests/1000).toFixed(1)}k</div>
                <div className="flex items-center mt-1">
                  <Badge className={`mr-1 text-xs ${requestsTrend > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {requestsTrend > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {Math.abs(requestsTrend)}%
                  </Badge>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">vs last period</p>
                </div>
                <Progress className="h-1 mt-2 sm:mt-3" value={85} />
              </CardContent>
            </Card>

            <Card className={`border-0 ${shadows.md} overflow-hidden`}>
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${gradients.warning} text-white`}>
                <CardTitle className="text-xs sm:text-sm font-medium">Error Rate</CardTitle>
                <div className="rounded-full bg-white/10 p-1">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-2 sm:pt-4">
                <div className="text-xl sm:text-2xl font-bold">{errorRate}%</div>
                <div className="flex items-center mt-1">
                  <Badge className={`mr-1 text-xs ${errorRateTrend < 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {errorRateTrend < 0 ? <ArrowDownRight className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1" />}
                    {Math.abs(errorRateTrend)}%
                  </Badge>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">vs last period</p>
                </div>
                <Progress className="h-1 mt-2 sm:mt-3" value={100 - (+errorRate * 20)} />
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader className="py-3 sm:py-4">
                <CardTitle className="text-sm sm:text-base">API Usage Trends</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Request volume over time by endpoint</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] sm:h-[300px]">
                {typeof ApiUsageChart !== 'undefined' && (
                  <ApiUsageChart height={300} refreshTrigger={refreshTrigger} />
                )}
          </CardContent>
        </Card>
            <Card className="col-span-1">
              <CardHeader className="py-3 sm:py-4">
                <CardTitle className="text-sm sm:text-base">Model Performance</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Accuracy vs. latency comparison</CardDescription>
          </CardHeader>
              <CardContent className="h-[250px] sm:h-[300px]">
                {typeof ModelPerformanceChart !== 'undefined' && (
                  <ModelPerformanceChart height={300} refreshTrigger={refreshTrigger} />
                )}
          </CardContent>
        </Card>
      </div>

          {/* Status and Insights */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="py-3 sm:py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm sm:text-base">Models Requiring Attention</CardTitle>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {needsAttentionModels.length} models
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {needsAttentionModels.length > 0 ? (
                    needsAttentionModels.map((model) => (
                      <div key={model.modelId} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 bg-muted/30 rounded-md">
                        <div className="flex items-center gap-2 mb-2 sm:mb-0">
                          <div className={`w-2 h-2 rounded-full ${model.errorRate > 2 ? 'bg-red-500' : 'bg-amber-500'}`} />
                          <span className="text-sm font-medium">{model.name}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] sm:text-xs text-muted-foreground">Accuracy</span>
                            <span className="text-xs sm:text-sm font-medium">{model.accuracy.toFixed(1)}%</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] sm:text-xs text-muted-foreground">Error Rate</span>
                            <span className="text-xs sm:text-sm font-medium">{model.errorRate.toFixed(2)}%</span>
                          </div>
                          <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center p-4 bg-muted/30 rounded-md">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">All models performing within acceptable parameters</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto text-xs sm:text-sm">
                  View All Models
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="py-3 sm:py-4">
                <CardTitle className="text-sm sm:text-base">Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm">CPU Usage</span>
                      <span className="text-xs sm:text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-1.5 sm:h-2" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm">Memory Usage</span>
                      <span className="text-xs sm:text-sm font-medium">43%</span>
                    </div>
                    <Progress value={43} className="h-1.5 sm:h-2" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm">Storage Usage</span>
                      <span className="text-xs sm:text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-1.5 sm:h-2" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm">Network Bandwidth</span>
                      <span className="text-xs sm:text-sm font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-1.5 sm:h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                  View System Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Model Performance Analysis</h3>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" /> Filter
              </Button>
        </div>
      </div>

          <Card>
            <CardHeader>
              <CardTitle>Model Comparison</CardTitle>
              <CardDescription>Compare key metrics across all models</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {typeof ModelPerformanceChart !== 'undefined' && (
                <ModelPerformanceChart height={400} showDataLabels={true} refreshTrigger={refreshTrigger} />
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {enhancedModels.map((model) => (
              <Card key={model.modelId} className="overflow-hidden">
                <CardHeader className="bg-muted/10 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium">{model.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={model.status.includes("Operational") ? "text-green-500 bg-green-500/10" : ""}
                    >
                      {model.status}
                    </Badge>
                  </div>
                  <CardDescription>{model.modelId}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Accuracy</span>
                      </div>
                      <div className="text-sm font-medium">{model.accuracy.toFixed(1)}%</div>
                    </div>
                    <Progress value={model.accuracy} className="h-1" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Avg. Latency</span>
                      </div>
                      <div className="text-sm font-medium">{model.averageLatency.toFixed(1)}ms</div>
                    </div>
                    <Progress 
                      value={Math.min(model.averageLatency / 2, 100)} 
                      className="h-1" 
                    />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Requests</span>
                      </div>
                      <div className="text-sm font-medium">{model.totalRequests.toLocaleString()}</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Error Rate</span>
                      </div>
                      <div className="text-sm font-medium">{model.errorRate.toFixed(2)}%</div>
                    </div>
                    <Progress 
                      value={model.errorRate * 10} 
                      className="h-1" 
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/5 flex justify-between">
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Optimize
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* API Usage Tab */}
        <TabsContent value="api" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">API Usage Statistics</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-1" /> Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Export Data
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Request Volume</CardTitle>
              <CardDescription>Request patterns over time by endpoint</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {typeof ApiUsageChart !== 'undefined' && (
                <ApiUsageChart height={400} showDataLabels={true} refreshTrigger={refreshTrigger} />
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top API Endpoints</CardTitle>
                <CardDescription>By request volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockUsageData.sort((a, b) => b.requests - a.requests).map((endpoint, index) => (
                    <div key={endpoint.endpoint} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium">{endpoint.endpoint}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">Requests</span>
                          <span className="font-medium">{endpoint.requests.toLocaleString()}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Analysis</CardTitle>
                <CardDescription>Error rates by endpoint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockUsageData.sort((a, b) => (b.errors / b.requests) - (a.errors / a.requests)).map((endpoint) => (
                    <div key={endpoint.endpoint} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          (endpoint.errors / endpoint.requests) > 0.05 
                            ? 'bg-red-500' 
                            : (endpoint.errors / endpoint.requests) > 0.01 
                              ? 'bg-amber-500' 
                              : 'bg-green-500'
                        }`} />
                        <span className="font-medium">{endpoint.endpoint}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">Error Rate</span>
                          <span className="font-medium">{((endpoint.errors / endpoint.requests) * 100).toFixed(2)}%</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Health Tab */}
        <TabsContent value="system" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">System Health Monitoring</h3>
            <div className="flex items-center gap-2">
              <Select defaultValue="6h">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last hour</SelectItem>
                  <SelectItem value="6h">Last 6 hours</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCcw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Resource Utilization</CardTitle>
              <CardDescription>CPU, Memory, and Network usage over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {typeof SystemHealthChart !== 'undefined' && (
                <SystemHealthChart height={400} refreshTrigger={refreshTrigger} />
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Service Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <span className="font-medium">API Gateway</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <span className="font-medium">Authentication Service</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <span className="font-medium">Machine Learning APIs</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <span className="font-medium">Storage Service</span>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                      Degraded
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <span className="font-medium">Database Clusters</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Operational
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Uptime Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last 24 Hours</span>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                      <span className="text-sm">Last 7 Days</span>
                      <span className="text-sm font-medium">99.98%</span>
                    </div>
                    <Progress value={99.98} className="h-2" />
                  </div>
                  <div className="space-y-2">
                  <div className="flex items-center justify-between">
                      <span className="text-sm">Last 30 Days</span>
                      <span className="text-sm font-medium">99.95%</span>
                    </div>
                    <Progress value={99.95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                  <div className="flex items-center justify-between">
                      <span className="text-sm">Last 90 Days</span>
                      <span className="text-sm font-medium">99.92%</span>
                    </div>
                    <Progress value={99.92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recent Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 bg-amber-500/10 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium text-amber-500">Storage Service Degradation</div>
                      <Badge variant="outline" className="text-xs">Ongoing</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Started 35 minutes ago. Increased latency in file storage operations.</p>
                  </div>
                  <div className="p-2 bg-green-500/10 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium text-green-500">API Rate Limiting Issue</div>
                      <Badge variant="outline" className="text-xs">Resolved</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Yesterday, 14:22. Incorrect rate limiting applied to premium users.</p>
                  </div>
                  <div className="p-2 bg-green-500/10 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium text-green-500">Database Performance</div>
                      <Badge variant="outline" className="text-xs">Resolved</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">3 days ago. Query optimization applied to improve response times.</p>
        </div>
      </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Incident History
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

