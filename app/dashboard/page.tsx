"use client"

import { useEffect, useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useDashboard } from "@/providers/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { DashboardStatsCards } from "@/components/dashboard/dashboard-stats"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RefreshCw, ArrowUpRight, BarChart4, Plus } from "lucide-react"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"
import { SystemHealth } from "@/components/dashboard/system-health"
import { BreadcrumbNav } from "@/components/dashboard/breadcrumb-nav"
import { apiUsageSampleData } from "@/lib/dashboard-data"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import dynamic from "next/dynamic"
import { TeamActivity } from "@/components/dashboard/team-activity"
import { KeyMetrics } from "@/components/dashboard/key-metrics"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { SystemHealthChart } from "@/components/dashboard/system-health-chart"
import { ProjectOverview } from "@/components/dashboard/project-overview"
import { TodoComponent } from "@/components/Todo"

// Lazy load heavy components for better performance
const ModelSection = dynamic(() => 
  import("@/components/dashboard/models-section")
    .then(mod => mod.ModelsSection)
    .catch(err => {
      console.error("Failed to load ModelSection:", err);
      return () => <div className="p-4 text-red-500">Failed to load component</div>;
    }), { 
  ssr: false,
  loading: () => <div className="h-[350px] w-full animate-pulse rounded-md bg-muted/50"></div>
})

const BusinessInsights = dynamic(() => 
  import("@/components/dashboard/business-insights")
    .then(mod => mod.BusinessInsights)
    .catch(err => {
      console.error("Failed to load BusinessInsights:", err);
      return () => <div className="p-4 text-red-500">Failed to load component</div>;
    }), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse rounded-md bg-muted/50"></div>
})

const ProjectsSection = dynamic(() => 
  import("@/components/dashboard/projects-section")
    .then(mod => mod.ProjectsSection)
    .catch(err => {
      console.error("Failed to load ProjectsSection:", err);
      return () => <div className="p-4 text-red-500">Failed to load component</div>;
    }), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse rounded-md bg-muted/50"></div>
})

const ApiUsageChart = dynamic(() => 
  import("@/components/dashboard/api-usage-chart")
    .then(mod => mod.ApiUsageChart)
    .catch(err => {
      console.error("Failed to load ApiUsageChart:", err);
      return () => <div className="p-4 text-red-500">Failed to load component</div>;
    }), {
  ssr: false,
  loading: () => <div className="h-[350px] w-full animate-pulse rounded-md bg-muted/50"></div>
})

export default function DashboardPage() {
  const { addNotification } = useDashboard()
  const { toast } = useToast()
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProjects: 0,
    apiCalls: 0,
    dataProcessed: 0
  })
  const [apiUsage, setApiUsage] = useState(apiUsageSampleData)
  const [systemHealth, setSystemHealth] = useState({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0
  })
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 1482,
        activeProjects: 36,
        apiCalls: 1384793,
        dataProcessed: 1.2
      })
      
      setSystemHealth({
        cpu: 42,
        memory: 68,
        storage: 54,
        network: 87
      })
      
      setIsLoaded(true)
      
      // Add welcome notification
      addNotification({
        title: "Welcome back!",
        message: "Your AI platform is running smoothly with 36 active projects.",
        type: "info"
      })
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [addNotification])
  
  const handleRefreshData = useCallback(() => {
    setIsLoaded(false)
    
    toast({
      title: "Refreshing dashboard data",
      description: "Please wait while we fetch the latest information."
    })
    
    // Simulate refreshing data
    setTimeout(() => {
      setIsLoaded(true)
      
      toast({
        title: "Dashboard updated",
        description: "All data is now current as of " + new Date().toLocaleTimeString(),
        variant: "default"
      })
    }, 1200)
  }, [toast])

  if (!isLoaded) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <BreadcrumbNav items={[{ title: "Home", href: "/dashboard" }, { title: "Dashboard", href: "/dashboard" }]} />
          <Heading title="Dashboard" description="Your AI insights and analytics at a glance" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      
      {/* Stats Cards Row */}
      <DashboardStatsCards stats={stats} />
      
      {/* Main Content Rows */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <KeyMetrics />
        </div>
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center">
                System Health
                <Badge variant="outline" className="ml-2 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  Healthy
                </Badge>
              </CardTitle>
              <CardDescription>
                Current system performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SystemHealth data={systemHealth} />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Project Overview & Team Activity */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">
                Recent Projects
              </CardTitle>
              <CardDescription>
                Your active and recently updated projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectOverview />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">Team Activity</CardTitle>
              <CardDescription>
                Recent actions from your team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TeamActivity />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">API Usage Trends</CardTitle>
              <CardDescription>
                API calls over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApiUsageChart data={apiUsage} />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-4">
          <TodoComponent />
        </div>
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">Resource Utilization</CardTitle>
              <CardDescription>
                Real-time system performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SystemHealthChart />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Business Insights Section */}
      <div className="grid grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Business Insights</CardTitle>
            <CardDescription>
              Key business metrics and performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessInsights />
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Feed */}
      <div className="grid grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
            <CardDescription>
              Latest events and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityFeed />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 