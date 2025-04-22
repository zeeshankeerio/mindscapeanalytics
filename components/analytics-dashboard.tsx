"use client"

import type React from "react"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Calendar,
  ChevronDown,
  Clock,
  Zap,
  XCircle,
  Cpu,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate time series data
const generateTimeSeriesData = (days: number) => {
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const baseRequests = 1000 + Math.random() * 500
    const weekendFactor = date.getDay() === 0 || date.getDay() === 6 ? 0.7 : 1
    const hourlyVariation = []

    for (let hour = 0; hour < 24; hour++) {
      // Create time-of-day pattern with peak usage during business hours
      const timeOfDayFactor = hour >= 9 && hour <= 17 ? 1 + Math.sin(((hour - 9) * Math.PI) / 8) * 0.5 : 0.5

      hourlyVariation.push({
        hour,
        requests: Math.floor(baseRequests * weekendFactor * timeOfDayFactor + Math.random() * 100),
        latency: Math.floor(20 + Math.random() * 15 * timeOfDayFactor),
        errors: Math.floor(Math.random() * 10 * timeOfDayFactor),
        cpu: Math.floor(30 + Math.random() * 40 * timeOfDayFactor),
        memory: Math.floor(50 + Math.random() * 30 * timeOfDayFactor),
      })
    }

    const dailyRequests = hourlyVariation.reduce((sum, hour) => sum + hour.requests, 0)
    const avgLatency = hourlyVariation.reduce((sum, hour) => sum + hour.latency, 0) / 24
    const dailyErrors = hourlyVariation.reduce((sum, hour) => sum + hour.errors, 0)
    const avgCpu = hourlyVariation.reduce((sum, hour) => sum + hour.cpu, 0) / 24
    const avgMemory = hourlyVariation.reduce((sum, hour) => sum + hour.memory, 0) / 24

    data.push({
      date: date.toISOString().split("T")[0],
      requests: dailyRequests,
      latency: avgLatency,
      errors: dailyErrors,
      cpu: avgCpu,
      memory: avgMemory,
      hourly: hourlyVariation,
    })
  }

  return data
}

