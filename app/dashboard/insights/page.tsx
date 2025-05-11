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
  DollarSign,
  Users,
  Server,
  PlusIcon,
  ArrowRight
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
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { SmartInsightsCard } from "@/components/smart-insights-card"
import { BusinessMetricsCard } from "@/components/business-metrics-card"
import { AIOpportunityCard } from "@/components/ai-opportunity-card"
import { RecommendationsCard } from "@/components/recommendations-card"
import { PredictiveCard } from "@/components/predictive-card"

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
  const [searchQuery, setSearchQuery] = useState("")
  
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
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Business Insights</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Advanced analytics and AI-driven recommendations to optimize your operations.
        </p>
        
        <div className="flex justify-end mt-4">
          <Link href="/dashboard/insights/export">
            <Button variant="outline" className="ml-auto">
              Export <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList className="p-1 bg-background/40 backdrop-blur-sm border border-white/5">
            <TabsTrigger value="insights" className="text-sm">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="metrics" className="text-sm">
              <BarChart className="mr-1 h-3.5 w-3.5" />
              Key Metrics
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-sm">
              <LineChart className="mr-1 h-3.5 w-3.5" />
              Reports
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleGenerateInsights}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCcw className="h-3.5 w-3.5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <BrainCircuit className="h-3.5 w-3.5" />
                  Generate Insights
                </>
              )}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Insights Settings</SheetTitle>
                  <SheetDescription>
                    Configure how insights are generated and displayed
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Display Settings</h3>
                    <div className="space-y-1">
                      <Label htmlFor="viewMode">View Mode</Label>
                      <Select value={viewMode} onValueChange={(value: "standard" | "compact" | "detailed") => setViewMode(value)}>
                        <SelectTrigger id="viewMode">
                          <SelectValue placeholder="Select view mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="show-explanations"
                        checked={showAllExplanations}
                        onCheckedChange={setShowAllExplanations}
                      />
                      <Label htmlFor="show-explanations">
                        Show all explanations
                      </Label>
                    </div>
                    
                    <div className="space-y-1 pt-2">
                      <Label htmlFor="layout">Layout</Label>
                      <div className="flex space-x-1">
                        <Toggle
                          variant="outline"
                          size="sm"
                          pressed={insightLayout === "grid"}
                          onClick={() => setInsightLayout("grid")}
                        >
                          <LayoutGrid className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                          variant="outline" 
                          size="sm"
                          pressed={insightLayout === "list"}
                          onClick={() => setInsightLayout("list")}
                        >
                          <List className="h-4 w-4" />
                        </Toggle>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Insight Parameters</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <Label htmlFor="confidence-threshold">
                          Confidence Threshold: {confidenceThreshold}%
                        </Label>
                      </div>
                      <Slider
                        id="confidence-threshold"
                        min={30}
                        max={95}
                        step={5}
                        value={[confidenceThreshold]}
                        onValueChange={(values) => setConfidenceThreshold(values[0])}
                      />
                    </div>
                    
                    <div className="space-y-1 pt-2">
                      <Label htmlFor="timeframe">Timeframe Filter</Label>
                      <Select value={timeframeFilter} onValueChange={setTimeframeFilter}>
                        <SelectTrigger id="timeframe">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeframeOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">AI Models</h3>
                    <div className="space-y-1">
                      {modelOptions.map((model) => (
                        <div
                          key={model.id}
                          className="flex items-center space-x-2 rounded-md p-1.5 hover:bg-white/5"
                        >
                          <input
                            type="checkbox"
                            id={`model-${model.id}`}
                            checked={customModels.includes(model.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCustomModels([...customModels, model.id])
                              } else {
                                setCustomModels(
                                  customModels.filter((id) => id !== model.id)
                                )
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Label
                            htmlFor={`model-${model.id}`}
                            className="flex items-center cursor-pointer text-sm"
                          >
                            <span className="mr-2 flex-shrink-0 text-muted-foreground">
                              {model.icon}
                            </span>
                            {model.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Auto-update</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-refresh"
                        checked={autoRefresh}
                        onCheckedChange={setAutoRefresh}
                      />
                      <Label htmlFor="auto-refresh">
                        Auto-refresh (1 minute)
                      </Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Export Settings</h3>
                    <div className="space-y-1">
                      <Label htmlFor="export-format">Format</Label>
                      <Select value={exportFormat} onValueChange={(value: "pdf" | "excel" | "json") => setExportFormat(value)}>
                        <SelectTrigger id="export-format">
                          <SelectValue placeholder="Select export format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        className="w-full mt-2"
                        onClick={handleExport}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                            Exporting...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Export Insights
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <TabsContent value="insights" className="mt-0">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
                    activeCategory === "all"
                      ? "bg-white/10 text-white"
                      : "bg-transparent text-muted-foreground hover:bg-white/5"
                  )}
                >
                  All Insights
                </button>
                <button
                  onClick={() => setActiveCategory("revenue")}
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
                    activeCategory === "revenue"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-transparent text-muted-foreground hover:bg-white/5"
                  )}
                >
                  <DollarSign className="mr-1 h-3.5 w-3.5" />
                  Revenue
                </button>
                <button
                  onClick={() => setActiveCategory("customers")}
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
                    activeCategory === "customers"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-transparent text-muted-foreground hover:bg-white/5"
                  )}
                >
                  <Users className="mr-1 h-3.5 w-3.5" />
                  Customers
                </button>
                <button
                  onClick={() => setActiveCategory("operations")}
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
                    activeCategory === "operations"
                      ? "bg-purple-500/10 text-purple-500"
                      : "bg-transparent text-muted-foreground hover:bg-white/5"
                  )}
                >
                  <Server className="mr-1 h-3.5 w-3.5" />
                  Operations
                </button>
                <button
                  onClick={() => setActiveCategory("market")}
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
                    activeCategory === "market"
                      ? "bg-orange-500/10 text-orange-500"
                      : "bg-transparent text-muted-foreground hover:bg-white/5"
                  )}
                >
                  <BarChart4 className="mr-1 h-3.5 w-3.5" />
                  Market
                </button>
              </div>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Input
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 w-full"
                />
                <Button variant="outline" size="sm" className="h-8 px-2 flex-shrink-0">
                  <Filter className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            
            <ErrorBoundary>
              <Suspense fallback={<InsightsSkeleton />}>
                <BusinessInsights 
                  isLoading={!insightsData && !insightsError}
                  isValidating={isValidating}
                  viewMode={viewMode}
                  onGenerateInsights={handleGenerateInsights}
                  isGenerating={isGenerating}
                  filterProps={{
                    confidenceThreshold,
                    timeframeFilter,
                    categoryFilter: activeCategory,
                    viewLayout: insightLayout,
                    showExplanations: showAllExplanations,
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <SmartInsightsCard />
            <BusinessMetricsCard />
            <AIOpportunityCard />
            <RecommendationsCard />
          </div>
          <div className="mt-6">
            <PredictiveCard />
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and manage custom reports based on your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This section is under development and will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 