"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Brain,
  Zap,
  Shield,
  BarChart2,
  Cpu,
  Database,
  LineChart,
  MessageSquare,
  Search,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Target,
  Lock,
  Gauge,
  Info,
  Activity,
  Lightbulb,
  Plus,
  ChevronDown,
  ChevronUp,
  Sliders,
  Check,
  Clock,
  Fingerprint,
  Code,
  Users,
} from "lucide-react"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Import CSS for glow effects
import "@/styles/glow-effects.css"

const features = [
  {
    title: "AI-Powered Analytics",
    description: "Leverage state-of-the-art neural networks and machine learning models trained on vast datasets for superior insights with 99.9% accuracy.",
    icon: <Brain className="h-6 w-6" />,
    color: "red",
    stats: {
      label: "Model Accuracy",
      value: "99.9%",
    },
    gradient: "from-red-500/20 to-red-600/20",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
  },
  {
    title: "Edge Computing",
    description: "Process data at unprecedented speeds with our distributed edge computing infrastructure for real-time decision making.",
    icon: <Zap className="h-6 w-6" />,
    color: "yellow",
    stats: {
      label: "Processing Speed",
      value: "3.2 TB/s",
    },
    gradient: "from-yellow-500/20 to-yellow-600/20",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.3)]",
  },
  {
    title: "Zero-Trust Security",
    description: "Military-grade encryption with zero-trust architecture, end-to-end encryption, and full compliance with global standards.",
    icon: <Shield className="h-6 w-6" />,
    color: "blue",
    stats: {
      label: "Security Score",
      value: "A+",
    },
    gradient: "from-blue-500/20 to-blue-600/20",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  },
  {
    title: "Adaptive Insights",
    description: "Self-optimizing analytics that adapt to your data patterns and user behavior, providing increasingly relevant insights over time.",
    icon: <Sparkles className="h-6 w-6" />,
    color: "green",
    stats: {
      label: "Data Points",
      value: "5M+",
    },
    gradient: "from-green-500/20 to-green-600/20",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
  },
]

const capabilities = [
  {
    title: "Natural Language Processing",
    description: "Advanced text analysis, sentiment detection, and language generation capabilities powered by state-of-the-art transformers.",
    icon: <MessageSquare className="h-5 w-5" />,
    color: "red",
    gradient: "from-red-500/10 to-red-600/10",
  },
  {
    title: "Computer Vision",
    description: "Image recognition, object detection, and visual data processing with industry-leading accuracy rates.",
    icon: <Search className="h-5 w-5" />,
    color: "blue",
    gradient: "from-blue-500/10 to-blue-600/10",
  },
  {
    title: "Predictive Analytics",
    description: "Forecast future trends and outcomes based on historical data patterns and machine learning algorithms.",
    icon: <LineChart className="h-5 w-5" />,
    color: "green",
    gradient: "from-green-500/10 to-green-600/10",
  },
]

// Add type definition for feature details
type FeatureDetailMetrics = {
  [key: string]: number | string | string[];
};

type FeatureDetailItem = {
  description: string;
  useCases: string[];
  metrics: FeatureDetailMetrics;
  techSpecs: string;
};

type FeatureDetails = {
  [key: string]: FeatureDetailItem;
};

// Type for metrics
type MetricKey = 'performance' | 'reliability' | 'scalability' | 'costEfficiency';

// Add feature comparison data with proper typing
const featureComparison: Record<MetricKey, Record<string, number>> = {
  performance: {
    "AI-Powered Analytics": 95,
    "Edge Computing": 90,
    "Zero-Trust Security": 98,
    "Adaptive Insights": 92
  },
  reliability: {
    "AI-Powered Analytics": 93,
    "Edge Computing": 97,
    "Zero-Trust Security": 99,
    "Adaptive Insights": 95
  },
  scalability: {
    "AI-Powered Analytics": 97,
    "Edge Computing": 95,
    "Zero-Trust Security": 96,
    "Adaptive Insights": 90
  },
  costEfficiency: {
    "AI-Powered Analytics": 85,
    "Edge Computing": 82,
    "Zero-Trust Security": 89,
    "Adaptive Insights": 93
  }
};

// Add industry benchmark data with proper typing
const industryBenchmarks: Record<MetricKey, number> = {
  performance: 80,
  reliability: 82,
  scalability: 78,
  costEfficiency: 75
};

// Add proper type definition for statistics
type StatisticItem = {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
};

type Statistics = {
  [key: string]: StatisticItem;
};

// Define proper types for feature objects
type FeatureItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  badge?: string;
  [key: string]: any; // Add index signature for any additional properties
};

// Add complete statistics object with proper typing
const statistics: Statistics = {
  users: {
    value: "10M+",
    label: "Active Users",
    icon: <Users className="h-4 w-4" />,
    color: "text-blue-500"
  },
  accuracy: {
    value: "99.8%",
    label: "Model Accuracy",
    icon: <Target className="h-4 w-4" />,
    color: "text-green-500"
  },
  processing: {
    value: "0.5ms",
    label: "Processing Time",
    icon: <Zap className="h-4 w-4" />,
    color: "text-yellow-500"
  },
  security: {
    value: "Enterprise",
    label: "Security Level",
    icon: <Shield className="h-4 w-4" />,
    color: "text-red-500"
  }
};

