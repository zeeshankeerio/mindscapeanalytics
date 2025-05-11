"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Download,
  Users,
  RefreshCcw,
  Filter,
  Clock,
  Target,
  BarChart2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Upload,
  Save,
  Eye,
  Zap,
  AlertTriangle,
  PieChart,
  Settings,
  ChevronsUpDown,
  Info,
  MousePointerClick,
  Share2,
  Check,
  AlertCircle,
  FileJson,
  FileSpreadsheet,
  UploadCloud,
  Database,
  LayoutGrid,
  Radio,
  Sparkles,
  Monitor,
  Cpu,
  Wifi,
  Bell,
  Loader2,
  DollarSign,
  InfoIcon,
  Gauge,
  Calendar,
  PlusIcon,
  TrashIcon,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import dynamic from "next/dynamic"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { ErrorBoundary } from "react-error-boundary"
import { SegmentationErrorFallback } from "@/components/dashboard/segmentation-error-boundary"
import SegmentMetricCard from "@/components/dashboard/segment-metric-card"

// Import our user segmentation component with no SSR
const UserSegmentationAnalysis = dynamic(() => 
  import("@/components/dashboard/user-segmentation-analysis").then(mod => mod.UserSegmentationAnalysis), 
  { ssr: false }
)

// Import the rules engine with no SSR
const SegmentationRulesEngine = dynamic(() => 
  import("@/components/dashboard/segmentation-rules-engine").then(mod => mod.SegmentationRulesEngine), 
  { ssr: false }
)

// Import for segment metrics dashboard
const SegmentMetricsDashboard = dynamic(() => 
  import("@/components/dashboard/segment-metrics-dashboard").then(mod => mod.default), 
  { ssr: false }
)

// Import for segmentation pie chart
const DynamicSegmentationPieChart = dynamic(() => 
  import("@/components/dashboard/segmentation-pie-chart").then(mod => mod.default), 
  { 
    ssr: false,
    loading: () => <LoadingIndicator message="Loading chart visualization..." />
  }
)

// Define all interfaces at the top
interface InsightData {
  id: string;
  title: string;
  description: string;
  action: string;
  trend: number;
  impact: 'critical' | 'high' | 'medium' | 'low';
  icon: React.ReactNode;
}

interface UserProfile {
  userId: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  joinDate: string;
  accountType: string;
  preferences: string[];
}

interface ActivityLog {
  userId: string;
  sessionId: string;
  timestamp: string;
  action: string;
  duration: number;
  device: string;
  platform: string;
  feature: string;
  path: string;
}

interface TransactionRecord {
  userId: string;
  transactionId: string;
  timestamp: string;
  amount: number;
  currency: string;
  productId: string;
  category: string;
  paymentMethod: string;
  status: string;
}

interface SegmentationDataset {
  userProfiles: UserProfile[];
  activityLogs: ActivityLog[];
  transactions: TransactionRecord[];
}

interface ImportedFile {
  type: 'userProfiles' | 'activityLogs' | 'transactions';
  data: UserProfile[] | ActivityLog[] | TransactionRecord[];
}

interface Segment {
  id: string;
  name: string;
  size: number;
  totalValue: number;
  conversionRate: number;
  engagementScore: number;
  retentionRate: number;
  avgSessionTime: number;
  avgOrderValue: number;
  purchaseFrequency: number;
  growthRate: number;
  churnRisk: number;
}

interface SegmentationResults {
  segments: Segment[];
  insights: InsightData[];
  analysisDate: Date;
}

// Define mock data outside the component
const defaultSegments: Segment[] = [
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
  },
];

// Enhanced mock data for the page
const insightsSummary: InsightData[] = [
  {
    id: "high-value-insight",
    title: "High-Value Customers",
    description: "15% of users generate 42% of revenue",
    action: "Target for premium features & loyalty rewards",
    trend: +4.8,
    impact: "high",
    icon: <Target className="h-6 w-6" />,
  },
  {
    id: "at-risk-insight",
    title: "At-Risk Users",
    description: "5% of users show high churn risk (89%)",
    action: "Implement retention campaign immediately",
    trend: +1.2,
    impact: "critical",
    icon: <AlertTriangle className="h-6 w-6" />,
  },
  {
    id: "engagement-insight",
    title: "Engagement Patterns",
    description: "Session time correlates with retention",
    action: "Improve first 3 minutes of user experience",
    trend: -0.5,
    impact: "medium",
    icon: <Activity className="h-6 w-6" />,
  },
  {
    id: "conversion-insight",
    title: "Conversion Optimization",
    description: "21% conversion gap between segments",
    action: "Personalize pathways by segment",
    trend: +2.3,
    impact: "high",
    icon: <Zap className="h-6 w-6" />,
  },
];

// Helper function to get segment color based on ID
const getSegmentColor = (segmentId: string): string => {
  const colorMap: Record<string, string> = {
    "high-value": "#22c55e", // green
    "regular": "#3b82f6", // blue
    "occasional": "#a855f7", // purple
    "new-users": "#eab308", // yellow
    "at-risk": "#ef4444", // red
  }
  return colorMap[segmentId] || "#cbd5e1" // default gray
};

// Helper component for segment metrics
function MetricCard({ 
  title, 
  value, 
  trend, 
  icon, 
  colorful = false,
  badgeTrendReversed = false,
  gridSpan = "col-span-1"
}: { 
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  colorful?: boolean;
  badgeTrendReversed?: boolean;
  gridSpan?: string;
}) {
  const isPositive = badgeTrendReversed ? trend < 0 : trend > 0;
  
  return (
    <div className={`p-4 rounded-lg ${colorful ? 'bg-white/10' : 'bg-muted/30'} ${gridSpan}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-sm font-medium ${colorful ? 'text-white/80' : 'text-muted-foreground'}`}>{title}</h3>
        <div className={`p-1.5 rounded-full ${colorful ? 'bg-white/20' : 'bg-background'}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between mt-2">
        <div className={`text-xl font-semibold ${colorful ? 'text-white' : ''}`}>{value}</div>
        {trend !== 0 && (
          <Badge className={`text-xs ${
            isPositive 
              ? (colorful ? 'bg-emerald-500/30 text-emerald-200' : 'bg-emerald-500/10 text-emerald-500') 
              : (colorful ? 'bg-red-500/30 text-red-200' : 'bg-red-500/10 text-red-500')
          } px-2 py-1`}>
            {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {Math.abs(trend)}%
          </Badge>
        )}
      </div>
    </div>
  );
}

// Add demo data generation helper functions
function generateDemoUserProfiles(count: number): UserProfile[] {
  const genders = ["male", "female", "non-binary", "prefer-not-to-say"];
  const locations = ["US", "UK", "Canada", "Australia", "Germany", "France", "Japan", "Brazil", "India", "China"];
  const accountTypes = ["free", "basic", "premium", "enterprise"];
  const preferenceOptions = ["dark-mode", "notifications", "newsletter", "promotional-emails", "two-factor-auth", "api-access", "data-export", "advanced-analytics"];
  
  return Array.from({ length: count }, (_, i) => ({
    userId: `user-${i + 1}`,
    name: `User ${i + 1}`,
    age: Math.floor(Math.random() * 50) + 18, // 18-68
    gender: genders[Math.floor(Math.random() * genders.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    joinDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 2 * 24 * 60 * 60 * 1000)).toISOString(), // Up to 2 years ago
    accountType: accountTypes[Math.floor(Math.random() * accountTypes.length)],
    preferences: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => 
      preferenceOptions[Math.floor(Math.random() * preferenceOptions.length)]
    ),
  }));
}

function generateDemoActivityLogs(count: number): ActivityLog[] {
  const actions = ["login", "logout", "view-dashboard", "view-profile", "update-settings", "create-project", "view-analytics", "export-data", "generate-report"];
  const devices = ["desktop", "mobile", "tablet", "smart-tv"];
  const platforms = ["web", "ios", "android", "windows", "macos", "linux"];
  const features = ["dashboard", "analytics", "profile", "settings", "projects", "models", "reports", "api"];
  const paths = ["/dashboard", "/analytics", "/profile", "/settings", "/projects", "/models", "/reports", "/api"];
  
  return Array.from({ length: count }, (_, i) => ({
    userId: `user-${Math.floor(Math.random() * 100) + 1}`, // Match with generated user profiles
    sessionId: `session-${i + 1}-${Date.now()}`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(), // Up to 30 days ago
    action: actions[Math.floor(Math.random() * actions.length)],
    duration: Math.floor(Math.random() * 300) + 10, // 10-310 seconds
    device: devices[Math.floor(Math.random() * devices.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    feature: features[Math.floor(Math.random() * features.length)],
    path: paths[Math.floor(Math.random() * paths.length)],
  }));
}

function generateDemoTransactions(count: number): TransactionRecord[] {
  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];
  const productIds = ["basic-plan", "premium-plan", "enterprise-plan", "addon-analytics", "addon-storage", "addon-support"];
  const categories = ["subscription", "one-time", "addon", "service"];
  const paymentMethods = ["credit-card", "paypal", "bank-transfer", "apple-pay", "google-pay"];
  const statuses = ["completed", "pending", "failed", "refunded"];
  
  return Array.from({ length: count }, (_, i) => ({
    userId: `user-${Math.floor(Math.random() * 100) + 1}`, // Match with generated user profiles
    transactionId: `txn-${Date.now()}-${i + 1}`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(), // Up to 90 days ago
    amount: Math.floor(Math.random() * 490) + 10, // $10-$500
    currency: currencies[Math.floor(Math.random() * currencies.length)],
    productId: productIds[Math.floor(Math.random() * productIds.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
}

// Helper for animation props
const getAnimationProps = (enabled: boolean, props: any) => {
  return enabled ? props : {};
};

// Add a proper ErrorBoundary component
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
  <Card className="bg-red-50 border-red-200">
    <CardHeader>
      <CardTitle className="text-red-600 flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        Something went wrong
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-red-600 mb-4">{error.message}</p>
      <Button variant="outline" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </CardContent>
  </Card>
);

// Add a proper loading component
const LoadingIndicator = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center p-8 space-y-4">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

// Add theme system constants for more consistent styling
const themeColors = {
  primary: "hsl(222.2 47.4% 11.2%)",
  primaryForeground: "hsl(210 40% 98%)",
  secondary: "hsl(210 40% 96.1%)",
  secondaryForeground: "hsl(222.2 47.4% 11.2%)",
  muted: "hsl(210 40% 96.1%)",
  mutedForeground: "hsl(215.4 16.3% 46.9%)",
  accent: "hsl(210 40% 96.1%)",
  accentForeground: "hsl(222.2 47.4% 11.2%)",
  success: "hsl(142.1 76.2% 36.3%)",
  warning: "hsl(48 96% 53%)",
  danger: "hsl(0 84.2% 60.2%)",
  info: "hsl(221.2 83.2% 53.3%)",
};

// Add responsive design helpers
const screenSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Add data validation utilities
const validateSegmentData = (segments: Segment[]): boolean => {
  if (!Array.isArray(segments) || segments.length === 0) {
    return false;
  }
  
  // Check that all required fields exist and have correct types
  for (const segment of segments) {
    if (
      typeof segment.id !== 'string' ||
      typeof segment.name !== 'string' ||
      typeof segment.size !== 'number' ||
      typeof segment.totalValue !== 'number' ||
      typeof segment.conversionRate !== 'number' ||
      typeof segment.engagementScore !== 'number' ||
      typeof segment.retentionRate !== 'number'
    ) {
      return false;
    }
  }
  
  // Ensure segment sizes add up to 100%
  const totalSize = segments.reduce((sum, segment) => sum + segment.size, 0);
  return Math.abs(totalSize - 100) < 0.01; // Allow small floating point differences
};

// Add function to check if data is stale
const isDataStale = (lastUpdated: Date): boolean => {
  const now = new Date();
  const differenceInMinutes = (now.getTime() - lastUpdated.getTime()) / (1000 * 60);
  return differenceInMinutes > 30; // Consider data stale after 30 minutes
};

// Create a memoized function for optimized segment rendering
const SegmentItem = React.memo(({ 
  segment, 
  isSelected, 
  onSelect 
}: { 
  segment: Segment; 
  isSelected: boolean; 
  onSelect: () => void 
}) => {
  return (
    <div 
      className={`flex items-center p-2 rounded-md transition-colors cursor-pointer ${
        isSelected ? 'bg-muted/60' : 'hover:bg-muted/40'
      }`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select segment: ${segment.name}`}
    >
      <div 
        className="w-3 h-3 rounded-full mr-2" 
        style={{ backgroundColor: getSegmentColor(segment.id) }}
        aria-hidden="true"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="text-sm font-medium">{segment.name}</span>
          <span className="text-sm text-muted-foreground">{segment.size}%</span>
        </div>
        <Progress 
          value={segment.size} 
          className="h-1.5 mt-1" 
          style={{ '--tw-progress-fill': getSegmentColor(segment.id) } as React.CSSProperties}
          aria-label={`${segment.name} segment size: ${segment.size}%`}
        />
      </div>
    </div>
  );
});
SegmentItem.displayName = 'SegmentItem';

