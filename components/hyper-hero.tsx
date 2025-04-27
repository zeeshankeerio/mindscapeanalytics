"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, useAnimation, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Star,
  BarChart2,
  Brain,
  Search,
  Database,
  Cpu,
  Maximize2,
  Minimize2,
  RotateCw,
  Loader2,
  CheckCircle2,
  Code,
  Zap,
  Shield,
  LineChart,
  Workflow,
  Gauge,
  Network,
  MessageSquare,
  FileCode2,
  Terminal,
  AlertTriangle,
  Settings,
  Eye,
  EyeOff,
  Camera,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  Activity as ActivityIcon,
  ExternalLink,
  Play,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Check,
  Copy,
  Server,
  PieChart,
  Layers,
  Maximize,
  Minimize,
  RefreshCw,
  TrendingUp,
  BrainCircuit,
  MessageCircle,
  FileText,
  Shapes,
  Lock,
} from "lucide-react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn, navigateToContactForm } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useMobile } from "@/hooks/use-mobile"
import { ErrorBoundary } from "@/components/error-boundary"
import MindscapeLogo from "@/components/mindscape-logo"
import { Input } from "@/components/ui/input"
import { TypeAnimation } from 'react-type-animation'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Custom hook for responsive device detection
const useResponsiveDevice = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Function to check if device is mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check on initial render
    checkMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return { isMobile }
}

// Dynamically import Three.js components to avoid SSR issues
const ThreeScene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-black/50 rounded-xl border border-white/10">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin mb-4"></div>
        <p className="text-white/70">Loading 3D visualization...</p>
      </div>
    </div>
  ),
})

// Animated Text Component
function AnimatedText({ text, className }: { text: string; className?: string }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-2 mt-2" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-colors duration-300 group hover-lift"
    >
      <div className="p-3 bg-red-500/10 rounded-lg w-fit mb-4 group-hover:bg-red-500/20 transition-colors">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  )
}

// Stat Card Component
function StatCard({
  value,
  label,
  icon,
  delay = 0,
}: { value: string; label: string; icon: React.ReactNode; delay?: number }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover-lift"
    >
      <div className="p-3 bg-red-500/10 rounded-full w-fit mb-4">{icon}</div>
      <div className="text-3xl md:text-4xl font-bold mb-1">{value}</div>
      <div className="text-white/70">{label}</div>
    </motion.div>
  )
}

// Interactive Demo Card
function InteractiveDemoCard({
  title,
  description,
  icon,
  delay = 0,
}: { title: string; description: string; icon: React.ReactNode; delay?: number }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      className={cn(
        "bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300 cursor-pointer overflow-hidden",
        isHovered ? "border-red-500/50" : "",
        isActive ? "border-red-500 glow-effect" : "",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "p-3 rounded-lg transition-colors",
            isActive ? "bg-red-500 text-white" : "bg-red-500/10 text-red-500",
          )}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            {title}
            {isActive && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Active</span>}
          </h3>
          <p className="text-white/70">{description}</p>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            key="active-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 border border-red-500/50 rounded-lg"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// AI Feature Card
function AIFeatureCard({
  icon,
  title,
  description,
  color = "red",
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color?: "red" | "blue" | "green" | "purple" | "orange"
  delay?: number
}) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const colorMap = {
    red: "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30",
    green: "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/30",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/30",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20 hover:border-orange-500/30",
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={`bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-${color}-500/10`}
    >
      <div className={`p-3 rounded-lg w-fit mb-4 ${colorMap[color]}`}>{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>

      <div className="mt-4 pt-4 border-t border-white/10">
        <Button variant="ghost" className="p-0 h-auto text-sm hover:bg-transparent hover:text-white group">
          <span>Learn more</span>
          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  )
}

// AI Code Card
function AICodeCard({ delay = 0 }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isTyping, setIsTyping] = useState(true)
  const [codeProgress, setCodeProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      // Simulate code typing
      const interval = setInterval(() => {
        setCodeProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsTyping(false)
            return 100
          }
          return prev + 2
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [controls, isInView])

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  const codeSnippet = `// AI-powered image recognition
import { analyzeImage } from '@mindscape/vision';

async function detectObjects(imageUrl) {
  const result = await analyzeImage(imageUrl, {
    confidence: 0.85,
    models: ['general-v2', 'face-detection']
  });
  
  return result.objects.map(obj => ({
    label: obj.label,
    confidence: obj.confidence,
    boundingBox: obj.boundingBox
  }));
}`

  // Calculate how much of the code to show based on progress
  const displayedCode = codeSnippet.substring(0, Math.floor((codeProgress / 100) * codeSnippet.length))

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/30"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Code className="h-5 w-5 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold">AI Vision API</h3>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
          TypeScript
        </Badge>
      </div>

      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-hidden">
        <pre className="text-white/90">
          <code>{displayedCode}</code>
          {isTyping && <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1"></span>}
        </pre>
      </div>

      {!isTyping && (
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-white/60">Ready to deploy</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-blue-400 hover:text-blue-300 p-0 h-auto"
            onClick={handleCopyCode}
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FileCode2 className="h-4 w-4 mr-1" />
                <span>Copy code</span>
              </>
            )}
          </Button>
        </div>
      )}
    </motion.div>
  )
}

