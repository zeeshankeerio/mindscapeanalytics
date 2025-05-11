"use client"

import type React from "react"

import Image from "next/image";
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertCircle,
  Camera,
  Check,
  Download,
  Eye,
  EyeOff,
  FileImage,
  Layers,
  Percent,
  RefreshCw,
  Settings,
  Share2,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

// Sample images for demo
const SAMPLE_IMAGES = [
  {
    id: "street",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    name: "Street Scene",
    description: "Urban street with pedestrians and vehicles",
  },
  {
    id: "nature",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop",
    name: "Nature Landscape",
    description: "Mountain landscape with trees and lake",
  },
  {
    id: "people",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2089&auto=format&fit=crop",
    name: "People",
    description: "Group of people in an urban setting",
  },
  {
    id: "animals",
    url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&auto=format&fit=crop",
    name: "Animals",
    description: "Wildlife in natural habitat",
  },
]

// Sample detection classes
const DETECTION_CLASSES = [
  "person",
  "bicycle",
  "car",
  "motorcycle",
  "airplane",
  "bus",
  "train",
  "truck",
  "boat",
  "traffic light",
  "fire hydrant",
  "stop sign",
  "parking meter",
  "bench",
  "bird",
  "cat",
  "dog",
  "horse",
  "sheep",
  "cow",
  "elephant",
  "bear",
  "zebra",
  "giraffe",
  "backpack",
  "umbrella",
  "handbag",
  "tie",
  "suitcase",
  "frisbee",
  "skis",
  "snowboard",
  "sports ball",
  "kite",
  "baseball bat",
  "baseball glove",
  "skateboard",
  "surfboard",
  "tennis racket",
  "bottle",
]

// Sample model options
const MODEL_OPTIONS = [
  { id: "yolov8n", name: "YOLOv8 Nano", speed: "Fast", accuracy: "Medium" },
  { id: "yolov8s", name: "YOLOv8 Small", speed: "Medium", accuracy: "High" },
  { id: "yolov8m", name: "YOLOv8 Medium", speed: "Medium", accuracy: "Very High" },
  { id: "yolov8l", name: "YOLOv8 Large", speed: "Slow", accuracy: "Excellent" },
]

// Generate random color for each class
const CLASS_COLORS = DETECTION_CLASSES.reduce(
  (acc, cls) => {
    const r = Math.floor(Math.random() * 200 + 55)
    const g = Math.floor(Math.random() * 200 + 55)
    const b = Math.floor(Math.random() * 200 + 55)
    acc[cls] = `rgb(${r}, ${g}, ${b})`
    return acc
  },
  {} as Record<string, string>,
)

// Interface for detection results
interface Detection {
  id: string
  class: string
  confidence: number
  bbox: [number, number, number, number] // [x, y, width, height]
}

