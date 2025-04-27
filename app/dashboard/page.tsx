"use client"

import { useState, useEffect, Suspense, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

// Icons import
import {
  Activity, AlertCircle, ArrowUpRight, ArrowDownRight, 
  Brain, CheckCircle2, XCircle, Info, 
  BrainCircuit, CircuitBoard, ShieldCheck, 
  Sparkles, CpuIcon, MoveRight, Star, AlertTriangle
} from "lucide-react"

// Lazily loaded components
import dynamic from "next/dynamic"
const ApiUsageChart = dynamic(() => import("@/components/dashboard/api-usage-chart").then(mod => ({ default: mod.ApiUsageChart })), {
  ssr: false,
  loading: () => <ChartSkeleton />
})

const ModelPerformanceChart = dynamic(() => import("@/components/dashboard/model-performance-chart").then(mod => ({ default: mod.ModelPerformanceChart })), {
  ssr: false,
  loading: () => <ChartSkeleton />
})

const SystemHealthChart = dynamic(() => import("@/components/dashboard/system-health-chart").then(mod => ({ default: mod.SystemHealthChart })), {
  ssr: false,
  loading: () => <ChartSkeleton />
})

// Types
interface SystemAlert {
  id: string
  title: string
  message: string
  type: "success" | "error" | "warning" | "info"
  timestamp: Date
  priority: "high" | "medium" | "low"
}

interface DashboardStat {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  color: string
  aiInsight: string
  details: {
    label: string
    value: string
  }[]
}

interface ApiResponse<T> {
  data: T
  success: boolean
}

// Mock data
const mockStats: DashboardStat[] = [
  {
    title: "API Requests",
    value: "2.4M",
    change: "+12.5%",
    trend: "up",
    icon: <CircuitBoard className="h-5 w-5" />,
    color: "text-blue-500",
    aiInsight: "API usage shows healthy growth with optimal response times",
    details: [
      { label: "Success Rate", value: "99.9%" },
      { label: "Avg Response", value: "45ms" },
      { label: "Peak Load", value: "12k req/s" },
    ],
  },
  {
    title: "Model Performance",
    value: "98.5%",
    change: "+0.3%",
    trend: "up",
    icon: <BrainCircuit className="h-5 w-5" />,
    color: "text-purple-500",
    aiInsight: "Model accuracy improving steadily with new training data",
    details: [
      { label: "Training", value: "92%" },
      { label: "Inference", value: "120ms" },
      { label: "Confidence", value: "0.95" },
    ],
  },
  {
    title: "System Health",
    value: "99.9%",
    change: "0%",
    trend: "up",
    icon: <CpuIcon className="h-5 w-5" />,
    color: "text-green-500",
    aiInsight: "System operating at optimal capacity with balanced resource usage",
    details: [
      { label: "CPU", value: "65%" },
      { label: "Memory", value: "75%" },
      { label: "Storage", value: "45%" },
    ],
  },
  {
    title: "Security Status",
    value: "Protected",
    change: "Active",
    trend: "up",
    icon: <ShieldCheck className="h-5 w-5" />,
    color: "text-yellow-500",
    aiInsight: "All security measures active with no suspicious activities",
    details: [
      { label: "Threats", value: "24" },
      { label: "Last Scan", value: "2h ago" },
      { label: "Firewall", value: "Active" },
    ],
  },
]

const mockAlerts: SystemAlert[] = [
  {
    id: "1",
    title: "High API Usage",
    message: "API requests exceeded 90% of capacity",
    type: "warning",
    timestamp: new Date(),
    priority: "high",
  },
  {
    id: "2",
    title: "Model Update",
    message: "New model version deployed successfully",
    type: "success",
    timestamp: new Date(),
    priority: "medium",
  },
  {
    id: "3",
    title: "System Warning",
    message: "CPU usage above 80%",
    type: "error",
    timestamp: new Date(),
    priority: "high",
  },
]

// API fetcher functions
const statsFetcher = (): Promise<ApiResponse<DashboardStat[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockStats, success: true })
    }, 800)
  })
}

const alertsFetcher = (): Promise<ApiResponse<SystemAlert[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockAlerts, success: true })
    }, 600)
  })
}

// Skeleton Components
const StatCardSkeleton = () => (
  <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm shadow-md border-0">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-700/70 via-red-500/70 to-red-700/70 opacity-80"></div>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-5 w-5 rounded-full" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-[120px] mb-2" />
      <Skeleton className="h-4 w-[80px] mb-4" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between border-t border-border/5 pt-2">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[40px]" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const ChartSkeleton = () => (
  <div className="w-full h-[250px] flex items-center justify-center">
    <div className="space-y-4 w-full">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-4 w-10" />
        ))}
      </div>
    </div>
  </div>
)

