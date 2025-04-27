"use client"

import { useEffect, useState, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"
import { useDashboard } from "@/providers/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { DashboardStatsCards } from "@/components/dashboard/dashboard-stats"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RefreshCw, ArrowUpRight, BarChart4 } from "lucide-react"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"
import { SystemHealth } from "@/components/dashboard/system-health"
import { BreadcrumbNav } from "@/components/dashboard/breadcrumb-nav"
import { apiUsageSampleData } from "@/lib/dashboard-data"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import dynamic from "next/dynamic"

// Lazy load heavy components for better performance
const ModelSection = dynamic(() => import("@/components/dashboard/models-section").then(mod => mod.ModelsSection), { 
  ssr: false,
  loading: () => <div className="h-[350px] w-full animate-pulse rounded-md bg-muted/50"></div>
})

const BusinessInsights = dynamic(() => import("@/components/dashboard/business-insights").then(mod => mod.BusinessInsights), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse rounded-md bg-muted/50"></div>
})

const ProjectsSection = dynamic(() => import("@/components/dashboard/projects-section").then(mod => mod.ProjectsSection), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse rounded-md bg-muted/50"></div>
})

export default function DashboardPage() {
  const { addNotification } = useDashboard()
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
        variant: "success"
      })
    }, 1200)
  }, [])

  if (!isLoaded) {
    return <DashboardSkeleton />
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <BreadcrumbNav 
            items={[
              { title: "Dashboard", href: "/dashboard" },
              { title: "Overview", href: "/dashboard/dashboard" }
            ]}
          />
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Platform overview and key performance indicators
          </p>
              </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 justify-self-start sm:mt-0 sm:justify-self-end w-full sm:w-auto"
          onClick={handleRefreshData}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
            </div>
            
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatsCards stats={stats} />
            </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <TabsList className="h-auto w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 sm:inline-flex">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="models" className="text-xs sm:text-sm">Models</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs sm:text-sm">Insights</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs sm:text-sm">Projects</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <BarChart4 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Generate</span> Report
            </Button>
            <Button size="sm" className="w-full sm:w-auto">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">View</span> Analytics
            </Button>
          </div>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Usage</CardTitle>
                    <CardDescription>
                      Requests per endpoint over the last 30 days
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="hidden sm:flex">
                    +12.5% from last month
                  </Badge>
              </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[350px]">
                  {/* Add your API usage chart component here */}
                  <div className="h-[350px] flex items-center justify-center">
                    <p className="text-center text-muted-foreground">API Usage Chart Placeholder</p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>
                  Current performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SystemHealth data={systemHealth} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest platform activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityFeed />
              </CardContent>
            </Card>
            
            {/* Quick Actions Card */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                <Button variant="outline" className="justify-start">
                  <Icons.plus className="mr-2 h-4 w-4" />
                  Create New Project
                </Button>
                <Button variant="outline" className="justify-start">
                  <Icons.upload className="mr-2 h-4 w-4" />
                  Upload Dataset
                </Button>
                <Button variant="outline" className="justify-start">
                  <Icons.monitor className="mr-2 h-4 w-4" />
                  View Monitoring
                </Button>
                <Button variant="outline" className="justify-start">
                  <Icons.settings className="mr-2 h-4 w-4" />
                  Configure API Keys
                </Button>
                <Button variant="outline" className="justify-start">
                  <Icons.users className="mr-2 h-4 w-4" />
                  Manage Team
                </Button>
                <Button variant="outline" className="justify-start">
                  <Icons.help className="mr-2 h-4 w-4" />
                  Get Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="models">
          <div className="grid gap-4 grid-cols-1">
            <ModelSection />
                    </div>
        </TabsContent>
        
        <TabsContent value="insights">
          <div className="grid gap-4 grid-cols-1">
            <BusinessInsights />
                    </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <div className="grid gap-4 grid-cols-1">
            <ProjectsSection />
                    </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 