"use client"

import { useState, useEffect } from "react"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Folder,
  FolderGit2,
  FolderOpen,
  FolderPlus,
  GitBranch,
  GitFork,
  Users,
  Calendar,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Sparkles,
  Settings,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Filter,
  Search,
  SlidersHorizontal,
  Plus,
  ChevronRight,
  ChevronDown,
  Archive,
  PlusCircle,
  MoreVertical,
  FileCheck,
  Database,
  FileText,
} from "lucide-react"

interface ProjectMember {
  id: string
  name: string
  role: string
  avatar: string
  status: "online" | "offline" | "away"
}

interface ProjectMilestone {
  id: string
  title: string
  description: string
  dueDate: Date
  status: "completed" | "in-progress" | "pending"
  progress: number
}

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "archived" | "completed" | "on-hold"
  type: "personal" | "team" | "enterprise"
  createdAt: Date
  updatedAt: Date
  members: ProjectMember[]
  milestones: ProjectMilestone[]
  progress: number
  priority: "low" | "medium" | "high"
  tags: string[]
  repository?: {
    url: string
    branch: string
    lastCommit: string
    pullRequests: number
  }
  analytics: {
    tasksCompleted: number
    totalTasks: number
    timeSpent: number
    budgetUsed: number
    budgetTotal: number
  }
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Vision AI Assistant",
    description: "Computer vision model for real-time object detection",
    status: "active",
    type: "team",
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [
      {
        id: "m1",
        name: "John Doe",
        role: "Lead Developer",
        avatar: "https://github.com/shadcn.png",
        status: "online",
      },
      {
        id: "m2",
        name: "Jane Smith",
        role: "ML Engineer",
        avatar: "https://github.com/shadcn.png",
        status: "away",
      },
    ],
    milestones: [
      {
        id: "ml1",
        title: "Data Pipeline Setup",
        description: "Set up data ingestion and preprocessing pipeline",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "in-progress",
        progress: 85,
      },
      {
        id: "ml2",
        title: "Model Training",
        description: "Train initial model version",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: "pending",
        progress: 0,
      },
    ],
    progress: 85,
    priority: "high",
    tags: ["Vision", "AI", "ML"],
    repository: {
      url: "https://github.com/example/vision-ai",
      branch: "main",
      lastCommit: "abc123",
      pullRequests: 3,
    },
    analytics: {
      tasksCompleted: 12,
      totalTasks: 25,
      timeSpent: 120,
      budgetUsed: 5000,
      budgetTotal: 15000,
    },
  },
  {
    id: "2",
    name: "Smart Chat Bot",
    description: "Advanced language model for customer support",
    status: "active",
    type: "enterprise",
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [
      {
        id: "m3",
        name: "Alice Johnson",
        role: "NLP Engineer",
        avatar: "https://github.com/shadcn.png",
        status: "online",
      },
    ],
    milestones: [
      {
        id: "ml3",
        title: "Language Model Training",
        description: "Fine-tune base model on customer data",
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "completed",
        progress: 60,
      },
    ],
    progress: 60,
    priority: "medium",
    tags: ["NLP", "ChatBot", "Support"],
    analytics: {
      tasksCompleted: 18,
      totalTasks: 24,
      timeSpent: 85,
      budgetUsed: 3000,
      budgetTotal: 5000,
    },
  },
  {
    id: "3",
    name: "Market Predictor",
    description: "AI-powered market analysis and prediction system",
    status: "active",
    type: "enterprise",
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [
      {
        id: "m4",
        name: "Bob Wilson",
        role: "Data Scientist",
        avatar: "https://github.com/shadcn.png",
        status: "online",
      },
    ],
    milestones: [
      {
        id: "ml4",
        title: "Data Analysis",
        description: "Market data analysis and feature engineering",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: "completed",
        progress: 92,
      },
    ],
    progress: 92,
    priority: "high",
    tags: ["Finance", "ML", "Prediction"],
    analytics: {
      tasksCompleted: 22,
      totalTasks: 25,
      timeSpent: 95,
      budgetUsed: 8000,
      budgetTotal: 10000,
    },
  },
]

