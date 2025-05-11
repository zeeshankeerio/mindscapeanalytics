"use client"

import { cn } from "@/lib/utils"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { LucideLineChart, Network, Play, Pause, RefreshCw, Settings, Layers } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface LayerNode {
  id: string
  type: string
  neurons: number
  activation: string
}

interface TrainingMetrics {
  epoch: number
  loss: number
  accuracy: number
  valLoss: number
  valAccuracy: number
}

const INITIAL_ARCHITECTURE: LayerNode[] = [
  { id: "input", type: "input", neurons: 784, activation: "linear" },
  { id: "hidden1", type: "dense", neurons: 128, activation: "relu" },
  { id: "hidden2", type: "dense", neurons: 64, activation: "relu" },
  { id: "output", type: "dense", neurons: 10, activation: "softmax" },
]

export default function MLModelDemo() {
  const [architecture, setArchitecture] = useState(INITIAL_ARCHITECTURE)
  const [isTraining, setIsTraining] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [learningRate, setLearningRate] = useState(0.001)
  const [batchSize, setBatchSize] = useState(32)
  const [metrics, setMetrics] = useState<TrainingMetrics[]>([])
  const [selectedLayer, setSelectedLayer] = useState<LayerNode | null>(null)
  const [modelType, setModelType] = useState("neural_network")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()

  // Generate synthetic training metrics
  const generateMetrics = (epoch: number): TrainingMetrics => {
    const baseLoss = Math.exp(-epoch / 20) * 0.5
    const baseAcc = 1 - Math.exp(-epoch / 15) * 0.5

    return {
      epoch,
      loss: baseLoss + Math.random() * 0.1,
      accuracy: baseAcc + Math.random() * 0.05,
      valLoss: baseLoss * 1.2 + Math.random() * 0.15,
      valAccuracy: baseAcc * 0.95 + Math.random() * 0.05,
    }
  }

  // Start/stop training
  const toggleTraining = () => {
    if (isTraining) {
      setIsTraining(false)
    } else {
      setIsTraining(true)
      setMetrics([])
      setEpoch(0)
    }
  }

  // Training loop
  useEffect(() => {
    if (!isTraining) return

    const interval = setInterval(() => {
      setEpoch((prev) => {
        const newEpoch = prev + 1
        setMetrics((metrics) => [...metrics, generateMetrics(newEpoch)])
        if (newEpoch >= 50) {
          setIsTraining(false)
        }
        return newEpoch
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isTraining])

  // Draw neural network visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate layout
      const padding = 50
      const layerSpacing = (canvas.width - padding * 2) / (architecture.length - 1)
      const maxNeurons = Math.max(...architecture.map((layer) => layer.neurons))
      const neuronSpacing = Math.min(20, (canvas.height - padding * 2) / maxNeurons)

      // Draw connections
      ctx.strokeStyle = "rgba(255, 0, 0, 0.1)"
      ctx.lineWidth = 0.5

      architecture.forEach((layer, layerIndex) => {
        if (layerIndex < architecture.length - 1) {
          const nextLayer = architecture[layerIndex + 1]
          const x1 = padding + layerIndex * layerSpacing
          const x2 = padding + (layerIndex + 1) * layerSpacing

          for (let i = 0; i < layer.neurons; i += Math.ceil(layer.neurons / 10)) {
            const y1 = padding + i * neuronSpacing

            for (let j = 0; j < nextLayer.neurons; j += Math.ceil(nextLayer.neurons / 10)) {
              const y2 = padding + j * neuronSpacing

              ctx.beginPath()
              ctx.moveTo(x1, y1)
              ctx.lineTo(x2, y2)
              ctx.stroke()
            }
          }
        }
      })

      // Draw neurons
      architecture.forEach((layer, layerIndex) => {
        const x = padding + layerIndex * layerSpacing

        for (let i = 0; i < layer.neurons; i += Math.ceil(layer.neurons / 10)) {
          const y = padding + i * neuronSpacing

          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)

          // Highlight selected layer
          if (selectedLayer === layer) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.8)"
          } else {
            ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
          }

          ctx.fill()
        }

        // Draw layer label
        ctx.fillStyle = "#ffffff"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(layer.type, x, canvas.height - 20)
      })

      // Animate
      animationFrameId.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [architecture, selectedLayer])

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_30px_rgba(255,0,0,0.15)]">
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Select value={modelType} onValueChange={setModelType}>
            <SelectTrigger className="w-[180px] bg-black/50 border-white/10">
              <SelectValue placeholder="Select model type" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/10">
              <SelectItem value="neural_network">Neural Network</SelectItem>
              <SelectItem value="cnn">CNN</SelectItem>
              <SelectItem value="transformer">Transformer</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Learning Rate:</span>
            <Slider
              value={[learningRate]}
              min={0.0001}
              max={0.01}
              step={0.0001}
              className="w-[100px]"
              onValueChange={([value]) => setLearningRate(value)}
            />
            <span className="text-sm text-white/70">{learningRate}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Batch Size:</span>
            <Select value={batchSize.toString()} onValueChange={(v) => setBatchSize(Number.parseInt(v))}>
              <SelectTrigger className="w-[80px] bg-black/50 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/10">
                {[16, 32, 64, 128].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleTraining} className="border-white/10 hover:bg-white/10">
            {isTraining ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setMetrics([])
              setEpoch(0)
            }}
            className="border-white/10 hover:bg-white/10"
            disabled={isTraining}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Neural network visualization */}
        <div className="bg-black/30 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-red-500" />
              <h3 className="font-medium">Network Architecture</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <Settings className="h-3.5 w-3.5 mr-1" />
              Configure
            </Button>
          </div>

          <canvas ref={canvasRef} width={400} height={300} className="w-full h-[300px] bg-black/20 rounded-lg" />

          <div className="mt-4 flex flex-wrap gap-2">
            {architecture.map((layer) => (
              <Badge
                key={layer.id}
                variant="outline"
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedLayer === layer
                    ? "bg-red-500/20 border-red-500/40"
                    : "bg-white/5 border-white/10 hover:bg-white/10",
                )}
                onClick={() => setSelectedLayer(layer)}
              >
                <Layers className="h-3.5 w-3.5 mr-1" />
                {layer.type} ({layer.neurons})
              </Badge>
            ))}
          </div>
        </div>

        {/* Training metrics */}
        <div className="bg-black/30 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <LucideLineChart className="h-5 w-5 text-red-500" />
              <h3 className="font-medium">Training Progress</h3>
            </div>
            <Badge variant="outline" className="bg-red-500/10 border-red-500/20">
              Epoch {epoch}/50
            </Badge>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="epoch" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                  }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="#ff0000" name="Training Accuracy" />
                <Line
                  type="monotone"
                  dataKey="valAccuracy"
                  stroke="#ff6666"
                  strokeDasharray="5 5"
                  name="Validation Accuracy"
                />
                <Line type="monotone" dataKey="loss" stroke="#0088fe" name="Training Loss" />
                <Line type="monotone" dataKey="valLoss" stroke="#4dabf7" strokeDasharray="5 5" name="Validation Loss" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Training stats */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-black/20 rounded-lg p-3 border border-white/10">
              <div className="text-sm text-white/70 mb-1">Current Metrics</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Loss:</span>
                  <span className="font-medium">{metrics[metrics.length - 1]?.loss.toFixed(4) || "0.0000"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Val Loss:</span>
                  <span className="font-medium">{metrics[metrics.length - 1]?.valLoss.toFixed(4) || "0.0000"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Accuracy:</span>
                  <span className="font-medium">
                    {(metrics[metrics.length - 1]?.accuracy * 100).toFixed(2) || "0.00"}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Val Accuracy:</span>
                  <span className="font-medium">
                    {(metrics[metrics.length - 1]?.valAccuracy * 100).toFixed(2) || "0.00"}%
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-3 border border-white/10">
              <div className="text-sm text-white/70 mb-1">Model Info</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Parameters:</span>
                  <span className="font-medium">1.2M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Layers:</span>
                  <span className="font-medium">{architecture.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Memory:</span>
                  <span className="font-medium">4.8 MB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">FLOPS:</span>
                  <span className="font-medium">2.4G</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

