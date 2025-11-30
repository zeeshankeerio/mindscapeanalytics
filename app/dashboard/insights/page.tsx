"use client"

import { useState, useEffect, useMemo, Suspense, lazy } from "react"
import { motion } from "framer-motion"
import useSWR, { mutate } from "swr"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Download,
  Settings,
  RefreshCcw,
  Filter,
  BrainCircuit,
  Sparkles,
  BarChart,
  LineChart,
  PieChart,
  Calendar,
  LayoutGrid,
  List,
  Share2,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Gauge,
  Sliders,
  AlertTriangle,
  BarChart4,
  Activity,
  Zap,
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { ErrorBoundary } from "@/components/error-boundary"
import { Metadata } from "next"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SmartInsightsCard } from "@/components/smart-insights-card"
import { BusinessMetricsCard } from "@/components/business-metrics-card"
import { AIOpportunityCard } from "@/components/ai-opportunity-card"
import { RecommendationsCard } from "@/components/recommendations-card"
import { PredictiveCard } from "@/components/predictive-card"
import { PlusIcon, ArrowRight } from "lucide-react"

// Lazy load the BusinessInsights component to avoid issues
const BusinessInsights = lazy(() => 
  import("@/components/dashboard/business-insights").then(mod => ({ default: mod.BusinessInsights }))
)

// Placeholder component while loading
const InsightsSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-64 mb-2" />
    <Skeleton className="h-4 w-80" />
    <div className="space-y-4 mt-6">
      <Skeleton className="h-[300px] w-full" />
    </div>
  </div>
)

// API fetcher function for insights data
const insightsFetcher = () => {
  return fetch('/api/dashboard/insights')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch insights')
      return res.json()
    })
}