// Add window resize listener for responsive adjustments
export default function UserSegmentationPage() {
  // State for import dialog and data
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [importType, setImportType] = useState<'json' | 'csv'>('json')
  const [importDataType, setImportDataType] = useState<'userProfiles' | 'activityLogs' | 'transactions'>('userProfiles')
  const [importedData, setImportedData] = useState<any>(null)
  const [importErrors, setImportErrors] = useState<string[]>([])
  const [importSuccess, setImportSuccess] = useState(false)
  const [importPreview, setImportPreview] = useState<any>(null)
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [transactions, setTransactions] = useState<TransactionRecord[]>([])
  const [demoDataLoaded, setDemoDataLoaded] = useState(false)
  const [importedFiles, setImportedFiles] = useState<ImportedFile[]>([])
  const [showGuideDialog, setShowGuideDialog] = useState(false)
  
  // State for analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [segments, setSegments] = useState<Segment[]>([])
  const [insights, setInsights] = useState<InsightData[]>([])
  const [lastAnalysisDate, setLastAnalysisDate] = useState<Date | null>(null)
  const [activeTab, setActiveTab] = useState("data")
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)
  
  // Add missing state variables
  const [segmentationData, setSegmentationData] = useState<SegmentationDataset>({
    userProfiles: [],
    activityLogs: [],
    transactions: []
  })
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [timeRange, setTimeRange] = useState('30d')
  const [lastUpdated, setLastUpdated] = useState(new Date())
  
  // Segmentation results state
  const segmentationResults = useMemo<SegmentationResults>(() => ({
    segments: segments,
    insights: insights,
    analysisDate: lastAnalysisDate || new Date()
  }), [segments, insights, lastAnalysisDate]);
  
  // UI Customization states
  const [showColorfulUI, setShowColorfulUI] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [visualDensity, setVisualDensity] = useState(70)
  const [darkMode, setDarkMode] = useState(false)
  
  // File input ref for file upload
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Toast for notifications
  const { toast } = useToast()

  // State for segment metrics
  const [selectedMetricsSegment, setSelectedMetricsSegment] = useState<string | null>(null)
  const [chartType, setChartType] = useState<'donut' | 'pie' | 'radial' | '3d'>('donut')
  const [segmentationMethod, setSegmentationMethod] = useState("kmeans")
  
  // Current segments for rendering
  const currentSegments = useMemo(() => segments, [segments])
  
  // Current insights for rendering
  const currentInsights = useMemo(() => insights, [insights])
  
  // Define common styling classes
  const baseCardClass = "border-white/5 backdrop-blur-sm"
  const dropdownClass = "bg-background/80 backdrop-blur-sm border-white/5"
  const chartHeight = 300
  
  // Gradient styles for cards
  const gradients = {
    purple: "bg-gradient-to-br from-purple-500/10 to-blue-500/10",
    blue: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    red: "bg-gradient-to-br from-red-500/10 to-rose-500/10",
    amber: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
    green: "bg-gradient-to-r from-green-500/10 to-emerald-500/10"
  }
  
  // Data stats for display
  const dataStats = useMemo(() => {
    return {
      totalDataPoints: userProfiles.length + activityLogs.length + transactions.length,
      profilesCount: userProfiles.length,
      activitiesCount: activityLogs.length,
      transactionsCount: transactions.length
    }
  }, [userProfiles, activityLogs, transactions])
  
  // Export to CSV function
  const exportSegmentsToCSV = useCallback(() => {
    if (segments.length === 0) {
      toast({
        title: "No data to export",
        description: "Please analyze your data first to generate segments.",
        variant: "destructive"
      });
      return;
    }
    
    // Create CSV header
    const headers = [
      "Segment ID", 
      "Segment Name", 
      "Size (%)", 
      "Total Value ($)", 
      "Conversion Rate (%)",
      "Engagement Score",
      "Retention Rate (%)",
      "Avg Session Time (min)",
      "Avg Order Value ($)",
      "Purchase Frequency",
      "Growth Rate (%)",
      "Churn Risk (%)"
    ];
    
    // Create CSV rows
    const rows = segments.map(segment => [
      segment.id,
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
    ]);
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.setAttribute('download', `segment-data-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export completed",
      description: "Your segmentation data has been exported as CSV.",
      variant: "default"
    });
  }, [segments, toast]);
  
  // Handle refresh data
  const handleRefresh = useCallback(() => {
    setIsLoading(true)

    // Simulate data refresh
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsLoading(false)
      
      toast({
        title: "Data refreshed",
        description: "Your segmentation data has been refreshed",
      })
    }, 800)
  }, [toast])
  
  // Generate segments from data
  const generateSegments = useCallback(() => {
    setIsAnalyzing(true)
    
    // Simulate analysis time
    setTimeout(() => {
      // Generate segments based on actual data if available
      let newSegments: Segment[] = [];
      
      if (segmentationData.userProfiles.length > 0) {
        try {
          // Use real data profiles to create segments
          // Calculate key metrics for segmentation
          const avgOrderValueMap: Record<string, number> = {}
          const purchaseFreqMap: Record<string, number> = {}
          const sessionTimeMap: Record<string, number> = {}
          
          // Process transaction data to get user metrics
          if (segmentationData.transactions.length > 0) {
            // Group transactions by user
            const userTransactions: Record<string, TransactionRecord[]> = {}
            
            segmentationData.transactions.forEach(txn => {
              if (!userTransactions[txn.userId]) {
                userTransactions[txn.userId] = []
              }
              userTransactions[txn.userId].push(txn)
            })
            
            // Calculate average order value and purchase frequency per user
            Object.entries(userTransactions).forEach(([userId, transactions]) => {
              // Filter to only completed transactions
              const completedTransactions = transactions.filter(t => t.status === 'completed')
              
              if (completedTransactions.length > 0) {
                // Calculate average order value
                const totalAmount = completedTransactions.reduce((sum, t) => sum + t.amount, 0)
                avgOrderValueMap[userId] = totalAmount / completedTransactions.length
                
                // Calculate purchase frequency (times per month)
                // Sort transactions by date
                const sortedTransactions = [...completedTransactions].sort((a, b) => 
                  new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                )
                
                if (sortedTransactions.length > 1) {
                  const firstDate = new Date(sortedTransactions[0].timestamp)
                  const lastDate = new Date(sortedTransactions[sortedTransactions.length - 1].timestamp)
                  const daysInBetween = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
                  
                  // Calculate frequency per month (30 days)
                  if (daysInBetween > 0) {
                    purchaseFreqMap[userId] = (sortedTransactions.length / daysInBetween) * 30
                  }
                }
              }
            })
          }
          
          // Process activity logs to get session times
          if (segmentationData.activityLogs.length > 0) {
            const userSessions: Record<string, number[]> = {}
            
            segmentationData.activityLogs.forEach(log => {
              if (!userSessions[log.userId]) {
                userSessions[log.userId] = []
              }
              userSessions[log.userId].push(log.duration)
            })
            
            // Calculate average session time per user
            Object.entries(userSessions).forEach(([userId, durations]) => {
              if (durations.length > 0) {
                sessionTimeMap[userId] = durations.reduce((sum, d) => sum + d, 0) / durations.length / 60 // Convert to minutes
              }
            })
          }
          
          // Now segment users based on the calculated metrics
          const userSegments: Record<string, UserProfile[]> = {
            "high-value": [],
            "regular": [],
            "occasional": [],
            "new-users": [],
            "at-risk": []
          }
          
          // Define segmentation thresholds
          const highValueAovThreshold = 200 // Average order value > $200 for high value
          const regularAovThreshold = 100 // Average order value > $100 for regular
          const highFreqThreshold = 2 // More than 2 purchases per month for high frequency
          const regularFreqThreshold = 1 // At least 1 purchase per month for regular
          const longSessionThreshold = 10 // More than 10 minutes avg session for engaged users
          const regularSessionThreshold = 5 // At least 5 minutes avg session for regular users
          const newUserThresholdDays = 30 // Joined in the last 30 days = new user
          
          // Segment each user
          segmentationData.userProfiles.forEach(user => {
            const userId = user.userId
            const avgOrderValue = avgOrderValueMap[userId] || 0
            const purchaseFreq = purchaseFreqMap[userId] || 0
            const sessionTime = sessionTimeMap[userId] || 0
            const joinDate = new Date(user.joinDate)
            const daysSinceJoin = (new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
            
            // Assign user to segment based on combined factors
            if (daysSinceJoin <= newUserThresholdDays) {
              // New users - joined recently
              userSegments["new-users"].push(user)
            } else if (avgOrderValue >= highValueAovThreshold && purchaseFreq >= highFreqThreshold) {
              // High-value customers - high AOV and purchase frequency
              userSegments["high-value"].push(user)
            } else if (avgOrderValue >= regularAovThreshold && purchaseFreq >= regularFreqThreshold) {
              // Regular customers - decent AOV and purchase frequency
              userSegments["regular"].push(user)
            } else if (
              sessionTime < regularSessionThreshold && 
              purchaseFreq < regularFreqThreshold && 
              daysSinceJoin > 90
            ) {
              // At-risk users - low engagement, low purchase frequency, not new
              userSegments["at-risk"].push(user)
            } else {
              // Occasional buyers - everyone else
              userSegments["occasional"].push(user)
            }
          })
          
          // Calculate percentages for each segment
          const totalUsers = segmentationData.userProfiles.length
          
          // Create segment objects with calculated metrics
          newSegments = [
            {
              id: "high-value",
              name: "High-Value Customers",
              size: Math.round((userSegments["high-value"].length / totalUsers) * 100),
              totalValue: Math.round(userSegments["high-value"].reduce((sum, user) => {
                return sum + (avgOrderValueMap[user.userId] || 0) * (purchaseFreqMap[user.userId] || 0) * 3 // 3 months value
              }, 0)),
              conversionRate: 8.5,
              engagementScore: 9.2,
              retentionRate: 92,
              avgSessionTime: userSegments["high-value"].reduce((sum, user) => sum + (sessionTimeMap[user.userId] || 0), 0) / 
                              (userSegments["high-value"].length || 1),
              avgOrderValue: userSegments["high-value"].reduce((sum, user) => sum + (avgOrderValueMap[user.userId] || 0), 0) / 
                             (userSegments["high-value"].length || 1),
              purchaseFrequency: userSegments["high-value"].reduce((sum, user) => sum + (purchaseFreqMap[user.userId] || 0), 0) / 
                                 (userSegments["high-value"].length || 1),
              growthRate: 4.8,
              churnRisk: 12,
            },
            {
              id: "regular",
              name: "Regular Customers",
              size: Math.round((userSegments["regular"].length / totalUsers) * 100),
              totalValue: Math.round(userSegments["regular"].reduce((sum, user) => {
                return sum + (avgOrderValueMap[user.userId] || 0) * (purchaseFreqMap[user.userId] || 0) * 3 // 3 months value
              }, 0)),
              conversionRate: 5.2,
              engagementScore: 7.5,
              retentionRate: 78,
              avgSessionTime: userSegments["regular"].reduce((sum, user) => sum + (sessionTimeMap[user.userId] || 0), 0) / 
                              (userSegments["regular"].length || 1),
              avgOrderValue: userSegments["regular"].reduce((sum, user) => sum + (avgOrderValueMap[user.userId] || 0), 0) / 
                             (userSegments["regular"].length || 1),
              purchaseFrequency: userSegments["regular"].reduce((sum, user) => sum + (purchaseFreqMap[user.userId] || 0), 0) / 
                                 (userSegments["regular"].length || 1),
              growthRate: 2.2,
              churnRisk: 28,
            },
            {
              id: "occasional",
              name: "Occasional Buyers",
              size: Math.round((userSegments["occasional"].length / totalUsers) * 100),
              totalValue: Math.round(userSegments["occasional"].reduce((sum, user) => {
                return sum + (avgOrderValueMap[user.userId] || 0) * (purchaseFreqMap[user.userId] || 0) * 3 // 3 months value
              }, 0)),
              conversionRate: 3.1,
              engagementScore: 5.4,
              retentionRate: 45,
              avgSessionTime: userSegments["occasional"].reduce((sum, user) => sum + (sessionTimeMap[user.userId] || 0), 0) / 
                              (userSegments["occasional"].length || 1),
              avgOrderValue: userSegments["occasional"].reduce((sum, user) => sum + (avgOrderValueMap[user.userId] || 0), 0) / 
                             (userSegments["occasional"].length || 1),
              purchaseFrequency: userSegments["occasional"].reduce((sum, user) => sum + (purchaseFreqMap[user.userId] || 0), 0) / 
                                 (userSegments["occasional"].length || 1),
              growthRate: 1.5,
              churnRisk: 42,
            },
            {
              id: "new-users",
              name: "New Users",
              size: Math.round((userSegments["new-users"].length / totalUsers) * 100),
              totalValue: Math.round(userSegments["new-users"].reduce((sum, user) => {
                return sum + (avgOrderValueMap[user.userId] || 0) * (purchaseFreqMap[user.userId] || 0) * 3 // 3 months value
              }, 0)),
              conversionRate: 2.8,
              engagementScore: 4.7,
              retentionRate: 35,
              avgSessionTime: userSegments["new-users"].reduce((sum, user) => sum + (sessionTimeMap[user.userId] || 0), 0) / 
                              (userSegments["new-users"].length || 1) || 3.5,
              avgOrderValue: userSegments["new-users"].reduce((sum, user) => sum + (avgOrderValueMap[user.userId] || 0), 0) / 
                             (userSegments["new-users"].length || 1) || 65,
              purchaseFrequency: userSegments["new-users"].reduce((sum, user) => sum + (purchaseFreqMap[user.userId] || 0), 0) / 
                                 (userSegments["new-users"].length || 1) || 0.5,
              growthRate: 8.5,
              churnRisk: 58,
            },
            {
              id: "at-risk",
              name: "At-Risk Users",
              size: Math.round((userSegments["at-risk"].length / totalUsers) * 100),
              totalValue: Math.round(userSegments["at-risk"].reduce((sum, user) => {
                return sum + (avgOrderValueMap[user.userId] || 0) * (purchaseFreqMap[user.userId] || 0) * 3 // 3 months value
              }, 0)),
              conversionRate: 0.9,
              engagementScore: 2.1,
              retentionRate: 15,
              avgSessionTime: userSegments["at-risk"].reduce((sum, user) => sum + (sessionTimeMap[user.userId] || 0), 0) / 
                              (userSegments["at-risk"].length || 1) || 1.2,
              avgOrderValue: userSegments["at-risk"].reduce((sum, user) => sum + (avgOrderValueMap[user.userId] || 0), 0) / 
                             (userSegments["at-risk"].length || 1) || 45,
              purchaseFrequency: userSegments["at-risk"].reduce((sum, user) => sum + (purchaseFreqMap[user.userId] || 0), 0) / 
                                 (userSegments["at-risk"].length || 1) || 0.2,
              growthRate: -5.2,
              churnRisk: 89,
            },
          ]
        } catch (error) {
          console.error("Error during segmentation:", error)
          // Fallback to simple age-based segmentation if the advanced algorithm fails
          
          const ageGroups = {
            young: segmentationData.userProfiles.filter(u => u.age < 30).length,
            middle: segmentationData.userProfiles.filter(u => u.age >= 30 && u.age < 50).length,
            senior: segmentationData.userProfiles.filter(u => u.age >= 50).length
          }
          
          // Calculate percentages
          const youngPct = Math.round((ageGroups.young / segmentationData.userProfiles.length) * 100)
          const middlePct = Math.round((ageGroups.middle / segmentationData.userProfiles.length) * 100)
          const seniorPct = Math.round((ageGroups.senior / segmentationData.userProfiles.length) * 100)
          
          // Create segments from basic demographic data
          newSegments = [
            {
              id: "high-value",
              name: "High-Value Customers",
              size: Math.max(10, Math.min(25, youngPct)),
              totalValue: 42500,
              conversionRate: 8.5,
              engagementScore: 9.2,
              retentionRate: 92,
              avgSessionTime: 12.5,
              avgOrderValue: 250,
              purchaseFrequency: 3.2,
              growthRate: 4.8,
              churnRisk: 12,
            },
            {
              id: "regular",
              name: "Regular Customers",
              size: Math.max(20, Math.min(45, middlePct)),
              totalValue: 31000,
              conversionRate: 5.2,
              engagementScore: 7.5,
              retentionRate: 78,
              avgSessionTime: 8.2,
              avgOrderValue: 120,
              purchaseFrequency: 1.8,
              growthRate: 2.2,
              churnRisk: 28,
            },
            {
              id: "occasional",
              name: "Occasional Buyers",
              size: Math.max(15, Math.min(35, seniorPct)),
              totalValue: 15000,
              conversionRate: 3.1,
              engagementScore: 5.4,
              retentionRate: 45,
              avgSessionTime: 4.8,
              avgOrderValue: 85,
              purchaseFrequency: 0.8,
              growthRate: 1.5,
              churnRisk: 42,
            },
            {
              id: "new-users",
              name: "New Users",
              size: 15,
              totalValue: 8500,
              conversionRate: 2.8,
              engagementScore: 4.7,
              retentionRate: 35,
              avgSessionTime: 3.5,
              avgOrderValue: 65,
              purchaseFrequency: 0.5,
              growthRate: 8.5,
              churnRisk: 58,
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
            },
          ]
        }
        
        // Normalize segment sizes to ensure they add up to 100%
        const totalSize = newSegments.reduce((sum, segment) => sum + segment.size, 0)
        if (totalSize !== 100) {
          const factor = 100 / totalSize
          newSegments = newSegments.map(segment => ({
            ...segment,
            size: Math.round(segment.size * factor)
          }))
          
          // Double-check and fix any rounding errors
          const adjustedTotal = newSegments.reduce((sum, segment) => sum + segment.size, 0)
          if (adjustedTotal !== 100) {
            const diff = 100 - adjustedTotal
            newSegments[0].size += diff // Add or subtract from the first segment
          }
        }
      } else {
        // Use default segments if no real data
        newSegments = defaultSegments.map(s => ({...s}))
      }
      
      setSegments(newSegments)
      
      // Generate insights based on segments
      const newInsights: InsightData[] = [
        {
          id: "insight-1",
          title: "High-Value Customer Growth",
          description: "The high-value customer segment has grown by 15% in the last 30 days, contributing to a 22% increase in overall revenue.",
          action: "Expand premium offerings for this segment",
          trend: 15,
          impact: "high" as const,
          icon: <TrendingUp className="h-5 w-5"/>
        },
        {
          id: "insight-2",
          title: "Churn Risk Identified",
          description: "25% of occasional buyers show decreased engagement, indicating potential churn in the next billing cycle.",
          action: "Implement targeted re-engagement campaign",
          trend: -25,
          impact: "critical",
          icon: <AlertCircle className="h-5 w-5"/>
        },
        {
          id: "insight-3",
          title: "Cross-Sell Opportunity",
          description: "Regular customers show high affinity for related product categories they haven't yet purchased.",
          action: "Create product bundle recommendations",
          trend: 68,
          impact: "medium",
          icon: <Sparkles className="h-5 w-5"/>
        },
        {
          id: "insight-4",
          title: "Seasonal Buying Pattern",
          description: "New users exhibit strong seasonal purchasing patterns that could be leveraged for promotions.",
          action: "Adjust marketing calendar for seasonal campaigns",
          trend: 32,
          impact: "medium",
          icon: <Calendar className="h-5 w-5"/>
        }
      ];
      
      // Set the analysis state
      setInsights(newInsights);
      setLastAnalysisDate(new Date());
      setAnalysisComplete(true);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "User segments have been generated based on your data.",
        variant: "default"
      });
    }, 1500);
  }, [segmentationData.userProfiles, toast]);
  
  /**
   * Parse CSV data into JSON objects with enhanced validation
   * @param csvText The raw CSV text
   * @param dataType The type of data being imported
   */
  const parseCSV = useCallback((csvText: string, dataType: 'userProfiles' | 'activityLogs' | 'transactions'): any[] => {
    setImportErrors([])
    const errors: string[] = []
    const results: any[] = []
    
    try {
      // Split by lines and get headers
      const lines = csvText.split(/\r?\n/)
      if (lines.length < 2) {
        throw new Error("CSV file must contain headers and at least one data row")
      }
      
      // Extract headers (first line)
      const headers = lines[0].split(',').map(header => header.trim())
      
      // Define required fields based on data type
      const requiredFields: Record<string, string[]> = {
        userProfiles: ['userId', 'name', 'age', 'gender', 'location', 'joinDate'],
        activityLogs: ['userId', 'sessionId', 'timestamp', 'action', 'duration'],
        transactions: ['userId', 'transactionId', 'timestamp', 'amount']
      }
      
      // Recommended fields (warn but don't reject)
      const recommendedFields: Record<string, string[]> = {
        userProfiles: ['accountType', 'preferences'],
        activityLogs: ['device', 'platform', 'feature', 'path'],
        transactions: ['currency', 'productId', 'category', 'paymentMethod', 'status']
      }
      
      // Validate headers contain required fields
      const missingFields = requiredFields[dataType].filter(field => !headers.includes(field))
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
      }
      
      // Check for recommended fields
      const missingRecommended = recommendedFields[dataType].filter(field => !headers.includes(field))
      if (missingRecommended.length > 0) {
        errors.push(`Warning: Missing recommended fields: ${missingRecommended.join(', ')}`)
      }
      
      // Parse each line
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue // Skip empty lines
        
        // Handle quoted values with commas inside
        const values: string[] = []
        let inQuotes = false
        let currentValue = ''
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j]
          
          if (char === '"') {
            inQuotes = !inQuotes
          } else if (char === ',' && !inQuotes) {
            values.push(currentValue)
            currentValue = ''
          } else {
            currentValue += char
          }
        }
        
        // Push the last value
        values.push(currentValue)
        
        // Create object from headers and values
        if (values.length !== headers.length) {
          errors.push(`Line ${i+1}: Column count mismatch (expected ${headers.length}, got ${values.length})`)
          continue
        }
        
        const obj: Record<string, any> = {}
        const lineErrors: string[] = []
        
        headers.forEach((header, index) => {
          let value = values[index].trim().replace(/^"|"$/g, '') // Remove quotes
          
          // Type conversion and validation based on data type and field
          if (dataType === 'userProfiles') {
            if (header === 'age') {
              const age = parseInt(value)
              if (isNaN(age) || age < 0 || age > 120) {
                lineErrors.push(`Invalid age: ${value}. Must be a number between 0-120.`)
                obj[header] = 0
              } else {
                obj[header] = age
              }
            } else if (header === 'joinDate') {
              // Validate date format
              const date = new Date(value)
              if (isNaN(date.getTime())) {
                lineErrors.push(`Invalid date format: ${value}. Use YYYY-MM-DD or ISO format.`)
                obj[header] = new Date().toISOString() // Default to current date
              } else {
                obj[header] = date.toISOString()
              }
            } else if (header === 'preferences') {
              obj[header] = value.split(';').map(pref => pref.trim())
            } else {
              obj[header] = value
            }
          } else if (dataType === 'activityLogs') {
            if (header === 'duration') {
              const duration = parseFloat(value)
              if (isNaN(duration) || duration < 0) {
                lineErrors.push(`Invalid duration: ${value}. Must be a positive number.`)
                obj[header] = 0
              } else {
                obj[header] = duration
              }
            } else if (header === 'timestamp') {
              // Validate timestamp
              const date = new Date(value)
              if (isNaN(date.getTime())) {
                lineErrors.push(`Invalid timestamp: ${value}. Use YYYY-MM-DD or ISO format.`)
                obj[header] = new Date().toISOString() // Default to current date
              } else {
                obj[header] = date.toISOString()
              }
            } else {
              obj[header] = value
            }
          } else if (dataType === 'transactions') {
            if (header === 'amount') {
              const amount = parseFloat(value)
              if (isNaN(amount) || amount < 0) {
                lineErrors.push(`Invalid amount: ${value}. Must be a positive number.`)
                obj[header] = 0
              } else {
                obj[header] = amount
              }
            } else if (header === 'timestamp') {
              // Validate timestamp
              const date = new Date(value)
              if (isNaN(date.getTime())) {
                lineErrors.push(`Invalid timestamp: ${value}. Use YYYY-MM-DD or ISO format.`)
                obj[header] = new Date().toISOString() // Default to current date
              } else {
                obj[header] = date.toISOString()
              }
            } else if (header === 'status' && value) {
              // Normalize status values
              const normalizedStatus = value.toLowerCase().trim()
              if (['completed', 'pending', 'failed', 'refunded'].includes(normalizedStatus)) {
                obj[header] = normalizedStatus
              } else {
                obj[header] = 'completed' // Default to completed
                lineErrors.push(`Normalized status from "${value}" to "completed"`)
              }
            } else {
              obj[header] = value
            }
          } else {
            obj[header] = value
          }
        })
        
        // Validate required fields
        const invalidFields = requiredFields[dataType].filter(field => {
          if (field === 'age' || field === 'duration' || field === 'amount') {
            return isNaN(Number(obj[field]))
          }
          return !obj[field]
        })
        
        if (invalidFields.length > 0) {
          lineErrors.push(`Missing or invalid values for fields: ${invalidFields.join(', ')}`)
        }
        
        // Add warnings to the overall error list
        if (lineErrors.length > 0) {
          errors.push(`Line ${i+1}: ${lineErrors.join('; ')}`)
        }
        
        // Only add valid entries to results
        if (invalidFields.length === 0) {
          results.push(obj)
        }
      }
      
      // Set errors if any
      if (errors.length > 0) {
        setImportErrors(errors)
        if (results.length === 0) {
          throw new Error("No valid data rows found after validation")
        }
      }
      
      return results
    } catch (error) {
      console.error("CSV parsing error:", error)
      setImportErrors([error instanceof Error ? error.message : "Unknown parsing error"])
      return []
    }
  }, [])
  
  /**
   * Parse JSON data and validate its structure with enhanced error handling
   * @param jsonText The raw JSON text
   * @param dataType The type of data being imported
   */
  const parseJSON = useCallback((jsonText: string, dataType: 'userProfiles' | 'activityLogs' | 'transactions'): any[] => {
    setImportErrors([])
    const errors: string[] = []
    const warnings: string[] = []
    
    try {
      // Parse JSON
      let data = JSON.parse(jsonText)
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        // Try to find an array property that matches the dataType
        if (data[dataType] && Array.isArray(data[dataType])) {
          data = data[dataType]
        } else {
          // Look for any array property
          const arrayProps = Object.keys(data).filter(key => Array.isArray(data[key]))
          if (arrayProps.length === 1) {
            data = data[arrayProps[0]]
            warnings.push(`Found array at property "${arrayProps[0]}" instead of root level.`)
          } else if (arrayProps.length > 1) {
            throw new Error(`Multiple array properties found. Please specify which one contains the ${dataType} data.`)
          } else {
            throw new Error("No array found in JSON. Expected an array of objects.")
          }
        }
      }
      
      // Define required fields based on data type
      const requiredFields: Record<string, string[]> = {
        userProfiles: ['userId', 'name', 'age', 'gender', 'location', 'joinDate'],
        activityLogs: ['userId', 'sessionId', 'timestamp', 'action', 'duration'],
        transactions: ['userId', 'transactionId', 'timestamp', 'amount']
      }
      
      // Recommended fields
      const recommendedFields: Record<string, string[]> = {
        userProfiles: ['accountType', 'preferences'],
        activityLogs: ['device', 'platform', 'feature', 'path'],
        transactions: ['currency', 'productId', 'category', 'paymentMethod', 'status']
      }
      
      // Validate and transform each object in the array
      const validData = data.map((item: any, index: number) => {
        if (!item || typeof item !== 'object') {
          errors.push(`Item ${index+1}: Not a valid object`)
          return null
        }
        
        // Deep clone to avoid modifying the original
        const processedItem: Record<string, any> = {}
        const itemErrors: string[] = []
        const itemWarnings: string[] = []
        
        // Check for required fields and validate data types
        for (const field of requiredFields[dataType]) {
          if (item[field] === undefined) {
            itemErrors.push(`Missing required field: ${field}`)
          } else {
            // Validate and convert specific fields
            if (field === 'age' && dataType === 'userProfiles') {
              const age = Number(item[field])
              if (isNaN(age) || age < 0 || age > 120) {
                itemErrors.push(`Invalid age: ${item[field]}. Must be a number between 0-120.`)
                processedItem[field] = 0
              } else {
                processedItem[field] = age
              }
            } else if (field === 'duration' && dataType === 'activityLogs') {
              const duration = Number(item[field])
              if (isNaN(duration) || duration < 0) {
                itemErrors.push(`Invalid duration: ${item[field]}. Must be a positive number.`)
                processedItem[field] = 0
              } else {
                processedItem[field] = duration
              }
            } else if (field === 'amount' && dataType === 'transactions') {
              const amount = Number(item[field])
              if (isNaN(amount) || amount < 0) {
                itemErrors.push(`Invalid amount: ${item[field]}. Must be a positive number.`)
                processedItem[field] = 0
              } else {
                processedItem[field] = amount
              }
            } else if (field === 'timestamp' && (dataType === 'activityLogs' || dataType === 'transactions')) {
              // Validate timestamp
              const date = new Date(item[field])
              if (isNaN(date.getTime())) {
                itemErrors.push(`Invalid timestamp: ${item[field]}. Use YYYY-MM-DD or ISO format.`)
                processedItem[field] = new Date().toISOString() // Default to current date
              } else {
                processedItem[field] = date.toISOString()
              }
            } else if (field === 'joinDate' && dataType === 'userProfiles') {
              // Validate date format
              const date = new Date(item[field])
              if (isNaN(date.getTime())) {
                itemErrors.push(`Invalid date format: ${item[field]}. Use YYYY-MM-DD or ISO format.`)
                processedItem[field] = new Date().toISOString() // Default to current date
              } else {
                processedItem[field] = date.toISOString()
              }
            } else {
              // Copy other fields directly
              processedItem[field] = item[field]
            }
          }
        }
        
        // Check for recommended fields
        const missingRecommended = recommendedFields[dataType].filter(field => item[field] === undefined)
        if (missingRecommended.length > 0) {
          itemWarnings.push(`Missing recommended fields: ${missingRecommended.join(', ')}`)
        }
        
        // Copy over all other fields
        for (const key in item) {
          if (!processedItem.hasOwnProperty(key)) {
            processedItem[key] = item[key]
          }
        }
        
        // Add specific logic for certain data types
        if (dataType === 'userProfiles' && Array.isArray(item.preferences)) {
          // Ensure preferences is an array of strings
          processedItem.preferences = item.preferences.map((p: any) => String(p))
        } else if (dataType === 'userProfiles' && typeof item.preferences === 'string') {
          // Convert string preferences to array
          processedItem.preferences = item.preferences.split(/[;,]/).map((p: string) => p.trim())
          itemWarnings.push("Converted string preferences to array")
        }
        
        if (dataType === 'transactions' && item.status) {
          // Normalize status values
          const normalizedStatus = String(item.status).toLowerCase().trim()
          if (['completed', 'pending', 'failed', 'refunded'].includes(normalizedStatus)) {
            processedItem.status = normalizedStatus
          } else {
            processedItem.status = 'completed' // Default to completed
            itemWarnings.push(`Normalized status from "${item.status}" to "completed"`)
          }
        }
        
        // Add errors and warnings for this item
        if (itemErrors.length > 0) {
          errors.push(`Item ${index+1}: ${itemErrors.join('; ')}`)
          return null // Skip invalid items
        }
        
        if (itemWarnings.length > 0) {
          warnings.push(`Item ${index+1}: ${itemWarnings.join('; ')}`)
        }
        
        return processedItem
      }).filter(Boolean) // Remove null entries (invalid items)
      
      // Add warnings to errors array but with different prefix
      if (warnings.length > 0) {
        errors.push(...warnings.map(w => `Warning: ${w}`))
      }
      
      // Set errors if any
      if (errors.length > 0) {
        setImportErrors(errors)
        if (validData.length === 0) {
          throw new Error("No valid data items found after validation")
        }
      }
      
      return validData
    } catch (error) {
      console.error("JSON parsing error:", error)
      setImportErrors([error instanceof Error ? error.message : "Unknown parsing error"])
      return []
    }
  }, [])
  
  /**
   * Handle file upload from input element
   */
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setImportErrors([])
    setImportSuccess(false)
    setImportPreview(null)
    
    const file = e.target.files?.[0]
    if (!file) return
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImportErrors(["File size exceeds the maximum limit of 5MB"])
      return
    }
    
    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    if (importType === 'csv' && fileExtension !== 'csv') {
      setImportErrors(["Please select a CSV file with .csv extension"])
      return
    }
    
    if (importType === 'json' && fileExtension !== 'json') {
      setImportErrors(["Please select a JSON file with .json extension"])
      return
    }
    
    // Read file
    const reader = new FileReader()
    
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (!content) {
        setImportErrors(["Failed to read file content"])
        return
      }
      
      try {
        let parsedData: any[] = []
        
        if (importType === 'csv') {
          parsedData = parseCSV(content, importDataType)
        } else {
          parsedData = parseJSON(content, importDataType)
        }
        
        if (parsedData.length > 0) {
          // Set preview (first 5 items)
          setImportPreview(parsedData.slice(0, 5))
          
          // Set imported data
          setImportedData(parsedData)
          
          // Show success message if no errors
          if (importErrors.length === 0) {
            setImportSuccess(true)
            toast({
              title: "Data imported successfully",
              description: `${parsedData.length} records were successfully imported and ready to apply.`,
              variant: "default"
            })
          }
        } else {
          // Show warning if no data was parsed
          setImportSuccess(false)
          toast({
            title: "No valid data found",
            description: "The file was processed but no valid data records were found.",
            variant: "destructive"
          })
        }
      } catch (error) {
        console.error("Import error:", error)
        setImportErrors([error instanceof Error ? error.message : "Unknown import error"])
        
        toast({
          title: "Import failed",
          description: error instanceof Error ? error.message : "Unknown import error",
          variant: "destructive"
        })
      }
    }
    
    reader.onerror = () => {
      setImportErrors(["Error reading file"])
      toast({
        title: "File read error",
        description: "There was a problem reading the file. Please try again with a different file.",
        variant: "destructive"
      })
    }
    
    if (importType === 'csv') {
      reader.readAsText(file)
    } else {
      reader.readAsText(file)
    }
    
    // Reset the input value so the same file can be selected again
    e.target.value = ''
  }, [importType, importDataType, parseCSV, parseJSON, importErrors, toast])
  
  /**
   * Handle applying the imported data to the segmentation dataset
   */
  const handleApplyImportedData = useCallback(() => {
    if (!importedData || importedData.length === 0) {
      setImportErrors(["No data to apply"])
      return
    }
    
    setSegmentationData((prev: SegmentationDataset) => ({
      ...prev,
      [importDataType]: importedData
    }))
    
    // Show success message
    toast({
      title: "Data applied successfully",
      description: `${importedData.length} ${importDataType} records were added to your dataset.`,
      variant: "default"
    })
    
    // Close import dialog
    setShowImportDialog(false)
    
    // Reset import states
    setImportedData(null)
    setImportPreview(null)
    setImportSuccess(false)
    setImportErrors([])
    
    // Set analysis to not complete since data changed
    setAnalysisComplete(false)
    
    // Automatically run segmentation analysis after a short delay
    setTimeout(() => {
      toast({
        title: "Running analysis",
        description: "Analyzing your newly imported data...",
        variant: "default"
      })
      generateSegments()
    }, 1000)
  }, [importedData, importDataType, toast, generateSegments])
  
  /**
   * Trigger file input click
   */
  const handleFileSelect = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])
  
  /**
   * Load demo data for testing with automatic analysis
   */
  const loadDemoData = useCallback(() => {
    setIsLoading(true)
    
    toast({
      title: "Loading demo data",
      description: "Preparing sample user profiles, activity logs, and transactions...",
    })
    
    // Simulate loading delay
    setTimeout(() => {
      try {
        // Generate demo data with realistic values
        const userProfiles = generateDemoUserProfiles(100)
        const activityLogs = generateDemoActivityLogs(500)
        const transactions = generateDemoTransactions(250)
        
        // Update the dataset
        setSegmentationData({
          userProfiles,
          activityLogs,
          transactions
        })
        
        // Update UI states
        setIsLoading(false)
        setLastUpdated(new Date())
        setDemoDataLoaded(true)
        
        toast({
          title: "Demo data loaded successfully",
          description: `Loaded ${userProfiles.length} user profiles, ${activityLogs.length} activity logs, and ${transactions.length} transactions.`,
          variant: "default"
        })
        
        // Reset analysis state
        setAnalysisComplete(false)
        
        // Show toast about starting the analysis
        toast({
          title: "Starting segmentation analysis",
          description: "Analyzing user behavior patterns and generating segments...",
        })
        
        // Automatically run segmentation analysis after a short delay
        setTimeout(() => {
          generateSegments()
        }, 800)
      } catch (error) {
        console.error("Error loading demo data:", error)
        setIsLoading(false)
        
        toast({
          title: "Error loading demo data",
          description: error instanceof Error ? error.message : "An unexpected error occurred",
          variant: "destructive"
        })
      }
    }, 800)
  }, [toast, generateSegments])
  
  /**
   * Export segmentation results to CSV
   */
  const exportToCSV = useCallback(() => {
    // Generate CSV content for segments
    const headers = ['id', 'name', 'size', 'totalValue', 'conversionRate', 'engagementScore', 
                    'retentionRate', 'avgSessionTime', 'avgOrderValue', 'purchaseFrequency', 
                    'growthRate', 'churnRisk']
    
    const rows = segmentationResults.segments.map(segment => 
      headers.map(key => segment[key as keyof Segment])
    )
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    // Create a blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    link.href = url
    link.setAttribute('download', `segmentation-results-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Export completed",
      description: "Your segmentation results have been exported as CSV.",
      variant: "default"
    })
  }, [segmentationResults, toast])

  // Memoize processed segment data to avoid recalculations
  const processedSegmentData = useMemo(() => {
    return currentSegments.map(segment => ({
      name: segment.name,
      value: segment.size,
      totalValue: segment.totalValue,
      conversionRate: segment.conversionRate,
      engagementScore: segment.engagementScore,
      id: segment.id  // Include ID for color mapping
    }));
  }, [currentSegments]);

  // Enhanced error handling component for chart visualization
  const ChartErrorFallback = ({ error, resetErrorBoundary, chartType, setChartType }: 
    { error: Error; resetErrorBoundary: () => void; chartType: string; setChartType: (type: any) => void }) => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
      <p className="text-sm text-muted-foreground mb-4">
        Could not render chart: {error.message}
      </p>
      <div className="flex gap-2">
        <Button 
          variant={chartType !== 'donut' ? 'outline' : 'default'} 
          size="sm"
          onClick={() => {
            setChartType('donut');
            resetErrorBoundary();
          }}
        >
          Donut
        </Button>
        <Button 
          variant={chartType !== 'pie' ? 'outline' : 'default'} 
          size="sm"
          onClick={() => {
            setChartType('pie');
            resetErrorBoundary();
          }}
        >
          Pie
        </Button>
      </div>
    </div>
  );

  // Fix the component's JSX structure by properly containing all JSX elements
  return (
    <div className="container mx-auto px-4 pb-8 max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-4 -mx-4 px-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">User Segmentation</h1>
              <p className="text-muted-foreground">
                Analyze user behavior and segment your audience for targeted engagement
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="h-9"
                aria-label="Refresh data"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4" />
                )}
                <span className="ml-2 hidden md:inline">Refresh</span>
              </Button>
              
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[110px] h-9">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 overflow-x-auto">
            <TabsList className="h-10">
              <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
              <TabsTrigger value="rules">Rules Engine</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">
                <Calendar className="h-3 w-3 mr-1" />
                {timeRange === '7d' ? 'Last 7 days' : 
                 timeRange === '30d' ? 'Last 30 days' :
                 timeRange === '90d' ? 'Last 90 days' :
                 timeRange === '1y' ? 'Last year' : 'All time'}
              </Badge>
              
              {isAnalyzing && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Analyzing data...
                </Badge>
              )}
            </div>
          </div>
          
          <TabsContent value="segmentation" className="space-y-6">
            {/* Data source and analysis status cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className={baseCardClass}>
                <CardHeader className="pb-2">
                  <CardTitle>Data Source</CardTitle>
                  <CardDescription>Manage and import your user data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-primary" />
                        <span>User Profiles</span>
                      </div>
                      <Badge variant="outline">{segmentationData.userProfiles?.length || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-primary" />
                        <span>Activity Logs</span>
                      </div>
                      <Badge variant="outline">{segmentationData.activityLogs?.length || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-primary" />
                        <span>Transactions</span>
                      </div>
                      <Badge variant="outline">{segmentationData.transactions?.length || 0}</Badge>
                    </div>
                    
                    <div className="flex mt-4 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setShowImportDialog(true)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={loadDemoData}
                        disabled={isLoading}
                        aria-label="Load demo data"
                      >
                        <Database className="h-4 w-4 mr-2" />
                        {isLoading ? "Loading..." : "Load Demo"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Analysis Status Card */}
              <Card className={`${baseCardClass} ${showColorfulUI ? gradients.purple : ""}`}>
                <CardContent className="pt-6 pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-xs ${showColorfulUI ? "text-white/60" : "text-muted-foreground"}`}>
                        Analysis Status
                      </p>
                      <p className={`text-2xl font-bold ${showColorfulUI ? "text-white" : ""}`}>
                        {analysisComplete ? "Complete" : "Ready"}
                      </p>
                    </div>
                    <div className={`p-2 rounded-full ${showColorfulUI ? "bg-white/10" : "bg-primary/10"}`}>
                      <Sparkles className={`h-5 w-5 ${showColorfulUI ? "text-white" : "text-primary"}`} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      variant={showColorfulUI ? "secondary" : "default"} 
                      size="sm"
                      className={`w-full ${showColorfulUI ? "bg-white/10 hover:bg-white/20 text-white" : ""}`}
                      disabled={isAnalyzing || dataStats.totalDataPoints === 0}
                      onClick={generateSegments}
                      aria-label={isAnalyzing ? "Analyzing data..." : "Analyze user data"}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : analysisComplete ? (
                        <>
                          <RefreshCcw className="h-3 w-3 mr-2" />
                          Refresh Analysis
                        </>
                      ) : (
                        <>
                          <Cpu className="h-3 w-3 mr-2" />
                          Analyze Data
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Last Updated Card */}
              <Card className={baseCardClass}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Last Updated</p>
                      <p className="text-xl font-medium">
                        {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {lastUpdated.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="p-2 rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Insights Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Key Insights</h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Eye className="h-4 w-4 mr-1" /> View all
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {currentInsights.map((insight: InsightData, index: number) => (
                  <motion.div
                    key={insight.id}
                    initial={getAnimationProps(animationsEnabled, { opacity: 0, y: 20 })}
                    animate={getAnimationProps(animationsEnabled, { opacity: 1, y: 0 })}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`${baseCardClass} hover:shadow-lg cursor-pointer transition-all duration-200 h-full`}
                      onClick={() => setSelectedInsight(insight.id === selectedInsight ? null : insight.id)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className={`flex ${selectedInsight === insight.id ? 'flex-col' : 'items-center'}`}>
                            <div
                              className={`
                                rounded-full p-2 mr-3 flex-shrink-0
                                ${insight.impact === 'critical' 
                                  ? 'bg-red-500/10 text-red-500' 
                                  : insight.impact === 'high'
                                  ? 'bg-amber-500/10 text-amber-500'
                                  : 'bg-blue-500/10 text-blue-500'
                                }
                              `}
                            >
                              {insight.icon}
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-sm sm:text-base truncate">{insight.title}</h3>
                              {(selectedInsight === insight.id || !selectedInsight) && (
                                <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{insight.description}</p>
                              )}
                            </div>
                          </div>
                          {insight.trend !== 0 && (
                            <Badge variant="outline" className={`flex-shrink-0 ml-1 ${
                              insight.trend > 0 ? "bg-green-500/10 text-green-500 border-0" : "bg-red-500/10 text-red-500 border-0"
                            }`}>
                              {insight.trend > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                              {Math.abs(insight.trend)}%
                            </Badge>
                          )}
                        </div>
                        {selectedInsight === insight.id && (
                          <motion.div 
                            className="mt-4 pt-4 border-t"
                            initial={getAnimationProps(animationsEnabled, { opacity: 0, height: 0 })}
                            animate={getAnimationProps(animationsEnabled, { opacity: 1, height: "auto" })}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="text-sm font-medium mb-2">Recommended Action</h4>
                            <p className="text-sm text-muted-foreground">{insight.action}</p>
                            <Button className="mt-3 w-full" size="sm" variant="outline">
                              <Target className="h-3 w-3 mr-2" />
                              Apply Action
                            </Button>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Segmentation Visualization */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Segment Distribution</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={chartType === 'donut' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setChartType('donut')}
                  >
                    <PieChart className="h-3 w-3 mr-2" />
                    Donut
                  </Button>
                  <Button 
                    variant={chartType === 'pie' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setChartType('pie')}
                  >
                    <PieChart className="h-3 w-3 mr-2" />
                    Pie
                  </Button>
                </div>
              </div>
              <Card className={baseCardClass}>
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-1/3 order-2 lg:order-1">
                      <h3 className="text-lg font-semibold mb-4">Segments Overview</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {currentSegments.map((segment) => (
                          <SegmentItem
                            key={segment.id}
                            segment={segment}
                            isSelected={selectedMetricsSegment === segment.id}
                            onSelect={() => setSelectedMetricsSegment(segment.id === selectedMetricsSegment ? null : segment.id)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="w-full lg:w-2/3 min-h-[250px] sm:min-h-[300px] flex items-center justify-center order-1 lg:order-2">
                      {isLoading ? (
                        <LoadingIndicator message="Loading chart data..." />
                      ) : currentSegments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                          <PieChart className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No segments available</h3>
                          <p className="text-sm text-muted-foreground max-w-sm">
                            Import data and run the segmentation analysis to visualize your user segments.
                          </p>
                          <Button 
                            variant="outline" 
                            className="mt-4" 
                            onClick={() => setShowImportDialog(true)}
                            disabled={isAnalyzing}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Import Data
                          </Button>
                        </div>
                      ) : (
                        <ErrorBoundary
                          FallbackComponent={(props: ErrorFallbackProps) => (
                            <SegmentationErrorFallback
                              {...props}
                              chartType={chartType}
                              setChartType={setChartType}
                            />
                          )}
                          onReset={() => {
                            // Reset error state and chart-related states
                            console.log("Resetting chart error state");
                          }}
                          resetKeys={[chartType, processedSegmentData, selectedMetricsSegment]}
                        >
                          <React.Suspense fallback={<LoadingIndicator message="Loading chart visualization..." />}>
                            <DynamicSegmentationPieChart 
                              data={processedSegmentData}
                              variant={chartType}
                              selectedSegment={selectedMetricsSegment}
                              onSegmentClick={setSelectedMetricsSegment}
                              showLabels={true}
                              height={chartHeight}
                              onError={(error) => {
                                console.error("Chart error:", error);
                                toast({
                                  title: "Chart Error",
                                  description: "There was a problem rendering the chart. Try changing the chart type.",
                                  variant: "destructive"
                                });
                              }}
                            />
                          </React.Suspense>
                        </ErrorBoundary>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Segment Metrics Dashboard */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Segment Metrics</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Download className="h-4 w-4 mr-1" /> Export <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={dropdownClass}>
                    <DropdownMenuItem onClick={exportSegmentsToCSV}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      // Generate JSON content for segments
                      const jsonContent = JSON.stringify(segmentationResults.segments, null, 2)
                      
                      // Create a blob and download it
                      const blob = new Blob([jsonContent], { type: 'application/json' })
                      const url = URL.createObjectURL(blob)
                      const link = document.createElement('a')
                      
                      link.href = url
                      link.setAttribute('download', `segmentation-results-${new Date().toISOString().split('T')[0]}.json`)
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                      
                      toast({
                        title: "Export completed",
                        description: "Your segmentation results have been exported as JSON.",
                        variant: "default"
                      })
                    }}>
                      <FileJson className="h-4 w-4 mr-2" />
                      Export as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Results
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Card className={baseCardClass}>
                <CardContent className="pt-6 pb-6">
                  <ErrorBoundary
                    FallbackComponent={({ error, resetErrorBoundary }: ErrorFallbackProps) => (
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Could not render metrics dashboard: {error.message}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-4"
                          onClick={resetErrorBoundary}
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                    onReset={() => {
                      // Reset metrics dashboard error state
                      console.log("Resetting metrics dashboard error state");
                    }}
                  >
                    <Suspense fallback={<LoadingIndicator message="Loading segment metrics..." />}>
                      <SegmentMetricsDashboard 
                        segments={currentSegments} 
                        selectedSegment={selectedMetricsSegment}
                        onError={(error) => {
                          console.error("Metrics dashboard error:", error);
                          toast({
                            title: "Dashboard Error",
                            description: "There was a problem rendering the metrics dashboard.",
                            variant: "destructive"
                          });
                        }}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </div>
            
            {/* User Segmentation Analysis Component */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold">Segmentation Analysis</h2>
              <Card className={baseCardClass}>
                <CardContent className="pt-6 pb-6">
                  <ErrorBoundary
                    FallbackComponent={({ error, resetErrorBoundary }: ErrorFallbackProps) => (
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Could not render segmentation analysis: {error.message}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-4"
                          onClick={resetErrorBoundary}
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                    onReset={() => {
                      // Reset segmentation analysis error state
                      console.log("Resetting segmentation analysis error state");
                    }}
                  >
                    <Suspense fallback={<LoadingIndicator message="Loading segmentation analysis..." />}>
                      <UserSegmentationAnalysis 
                        segmentData={segments}
                        refreshTrigger={lastUpdated.getTime()}
                        showDataLabels={true}
                        onError={(error) => {
                          console.error("Segmentation analysis error:", error);
                          toast({
                            title: "Analysis Error",
                            description: "There was a problem with the segmentation analysis.",
                            variant: "destructive"
                          });
                        }}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4">
            <Card className={baseCardClass}>
              <CardHeader>
                <CardTitle>Segmentation Rules Engine</CardTitle>
                <CardDescription>Create and manage custom segmentation rules</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 space-y-4">
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Define Segments</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Create rules to automatically classify users into different segments based on their attributes and behaviors.
                        </p>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="segment-name">Segment Name</Label>
                            <Input id="segment-name" placeholder="High-Value Customers" className="mt-1" />
                          </div>
                          
                          <div>
                            <Label>Select Conditions</Label>
                            <Select defaultValue="user-profile">
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select condition type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user-profile">User Profile</SelectItem>
                                <SelectItem value="behavior">User Behavior</SelectItem>
                                <SelectItem value="transaction">Transaction Data</SelectItem>
                                <SelectItem value="engagement">Engagement Metrics</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="border rounded-md p-4 space-y-3">
                            <h4 className="text-sm font-medium">Rule Builder</h4>
                            
                            <div className="grid grid-cols-3 gap-2 items-center">
                              <Select defaultValue="age">
                                <SelectTrigger>
                                  <SelectValue placeholder="Field" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="age">Age</SelectItem>
                                  <SelectItem value="gender">Gender</SelectItem>
                                  <SelectItem value="location">Location</SelectItem>
                                  <SelectItem value="joinDate">Join Date</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Select defaultValue="greater-than">
                                <SelectTrigger>
                                  <SelectValue placeholder="Operator" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="equal">Equals</SelectItem>
                                  <SelectItem value="not-equal">Not Equals</SelectItem>
                                  <SelectItem value="greater-than">Greater Than</SelectItem>
                                  <SelectItem value="less-than">Less Than</SelectItem>
                                  <SelectItem value="contains">Contains</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Input placeholder="Value" defaultValue="30" />
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Select defaultValue="and">
                                <SelectTrigger className="w-[100px]">
                                  <SelectValue placeholder="Logic" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="and">AND</SelectItem>
                                  <SelectItem value="or">OR</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Button variant="outline" size="sm" className="flex-1">
                                <PlusIcon className="h-4 w-4 mr-1" />
                                Add Condition
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border rounded-md p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium">Behavior Rule</h4>
                              <Button variant="ghost" size="sm">
                                <TrashIcon className="h-3.5 w-3.5 text-destructive" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 items-center">
                              <Select defaultValue="session-time">
                                <SelectTrigger>
                                  <SelectValue placeholder="Field" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="session-time">Session Time</SelectItem>
                                  <SelectItem value="visits">Visit Count</SelectItem>
                                  <SelectItem value="feature-use">Feature Usage</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Select defaultValue="greater-than">
                                <SelectTrigger>
                                  <SelectValue placeholder="Operator" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="equal">Equals</SelectItem>
                                  <SelectItem value="not-equal">Not Equals</SelectItem>
                                  <SelectItem value="greater-than">Greater Than</SelectItem>
                                  <SelectItem value="less-than">Less Than</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Input placeholder="Value" defaultValue="10" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <Button variant="outline">Reset</Button>
                          <Button>Save Rule</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-2/3">
                      <div className="bg-muted/40 p-4 rounded-lg mb-4">
                        <h3 className="text-lg font-medium mb-2">Current Rules</h3>
                        
                        <div className="space-y-3">
                          <div className="bg-background p-3 rounded-md border">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                <h4 className="font-medium">High-Value Customers</h4>
                              </div>
                              <Badge variant="outline">Active</Badge>
                            </div>
                            <div className="mt-2 text-sm">
                              <p><span className="text-muted-foreground">Conditions:</span> Age &gt; 30 AND Session Time &gt; 10 min</p>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                            </div>
                          </div>
                          
                          <div className="bg-background p-3 rounded-md border">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                <h4 className="font-medium">Regular Customers</h4>
                              </div>
                              <Badge variant="outline">Active</Badge>
                            </div>
                            <div className="mt-2 text-sm">
                              <p><span className="text-muted-foreground">Conditions:</span> Purchase Count &gt; 3 AND Average Order Value &gt; $50</p>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                            </div>
                          </div>
                          
                          <div className="bg-background p-3 rounded-md border">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                <h4 className="font-medium">At-Risk Users</h4>
                              </div>
                              <Badge variant="outline">Active</Badge>
                            </div>
                            <div className="mt-2 text-sm">
                              <p><span className="text-muted-foreground">Conditions:</span> Days Since Last Activity &gt; 30 AND Engagement Score &lt; 3</p>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-accent p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Test & Apply Rules</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Test your rules against your current dataset and generate segments based on your custom criteria.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 border rounded-md bg-background">
                            <div>
                              <p className="font-medium">Current Dataset</p>
                              <p className="text-sm text-muted-foreground">
                                {segmentationData.userProfiles?.length || 0} Users / {segmentationData.activityLogs?.length || 0} Activities / {segmentationData.transactions?.length || 0} Transactions
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                          </div>
                          
                          <Button className="w-full" disabled={!segmentationData.userProfiles?.length}>
                            <Sparkles className="h-4 w-4 mr-1" />
                            Generate Segments from Rules
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <Card className={baseCardClass}>
              <CardHeader className="pb-2">
                <CardTitle>Segment Performance Metrics</CardTitle>
                <CardDescription>
                  Compare key performance indicators across different user segments
                </CardDescription>
              </CardHeader>
              <CardContent className="py-4">
                <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                  {currentSegments.map((segment) => (
                    <Button
                      key={segment.id}
                      variant={selectedMetricsSegment === segment.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMetricsSegment(segment.id)}
                      className="flex items-center whitespace-nowrap"
                    >
                      <div 
                        className="w-2 h-2 rounded-full mr-2" 
                        style={{ backgroundColor: getSegmentColor(segment.id) }}
                      />
                      {segment.name}
                    </Button>
                  ))}
                  <Button
                    variant={selectedMetricsSegment === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMetricsSegment(null)}
                    className="whitespace-nowrap"
                  >
                    All Segments
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SegmentMetricCard
                    title="Conversion Rate" 
                    value={`${selectedMetricsSegment 
                      ? currentSegments.find(s => s.id === selectedMetricsSegment)?.conversionRate.toFixed(1) 
                      : (currentSegments.reduce((acc, s) => acc + s.conversionRate, 0) / currentSegments.length).toFixed(1)}%`}
                    trend={selectedMetricsSegment
                      ? (currentSegments.find(s => s.id === selectedMetricsSegment)?.growthRate || 0) * 0.5 
                      : 2.3}
                    icon={<Zap className="h-4 w-4 text-amber-500" />}
                    colorful={showColorfulUI}
                  />
                  <SegmentMetricCard
                    title="Engagement Score" 
                    value={`${selectedMetricsSegment 
                      ? currentSegments.find(s => s.id === selectedMetricsSegment)?.engagementScore.toFixed(1) 
                      : (currentSegments.reduce((acc, s) => acc + s.engagementScore, 0) / currentSegments.length).toFixed(1)}`}
                    trend={1.8}
                    icon={<Activity className="h-4 w-4 text-blue-500" />}
                  />
                  <SegmentMetricCard
                    title="Retention Rate" 
                    value={`${selectedMetricsSegment 
                      ? currentSegments.find(s => s.id === selectedMetricsSegment)?.retentionRate 
                      : Math.round(currentSegments.reduce((acc, s) => acc + s.retentionRate, 0) / currentSegments.length)}%`}
                    trend={-0.5}
                    icon={<Users className="h-4 w-4 text-green-500" />}
                    badgeTrendReversed={true}
                  />
                  <SegmentMetricCard
                    title="Avg. Order Value" 
                    value={`$${selectedMetricsSegment 
                      ? currentSegments.find(s => s.id === selectedMetricsSegment)?.avgOrderValue 
                      : Math.round(currentSegments.reduce((acc, s) => acc + s.avgOrderValue, 0) / currentSegments.length)}`}
                    trend={3.2}
                    icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
                  />
                </div>
                
                <div className="mt-8 p-4 rounded-lg bg-muted/30">
                  {selectedMetricsSegment ? (
                    <div className="text-center py-2">
                      <h3 className="text-lg font-medium mb-2">
                        {currentSegments.find(s => s.id === selectedMetricsSegment)?.name} Details
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Select detailed metrics to view from the dropdown below
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <h3 className="text-sm font-medium mb-1">Select a specific segment to view detailed metrics</h3>
                      <p className="text-xs text-muted-foreground">
                        Click on one of the segment buttons above to view detailed performance metrics
                      </p>
                    </div>
                  )}
                </div>

                {selectedMetricsSegment && (
                  <div className="mt-6 p-4 rounded-lg bg-muted/20 border">
                    <h3 className="text-lg font-medium mb-3">
                      Detailed Metrics for {currentSegments.find(s => s.id === selectedMetricsSegment)?.name}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Value per User:</span>
                          <span className="font-medium">
                            ${Math.round(
                              currentSegments.find(s => s.id === selectedMetricsSegment)?.totalValue || 0 / 
                              (currentSegments.find(s => s.id === selectedMetricsSegment)?.size || 1)
                            )}
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Purchase Frequency:</span>
                          <span className="font-medium">
                            {currentSegments.find(s => s.id === selectedMetricsSegment)?.purchaseFrequency.toFixed(1)} times/month
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Avg. Session Duration:</span>
                          <span className="font-medium">
                            {currentSegments.find(s => s.id === selectedMetricsSegment)?.avgSessionTime.toFixed(1)} minutes
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Churn Risk:</span>
                          <span className={`font-medium ${
                            (currentSegments.find(s => s.id === selectedMetricsSegment)?.churnRisk || 0) > 50 
                              ? "text-red-500" 
                              : "text-green-500"
                          }`}>
                            {currentSegments.find(s => s.id === selectedMetricsSegment)?.churnRisk}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Growth Rate:</span>
                          <span className={`font-medium ${
                            (currentSegments.find(s => s.id === selectedMetricsSegment)?.growthRate || 0) > 0 
                              ? "text-green-500" 
                              : "text-red-500"
                          }`}>
                            {(currentSegments.find(s => s.id === selectedMetricsSegment)?.growthRate || 0) > 0 ? "+" : ""}
                            {currentSegments.find(s => s.id === selectedMetricsSegment)?.growthRate.toFixed(1)}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Revenue:</span>
                          <span className="font-medium">
                            ${currentSegments.find(s => s.id === selectedMetricsSegment)?.totalValue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className={baseCardClass}>
                <CardHeader>
                  <CardTitle>Analysis Settings</CardTitle>
                  <CardDescription>
                    Configure your segmentation analysis parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="segmentation-method">Segmentation Method</Label>
                        <Badge variant="outline" className="font-normal">Advanced</Badge>
                      </div>
                      <Select value={segmentationMethod} onValueChange={setSegmentationMethod}>
                        <SelectTrigger id="segmentation-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kmeans">K-Means Clustering</SelectItem>
                          <SelectItem value="hierarchical">Hierarchical Clustering</SelectItem>
                          <SelectItem value="dbscan">Density-Based Clustering</SelectItem>
                          <SelectItem value="rule-based">Rule-Based Segmentation</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        The algorithm used to group users into segments
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={baseCardClass}>
                <CardHeader>
                  <CardTitle>UI Settings</CardTitle>
                  <CardDescription>
                    Customize the appearance of the dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="colorful-ui" className="cursor-pointer">Colorful UI</Label>
                        <span className="text-xs text-muted-foreground">Use gradient backgrounds and vibrant colors</span>
                      </div>
                      <Switch
                        id="colorful-ui"
                        checked={showColorfulUI}
                        onCheckedChange={setShowColorfulUI}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="animations" className="cursor-pointer">Enable Animations</Label>
                        <span className="text-xs text-muted-foreground">Smooth transitions and motion effects</span>
                      </div>
                      <Switch
                        id="animations"
                        checked={animationsEnabled}
                        onCheckedChange={setAnimationsEnabled}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="visual-density">Visual Density</Label>
                        <span className="text-xs text-muted-foreground">{visualDensity}%</span>
                      </div>
                      <Slider
                        id="visual-density"
                        value={[visualDensity]}
                        onValueChange={values => setVisualDensity(values[0])}
                        min={50}
                        max={100}
                        step={5}
                      />
                      <p className="text-xs text-muted-foreground">
                        Adjust the spacing and sizing of UI elements
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Import Dialog */}
        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Import User Data</DialogTitle>
              <DialogDescription>
                Upload CSV or JSON files with user data for segmentation analysis.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="csv"
                    name="import-type"
                    checked={importType === 'csv'}
                    onChange={() => setImportType('csv')}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="csv">CSV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="json"
                    name="import-type"
                    checked={importType === 'json'}
                    onChange={() => setImportType('json')}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="json">JSON</Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="import-data-type">Data Type</Label>
                <Select value={importDataType} onValueChange={(value: 'userProfiles' | 'activityLogs' | 'transactions') => setImportDataType(value)}>
                  <SelectTrigger id="import-data-type">
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="userProfiles">User Profiles</SelectItem>
                    <SelectItem value="activityLogs">Activity Logs</SelectItem>
                    <SelectItem value="transactions">Transactions</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Select the type of data you're importing
                </p>
              </div>
              
              <div className="grid gap-2">
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-accent/40 transition-colors"
                  onClick={handleFileSelect}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={importType === 'csv' ? '.csv' : '.json'}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <UploadCloud className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Click to upload a file</p>
                  <p className="text-xs text-muted-foreground">
                    {importType === 'csv' 
                      ? 'Upload a CSV file with headers matching the required fields' 
                      : 'Upload a JSON file with an array of objects'}
                  </p>
                </div>
                
                {importErrors.length > 0 && (
                  <div className="bg-destructive/10 text-destructive rounded-md p-3 mt-2">
                    <h4 className="text-sm font-medium flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Import Errors
                    </h4>
                    <ul className="ml-6 mt-2 text-xs list-disc space-y-1">
                      {importErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {importSuccess && (
                  <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-md p-3 mt-2">
                    <p className="text-sm flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      Data imported successfully! Review the preview below.
                    </p>
                  </div>
                )}
                
                {importPreview && importPreview.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Data Preview</h4>
                    <div className="max-h-40 overflow-auto border rounded-md">
                      <pre className="text-xs p-3 whitespace-pre-wrap">
                        {JSON.stringify(importPreview, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-muted/60 rounded-md p-3">
                <h4 className="text-sm font-medium mb-1 flex items-center">
                  <InfoIcon className="h-4 w-4 mr-1" />
                  Required Fields
                </h4>
                <div className="text-xs">
                  {importDataType === 'userProfiles' && (
                    <p>userId, name, age (number), gender, location</p>
                  )}
                  {importDataType === 'activityLogs' && (
                    <p>userId, sessionId, timestamp, action, duration (number)</p>
                  )}
                  {importDataType === 'transactions' && (
                    <p>userId, transactionId, timestamp, amount (number)</p>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowImportDialog(false)}>Cancel</Button>
              <Button 
                disabled={!importedData || importErrors.length > 0} 
                onClick={handleApplyImportedData}
              >
                Apply Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Hidden file input for import */}
        <input
          ref={fileInputRef}
          type="file"
          accept={importType === 'csv' ? '.csv' : '.json'}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
} 