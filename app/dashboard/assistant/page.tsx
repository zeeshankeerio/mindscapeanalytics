"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bot, CornerRightUp, Layers, Sparkles, CheckCircle, Settings, Loader2, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

import UnifiedChat from "@/components/unified-chat"

export default function AssistantPage() {
  const [activeAssistant, setActiveAssistant] = useState<string | null>(null)
  
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get help with your tasks using our AI assistants
          </p>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          <Settings className="mr-2 h-4 w-4" />
          Configure
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        {/* Left column - Assistant selection */}
        <div className="md:col-span-1 flex flex-col space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Available Assistants</CardTitle>
              <CardDescription>
                Select an assistant to help with specific tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search assistants..." className="pl-8" />
              </div>
            </CardContent>
            <ScrollArea className="h-[400px] px-4">
              <div className="space-y-2 pb-4">
                {assistantOptions.map((assistant) => (
                  <button
                    key={assistant.id}
                    onClick={() => setActiveAssistant(assistant.id)}
                    className={`w-full flex items-start p-2 rounded-lg hover:bg-accent transition-colors duration-200 ${
                      activeAssistant === assistant.id ? "bg-accent" : ""
                    }`}
                  >
                    <div className="mr-2 mt-0.5">
                      <Avatar className="h-9 w-9 border border-primary/10">
                        <AvatarImage src={assistant.avatar} alt={assistant.name} />
                        <AvatarFallback className={assistant.bgColor}>
                          {assistant.icon}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">{assistant.name}</h3>
                        <Badge variant="outline" className="text-xs h-5">
                          {assistant.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {assistant.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentConversations.map((convo, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${convo.bgColor}`}>
                      {convo.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{convo.title}</p>
                      <p className="text-xs text-muted-foreground">{convo.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Chat interface */}
        <div className="md:col-span-2 flex flex-col space-y-4">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="border-b">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Mindscape Assistant</CardTitle>
                  <CardDescription>Powered by enhanced AI models</CardDescription>
                </div>
                <Badge variant="outline" className="ml-auto">Active</Badge>
              </div>
            </CardHeader>
            <div className="flex-1 relative">
              {/* Embedding our unified chat component */}
              <div className="absolute inset-0">
                <UnifiedChat 
                  initialStyle="sidebar" 
                  allowStyleToggle={false} 
                  theme="dashboard"
                  embedded={true}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Sample data for assistants
const assistantOptions = [
  {
    id: "general",
    name: "General Assistant",
    description: "Get help with any question about Mindscape AI platform and services",
    category: "General",
    avatar: "",
    bgColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    icon: <Bot className="h-4 w-4" />,
  },
  {
    id: "data-analysis",
    name: "Data Analyst",
    description: "Help with data processing, visualization, and insights extraction",
    category: "Analytics",
    avatar: "",
    bgColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    id: "code-assistant",
    name: "Code Helper",
    description: "Assistance with API integration, code snippets, and debugging",
    category: "Development",
    avatar: "",
    bgColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    icon: <CornerRightUp className="h-4 w-4" />,
  },
  {
    id: "creative",
    name: "Creative Assistant",
    description: "Help with content generation, ideas, and creative solutions",
    category: "Content",
    avatar: "",
    bgColor: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    id: "enterprise",
    name: "Enterprise Advisor",
    description: "Strategic guidance for enterprise implementation and optimization",
    category: "Business",
    avatar: "",
    bgColor: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    icon: <CheckCircle className="h-4 w-4" />,
  },
]

// Sample data for recent conversations
const recentConversations = [
  {
    title: "Platform integration help",
    date: "Today, 2:30 PM",
    bgColor: "bg-primary/10",
    icon: <Bot className="h-4 w-4" />,
  },
  {
    title: "Data visualization options",
    date: "Yesterday, 11:15 AM",
    bgColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    title: "API documentation questions",
    date: "Jun 15, 2023",
    bgColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    icon: <CornerRightUp className="h-4 w-4" />,
  },
] 