// Client-side only component to prevent hydration issues
export default function InsightsPage() {
  const { toast } = useToast()
  // State for advanced settings
  const [viewMode, setViewMode] = useState<"standard" | "compact" | "detailed">("standard")
  const [confidenceThreshold, setConfidenceThreshold] = useState(70)
  const [timeframeFilter, setTimeframeFilter] = useState<string>("all")
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [customModels, setCustomModels] = useState<string[]>(["business", "market", "customer"])
  const [activeTab, setActiveTab] = useState("insights")
  const [activeCategory, setActiveCategory] = useState("all")
  const [insightLayout, setInsightLayout] = useState<"grid" | "list">("grid")
  const [showAllExplanations, setShowAllExplanations] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "json">("pdf")
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Fetch insights data using SWR
  const { data: insightsData, error: insightsError, isValidating } = useSWR(
    'api/dashboard/insights',
    insightsFetcher,
    {
      refreshInterval: autoRefresh ? 60000 : 0,
      revalidateOnFocus: true,
      onError: (err) => {
        console.error("Failed to fetch insights data:", err)
      }
    }
  )
  
  // Handle errors with toast notifications
  useEffect(() => {
    if (insightsError) {
      toast({
        title: "Error loading insights",
        description: "Failed to load business insights data. Please try again.",
        variant: "destructive",
      })
    }
  }, [insightsError, toast])
  
  // Simulate scheduled refresh if autoRefresh is enabled
  useEffect(() => {
    let refreshInterval: NodeJS.Timeout | null = null
    
    if (autoRefresh) {
      refreshInterval = setInterval(() => {
        console.log("Auto-refreshing insights...")
        // In a real app, this would trigger SWR revalidation
      }, 60000) // Refresh every minute
    }
    
    return () => {
      if (refreshInterval) clearInterval(refreshInterval)
    }
  }, [autoRefresh])
  
  // Handle export function
  const handleExport = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      toast({
        title: "Export successful",
        description: `Insights exported in ${exportFormat.toUpperCase()} format.`,
        variant: "default",
      })
      setIsLoading(false)
    }, 1500)
  }
  
  // Handle generate insights
  const handleGenerateInsights = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/dashboard/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confidenceThreshold,
          models: customModels,
          timeframe: timeframeFilter,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate insights')
      }
      
      const data = await response.json()
      
      toast({
        title: "Insights generated",
        description: "New business insights have been generated successfully.",
        variant: "default",
      })
      
      // Trigger SWR revalidation
      mutate('api/dashboard/insights')
    } catch (error) {
      console.error("Error generating insights:", error)
      toast({
        title: "Error generating insights",
        description: "Failed to generate new insights. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }
  
  // Memoized settings options for better performance
  const modelOptions = useMemo(() => [
    { id: "business", name: "Business Performance", icon: <BarChart className="h-4 w-4" /> },
    { id: "market", name: "Market Trends", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "customer", name: "Customer Behavior", icon: <PieChart className="h-4 w-4" /> },
    { id: "operational", name: "Operational Efficiency", icon: <Gauge className="h-4 w-4" /> },
    { id: "competitive", name: "Competitive Analysis", icon: <LineChart className="h-4 w-4" /> },
  ], [])
  
  const timeframeOptions = useMemo(() => [
    { id: "all", name: "All Timeframes" },
    { id: "immediate", name: "Immediate Action" },
    { id: "week", name: "Next Week" },
    { id: "month", name: "Next Month" },
    { id: "quarter", name: "Next Quarter" },
    { id: "year", name: "Next Year" },
  ], [])

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Business Insights"
        description="Advanced analytics and AI-driven recommendations to optimize your operations."
      >
        <Link href="/dashboard/insights/export">
          <Button variant="outline" className="ml-auto">
            Export <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </DashboardHeader>
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:grid-cols-5 bg-background border">
          <TabsTrigger value="metrics" className="data-[state=active]:bg-muted data-[state=active]:shadow-none">
            <BarChart4 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline-block">Business Metrics</span>
            <span className="inline-block sm:hidden">Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-muted data-[state=active]:shadow-none">
            <BrainCircuit className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline-block">AI Insights</span>
            <span className="inline-block sm:hidden">AI</span>
          </TabsTrigger>
          <TabsTrigger value="optimization" className="data-[state=active]:bg-muted data-[state=active]:shadow-none">
            <Gauge className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline-block">Optimization</span>
            <span className="inline-block sm:hidden">Optimize</span>
          </TabsTrigger>
          <TabsTrigger value="forecasts" className="data-[state=active]:bg-muted data-[state=active]:shadow-none">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline-block">Forecasts</span>
            <span className="inline-block sm:hidden">Forecast</span>
          </TabsTrigger>
          <TabsTrigger value="real-time" className="data-[state=active]:bg-muted data-[state=active]:shadow-none hidden lg:flex">
            <Activity className="h-4 w-4 mr-2" />
            <span>Real-time</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,319.92</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-emerald-600 bg-emerald-50 hover:bg-emerald-50 mr-1">+11.3%</Badge>
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14,532</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-emerald-600 bg-emerald-50 hover:bg-emerald-50 mr-1">+8.2%</Badge>
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Task Completion Rate
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.4%</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-emerald-600 bg-emerald-50 hover:bg-emerald-50 mr-1">+2.4%</Badge>
                  from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Resource Utilization
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76.8%</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-red-600 bg-red-50 hover:bg-red-50 mr-1">-3.1%</Badge>
                  from target
                </p>
              </CardContent>
            </Card>
          </div>

          <BusinessMetricsCard />
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-md" />}>
            <SmartInsightsCard />
          </Suspense>
          <AIOpportunityCard />
        </TabsContent>
        
        <TabsContent value="optimization" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-md" />}>
            <RecommendationsCard />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="forecasts" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-md" />}>
            <PredictiveCard />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="real-time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Analytics</CardTitle>
              <CardDescription>
                Live data from your business operations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[400px] w-full rounded-md" />
              <div className="mt-4 text-sm text-muted-foreground">
                Real-time analysis module loading...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 