// AI Terminal Card
function AITerminalCard({ delay = 0 }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [commandIndex, setCommandIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const commands = useMemo(() => [
    { text: "$ mindscape init my-ai-project", delay: 1000 },
    { text: "Initializing new AI project...", delay: 1500, output: true },
    { text: "Setting up project structure...", delay: 1000, output: true },
    { text: "Installing dependencies...", delay: 2000, output: true },
    { text: "Project created successfully! 🚀", delay: 1000, output: true },
    { text: "$ cd my-ai-project", delay: 1000 },
    { text: "$ mindscape models list", delay: 1500 },
    { text: "Available models:", delay: 800, output: true },
    { text: "  • gpt-4o (text generation)", delay: 500, output: true },
    { text: "  • vision-v2 (image recognition)", delay: 500, output: true },
    { text: "  • audio-transcription-v1 (speech to text)", delay: 500, output: true },
    { text: "  • embedding-v3 (vector embeddings)", delay: 500, output: true },
    { text: "$ mindscape deploy --production", delay: 1500 },
    { text: "Deploying to production...", delay: 2000, output: true },
    { text: "Deployment complete! Your AI is now live at:", delay: 1000, output: true },
    { text: "https://my-ai-project.mindscape.ai", delay: 500, output: true },
  ], [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      // Simulate terminal typing
      if (commandIndex < commands.length) {
        const timer = setTimeout(() => {
          setCommandIndex((prev) => prev + 1)
          if (commandIndex === commands.length - 1) {
            setIsTyping(false)
          }
        }, commands[commandIndex].delay)

        return () => clearTimeout(timer)
      }
    }
  }, [controls, isInView, commandIndex, commands.length, commands]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-green-500/30"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Terminal className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold">Mindscape CLI</h3>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div className="bg-black/70 rounded-lg p-4 font-mono text-sm h-[250px] overflow-y-auto code-scroll">
        {commands.slice(0, commandIndex + 1).map((cmd, index) => (
          <div key={index} className={`mb-1 ${cmd.output ? "text-green-400 pl-4" : "text-white"}`}>
            {cmd.text}
          </div>
        ))}
        {isTyping && <span className="inline-block w-2 h-4 bg-white animate-typing-cursor ml-1"></span>}
      </div>
    </motion.div>
  )
}

// Add the EnhancedFeatureCard component implementation before the HyperHero component
type FeatureColors = "red" | "blue" | "green" | "purple"

