"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ImageIcon, 
  BarChart2, 
  PenTool, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Users, 
  Zap, 
  Brain, 
  LineChart,
  DollarSign,
  Target,
  Layers,
  Globe,
  Search,
  Filter,
  X,
  ShoppingCart,
  Car,
  Box,
  Database,
  Cpu,
  BarChart,
  TrendingUp,
  Youtube
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  status: "development" | "alpha" | "beta" | "completed"
  features: string[]
  techStack: string[]
  timeline: {
    start: string
    estimatedCompletion: string
    currentPhase: string
  }
  demo: {
    type: "video" | "interactive" | "screenshot"
    url: string
  }
  team: {
    size: number
    roles: string[]
  }
  metrics: {
    label: string
    value: string
  }[]
  imageUrl: string
  category: string
  websiteUrl?: string
  featured?: boolean
  order?: number
  client?: string
}

// Add this function before the projects array
const availableProjectImages = [
  "/images/projects/Automated Workflows.png",
  "/images/projects/Investment Insights.png",
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
  "/images/projects/AgriChian.jpg"
];

const getRandomProjectImage = () => {
  const randomIndex = Math.floor(Math.random() * availableProjectImages.length);
  return availableProjectImages[randomIndex];
};

const projects: Project[] = [
  {
    id: "1",
    title: "Mindscape Analytics",
    description: "A comprehensive data analytics platform designed for business intelligence. Provides intuitive data visualization, predictive analytics, and automated reporting to transform complex data into actionable insights for businesses of all sizes.",
    shortDescription: "Business intelligence with intuitive data visualization",
    status: "beta",
    features: [
      "Interactive dashboards",
      "Real-time data processing",
      "Predictive analytics",
      "Custom report generation",
      "Data integration hub",
      "Automated insights"
    ],
    techStack: [
      "React",
      "D3.js",
      "Python",
      "TensorFlow",
      "PostgreSQL",
      "AWS"
    ],
    timeline: {
      start: "January 2023",
      estimatedCompletion: "Q2 2024",
      currentPhase: "Beta Testing"
    },
    demo: {
      type: "interactive",
      url: "/demos/mindscape"
    },
    team: {
      size: 14,
      roles: ["Data Scientists", "Full-stack Developers", "UX Designers", "Business Analysts"]
    },
    metrics: [
      { label: "Processing Speed", value: "7x Faster" },
      { label: "Insight Accuracy", value: "96%" },
      { label: "Decision Time", value: "65% Reduction" }
    ],
    imageUrl: "/images/projects/mindscapeanalytics.png",
    category: "Data Analytics",
    websiteUrl: "https://mindscape.ai",
    featured: true,
    order: 1
  },
  {
    id: "2",
    title: "Advanced Image Annotation Tool",
    description: "A sophisticated image annotation platform built for AI training data preparation. Features intelligent auto-annotation, precision tools, and collaboration capabilities to streamline the process of creating high-quality training datasets for computer vision models.",
    shortDescription: "Precision tools for AI training data preparation",
    status: "alpha",
    features: [
      "AI-powered auto-annotation",
      "Multi-format annotation types",
      "Collaborative workflow",
      "Quality assurance tools",
      "Dataset management",
      "Cloud integration"
    ],
    techStack: [
      "WebGL",
      "React",
      "Node.js",
      "PyTorch",
      "MongoDB",
      "Docker"
    ],
    timeline: {
      start: "March 2024",
      estimatedCompletion: "Q4 2024",
      currentPhase: "Alpha Testing"
    },
    demo: {
      type: "video",
      url: "/demos/annotation-tool"
    },
    team: {
      size: 9,
      roles: ["Computer Vision Engineers", "Frontend Developers", "UX Specialists", "QA Engineers"]
    },
    metrics: [
      { label: "Annotation Speed", value: "4x Faster" },
      { label: "Accuracy", value: "98.5%" },
      { label: "Project Time", value: "50% Reduction" }
    ],
    imageUrl: "/images/projects/image_annotation_tool.png",
    category: "Computer Vision",
    websiteUrl: "https://annotation.ai",
    featured: true,
    order: 4
  },
  {
    id: "3",
    title: "CryptoTrader",
    description: "An advanced cryptocurrency trading platform with AI-driven market analysis and automated trading strategies. Provides real-time insights, customizable trading algorithms, and comprehensive portfolio management for crypto investors.",
    shortDescription: "AI-powered crypto trading and analysis",
    status: "beta",
    features: [
      "Automated trading strategies",
      "Real-time market analysis",
      "Risk management tools",
      "Portfolio optimization",
      "Multi-exchange integration",
      "Performance analytics"
    ],
    techStack: [
      "Python",
      "React",
      "Node.js",
      "TensorFlow",
      "MongoDB",
      "Redis"
    ],
    timeline: {
      start: "November 2023",
      estimatedCompletion: "Q3 2024",
      currentPhase: "Beta Testing"
    },
    demo: {
      type: "interactive",
      url: "/demos/cryptotrader"
    },
    team: {
      size: 11,
      roles: ["Quant Analysts", "Full-stack Developers", "Crypto Experts", "Security Engineers"]
    },
    metrics: [
      { label: "Trading Efficiency", value: "35% Higher" },
      { label: "Market Analysis", value: "Real-time" },
      { label: "Portfolio Growth", value: "28% Average" }
    ],
    imageUrl: "/images/projects/cryptotrader2.png",
    category: "Finance",
    websiteUrl: "https://cryptotrader.io",
    featured: true,
    order: 2
  },
  {
    id: "4",
    title: "AgriChan",
    description: "A revolutionary agricultural management platform that combines IoT sensors, satellite imagery, and AI to optimize farming operations. Provides real-time crop monitoring, predictive yield analysis, and automated resource management for sustainable agriculture.",
    shortDescription: "Smart farming with IoT and AI analytics",
    status: "development",
    features: [
      "Crop health monitoring",
      "Weather prediction",
      "Resource optimization",
      "Pest and disease detection",
      "Yield forecasting",
      "Sustainability metrics"
    ],
    techStack: [
      "Python",
      "React Native",
      "TensorFlow",
      "IoT Hardware",
      "AWS",
      "PostgreSQL"
    ],
    timeline: {
      start: "February 2024",
      estimatedCompletion: "Q1 2025",
      currentPhase: "Core Development"
    },
    demo: {
      type: "screenshot",
      url: "/demos/agrichan"
    },
    team: {
      size: 12,
      roles: ["Agricultural Scientists", "IoT Engineers", "ML Specialists", "Mobile Developers"]
    },
    metrics: [
      { label: "Crop Yield", value: "25% Increase" },
      { label: "Resource Usage", value: "40% Reduction" },
      { label: "Early Detection", value: "9 Days Earlier" }
    ],
    imageUrl: "/images/projects/AgriChian.jpg",
    category: "Agriculture",
    websiteUrl: "https://agrichan.tech",
    featured: true,
    order: 3
  },
  {
    id: "5",
    title: "Quantum Crypto Auto-managed Index Bot",
    description: "A cutting-edge financial tool that leverages quantum computing techniques to analyze cryptocurrency markets and manage indexed portfolios automatically. Features quantum-resistant security, adaptive market learning, and customizable risk profiles.",
    shortDescription: "Quantum-powered crypto index management",
    status: "alpha",
    features: [
      "Quantum-inspired algorithms",
      "Automated index rebalancing",
      "Market volatility prediction",
      "Risk-adjusted optimization",
      "Cross-chain integration",
      "Regulatory compliance tools"
    ],
    techStack: [
      "Python",
      "Qiskit",
      "React",
      "Node.js",
      "AWS",
      "Blockchain APIs"
    ],
    timeline: {
      start: "December 2023",
      estimatedCompletion: "Q4 2024",
      currentPhase: "Alpha Testing"
    },
    demo: {
      type: "interactive",
      url: "/demos/quantum-bot"
    },
    team: {
      size: 8,
      roles: ["Quantum Computing Experts", "Crypto Analysts", "Full-stack Developers", "Security Engineers"]
    },
    metrics: [
      { label: "Index Performance", value: "42% Above Market" },
      { label: "Volatility", value: "65% Reduction" },
      { label: "Response Time", value: "Milliseconds" }
    ],
    imageUrl: "/images/projects/Crypto_folio_App.png",
    category: "Finance",
    websiteUrl: "https://quantumcrypto.io",
    featured: true,
    order: 6
  },
  {
    id: "6",
    title: "ContentForge",
    description: "An AI-powered content creation platform for digital marketers that generates high-quality posts, articles, and marketing materials with just a few clicks. Leveraging advanced language models and marketing expertise to create engaging, SEO-optimized content.",
    shortDescription: "AI-powered content creation for digital marketers",
    status: "alpha",
    features: [
      "One-click content generation",
      "SEO optimization",
      "Multi-platform formatting",
      "Brand voice customization",
      "Content calendar integration",
      "Performance analytics"
    ],
    techStack: [
      "GPT-4",
      "Next.js",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "AWS"
    ],
    timeline: {
      start: "January 2024",
      estimatedCompletion: "Q3 2024",
      currentPhase: "Alpha Testing"
    },
    demo: {
      type: "interactive",
      url: "/demos/contentforge"
    },
    team: {
      size: 8,
      roles: ["AI Engineers", "Frontend Developers", "UX Designers", "Marketing Experts"]
    },
    metrics: [
      { label: "Content Generation Speed", value: "5x Faster" },
      { label: "Engagement Rate", value: "45% Higher" },
      { label: "Time Saved", value: "80% Reduction" }
    ],
    imageUrl: "/images/projects/our_web_designs.png",
    category: "Marketing",
    websiteUrl: "https://contentforge.ai"
  },
  {
    id: "7",
    title: "Amazon Inventory Management System",
    description: "A comprehensive solution for Amazon sellers to manage inventory, track sales, forecast demand, and optimize restocking. Features automated alerts, performance analytics, and integration with Amazon Seller Central.",
    shortDescription: "Complete inventory management for Amazon sellers",
    status: "completed",
    features: [
      "Real-time inventory tracking",
      "Sales analytics dashboard",
      "Demand forecasting",
      "Automated reorder alerts",
      "Profit margin optimization",
      "Multi-warehouse management"
    ],
    techStack: [
      "React",
      "Node.js",
      "AWS Lambda",
      "DynamoDB",
      "Amazon MWS API",
      "TensorFlow"
    ],
    timeline: {
      start: "May 2023",
      estimatedCompletion: "January 2024",
      currentPhase: "Completed"
    },
    demo: {
      type: "video",
      url: "https://youtu.be/JbIPyXUMYFY"
    },
    team: {
      size: 6,
      roles: ["Full-stack Developers", "E-commerce Specialists", "UX Designers", "API Integrators"]
    },
    metrics: [
      { label: "Inventory Accuracy", value: "99.8%" },
      { label: "Stockout Reduction", value: "78%" },
      { label: "Management Time", value: "85% Less" }
    ],
    imageUrl: "/images/projects/amazon_invontry_management_system.png",
    category: "E-commerce",
    websiteUrl: "https://amazinventory.io",
    featured: true,
    order: 5,
    client: "Multiple Amazon Sellers"
  },
  {
    id: "8",
    title: "Vehicle EU Market Analytics",
    description: "A sophisticated platform for analyzing the European vehicle market, tracking trends, predicting price movements, and identifying optimal buy/sell opportunities. Features comprehensive market data, competitor analysis, and customizable alerts.",
    shortDescription: "EU automotive market intelligence and analytics",
    status: "completed",
    features: [
      "Market trend analysis",
      "Price prediction AI",
      "Inventory optimization",
      "Cross-border opportunity finder",
      "Competitor tracking",
      "Customizable reporting"
    ],
    techStack: [
      "React",
      "Python",
      "TensorFlow",
      "PostgreSQL",
      "GraphQL",
      "AWS"
    ],
    timeline: {
      start: "February 2023",
      estimatedCompletion: "November 2023",
      currentPhase: "Completed"
    },
    demo: {
      type: "screenshot",
      url: "/demos/vehicle-eu-analytics"
    },
    team: {
      size: 9,
      roles: ["Data Scientists", "Automotive Experts", "Full-stack Developers", "UX Designers"]
    },
    metrics: [
      { label: "Profit Margin", value: "+23% Higher" },
      { label: "Market Prediction", value: "91% Accuracy" },
      { label: "Inventory Turnover", value: "2.5x Faster" }
    ],
    imageUrl: "/images/projects/vehicle_analysis_dashboard.png",
    category: "Automotive",
    websiteUrl: "https://euvehicle.market",
    featured: true,
    order: 8,
    client: "European Auto Consortium"
  },
  {
    id: "9",
    title: "JFBZ Token Exchange",
    description: "A secure and high-performance cryptocurrency exchange platform specialized in the JFBZ token ecosystem. Features fast transactions, multi-wallet integration, advanced security, and intuitive portfolio management.",
    shortDescription: "Specialized token exchange and management platform",
    status: "beta",
    features: [
      "High-speed trading engine",
      "Multi-wallet integration",
      "Advanced security protocols",
      "Portfolio analytics",
      "Token staking dashboard",
      "Mobile-responsive design"
    ],
    techStack: [
      "React",
      "Node.js",
      "Solidity",
      "Web3.js",
      "PostgreSQL",
      "Redis"
    ],
    timeline: {
      start: "August 2023",
      estimatedCompletion: "June 2024",
      currentPhase: "Beta Testing"
    },
    demo: {
      type: "interactive",
      url: "/demos/jfbz-exchange"
    },
    team: {
      size: 7,
      roles: ["Blockchain Developers", "Frontend Engineers", "Security Specialists", "UX Designers"]
    },
    metrics: [
      { label: "Transaction Speed", value: "0.5 Seconds" },
      { label: "Security Rating", value: "99.9%" },
      { label: "User Growth", value: "310% Monthly" }
    ],
    imageUrl: "/images/projects/jfbz_token.png",
    category: "Blockchain",
    websiteUrl: "https://jfbz.exchange",
    featured: true,
    order: 7
  },
  {
    id: "10",
    title: "KStock Analyzer",
    description: "An advanced stock market analysis tool that uses artificial intelligence to identify market patterns, predict trends, and provide actionable investment insights. Features technical analysis, sentiment tracking, and portfolio optimization.",
    shortDescription: "AI-powered stock market analysis and predictions",
    status: "beta",
    features: [
      "Real-time market analysis",
      "Pattern recognition",
      "Sentiment analysis",
      "Portfolio optimization",
      "Automated alerts",
      "Performance tracking"
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "React",
      "Node.js",
      "PostgreSQL",
      "AWS"
    ],
    timeline: {
      start: "October 2023",
      estimatedCompletion: "July 2024",
      currentPhase: "Beta Testing"
    },
    demo: {
      type: "interactive",
      url: "/demos/kstock"
    },
    team: {
      size: 8,
      roles: ["Data Scientists", "Full-stack Developers", "Financial Analysts", "UX Designers"]
    },
    metrics: [
      { label: "Prediction Accuracy", value: "89%" },
      { label: "Analysis Speed", value: "Real-time" },
      { label: "Portfolio Growth", value: "31% Average" }
    ],
    imageUrl: "/images/projects/KStock_Analyzer.png",
    category: "Finance",
    websiteUrl: "https://kstock.ai",
    featured: true,
    order: 7
  },
  {
    id: "11",
    title: "Investment Insights Platform",
    description: "A comprehensive investment analysis platform that combines market data, news sentiment, and technical analysis to provide actionable investment insights for both retail and institutional investors.",
    shortDescription: "Comprehensive investment analysis and insights",
    status: "completed",
    features: [
      "Market sentiment analysis",
      "Technical indicators",
      "Portfolio tracking",
      "Risk assessment",
      "News integration",
      "Custom alerts"
    ],
    techStack: [
      "React",
      "Python",
      "Node.js",
      "MongoDB",
      "AWS",
      "TensorFlow"
    ],
    timeline: {
      start: "March 2023",
      estimatedCompletion: "December 2023",
      currentPhase: "Completed"
    },
    demo: {
      type: "interactive",
      url: "/demos/investment-insights"
    },
    team: {
      size: 10,
      roles: ["Financial Analysts", "Data Scientists", "Full-stack Developers", "UX Designers"]
    },
    metrics: [
      { label: "User Returns", value: "+27% Average" },
      { label: "Analysis Accuracy", value: "92%" },
      { label: "Decision Time", value: "60% Faster" }
    ],
    imageUrl: "/images/projects/Investment_Insights.png",
    category: "Finance",
    websiteUrl: "https://investinsights.io",
    featured: true,
    order: 9
  },
  {
    id: "12",
    title: "Automated Trading Workflows",
    description: "An end-to-end automated trading system that combines multiple data sources, technical analysis, and machine learning to execute trades automatically. Features risk management, portfolio optimization, and real-time performance monitoring.",
    shortDescription: "End-to-end automated trading system",
    status: "beta",
    features: [
      "Automated trading strategies",
      "Risk management",
      "Portfolio optimization",
      "Real-time monitoring",
      "Performance analytics",
      "Multi-exchange support"
    ],
    techStack: [
      "Python",
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker"
    ],
    timeline: {
      start: "January 2024",
      estimatedCompletion: "August 2024",
      currentPhase: "Beta Testing"
    },
    demo: {
      type: "video",
      url: "/demos/automated-trading"
    },
    team: {
      size: 7,
      roles: ["Quant Developers", "Full-stack Engineers", "Trading Experts", "DevOps"]
    },
    metrics: [
      { label: "Trading Efficiency", value: "45% Higher" },
      { label: "Risk Management", value: "98% Success" },
      { label: "Return Rate", value: "32% Annual" }
    ],
    imageUrl: "/images/projects/Crypto_Tracker.png",
    category: "Finance",
    websiteUrl: "https://autotrader.tech",
    featured: true,
    order: 10
  },
  {
    id: "portfolio-tracker-realtime",
    title: "Real-time Portfolio Tracker",
    description: "A dynamic portfolio management system that provides real-time tracking of investments across multiple asset classes. Features include automated portfolio rebalancing, risk analysis, and performance visualization with customizable dashboards.",
    shortDescription: "Real-time tracking for investment portfolios",
    status: "completed",
    features: [
      "Real-time asset tracking",
      "Multi-asset class support",
      "Portfolio rebalancing",
      "Performance analytics",
      "Risk assessment",
      "Mobile synchronization"
    ],
    techStack: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Financial APIs",
      "D3.js"
    ],
    timeline: {
      start: "February 2023",
      estimatedCompletion: "November 2023",
      currentPhase: "Completed"
    },
    demo: {
      type: "video",
      url: "https://youtu.be/CcPag_gW78Y"
    },
    team: {
      size: 6,
      roles: ["Full-stack Developers", "Financial Analysts", "UX Designers", "API Specialists"]
    },
    metrics: [
      { label: "Update Speed", value: "Real-time" },
      { label: "Asset Coverage", value: "98%" },
      { label: "User Satisfaction", value: "4.8/5" }
    ],
    imageUrl: "/images/projects/Investment_Insights.png",
    category: "Finance",
    websiteUrl: "https://portfolio.mindscape.ai",
    featured: true,
    order: 7
  },
  {
    id: "real-estate-advanced",
    title: "Real Estate Advanced App",
    description: "A cutting-edge real estate platform combining AI-powered market analysis, virtual property tours, and predictive pricing models. Designed for agents, buyers, and sellers to make data-driven decisions with interactive visualizations, investment ROI calculators, and neighborhood analytics.",
    shortDescription: "AI-powered real estate platform with advanced analytics",
    status: "beta",
    features: [
      "Predictive pricing models",
      "Virtual property tours",
      "Investment ROI calculator",
      "Neighborhood analytics",
      "Market trend visualization",
      "Agent-client matching system"
    ],
    techStack: [
      "React",
      "Node.js",
      "TensorFlow",
      "PostgreSQL",
      "WebGL",
      "AWS"
    ],
    timeline: {
      start: "January 2024",
      estimatedCompletion: "Q3 2024",
      currentPhase: "Beta Testing"
    },
    demo: {
      type: "video",
      url: "https://youtu.be/cd75TIAM9X0"
    },
    team: {
      size: 10,
      roles: ["Data Scientists", "Real Estate Experts", "Full-stack Developers", "UX Designers"]
    },
    metrics: [
      { label: "Valuation Accuracy", value: "98.2%" },
      { label: "Time Savings", value: "70% Faster" },
      { label: "Sales Conversion", value: "45% Higher" }
    ],
    imageUrl: "/images/projects/real_estate_solutions.png",
    category: "Real Estate",
    websiteUrl: "https://realestate.mindscape.ai",
    featured: true,
    order: 6
  }
]

