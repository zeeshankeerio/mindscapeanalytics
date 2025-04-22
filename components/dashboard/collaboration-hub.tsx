"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  UserCircle,
  Send,
  FileText,
  Image as ImageIcon,
  PlusCircle,
  Share2,
  CalendarDays,
  Link as LinkIcon,
  MoreHorizontal,
  Paperclip
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

// Types
interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  status: "online" | "away" | "offline" | "busy"
  lastActive?: string
}

interface Message {
  id: string
  content: string
  sender: string
  senderId: string
  timestamp: Date
  isRead: boolean
  attachments?: {
    id: string
    name: string
    type: "image" | "document" | "link"
    url: string
    thumbnailUrl?: string
    size?: string
  }[]
}

interface Task {
  id: string
  title: string
  description?: string
  assignee?: string
  assigneeId?: string
  status: "todo" | "in-progress" | "in-review" | "completed"
  priority: "low" | "medium" | "high"
  dueDate?: Date
  createdBy: string
  createdAt: Date
  tags?: string[]
  comments?: number
}

interface TeamActivity {
  id: string
  type: "task_created" | "task_completed" | "comment_added" | "file_shared" | "model_deployed" | "joined" | "left"
  userId: string
  userName: string
  timestamp: Date
  details: {
    title?: string
    description?: string
    targetId?: string
    targetType?: string
  }
}

// Mock data
const mockTeamMembers: TeamMember[] = [
  {
    id: "user-1",
    name: "Alex Morgan",
    email: "alex@mindscape.ai",
    avatar: "/avatars/alex.jpg",
    role: "Data Scientist",
    status: "online",
    lastActive: "Now"
  },
  {
    id: "user-2",
    name: "Jordan Lee",
    email: "jordan@mindscape.ai",
    avatar: "/avatars/jordan.jpg",
    role: "ML Engineer",
    status: "busy",
    lastActive: "2m ago"
  },
  {
    id: "user-3",
    name: "Taylor Swift",
    email: "taylor@mindscape.ai",
    avatar: "/avatars/taylor.jpg",
    role: "Project Manager",
    status: "online",
    lastActive: "Now"
  },
  {
    id: "user-4",
    name: "Sam Chen",
    email: "sam@mindscape.ai",
    role: "DevOps Engineer",
    status: "away",
    lastActive: "15m ago"
  },
  {
    id: "user-5",
    name: "Jamie Rodriguez",
    email: "jamie@mindscape.ai",
    role: "UI/UX Designer",
    status: "offline",
    lastActive: "2h ago"
  }
]

const mockMessages: Message[] = [
  {
    id: "msg-1",
    content: "I've just finished fine-tuning the image classification model. The accuracy improved by 3.2% compared to our baseline.",
    sender: "Alex Morgan",
    senderId: "user-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    isRead: true
  },
  {
    id: "msg-2",
    content: "Great work! Have you pushed the updated weights to the model registry?",
    sender: "Jordan Lee",
    senderId: "user-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
    isRead: true
  },
  {
    id: "msg-3",
    content: "Yes, it's in the prod registry under 'image-classifier-v2.3'. I've also added performance benchmarks in the documentation.",
    sender: "Alex Morgan",
    senderId: "user-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 7), // 7 minutes ago
    isRead: true,
    attachments: [
      {
        id: "attach-1",
        name: "performance_metrics.pdf",
        type: "document",
        url: "/documents/performance_metrics.pdf",
        size: "1.2MB"
      }
    ]
  },
  {
    id: "msg-4",
    content: "Our customer call with Acme Inc. is scheduled for tomorrow at 2 PM. We'll be presenting the new features and performance improvements.",
    sender: "Taylor Swift",
    senderId: "user-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    isRead: true
  },
  {
    id: "msg-5",
    content: "I'll prepare the demo environment. Should we run it on the staging server or create a dedicated demo instance?",
    sender: "Sam Chen",
    senderId: "user-4",
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    isRead: false
  }
]

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Optimize model inference time",
    description: "Implement batch processing and model quantization to reduce inference time by at least 20%",
    assignee: "Jordan Lee",
    assigneeId: "user-2",
    status: "in-progress",
    priority: "high",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    createdBy: "Taylor Swift",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    tags: ["optimization", "performance"],
    comments: 8
  },
  {
    id: "task-2",
    title: "Create API documentation",
    description: "Document all endpoint parameters, response structures, and authentication methods",
    assignee: "Jamie Rodriguez",
    assigneeId: "user-5",
    status: "todo",
    priority: "medium",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    createdBy: "Taylor Swift",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    tags: ["documentation", "api"],
    comments: 2
  },
  {
    id: "task-3",
    title: "Fix data preprocessing pipeline",
    description: "Resolve the race condition in the data preprocessing step that causes occasional data corruption",
    assignee: "Alex Morgan",
    assigneeId: "user-1",
    status: "completed",
    priority: "high",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    createdBy: "Sam Chen",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    tags: ["bugfix", "data-pipeline"],
    comments: 12
  },
  {
    id: "task-4",
    title: "Implement user feedback collection",
    description: "Add feedback collection mechanism for AI-generated responses with thumbs up/down and comment options",
    assignee: "Taylor Swift",
    assigneeId: "user-3",
    status: "in-review",
    priority: "medium",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day from now
    createdBy: "Alex Morgan",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    tags: ["feedback", "ux"],
    comments: 5
  }
]

