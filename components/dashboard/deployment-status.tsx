"use client"

import { useMemo } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DeploymentStatusProps { 
  status: "deployed" | "pending" | "failed";
  instances: number;
  region: string;
}

export function DeploymentStatus({ status, instances, region }: DeploymentStatusProps) {
  // Memoize the status color to prevent recalculation on re-renders
  const statusColor = useMemo(() => {
    switch (status) {
      case "deployed": return "text-green-500 bg-green-500/10";
      case "pending": return "text-yellow-500 bg-yellow-500/10";
      case "failed": return "text-red-500 bg-red-500/10";
      default: return "text-muted-foreground bg-muted";
    }
  }, [status]);
  
  // Memoize the status properties
  const statusProps = useMemo(() => {
    return {
      deployed: {
        animate: { scale: [1, 1.2, 1] },
        transition: { repeat: Infinity, duration: 2 }
      },
      pending: {
        animate: { scale: [1, 1.2, 1] },
        transition: { repeat: Infinity, duration: 1 }
      },
      failed: {
        animate: { scale: 1 },
        transition: { repeat: 0 }
      }
    }[status] || { animate: { scale: 1 }, transition: { repeat: 0 } };
  }, [status]);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            <div 
              className={`h-2 w-2 rounded-full ${statusColor.split(' ')[0]}`} 
              style={{ 
                animation: status === 'deployed' 
                  ? 'pulse 2s infinite' 
                  : status === 'pending' 
                    ? 'pulse 1s infinite' 
                    : 'none' 
              }} 
            />
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}>
              {status}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="text-xs space-y-1">
            <p className="font-semibold">Deployment Information</p>
            <p><span className="opacity-70">Status:</span> {status}</p>
            <p><span className="opacity-70">Region:</span> {region}</p>
            <p><span className="opacity-70">Active Instances:</span> {instances}</p>
            <p><span className="opacity-70">Last Updated:</span> {new Date().toLocaleString()}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Add keyframes for the pulse animation in global CSS
export const deploymentStatusStyles = `
@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
`; 