// Project Slideshow component for Hero section
function ProjectSlideshow({ projects, onSelectProject }: { projects: Project[], onSelectProject: (project: Project) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Auto-scroll slides, pause on hover
  useEffect(() => {
    if (isHovering) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [projects.length, isHovering]);

  // Calculate statistics for animation
  const stats = [
    { value: 250, label: "AI-Driven Projects", prefix: "+", suffix: "" },
    { value: 14, label: "Industries Transformed", prefix: "", suffix: "" },
    { value: 98, label: "Client Success Rate", prefix: "", suffix: "%" },
    { value: 3, label: "Average ROI", prefix: "", suffix: "x" }
  ];
  
  return (
    <section 
      className="relative overflow-hidden flex items-center min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] max-h-[900px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Simplified background image slider with single scroller */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSlide === index ? 0.4 : 0,
                scale: currentSlide === index ? 1 : 1.1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.imageUrl || getRandomProjectImage()})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/80"></div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-screen h-screen bg-gradient-to-br from-red-500/10 via-purple-500/5 to-transparent rounded-full filter blur-[120px]"
            animate={{ 
              x: [0, 20, 0], 
              y: [0, -20, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 z-2 opacity-10" 
          style={{ 
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, 
            backgroundSize: `30px 30px` 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-20 py-6 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <div className="space-y-3 md:space-y-4 lg:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="outline" className="mb-2 md:mb-4 bg-red-500/10 text-red-500 border-red-500/20 py-1 md:py-1.5 px-2 md:px-3 text-xs md:text-sm">
                  <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1 md:mr-1.5" />
                  Innovation Portfolio
                </Badge>
              </motion.div>
              
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Transforming Industries Through{" "}
                </span>
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-400">
                    AI Innovation
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  />
                </span>
              </motion.h1>
              
              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-4 md:mb-6 lg:mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover our pioneering AI projects that drive measurable impact 
                and deliver innovative solutions across multiple industries. From 
                concept to deployment, we're shaping the future of technology with 
                expertise and precision.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white border-0 py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base font-medium shadow-lg shadow-red-500/20 transition-all duration-300">
                <Zap className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                Schedule a Demo
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/5 py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base font-medium transition-all duration-300">
                <Globe className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                View Case Studies
              </Button>
            </motion.div>
            
            {/* Animated statistics section */}
            <motion.div 
              className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-10 pt-3 sm:pt-4 md:pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
                >
                  <div className="flex items-end">
                    <span className="text-white/80 text-sm sm:text-base md:text-xl">{stat.prefix}</span>
                    <motion.span 
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 + (i * 0.2) }}
                    >
                      <span>{stat.value}</span>
                    </motion.span>
                    <span className="text-white/80 text-sm sm:text-base md:text-xl">{stat.suffix}</span>
                  </div>
                  <span className="text-white/60 text-xs md:text-sm mt-0.5 sm:mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Enhanced project details */}
          <div className="mt-4 lg:mt-0">
            <AnimatePresence initial={false} mode="wait">
              {projects.map((project, index) => (
                currentSlide === index && (
                  <motion.div
                    key={project.id}
                    className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="bg-black/30 backdrop-blur-sm p-4 md:p-6 lg:p-8">
                      <div className="flex justify-between items-start mb-4 md:mb-6">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="p-2 md:p-3 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/10">
                            {index === 0 && <BarChart2 className="w-6 h-6 md:w-8 md:h-8 text-red-500" />}
                            {index === 1 && <ImageIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />}
                            {index === 2 && <LineChart className="w-6 h-6 md:w-8 md:h-8 text-green-500" />}
                            {index === 3 && <Layers className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />}
                            {index === 4 && <Brain className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />}
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
                            <div className="flex items-center gap-2 text-xs md:text-sm text-white/60 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                {project.timeline.currentPhase}
                              </span>
                              <span>•</span>
                              <span>{project.category}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Badge 
                          variant="outline" 
                          className={`text-xs md:text-sm ${
                            project.status === "development" ? "bg-blue-500/10 text-blue-400 border-blue-500/30" :
                            project.status === "alpha" ? "bg-purple-500/10 text-purple-400 border-purple-500/30" :
                            project.status === "beta" ? "bg-green-500/10 text-green-400 border-green-500/30" :
                            "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <p className="text-white/80 mb-6 md:mb-8 text-base md:text-lg">{project.shortDescription}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                            <div className="text-xs md:text-sm text-white/60">{metric.label}</div>
                            <div className="text-lg md:text-xl font-medium text-red-400">{metric.value}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                        <div>
                          <h4 className="text-white/80 font-medium mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                            <Zap className="h-3.5 w-3.5 md:h-4 md:w-4 text-red-400" /> 
                            Key Features
                          </h4>
                          <ul className="space-y-1 md:space-y-2">
                            {project.features.slice(0, 4).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="rounded-full bg-red-500/10 p-1 mt-0.5">
                                  <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                </div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-white/80 font-medium mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                            <Cpu className="h-3.5 w-3.5 md:h-4 md:w-4 text-red-400" /> 
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.slice(0, 3).map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="bg-black/20 text-white/60 border-white/10">
                                {tech}
                              </Badge>
                            ))}
                            {project.techStack.length > 3 && (
                              <Badge variant="outline" className="bg-black/20 text-white/60 border-white/10">
                                +{project.techStack.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-white/70" />
                          <span className="text-white/80">{project.team.size} Specialists</span>
                        </div>
                        <div className="flex gap-3">
                          <Button 
                            onClick={() => onSelectProject(project)}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          {project.demo && project.demo.url && project.demo.url.includes("youtu") && (
                            <Button
                              variant="outline"
                              className="px-3 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 transition-colors duration-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.demo.url, '_blank');
                              }}
                              title="Watch on YouTube"
                            >
                              <Youtube className="h-4 w-4" />
                            </Button>
                          )}
                          {project.websiteUrl && (
                            <Button
                              variant="outline"
                              className="px-3 border-white/10 hover:bg-white/5"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.websiteUrl, '_blank');
                              }}
                            >
                              <Globe className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-red-500 scale-110" : "bg-white/30 hover:bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  
  // Get all unique categories
  const categories = ["All", ...Array.from(new Set(projects.map(project => project.category)))]
  
  // Featured projects for the hero slider
  const featuredProjects = projects.filter(project => project.featured).sort((a, b) => (a.order || 0) - (b.order || 0));
  
  // Filter projects based on search query and category
  useEffect(() => {
    let result = projects;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.techStack.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(project => project.category === selectedCategory);
    }
    
    setFilteredProjects(result);
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      {/* Hero Section with Auto-Slider */}
      <div className="pt-16 md:pt-0"> {/* Add padding top for mobile to avoid navbar overlap */}
        <ProjectSlideshow projects={featuredProjects} onSelectProject={setSelectedProject} />
      </div>

      {/* Search and Filter Section */}
      <section className="pt-12 md:pt-20 pb-4">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 md:mb-10">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10 bg-black/40 border-white/10 focus:border-red-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Category Filter */}
            <Tabs 
              defaultValue="All" 
              className="w-full md:w-auto overflow-x-auto scrollbar-hide"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:flex bg-black/40 border border-white/10 p-1 min-w-max">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="whitespace-nowrap data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 px-3 py-1.5 text-xs sm:text-sm"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          {/* Results count */}
          <div className="flex items-center gap-2 mb-4 md:mb-6 text-white/60 text-sm md:text-base">
            <Filter className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span>Showing {filteredProjects.length} of {projects.length} projects</span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-4 md:py-8 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Card 
                    className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group h-full hover:border-red-500/50 transition-colors duration-300"
                    onClick={() => setSelectedProject(project)}
                  >
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Project Image */}
                      <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-gradient-to-r from-black to-gray-900">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${project.imageUrl || getRandomProjectImage()})` }}
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="absolute top-0 right-0 p-3">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              project.status === "development" ? "bg-blue-500/10 text-blue-500" :
                              project.status === "alpha" ? "bg-purple-500/10 text-purple-500" :
                              "bg-green-500/10 text-green-500"
                            }`}
                          >
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4 sm:p-6 flex-grow flex flex-col">
                        <div className="mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                            {project.id === "1" && <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />}
                            {project.id === "2" && <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
                            {project.id === "3" && <LineChart className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />}
                            {project.id === "4" && <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />}
                            {project.id === "5" && <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
                            <h3 className="text-lg sm:text-xl font-bold group-hover:text-red-500 transition-colors">
                              {project.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
                            <span>{project.timeline.currentPhase}</span>
                            <span>•</span>
                            <span>{project.category}</span>
                          </div>
                        </div>
                        
                        <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base line-clamp-3">{project.shortDescription}</p>

                        <div className="mt-auto">
                          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                            {project.metrics.slice(0, 2).map((metric, index) => (
                              <div key={index} className="bg-black/30 p-2 rounded-lg">
                                <div className="text-xs text-white/60">{metric.label}</div>
                                <div className="text-sm sm:text-base font-bold text-red-500">{metric.value}</div>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                            {project.techStack.slice(0, 3).map((tech, index) => (
                              <Badge key={index} variant="outline" className="bg-black/20 text-white/60 border-white/10 text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.techStack.length > 3 && (
                              <Badge variant="outline" className="bg-black/20 text-white/60 border-white/10 text-xs">
                                +{project.techStack.length - 3}
                              </Badge>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              className="flex-1 justify-center text-red-500 hover:text-red-400 hover:bg-white/5 group text-xs sm:text-sm py-1 sm:py-2"
                            >
                              Learn More
                              <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                            
                            {project.demo && project.demo.url && project.demo.url.includes("youtu") && (
                              <Button
                                variant="outline"
                                className="px-2 sm:px-3 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 transition-colors duration-300"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.demo.url, '_blank');
                                }}
                                title="Watch on YouTube"
                              >
                                <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            )}
                            
                            {project.websiteUrl && (
                              <Button
                                variant="outline"
                                className="px-2 sm:px-3 border-white/10 hover:bg-white/5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.websiteUrl, '_blank');
                                }}
                              >
                                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20">
              <div className="mb-4 text-white/40">
                <Search className="h-8 w-8 md:h-12 md:w-12 mx-auto" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">No matching projects found</h3>
              <p className="text-white/60 mb-4 md:mb-6 text-sm md:text-base">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 border border-white/10 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide"
          >
            <div className="relative h-48 sm:h-64 w-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedProject.imageUrl || getRandomProjectImage()})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                <Badge 
                  variant="outline" 
                  className={`mb-2 sm:mb-3 text-xs sm:text-sm ${
                    selectedProject.status === "development" ? "bg-blue-500/10 text-blue-500" :
                    selectedProject.status === "alpha" ? "bg-purple-500/10 text-purple-500" :
                    "bg-green-500/10 text-green-500"
                  }`}
                >
                  {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                </Badge>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{selectedProject.title}</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white bg-black/40 hover:bg-black/60 rounded-full"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <p className="text-sm sm:text-base text-white/70">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    Features
                  </h3>
                  <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-red-500/10 p-1 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    Project Timeline
                  </h3>
                  <div className="space-y-2 sm:space-y-4 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-black/20 text-white/80 border-white/10 text-xs">Started</Badge>
                      <span>{selectedProject.timeline.start}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-black/20 text-white/80 border-white/10 text-xs">Current Phase</Badge>
                      <span>{selectedProject.timeline.currentPhase}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-black/20 text-white/80 border-white/10 text-xs">Estimated Completion</Badge>
                      <span>{selectedProject.timeline.estimatedCompletion}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    Team
                  </h3>
                  <div className="text-sm sm:text-base">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-xs">{selectedProject.team.size} Specialists</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.team.roles.map((role, index) => (
                        <Badge key={index} variant="outline" className="bg-black/20 text-white/60 border-white/10 text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {selectedProject.metrics.map((metric, index) => (
                    <div key={index} className="bg-black/30 p-3 sm:p-4 rounded-lg border border-white/5">
                      <div className="text-xs sm:text-sm text-white/60 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-red-500">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-black/20 text-white/60 border-white/10 py-1 px-2 sm:px-3 text-xs sm:text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedProject(null)} 
                  className="order-2 sm:order-1 text-sm py-1.5 h-auto sm:py-2"
                >
                  Close
                </Button>
                {selectedProject.demo && selectedProject.demo.url && selectedProject.demo.url.includes("youtu") && (
                  <Button 
                    className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white order-1 sm:order-2 shadow-lg shadow-red-500/20 transition-all duration-300 text-sm py-1.5 h-auto sm:py-2"
                    onClick={() => window.open(selectedProject.demo.url, '_blank')}
                  >
                    <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />
                    Watch on YouTube
                  </Button>
                )}
                {selectedProject.websiteUrl && (
                  <Button 
                    className="flex items-center gap-2 bg-white text-black hover:bg-white/90 order-3 sm:order-3 text-sm py-1.5 h-auto sm:py-2"
                    onClick={() => window.open(selectedProject.websiteUrl, '_blank')}
                  >
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                    Visit Website
                  </Button>
                )}
                <Button className="bg-red-500 hover:bg-red-600 order-1 sm:order-4 text-sm py-1.5 h-auto sm:py-2">
                  Request a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
} 