"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  MoreHorizontal, 
  Plus, 
  Search, 
  AlertTriangle,
  ChevronRight,
  ArrowUpRight,
  Users,
  Calendar
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TeamMember {
  id: string
  name: string
  avatar?: string
  role: string
}

interface Project {
  id: string
  name: string
  description: string
  status: "completed" | "in-progress" | "pending" | "at-risk"
  progress: number
  dueDate: string
  team: TeamMember[]
  priority: "low" | "medium" | "high"
}

const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Predictive Analytics Dashboard",
    description: "Real-time analytics dashboard with predictive insights for business metrics",
    status: "in-progress",
    progress: 68,
    dueDate: "2023-08-15",
    team: [
      { id: "u1", name: "Alex Morgan", avatar: "/images/avatars/alex.jpg", role: "Lead Developer" },
      { id: "u2", name: "Jamie Chen", avatar: "/images/avatars/jamie.jpg", role: "Data Scientist" },
      { id: "u3", name: "Taylor Smith", avatar: "/images/avatars/taylor.jpg", role: "UX Designer" }
    ],
    priority: "high"
  },
  {
    id: "p2",
    name: "NLP Content Analyzer",
    description: "Natural language processing tool for content analysis and recommendations",
    status: "at-risk",
    progress: 45,
    dueDate: "2023-09-01",
    team: [
      { id: "u2", name: "Jamie Chen", avatar: "/images/avatars/jamie.jpg", role: "Data Scientist" },
      { id: "u4", name: "Jordan Lee", avatar: "/images/avatars/jordan.jpg", role: "ML Engineer" }
    ],
    priority: "medium"
  },
  {
    id: "p3",
    name: "Cloud Migration Strategy",
    description: "Infrastructure migration plan to cloud-native architecture",
    status: "completed",
    progress: 100,
    dueDate: "2023-07-30",
    team: [
      { id: "u1", name: "Alex Morgan", avatar: "/images/avatars/alex.jpg", role: "Lead Developer" },
      { id: "u5", name: "Casey Kim", avatar: "/images/avatars/casey.jpg", role: "DevOps Engineer" }
    ],
    priority: "high"
  },
  {
    id: "p4",
    name: "Computer Vision Prototype",
    description: "Vision AI prototype for retail analytics and customer insights",
    status: "pending",
    progress: 0,
    dueDate: "2023-10-15",
    team: [
      { id: "u4", name: "Jordan Lee", avatar: "/images/avatars/jordan.jpg", role: "ML Engineer" },
      { id: "u6", name: "Riley Brown", avatar: "/images/avatars/riley.jpg", role: "Computer Vision Specialist" }
    ],
    priority: "low"
  }
];

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-500/20 text-green-600 border-green-600/20";
    case "in-progress":
      return "bg-blue-500/20 text-blue-600 border-blue-600/20";
    case "pending":
      return "bg-amber-500/20 text-amber-600 border-amber-600/20";
    case "at-risk":
      return "bg-red-500/20 text-red-600 border-red-600/20";
    default:
      return "bg-gray-500/20 text-gray-600 border-gray-600/20";
  }
};

const getStatusIcon = (status: Project["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-3 w-3" />;
    case "in-progress":
      return <Clock className="h-3 w-3" />;
    case "pending":
      return <Clock className="h-3 w-3" />;
    case "at-risk":
      return <AlertTriangle className="h-3 w-3" />;
    default:
      return null;
  }
};

const getPriorityBadge = (priority: Project["priority"]) => {
  switch (priority) {
    case "high":
      return <Badge variant="outline" className="border-red-200 bg-red-100 text-red-700">High</Badge>;
    case "medium":
      return <Badge variant="outline" className="border-amber-200 bg-amber-100 text-amber-700">Medium</Badge>;
    case "low":
      return <Badge variant="outline" className="border-green-200 bg-green-100 text-green-700">Low</Badge>;
    default:
      return null;
  }
};

export function ProjectOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredProjects(mockProjects);
      return;
    }
    
    const filtered = mockProjects.filter(project => 
      project.name.toLowerCase().includes(query) || 
      project.description.toLowerCase().includes(query) ||
      project.status.includes(query) ||
      project.team.some(member => member.name.toLowerCase().includes(query))
    );
    
    setFilteredProjects(filtered);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Project Overview</CardTitle>
          <CardDescription>
            Track progress across {mockProjects.length} active projects
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative w-60">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects..."
              className="pl-8 h-9"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button size="sm" className="h-9">
            <Plus className="h-4 w-4 mr-1" />
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2 px-6">
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden border-0 bg-background/30 hover:bg-background/80 transition-colors">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                        <div className="lg:col-span-5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-base flex items-center">
                                {project.name}
                                {getPriorityBadge(project.priority)}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={cn("h-6 flex items-center gap-1", getStatusColor(project.status))}>
                              {getStatusIcon(project.status)}
                              <span className="capitalize">{project.status.replace('-', ' ')}</span>
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{new Date(project.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-2">
                          <div className="flex -space-x-2">
                            {project.team.slice(0, 3).map(member => (
                              <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                                <AvatarImage 
                                  src={member.avatar} 
                                  alt={member.name} 
                                />
                                <AvatarFallback className="bg-primary-foreground text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {project.team.length > 3 && (
                              <Avatar className="h-8 w-8 border-2 border-background bg-muted">
                                <AvatarFallback>+{project.team.length - 3}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>

                        <div className="lg:col-span-1 flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Assign team
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Edit project
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Delete project
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} 
                          className={`h-2 ${project.status === "at-risk" 
                            ? "bg-red-500" 
                            : project.status === "completed" 
                              ? "bg-green-500" 
                              : ""}`} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center"
            >
              <p className="text-muted-foreground">No projects found matching your search</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {mockProjects.length} projects
        </p>
        <Button variant="ghost" size="sm" className="gap-1">
          View all projects <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
} 