const EnhancedFeatureCard = ({ 
  icon, 
  title, 
  description, 
  color,
  index 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: FeatureColors;
  index: number;
}) => {
  const colorMap = {
    red: {
      bg: "bg-gradient-to-b from-red-950/40 to-red-900/20",
      border: "border-red-900/30",
      iconBg: "bg-gradient-to-b from-red-800/30 to-red-900/20",
      text: "text-red-400"
    },
    blue: {
      bg: "bg-gradient-to-b from-blue-950/40 to-blue-900/20",
      border: "border-blue-900/30",
      iconBg: "bg-gradient-to-b from-blue-800/30 to-blue-900/20",
      text: "text-blue-400"
    },
    green: {
      bg: "bg-gradient-to-b from-green-950/40 to-green-900/20",
      border: "border-green-900/30",
      iconBg: "bg-gradient-to-b from-green-800/30 to-green-900/20",
      text: "text-green-400"
    },
    purple: {
      bg: "bg-gradient-to-b from-purple-950/40 to-purple-900/20",
      border: "border-purple-900/30",
      iconBg: "bg-gradient-to-b from-purple-800/30 to-purple-900/20",
      text: "text-purple-400"
    }
  }

  const styles = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
      className={`relative rounded-xl border ${styles.border} ${styles.bg} backdrop-blur-sm p-4 hover:bg-opacity-90 transition-all duration-300 group`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      <div className={`p-2 rounded-lg inline-flex ${styles.iconBg} ${styles.text} mb-3`}>
        {icon}
      </div>
      
      <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
      
      <div className="absolute bottom-0 right-0 p-1.5">
        <div className={`h-2 w-2 rounded-full ${styles.text} opacity-40 animate-pulse-slow`} />
      </div>
    </motion.div>
  )
}

