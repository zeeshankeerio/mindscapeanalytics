import { motion, AnimatePresence, useAnimation, useMotionValue, PanInfo } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TypeAnimation } from "react-type-animation"
import { 
  ArrowRight, 
  Code, 
  Database, 
  Brain, 
  Zap, 
  Clock, 
  Eye, 
  Github, 
  ExternalLink, 
  Filter, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Pen, 
  BarChart, 
  Pizza, 
  Recycle, 
  Youtube, 
  Play, 
  Pause,
  RefreshCw,
  Check,
  ImageIcon,
  ShoppingCart,
  Car,
  Building,
  Home
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Available project images for random assignment
const availableProjectImages = [
  "/images/projects/Automated Workflows.png",
  "/images/projects/Investment_Insights.png",
  "/images/projects/vehicle_analysis_dashboard.png",
  "/images/projects/our_web_designs.png",
  "/images/projects/mindscapeanalytics.png",
  "/images/projects/jfbz_token.png",
  "/images/projects/image_annotation_tool.png",
  "/images/projects/cryptotrader2.png",
  "/images/projects/cryforecast.png",
  "/images/projects/amazon_sales_management.png",
  "/images/projects/amazon_invontry_management_system.png",
  "/images/projects/amazon_inventory.png",
  "/images/projects/KStock_Analyzer.png",
  "/images/projects/KAITOOLS.png",
  "/images/projects/Crypto_folio_App.png",
  "/images/projects/Crypto_Tracker.png",
  "/images/projects/AgriChian.jpg",
  "/images/scrolling_solutions/real_estate_solutions.png"
];

const getRandomProjectImage = () => {
  const randomIndex = Math.floor(Math.random() * availableProjectImages.length);
  return availableProjectImages[randomIndex];
};

interface ProjectFeature {
  [key: number]: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  href: string;
  features: string[];
  status: string;
  videoLink?: string;
  externalLink?: string;
  imageUrl?: string;
  color?: string;
}

interface CurrentProject extends Project {}

interface UpcomingProject extends Project {
  demoLink: string;
  repoLink: string;
  releaseDate: string;
  progress?: number;
}

const currentProjects: CurrentProject[] = [
  {
    id: "mindscape-analytics",
    title: "Mindscape Analytics",
    description: "A comprehensive data analytics platform designed for business intelligence with intuitive visualization and predictive analytics",
    category: "Data Analytics",
    icon: Brain,
    href: "/projects/mindscape-analytics",
    features: ["Interactive Dashboards", "Real-time Processing", "Predictive Analytics", "Custom Report Generation"],
    status: "Beta",
    videoLink: "https://youtu.be/23A9JRb0SXM",
    externalLink: "https://mindscape.ai",
    imageUrl: "/images/projects/mindscapeanalytics.png",
    color: "indigo"
  },
  {
    id: "cryptotrader",
    title: "CryptoTrader",
    description: "An advanced cryptocurrency trading platform with AI-driven market analysis and automated trading strategies",
    category: "Finance",
    icon: BarChart,
    href: "/projects/cryptotrader",
    features: ["Automated Trading", "Real-time Market Analysis", "Portfolio Optimization", "Risk Management"],
    status: "Beta",
    videoLink: "https://youtu.be/CcPag_gW78Y",
    externalLink: "https://cryptotrader.io",
    imageUrl: "/images/projects/cryptotrader2.png",
    color: "blue"
  },
  {
    id: "agrichan",
    title: "AgriChan",
    description: "Revolutionary agricultural management platform combining IoT sensors, satellite imagery, and AI for farming optimization",
    category: "Agriculture",
    icon: Recycle,
    href: "/projects/agrichan",
    features: ["Crop Monitoring", "Weather Prediction", "Resource Optimization", "Yield Forecasting"],
    status: "Development",
    videoLink: "https://youtu.be/Fn2a55UKkhU",
    externalLink: "https://agrichan.tech",
    imageUrl: "/images/projects/AgriChian.jpg",
    color: "green"
  },
  {
    id: "image-annotation",
    title: "Advanced Image Annotation Tool",
    description: "A sophisticated image annotation platform for AI training data preparation with intelligent auto-annotation capabilities",
    category: "Computer Vision",
    icon: ImageIcon,
    href: "/projects/annotation-tool",
    features: ["AI-powered Annotation", "Collaborative Workflow", "Quality Assurance", "Dataset Management"],
    status: "Alpha",
    videoLink: "https://youtu.be/cd75TIAM9X0",
    externalLink: "https://annotation.ai",
    imageUrl: "/images/projects/image_annotation_tool.png",
    color: "purple"
  },
  {
    id: "quantum-crypto",
    title: "Quantum Crypto Index Bot",
    description: "A cutting-edge financial tool leveraging quantum computing techniques to analyze cryptocurrency markets and manage indexed portfolios",
    category: "Finance",
    icon: Database,
    href: "/projects/quantum-crypto",
    features: ["Quantum Algorithms", "Automated Rebalancing", "Market Prediction", "Risk Optimization"],
    status: "Alpha",
    videoLink: "https://youtu.be/CcPag_gW78Y",
    externalLink: "https://quantumcrypto.io",
    imageUrl: "/images/projects/Crypto_folio_App.png",
    color: "cyan"
  },
  {
    id: "contentforge",
    title: "ContentForge",
    description: "AI-powered content creation platform for digital marketers that generates high-quality posts and marketing materials",
    category: "AI Content Generation",
    icon: Pen,
    href: "/projects/contentforge",
    features: ["One-Click Generation", "SEO Optimization", "Multi-Platform Support", "Brand Voice Customization"],
    status: "Alpha",
    videoLink: "https://youtu.be/23A9JRb0SXM",
    externalLink: "https://contentforge.ai",
    imageUrl: "/images/projects/our_web_designs.png",
    color: "teal"
  },
  {
    id: "amazon-inventory",
    title: "Amazon Inventory Manager",
    description: "Comprehensive solution for Amazon sellers to manage inventory, track sales, forecast demand, and optimize restocking",
    category: "E-commerce",
    icon: ShoppingCart,
    href: "/projects/amazon-inventory",
    features: ["Inventory Tracking", "Sales Analytics", "Demand Forecasting", "Profit Optimization"],
    status: "Completed",
    videoLink: "https://youtu.be/JbIPyXUMYFY",
    externalLink: "https://amazinventory.io",
    imageUrl: "/images/projects/amazon_invontry_management_system.png",
    color: "amber"
  },
  {
    id: "vehicle-eu-analytics",
    title: "Vehicle EU Market Analytics",
    description: "Sophisticated platform for analyzing the European vehicle market, tracking trends, and identifying optimal buy/sell opportunities",
    category: "Automotive",
    icon: Car,
    href: "/projects/vehicle-eu-analytics",
    features: ["Market Trend Analysis", "Price Prediction", "Inventory Optimization", "Competitor Tracking"],
    status: "Completed",
    videoLink: "https://youtu.be/cd75TIAM9X0",
    externalLink: "https://euvehicle.market",
    imageUrl: "/images/projects/vehicle_analysis_dashboard.png",
    color: "pink"
  },
  {
    id: "jfbz-token",
    title: "JFBZ Token Exchange",
    description: "Secure and high-performance cryptocurrency exchange platform specialized in the JFBZ token ecosystem",
    category: "Blockchain",
    icon: Database,
    href: "/projects/jfbz-token",
    features: ["High-speed Trading", "Multi-wallet Integration", "Advanced Security", "Portfolio Analytics"],
    status: "Beta",
    videoLink: "https://youtu.be/CcPag_gW78Y",
    externalLink: "https://jfbz.exchange",
    imageUrl: "/images/projects/jfbz_token.png",
    color: "violet"
  },
  {
    id: "kstock-analyzer",
    title: "KStock Analyzer",
    description: "Advanced stock market analysis tool using AI to identify market patterns, predict trends, and provide actionable insights",
    category: "Finance",
    icon: BarChart,
    href: "/projects/kstock-analyzer",
    features: ["Pattern Recognition", "Technical Analysis", "Sentiment Analysis", "Portfolio Risk Assessment"],
    status: "Completed",
    videoLink: "https://youtu.be/CcPag_gW78Y",
    externalLink: "https://kstock.io",
    imageUrl: "/images/projects/KStock_Analyzer.png",
    color: "emerald"
  },
  {
    id: "crypto-tracker",
    title: "Crypto Tracker Pro",
    description: "Comprehensive cryptocurrency tracking and portfolio management application for monitoring prices and performance",
    category: "Finance",
    icon: BarChart,
    href: "/projects/crypto-tracker",
    features: ["Multi-exchange Integration", "Real-time Alerts", "Portfolio Tracking", "Tax Reporting"],
    status: "Completed",
    videoLink: "https://youtu.be/CcPag_gW78Y",
    externalLink: "https://cryptotrackerpro.app",
    imageUrl: "/images/projects/Crypto_Tracker.png",
    color: "orange"
  },
  {
    id: "cryoforst",
    title: "CryoForst Analytics",
    description: "Specialized data analytics platform for the cryogenics and cold chain industry with monitoring and optimization",
    category: "IoT Analytics",
    icon: Brain,
    href: "/projects/cryoforst",
    features: ["Temperature Monitoring", "Predictive Maintenance", "Energy Optimization", "Compliance Reporting"],
    status: "Beta",
    videoLink: "https://youtu.be/23A9JRb0SXM",
    externalLink: "https://cryoforst.io",
    imageUrl: "/images/projects/cryforecast.png",
    color: "lime"
  },
  {
    id: "kitools",
    title: "KITOOLS Development Suite",
    description: "Comprehensive toolset for developers that streamlines workflow, automates tasks, and enhances productivity",
    category: "Developer Tools",
    icon: Code,
    href: "/projects/kitools",
    features: ["Code Generation", "Automated Testing", "Performance Profiling", "Code Review Assistant"],
    status: "Beta",
    videoLink: "https://youtu.be/23A9JRb0SXM",
    externalLink: "https://kitools.dev",
    imageUrl: "/images/projects/KAITOOLS.png",
    color: "rose"
  },
  {
    id: "real-estate-solutions",
    title: "Real Estate Analytics",
    description: "Comprehensive real estate market analytics platform for property valuation, trend analysis, and investment opportunities",
    category: "Real Estate",
    icon: Home,
    href: "/projects/real-estate-solutions",
    features: ["Property Valuation", "Market Trend Analysis", "Investment Opportunity Scoring", "Predictive Price Modeling"],
    status: "Development",
    videoLink: "https://youtu.be/cd75TIAM9X0",
    externalLink: "https://realestate.mindscape.io",
    imageUrl: "/images/scrolling_solutions/real_estate_solutions.png",
    color: "red"
  },
  {
    id: "amazon-sales-analytics",
    title: "Amazon Sales Analytics Platform",
    description: "Comprehensive analytics solution for Amazon sellers with real-time sales data, competitive analysis, and marketing performance tracking",
    category: "E-commerce",
    icon: ShoppingCart,
    href: "/projects/amazon-sales-analytics",
    features: ["Sales Dashboard", "Competitor Monitoring", "Campaign Analysis", "Pricing Optimization"],
    status: "Beta",
    videoLink: "https://youtu.be/JbIPyXUMYFY",
    externalLink: "https://amazonsales.ai",
    imageUrl: "/images/projects/amazon_sales_management.png",
    color: "yellow"
  },
  {
    id: "amazon-inventory-opt",
    title: "Amazon Inventory Optimization",
    description: "Specialized inventory management solution for Amazon sellers that uses AI to optimize stock levels and prevent stockouts",
    category: "E-commerce",
    icon: ShoppingCart,
    href: "/projects/amazon-inventory-opt",
    features: ["Stock Optimization", "Demand Forecasting", "Reorder Automation", "Multi-warehouse Balancing"],
    status: "Completed",
    videoLink: "https://youtu.be/JbIPyXUMYFY",
    externalLink: "https://amazinventory.io",
    imageUrl: "/images/projects/amazon_inventory.png",
    color: "fuchsia"
  },
  {
    id: "disposal-production-tracker",
    title: "Disposal & Production Tracker",
    description: "Advanced tracking system for monitoring disposal operations and production processes with real-time analytics",
    category: "Operations",
    icon: BarChart,
    href: "/projects/disposal-production-tracker",
    features: ["Real-time Tracking", "Production Analytics", "Disposal Management", "Performance Metrics"],
    status: "Live",
    videoLink: "https://youtu.be/kjHZvUcBlFk",
    externalLink: "https://disposal-tracker.mindscape.ai",
    imageUrl: "/images/projects/Automated Workflows.png",
    color: "emerald"
  },
  {
    id: "realtime-stock-trading",
    title: "Real-Time Stock Trading",
    description: "Intraday stock trading platform with real-time buy/sell signals and market analysis",
    category: "Finance",
    icon: BarChart,
    href: "/projects/realtime-stock-trading",
    features: ["Live Market Data", "Buy/Sell Signals", "Portfolio Tracking", "Risk Analysis"],
    status: "Live",
    videoLink: "https://youtu.be/CcPag_gW78Y",
    externalLink: "https://stock-trading.mindscape.ai",
    imageUrl: "/images/projects/Investment_Insights.png",
    color: "blue"
  }
]

const upcomingProjects: UpcomingProject[] = [
  {
    id: "quantum-ml",
    title: "Quantum ML",
    description: "Quantum-inspired machine learning platform for solving complex optimization problems",
    category: "Quantum Computing",
    icon: Brain,
    href: "/projects/quantum-ml",
    demoLink: "https://demo.mindscape.ai/quantum-ml",
    repoLink: "https://github.com/mindscape/quantum-ml-demo",
    features: ["Quantum Algorithm Simulation", "Optimization Toolkit", "Integration with Classical ML"],
    status: "Development",
    releaseDate: "Q3 2023",
    progress: 75,
    videoLink: "https://youtu.be/23A9JRb0SXM",
    color: "violet",
    imageUrl: "/images/projects/Investment_Insights.png"
  },
  {
    id: "decentraledge",
    title: "DecentralEdge",
    description: "Decentralized edge computing network leveraging blockchain for IoT applications",
    category: "Edge Computing",
    icon: Database,
    href: "/projects/decentraledge",
    demoLink: "https://demo.mindscape.ai/decentraledge",
    repoLink: "https://github.com/mindscape/decentraledge-demo",
    features: ["Edge Node Network", "Smart Contract Integration", "IoT Device Management"],
    status: "Research",
    releaseDate: "Q4 2023",
    progress: 45,
    videoLink: "https://youtu.be/CcPag_gW78Y",
    color: "cyan",
    imageUrl: "/images/projects/Automated Workflows.png"
  },
  {
    id: "neurocraft",
    title: "NeuroCraft",
    description: "No-code AI model builder with advanced neural architecture search",
    category: "AI Development",
    icon: Code,
    href: "/projects/neurocraft",
    demoLink: "https://demo.mindscape.ai/neurocraft",
    repoLink: "https://github.com/mindscape/neurocraft-preview",
    features: ["Visual Model Builder", "AutoML Capabilities", "One-Click Deployment"],
    status: "Planning",
    releaseDate: "Q1 2024",
    progress: 20,
    videoLink: "https://youtu.be/cd75TIAM9X0",
    color: "emerald",
    imageUrl: "/images/projects/mindscapeanalytics.png"
  },
  {
    id: "neural-governance",
    title: "Neural Governance",
    description: "AI-powered governance and compliance platform for enterprise risk management",
    category: "Governance & Risk",
    icon: Brain,
    href: "/projects/neural-governance",
    demoLink: "https://demo.mindscape.ai/neural-governance",
    repoLink: "https://github.com/mindscape/neural-governance",
    features: ["Automated Compliance", "Risk Assessment", "Real-time Monitoring", "Regulatory Updates"],
    status: "Research",
    releaseDate: "Q2 2024",
    progress: 35,
    videoLink: "https://youtu.be/Fn2a55UKkhU",
    color: "pink",
    imageUrl: "/images/projects/vehicle_analysis_dashboard.png"
  }
]

// Helper function to get background gradient based on color
const getBackgroundGradient = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "from-red-600/20 to-red-900/20",
    blue: "from-blue-600/20 to-blue-900/20",
    green: "from-green-600/20 to-green-900/20",
    purple: "from-purple-600/20 to-purple-900/20",
    indigo: "from-indigo-600/20 to-indigo-900/20",
    pink: "from-pink-600/20 to-pink-900/20",
    yellow: "from-yellow-600/20 to-yellow-900/20",
    orange: "from-orange-600/20 to-orange-900/20",
    teal: "from-teal-600/20 to-teal-900/20",
    cyan: "from-cyan-600/20 to-cyan-900/20",
    amber: "from-amber-600/20 to-amber-900/20",
    lime: "from-lime-600/20 to-lime-900/20",
    emerald: "from-emerald-600/20 to-emerald-900/20",
    rose: "from-rose-600/20 to-rose-900/20",
    violet: "from-violet-600/20 to-violet-900/20",
  };
  
  return colorMap[color] || "from-red-600/20 to-red-900/20";
};