const LoadingProjectCard = () => (
  <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/20">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 w-[120px]" />
      </div>
      <Skeleton className="h-5 w-[60px]" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-4" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[60px]" />
              <Skeleton className="h-4 w-[40px]" />
            </div>
            <Skeleton className="h-1 w-full" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

interface ProjectsSectionProps {
  filterStatus?: Project["status"] | "all";
  filterType?: Project["type"] | "all";
  filterPriority?: Project["priority"] | "all";
  onProjectCreated?: (project: Project) => void;
  onProjectUpdated?: (project: Project) => void;
  onProjectDeleted?: (projectId: string) => void;
  openNewProjectDialog?: boolean;
  onNewProjectDialogOpenChange?: (open: boolean) => void;
}

export function ProjectsSection({
  filterStatus: externalFilterStatus,
  filterType: externalFilterType,
  filterPriority: externalFilterPriority,
  onProjectCreated,
  onProjectUpdated,
  onProjectDeleted,
  openNewProjectDialog,
  onNewProjectDialogOpenChange,
}: ProjectsSectionProps = {}) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Use external filter values if provided, otherwise use internal state
  const [internalFilterStatus, setInternalFilterStatus] = useState<Project["status"] | "all">("all")
  const [internalFilterType, setInternalFilterType] = useState<Project["type"] | "all">("all")
  const [internalFilterPriority, setInternalFilterPriority] = useState<Project["priority"] | "all">("all")
  
  const filterStatusValue = externalFilterStatus !== undefined ? externalFilterStatus : internalFilterStatus;
  const filterTypeValue = externalFilterType !== undefined ? externalFilterType : internalFilterType;
  const filterPriorityValue = externalFilterPriority !== undefined ? externalFilterPriority : internalFilterPriority;
  
  const setFilterStatus = (value: Project["status"] | "all") => {
    setInternalFilterStatus(value);
  };
  
  const setFilterType = (value: Project["type"] | "all") => {
    setInternalFilterType(value);
  };
  
  const setFilterPriority = (value: Project["priority"] | "all") => {
    setInternalFilterPriority(value);
  };
  
  const { toast } = useToast()

  // New state for dialogs - controlled or uncontrolled based on props
  const [internalNewProjectDialogOpen, setInternalNewProjectDialogOpen] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState<{
    name: string;
    type: Project["type"];
    description: string;
    priority: Project["priority"];
  }>({
    name: "",
    type: "personal",
    description: "",
    priority: "medium",
  })
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    description?: string;
  }>({})
  
  // Handle new project dialog visibility
  const newProjectDialogOpen = openNewProjectDialog !== undefined 
    ? openNewProjectDialog 
    : internalNewProjectDialogOpen;
    
  const setNewProjectDialogOpen = (open: boolean) => {
    if (onNewProjectDialogOpenChange) {
      onNewProjectDialogOpenChange(open);
    } else {
      setInternalNewProjectDialogOpen(open);
    }
  };

  // Simulate initial data loading
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
        setError(null)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setProjects(mockProjects)
      } catch (err) {
        setError("Failed to load projects. Please try again.")
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [toast])

  const handleProjectAction = async (action: string, project: Project) => {
    try {
      switch (action) {
        case "archive":
          toast({
            title: "Archiving Project",
            description: `Archiving ${project.name}`,
          })
          // Simulate archiving
          await new Promise((resolve) => setTimeout(resolve, 1000))
          const updatedProject = { ...project, status: "archived" as const };
          setProjects(prevProjects =>
            prevProjects.map(p =>
              p.id === project.id ? updatedProject : p
            )
          )
          
          // Notify parent if needed
          if (onProjectUpdated) {
            onProjectUpdated(updatedProject);
          }
          
          toast({
            title: "Project Archived",
            description: `${project.name} has been archived successfully`,
          })
          break;
        case "delete":
          toast({
            title: "Deleting Project",
            description: `Deleting ${project.name}`,
          })
          // Simulate deletion
          await new Promise((resolve) => setTimeout(resolve, 1000))
          setProjects(prevProjects => prevProjects.filter(p => p.id !== project.id))
          
          // Notify parent if needed
          if (onProjectDeleted) {
            onProjectDeleted(project.id);
          }
          
          toast({
            title: "Project Deleted",
            description: `${project.name} has been deleted successfully`,
          })
          break;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} project. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatusValue === "all" || project.status === filterStatusValue
    const matchesType = filterTypeValue === "all" || project.type === filterTypeValue
    const matchesPriority = filterPriorityValue === "all" || project.priority === filterPriorityValue
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  const getProjectIcon = (type: Project["type"]) => {
    switch (type) {
      case "personal":
        return <FolderOpen className="h-5 w-5" />
      case "team":
        return <FolderGit2 className="h-5 w-5" />
      case "enterprise":
        return <Folder className="h-5 w-5" />
      default:
        return <Folder className="h-5 w-5" />
    }
  }

  const getStatusBadgeVariant = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "archived":
        return "secondary"
      case "completed":
        return "outline"
      case "on-hold":
        return "destructive"
      default:
        return "secondary"
    }
  }

  // New project creation handler
  const handleCreateProject = async () => {
    // Validate form
    const errors: {
      name?: string;
      description?: string;
    } = {};

    if (!newProject.name.trim()) {
      errors.name = "Project name is required";
    }

    if (!newProject.description.trim()) {
      errors.description = "Project description is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      toast({
        title: "Creating Project",
        description: "Please wait while we set up your new project...",
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newProjectData: Project = {
        id: `project-${Date.now()}`,
        name: newProject.name,
        description: newProject.description,
        status: "active",
        type: newProject.type,
        createdAt: new Date(),
        updatedAt: new Date(),
        members: [],
        milestones: [],
        progress: 0,
        priority: newProject.priority,
        tags: [],
        analytics: {
          tasksCompleted: 0,
          totalTasks: 0,
          timeSpent: 0,
          budgetUsed: 0,
          budgetTotal: 0,
        },
      };

      setProjects((prevProjects) => [newProjectData, ...prevProjects]);
      setNewProjectDialogOpen(false);
      setNewProject({
        name: "",
        type: "personal",
        description: "",
        priority: "medium",
      });
      setFormErrors({});

      // Notify parent component about the new project
      if (onProjectCreated) {
        onProjectCreated(newProjectData);
      }

      toast({
        title: "Project Created",
        description: `${newProject.name} has been created successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Export projects functionality
  const handleExportProjects = async (format: "csv" | "json" | "pdf") => {
    try {
      toast({
        title: `Exporting Projects as ${format.toUpperCase()}`,
        description: "Preparing your export...",
      });

      // Simulate export processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real application, you would generate and download the file here
      // For this example, we're just showing a success message

      toast({
        title: "Export Completed",
        description: `Your projects have been exported as ${format.toUpperCase()}`,
      });

      setExportDialogOpen(false);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your projects. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage and track your project progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setExportDialogOpen(true)}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </Button>
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => setNewProjectDialogOpen(true)}
          >
            <FolderPlus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 rounded-md border bg-background/50 backdrop-blur-sm border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={filterStatusValue}
            onChange={(e) => setFilterStatus(e.target.value as Project["status"] | "all")}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
          <select
            className="rounded-md border bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={filterTypeValue}
            onChange={(e) => setFilterType(e.target.value as Project["type"] | "all")}
          >
            <option value="all">All Types</option>
            <option value="personal">Personal</option>
            <option value="team">Team</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <select
            className="rounded-md border bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={filterPriorityValue}
            onChange={(e) => setFilterPriority(e.target.value as Project["priority"] | "all")}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => <LoadingProjectCard key={i} />)
            ) : error ? (
              <div className="col-span-full flex items-center justify-center p-8">
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Error Loading Projects</h3>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full flex items-center justify-center p-8">
                <div className="text-center">
                  <Search className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button onClick={() => {
                    setSearchQuery("")
                    setFilterStatus("all")
                    setFilterType("all")
                    setFilterPriority("all")
                  }}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2">
                        {getProjectIcon(project.type)}
                        <CardTitle className="text-sm font-medium">
                          {project.name}
                        </CardTitle>
                      </div>
                      <Badge
                        variant={getStatusBadgeVariant(project.status)}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Progress
                            </span>
                            <span className="text-xs font-medium">
                              {project.progress}%
                            </span>
                          </div>
                          <Progress
                            value={project.progress}
                            className="h-1"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Tasks
                            </span>
                            <span className="text-xs font-medium">
                              {project.analytics.tasksCompleted}/{project.analytics.totalTasks}
                            </span>
                          </div>
                          <Progress
                            value={(project.analytics.tasksCompleted / project.analytics.totalTasks) * 100}
                            className="h-1"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Budget
                            </span>
                            <span className="text-xs font-medium">
                              ${project.analytics.budgetUsed.toLocaleString()}
                            </span>
                          </div>
                          <Progress
                            value={(project.analytics.budgetUsed / project.analytics.budgetTotal) * 100}
                            className="h-1"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {project.members.map((member) => (
                              <div
                                key={member.id}
                                className="relative"
                              >
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="h-6 w-6 rounded-full border-2 border-background"
                                />
                                <div
                                  className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-background ${
                                    member.status === "online"
                                      ? "bg-green-500"
                                      : member.status === "away"
                                      ? "bg-yellow-500"
                                      : "bg-gray-500"
                                  }`}
                                />
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {project.members.length} members
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleProjectAction("archive", project)}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleProjectAction("delete", project)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-4">
                      {getProjectIcon(project.type)}
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Timeline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Project Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Projects</span>
                      <span className="text-sm text-muted-foreground">
                        {projects.length}
                      </span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Projects</span>
                      <span className="text-sm text-muted-foreground">
                        {projects.filter(p => p.status === "active").length}
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completed Tasks</span>
                      <span className="text-sm text-muted-foreground">
                        {projects.reduce((acc, p) => acc + p.analytics.tasksCompleted, 0)}
                      </span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Budget Used</span>
                      <span className="text-sm text-muted-foreground">
                        ${projects.reduce((acc, p) => acc + p.analytics.budgetUsed, 0).toLocaleString()}
                      </span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Analytics Charts (Placeholder)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Default View</span>
                      <span className="text-sm text-muted-foreground">
                        Grid
                      </span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Auto-Archive</span>
                      <span className="text-sm text-muted-foreground">
                        Enabled
                      </span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Notifications</span>
                      <span className="text-sm text-muted-foreground">
                        All
                      </span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Integrations</span>
                      <span className="text-sm text-muted-foreground">
                        3 Active
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Settings Configuration Panel (Placeholder)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Project Dialog */}
      <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Enter the details for your new project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="My Awesome Project"
              />
              {formErrors.name && (
                <p className="text-xs text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Project Type</Label>
              <Select
                value={newProject.type}
                onValueChange={(value) => setNewProject({ ...newProject, type: value as Project["type"] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newProject.priority}
                onValueChange={(value) => setNewProject({ ...newProject, priority: value as Project["priority"] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Describe your project..."
                rows={4}
              />
              {formErrors.description && (
                <p className="text-xs text-red-500">{formErrors.description}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Projects</DialogTitle>
            <DialogDescription>
              Choose a format to export your projects.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleExportProjects("csv")}
            >
              <FileCheck className="h-8 w-8" />
              <span>CSV</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleExportProjects("json")}
            >
              <Database className="h-8 w-8" />
              <span>JSON</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleExportProjects("pdf")}
            >
              <FileText className="h-8 w-8" />
              <span>PDF</span>
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 