"use client"

import { useState, useRef, useEffect, ReactNode, MouseEvent, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  Briefcase, 
  ShoppingBag, 
  Stethoscope, 
  Landmark, 
  Plane, 
  Lightbulb, 
  ChevronRight, 
  PieChart,
  Clock,
  BarChart4,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Sparkles,
  Trophy,
  TrendingUp,
  Users,
  Shield,
  LineChart,
  MousePointerClick,
  Brain,
  ArrowUpRight,
  Eye,
  FileText,
  Play,
  ArrowDownRight,
  Copy,
  FolderCheck,
  MessageSquare
} from "lucide-react"

// Define interfaces for better type safety
interface Stat {
  label: string;
  value: string;
  icon: ReactNode;
  color?: string;
}

interface CaseStudy {
  client: string;
  challenge: string;
  solution: string;
  results: string;
  logo?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

interface Industry {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  benefits: string[];
  caseStudy: CaseStudy;
  stats: Stat[];
  technologies: {
    name: string;
    icon?: ReactNode;
    color?: string;
  }[];
  color: string;
  secondaryColor?: string;
  image: string;
  particleColor: string;
  videoUrl?: string;
}

interface ComingSoonIndustry {
  title: string;
  icon: ReactNode;
  eta?: string;
}

interface Card3DProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number;
}

