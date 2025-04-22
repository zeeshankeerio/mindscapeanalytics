"use client"

import React from 'react';
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Brain, 
  Star, 
  BarChart4, 
  LineChart,
  PieChart,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Filter,
  SlidersHorizontal,
  SortAsc,
  SortDesc,
  Search,
  Download
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

interface InsightData {
  id: string
  title: string
  description: string
  type: "growth" | "opportunity" | "warning" | "prediction"
  category: "revenue" | "customers" | "operations" | "market"
  impact: "high" | "medium" | "low"
  confidence: number
  timeframe: string
  metrics?: {
    name: string
    value: string
    change: number
  }[]
  recommendation?: string
  additionalContext?: string
}

const mockInsights: InsightData[] = [
  {
    id: "insight-1",
    title: "Revenue Growth Opportunity",
    description: "Cross-selling opportunities identified in enterprise customer segment could increase revenue by 15%",
    type: "opportunity",
    category: "revenue",
    impact: "high",
    confidence: 87,
    timeframe: "Next quarter",
    metrics: [
      { name: "Potential Revenue Impact", value: "$250K", change: 15 },
      { name: "Conversion Probability", value: "68%", change: 5 },
      { name: "Implementation Effort", value: "Medium", change: 0 }
    ],
    recommendation: "Target top 20 enterprise accounts with personalized AI solution packages based on their usage patterns",
    additionalContext: "Recent analysis shows enterprise customers underutilizing advanced AI features they've already paid for"
  },
  {
    id: "insight-2",
    title: "Customer Churn Risk",
    description: "Unusual drop in API usage detected in the financial services segment may indicate churn risk",
    type: "warning",
    category: "customers",
    impact: "high",
    confidence: 79,
    timeframe: "Immediate attention",
    metrics: [
      { name: "At-risk Accounts", value: "12", change: -8 },
      { name: "Potential Revenue Loss", value: "$180K", change: -12 },
      { name: "Customer Health Score", value: "65%", change: -15 }
    ],
    recommendation: "Schedule proactive check-ins with identified at-risk accounts and offer technical support review",
    additionalContext: "These accounts previously had consistently high usage until the last 2 weeks"
  },
  {
    id: "insight-3",
    title: "Infrastructure Optimization",
    description: "Current model deployment strategy is consuming 35% more compute resources than optimal",
    type: "opportunity",
    category: "operations",
    impact: "medium",
    confidence: 92,
    timeframe: "Next sprint",
    metrics: [
      { name: "Monthly Cost Savings", value: "$45K", change: 35 },
      { name: "Performance Impact", value: "Neutral", change: 0 },
      { name: "Implementation Time", value: "3 days", change: 0 }
    ],
    recommendation: "Implement dynamic scaling with load prediction and consolidate smaller model deployments",
    additionalContext: "Similar optimization for other teams resulted in 40% cost reduction with no performance impact"
  },
  {
    id: "insight-4",
    title: "Market Trend Prediction",
    description: "Sentiment analysis indicates growing demand for vision-based AI solutions in healthcare",
    type: "prediction",
    category: "market",
    impact: "high",
    confidence: 83,
    timeframe: "Next 6 months",
    metrics: [
      { name: "Market Growth", value: "28%", change: 28 },
      { name: "Competitive Position", value: "Strong", change: 10 },
      { name: "Readiness Level", value: "75%", change: 5 }
    ],
    recommendation: "Accelerate healthcare-specific vision model development and prepare targeted marketing materials",
    additionalContext: "Three competitors have recently announced healthcare-focused AI initiatives"
  },
  {
    id: "insight-5",
    title: "Pricing Strategy Optimization",
    description: "Current pricing tiers show elasticity that can be leveraged for revenue optimization",
    type: "opportunity",
    category: "revenue",
    impact: "medium",
    confidence: 81,
    timeframe: "Next quarter",
    metrics: [
      { name: "Revenue Potential", value: "$120K", change: 8 },
      { name: "Customer Sentiment", value: "Neutral", change: 0 },
      { name: "Competitive Impact", value: "Positive", change: 5 }
    ],
    recommendation: "Restructure mid-tier pricing with more granular feature access and introduce a new enterprise tier",
    additionalContext: "Analysis of usage patterns shows clear segmentation that's not reflected in current pricing"
  }
]

const InsightSkeleton = () => (
  <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/20">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <Skeleton className="h-4 w-[180px] mb-2" />
          <Skeleton className="h-3 w-[240px]" />
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[70%]" />
      </div>
      <div className="mt-4 space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-3 w-[100px]" />
            <Skeleton className="h-3 w-[60px]" />
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Skeleton className="h-8 w-full" />
    </CardFooter>
  </Card>
)

// Define props interface for BusinessInsights
interface BusinessInsightsProps {
  insights?: InsightData[];
  isLoading?: boolean;
  isValidating?: boolean;
  viewMode?: "standard" | "compact" | "detailed";
  onGenerateInsights?: () => void;
  isGenerating?: boolean;
  filterProps?: {
    confidenceThreshold?: number;
    timeframeFilter?: string;
    categoryFilter?: string;
    viewLayout?: "grid" | "list";
    showExplanations?: boolean;
  };
}

