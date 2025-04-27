"use client"

import { ArrowUpRight, ArrowDownRight, Users, BarChart, Database, HardDrive } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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
      return <ArrowUpRight className="h-3 w-3 text-green-500" />
    } else if (trend === "down") {
      return <ArrowDownRight className="h-3 w-3 text-red-500" />
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="relative overflow-hidden shadow-md bg-zinc-900/50 backdrop-blur-md border-white/5 h-full hover:shadow-xl transition-all group">
        {/* Glowing edge accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-600/80 via-red-500/60 to-red-600/80 opacity-80 group-hover:opacity-100 group-hover:w-1 transition-all"></div>
        
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 to-black/40 opacity-70"></div>
        
        {/* Glass reflection effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/5 to-transparent transform -skew-y-6"></div>
        </div>
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 sm:px-4 relative z-10">
          <CardTitle className="text-xs font-medium text-zinc-400">
            {title}
          </CardTitle>
          <div className="bg-black/40 rounded-full p-1.5 shadow-inner border border-white/5 opacity-80 group-hover:opacity-100 group-hover:border-red-500/20 transition-all transform group-hover:scale-110 duration-300">
            {icon}
          </div>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 relative z-10">
          <div className="text-lg sm:text-xl font-bold text-white">{value}</div>
          <div className="flex items-center space-x-1 text-xs text-zinc-400 mt-0.5">
            <div className="flex items-center">
              <TrendIcon />
              <span className={`ml-1 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                {change}
              </span>
            </div>
            <div className="text-zinc-500 text-[10px]">since last month</div>
          </div>
          {details && details.length > 0 && (
            <div className="space-y-1 mt-2">
              {details.map((detail, idx) => (
                <div key={idx} className="flex items-center justify-between border-t border-white/5 pt-1">
                  <span className="text-[10px] text-zinc-500">{detail.label}</span>
                  <span className="text-[10px] font-medium text-zinc-300">{detail.value}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
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
      icon: <Users className="h-3.5 w-3.5 text-blue-500" />,
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
      icon: <BarChart className="h-3.5 w-3.5 text-emerald-500" />,
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
      icon: <Database className="h-3.5 w-3.5 text-purple-500" />,
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
      icon: <HardDrive className="h-3.5 w-3.5 text-amber-500" />,
      details: [
        { label: "Processing Time", value: "4.3s" },
        { label: "Cache Hit Rate", value: "76%" }
      ]
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  )
} 