// Enhanced industry data with more rich details and modern imagery
const industries: Industry[] = [
  {
    id: "finance",
    title: "Financial Services",
    icon: <Landmark className="h-6 w-6" />,
    description:
      "AI-powered risk assessment, fraud detection, and personalized financial recommendations for banks and financial institutions.",
    benefits: [
      "Reduce fraud by up to 60% with real-time transaction monitoring",
      "Automate 85% of routine customer service inquiries",
      "Increase portfolio performance by 12-18% with AI-driven insights",
      "Reduce operational costs by 35% through process automation",
    ],
    caseStudy: {
      client: "Global Investment Bank",
      challenge: "Needed to improve fraud detection while reducing false positives",
      solution: "Implemented our AI-powered risk assessment platform with custom ML models",
      results: "Reduced fraud by 62% while decreasing false positives by 42%",
      testimonial: {
        quote: "The implementation exceeded our expectations, delivering substantial improvements in fraud detection accuracy while significantly reducing false positives.",
        author: "Sarah Johnson",
        position: "Chief Security Officer"
      }
    },
    stats: [
      { label: "ROI", value: "280%", icon: <PieChart className="h-4 w-4" />, color: "blue" },
      { label: "Implementation", value: "6 weeks", icon: <Clock className="h-4 w-4" />, color: "purple" },
      { label: "Accuracy", value: "99.4%", icon: <TrendingUp className="h-4 w-4" />, color: "green" },
    ],
    technologies: [
      { name: "Machine Learning", icon: <Brain className="h-3 w-3" />, color: "blue" },
      { name: "NLP", icon: <Sparkles className="h-3 w-3" />, color: "purple" }, 
      { name: "Predictive Analytics", icon: <LineChart className="h-3 w-3" />, color: "green" }, 
      { name: "Pattern Recognition", icon: <Shield className="h-3 w-3" />, color: "red" }
    ],
    color: "from-blue-500 to-blue-700",
    secondaryColor: "blue-400",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#3b82f6",
    videoUrl: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: <Stethoscope className="h-6 w-6" />,
    description:
      "Advanced diagnostic support, patient outcome prediction, and operational efficiency improvements for healthcare providers.",
    benefits: [
      "Improve diagnostic accuracy by up to 40% with AI assistance",
      "Reduce patient readmission rates by 28% with predictive analytics",
      "Optimize resource allocation, saving 22% in operational costs",
      "Accelerate drug discovery by analyzing billions of molecular combinations",
    ],
    caseStudy: {
      client: "National Hospital Network",
      challenge: "Needed to improve diagnostic accuracy and reduce readmissions",
      solution: "Deployed our healthcare AI platform across 12 hospitals with custom diagnostic models",
      results: "38% improvement in early diagnosis and 26% reduction in readmissions",
      testimonial: {
        quote: "This AI solution has transformed our diagnostic capabilities and dramatically improved patient outcomes.",
        author: "Dr. Michael Chen",
        position: "Director of Medical Operations"
      }
    },
    stats: [
      { label: "ROI", value: "320%", icon: <PieChart className="h-4 w-4" />, color: "green" },
      { label: "Implementation", value: "8 weeks", icon: <Clock className="h-4 w-4" />, color: "blue" },
      { label: "Accuracy", value: "95.7%", icon: <TrendingUp className="h-4 w-4" />, color: "teal" },
    ],
    technologies: [
      { name: "Computer Vision", icon: <Eye className="h-3 w-3" />, color: "emerald" },
      { name: "Time Series Analysis", icon: <LineChart className="h-3 w-3" />, color: "green" },
      { name: "Reinforcement Learning", icon: <Brain className="h-3 w-3" />, color: "teal" },
      { name: "Medical NLP", icon: <FileText className="h-3 w-3" />, color: "blue" }
    ],
    color: "from-green-500 to-green-700",
    secondaryColor: "green-400",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#22c55e",
  },
  {
    id: "retail",
    title: "Retail & E-commerce",
    icon: <ShoppingBag className="h-6 w-6" />,
    description:
      "Personalized shopping experiences, inventory optimization, and demand forecasting for retail businesses.",
    benefits: [
      "Increase conversion rates by 35% with personalized recommendations",
      "Reduce inventory costs by 28% with AI-powered demand forecasting",
      "Optimize pricing in real-time based on market conditions",
      "Enhance customer service with 24/7 AI assistants",
    ],
    caseStudy: {
      client: "International Retail Chain",
      challenge: "Needed to optimize inventory and improve personalization",
      solution: "Implemented our retail analytics and recommendation engine",
      results: "32% increase in sales and 25% reduction in overstock situations",
    },
    stats: [
      { label: "ROI", value: "245%", icon: <PieChart className="h-4 w-4" />, color: "purple" },
      { label: "Implementation", value: "5 weeks", icon: <Clock className="h-4 w-4" />, color: "pink" },
    ],
    technologies: [
      { name: "Recommendation Systems", icon: <Users className="h-3 w-3" />, color: "purple" },
      { name: "Demand Forecasting", icon: <LineChart className="h-3 w-3" />, color: "indigo" },
      { name: "Customer Segmentation", icon: <PieChart className="h-3 w-3" />, color: "violet" },
      { name: "Dynamic Pricing", icon: <TrendingUp className="h-3 w-3" />, color: "fuchsia" }
    ],
    color: "from-purple-500 to-purple-700",
    secondaryColor: "purple-400",
    image: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2095&auto=format&fit=crop",
    particleColor: "#a855f7",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    icon: <Building2 className="h-6 w-6" />,
    description:
      "Predictive maintenance, quality control automation, and supply chain optimization for manufacturing companies.",
    benefits: [
      "Reduce equipment downtime by up to 45% with predictive maintenance",
      "Improve quality control accuracy by 38% with computer vision",
      "Optimize supply chain efficiency, reducing costs by 22%",
      "Increase production throughput by 15-20% with AI scheduling",
    ],
    caseStudy: {
      client: "Global Automotive Manufacturer",
      challenge: "Needed to reduce equipment failures and improve quality",
      solution: "Deployed our predictive maintenance and quality control AI",
      results: "42% reduction in unplanned downtime and 35% fewer defects",
    },
    stats: [
      { label: "ROI", value: "310%", icon: <PieChart className="h-4 w-4" />, color: "yellow" },
      { label: "Implementation", value: "10 weeks", icon: <Clock className="h-4 w-4" />, color: "amber" },
    ],
    technologies: [
      { name: "IoT Integration", icon: <Cpu className="h-3 w-3" />, color: "yellow" },
      { name: "Predictive Maintenance", icon: <Clock className="h-3 w-3" />, color: "amber" },
      { name: "Computer Vision", icon: <Eye className="h-3 w-3" />, color: "orange" },
      { name: "Digital Twin", icon: <Copy className="h-3 w-3" />, color: "yellow" }
    ],
    color: "from-yellow-500 to-yellow-700",
    secondaryColor: "yellow-400",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#eab308",
  },
  {
    id: "insurance",
    title: "Insurance",
    icon: <Briefcase className="h-6 w-6" />,
    description: "Risk assessment, claims processing automation, and fraud detection for insurance companies.",
    benefits: [
      "Accelerate claims processing by 75% with AI automation",
      "Reduce fraudulent claims by 48% with advanced detection",
      "Improve risk assessment accuracy by 32%",
      "Enhance customer satisfaction with faster service",
    ],
    caseStudy: {
      client: "Leading Insurance Provider",
      challenge: "Needed to streamline claims processing and detect fraud",
      solution: "Implemented our insurance AI platform",
      results: "70% faster claims processing and 45% reduction in fraudulent payouts",
    },
    stats: [
      { label: "ROI", value: "290%", icon: <PieChart className="h-4 w-4" />, color: "red" },
      { label: "Implementation", value: "7 weeks", icon: <Clock className="h-4 w-4" />, color: "rose" },
    ],
    technologies: [
      { name: "Document Processing", icon: <FileText className="h-3 w-3" />, color: "red" },
      { name: "Anomaly Detection", icon: <Shield className="h-3 w-3" />, color: "rose" },
      { name: "Risk Modeling", icon: <BarChart4 className="h-3 w-3" />, color: "red" },
      { name: "Auto Classification", icon: <FolderCheck className="h-3 w-3" />, color: "rose" }
    ],
    color: "from-red-500 to-red-700",
    secondaryColor: "red-400",
    image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#ef4444",
  },
  {
    id: "travel",
    title: "Travel & Hospitality",
    icon: <Plane className="h-6 w-6" />,
    description:
      "Dynamic pricing, personalized travel recommendations, and operational efficiency for travel companies.",
    benefits: [
      "Increase booking conversion rates by 28% with personalized offers",
      "Optimize pricing in real-time based on demand patterns",
      "Improve customer satisfaction with AI-powered recommendations",
      "Reduce operational costs by 25% through automation",
    ],
    caseStudy: {
      client: "International Hotel Chain",
      challenge: "Needed to optimize pricing and improve personalization",
      solution: "Deployed our travel AI platform across 200+ properties",
      results: "24% revenue increase and 30% improvement in customer satisfaction",
    },
    stats: [
      { label: "ROI", value: "215%", icon: <PieChart className="h-4 w-4" />, color: "cyan" },
      { label: "Implementation", value: "6 weeks", icon: <Clock className="h-4 w-4" />, color: "sky" },
    ],
    technologies: [
      { name: "Dynamic Pricing", icon: <TrendingUp className="h-3 w-3" />, color: "cyan" },
      { name: "Personalization", icon: <Users className="h-3 w-3" />, color: "sky" },
      { name: "Sentiment Analysis", icon: <MessageSquare className="h-3 w-3" />, color: "cyan" },
      { name: "Demand Forecasting", icon: <LineChart className="h-3 w-3" />, color: "blue" }
    ],
    color: "from-cyan-500 to-cyan-700",
    secondaryColor: "cyan-400",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#06b6d4",
  },
]

