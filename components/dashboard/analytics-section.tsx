"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Sparkles,
  Settings,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Filter,
  Calendar,
  Download as DownloadIcon,
  Share2,
  MoreVertical,
} from "lucide-react"

interface AnalyticsMetric {
  name: string
  value: number
  change: number
  trend: "up" | "down"
  target: number
  unit: string
  description: string
}

interface AnalyticsData {
  metrics: AnalyticsMetric[]
  timeRange: "day" | "week" | "month" | "year"
  filters: {
    model: string[]
    region: string[]
    type: string[]
  }
}

const mockAnalyticsData: AnalyticsData = {
  metrics: [
    {
      name: "Total Requests",
      value: 2456789,
      change: 12.5,
      trend: "up",
      target: 3000000,
      unit: "requests",
      description: "Total number of API requests processed",
    },
    {
      name: "Average Response Time",
      value: 45,
      change: -5.2,
      trend: "up",
      target: 50,
      unit: "ms",
      description: "Average time taken to process requests",
    },
    {
      name: "Success Rate",
      value: 99.9,
      change: 0.1,
      trend: "up",
      target: 99.95,
      unit: "%",
      description: "Percentage of successful requests",
    },
    {
      name: "Active Users",
      value: 12345,
      change: 8.3,
      trend: "up",
      target: 15000,
      unit: "users",
      description: "Number of active users in the last 24 hours",
    },
  ],
  timeRange: "day",
  filters: {
    model: ["GPT-4", "Image Classification"],
    region: ["US", "EU", "Asia"],
    type: ["API", "Web", "Mobile"],
  },
}

export function AnalyticsSection() {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTimeRange, setSelectedTimeRange] = useState<"day" | "week" | "month" | "year">("day")

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        metrics: prevData.metrics.map(metric => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * 100,
          change: metric.change + (Math.random() - 0.5) * 2,
        })),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleTimeRangeChange = (range: "day" | "week" | "month" | "year") => {
    setSelectedTimeRange(range)
    // Here you would typically fetch new data based on the selected time range
  }

  const handleExportData = () => {
    // Implement data export functionality
    console.log("Exporting data...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            {selectedTimeRange}
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleExportData}>
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.name}
                    </CardTitle>
                    <Badge
                      variant={metric.trend === "up" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {metric.trend === "up" ? "+" : ""}{metric.change}%
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metric.value.toLocaleString()}
                      <span className="text-sm text-muted-foreground ml-1">
                        {metric.unit}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          Target: {metric.target.toLocaleString()} {metric.unit}
                        </span>
                        <span className="text-xs font-medium">
                          {((metric.value / metric.target) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={(metric.value / metric.target) * 100}
                        className="h-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-background/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Request Volume
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Request Volume Chart (Placeholder)
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-background/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Request Distribution
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Request Distribution Chart (Placeholder)
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Network I/O</span>
                      <span className="text-sm text-muted-foreground">2.4 GB/s</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Disk I/O</span>
                      <span className="text-sm text-muted-foreground">1.2 GB/s</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Performance Trends Chart (Placeholder)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Users</span>
                      <span className="text-sm text-muted-foreground">12,345</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Users</span>
                      <span className="text-sm text-muted-foreground">8,234</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">New Users</span>
                      <span className="text-sm text-muted-foreground">234</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Churn Rate</span>
                      <span className="text-sm text-muted-foreground">2.3%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </div>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  User Growth Chart (Placeholder)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Growth</span>
                      <span className="text-sm text-muted-foreground">+12.5%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">User Growth</span>
                      <span className="text-sm text-muted-foreground">+8.3%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Revenue Growth</span>
                      <span className="text-sm text-muted-foreground">+15.2%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Market Share</span>
                      <span className="text-sm text-muted-foreground">23.4%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Market Trends Chart (Placeholder)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 