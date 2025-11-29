"use client"

import { useState, useEffect, useMemo, useCallback, createContext, useContext } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ArrowRight,
  Filter,
  Download,
  Users,
  Calendar,
  RefreshCcw,
  Activity,
  DollarSign,
  Clock,
  Target,
  ChevronDown,
  Gauge,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  UserPlus,
  UserMinus,
  FileSpreadsheet,
  FileText,
  Share2,
  ListFilter,
  PieChart,
  BarChart,
  LineChart,
  MoreHorizontal,
  EyeOff,
  Eye,
  Zap,
  Bell,
  Clipboard,
  Play,
  Info,
  X,
  Wand2,
  Sparkles,
  Check
} from "lucide-react"
import dynamic from "next/dynamic"
import SegmentMetricsDashboard from "./segment-metrics-dashboard"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"

// Create a context for segment theming
const SegmentThemeContext = createContext<{
  colorMode: 'light' | 'dark' | 'colorful';
  setColorMode: (mode: 'light' | 'dark' | 'colorful') => void;
  showColorLabels: boolean;
  setShowColorLabels: (show: boolean) => void;
}>({
  colorMode: 'dark',
  setColorMode: () => {},
  showColorLabels: true,
  setShowColorLabels: () => {}
});

// Chart components with no SSR
const DynamicSegmentationChart = dynamic(() => import("./segmentation-chart"), { ssr: false })
const DynamicSegmentationPieChart = dynamic(() => import("./segmentation-pie-chart"), { ssr: false })

// Enhanced API types
interface APIResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  metadata?: {
    timestamp: string;
    source: string;
    processingTime: number;
  }
}

// Types for our component with enhanced properties
export interface UserSegment {
  id: string
  name: string
  size: number
  totalValue: number
  conversionRate: number
  engagementScore: number
  retentionRate: number
  avgSessionTime: number
  avgOrderValue: number
  purchaseFrequency: number
  growthRate: number
  churnRisk: number
  acquisitionSource?: string
  firstPurchaseDate?: string
  lastActiveDate?: string
  tags?: string[]
  cohort?: string
  ltv?: number
  predictedChurn?: number
  recommendedActions?: RecommendedAction[]
  demographicData?: {
    ageGroup?: string;
    gender?: string;
    location?: string;
    income?: string;
    education?: string;
  }
}

interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  priority: number;
}

export interface UserSegmentationProps {
  height?: number
  compact?: boolean
  refreshTrigger?: number
  showDataLabels?: boolean
  segmentData?: UserSegment[]
  onError?: (error: Error) => void
  colorMode?: 'light' | 'dark' | 'colorful'
  initialTab?: 'overview' | 'comparison' | 'details'
  onSegmentSelect?: (segmentId: string) => void
  apiEndpoint?: string
  isDemo?: boolean
}

// Enhanced mock data for user segments with more detailed information
const defaultSegments: UserSegment[] = [
  {
    id: "high-value",
    name: "High-Value Customers",
    size: 15,
    totalValue: 42500,
    conversionRate: 8.5,
    engagementScore: 9.2,
    retentionRate: 92,
    avgSessionTime: 12.5,
    avgOrderValue: 250,
    purchaseFrequency: 3.2,
    growthRate: 4.8,
    churnRisk: 12,
    acquisitionSource: "Organic Search",
    firstPurchaseDate: "2022-04-12",
    lastActiveDate: "2023-10-28",
    tags: ["loyal", "high-spender", "frequent"],
    cohort: "Q2 2022",
    ltv: 4250,
    predictedChurn: 8,
    recommendedActions: [
      {
        id: "action-1",
        title: "VIP Loyalty Program",
        description: "Enroll in exclusive VIP program with premium benefits and early access to new features",
        impact: "high",
        effort: "medium",
        priority: 9
      },
      {
        id: "action-2",
        title: "Personalized Recommendations",
        description: "Implement AI-powered personalized product recommendations",
        impact: "high",
        effort: "medium",
        priority: 8
      }
    ],
    demographicData: {
      ageGroup: "35-44",
      gender: "Mixed",
      location: "Urban",
      income: "High",
      education: "College+"
    }
  },
  {
    id: "regular",
    name: "Regular Customers",
    size: 35,
    totalValue: 31000,
    conversionRate: 5.2,
    engagementScore: 7.5,
    retentionRate: 78,
    avgSessionTime: 8.2,
    avgOrderValue: 120,
    purchaseFrequency: 1.8,
    growthRate: 2.2,
    churnRisk: 28,
    acquisitionSource: "Social Media",
    firstPurchaseDate: "2022-06-18",
    lastActiveDate: "2023-10-15",
    tags: ["steady", "mid-tier"],
    cohort: "Q2 2022",
    ltv: 2200,
    predictedChurn: 22,
    recommendedActions: [
      {
        id: "action-3",
        title: "Purchase Frequency Incentives",
        description: "Offer discounts or rewards for increasing purchase frequency",
        impact: "medium",
        effort: "low",
        priority: 7
      },
      {
        id: "action-4",
        title: "Cross-Selling Campaign",
        description: "Target with cross-selling campaign for complementary products",
        impact: "medium",
        effort: "medium",
        priority: 6
      }
    ],
    demographicData: {
      ageGroup: "25-54",
      gender: "Mixed",
      location: "Suburban",
      income: "Medium",
      education: "Mixed"
    }
  },
  {
    id: "occasional",
    name: "Occasional Buyers",
    size: 25,
    totalValue: 15000,
    conversionRate: 3.1,
    engagementScore: 5.4,
    retentionRate: 45,
    avgSessionTime: 4.8,
    avgOrderValue: 85,
    purchaseFrequency: 0.8,
    growthRate: 1.5,
    churnRisk: 42,
    acquisitionSource: "Referral",
    firstPurchaseDate: "2022-08-23",
    lastActiveDate: "2023-09-05",
    tags: ["irregular", "seasonal"],
    cohort: "Q3 2022",
    ltv: 1200,
    predictedChurn: 38,
    recommendedActions: [
      {
        id: "action-5",
        title: "Re-engagement Email Series",
        description: "Send personalized re-engagement emails with special offers",
        impact: "medium",
        effort: "low",
        priority: 8
      },
      {
        id: "action-6",
        title: "Limited-Time Promotions",
        description: "Create urgency with limited-time offers for seasonal shoppers",
        impact: "medium",
        effort: "low",
        priority: 7
      }
    ],
    demographicData: {
      ageGroup: "18-34",
      gender: "Mixed",
      location: "Mixed",
      income: "Medium-Low",
      education: "Mixed"
    }
  },
  {
    id: "new-users",
    name: "New Users",
    size: 20,
    totalValue: 8500,
    conversionRate: 2.8,
    engagementScore: 4.7,
    retentionRate: 35,
    avgSessionTime: 3.5,
    avgOrderValue: 65,
    purchaseFrequency: 0.5,
    growthRate: 8.5,
    churnRisk: 58,
    acquisitionSource: "Paid Ads",
    firstPurchaseDate: "2023-08-15",
    lastActiveDate: "2023-10-20",
    tags: ["new", "first-time"],
    cohort: "Q3 2023",
    ltv: 850,
    predictedChurn: 60,
    recommendedActions: [
      {
        id: "action-7",
        title: "Onboarding Optimization",
        description: "Improve onboarding flow to highlight key features and benefits",
        impact: "high",
        effort: "medium",
        priority: 9
      },
      {
        id: "action-8",
        title: "First Purchase Incentive",
        description: "Offer first-time purchase discount or free shipping",
        impact: "high",
        effort: "low",
        priority: 9
      }
    ],
    demographicData: {
      ageGroup: "18-34",
      gender: "Mixed",
      location: "Mixed",
      income: "Mixed",
      education: "Mixed"
    }
  },
  {
    id: "at-risk",
    name: "At-Risk Users",
    size: 5,
    totalValue: 3000,
    conversionRate: 0.9,
    engagementScore: 2.1,
    retentionRate: 15,
    avgSessionTime: 1.2,
    avgOrderValue: 45,
    purchaseFrequency: 0.2,
    growthRate: -5.2,
    churnRisk: 89,
    acquisitionSource: "Mixed",
    firstPurchaseDate: "2022-05-30",
    lastActiveDate: "2023-05-10",
    tags: ["churning", "inactive"],
    cohort: "Q2 2022",
    ltv: 680,
    predictedChurn: 92,
    recommendedActions: [
      {
        id: "action-9",
        title: "Win-back Campaign",
        description: "Launch targeted win-back campaign with exclusive offers",
        impact: "high",
        effort: "medium",
        priority: 10
      },
      {
        id: "action-10",
        title: "Customer Survey",
        description: "Send survey to understand pain points and areas for improvement",
        impact: "medium",
        effort: "low",
        priority: 8
      }
    ],
    demographicData: {
      ageGroup: "Mixed",
      gender: "Mixed",
      location: "Mixed",
      income: "Mixed",
      education: "Mixed"
    }
  },
]

/**
 * Enhanced function to get segment color with support for different color modes
 */