// Coming soon industries for roadmap
const comingSoonIndustries: ComingSoonIndustry[] = [
  { title: "Energy & Utilities", icon: <Zap className="h-5 w-5" /> },
  { title: "Government & Public Sector", icon: <Building2 className="h-5 w-5" /> },
]

// Enhanced animated card with modern 3D effect
function Card3D({ children, className = "", onClick = () => {}, intensity = 1 }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position variables
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Smooth spring physics for rotation with adjustable intensity
  const rotateX = useSpring(useTransform(y, [-100, 100], [10 * intensity, -10 * intensity]), {
    stiffness: 150,
    damping: 25
  })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10 * intensity, 10 * intensity]), {
    stiffness: 150,
    damping: 25
  })

  // Add subtle movement to z-axis for depth effect
  const z = useSpring(useTransform(
    y, 
    [-100, 100], 
    [5, -5]
  ), {
    stiffness: 150,
    damping: 20
  })

  // Add subtle shadow effect based on movement
  const shadowOpacity = useTransform(
    z,
    [-5, 5],
    [0.2, 0.6]
  )
  
  const shadowBlur = useTransform(
    z,
    [-5, 5],
    [10, 25]
  )

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    // Calculate mouse position relative to card center
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    
    // Update motion values with smoother response
    x.set(offsetX * 0.8) // Reduce sensitivity slightly
    y.set(offsetY * 0.8)
  }

  function handleMouseLeave() {
    // Reset position when mouse leaves with smoother transition
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`will-change-transform ${className}`}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        z,
        boxShadow: useTransform(
          shadowOpacity,
          (opacity) => `0px ${shadowBlur.get()}px 25px rgba(0, 0, 0, ${opacity})`
        ),
        perspective: 800
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Enhanced particle animation with more variety and smoother movement
function Particles({ color = "#ef4444", count = 25 }) {
  // Using useEffect to ensure client-side only rendering
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    xPos: number;
    yPos: number;
    scale: number;
    duration: number;
    delay: number;
    opacity: number;
    blur: number;
  }>>([]);
  
  useEffect(() => {
    // Generate particles only on the client side
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 2 + (i % 5),
      xPos: ((i * 7.3) % 100) - 50,
      yPos: ((i * 8.7) % 100) - 50,
      scale: 0.4 + (i % 4) * 0.4,
      duration: 6 + (i % 8),
      delay: i * 0.25,
      opacity: 0.3 + (i % 5) * 0.1,
      blur: i % 2 === 0 ? 1 : 0
    }));
    setParticles(newParticles);
  }, [count]);
  
  // Don't render anything during SSR
  if (particles.length === 0) {
    return null;
  }
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full will-change-transform"
          initial={{
            opacity: 0,
            scale: 0,
            x: `${particle.xPos}%`,
            y: `${particle.yPos}%`,
            backgroundColor: color,
          }}
          animate={{
            opacity: [0, particle.opacity, 0],
            scale: [0, particle.scale, 0],
            x: `${(particle.xPos + 40) % 100 - 50}%`,
            y: `${(particle.yPos + 40) % 100 - 50}%`,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: `blur(${particle.blur}px)`
          }}
        />
      ))}
    </div>
  );
}

