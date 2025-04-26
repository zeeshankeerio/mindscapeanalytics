"use client"

import { ArrowUpRight, ArrowDownRight, Users, BarChart, Database, HardDrive } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  trend: "up" | "down" | "neutral"
  change: string
  icon: React.ReactNode
  details?: { label: string; value: string | number }[]
}

function StatsCard({ title, value, trend, change, icon, details }: StatsCardProps) {
  // Create an icon component based on the trend
  const TrendIcon = () => {
    if (trend === "up") {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />
    } else if (trend === "down") {
      return <ArrowDownRight className="h-4 w-4 text-red-500" />
    }
    return null
  }

  return (
    <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all group">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-700/70 via-red-500/70 to-red-700/70 opacity-80 group-hover:opacity-100 transition-opacity"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="bg-background rounded-full p-1 opacity-70 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <div className="flex items-center">
            <TrendIcon />
            <span className={`ml-1 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
              {change}
            </span>
          </div>
          <div className="text-muted-foreground">since last month</div>
        </div>
        {details && details.length > 0 && (
          <div className="space-y-2 mt-2">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-center justify-between border-t border-border/5 pt-2">
                <span className="text-xs text-muted-foreground">{detail.label}</span>
                <span className="text-xs font-medium">{detail.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface DashboardStatsCardsProps {
  stats: {
    totalUsers: number
    activeProjects: number
    apiCalls: number
    dataProcessed: number
  }
}

export function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      trend: "up" as const,
      change: "+12.5%",
      icon: <Users className="h-4 w-4 text-blue-500" />,
      details: [
        { label: "Active Today", value: Math.round(stats.totalUsers * 0.18).toLocaleString() },
        { label: "New This Week", value: Math.round(stats.totalUsers * 0.04).toLocaleString() }
      ]
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      trend: "up" as const,
      change: "+7.2%",
      icon: <BarChart className="h-4 w-4 text-emerald-500" />,
      details: [
        { label: "Completed", value: Math.round(stats.activeProjects * 0.7) },
        { label: "In Progress", value: Math.round(stats.activeProjects * 0.3) }
      ]
    },
    {
      title: "API Calls",
      value: (stats.apiCalls / 1000000).toFixed(1) + 'M',
      trend: "up" as const,
      change: "+23.1%",
      icon: <Database className="h-4 w-4 text-purple-500" />,
      details: [
        { label: "Success Rate", value: "99.8%" },
        { label: "Avg Response", value: "42ms" }
      ]
    },
    {
      title: "Data Processed",
      value: stats.dataProcessed.toFixed(1) + ' TB',
      trend: "down" as const,
      change: "-3.4%",
      icon: <HardDrive className="h-4 w-4 text-amber-500" />,
      details: [
        { label: "Processing Time", value: "4.3s" },
        { label: "Cache Hit Rate", value: "76%" }
      ]
    }
  ]

  return (
    <>
      {statsCards.map((stat, index) => (
        <StatsCard 
          key={`stat-card-${index}`}
          title={stat.title}
          value={stat.value}
          trend={stat.trend}
          change={stat.change}
          icon={stat.icon}
          details={stat.details}
        />
      ))}
    </>
  )
} 