// Desktop section for better code organization
function DesktopHeroContent({ 
  y, 
  optimizedFeatures, 
  handleGetStartedClick 
}: { 
  y: any, 
  optimizedFeatures: any[], 
  handleGetStartedClick: (e: React.MouseEvent) => void 
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
        {/* Left Column - Content */}
        <motion.div
          className="flex-1 space-y-4 md:space-y-6 relative w-full"
          style={{ y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Badge Section */}
          <motion.div 
            className="flex flex-wrap gap-2 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge className="bg-gradient-to-r from-red-800/30 to-red-800/10 text-red-400 border-red-800/30 hover:bg-red-800/20 transition-colors duration-300">
              <Sparkles className="h-3 w-3 mr-1 animate-[pulse_2s_ease-in-out_infinite]" aria-hidden="true" />
              <span>Enterprise AI Platform</span>
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500/30 to-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20 transition-colors duration-300">
              <Shield className="h-3 w-3 mr-1 animate-[pulse_2.5s_ease-in-out_infinite]" aria-hidden="true" />
              <span>SOC 2 Certified</span>
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500/30 to-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20 transition-colors duration-300">
              <Zap className="h-3 w-3 mr-1 animate-[pulse_3s_ease-in-out_infinite]" aria-hidden="true" />
              <span>Real-time AI</span>
            </Badge>
          </motion.div>

          {/* Title Section */}
          <motion.div
            className="space-y-2 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-white relative z-10">Unlock Next-Gen Intelligence with</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600 relative">
                Enterprise AI Solutions
              </span>
            </h1>
            <p className="text-lg text-white/80 mt-4 max-w-xl">
              Accelerate innovation with our end-to-end AI platform that delivers powerful insights, automates workflows, and drives tangible business outcomes.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="group relative px-6 py-4 text-base font-semibold text-white rounded-full hover:brightness-110 transition-all duration-300 overflow-hidden w-full sm:w-auto"
              onClick={handleGetStartedClick}
              aria-label="Get Started with Mindscape AI"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 group-hover:from-red-600 group-hover:via-red-500 group-hover:to-red-600 transition-all duration-500 rounded-full"></div>
              <div className="absolute -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" aria-hidden="true" />
              <span className="relative z-10 flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Button>
            <Link 
              href="/services" 
              className="w-full sm:w-auto"
              aria-label="Explore Solutions"
            >
              <Button
                size="lg"
                variant="outline"
                className="group relative px-6 py-4 text-base font-semibold text-white border border-white/30 hover:border-white/50 hover:bg-white/5 rounded-full backdrop-blur-sm transition-all duration-300 overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity duration-300" aria-hidden="true"></div>
                <div className="absolute -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" aria-hidden="true" />
                <span className="relative z-10 flex items-center justify-center">Explore Solutions
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Enhanced Features display */}
          <motion.div 
            className="mt-12 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {optimizedFeatures.map((feature, index) => (
                <EnhancedFeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color as "red" | "blue" | "green" | "purple"}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Logo */}
        <motion.div
          className="flex-1 h-[300px] w-full flex items-center justify-center mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative h-full w-full max-w-lg">
            {/* Logo Container with RGB Effects */}
            <div className="h-full flex flex-col items-center justify-center relative">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Outer glow effect */}
                <div className="absolute inset-0 bg-black/20 blur-[180px] rounded-full transform scale-[2]" aria-hidden="true" />
                
                {/* Logo and text container */}
                <div className="relative flex flex-col items-center">
                  {/* Brain icon with glow */}
                  <div className="relative scale-[1.3] md:scale-[1.6]">
                    {/* Multiple layered glows */}
                    <div className="absolute inset-0 bg-red-900/10 blur-[40px] rounded-[20px] animate-pulse-slow" aria-hidden="true" />
                    <div className="absolute inset-0 bg-red-800/20 blur-[30px] rounded-[20px] animate-pulse-medium" aria-hidden="true" />
                    <div className="absolute inset-0 bg-red-700/30 blur-[20px] rounded-[20px] animate-pulse-fast" aria-hidden="true" />
                    
                    {/* Neural network lines */}
                    <div className="absolute inset-0 opacity-50 scale-[1.2]" aria-hidden="true">
                      <div className="absolute h-[1px] w-8 bg-gradient-to-r from-transparent via-red-800 to-transparent top-1/4 -left-3 animate-neural-1" />
                      <div className="absolute h-[1px] w-8 bg-gradient-to-r from-transparent via-red-800 to-transparent bottom-1/4 -right-3 animate-neural-2" />
                      <div className="absolute w-[1px] h-8 bg-gradient-to-b from-transparent via-red-800 to-transparent -top-3 left-1/4 animate-neural-3" />
                      <div className="absolute w-[1px] h-8 bg-gradient-to-b from-transparent via-red-800 to-transparent -bottom-3 right-1/4 animate-neural-4" />
                    </div>

                    {/* Enhanced Brain icon with RGB border */}
                    <div className="relative z-10 group animate-heartbeat">
                      {/* RGB Border Container */}
                      <div className="absolute -inset-[2px] rounded-[20px]" aria-hidden="true">
                        {/* Moving RGB gradient border */}
                        <div className="absolute inset-[-2px] rounded-[20px] animate-rgb-spin group-hover:animate-rgb-spin-fast">
                          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)] rounded-[20px] group-hover:bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)]" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-[20px] animate-border-flow group-hover:animate-border-flow-fast" />
                        <div className="absolute inset-0 rounded-[20px] bg-black">
                          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#8B000030] via-[#42000030] to-[#69000030] animate-rgb-spin-reverse group-hover:animate-rgb-spin-reverse-fast group-hover:from-[#8B000050] group-hover:via-[#42000050] group-hover:to-[#69000050]" />
                        </div>
                      </div>
                      
                      {/* Icon container */}
                      <div className="relative bg-black rounded-[20px] p-8 md:p-10 transition-transform duration-300 group-hover:scale-[0.98]">
                        <Image 
                          src="/images/brain.svg" 
                          alt="Mindscape Brain Logo"
                          className="h-14 w-14 md:h-24 md:w-24 transform transition-all duration-300 group-hover:scale-[0.98] animate-logo-pulse"
                          width={96}
                          height={96}
                          loading="eager"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-[20px] pointer-events-none scale-[1.3]" aria-hidden="true">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-particle-2 bottom-[20%] right-[20%]" />
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-particle-3 top-[50%] right-[30%]" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Main Hero Component
export default function HyperHero() {
  const [complexity, setComplexity] = useState(1)
  const [speed, setSpeed] = useState(1)
  const [activeModel, setActiveModel] = useState("neural")
  const [showText, setShowText] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [has3DError, setHas3DError] = useState(false)
  const [use3D, setUse3D] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [randomValues, setRandomValues] = useState<number[] | null>(null)
  const [triggerAnimation, setTriggerAnimation] = useState(false)

  const router = useRouter()
  const { isMobile } = useResponsiveDevice()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  
  // Handle contact form navigation - memoized to prevent recreating on every render
  const handleGetStartedClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    navigateToContactForm("ai-analytics", "Main Hero Get Started Request")
  }, [])

  // Define optimized features for mobile view - memoized to prevent recreating on every render
  const optimizedFeatures = useMemo(() => [
    {
      title: "Natural Language",
      description: "Advanced NLP for text analysis and generation",
      color: "blue",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Computer Vision",
      description: "Image and video analysis with deep learning",
      color: "purple",
      icon: <Shapes className="h-4 w-4" />,
    },
    {
      title: "Predictive Models",
      description: "Data-driven forecasting and analytics",
      color: "indigo",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Knowledge Base",
      description: "Enterprise data integration and context",
      color: "cyan",
      icon: <Database className="h-4 w-4" />,
    },
  ], [])

  // Generate random values for the grid - implemented
  useEffect(() => {
    // Generate random grid values for visual effect
    const values = Array.from({ length: 16 }, () => Math.random())
    setRandomValues(values)
    
    // Handle 3D rendering error recovery
    const handleError = () => {
      console.warn('Error in 3D rendering, falling back to non-3D mode')
      setHas3DError(true)
      setUse3D(false)
    }
    
    // Add event listeners for 3D errors
    window.addEventListener('webglcontextlost', handleError)
    window.addEventListener('error', (e) => {
      if (e.message?.includes('WebGL') || e.message?.includes('three')) {
        handleError()
      }
    })
    
    return () => {
      window.removeEventListener('webglcontextlost', handleError)
    }
  }, [])

  // Add intersection observer to trigger animations when in view
  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            setTriggerAnimation(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )

      const heroElement = document.getElementById("mobile-hero")
      if (heroElement) observer.observe(heroElement)

      return () => {
        if (heroElement) observer.unobserve(heroElement)
      }
    }
  }, [isMobile])

  // Mobile view component with additional error handling
  const MobileView = useMemo(() => {
    if (!isMobile) return null
    
    // Create special grid for mobile performance
    const gridElements = Array.from({ length: 15 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-r from-white/10 to-transparent"
        style={{
          width: `${5 + Math.random() * 10}px`,
          height: `${5 + Math.random() * 10}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.1 + Math.random() * 0.2,
          transform: `scale(${0.5 + Math.random()})`,
        }}
      />
    ))
    
    return (
      <section 
        id="mobile-hero"
        className="relative w-full overflow-hidden bg-gradient-to-b from-background via-background to-background/80 pt-16 pb-20"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Performance optimized background for mobile */}
          <div className="absolute top-1/4 left-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 h-56 w-56 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 h-48 w-48 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 blur-3xl" />
          
          {/* Static grid pattern instead of animated elements for better performance */}
          {gridElements}
        </div>

        {/* Rest of the mobile content */}
        <div className="relative z-10 mx-auto max-w-screen-sm px-6">
          {/* Logo section */}
          <motion.div 
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={triggerAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center rounded-full bg-background/90 p-2 shadow-lg ring-1 ring-white/10">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={triggerAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Enterprise AI Platform for <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Every Industry</span>
          </motion.h1>

          {/* Badges */}
          <motion.div 
            className="mt-4 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={triggerAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge variant="secondary" className="border-0 bg-white/5 backdrop-blur-sm">
              <Sparkles className="mr-1 h-3 w-3 text-yellow-500" /> AI-Powered
            </Badge>
            <Badge variant="secondary" className="border-0 bg-white/5 backdrop-blur-sm">
              <Lock className="mr-1 h-3 w-3 text-green-500" /> Enterprise Ready
            </Badge>
            <Badge variant="secondary" className="border-0 bg-white/5 backdrop-blur-sm">
              <Shield className="mr-1 h-3 w-3 text-blue-500" /> Secure
            </Badge>
          </motion.div>

          {/* Feature cards */}
          <motion.div 
            className="mt-8 grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={triggerAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {optimizedFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col rounded-lg border border-border/40 bg-background/50 p-3 shadow-sm backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-background/60 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={triggerAnimation ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <div className={`mb-2 self-start rounded-full bg-${feature.color}-500/10 p-1.5 text-${feature.color}-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-sm font-medium">{feature.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA section */}
          <motion.div 
            className="mt-8 flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={triggerAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
              asChild
            >
              <Link href="/dashboard" className="relative z-10">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
              asChild
            >
              <Link href="/contact">
                Contact Sales
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }, [isMobile, triggerAnimation, optimizedFeatures])

  // Log component render for debugging
  useEffect(() => {
    console.log('HyperHero rendered, mobile view:', isMobile)
  }, [isMobile])

  // If mobile view, render mobile component
  if (isMobile) {
    return MobileView
  }

  // Desktop view rendered only when needed
  return (
    <motion.section
      id="hyper-hero"
      style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, -50]) }}
      className="relative w-full overflow-hidden bg-background pb-32 pt-20"
      aria-label="Enterprise AI Platform Hero Section"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80" aria-hidden="true" />
      
      {/* Animated particles for added depth */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[15%] left-[20%] w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-gradient-to-r from-red-900/20 to-transparent blur-[60px] md:blur-[80px] animate-float-slow" />
        <div className="absolute bottom-[25%] right-[15%] w-[120px] md:w-[150px] h-[120px] md:h-[150px] rounded-full bg-gradient-to-r from-red-800/10 to-transparent blur-[40px] md:blur-[60px] animate-float-medium" />
        <div className="absolute top-[60%] left-[15%] w-[80px] md:w-[100px] h-[80px] md:h-[100px] rounded-full bg-gradient-to-r from-red-700/15 to-transparent blur-[30px] md:blur-[40px] animate-float-fast" />
        
        {/* Additional floating elements */}
        <div className="absolute bottom-[42%] left-[35%] w-[60px] h-[60px] rounded-full bg-gradient-to-r from-red-600/10 to-transparent blur-[25px] animate-float-medium" />
        <div className="absolute top-[35%] right-[28%] w-[50px] h-[50px] rounded-full bg-gradient-to-r from-red-500/15 to-transparent blur-[20px] animate-float-fast" />
      </div>

      {/* Main Content */}
      <DesktopHeroContent 
        y={y} 
        optimizedFeatures={optimizedFeatures} 
        handleGetStartedClick={handleGetStartedClick}
      />
      
      {/* Stats banner at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black via-black/95 to-black backdrop-blur-sm border-t border-white/5 py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-2">
              <div className="text-red-500 font-bold text-lg">99.9%</div>
              <div className="text-sm text-white/70">Platform Uptime</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-green-500 font-bold text-lg">10ms</div>
              <div className="text-sm text-white/70">Response Time</div>
            </div>
            <div className="flex items-center space-x-2 hidden md:flex">
              <div className="text-blue-500 font-bold text-lg">500+</div>
              <div className="text-sm text-white/70">Enterprise Clients</div>
            </div>
          </div>
          <div className="text-white/70 flex items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Shield className="h-4 w-4 mr-2 text-red-400" aria-hidden="true" />
            <span className="text-sm">Enterprise-grade security</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Icon Components
const Target = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )

const Building = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )

const Activity = (props: React.SVGProps<SVGSVGElement>) => (
    <ActivityIcon {...props} />
  )

const CustomHeadphonesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  )

const styles = `
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }

  @keyframes pulse-medium {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }

  @keyframes pulse-fast {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.15); }
  }

  @keyframes neural-1 {
    0% { transform: translateX(-10px) scaleX(0.5); opacity: 0; }
    50% { transform: translateX(0) scaleX(1); opacity: 1; }
    100% { transform: translateX(10px) scaleX(0.5); opacity: 0; }
  }

  @keyframes neural-2 {
    0% { transform: translateX(10px) scaleX(0.5); opacity: 0; }
    50% { transform: translateX(0) scaleX(1); opacity: 1; }
    100% { transform: translateX(-10px) scaleX(0.5); opacity: 0; }
  }

  @keyframes neural-3 {
    0% { transform: translateY(-10px) scaleY(0.5); opacity: 0; }
    50% { transform: translateY(0) scaleY(1); opacity: 1; }
    100% { transform: translateY(10px) scaleY(0.5); opacity: 0; }
  }

  @keyframes neural-4 {
    0% { transform: translateY(10px) scaleY(0.5); opacity: 0; }
    50% { transform: translateY(0) scaleY(1); opacity: 1; }
    100% { transform: translateY(-10px) scaleY(0.5); opacity: 0; }
  }

  @keyframes particle-1 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(5px, -5px); }
    50% { transform: translate(10px, 0); }
    75% { transform: translate(5px, 5px); }
  }

  @keyframes particle-2 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-5px, 5px); }
    50% { transform: translate(-10px, 0); }
    75% { transform: translate(-5px, -5px); }
  }

  @keyframes particle-3 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-3px, -3px); }
    50% { transform: translate(0, -6px); }
    75% { transform: translate(3px, -3px); }
  }

  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }

  .animate-pulse-medium {
    animation: pulse-medium 2.5s ease-in-out infinite;
  }

  .animate-pulse-fast {
    animation: pulse-fast 2s ease-in-out infinite;
  }

  .animate-neural-1 {
    animation: neural-1 3s ease-in-out infinite;
  }

  .animate-neural-2 {
    animation: neural-2 3s ease-in-out infinite;
    animation-delay: 0.5s;
  }

  .animate-neural-3 {
    animation: neural-3 3s ease-in-out infinite;
    animation-delay: 1s;
  }

  .animate-neural-4 {
    animation: neural-4 3s ease-in-out infinite;
    animation-delay: 1.5s;
  }

  .animate-particle-1 {
    animation: particle-1 4s ease-in-out infinite;
  }

  .animate-particle-2 {
    animation: particle-2 4s ease-in-out infinite;
    animation-delay: 1s;
  }

  .animate-particle-3 {
    animation: particle-3 4s ease-in-out infinite;
    animation-delay: 2s;
  }

  @keyframes rgb-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rgb-spin-reverse {
    100% {
      transform: rotate(0deg);
    }
    0% {
      transform: rotate(360deg);
    }
  }

  @keyframes border-flow {
    0% {
      transform: translateX(-200%) rotate(45deg);
      opacity: 0;
    }
    30%, 70% {
      opacity: 1;
    }
    100% {
      transform: translateX(200%) rotate(45deg);
      opacity: 0;
    }
  }

  .animate-rgb-spin {
    animation: rgb-spin 4s linear infinite;
  }

  .animate-rgb-spin-reverse {
    animation: rgb-spin-reverse 4s linear infinite;
  }

  .animate-border-flow {
    animation: border-flow 2s linear infinite;
  }

  @keyframes rgb-spin-fast {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rgb-spin-reverse-fast {
    100% {
      transform: rotate(0deg);
    }
    0% {
      transform: rotate(360deg);
    }
  }

  @keyframes border-flow-fast {
    0% {
      transform: translateX(-200%) rotate(45deg);
      opacity: 0;
    }
    30%, 70% {
      opacity: 1;
    }
    100% {
      transform: translateX(200%) rotate(45deg);
      opacity: 0;
    }
  }

  .animate-rgb-spin-fast {
    animation: rgb-spin-fast 2s linear infinite;
  }

  .animate-rgb-spin-reverse-fast {
    animation: rgb-spin-reverse-fast 2s linear infinite;
  }

  .animate-border-flow-fast {
    animation: border-flow-fast 1s linear infinite;
  }

  .will-change-transform {
    will-change: transform;
  }

  .transition-transform {
    transition: transform 0.3s ease;
  }

  @keyframes blink-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .animate-blink-pulse {
    animation: blink-pulse 2s ease-in-out infinite;
  }

  @keyframes enhanced-pulse {
    0% { 
      filter: drop-shadow(0 0 2px rgba(255, 0, 0, 0.5)) brightness(0.9);
      transform: scale(1);
    }
    50% { 
      filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.8)) brightness(1.2); 
      transform: scale(1.05);
    }
    100% { 
      filter: drop-shadow(0 0 2px rgba(255, 0, 0, 0.5)) brightness(0.9);
      transform: scale(1);
    }
  }

  .animate-enhanced-pulse {
    animation: enhanced-pulse 1.5s ease-in-out infinite;
  }

  @keyframes heartbeat {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }

  .animate-heartbeat {
    animation: heartbeat 1s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes float-slow {
    0% { transform: translate(0, 0); }
    50% { transform: translate(0, -8px); }
    100% { transform: translate(0, 0); }
  }

  @keyframes float-medium {
    0% { transform: translate(0, 0); }
    50% { transform: translate(4px, -6px); }
    100% { transform: translate(0, 0); }
  }

  @keyframes float-fast {
    0% { transform: translate(0, 0); }
    50% { transform: translate(-3px, -4px); }
    100% { transform: translate(0, 0); }
  }

  .animate-float-slow {
    animation: float-slow 4s ease-in-out infinite;
  }

  .animate-float-medium {
    animation: float-medium 3s ease-in-out infinite;
  }

  .animate-float-fast {
    animation: float-fast 2.5s ease-in-out infinite;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes fade-up {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in-1 {
    animation: fade-in 0.5s ease-out forwards;
    animation-delay: 0.1s;
    opacity: 0;
  }
  
  .animate-fade-in-2 {
    animation: fade-in 0.5s ease-out forwards;
    animation-delay: 0.2s;
    opacity: 0;
  }
  
  .animate-fade-in-3 {
    animation: fade-in 0.5s ease-out forwards;
    animation-delay: 0.3s;
    opacity: 0;
  }
  
  .animate-fade-up {
    animation: fade-up 0.6s ease-out forwards;
    animation-delay: 0.2s;
    opacity: 0;
  }
  
  .animate-fade-up-2 {
    animation: fade-up 0.6s ease-out forwards;
    animation-delay: 0.4s;
    opacity: 0;
  }
  
  .animate-fade-up-3 {
    animation: fade-up 0.6s ease-out forwards;
    animation-delay: 0.6s;
    opacity: 0;
  }
  
  .animate-slide-up-1 {
    animation: slide-up 0.5s ease-out forwards;
    animation-delay: 0.3s;
    opacity: 0;
  }
  
  .animate-slide-up-2 {
    animation: slide-up 0.5s ease-out forwards;
    animation-delay: 0.4s;
    opacity: 0;
  }
  
  .animate-slide-up-3 {
    animation: slide-up 0.5s ease-out forwards;
    animation-delay: 0.5s;
    opacity: 0;
  }
  
  .animate-slide-up-4 {
    animation: slide-up 0.5s ease-out forwards;
    animation-delay: 0.6s;
    opacity: 0;
  }

  @keyframes pulse {
    0% {
      filter: invert(1) sepia(1) saturate(3000%) hue-rotate(0deg) brightness(0.3) contrast(1);
    }
    50% {
      filter: invert(1) sepia(1) saturate(3000%) hue-rotate(0deg) brightness(0.5) contrast(1);
    }
    100% {
      filter: invert(1) sepia(1) saturate(3000%) hue-rotate(0deg) brightness(0.3) contrast(1);
    }
  }
`