// Helper function to get border color based on color
const getBorderColor = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "border-red-500/30 hover:border-red-500/50",
    blue: "border-blue-500/30 hover:border-blue-500/50",
    green: "border-green-500/30 hover:border-green-500/50",
    purple: "border-purple-500/30 hover:border-purple-500/50",
    indigo: "border-indigo-500/30 hover:border-indigo-500/50",
    pink: "border-pink-500/30 hover:border-pink-500/50",
    yellow: "border-yellow-500/30 hover:border-yellow-500/50",
    orange: "border-orange-500/30 hover:border-orange-500/50",
    teal: "border-teal-500/30 hover:border-teal-500/50",
    cyan: "border-cyan-500/30 hover:border-cyan-500/50",
    amber: "border-amber-500/30 hover:border-amber-500/50",
    lime: "border-lime-500/30 hover:border-lime-500/50",
    emerald: "border-emerald-500/30 hover:border-emerald-500/50",
    rose: "border-rose-500/30 hover:border-rose-500/50",
    violet: "border-violet-500/30 hover:border-violet-500/50",
  };
  
  return colorMap[color] || "border-red-500/30 hover:border-red-500/50";
};

// Helper function to get text color based on color
const getTextColor = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "text-red-400",
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400",
    indigo: "text-indigo-400",
    pink: "text-pink-400",
    yellow: "text-yellow-400",
    orange: "text-orange-400",
    teal: "text-teal-400",
    cyan: "text-cyan-400",
    amber: "text-amber-400",
    lime: "text-lime-400",
    emerald: "text-emerald-400",
    rose: "text-rose-400",
    violet: "text-violet-400",
  };
  
  return colorMap[color] || "text-red-400";
};