export default function CVModelDemo() {
  // State
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [processingStage, setProcessingStage] = useState("")
  const [detections, setDetections] = useState<Detection[]>([])
  const [filteredDetections, setFilteredDetections] = useState<Detection[]>([])
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5)
  const [selectedModel, setSelectedModel] = useState("yolov8n")
  const [showLabels, setShowLabels] = useState(true)
  const [showConfidence, setShowConfidence] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null)
  const [activeTab, setActiveTab] = useState("detection")
  const [classVisibility, setClassVisibility] = useState<Record<string, boolean>>({})
  const [stats, setStats] = useState<Record<string, number>>({})

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Initialize class visibility
  useEffect(() => {
    const initialVisibility: Record<string, boolean> = {}
    DETECTION_CLASSES.forEach((cls) => {
      initialVisibility[cls] = true
    })
    setClassVisibility(initialVisibility)
  }, [])

  // Handle image selection
  const handleImageSelect = (imageId: string) => {
    const image = SAMPLE_IMAGES.find((img) => img.id === imageId)
    if (image) {
      setSelectedImage(imageId)
      setImageUrl(image.url)
      setUploadedImage(null)
      setDetections([])
      setFilteredDetections([])
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string)
        setUploadedImage(file)
        setSelectedImage(null)
        setDetections([])
        setFilteredDetections([])
      }
      reader.readAsDataURL(file)
    }
  }

  // Process image with object detection
  const processImage = () => {
    if (!imageUrl) return

    setIsProcessing(true)
    setProcessingProgress(0)
    setProcessingStage("Initializing model...")
    setDetections([])
    setFilteredDetections([])

    // Simulate model loading and processing
    const simulateProcessing = () => {
      const stages = [
        { progress: 10, message: "Loading model..." },
        { progress: 20, message: "Preprocessing image..." },
        { progress: 40, message: "Running inference..." },
        { progress: 70, message: "Processing detections..." },
        { progress: 90, message: "Finalizing results..." },
      ]

      let stageIndex = 0

      const interval = setInterval(() => {
        if (stageIndex < stages.length) {
          const stage = stages[stageIndex]
          setProcessingProgress(stage.progress)
          setProcessingStage(stage.message)
          stageIndex++
        } else {
          clearInterval(interval)

          // Generate random detections based on the image
          setTimeout(() => {
            generateRandomDetections()
            setProcessingProgress(100)
            setProcessingStage("Complete!")

            setTimeout(() => {
              setIsProcessing(false)
            }, 500)
          }, 800)
        }
      }, 600)
    }

    simulateProcessing()
  }

  // Generate random detections for demo purposes
  const generateRandomDetections = () => {
    const imageElement = imageRef.current
    if (!imageElement) return

    const imageWidth = imageElement.naturalWidth
    const imageHeight = imageElement.naturalHeight

    // Number of detections based on model size
    const detectionCount =
      selectedModel === "yolov8n" ? 8 : selectedModel === "yolov8s" ? 12 : selectedModel === "yolov8m" ? 16 : 20

    const newDetections: Detection[] = []
    const usedClasses: Record<string, number> = {}

    // Generate random detections
    for (let i = 0; i < detectionCount; i++) {
      // Select a random class with higher probability for common objects
      let detectionClass
      if (i < 3) {
        // Higher probability for person, car, etc.
        detectionClass = DETECTION_CLASSES[Math.floor(Math.random() * 10)]
      } else {
        detectionClass = DETECTION_CLASSES[Math.floor(Math.random() * DETECTION_CLASSES.length)]
      }

      // Count instances of each class
      usedClasses[detectionClass] = (usedClasses[detectionClass] || 0) + 1

      // Generate random bounding box
      const width = Math.floor(Math.random() * (imageWidth / 3) + 50)
      const height = Math.floor(Math.random() * (imageHeight / 3) + 50)
      const x = Math.floor(Math.random() * (imageWidth - width))
      const y = Math.floor(Math.random() * (imageHeight - height))

      // Generate confidence based on model
      const confidenceBase =
        selectedModel === "yolov8n" ? 0.7 : selectedModel === "yolov8s" ? 0.8 : selectedModel === "yolov8m" ? 0.85 : 0.9

      // Add some randomness to confidence
      const confidence = Math.min(0.99, confidenceBase + (Math.random() * 0.2 - 0.1))

      newDetections.push({
        id: `detection-${i}`,
        class: detectionClass,
        confidence,
        bbox: [x, y, width, height],
      })
    }

    // Update detections and stats
    setDetections(newDetections)
    updateStats(newDetections)
  }

  // Update detection statistics
  const updateStats = (detections: Detection[]) => {
    const stats: Record<string, number> = {}

    detections.forEach((detection) => {
      stats[detection.class] = (stats[detection.class] || 0) + 1
    })

    setStats(stats)
  }

  // Filter detections based on confidence threshold and class visibility
  useEffect(() => {
    if (detections.length === 0) return

    const filtered = detections.filter(
      (detection) => detection.confidence >= confidenceThreshold && classVisibility[detection.class],
    )

    setFilteredDetections(filtered)
  }, [detections, confidenceThreshold, classVisibility])

  // Draw detections on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const image = imageRef.current

    if (!canvas || !image || !imageUrl) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match image
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw image
    ctx.save()
    ctx.translate(pan.x, pan.y)
    ctx.scale(zoomLevel, zoomLevel)
    ctx.drawImage(image, 0, 0)

    // Draw detections
    filteredDetections.forEach((detection) => {
      const [x, y, width, height] = detection.bbox
      const isSelected = selectedDetection?.id === detection.id

      // Get color for class
      const color = CLASS_COLORS[detection.class] || "rgb(255, 0, 0)"

      // Draw bounding box
      ctx.strokeStyle = color
      ctx.lineWidth = isSelected ? 3 : 2
      ctx.strokeRect(x, y, width, height)

      // Draw label if enabled
      if (showLabels) {
        // Label background
        ctx.fillStyle = color
        const label = showConfidence ? `${detection.class} ${Math.round(detection.confidence * 100)}%` : detection.class
        const labelWidth = ctx.measureText(label).width + 10
        ctx.fillRect(x, y - 25, labelWidth, 20)

        // Label text
        ctx.fillStyle = "white"
        ctx.font = "14px Arial"
        ctx.fillText(label, x + 5, y - 10)
      }

      // Highlight selected detection
      if (isSelected) {
        ctx.strokeStyle = "white"
        ctx.setLineDash([5, 5])
        ctx.strokeRect(x - 2, y - 2, width + 4, height + 4)
        ctx.setLineDash([])
      }
    })

    ctx.restore()
  }, [imageUrl, filteredDetections, zoomLevel, pan, selectedDetection, showLabels, showConfidence])

  // Handle mouse interactions for pan and zoom
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev * 1.2, 3))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev / 1.2, 0.5))
  const handleResetView = () => {
    setZoomLevel(1)
    setPan({ x: 0, y: 0 })
  }

  // Toggle class visibility
  const toggleClassVisibility = (className: string) => {
    setClassVisibility((prev) => ({
      ...prev,
      [className]: !prev[className],
    }))
  }

  // Export detections as JSON
  const exportDetections = () => {
    const dataStr = JSON.stringify(filteredDetections, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "detections.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/5"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-60"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">INTERACTIVE DEMO</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Try Our <span className="text-red-500">Computer Vision</span> Models
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience the power of our object detection models with this interactive demo. Upload your own image or use
            one of our samples.
          </p>
        </div>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-red-500" />
              <span>Object Detection Demo</span>
            </CardTitle>
            <CardDescription>Detect objects in images using state-of-the-art computer vision models</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="detection" onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-black/50 border border-white/10">
                  <TabsTrigger
                    value="detection"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Detection
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleZoomOut}
                          className="border-white/10 hover:bg-white/10"
                        >
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Zoom Out</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleZoomIn}
                          className="border-white/10 hover:bg-white/10"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Zoom In</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleResetView}
                          className="border-white/10 hover:bg-white/10"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reset View</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <TabsContent value="detection" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-9">
                    <div className="space-y-4">
                      {/* Model selection and confidence threshold */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <Select value={selectedModel} onValueChange={setSelectedModel}>
                            <SelectTrigger className="w-[180px] bg-black/50 border-white/10">
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/10">
                              {MODEL_OPTIONS.map((model) => (
                                <SelectItem key={model.id} value={model.id}>
                                  <div className="flex flex-col">
                                    <span>{model.name}</span>
                                    <span className="text-xs text-white/50">
                                      Speed: {model.speed} | Accuracy: {model.accuracy}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white/70 whitespace-nowrap">Confidence:</span>
                            <Slider
                              value={[confidenceThreshold]}
                              min={0.1}
                              max={1}
                              step={0.05}
                              className="w-[100px]"
                              onValueChange={([value]) => setConfidenceThreshold(value)}
                            />
                            <span className="text-sm text-white/70 w-12">{Math.round(confidenceThreshold * 100)}%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowLabels(!showLabels)}
                            className={`border-white/10 hover:bg-white/10 ${showLabels ? "bg-white/10" : ""}`}
                          >
                            {showLabels ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                            Labels
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowConfidence(!showConfidence)}
                            className={`border-white/10 hover:bg-white/10 ${showConfidence ? "bg-white/10" : ""}`}
                            disabled={!showLabels}
                          >
                            <Percent className="h-4 w-4 mr-2" />
                            Confidence
                          </Button>
                        </div>
                      </div>

                      {/* Canvas container */}
                      <div className="relative aspect-video bg-black/30 rounded-lg overflow-hidden border border-white/10">
                        {/* Hidden image for reference */}
                        <img
                          ref={imageRef}
                          src={imageUrl || "/placeholder.svg?height=720&width=1280"}
                          alt="Selected"
                          className="hidden"
                          crossOrigin="anonymous"
                        />

                        {/* Canvas for drawing */}
                        <canvas
                          ref={canvasRef}
                          className="w-full h-full"
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp}
                        />

                        {/* No image selected state */}
                        {!imageUrl && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                            <FileImage className="h-16 w-16 text-white/20 mb-4" />
                            <h3 className="text-xl font-medium mb-2">No Image Selected</h3>
                            <p className="text-white/60 max-w-md text-center mb-6">
                              Select a sample image or upload your own to begin object detection.
                            </p>
                            <div className="flex gap-4">
                              <Button
                                variant="outline"
                                className="border-white/10 hover:bg-white/10"
                                onClick={() => document.getElementById("image-upload")?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Image
                              </Button>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </div>
                          </div>
                        )}

                        {/* Processing overlay */}
                        <AnimatePresence>
                          {isProcessing && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
                            >
                              <div className="flex flex-col items-center gap-4 max-w-md">
                                <div className="relative">
                                  <svg
                                    className="h-16 w-16 animate-spin text-red-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <Camera className="h-6 w-6 text-white" />
                                  </div>
                                </div>
                                <div className="text-lg font-medium text-white/90">{processingStage}</div>
                                <div className="w-full bg-white/10 rounded-full h-2.5">
                                  <div
                                    className="bg-red-500 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: `${processingProgress}%` }}
                                  />
                                </div>
                                <div className="text-sm text-white/70 text-center mt-2">
                                  Using {MODEL_OPTIONS.find((m) => m.id === selectedModel)?.name} to detect objects in
                                  the image.
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Controls overlay */}
                        {imageUrl && (
                          <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={processImage}
                              className="bg-black/50 border-white/10"
                              disabled={isProcessing || !imageUrl}
                            >
                              <Camera className="h-4 w-4 mr-2" />
                              Detect Objects
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-black/50 border-white/10"
                              onClick={() => document.getElementById("image-upload")?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </div>
                        )}

                        {/* Stats overlay */}
                        {filteredDetections.length > 0 && (
                          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                            <div className="text-sm font-medium mb-2">Detection Summary</div>
                            <div className="space-y-1 max-h-[150px] overflow-y-auto pr-2">
                              {Object.entries(stats)
                                .filter(
                                  ([cls]) => classVisibility[cls] && filteredDetections.some((d) => d.class === cls),
                                )
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 5)
                                .map(([cls, count]) => (
                                  <div key={cls} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: CLASS_COLORS[cls] }}
                                      ></div>
                                      <span className="text-white/70">{cls}</span>
                                    </div>
                                    <span className="font-medium">{count}</span>
                                  </div>
                                ))}
                              {Object.keys(stats).filter(
                                (cls) => classVisibility[cls] && filteredDetections.some((d) => d.class === cls),
                              ).length > 5 && (
                                <div className="text-xs text-white/50 text-center pt-1">
                                  +{" "}
                                  {Object.keys(stats).filter(
                                    (cls) => classVisibility[cls] && filteredDetections.some((d) => d.class === cls),
                                  ).length - 5}{" "}
                                  more
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sample images */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Sample Images</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-white/70 hover:text-white"
                            onClick={() => document.getElementById("image-upload")?.click()}
                          >
                            <Upload className="h-3.5 w-3.5 mr-1.5" />
                            Upload your own
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {SAMPLE_IMAGES.map((image) => (
                            <div
                              key={image.id}
                              className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                                selectedImage === image.id
                                  ? "border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                                  : "border-white/10 hover:border-white/30"
                              }`}
                              onClick={() => handleImageSelect(image.id)}
                            >
                              <img
                                src={image.url || "/placeholder.svg"}
                                alt={image.name}
                                className="w-full h-24 object-cover"
                              />
                              {selectedImage === image.id && (
                                <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                                <div className="text-xs font-medium">{image.name}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="space-y-4">
                      <Card className="bg-black/30 border-white/10">
                        <CardHeader className="py-3">
                          <CardTitle className="text-base">Detected Objects</CardTitle>
                        </CardHeader>
                        <CardContent className="py-0">
                          {filteredDetections.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                              <AlertCircle className="h-8 w-8 text-white/20 mb-2" />
                              <p className="text-white/60 text-sm">
                                {imageUrl
                                  ? "No objects detected. Try adjusting the confidence threshold or processing the image."
                                  : "Select an image and run detection to see results."}
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
                              {filteredDetections
                                .sort((a, b) => b.confidence - a.confidence)
                                .map((detection) => (
                                  <motion.div
                                    key={detection.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`p-2 rounded-lg border ${
                                      selectedDetection?.id === detection.id
                                        ? "bg-white/10 border-red-500"
                                        : "bg-black/30 border-white/10"
                                    } cursor-pointer hover:bg-white/5 transition-colors`}
                                    onClick={() => setSelectedDetection(detection)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div
                                          className="h-3 w-3 rounded-full"
                                          style={{ backgroundColor: CLASS_COLORS[detection.class] }}
                                        ></div>
                                        <span className="capitalize">{detection.class}</span>
                                      </div>
                                      <Badge variant="outline" className="bg-black/50 border-white/20">
                                        {Math.round(detection.confidence * 100)}%
                                      </Badge>
                                    </div>
                                  </motion.div>
                                ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="py-3">
                          <div className="flex justify-between w-full">
                            <div className="text-xs text-white/60">{filteredDetections.length} objects</div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-white/60 hover:text-white"
                                disabled={filteredDetections.length === 0}
                                onClick={exportDetections}
                              >
                                <Download className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-white/60 hover:text-white"
                                disabled={filteredDetections.length === 0}
                              >
                                <Share2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>

                      {selectedDetection && (
                        <Card className="bg-black/30 border-white/10">
                          <CardHeader className="py-3">
                            <CardTitle className="text-base">Object Details</CardTitle>
                          </CardHeader>
                          <CardContent className="py-0">
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="bg-black/20 rounded p-2">
                                  <div className="text-xs text-white/60 mb-1">Class</div>
                                  <div className="font-medium capitalize">{selectedDetection.class}</div>
                                </div>
                                <div className="bg-black/20 rounded p-2">
                                  <div className="text-xs text-white/60 mb-1">Confidence</div>
                                  <div className="font-medium">{Math.round(selectedDetection.confidence * 100)}%</div>
                                </div>
                                <div className="bg-black/20 rounded p-2">
                                  <div className="text-xs text-white/60 mb-1">Position</div>
                                  <div className="font-medium">
                                    x: {selectedDetection.bbox[0]}, y: {selectedDetection.bbox[1]}
                                  </div>
                                </div>
                                <div className="bg-black/20 rounded p-2">
                                  <div className="text-xs text-white/60 mb-1">Size</div>
                                  <div className="font-medium">
                                    {selectedDetection.bbox[2]} × {selectedDetection.bbox[3]}
                                  </div>
                                </div>
                              </div>

                              <div className="bg-black/20 rounded p-2">
                                <div className="text-xs text-white/60 mb-1">Confidence Score</div>
                                <Progress value={selectedDetection.confidence * 100} className="h-2" />
                                <div className="flex justify-between text-xs mt-1">
                                  <span>Low</span>
                                  <span>High</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-black/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Class Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredDetections.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <AlertCircle className="h-8 w-8 text-white/20 mb-2" />
                          <p className="text-white/60">No data available. Run detection first.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {Object.entries(stats)
                            .filter(([cls]) => classVisibility[cls] && filteredDetections.some((d) => d.class === cls))
                            .sort((a, b) => b[1] - a[1])
                            .map(([cls, count]) => (
                              <div key={cls} className="space-y-1">
                                <div className="flex justify-between">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="h-3 w-3 rounded-full"
                                      style={{ backgroundColor: CLASS_COLORS[cls] }}
                                    ></div>
                                    <span className="capitalize">{cls}</span>
                                  </div>
                                  <span>{count}</span>
                                </div>
                                <Progress
                                  value={(count / filteredDetections.length) * 100}
                                  className="h-2"
                                  style={
                                    {
                                      backgroundColor: "rgba(255,255,255,0.1)",
                                      "--progress-background": CLASS_COLORS[cls],
                                    } as any
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Confidence Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredDetections.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <AlertCircle className="h-8 w-8 text-white/20 mb-2" />
                          <p className="text-white/60">No data available. Run detection first.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {[
                            { range: "90-100%", min: 0.9, max: 1.0 },
                            { range: "80-90%", min: 0.8, max: 0.9 },
                            { range: "70-80%", min: 0.7, max: 0.8 },
                            { range: "60-70%", min: 0.6, max: 0.7 },
                            { range: "<60%", min: 0, max: 0.6 },
                          ].map((range, index) => {
                            const count = filteredDetections.filter(
                              (d) => d.confidence >= range.min && d.confidence < range.max,
                            ).length

                            return (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between">
                                  <span>{range.range}</span>
                                  <span>{count}</span>
                                </div>
                                <Progress
                                  value={(count / filteredDetections.length) * 100}
                                  className="h-2"
                                  style={
                                    {
                                      backgroundColor: "rgba(255,255,255,0.1)",
                                      "--progress-background":
                                        index === 0
                                          ? "#10b981"
                                          : index === 1
                                            ? "#3b82f6"
                                            : index === 2
                                              ? "#f59e0b"
                                              : index === 3
                                                ? "#f97316"
                                                : "#ef4444",
                                    } as any
                                  }
                                />
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10 md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Model Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-black/20 rounded-lg p-4">
                          <div className="text-sm text-white/60 mb-1">Model</div>
                          <div className="font-medium">
                            {MODEL_OPTIONS.find((m) => m.id === selectedModel)?.name || "YOLOv8"}
                          </div>
                        </div>
                        <div className="bg-black/20 rounded-lg p-4">
                          <div className="text-sm text-white/60 mb-1">Objects Detected</div>
                          <div className="font-medium">{filteredDetections.length}</div>
                        </div>
                        <div className="bg-black/20 rounded-lg p-4">
                          <div className="text-sm text-white/60 mb-1">Avg. Confidence</div>
                          <div className="font-medium">
                            {filteredDetections.length > 0
                              ? `${Math.round(
                                  (filteredDetections.reduce((sum, d) => sum + d.confidence, 0) /
                                    filteredDetections.length) *
                                    100,
                                )}%`
                              : "N/A"}
                          </div>
                        </div>
                        <div className="bg-black/20 rounded-lg p-4">
                          <div className="text-sm text-white/60 mb-1">Processing Time</div>
                          <div className="font-medium">1.2 seconds</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-black/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Display Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Show Labels</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowLabels(!showLabels)}
                          className={`border-white/10 hover:bg-white/10 ${showLabels ? "bg-white/10" : ""}`}
                        >
                          {showLabels ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                          {showLabels ? "Enabled" : "Disabled"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Show Confidence</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowConfidence(!showConfidence)}
                          className={`border-white/10 hover:bg-white/10 ${showConfidence ? "bg-white/10" : ""}`}
                          disabled={!showLabels}
                        >
                          {showConfidence ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                          {showConfidence ? "Enabled" : "Disabled"}
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Confidence Threshold</span>
                          <span className="text-white/70">{Math.round(confidenceThreshold * 100)}%</span>
                        </div>
                        <Slider
                          value={[confidenceThreshold]}
                          min={0.1}
                          max={1}
                          step={0.05}
                          onValueChange={([value]) => setConfidenceThreshold(value)}
                        />
                        <div className="flex justify-between text-xs text-white/50">
                          <span>10%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Model Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <span>Model Type</span>
                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                          <SelectTrigger className="bg-black/50 border-white/10">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/10">
                            {MODEL_OPTIONS.map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                <div className="flex flex-col">
                                  <span>{model.name}</span>
                                  <span className="text-xs text-white/50">
                                    Speed: {model.speed} | Accuracy: {model.accuracy}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-2">
                        <h3 className="text-sm font-medium mb-3">Model Comparison</h3>
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-2 text-xs text-white/70">
                            <div></div>
                            <div className="text-center">Speed</div>
                            <div className="text-center">Accuracy</div>
                            <div className="text-center">Size</div>
                          </div>
                          {MODEL_OPTIONS.map((model) => (
                            <div
                              key={model.id}
                              className={`grid grid-cols-4 gap-2 p-2 rounded ${
                                selectedModel === model.id ? "bg-white/10" : "bg-black/20"
                              }`}
                            >
                              <div className="font-medium">{model.name.replace("YOLOv8 ", "")}</div>
                              <div className="text-center">
                                {model.speed === "Fast" ? (
                                  <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Fast</Badge>
                                ) : model.speed === "Medium" ? (
                                  <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
                                    Medium
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">Slow</Badge>
                                )}
                              </div>
                              <div className="text-center">
                                {model.accuracy === "Medium" ? (
                                  <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
                                    Medium
                                  </Badge>
                                ) : model.accuracy === "High" ? (
                                  <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">High</Badge>
                                ) : (
                                  <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Excellent</Badge>
                                )}
                              </div>
                              <div className="text-center text-white/70">
                                {model.id === "yolov8n"
                                  ? "3.2 MB"
                                  : model.id === "yolov8s"
                                    ? "11.4 MB"
                                    : model.id === "yolov8m"
                                      ? "25.9 MB"
                                      : "43.7 MB"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10 md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Class Visibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {Object.entries(classVisibility)
                          .filter(([cls]) => detections.some((d) => d.class === cls))
                          .map(([cls, isVisible]) => (
                            <Button
                              key={cls}
                              variant="outline"
                              size="sm"
                              onClick={() => toggleClassVisibility(cls)}
                              className={`justify-start border-white/10 hover:bg-white/10 ${
                                isVisible ? "bg-white/10" : "opacity-50"
                              }`}
                            >
                              <div
                                className="h-3 w-3 rounded-full mr-2"
                                style={{ backgroundColor: CLASS_COLORS[cls] }}
                              ></div>
                              <span className="capitalize truncate">{cls}</span>
                            </Button>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-white/70">Powered by state-of-the-art computer vision models</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">Try Enterprise Version</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

