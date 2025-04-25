"use client"

import { useState, useEffect, Suspense, useMemo, lazy } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { ErrorBoundary } from "@/components/error-boundary"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import MindscapeBrainLogo from "@/components/mindscape-brain-logo"
import { DashboardHeader } from "@/components/dashboard-header"

// Lazy load heavy components
const ApiUsageChart = lazy(() => import("@/components/dashboard/api-usage-chart").then(mod => ({ default: mod.ApiUsageChart })))
const ModelPerformanceChart = lazy(() => import("@/components/dashboard/model-performance-chart").then(mod => ({ default: mod.ModelPerformanceChart })))
const SystemHealthChart = lazy(() => import("@/components/dashboard/system-health-chart").then(mod => ({ default: mod.SystemHealthChart })))
const ModelsSection = lazy(() => import("@/components/dashboard/models-section").then(mod => ({ default: mod.ModelsSection })))
const ProjectsSection = lazy(() => import("@/components/dashboard/projects-section").then(mod => ({ default: mod.ProjectsSection })))
const BusinessInsights = lazy(() => import("@/components/dashboard/business-insights").then(mod => ({ default: mod.BusinessInsights })))
const CollaborationHub = lazy(() => import("@/components/dashboard/collaboration-hub").then(mod => ({ default: mod.CollaborationHub })))

import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  CheckCircle2,
  Clock,
  Cloud,
  Cpu,
  Database,
  Gauge,
  LineChart,
  Network,
  Server,
  Shield,
  Zap,
  Sparkles,
  BrainCircuit,
  CircuitBoard,
  Bell,
  XCircle,
  Info,
  CpuIcon,
  NetworkIcon,
  HardDrive,
  ShieldCheck,
  Download,
  Settings,
  BarChart3,
  PieChart,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  MoveRight,
  Star,
  AlertTriangle,
} from "lucide-react"

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

const mockStats: DashboardStat[] = [
  {
    title: "Total API Requests",
    value: "2.4M",
    change: "+12.5%",
    trend: "up",
    icon: <CircuitBoard className="h-5 w-5" />,
    color: "text-blue-500",
    aiInsight: "API usage shows healthy growth with optimal response times",
    details: [
      { label: "Success Rate", value: "99.9%" },
      { label: "Avg Response Time", value: "45ms" },
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
      { label: "Training Progress", value: "92%" },
      { label: "Inference Time", value: "120ms" },
      { label: "Confidence Score", value: "0.95" },
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
      { label: "CPU Usage", value: "65%" },
      { label: "Memory Usage", value: "75%" },
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
    aiInsight: "All security measures active with no suspicious activities detected",
    details: [
      { label: "Threats Blocked", value: "24" },
      { label: "Last Scan", value: "2h ago" },
      { label: "Firewall Status", value: "Active" },
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

// Optimized loading components with skeleton UI
const LoadingCard = () => (
  <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all group border-0">
    {/* Red accent line on left side */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-700/70 via-red-500/70 to-red-700/70 opacity-80 transition-opacity"></div>
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

const LoadingChart = () => (
  <Card className="bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all group border-0 overflow-hidden relative">
    <CardHeader>
      <Skeleton className="h-4 w-[120px]" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full" />
    </CardContent>
  </Card>
)

// Defining the response type for the data fetching
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

// Separate fetcher functions with specific return types
const statsFetcher = (): Promise<ApiResponse<DashboardStat[]>> => {
  // In a real app, this would be a fetch call to your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockStats, success: true })
    }, 1500)
  })
}

const alertsFetcher = (): Promise<ApiResponse<SystemAlert[]>> => {
  // In a real app, this would be a fetch call to your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockAlerts, success: true })
    }, 1500)
  })
}

