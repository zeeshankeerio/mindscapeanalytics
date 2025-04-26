"use client"

import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Brain,
  Cpu,
  Database,
  Network,
  Zap,
  Shield,
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
  Calendar,
  Download as DownloadIcon,
  Share2,
  MoreVertical,
  FileSpreadsheet,
  FilePieChart,
  FileBarChart,
  FileLineChart,
  FileCheck,
  FileWarning,
  FileClock,
  Play,
  Pause,
  StopCircle,
  Archive,
  History,
  FileText,
  GitCompare,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  SlidersHorizontal,
  Layers,
  Box,
  BarChart,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  PanelRight,
  Award,
  Gauge,
  Workflow,
  Terminal,
  Server,
  CloudCog,
  Eye,
  EyeOff,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import { useVirtualizer } from "@tanstack/react-virtual"

interface ModelVersion {
  id: string
  version: string
  status: "active" | "archived" | "deprecated"
  createdAt: Date
  updatedAt: Date
  metrics: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
    trainingTime: number
    inferenceTime: number
  }
  trainingData: {
    size: number
    samples: number
    features: number
  }
  deployment: {
    status: "deployed" | "pending" | "failed"
    instances: number
    region: string
    endpoint: string
  }
}

interface Model {
  id: string
  name: string
  type: "text" | "image" | "audio" | "video"
  description: string
  status: "active" | "training" | "failed" | "archived"
  createdAt: Date
  updatedAt: Date
  versions: ModelVersion[]
  metrics: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
    trainingTime: number
    inferenceTime: number
  }
  trainingData: {
    size: number
    samples: number
    features: number
  }
  deployment: {
    status: "deployed" | "pending" | "failed"
    instances: number
    region: string
    endpoint: string
  }
}

const mockModels: Model[] = [
  {
    id: "1",
    name: "GPT-4 Fine-tuned",
    type: "text",
    description: "Fine-tuned GPT-4 model for specialized tasks",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
    versions: [
      {
        id: "v1",
        version: "1.0.0",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        metrics: {
          accuracy: 98.5,
          precision: 97.8,
          recall: 98.2,
          f1Score: 98.0,
          trainingTime: 120,
          inferenceTime: 0.5,
        },
        trainingData: {
          size: 500,
          samples: 100000,
          features: 2048,
        },
        deployment: {
          status: "deployed",
          instances: 5,
          region: "us-east-1",
          endpoint: "https://api.example.com/v1/gpt4",
        },
      },
      {
        id: "v2",
        version: "1.1.0",
        status: "archived",
        createdAt: new Date(),
        updatedAt: new Date(),
        metrics: {
          accuracy: 98.7,
          precision: 98.0,
          recall: 98.5,
          f1Score: 98.2,
          trainingTime: 150,
          inferenceTime: 0.4,
        },
        trainingData: {
          size: 600,
          samples: 120000,
          features: 2048,
        },
        deployment: {
          status: "deployed",
          instances: 3,
          region: "us-east-1",
          endpoint: "https://api.example.com/v1/gpt4",
        },
      },
    ],
    metrics: {
      accuracy: 98.5,
      precision: 97.8,
      recall: 98.2,
      f1Score: 98.0,
      trainingTime: 120,
      inferenceTime: 0.5,
    },
    trainingData: {
      size: 500,
      samples: 100000,
      features: 2048,
    },
    deployment: {
      status: "deployed",
      instances: 5,
      region: "us-east-1",
      endpoint: "https://api.example.com/v1/gpt4",
    },
  },
  {
    id: "2",
    name: "Image Classification",
    type: "image",
    description: "ResNet-based image classification model",
    status: "training",
    createdAt: new Date(),
    updatedAt: new Date(),
    versions: [
      {
        id: "v1",
        version: "1.0.0",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        metrics: {
          accuracy: 95.2,
          precision: 94.8,
          recall: 95.0,
          f1Score: 94.9,
          trainingTime: 180,
          inferenceTime: 0.2,
        },
        trainingData: {
          size: 1000,
          samples: 50000,
          features: 1024,
        },
        deployment: {
          status: "deployed",
          instances: 3,
          region: "us-west-2",
          endpoint: "https://api.example.com/v1/image-classifier",
        },
      },
    ],
    metrics: {
      accuracy: 95.2,
      precision: 94.8,
      recall: 95.0,
      f1Score: 94.9,
      trainingTime: 180,
      inferenceTime: 0.2,
    },
    trainingData: {
      size: 1000,
      samples: 50000,
      features: 1024,
    },
    deployment: {
      status: "deployed",
      instances: 3,
      region: "us-west-2",
      endpoint: "https://api.example.com/v1/image-classifier",
    },
  },
]

