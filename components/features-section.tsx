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
    <section ref={containerRef} className="relative overflow-hidden py-12">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px] animate-pulse-slow"></div>
      
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Feature Header - Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
          {/* Left column: Title and description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-4 inline-flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Badge 
                  variant="outline" 
                  className="text-sm font-medium bg-red-500/10 backdrop-blur-sm border-red-500/30 text-red-400 shadow-glow-sm shadow-red-500/20 px-4 py-1.5"
                >
                  POWERFUL FEATURES
                </Badge>
              </motion.div>
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
            >
              Enterprise-Grade <span className="text-red-500">AI Platform</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-base md:text-lg text-white/70"
            >
              Built for scale and performance, our platform delivers cutting-edge AI capabilities with enterprise-grade reliability.
            </motion.p>
          </motion.div>

          {/* Right column: Compare Features button */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-start md:justify-end"
          >
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
          </motion.div>
        </div>
        
        {/* Comparison Mode Panel - Enhanced */}
        <AnimatePresence>
          {comparisonMode && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-10 overflow-hidden"
            >
              <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-4 max-w-3xl mx-auto">
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
                    className="mt-6"
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
                    
                    <div className="flex-1 flex flex-col justify-end gap-4 max-w-2xl mx-auto">
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
                        <div className="mt-2 pt-2 border-t border-white/10">
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

        {/* Compact Feature Cards - Grid Layout */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -5, 
                transition: { duration: 0.2 },
                scale: 1.01
              }}
              onClick={() => comparisonMode ? toggleFeatureSelection(feature.title) : handleFeatureClick(feature.title)}
              className="cursor-pointer relative"
            >
              {comparisonMode && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`absolute top-2 right-2 z-10 rounded-full p-1 ${
                    selectedFeatures.includes(feature.title) 
                      ? `bg-${feature.color}-500/30 text-${feature.color}-300 shadow-glow-sm shadow-${feature.color}-500/30` 
                      : 'bg-white/10'
                  }`}
                >
                  {selectedFeatures.includes(feature.title) ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Plus className="h-3 w-3" />
                  )}
                </motion.div>
              )}
              
              <Card className={`h-full bg-black/40 backdrop-blur-md border-white/10 hover:border-${feature.color}-500/50 transition-all duration-300 transform-gpu group`}>
                <CardContent className="p-4 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className={`absolute -inset-[1px] bg-gradient-to-r ${feature.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-3">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className={`w-10 h-10 rounded-lg ${feature.gradient} flex items-center justify-center mr-3 shadow-glow-sm shadow-${feature.color}-500/30 group-hover:shadow-glow-md group-hover:shadow-${feature.color}-500/40 transition-all duration-500`}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <h3 className="text-lg font-bold group-hover:text-white/90 transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/70 mb-4 text-sm">{feature.description}</p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-xs text-white/60">{feature.stats.label}</span>
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        className={`text-base font-bold text-${feature.color}-400`}
                      >
                        {feature.stats.value}
                      </motion.span>
                    </div>
                    
                    {animatedStats[feature.title] && (
                      <div className="mt-2">
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full rounded-full ${feature.color === 'red' ? 'bg-red-500' : feature.color === 'blue' ? 'bg-blue-500' : feature.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'} shadow-glow-sm shadow-${feature.color}-500/30`}
                            initial={{ width: "0%" }}
                            animate={{ width: `${animatedStats[feature.title]}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          {/* Two-column layout for AI CAPABILITIES header - Reversed order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-center">
            <div className="flex justify-start md:justify-start">
              <Button variant="outline" size="sm" className="text-sm border-white/20 hover:border-blue-500/40">
                View All Capabilities
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="mb-2 text-sm font-medium bg-blue-500/10 border-blue-500/30 text-blue-400">
                AI CAPABILITIES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Advanced AI Technologies
              </h2>
              <p className="text-lg text-white/70">
                Harness the power of multiple AI technologies working together to solve complex business challenges.
              </p>
            </div>
          </div>

          {/* Compact grid for capabilities */}
          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  scale: 1.01,
                  transition: { duration: 0.2 } 
                }}
                className="cursor-pointer"
              >
                <Card className="h-full bg-black/40 backdrop-blur-md border-white/10 hover:border-blue-500/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-lg ${capability.gradient} flex items-center justify-center mr-3`}>
                        {capability.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{capability.title}</h3>
                    </div>
                    <p className="text-white/70 text-sm mb-3">{capability.description}</p>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" className="px-0 py-0 h-auto hover:bg-transparent hover:text-blue-400 text-white/70">
                        <span className="text-xs">Explore</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
    </section>
  )
}