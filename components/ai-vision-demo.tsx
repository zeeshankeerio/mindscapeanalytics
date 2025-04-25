"use client"

import type React from "react"

import Image from "next/image";
import { useState, useRef, useEffect } from "react"
import { Camera, Upload, RefreshCw, X, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function AIVisionDemo() {
  const [activeTab, setActiveTab] = useState("upload")
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any[] | null>(null)
  const [confidenceThreshold, setConfidenceThreshold] = useState(50)
  const [showLabels, setShowLabels] = useState(true)
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [captureInterval, setCaptureInterval] = useState<NodeJS.Timeout | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultCanvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  // Sample detection results
  const sampleDetections = [
    { label: "Person", confidence: 0.98, bbox: { x: 0.2, y: 0.3, width: 0.3, height: 0.5 } },
    { label: "Car", confidence: 0.92, bbox: { x: 0.6, y: 0.7, width: 0.2, height: 0.15 } },
    { label: "Dog", confidence: 0.85, bbox: { x: 0.1, y: 0.6, width: 0.15, height: 0.2 } },
    { label: "Bicycle", confidence: 0.76, bbox: { x: 0.5, y: 0.4, width: 0.1, height: 0.1 } },
    { label: "Chair", confidence: 0.65, bbox: { x: 0.8, y: 0.2, width: 0.1, height: 0.2 } },
  ]

  // Initialize camera
  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      setCameraStream(stream)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      toast({
        title: "Camera Initialized",
        description: "Your camera is now ready to use.",
      })
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)

      if (captureInterval) {
        clearInterval(captureInterval)
        setCaptureInterval(null)
      }

      setIsCapturing(false)
    }
  }

  // Handle tab change
  useEffect(() => {
    if (activeTab === "camera") {
      initCamera()
    } else {
      stopCamera()
    }

    // Reset state when changing tabs
    setImage(null)
    setResults(null)
    setIsProcessing(false)
    setProgress(0)

    return () => {
      stopCamera()
    }
  }, [activeTab])

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
      setResults(null)
    }
    reader.readAsDataURL(file)
  }

  // Capture image from camera
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const capturedImage = canvas.toDataURL("image/jpeg")
    setImage(capturedImage)
    setResults(null)
  }

  // Toggle continuous capture
  const toggleContinuousCapture = () => {
    if (isCapturing) {
      if (captureInterval) {
        clearInterval(captureInterval)
        setCaptureInterval(null)
      }
      setIsCapturing(false)
    } else {
      captureImage()
      processImage()

      const interval = setInterval(() => {
        captureImage()
        processImage(true) // Skip progress animation for continuous capture
      }, 2000)

      setCaptureInterval(interval)
      setIsCapturing(true)
    }
  }

  // Process image with AI
  const processImage = (skipProgress = false) => {
    if (!image) return

    setIsProcessing(true)
    setResults(null)

    if (!skipProgress) {
      setProgress(0)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 5
        })
      }, 100)

      setTimeout(() => {
        clearInterval(progressInterval)
        setProgress(100)
        setIsProcessing(false)

        // Simulate random results based on sample detections
        const randomizedResults = sampleDetections.map((detection) => ({
          ...detection,
          confidence: Math.min(0.99, detection.confidence + (Math.random() * 0.1 - 0.05)),
          bbox: {
            x: Math.max(0.05, Math.min(0.85, detection.bbox.x + (Math.random() * 0.1 - 0.05))),
            y: Math.max(0.05, Math.min(0.85, detection.bbox.y + (Math.random() * 0.1 - 0.05))),
            width: Math.max(0.1, Math.min(0.4, detection.bbox.width + (Math.random() * 0.05 - 0.025))),
            height: Math.max(0.1, Math.min(0.4, detection.bbox.height + (Math.random() * 0.05 - 0.025))),
          },
        }))

        setResults(randomizedResults)
        drawDetections(randomizedResults)
      }, 2000)
    } else {
      // Fast processing for continuous capture
      setProgress(100)
      setIsProcessing(false)

      const randomizedResults = sampleDetections.map((detection) => ({
        ...detection,
        confidence: Math.min(0.99, detection.confidence + (Math.random() * 0.1 - 0.05)),
        bbox: {
          x: Math.max(0.05, Math.min(0.85, detection.bbox.x + (Math.random() * 0.1 - 0.05))),
          y: Math.max(0.05, Math.min(0.85, detection.bbox.y + (Math.random() * 0.1 - 0.05))),
          width: Math.max(0.1, Math.min(0.4, detection.bbox.width + (Math.random() * 0.05 - 0.025))),
          height: Math.max(0.1, Math.min(0.4, detection.bbox.height + (Math.random() * 0.05 - 0.025))),
        },
      }))

      setResults(randomizedResults)
      drawDetections(randomizedResults)
    }
  }

  // Draw detection results on canvas
  const drawDetections = (detections: any[]) => {
    if (!resultCanvasRef.current || !image) return

    const canvas = resultCanvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      // Draw the image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      if (!showBoundingBoxes) return

      // Draw bounding boxes for detections above threshold
      detections.forEach((detection) => {
        if (detection.confidence * 100 < confidenceThreshold) return

        const { x, y, width, height } = detection.bbox
        const boxX = x * canvas.width
        const boxY = y * canvas.height
        const boxWidth = width * canvas.width
        const boxHeight = height * canvas.height

        // Draw bounding box
        ctx.strokeStyle = `rgba(255, 0, 0, ${detection.confidence})`
        ctx.lineWidth = 3
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight)

        if (showLabels) {
          // Draw label background
          const label = `${detection.label}: ${Math.round(detection.confidence * 100)}%`
          const labelWidth = ctx.measureText(label).width + 10
          ctx.fillStyle = `rgba(255, 0, 0, 0.7)`
          ctx.fillRect(boxX, boxY - 25, labelWidth, 25)

          // Draw label text
          ctx.fillStyle = "white"
          ctx.font = "16px Arial"
          ctx.fillText(label, boxX + 5, boxY - 7)
        }
      })
    }

    img.src = image
  }

  // Redraw detections when settings change
  useEffect(() => {
    if (results) {
      drawDetections(results)
    }
  }, [confidenceThreshold, showLabels, showBoundingBoxes, results])

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!resultCanvasRef.current) return

    if (!isFullscreen) {
      if (resultCanvasRef.current.requestFullscreen) {
        resultCanvasRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="camera">Live Camera</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg p-6 min-h-[300px]">
            {!image ? (
              <>
                <ImageIcon className="h-16 w-16 text-white/50 mb-4" />
                <p className="text-white/70 mb-4">Drag and drop an image or click to browse</p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </>
            ) : (
              <div className="relative w-full">
                <div className="flex justify-end mb-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => setImage(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                  <Button size="sm" onClick={() => processImage()} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>

                {isProcessing && <Progress value={progress} className="h-2 mb-2" />}

                <div className="relative">
                  <canvas
                    ref={resultCanvasRef}
                    className="w-full h-auto rounded-lg"
                    style={{ display: results ? "block" : "none" }}
                  />

                  {!results && (
                    <img src={image || "/placeholder.svg"} alt="Uploaded" className="w-full h-auto rounded-lg" />
                  )}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="camera" className="space-y-4">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-auto rounded-lg bg-black/50"
              style={{ display: image ? "none" : "block" }}
            />

            <canvas ref={canvasRef} className="hidden" />

            <canvas
              ref={resultCanvasRef}
              className="w-full h-auto rounded-lg"
              style={{ display: image && results ? "block" : "none" }}
            />

            {image && !results && (
              <img src={image || "/placeholder.svg"} alt="Captured" className="w-full h-auto rounded-lg" />
            )}

            <div className="flex justify-between mt-2 gap-2">
              {!isCapturing ? (
                <>
                  <Button onClick={captureImage} disabled={!cameraStream || isProcessing}>
                    <Camera className="mr-2 h-4 w-4" />
                    Capture
                  </Button>
                  <Button onClick={toggleContinuousCapture} disabled={!cameraStream || isProcessing}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Continuous
                  </Button>
                </>
              ) : (
                <Button variant="destructive" onClick={toggleContinuousCapture}>
                  <X className="mr-2 h-4 w-4" />
                  Stop Capture
                </Button>
              )}

              {image && (
                <Button variant="outline" onClick={() => setImage(null)} disabled={isCapturing}>
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>

            {isProcessing && <Progress value={progress} className="h-2 mt-2" />}
          </div>
        </TabsContent>
      </Tabs>

      {results && (
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Detection Results</h3>
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="confidence-threshold">Confidence Threshold: {confidenceThreshold}%</Label>
                    <span className="text-sm text-white/70">
                      {results.filter((r) => r.confidence * 100 >= confidenceThreshold).length} objects
                    </span>
                  </div>
                  <Slider
                    id="confidence-threshold"
                    min={1}
                    max={100}
                    step={1}
                    value={[confidenceThreshold]}
                    onValueChange={(value) => setConfidenceThreshold(value[0])}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
                      <Label htmlFor="show-labels">Show Labels</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="show-boxes" checked={showBoundingBoxes} onCheckedChange={setShowBoundingBoxes} />
                      <Label htmlFor="show-boxes">Show Bounding Boxes</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-4 h-[200px] overflow-y-auto">
                <div className="space-y-2">
                  {results
                    .filter((result) => result.confidence * 100 >= confidenceThreshold)
                    .sort((a, b) => b.confidence - a.confidence)
                    .map((result, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 rounded-md bg-black/20 hover:bg-black/30"
                      >
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span>{result.label}</span>
                        </div>
                        <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">
                          {Math.round(result.confidence * 100)}%
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

