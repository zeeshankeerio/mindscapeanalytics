"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import type * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  Camera,
  Check,
  ChevronDown,
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
  PieChart,
  LineChart,
  Brain,
  Cpu,
  Gauge,
  BarChart,
  Target,
} from "lucide-react"
import { Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

// 3D Model Component
function AIBrain({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: any) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#ff3333"
            envMapIntensity={0.4}
            clearcoat={0.8}
            clearcoatRoughness={0}
            metalness={0.2}
            distort={0.4}
            speed={0.5}
          />
        </mesh>
        <mesh position={[0, 0, 0.8]} scale={0.2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-0.8, 0.3, 0.5]} scale={0.15}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0.8, -0.3, 0.5]} scale={0.1}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  )
}

// Neural Network Connections
function NeuralConnections() {
  const points = useRef<THREE.Points>(null)
  const linesMaterial = useRef<THREE.LineBasicMaterial>(null)

  useFrame(({ clock }) => {
    if (points.current && linesMaterial.current) {
      const time = clock.getElapsedTime()
      linesMaterial.current.opacity = (Math.sin(time * 0.5) + 1) * 0.25 + 0.2
    }
  })

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([-3, 0, 0, 3, 0, 0, 0, 3, 0, 0, -3, 0, 0, 0, 3, 0, 0, -3])}
            count={6}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#ff0000" sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={
              new Float32Array([
                -3, 0, 0, 3, 0, 0, 0, 3, 0, 0, -3, 0, 0, 0, 3, 0, 0, -3, -3, 0, 0, 0, 3, 0, -3, 0, 0, 0, -3, 0, -3, 0,
                0, 0, 0, 3, -3, 0, 0, 0, 0, -3, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, -3, 0, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0,
                -3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, -3, 0, -3, 0, 0, 0, 3, 0, -3, 0, 0, 0, -3,
              ])
            }
            count={30}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial ref={linesMaterial} color="#ff0000" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

