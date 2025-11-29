"use client"

import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Users, 
  Clock, 
  Brain, 
  Zap,
  Database,
  Activity
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Metric {
  id: string
  name: string
  value: string | number
  unit?: string
  description: string
  change: number
  icon: React.ReactNode
  trend: "up" | "down" | "neutral"
  timeframe: "daily" | "weekly" | "monthly"
}

const mockMetrics: Record<string, Metric[]> = {
  performance: [
    {
      id: "m1",
      name: "Model Accuracy",
      value: 94.3,
      unit: "%",
      description: "Average prediction accuracy",
      change: 2.1,
      icon: <Brain className="h-5 w-5" />,
      trend: "up",
      timeframe: "weekly"
    },
    {
      id: "m2",
      name: "API Latency",
      value: 42,
      unit: "ms",
      description: "Average response time",
      change: -12.5,
      icon: <Zap className="h-5 w-5" />,
      trend: "down",
      timeframe: "daily"
    },
    {
      id: "m3",
      name: "Data Processed",
      value: 18.7,
      unit: "GB",
      description: "Volume of data analyzed",
      change: 5.3,
      icon: <Database className="h-5 w-5" />,
      trend: "up",
      timeframe: "daily"
    },
    {
      id: "m4",
      name: "System Uptime",
      value: 99.98,
      unit: "%",
      description: "Service availability",
      change: 0.01,
      icon: <Activity className="h-5 w-5" />,
      trend: "up",
      timeframe: "monthly"
    }
  ],
  engagement: [
    {
      id: "m5",
      name: "Active Users",
      value: 3254,
      description: "Users active in last 24h",
      change: 8.7,
      icon: <Users className="h-5 w-5" />,
      trend: "up",
      timeframe: "daily"
    },
    {
      id: "m6",
      name: "Avg. Session",
      value: "14:32",
      description: "Average user session time",
      change: 2.3,
      icon: <Clock className="h-5 w-5" />,
      trend: "up",
      timeframe: "weekly"
    },
    {
      id: "m7",
      name: "API Calls",
      value: "2.4M",
      description: "Total API requests",
      change: 15.8,
      icon: <Zap className="h-5 w-5" />,
      trend: "up",
      timeframe: "daily"
    },
    {
      id: "m8",
      name: "New Users",
      value: 347,
      description: "New sign-ups today",
      change: -4.2,
      icon: <Users className="h-5 w-5" />,
      trend: "down",
      timeframe: "daily"
    }
  ]
};

const getTrendIcon = (trend: Metric["trend"]) => {
  switch (trend) {
    case "up":
      return <ArrowUpRight className="h-4 w-4" />;
    case "down":
      return <ArrowDownRight className="h-4 w-4" />;
    default:
      return null;
  }
};

const getTrendColor = (trend: Metric["trend"], isPositive: boolean = true) => {
  if (trend === "neutral") return "text-gray-500";
  
  if (isPositive) {
    return trend === "up" ? "text-green-600" : "text-red-600";
  } else {
    return trend === "down" ? "text-green-600" : "text-red-600";
  }
};

export function KeyMetrics() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Key Metrics</CardTitle>
        <CardDescription>
          System performance and engagement metrics
        </CardDescription>
        <Tabs defaultValue="performance" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="mt-2 pt-1">
            <div className="grid grid-cols-2 gap-4">
              {mockMetrics.performance.map(metric => (
                <MetricCard 
                  key={metric.id} 
                  metric={metric} 
                  reverseColor={metric.name === "API Latency"} 
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="engagement" className="mt-2 pt-1">
            <div className="grid grid-cols-2 gap-4">
              {mockMetrics.engagement.map(metric => (
                <MetricCard 
                  key={metric.id} 
                  metric={metric} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}

function MetricCard({ metric, reverseColor = false }: { metric: Metric, reverseColor?: boolean }) {
  const trendColorClass = getTrendColor(metric.trend, !reverseColor);
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-md bg-muted">
            {metric.icon}
          </div>
          <div>
            <p className="text-sm font-medium">{metric.name}</p>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-2xl font-bold">
            {metric.value}{metric.unit && <span className="text-sm font-normal ml-0.5">{metric.unit}</span>}
          </p>
          <div className="flex items-center">
            <div className={cn("flex items-center text-xs", trendColorClass)}>
              {getTrendIcon(metric.trend)}
              <span className="ml-1">{Math.abs(metric.change)}%</span>
            </div>
            <span className="text-xs text-muted-foreground ml-1.5">
              vs last {metric.timeframe}
            </span>
          </div>
        </div>
        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", 
          metric.trend === "up" ? "bg-green-100" : 
          metric.trend === "down" ? "bg-red-100" : "bg-gray-100",
          trendColorClass
        )}>
          {getTrendIcon(metric.trend)}
        </div>
      </div>
    </div>
  );
} 