"use client"

import { Cpu, Memory, Database, Network } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface SystemHealthProps {
  data: {
    cpu: number
    memory: number
    storage: number
    network: number
  }
}

function HealthMeter({ 
  value, 
  label, 
  icon 
}: { 
  value: number, 
  label: string, 
  icon: React.ReactNode 
}) {
  // Determine color based on value
  let color = ""
  if (value < 50) {
    color = "bg-green-500"
  } else if (value < 75) {
    color = "bg-yellow-500"
  } else {
    color = "bg-red-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-muted/40 rounded-md">{icon}</div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className={`text-sm font-medium ${
          value < 50 ? 'text-green-500' : 
          value < 75 ? 'text-yellow-500' : 
          'text-red-500'
        }`}>
          {value}%
        </span>
      </div>
      <Progress value={value} className="h-1.5" indicatorClassName={color} />
    </div>
  )
}

export function SystemHealth({ data }: SystemHealthProps) {
  const metrics = [
    {
      label: "CPU Usage",
      value: data.cpu,
      icon: <Cpu className="h-4 w-4" />
    },
    {
      label: "Memory Usage",
      value: data.memory,
      icon: <Memory className="h-4 w-4" />
    },
    {
      label: "Storage Usage",
      value: data.storage,
      icon: <Database className="h-4 w-4" />
    },
    {
      label: "Network Load",
      value: data.network,
      icon: <Network className="h-4 w-4" />
    }
  ]

  return (
    <div className="space-y-6">
      {metrics.map((metric, index) => (
        <HealthMeter
          key={index}
          label={metric.label}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </div>
  )
} 