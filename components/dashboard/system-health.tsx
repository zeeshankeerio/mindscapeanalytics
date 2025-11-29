"use client"

import { useEffect, useState } from "react"
import { Cpu, HardDrive, Database, Network, AlertTriangle, ArrowUp, ArrowDown, Minus, LayoutGrid } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import systemMonitor, { SystemHealth as SystemHealthType, SystemMetricData } from "@/lib/system-monitor"

interface SystemHealthProps {
  data?: {
    cpu: number
    memory: number
    storage: number
    network: number
    gpu?: number
  }
}

function HealthMeter({ 
  label, 
  icon,
  metric,
  showBadge = true
}: { 
  label: string, 
  icon: React.ReactNode,
  metric: SystemMetricData,
  showBadge?: boolean
}) {
  // Determine color based on value
  let color = "bg-green-500"
  if (metric.status === "critical") {
    color = "bg-red-500"
  } else if (metric.status === "warning") {
    color = "bg-yellow-500"
  }

  // Get trend icon
  const renderTrendIcon = () => {
    if (metric.trend === "increasing") {
      return <ArrowUp className={`h-3 w-3 ${metric.status === "critical" ? "text-red-500" : metric.status === "warning" ? "text-yellow-500" : "text-green-500"}`} />
    }
    if (metric.trend === "decreasing") {
      return <ArrowDown className={`h-3 w-3 ${metric.status === "normal" ? "text-green-500" : "text-blue-500"}`} />
    }
    return <Minus className="h-3 w-3 text-gray-500" />
  }

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 ${metric.status === "critical" ? "bg-red-900/30" : metric.status === "warning" ? "bg-yellow-900/30" : "bg-green-900/30"} rounded-md`}>
            {icon}
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        
        <div className="flex items-center gap-1">
          {showBadge && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant={metric.status === "critical" ? "destructive" : metric.status === "warning" ? "default" : "outline"}
                    className="h-5 text-xs font-normal gap-1"
                  >
                    {renderTrendIcon()}
                    {metric.trend}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Metric is {metric.trend} over time</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <span className={`text-sm font-medium ${
            metric.status === "critical" ? 'text-red-500' : 
            metric.status === "warning" ? 'text-yellow-500' : 
            'text-green-500'
          }`}>
            {metric.value.toFixed(1)}%
          </span>
        </div>
      </div>
      
      <Progress 
        value={metric.value} 
        className={`h-1.5 ${color}`}
      />
      
      {metric.status === "critical" && (
        <motion.div 
          className="flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs text-red-500 bg-red-950/30 border border-red-900/50"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <AlertTriangle className="h-3 w-3" />
          <span>Critical threshold exceeded</span>
        </motion.div>
      )}
    </motion.div>
  )
}

export function SystemHealth({ data }: SystemHealthProps) {
  const [systemHealth, setSystemHealth] = useState<SystemHealthType | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Initialize with the passed data if available
    if (data) {
      const initialHealth: SystemHealthType = {
        cpu: {
          value: data.cpu,
          timestamp: Date.now(),
          status: data.cpu > 80 ? 'critical' : data.cpu > 65 ? 'warning' : 'normal',
          trend: 'stable'
        },
        memory: {
          value: data.memory,
          timestamp: Date.now(),
          status: data.memory > 80 ? 'critical' : data.memory > 65 ? 'warning' : 'normal',
          trend: 'stable'
        },
        storage: {
          value: data.storage,
          timestamp: Date.now(),
          status: data.storage > 80 ? 'critical' : data.storage > 65 ? 'warning' : 'normal',
          trend: 'stable'
        },
        network: {
          value: data.network,
          timestamp: Date.now(),
          status: data.network > 80 ? 'critical' : data.network > 65 ? 'warning' : 'normal',
          trend: 'stable'
        },
        gpu: {
          value: data.gpu || 0,
          timestamp: Date.now(),
          status: (data.gpu || 0) > 80 ? 'critical' : (data.gpu || 0) > 65 ? 'warning' : 'normal',
          trend: 'stable'
        },
        overall: {
          status: 'normal',
          uptime: 0,
          lastRefreshed: Date.now()
        }
      };
      
      setSystemHealth(initialHealth);
      setLoading(false);
    } else {
      // Get initial health from the monitor
      setSystemHealth(systemMonitor.getHealth());
      setLoading(false);
      
      // Subscribe to updates
      const handleUpdate = (health: SystemHealthType) => {
        setSystemHealth(health);
      };
      
      systemMonitor.on('updated', handleUpdate);
      
      // Cleanup subscription on unmount
      return () => {
        systemMonitor.off('updated', handleUpdate);
      };
    }
  }, [data]);

  if (loading || !systemHealth) {
    return (
      <div className="space-y-6 animate-pulse">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-5 w-24 bg-muted rounded"></div>
              <div className="h-5 w-12 bg-muted rounded"></div>
            </div>
            <div className="h-1.5 bg-muted rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      label: "CPU Usage",
      icon: <Cpu className="h-4 w-4" />,
      metric: systemHealth.cpu
    },
    {
      label: "Memory Usage",
      icon: <HardDrive className="h-4 w-4" />,
      metric: systemHealth.memory
    },
    {
      label: "Storage Usage",
      icon: <Database className="h-4 w-4" />,
      metric: systemHealth.storage
    },
    {
      label: "Network Load",
      icon: <Network className="h-4 w-4" />,
      metric: systemHealth.network
    },
    {
      label: "GPU Usage",
      icon: <LayoutGrid className="h-4 w-4" />,
      metric: systemHealth.gpu
    }
  ]

  return (
    <div className="space-y-6">
      {/* Overall system status */}
      <div className={`mb-3 p-2 rounded-md text-sm 
        ${systemHealth.overall.status === 'critical' ? 'bg-red-950/30 text-red-400 border border-red-900/50' : 
          systemHealth.overall.status === 'warning' ? 'bg-yellow-950/30 text-yellow-400 border border-yellow-900/50' : 
          'bg-green-950/30 text-green-400 border border-green-900/50'}`}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">System Status:</span>
          <Badge variant={
            systemHealth.overall.status === 'critical' ? 'destructive' : 
            systemHealth.overall.status === 'warning' ? 'default' : 
            'secondary'
          }>
            {systemHealth.overall.status.toUpperCase()}
          </Badge>
        </div>
        <div className="mt-1 text-xs opacity-80">
          Uptime: {Math.floor(systemHealth.overall.uptime / 3600)}h {Math.floor((systemHealth.overall.uptime % 3600) / 60)}m
        </div>
      </div>
      
      {metrics.map((metric, index) => (
        <HealthMeter
          key={index}
          label={metric.label}
          icon={metric.icon}
          metric={metric.metric}
        />
      ))}
      
      <div className="text-xs text-muted-foreground flex justify-between items-center mt-2 pt-2 border-t border-muted">
        <span>Last updated: {new Date(systemHealth.overall.lastRefreshed).toLocaleTimeString()}</span>
        <button 
          onClick={() => systemMonitor.forceRefresh()}
          className="text-xs hover:text-primary transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  )
} 