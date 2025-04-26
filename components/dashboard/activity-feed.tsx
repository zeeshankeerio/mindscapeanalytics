"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Users,
  FileUp,
  Database,
  Settings,
  BrainCircuit,
  BarChart,
  MoreVertical
} from "lucide-react"
import { format } from "date-fns"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

type ActivityType = "alert" | "success" | "info" | "warning" | "update"

interface Activity {
  id: string
  type: ActivityType
  title: string
  message?: string
  timestamp: Date
  user?: string
  icon?: React.ReactNode
}

// Sample data for the activity feed
const activityData: Activity[] = [
  {
    id: "1",
    type: "success",
    title: "Model deployment successful",
    message: "NLP sentiment model v2.3 deployed to production",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    user: "Sarah Johnson",
    icon: <BrainCircuit className="h-4 w-4" />
  },
  {
    id: "2",
    type: "info",
    title: "Dataset uploaded",
    message: "Customer feedback dataset (5.2GB) uploaded successfully",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    user: "David Kim",
    icon: <FileUp className="h-4 w-4" />
  },
  {
    id: "3",
    type: "alert",
    title: "System alert",
    message: "High CPU usage detected (92%) on inference cluster",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    icon: <AlertCircle className="h-4 w-4" />
  },
  {
    id: "4",
    type: "update",
    title: "API updated",
    message: "Vision API v3.1 released with improved facial recognition",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    user: "System",
    icon: <Settings className="h-4 w-4" />
  },
  {
    id: "5",
    type: "success",
    title: "Training complete",
    message: "Image classification model trained with 98.7% accuracy",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28),
    user: "Alex Rodriguez",
    icon: <CheckCircle className="h-4 w-4" />
  },
  {
    id: "6",
    type: "warning",
    title: "Low disk space",
    message: "Storage node 3 is at 87% capacity",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30),
    icon: <Database className="h-4 w-4" />
  },
  {
    id: "7",
    type: "info",
    title: "Team collaboration",
    message: "Michelle invited you to project 'Customer Churn Analysis'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    user: "Michelle Watson",
    icon: <Users className="h-4 w-4" />
  }
]

// Function to format the timestamp
function formatActivityTime(timestamp: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) {
    return "just now"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 60 * 24) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours}h ago`
  } else if (diffInMinutes < 60 * 24 * 7) {
    const days = Math.floor(diffInMinutes / (60 * 24))
    return `${days}d ago`
  } else {
    return format(timestamp, "MMM d, yyyy")
  }
}

// Function to get the color based on activity type
function getActivityColor(type: ActivityType): string {
  switch (type) {
    case "success":
      return "text-green-500 bg-green-500/10"
    case "alert":
      return "text-red-500 bg-red-500/10"
    case "warning":
      return "text-yellow-500 bg-yellow-500/10"
    case "update":
      return "text-purple-500 bg-purple-500/10"
    case "info":
    default:
      return "text-blue-500 bg-blue-500/10"
  }
}

// Function to get the icon based on activity type
function getDefaultIcon(type: ActivityType): React.ReactNode {
  switch (type) {
    case "success":
      return <CheckCircle className="h-4 w-4" />
    case "alert":
      return <AlertCircle className="h-4 w-4" />
    case "warning":
      return <AlertCircle className="h-4 w-4" />
    case "update":
      return <FileText className="h-4 w-4" />
    case "info":
    default:
      return <Clock className="h-4 w-4" />
  }
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(activityData)

  const handleClearActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id))
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4 pr-3">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-center">
            <Clock className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">
              Activity will appear here as you use the platform
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 text-sm border-b border-border/40 pb-3"
            >
              <div className={`rounded-full p-1.5 ${getActivityColor(activity.type)} flex-shrink-0 mt-0.5`}>
                {activity.icon || getDefaultIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium leading-none mb-1">{activity.title}</p>
                    {activity.message && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                        {activity.message}
                      </p>
                    )}
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{formatActivityTime(activity.timestamp)}</span>
                      {activity.user && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{activity.user}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 -mr-2 text-muted-foreground/70 hover:text-foreground" 
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleClearActivity(activity.id)}>
                        Dismiss
                      </DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
} 