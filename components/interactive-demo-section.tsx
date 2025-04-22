"use client"

import React, { useState, useRef, useEffect, memo, useCallback, useMemo } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Brain,
  Cpu,
  Network,
  LineChart,
  Database,
  Shield,
  Zap,
  BarChart2,
  Cloud,
  ArrowRight,
  Play,
  Pause,
  Layers,
  Server,
  Code,
  Lock,
  RefreshCw,
  SplitSquareVertical,
  Save,
  Download,
  Share2,
  Info,
  Maximize2,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import dynamic from "next/dynamic"
import {
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart
} from "recharts"
import type { ThreeModelViewerProps } from "@/components/three-model-viewer"

// Dynamically import Three.js component to avoid SSR issues
const ThreeModelViewer = dynamic<ThreeModelViewerProps>(() => 
  import("@/components/three-model-viewer")
    .then(mod => ({ default: mod.ThreeModelViewer })), 
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full w-full bg-black/50 rounded-xl border border-white/10">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin mb-4"></div>
          <p className="text-white/70">Loading visualization...</p>
        </div>
      </div>
    ),
  }
)

// Dynamically import chart components for better code splitting
const PerformanceChart = dynamic(() => import('@/components/charts/performance-chart'), {
  ssr: true,
  loading: () => (
    <div className="h-[180px] w-full bg-black/20 animate-pulse rounded-md"></div>
  )
})

const BarChartComponent = dynamic(() => import('@/components/charts/bar-chart'), {
  ssr: true,
  loading: () => (
    <div className="h-[180px] w-full bg-black/20 animate-pulse rounded-md"></div>
  )
})

const PieChartComponent = dynamic(() => import('@/components/charts/pie-chart'), {
  ssr: true,
  loading: () => (
    <div className="h-[180px] w-full bg-black/20 animate-pulse rounded-md"></div>
  )
})

interface SimulationData {
  nodes: number
  connections: number
  processingSpeed: number
  efficiency: number
  securityScore: number
  latency: number
}

// Helper function to update simulation data periodically
function updateHistoricalData(
  setters: {
    setAiHistoricalData: React.Dispatch<React.SetStateAction<any[]>>,
    setCloudHistoricalData: React.Dispatch<React.SetStateAction<any[]>>,
    setEdgeHistoricalData: React.Dispatch<React.SetStateAction<any[]>>,
    setSecurityHistoricalData: React.Dispatch<React.SetStateAction<any[]>>
  },
  aiData: SimulationData,
  cloudData: SimulationData,
  edgeData: SimulationData
): () => void {
  // Update simulation data periodically
  const interval = setInterval(() => {
    // Update AI historical data when simulation data changes
    if (aiData.efficiency > 0) {
      setters.setAiHistoricalData(prev => {
        const newData = [...prev, {
          time: Date.now(),
          accuracy: aiData.efficiency,
          latency: aiData.latency
        }]
        return newData.slice(-10)
      })
    }

    // Update cloud historical data when simulation data changes
    if (cloudData.processingSpeed > 0) {
      setters.setCloudHistoricalData(prev => {
        const newData = [...prev, {
          time: Date.now(),
          throughput: cloudData.processingSpeed,
          resources: cloudData.nodes / 5
        }]
        return newData.slice(-10)
      })
    }

    // Update edge historical data when simulation data changes
    if (edgeData.latency > 0) {
      setters.setEdgeHistoricalData(prev => {
        const newData = [...prev, {
          time: Date.now(),
          latency: edgeData.latency,
          devices: edgeData.nodes
        }]
        return newData.slice(-10)
      })
    }

    // Update security data
    setters.setSecurityHistoricalData(prev => {
      // Randomly update one of the values
      const index = Math.floor(Math.random() * prev.length)
      const newData = [...prev]
      newData[index] = { 
        ...newData[index], 
        value: Math.max(1, newData[index].value + (Math.random() > 0.5 ? 1 : -1))
      }
      return newData
    })
  }, 5000);

  // Return cleanup function
  return () => clearInterval(interval);
}