// Lazy load heavy sub-components
const MetricsVisualization = lazy(() => import('@/components/dashboard/metrics-visualization').then(mod => ({ default: mod.MetricsVisualization })));
const VersionComparisonView = lazy(() => import('@/components/dashboard/version-comparison').then(mod => ({ default: mod.VersionComparisonView })));
const DeploymentStatus = lazy(() => import('@/components/dashboard/deployment-status').then(mod => ({ default: mod.DeploymentStatus })));

// Advanced loading component with shimmer effect
const LoadingModelCard = () => (
  <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/20">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent shimmer" />
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-4 w-[150px] rounded-md" />
      </div>
      <Skeleton className="h-5 w-[70px] rounded-full" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-4 rounded-md" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-[80px] rounded-md" />
              <Skeleton className="h-3 w-[50px] rounded-md" />
            </div>
            <Skeleton className="h-1.5 w-full rounded-full" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <Skeleton className="h-4 w-[100px] rounded-md" />
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </CardContent>
  </Card>
)

export function ModelsSection() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [models, setModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<Model["status"] | "all">("all")
  const [showVersionCompare, setShowVersionCompare] = useState(false)
  const [selectedVersions, setSelectedVersions] = useState<string[]>([])
  const { toast } = useToast()

  // New state variables for advanced features
  const [selectedMetric, setSelectedMetric] = useState("accuracy")
  const [deploymentModalOpen, setDeploymentModalOpen] = useState(false)
  const [modelToManage, setModelToManage] = useState<Model | null>(null)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [compareMode, setCompareMode] = useState(false)
  const [modelToCompare, setModelToCompare] = useState<string[]>([])
  const [detailsModel, setDetailsModel] = useState<Model | null>(null)
  
  // Correctly typed state variables to fix linter errors
  type ModelType = Model["type"] | "all";
  type ModelStatus = Model["status"] | "all";
  
  const [filterType, setFilterType] = useState<ModelType>("all")
  const [minAccuracy, setMinAccuracy] = useState<string>("0")
  const [selectedModelsForComparison, setSelectedModelsForComparison] = useState<Model[]>([])

  // Create container ref for virtualization
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Memoize filter functions to prevent unnecessary re-renders
  const loadModels = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setModels(mockModels)
    } catch (error) {
      console.error("Failed to load models:", error)
      toast({
        title: "Error",
        description: "Failed to load models. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadModels()
  }, [loadModels])

  // Memoize filtered models to avoid recalculation on every render
  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const matchesType = filterType === "all" || model.type === filterType
      const matchesStatus = filterStatus === "all" || model.status === filterStatus
      const matchesAccuracy = model.metrics.accuracy >= parseInt(minAccuracy || "0")
      const matchesSearch = searchQuery === "" || 
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesType && matchesStatus && matchesAccuracy && matchesSearch
    })
  }, [models, filterType, filterStatus, minAccuracy, searchQuery])
  
  // Set up virtualization for model cards
  const rowVirtualizer = useVirtualizer({
    count: filteredModels.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 350, // Estimate height of each model card
    overscan: 5, // Number of items to render outside of the visible area
  })

  const handleModelAction = useCallback(async (action: string, model: Model) => {
    try {
      switch (action) {
        case "retrain":
          toast({
            title: "Retraining Model",
            description: `Starting retraining process for ${model.name}`,
          })
          // Simulate retraining
          await new Promise((resolve) => setTimeout(resolve, 2000))
          toast({
            title: "Retraining Started",
            description: `Retraining process started for ${model.name}`,
          })
          break
        case "archive":
          toast({
            title: "Archiving Model",
            description: `Archiving ${model.name}`,
          })
          // Simulate archiving
          await new Promise((resolve) => setTimeout(resolve, 1000))
          setModels(prevModels =>
            prevModels.map(m =>
              m.id === model.id ? { ...m, status: "archived" } : m
            )
          )
          toast({
            title: "Model Archived",
            description: `${model.name} has been archived successfully`,
          })
          break
        case "delete":
          toast({
            title: "Deleting Model",
            description: `Deleting ${model.name}`,
          })
          // Simulate deletion
          await new Promise((resolve) => setTimeout(resolve, 1000))
          setModels(prevModels => prevModels.filter(m => m.id !== model.id))
          toast({
            title: "Model Deleted",
            description: `${model.name} has been deleted successfully`,
          })
          break
        case "view":
          setDetailsModel(model)
          break
        case "compare":
          if (modelToCompare.includes(model.id)) {
            setModelToCompare(modelToCompare.filter(id => id !== model.id))
          } else {
            if (modelToCompare.length < 2) {
              setModelToCompare([...modelToCompare, model.id])
            } else {
              toast({
                title: "Comparison Limit",
                description: "You can compare maximum 2 models at a time",
                variant: "default",
              })
            }
          }
          break
        case "deploy":
          setModelToManage(model)
          setDeploymentModalOpen(true)
          break
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} model. Please try again.`,
        variant: "destructive",
      })
    }
  }, [toast])

  // Memoize these functions to prevent recreation on re-renders
  const getModelIcon = useCallback((type: Model["type"]) => {
    switch (type) {
      case "text":
        return <FileText className="h-5 w-5" />
      case "image":
        return <FilePieChart className="h-5 w-5" />
      case "audio":
        return <FileBarChart className="h-5 w-5" />
      case "video":
        return <FileLineChart className="h-5 w-5" />
    }
  }, [])

  const getStatusIcon = useCallback((status: Model["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "training":
        return <FileClock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <FileWarning className="h-4 w-4 text-red-500" />
      case "archived":
        return <Archive className="h-4 w-4 text-gray-500" />
    }
  }, [])

  const handleFilterTypeChange = useCallback((value: string) => {
    setFilterType(value as ModelType);
  }, [])

  const handleFilterStatusChange = useCallback((value: string) => {
    setFilterStatus(value as ModelStatus);
  }, [])

  const handleMinAccuracyChange = useCallback((value: string) => {
    setMinAccuracy(value);
  }, [])

  const resetFilters = useCallback(() => {
    setFilterStatus("all");
    setFilterType("all");
    setMinAccuracy("0");
    setSearchQuery("");
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Models</h2>
          <p className="text-muted-foreground">
            Advanced AI model management and monitoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Models</DialogTitle>
                <DialogDescription>
                  Apply advanced filters to narrow down your model list
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Model Type</span>
                  <div className="col-span-3">
                    <Select
                      value={filterType}
                      onValueChange={handleFilterTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select model type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Status</span>
                  <div className="col-span-3">
                    <Select
                      value={filterStatus}
                      onValueChange={handleFilterStatusChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Min Accuracy</span>
                  <div className="col-span-3">
                    <Select
                      value={minAccuracy}
                      onValueChange={handleMinAccuracyChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum accuracy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Accuracy</SelectItem>
                        <SelectItem value="90">90% and above</SelectItem>
                        <SelectItem value="95">95% and above</SelectItem>
                        <SelectItem value="98">98% and above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <Button type="submit">Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Layers className="h-4 w-4" />
            <span>View: </span>
            <span>{viewMode === "grid" ? "Grid" : "List"}</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Deploy Model
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Deploy New Model</DialogTitle>
                <DialogDescription>
                  Configure and deploy a new AI model to your infrastructure
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form fields would go here */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Model Name</span>
                  <input
                    placeholder="Enter model name"
                    className="col-span-3 px-3 py-2 rounded-md border bg-background/50 backdrop-blur-sm border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Type</span>
                  <div className="col-span-3">
                    <Select defaultValue="text">
                      <SelectTrigger>
                        <SelectValue placeholder="Select model type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Region</span>
                  <div className="col-span-3">
                    <Select defaultValue="us-east-1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                        <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                        <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                        <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Instances</span>
                  <input
                    type="number"
                    defaultValue="1"
                    min="1"
                    max="10"
                    className="col-span-3 px-3 py-2 rounded-md border bg-background/50 backdrop-blur-sm border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Deploy</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search models by name, type, or description..."
            className="w-full pl-9 pr-4 py-2 rounded-md border bg-background/50 backdrop-blur-sm border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="accuracy">Accuracy</SelectItem>
              <SelectItem value="date">Last Updated</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant={compareMode ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setCompareMode(!compareMode)
              if (compareMode) setModelToCompare([])
            }}
          >
            <GitCompare className="h-4 w-4 mr-2" />
            Compare
          </Button>
        </div>
      </div>

      {compareMode && modelToCompare.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-medium">
                Comparing {modelToCompare.length} model{modelToCompare.length > 1 ? 's' : ''}
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (modelToCompare.length === 2) {
                  // Open comparison view
                  setSelectedModelsForComparison(
                    models.filter(m => modelToCompare.includes(m.id))
                  )
                } else {
                  toast({
                    title: "Select another model",
                    description: "Please select 2 models to compare",
                  })
                }
              }}
              disabled={modelToCompare.length !== 2}
            >
              View Comparison
            </Button>
          </div>
          <div className="flex gap-2">
            {modelToCompare.map(id => {
              const model = models.find(m => m.id === id)
              return model ? (
                <div key={id} className="flex items-center gap-2 bg-background p-2 rounded-md">
                  {getModelIcon(model.type)}
                  <span className="text-sm">{model.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => setModelToCompare(modelToCompare.filter(i => i !== id))}
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </div>
              ) : null
            })}
          </div>
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {isLoading ? (
              Array(3).fill(0).map((_, i) => <LoadingModelCard key={i} />)
            ) : error ? (
              <div className="col-span-full flex items-center justify-center p-8">
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Error Loading Models</h3>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              </div>
            ) : filteredModels.length === 0 ? (
              <div className="col-span-full flex items-center justify-center p-8">
                <div className="text-center">
                  <FileWarning className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Models Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div 
                ref={containerRef} 
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[800px] overflow-auto"
              >
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow: { index: number; size: number; start: number }) => {
                    const model = filteredModels[virtualRow.index];
                    return (
                      <div
                        key={model.id}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`
                        }}
                      >
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/60 transition-all">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex items-center gap-2">
                                  {getModelIcon(model.type)}
                                  <CardTitle className="text-sm font-medium">
                                    {model.name}
                                  </CardTitle>
                                </div>
                                <Badge
                                  variant={
                                    model.status === "active"
                                      ? "default"
                                      : model.status === "training"
                                      ? "secondary"
                                      : model.status === "failed"
                                      ? "destructive"
                                      : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {model.status}
                                </Badge>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                  {model.description}
                                </p>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">
                                        Accuracy
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <span className="text-xs font-medium">
                                          {model.metrics.accuracy.toFixed(1)}%
                                        </span>
                                        {model.metrics.accuracy > 98 && (
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger>
                                                <Award className="h-3 w-3 text-yellow-500" />
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p className="text-xs">High performance model</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        )}
                                      </div>
                                    </div>
                                    <div className="relative h-1.5">
                                      <Progress
                                        value={model.metrics.accuracy}
                                        className="h-1.5"
                                      />
                                      {model.metrics.accuracy > 95 && (
                                        <motion.div 
                                          className="absolute top-0 left-0 h-full w-1 bg-green-500"
                                          style={{ left: '95%' }}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.5 }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">
                                        Inference Time
                                      </span>
                                      <span className="text-xs font-medium">
                                        {model.metrics.inferenceTime}ms
                                      </span>
                                    </div>
                                    <Progress
                                      value={100 - ((model.metrics.inferenceTime / 1) * 100)}
                                      className="h-1.5"
                                    />
                                  </div>
                                  <div className="pt-1 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <Cpu className="h-3 w-3 text-muted-foreground" />
                                      <span className="text-xs text-muted-foreground">
                                        v{model.versions[0].version} 
                                      </span>
                                    </div>
                                    <DeploymentStatus 
                                      status={model.deployment.status} 
                                      instances={model.deployment.instances}
                                      region={model.deployment.region}
                                    />
                                  </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                      Updated {new Date(model.updatedAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {compareMode ? (
                                      <Button
                                        variant={modelToCompare.includes(model.id) ? "default" : "ghost"}
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleModelAction("compare", model)}
                                      >
                                        <GitCompare className="h-4 w-4" />
                                      </Button>
                                    ) : (
                                      <>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8"
                                          onClick={() => handleModelAction("view", model)}
                                        >
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8"
                                          onClick={() => handleModelAction("deploy", model)}
                                        >
                                          <Upload className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8"
                                          onClick={() => handleModelAction("archive", model)}
                                        >
                                          <Archive className="h-4 w-4" />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // List view for models
              <div className="rounded-lg border bg-card overflow-hidden">
                <div className="grid grid-cols-12 p-4 border-b text-xs font-medium text-muted-foreground">
                  <div className="col-span-4">Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Accuracy</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <ScrollArea className="h-[500px]">
                  {filteredModels.map((model) => (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`grid grid-cols-12 p-4 border-b hover:bg-primary/5 transition-colors ${
                        compareMode && modelToCompare.includes(model.id) ? "bg-primary/10" : ""
                      }`}
                    >
                      <div className="col-span-4 flex items-center gap-2">
                        {getModelIcon(model.type)}
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {model.description}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className="capitalize">{model.type}</span>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Badge
                          variant={
                            model.status === "active"
                              ? "default"
                              : model.status === "training"
                              ? "secondary"
                              : model.status === "failed"
                              ? "destructive"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {model.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex items-center gap-1">
                        <Progress
                          value={model.metrics.accuracy}
                          className="h-1.5 w-16"
                        />
                        <span className="text-xs font-medium">
                          {model.metrics.accuracy.toFixed(1)}%
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center gap-1">
                        {compareMode ? (
                          <Button
                            variant={modelToCompare.includes(model.id) ? "default" : "ghost"}
                            size="sm"
                            className="h-8"
                            onClick={() => handleModelAction("compare", model)}
                          >
                            {modelToCompare.includes(model.id) ? "Selected" : "Compare"}
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleModelAction("view", model)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleModelAction("archive", model)}
                                  >
                                    <Archive className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Archive Model</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </ScrollArea>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Training Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {models
                  .filter((model) => model.status === "training")
                  .map((model) => (
                    <div
                      key={model.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                          {getModelIcon(model.type)}
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-yellow-500 rounded-full flex items-center justify-center">
                            <FileClock className="h-2.5 w-2.5 text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{model.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {model.metrics.trainingTime} minutes elapsed
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {model.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-48 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-medium">65%</span>
                          </div>
                          <div className="relative">
                            <Progress value={65} className="h-2" />
                            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                              <span>Preprocessing</span>
                              <span>Training</span>
                              <span>Evaluation</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                        <Button variant="destructive" size="sm">
                          <StopCircle className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                {models.filter(model => model.status === "training").length === 0 && (
                  <div className="flex items-center justify-center p-8 text-center">
                    <div>
                      <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Models in Training</h3>
                      <p className="text-muted-foreground mb-4">
                        You don't have any models currently in the training queue
                      </p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Train New Model
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Training History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {models.slice(0, 3).map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-4">
                      {getModelIcon(model.type)}
                      <div>
                        <h4 className="font-medium">{model.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Last trained on {model.updatedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleModelAction("retrain", model)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retrain
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDetailsModel(model)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background/50 backdrop-blur-sm border-primary/20 col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Performance Metrics</CardTitle>
                  <Select
                    value={selectedMetric}
                    onValueChange={setSelectedMetric}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accuracy">Accuracy</SelectItem>
                      <SelectItem value="precision">Precision</SelectItem>
                      <SelectItem value="recall">Recall</SelectItem>
                      <SelectItem value="f1Score">F1 Score</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  {/* This would be a line chart showing performance metrics over time */}
                  Performance metrics visualization
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-primary/20 row-span-2">
              <CardHeader>
                <CardTitle>Top Performing Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {models
                    .sort((a, b) => b.metrics.accuracy - a.metrics.accuracy)
                    .slice(0, 5)
                    .map((model, index) => (
                      <div key={model.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-xs font-bold">
                              {index + 1}
                            </div>
                            <span className="text-sm font-medium">
                              {model.name}
                            </span>
                          </div>
                          <Badge
                            variant={model.status === "active" ? "default" : "outline"}
                            className="text-xs"
                          >
                            {model.type}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Accuracy
                            </span>
                            <span className="text-xs font-medium">
                              {model.metrics.accuracy.toFixed(1)}%
                            </span>
                          </div>
                          <Progress
                            value={model.metrics.accuracy}
                            className="h-1"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-primary/20 col-span-2">
              <CardHeader>
                <CardTitle>Recent Performance Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {models.slice(0, 3).map((model) => (
                    <div
                      key={model.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        {getModelIcon(model.type)}
                        <div>
                          <h4 className="font-medium">{model.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {model.versions.length > 1
                              ? `Improved by ${(model.versions[0].metrics.accuracy - model.versions[1].metrics.accuracy).toFixed(1)}% from previous version`
                              : "First version - no comparison data"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm">
                          <span>{model.versions[0].metrics.accuracy.toFixed(1)}%</span>
                          {model.versions.length > 1 && (
                            <>
                              <ArrowUpRight className="h-4 w-4 text-green-500" />
                              <span className="text-green-500">
                                +{(model.versions[0].metrics.accuracy - model.versions[1].metrics.accuracy).toFixed(1)}%
                              </span>
                            </>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleModelAction("view", model)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Model Version History</CardTitle>
                <Select defaultValue={models[0]?.id}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map(model => (
                      <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {models[0]?.versions?.length > 0 ? (
                <div className="space-y-6">
                  {models[0].versions.map((version, index) => (
                    <div key={version.id} className="relative">
                      {index < models[0].versions.length - 1 && (
                        <div className="absolute top-10 bottom-0 left-5 w-px bg-primary/20 -z-10" />
                      )}
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-semibold">v{version.version}</span>
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Version {version.version}</h4>
                              <p className="text-xs text-muted-foreground">
                                Released on {version.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={version.status === "active" ? "default" : "outline"}>
                              {version.status}
                            </Badge>
                          </div>
                          <Card className="overflow-hidden border-primary/10">
                            <CardContent className="p-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h5 className="text-xs font-medium">Performance</h5>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <span className="block text-xs text-muted-foreground">Accuracy</span>
                                      <span className="text-sm font-medium">{version.metrics.accuracy.toFixed(1)}%</span>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-muted-foreground">Precision</span>
                                      <span className="text-sm font-medium">{version.metrics.precision.toFixed(1)}%</span>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-muted-foreground">Recall</span>
                                      <span className="text-sm font-medium">{version.metrics.recall.toFixed(1)}%</span>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-muted-foreground">F1 Score</span>
                                      <span className="text-sm font-medium">{version.metrics.f1Score.toFixed(1)}%</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h5 className="text-xs font-medium">Training</h5>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <span className="block text-xs text-muted-foreground">Training Time</span>
                                      <span className="text-sm font-medium">{version.metrics.trainingTime} min</span>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-muted-foreground">Inference Time</span>
                                      <span className="text-sm font-medium">{version.metrics.inferenceTime} ms</span>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-muted-foreground">Data Size</span>
                                      <span className="text-sm font-medium">{version.trainingData.size} GB</span>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-muted-foreground">Samples</span>
                                      <span className="text-sm font-medium">{version.trainingData.samples.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {index === 0 && (
                                <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                                  <Button variant="outline" size="sm">
                                    <History className="h-4 w-4 mr-2" />
                                    Rollback
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <GitCompare className="h-4 w-4 mr-2" />
                                    Create Branch
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 text-center">
                  <div>
                    <History className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Version History</h3>
                    <p className="text-muted-foreground mb-4">
                      This model doesn't have any version history yet
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Version Comparison</h3>
            {models[0]?.versions?.length > 1 ? (
              <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                <VersionComparisonView versions={models[0].versions} />
              </Suspense>
            ) : (
              <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
                <CardContent className="flex items-center justify-center p-8 text-center">
                  <div>
                    <GitCompare className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Versions to Compare</h3>
                    <p className="text-muted-foreground mb-4">
                      You need at least two versions to compare
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Model Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              {models.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <DeploymentStatus 
                      status={models[0].deployment.status} 
                      instances={models[0].deployment.instances} 
                      region={models[0].deployment.region} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Instances</span>
                    <span className="text-sm text-muted-foreground">
                      {models[0].deployment.instances}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Region</span>
                    <span className="text-sm text-muted-foreground">
                      {models[0].deployment.region}
                    </span>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Model Settings</CardTitle>
            </CardHeader>
            <CardContent>
              {models.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Training Data Size</span>
                        <span className="text-sm text-muted-foreground">
                          {models[0].trainingData.size}GB
                        </span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Number of Samples</span>
                        <span className="text-sm text-muted-foreground">
                          {models[0].trainingData.samples.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Features</span>
                        <span className="text-sm text-muted-foreground">
                          {models[0].trainingData.features.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Deployment Status</span>
                        <span className="text-sm text-muted-foreground">
                          {models[0].deployment.status}
                        </span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Settings Configuration Panel (Placeholder)
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Advanced model details sheet */}
      {detailsModel && (
        <Sheet open={!!detailsModel} onOpenChange={() => setDetailsModel(null)}>
          <SheetContent className="sm:max-w-xl w-full overflow-auto">
            <SheetHeader>
              <SheetTitle>Model Details</SheetTitle>
              <SheetDescription>
                Comprehensive information about the selected model
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {getModelIcon(detailsModel.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{detailsModel.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {detailsModel.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={
                      detailsModel.status === "active" ? "default" :
                      detailsModel.status === "training" ? "secondary" :
                      detailsModel.status === "failed" ? "destructive" : "outline"
                    }>
                      {detailsModel.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Updated {detailsModel.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* More detailed content would go here */}
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Model comparison dialog */}
      {/* This would be implemented for model comparison functionality */}

      {/* Model deployment dialog */}
      {/* This would be implemented for model deployment management */}
    </div>
  )
} 