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
  Check
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
    id: "kaitools",
    title: "KAITOOLS",
    description: "Advanced AI-powered creativity tools designed to boost your creative projects",
    category: "AI Creative Tools",
    icon: Pen,
    href: "/projects/kaitools",
    features: ["AI Image Generation", "AI Conversation Generator", "AI Article Writer", "AI Code Generation"],
    status: "Live",
    externalLink: "https://www.kaitools.tech/",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "cryforecast",
    title: "CRYFORECAST",
    description: "Intelligent algorithm for cryptocurrency price prediction and market analysis",
    category: "Crypto Analysis",
    icon: BarChart,
    href: "/projects/cryforecast",
    features: ["Price Prediction", "Trend Analysis", "Market Intelligence", "Data Extraction & Analysis"],
    status: "Live",
    externalLink: "https://www.cryforecast.com/",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "disposal-tracker",
    title: "Production Disposal Tracker",
    description: "Comprehensive system for tracking and managing production waste and disposal logistics",
    category: "Resource Management",
    icon: Recycle,
    href: "/projects/disposal-tracker",
    features: ["Waste Tracking", "Disposal Analytics", "Compliance Reporting", "Efficiency Metrics"],
    status: "Beta",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    externalLink: "https://example.com/disposal-tracker"
  },
  {
    id: "restaurant-expenses",
    title: "Restaurant Expenses System",
    description: "Complete financial management solution designed specifically for restaurant operations",
    category: "Finance Management",
    icon: Pizza,
    href: "/projects/restaurant-expenses",
    features: ["Inventory Tracking", "Staff Cost Management", "Profit Analytics", "Supplier Management"],
    status: "Beta",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    externalLink: "https://example.com/restaurant-expenses"
  },
  {
    id: "contentforge",
    title: "ContentForge",
    description: "AI-powered content creation platform for digital marketers",
    category: "AI Content Generation",
    icon: Brain,
    href: "/projects/contentforge",
    features: ["One-Click Generation", "SEO Optimization", "Multi-Platform Support"],
    status: "Alpha Testing",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    externalLink: "https://example.com/contentforge"
  },
  {
    id: "blockchain-platform",
    title: "Blockchain Platform",
    description: "Enterprise-grade blockchain solution with DeFi and NFT capabilities",
    category: "Blockchain",
    icon: Database,
    href: "/solutions/blockchain",
    features: ["Smart Contracts", "Cross-Chain Support", "NFT Marketplace"],
    status: "Beta",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    externalLink: "https://example.com/blockchain-platform"
  },
  {
    id: "ai-analytics",
    title: "AI Analytics",
    description: "Advanced analytics platform powered by machine learning",
    category: "Data Analytics",
    icon: Code,
    href: "/solutions/genai",
    features: ["Real-time Processing", "Predictive Analytics", "Custom Dashboards"],
    status: "Live",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    externalLink: "https://example.com/ai-analytics"
  },
  {
    id: "mindscape-analytics",
    title: "Mindscape Analytics",
    description: "Transforming businesses with advanced AI solutions for enterprises",
    category: "Business Intelligence",
    icon: Brain,
    href: "/solutions/mindscape-analytics",
    features: ["Predictive Modeling", "Natural Language Processing", "Decision Intelligence", "Custom AI Solutions"],
    status: "Live",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    externalLink: "https://example.com/mindscape-analytics"
  },
  {
    id: "live-data-insights",
    title: "Live Data Insights",
    description: "Real-time data visualization and insights platform for business decision makers",
    category: "Data Visualization",
    icon: RefreshCw,
    href: "/solutions/live-data-insights",
    features: ["Real-time Dashboards", "Interactive Reports", "Data Integration", "Alerts & Notifications"],
    status: "Beta",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    externalLink: "https://example.com/live-data-insights"
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
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
]

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
  }, [startMarquee, marqueeControls])

  useEffect(() => {
    startUpcomingMarquee()
    return () => {
      upcomingMarqueeControls.stop()
    }
  }, [startUpcomingMarquee, upcomingMarqueeControls])

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
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-tr from-red-500/20 to-purple-500/10 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-bl from-red-500/10 to-blue-500/10 blur-[120px] animate-pulse-slow"></div>
      
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-red-500/20 text-red-400 hover:bg-red-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 button-hover">OUR PROJECTS</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Innovative Solutions <br />
            <span className="text-red-400">Built for the Future</span>
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Discover our cutting-edge projects and demos that showcase the power of AI and blockchain technology.
          </p>
        </div>

        <Tabs defaultValue="current" className="w-full max-w-7xl mx-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 max-w-[400px] mx-auto mb-12 bg-black/40 backdrop-blur-md border border-white/10">
            <TabsTrigger value="current" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70">
              Current Projects
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70">
              Upcoming Projects
            </TabsTrigger>
          </TabsList>

          {/* Current Projects Tab with Interactive Marquee */}
          <TabsContent value="current">
            <div className="relative space-y-4">
              {/* Marquee controls */}
              <div className="flex justify-center mb-3 gap-3">
                <Badge 
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-xs cursor-pointer hover:bg-white/10 transition-all duration-300 px-3 py-1 flex items-center gap-2"
                  onClick={() => isPaused ? startMarquee() : pauseMarquee()}
                >
                  {isPaused ? (
                    <>
                      <Play className="h-3 w-3 text-green-500" fill="currentColor" />
                      <span className="text-white/60">Resume auto-scroll</span>
                    </>
                  ) : (
                    <>
                      <Pause className="h-3 w-3 text-yellow-500" fill="currentColor" />
                      <span className="text-white/60">Pause auto-scroll</span>
                    </>
                  )}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-xs text-white/60 px-3 py-1"
                >
                  <span className="text-white/60">Drag to explore manually</span>
                </Badge>
              </div>
              
              {/* Marquee container */}
              <div 
                className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
              >
                <motion.div
                  className="flex gap-8 py-4"
                  animate={marqueeControls}
                  style={{ x: dragX }}
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
                      className="flex-shrink-0 w-[calc(100%/3-1.5rem)] md:w-[calc(100%/3-1.5rem)] lg:w-[calc(100%/3-1.5rem)]"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-500/50 transition-colors duration-300 h-full group overflow-hidden flex flex-col shadow-lg">
                        <CardHeader className="relative">
                          <div className="absolute top-0 right-0 z-10">
                            <Badge className="bg-red-500/20 text-red-400 rounded-br-none rounded-tl-none">{project.category}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-red-500/10 rounded-md">
                              <project.icon className="h-6 w-6 text-red-500" />
                            </div>
                            <Badge variant="outline" className={`${
                              project.status === "Live" 
                                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                                : project.status === "Beta" 
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}>
                              {project.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl mt-2 group-hover:text-red-400 transition-colors duration-300 text-white">{project.title}</CardTitle>
                          <CardDescription className="text-white/70">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          {project.videoLink && (
                            <div className="relative w-full mb-6 pt-[56.25%] rounded-lg overflow-hidden shadow-xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-red-500/30">
                              <div className="absolute inset-0 z-10 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 w-full h-full">
                                  <div className={`w-full h-full relative ${
                                    project.id === "kaitools" ? "bg-gradient-to-br from-blue-900 to-purple-900" :
                                    project.id === "cryforecast" ? "bg-gradient-to-br from-green-900 to-blue-900" :
                                    project.id === "disposal-tracker" ? "bg-gradient-to-br from-teal-900 to-green-900" :
                                    project.id === "restaurant-expenses" ? "bg-gradient-to-br from-orange-900 to-red-900" :
                                    project.id === "mindscape-analytics" ? "bg-gradient-to-br from-indigo-900 to-blue-900" :
                                    project.id === "live-data-insights" ? "bg-gradient-to-br from-purple-900 to-pink-900" :
                                    project.id === "contentforge" ? "bg-gradient-to-br from-cyan-900 to-blue-900" :
                                    project.id === "blockchain-platform" ? "bg-gradient-to-br from-blue-900 to-teal-900" :
                                    project.id === "ai-analytics" ? "bg-gradient-to-br from-violet-900 to-indigo-900" :
                                    "bg-gradient-to-br from-red-900 to-black"
                                  }`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="text-center">
                                        <div className="bg-black/40 p-4 rounded-xl backdrop-blur-md border border-white/10 transform transition-all duration-300 group-hover:scale-105">
                                          <div className="relative">
                                            <div className="relative">
                                              <div className="absolute inset-0 rounded-full blur-xl opacity-50 bg-gradient-to-r from-red-500/30 to-purple-500/30"></div>
                                              <div className="relative p-3">
                                                <project.icon className={`h-12 w-12 mx-auto mb-3 ${
                                                  project.id === "kaitools" ? "text-blue-400" :
                                                  project.id === "cryforecast" ? "text-green-400" :
                                                  project.id === "disposal-tracker" ? "text-teal-400" :
                                                  project.id === "restaurant-expenses" ? "text-orange-400" :
                                                  project.id === "mindscape-analytics" ? "text-indigo-400" :
                                                  project.id === "live-data-insights" ? "text-purple-400" :
                                                  project.id === "contentforge" ? "text-cyan-400" :
                                                  project.id === "blockchain-platform" ? "text-blue-400" :
                                                  project.id === "ai-analytics" ? "text-violet-400" :
                                                  "text-red-400"
                                                }`} />
                                              </div>
                                            </div>
                                            <h3 className="text-white font-bold text-lg mb-2">{project.category}</h3>
                                            <p className="text-sm text-white/70">Click to watch demo</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 group-hover:bg-black/40">
                                  <div className="transform transition-all duration-300 group-hover:scale-110">
                                    <div className="relative">
                                      <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
                                      <button 
                                        className="relative bg-red-600 hover:bg-red-700 p-4 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/20"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          window.open(project.videoLink, '_blank');
                                        }}
                                      >
                                        <Youtube className="h-8 w-8 text-white" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <ul className="space-y-2 mt-2">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-5 h-5 mt-0.5 rounded-full flex items-center justify-center bg-red-500/10">
                                  <Check className="h-3 w-3 text-red-400" />
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
                              Learn More
                              <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Link>
                          </Button>
                          <div className="flex gap-2">
                            {project.externalLink && (
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                asChild
                              >
                                <Link href={project.externalLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3.5 w-3.5 text-white/70" />
                                </Link>
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                            >
                              <Star className="h-3.5 w-3.5 text-red-400" />
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
                {/* Marquee controls */}
                <div className="flex justify-center mb-3 gap-3">
                  <Badge 
                    variant="outline" 
                    className="bg-white/5 border-white/10 text-xs cursor-pointer hover:bg-white/10 transition-all duration-300 px-3 py-1 flex items-center gap-2"
                    onClick={() => isUpcomingPaused ? startUpcomingMarquee() : pauseUpcomingMarquee()}
                  >
                    {isUpcomingPaused ? (
                      <>
                        <Play className="h-3 w-3 text-green-500" fill="currentColor" />
                        <span className="text-white/60">Resume auto-scroll</span>
                      </>
                    ) : (
                      <>
                        <Pause className="h-3 w-3 text-yellow-500" fill="currentColor" />
                        <span className="text-white/60">Pause auto-scroll</span>
                      </>
                    )}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="bg-white/5 border-white/10 text-xs text-white/60 px-3 py-1"
                  >
                    <span className="text-white/60">Drag to explore manually</span>
                  </Badge>
                </div>
                
                {/* Upcoming Projects Marquee */}
                <div 
                  className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing" 
                  style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
                >
                  <motion.div
                    className="flex gap-8 py-4"
                    animate={upcomingMarqueeControls}
                    style={{ x: upcomingDragX }}
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
                        className="flex-shrink-0 w-[calc(100%/3-1.5rem)] md:w-[calc(100%/3-1.5rem)] lg:w-[calc(100%/3-1.5rem)]"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-500/50 transition-colors duration-300 h-full group overflow-hidden flex flex-col shadow-lg">
                          <CardHeader className="relative pb-2">
                            <div className="absolute top-0 right-0 z-10">
                              <Badge className="bg-red-500/20 text-red-400 rounded-br-none rounded-tl-none">{project.category}</Badge>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="p-2 bg-red-500/10 rounded-md">
                                <project.icon className="h-6 w-6 text-red-500" />
                              </div>
                              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                                {project.status}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl mt-2 group-hover:text-red-400 transition-colors duration-300 text-white">{project.title}</CardTitle>
                            <CardDescription className="text-white/70">
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
                                  className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* Release date */}
                            <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
                              <Clock className="h-4 w-4 text-red-400" />
                              <span>Expected Release: {project.releaseDate}</span>
                            </div>

                            {/* Video Preview */}
                            {project.videoLink && (
                              <div className="relative w-full mb-6 pt-[56.25%] rounded-lg overflow-hidden shadow-xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-red-500/30">
                                <div className="absolute inset-0 z-10 rounded-lg overflow-hidden">
                                  <div className="absolute inset-0 w-full h-full">
                                    <div className={`w-full h-full relative ${
                                      project.id === "quantum-ml" ? "bg-gradient-to-br from-violet-900 to-indigo-900" :
                                      project.id === "decentraledge" ? "bg-gradient-to-br from-blue-900 to-cyan-900" :
                                      project.id === "neurocraft" ? "bg-gradient-to-br from-cyan-900 to-blue-900" :
                                      project.id === "neural-governance" ? "bg-gradient-to-br from-purple-900 to-pink-900" :
                                      "bg-gradient-to-br from-red-900 to-black"
                                    }`}>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                          <div className="bg-black/40 p-4 rounded-xl backdrop-blur-md border border-white/10 transform transition-all duration-300 group-hover:scale-105">
                                            <div className="relative">
                                              <div className="relative">
                                                <div className="absolute inset-0 rounded-full blur-xl opacity-50 bg-gradient-to-r from-red-500/30 to-purple-500/30"></div>
                                                <div className="relative p-3">
                                                  <project.icon className={`h-12 w-12 mx-auto mb-3 ${
                                                    project.id === "quantum-ml" ? "text-violet-400" :
                                                    project.id === "decentraledge" ? "text-blue-400" :
                                                    project.id === "neurocraft" ? "text-cyan-400" :
                                                    project.id === "neural-governance" ? "text-purple-400" :
                                                    "text-red-400"
                                                  }`} />
                                                </div>
                                              </div>
                                              <h3 className="text-white font-bold text-lg mb-2">{project.category}</h3>
                                              <p className="text-sm text-white/70">Preview coming soon</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 group-hover:bg-black/40">
                                    <div className="transform transition-all duration-300 group-hover:scale-110">
                                      <div className="relative">
                                        <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
                                        <button 
                                          className="relative bg-red-600 hover:bg-red-700 p-4 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/20"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            window.open(project.videoLink, '_blank');
                                          }}
                                        >
                                          <Youtube className="h-8 w-8 text-white" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Features list */}
                            <ul className="space-y-2 mt-2">
                              {project.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className="w-5 h-5 mt-0.5 rounded-full flex items-center justify-center bg-red-500/10">
                                    <Check className="h-3 w-3 text-red-400" />
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
                                  className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                  asChild
                                >
                                  <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                    <Zap className="h-3.5 w-3.5 text-yellow-400" />
                                  </Link>
                                </Button>
                              )}
                              {project.repoLink && (
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
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
        
        <div className="text-center mt-16">
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 