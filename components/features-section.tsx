"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FlexibleSection } from "@/components/flexible-section"
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
} from "lucide-react"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

// Add feature detail modal data
const featureDetails = {
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

interface FeaturesSectionProps {
  fullWidth?: boolean;
}

export default function FeaturesSection({ fullWidth = true }: FeaturesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
    <FlexibleSection
      fullWidth={fullWidth}
      className="relative overflow-hidden py-12 w-full"
      noPadding={false}
    >
      <div ref={containerRef} className="relative overflow-hidden w-full">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px] animate-pulse-slow"></div>
        
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
        />
        
        <div className="relative z-10 w-full">
          {/* Compact Feature Header - Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center w-full">
            {/* Left column: Title and description */}
            <div>
              <div className="mb-4 inline-flex items-center">
                <div>
                  <Badge 
                    variant="outline" 
                    className="text-sm font-medium bg-red-500/10 backdrop-blur-sm border-red-500/30 text-red-400 shadow-glow-sm shadow-red-500/20 px-4 py-1.5"
                  >
                    POWERFUL FEATURES
                  </Badge>
                </div>
              </div>
              
              <h2 
                className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
              >
                Enterprise-Grade <span className="text-red-500">AI Platform</span>
              </h2>
              
              <p 
                className="text-base md:text-lg text-white/70"
              >
                Built for scale and performance, our platform delivers cutting-edge AI capabilities with enterprise-grade reliability.
              </p>
            </div>

            {/* Right column: Compare Features button */}
            <div className="flex justify-start md:justify-end">
              <Button 
                variant="outline" 
                className={`flex items-center gap-2 ${comparisonMode ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'border-white/20 hover:border-red-500/40'} backdrop-blur-sm transition-all duration-300 hover:shadow-glow-sm hover:shadow-red-500/20 px-5 py-2.5`}
                onClick={() => setComparisonMode(!comparisonMode)}
              >
                <Sliders className="h-4 w-4 mr-2" />
                {comparisonMode ? "Exit Comparison" : "Compare Features"}
                <motion.span
                  animate={{ rotate: comparisonMode ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </Button>
            </div>
          </div>
          
          {/* Comparison Mode Panel - Enhanced */}
          <AnimatePresence>
            {comparisonMode && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-10 overflow-hidden w-full"
              >
                <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-4 w-full">
                  <p className="text-sm text-white/60 mb-2">Select up to 3 features to compare</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {features.map(feature => (
                      <Badge 
                        key={feature.title}
                        variant={selectedFeatures.includes(feature.title) ? "default" : "outline"}
                        className={`cursor-pointer backdrop-blur-sm transition-all duration-300 ${
                          selectedFeatures.includes(feature.title) 
                            ? `bg-${feature.color}-500/20 text-${feature.color}-300 border-${feature.color}-500/40` 
                            : 'hover:bg-white/10 border-white/20'
                        }`}
                        onClick={() => toggleFeatureSelection(feature.title)}
                      >
                        {feature.title}
                        {selectedFeatures.includes(feature.title) && (
                          <Check className="ml-1 h-3 w-3" />
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {selectedFeatures.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-6 w-full"
                    >
                      <div className="flex justify-center gap-2 mb-4">
                        {(["performance", "reliability", "scalability", "costEfficiency"] as const).map(metric => (
                          <Button 
                            key={metric}
                            variant={selectedMetric === metric ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedMetric(metric)}
                            className={`text-xs backdrop-blur-sm transition-all duration-300 ${
                              selectedMetric === metric 
                                ? 'bg-red-500/20 text-red-300 border-red-500/40 shadow-glow-sm shadow-red-500/20' 
                                : 'border-white/20 hover:border-red-500/30'
                            }`}
                          >
                            {metric.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-end gap-4 w-full">
                        {selectedFeatures.map(featureTitle => {
                          const feature = features.find(f => f.title === featureTitle);
                          if (!feature) return null;  // Safety check
                          const value = featureComparison[selectedMetric as MetricKey][featureTitle];
                          const color = feature?.color === 'red' ? 'bg-red-500' : 
                                      feature?.color === 'blue' ? 'bg-blue-500' : 
                                      feature?.color === 'green' ? 'bg-green-500' : 'bg-yellow-500';
                          const glowColor = feature?.color === 'red' ? 'shadow-red-500/30' : 
                                          feature?.color === 'blue' ? 'shadow-blue-500/30' : 
                                          feature?.color === 'green' ? 'shadow-green-500/30' : 'shadow-yellow-500/30';
                          
                          return (
                            <motion.div 
                              key={featureTitle} 
                              className="space-y-1"
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.7 }}
                            >
                              <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${color}`}></div>
                                  {featureTitle}
                                </div>
                                <span className="text-white/70">{value}%</span>
                              </div>
                              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                                <motion.div
                                  className={`h-full ${color} shadow-glow-sm ${glowColor}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${value}%` }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                        
                        {/* Show industry benchmark */}
                        {showBenchmark && (
                          <div className="mt-2 pt-2 border-t border-white/10 w-full">
                            <div className="flex justify-between text-sm mb-1">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                                Industry Average
                              </div>
                              <span className="text-white/70">{industryBenchmarks[selectedMetric as MetricKey]}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                              <motion.div
                                className="h-full bg-white/30"
                                initial={{ width: 0 }}
                                animate={{ width: `${industryBenchmarks[selectedMetric as MetricKey]}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact Feature Cards - Grid Layout - No scroll animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl`}
              >
                <Card 
                  className={`bg-black/60 backdrop-blur-xl border border-white/10 hover:${feature.glow} group-hover:border-${feature.color}-500/30 h-full transition-all duration-300 group-hover:bg-${feature.gradient} group-hover:backdrop-blur-xl hover:shadow-xl overflow-hidden`}
                  onClick={() => handleFeatureClick(feature.title)}
                >
                  <CardContent className="p-5 sm:p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="mb-4 flex justify-between items-start">
                        <div className={`p-2 sm:p-3 rounded-lg bg-${feature.color}-500/10 backdrop-blur-xl border border-${feature.color}-500/20 text-${feature.color}-500`}>
                          {feature.icon}
                        </div>
                        
                        {comparisonMode && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-7 w-7 rounded-full ${selectedFeatures.includes(feature.title) ? `bg-${feature.color}-500/20 text-${feature.color}-300` : 'text-white/40 hover:text-white/60'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFeatureSelection(feature.title);
                            }}
                          >
                            {selectedFeatures.includes(feature.title) ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-white transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-sm text-white/70 line-clamp-3 sm:line-clamp-none mb-3 sm:mb-4">
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto w-full">
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-white/60">{feature.stats.label}</span>
                        <span className={`text-${feature.color}-400 font-medium`}>{feature.stats.value}</span>
                      </div>
                      
                      <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
                        <motion.div
                          className={`h-full rounded-full bg-${feature.color}-500`}
                          initial={{ width: 0 }}
                          animate={{ width: feature.stats.value.includes('%') ? `${feature.stats.value}` : "100%" }}
                          transition={{ duration: 1.5, delay: 0.2 * index }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Capabilities Cards - No scroll animation */}
          <div className="mt-10 sm:mt-16">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2 relative">
                <span className="relative">
                  Core Capabilities
                  <div className="absolute -bottom-1 left-0 h-0.5 bg-red-500 w-full" />
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-white/60 ml-1.5 cursor-help transition-colors duration-300 hover:text-white/80" />
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" className="bg-black/80 backdrop-blur-lg border border-white/10 text-white p-3 max-w-xs">
                      <p className="text-sm">The core capabilities power our entire platform.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              <Button variant="link" className="text-red-400 hover:text-red-300 transition-colors duration-300 hidden sm:flex" asChild>
                <Link href="/capabilities">
                  View All Capabilities
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {capabilities.map((capability, index) => (
                <div
                  key={capability.title}
                  className={`group rounded-xl backdrop-blur-sm bg-${capability.gradient} border border-${capability.color}-500/20 hover:border-${capability.color}-500/40 p-4 sm:p-5 flex gap-3 sm:gap-4 transition-all duration-300 hover:backdrop-blur-xl hover:shadow-lg`}
                >
                  <div className={`flex-shrink-0 p-2 sm:p-2.5 rounded-lg bg-${capability.color}-500/10 backdrop-blur-2xl border border-${capability.color}-500/30 text-${capability.color}-500 h-fit mt-0.5`}>
                    {capability.icon}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 text-white">
                      {capability.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/70 line-clamp-2 sm:line-clamp-3">
                      {capability.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center sm:hidden">
              <Button variant="link" className="text-red-400 hover:text-red-300 transition-colors duration-300" asChild>
                <Link href="/capabilities">
                  View All Capabilities
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && activeFeature && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDetailModalOpen(false)}
          >
            <motion.div
              className="bg-black/90 border border-white/20 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{activeFeature}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsDetailModalOpen(false)}
                    className="rounded-full h-8 w-8 hover:bg-white/10"
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-white/80 mb-4">{featureDetails[activeFeature as keyof typeof featureDetails]?.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                        Key Use Cases
                      </h4>
                      <ul className="space-y-1">
                        {featureDetails[activeFeature as keyof typeof featureDetails]?.useCases.map((useCase, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            </div>
                            <span className="text-white/70">{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <Activity className="mr-2 h-5 w-5 text-green-500" />
                        Performance Metrics
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(featureDetails[activeFeature as keyof typeof featureDetails]?.metrics || {}).map(([key, value], idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="text-white font-medium">
                                {Array.isArray(value) ? value.join(', ') : value}
                                {key === 'accuracy' || key === 'scalability' || key === 'threatDetection' ? '%' : 
                                 key === 'latency' ? 'ms' : 
                                 key === 'throughput' && !String(value).includes('TB') ? 'TB/s' : ''}
                              </span>
                            </div>
                            {typeof value === 'number' && !Array.isArray(value) && (
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full bg-blue-500" 
                                  style={{ width: `${Math.min(100, value)}%` }} 
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <BarChart2 className="mr-2 h-5 w-5 text-blue-500" />
                      Technical Specifications
                    </h4>
                    <p className="text-white/70">{featureDetails[activeFeature as keyof typeof featureDetails]?.techSpecs}</p>
                  </div>

                  {/* New Benchmark Comparison Section */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-purple-500" />
                      Industry Benchmark Comparison
                    </h4>
                    
                    <div className="space-y-4">
                      {(["performance", "reliability", "scalability", "costEfficiency"] as const).map(metric => {
                        const value = featureComparison[metric as MetricKey][activeFeature];
                        const benchmark = industryBenchmarks[metric as MetricKey];
                        const difference = value - benchmark;
                        
                        return (
                          <div key={metric} className="space-y-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white/70 capitalize">
                                {metric.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className={difference > 0 ? "text-green-500" : "text-red-500"}>
                                  {difference > 0 ? "+" : ""}{difference}%
                                </span>
                                <span className="text-white/70">vs. industry</span>
                              </div>
                            </div>
                            
                            <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                              {/* Industry benchmark line */}
                              <div 
                                className="absolute h-full w-px bg-yellow-500 z-10"
                                style={{ left: `${benchmark}%` }}
                              >
                                <div className="w-2 h-2 rounded-full bg-yellow-500 absolute -top-0.5 -left-1"></div>
                              </div>
                              
                              {/* Feature value */}
                              <div 
                                className="h-full rounded-full bg-blue-500" 
                                style={{ width: `${value}%` }}
                              />
                            </div>
                            
                            <div className="flex justify-between text-xs text-white/50 mt-1">
                              <span>0%</span>
                              <span>Industry: {benchmark}%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2 bg-white/5">
                        <Fingerprint className="h-3 w-3 mr-1" />
                        Enterprise-grade
                      </Badge>
                      <Badge variant="outline" className="bg-white/5">
                        <Shield className="h-3 w-3 mr-1" />
                        SOC 2 Compliant
                      </Badge>
                    </div>
                    
                    <Button className="bg-white/10 hover:bg-white/20 text-white border-0">
                      Request Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FlexibleSection>
  )
}