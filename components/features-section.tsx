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
    title: "Advanced AI Models",
    description: "State-of-the-art machine learning models trained on vast datasets for superior accuracy and performance.",
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
    title: "Real-time Processing",
    description: "Lightning-fast data processing with our distributed computing infrastructure for instant insights.",
    icon: <Zap className="h-6 w-6" />,
    color: "yellow",
    stats: {
      label: "Processing Speed",
      value: "2.4 TB/s",
    },
    gradient: "from-yellow-500/20 to-yellow-600/20",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.3)]",
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption and compliance with global data protection standards.",
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
    title: "Advanced Analytics",
    description: "Comprehensive analytics dashboard with customizable reports and interactive visualizations.",
    icon: <BarChart2 className="h-6 w-6" />,
    color: "green",
    stats: {
      label: "Data Points",
      value: "1M+",
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
    "Advanced AI Models": 95,
    "Real-time Processing": 90,
    "Enterprise Security": 98,
    "Advanced Analytics": 92
  },
  reliability: {
    "Advanced AI Models": 93,
    "Real-time Processing": 97,
    "Enterprise Security": 99,
    "Advanced Analytics": 95
  },
  scalability: {
    "Advanced AI Models": 97,
    "Real-time Processing": 95,
    "Enterprise Security": 96,
    "Advanced Analytics": 90
  },
  costEfficiency: {
    "Advanced AI Models": 85,
    "Real-time Processing": 82,
    "Enterprise Security": 89,
    "Advanced Analytics": 93
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

// Cast featureDetails with proper type
const featureDetails: FeatureDetails = {
  "Advanced AI Models": {
    description: "Our advanced AI models are built on cutting-edge neural network architectures including transformers, graph neural networks, and reinforcement learning systems.",
    useCases: [
      "Predictive analytics for financial forecasting",
      "Automated customer support routing",
      "Content personalization and recommendation",
      "Business intelligence and data analysis"
    ],
    metrics: {
      accuracy: 99.9,
      latency: 12, // in ms
      throughput: 25000 // requests per second
    },
    techSpecs: "Built on distributed tensor processing units (TPUs) with over 120 billion parameters and trained on 4.2 petabytes of curated data."
  },
  "Real-time Processing": {
    description: "Our distributed compute infrastructure processes data across thousands of nodes in real-time, enabling instant insights and decisions.",
    useCases: [
      "Financial fraud detection",
      "Real-time supply chain optimization",
      "Dynamic pricing systems",
      "Live event monitoring and analytics"
    ],
    metrics: {
      throughput: 2.4, // terabytes per second
      scalability: 99.99, // percentage uptime
      concurrency: 50000 // concurrent requests
    },
    techSpecs: "Kubernetes-orchestrated microservices architecture with Redis-powered in-memory caching and custom distributed message queuing."
  },
  "Enterprise Security": {
    description: "Our platform implements military-grade encryption and comprehensive security protocols, ensuring data privacy and regulatory compliance.",
    useCases: [
      "Healthcare data protection",
      "Financial services compliance",
      "Government and defense applications",
      "Secure data sharing between organizations"
    ],
    metrics: {
      encryptionLevel: "AES-256",
      complianceCertifications: ["HIPAA", "GDPR", "SOC 2", "ISO 27001"],
      threatDetection: 99.99 // percentage
    },
    techSpecs: "End-to-end encryption with automated key rotation, anomaly detection systems, and continuous penetration testing protocols."
  },
  "Advanced Analytics": {
    description: "Our analytics engine provides deep insights through customizable dashboards, interactive visualizations, and automated reporting.",
    useCases: [
      "Business performance monitoring",
      "Marketing campaign optimization",
      "Product usage analysis",
      "Customer journey tracking"
    ],
    metrics: {
      dataPoints: "1M+",
      visualizationTypes: 34,
      reportAutomation: 100, // percentage
    },
    techSpecs: "Powered by our distributed query engine capable of processing petabytes of data with SQL-like queries and real-time aggregations."
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
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <Badge className="mb-3 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white hover:from-red-600/80 hover:to-red-700/80 border-none shadow-lg shadow-red-900/20 px-2 py-1 md:px-3 md:py-1.5 text-xs">
                  POWERFUL FEATURES
                </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/90">
            Core Capabilities
          </h2>
          <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
            Our platform combines advanced technologies to deliver powerful, secure, and scalable AI solutions.
          </p>
        </div>
        
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={feature.title === activeFeature ? ref : undefined}
              className={`${
                feature.title === activeFeature ? feature.glow : ""
              } group relative p-4 md:p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 cursor-pointer overflow-hidden`}
              onClick={() => handleFeatureClick(feature.title)}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 h-[40%] w-[40%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 left-0 h-px w-8 bg-gradient-to-r from-transparent to-current"></div>
                <div className="absolute top-0 left-0 h-8 w-px bg-gradient-to-b from-transparent to-current"></div>
              </div>
              <div className="absolute bottom-0 right-0 h-[40%] w-[40%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-transparent to-current"></div>
                <div className="absolute bottom-0 right-0 h-8 w-px bg-gradient-to-t from-transparent to-current"></div>
              </div>
              
              {/* Feature content */}
              <div className={`p-2.5 md:p-3 bg-${feature.color}-500/10 text-${feature.color}-500 rounded-lg w-fit mb-3 md:mb-4`}>{feature.icon}</div>
              <h3 className={`text-lg md:text-xl font-bold mb-1.5 md:mb-2 text-white group-hover:text-${feature.color}-400 transition-colors`}>{feature.title}</h3>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white/90 transition-colors mb-3 md:mb-4">{feature.description}</p>
              
              {/* Stats indicator */}
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-white/60">{feature.stats.label}</span>
                <span className={`text-${feature.color}-500 font-bold`}>{feature.stats.value}</span>
                    </div>
                    
              {/* Animated progress bar */}
              <div className="mt-1.5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                  className={`h-full bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-full`}
                            initial={{ width: "0%" }}
                  animate={{ 
                    width: animatedStats[feature.title] ? `${animatedStats[feature.title]}%` : "0%" 
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                ></motion.div>
                        </div>
                      </div>
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

