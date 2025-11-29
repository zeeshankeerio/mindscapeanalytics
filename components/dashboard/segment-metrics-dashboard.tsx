"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Scatter,
  ScatterChart,
  ZAxis,
  Cell
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Target,
  Activity,
  DollarSign,
  Clock,
  ShoppingCart,
  Award,
  Heart,
  TrendingUp,
  AlertTriangle,
  AlertCircle
} from "lucide-react"
import { UserSegment } from "./user-segmentation-analysis"

// Types
export interface SegmentMetricsProps {
  segments: UserSegment[]
  selectedSegment: string | null
  onSelectSegment?: (segmentId: string) => void
  animate?: boolean
  showColorfulUI?: boolean
  onError?: (error: Error) => void
}

// Function to calculate risk score
const calculateRiskScore = (segment: UserSegment) => {
  // Higher churn risk, lower retention, and negative growth contribute to higher risk
  const churnFactor = segment.churnRisk / 100;
  const retentionFactor = 1 - (segment.retentionRate / 100);
  const growthFactor = segment.growthRate < 0 ? Math.abs(segment.growthRate) / 100 : 0;
  
  // Weighted risk score calculation
  return Math.min(100, Math.round((churnFactor * 0.5 + retentionFactor * 0.3 + growthFactor * 0.2) * 100));
}

// Format large numbers
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

// Simple gauge chart component
const GaugeChart = ({ 
  value, 
  max = 100, 
  label, 
  color = "bg-primary", 
  size = "medium",
  showValue = true
}: { 
  value: number, 
  max?: number, 
  label?: string, 
  color?: string,
  size?: "small" | "medium" | "large",
  showValue?: boolean
}) => {
  // Convert value to percentage
  const percentage = Math.min(100, (value / max) * 100);
  
  // Get size class
  const sizeClass = size === "small" ? "h-4" : size === "large" ? "h-6" : "h-5";
  
  return (
    <div className="space-y-1">
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="relative">
        <Progress value={percentage} className={`${sizeClass} ${color}`} />
        {showValue && (
          <span className="absolute right-0 top-0 text-xs font-medium transform -translate-y-1/2 translate-x-full">
            {value}{max === 100 ? '%' : ''}
          </span>
        )}
      </div>
    </div>
  );
};

// Format radar data
const formatRadarData = (segments: UserSegment[]) => {
  const metrics = [
    { name: "Value", dataKey: "totalValue", normalizer: (val: number) => Math.min(100, val / 100) },
    { name: "Engagement", dataKey: "engagementScore", normalizer: (val: number) => val * 10 },
    { name: "Retention", dataKey: "retentionRate", normalizer: (val: number) => val },
    { name: "Conversion", dataKey: "conversionRate", normalizer: (val: number) => val },
    { name: "Purchase Freq", dataKey: "purchaseFrequency", normalizer: (val: number) => val * 10 }
  ];
  
  return segments.map(segment => {
    const formattedData: any = { name: segment.name };
    
    metrics.forEach(metric => {
      formattedData[metric.name] = metric.normalizer(segment[metric.dataKey as keyof UserSegment] as number);
    });
    
    return formattedData;
  });
};

// Error fallback component
const ChartErrorFallback = ({ message = "Failed to render chart" }: { message?: string }) => (
  <div className="flex items-center justify-center h-full p-4 border border-red-300 bg-red-50 rounded-md">
    <div className="text-center">
      <AlertCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
      <p className="text-sm text-red-600">{message}</p>
    </div>
  </div>
)

// Helper to get segment color
const getSegmentColor = (segmentId: string): string => {
  const colorMap: Record<string, string> = {
    "high-value": "#22c55e", // green
    "regular": "#3b82f6", // blue
    "occasional": "#a855f7", // purple
    "new-users": "#eab308", // yellow
    "at-risk": "#ef4444", // red
  }
  return colorMap[segmentId] || "#cbd5e1" // default gray
}