// Helper function to get badge background color
const getBadgeBackground = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "bg-red-500/20 text-red-400",
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    purple: "bg-purple-500/20 text-purple-400",
    indigo: "bg-indigo-500/20 text-indigo-400",
    pink: "bg-pink-500/20 text-pink-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    orange: "bg-orange-500/20 text-orange-400",
    teal: "bg-teal-500/20 text-teal-400",
    cyan: "bg-cyan-500/20 text-cyan-400",
    amber: "bg-amber-500/20 text-amber-400",
    lime: "bg-lime-500/20 text-lime-400",
    emerald: "bg-emerald-500/20 text-emerald-400",
    rose: "bg-rose-500/20 text-rose-400",
    violet: "bg-violet-500/20 text-violet-400",
  };
  
  return colorMap[color] || "bg-red-500/20 text-red-400";
};

export default function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState("current")
  const [isPaused, setIsPaused] = useState(false)
  const [isUpcomingPaused, setIsUpcomingPaused] = useState(false)
  const marqueeControls = useAnimation()
  const upcomingMarqueeControls = useAnimation()
  const dragX = useMotionValue(0)
  const upcomingDragX = useMotionValue(0)
  const panStartX = useRef(0)
  const upcomingPanStartX = useRef(0)
  
  // Duplicate projects for seamless marquee effect
  const duplicatedCurrentProjects = [...currentProjects, ...currentProjects]
  
  // Duplicate upcoming projects for seamless marquee
  const duplicatedUpcomingProjects = [...upcomingProjects, ...upcomingProjects]
  
  // Calculate duration based on number of projects
  const marqueeDuration = duplicatedCurrentProjects.length * 5 // 5 seconds per project
  const upcomingMarqueeDuration = duplicatedUpcomingProjects.length * 6 // 6 seconds per project - slightly slower

  const startMarquee = useCallback(() => {
    if (!isPaused) {
      marqueeControls.start({
        x: ["0%", "-100%"],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0
        },
      })
    }
  }, [marqueeControls, isPaused])

  const startUpcomingMarquee = useCallback(() => {
    if (!isUpcomingPaused) {
      upcomingMarqueeControls.start({
        x: ["0%", "-100%"],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0
        },
      })
    }
  }, [upcomingMarqueeControls, isUpcomingPaused])

  const pauseMarquee = useCallback(() => {
    setIsPaused(true)
    marqueeControls.stop()
  }, [marqueeControls])

  const pauseUpcomingMarquee = useCallback(() => {
    setIsUpcomingPaused(true)
    upcomingMarqueeControls.stop()
  }, [upcomingMarqueeControls])

  const handleDragStart = useCallback(() => {
    panStartX.current = dragX.get()
    pauseMarquee()
  }, [dragX, pauseMarquee])

  const handleUpcomingDragStart = useCallback(() => {
    upcomingPanStartX.current = upcomingDragX.get()
    pauseUpcomingMarquee()
  }, [upcomingDragX, pauseUpcomingMarquee])

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x
    const offset = info.offset.x
    
    if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
      const direction = velocity > 0 ? 1 : -1
      const newX = panStartX.current + direction * 300
      marqueeControls.start({ x: newX, transition: { duration: 0.5 } })
    } else {
      marqueeControls.start({ x: panStartX.current, transition: { duration: 0.5 } })
    }
    
    setIsPaused(false)
    startMarquee()
  }, [marqueeControls, startMarquee])

  const handleUpcomingDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x
    const offset = info.offset.x
    
    if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
      const direction = velocity > 0 ? 1 : -1
      const newX = upcomingPanStartX.current + direction * 300
      upcomingMarqueeControls.start({ x: newX, transition: { duration: 0.5 } })
    } else {
      upcomingMarqueeControls.start({ x: upcomingPanStartX.current, transition: { duration: 0.5 } })
    }
    
    setIsUpcomingPaused(false)
    startUpcomingMarquee()
  }, [upcomingMarqueeControls, startUpcomingMarquee])

  useEffect(() => {
    startMarquee()
    return () => {
      marqueeControls.stop()
    }
  }, [marqueeControls, isPaused])

  useEffect(() => {
    startUpcomingMarquee()
    return () => {
      upcomingMarqueeControls.stop()
    }
  }, [upcomingMarqueeControls, isUpcomingPaused])

  // Card item animation variants
  const cardItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05, 
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };
  
  const upcomingCardItemVariants = cardItemVariants;

  return (
    <div className="relative overflow-hidden py-12">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px] animate-pulse-slow"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-red-500 rounded-full animate-float opacity-70"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-purple-500 rounded-full animate-float-slow opacity-50"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-float-reverse opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-green-500 rounded-full animate-float-slow opacity-70"></div>
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-float opacity-50"></div>
        <div className="absolute top-1/5 left-1/2 w-3 h-3 bg-red-500/30 rounded-full animate-pulse-fast opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-blue-500/30 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-2/5 right-1/6 w-1 h-1 bg-purple-500/30 rounded-full animate-ping-slow opacity-50"></div>
      </div>
      
      <div className="absolute top-0 left-1/4 w-1/2 h-40 bg-gradient-to-b from-red-500/10 to-transparent transform -rotate-45 blur-xl"></div>

      <div className="relative z-10">
        {/* Updated header with two-column layout similar to features section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
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
                  INNOVATION PORTFOLIO
                </Badge>
              </motion.div>
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
            >
              Our Cutting-Edge <span className="text-red-500">AI Projects</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-base md:text-lg text-white/70"
            >
              Explore our diverse portfolio of innovative solutions transforming industries and creating business value.
            </motion.p>
          </motion.div>

          {/* Right column: Explore All button */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-start md:justify-end"
          >
            <Button 
              asChild
              className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 text-white shadow-lg shadow-red-900/20 transition-all duration-300"
            >
              <Link href="/projects">
                Explore Full Project Gallery
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <Tabs defaultValue="current" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 max-w-[400px] mx-auto mb-8 bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-full overflow-hidden">
            <TabsTrigger value="current" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70 rounded-full transition-all duration-300">
              Current Projects
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70 rounded-full transition-all duration-300">
              Upcoming Projects
            </TabsTrigger>
          </TabsList>

          {/* Current Projects Tab with Interactive Marquee */}
          <TabsContent value="current">
            <div className="relative space-y-4">
              {/* Updated Marquee controls - more compact */}
              <div className="flex justify-end mb-4 gap-3">
                <Badge 
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-xs cursor-pointer hover:bg-white/10 transition-all duration-300 px-3 py-1.5 rounded-full flex items-center gap-2"
                  onClick={() => isPaused ? startMarquee() : pauseMarquee()}
                >
                  {isPaused ? (
                    <>
                      <Play className="h-3 w-3 text-green-500" fill="currentColor" />
                      <span className="text-white/60">Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="h-3 w-3 text-yellow-500" fill="currentColor" />
                      <span className="text-white/60">Pause</span>
                    </>
                  )}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-xs text-white/60 px-3 py-1.5 rounded-full"
                >
                  <span className="text-white/60">Drag to explore</span>
                </Badge>
              </div>
              
              {/* Marquee container - full width */}
              <div 
                className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
                style={{ 
                  maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <motion.div
                  className="flex gap-8 py-4"
                  animate={marqueeControls}
                  style={{ 
                    x: dragX,
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  key={activeTab}
                >
                  {duplicatedCurrentProjects.map((project, index) => (
                    <motion.div
                      key={`${project.id}-${index}`}
                      custom={index % currentProjects.length}
                      variants={cardItemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="flex-shrink-0 w-[calc(100%-1rem)] xs:w-[calc(100%-2rem)] sm:w-[calc(50%-2rem)] md:w-[calc(33.333%-2rem)] lg:w-[calc(33.333%-2rem)]"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Card className={`backdrop-blur-md border ${getBorderColor(project.color || 'red')} bg-gradient-to-br ${getBackgroundGradient(project.color || 'red')} transition-colors duration-300 h-full group overflow-hidden flex flex-col shadow-lg`}>
                        <CardHeader className="relative p-3 xs:p-4 sm:p-6">
                          <div className="absolute top-0 right-0 z-10">
                            <Badge className={`${getBadgeBackground(project.color || 'red')} rounded-br-none rounded-tl-none text-xs`}>{project.category}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2 xs:mb-3">
                            <div className={`p-1.5 xs:p-2 ${getBadgeBackground(project.color || 'red')} rounded-md`}>
                              <project.icon className={`h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 ${getTextColor(project.color || 'red')}`} />
                            </div>
                            <Badge variant="outline" className={`text-xs ${
                              project.status === "Live" 
                                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                                : project.status === "Beta" 
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            }`}>
                              {project.status}
                            </Badge>
                          </div>
                          <CardTitle className={`text-base xs:text-lg sm:text-xl mt-1 xs:mt-2 group-hover:${getTextColor(project.color || 'red')} transition-colors duration-300 text-white`}>{project.title}</CardTitle>
                          <CardDescription className="text-white/70 text-xs xs:text-sm sm:text-base line-clamp-2 xs:line-clamp-3">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow p-3 xs:p-4 sm:p-6 pt-0 xs:pt-0 sm:pt-0">
                          {/* Project Image Thumbnail */}
                          <div className="relative w-full mb-4 xs:mb-6 pt-[56.25%] rounded-lg overflow-hidden shadow-xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-red-500/30">
                            <Image 
                              src={project.imageUrl || getRandomProjectImage()} 
                              alt={project.title}
                              fill
                              className="object-cover object-center transform transition-all duration-500 group-hover:scale-110"
                              sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, (max-width: 1200px) 30vw, 25vw"
                              priority={index < 4}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            
                            {/* Video Play Button */}
                            {project.videoLink && (
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="transform transition-all duration-300 group-hover:scale-110">
                                  <div className="relative">
                                    <div className={`absolute inset-0 ${getBadgeBackground(project.color || 'red').split(' ')[0]} rounded-full blur-xl animate-pulse`}></div>
                                    <button 
                                      className={`relative p-2 xs:p-3 sm:p-4 rounded-full transition-all duration-300 bg-opacity-80 bg-black hover:bg-opacity-60 group-hover:shadow-lg`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        window.open(project.videoLink, '_blank');
                                      }}
                                    >
                                      <Youtube className={`h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 ${getTextColor(project.color || 'red')}`} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <ul className="space-y-1 xs:space-y-2 mt-2 hidden xs:block">
                            {project.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className={`w-4 h-4 xs:w-5 xs:h-5 mt-0.5 rounded-full flex items-center justify-center ${getBadgeBackground(project.color || 'red').split(' ')[0]}`}>
                                  <Check className={`h-2.5 w-2.5 xs:h-3 xs:w-3 ${getTextColor(project.color || 'red')}`} />
                                </div>
                                <span className="text-xs xs:text-sm text-white/70">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2 xs:pt-3 sm:pt-4 border-t border-white/10 mt-auto p-3 xs:p-4 sm:p-6">
                          <Button
                            size="sm"
                            variant="link"
                            className="text-white/70 hover:text-white p-0 text-xs xs:text-sm"
                            asChild
                          >
                            <Link href={project.href}>
                              Learn More
                              <ArrowRight className="ml-1 xs:ml-1.5 h-3 w-3 xs:h-4 xs:w-4" />
                            </Link>
                          </Button>
                          <div className="flex gap-1 xs:gap-2">
                            {project.externalLink && (
                              <Button
                                size="icon"
                                variant="outline"
                                className={`h-7 w-7 xs:h-8 xs:w-8 bg-white/5 ${getBorderColor(project.color || 'red').split(' ')[0]} hover:bg-white/10`}
                                asChild
                              >
                                <Link href={project.externalLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3 xs:h-3.5 xs:w-3.5 text-white/70" />
                                </Link>
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="outline"
                              className={`h-7 w-7 xs:h-8 xs:w-8 bg-white/5 ${getBorderColor(project.color || 'red').split(' ')[0]} hover:bg-white/10`}
                            >
                              <Star className={`h-3.5 w-3.5 ${getTextColor(project.color || 'red')}`} />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Scrollbar indicator */}
              <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-red-500/30 rounded-full"
                  animate={{ 
                    x: ['-100%', '0%'],
                    transition: {
                      duration: marqueeDuration,
                      repeat: Infinity,
                      ease: 'linear'
                    }
                  }}
                  style={{ 
                    originX: 0
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* Upcoming Projects Tab with Interactive Marquee */}
          <TabsContent value="upcoming">
            {duplicatedUpcomingProjects.length > 0 ? (
              <div className="relative space-y-4">
                {/* Updated Marquee controls - more compact */}
                <div className="flex justify-end mb-4 gap-3">
                  <Badge 
                    variant="outline" 
                    className="bg-white/5 border-white/10 text-xs cursor-pointer hover:bg-white/10 transition-all duration-300 px-3 py-1.5 rounded-full flex items-center gap-2"
                    onClick={() => isUpcomingPaused ? startUpcomingMarquee() : pauseUpcomingMarquee()}
                  >
                    {isUpcomingPaused ? (
                      <>
                        <Play className="h-3 w-3 text-green-500" fill="currentColor" />
                        <span className="text-white/60">Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="h-3 w-3 text-yellow-500" fill="currentColor" />
                        <span className="text-white/60">Pause</span>
                      </>
                    )}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="bg-white/5 border-white/10 text-xs text-white/60 px-3 py-1.5 rounded-full"
                  >
                    <span className="text-white/60">Drag to explore</span>
                  </Badge>
                </div>
                
                {/* Upcoming Projects Marquee - full width */}
                <div 
                  className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing" 
                  style={{ 
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <motion.div
                    className="flex gap-8 py-4"
                    animate={upcomingMarqueeControls}
                    style={{ 
                      x: upcomingDragX,
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragStart={handleUpcomingDragStart}
                    onDragEnd={handleUpcomingDragEnd}
                    key={activeTab}
                  >
                    {duplicatedUpcomingProjects.map((project, index) => (
                      <motion.div
                        key={`${project.id}-${index}`}
                        custom={index % upcomingProjects.length}
                        variants={upcomingCardItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-2rem)] md:w-[calc(33.333%-2rem)] lg:w-[calc(33.333%-2rem)]"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <Card className={`backdrop-blur-md border ${getBorderColor(project.color || 'blue')} bg-gradient-to-br ${getBackgroundGradient(project.color || 'blue')} transition-colors duration-300 h-full group overflow-hidden flex flex-col`}>
                          <CardHeader className="relative p-4 sm:p-6">
                            <div className="absolute top-0 right-0 z-10">
                              <Badge className={`${getBadgeBackground(project.color || 'blue')} rounded-br-none rounded-tl-none text-xs`}>{project.category}</Badge>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`p-2 ${getBadgeBackground(project.color || 'blue')} rounded-md`}>
                                <project.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${getTextColor(project.color || 'blue')}`} />
                              </div>
                              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">
                                {project.status} - {project.releaseDate}
                              </Badge>
                            </div>
                            <CardTitle className={`text-lg sm:text-xl mt-2 group-hover:${getTextColor(project.color || 'blue')} transition-colors duration-300`}>{project.title}</CardTitle>
                            <CardDescription className="text-white/70 text-sm sm:text-base">
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            {/* Progress bar */}
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-xs text-white/60">Development Progress</span>
                                <span className="text-xs font-medium text-white/80">{project.progress}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${getBadgeBackground(project.color || 'blue').split(' ')[0]}`}
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* Project visualization */}
                            <div className="relative w-full mb-6 pt-[56.25%] rounded-lg overflow-hidden shadow-xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-red-500/30">
                              <Image 
                                src={project.imageUrl || getRandomProjectImage()} 
                                alt={project.title}
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(project.color || 'blue')} bg-opacity-50`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="bg-black/40 p-4 rounded-xl backdrop-blur-md border border-white/10 transform transition-all duration-300 group-hover:scale-105">
                                      <div className="relative">
                                        <div className="relative">
                                          <div className="absolute inset-0 rounded-full blur-xl opacity-50 bg-gradient-to-r from-red-500/30 to-purple-500/30"></div>
                                          <div className="relative p-3">
                                            <project.icon className={`h-12 w-12 mx-auto mb-3 ${getTextColor(project.color || 'blue')}`} />
                                          </div>
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-2">{project.category}</h3>
                                        <p className="text-sm text-white/70">Coming soon</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 group-hover:bg-black/40">
                                <div className="transform transition-all duration-300 group-hover:scale-110">
                                  <div className="relative">
                                    <div className={`absolute inset-0 ${getBadgeBackground(project.color || 'blue').split(' ')[0]} rounded-full blur-xl animate-pulse`}></div>
                                    <div className="relative flex gap-2">
                                      {project.videoLink && (
                                        <button 
                                          className={`p-3 rounded-full transition-all duration-300 bg-opacity-80 bg-black hover:bg-opacity-60 group-hover:shadow-lg`}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            window.open(project.videoLink, '_blank');
                                          }}
                                        >
                                          <Youtube className={`h-6 w-6 ${getTextColor(project.color || 'blue')}`} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Features list */}
                            <ul className="space-y-2 mt-2">
                              {project.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className={`w-5 h-5 mt-0.5 rounded-full flex items-center justify-center ${getBadgeBackground(project.color || 'blue').split(' ')[0]}`}>
                                    <Check className={`h-3 w-3 ${getTextColor(project.color || 'blue')}`} />
                                  </div>
                                  <span className="text-sm text-white/70">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-4 border-t border-white/10 mt-auto">
                            <Button
                              size="sm"
                              variant="link"
                              className="text-white/70 hover:text-white p-0"
                              asChild
                            >
                              <Link href={project.href}>
                                Details
                                <ArrowRight className="ml-1.5 h-4 w-4" />
                              </Link>
                            </Button>
                            <div className="flex gap-2">
                              {project.demoLink && (
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className={`h-8 w-8 bg-white/5 ${getBorderColor(project.color || 'blue').split(' ')[0]} hover:bg-white/10`}
                                  asChild
                                >
                                  <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                    <Zap className={`h-3.5 w-3.5 ${getTextColor(project.color || 'yellow')}`} />
                                  </Link>
                                </Button>
                              )}
                              {project.repoLink && (
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className={`h-8 w-8 bg-white/5 ${getBorderColor(project.color || 'blue').split(' ')[0]} hover:bg-white/10`}
                                  asChild
                                >
                                  <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-3.5 w-3.5 text-white/70" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/70 py-12">No upcoming projects found for the selected filter.</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 