// New component for comparing simulation states
const ComparisonView = memo(({
  leftData,
  rightData,
  primaryColor,
  metricKeys = ["nodes", "connections", "processingSpeed", "efficiency", "latency"]
}: {
  leftData: SimulationData,
  rightData: SimulationData,
  primaryColor: string,
  metricKeys?: Array<keyof SimulationData>
}) => {
  const metricLabels: Record<keyof SimulationData, string> = {
    nodes: "Nodes",
    connections: "Connections",
    processingSpeed: "Processing Speed",
    efficiency: "Efficiency (%)",
    securityScore: "Security Score",
    latency: "Latency (ms)",
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    return previous ? ((current - previous) / previous) * 100 : 0;
  };

  return (
    <div className="p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
      <h4 className="text-lg font-semibold mb-4">Performance Comparison</h4>
      
      <div className="space-y-4">
        {metricKeys.map((key) => {
          const percentChange = calculatePercentageChange(rightData[key], leftData[key]);
          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">{metricLabels[key]}</span>
                <div className="flex items-center">
                  <span className={`${percentChange > 0 ? 'text-green-500' : percentChange < 0 ? 'text-red-500' : 'text-white/70'}`}>
                    {percentChange.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="relative h-8 bg-white/5 rounded-md overflow-hidden flex">
                <div 
                  className={`h-full bg-${primaryColor}-500/20 flex items-center justify-end px-2 text-xs font-medium`}
                  style={{ width: `${(leftData[key] / (leftData[key] + rightData[key])) * 100}%` }}
                >
                  {leftData[key].toFixed(1)}
                </div>
                <div 
                  className={`h-full bg-${primaryColor}-600/40 flex items-center px-2 text-xs font-medium`}
                  style={{ width: `${(rightData[key] / (leftData[key] + rightData[key])) * 100}%` }}
                >
                  {rightData[key].toFixed(1)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-between mt-6 text-sm">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full bg-${primaryColor}-500/20 mr-2`}></div>
          <span>Before</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full bg-${primaryColor}-600/40 mr-2`}></div>
          <span>After</span>
        </div>
      </div>
    </div>
  );
});

// New component for rendering tooltip with pulse animation
const PulsingTooltip = ({ message, isVisible }: { message: string, isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute top-full mt-2 right-0 bg-black/80 backdrop-blur-sm text-white/90 px-3 py-2 rounded-md border border-white/20 text-xs shadow-lg z-10 animate-in fade-in zoom-in-95">
      <div className="flex items-center">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
        {message}
      </div>
    </div>
  );
};

// New component for real-time status indicator
const StatusIndicator = ({ status }: { status: "idle" | "running" | "paused" }) => {
  const getColor = () => {
    switch (status) {
      case "running": return "bg-green-500";
      case "paused": return "bg-yellow-500";
      case "idle": return "bg-white/30";
      default: return "bg-white/30";
    }
  };
  
  const getLabel = () => {
    switch (status) {
      case "running": return "Simulation Running";
      case "paused": return "Simulation Paused";
      case "idle": return "Simulation Ready";
      default: return "Status Unknown";
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <div className={`h-2 w-2 rounded-full ${getColor()} ${status === "running" ? "animate-pulse" : ""}`}></div>
      <span className="text-xs text-white/70">{getLabel()}</span>
    </div>
  );
};

// New component for AI recommendations
const AIRecommendations = ({ data, technology }: { data: SimulationData, technology: string }) => {
  const getRecommendations = () => {
    switch (technology) {
      case 'ai':
        if (data.efficiency < 90) {
          return {
            title: "Low Model Efficiency",
            recommendation: "Consider increasing training epochs or optimizing your neural network architecture.",
            type: "warning"
          };
        } else if (data.latency > 2) {
          return {
            title: "High Inference Latency",
            recommendation: "Optimize model for inference or implement model quantization techniques.",
            type: "warning"
          };
        } else if (data.nodes > 200 && data.efficiency > 95) {
          return {
            title: "Opportunity for Model Pruning",
            recommendation: "Your model is performing well but could be optimized for size while maintaining accuracy.",
            type: "info"
          };
        } else {
          return {
            title: "Optimal Configuration",
            recommendation: "Your AI model is well-balanced for both accuracy and performance.",
            type: "success"
          };
        }
      case 'cloud':
        if (data.nodes < 128) {
          return {
            title: "Limited Scaling Capacity",
            recommendation: "Consider increasing node count for better handling of traffic spikes.",
            type: "warning"
          };
        } else if (data.efficiency < 90) {
          return {
            title: "Resource Utilization Issue",
            recommendation: "Optimize resource allocation or implement auto-scaling strategies.",
            type: "warning"
          };
        } else {
          return {
            title: "Cloud Configuration Optimized",
            recommendation: "Your cloud infrastructure is well-provisioned for current workloads.",
            type: "success"
          };
        }
      case 'edge':
        if (data.latency > 3) {
          return {
            title: "High Edge Latency",
            recommendation: "Optimize local processing or improve edge device connectivity.",
            type: "warning"
          };
        } else if (data.connections < 150) {
          return {
            title: "Limited Edge Connectivity",
            recommendation: "Your edge network may benefit from additional connection points.",
            type: "info"
          };
        } else {
          return {
            title: "Edge Network Optimized",
            recommendation: "Your edge computing network is well-balanced for performance and efficiency.",
            type: "success"
          };
        }
      case 'security':
        if (data.securityScore < 90) {
          return {
            title: "Security Vulnerabilities Detected",
            recommendation: "Implement additional security measures to enhance protection.",
            type: "warning"
          };
        } else {
          return {
            title: "Strong Security Posture",
            recommendation: "Your security infrastructure is robust and effectively mitigating threats.",
            type: "success"
          };
        }
      default:
        return {
          title: "Configuration Analysis",
          recommendation: "Analyze your current configuration for optimization opportunities.",
          type: "info"
        };
    }
  };
  
  const recommendation = getRecommendations();
  const typeColors = {
    warning: "border-yellow-500/50 bg-yellow-500/10",
    info: "border-blue-500/50 bg-blue-500/10",
    success: "border-green-500/50 bg-green-500/10"
  };
  
  const typeIcons = {
    warning: <AlertTriangle className="h-4 w-4 text-yellow-400" />,
    info: <Info className="h-4 w-4 text-blue-400" />,
    success: <CheckCircle className="h-4 w-4 text-green-400" />
  };
  
  return (
    <div className={`mt-4 border ${typeColors[recommendation.type as keyof typeof typeColors]} rounded-lg p-4`}>
      <div className="flex items-start">
        <div className="mt-0.5 mr-3">
          {typeIcons[recommendation.type as keyof typeof typeIcons]}
        </div>
        <div>
          <h5 className="text-sm font-medium mb-1">{recommendation.title}</h5>
          <p className="text-xs text-white/70">{recommendation.recommendation}</p>
        </div>
      </div>
    </div>
  );
};

// Interactive simulation card with advanced metrics
function SimulationCard({
  title,
  description,
  icon,
  data,
  onUpdate,
  primaryColor = "red",
}: {
  title: string
  description: string
  icon: React.ReactNode
  data: SimulationData
  onUpdate: (data: SimulationData) => void
  primaryColor?: string
}) {
  const [isRunning, setIsRunning] = useState(false)
  const [simSpeed, setSimSpeed] = useState(50)
  const [selectedScenario, setSelectedScenario] = useState("normal")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Simulation effect
  useEffect(() => {
    if (!isRunning) return
    
    const interval = setInterval(() => {
      const scenarioMultipliers = {
        normal: { speed: 1, efficiency: 1, connections: 1 },
        optimized: { speed: 1.5, efficiency: 1.2, connections: 0.8 },
        stressed: { speed: 0.7, efficiency: 0.8, connections: 1.5 },
        failure: { speed: 0.3, efficiency: 0.6, connections: 0.4 },
      }
      
      const multiplier = scenarioMultipliers[selectedScenario as keyof typeof scenarioMultipliers]
      
      // Use deterministic values based on time
      const time = Date.now()
      const timeBasedRandom = (time % 1000) / 1000 // Value between 0 and 1
      
      onUpdate({
        ...data,
        processingSpeed: data.processingSpeed + 
          (timeBasedRandom * 0.5 - 0.2) * (simSpeed / 50) * multiplier.speed,
        efficiency: Math.min(99.9, Math.max(85, data.efficiency + 
          (timeBasedRandom * 0.3 - 0.1) * (simSpeed / 50) * multiplier.efficiency)),
        connections: Math.floor(data.connections + 
          (timeBasedRandom * 5 - 2) * (simSpeed / 50) * multiplier.connections),
        latency: Math.max(0.5, data.latency + 
          (timeBasedRandom * 0.2 - 0.1) * (simSpeed / 50) * (2 - multiplier.efficiency)),
        securityScore: Math.min(99, Math.max(75, data.securityScore + 
          (timeBasedRandom * 0.2 - 0.1) * multiplier.efficiency)),
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isRunning, data, onUpdate, simSpeed, selectedScenario])

  const colorVariants = {
    red: "from-red-500/20 to-red-600/20 border-red-500/40 hover:border-red-500/60",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/40 hover:border-blue-500/60",
    green: "from-green-500/20 to-green-600/20 border-green-500/40 hover:border-green-500/60",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/40 hover:border-purple-500/60",
    yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/40 hover:border-yellow-500/60",
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-gradient-to-br ${colorVariants[primaryColor as keyof typeof colorVariants]} backdrop-blur-md border rounded-xl p-6 shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg bg-${primaryColor}-500/20 mr-3`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsRunning(!isRunning)}
          className={`rounded-full ${isRunning ? 'bg-red-500/20 hover:bg-red-500/30' : 'bg-green-500/20 hover:bg-green-500/30'}`}
        >
          {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="mb-4">
        <select 
          className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-white/80 text-sm"
          value={selectedScenario}
          onChange={(e) => setSelectedScenario(e.target.value)}
        >
          <option value="normal">Scenario: Normal Operation</option>
          <option value="optimized">Scenario: Optimized Performance</option>
          <option value="stressed">Scenario: High Load</option>
          <option value="failure">Scenario: Partial System Failure</option>
        </select>
      </div>
      
      <p className="text-white/70 mb-6">{description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-white/70">Processing</span>
            <span className="text-sm font-medium">{data.processingSpeed.toFixed(1)} Tb/s</span>
          </div>
          <Progress value={data.processingSpeed * 10} max={1000} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-white/70">Efficiency</span>
            <span className="text-sm font-medium">{data.efficiency.toFixed(1)}%</span>
          </div>
          <Progress value={data.efficiency} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-white/70">Connections</span>
            <span className="text-sm font-medium">{data.connections}</span>
          </div>
          <Progress value={data.connections} max={1000} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-white/70">Latency</span>
            <span className="text-sm font-medium">{data.latency.toFixed(2)} ms</span>
          </div>
          <Progress value={Math.max(0, 100 - data.latency * 10)} className="h-2" />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-white/70">Simulation Speed</span>
          <span className="text-sm font-medium">{simSpeed}%</span>
        </div>
        <Slider
          value={[simSpeed]}
          min={10}
          max={100}
          step={10}
          onValueChange={(value) => setSimSpeed(value[0])}
          className="py-2"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-white/70">Status: {isRunning ? "Active" : "Standby"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="optimize" checked={data.securityScore > 90} />
          <Label htmlFor="optimize" className="text-sm">Optimize</Label>
        </div>
      </div>
    </motion.div>
  )
}

interface ParticleData {
  id: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

interface ServerData {
  id: number;
  x: number;
  y: number;
  connections: number[];
}

interface NodeData {
  id: number;
  x: number;
  y: number;
  server: number;
}

const AISimulation = ({ running }: { running: boolean }) => {
  const [particles, setParticles] = useState<ParticleData[]>([]);
  
  useEffect(() => {
    // Generate particles only on client-side
    const newParticles: ParticleData[] = Array.from({ length: 80 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.7 ? "#10b981" : 
             Math.random() > 0.5 ? "#3b82f6" : "#ef4444",
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg bg-black/50 shadow-inner">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            x: `${particle.x}%`,
            y: `${particle.y}%`,
          }}
          animate={running ? {
            x: [null, `${(particle.x + 20) % 100}%`, `${(particle.x + 40) % 100}%`],
            y: [null, `${(particle.y + 15) % 100}%`, `${(particle.y - 15 + 100) % 100}%`],
          } : {}}
          transition={{
            duration: 10 / particle.speed,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-blue-600/20 to-transparent" />
      <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-purple-600/20 to-transparent" />
    </div>
  );
};

const CloudSimulation = ({ running }: { running: boolean }) => {
  const [servers, setServers] = useState<ServerData[]>([]);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  
  useEffect(() => {
    // Generate servers and nodes with deterministic positions
    const newServers: ServerData[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 20 + (i * 15),
      y: 25,
      connections: [],
    }));
    
    const newNodes: NodeData[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 10 + ((i * 5.33) % 80), // Distribute nodes evenly across x-axis
      y: 50 + ((i * 2.66) % 40), // Distribute nodes evenly across y-axis
      server: i % 5, // Distribute nodes evenly among servers
    }));
    
    // Create connections
    const serversWithConnections = newServers.map(server => ({
      ...server,
      connections: newNodes
        .filter(node => node.server === server.id)
        .map(node => node.id)
    }));
    
    setServers(serversWithConnections);
    setNodes(newNodes);
  }, []);

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg bg-black/50 shadow-inner">
      {/* Render servers */}
      {servers.map((server) => (
        <motion.div
          key={`server-${server.id}`}
          className="absolute w-12 h-6 bg-blue-500/30 border border-blue-500/50 rounded-md"
          style={{
            left: `${server.x}%`,
            top: `${server.y}%`,
          }}
          animate={running ? {
            y: [null, "2%", "-2%"],
            opacity: [null, 1, 0.7],
          } : {}}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Render nodes */}
      {nodes.map((node) => (
        <motion.div
          key={`node-${node.id}`}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={running ? {
            scale: [null, 1.2, 0.8],
            opacity: [null, 1, 0.6],
          } : {}}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: node.id * 0.1,
          }}
        />
      ))}
      
      {/* Connection lines */}
      {servers.map((server) => 
        server.connections.map((nodeId) => {
          const node = nodes.find(n => n.id === nodeId);
          if (!node) return null;
          
          return (
            <svg 
              key={`connection-${server.id}-${nodeId}`}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              <motion.line
                x1={`${server.x + 6}%`}
                y1={`${server.y + 3}%`}
                x2={`${node.x + 1}%`}
                y2={`${node.y + 1}%`}
                stroke="#3b82f6"
                strokeWidth="1"
                strokeOpacity="0.3"
                animate={running ? {
                  strokeOpacity: [null, 0.5, 0.2],
                } : {}}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: nodeId * 0.1,
                }}
              />
            </svg>
          );
        })
      )}
      
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-blue-600/20 to-transparent" />
    </div>
  );
};

// Main component
const InteractiveDemoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Static initial values for server-side rendering
  const [aiData, setAiData] = useState<SimulationData>({
    nodes: 128,
    connections: 512,
    processingSpeed: 42.5,
    efficiency: 94.3,
    securityScore: 92,
    latency: 1.2,
  })
  
  const [cloudData, setCloudData] = useState<SimulationData>({
    nodes: 256,
    connections: 768,
    processingSpeed: 56.8,
    efficiency: 92.1,
    securityScore: 95,
    latency: 0.8,
  })
  
  const [edgeData, setEdgeData] = useState<SimulationData>({
    nodes: 64,
    connections: 192,
    processingSpeed: 32.1,
    efficiency: 89.7,
    securityScore: 88,
    latency: 2.4,
  })
  
  const [securityData, setSecurityData] = useState<SimulationData>({
    nodes: 48,
    connections: 384,
    processingSpeed: 28.6,
    efficiency: 96.2,
    securityScore: 99,
    latency: 1.5,
  })

  // Static version of timestamp to avoid hydration mismatch
  const BASE_TIMESTAMP = 1672531200000; // Jan 1, 2023

  // Historical performance data for charts - use static values to prevent hydration mismatch
  const [aiHistoricalData, setAiHistoricalData] = useState<{ time: number, accuracy: number, latency: number }[]>(
    Array(10).fill(0).map((_, i) => ({ 
      time: BASE_TIMESTAMP + i * 3000, // Static timestamp starting from Jan 1, 2023
      accuracy: 90 - (i % 3), // Static values with minimal variation
      latency: 2 + (i % 2) * 0.2 // Static values with minimal variation
    }))
  )
  
  const [cloudHistoricalData, setCloudHistoricalData] = useState<{ time: number, throughput: number, resources: number }[]>(
    Array(10).fill(0).map((_, i) => ({ 
      time: BASE_TIMESTAMP + i * 3000, // Static timestamp starting from Jan 1, 2023
      throughput: 50 + (i % 4) * 2, // Static values with minimal variation
      resources: 70 - (i % 3) * 2 // Static values with minimal variation
    }))
  )
  
  const [edgeHistoricalData, setEdgeHistoricalData] = useState<{ time: number, latency: number, devices: number }[]>(
    Array(10).fill(0).map((_, i) => ({ 
      time: BASE_TIMESTAMP + i * 3000, // Static timestamp starting from Jan 1, 2023
      latency: 2 - (i % 3) * 0.1, // Static values with minimal variation
      devices: 50 + (i % 5) * 2 // Static values with minimal variation
    }))
  )
  
  const [securityHistoricalData, setSecurityHistoricalData] = useState<{ name: string, value: number }[]>([
    { name: 'Threats Detected', value: 37 },
    { name: 'Threats Blocked', value: 35 },
    { name: 'False Positives', value: 2 },
    { name: 'Under Investigation', value: 5 },
  ])
  
  // Generate random data for charts only on client-side
  useEffect(() => {
    // Wait a short time after component mount to update with randomized data
    const timer = setTimeout(() => {
      setAiHistoricalData(prev => 
        prev.map((item, i) => ({
          ...item,
          accuracy: 85 + Math.random() * 10,
          latency: 3 - Math.random() * 1.5
        }))
      );
      
      setCloudHistoricalData(prev => 
        prev.map((item, i) => ({
          ...item,
          throughput: 45 + Math.random() * 15,
          resources: 65 + Math.random() * 25
        }))
      );
      
      setEdgeHistoricalData(prev => 
        prev.map((item, i) => ({
          ...item,
          latency: 1 + Math.random() * 3,
          devices: 40 + Math.random() * 30
        }))
      );
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate data updates based on simulation states
  useEffect(() => {
    updateHistoricalData({
      setAiHistoricalData,
      setCloudHistoricalData,
      setEdgeHistoricalData,
      setSecurityHistoricalData
    }, aiData, cloudData, edgeData);
  }, [aiData, cloudData, edgeData]);

  // Add comparison mode
  const [comparisonMode, setComparisonMode] = useState(false);
  const [baselineData, setBaselineData] = useState<{
    ai: SimulationData;
    cloud: SimulationData;
    edge: SimulationData;
    security: SimulationData;
  }>({
    ai: { ...aiData },
    cloud: { ...cloudData },
    edge: { ...edgeData },
    security: { ...securityData }
  });

  // State for active tab 
  const [activeTab, setActiveTab] = useState("ai");
  
  // Add state for simulation presets
  const [simulationPresets] = useState({
    ai: [
      { name: "Basic Training", data: { nodes: 64, connections: 256, processingSpeed: 30.5, efficiency: 88.7, securityScore: 90, latency: 2.5 } },
      { name: "Production Ready", data: { nodes: 128, connections: 512, processingSpeed: 45.2, efficiency: 94.3, securityScore: 92, latency: 1.2 } },
      { name: "Enterprise Scale", data: { nodes: 256, connections: 1024, processingSpeed: 65.8, efficiency: 97.1, securityScore: 98, latency: 0.8 } }
    ],
    cloud: [
      { name: "Development", data: { nodes: 64, connections: 256, processingSpeed: 35.2, efficiency: 85.4, securityScore: 88, latency: 2.1 } },
      { name: "Production", data: { nodes: 256, connections: 768, processingSpeed: 56.8, efficiency: 92.1, securityScore: 95, latency: 0.8 } },
      { name: "High Performance", data: { nodes: 512, connections: 1536, processingSpeed: 88.5, efficiency: 96.3, securityScore: 97, latency: 0.4 } }
    ],
    edge: [
      { name: "Minimal", data: { nodes: 32, connections: 96, processingSpeed: 18.4, efficiency: 82.5, securityScore: 85, latency: 3.8 } },
      { name: "Standard", data: { nodes: 64, connections: 192, processingSpeed: 32.1, efficiency: 89.7, securityScore: 88, latency: 2.4 } },
      { name: "Advanced", data: { nodes: 128, connections: 384, processingSpeed: 45.6, efficiency: 94.2, securityScore: 92, latency: 1.3 } }
    ],
    security: [
      { name: "Basic", data: { nodes: 24, connections: 192, processingSpeed: 22.5, efficiency: 88.3, securityScore: 90, latency: 2.8 } },
      { name: "Enhanced", data: { nodes: 48, connections: 384, processingSpeed: 28.6, efficiency: 96.2, securityScore: 99, latency: 1.5 } },
      { name: "Maximum", data: { nodes: 96, connections: 768, processingSpeed: 35.2, efficiency: 99.5, securityScore: 99.9, latency: 0.8 } }
    ]
  });

  // Function to toggle comparison mode
  const toggleComparisonMode = useCallback(() => {
    if (!comparisonMode) {
      // Save current state as baseline when entering comparison mode
      setBaselineData({
        ai: { ...aiData },
        cloud: { ...cloudData },
        edge: { ...edgeData },
        security: { ...securityData }
      });
    }
    setComparisonMode(!comparisonMode);
  }, [comparisonMode, aiData, cloudData, edgeData, securityData]);

  // Function to apply a preset configuration
  const applyPreset = useCallback((preset: SimulationData, type: string) => {
    switch (type) {
      case 'ai':
        setAiData({ ...preset });
        break;
      case 'cloud':
        setCloudData({ ...preset });
        break;
      case 'edge':
        setEdgeData({ ...preset });
        break;
      case 'security':
        setSecurityData({ ...preset });
        break;
    }
  }, []);

  // Get current data based on active tab
  const getCurrentData = useMemo(() => {
    switch (activeTab) {
      case 'ai': return aiData;
      case 'cloud': return cloudData;
      case 'edge': return edgeData;
      case 'security': return securityData;
      default: return aiData;
    }
  }, [activeTab, aiData, cloudData, edgeData, securityData]);

  // Get baseline data based on active tab
  const getBaselineData = useMemo(() => {
    switch (activeTab) {
      case 'ai': return baselineData.ai;
      case 'cloud': return baselineData.cloud;
      case 'edge': return baselineData.edge;
      case 'security': return baselineData.security;
      default: return baselineData.ai;
    }
  }, [activeTab, baselineData]);

  // Get presets for current tab
  const getCurrentPresets = useMemo(() => {
    switch (activeTab) {
      case 'ai': return simulationPresets.ai;
      case 'cloud': return simulationPresets.cloud;
      case 'edge': return simulationPresets.edge;
      case 'security': return simulationPresets.security;
      default: return simulationPresets.ai;
    }
  }, [activeTab, simulationPresets]);

  // Helper for color based on active tab
  const getActiveColor = useMemo(() => {
    switch (activeTab) {
      case 'ai': return "red";
      case 'cloud': return "blue";
      case 'edge': return "green";
      case 'security': return "purple";
      default: return "red";
    }
  }, [activeTab]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-20">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            INTERACTIVE DEMOS
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Experience Our Technology in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore real-time simulations of our key technologies and see how they can transform your business operations.
          </p>
        </div>

        <Tabs 
          defaultValue="ai" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex flex-wrap items-center justify-between mb-6">
            <TabsList className="grid w-full sm:w-auto md:w-[600px] mx-auto sm:mx-0 grid-cols-4 mb-6 sm:mb-0 bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-xl">
              <TabsTrigger 
                value="ai" 
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500/20 data-[state=active]:to-red-600/20 data-[state=active]:border-red-500/50 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.3)] rounded-lg border border-transparent data-[state=active]:border-red-500/50 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <Brain className="h-5 w-5 mb-1 text-red-500" />
                  <span className="hidden md:inline text-xs font-medium">AI/ML</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="cloud" 
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-600/20 data-[state=active]:border-blue-500/50 data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-lg border border-transparent data-[state=active]:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <Cloud className="h-5 w-5 mb-1 text-blue-500" />
                  <span className="hidden md:inline text-xs font-medium">Cloud</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="edge" 
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500/20 data-[state=active]:to-green-600/20 data-[state=active]:border-green-500/50 data-[state=active]:shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-lg border border-transparent data-[state=active]:border-green-500/50 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <Cpu className="h-5 w-5 mb-1 text-green-500" />
                  <span className="hidden md:inline text-xs font-medium">Edge</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500/20 data-[state=active]:to-purple-600/20 data-[state=active]:border-purple-500/50 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.3)] rounded-lg border border-transparent data-[state=active]:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <Shield className="h-5 w-5 mb-1 text-purple-500" />
                  <span className="hidden md:inline text-xs font-medium">Security</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <div className="w-full sm:w-auto flex space-x-2 justify-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleComparisonMode}
                className={`text-xs ${comparisonMode ? `border-${getActiveColor}-500/50 bg-${getActiveColor}-500/20` : ''}`}
              >
                <SplitSquareVertical className="h-3.5 w-3.5 mr-1.5" />
                {comparisonMode ? "Exit Comparison" : "Compare Changes"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                Save Config
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs hidden md:flex"
              >
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
                Share
              </Button>
            </div>
          </div>
          
          <TabsContent value="ai" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <SimulationCard
                  title="AI Model Training"
                  description="Real-time simulation of our distributed AI training infrastructure with parallel processing capabilities."
                  icon={<Brain className="h-6 w-6 text-red-400" />}
                  data={aiData}
                  onUpdate={setAiData}
                  primaryColor="red"
                />
                
                {/* Presets selection */}
                <div className="flex justify-between mt-6 mb-3">
                  <h4 className="text-lg font-semibold">Configuration Presets</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAiData({...baselineData.ai})}
                    className="text-xs"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {getCurrentPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`text-xs h-auto py-3 flex flex-col items-center justify-center border-white/10 hover:border-${getActiveColor}-500/50 hover:bg-${getActiveColor}-500/10`}
                      onClick={() => applyPreset(preset.data, activeTab)}
                    >
                      <span className="font-medium">{preset.name}</span>
                      <span className="text-[10px] text-white/60 mt-1">
                        {preset.data.nodes} nodes, {preset.data.efficiency.toFixed(1)}% eff
                      </span>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Neural Network Architecture</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Input Layers</span>
                      <span className="text-sm font-medium">{Math.round(aiData.nodes / 4)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Hidden Layers</span>
                      <span className="text-sm font-medium">{Math.round(aiData.nodes / 2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Output Layers</span>
                      <span className="text-sm font-medium">{Math.round(aiData.nodes / 8)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Parameters</span>
                      <span className="text-sm font-medium">{(aiData.connections * 1000000).toLocaleString()}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Training Accuracy</span>
                      <span className="text-sm font-medium">{aiData.efficiency.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
                
                {comparisonMode && (
                  <ComparisonView
                    leftData={getBaselineData}
                    rightData={getCurrentData}
                    primaryColor={getActiveColor}
                  />
                )}
                
                <AIRecommendations data={aiData} technology="ai" />
                
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Performance Metrics</h4>
                  <PerformanceChart
                    data={aiHistoricalData}
                    leftDataKey="accuracy"
                    rightDataKey="latency"
                    leftColor="#ef4444"
                    rightColor="#3b82f6"
                    leftLabel="Model Accuracy (%)"
                    rightLabel="Inference Latency (ms)"
                  />
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                <div className="h-[460px] w-full relative">
                  <div className="absolute inset-0">
                    {/* Use ThreeModelViewer for neural network visualization */}
                    <ThreeModelViewer 
                      type="neuralNetwork" 
                      nodeCount={aiData.nodes} 
                      connectionCount={aiData.connections} 
                      color="#ef4444" // red-500
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cloud" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <SimulationCard
                  title="Cloud Infrastructure"
                  description="Monitor our cloud infrastructure performance with real-time metrics and auto-scaling capabilities."
                  icon={<Cloud className="h-6 w-6 text-blue-400" />}
                  data={cloudData}
                  onUpdate={setCloudData}
                  primaryColor="blue"
                />
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Simulation Controls</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="server-nodes" className="text-sm text-white/70">Server Nodes</Label>
                        <span className="text-sm font-medium">{Math.round(cloudData.nodes)}</span>
                      </div>
                      <Slider
                        id="server-nodes"
                        value={[cloudData.nodes]}
                        min={128}
                        max={512}
                        step={32}
                        onValueChange={(value) => setCloudData(prev => ({ ...prev, nodes: value[0] }))}
                        className="py-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="cloud-throughput" className="text-sm text-white/70">Network Throughput</Label>
                        <span className="text-sm font-medium">{cloudData.processingSpeed.toFixed(1)} TB/s</span>
                      </div>
                      <Slider
                        id="cloud-throughput"
                        value={[cloudData.processingSpeed * 10]}
                        min={100}
                        max={1000}
                        step={50}
                        onValueChange={(value) => setCloudData(prev => ({ ...prev, processingSpeed: value[0] / 10 }))}
                        className="py-2"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="cloud-autoscale" 
                          checked={cloudData.efficiency > 90}
                          onCheckedChange={(checked) => setCloudData(prev => ({ 
                            ...prev, 
                            efficiency: checked ? 95 : 85,
                            securityScore: checked ? 98 : 85
                          }))}
                        />
                        <Label htmlFor="cloud-autoscale" className="text-sm">Auto-Scaling</Label>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCloudData({
                          nodes: 256,
                          connections: 768,
                          processingSpeed: 56.8,
                          efficiency: 92.1,
                          securityScore: 95,
                          latency: 0.8,
                        })}
                        className="text-xs"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Cloud Resource Allocation</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Virtual Machines</span>
                      <span className="text-sm font-medium">{Math.round(cloudData.nodes)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Storage (TB)</span>
                      <span className="text-sm font-medium">{(cloudData.connections / 10).toFixed(1)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Network Throughput</span>
                      <span className="text-sm font-medium">{cloudData.processingSpeed.toFixed(1)} Tb/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Load Balancing</span>
                      <span className="text-sm font-medium">{cloudData.efficiency.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Performance Metrics</h4>
                  <BarChartComponent
                    data={cloudHistoricalData}
                    dataKeys={["throughput", "resources"]}
                    colors={["#3b82f6", "#22c55e"]}
                    labels={["Network Throughput (TB/s)", "Resource Allocation (%)"]}
                  />
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                <div className="h-[460px] w-full relative">
                  <div className="absolute inset-0">
                    {/* Use ThreeModelViewer for cloud infrastructure visualization */}
                    <ThreeModelViewer 
                      type="cloud" 
                      nodeCount={cloudData.nodes} 
                      connectionCount={cloudData.connections} 
                      color="#3b82f6" // blue-500
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="edge" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <SimulationCard
                  title="Edge Computing"
                  description="Explore our edge computing platform with low-latency processing at the network edge."
                  icon={<Cpu className="h-6 w-6 text-green-400" />}
                  data={edgeData}
                  onUpdate={setEdgeData}
                  primaryColor="green"
                />
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Simulation Controls</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="edge-devices" className="text-sm text-white/70">Edge Devices</Label>
                        <span className="text-sm font-medium">{Math.round(edgeData.nodes)}</span>
                      </div>
                      <Slider
                        id="edge-devices"
                        value={[edgeData.nodes]}
                        min={32}
                        max={128}
                        step={8}
                        onValueChange={(value) => setEdgeData(prev => ({ ...prev, nodes: value[0] }))}
                        className="py-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="bandwidth" className="text-sm text-white/70">Network Bandwidth</Label>
                        <span className="text-sm font-medium">{(edgeData.connections * 0.05).toFixed(1)} GB/s</span>
                      </div>
                      <Slider
                        id="bandwidth"
                        value={[edgeData.connections]}
                        min={64}
                        max={512}
                        step={32}
                        onValueChange={(value) => setEdgeData(prev => ({ ...prev, connections: value[0] }))}
                        className="py-2"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="edge-caching" 
                          checked={edgeData.latency < 1.5}
                          onCheckedChange={(checked) => setEdgeData(prev => ({ 
                            ...prev, 
                            latency: checked ? 0.9 : 2.8,
                            efficiency: checked ? 95 : 82
                          }))}
                        />
                        <Label htmlFor="edge-caching" className="text-sm">Local Caching</Label>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEdgeData({
                          nodes: 64,
                          connections: 192,
                          processingSpeed: 32.1,
                          efficiency: 89.7,
                          securityScore: 88,
                          latency: 2.4,
                        })}
                        className="text-xs"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Edge Network Metrics</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Edge Devices</span>
                      <span className="text-sm font-medium">{Math.round(edgeData.nodes)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Data Processed</span>
                      <span className="text-sm font-medium">{(edgeData.connections * 0.1).toFixed(1)} GB/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Local Inference</span>
                      <span className="text-sm font-medium">{(edgeData.efficiency).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Average Latency</span>
                      <span className="text-sm font-medium">{edgeData.latency.toFixed(2)} ms</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Performance Metrics</h4>
                  <PerformanceChart
                    data={edgeHistoricalData}
                    leftDataKey="latency"
                    rightDataKey="devices"
                    leftColor="#10b981"
                    rightColor="#f59e0b"
                    leftLabel="Processing Latency (ms)"
                    rightLabel="Active Devices"
                  />
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                <div className="h-[460px] w-full relative">
                  <div className="absolute inset-0">
                    {/* ThreeModelViewer would render a 3D edge computing network visualization */}
                    <ThreeModelViewer 
                      type="network" 
                      nodeCount={edgeData.nodes} 
                      connectionCount={edgeData.connections} 
                      color="#10b981" // green-500
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <SimulationCard
                  title="Security Operations"
                  description="Monitor our advanced security infrastructure with real-time threat detection and response."
                  icon={<Shield className="h-6 w-6 text-purple-400" />}
                  data={securityData}
                  onUpdate={setSecurityData}
                  primaryColor="purple"
                />
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Simulation Controls</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="security-nodes" className="text-sm text-white/70">Security Checkpoints</Label>
                        <span className="text-sm font-medium">{Math.round(securityData.nodes)}</span>
                      </div>
                      <Slider
                        id="security-nodes"
                        value={[securityData.nodes]}
                        min={16}
                        max={96}
                        step={8}
                        onValueChange={(value) => setSecurityData(prev => ({ ...prev, nodes: value[0] }))}
                        className="py-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="threat-patterns" className="text-sm text-white/70">Threat Patterns</Label>
                        <span className="text-sm font-medium">{Math.round(securityData.connections / 8)}</span>
                      </div>
                      <Slider
                        id="threat-patterns"
                        value={[securityData.connections]}
                        min={192}
                        max={768}
                        step={64}
                        onValueChange={(value) => setSecurityData(prev => ({ ...prev, connections: value[0] }))}
                        className="py-2"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="ai-security" 
                          checked={securityData.efficiency > 95}
                          onCheckedChange={(checked) => setSecurityData(prev => ({ 
                            ...prev, 
                            efficiency: checked ? 98.5 : 92.4,
                            securityScore: checked ? 99 : 90
                          }))}
                        />
                        <Label htmlFor="ai-security" className="text-sm">AI-Enhanced</Label>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSecurityData({
                          nodes: 48,
                          connections: 384,
                          processingSpeed: 28.6,
                          efficiency: 96.2,
                          securityScore: 99,
                          latency: 1.5,
                        })}
                        className="text-xs"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Security Metrics</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Active Monitors</span>
                      <span className="text-sm font-medium">{Math.round(securityData.nodes)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Threat Patterns</span>
                      <span className="text-sm font-medium">{Math.round(securityData.connections / 2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Detection Rate</span>
                      <span className="text-sm font-medium">{securityData.efficiency.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Response Time</span>
                      <span className="text-sm font-medium">{securityData.latency.toFixed(2)} ms</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Security Events</h4>
                  <PieChartComponent
                    data={securityHistoricalData}
                    dataKey="value"
                    nameKey="name"
                    colors={['#8b5cf6', '#10b981', '#ef4444', '#f59e0b']}
                    labels={[
                      { text: 'Threats Detected', color: 'purple-400' },
                      { text: 'Threats Blocked', color: 'green-400' },
                      { text: 'False Positives', color: 'red-400' },
                      { text: 'Under Investigation', color: 'yellow-400' }
                    ]}
                  />
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                <div className="h-[460px] w-full relative">
                  <div className="absolute inset-0">
                    {/* ThreeModelViewer would render a 3D security operations visualization */}
                    <ThreeModelViewer 
                      type="security" 
                      nodeCount={securityData.nodes} 
                      connectionCount={securityData.connections} 
                      color="#8b5cf6" // purple-500
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="relative px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
              Schedule Live Demo 
              <ArrowRight className="ml-2 h-4 w-4 animate-pulse-horizontal" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 border-white/20 bg-white/5 hover:bg-white/10 shadow-lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Technical Brief
            </Button>
          </div>
          
          <p className="mt-4 text-sm text-white/60 max-w-md mx-auto">
            Want to see how these technologies can be customized for your specific use case? 
            <Button variant="link" className="text-sm px-1 h-auto text-white/80 hover:text-white">
              Contact our solution architects
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}

export default InteractiveDemoSection 