const mockActivities: TeamActivity[] = [
  {
    id: "activity-1",
    type: "model_deployed",
    userId: "user-2",
    userName: "Jordan Lee",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    details: {
      title: "Deployed sentiment-analysis-v1.2 to production",
      targetType: "model",
      targetId: "model-12345"
    }
  },
  {
    id: "activity-2",
    type: "task_completed",
    userId: "user-1",
    userName: "Alex Morgan",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    details: {
      title: "Completed: Fix data preprocessing pipeline",
      targetType: "task",
      targetId: "task-3"
    }
  },
  {
    id: "activity-3",
    type: "file_shared",
    userId: "user-3",
    userName: "Taylor Swift",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    details: {
      title: "Shared Q3 Project Roadmap.pdf",
      targetType: "file",
      targetId: "file-456"
    }
  },
  {
    id: "activity-4",
    type: "comment_added",
    userId: "user-5",
    userName: "Jamie Rodriguez",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    details: {
      title: "Commented on 'Create API documentation'",
      targetType: "task",
      targetId: "task-2"
    }
  },
  {
    id: "activity-5",
    type: "task_created",
    userId: "user-4",
    userName: "Sam Chen",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    details: {
      title: "Created: Update Docker base images",
      targetType: "task",
      targetId: "task-5"
    }
  }
]

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500"
    case "busy":
      return "bg-red-500"
    case "away":
      return "bg-yellow-500"
    case "offline":
      return "bg-gray-400"
    default:
      return "bg-gray-400"
  }
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