// Generate model performance data
const generateModelPerformanceData = () => {
  const models = [
    { name: "Image Classification", type: "Computer Vision" },
    { name: "Sentiment Analysis", type: "NLP" },
    { name: "Customer Churn", type: "Predictive" },
    { name: "Object Detection", type: "Computer Vision" },
    { name: "Text Generation", type: "NLP" },
    { name: "Recommendation", type: "Predictive" },
    { name: "Anomaly Detection", type: "Predictive" },
  ]

  return models.map((model) => {
    const baseAccuracy = 85 + Math.random() * 10
    const history = []

    // Generate historical accuracy data
    for (let i = 0; i < 10; i++) {
      const version = i + 1
      const improvement = Math.min(i * 0.5, 5) // Diminishing returns on improvements
      const randomVariation = Math.random() * 2 - 1 // Random variation between -1 and 1

      history.push({
        version: `v${version}.0`,
        accuracy: Math.min(99.5, baseAccuracy + improvement + randomVariation),
        date: new Date(Date.now() - (10 - i) * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      })
    }

    return {
      id: Math.floor(Math.random() * 10000),
      name: model.name,
      type: model.type,
      accuracy: history[history.length - 1].accuracy,
      latency: Math.floor(10 + Math.random() * 90),
      requests: Math.floor(10000 + Math.random() * 90000),
      history,
    }
  })
}

// Generate endpoint data
const generateEndpointData = () => {
  const endpoints = [
    { path: "/api/predict", type: "Prediction" },
    { path: "/api/classify", type: "Classification" },
    { path: "/api/generate", type: "Generation" },
    { path: "/api/analyze", type: "Analysis" },
    { path: "/api/detect", type: "Detection" },
  ]

  return endpoints.map((endpoint) => {
    const successRate = 95 + Math.random() * 4.9
    const errorRate = 100 - successRate

    return {
      id: Math.floor(Math.random() * 10000),
      path: endpoint.path,
      type: endpoint.type,
      requests: Math.floor(5000 + Math.random() * 45000),
      avgLatency: Math.floor(50 + Math.random() * 150),
      p95Latency: Math.floor(100 + Math.random() * 300),
      p99Latency: Math.floor(200 + Math.random() * 500),
      successRate,
      errorRate,
      status: successRate > 99 ? "Excellent" : successRate > 97 ? "Good" : "Needs Attention",
    }
  })
}

// Generate error distribution data
const generateErrorDistribution = () => {
  return [
    { name: "4xx Client Errors", value: Math.floor(50 + Math.random() * 30) },
    { name: "5xx Server Errors", value: Math.floor(20 + Math.random() * 20) },
    { name: "Timeouts", value: Math.floor(10 + Math.random() * 15) },
    { name: "Rate Limits", value: Math.floor(5 + Math.random() * 10) },
    { name: "Other", value: Math.floor(1 + Math.random() * 5) },
  ]
}

// Colors for charts
const COLORS = ["#ff0000", "#ff3333", "#ff6666", "#ff9999", "#ffcccc"]

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [activeMetric, setActiveMetric] = useState("requests")
  const [chartType, setChartType] = useState("line")
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData(30))
  const [modelPerformance, setModelPerformance] = useState(generateModelPerformanceData())
  const [endpointData, setEndpointData] = useState(generateEndpointData())
  const [errorDistribution, setErrorDistribution] = useState(generateErrorDistribution())

  // Filter data based on time range
  const getFilteredData = () => {
    const days =
      timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 30

    return timeSeriesData.slice(-days - 1)
  }

  const filteredData = getFilteredData()

  // Calculate summary metrics
  const calculateSummaryMetrics = () => {
    if (filteredData.length === 0) return null

    const current = filteredData[filteredData.length - 1]
    const previous = filteredData.length > 1 ? filteredData[filteredData.length - 2] : null

    const getPercentChange = (current: number, previous: number | null) => {
      if (!previous) return 0
      return ((current - previous) / previous) * 100
    }

    return {
      requests: {
        value: current.requests,
        change: getPercentChange(current.requests, previous?.requests),
      },
      latency: {
        value: current.latency,
        change: getPercentChange(current.latency, previous?.latency),
      },
      errors: {
        value: current.errors,
        change: getPercentChange(current.errors, previous?.errors),
      },
      cpu: {
        value: current.cpu,
        change: getPercentChange(current.cpu, previous?.cpu),
      },
      memory: {
        value: current.memory,
        change: getPercentChange(current.memory, previous?.memory),
      },
    }
  }

  const summaryMetrics = calculateSummaryMetrics()

  // Refresh data
  const refreshData = () => {
    setIsRefreshing(true)

    setTimeout(() => {
      setTimeSeriesData(generateTimeSeriesData(30))
      setModelPerformance(generateModelPerformanceData())
      setEndpointData(generateEndpointData())
      setErrorDistribution(generateErrorDistribution())
      setIsRefreshing(false)
    }, 1000)
  }

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  // Format metrics for display
  const formatMetric = (metric: string, value: number) => {
    switch (metric) {
      case "requests":
        return formatNumber(value)
      case "latency":
        return value.toFixed(1) + "ms"
      case "errors":
        return formatNumber(value)
      case "cpu":
        return value.toFixed(1) + "%"
      case "memory":
        return value.toFixed(1) + "%"
      default:
        return value.toString()
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Popover open={showCalendar} onOpenChange={setShowCalendar}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-black/90 border-white/10">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  setShowCalendar(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] bg-black/50 border-white/10">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/10">
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="border-white/10 hover:bg-white/5"
            onClick={refreshData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select value={activeMetric} onValueChange={setActiveMetric}>
            <SelectTrigger className="w-[140px] bg-black/50 border-white/10">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/10">
              <SelectItem value="requests">Requests</SelectItem>
              <SelectItem value="latency">Latency</SelectItem>
              <SelectItem value="errors">Errors</SelectItem>
              <SelectItem value="cpu">CPU Usage</SelectItem>
              <SelectItem value="memory">Memory Usage</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[120px] bg-black/50 border-white/10">
              <SelectValue placeholder="Chart type" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/10">
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary metrics */}
      {summaryMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Total Requests"
            value={formatMetric("requests", summaryMetrics.requests.value)}
            change={summaryMetrics.requests.change}
            icon={<Zap className="h-4 w-4" />}
          />
          <MetricCard
            title="Avg. Latency"
            value={formatMetric("latency", summaryMetrics.latency.value)}
            change={summaryMetrics.latency.change}
            icon={<Clock className="h-4 w-4" />}
            invertChange
          />
          <MetricCard
            title="Total Errors"
            value={formatMetric("errors", summaryMetrics.errors.value)}
            change={summaryMetrics.errors.change}
            icon={<XCircle className="h-4 w-4" />}
            invertChange
          />
          <MetricCard
            title="CPU Usage"
            value={formatMetric("cpu", summaryMetrics.cpu.value)}
            change={summaryMetrics.cpu.change}
            icon={<Cpu className="h-4 w-4" />}
            invertChange
          />
          <MetricCard
            title="Memory Usage"
            value={formatMetric("memory", summaryMetrics.memory.value)}
            change={summaryMetrics.memory.change}
            icon={<Database className="h-4 w-4" />}
            invertChange
          />
        </div>
      )}

      {/* Main charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-black/30 border-white/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="models">Model Performance</TabsTrigger>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                {timeRange === "24h"
                  ? "Last 24 hours"
                  : timeRange === "7d"
                    ? "Last 7 days"
                    : timeRange === "30d"
                      ? "Last 30 days"
                      : "Last 90 days"}{" "}
                overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    [activeMetric]: {
                      label: activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1),
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "line" ? (
                      <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="date"
                          stroke="rgba(255,255,255,0.5)"
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
                          }}
                        />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey={activeMetric}
                          stroke="var(--color-requests)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    ) : chartType === "area" ? (
                      <AreaChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="date"
                          stroke="rgba(255,255,255,0.5)"
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
                          }}
                        />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey={activeMetric}
                          stroke="var(--color-requests)"
                          fill="var(--color-requests)"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    ) : (
                      <BarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="date"
                          stroke="rgba(255,255,255,0.5)"
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
                          }}
                        />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey={activeMetric} fill="var(--color-requests)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-black/30 border-white/10">
              <CardHeader>
                <CardTitle>Hourly Distribution</CardTitle>
                <CardDescription>Request patterns throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      requests: {
                        label: "Requests",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filteredData[filteredData.length - 1]?.hourly || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="hour" stroke="rgba(255,255,255,0.5)" tickFormatter={(value) => `${value}:00`} />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="requests" fill="var(--color-requests)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-white/10">
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
                <CardDescription>Breakdown of error types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={errorDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {errorDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} errors`, "Count"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
              <CardDescription>Accuracy and latency metrics for all models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelPerformance.map((model) => (
                  <div
                    key={model.id}
                    className="p-4 rounded-lg bg-black/20 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{model.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Badge variant="outline" className="bg-black/50 border-white/10">
                            {model.type}
                          </Badge>
                          <span>•</span>
                          <span>{formatNumber(model.requests)} requests</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-white/70">Accuracy</p>
                          <p className="font-medium">{model.accuracy.toFixed(1)}%</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-white/70">Latency</p>
                          <p className="font-medium">{model.latency}ms</p>
                        </div>

                        <div className="w-32 h-16">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={model.history}>
                              <Line type="monotone" dataKey="accuracy" stroke="#ff0000" strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Performance metrics for all API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpointData.map((endpoint) => (
                  <div
                    key={endpoint.id}
                    className="p-4 rounded-lg bg-black/20 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{endpoint.path}</h3>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Badge variant="outline" className="bg-black/50 border-white/10">
                            {endpoint.type}
                          </Badge>
                          <span>•</span>
                          <span>{formatNumber(endpoint.requests)} requests</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-white/70">Avg Latency</p>
                          <p className="font-medium">{endpoint.avgLatency}ms</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-white/70">P95</p>
                          <p className="font-medium">{endpoint.p95Latency}ms</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-white/70">Success Rate</p>
                          <p className="font-medium">{endpoint.successRate.toFixed(1)}%</p>
                        </div>

                        <Badge
                          className={
                            endpoint.status === "Excellent"
                              ? "bg-green-500/20 text-green-500"
                              : endpoint.status === "Good"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-yellow-500/20 text-yellow-500"
                          }
                        >
                          {endpoint.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-black/30 border-white/10">
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
                <CardDescription>Breakdown of error types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={errorDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {errorDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} errors`, "Count"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-white/10">
              <CardHeader>
                <CardTitle>Error Trend</CardTitle>
                <CardDescription>Error rate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      errors: {
                        label: "Errors",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="date"
                          stroke="rgba(255,255,255,0.5)"
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
                          }}
                        />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="errors"
                          stroke="var(--color-errors)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Top Error Sources</CardTitle>
              <CardDescription>Endpoints with the highest error rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpointData
                  .sort((a, b) => b.errorRate - a.errorRate)
                  .slice(0, 3)
                  .map((endpoint) => (
                    <div
                      key={endpoint.id}
                      className="p-4 rounded-lg bg-black/20 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{endpoint.path}</h3>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <Badge variant="outline" className="bg-black/50 border-white/10">
                              {endpoint.type}
                            </Badge>
                            <span>•</span>
                            <span>{formatNumber(endpoint.requests)} requests</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm text-white/70">Error Rate</p>
                            <p className="font-medium text-red-500">{endpoint.errorRate.toFixed(1)}%</p>
                          </div>

                          <div className="text-center">
                            <p className="text-sm text-white/70">Avg Latency</p>
                            <p className="font-medium">{endpoint.avgLatency}ms</p>
                          </div>

                          <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Metric card component
function MetricCard({
  title,
  value,
  change,
  icon,
  invertChange = false,
}: {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  invertChange?: boolean
}) {
  const isPositive = invertChange ? change < 0 : change > 0
  const isNegative = invertChange ? change > 0 : change < 0

  return (
    <Card className="bg-black/30 border-white/10">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-white/70">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className="bg-black/50 p-2 rounded-full">{icon}</div>
        </div>
        <div className="flex items-center mt-2 text-xs">
          {change === 0 ? (
            <span className="text-white/50">No change</span>
          ) : (
            <>
              <span className={isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-white/50"}>
                {isPositive && "+"}
                {change.toFixed(1)}%
              </span>
              <span className="text-white/50 ml-1">vs previous</span>
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 ml-1 text-green-500" />
              ) : isNegative ? (
                <ArrowDownRight className="h-3 w-3 ml-1 text-red-500" />
              ) : null}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

