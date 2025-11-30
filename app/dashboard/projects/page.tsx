"use client"

import { ProjectsSection } from "@/components/dashboard/projects-section"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Folder,
  FolderPlus,
  FileCheck,
  Settings,
  BarChart3,
  FilterX,
  Plus,
  Download,
  ArrowUpRight,
  Archive,
  Clock,
  RefreshCw,
  Trash2,
  CheckCircle2,
  ChevronRight,
  Users,
  FileText,
  Database,
} from "lucide-react"

interface ProjectStats {
  totalProjects: number;
  completionRate: number;
  activeProjects: number;
  highPriorityProjects: number;
  mediumPriorityProjects: number;
  lowPriorityProjects: number;
}

// Project type copied from the ProjectsSection to maintain type consistency
interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "archived" | "completed" | "on-hold";
  type: "personal" | "team" | "enterprise";
  createdAt: Date;
  updatedAt: Date;
  members: any[];
  milestones: any[];
  progress: number;
  priority: "low" | "medium" | "high";
  tags: string[];
  repository?: {
    url: string;
    branch: string;
    lastCommit: string;
    pullRequests: number;
  };
  analytics: {
    tasksCompleted: number;
    totalTasks: number;
    timeSpent: number;
    budgetUsed: number;
    budgetTotal: number;
  };
}