const getSegmentColor = (segmentId: string, colorMode: 'light' | 'dark' | 'colorful' = 'dark'): string => {
  if (colorMode === 'colorful') {
    const colorMap: Record<string, string> = {
      "high-value": "#22c55e", // vibrant green
      "regular": "#3b82f6", // vibrant blue
      "occasional": "#a855f7", // vibrant purple
      "new-users": "#eab308", // vibrant yellow
      "at-risk": "#ef4444", // vibrant red
    }
    return colorMap[segmentId] || "#94a3b8" // default slate
  } else if (colorMode === 'light') {
    const colorMap: Record<string, string> = {
      "high-value": "#10b981", // teal-500
      "regular": "#6366f1", // indigo-500
      "occasional": "#8b5cf6", // violet-500
      "new-users": "#f59e0b", // amber-500
      "at-risk": "#f43f5e", // rose-500
    }
    return colorMap[segmentId] || "#64748b" // slate-500
  } else {
    // Dark mode (default)
    const colorMap: Record<string, string> = {
      "high-value": "#4ade80", // green-400
      "regular": "#60a5fa", // blue-400
      "occasional": "#c084fc", // purple-400
      "new-users": "#facc15", // yellow-400
      "at-risk": "#f87171", // red-400
    }
    return colorMap[segmentId] || "#94a3b8" // slate-400
  }
}

/**
 * Get gradient background for segment
 */
const getSegmentGradient = (segmentId: string, colorMode: 'light' | 'dark' | 'colorful' = 'dark'): string => {
  if (colorMode === 'colorful') {
    const gradientMap: Record<string, string> = {
      "high-value": "from-green-500/20 to-green-600/10", 
      "regular": "from-blue-500/20 to-blue-600/10",
      "occasional": "from-purple-500/20 to-purple-600/10",
      "new-users": "from-yellow-500/20 to-yellow-600/10",
      "at-risk": "from-red-500/20 to-red-600/10",
    }
    return gradientMap[segmentId] || "from-slate-500/20 to-slate-600/10" 
  } else if (colorMode === 'light') {
    const gradientMap: Record<string, string> = {
      "high-value": "from-teal-100 to-teal-50", 
      "regular": "from-indigo-100 to-indigo-50",
      "occasional": "from-violet-100 to-violet-50",
      "new-users": "from-amber-100 to-amber-50",
      "at-risk": "from-rose-100 to-rose-50",
    }
    return gradientMap[segmentId] || "from-slate-100 to-slate-50"
  } else {
    // Dark mode
    const gradientMap: Record<string, string> = {
      "high-value": "from-green-900/30 to-green-800/20", 
      "regular": "from-blue-900/30 to-blue-800/20",
      "occasional": "from-purple-900/30 to-purple-800/20",
      "new-users": "from-yellow-900/30 to-yellow-800/20",
      "at-risk": "from-red-900/30 to-red-800/20",
    }
    return gradientMap[segmentId] || "from-slate-800/30 to-slate-700/20"
  }
}

/**
 * Get color classes for various uses
 */
const getSegmentColorClasses = (segmentId: string, colorMode: 'light' | 'dark' | 'colorful' = 'dark') => {
  if (colorMode === 'colorful') {
    const colorClasses: Record<string, {bg: string, text: string, border: string, hover: string}> = {
      "high-value": {
        bg: "bg-green-500/10", 
        text: "text-green-500",
        border: "border-green-500/20",
        hover: "hover:bg-green-500/20"
      },
      "regular": {
        bg: "bg-blue-500/10", 
        text: "text-blue-500",
        border: "border-blue-500/20",
        hover: "hover:bg-blue-500/20" 
      },
      "occasional": {
        bg: "bg-purple-500/10", 
        text: "text-purple-500",
        border: "border-purple-500/20",
        hover: "hover:bg-purple-500/20"  
      },
      "new-users": {
        bg: "bg-yellow-500/10", 
        text: "text-yellow-500",
        border: "border-yellow-500/20",
        hover: "hover:bg-yellow-500/20"  
      },
      "at-risk": {
        bg: "bg-red-500/10", 
        text: "text-red-500",
        border: "border-red-500/20",
        hover: "hover:bg-red-500/20"  
      },
    }
    return colorClasses[segmentId] || {
      bg: "bg-slate-500/10", 
      text: "text-slate-500",
      border: "border-slate-500/20",
      hover: "hover:bg-slate-500/20"
    }
  } else {
    // Default for both light and dark modes
    const baseColor = getSegmentColor(segmentId, colorMode);
    return {
      bg: `bg-opacity-10 bg-[${baseColor}]`,
      text: `text-[${baseColor}]`,
      border: `border-[${baseColor}] border-opacity-20`,
      hover: `hover:bg-[${baseColor}] hover:bg-opacity-20`
    }
  }
}

/**
 * Error boundary component to catch errors in the chart rendering
 */
const ErrorFallback = ({ message, retryAction }: { message: string, retryAction?: () => void }) => (
  <div className="flex items-center justify-center h-full p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-md">
    <div className="text-center">
      <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
      <p className="text-sm text-red-600 dark:text-red-400 mb-3">{message}</p>
      {retryAction && (
        <Button variant="outline" size="sm" onClick={retryAction} className="bg-white dark:bg-gray-800">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      )}
    </div>
  </div>
)

