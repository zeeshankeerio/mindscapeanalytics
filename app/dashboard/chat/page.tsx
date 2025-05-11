"use client"

import { useState } from "react"
import { MessageSquare, Plus, Search, User, Users, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import UnifiedChat from "@/components/unified-chat"

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<string>("team")
  
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Chat</h1>
          <p className="text-muted-foreground">
            Communicate with your team and AI assistants
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
        {/* Left sidebar - Chat navigation */}
        <div className="md:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Conversations</CardTitle>
              
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search chats..." className="pl-8" />
              </div>
            </CardHeader>
            <Tabs defaultValue="recent" className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
                <TabsTrigger value="team" className="flex-1">Team</TabsTrigger>
                <TabsTrigger value="ai" className="flex-1">AI</TabsTrigger>
              </TabsList>
            </Tabs>
            <CardContent className="p-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4 pt-4">
                <div className="space-y-1 pb-4">
                  {conversations.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setActiveChat(chat.id)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-sm transition-colors duration-200 ${
                        activeChat === chat.id ? "bg-accent" : "hover:bg-accent/50"
                      }`}
                    >
                      <div>
                        {chat.isGroup ? (
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4" />
                          </div>
                        ) : chat.isAI ? (
                          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                        ) : (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback className="bg-primary/10">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <div className="flex-1 truncate text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">{chat.name}</span>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <div className="p-3 border-t">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                New AI Chat
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Main chat area */}
        <div className="md:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="border-b flex flex-row items-center p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Chat</CardTitle>
                  <CardDescription>Powered by Mindscape AI</CardDescription>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <Badge variant="outline">Draft</Badge>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <div className="flex-1 relative">
              {/* Embedding our unified chat component */}
              <div className="absolute inset-0">
                <UnifiedChat 
                  initialStyle="floating" 
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

// Sample data for conversations
const conversations = [
  {
    id: "ai-1",
    name: "AI Assistant",
    lastMessage: "I can help you with that issue...",
    time: "2m",
    avatar: "",
    isGroup: false,
    isAI: true,
  },
  {
    id: "team",
    name: "Product Team",
    lastMessage: "Sarah: The new feature looks great!",
    time: "10m",
    avatar: "",
    isGroup: true,
    isAI: false,
  },
  {
    id: "alex",
    name: "Alex Johnson",
    lastMessage: "Let's review the dashboard design...",
    time: "1h",
    avatar: "",
    isGroup: false,
    isAI: false,
  },
  {
    id: "ai-2",
    name: "Code Assistant",
    lastMessage: "Here's the API integration code...",
    time: "3h",
    avatar: "",
    isGroup: false,
    isAI: true,
  },
  {
    id: "marketing",
    name: "Marketing Team",
    lastMessage: "Michael: Campaign stats are in!",
    time: "5h",
    avatar: "",
    isGroup: true,
    isAI: false,
  },
  {
    id: "jessica",
    name: "Jessica Chen",
    lastMessage: "Can you share the presentation?",
    time: "1d",
    avatar: "",
    isGroup: false,
    isAI: false,
  },
  {
    id: "ai-3",
    name: "Data Analysis",
    lastMessage: "I've analyzed the quarterly results...",
    time: "2d",
    avatar: "",
    isGroup: false,
    isAI: true,
  },
] 