// 3D Scene Component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />

      <group position={[0, 0, 0]}>
        <AIBrain scale={0.8} />
        <NeuralConnections />
      </group>
    </>
  )
}

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
  {
    id: "city",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop",
    name: "City",
    description: "Urban cityscape with buildings",
  },
  {
    id: "traffic",
    url: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop",
    name: "Traffic",
    description: "Traffic on a busy street",
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
  {
    id: "yolov8n",
    name: "YOLOv8 Nano",
    speed: "Fast",
    accuracy: "Medium",
    size: "3.2 MB",
    fps: 120,
    map: 37.3,
    description:
      "Lightweight model optimized for speed and efficiency. Perfect for edge devices and real-time applications.",
  },
  {
    id: "yolov8s",
    name: "YOLOv8 Small",
    speed: "Medium",
    accuracy: "High",
    size: "11.4 MB",
    fps: 85,
    map: 44.9,
    description: "Balanced model with good accuracy and reasonable speed. Suitable for most general applications.",
  },
  {
    id: "yolov8m",
    name: "YOLOv8 Medium",
    speed: "Medium",
    accuracy: "Very High",
    size: "25.9 MB",
    fps: 45,
    map: 50.2,
    description: "Higher accuracy model with moderate speed. Good for applications requiring more precise detections.",
  },
  {
    id: "yolov8l",
    name: "YOLOv8 Large",
    speed: "Slow",
    accuracy: "Excellent",
    size: "43.7 MB",
    fps: 30,
    map: 52.9,
    description: "High-performance model with excellent accuracy. Best for applications where precision is critical.",
  },
  {
    id: "yolov8x",
    name: "YOLOv8 XLarge",
    speed: "Very Slow",
    accuracy: "State-of-the-Art",
    size: "68.2 MB",
    fps: 18,
    map: 53.9,
    description:
      "State-of-the-art accuracy with the largest model size. For applications requiring the highest possible detection quality.",
  },
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

// Interface for model performance metrics
interface ModelMetrics {
  precision: number
  recall: number
  f1Score: number
  inferenceTime: number
  fps: number
}

// Interface for confusion matrix
interface ConfusionMatrix {
  truePositives: number
  falsePositives: number
  falseNegatives: number
  trueNegatives: number
}

export default function EnhancedCVModelDemo() {
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
  const [selectedModel, setSelectedModel] = useState("yolov8m")
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
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics>({
    precision: 0,
    recall: 0,
    f1Score: 0,
    inferenceTime: 0,
    fps: 0,
  })
  const [confusionMatrix, setConfusionMatrix] = useState<ConfusionMatrix>({
    truePositives: 0,
    falsePositives: 0,
    falseNegatives: 0,
    trueNegatives: 0,
  })
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [batchProcessing, setBatchProcessing] = useState(false)
  const [batchImages, setBatchImages] = useState<string[]>([])
  const [batchProgress, setBatchProgress] = useState(0)
  const [batchResults, setBatchResults] = useState<Record<string, Detection[]>>({})
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const [iouThreshold, setIouThreshold] = useState(0.45)
  const [maxDetections, setMaxDetections] = useState(100)
  const [showAnimation, setShowAnimation] = useState(true)
  const [showGrid, setShowGrid] = useState(false)
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true)
  const [visualizationMode, setVisualizationMode] = useState<"standard" | "heatmap" | "wireframe" | "segments">(
    "standard",
  )
  const [modelComparison, setModelComparison] = useState(false)
  const [comparisonModels, setComparisonModels] = useState<string[]>(["yolov8n", "yolov8m"])
  const [comparisonResults, setComparisonResults] = useState<Record<string, Detection[]>>({})
  const [comparisonMetrics, setComparisonMetrics] = useState<Record<string, ModelMetrics>>({})

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const controls = useAnimation()

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
      resetMetrics()
    }
  }

  // Reset metrics
  const resetMetrics = () => {
    setModelMetrics({
      precision: 0,
      recall: 0,
      f1Score: 0,
      inferenceTime: 0,
      fps: 0,
    })
    setConfusionMatrix({
      truePositives: 0,
      falsePositives: 0,
      falseNegatives: 0,
      trueNegatives: 0,
    })
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
        resetMetrics()
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
        { progress: 5, message: "Loading model weights..." },
        { progress: 15, message: "Initializing neural network..." },
        { progress: 25, message: "Preprocessing image..." },
        { progress: 40, message: "Running inference..." },
        { progress: 60, message: "Processing detections..." },
        { progress: 75, message: "Applying non-maximum suppression..." },
        { progress: 85, message: "Calculating confidence scores..." },
        { progress: 95, message: "Finalizing results..." },
      ]

      let stageIndex = 0

      // Get model speed factor
      const modelSpeedFactor = MODEL_OPTIONS.find((m) => m.id === selectedModel)?.fps || 30
      const baseDelay = 10000 / modelSpeedFactor // Faster models process quicker

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

            // Calculate model metrics
            calculateModelMetrics()

            setTimeout(() => {
              setIsProcessing(false)

              // Animate in the results
              if (showAnimation) {
                controls.start({
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                })
              }
            }, 500)
          }, baseDelay * 0.2)
        }
      }, baseDelay * 0.1)
    }

    simulateProcessing()
  }

  // Calculate model metrics
  const calculateModelMetrics = () => {
    // Get model data
    const model = MODEL_OPTIONS.find((m) => m.id === selectedModel)
    if (!model) return

    // Calculate inference time based on model FPS
    const inferenceTime = 1000 / model.fps

    // Generate random metrics based on model accuracy
    const baseAccuracy = model.map / 100
    const precision = baseAccuracy * (0.9 + Math.random() * 0.1)
    const recall = baseAccuracy * (0.85 + Math.random() * 0.15)
    const f1Score = (2 * (precision * recall)) / (precision + recall)

    // Set metrics
    setModelMetrics({
      precision,
      recall,
      f1Score,
      inferenceTime,
      fps: model.fps,
    })

    // Calculate confusion matrix
    const totalDetections = Math.floor(Math.random() * 50) + 50
    const truePositives = Math.floor(totalDetections * precision)
    const falsePositives = Math.floor(totalDetections * (1 - precision))
    const falseNegatives = Math.floor(truePositives * (1 / recall - 1))
    const trueNegatives = Math.floor((falsePositives * (1 - precision)) / precision)

    setConfusionMatrix({
      truePositives,
      falsePositives,
      falseNegatives,
      trueNegatives,
    })
  }

  // Generate random detections for demo purposes
  const generateRandomDetections = () => {
    const imageElement = imageRef.current
    if (!imageElement) return

    const imageWidth = imageElement.naturalWidth
    const imageHeight = imageElement.naturalHeight

    // Get model data
    const model = MODEL_OPTIONS.find((m) => m.id === selectedModel)
    if (!model) return

    // Number of detections based on model accuracy
    const baseDetectionCount = Math.floor(model.map / 2)
    const detectionCount = baseDetectionCount + Math.floor(Math.random() * 10)

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

      // Generate confidence based on model accuracy
      const baseAccuracy = model.map / 100
      const confidenceBase = baseAccuracy * (0.7 + Math.random() * 0.3)

      // Add some randomness to confidence
      const confidence = Math.min(0.99, confidenceBase + (Math.random() * 0.2 - 0.1))

      newDetections.push({
        id: `detection-${i}`,
        class: detectionClass,
        confidence,
        bbox: [x, y, width, height],
      })
    }

    // Sort by confidence
    newDetections.sort((a, b) => b.confidence - a.confidence)

    // Update detections and stats
    setDetections(newDetections)
    updateStats(newDetections)

    // If model comparison is enabled, generate comparison results
    if (modelComparison) {
      generateComparisonResults(newDetections)
    }
  }

  // Generate comparison results
  const generateComparisonResults = (baseDetections: Detection[]) => {
    const results: Record<string, Detection[]> = {}
    const metrics: Record<string, ModelMetrics> = {}

    comparisonModels.forEach((modelId) => {
      if (modelId === selectedModel) {
        results[modelId] = [...baseDetections]
        metrics[modelId] = { ...modelMetrics }
        return
      }

      const model = MODEL_OPTIONS.find((m) => m.id === modelId)
      if (!model) return

      // Create variations of the base detections
      const modelDetections = baseDetections.map((detection) => {
        // Adjust confidence based on model accuracy
        const accuracyRatio = model.map / (MODEL_OPTIONS.find((m) => m.id === selectedModel)?.map || 50)
        const newConfidence = Math.min(0.99, detection.confidence * accuracyRatio * (0.9 + Math.random() * 0.2))

        // Slightly adjust bounding box
        const [x, y, width, height] = detection.bbox
        const newX = Math.max(0, x + Math.floor(Math.random() * 20 - 10))
        const newY = Math.max(0, y + Math.floor(Math.random() * 20 - 10))
        const newWidth = Math.max(20, width + Math.floor(Math.random() * 20 - 10))
        const newHeight = Math.max(20, height + Math.floor(Math.random() * 20 - 10))

        return {
          ...detection,
          confidence: newConfidence,
          bbox: [newX, newY, newWidth, newHeight] as [number, number, number, number],
        }
      })

      // Randomly add or remove some detections
      const finalDetections = [...modelDetections]

      // Add some unique detections
      if (Math.random() > 0.5) {
        const extraCount = Math.floor(Math.random() * 3) + 1
        for (let i = 0; i < extraCount; i++) {
          const randomClass = DETECTION_CLASSES[Math.floor(Math.random() * DETECTION_CLASSES.length)]
          const imageWidth = imageRef.current?.naturalWidth || 800
          const imageHeight = imageRef.current?.naturalHeight || 600

          const width = Math.floor(Math.random() * (imageWidth / 4) + 40)
          const height = Math.floor(Math.random() * (imageHeight / 4) + 40)
          const x = Math.floor(Math.random() * (imageWidth - width))
          const y = Math.floor(Math.random() * (imageHeight - height))

          finalDetections.push({
            id: `extra-${modelId}-${i}`,
            class: randomClass,
            confidence: 0.5 + Math.random() * 0.3,
            bbox: [x, y, width, height],
          })
        }
      }

      // Remove some detections
      if (Math.random() > 0.3 && finalDetections.length > 3) {
        const removeCount = Math.floor(Math.random() * 3) + 1
        for (let i = 0; i < removeCount; i++) {
          const randomIndex = Math.floor(Math.random() * finalDetections.length)
          finalDetections.splice(randomIndex, 1)
        }
      }

      // Sort by confidence
      finalDetections.sort((a, b) => b.confidence - a.confidence)

      results[modelId] = finalDetections

      // Calculate metrics for this model
      const inferenceTime = 1000 / model.fps
      const baseAccuracy = model.map / 100
      const precision = baseAccuracy * (0.9 + Math.random() * 0.1)
      const recall = baseAccuracy * (0.85 + Math.random() * 0.15)
      const f1Score = (2 * (precision * recall)) / (precision + recall)

      metrics[modelId] = {
        precision,
        recall,
        f1Score,
        inferenceTime,
        fps: model.fps,
      }
    })

    setComparisonResults(results)
    setComparisonMetrics(metrics)
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

    // Draw grid if enabled
    if (showGrid) {
      const gridSize = 50
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 0.5

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Draw detections based on visualization mode
    if (showBoundingBoxes) {
      filteredDetections.forEach((detection) => {
        const [x, y, width, height] = detection.bbox
        const isSelected = selectedDetection?.id === detection.id

        // Get color for class
        const color = CLASS_COLORS[detection.class] || "rgb(255, 0, 0)"

        if (visualizationMode === "standard") {
          // Draw bounding box
          ctx.strokeStyle = color
          ctx.lineWidth = isSelected ? 3 : 2
          ctx.strokeRect(x, y, width, height)

          // Draw label if enabled
          if (showLabels) {
            // Label background
            ctx.fillStyle = color
            const label = showConfidence
              ? `${detection.class} ${Math.round(detection.confidence * 100)}%`
              : detection.class
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
        } else if (visualizationMode === "wireframe") {
          // Draw wireframe
          ctx.strokeStyle = color
          ctx.lineWidth = isSelected ? 2 : 1
          ctx.setLineDash([5, 5])
          ctx.strokeRect(x, y, width, height)
          ctx.setLineDash([])

          // Draw corners
          const cornerSize = 5
          ctx.fillStyle = color
          ctx.fillRect(x - cornerSize / 2, y - cornerSize / 2, cornerSize, cornerSize)
          ctx.fillRect(x + width - cornerSize / 2, y - cornerSize / 2, cornerSize, cornerSize)
          ctx.fillRect(x - cornerSize / 2, y + height - cornerSize / 2, cornerSize, cornerSize)
          ctx.fillRect(x + width - cornerSize / 2, y + height - cornerSize / 2, cornerSize, cornerSize)

          // Draw label if enabled
          if (showLabels) {
            ctx.fillStyle = "white"
            ctx.font = "12px Arial"
            const label = showConfidence
              ? `${detection.class} ${Math.round(detection.confidence * 100)}%`
              : detection.class
            ctx.fillText(label, x, y - 5)
          }
        } else if (visualizationMode === "segments") {
          // Draw segmentation-like visualization
          ctx.fillStyle = `${color}40` // Semi-transparent fill
          ctx.fillRect(x, y, width, height)

          ctx.strokeStyle = color
          ctx.lineWidth = isSelected ? 3 : 2
          ctx.strokeRect(x, y, width, height)

          // Draw label if enabled
          if (showLabels) {
            ctx.fillStyle = "white"
            ctx.font = "12px Arial"
            const label = showConfidence
              ? `${detection.class} ${Math.round(detection.confidence * 100)}%`
              : detection.class

            // Add background for better readability
            const labelWidth = ctx.measureText(label).width + 4
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
            ctx.fillRect(x + 2, y + 2, labelWidth, 16)

            ctx.fillStyle = "white"
            ctx.fillText(label, x + 4, y + 14)
          }
        }
      })
    }

    // Draw heatmap if enabled
    if (visualizationMode === "heatmap") {
      // Create heatmap
      const heatmapData = new Uint8ClampedArray(canvas.width * canvas.height * 4).fill(0)

      filteredDetections.forEach((detection) => {
        const [x, y, width, height] = detection.bbox
        const intensity = Math.floor(detection.confidence * 255)

        for (let i = Math.max(0, Math.floor(x)); i < Math.min(canvas.width, Math.ceil(x + width)); i++) {
          for (let j = Math.max(0, Math.floor(y)); j < Math.min(canvas.height, Math.ceil(y + height)); j++) {
            const idx = (j * canvas.width + i) * 4
            heatmapData[idx] = Math.min(255, heatmapData[idx] + intensity) // R
            heatmapData[idx + 1] = 0 // G
            heatmapData[idx + 2] = 0 // B
            heatmapData[idx + 3] = Math.min(200, heatmapData[idx + 3] + intensity * 0.7) // A
          }
        }
      })

      // Create image data and draw heatmap
      const heatmapImageData = new ImageData(heatmapData, canvas.width, canvas.height)
      ctx.putImageData(heatmapImageData, 0, 0)
    }

    ctx.restore()
  }, [
    imageUrl,
    filteredDetections,
    zoomLevel,
    pan,
    selectedDetection,
    showLabels,
    showConfidence,
    showGrid,
    showBoundingBoxes,
    visualizationMode,
  ])

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

  // Get model performance color
  const getPerformanceColor = (value: number) => {
    if (value >= 0.9) return "text-green-500"
    if (value >= 0.7) return "text-yellow-500"
    return "text-red-500"
  }

  // Get model comparison data for charts
  const getModelComparisonData = () => {
    return comparisonModels.map((modelId) => {
      const model = MODEL_OPTIONS.find((m) => m.id === modelId)
      const metrics = comparisonMetrics[modelId] || {
        precision: 0,
        recall: 0,
        f1Score: 0,
        inferenceTime: 0,
        fps: 0,
      }

      return {
        name: model?.name || modelId,
        precision: Math.round(metrics.precision * 100),
        recall: Math.round(metrics.recall * 100),
        f1Score: Math.round(metrics.f1Score * 100),
        inferenceTime: Math.round(metrics.inferenceTime),
        fps: metrics.fps,
        detections: comparisonResults[modelId]?.length || 0,
      }
    })
  }

  // Get confusion matrix data for visualization
  const getConfusionMatrixData = () => {
    return [
      { name: "True Positives", value: confusionMatrix.truePositives },
      { name: "False Positives", value: confusionMatrix.falsePositives },
      { name: "False Negatives", value: confusionMatrix.falseNegatives },
      { name: "True Negatives", value: confusionMatrix.trueNegatives },
    ]
  }

  // Get class distribution data for charts
  const getClassDistributionData = () => {
    return Object.entries(stats)
      .filter(([cls]) => classVisibility[cls] && filteredDetections.some((d) => d.class === cls))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([cls, count]) => ({
        name: cls,
        value: count,
        color: CLASS_COLORS[cls],
      }))
  }

  // Get confidence distribution data
  const getConfidenceDistributionData = () => {
    const ranges = [
      { range: "90-100%", min: 0.9, max: 1.0 },
      { range: "80-90%", min: 0.8, max: 0.9 },
      { range: "70-80%", min: 0.7, max: 0.8 },
      { range: "60-70%", min: 0.6, max: 0.7 },
      { range: "50-60%", min: 0.5, max: 0.6 },
      { range: "<50%", min: 0, max: 0.5 },
    ]

    return ranges.map((range) => {
      const count = filteredDetections.filter((d) => d.confidence >= range.min && d.confidence < range.max).length

      return {
        name: range.range,
        value: count,
        percent: filteredDetections.length > 0 ? (count / filteredDetections.length) * 100 : 0,
      }
    })
  }

  // Get model info
  const getModelInfo = () => {
    return MODEL_OPTIONS.find((m) => m.id === selectedModel) || MODEL_OPTIONS[0]
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/5"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-60"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-5">
            <div className="relative h-[400px] rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Scene />
              </Canvas>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-2">Advanced Computer Vision</h3>
                <p className="text-white/70 mb-4">
                  Our models leverage state-of-the-art neural networks to deliver exceptional accuracy and performance.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Object Detection", "Instance Segmentation", "Pose Estimation", "Tracking"].map(
                    (feature, index) => (
                      <Badge key={index} className="bg-red-500/20 text-red-400 hover:bg-red-500/30">
                        {feature}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-red-500" />
                    <span>Model Selection</span>
                  </CardTitle>
                  <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">
                    {modelComparison ? "Comparison Mode" : "Single Model Mode"}
                  </Badge>
                </div>
                <CardDescription>
                  Choose from our range of YOLOv8 models, each optimized for different use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MODEL_OPTIONS.map((model) => (
                      <div
                        key={model.id}
                        className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                          selectedModel === model.id
                            ? "border-red-500 bg-red-500/10"
                            : "border-white/10 hover:border-white/30 bg-black/30"
                        }`}
                        onClick={() => setSelectedModel(model.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{model.name}</h3>
                            <p className="text-xs text-white/60">{model.description}</p>
                          </div>
                          {selectedModel === model.id && (
                            <div className="bg-red-500 rounded-full p-1">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="flex flex-col items-center">
                            <div className="text-xs text-white/60 mb-1">Speed</div>
                            <Badge
                              className={`${
                                model.speed === "Fast"
                                  ? "bg-green-500/20 text-green-400"
                                  : model.speed === "Medium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : model.speed === "Slow"
                                      ? "bg-orange-500/20 text-orange-400"
                                      : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {model.speed}
                            </Badge>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-xs text-white/60 mb-1">Accuracy</div>
                            <Badge
                              className={`${
                                model.accuracy === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : model.accuracy === "High"
                                    ? "bg-green-500/20 text-green-400"
                                    : model.accuracy === "Very High"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-purple-500/20 text-purple-400"
                              }`}
                            >
                              {model.accuracy}
                            </Badge>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-xs text-white/60 mb-1">Size</div>
                            <span className="text-sm">{model.size}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch id="model-comparison" checked={modelComparison} onCheckedChange={setModelComparison} />
                      <Label htmlFor="model-comparison">Enable Model Comparison</Label>
                    </div>

                    {modelComparison && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                            Select Models <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 bg-black/90 border-white/10">
                          <div className="space-y-2">
                            <h4 className="font-medium">Compare Models</h4>
                            <p className="text-sm text-white/70">Select up to 3 models to compare</p>
                            <div className="space-y-2 mt-2">
                              {MODEL_OPTIONS.map((model) => (
                                <div key={model.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`compare-${model.id}`}
                                    checked={comparisonModels.includes(model.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        if (comparisonModels.length < 3) {
                                          setComparisonModels([...comparisonModels, model.id])
                                        }
                                      } else {
                                        setComparisonModels(comparisonModels.filter((id) => id !== model.id))
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`compare-${model.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {model.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Performance</span>
                      </div>
                      <div className="text-3xl font-bold">{getModelInfo().fps} FPS</div>
                      <div className="text-xs text-white/60 mt-1">Frames per second</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Accuracy</span>
                      </div>
                      <div className="text-3xl font-bold">{getModelInfo().map}%</div>
                      <div className="text-xs text-white/60 mt-1">mAP@0.5:0.95</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Model Size</span>
                      </div>
                      <div className="text-3xl font-bold">{getModelInfo().size}</div>
                      <div className="text-xs text-white/60 mt-1">Compressed weights</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                    <BarChart className="h-4 w-4 mr-2" />
                    Analysis
                  </TabsTrigger>
                  {modelComparison && (
                    <TabsTrigger
                      value="comparison"
                      className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                    >
                      <LineChart className="h-4 w-4 mr-2" />
                      Comparison
                    </TabsTrigger>
                  )}
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

                          <Select
                            value={visualizationMode}
                            onValueChange={(value) => setVisualizationMode(value as any)}
                          >
                            <SelectTrigger className="w-[180px] bg-black/50 border-white/10">
                              <SelectValue placeholder="Visualization mode" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/10">
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="wireframe">Wireframe</SelectItem>
                              <SelectItem value="segments">Segmentation</SelectItem>
                              <SelectItem value="heatmap">Heatmap</SelectItem>
                            </SelectContent>
                          </Select>
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

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowGrid(!showGrid)}
                            className={`border-white/10 hover:bg-white/10 ${showGrid ? "bg-white/10" : ""}`}
                          >
                            <Layers className="h-4 w-4 mr-2" />
                            Grid
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
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

                      {filteredDetections.length > 0 && (
                        <Card className="bg-black/30 border-white/10">
                          <CardHeader className="py-3">
                            <CardTitle className="text-base">Model Performance</CardTitle>
                          </CardHeader>
                          <CardContent className="py-0">
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-white/70">Precision</span>
                                <span className={getPerformanceColor(modelMetrics.precision)}>
                                  {(modelMetrics.precision * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-white/70">Recall</span>
                                <span className={getPerformanceColor(modelMetrics.recall)}>
                                  {(modelMetrics.recall * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-white/70">F1 Score</span>
                                <span className={getPerformanceColor(modelMetrics.f1Score)}>
                                  {(modelMetrics.f1Score * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-white/70">Inference Time</span>
                                <span>{modelMetrics.inferenceTime.toFixed(1)} ms</span>
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
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={getClassDistributionData()}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {getClassDistributionData().map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Confidence Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredDetections.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <AlertCircle className="h-8 w-8 text-white/20 mb-2" />
                          <p className="text-white/60">No data available. Run detection first.</p>
                        </div>
                      ) : (
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getConfidenceDistributionData()}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                              <YAxis stroke="rgba(255,255,255,0.5)" />
                              <Tooltip />
                              <Bar dataKey="value" name="Count">
                                {getConfidenceDistributionData().map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={
                                      index === 0
                                        ? "#10b981"
                                        : index === 1
                                          ? "#3b82f6"
                                          : index === 2
                                            ? "#f59e0b"
                                            : index === 3
                                              ? "#f97316"
                                              : index === 4
                                                ? "#ef4444"
                                                : "#dc2626"
                                    }
                                  />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Confusion Matrix</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredDetections.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <AlertCircle className="h-8 w-8 text-white/20 mb-2" />
                          <p className="text-white/60">No data available. Run detection first.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                              <div className="text-sm text-white/70 mb-1">True Positives</div>
                              <div className="text-2xl font-bold text-green-500">{confusionMatrix.truePositives}</div>
                              <div className="text-xs text-white/60 mt-1">Correctly identified objects</div>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                              <div className="text-sm text-white/70 mb-1">False Positives</div>
                              <div className="text-2xl font-bold text-red-500">{confusionMatrix.falsePositives}</div>
                              <div className="text-xs text-white/60 mt-1">Incorrectly identified objects</div>
                            </div>
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                              <div className="text-sm text-white/70 mb-1">False Negatives</div>
                              <div className="text-2xl font-bold text-yellow-500">{confusionMatrix.falseNegatives}</div>
                              <div className="text-xs text-white/60 mt-1">Missed objects</div>
                            </div>
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                              <div className="text-sm text-white/70 mb-1">True Negatives</div>
                              <div className="text-2xl font-bold text-blue-500">{confusionMatrix.trueNegatives}</div>
                              <div className="text-xs text-white/60 mt-1">Correctly ignored non-objects</div>
                            </div>
                          </div>

                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={getConfusionMatrixData()}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  <Cell key="tp" fill="#10b981" />
                                  <Cell key="fp" fill="#ef4444" />
                                  <Cell key="fn" fill="#f59e0b" />
                                  <Cell key="tn" fill="#3b82f6" />
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredDetections.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <AlertCircle className="h-8 w-8 text-white/20 mb-2" />
                          <p className="text-white/60">No data available. Run detection first.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm text-white/70">Precision</span>
                                <span className={getPerformanceColor(modelMetrics.precision)}>
                                  {(modelMetrics.precision * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress
                                value={modelMetrics.precision * 100}
                                className="h-2"
                                style={
                                  {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    "--progress-background": "#10b981",
                                  } as any
                                }
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm text-white/70">Recall</span>
                                <span className={getPerformanceColor(modelMetrics.recall)}>
                                  {(modelMetrics.recall * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress
                                value={modelMetrics.recall * 100}
                                className="h-2"
                                style={
                                  {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    "--progress-background": "#3b82f6",
                                  } as any
                                }
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm text-white/70">F1 Score</span>
                                <span className={getPerformanceColor(modelMetrics.f1Score)}>
                                  {(modelMetrics.f1Score * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress
                                value={modelMetrics.f1Score * 100}
                                className="h-2"
                                style={
                                  {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    "--progress-background": "#8b5cf6",
                                  } as any
                                }
                              />
                            </div>
                          </div>

                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={[
                                  { name: "0.1", precision: 100, recall: 30 },
                                  { name: "0.2", precision: 98, recall: 45 },
                                  { name: "0.3", precision: 95, recall: 60 },
                                  { name: "0.4", precision: 92, recall: 70 },
                                  { name: "0.5", precision: 88, recall: 78 },
                                  { name: "0.6", precision: 84, recall: 82 },
                                  { name: "0.7", precision: 78, recall: 88 },
                                  { name: "0.8", precision: 70, recall: 92 },
                                  { name: "0.9", precision: 60, recall: 96 },
                                  { name: "1.0", precision: 40, recall: 100 },
                                ]}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                  dataKey="name"
                                  stroke="rgba(255,255,255,0.5)"
                                  label={{
                                    value: "Confidence Threshold",
                                    position: "insideBottom",
                                    offset: -5,
                                    fill: "rgba(255,255,255,0.5)",
                                  }}
                                />
                                <YAxis
                                  stroke="rgba(255,255,255,0.5)"
                                  label={{
                                    value: "Score (%)",
                                    angle: -90,
                                    position: "insideLeft",
                                    fill: "rgba(255,255,255,0.5)",
                                  }}
                                />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="precision" stroke="#10b981" name="Precision" />
                                <Line type="monotone" dataKey="recall" stroke="#3b82f6" name="Recall" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {modelComparison && (
                <TabsContent value="comparison" className="mt-0">
                  <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-black/30 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-lg">Model Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {comparisonModels.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <AlertCircle className="h-8 w-8 text-white/20 mb-2" />
                            <p className="text-white/60">No models selected for comparison.</p>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="h-[300px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={getModelComparisonData()}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                                  <YAxis stroke="rgba(255,255,255,0.5)" />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="precision" name="Precision (%)" fill="#10b981" />
                                  <Bar dataKey="recall" name="Recall (%)" fill="#3b82f6" />
                                  <Bar dataKey="recall" name="Recall (%)" fill="#3b82f6" />
                                  <Bar dataKey="f1Score" name="F1 Score (%)" fill="#8b5cf6" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={getModelComparisonData()}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                                    <YAxis stroke="rgba(255,255,255,0.5)" />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="fps" name="Speed (FPS)" stroke="#ef4444" />
                                    <Line
                                      type="monotone"
                                      dataKey="inferenceTime"
                                      name="Inference Time (ms)"
                                      stroke="#f59e0b"
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>

                              <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={getModelComparisonData()}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                                    <YAxis stroke="rgba(255,255,255,0.5)" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="detections" name="Objects Detected" fill="#6366f1" />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                              <h3 className="text-lg font-medium mb-4">Model Comparison Summary</h3>
                              <div className="space-y-4">
                                <div className="grid grid-cols-4 gap-2 text-sm font-medium text-white/70">
                                  <div>Model</div>
                                  <div>Accuracy</div>
                                  <div>Speed</div>
                                  <div>Size</div>
                                </div>
                                <Separator />
                                {comparisonModels.map((modelId) => {
                                  const model = MODEL_OPTIONS.find((m) => m.id === modelId)
                                  if (!model) return null

                                  return (
                                    <div key={modelId} className="grid grid-cols-4 gap-2">
                                      <div className="font-medium">{model.name}</div>
                                      <div className={getPerformanceColor(model.map / 100)}>{model.map}% mAP</div>
                                      <div>{model.fps} FPS</div>
                                      <div>{model.size}</div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}

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

                      <div className="flex items-center justify-between">
                        <span>Show Grid</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowGrid(!showGrid)}
                          className={`border-white/10 hover:bg-white/10 ${showGrid ? "bg-white/10" : ""}`}
                        >
                          {showGrid ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                          {showGrid ? "Enabled" : "Disabled"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Show Bounding Boxes</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                          className={`border-white/10 hover:bg-white/10 ${showBoundingBoxes ? "bg-white/10" : ""}`}
                        >
                          {showBoundingBoxes ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                          {showBoundingBoxes ? "Enabled" : "Disabled"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Show Animations</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAnimation(!showAnimation)}
                          className={`border-white/10 hover:bg-white/10 ${showAnimation ? "bg-white/10" : ""}`}
                        >
                          {showAnimation ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                          {showAnimation ? "Enabled" : "Disabled"}
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

                      <div className="space-y-3">
                        <span>Visualization Mode</span>
                        <Select value={visualizationMode} onValueChange={(value) => setVisualizationMode(value as any)}>
                          <SelectTrigger className="bg-black/50 border-white/10">
                            <SelectValue placeholder="Visualization mode" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/10">
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="wireframe">Wireframe</SelectItem>
                            <SelectItem value="segments">Segmentation</SelectItem>
                            <SelectItem value="heatmap">Heatmap</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Advanced Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>IoU Threshold</span>
                          <span className="text-white/70">{iouThreshold}</span>
                        </div>
                        <Slider
                          value={[iouThreshold]}
                          min={0.1}
                          max={0.9}
                          step={0.05}
                          onValueChange={([value]) => setIouThreshold(value)}
                        />
                        <div className="flex justify-between text-xs text-white/50">
                          <span>0.1</span>
                          <span>0.9</span>
                        </div>
                        <div className="text-xs text-white/60">
                          Intersection over Union threshold for non-maximum suppression
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Max Detections</span>
                          <span className="text-white/70">{maxDetections}</span>
                        </div>
                        <Slider
                          value={[maxDetections]}
                          min={10}
                          max={300}
                          step={10}
                          onValueChange={([value]) => setMaxDetections(value)}
                        />
                        <div className="flex justify-between text-xs text-white/50">
                          <span>10</span>
                          <span>300</span>
                        </div>
                        <div className="text-xs text-white/60">Maximum number of detections to return</div>
                      </div>

                      <div className="pt-2">
                        <h3 className="text-sm font-medium mb-3">Model Parameters</h3>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                            <div>Parameter</div>
                            <div>Value</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-white/70">Input Size</div>
                            <div>640 × 640</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-white/70">Backbone</div>
                            <div>CSPDarknet</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-white/70">Neck</div>
                            <div>SPPF + PAN</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-white/70">Head</div>
                            <div>Decoupled</div>
                          </div>
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

// Missing Checkbox component
function Checkbox({
  id,
  checked,
  onCheckedChange,
  ...props
}: {
  id: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex items-center space-x-2" {...props}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="h-4 w-4 rounded border-white/20 bg-black/30 text-red-500 focus:ring-red-500 focus:ring-offset-0"
      />
    </div>
  )
}