export default function IndustryUseCases() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>(industries[0])
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [expandedCase, setExpandedCase] = useState(false)
  const [view, setView] = useState("list") // "list" or "tabs"
  const [showVideo, setShowVideo] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  
  // Handle scroll animations for elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.2 }
    )
    
    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observer.observe(el))
    
    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])
  
  // Toggle between list and tabs view on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setView("tabs")
      } else {
        setView("list")
      }
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Handle industry selection
  const handleIndustryChange = (industryId: string) => {
    const industry = industries.find(i => i.id === industryId);
    if (industry) {
      setActiveIndustry(industry);
      setShowVideo(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black to-slate-900 relative overflow-hidden" id="industry-solutions" ref={containerRef}>
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url(/images/grid.svg)] bg-repeat opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      
      {/* Modern animated gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-red-500/10 blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[150px] animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full bg-purple-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      
      {/* Enhanced floating particles */}
      <Particles color={activeIndustry.particleColor} count={30} />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 animate-on-scroll max-w-4xl mx-auto"
        >
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/5 px-3 py-1.5 text-sm">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="mr-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-red-400" />
            </motion.span>
            INDUSTRY SOLUTIONS
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Industry-Specific <span className="text-transparent bg-gradient-to-r from-red-500 to-red-400">AI Solutions</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Our specialized AI solutions are tailored to address the unique challenges and 
            opportunities across diverse industries, delivering transformative results.
          </p>
        </motion.div>

        {/* Mobile view: Enhanced Tabs interface */}
        <div className={`md:hidden mb-8 ${view === "tabs" ? "block" : "hidden"}`}>
          <Tabs 
            defaultValue={activeIndustry.id} 
            onValueChange={handleIndustryChange}
            className="w-full"
          >
            <div className="overflow-x-auto pb-3 -mx-4 px-4 scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-white/5">
              <TabsList className="w-max flex justify-start bg-black/50 backdrop-blur-md border border-white/10 p-2 gap-2 min-w-full rounded-xl">
                {industries.map((industry) => (
                  <TabsTrigger
                    key={industry.id}
                    value={industry.id}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-500 data-[state=active]:text-white px-4 py-2.5 flex items-center gap-2 rounded-lg whitespace-nowrap transition-all duration-300"
                  >
                    <span className="shrink-0">{industry.icon}</span>
                    <span className="text-sm font-medium">{industry.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Main content area with enhanced layout */}
        <div className="relative grid lg:grid-cols-12 gap-8 md:gap-10 items-start max-w-7xl mx-auto">
          {/* Desktop view: Industries Navigation - With enhanced cards and interactions */}
          <motion.div 
            className={`lg:col-span-4 space-y-4 ${view === "list" ? "block" : "hidden md:block"}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="sticky top-24 space-y-4">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="h-full"
                >
                  <Card3D
                    onClick={() => setActiveIndustry(industry)}
                    className="cursor-pointer h-full"
                    intensity={0.5}
                  >
                    <button
                      className={`w-full h-full text-left p-4 sm:p-5 rounded-xl transition-all duration-300 flex items-start gap-3 sm:gap-4 group relative overflow-hidden border ${
                        activeIndustry.id === industry.id
                          ? "bg-gradient-to-r from-red-600/20 to-red-500/5 border-red-500/40 shadow-lg shadow-red-500/5"
                          : "bg-black/50 backdrop-blur-md border-white/10 hover:bg-black/60 hover:border-white/20"
                      }`}
                    >
                      {/* Enhanced hover effect */}
                      {hoverIndex === index && hoverIndex !== industries.findIndex((i) => i.id === activeIndustry.id) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}

                      {/* Modern shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                        <div className="absolute inset-[-100%] w-[400%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
                      </div>

                      <div
                        className={`p-3 rounded-xl flex-shrink-0 ${
                          activeIndustry.id === industry.id
                            ? `bg-gradient-to-br ${industry.color} text-white shadow-lg shadow-black/30`
                            : "bg-white/10 text-white/70 group-hover:text-white group-hover:bg-white/20"
                        } transition-colors duration-300`}
                      >
                        {industry.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-bold text-base sm:text-lg md:text-xl truncate ${
                            activeIndustry.id === industry.id ? "text-white" : "text-white/80 group-hover:text-white"
                          }`}
                        >
                          {industry.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/60 line-clamp-2 mt-2">{industry.description}</p>
                        
                        {/* Enhanced mini-stats for active industry */}
                        {activeIndustry.id === industry.id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-3"
                          >
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-red-500/20">
                                <Trophy className="h-3.5 w-3.5 text-red-400" />
                            </div>
                              <span className="text-sm text-white/80">Top ROI</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-red-500/20">
                                <Clock className="h-3.5 w-3.5 text-red-400" />
                              </div>
                              <span className="text-sm text-white/80">Fast Deploy</span>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className="self-center flex-shrink-0">
                        <div className={`rounded-full p-2 transition-all duration-300 ${
                          activeIndustry.id === industry.id 
                            ? "bg-red-500 text-white" 
                            : "bg-white/5 text-white/30 group-hover:bg-white/10 group-hover:text-white/60"
                        }`}>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </button>
                  </Card3D>
                </motion.div>
              ))}

              {/* Enhanced Coming Soon Industries */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="text-white/70 text-base mb-4 flex items-center gap-2">
                  <Badge variant="outline" className="bg-black/50 border-white/20 text-white/90">ROADMAP</Badge>
                  <span>Coming Soon</span>
                </div>
                <div className="space-y-3">
                  {comingSoonIndustries.map((industry, index) => (
                    <motion.div 
                      key={`soon-${index}`}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-4 text-white/60 transition-all duration-300"
                    >
                      <div className="p-2 bg-white/5 rounded-lg">{industry.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/80">{industry.title}</p>
                        {industry.eta && (
                          <p className="text-xs text-white/40 mt-1">ETA: {industry.eta}</p>
                        )}
                    </div>
                      <Badge variant="outline" className="text-xs bg-white/5 border-white/10">
                        Soon
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Industry Details - Enhanced with modern UI and animations */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
              >
                <div className="relative aspect-video overflow-hidden">
                  {/* Enhanced media display with video option */}
                  {showVideo && activeIndustry.videoUrl ? (
                    <div className="absolute inset-0 bg-black">
                      <video 
                        src={activeIndustry.videoUrl} 
                        className="w-full h-full object-cover" 
                        autoPlay 
                        loop 
                        muted
                        controls
                      />
                      <Button 
                        size="sm"
                        variant="ghost" 
                        className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                        onClick={() => setShowVideo(false)}
                      >
                        Back to Image
                      </Button>
                    </div>
                  ) : (
                    <>
                  {/* Gradient overlay based on industry */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeIndustry.color} opacity-20`}></div>
                  
                  {/* Main image with parallax effect */}
                  <motion.img
                    src={activeIndustry.image}
                    alt={activeIndustry.title}
                    className="w-full h-full object-cover scale-[1.02] will-change-transform"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1.04 }}
                    transition={{ duration: 0.8 }}
                  />
                  
                      {/* Modern gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>

                      {/* Video button if available */}
                      {activeIndustry.videoUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-black/70 hover:border-white/40"
                          onClick={() => setShowVideo(true)}
                        >
                          <Play className="h-4 w-4 mr-1.5" />
                          Watch Demo
                        </Button>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-3">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }} 
                            className={`p-3 rounded-xl bg-gradient-to-br ${activeIndustry.color} text-white shadow-lg shadow-black/30`}
                      >
                        {activeIndustry.icon}
                      </motion.div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
                        {activeIndustry.title}
                      </h3>
                    </div>
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl">{activeIndustry.description}</p>
                  </div>
                    </>
                  )}
                </div>

                {/* Enhanced metrics section with animation */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-gradient-to-r from-black/50 to-black/30 border-y border-white/10">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    className="flex flex-col items-center justify-center p-2 text-center rounded-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Badge className="bg-red-500/20 text-red-400 border-0">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Performance
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">+{40 + Math.floor(Math.random() * 20)}%</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    className="flex flex-col items-center justify-center p-2 text-center rounded-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Badge className="bg-green-500/20 text-green-400 border-0">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        Cost Reduction
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-400">-{30 + Math.floor(Math.random() * 15)}%</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    className="flex flex-col items-center justify-center p-2 text-center rounded-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Badge className="bg-blue-500/20 text-blue-400 border-0">
                        <Users className="h-3 w-3 mr-1" />
                        Customer Impact
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">+{80 + Math.floor(Math.random() * 15)}%</p>
                  </motion.div>
                </div>

                <div className="p-6 md:p-8 grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div>
                    <h4 className="text-xl font-semibold mb-5 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-500/20">
                        <Sparkles className="h-5 w-5 text-red-500" />
                      </div>
                      Key Benefits
                    </h4>
                    
                    <ul className="space-y-4">
                      {activeIndustry.benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="p-1.5 rounded-full bg-green-500/20 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                          <span className="text-base md:text-lg text-white/90">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Implementation Stats - Enhanced with modern cards and animations */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                      {activeIndustry.stats.map((stat, index) => {
                        const colorClass = stat.color ? 
                          `from-${stat.color}-500/20 to-${stat.color}-500/5 border-${stat.color}-500/30 text-${stat.color}-500` : 
                          "from-red-500/20 to-red-500/5 border-red-500/30 text-red-500";
                        
                        return (
                        <motion.div
                          key={`stat-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className={`bg-gradient-to-br ${colorClass} border rounded-xl p-4 backdrop-blur-sm transition-all duration-300 flex flex-col items-center`}
                        >
                            <div className="rounded-full bg-white/10 p-2 mb-2">
                              {stat.icon}
                          </div>
                            <p className="text-sm text-white/60 mb-1 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                          
                            {/* Animated indicator with glow effect */}
                            <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                className={`h-full rounded-full`}
                                style={{ backgroundColor: stat.color ? `rgb(var(--${stat.color}-500))` : "rgb(var(--red-500))" }}
                              initial={{ width: 0 }}
                                animate={{ width: `${parseFloat(stat.value.replace('%', '')) * 0.9}%` }}
                              transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                            />
                          </div>
                        </motion.div>
                        );
                      })}
                    </div>

                    {/* Technology Stack - Enhanced visual representation */}
                    <div className="mt-8">
                      <h5 className="text-base text-white/80 mb-4 flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-blue-500/20">
                          <Cpu className="h-4 w-4 text-blue-500" />
                        </div>
                        Technologies Used
                      </h5>
                      <div className="flex flex-wrap gap-3">
                        {activeIndustry.technologies.map((tech, index) => {
                          const colorClass = tech.color ? 
                            `bg-${tech.color}-500/10 border-${tech.color}-500/20 text-${tech.color}-400` : 
                            "bg-white/10 border-white/10 text-white/80";
                          
                          return (
                          <motion.span
                            key={`tech-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                              className={`px-3 py-2 rounded-lg ${colorClass} inline-flex items-center gap-2 transition-all duration-300 backdrop-blur-sm`}
                            >
                              {tech.icon || (
                                <div className={`h-2 w-2 rounded-full bg-${tech.color || 'red'}-500`}></div>
                              )}
                              <span className="text-sm font-medium">{tech.name}</span>
                          </motion.span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button className="group bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white border-0 relative overflow-hidden shadow-lg shadow-red-500/20">
                        <span className="relative z-10 flex items-center gap-2">
                          Learn More
                          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                        <motion.span 
                          className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ 
                            background: "radial-gradient(circle at var(--x) var(--y), rgba(244, 63, 94, 0.8), transparent 50%)"
                          }}
                          style={{ 
                            "--x": "calc(var(--mouse-x, 0) * 100%)",
                            "--y": "calc(var(--mouse-y, 0) * 100%)"
                          } as any}
                        ></motion.span>
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced Case Study Card */}
                  <Card3D className="h-full" intensity={0.3}>
                    <div className="bg-gradient-to-br from-black/80 to-black/60 rounded-xl p-6 backdrop-blur-xl border border-white/10 h-full flex flex-col relative overflow-hidden group">
                      {/* Animated gradient border */}
                      <div className="absolute inset-0 p-[1px] rounded-xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0 opacity-0 group-hover:opacity-100 animate-shine-slower"></div>
                      </div>
                      
                      <h4 className="text-xl font-semibold mb-5 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <BarChart4 className="h-5 w-5 text-purple-500" />
                        </div>
                        Success Story
                      </h4>

                      {/* Optional client logo */}
                      {activeIndustry.caseStudy.logo && (
                        <div className="mb-4 flex justify-center">
                          <img 
                            src={activeIndustry.caseStudy.logo} 
                            alt={`${activeIndustry.caseStudy.client} logo`}
                            className="h-10 object-contain opacity-80"
                          />
                        </div>
                      )}

                      <div className="space-y-5 flex-grow">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.3)" }}
                          className="bg-black/40 p-4 rounded-xl border border-white/10 transition-all duration-300"
                        >
                          <p className="text-sm text-purple-400 mb-1 font-medium">Client</p>
                          <p className="font-medium text-base">{activeIndustry.caseStudy.client}</p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.3)" }}
                          className="bg-black/40 p-4 rounded-xl border border-white/10 transition-all duration-300"
                        >
                          <p className="text-sm text-purple-400 mb-1 font-medium">Challenge</p>
                          <p className="text-base">{activeIndustry.caseStudy.challenge}</p>
                        </motion.div>

                        <AnimatePresence>
                          {(expandedCase || true) && (
                            <>
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.3)" }}
                                className="bg-black/40 p-4 rounded-xl border border-white/10 transition-all duration-300"
                              >
                                <p className="text-sm text-purple-400 mb-1 font-medium">Solution</p>
                                <p className="text-base">{activeIndustry.caseStudy.solution}</p>
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.3)" }}
                                className="bg-gradient-to-r from-green-900/30 to-green-800/10 p-4 rounded-xl border border-green-500/20 transition-all duration-300"
                              >
                                <p className="text-sm text-green-400 mb-1 font-medium">Results</p>
                                <p className="text-green-500 font-medium text-base">{activeIndustry.caseStudy.results}</p>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                        
                        {/* Testimonial if available */}
                        {activeIndustry.caseStudy.testimonial && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 bg-gradient-to-r from-blue-900/20 to-purple-900/10 p-5 rounded-xl border border-blue-500/10 relative"
                          >
                            <div className="absolute -top-2.5 -left-2.5 text-blue-500 opacity-30 transform scale-150">
                              "
                            </div>
                            <p className="text-sm italic text-white/80 mb-3">
                              "{activeIndustry.caseStudy.testimonial.quote}"
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                                {activeIndustry.caseStudy.testimonial.author.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{activeIndustry.caseStudy.testimonial.author}</p>
                                <p className="text-xs text-white/50">{activeIndustry.caseStudy.testimonial.position}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <Button variant="outline" className="mt-6 w-full border-white/10 hover:bg-white/10 group backdrop-blur-sm">
                        <span className="flex items-center gap-2">
                        View Full Case Study
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </div>
                  </Card3D>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx global>{`
        .animate-shine {
          animation: shine 2s infinite;
        }
        
        .animate-shine-slower {
          animation: shine 3s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 8s infinite alternate;
        }
        
        @keyframes shine {
          from { transform: translateX(-100%) }
          to { transform: translateX(100%) }
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.7; transform: scale(1.05); }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(244, 63, 94, 0.2);
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(244, 63, 94, 0.4);
        }
      `}</style>
    </section>
  )
}

