"use client"

import React, { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import {
  Brain,
  Database,
  Cloud,
  Shield,
  Code,
  BarChart2,
  Layers,
  TabletSmartphone,
  Search,
  Star,
  Link,
  CheckCircle,
  Filter,
  ArrowRight,
  Play,
  Pause,
  FileText,
  Zap,
  ArrowUp,
  X,
  CheckSquare
} from "lucide-react"
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

// Define types
type TechCategory = {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  badges: TechBadge[]
  colorClass: string
  caseStudy?: TechCaseStudy
}

type TechBadge = {
  name: string
  description: string
  score?: number
  expertise?: "beginner" | "intermediate" | "advanced"
  link?: string
  yearAdopted?: number
  businessImpact?: "high" | "medium" | "low"
  clients?: number
  projectsDelivered?: number
}

// New type for case studies to attract clients with real examples
type TechCaseStudy = {
  clientName?: string
  industry: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  testimonial?: {
    quote: string
    author?: string
    role?: string
  }
}

// New type for tech comparison data
type ComparisonMetric = {
  name: string
  description: string
  unit?: string
}

interface TechStackShowcaseProps {
  fullWidth?: boolean;
  showCaseStudies?: boolean;
  enableComparison?: boolean;
}

// Tech stack data
const techStackCategories: TechCategory[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: <Brain className="h-6 w-6" />,
    description: "State-of-the-art machine learning frameworks and libraries for advanced AI capabilities that drive business value and innovation.",
    colorClass: "text-red-500 bg-red-500/20 border-red-500/30",
    badges: [
      { 
        name: "TensorFlow", 
        description: "Open-source library for machine learning and artificial intelligence", 
        score: 95, 
        expertise: "advanced", 
        link: "https://www.tensorflow.org",
        yearAdopted: 2018,
        businessImpact: "high",
        clients: 37,
        projectsDelivered: 84
      },
      { 
        name: "PyTorch", 
        description: "Open-source ML framework known for its flexibility and dynamic computation", 
        score: 90, 
        expertise: "advanced", 
        link: "https://pytorch.org",
        yearAdopted: 2019,
        businessImpact: "high",
        clients: 42,
        projectsDelivered: 76
      },
      { 
        name: "Scikit-learn", 
        description: "Machine learning library for classical ML algorithms and data preprocessing", 
        score: 85, 
        expertise: "intermediate", 
        link: "https://scikit-learn.org",
        yearAdopted: 2016,
        businessImpact: "medium",
        clients: 65,
        projectsDelivered: 120
      },
      { 
        name: "Hugging Face", 
        description: "NLP library with pre-trained transformer models for text processing", 
        score: 88, 
        expertise: "intermediate", 
        link: "https://huggingface.co",
        yearAdopted: 2020,
        businessImpact: "high",
        clients: 28,
        projectsDelivered: 52
      },
      { 
        name: "ONNX Runtime", 
        description: "Cross-platform inference engine for ML models deployment", 
        score: 82, 
        expertise: "intermediate", 
        link: "https://onnxruntime.ai",
        yearAdopted: 2021,
        businessImpact: "medium",
        clients: 18,
        projectsDelivered: 34
      }
    ],
    caseStudy: {
      clientName: "Global Financial Institution",
      industry: "Banking & Finance",
      challenge: "Needed to improve fraud detection while reducing false positives that were causing customer friction",
      solution: "Developed a custom ML model with TensorFlow and PyTorch to identify complex fraud patterns across millions of daily transactions",
      results: [
        "Increased fraud detection by 63%",
        "Reduced false positives by 42%",
        "Saved approximately $15M in fraud losses annually",
        "Improved customer satisfaction by 28%"
      ],
      technologies: ["TensorFlow", "PyTorch", "AWS SageMaker", "Apache Kafka"],
      testimonial: {
        quote: "The ML solution developed by the team has been transformative for our fraud prevention efforts, delivering immediate ROI while improving our customer experience.",
        author: "Sarah Johnson",
        role: "Chief Security Officer"
      }
    }
  },
  {
    id: "data",
    title: "Data Processing",
    icon: <Database className="h-6 w-6" />,
    description: "Robust data processing frameworks for handling massive datasets with speed and reliability.",
    colorClass: "text-blue-500 bg-blue-500/20 border-blue-500/30",
    badges: [
      { name: "Apache Spark", description: "Distributed computing system for big data processing and analytics", score: 92, expertise: "advanced", link: "https://spark.apache.org" },
      { name: "Kafka", description: "Distributed event streaming platform for high-throughput data pipelines", score: 90, expertise: "advanced", link: "https://kafka.apache.org" },
      { name: "PostgreSQL", description: "Advanced open-source relational database with robust features", score: 95, expertise: "advanced", link: "https://www.postgresql.org" },
      { name: "Redis", description: "In-memory data structure store used as database, cache, and message broker", score: 88, expertise: "intermediate", link: "https://redis.io" },
      { name: "MongoDB", description: "Document-oriented NoSQL database for flexible data models", score: 85, expertise: "intermediate", link: "https://www.mongodb.com" }
    ]
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    icon: <Cloud className="h-6 w-6" />,
    description: "Enterprise-grade cloud infrastructure for scalable and reliable deployments.",
    colorClass: "text-green-500 bg-green-500/20 border-green-500/30",
    badges: [
      { name: "AWS", description: "Comprehensive cloud platform for compute, storage, and ML services", score: 95, expertise: "advanced", link: "https://aws.amazon.com" },
      { name: "Kubernetes", description: "Container orchestration system for automated application deployment", score: 90, expertise: "advanced", link: "https://kubernetes.io" },
      { name: "Docker", description: "Containerization platform for consistent development environments", score: 92, expertise: "advanced", link: "https://www.docker.com" },
      { name: "Terraform", description: "Infrastructure as code tool for provisioning cloud resources", score: 88, expertise: "intermediate", link: "https://www.terraform.io" },
      { name: "Prometheus", description: "Monitoring and alerting toolkit for containerized environments", score: 85, expertise: "intermediate", link: "https://prometheus.io" }
    ]
  },
  {
    id: "security",
    title: "Security & Compliance",
    icon: <Shield className="h-6 w-6" />,
    description: "Comprehensive security protocols and compliance frameworks for enterprise-grade protection.",
    colorClass: "text-purple-500 bg-purple-500/20 border-purple-500/30",
    badges: [
      { name: "OAuth 2.0", description: "Industry-standard protocol for authorization and access delegation", score: 95, expertise: "advanced", link: "https://oauth.net/2/" },
      { name: "Vault", description: "Tool for managing secrets and protecting sensitive data", score: 90, expertise: "advanced", link: "https://www.vaultproject.io/" },
      { name: "JWT", description: "JSON Web Tokens for secure information transmission between parties", score: 92, expertise: "advanced", link: "https://jwt.io/" },
      { name: "OWASP", description: "Security standards and tools to prevent common vulnerabilities", score: 88, expertise: "intermediate", link: "https://owasp.org/" },
      { name: "SOC2", description: "Compliance framework for data security and privacy protection", score: 85, expertise: "intermediate", link: "https://www.aicpa.org/soc" }
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Development",
    icon: <TabletSmartphone className="h-6 w-6" />,
    description: "Modern tools and frameworks for creating beautiful, responsive, and user-friendly interfaces.",
    colorClass: "text-amber-500 bg-amber-500/20 border-amber-500/30",
    badges: [
      { name: "React", description: "JavaScript library for building user interfaces and single-page applications", score: 95, expertise: "advanced", link: "https://reactjs.org/" },
      { name: "Figma", description: "Collaborative interface design tool for prototyping and design systems", score: 90, expertise: "advanced", link: "https://www.figma.com/" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development", score: 92, expertise: "advanced", link: "https://tailwindcss.com/" },
      { name: "Framer Motion", description: "Production-ready motion library for React applications", score: 88, expertise: "intermediate", link: "https://www.framer.com/motion/" },
      { name: "Storybook", description: "Development environment for UI components with isolation testing", score: 85, expertise: "intermediate", link: "https://storybook.js.org/" }
    ]
  },
  {
    id: "api",
    title: "APIs & Integration",
    icon: <Code className="h-6 w-6" />,
    description: "Flexible API frameworks for seamless integration and interoperability.",
    colorClass: "text-indigo-500 bg-indigo-500/20 border-indigo-500/30",
    badges: [
      { name: "GraphQL", description: "Query language for APIs with efficient data loading capabilities", score: 95, expertise: "advanced", link: "https://graphql.org/" },
      { name: "REST", description: "Architectural style for distributed systems and web services", score: 90, expertise: "advanced", link: "https://restfulapi.net/" },
      { name: "gRPC", description: "High-performance RPC framework for service communication", score: 92, expertise: "advanced", link: "https://grpc.io/" },
      { name: "Swagger", description: "API documentation and design tools for standardization", score: 88, expertise: "intermediate", link: "https://swagger.io/" },
      { name: "Webhooks", description: "HTTP callbacks for real-time notifications and events", score: 85, expertise: "intermediate", link: "https://webhook.site/" }
    ]
  },
  {
    id: "analytics",
    title: "Analytics & Visualization",
    icon: <BarChart2 className="h-6 w-6" />,
    description: "Powerful analytics tools for deriving insights and creating impactful visualizations.",
    colorClass: "text-pink-500 bg-pink-500/20 border-pink-500/30",
    badges: [
      { name: "ElasticSearch", description: "Distributed search and analytics engine for data exploration", score: 95, expertise: "advanced", link: "https://www.elastic.co/" },
      { name: "Kibana", description: "Visualization and exploration tool for log and time-series data", score: 90, expertise: "advanced", link: "https://www.elastic.co/kibana/" },
      { name: "Looker", description: "BI and analytics platform for business data modeling and analysis", score: 92, expertise: "advanced", link: "https://looker.com/" },
      { name: "D3.js", description: "JavaScript library for creating dynamic, interactive data visualizations", score: 88, expertise: "intermediate", link: "https://d3js.org/" },
      { name: "Tableau", description: "Visual analytics platform for business intelligence dashboards", score: 85, expertise: "intermediate", link: "https://www.tableau.com/" }
    ]
  },
  {
    id: "web-dev",
    title: "Web Development",
    icon: <Layers className="h-6 w-6" />,
    description: "Modern web development stack for building scalable and performant applications.",
    colorClass: "text-cyan-500 bg-cyan-500/20 border-cyan-500/30",
    badges: [
      { name: "Next.js", description: "React framework for production-grade applications with SSR and static generation", score: 95, expertise: "advanced", link: "https://nextjs.org" },
      { name: "TypeScript", description: "Typed superset of JavaScript for building robust applications", score: 92, expertise: "advanced", link: "https://www.typescriptlang.org" },
      { name: "Node.js", description: "JavaScript runtime for building scalable server-side applications", score: 90, expertise: "advanced", link: "https://nodejs.org" },
      { name: "Prisma", description: "Next-generation ORM for Node.js and TypeScript", score: 88, expertise: "intermediate", link: "https://www.prisma.io" },
      { name: "tRPC", description: "End-to-end typesafe APIs for full-stack applications", score: 85, expertise: "advanced", link: "https://trpc.io" }
    ]
  }
]

// Main component
export default function TechStackShowcase({ fullWidth = true, showCaseStudies = true, enableComparison = true }: TechStackShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedBadges, setSelectedBadges] = useState<TechBadge[]>([])
  const [viewMode, setViewMode] = useState<"card" | "grid" | "list">("card")
  const [expertiseFilter, setExpertiseFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")
  const [activeCaseStudy, setActiveCaseStudy] = useState<{category: TechCategory, isOpen: boolean}>({
    category: techStackCategories[0],
    isOpen: false
  })
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const controls = useAnimation()

  // Filter categories based on search query
  const filteredCategories = techStackCategories.filter(category => {
    const matchesSearch = 
      searchQuery === "" || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.badges.some(badge => 
        badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        badge.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    
    const matchesCategory = 
      activeCategory === "all" || 
      category.id === activeCategory
    
    return matchesSearch && matchesCategory
  })

  // Create doubled array for seamless looping
  const loopedCategories = [...filteredCategories, ...filteredCategories]

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, staggerChildren: 0.1 }
      })
    }
  }, [isInView, controls])

  // Handle scrolling speed based on viewport width and number of items
  useEffect(() => {
    const updateScrollSpeed = () => {
      if (carouselRef.current) {
        // Adjust animation duration based on screen size and number of items
        const width = window.innerWidth
        const itemCount = filteredCategories.length
        let duration = Math.max(30, itemCount * 6) // Base duration on number of items
        
        if (width < 640) duration = Math.max(30, itemCount * 5)  
        else if (width < 1024) duration = Math.max(30, itemCount * 6)
        else if (width > 1280) duration = Math.max(30, itemCount * 7)
        
        carouselRef.current.style.animationDuration = `${duration}s`
        
        // Reset animation to ensure it starts fresh with the new filter
        carouselRef.current.style.animationName = 'none'
        // Force reflow
        void carouselRef.current.offsetWidth
        carouselRef.current.style.animationName = 'carouselScroll'
      }
    }
    
    updateScrollSpeed()
    window.addEventListener('resize', updateScrollSpeed)
    return () => window.removeEventListener('resize', updateScrollSpeed)
  }, [filteredCategories.length])

  // Handle touch events for mobile devices
  useEffect(() => {
    const handleTouchStart = () => {
      if (carouselRef.current) {
        carouselRef.current.style.animationPlayState = 'paused'
      }
    }
    
    const handleTouchEnd = () => {
      if (carouselRef.current) {
        // Small delay before resuming animation
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.style.animationPlayState = 'running'
          }
        }, 500)
      }
    }
    
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('touchstart', handleTouchStart, { passive: true })
      carousel.addEventListener('touchend', handleTouchEnd, { passive: true })
      
      return () => {
        carousel.removeEventListener('touchstart', handleTouchStart)
        carousel.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [])

  // Detect if user has reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const handleMotionPreferenceChange = () => {
      if (mediaQuery.matches && carouselRef.current) {
        // Stop animation for users who prefer reduced motion
        carouselRef.current.style.animationPlayState = 'paused'
      }
    }
    
    handleMotionPreferenceChange() // Check initial state
    mediaQuery.addEventListener('change', handleMotionPreferenceChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange)
    }
  }, [])

  // Fix for when component loses focus/visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && carouselRef.current) {
        carouselRef.current.style.animationPlayState = 'paused'
      } else if (!document.hidden && carouselRef.current) {
        carouselRef.current.style.animationPlayState = 'running'
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Update the handleMouseEnter function
  const handleMouseEnter = () => {
    if (carouselRef.current) {
      carouselRef.current.style.animationPlayState = 'paused'
    }
  }
  
  // Update the handleMouseLeave function
  const handleMouseLeave = () => {
    if (carouselRef.current) {
      carouselRef.current.style.animationPlayState = 'running'
    }
  }

  // Handle case study display
  const handleCaseStudyClick = (categoryId: string) => {
    const category = techStackCategories.find(cat => cat.id === categoryId)
    if (category && category.caseStudy) {
      setActiveCaseStudy({
        category,
        isOpen: true
      })
    }
  }

  const toggleBadgeSelection = (badge: TechBadge) => {
    if (selectedBadges.some(b => b.name === badge.name)) {
      setSelectedBadges(selectedBadges.filter(b => b.name !== badge.name))
    } else {
      // Limit to 3 badges for comparison
      if (selectedBadges.length < 3) {
        setSelectedBadges([...selectedBadges, badge])
      }
    }
  }

  // Reset comparison selections
  const resetComparison = () => {
    setSelectedBadges([])
  }

  return (
    <section 
      ref={containerRef} 
      className="w-full py-12 md:py-24 relative overflow-hidden bg-black"
    >
      {/* Enhanced Background Effects with Dynamic Parallax */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-red-500/10 blur-[100px] animate-float-slow"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px] animate-float-medium"></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-green-500/10 blur-[80px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-purple-500/10 blur-[90px] animate-float-reverse"></div>

      <div className="w-full relative z-10">
        {/* Main Heading - Enhanced */}
        <motion.div 
          className="text-center mb-10 md:mb-14 px-4 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          <Badge className="mb-3 bg-gradient-to-r from-red-900/30 to-red-900/10 text-red-400 border-red-900/30 hover:bg-white/10 backdrop-blur-sm">
            ENTERPRISE TECHNOLOGY STACK
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Cutting-Edge <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 animate-gradient-x">Technology Stack</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
            Our enterprise-grade technology ecosystem is built for performance, security, and scalability.
          </p>
        </motion.div>
                
        {/* Improved Filters Section */}
        <motion.div 
          className="mb-8 md:mb-12 max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input 
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/40 border-white/10 text-white placeholder:text-white/50 h-10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30"
              />
            </div>

            <div className="w-full sm:w-auto overflow-x-auto scrollbar-hide">
              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                <TabsList className="bg-black/40 border border-white/10 h-10 flex flex-nowrap min-w-[480px] sm:min-w-0 gap-0.5 overflow-x-auto scrollbar-hide">
                  <TabsTrigger value="all" className="data-[state=active]:bg-white/10 data-[state=active]:text-white px-3 text-xs h-full whitespace-nowrap">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="ai-ml" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 px-3 text-xs h-full whitespace-nowrap">
                    AI/ML
                  </TabsTrigger>
                  <TabsTrigger value="data" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 px-3 text-xs h-full whitespace-nowrap">
                    Data
                  </TabsTrigger>
                  <TabsTrigger value="cloud" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 px-3 text-xs h-full whitespace-nowrap">
                    Cloud
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 px-3 text-xs h-full whitespace-nowrap">
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="ui-ux" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 px-3 text-xs h-full whitespace-nowrap">
                    UI/UX
                  </TabsTrigger>
                  <TabsTrigger value="api" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-400 px-3 text-xs h-full whitespace-nowrap">
                    APIs
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 px-3 text-xs h-full whitespace-nowrap">
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="web-dev" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 px-3 text-xs h-full whitespace-nowrap">
                    Web Dev
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Technology Cards with Smooth Auto-scroll - Full Width */}
        <div className="mb-10 md:mb-14 relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {filteredCategories.length === 0 ? (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 text-white/70 bg-black/30 border border-white/10 rounded-lg max-w-2xl mx-auto"
              >
                <Search className="h-8 w-8 mx-auto text-white/30 mb-3" />
                <h3 className="text-lg font-medium mb-2">No technologies found</h3>
                <p className="text-sm">Try adjusting your search query or filter selection</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-white/20 hover:border-white/40 text-white/80"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear filters
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="tech-cards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative overflow-hidden w-full"
              >
                {/* Top gradient overlay */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 z-10 bg-gradient-to-b from-black to-transparent"></div>
                {/* Bottom gradient overlay */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 z-10 bg-gradient-to-t from-black to-transparent"></div>
                {/* Left gradient overlay - enhanced */}
                <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black to-transparent"></div>
                {/* Right gradient overlay - enhanced */}
                <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black to-transparent"></div>

                {/* Improved auto-scrolling carousel */}
                <div 
                  className="carousel-container w-full" 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div 
                    ref={carouselRef} 
                    className="carousel-track"
                    style={{ 
                      touchAction: 'pan-y',
                      animationPlayState: 'running'
                    }}
                  >
                    {/* Use looped categories instead of duplicating JSX */}
                    {loopedCategories.map((category, index) => (
                      <Card 
                        key={`${category.id}-${index}`} 
                        className="carousel-item group relative border border-white/10 bg-black/40 hover:bg-black/60 transition-all duration-300 overflow-hidden backdrop-blur-sm hover:shadow-lg hover:shadow-white/5 hover:scale-[1.02] hover:border-white/20 touch-manipulation"
                        onMouseEnter={() => setHoveredCard(category.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80 opacity-50 z-0"></div>
                        
                        <CardHeader className={`py-3 px-4 flex flex-row items-center justify-between border-b border-white/10 ${category.colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 relative z-10`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                              {category.icon}
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold leading-tight group-hover:text-white transition-colors">{category.title}</h3>
                              <p className="text-[10px] text-white/70 group-hover:text-white/90 transition-colors">{category.badges.length} technologies</p>
                            </div>
                          </div>
                          
                          {/* Add case study indicator if available */}
                          {category.caseStudy && (
                            <div 
                              className="bg-white/10 hover:bg-white/20 p-1 rounded cursor-pointer transition-colors"
                              onClick={() => handleCaseStudyClick(category.id)}
                              title="View case study"
                            >
                              <FileText className="h-3.5 w-3.5 text-white/70" />
                            </div>
                          )}
                        </CardHeader>
                        
                        <CardContent className="p-3 space-y-2.5 relative z-10">
                          {/* Add a small tooltip explaining our expertise */}
                          <div className="absolute -top-2 right-3 bg-gradient-to-r from-indigo-600 to-indigo-700 px-2 py-0.5 rounded text-[10px] font-medium transform rotate-2 shadow-md">
                            Enterprise-Grade
                          </div>
                          
                          <div className="space-y-2.5">
                            {category.badges.slice(0, 3).map((badge) => (
                              <div 
                                key={`${badge.name}-${index}`} 
                                className={`group/badge relative bg-black/30 rounded-md border ${
                                  selectedBadges.some(b => b.name === badge.name) 
                                    ? 'border-red-500/40 shadow-md shadow-red-900/10' 
                                    : 'border-white/10'
                                } p-2.5 hover:border-white/30 hover:bg-black/40 transition-all duration-300 hover:shadow-md hover:shadow-white/5 ${
                                  enableComparison ? 'cursor-pointer' : ''
                                }`}
                                onClick={() => enableComparison && toggleBadgeSelection(badge)}
                              >
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <div className="font-medium text-xs group-hover/badge:text-white transition-colors">{badge.name}</div>
                                    {badge.expertise && (
                                      <Badge variant="outline" className={`text-[8px] px-1.5 py-0 h-4 ${
                                        badge.expertise === "advanced" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                                        badge.expertise === "intermediate" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                                        "bg-green-500/20 text-green-400 border-green-500/30"
                                      }`}>
                                        {badge.expertise}
                                      </Badge>
                                    )}
                                    
                                    {/* Add business impact badge */}
                                    {badge.businessImpact && (
                                      <Badge variant="outline" className={`text-[8px] px-1.5 py-0 h-4 ${
                                        badge.businessImpact === "high" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                                        badge.businessImpact === "medium" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                                        "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                      }`}>
                                        {badge.businessImpact}
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-1">
                                      {badge.link && (
                                        <a 
                                          href={badge.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-white/50 hover:text-white transition-colors p-0.5 hover:bg-white/10 rounded"
                                          aria-label={`Visit ${badge.name} website`}
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Link className="h-3 w-3" />
                                        </a>
                                      )}
                                      
                                      {/* Comparison checkbox */}
                                      {enableComparison && (
                                        <div 
                                          className={`w-3.5 h-3.5 rounded-sm border ${
                                            selectedBadges.some(b => b.name === badge.name) 
                                              ? 'bg-red-500 border-red-500 text-white' 
                                              : 'border-white/30 bg-black/20'
                                          } flex items-center justify-center`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleBadgeSelection(badge);
                                          }}
                                        >
                                          {selectedBadges.some(b => b.name === badge.name) && (
                                            <CheckCircle className="h-3 w-3" />
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-[9px] text-white/70 group-hover/badge:text-white/90 transition-colors mb-1.5 line-clamp-2">
                                  {badge.description}
                                </p>
                                
                                <div className="flex flex-col gap-1.5">
                                  {badge.score && (
                                    <div className="flex items-center gap-1.5">
                                      <div className="flex-1">
                                        <Progress 
                                          value={badge.score} 
                                          className="h-1 bg-white/10 group-hover/badge:bg-white/20 transition-colors"
                                        />
                                      </div>
                                      <div className="flex items-center gap-0.5">
                                        <Star className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
                                        <span className="text-[8px] font-medium">{badge.score}%</span>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Add business metrics */}
                                  {(badge.clients || badge.projectsDelivered) && (
                                    <div className="grid grid-cols-2 gap-1 mt-1 border-t border-white/5 pt-1">
                                      {badge.clients && (
                                        <div className="text-[8px] text-white/60">
                                          <span className="block">Clients</span>
                                          <span className="font-semibold text-white/90">{badge.clients}+</span>
                                        </div>
                                      )}
                                      {badge.projectsDelivered && (
                                        <div className="text-[8px] text-white/60">
                                          <span className="block">Projects</span>
                                          <span className="font-semibold text-white/90">{badge.projectsDelivered}+</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        
                        {/* Show all technologies button for categories with more than 3 badges */}
                        {category.badges.length > 3 && (
                          <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent z-10">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full text-[10px] h-7 hover:bg-white/10 text-white/80 hover:text-white group/btn"
                            >
                              <span>View all {category.badges.length} technologies</span>
                              <ArrowRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Bottom CTA with business benefits and trust signals */}
        <motion.div 
          className="mt-10 px-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-black/60 via-black/80 to-black/60 border border-white/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Badge className="mb-2 bg-gradient-to-r from-red-900/30 to-red-900/10 text-red-400 border-red-900/30">
                  BUSINESS VALUE
                </Badge>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Why Our Technology Stack Matters to Your Business</h2>
                <p className="text-white/70 text-sm mb-6">
                  Our technology stack is continuously evolving to incorporate the latest innovations and best practices,
                  delivering measurable business outcomes and competitive advantage.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Faster Time to Market</h3>
                      <p className="text-xs text-white/60">Accelerate development cycles by up to 40% with our optimized tech stack</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Enterprise-Grade Security</h3>
                      <p className="text-xs text-white/60">Protect your business with technologies that meet the highest security standards</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                      <ArrowUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Limitless Scalability</h3>
                      <p className="text-xs text-white/60">Our solutions scale seamlessly from startup to enterprise requirements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">AI-Ready Infrastructure</h3>
                      <p className="text-xs text-white/60">Future-proof your business with technologies designed for AI integration</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 transition-all text-white border-none shadow-lg shadow-red-900/20 group">
                    <span>Schedule Tech Consultation</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button variant="outline" className="border-white/10 bg-black/20 hover:bg-black/40 hover:border-white/20">
                    <span>Download Tech Stack Whitepaper</span>
                  </Button>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Client Success Metrics
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">Application Performance</span>
                      <span className="font-medium">+68%</span>
                    </div>
                    <Progress value={68} className="h-1.5 bg-white/10" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">Development Efficiency</span>
                      <span className="font-medium">+42%</span>
                    </div>
                    <Progress value={42} className="h-1.5 bg-white/10" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">Cost Reduction</span>
                      <span className="font-medium">+35%</span>
                    </div>
                    <Progress value={35} className="h-1.5 bg-white/10" />
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/70">Trusted By</span>
                      <Badge variant="outline" className="bg-white/5 text-[10px]">Enterprise Clients</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xs font-bold">F</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xs font-bold">M</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xs font-bold">A</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xs font-bold">T</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xs font-bold">+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
          
        {/* Case Study Dialog */}
        <Dialog 
          open={activeCaseStudy.isOpen} 
          onOpenChange={(open) => setActiveCaseStudy({...activeCaseStudy, isOpen: open})}
        >
          <DialogContent className="sm:max-w-[600px] bg-black/95 border border-white/10 shadow-xl">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${activeCaseStudy.category?.colorClass || 'bg-red-500/20 text-red-400'}`}>
                  {activeCaseStudy.category?.icon || <FileText className="h-5 w-5" />}
                </div>
                <div>
                  <Badge className={`mb-1 ${activeCaseStudy.category?.colorClass || ''} bg-opacity-20`}>
                    CASE STUDY
                  </Badge>
                  <DialogTitle className="text-xl font-bold">
                    {activeCaseStudy.category?.title || 'Technology'} Implementation
                  </DialogTitle>
                </div>
              </div>
              <DialogDescription>
                {activeCaseStudy.category?.caseStudy?.clientName 
                  ? `For ${activeCaseStudy.category.caseStudy.clientName}` 
                  : `For a client in the ${activeCaseStudy.category?.caseStudy?.industry || 'technology'} industry`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-3">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/70">Challenge</h3>
                <p className="text-sm">
                  {activeCaseStudy.category?.caseStudy?.challenge}
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/70">Solution</h3>
                <p className="text-sm">
                  {activeCaseStudy.category?.caseStudy?.solution}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <h4 className="text-xs text-white/50 w-full">Technologies Used:</h4>
                  {activeCaseStudy.category?.caseStudy?.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-black/40 border-white/10">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/70">Results</h3>
                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                  <ul className="space-y-2">
                    {activeCaseStudy.category?.caseStudy?.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="p-0.5 bg-green-500/20 text-green-400 rounded-full mt-1">
                          <CheckSquare className="h-3 w-3" />
                        </div>
                        <span className="text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {activeCaseStudy.category?.caseStudy?.testimonial && (
                <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                  <blockquote className="text-sm italic text-white/80 mb-3">
                    "{activeCaseStudy.category.caseStudy.testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold">
                      {activeCaseStudy.category.caseStudy.testimonial.author?.[0] || 'C'}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activeCaseStudy.category.caseStudy.testimonial.author}</p>
                      <p className="text-xs text-white/60">{activeCaseStudy.category.caseStudy.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 transition-all text-white"
                onClick={() => {
                  // This would be implemented to request a consultation
                  alert("This would open a consultation request form");
                }}
              >
                Request Similar Solution
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <style jsx global>{`
          /* Enhanced auto-scroll with responsive behavior */
          .carousel-container {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 2rem 0;
            margin: 0 auto;
            max-width: 100vw;
          }
          
          .carousel-track {
            display: flex;
            gap: 1rem;
            width: fit-content;
            animation: carouselScroll 60s linear infinite;
            will-change: transform;
            padding-left: max(calc(50vw - 140px), 1rem);
            padding-right: max(calc(50vw - 140px), 1rem);
          }
          
          .carousel-item {
            width: 280px;
            flex-shrink: 0;
            height: 350px;
            position: relative;
            transform: translateZ(0);
            will-change: transform;
            transition: transform 0.3s ease-out;
            overflow: hidden;
            backface-visibility: hidden;
          }
          
          @keyframes carouselScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 0.5rem));
            }
          }
          
          /* Custom animation speeds based on screen size */
          @media (max-width: 640px) {
            .carousel-item {
              width: 260px;
              height: 320px;
            }
            
            .carousel-track {
              gap: 0.75rem;
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }
          
          @media (min-width: 641px) and (max-width: 1023px) {
            .carousel-track {
              padding-left: max(calc(50vw - 130px), 1rem);
              padding-right: max(calc(50vw - 130px), 1rem);
            }
          }
          
          @media (min-width: 1024px) and (max-width: 1279px) {
            .carousel-track {
              animation-duration: 65s !important;
            }
          }
          
          @media (min-width: 1280px) {
            .carousel-track {
              animation-duration: 70s !important;
            }
          }
          
          /* Improved gradient mask effect for smoother scroll edges */
          .carousel-container::before,
          .carousel-container::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 15%;
            z-index: 2;
            pointer-events: none;
          }
          
          .carousel-container::before {
            left: 0;
            background: linear-gradient(to right, black, transparent);
          }
          
          .carousel-container::after {
            right: 0;
            background: linear-gradient(to left, black, transparent);
          }
          
          /* Fix for Safari and other browsers */
          @supports (-webkit-overflow-scrolling: touch) {
            .carousel-track {
              -webkit-transform: translateZ(0);
              -webkit-backface-visibility: hidden;
            }
          }
          
          /* Animation utilities */
          @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes float-medium {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
          
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          
          @keyframes pulse-medium {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.7; }
          }
          
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }
          
          .animate-float-medium {
            animation: float-medium 5s ease-in-out infinite;
          }
          
          .animate-float-reverse {
            animation: float-reverse 7s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
          }
          
          .animate-pulse-medium {
            animation: pulse-medium 4s ease-in-out infinite;
          }
          
          .animate-gradient-x {
            animation: gradient-x 10s ease infinite;
            background-size: 200% 200%;
          }
          
          /* Hide scrollbar for WebKit browsers */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Hide scrollbar for Firefox */
          .scrollbar-hide {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `}</style>
      </div>
    </section>
  )
}