export function BusinessInsights({
  insights: propInsights,
  isLoading: propIsLoading,
  isValidating,
  viewMode: propViewMode,
  onGenerateInsights,
  isGenerating: propIsGenerating,
  filterProps
}: BusinessInsightsProps = {}) {
  // Initialize state with props or defaults
  const [insights, setInsights] = useState<InsightData[]>(propInsights || [])
  const [isLoading, setIsLoading] = useState(propIsLoading !== undefined ? propIsLoading : true)
  const [activeCategory, setActiveCategory] = useState(filterProps?.categoryFilter || "all")
  const [isGenerating, setIsGenerating] = useState(propIsGenerating || false)
  const [viewMode, setViewMode] = useState<"standard" | "compact" | "detailed">(propViewMode || "standard")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"confidence" | "impact" | "timeframe">("confidence")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterImpact, setFilterImpact] = useState<string>("all")
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null)

  // Update state when props change
  useEffect(() => {
    if (propInsights) {
      setInsights(propInsights)
    }
  }, [propInsights])

  useEffect(() => {
    if (propIsLoading !== undefined) {
      setIsLoading(propIsLoading)
    }
  }, [propIsLoading])
  
  useEffect(() => {
    if (propViewMode) {
      setViewMode(propViewMode)
    }
  }, [propViewMode])
  
  useEffect(() => {
    if (propIsGenerating !== undefined) {
      setIsGenerating(propIsGenerating)
    }
  }, [propIsGenerating])
  
  useEffect(() => {
    if (filterProps?.categoryFilter) {
      setActiveCategory(filterProps.categoryFilter)
    }
  }, [filterProps?.categoryFilter])
  
  // Only fetch insights if no props are provided (for backwards compatibility)
  useEffect(() => {
    if (!propInsights && !propIsLoading) {
      // Simulate API call
      const fetchInsights = async () => {
        setIsLoading(true)
        try {
          // In a real app, fetch from API with filtering params
          const params = new URLSearchParams()
          if (activeCategory !== "all") params.append("category", activeCategory)
          if (filterType !== "all") params.append("type", filterType)
          if (filterImpact !== "all") params.append("impact", filterImpact)
          
          // Simulate API call with delay
          await new Promise(resolve => setTimeout(resolve, 1500))
          setInsights(mockInsights)
        } catch (error) {
          console.error("Failed to fetch insights:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchInsights()
    }
  }, [activeCategory, filterType, filterImpact, propInsights, propIsLoading])

  // Generate new insights function (use prop if available, or fallback)
  const generateNewInsights = async () => {
    if (onGenerateInsights) {
      onGenerateInsights()
    } else {
      setIsGenerating(true)
      // Simulate AI generating new insights
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsGenerating(false)
    }
  }

  // Apply all filters and sorting
  const filteredAndSortedInsights = useMemo(() => {
    let result = [...insights]
    
    // Category filter applied in API call
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(insight => 
        insight.title.toLowerCase().includes(query) || 
        insight.description.toLowerCase().includes(query)
      )
    }
    
    // Sort
    result.sort((a, b) => {
      if (sortBy === "confidence") {
        return sortOrder === "desc" ? b.confidence - a.confidence : a.confidence - b.confidence
      } else if (sortBy === "impact") {
        const impactValues = { high: 3, medium: 2, low: 1 }
        const aVal = impactValues[a.impact as keyof typeof impactValues]
        const bVal = impactValues[b.impact as keyof typeof impactValues]
        return sortOrder === "desc" ? bVal - aVal : aVal - bVal
      } else if (sortBy === "timeframe") {
        // Simple timeframe sorting
        const timeframeValues = {
          "Immediate attention": 5,
          "This week": 4,
          "Next sprint": 3,
          "Next month": 2,
          "Next quarter": 1,
          "Next 6 months": 0
        }
        const aVal = timeframeValues[a.timeframe as keyof typeof timeframeValues] || 0
        const bVal = timeframeValues[b.timeframe as keyof typeof timeframeValues] || 0
        return sortOrder === "desc" ? bVal - aVal : aVal - bVal
      }
      return 0
    })
    
    return result
  }, [insights, activeCategory, searchQuery, sortBy, sortOrder, filterType, filterImpact])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "growth":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case "opportunity":
        return <Star className="h-5 w-5 text-amber-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "prediction":
        return <Brain className="h-5 w-5 text-purple-500" />
      default:
        return <Sparkles className="h-5 w-5 text-blue-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-500 border-amber-500/30"
      case "low":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      default:
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "revenue":
        return <BarChart4 className="h-4 w-4" />
      case "customers":
        return <PieChart className="h-4 w-4" />
      case "operations":
        return <LineChart className="h-4 w-4" />
      case "market":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-3 w-3 text-green-500" />
    } else if (change < 0) {
      return <TrendingDown className="h-3 w-3 text-red-500" />
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Business Insights</h2>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard 
              title="Revenue" 
              value="$248,500" 
              change={12.4} 
              trend="up"
              description="Total revenue for current period" 
            />
            <MetricCard 
              title="Customers" 
              value="2,345" 
              change={8.2} 
              trend="up"
              description="Total customers" 
            />
            <MetricCard 
              title="Avg. Order Value" 
              value="$105.32" 
              change={-2.3} 
              trend="down"
              description="Average purchase amount" 
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                Revenue Trend
              </CardTitle>
              <CardDescription>Monthly revenue over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                <p className="text-muted-foreground">Chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-blue-500" />
                Sales Performance
              </CardTitle>
              <CardDescription>Product sales breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                <p className="text-muted-foreground">Sales chart would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-blue-500" />
                Customer Segments
              </CardTitle>
              <CardDescription>Customer distribution by segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                <p className="text-muted-foreground">Customer segment visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operational Metrics</CardTitle>
              <CardDescription>Key operational indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                <p className="text-muted-foreground">Operations data would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

function MetricCard({ title, value, change, trend, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <span className={`text-sm font-medium ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 
            'text-gray-500'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          <p className="text-xs text-muted-foreground ml-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default BusinessInsights; 