export default function DashboardPage() {
  const [showNotifications, setShowNotifications] = useState(false)
  const { toast } = useToast()

  // Use SWR for data fetching with automatic revalidation
  const { data: statsData, error: statsError, isLoading: statsLoading } = useSWR<ApiResponse<DashboardStat[]>>(
    'api/dashboard/stats',
    statsFetcher,
    {
      refreshInterval: 30000, // Refresh data every 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 10000,
      errorRetryCount: 3
    }
  )
  
  const { data: alertsData, error: alertsError, isLoading: alertsLoading } = useSWR<ApiResponse<SystemAlert[]>>(
    'api/dashboard/alerts',
    alertsFetcher,
    {
      refreshInterval: 10000, // Refresh alerts more frequently
      revalidateOnFocus: true
    }
  )
  
  // Memoize data after it's loaded to avoid unnecessary re-renders
  const stats = useMemo(() => 
    statsData?.success ? statsData.data : mockStats, 
    [statsData]
  )
  
  const alerts = useMemo(() => 
    alertsData?.success ? alertsData.data : mockAlerts, 
    [alertsData]
  )
  
  // Handle errors with proper UI feedback
  useEffect(() => {
    if (statsError) {
      toast({
        title: "Error loading dashboard data",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    }
    
    if (alertsError) {
      toast({
        title: "Error loading alerts",
        description: "System alerts may not be up to date.",
        variant: "destructive",
      })
    }
  }, [statsError, alertsError, toast])

  const handleNotificationClick = () => {
    setShowNotifications(true)
    // Show high priority alerts as toasts
    alerts
      .filter((alert: SystemAlert) => alert.priority === "high")
      .forEach((alert: SystemAlert) => {
        toast({
          title: alert.title,
          description: alert.message,
          variant: alert.type === "error" ? "destructive" : "default",
        })
      })
  }

  const highPriorityAlerts = useMemo(() => 
    alerts?.filter((alert: SystemAlert) => alert.priority === "high") || [],
    [alerts]
  )

  const quickAccessLinks = [
    { name: "Insights", description: "View business intelligence", icon: Sparkles, href: "/dashboard/insights", color: "bg-amber-500/10 text-amber-500" },
    { name: "Team", description: "Collaborate with your team", icon: Users, href: "/dashboard/team", color: "bg-indigo-500/10 text-indigo-500" },
    { name: "Models", description: "Manage AI models", icon: Brain, href: "/dashboard/models", color: "bg-purple-500/10 text-purple-500" },
    { name: "Knowledge Base", description: "Access documentation", icon: BookOpen, href: "/dashboard/knowledge", color: "bg-blue-500/10 text-blue-500" },
  ]

  const upcomingEvents = [
    { title: "Team Meeting", date: "Today, 3:00 PM", description: "Weekly progress review" },
    { title: "Model Training", date: "Tomorrow, 9:00 AM", description: "New language model training scheduled" },
    { title: "Client Demo", date: "Mar 15, 2:00 PM", description: "Acme Corp product presentation" },
  ]

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          {/* Brain icon with RGB border */}
          <div className="relative z-10 group mr-3">
            {/* RGB Border Container */}
            <div className="absolute -inset-[1px] rounded-xl">
              {/* RGB gradient border */}
              <div className="absolute inset-[-1px] rounded-xl animate-rgb-spin-slow">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)] rounded-xl"></div>
              </div>
            </div>
            
            {/* Icon container */}
            <div className="relative bg-black rounded-xl p-3 transition-transform duration-300 group-hover:scale-[0.98]">
              <Brain 
                className="h-10 w-10 text-red-700 transform transition-all duration-300 group-hover:text-red-600" 
                style={{
                  filter: 'drop-shadow(0 0 8px rgb(139 0 0 / 0.4))'
                }}
              />
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-sans">
              <span className="text-white">Mindscape</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700/80 via-red-600 to-red-700/80 ml-2">Analytics</span>
            </h1>
            <p className="text-sm text-white/70 mt-1">Where AI Meets Innovation</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="relative shadow-md hover:shadow-lg transition-all bg-background/80 backdrop-blur-sm border-0"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
            {highPriorityAlerts.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs shadow-md border-0"
              >
                {highPriorityAlerts.length}
              </Badge>
            )}
          </Button>
          <Button size="sm" className="shadow-md hover:shadow-lg transition-all border-0">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="shadow-md hover:shadow-lg transition-all border-0">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Overview Content */}
      <div className="space-y-8">
        {/* Welcome and Quick Access Section */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="col-span-4 md:col-span-3 shadow-md hover:shadow-xl transition-all bg-background/50 backdrop-blur-sm border-0 overflow-hidden group relative">
            {/* Red accent line on top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700/70 to-red-500/70 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Quick access to your most used tools and features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickAccessLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="flex flex-col h-full p-4 rounded-lg bg-background/80 hover:bg-background/90 shadow-md hover:shadow-xl transition-all border-0"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${link.color} mb-3 shadow-md`}>
                        <link.icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-medium">{link.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                      <div className="mt-auto pt-2 text-xs flex items-center text-red-500">
                        <span>View</span>
                        <MoveRight className="h-3 w-3 ml-1" />
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-1 shadow-md hover:shadow-xl transition-all bg-background/50 backdrop-blur-sm border-0 overflow-hidden group relative">
            {/* Red accent line on top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700/70 to-red-500/70 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-b border-border/5 pb-2 last:border-0">
                    <div className="font-medium text-sm">{event.title}</div>
                    <div className="text-xs text-muted-foreground">{event.date}</div>
                    <div className="text-xs mt-1">{event.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" size="sm" className="ml-auto text-red-500 hover:text-red-400 border-0">
                View Calendar
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statsLoading ? (
              // Show skeleton UI while loading
              Array.from({ length: 4 }).map((_, i) => <LoadingCard key={i} />)
            ) : (
              // Show stats when loaded
              stats.map((stat: DashboardStat, index: number) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                className="transition-all"
                >
                <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all group border-0">
                  {/* Red accent line on left side */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-700/70 via-red-500/70 to-red-700/70 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                        <span>since last month</span>
                      </p>
                      <div className="mt-3 space-y-2">
                        {stat.details.map((detail: { label: string, value: string }) => (
                        <div key={detail.label} className="flex items-center justify-between border-t border-border/5 pt-2">
                            <span className="text-xs text-muted-foreground">
                              {detail.label}
                            </span>
                            <span className="text-xs font-medium">
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    <motion.div 
                      className="mt-3 border-t border-border/5 pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-start gap-1">
                        <Sparkles className="h-3 w-3 text-red-500 mt-0.5" />
                          <p className="text-xs text-muted-foreground">
                            {stat.aiInsight}
                          </p>
                      </div>
                    </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

        {/* Charts and Alerts */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2 bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all border-0 overflow-hidden group relative">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-4 w-4 text-red-500" />
                API Usage
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs shadow-md bg-red-500/10 text-red-500 border-0">Real-time</Badge>
              </div>
              </CardHeader>
              <CardContent>
                <ErrorBoundary fallback={<div className="text-center py-8">Error loading chart</div>}>
                  <Suspense fallback={<LoadingChart />}>
                    <ApiUsageChart />
                  </Suspense>
                </ErrorBoundary>
              </CardContent>
            </Card>
            
          <Card className="bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all border-0 overflow-hidden group relative">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Gauge className="mr-2 h-4 w-4 text-red-500" />
                System Health
              </CardTitle>
              <Badge variant="outline" className="text-xs shadow-md bg-red-500/10 text-red-500 border-0">Live</Badge>
              </CardHeader>
              <CardContent>
                <ErrorBoundary fallback={<div className="text-center py-8">Error loading chart</div>}>
                  <Suspense fallback={<LoadingChart />}>
                    <SystemHealthChart />
                  </Suspense>
                </ErrorBoundary>
              </CardContent>
            </Card>
            
          <Card className="col-span-1 lg:col-span-2 bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all border-0 overflow-hidden group relative">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Brain className="mr-2 h-4 w-4 text-red-500" />
                Model Performance
              </CardTitle>
              <Badge variant="outline" className="text-xs shadow-md bg-red-500/10 text-red-500 border-0">Updated</Badge>
              </CardHeader>
              <CardContent>
                <ErrorBoundary fallback={<div className="text-center py-8">Error loading chart</div>}>
                  <Suspense fallback={<LoadingChart />}>
                    <ModelPerformanceChart />
                  </Suspense>
                </ErrorBoundary>
              </CardContent>
            </Card>
            
          <Card className="bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all border-0 overflow-hidden group relative">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
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
                  <ScrollArea className="h-[250px]">
                    <div className="space-y-2">
                      {alerts.map((alert: SystemAlert) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, x: -10 }}
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
                            <p className="text-xs text-muted-foreground">
                              {alert.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {alert.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[250px] text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                    <p className="font-medium">All systems operational</p>
                    <p className="text-sm text-muted-foreground">
                      No alerts or warnings detected
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        {/* Featured Business Insights Preview */}
        <Card className="bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all border-0 overflow-hidden group relative">
          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-red-500" />
              Featured Business Insights
            </CardTitle>
            <Button variant="outline" size="sm" asChild className="shadow-md hover:shadow-lg transition-shadow bg-background/80 hover:bg-red-500/10 hover:text-red-400 border-0">
              <a href="/dashboard/insights">
                View All
                <MoveRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            <ErrorBoundary fallback={<div className="text-center py-8">Error loading insights</div>}>
              <Suspense fallback={<div className="space-y-4">{Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}</div>}>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Preview of insights - limited to 2 */}
                  <motion.div 
                    className="bg-background/80 p-4 rounded-lg shadow-md hover:shadow-xl transition-all border-0 group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Revenue Growth Opportunity</h3>
                      <Star className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Cross-selling opportunities identified in enterprise customer segment could increase revenue by 15%</p>
                    <div className="mt-3 flex justify-between items-center text-xs">
                      <Badge className="bg-red-500/10 text-red-500 shadow-md border-0">high impact</Badge>
                      <span>87% confidence</span>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-background/80 p-4 rounded-lg shadow-md hover:shadow-xl transition-all border-0 group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Customer Churn Risk</h3>
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Unusual drop in API usage detected in the financial services segment may indicate churn risk</p>
                    <div className="mt-3 flex justify-between items-center text-xs">
                      <Badge className="bg-red-500/10 text-red-500 shadow-md border-0">high impact</Badge>
                      <span>79% confidence</span>
                    </div>
                  </motion.div>
                </div>
            </Suspense>
          </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 