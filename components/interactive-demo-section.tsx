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
      <div className="flex items-center justify-center h-full w-full rounded-xl">
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

  // Map primaryColor to specific tailwind classes to avoid purge issues
  const colorClasses = {
    red: {
      light: "bg-red-500/20",
      dark: "bg-red-600/40"
    },
    blue: {
      light: "bg-blue-500/20",
      dark: "bg-blue-600/40"
    },
    green: {
      light: "bg-green-500/20",
      dark: "bg-green-600/40"
    },
    purple: {
      light: "bg-purple-500/20",
      dark: "bg-purple-600/40"
    },
    yellow: {
      light: "bg-yellow-500/20",
      dark: "bg-yellow-600/40"
    }
  };

  const colorClass = colorClasses[primaryColor as keyof typeof colorClasses] || colorClasses.red;

  return (
    <div className="p-4 sm:p-6 mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
      <h4 className="text-lg font-semibold mb-4">Performance Comparison</h4>
      
      <div className="space-y-4">
        {metricKeys.map((key) => {
          const percentChange = calculatePercentageChange(rightData[key], leftData[key]);
          const leftPercentage = Math.max(10, Math.min(90, (leftData[key] / (leftData[key] + rightData[key])) * 100));
          const rightPercentage = 100 - leftPercentage;

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
                  className={`h-full ${colorClass.light} flex items-center justify-end px-2 text-xs font-medium`}
                  style={{ width: `${leftPercentage}%` }}
                >
                  {leftData[key].toFixed(1)}
                </div>
                <div 
                  className={`h-full ${colorClass.dark} flex items-center px-2 text-xs font-medium`}
                  style={{ width: `${rightPercentage}%` }}
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
          <div className={`w-3 h-3 rounded-full ${colorClass.light} mr-2`}></div>
          <span>Before</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${colorClass.dark} mr-2`}></div>
          <span>After</span>
        </div>
      </div>
    </div>
  );
});

ComparisonView.displayName = "ComparisonView";

// New component for rendering tooltip with pulse animation
const PulsingTooltip = ({ message, isVisible }: { message: string, isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute top-full mt-2 right-0 bg-black/80 backdrop-blur-sm text-white/90 px-3 py-2 rounded-md border border-white/20 text-xs shadow-lg z-10 animate-in fade-in zoom-in-95 max-w-[200px] sm:max-w-[250px]">
      <div className="flex items-center">
        <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500 animate-pulse mr-2"></div>
        <span>{message}</span>
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
  
  // Using specific classes rather than dynamic ones to avoid Tailwind purging issues
  const getTypeClasses = (type: string) => {
    switch(type) {
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'info':
        return 'border-blue-500/50 bg-blue-500/10';
      case 'success':
        return 'border-green-500/50 bg-green-500/10';
      default:
        return 'border-white/20 bg-white/5';
    }
  };
  
  const getIconComponent = (type: string) => {
    switch(type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-400" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <Info className="h-4 w-4 text-white/60" />;
    }
  };
  
  return (
    <div className={`mt-4 sm:mt-6 border rounded-lg p-3 sm:p-4 ${getTypeClasses(recommendation.type)}`}>
      <div className="flex items-start">
        <div className="mt-0.5 mr-3 flex-shrink-0">
          {getIconComponent(recommendation.type)}
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

  // Map primaryColor to specific Tailwind classes to avoid purge issues
  const colorVariants: Record<string, string> = {
    red: "from-red-500/20 to-red-600/20 border-red-500/40 hover:border-red-500/60",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/40 hover:border-blue-500/60",
    green: "from-green-500/20 to-green-600/20 border-green-500/40 hover:border-green-500/60",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/40 hover:border-purple-500/60",
    yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/40 hover:border-yellow-500/60",
  }

  const iconBackgroundClass = {
    red: "bg-red-500/20",
    blue: "bg-blue-500/20",
    green: "bg-green-500/20",
    purple: "bg-purple-500/20",
    yellow: "bg-yellow-500/20",
  }[primaryColor] || "bg-red-500/20";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-gradient-to-br ${colorVariants[primaryColor]} backdrop-blur-md border rounded-xl p-4 sm:p-6 shadow-lg h-full`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${iconBackgroundClass} mr-3`}>
            {icon}
          </div>
          <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
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
      
      <p className="text-white/70 mb-4 sm:mb-6 text-sm">{description}</p>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs sm:text-sm text-white/70">Processing Speed</span>
            <span className="text-xs sm:text-sm font-medium">{data.processingSpeed.toFixed(1)} Tb/s</span>
          </div>
          <Progress value={data.processingSpeed} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs sm:text-sm text-white/70">Efficiency</span>
            <span className="text-xs sm:text-sm font-medium">{data.efficiency.toFixed(1)}%</span>
          </div>
          <Progress value={data.efficiency} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs sm:text-sm text-white/70">Connections</span>
            <span className="text-xs sm:text-sm font-medium">{data.connections}</span>
          </div>
          <Progress value={data.connections / 10} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs sm:text-sm text-white/70">Latency</span>
            <span className="text-xs sm:text-sm font-medium">{data.latency.toFixed(2)} ms</span>
          </div>
          <Progress value={Math.max(0, 100 - data.latency * 10)} className="h-2" />
        </div>
      </div>
      
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-xs sm:text-sm text-white/70">Simulation Speed</span>
          <span className="text-xs sm:text-sm font-medium">{simSpeed}%</span>
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
          <span className="text-xs sm:text-sm text-white/70">Status: {isRunning ? "Active" : "Standby"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="optimize" checked={data.securityScore > 90} />
          <Label htmlFor="optimize" className="text-xs sm:text-sm">Optimize</Label>
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
    const newParticles: ParticleData[] = Array.from({ length: 60 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      speed: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.7 ? "#10b981" : 
             Math.random() > 0.5 ? "#3b82f6" : "#ef4444",
    }));
    setParticles(newParticles);
    
    // Cleanup function
    return () => {
      setParticles([]);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-black/50 shadow-inner min-h-[180px]">
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
            opacity: 0.6,
          }}
          animate={running ? {
            x: [null, `${(particle.x + 15) % 100}%`, `${(particle.x + 30) % 100}%`],
            y: [null, `${(particle.y + 10) % 100}%`, `${(particle.y - 15 + 100) % 100}%`],
            opacity: [0.6, 0.3, 0.6]
          } : {}}
          transition={{
            duration: 8 / particle.speed,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Gradients for visual effect */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none" />
      <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-purple-600/20 to-transparent pointer-events-none" />
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
      y: 55 + ((i * 2.5) % 35), // Distribute nodes evenly across y-axis
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
    
    // Cleanup function
    return () => {
      setServers([]);
      setNodes([]);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-black/50 shadow-inner min-h-[180px]">
      {/* SVG container for connections */}
      <svg 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Connection lines */}
        {servers.map((server) => 
          server.connections.map((nodeId) => {
            const node = nodes.find(n => n.id === nodeId);
            if (!node) return null;
            
            return (
              <motion.line
                key={`connection-${server.id}-${nodeId}`}
                x1={`${server.x + 6}%`}
                y1={`${server.y + 3}%`}
                x2={`${node.x + 1}%`}
                y2={`${node.y + 1}%`}
                stroke="#3b82f6"
                strokeWidth="1"
                strokeOpacity="0.3"
                animate={running ? {
                  strokeOpacity: [0.3, 0.5, 0.2],
                } : {}}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: nodeId * 0.1,
                }}
              />
            );
          })
        )}
      </svg>
      
      {/* Render servers */}
      {servers.map((server) => (
        <motion.div
          key={`server-${server.id}`}
          className="absolute w-10 sm:w-12 h-5 sm:h-6 bg-blue-500/30 border border-blue-500/50 rounded-md"
          style={{
            left: `${server.x}%`,
            top: `${server.y}%`,
            zIndex: 2,
          }}
          animate={running ? {
            y: [null, "-2%", "2%"],
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
          className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            zIndex: 2,
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
      
      {/* Bottom gradient for visual effect */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none" />
    </div>
  );
};

// Add Edge simulation component
const EdgeSimulation = ({ running }: { running: boolean }) => {
  const [devices, setDevices] = useState<NodeData[]>([]);
  const [connections, setConnections] = useState<{ from: number; to: number }[]>([]);
  
  useEffect(() => {
    // Generate edge devices with deterministic positions
    const newDevices: NodeData[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + ((i * 7) % 80), // Distribute devices evenly across x-axis
      y: 20 + ((i * 5) % 60), // Distribute devices evenly across y-axis
      server: i % 3, // Distribute devices evenly among edge servers
    }));
    
    // Create connections between edge devices
    const newConnections: { from: number; to: number }[] = [];
    newDevices.forEach((device, index) => {
      // Connect to 2-3 nearby devices
      for (let j = 1; j <= 2 + (index % 2); j++) {
        const targetIndex = (index + j) % newDevices.length;
        newConnections.push({ from: device.id, to: newDevices[targetIndex].id });
      }
    });
    
    setDevices(newDevices);
    setConnections(newConnections);
    
    // Cleanup function
    return () => {
      setDevices([]);
      setConnections([]);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-black/50 shadow-inner min-h-[180px]">
      {/* SVG container for connections */}
      <svg 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Connection lines */}
        {connections.map((connection, index) => {
          const fromDevice = devices.find(d => d.id === connection.from);
          const toDevice = devices.find(d => d.id === connection.to);
          if (!fromDevice || !toDevice) return null;
          
          return (
            <motion.line
              key={`connection-${connection.from}-${connection.to}`}
              x1={`${fromDevice.x}%`}
              y1={`${fromDevice.y}%`}
              x2={`${toDevice.x}%`}
              y2={`${toDevice.y}%`}
              stroke="#10b981"
              strokeWidth="1"
              strokeOpacity="0.3"
              animate={running ? {
                strokeOpacity: [0.3, 0.5, 0.2],
                strokeWidth: ["1px", "1.5px", "1px"]
              } : {}}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.05,
              }}
            />
          );
        })}
      </svg>
      
      {/* Render edge devices */}
      {devices.map((device) => (
        <motion.div
          key={`device-${device.id}`}
          className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"
          style={{
            left: `${device.x}%`,
            top: `${device.y}%`,
            zIndex: 2,
          }}
          animate={running ? {
            scale: [null, 1.2, 0.8],
            opacity: [null, 1, 0.7],
            boxShadow: [
              "0 0 0px #10b981",
              "0 0 6px #10b981",
              "0 0 0px #10b981"
            ]
          } : {}}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: device.id * 0.1,
          }}
        />
      ))}
      
      {/* Edge servers */}
      {[0, 1, 2].map((serverId) => (
        <motion.div
          key={`edge-server-${serverId}`}
          className="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-700/30 border border-green-500/40"
          style={{
            left: `${20 + serverId * 30}%`,
            top: "75%",
            zIndex: 3,
          }}
          animate={running ? {
            boxShadow: [
              "0 0 0px rgba(16, 185, 129, 0.4)",
              "0 0 12px rgba(16, 185, 129, 0.6)",
              "0 0 0px rgba(16, 185, 129, 0.4)"
            ]
          } : {}}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: serverId * 0.5,
          }}
        />
      ))}
      
      {/* Background effects */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1),transparent_70%)]"></div>
    </div>
  );
};

// Add Security simulation component
const SecuritySimulation = ({ running }: { running: boolean }) => {
  const [threats, setThreats] = useState<ParticleData[]>([]);
  const [shields, setShields] = useState<{ x: number; y: number; radius: number }[]>([]);
  
  useEffect(() => {
    // Generate threats
    const newThreats: ParticleData[] = Array.from({ length: 24 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.7 ? "#ef4444" : // Red for dangerous threats
             Math.random() > 0.5 ? "#f97316" : "#f59e0b", // Orange/Amber for moderate threats
    }));
    
    // Generate security shields
    const newShields = [
      { x: 50, y: 50, radius: 40 }, // Main shield
      { x: 25, y: 25, radius: 20 }, // Top-left
      { x: 75, y: 25, radius: 20 }, // Top-right
      { x: 25, y: 75, radius: 20 }, // Bottom-left
      { x: 75, y: 75, radius: 20 }, // Bottom-right
    ];
    
    setThreats(newThreats);
    setShields(newShields);
    
    // Cleanup function
    return () => {
      setThreats([]);
      setShields([]);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-black/50 shadow-inner min-h-[180px]">
      {/* Protective shields */}
      {shields.map((shield, index) => (
        <motion.div
          key={`shield-${index}`}
          className="absolute rounded-full border-2 border-purple-500/30"
          style={{
            width: `${shield.radius * 2}%`,
            height: `${shield.radius * 2}%`,
            left: `${shield.x - shield.radius}%`,
            top: `${shield.y - shield.radius}%`,
            zIndex: 2,
            background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, rgba(139,92,246,0.02) 70%, transparent 100%)",
          }}
          animate={running ? {
            boxShadow: [
              "0 0 10px rgba(139,92,246,0.2)",
              "0 0 20px rgba(139,92,246,0.4)",
              "0 0 10px rgba(139,92,246,0.2)"
            ],
            borderColor: [
              "rgba(139,92,246,0.3)",
              "rgba(139,92,246,0.5)",
              "rgba(139,92,246,0.3)"
            ]
          } : {}}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.5,
          }}
        />
      ))}
      
      {/* Threat particles */}
      {threats.map((threat) => (
        <motion.div
          key={threat.id}
          className="absolute rounded-full"
          style={{
            width: `${threat.size}px`,
            height: `${threat.size}px`,
            backgroundColor: threat.color,
            x: `${threat.x}%`,
            y: `${threat.y}%`,
            opacity: 0.6,
            zIndex: 1,
          }}
          animate={running ? {
            x: [null, `${(threat.x + 20) % 100}%`, `${(threat.x - 15 + 100) % 100}%`],
            y: [null, `${(threat.y - 15 + 100) % 100}%`, `${(threat.y + 20) % 100}%`],
            opacity: [0.6, 0.8, 0.6]
          } : {}}
          transition={{
            duration: 10 / threat.speed,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Security center */}
      <motion.div
        className="absolute w-10 h-10 bg-purple-900/30 border border-purple-500/50 rounded-full"
        style={{
          left: "calc(50% - 20px)",
          top: "calc(50% - 20px)",
          zIndex: 3,
        }}
        animate={running ? {
          boxShadow: [
            "0 0 10px rgba(139,92,246,0.3)",
            "0 0 30px rgba(139,92,246,0.6)",
            "0 0 10px rgba(139,92,246,0.3)"
          ],
        } : {}}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Shield className="h-5 w-5 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]"></div>
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
    return updateHistoricalData({
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

  // Helper functions for color classes (to avoid Tailwind purge issues)
  const getTabTriggerClasses = (tabValue: string): string => {
    const baseClasses = "rounded-lg border border-transparent transition-all duration-300 ";
    const activeClasses = "data-[state=active]:border-{color}-500/50 data-[state=active]:shadow-[0_0_10px_rgba({rgb},0.3)] ";
    
    switch (tabValue) {
      case 'ai':
        return baseClasses + activeClasses.replace('{color}', 'red').replace('{rgb}', '239,68,68') + 
               "data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500/20 data-[state=active]:to-red-600/20";
      case 'cloud':
        return baseClasses + activeClasses.replace('{color}', 'blue').replace('{rgb}', '59,130,246') + 
               "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-600/20";
      case 'edge':
        return baseClasses + activeClasses.replace('{color}', 'green').replace('{rgb}', '16,185,129') + 
               "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500/20 data-[state=active]:to-green-600/20";
      case 'security':
        return baseClasses + activeClasses.replace('{color}', 'purple').replace('{rgb}', '139,92,246') + 
               "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500/20 data-[state=active]:to-purple-600/20";
      default:
        return baseClasses;
    }
  };

  const getComparisonButtonClass = (): string => {
    if (!comparisonMode) return '';
    
    switch (activeTab) {
      case 'ai': return 'border-red-500/50 bg-red-500/20';
      case 'cloud': return 'border-blue-500/50 bg-blue-500/20';
      case 'edge': return 'border-green-500/50 bg-green-500/20';
      case 'security': return 'border-purple-500/50 bg-purple-500/20';
      default: return '';
    }
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden py-12 sm:py-16 md:py-20">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            INTERACTIVE DEMOS
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Experience Our Technology in Action
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Explore real-time simulations of our key technologies and see how they can transform your business operations.
          </p>
        </div>

        <Tabs 
          defaultValue="ai" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <TabsList className="grid w-full sm:w-auto md:w-[600px] mx-auto sm:mx-0 grid-cols-4 mb-6 sm:mb-0 bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-xl">
              <TabsTrigger 
                value="ai" 
                className={getTabTriggerClasses('ai')}
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <Brain className="h-5 w-5 mb-1 text-red-500" />
                  <span className="hidden md:inline text-xs font-medium">AI/ML</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="cloud" 
                className={getTabTriggerClasses('cloud')}
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <Cloud className="h-5 w-5 mb-1 text-blue-500" />
                  <span className="hidden md:inline text-xs font-medium">Cloud</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="edge" 
                className={getTabTriggerClasses('edge')}
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <Cpu className="h-5 w-5 mb-1 text-green-500" />
                  <span className="hidden md:inline text-xs font-medium">Edge</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className={getTabTriggerClasses('security')}
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <Shield className="h-5 w-5 mb-1 text-purple-500" />
                  <span className="hidden md:inline text-xs font-medium">Security</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2 justify-center sm:justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleComparisonMode}
                className={`text-xs ${getComparisonButtonClass()}`}
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
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <div className="flex flex-col">
                <SimulationCard
                  title="AI Model Training"
                  description="Real-time simulation of our distributed AI training infrastructure with parallel processing capabilities."
                  icon={<Brain className="h-6 w-6 text-red-400" />}
                  data={aiData}
                  onUpdate={setAiData}
                  primaryColor="red"
                />
                
                {/* Presets selection */}
                <div className="flex justify-between mt-4 sm:mt-6 mb-3">
                  <h4 className="text-base sm:text-lg font-semibold">Configuration Presets</h4>
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
                
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {getCurrentPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-xs h-auto py-2 sm:py-3 flex flex-col items-center justify-center border-white/10 hover:border-red-500/50 hover:bg-red-500/10"
                      onClick={() => applyPreset(preset.data, activeTab)}
                    >
                      <span className="font-medium">{preset.name}</span>
                      <span className="text-[10px] text-white/60 mt-1 hidden sm:block">
                        {preset.data.nodes} nodes, {preset.data.efficiency.toFixed(1)}% eff
                      </span>
                    </Button>
                  ))}
                </div>
                
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Neural Network Architecture</h4>
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
                
                <div className="mt-4 sm:mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Performance Metrics</h4>
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
              <div className="overflow-hidden h-full min-h-[460px] w-full">
                <div className="h-full min-h-[460px] w-full relative">
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
          
          {/* Cloud tab content */}
          <TabsContent value="cloud" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <div className="flex flex-col">
                <SimulationCard
                  title="Cloud Infrastructure"
                  description="Monitor our cloud infrastructure performance with real-time metrics and auto-scaling capabilities."
                  icon={<Cloud className="h-6 w-6 text-blue-400" />}
                  data={cloudData}
                  onUpdate={setCloudData}
                  primaryColor="blue"
                />
                
                {/* Presets selection */}
                <div className="flex justify-between mt-4 sm:mt-6 mb-3">
                  <h4 className="text-base sm:text-lg font-semibold">Configuration Presets</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCloudData({...baselineData.cloud})}
                    className="text-xs"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {getCurrentPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-xs h-auto py-2 sm:py-3 flex flex-col items-center justify-center border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10"
                      onClick={() => applyPreset(preset.data, activeTab)}
                    >
                      <span className="font-medium">{preset.name}</span>
                      <span className="text-[10px] text-white/60 mt-1 hidden sm:block">
                        {preset.data.nodes} nodes, {preset.data.processingSpeed.toFixed(1)} Tb/s
                      </span>
                    </Button>
                  ))}
                </div>
                
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Infrastructure Details</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Servers</span>
                      <span className="text-sm font-medium">{Math.round(cloudData.nodes / 16)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Containers</span>
                      <span className="text-sm font-medium">{Math.round(cloudData.nodes)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Data Centers</span>
                      <span className="text-sm font-medium">{Math.round(cloudData.nodes / 64) + 1}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Network Throughput</span>
                      <span className="text-sm font-medium">{cloudData.processingSpeed.toFixed(1)} Tb/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Resource Utilization</span>
                      <span className="text-sm font-medium">{cloudData.efficiency.toFixed(2)}%</span>
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
                
                <AIRecommendations data={cloudData} technology="cloud" />
                
                <div className="mt-4 sm:mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Resource Metrics</h4>
                  <PerformanceChart
                    data={cloudHistoricalData}
                    leftDataKey="throughput"
                    rightDataKey="resources"
                    leftColor="#3b82f6"
                    rightColor="#22c55e"
                    leftLabel="Throughput (Tb/s)"
                    rightLabel="Resource Utilization (%)"
                  />
                </div>
              </div>
              <div className="overflow-hidden h-full min-h-[460px] w-full">
                <div className="h-full min-h-[460px] w-full relative">
                  <div className="absolute inset-0">
                    {activeTab === "cloud" && (
                      <CloudSimulation running={true} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Edge Computing tab content */}
          <TabsContent value="edge" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <div className="flex flex-col">
                <SimulationCard
                  title="Edge Computing Network"
                  description="Simulation of our distributed edge computing platform for low-latency processing at the network edge."
                  icon={<Cpu className="h-6 w-6 text-green-400" />}
                  data={edgeData}
                  onUpdate={setEdgeData}
                  primaryColor="green"
                />
                
                {/* Presets selection */}
                <div className="flex justify-between mt-4 sm:mt-6 mb-3">
                  <h4 className="text-base sm:text-lg font-semibold">Configuration Presets</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEdgeData({...baselineData.edge})}
                    className="text-xs"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {getCurrentPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-xs h-auto py-2 sm:py-3 flex flex-col items-center justify-center border-white/10 hover:border-green-500/50 hover:bg-green-500/10"
                      onClick={() => applyPreset(preset.data, activeTab)}
                    >
                      <span className="font-medium">{preset.name}</span>
                      <span className="text-[10px] text-white/60 mt-1 hidden sm:block">
                        {preset.data.nodes} devices, {preset.data.latency.toFixed(1)}ms
                      </span>
                    </Button>
                  ))}
                </div>
                
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Edge Network Details</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Edge Devices</span>
                      <span className="text-sm font-medium">{Math.round(edgeData.nodes)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Edge Servers</span>
                      <span className="text-sm font-medium">{Math.round(edgeData.nodes / 20)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Connections</span>
                      <span className="text-sm font-medium">{edgeData.connections}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Response Time</span>
                      <span className="text-sm font-medium">{edgeData.latency.toFixed(2)} ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Processing Efficiency</span>
                      <span className="text-sm font-medium">{edgeData.efficiency.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
                
                {comparisonMode && (
                  <ComparisonView
                    leftData={getBaselineData}
                    rightData={getCurrentData}
                    primaryColor={getActiveColor}
                    metricKeys={["nodes", "connections", "latency", "efficiency", "processingSpeed"]}
                  />
                )}
                
                <AIRecommendations data={edgeData} technology="edge" />
                
                <div className="mt-4 sm:mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Performance Metrics</h4>
                  <PerformanceChart
                    data={edgeHistoricalData}
                    leftDataKey="latency"
                    rightDataKey="devices"
                    leftColor="#22c55e"
                    rightColor="#3b82f6"
                    leftLabel="Latency (ms)"
                    rightLabel="Active Devices"
                  />
                </div>
              </div>
              <div className="overflow-hidden h-full min-h-[460px] w-full">
                <div className="h-full min-h-[460px] w-full relative">
                  <div className="absolute inset-0">
                    {activeTab === "edge" && (
                      <EdgeSimulation running={true} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Security tab content */}
          <TabsContent value="security" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <div className="flex flex-col">
                <SimulationCard
                  title="Advanced Security Platform"
                  description="Real-time simulation of our AI-powered cybersecurity system detecting and neutralizing threats."
                  icon={<Shield className="h-6 w-6 text-purple-400" />}
                  data={securityData}
                  onUpdate={setSecurityData}
                  primaryColor="purple"
                />
                
                {/* Presets selection */}
                <div className="flex justify-between mt-4 sm:mt-6 mb-3">
                  <h4 className="text-base sm:text-lg font-semibold">Security Profiles</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSecurityData({...baselineData.security})}
                    className="text-xs"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {getCurrentPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-xs h-auto py-2 sm:py-3 flex flex-col items-center justify-center border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10"
                      onClick={() => applyPreset(preset.data, activeTab)}
                    >
                      <span className="font-medium">{preset.name}</span>
                      <span className="text-[10px] text-white/60 mt-1 hidden sm:block">
                        {preset.data.securityScore.toFixed(1)}% protection
                      </span>
                    </Button>
                  ))}
                </div>
                
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Security Details</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Security Nodes</span>
                      <span className="text-sm font-medium">{Math.round(securityData.nodes)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Monitoring Points</span>
                      <span className="text-sm font-medium">{Math.round(securityData.connections)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Threat Detection Score</span>
                      <span className="text-sm font-medium">{securityData.securityScore.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Response Time</span>
                      <span className="text-sm font-medium">{securityData.latency.toFixed(2)} ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Detection Efficiency</span>
                      <span className="text-sm font-medium">{securityData.efficiency.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
                
                {comparisonMode && (
                  <ComparisonView
                    leftData={getBaselineData}
                    rightData={getCurrentData}
                    primaryColor={getActiveColor}
                    metricKeys={["securityScore", "nodes", "efficiency", "latency", "connections"]}
                  />
                )}
                
                <AIRecommendations data={securityData} technology="security" />
                
                <div className="mt-4 sm:mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Threat Analytics</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={securityHistoricalData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {securityHistoricalData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={
                                index === 0 ? "#a855f7" : 
                                index === 1 ? "#22c55e" : 
                                index === 2 ? "#ef4444" : 
                                "#f59e0b"
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden h-full min-h-[460px] w-full">
                <div className="h-full min-h-[460px] w-full relative">
                  <div className="absolute inset-0">
                    {activeTab === "security" && (
                      <SecuritySimulation running={true} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="relative px-6 sm:px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
              Schedule Live Demo 
              <ArrowRight className="ml-2 h-4 w-4 animate-pulse-horizontal" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-6 sm:px-8 border-white/20 bg-white/5 hover:bg-white/10 shadow-lg"
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