export function UserSegmentationAnalysis({
  height = 400,
  compact = false,
  refreshTrigger = 0,
  showDataLabels: initialShowDataLabels = false,
  segmentData = defaultSegments,
  onError,
  colorMode: initialColorMode = 'dark',
  initialTab = 'overview',
  onSegmentSelect,
  apiEndpoint,
  isDemo = true
}: UserSegmentationProps) {
  // UI state
  const [activeColorMode, setActiveColorMode] = useState<'light' | 'dark' | 'colorful'>(initialColorMode)
  const [showColorLabels, setShowColorLabels] = useState(true)
  const [showDataLabels, setShowDataLabels] = useState(initialShowDataLabels)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [activeView, setActiveView] = useState<"overview" | "comparison" | "details">(initialTab)
  const [showInsightPanel, setShowInsightPanel] = useState(false)
  
  // Data state
  const [segments, setSegments] = useState<UserSegment[]>(segmentData)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("30d")
  const [metric, setMetric] = useState("value")
  const [chartType, setChartType] = useState<string>('donut')
  const [comparisonChartType, setComparisonChartType] = useState<string>('bar')
  const [segmentInsight, setSegmentInsight] = useState<string>("")
  const [visibleMetrics, setVisibleMetrics] = useState<string[]>([
    'size', 'totalValue', 'conversionRate', 'engagementScore', 'retentionRate', 'churnRisk'
  ])
  
  // Filter state
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<{
    minValue: number | null,
    maxValue: number | null,
    minEngagement: number | null,
    maxEngagement: number | null,
    tags: string[],
    sources: string[]
  }>({
    minValue: null,
    maxValue: null,
    minEngagement: null,
    maxEngagement: null,
    tags: [],
    sources: []
  })
  
  const { toast } = useToast()

  // Reset error state when changing views
  useEffect(() => {
    setHasError(false)
    setErrorMessage("")
  }, [activeView])

  // Respond to refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger > 0) {
      handleRefresh()
    }
  }, [refreshTrigger])

  // Update segments when segmentData prop changes
  useEffect(() => {
    if (segmentData !== defaultSegments) {
      setSegments(segmentData)
    }
  }, [segmentData])
  
  // Effect to generate segment insight when a segment is selected
  useEffect(() => {
    if (selectedSegment) {
      generateSegmentInsight(selectedSegment)
    } else {
      setSegmentInsight("")
    }
  }, [selectedSegment])

  /**
   * Fetch segment data from API
   */
  const fetchSegmentData = useCallback(async () => {
    if (!apiEndpoint && !isDemo) {
      // If there's no API endpoint and it's not demo mode, don't try to fetch
      return
    }
    
    setIsLoading(true)
    setHasError(false)
    
    try {
      // In demo mode, simulate API call with a delay
      if (isDemo) {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Generate random variations for demo purposes
        const updatedSegments = segments.map(segment => ({
          ...segment,
          conversionRate: +(segment.conversionRate * (0.95 + Math.random() * 0.1)).toFixed(1),
          engagementScore: +(segment.engagementScore * (0.95 + Math.random() * 0.1)).toFixed(1),
          totalValue: Math.round(segment.totalValue * (0.95 + Math.random() * 0.1)),
          churnRisk: Math.min(100, Math.max(1, Math.round(segment.churnRisk * (0.95 + Math.random() * 0.1)))),
        }))
        
        setSegments(updatedSegments)
        setIsLoading(false)
        
        toast({
          title: "Data refreshed",
          description: "User segments have been updated with the latest data",
        })
      } else {
        // In real mode, actually fetch from API
        const response = await fetch(apiEndpoint!, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch segments: ${response.status}`)
        }
        
        const result: APIResponse<UserSegment[]> = await response.json()
        
        if (!result.success) {
          throw new Error(result.error || 'Unknown API error')
        }
        
        setSegments(result.data)
        setIsLoading(false)
        
        toast({
          title: "Data refreshed",
          description: `User segments updated from ${result.metadata?.source || 'API'}`,
        })
      }
    } catch (err) {
      setIsLoading(false)
      setHasError(true)
      const errorMsg = err instanceof Error ? err.message : 'Unknown error'
      setErrorMessage(errorMsg)
      
      toast({
        title: "Error refreshing data",
        description: errorMsg,
        variant: "destructive",
      })
      
      if (onError && err instanceof Error) {
        onError(err)
      }
    }
  }, [segments, onError, apiEndpoint, isDemo, toast])

  /**
   * Handle refresh action
   */
  const handleRefresh = useCallback(() => {
    fetchSegmentData()
  }, [fetchSegmentData])

  /**
   * Apply filters to segments
   */
  const filteredSegments = useMemo(() => {
    return segments.filter(segment => {
      // Apply min/max value filters
      if (filters.minValue !== null && segment.totalValue < filters.minValue) return false
      if (filters.maxValue !== null && segment.totalValue > filters.maxValue) return false
      
      // Apply min/max engagement filters
      if (filters.minEngagement !== null && segment.engagementScore < filters.minEngagement) return false
      if (filters.maxEngagement !== null && segment.engagementScore > filters.maxEngagement) return false
      
      // Apply tag filters
      if (filters.tags.length > 0 && !segment.tags?.some(tag => filters.tags.includes(tag))) return false
      
      // Apply source filters
      if (filters.sources.length > 0 && !filters.sources.includes(segment.acquisitionSource || '')) return false
      
      return true
    })
  }, [segments, filters])

  // Calculate total users - memoized to avoid recalculation
  const totalUsers = useMemo(() => 
    filteredSegments.reduce((acc, segment) => acc + segment.size, 0), 
    [filteredSegments]
  )
  
  // Get all available tags from all segments for filtering
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    segments.forEach(segment => {
      segment.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [segments])
  
  // Get all available acquisition sources for filtering
  const availableSources = useMemo(() => {
    const sources = new Set<string>()
    segments.forEach(segment => {
      if (segment.acquisitionSource) {
        sources.add(segment.acquisitionSource)
      }
    })
    return Array.from(sources)
  }, [segments])
  
  /**
   * Generate insight for selected segment using simulated AI
   */
  const generateSegmentInsight = (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId)
    if (!segment) return
    
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const churnRiskLevel = segment.churnRisk > 70 ? "high" : segment.churnRisk > 40 ? "moderate" : "low"
      const engagementLevel = segment.engagementScore > 7 ? "high" : segment.engagementScore > 4 ? "moderate" : "low"
      const retentionStatus = segment.retentionRate > 80 ? "excellent" : segment.retentionRate > 50 ? "good" : "concerning"
      const growthTrend = segment.growthRate > 3 ? "growing steadily" : segment.growthRate > 0 ? "growing slowly" : "declining"
      
      let insight = `This segment (${segment.name}) represents ${segment.size}% of your user base with ${retentionStatus} retention at ${segment.retentionRate}%. `
      insight += `With ${engagementLevel} engagement (${segment.engagementScore}/10) and ${churnRiskLevel} churn risk (${segment.churnRisk}%), this segment is ${growthTrend}. `
      
      if (segment.recommendedActions && segment.recommendedActions.length > 0) {
        const topAction = segment.recommendedActions.sort((a, b) => b.priority - a.priority)[0]
        insight += `\n\nRecommended action: ${topAction.title} - ${topAction.description}`
      }
      
      setSegmentInsight(insight)
      setIsLoading(false)
      setShowInsightPanel(true)
    }, 800)
  }

  /**
   * Get selected segment data object
   */
  const getSelectedSegmentData = useCallback(() => {
    if (!selectedSegment) return null
    return segments.find(segment => segment.id === selectedSegment) || null
  }, [selectedSegment, segments])

  /**
   * Format data for the chart based on active view and metric
   */
  const formatChartData = useMemo(() => {
    // Different formats based on the active view and metric
    if (activeView === "overview") {
      return filteredSegments.map(segment => ({
        name: segment.name,
        value: segment.size,
        totalValue: segment.totalValue,
        conversionRate: segment.conversionRate,
        color: getSegmentColor(segment.id, activeColorMode),
        id: segment.id,
      }))
    }
    
    return filteredSegments.map(segment => ({
      name: segment.name,
      [metric]: 
        metric === "value" ? segment.totalValue :
        metric === "engagement" ? segment.engagementScore :
        metric === "retention" ? segment.retentionRate :
        metric === "conversion" ? segment.conversionRate :
        metric === "churn" ? segment.churnRisk :
        segment.size,
      color: getSegmentColor(segment.id, activeColorMode),
      id: segment.id,
    }))
  }, [filteredSegments, activeView, metric, activeColorMode])

  /**
   * Handle segment selection from charts or cards
   */
  const handleSegmentClick = useCallback((segmentId: string) => {
    const newSelection = segmentId === selectedSegment ? null : segmentId
    setSelectedSegment(newSelection)
    
    // Call external handler if provided
    if (onSegmentSelect) {
      onSegmentSelect(newSelection || '')
    }
  }, [selectedSegment, onSegmentSelect])

  /**
   * Handle errors in chart rendering
   */
  const handleChartError = useCallback((error: Error) => {
    setHasError(true)
    setErrorMessage(error.message || "Failed to render chart")
    
    toast({
      title: "Visualization Error",
      description: error.message || "There was a problem displaying the chart",
      variant: "destructive",
    })
    
    if (onError) {
      onError(error)
    }
  }, [onError, toast])
  
  /**
   * Export segment data
   */
  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    setIsLoading(true)
    
    setTimeout(() => {
      try {
        let content
        let filename
        let mimeType
        
        if (format === 'csv') {
          // Create CSV content
          const headers = [
            'Segment', 'Size (%)', 'Total Value', 'Conversion Rate (%)', 
            'Engagement Score', 'Retention Rate (%)', 'Avg Session (min)',
            'Avg Order Value', 'Purchase Frequency', 'Growth Rate (%)', 'Churn Risk (%)'
          ].join(',');
          
          const rows = filteredSegments.map(segment => [
            segment.name,
            segment.size,
            segment.totalValue,
            segment.conversionRate,
            segment.engagementScore,
            segment.retentionRate,
            segment.avgSessionTime,
            segment.avgOrderValue,
            segment.purchaseFrequency,
            segment.growthRate,
            segment.churnRisk
          ].join(','));
          
          content = [headers, ...rows].join('\n');
          filename = `user-segments-${new Date().toISOString().split('T')[0]}.csv`;
          mimeType = 'text/csv';
        } else if (format === 'json') {
          // Create JSON content
          content = JSON.stringify(filteredSegments, null, 2);
          filename = `user-segments-${new Date().toISOString().split('T')[0]}.json`;
          mimeType = 'application/json';
        } else {
          // For PDF, use a more complex approach (in a real app)
          toast({
            title: "PDF Export",
            description: "PDF export would be implemented in a real application using libraries like jsPDF",
          });
          setIsLoading(false);
          return;
        }
        
        // Create download link
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        
        toast({
          title: "Export Successful",
          description: `User segments exported as ${format.toUpperCase()}`,
        });
      } catch (err) {
        console.error('Export error:', err);
        toast({
          title: "Export Failed",
          description: err instanceof Error ? err.message : "Unknown error during export",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 800);
  };
  
  /**
   * Copy segment insights to clipboard
   */
  const copyInsightsToClipboard = () => {
    if (!segmentInsight) return;
    
    navigator.clipboard.writeText(segmentInsight)
      .then(() => {
        toast({
          title: "Copied to Clipboard",
          description: "Segment insights copied successfully",
        });
      })
      .catch(err => {
        toast({
          title: "Copy Failed",
          description: "Could not copy insights to clipboard",
          variant: "destructive",
        });
      });
  };

  // Create a handler function for tab changes with the correct type signature
  const handleTabChange = (value: string) => {
    setActiveView(value as "overview" | "comparison" | "details")
  }

  return (
    <SegmentThemeContext.Provider value={{ 
      colorMode: activeColorMode, 
      setColorMode: setActiveColorMode,
      showColorLabels,
      setShowColorLabels
    }}>
      <div className={`space-y-4 ${compact ? 'text-sm' : ''}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              User Segmentation Analysis
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground ml-2 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>Segment users based on behavior, value, and engagement to identify key customer groups</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>
            <p className="text-sm text-muted-foreground">
              {filteredSegments.length} segments • {filters.tags.length > 0 || filters.sources.length > 0 ? 'Filtered view' : 'All segments'}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px] bg-background/50">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className={filters.tags.length > 0 || filters.sources.length > 0 ? "bg-primary/10 text-primary border-primary/20" : ""}>
                  <ListFilter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Segments</h4>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Value Range</h5>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="number" 
                        placeholder="Min"
                        className="w-20" 
                        value={filters.minValue || ''}
                        onChange={(e) => setFilters({...filters, minValue: e.target.value ? Number(e.target.value) : null})}
                      />
                      <span>to</span>
                      <Input 
                        type="number" 
                        placeholder="Max"
                        className="w-20" 
                        value={filters.maxValue || ''}
                        onChange={(e) => setFilters({...filters, maxValue: e.target.value ? Number(e.target.value) : null})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Engagement (1-10)</h5>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="number" 
                        placeholder="Min"
                        className="w-20" 
                        value={filters.minEngagement || ''}
                        onChange={(e) => setFilters({...filters, minEngagement: e.target.value ? Number(e.target.value) : null})}
                        min="1"
                        max="10"
                      />
                      <span>to</span>
                      <Input 
                        type="number" 
                        placeholder="Max"
                        className="w-20" 
                        value={filters.maxEngagement || ''}
                        onChange={(e) => setFilters({...filters, maxEngagement: e.target.value ? Number(e.target.value) : null})}
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Tags</h5>
                    <div className="max-h-24 overflow-y-auto space-y-1 border rounded-md p-1">
                      {availableTags.map(tag => (
                        <div key={tag} className="flex items-center">
                          <label className="flex items-center space-x-2 text-sm">
                            <input 
                              type="checkbox" 
                              className="form-checkbox h-4 w-4 rounded" 
                              checked={filters.tags.includes(tag)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters({...filters, tags: [...filters.tags, tag]})
                                } else {
                                  setFilters({...filters, tags: filters.tags.filter(t => t !== tag)})
                                }
                              }}
                            />
                            <span>{tag}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Acquisition Source</h5>
                    <div className="max-h-24 overflow-y-auto space-y-1 border rounded-md p-1">
                      {availableSources.map(source => (
                        <div key={source} className="flex items-center">
                          <label className="flex items-center space-x-2 text-sm">
                            <input 
                              type="checkbox" 
                              className="form-checkbox h-4 w-4 rounded" 
                              checked={filters.sources.includes(source)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters({...filters, sources: [...filters.sources, source]})
                                } else {
                                  setFilters({...filters, sources: filters.sources.filter(s => s !== source)})
                                }
                              }}
                            />
                            <span>{source}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setFilters({
                        minValue: null,
                        maxValue: null,
                        minEngagement: null,
                        maxEngagement: null,
                        tags: [],
                        sources: []
                      })}
                    >
                      Reset
                    </Button>
                    <Button size="sm" onClick={() => setFiltersOpen(false)}>Apply Filters</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
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
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('json')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Schedule Reports
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Display Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setActiveColorMode('light')}>
                    <span className="h-3 w-3 rounded-full bg-slate-200 mr-2" />
                    Light Mode
                    {activeColorMode === 'light' && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveColorMode('dark')}>
                    <span className="h-3 w-3 rounded-full bg-slate-700 mr-2" />
                    Dark Mode
                    {activeColorMode === 'dark' && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveColorMode('colorful')}>
                    <span className="h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mr-2" />
                    Colorful Mode
                    {activeColorMode === 'colorful' && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuCheckboxItem
                    checked={showDataLabels}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        setShowDataLabels(checked)
                      }
                    }}
                  >
                    Show Data Labels
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showColorLabels}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        setShowColorLabels(checked)
                      }
                    }}
                  >
                    Color-Coded Labels
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  const customEvent = new CustomEvent('ai-analysis', { detail: { segments: filteredSegments } })
                  document.dispatchEvent(customEvent)
                  toast({
                    title: "AI Analysis",
                    description: "Advanced AI analysis would be triggered in a real application",
                  })
                }}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI-Powered Analysis
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs value={activeView} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="details">Segment Details</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {/* Main visualization */}
              <Card className={`col-span-1 md:col-span-2 ${activeColorMode === 'colorful' ? 'bg-black/40 border-indigo-500/20 shadow-[0_0_25px_rgba(99,102,241,0.1)]' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className={`text-base ${activeColorMode === 'colorful' ? 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text' : ''}`}>
                        Segment Distribution
                      </CardTitle>
                      <CardDescription>User segments by size and value</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue={chartType} onValueChange={(value) => setChartType(value as 'pie' | 'donut' | 'radial' | '3d')}>
                        <SelectTrigger className={`w-[130px] ${activeColorMode === 'colorful' ? 'bg-black/50 border-indigo-500/20' : ''}`}>
                          <SelectValue placeholder="Chart type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="donut">Donut Chart</SelectItem>
                          <SelectItem value="radial">Radial Chart</SelectItem>
                          <SelectItem value="3d">3D Chart</SelectItem>
                        </SelectContent>
                      </Select>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => {
                              toast({
                                title: "Analytics Help",
                                description: "This chart shows the distribution of your user segments by size and value.",
                              })
                            }}>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Hover over segments to see details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {hasError ? (
                    <ErrorFallback 
                      message={errorMessage || "Failed to render chart"} 
                      retryAction={() => {
                        setHasError(false)
                        setErrorMessage("")
                      }}
                    />
                  ) : !compact ? (
                    <DynamicSegmentationPieChart 
                      data={formatChartData} 
                      height={300} 
                      onSegmentClick={handleSegmentClick}
                      selectedSegment={selectedSegment}
                      variant={chartType as 'pie' | 'donut' | 'radial' | '3d'}
                      animate={true}
                      showLabels={showDataLabels}
                      onError={handleChartError}
                      colorMode={activeColorMode}
                    />
                  ) : null}
                </CardContent>
              </Card>

              {/* Summary stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Total Segments</p>
                        <p className={`text-2xl font-bold ${activeColorMode === 'colorful' ? 'text-green-500' : ''}`}>{filteredSegments.length}</p>
                      </div>
                      <div className={`rounded-full p-2 ${activeColorMode === 'colorful' ? 'bg-green-500/10' : 'bg-muted'}`}>
                        <Users className={`h-4 w-4 ${activeColorMode === 'colorful' ? 'text-green-500' : ''}`} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">Coverage: 100% of users</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Avg. Retention</p>
                        <p className={`text-2xl font-bold ${activeColorMode === 'colorful' ? 'text-blue-500' : ''}`}>
                          {Math.round(filteredSegments.reduce((acc, segment) => acc + segment.retentionRate * segment.size, 0) / totalUsers)}%
                        </p>
                      </div>
                      <div className={`rounded-full p-2 ${activeColorMode === 'colorful' ? 'bg-blue-500/10' : 'bg-muted'}`}>
                        <UserCheck className={`h-4 w-4 ${activeColorMode === 'colorful' ? 'text-blue-500' : ''}`} />
                      </div>
                    </div>
                    <div className="mt-2">
                      {filteredSegments.reduce((acc, segment) => acc + segment.retentionRate * segment.size, 0) / totalUsers > 70 ? (
                        <p className="text-xs text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" /> Above industry average
                        </p>
                      ) : (
                        <p className="text-xs text-yellow-500 flex items-center">
                          <ArrowDownRight className="h-3 w-3 mr-1" /> Needs improvement
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Avg. Engagement</p>
                        <p className={`text-2xl font-bold ${activeColorMode === 'colorful' ? 'text-purple-500' : ''}`}>
                          {(filteredSegments.reduce((acc, segment) => acc + segment.engagementScore * segment.size, 0) / totalUsers).toFixed(1)}
                        </p>
                      </div>
                      <div className={`rounded-full p-2 ${activeColorMode === 'colorful' ? 'bg-purple-500/10' : 'bg-muted'}`}>
                        <Activity className={`h-4 w-4 ${activeColorMode === 'colorful' ? 'text-purple-500' : ''}`} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${activeColorMode === 'colorful' ? 'bg-purple-500' : 'bg-primary'}`}
                          style={{ width: `${(filteredSegments.reduce((acc, segment) => acc + segment.engagementScore * segment.size, 0) / totalUsers) * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">At-Risk Users</p>
                        <p className={`text-2xl font-bold ${activeColorMode === 'colorful' ? 'text-red-500' : ''}`}>
                          {Math.round(filteredSegments.reduce((acc, segment) => segment.churnRisk > 60 ? acc + segment.size : acc, 0))}%
                        </p>
                      </div>
                      <div className={`rounded-full p-2 ${activeColorMode === 'colorful' ? 'bg-red-500/10' : 'bg-muted'}`}>
                        <UserMinus className={`h-4 w-4 ${activeColorMode === 'colorful' ? 'text-red-500' : ''}`} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">Predicted churn in next 30 days</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key metrics */}
              <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-amber-500/20 shadow-[0_0_25px_rgba(245,158,11,0.1)]' : ''}`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-base ${activeColorMode === 'colorful' ? 'text-amber-500' : ''}`}>Segment Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <SegmentMetricsDashboard 
                    segments={filteredSegments}
                    selectedSegment={selectedSegment}
                    onSelectSegment={handleSegmentClick}
                    animate={true}
                    showColorfulUI={activeColorMode === 'colorful'}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Segment cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {filteredSegments.map((segment) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                      selectedSegment === segment.id 
                        ? activeColorMode === 'colorful' 
                          ? `ring-2 ring-[${getSegmentColor(segment.id, activeColorMode)}]` 
                          : 'ring-2 ring-primary' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => handleSegmentClick(segment.id)}
                  >
                    <CardHeader className={`pb-2 relative ${
                      activeColorMode === 'colorful' ? `bg-gradient-to-r ${getSegmentGradient(segment.id, activeColorMode)}` : ''
                    }`} 
                      style={{ 
                        borderBottom: activeColorMode === 'colorful' 
                          ? 'none'
                          : `2px solid ${getSegmentColor(segment.id, activeColorMode)}` 
                      }}
                    >
                      <CardTitle className={`text-sm flex justify-between ${
                        activeColorMode === 'colorful' && showColorLabels ? `text-[${getSegmentColor(segment.id, activeColorMode)}]` : ''
                      }`}>
                        {segment.name}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5 p-0 hover:bg-white/10" 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  generateSegmentInsight(segment.id)
                                }}
                              >
                                <Zap className="h-3.5 w-3.5 text-amber-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              <p>Generate AI insights</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardTitle>
                      <div className="flex items-center justify-between">
                        <Badge className={`${
                          activeColorMode === 'colorful'
                            ? getSegmentColorClasses(segment.id, activeColorMode).bg
                            : ''
                        }`}>
                          {segment.size}% of users
                        </Badge>
                        <span className="text-xs text-muted-foreground">${segment.totalValue.toLocaleString()}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3 pb-2 space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span>Engagement</span>
                          <span>{segment.engagementScore}/10</span>
                        </div>
                        <Progress value={segment.engagementScore * 10} className={`h-1 ${
                          activeColorMode === 'colorful' ? `bg-opacity-30 bg-[${getSegmentColor(segment.id, activeColorMode)}]` : ''
                        }`} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span>Retention</span>
                          <span>{segment.retentionRate}%</span>
                        </div>
                        <Progress value={segment.retentionRate} className={`h-1 ${
                          activeColorMode === 'colorful' ? `bg-opacity-30 bg-[${getSegmentColor(segment.id, activeColorMode)}]` : ''
                        }`} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span>Conversion</span>
                          <span>{segment.conversionRate}%</span>
                        </div>
                        <Progress value={segment.conversionRate * 10} className={`h-1 ${
                          activeColorMode === 'colorful' ? `bg-opacity-30 bg-[${getSegmentColor(segment.id, activeColorMode)}]` : ''
                        }`} />
                      </div>
                      {segment.tags && segment.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1 pt-1 border-t border-border">
                          {segment.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted">
                              {tag}
                            </span>
                          ))}
                          {segment.tags.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted">
                              +{segment.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Show an empty state when no segments match the filters */}
            {filteredSegments.length === 0 && (
              <Card className="py-8">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className={`rounded-full p-3 mb-4 ${activeColorMode === 'colorful' ? 'bg-amber-500/10' : 'bg-muted'}`}>
                    <Filter className={`h-6 w-6 ${activeColorMode === 'colorful' ? 'text-amber-500' : ''}`} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No matching segments</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    No segments match your current filter criteria. Try adjusting your filters to see more results.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({
                      minValue: null,
                      maxValue: null,
                      minEngagement: null,
                      maxEngagement: null,
                      tags: [],
                      sources: []
                    })}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {/* AI Insight Panel */}
            <AnimatePresence>
              {showInsightPanel && selectedSegment && segmentInsight && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={`fixed bottom-6 right-6 max-w-md rounded-lg p-4 shadow-xl z-50 ${
                    activeColorMode === 'colorful' 
                      ? 'bg-gradient-to-br from-purple-950/95 to-indigo-950/95 border border-indigo-500/30' 
                      : 'bg-background/95 backdrop-blur-sm border'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Sparkles className={`h-4 w-4 mr-2 ${activeColorMode === 'colorful' ? 'text-amber-400' : ''}`} />
                      <h3 className={`text-sm font-medium ${activeColorMode === 'colorful' ? 'text-amber-400' : ''}`}>AI-Generated Insight</h3>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyInsightsToClipboard}>
                        <Clipboard className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowInsightPanel(false)}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm space-y-2">
                    {segmentInsight.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground">{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-border flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">Generated for {getSelectedSegmentData()?.name}</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <Wand2 className="h-3 w-3" />
                      More Insights
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-4">
            <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <CardTitle className={`text-base ${activeColorMode === 'colorful' ? 'bg-gradient-to-r from-blue-400 to-sky-400 text-transparent bg-clip-text' : ''}`}>
                      Segment Comparison
                    </CardTitle>
                    <CardDescription>Compare key metrics across segments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Select value={metric} onValueChange={setMetric}>
                      <SelectTrigger className={`w-[150px] ${activeColorMode === 'colorful' ? 'bg-black/50 border-blue-500/20' : ''}`}>
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="value">Total Value</SelectItem>
                        <SelectItem value="engagement">Engagement Score</SelectItem>
                        <SelectItem value="retention">Retention Rate</SelectItem>
                        <SelectItem value="conversion">Conversion Rate</SelectItem>
                        <SelectItem value="churn">Churn Risk</SelectItem>
                      </SelectContent>
                    </Select>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => {
                            toast({
                              title: "Comparison Help",
                              description: "This chart compares segments across your selected metric.",
                            })
                          }}>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select a metric to compare across segments</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[350px]">
                <div className="flex justify-between mb-2 items-center">
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className={activeColorMode === 'colorful' ? 'border-blue-500/20 text-blue-400' : ''}>
                      {metric === 'value' ? 'Total Value ($)' : 
                       metric === 'engagement' ? 'Engagement Score' : 
                       metric === 'retention' ? 'Retention Rate (%)' : 
                       metric === 'conversion' ? 'Conversion Rate (%)' : 
                       'Churn Risk (%)'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {metric === 'value' ? '(higher is better)' : 
                       metric === 'engagement' ? '(1-10 scale)' : 
                       metric === 'retention' ? '(higher is better)' : 
                       metric === 'conversion' ? '(higher is better)' : 
                       '(lower is better)'}
                    </span>
                  </div>
                  <Select 
                    defaultValue={comparisonChartType} 
                    onValueChange={(value) => setComparisonChartType(value as 'bar' | 'grouped' | 'stacked' | 'composed')}
                  >
                    <SelectTrigger className={`w-[150px] ${activeColorMode === 'colorful' ? 'bg-black/50 border-blue-500/20' : ''}`}>
                      <SelectValue placeholder="Chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">
                        <span className="flex items-center gap-2">
                          <BarChart className="h-4 w-4" />
                          Bar Chart
                        </span>
                      </SelectItem>
                      <SelectItem value="grouped">
                        <span className="flex items-center gap-2">
                          <BarChart className="h-4 w-4" />
                          Grouped Chart
                        </span>
                      </SelectItem>
                      <SelectItem value="stacked">
                        <span className="flex items-center gap-2">
                          <BarChart className="h-4 w-4" />
                          Stacked Chart
                        </span>
                      </SelectItem>
                      <SelectItem value="composed">
                        <span className="flex items-center gap-2">
                          <LineChart className="h-4 w-4" />
                          Composed Chart
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {hasError ? (
                  <ErrorFallback 
                    message={errorMessage || "Failed to render chart"} 
                    retryAction={() => {
                      setHasError(false)
                      setErrorMessage("")
                    }}
                  />
                ) : (
                  <DynamicSegmentationChart 
                    data={formatChartData} 
                    height={300} 
                    metric={metric}
                    onSegmentClick={handleSegmentClick}
                    selectedSegment={selectedSegment}
                    showDataLabels={showDataLabels}
                    chartType={comparisonChartType as 'bar' | 'grouped' | 'stacked' | 'composed'}
                    showBrush={true}
                    animate={true}
                    showAverage={true}
                    secondaryMetric={metric === 'value' ? 'retention' : metric === 'retention' ? 'engagement' : 'value'}
                    onError={handleChartError}
                    colorMode={activeColorMode}
                  />
                )}
              </CardContent>
              <CardFooter className={`pt-0 ${activeColorMode === 'colorful' ? 'text-blue-400' : ''}`}>
                <div className="text-xs text-muted-foreground">
                  {metric === 'value' ? 
                    "Total value represents the economic contribution of each segment." : 
                    metric === 'engagement' ? 
                    "Engagement score measures user activity and interaction with your product (1-10 scale)." : 
                    metric === 'retention' ? 
                    "Retention rate shows the percentage of users who remain active over time." : 
                    metric === 'conversion' ? 
                    "Conversion rate represents the percentage of users who complete desired actions." :
                    "Churn risk indicates the likelihood of users becoming inactive or leaving."}
                </div>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.1)]' : ''}`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-base ${activeColorMode === 'colorful' ? 'text-purple-400' : ''}`}>
                    Behavioral Metrics
                  </CardTitle>
                  <CardDescription>User activity and engagement patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredSegments.map((segment) => (
                      <motion.div
                        key={`behavior-${segment.id}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`p-3 rounded-md cursor-pointer transition-all ${
                          selectedSegment === segment.id 
                            ? activeColorMode === 'colorful' 
                              ? `bg-gradient-to-r ${getSegmentGradient(segment.id, activeColorMode)}` 
                              : 'bg-accent' 
                            : 'hover:bg-accent/50'
                        }`}
                        onClick={() => handleSegmentClick(segment.id)}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: getSegmentColor(segment.id, activeColorMode) }}
                            />
                            <span className={`font-medium text-sm ${
                              activeColorMode === 'colorful' && selectedSegment === segment.id && showColorLabels
                                ? `text-[${getSegmentColor(segment.id, activeColorMode)}]` 
                                : ''
                            }`}>
                              {segment.name}
                            </span>
                          </div>
                          <Badge variant="outline" className={`text-xs ${
                            activeColorMode === 'colorful' 
                              ? `border-[${getSegmentColor(segment.id, activeColorMode)}] border-opacity-30` 
                              : ''
                          }`}>{segment.size}%</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Engagement</p>
                            <p className={`text-sm font-medium ${
                              activeColorMode === 'colorful' && selectedSegment === segment.id && showColorLabels
                                ? `text-[${getSegmentColor(segment.id, activeColorMode)}]` 
                                : ''
                            }`}>{segment.engagementScore}/10</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Session Time</p>
                            <p className="text-sm font-medium">{segment.avgSessionTime} min</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Frequency</p>
                            <p className="text-sm font-medium">{segment.purchaseFrequency}/mo</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-green-500/20 shadow-[0_0_25px_rgba(16,185,129,0.1)]' : ''}`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-base ${activeColorMode === 'colorful' ? 'text-green-400' : ''}`}>
                    Economic Value
                  </CardTitle>
                  <CardDescription>Monetary contribution and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredSegments.map((segment) => (
                      <motion.div
                        key={`value-${segment.id}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`p-3 rounded-md cursor-pointer transition-all ${
                          selectedSegment === segment.id 
                            ? activeColorMode === 'colorful' 
                              ? `bg-gradient-to-r ${getSegmentGradient(segment.id, activeColorMode)}` 
                              : 'bg-accent' 
                            : 'hover:bg-accent/50'
                        }`}
                        onClick={() => handleSegmentClick(segment.id)}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: getSegmentColor(segment.id, activeColorMode) }}
                            />
                            <span className={`font-medium text-sm ${
                              activeColorMode === 'colorful' && selectedSegment === segment.id && showColorLabels
                                ? `text-[${getSegmentColor(segment.id, activeColorMode)}]` 
                                : ''
                            }`}>
                              {segment.name}
                            </span>
                          </div>
                          <span className={`text-sm font-medium ${
                            activeColorMode === 'colorful' && selectedSegment === segment.id && showColorLabels
                              ? `text-[${getSegmentColor(segment.id, activeColorMode)}]` 
                              : ''
                          }`}>${segment.totalValue.toLocaleString()}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Avg Order</p>
                            <p className="text-sm font-medium">${segment.avgOrderValue}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Growth</p>
                            <p className={`text-sm font-medium ${segment.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {segment.growthRate > 0 ? '+' : ''}{segment.growthRate}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Conversion</p>
                            <p className="text-sm font-medium">{segment.conversionRate}%</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Cross-segment benchmark */}
            <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-amber-500/20 shadow-[0_0_25px_rgba(245,158,11,0.1)]' : ''}`}>
              <CardHeader className="pb-2 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className={`text-base ${activeColorMode === 'colorful' ? 'text-amber-400' : ''}`}>
                    Segment Benchmarks
                  </CardTitle>
                  <CardDescription>Compare performance across key metrics</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    toast({
                      title: "Benchmark Data",
                      description: "In a real application, this would show industry benchmarks"
                    })
                  }}
                  className={activeColorMode === 'colorful' ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/20' : ''}
                >
                  <LineChart className="h-4 w-4 mr-1" />
                  Show Industry Benchmarks
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2">Segment</th>
                        {visibleMetrics.includes('size') && <th className="text-right p-2">Size (%)</th>}
                        {visibleMetrics.includes('totalValue') && <th className="text-right p-2">Total Value</th>}
                        {visibleMetrics.includes('avgOrderValue') && <th className="text-right p-2">Avg Order</th>}
                        {visibleMetrics.includes('engagementScore') && <th className="text-right p-2">Engagement</th>}
                        {visibleMetrics.includes('retentionRate') && <th className="text-right p-2">Retention (%)</th>}
                        {visibleMetrics.includes('conversionRate') && <th className="text-right p-2">Conversion (%)</th>}
                        {visibleMetrics.includes('growthRate') && <th className="text-right p-2">Growth (%)</th>}
                        {visibleMetrics.includes('churnRisk') && <th className="text-right p-2">Churn Risk</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSegments.map((segment) => (
                        <tr 
                          key={`benchmark-${segment.id}`} 
                          className={`border-b border-border hover:bg-muted/50 cursor-pointer ${
                            selectedSegment === segment.id ? 'bg-accent/50' : ''
                          }`}
                          onClick={() => handleSegmentClick(segment.id)}
                        >
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-2 h-2 rounded-full" 
                                style={{ backgroundColor: getSegmentColor(segment.id, activeColorMode) }}
                              />
                              <span className={`font-medium ${
                                activeColorMode === 'colorful' && showColorLabels
                                  ? `text-[${getSegmentColor(segment.id, activeColorMode)}]` 
                                  : ''
                              }`}>
                                {segment.name}
                              </span>
                            </div>
                          </td>
                          {visibleMetrics.includes('size') && <td className="text-right p-2">{segment.size}%</td>}
                          {visibleMetrics.includes('totalValue') && <td className="text-right p-2">${segment.totalValue.toLocaleString()}</td>}
                          {visibleMetrics.includes('avgOrderValue') && <td className="text-right p-2">${segment.avgOrderValue}</td>}
                          {visibleMetrics.includes('engagementScore') && <td className="text-right p-2">{segment.engagementScore}/10</td>}
                          {visibleMetrics.includes('retentionRate') && (
                            <td className="text-right p-2">
                              <span className={`${
                                segment.retentionRate > 80 
                                  ? 'text-green-500' 
                                  : segment.retentionRate > 50 
                                    ? 'text-yellow-500' 
                                    : 'text-red-500'
                              }`}>
                                {segment.retentionRate}%
                              </span>
                            </td>
                          )}
                          {visibleMetrics.includes('conversionRate') && <td className="text-right p-2">{segment.conversionRate}%</td>}
                          {visibleMetrics.includes('growthRate') && (
                            <td className="text-right p-2">
                              <span className={segment.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}>
                                {segment.growthRate > 0 ? '+' : ''}{segment.growthRate}%
                              </span>
                            </td>
                          )}
                          {visibleMetrics.includes('churnRisk') && (
                            <td className="text-right p-2">
                              <span className={`${
                                segment.churnRisk > 60 
                                  ? 'text-red-500' 
                                  : segment.churnRisk > 30 
                                    ? 'text-yellow-500' 
                                    : 'text-green-500'
                              }`}>
                                {segment.churnRisk}%
                              </span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <EyeOff className="h-4 w-4 mr-1" />
                        Customize Columns
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={visibleMetrics.includes('size')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setVisibleMetrics([...visibleMetrics, 'size'])
                          } else {
                            setVisibleMetrics(visibleMetrics.filter(m => m !== 'size'))
                          }
                        }}
                      >
                        Size (%)
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleMetrics.includes('totalValue')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setVisibleMetrics([...visibleMetrics, 'totalValue'])
                          } else {
                            setVisibleMetrics(visibleMetrics.filter(m => m !== 'totalValue'))
                          }
                        }}
                      >
                        Total Value
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleMetrics.includes('avgOrderValue')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setVisibleMetrics([...visibleMetrics, 'avgOrderValue'])
                          } else {
                            setVisibleMetrics(visibleMetrics.filter(m => m !== 'avgOrderValue'))
                          }
                        }}
                      >
                        Avg Order Value
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleMetrics.includes('engagementScore')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setVisibleMetrics([...visibleMetrics, 'engagementScore'])
                          } else {
                            setVisibleMetrics(visibleMetrics.filter(m => m !== 'engagementScore'))
                          }
                        }}
                      >
                        Engagement Score
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleMetrics.includes('retentionRate')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setVisibleMetrics([...visibleMetrics, 'retentionRate'])
                          } else {
                            setVisibleMetrics(visibleMetrics.filter(m => m !== 'retentionRate'))
                          }
                        }}
                      >
                        Retention Rate (%)
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleMetrics.includes('conversionRate')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setVisibleMetrics([...visibleMetrics, 'conversionRate'])
                          } else {
                            setVisibleMetrics(visibleMetrics.filter(m => m !== 'conversionRate'))
                          }
                        }}
                      >
                        Conversion Rate (%)
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleMetrics.includes('growthRate')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setVisibleMetrics([...visibleMetrics, 'growthRate'])
                          } else {
                            setVisibleMetrics(visibleMetrics.filter(m => m !== 'growthRate'))
                          }
                        }}
                      >
                        Growth Rate (%)
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleMetrics.includes('churnRisk')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setVisibleMetrics([...visibleMetrics, 'churnRisk'])
                          } else {
                            setVisibleMetrics(visibleMetrics.filter(m => m !== 'churnRisk'))
                          }
                        }}
                      >
                        Churn Risk
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segment Details Tab */}
          <TabsContent value="details" className="space-y-4">
            {selectedSegment ? (
              <div className="space-y-4">
                <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-indigo-500/20 shadow-[0_0_35px_rgba(99,102,241,0.1)]' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: getSegmentColor(getSelectedSegmentData()!.id, activeColorMode) }}
                          /> 
                          <span className={`${
                            activeColorMode === 'colorful' && showColorLabels
                              ? `text-[${getSegmentColor(getSelectedSegmentData()!.id, activeColorMode)}]` 
                              : ''
                          }`}>
                            {getSelectedSegmentData()!.name}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          Detailed analysis and insights for this user segment
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${
                          activeColorMode === 'colorful'
                            ? getSegmentColorClasses(getSelectedSegmentData()!.id, activeColorMode).bg
                            : ''
                        }`}>
                          {getSelectedSegmentData()!.size}% of users
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => generateSegmentInsight(selectedSegment)}
                          className={activeColorMode === 'colorful' ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/20' : ''}
                        >
                          <Sparkles className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Total Value</p>
                        <p className={`text-lg font-medium ${
                          activeColorMode === 'colorful' && showColorLabels
                            ? `text-[${getSegmentColor(getSelectedSegmentData()!.id, activeColorMode)}]` 
                            : ''
                        }`}>
                          ${getSelectedSegmentData()!.totalValue.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Avg Order Value</p>
                        <p className="text-lg font-medium">${getSelectedSegmentData()!.avgOrderValue}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Retention Rate</p>
                        <p className={`text-lg font-medium ${
                          getSelectedSegmentData()!.retentionRate > 80 
                            ? 'text-green-500' 
                            : getSelectedSegmentData()!.retentionRate > 50 
                              ? 'text-yellow-500' 
                              : 'text-red-500'
                        }`}>
                          {getSelectedSegmentData()!.retentionRate}%
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Churn Risk</p>
                        <p className={`text-lg font-medium ${
                          getSelectedSegmentData()!.churnRisk > 60 
                            ? 'text-red-500' 
                            : getSelectedSegmentData()!.churnRisk > 30 
                              ? 'text-yellow-500' 
                              : 'text-green-500'
                        }`}>
                          {getSelectedSegmentData()!.churnRisk}%
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Engagement Score</p>
                        <p className="text-lg font-medium">{getSelectedSegmentData()!.engagementScore}/10</p>
                        <Progress 
                          value={getSelectedSegmentData()!.engagementScore * 10} 
                          className={`h-1 mt-1 ${
                            activeColorMode === 'colorful' 
                              ? `bg-opacity-30 bg-[${getSegmentColor(getSelectedSegmentData()!.id, activeColorMode)}]` 
                              : ''
                          }`} 
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Conversion Rate</p>
                        <p className="text-lg font-medium">{getSelectedSegmentData()!.conversionRate}%</p>
                        <Progress 
                          value={getSelectedSegmentData()!.conversionRate * 10} 
                          className={`h-1 mt-1 ${
                            activeColorMode === 'colorful' 
                              ? `bg-opacity-30 bg-[${getSegmentColor(getSelectedSegmentData()!.id, activeColorMode)}]` 
                              : ''
                          }`} 
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Avg Session Time</p>
                        <p className="text-lg font-medium">{getSelectedSegmentData()!.avgSessionTime} min</p>
                        <Progress 
                          value={getSelectedSegmentData()!.avgSessionTime * 6} 
                          className={`h-1 mt-1 ${
                            activeColorMode === 'colorful' 
                              ? `bg-opacity-30 bg-[${getSegmentColor(getSelectedSegmentData()!.id, activeColorMode)}]` 
                              : ''
                          }`} 
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Purchase Frequency</p>
                        <p className="text-lg font-medium">{getSelectedSegmentData()!.purchaseFrequency}/mo</p>
                        <Progress 
                          value={getSelectedSegmentData()!.purchaseFrequency * 20} 
                          className={`h-1 mt-1 ${
                            activeColorMode === 'colorful' 
                              ? `bg-opacity-30 bg-[${getSegmentColor(getSelectedSegmentData()!.id, activeColorMode)}]` 
                              : ''
                          }`} 
                        />
                      </div>
                    </div>
                    
                    {/* Additional segment details */}
                    {getSelectedSegmentData()?.acquisitionSource && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Acquisition Source</p>
                          <p className="font-medium">{getSelectedSegmentData()!.acquisitionSource}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">First Purchase</p>
                          <p className="font-medium">
                            {getSelectedSegmentData()?.firstPurchaseDate ? 
                              new Date(getSelectedSegmentData()!.firstPurchaseDate!).toLocaleDateString() : 
                              "Unknown"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Last Active</p>
                          <p className="font-medium">
                            {getSelectedSegmentData()?.lastActiveDate ? 
                              new Date(getSelectedSegmentData()!.lastActiveDate!).toLocaleDateString() : 
                              "Unknown"}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Tags */}
                    {getSelectedSegmentData()?.tags && getSelectedSegmentData()!.tags!.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {getSelectedSegmentData()!.tags!.map(tag => (
                          <Badge key={tag} variant="outline" className={`text-xs ${
                            activeColorMode === 'colorful'
                              ? `bg-opacity-10 bg-[${getSegmentColor(getSelectedSegmentData()!.id, activeColorMode)}] border-[${getSegmentColor(getSelectedSegmentData()!.id, activeColorMode)}] border-opacity-20 text-[${getSegmentColor(getSelectedSegmentData()!.id, activeColorMode)}]`
                              : ''
                          }`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div>
                      <Badge 
                        variant="outline" 
                        className={getSelectedSegmentData()!.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}
                      >
                        Growth Rate: {getSelectedSegmentData()!.growthRate > 0 ? '+' : ''}{getSelectedSegmentData()!.growthRate}%
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExport('csv')}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Export Data
                      </Button>
                      <Button>Generate Detailed Report</Button>
                    </div>
                  </CardFooter>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.1)]' : ''}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-base ${activeColorMode === 'colorful' ? 'text-blue-400' : ''}`}>
                        Key Characteristics
                      </CardTitle>
                      <CardDescription>Defining traits and patterns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className={`p-2 rounded-md ${activeColorMode === 'colorful' ? 'bg-blue-950/30' : 'bg-accent/50'}`}>
                          <span className="text-sm font-medium">Demographics</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getSelectedSegmentData()?.demographicData ? (
                              <>
                                {getSelectedSegmentData()?.demographicData?.ageGroup && 
                                  <span className="block">Age: {getSelectedSegmentData()?.demographicData?.ageGroup}</span>}
                                {getSelectedSegmentData()?.demographicData?.gender && 
                                  <span className="block">Gender: {getSelectedSegmentData()?.demographicData?.gender}</span>}
                                {getSelectedSegmentData()?.demographicData?.location && 
                                  <span className="block">Location: {getSelectedSegmentData()?.demographicData?.location}</span>}
                                {getSelectedSegmentData()?.demographicData?.income && 
                                  <span className="block">Income Level: {getSelectedSegmentData()?.demographicData?.income}</span>}
                                {getSelectedSegmentData()?.demographicData?.education && 
                                  <span className="block">Education: {getSelectedSegmentData()?.demographicData?.education}</span>}
                              </>
                            ) : (
                              <>
                                {getSelectedSegmentData()!.id === "high-value" && "Primarily 35-55 age range, higher income, urban locations"}
                                {getSelectedSegmentData()!.id === "regular" && "Diverse age range, mid-level income, suburban areas"}
                                {getSelectedSegmentData()!.id === "occasional" && "Younger demographic, 25-40, mixed income levels"}
                                {getSelectedSegmentData()!.id === "new-users" && "Diverse, skews towards younger users, 18-30 age range"}
                                {getSelectedSegmentData()!.id === "at-risk" && "Varied demographics, no clear pattern in age or income"}
                              </>
                            )}
                          </p>
                        </div>
                        <div className={`p-2 rounded-md ${activeColorMode === 'colorful' ? 'bg-blue-950/30' : 'bg-accent/50'}`}>
                          <span className="text-sm font-medium">Behavior Patterns</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getSelectedSegmentData()!.id === "high-value" && "Regular purchases, high engagement with multiple products"}
                            {getSelectedSegmentData()!.id === "regular" && "Consistent usage, moderate engagement across core features"}
                            {getSelectedSegmentData()!.id === "occasional" && "Sporadic activity, focus on specific features"}
                            {getSelectedSegmentData()!.id === "new-users" && "Exploratory behavior, high initial engagement but inconsistent"}
                            {getSelectedSegmentData()!.id === "at-risk" && "Declining usage patterns, minimal engagement"}
                          </p>
                        </div>
                        <div className={`p-2 rounded-md ${activeColorMode === 'colorful' ? 'bg-blue-950/30' : 'bg-accent/50'}`}>
                          <span className="text-sm font-medium">Channel Preference</span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getSelectedSegmentData()!.id === "high-value" && "Multi-channel, high email open rates, direct engagement"}
                            {getSelectedSegmentData()!.id === "regular" && "Email and mobile app are primary channels"}
                            {getSelectedSegmentData()!.id === "occasional" && "Social media and mobile notifications preferred"}
                            {getSelectedSegmentData()!.id === "new-users" && "In-app notifications and tutorials most effective"}
                            {getSelectedSegmentData()!.id === "at-risk" && "Low response rate across all channels"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-green-500/20 shadow-[0_0_25px_rgba(16,185,129,0.1)]' : ''}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-base ${activeColorMode === 'colorful' ? 'text-green-400' : ''}`}>
                        Recommended Actions
                      </CardTitle>
                      <CardDescription>Suggested strategies for this segment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className={`p-2 rounded-md ${activeColorMode === 'colorful' ? 'bg-green-950/30' : 'bg-accent/50'}`}>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Priority Level</span>
                            <Badge className={activeColorMode === 'colorful' ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : ''}>
                              {getSelectedSegmentData()!.id === "high-value" && "High"}
                              {getSelectedSegmentData()!.id === "regular" && "Medium"}
                              {getSelectedSegmentData()!.id === "occasional" && "Medium"}
                              {getSelectedSegmentData()!.id === "new-users" && "High"}
                              {getSelectedSegmentData()!.id === "at-risk" && "Critical"}
                            </Badge>
                          </div>
                        </div>
                        
                        {getSelectedSegmentData()?.recommendedActions ? (
                          // Display recommendedActions if available
                          <>
                            {getSelectedSegmentData()?.recommendedActions?.map((action, index) => (
                              <div
                                key={action.id}
                                className={`p-3 rounded-md ${
                                  activeColorMode === 'colorful' 
                                    ? 'bg-green-950/30 hover:bg-green-950/40' 
                                    : 'bg-accent/50 hover:bg-accent/70'
                                } transition-all cursor-pointer`}
                                onClick={() => {
                                  toast({
                                    title: `Action: ${action.title}`,
                                    description: action.description,
                                  })
                                }}
                              >
                                <div className="flex justify-between items-start mb-1">
                                  <span className="text-sm font-medium">{action.title}</span>
                                  <div className="flex items-center gap-1">
                                    <Badge variant="outline" className={
                                      action.impact === 'high' 
                                        ? 'text-green-500 border-green-500/20' 
                                        : action.impact === 'medium'
                                          ? 'text-amber-500 border-amber-500/20'
                                          : 'text-blue-500 border-blue-500/20'
                                    }>
                                      {action.impact} impact
                                    </Badge>
                                    <Badge variant="outline" className={
                                      action.effort === 'low' 
                                        ? 'text-green-500 border-green-500/20' 
                                        : action.effort === 'medium'
                                          ? 'text-amber-500 border-amber-500/20'
                                          : 'text-red-500 border-red-500/20'
                                    }>
                                      {action.effort} effort
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {action.description}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs text-muted-foreground">Priority score: {action.priority}/10</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={`h-6 text-xs px-2 ${
                                      activeColorMode === 'colorful' 
                                        ? 'text-green-400 hover:text-green-300 hover:bg-green-950/20' 
                                        : ''
                                    }`}
                                  >
                                    <Play className="h-3 w-3 mr-1" />
                                    Implement
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          // Fallback to default content
                          <>
                            <div className={`p-2 rounded-md ${activeColorMode === 'colorful' ? 'bg-green-950/30' : 'bg-accent/50'}`}>
                              <span className="text-sm font-medium">Engagement Strategy</span>
                              <p className="text-xs text-muted-foreground mt-1">
                                {getSelectedSegmentData()!.id === "high-value" && "Personalized offers, early access to new features, loyalty rewards"}
                                {getSelectedSegmentData()!.id === "regular" && "Feature education, upsell opportunities, personalized content"}
                                {getSelectedSegmentData()!.id === "occasional" && "Re-engagement campaigns, targeted promotions"}
                                {getSelectedSegmentData()!.id === "new-users" && "Onboarding optimization, first purchase incentives"}
                                {getSelectedSegmentData()!.id === "at-risk" && "Recovery campaign, exit survey, special retention offers"}
                              </p>
                            </div>
                            <div className={`p-2 rounded-md ${activeColorMode === 'colorful' ? 'bg-green-950/30' : 'bg-accent/50'}`}>
                              <span className="text-sm font-medium">Growth Opportunity</span>
                              <p className="text-xs text-muted-foreground mt-1">
                                {getSelectedSegmentData()!.id === "high-value" && "Cross-selling premium features, referral programs, community building"}
                                {getSelectedSegmentData()!.id === "regular" && "Increasing purchase frequency, feature adoption expansion"}
                                {getSelectedSegmentData()!.id === "occasional" && "Improving retention, converting to regular users"}
                                {getSelectedSegmentData()!.id === "new-users" && "Accelerating onboarding, improving first-month experience"}
                                {getSelectedSegmentData()!.id === "at-risk" && "Identifying churn triggers, implementing preventative measures"}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full ${
                          activeColorMode === 'colorful' 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : ''
                        }`}
                        onClick={() => {
                          toast({
                            title: "Strategy Implementation",
                            description: "In a real application, this would integrate with your marketing automation platform",
                          })
                        }}
                      >
                        Implement Strategy
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Advanced segmentation insights */}
                {getSelectedSegmentData()?.ltv !== undefined && (
                  <Card className={`${activeColorMode === 'colorful' ? 'bg-black/40 border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.1)]' : ''}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-base ${activeColorMode === 'colorful' ? 'text-purple-400' : ''}`}>
                        Advanced Metrics
                      </CardTitle>
                      <CardDescription>Predictive analytics and lifetime value</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium">Lifetime Value (LTV)</h4>
                              <span className={`text-lg font-bold ${activeColorMode === 'colorful' ? 'text-purple-400' : ''}`}>
                                ${getSelectedSegmentData()!.ltv?.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Projected total revenue from the average user in this segment over their entire relationship with your business.
                            </p>
                            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${activeColorMode === 'colorful' ? 'bg-purple-500' : 'bg-primary'}`}
                                style={{ 
                                  width: `${Math.min(100, (getSelectedSegmentData()!.ltv! / 5000) * 100)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium">Predicted Churn</h4>
                              <span className={`text-lg font-bold ${
                                getSelectedSegmentData()!.predictedChurn! > 50 
                                  ? 'text-red-500' 
                                  : getSelectedSegmentData()!.predictedChurn! > 25 
                                    ? 'text-yellow-500' 
                                    : 'text-green-500'
                              }`}>
                                {getSelectedSegmentData()!.predictedChurn}%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              AI-driven prediction of users likely to churn within the next 30 days based on behavioral patterns.
                            </p>
                            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  getSelectedSegmentData()!.predictedChurn! > 50 
                                    ? 'bg-red-500' 
                                    : getSelectedSegmentData()!.predictedChurn! > 25 
                                      ? 'bg-yellow-500' 
                                      : 'bg-green-500'
                                }`}
                                style={{ 
                                  width: `${getSelectedSegmentData()!.predictedChurn!}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${activeColorMode === 'colorful' ? 'bg-purple-950/30' : 'bg-accent/50'}`}>
                          <h4 className="text-sm font-medium mb-2">AI-Generated Insight</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {getSelectedSegmentData()!.id === "high-value" && 
                              "This high-value segment shows excellent retention and engagement metrics. Advanced analytics indicates these users have a higher propensity to adopt premium features and act as brand advocates. Consider implementing a tiered loyalty program to further increase LTV and reduce the 8% predicted churn rate."}
                            {getSelectedSegmentData()!.id === "regular" && 
                              "Regular users represent your core customer base with moderate engagement. There's significant opportunity to increase their LTV through targeted cross-selling and improved feature education. Focus on converting these users to higher-value tiers through personalized offers based on their usage patterns."}
                            {getSelectedSegmentData()!.id === "occasional" && 
                              "Occasional buyers show irregular usage patterns but still contribute meaningful revenue. The high predicted churn rate (38%) suggests implementing more robust re-engagement strategies. Consider analyzing their usage patterns to identify potential friction points in the customer journey."}
                            {getSelectedSegmentData()!.id === "new-users" && 
                              "This segment has high growth potential but also high churn risk. The first 30 days are critical for establishing long-term value. Our predictive models suggest focusing on onboarding optimization and early success experiences to convert these users into regular customers."}
                            {getSelectedSegmentData()!.id === "at-risk" && 
                              "Urgent intervention is recommended for this segment with a 92% predicted churn rate. These users were previously engaged but have shown significant decline in activity. Implement win-back campaigns and consider direct outreach for high-LTV individuals within this segment."}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-3 w-full"
                            onClick={() => {
                              toast({
                                title: "Predictive Analysis",
                                description: "In a real application, this would show detailed ML-based predictions",
                              })
                            }}
                          >
                            <Wand2 className="h-3.5 w-3.5 mr-1" />
                            Run Predictive Analysis
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Select a Segment</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mt-1">
                    Click on any segment from the overview or comparison tabs to view detailed insights and recommended actions
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => setActiveView("overview")}>
                    Go to Overview
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SegmentThemeContext.Provider>
  )
} 