const getRelativeTime = (date: Date) => {
  const now = new Date()
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffSeconds < 60) return `${diffSeconds}s ago`
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`
  return `${Math.floor(diffSeconds / 86400)}d ago`
}

const getTaskStatusColor = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-gray-500"
    case "in-progress":
      return "bg-blue-500"
    case "in-review":
      return "bg-yellow-500"
    case "completed":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "low":
      return "bg-green-500/20 text-green-500 border-green-500/30"
    case "medium":
      return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
    case "high":
      return "bg-red-500/20 text-red-500 border-red-500/30"
    default:
      return "bg-blue-500/20 text-blue-500 border-blue-500/30"
  }
}

// Component
export function CollaborationHub() {
  const [activeTab, setActiveTab] = useState("chat")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [activities, setActivities] = useState<TeamActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTeamMembers(mockTeamMembers)
      setMessages(mockMessages)
      setTasks(mockTasks)
      setActivities(mockActivities)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Scroll to bottom of messages
    if (messagesEndRef.current && !isLoading) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading, activeTab])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      sender: "You",
      senderId: "current-user",
      timestamp: new Date(),
      isRead: true
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const renderMemberStatus = (member: TeamMember) => (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${getStatusColor(member.status)}`} />
      <span className="text-xs capitalize">{member.status}</span>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Collaboration</h2>
          <p className="text-muted-foreground">
            Work together with your team in real-time
          </p>
        </div>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Meeting
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        {/* Team Members */}
        <Card className="lg:col-span-1 bg-background/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                <Users className="h-4 w-4 inline mr-2" />
                Team Members
              </CardTitle>
              <Badge variant="secondary">{teamMembers.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-1">
            <ScrollArea className="h-[320px] pr-4">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-3 w-[80px]" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-1">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-primary/5 transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        {member.avatar ? (
                          <AvatarImage src={member.avatar} alt={member.name} />
                        ) : null}
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{member.name}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground truncate">
                            {member.role}
                          </p>
                          {renderMemberStatus(member)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Invite Team Member
            </Button>
          </CardFooter>
        </Card>

        {/* Main Collaboration Area */}
        <Card className="lg:col-span-3 bg-background/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-0">
                <TabsTrigger value="chat">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Team Chat
                </TabsTrigger>
                <TabsTrigger value="tasks">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <Clock className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pb-1">
            <TabsContent value="chat" className="mt-0 space-y-4">
              <ScrollArea className="h-[320px] pr-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-3 w-[60px]" />
                          </div>
                          <Skeleton className="h-16 w-full rounded-md" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <motion.div 
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{getInitials(message.sender)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{message.sender}</span>
                            <span className="text-xs text-muted-foreground">
                              {getRelativeTime(message.timestamp)}
                            </span>
                          </div>
                          <div className="mt-1 text-sm bg-primary/5 p-3 rounded-md">
                            {message.content}
                          </div>
                          {message.attachments?.length ? (
                            <div className="mt-2 flex items-center gap-2">
                              {message.attachments.map((attachment) => (
                                <div 
                                  key={attachment.id}
                                  className="flex items-center gap-2 bg-background p-2 rounded-md border border-border text-xs"
                                >
                                  {attachment.type === "document" ? (
                                    <FileText className="h-3 w-3 text-blue-500" />
                                  ) : attachment.type === "image" ? (
                                    <ImageIcon className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <LinkIcon className="h-3 w-3 text-purple-500" />
                                  )}
                                  <span>{attachment.name}</span>
                                  {attachment.size && (
                                    <span className="text-muted-foreground">({attachment.size})</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-0">
              <ScrollArea className="h-[320px] pr-4">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="mb-3">
                      <Skeleton className="h-[100px] w-full rounded-md" />
                    </div>
                  ))
                ) : (
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-primary/5 p-3 rounded-md border border-primary/10"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getTaskStatusColor(task.status)}`} />
                              <h4 className="font-medium text-sm">{task.title}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {task.description}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Task</DropdownMenuItem>
                              <DropdownMenuItem>Change Status</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {task.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs py-0 h-5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Badge className={`py-0 h-5 font-normal ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                            {task.dueDate && (
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <CalendarDays className="h-3 w-3" />
                                {task.dueDate.toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {task.assignee && (
                              <div className="flex items-center gap-1">
                                <UserCircle className="h-3 w-3 text-muted-foreground" />
                                <span>{task.assignee}</span>
                              </div>
                            )}
                            {task.comments !== undefined && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <MessageSquare className="h-3 w-3" />
                                <span>{task.comments}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-0">
              <ScrollArea className="h-[320px] pr-4">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3 mb-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-[70%]" />
                        <Skeleton className="h-3 w-[40%]" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="relative pl-6 border-l border-border/50 ml-4 space-y-6">
                    {activities.map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                      >
                        <div className="absolute -left-10 mt-1">
                          <Avatar className="h-7 w-7 border-2 border-background">
                            <AvatarFallback>{getInitials(activity.userName)}</AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="bg-primary/5 p-3 rounded-md">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm">{activity.details.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium">{activity.userName}</span>
                                <span className="text-xs text-muted-foreground">
                                  {getRelativeTime(activity.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </CardContent>
          <CardFooter>
            {activeTab === "chat" && (
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon" type="button" variant="ghost">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            )}
            {activeTab === "tasks" && (
              <Button className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Task
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 