export default function SegmentMetricsDashboard({ 
  segments,
  selectedSegment, 
  onSelectSegment,
  animate = true,
  showColorfulUI = false,
  onError
}: SegmentMetricsProps) {
  const [activeSegment, setActiveSegment] = useState<UserSegment | null>(null);
  const [segmentTrends, setSegmentTrends] = useState<any[]>([]);
  const [valueDistribution, setValueDistribution] = useState<any[]>([]);
  const [visibleMetrics, setVisibleMetrics] = useState<string[]>([
    'engagementScore', 'retentionRate', 'conversionRate', 'churnRisk'
  ])
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  
  // Helper function to safely render charts with error handling
  const safeRenderChart = useCallback((renderFn: () => React.ReactNode) => {
    try {
      return renderFn()
    } catch (err) {
      setHasError(true)
      const message = err instanceof Error ? err.message : "Unknown error occurred"
      setErrorMessage(message)
      if (onError && err instanceof Error) {
        onError(err)
      }
      return <ChartErrorFallback message={message} />
    }
  }, [onError])

  // Get currently selected segment data
  const getSelectedSegmentData = useCallback(() => {
    if (!selectedSegment) return null
    return segments.find(segment => segment.id === selectedSegment) || null
  }, [selectedSegment, segments])

  // Format radar chart data
  const radarData = formatRadarData(segments);
  
  // Initialize active segment when selectedSegment changes
  useEffect(() => {
    if (selectedSegment) {
      const segment = segments.find(s => s.id === selectedSegment);
      if (segment) {
        setActiveSegment(segment);
      }
    } else if (segments.length > 0) {
      setActiveSegment(segments[0]); // Default to first segment if none selected
    } else {
      setActiveSegment(null);
    }
  }, [selectedSegment, segments]);
  
  // Generate simulated trend data
  useEffect(() => {
    if (!activeSegment) return;
    
    // Simulate past 12 months of data based on current metrics and growth rate
    const trends = Array(12).fill(0).map((_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() - 11 + i);
      
      // Calculate based on growth rate with some randomness
      const growthFactor = 1 + ((activeSegment.growthRate / 100) * (i / 12));
      const randomFactor = 0.95 + Math.random() * 0.1; // 0.95-1.05 random factor
      
      return {
        month: month.toLocaleDateString('en-US', { month: 'short' }),
        value: Math.round(activeSegment.totalValue * growthFactor * randomFactor * 0.8),
        engagement: Math.max(1, Math.min(10, activeSegment.engagementScore * growthFactor * randomFactor)),
        retention: Math.max(10, Math.min(100, activeSegment.retentionRate * growthFactor * randomFactor)),
      };
    });
    
    setSegmentTrends(trends);
    
    // Generate value vs engagement distribution
    const distribution = segments.map(s => ({
      name: s.name,
      engagement: s.engagementScore,
      value: s.totalValue / 100,
      retention: s.retentionRate,
      size: s.size * 5, // Size of bubble represents segment size
      id: s.id,
      color: s.id === activeSegment.id ? '#ff6b6b' : '#6184d8'
    }));
    
    setValueDistribution(distribution);
  }, [activeSegment, segments]);
  
  // Handle segment selection
  const handleSegmentSelect = (segment: UserSegment) => {
    if (onSelectSegment) {
      onSelectSegment(segment.id);
    }
    setActiveSegment(segment);
  };
  
  // If no segments data, show empty state
  if (segments.length === 0) {
    return (
      <Card className={`${showColorfulUI ? 'bg-slate-800/70 text-white border-slate-700' : ''}`}>
        <CardContent className="pt-6 text-center">
          <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Segment Data Available</h3>
          <p className="text-muted-foreground mb-4">
            Select a segment to view detailed metrics or import data to generate segments.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Segment Radar Chart */}
        <Card className={`${showColorfulUI ? 'bg-slate-800/70 text-white border-slate-700' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Segment Comparison</CardTitle>
            <CardDescription className={showColorfulUI ? 'text-white/70' : ''}>
              Multi-dimensional segment metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid strokeOpacity={0.2} />
                  <PolarAngleAxis dataKey="name" tick={{ fill: showColorfulUI ? 'white' : '#888', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: showColorfulUI ? 'white' : '#888', fontSize: 10 }} />
                  
                  {segments.slice(0, 5).map((segment, index) => (
                    <Radar
                      key={segment.id}
                      name={segment.name}
                      dataKey={radarData[index]?.name}
                      stroke={segment.id === activeSegment?.id ? '#ff6b6b' : `hsl(${index * 60}, 80%, 60%)`}
                      fill={segment.id === activeSegment?.id ? '#ff6b6b' : `hsl(${index * 60}, 80%, 60%)`}
                      fillOpacity={segment.id === activeSegment?.id ? 0.6 : 0.15}
                      strokeWidth={segment.id === activeSegment?.id ? 2 : 1}
                      onClick={() => handleSegmentSelect(segment)}
                      className="cursor-pointer"
                    />
                  ))}
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Segment Value vs Engagement Distribution */}
        <Card className={`${showColorfulUI ? 'bg-slate-800/70 text-white border-slate-700' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Value vs Engagement</CardTitle>
            <CardDescription className={showColorfulUI ? 'text-white/70' : ''}>
              Distribution of segments by economic value and engagement level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={showColorfulUI ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <XAxis 
                    type="number" 
                    dataKey="engagement" 
                    name="Engagement Score" 
                    domain={[0, 10]}
                    label={{ value: 'Engagement', position: 'bottom', fill: showColorfulUI ? 'white' : '#666' }}
                    tick={{ fill: showColorfulUI ? 'white' : '#888' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="value" 
                    name="Economic Value" 
                    label={{ value: 'Value', angle: -90, position: 'left', fill: showColorfulUI ? 'white' : '#666' }}
                    tick={{ fill: showColorfulUI ? 'white' : '#888' }}
                  />
                  <ZAxis 
                    type="number" 
                    dataKey="size" 
                    range={[40, 200]} 
                    name="Segment Size" 
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(value) => `Segment: ${value}`}
                  />
                  <Scatter 
                    name="Segments" 
                    data={valueDistribution} 
                    fill="#8884d8"
                    onClick={(data) => {
                      const segment = segments.find(s => s.id === data.id);
                      if (segment) handleSegmentSelect(segment);
                    }}
                  >
                    {valueDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Selected Segment Metrics */}
      <AnimatePresence mode="wait">
        {activeSegment && (
          <motion.div
            key={activeSegment.id}
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            exit={animate ? { opacity: 0, y: -20 } : undefined}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Key Metrics */}
            <Card className={`${showColorfulUI ? 'bg-slate-800/70 text-white border-slate-700' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-base">Key Metrics</CardTitle>
                    <CardDescription className={showColorfulUI ? 'text-white/70' : ''}>
                      Primary metrics for {activeSegment.name}
                    </CardDescription>
                  </div>
                  <Badge className={`ml-2 ${
                    activeSegment.growthRate > 5 ? 'bg-green-500' : 
                    activeSegment.growthRate > 0 ? 'bg-blue-500' : 
                    activeSegment.growthRate > -5 ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`}>
                    {activeSegment.growthRate > 0 ? '+' : ''}{activeSegment.growthRate}% Growth
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Segment Size</p>
                    </div>
                    <p className="text-2xl font-bold">{activeSegment.size}%</p>
                    <GaugeChart 
                      value={activeSegment.size} 
                      color="bg-blue-500" 
                      showValue={false}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Total Value</p>
                    </div>
                    <p className="text-2xl font-bold">${formatNumber(activeSegment.totalValue)}</p>
                    <div className="text-xs text-muted-foreground">
                      ${activeSegment.avgOrderValue} Avg. Order
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Engagement</p>
                    </div>
                    <p className="text-2xl font-bold">{activeSegment.engagementScore}/10</p>
                    <GaugeChart 
                      value={activeSegment.engagementScore * 10} 
                      color="bg-purple-500" 
                      showValue={false}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Conversion</p>
                    </div>
                    <p className="text-2xl font-bold">{activeSegment.conversionRate}%</p>
                    <GaugeChart 
                      value={activeSegment.conversionRate} 
                      color="bg-green-500" 
                      showValue={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Activity Metrics */}
              <Card className={`${showColorfulUI ? 'bg-slate-800/70 text-white border-slate-700' : ''}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Activity Metrics</CardTitle>
                  <CardDescription className={showColorfulUI ? 'text-white/70' : ''}>
                    Behavior and engagement indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Session Time</p>
                      </div>
                      <p className="text-xl font-medium">{activeSegment.avgSessionTime} min</p>
                      <GaugeChart 
                        value={activeSegment.avgSessionTime} 
                        max={30} 
                        color="bg-amber-500" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Purchase Frequency</p>
                      </div>
                      <p className="text-xl font-medium">{activeSegment.purchaseFrequency}/mo</p>
                      <GaugeChart 
                        value={activeSegment.purchaseFrequency} 
                        max={10} 
                        color="bg-indigo-500" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={segmentTrends}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={showColorfulUI ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                          <XAxis 
                            dataKey="month" 
                            tick={{ fill: showColorfulUI ? 'white' : '#888' }}
                          />
                          <YAxis yAxisId="left" 
                            tick={{ fill: showColorfulUI ? 'white' : '#888' }}
                          />
                          <YAxis yAxisId="right" orientation="right" 
                            tick={{ fill: showColorfulUI ? 'white' : '#888' }}
                          />
                          <Tooltip />
                          <Legend />
                          <Line 
                            yAxisId="left" 
                            type="monotone" 
                            dataKey="engagement" 
                            name="Engagement Score" 
                            stroke="#8884d8" 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            yAxisId="right" 
                            type="monotone" 
                            dataKey="retention" 
                            name="Retention %" 
                            stroke="#82ca9d" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Value & Risk Metrics */}
              <Card className={`${showColorfulUI ? 'bg-slate-800/70 text-white border-slate-700' : ''}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Value & Risk Analysis</CardTitle>
                  <CardDescription className={showColorfulUI ? 'text-white/70' : ''}>
                    Economic value and churn risk assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Retention Rate</p>
                      </div>
                      <p className="text-xl font-medium">{activeSegment.retentionRate}%</p>
                      <GaugeChart 
                        value={activeSegment.retentionRate} 
                        color="bg-green-500" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Churn Risk</p>
                      </div>
                      <p className="text-xl font-medium">{activeSegment.churnRisk}%</p>
                      <GaugeChart 
                        value={activeSegment.churnRisk} 
                        color="bg-red-500" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={segmentTrends}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={showColorfulUI ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                          <XAxis 
                            dataKey="month" 
                            tick={{ fill: showColorfulUI ? 'white' : '#888' }}
                          />
                          <YAxis 
                            tick={{ fill: showColorfulUI ? 'white' : '#888' }}
                          />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            name="Value Trend"
                            stroke="#ff7300" 
                            fill={showColorfulUI ? "rgba(255, 115, 0, 0.3)" : "rgba(255, 115, 0, 0.2)"} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Risk Assessment Score</p>
                      <Badge 
                        variant={showColorfulUI ? "outline" : "secondary"}
                        className={`${
                          calculateRiskScore(activeSegment) > 60 ? 'text-red-500 border-red-500' :
                          calculateRiskScore(activeSegment) > 40 ? 'text-amber-500 border-amber-500' :
                          'text-green-500 border-green-500'
                        }`}
                      >
                        {
                          calculateRiskScore(activeSegment) > 60 ? 'High Risk' :
                          calculateRiskScore(activeSegment) > 40 ? 'Medium Risk' :
                          'Low Risk'
                        }
                      </Badge>
                    </div>
                    <GaugeChart 
                      value={calculateRiskScore(activeSegment)} 
                      color={`${
                        calculateRiskScore(activeSegment) > 60 ? 'bg-red-500' :
                        calculateRiskScore(activeSegment) > 40 ? 'bg-amber-500' :
                        'bg-green-500'
                      }`} 
                      size="large"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Detailed Analysis
              </Button>
              <Button>
                <Heart className="h-4 w-4 mr-2" />
                Optimize Segment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 