// Update feature details to match the new features
const featureDetails: FeatureDetails = {
  "AI-Powered Analytics": {
    description: "Our AI models utilize a hybrid architecture combining transformers, graph neural networks, and reinforcement learning systems to deliver insights that continuously improve with more data.",
    useCases: [
      "Predictive market trend forecasting",
      "Behavioral pattern recognition",
      "Anomaly detection in complex systems",
      "Content personalization at scale"
    ],
    metrics: {
      accuracy: 99.9,
      latency: 8, // in ms
      throughput: 45000 // requests per second
    },
    techSpecs: "Powered by custom TPUs with 250+ billion parameters, trained on 8.5 petabytes of curated data with transformer-based architecture and continuous learning capabilities."
  },
  "Edge Computing": {
    description: "Our distributed edge computing framework processes data directly where it's generated, reducing latency and increasing reliability while ensuring privacy.",
    useCases: [
      "Real-time fraud detection systems",
      "Autonomous device operations",
      "Smart city infrastructure monitoring",
      "Global supply chain optimization"
    ],
    metrics: {
      throughput: 3.2, // terabytes per second
      scalability: 99.999, // percentage uptime
      concurrency: 120000 // concurrent requests
    },
    techSpecs: "Leverages a serverless compute mesh with 5000+ global nodes, using WebAssembly for near-native performance and encrypted data tunneling for security."
  },
  "Zero-Trust Security": {
    description: "Our security framework operates on a zero-trust model where every access request is fully authenticated, authorized, and encrypted regardless of origin.",
    useCases: [
      "Protected health information management",
      "Financial transaction processing",
      "Intellectual property protection",
      "Cross-organizational secure collaboration"
    ],
    metrics: {
      encryptionLevel: "AES-256 / Quantum-resistant",
      complianceCertifications: ["HIPAA", "GDPR", "SOC 2", "ISO 27001", "FedRAMP"],
      threatDetection: 99.997 // percentage
    },
    techSpecs: "Multi-layer encryption with quantum-resistant algorithms, continuous threat monitoring with AI-powered anomaly detection, and automatic key rotation every 60 minutes."
  },
  "Adaptive Insights": {
    description: "Our analytics engine continuously evolves through machine learning, becoming more effective with each interaction and dataset it processes.",
    useCases: [
      "Customer journey optimization",
      "Product development roadmapping",
      "Predictive maintenance scheduling",
      "Dynamic resource allocation"
    ],
    metrics: {
      dataPoints: "5M+",
      visualizationTypes: 56,
      adaptationRate: 99.7, // percentage
    },
    techSpecs: "Built on a neural learning analytics engine that adapts to user behavior patterns, featuring multi-dimensional visualization capabilities and automated insight generation."
  }
};

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  
  // Add state for feature highlights and details
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({})
  
  // Add new states for advanced interactions
  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("performance")
  const [showBenchmark, setShowBenchmark] = useState(true)
  
  // Add animation for stats
  useEffect(() => {
    const timer = setTimeout(() => {
      const stats: Record<string, number> = {};
      features.forEach(feature => {
        if (feature.stats.value.includes('%')) {
          stats[feature.title] = parseFloat(feature.stats.value);
        } else if (feature.stats.value.includes('TB')) {
          stats[feature.title] = parseFloat(feature.stats.value);
        } else if (feature.stats.value.includes('M+')) {
          stats[feature.title] = 1000000;
        } else if (feature.stats.value === 'A+') {
          stats[feature.title] = 100;
        }
      });
      setAnimatedStats(stats);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Function to open feature details
  const handleFeatureClick = (title: string) => {
    setActiveFeature(title);
    setIsDetailModalOpen(true);
  };
  
  // Function to toggle feature selection for comparison
  const toggleFeatureSelection = (title: string) => {
    if (selectedFeatures.includes(title)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== title));
    } else {
      if (selectedFeatures.length < 3) {
        setSelectedFeatures([...selectedFeatures, title]);
      }
    }
  };

  return (
    <section id="features" ref={containerRef} className="relative w-full py-16 md:py-24 bg-black overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px] animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-green-500/10 blur-[80px] animate-pulse-slow"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Modern Section Header with 3D text effect */}
        <div className="text-center mb-12 md:mb-20">
          <Badge className="mb-3 bg-gradient-to-r from-red-500 to-purple-600 text-white hover:from-red-600 hover:to-purple-700 border-none shadow-lg shadow-red-900/20 px-3 py-1.5 text-xs uppercase tracking-wider">
            POWERFUL FEATURES
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-3 md:mb-4 
                      bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80
                      [text-shadow:0_4px_8px_rgba(0,0,0,0.12)]">
            Core Capabilities
          </h2>
          <p className="text-base md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Our platform harnesses cutting-edge technologies to deliver intelligent, secure, and 
            highly scalable solutions for the most demanding enterprise environments.
          </p>
        </div>
        
        {/* Enhanced Feature Cards Grid with hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              ref={feature.title === activeFeature ? ref : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${
                feature.title === activeFeature ? feature.glow : ""
              } group relative p-5 md:p-7 rounded-xl border border-white/10 
                backdrop-blur-md bg-gradient-to-b from-black/60 to-black/80
                hover:bg-gradient-to-b hover:from-black/70 hover:to-black/90
                transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1`}
              onClick={() => handleFeatureClick(feature.title)}
            >
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 h-[40%] w-[40%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 h-px w-12 bg-gradient-to-r from-transparent to-current"></div>
                <div className="absolute top-0 left-0 h-12 w-px bg-gradient-to-b from-transparent to-current"></div>
              </div>
              <div className="absolute bottom-0 right-0 h-[40%] w-[40%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute bottom-0 right-0 h-px w-12 bg-gradient-to-l from-transparent to-current"></div>
                <div className="absolute bottom-0 right-0 h-12 w-px bg-gradient-to-t from-transparent to-current"></div>
              </div>
              
              {/* Enhanced feature icon with glow effect */}
              <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/10 
                          text-${feature.color}-500 w-fit mb-4 md:mb-5 ring-1 ring-${feature.color}-500/20
                          group-hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:from-${feature.color}-500/30 
                          group-hover:to-${feature.color}-600/20 transition-all duration-300`}>
                {feature.icon}
              </div>
              
              {/* Feature content with improved typography */}
              <h3 className={`text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white 
                          group-hover:text-${feature.color}-400 transition-colors`}>
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white/90 
                          transition-colors mb-4 md:mb-5 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Enhanced stats indicator with animated values */}
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-white/60 font-medium">{feature.stats.label}</span>
                <span className={`text-${feature.color}-500 font-bold 
                              group-hover:text-${feature.color}-400 transition-colors`}>
                  {feature.stats.value}
                </span>
              </div>
                    
              {/* Enhanced animated progress bar with glow */}
              <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 
                            rounded-full group-hover:shadow-[0_0_8px_rgba(var(--${feature.color}-rgb),0.5)]`}
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: animatedStats[feature.title] ? `${animatedStats[feature.title]}%` : "0%" 
                  }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.15 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Details Modal */}
      <AnimatePresence>
          {isDetailModalOpen && activeFeature && featureDetails[activeFeature] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-black/70" onClick={() => setIsDetailModalOpen(false)}></div>
              <div className="relative max-w-3xl w-full max-h-[80vh] overflow-y-auto bg-black/90 border border-white/10 rounded-xl shadow-xl shadow-red-900/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                <div className="p-4 md:p-6">
                  <button 
                    onClick={() => setIsDetailModalOpen(false)}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  
                  {/* Feature Detail Content */}
                  <div className="pt-2">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{activeFeature}</h3>
                    <p className="text-white/80 text-sm md:text-base mb-6">{featureDetails[activeFeature].description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Use Cases */}
                      <div className="space-y-3">
                        <h4 className="text-sm md:text-base font-semibold text-white flex items-center">
                          <Target className="h-4 w-4 mr-2 text-red-500" />
                          Use Cases
                      </h4>
                        <ul className="space-y-2">
                          {featureDetails[activeFeature].useCases.map((useCase, index) => (
                            <li key={index} className="flex items-start gap-2 text-white/70 text-sm">
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                </div>
                            </div>
                              <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                      {/* Metrics */}
                      <div className="space-y-3">
                        <h4 className="text-sm md:text-base font-semibold text-white flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-red-500" />
                          Performance Metrics
                        </h4>
                        <div className="space-y-2.5">
                          {Object.entries(featureDetails[activeFeature].metrics).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="text-white font-medium">
                                  {typeof value === 'number' 
                                    ? key.toLowerCase().includes('level') 
                                      ? value
                                      : `${value}${key.toLowerCase().includes('percentage') ? '%' : ''}`
                                    : Array.isArray(value) 
                                      ? value.join(', ')
                                      : value.toString()
                                  }
                              </span>
                            </div>
                              {typeof value === 'number' && !key.toLowerCase().includes('level') && (
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full" 
                                    style={{ width: `${typeof value === 'number' ? Math.min(value, 100) : 50}%` }}
                                  ></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                    {/* Technical Specifications */}
                    <div className="mt-6 p-3 md:p-4 rounded-lg bg-white/5 border border-white/10">
                      <h4 className="text-sm md:text-base font-semibold text-white flex items-center mb-2">
                        <Code className="h-4 w-4 mr-2 text-red-500" />
                      Technical Specifications
                    </h4>
                      <p className="text-white/70 text-xs md:text-sm">{featureDetails[activeFeature].techSpecs}</p>
                    </div>
                  </div>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
        
        {/* Rest of the component remains largely unchanged but with responsive adjustments */}
        {/* ... */}
      </div>
    </section>
  )
}