// Error UI component
const ChartErrorFallback = () => (
  <div className="text-center py-6 bg-red-500/5 rounded-lg border border-red-500/20">
    <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
    <p className="font-medium">Error loading chart</p>
    <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
  </div>
)

// Main Dashboard Components
const StatCard = ({ stat }: { stat: DashboardStat }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="transition-all"
  >
    <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border-0 h-full">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-700/70 via-red-500/70 to-red-700/70 opacity-80 transition-opacity"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {stat.title}
        </CardTitle>
        <div className={`p-2 rounded-full ${stat.color} bg-black/50 shadow-md backdrop-blur-sm`}>
          {stat.icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          {stat.trend === "up" ? (
            <span className="text-green-500 flex items-center">
              <ArrowUpRight className="h-3 w-3" /> {stat.change}
            </span>
          ) : (
            <span className="text-red-500 flex items-center">
              <ArrowDownRight className="h-3 w-3" /> {stat.change}
            </span>
          )}
          <span>vs last month</span>
        </p>
        <div className="mt-3 space-y-2">
          {stat.details.map((detail) => (
            <div key={detail.label} className="flex items-center justify-between border-t border-border/5 pt-2">
              <span className="text-xs text-muted-foreground">{detail.label}</span>
              <span className="text-xs font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
        <motion.div 
          className="mt-3 border-t border-border/5 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-1">
            <Sparkles className="h-3 w-3 text-red-500 mt-0.5" />
            <p className="text-xs text-muted-foreground">{stat.aiInsight}</p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
)

const AlertItem = ({ alert }: { alert: SystemAlert }) => (
  <motion.div
    initial={{ opacity: 0, x: -5 }}
    animate={{ opacity: 1, x: 0 }}
    className={`flex items-start gap-2 p-2 rounded-md shadow-md ${
      alert.type === "error"
        ? "bg-red-500/10"
        : alert.type === "warning"
        ? "bg-yellow-500/10"
        : alert.type === "success"
        ? "bg-green-500/10"
        : "bg-blue-500/10"
    }`}
  >
    {alert.type === "error" ? (
      <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
    ) : alert.type === "warning" ? (
      <AlertCircle className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
    ) : alert.type === "success" ? (
      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
    ) : (
      <Info className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
    )}
    <div>
      <p className="text-sm font-medium">{alert.title}</p>
      <p className="text-xs text-muted-foreground">{alert.message}</p>
      <p className="text-xs text-muted-foreground mt-1">{alert.timestamp.toLocaleTimeString()}</p>
    </div>
  </motion.div>
)

// Main Dashboard Page Component
export default function DashboardPage() {
  const { toast } = useToast()

  // Use SWR for data fetching
  const { data: statsData, error: statsError, isLoading: statsLoading } = useSWR<ApiResponse<DashboardStat[]>>(
    'api/dashboard/stats',
    statsFetcher,
    { refreshInterval: 30000, revalidateOnFocus: true }
  )
  
  const { data: alertsData, error: alertsError, isLoading: alertsLoading } = useSWR<ApiResponse<SystemAlert[]>>(
    'api/dashboard/alerts',
    alertsFetcher,
    { refreshInterval: 10000, revalidateOnFocus: true }
  )
  
  // Memoize data to prevent unnecessary rerenders
  const stats = useMemo(() => 
    statsData?.success ? statsData.data : mockStats, 
    [statsData]
  )
  
  const alerts = useMemo(() => 
    alertsData?.success ? alertsData.data : mockAlerts, 
    [alertsData]
  )
  
  // Error handling
  useEffect(() => {
    if (statsError || alertsError) {
      toast({
        title: "Error loading data",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    }
  }, [statsError, alertsError, toast])

  // Quick access links
  const quickLinks = [
    { name: "Insights", href: "/dashboard/insights", description: "Business analytics" },
    { name: "Models", href: "/dashboard/models", description: "AI models" },
    { name: "Projects", href: "/dashboard/projects", description: "Active projects" },
    { name: "Team", href: "/dashboard/team", description: "Team members" },
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-3">
          <Card className="shadow-md hover:shadow-lg transition-all bg-background/50 backdrop-blur-sm border-0 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700/70 to-red-500/70 opacity-80"></div>
            <CardHeader className="pb-2">
              <CardTitle>Welcome to Mindscape</CardTitle>
              <CardDescription>Your AI dashboard overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href} 
                    className="block p-4 rounded-lg bg-background/80 hover:bg-background/90 shadow-md hover:shadow-lg transition-all h-full"
                  >
                    <h3 className="font-medium">{link.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                    <div className="text-xs flex items-center text-red-500 mt-2">
                      <span>View</span>
                      <MoveRight className="h-3 w-3 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card className="shadow-md hover:shadow-lg transition-all bg-background/50 backdrop-blur-sm border-0 overflow-hidden h-full relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700/70 to-red-500/70 opacity-80"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-2 rounded-md mt-2 mb-4 bg-green-500/10 text-green-500">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span className="font-medium">All Systems Operational</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="flex justify-between py-1 border-t border-border/5">
                  <span>API Services</span>
                  <span className="text-green-500">Online</span>
                </div>
                <div className="flex justify-between py-1 border-t border-border/5">
                  <span>ML Models</span>
                  <span className="text-green-500">Online</span>
                </div>
                <div className="flex justify-between py-1 border-t border-border/5">
                  <span>Data Storage</span>
                  <span className="text-green-500">Online</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsLoading 
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map((stat) => <StatCard key={stat.title} stat={stat} />)
        }
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2 bg-background/50 backdrop-blur-sm shadow-md border-0 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700/70 to-red-500/70 opacity-80"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">
              <Activity className="inline-block mr-2 h-4 w-4 text-red-500" />
              API Usage
            </CardTitle>
            <Badge variant="outline" className="text-xs shadow-md bg-red-500/10 text-red-500 border-0">Real-time</Badge>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<ChartSkeleton />}>
              {statsError ? <ChartErrorFallback /> : <ApiUsageChart />}
            </Suspense>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 bg-background/50 backdrop-blur-sm shadow-md border-0 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700/70 to-red-500/70 opacity-80"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">
              <AlertCircle className="inline-block mr-2 h-4 w-4 text-red-500" />
              System Alerts
            </CardTitle>
            <Badge variant="outline" className="text-xs shadow-md bg-red-500/10 text-red-500 border-0">
              {alertsLoading ? "Updating..." : "Live"}
            </Badge>
          </CardHeader>
          <CardContent>
            {alertsLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : alerts.length > 0 ? (
              <ScrollArea className="h-[250px] pr-4">
                <div className="space-y-2">
                  {alerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[250px] text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                <p className="font-medium">All systems operational</p>
                <p className="text-sm text-muted-foreground">No alerts detected</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="bg-background/50 backdrop-blur-sm shadow-md border-0 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700/70 to-red-500/70 opacity-80"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              <Brain className="inline-block mr-2 h-4 w-4 text-red-500" />
              Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<ChartSkeleton />}>
              {statsError ? <ChartErrorFallback /> : <ModelPerformanceChart />}
            </Suspense>
          </CardContent>
        </Card>
        
        <Card className="bg-background/50 backdrop-blur-sm shadow-md border-0 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700/70 to-red-500/70 opacity-80"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              <CpuIcon className="inline-block mr-2 h-4 w-4 text-red-500" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<ChartSkeleton />}>
              {statsError ? <ChartErrorFallback /> : <SystemHealthChart />}
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Business Insights Preview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Card className="bg-background/50 backdrop-blur-sm shadow-md border-0 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700/70 to-red-500/70 opacity-80"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center text-base">
              <Sparkles className="h-4 w-4 mr-2 text-red-500" />
              Business Insights
            </CardTitle>
            <Button variant="outline" size="sm" asChild className="shadow-md bg-background/80 hover:bg-red-500/10 hover:text-red-400 border-0">
              <Link href="/dashboard/insights">
                View All
                <MoveRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <motion.div 
                className="bg-background/80 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Revenue Growth</h3>
                  <Star className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Cross-selling opportunities could increase revenue by 15%</p>
                <div className="mt-3 flex justify-between items-center text-xs">
                  <Badge className="bg-red-500/10 text-red-500 shadow-md border-0">high impact</Badge>
                  <span>87% confidence</span>
                </div>
              </motion.div>
              <motion.div 
                className="bg-background/80 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Customer Churn Risk</h3>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Unusual drop in API usage may indicate churn risk</p>
                <div className="mt-3 flex justify-between items-center text-xs">
                  <Badge className="bg-red-500/10 text-red-500 shadow-md border-0">medium impact</Badge>
                  <span>79% confidence</span>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 