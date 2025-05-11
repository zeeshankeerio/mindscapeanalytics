"use client"

import { useState } from "react"
import { 
  GitCommit, 
  FileCode, 
  MessageSquare, 
  GitPullRequest, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileQuestion,
  Users,
  CircleUser
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "commit" | "pull_request" | "comment" | "review" | "task" | "meeting"
  title: string
  description?: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  project?: string
  timestamp: string
  status?: "completed" | "in-progress" | "pending" | "declined"
}

const mockActivities: Activity[] = [
  {
    id: "a1",
    type: "commit",
    title: "Updated prediction model accuracy",
    description: "Improved model accuracy by 15% with hyperparameter tuning",
    user: { id: "u2", name: "Jamie Chen", avatar: "/images/avatars/jamie.jpg" },
    project: "Predictive Analytics Dashboard",
    timestamp: "2023-08-01T10:30:00Z"
  },
  {
    id: "a2",
    type: "pull_request",
    title: "Add NLP sentiment analysis feature",
    description: "PR #241: Implement sentiment analysis for customer feedback",
    user: { id: "u4", name: "Jordan Lee", avatar: "/images/avatars/jordan.jpg" },
    project: "NLP Content Analyzer",
    timestamp: "2023-08-01T09:15:00Z",
    status: "in-progress"
  },
  {
    id: "a3",
    type: "comment",
    title: "Updated infrastructure diagram",
    description: "Looks good! Let's schedule a review meeting.",
    user: { id: "u5", name: "Casey Kim", avatar: "/images/avatars/casey.jpg" },
    project: "Cloud Migration Strategy",
    timestamp: "2023-08-01T08:45:00Z"
  },
  {
    id: "a4",
    type: "review",
    title: "Code review: Image recognition module",
    user: { id: "u6", name: "Riley Brown", avatar: "/images/avatars/riley.jpg" },
    project: "Computer Vision Prototype",
    timestamp: "2023-07-31T16:20:00Z",
    status: "completed"
  },
  {
    id: "a5",
    type: "task",
    title: "Optimize database queries",
    description: "Reduced query time by 40% using indexing",
    user: { id: "u1", name: "Alex Morgan", avatar: "/images/avatars/alex.jpg" },
    project: "Predictive Analytics Dashboard",
    timestamp: "2023-07-31T14:10:00Z",
    status: "completed"
  },
  {
    id: "a6",
    type: "meeting",
    title: "Weekly sprint planning",
    description: "Set priorities for the next sprint cycle",
    user: { id: "u3", name: "Taylor Smith", avatar: "/images/avatars/taylor.jpg" },
    project: "NLP Content Analyzer",
    timestamp: "2023-07-31T11:00:00Z"
  },
  {
    id: "a7",
    type: "pull_request",
    title: "Infrastructure as code templates",
    description: "PR #187: Terraform templates for cloud resources",
    user: { id: "u5", name: "Casey Kim", avatar: "/images/avatars/casey.jpg" },
    project: "Cloud Migration Strategy",
    timestamp: "2023-07-30T15:30:00Z",
    status: "completed"
  }
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "commit":
      return <GitCommit className="h-4 w-4" />;
    case "pull_request":
      return <GitPullRequest className="h-4 w-4" />;
    case "comment":
      return <MessageSquare className="h-4 w-4" />;
    case "review":
      return <FileCode className="h-4 w-4" />;
    case "task":
      return <CheckCircle2 className="h-4 w-4" />;
    case "meeting":
      return <Users className="h-4 w-4" />;
    default:
      return <FileQuestion className="h-4 w-4" />;
  }
};

const getStatusColor = (status: Activity["status"]) => {
  switch (status) {
    case "completed":
      return "text-green-600";
    case "in-progress":
      return "text-blue-600";
    case "pending":
      return "text-amber-600";
    case "declined":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }
  
  return seconds < 10 ? "just now" : `${seconds} seconds ago`;
};

export function TeamActivity() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredActivities = activeTab === "all" 
    ? mockActivities 
    : mockActivities.filter(activity => activity.type === activeTab);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Team Activity</CardTitle>
        <CardDescription>
          Recent updates from your team members
        </CardDescription>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-2"
        >
          <TabsList className="grid grid-cols-7 h-9">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="commit">Commits</TabsTrigger>
            <TabsTrigger value="pull_request">PRs</TabsTrigger>
            <TabsTrigger value="comment">Comments</TabsTrigger>
            <TabsTrigger value="review">Reviews</TabsTrigger>
            <TabsTrigger value="task">Tasks</TabsTrigger>
            <TabsTrigger value="meeting">Meetings</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-6 pt-0 pb-2">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:h-full before:bg-border">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <div key={activity.id} className="relative pl-6">
                <div className="absolute left-0 rounded-full bg-background shadow p-1 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="grid grid-cols-[1fr,auto] gap-x-2 items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.title}</span>
                        {activity.status && (
                          <Badge variant="outline" className={cn("text-xs", getStatusColor(activity.status))}>
                            {activity.status}
                          </Badge>
                        )}
                      </div>
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                            <AvatarFallback className="text-[10px]">
                              {activity.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{activity.user.name}</span>
                        </div>
                        {activity.project && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span>{activity.project}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
                {index < filteredActivities.length - 1 && <div className="h-6" />}
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No activities found for this filter</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="ghost" size="sm" className="w-full">
          View all activity
        </Button>
      </CardFooter>
    </Card>
  )
} 