export default function ProjectsPage() {
  const [view, setView] = useState("all");
  const [filterStatus, setFilterStatus] = useState<Project["status"] | "all">("all");
  const [projectStats, setProjectStats] = useState<ProjectStats>({
    totalProjects: 0,
    completionRate: 0,
    activeProjects: 0,
    highPriorityProjects: 0,
    mediumPriorityProjects: 0,
    lowPriorityProjects: 0,
  });
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Handle project creation from the ProjectsSection
  const handleProjectCreated = (project: Project) => {
    setProjectStats(prev => ({
      ...prev,
      totalProjects: prev.totalProjects + 1,
      activeProjects: prev.activeProjects + 1,
      highPriorityProjects: project.priority === "high" ? prev.highPriorityProjects + 1 : prev.highPriorityProjects,
      mediumPriorityProjects: project.priority === "medium" ? prev.mediumPriorityProjects + 1 : prev.mediumPriorityProjects,
      lowPriorityProjects: project.priority === "low" ? prev.lowPriorityProjects + 1 : prev.lowPriorityProjects,
    }));
    
    toast({
      title: "Project Created",
      description: `${project.name} has been created successfully.`,
    });
  };

  // Handle project updates from the ProjectsSection
  const handleProjectUpdated = (project: Project) => {
    // You could update stats here based on the project changes
    toast({
      title: "Project Updated",
      description: `${project.name} has been updated successfully.`,
    });
  };

  // Handle project deletion from the ProjectsSection
  const handleProjectDeleted = (projectId: string) => {
    setProjectStats(prev => ({
      ...prev,
      totalProjects: prev.totalProjects - 1,
      // Note: In a real app, you'd have more information about the deleted project
      // to accurately update the other stats
    }));
    
    toast({
      title: "Project Deleted",
      description: "The project has been deleted successfully.",
    });
  };

  // Effect to update stats when view changes
  useEffect(() => {
    // In a real application, you'd fetch these stats from an API
    // This is simulated data
    setProjectStats({
      totalProjects: 12,
      completionRate: 78,
      activeProjects: 8,
      highPriorityProjects: 3,
      mediumPriorityProjects: 5,
      lowPriorityProjects: 4,
    });
  }, [view]);

  // Handle export of projects
  const handleExport = async (format: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Export Successful",
        description: `Your projects have been exported as ${format.toUpperCase()}`,
      });
      
      setIsExportDialogOpen(false);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "An error occurred while exporting your projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilterStatus("all");
    
    toast({
      title: "Filters Cleared",
      description: "All project filters have been reset",
    });
  };
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage and track your AI projects and experiments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setIsExportDialogOpen(true)}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setIsSettingsSheetOpen(true)}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => setIsNewProjectDialogOpen(true)}
          >
            <FolderPlus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.activeProjects}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">High: {projectStats.highPriorityProjects}</Badge>
              <Badge variant="outline" className="text-xs">Medium: {projectStats.mediumPriorityProjects}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4" onValueChange={(value) => {
        setView(value);
        if (value === "active") setFilterStatus("active");
        else if (value === "completed") setFilterStatus("completed");
        else if (value === "archived") setFilterStatus("archived");
        else setFilterStatus("all");
      }}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={handleClearFilters}
            >
              <FilterX className="h-4 w-4" />
              Clear Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add View
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          <ProjectsSection 
            filterStatus={filterStatus}
            onProjectCreated={handleProjectCreated}
            onProjectUpdated={handleProjectUpdated}
            onProjectDeleted={handleProjectDeleted}
            openNewProjectDialog={isNewProjectDialogOpen}
            onNewProjectDialogOpenChange={setIsNewProjectDialogOpen}
          />
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <ProjectsSection 
            filterStatus="active"
            onProjectCreated={handleProjectCreated}
            onProjectUpdated={handleProjectUpdated}
            onProjectDeleted={handleProjectDeleted}
            openNewProjectDialog={isNewProjectDialogOpen}
            onNewProjectDialogOpenChange={setIsNewProjectDialogOpen}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <ProjectsSection 
            filterStatus="completed"
            onProjectCreated={handleProjectCreated}
            onProjectUpdated={handleProjectUpdated}
            onProjectDeleted={handleProjectDeleted}
            openNewProjectDialog={isNewProjectDialogOpen}
            onNewProjectDialogOpenChange={setIsNewProjectDialogOpen}
          />
        </TabsContent>
        
        <TabsContent value="archived" className="space-y-4">
          <ProjectsSection 
            filterStatus="archived"
            onProjectCreated={handleProjectCreated}
            onProjectUpdated={handleProjectUpdated}
            onProjectDeleted={handleProjectDeleted}
            openNewProjectDialog={isNewProjectDialogOpen}
            onNewProjectDialogOpenChange={setIsNewProjectDialogOpen}
          />
        </TabsContent>
      </Tabs>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Projects</DialogTitle>
            <DialogDescription>
              Choose a format to export your projects
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-4 py-4">
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleExport("csv")}
              disabled={isLoading}
            >
              <FileCheck className="h-8 w-8" />
              <span>CSV</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleExport("json")}
              disabled={isLoading}
            >
              <Database className="h-8 w-8" />
              <span>JSON</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleExport("pdf")}
              disabled={isLoading}
            >
              <FileText className="h-8 w-8" />
              <span>PDF</span>
            </Button>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsExportDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Sheet */}
      <Sheet open={isSettingsSheetOpen} onOpenChange={setIsSettingsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Project Settings</SheetTitle>
            <SheetDescription>
              Configure your project dashboard settings
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Display Settings</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Default View</span>
                <select className="rounded-md border bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Grid</option>
                  <option>List</option>
                  <option>Board</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Items Per Page</span>
                <select className="rounded-md border bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Notifications</h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notifications-completed" className="rounded border-primary/20" />
                  <label htmlFor="notifications-completed" className="text-sm">Completed projects</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notifications-due" className="rounded border-primary/20" />
                  <label htmlFor="notifications-due" className="text-sm">Due date reminders</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notifications-team" className="rounded border-primary/20" />
                  <label htmlFor="notifications-team" className="text-sm">Team activity</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Integrations</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-9 w-9 bg-primary/10 rounded-md flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">GitHub</h4>
                    <p className="text-xs text-muted-foreground">Connected</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">Configure</Button>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-9 w-9 bg-primary/10 rounded-md flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Google Drive</h4>
                    <p className="text-xs text-muted-foreground">Connected</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">Configure</Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => setIsSettingsSheetOpen(false)}>
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
} 