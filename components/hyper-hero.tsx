"use client"

import React from "react"
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
import { useToast } from "@/hooks/use-toast"
import MindscapeLogo from "@/components/mindscape-logo"
import { Input } from "@/components/ui/input"
import { TypeAnimation } from 'react-type-animation'
import Link from "next/link"
import Image from "next/image"
import { FlexibleSection } from "@/components/flexible-section"

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
  const { toast } = useToast()

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
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste the code in your project",
    })
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
            <FileCode2 className="h-4 w-4 mr-1" />
            <span>Copy code</span>
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

// Update interface for HyperHero with fullWidth prop
interface HyperHeroProps {
  fullWidth?: boolean;
}

// Define optimizedFeatures array
interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: FeatureColors;
}

const optimizedFeatures: FeatureItem[] = [
  {
    id: "feature-1",
    icon: <Brain className="h-5 w-5" />,
    title: "AI-Powered Analytics",
    description: "Real-time insights and predictions for your data",
    color: "red"
  },
  {
    id: "feature-2",
    icon: <Shield className="h-5 w-5" />,
    title: "Enterprise Security",
    description: "SOC 2 certified with end-to-end encryption",
    color: "blue"
  },
  {
    id: "feature-3",
    icon: <Zap className="h-5 w-5" />,
    title: "Real-time Processing",
    description: "Process and analyze data as it arrives",
    color: "green"
  },
  {
    id: "feature-4",
    icon: <Target className="h-5 w-5" />,
    title: "Precision Targeting",
    description: "Reach your ideal customers with AI precision",
    color: "purple"
  }
];

// Main Hero Component
export default function HyperHero({ fullWidth = true }: HyperHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Custom progress for 3D scene animation
  const { scrollYProgress: scene3DProgress } = useScroll({
    offset: ["start start", "center start"],
  })

  // For animated background effects
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Handle Get Started button click
  const handleGetStartedClick = () => {
    navigateToContactForm();
  }

  // Reactive isMobile state
  const isMobile = useMobile()
  
  return (
    <div className="relative pt-28 pb-[10px] md:pb-20 overflow-hidden min-h-[calc(100vh-30px)] md:min-h-screen flex flex-col justify-start w-full">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/85" />
      
      {/* Main Content */}
      <FlexibleSection 
        fullWidth={fullWidth} 
        className="relative z-10 w-full" 
        noPadding={false}
      >
        <div className="flex flex-col lg:flex-row items-center gap-5 md:gap-8 w-full px-0 md:px-5">
          {/* Left Column - Content */}
          <motion.div
            className="flex-1 space-y-3 md:space-y-5 relative w-full pl-0 md:pl-5 pr-0 md:pr-5"
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
              <Badge className="bg-gradient-to-r from-red-800/30 to-red-800/10 text-red-400 border-red-800/30 hover:bg-red-800/20 transition-colors duration-300 text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 animate-[pulse_2s_ease-in-out_infinite]" />
                Enterprise AI
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/30 to-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20 transition-colors duration-300 text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1">
                <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 animate-[pulse_2.5s_ease-in-out_infinite]" />
                SOC 2
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500/30 to-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20 transition-colors duration-300 text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1">
                <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 animate-[pulse_3s_ease-in-out_infinite]" />
                Real-time
              </Badge>
            </motion.div>

            {/* Title Section - refined spacing */}
            <motion.div
              className="space-y-2 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                <span className="text-white relative z-10">Unlock Next-Gen Intelligence with</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600 relative">
                  Enterprise AI Solutions
                </span>
              </h1>
              <p className="text-base md:text-lg text-white/80 mt-3 max-w-xl">
                Accelerate innovation with our end-to-end AI platform that delivers powerful insights, automates workflows, and drives tangible business outcomes.
              </p>
            </motion.div>

            {/* Logo for mobile only - inserted between heading and CTA */}
            <motion.div
              className="lg:hidden h-[220px] w-full flex items-center justify-center my-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative h-full w-full max-w-[230px]">
                {/* Logo Container with RGB Effects */}
                <div className="h-full flex flex-col items-center justify-center relative">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Outer glow effect */}
                    <div className="absolute inset-0 bg-black/20 blur-[180px] rounded-full transform scale-[2]" />
                    
                    {/* Logo and text container */}
                    <div className="relative flex flex-col items-center">
                      {/* Brain icon with glow */}
                      <div className="relative scale-[1.2] md:scale-[1.6]">
                        {/* Multiple layered glows */}
                        <div className="absolute inset-0 bg-red-900/10 blur-[50px] rounded-[20px] animate-pulse-slow scale-110" />
                        <div className="absolute inset-0 bg-red-800/20 blur-[40px] rounded-[20px] animate-pulse-medium scale-110" />
                        <div className="absolute inset-0 bg-red-700/30 blur-[30px] rounded-[20px] animate-pulse-fast scale-110" />
                        
                        {/* Neural network lines */}
                        <div className="absolute inset-0 opacity-50 scale-[1.2]">
                          <div className="absolute h-[1px] w-10 bg-gradient-to-r from-transparent via-red-800 to-transparent top-1/4 -left-4 animate-neural-1" />
                          <div className="absolute h-[1px] w-10 bg-gradient-to-r from-transparent via-red-800 to-transparent bottom-1/4 -right-4 animate-neural-2" />
                          <div className="absolute w-[1px] h-10 bg-gradient-to-b from-transparent via-red-800 to-transparent -top-4 left-1/4 animate-neural-3" />
                          <div className="absolute w-[1px] h-10 bg-gradient-to-b from-transparent via-red-800 to-transparent -bottom-4 right-1/4 animate-neural-4" />
                        </div>

                        {/* Enhanced Brain icon with RGB border */}
                        <div className="relative z-10 group animate-heartbeat">
                          {/* RGB Border Container */}
                          <div className="absolute -inset-[2px] rounded-[20px]">
                            {/* Moving RGB gradient border */}
                            <div className="absolute inset-[-2px] rounded-[20px] animate-rgb-spin group-hover:animate-rgb-spin-fast">
                              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)] rounded-[20px] group-hover:bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)]" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-[20px] animate-border-flow group-hover:animate-border-flow-fast" />
                            <div className="absolute inset-0 rounded-[20px] bg-black/95">
                              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#8B000030] via-[#42000030] to-[#69000030] animate-rgb-spin-reverse group-hover:animate-rgb-spin-reverse-fast group-hover:from-[#8B000050] group-hover:via-[#42000050] group-hover:to-[#69000050]" />
                            </div>
                          </div>
                          
                          {/* Icon container */}
                          <div className="relative bg-black rounded-[20px] p-6 md:p-9 transition-transform duration-300 group-hover:scale-[0.98]">
                            <Image 
                              src="/images/brain.svg" 
                              alt="Mindscape Brain Logo"
                              className="h-20 w-20 md:h-28 md:w-28 transform transition-all duration-300 group-hover:scale-[0.98] animate-brain-pulse-enhanced"
                              width={80}
                              height={80}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons - refined spacing */}
            <motion.div
              className="flex flex-row items-center justify-center md:justify-start gap-3 md:gap-4 pt-2 md:pt-6 md:pb-2 md:max-w-3xl md:mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button 
                size="sm" 
                className="group relative px-3 sm:px-5 py-1.5 sm:py-3 md:px-7 md:py-4 text-xs sm:text-base md:text-lg font-semibold text-white rounded-full hover:brightness-110 transition-all duration-300 overflow-hidden shadow-md"
                onClick={handleGetStartedClick}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 group-hover:from-red-600 group-hover:via-red-500 group-hover:to-red-600 transition-all duration-500 rounded-full"></div>
                <div className="absolute -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                <span className="relative z-10 flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-1 sm:ml-2 md:ml-3 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Link href="/services">
                <Button
                  size="sm"
                  variant="outline"
                  className="group relative px-3 sm:px-5 py-1.5 sm:py-3 md:px-7 md:py-4 text-xs sm:text-base md:text-lg font-semibold text-white border border-white/30 hover:border-white/50 hover:bg-white/5 rounded-full backdrop-blur-sm transition-all duration-300 overflow-hidden shadow-sm"
                >
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity duration-300"></div>
                  <div className="absolute -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                  <span className="relative z-10 flex items-center justify-center">Solutions
                    <ArrowRight className="ml-1 sm:ml-1.5 md:ml-3 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </motion.div>

            {/* Enhanced Features display - improved spacing and layout */}
            <motion.div 
              className="mt-10 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Desktop Features (hide on small screens) */}
              <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-3">
                {optimizedFeatures.map((feature: FeatureItem, index: number) => (
                  <EnhancedFeatureCard
                    key={feature.id}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    color={feature.color}
                    index={index}
                  />
                ))}
              </div>
              
              {/* Mobile Features (single row, compact) */}
              <div className="md:hidden flex justify-center w-full overflow-x-auto space-x-3 pb-2 scrollbar-hide px-2 mx-auto">
                {optimizedFeatures.map((feature: FeatureItem, index: number) => (
                  <div
                    key={feature.id}
                    className={`relative rounded-lg border border-${feature.color}-900/30 bg-gradient-to-b from-${feature.color}-950/40 to-${feature.color}-900/20 backdrop-blur-sm p-2.5 flex flex-col items-center text-center min-w-[75px] flex-shrink-0 shadow-sm`}
                  >
                    <div className={`p-1.5 rounded-lg inline-flex bg-gradient-to-b from-${feature.color}-800/30 to-${feature.color}-900/20 text-${feature.color}-400 mb-1.5`}>
                      {React.cloneElement(feature.icon as React.ReactElement, { className: 'h-4 w-4' })}
                    </div>
                    <h3 className="text-white text-[11px] font-medium">{feature.title.split(' ')[0]}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Logo (hidden on mobile) */}
          <motion.div
            className="hidden lg:flex flex-1 h-[300px] w-full items-center justify-center mt-8 lg:mt-0"
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
                  <div className="absolute inset-0 bg-black/20 blur-[180px] rounded-full transform scale-[2]" />
                  
                  {/* Logo and text container */}
                  <div className="relative flex flex-col items-center">
                    {/* Brain icon with glow */}
                    <div className="relative scale-[1.35] md:scale-[1.6]">
                      {/* Multiple layered glows */}
                      <div className="absolute inset-0 bg-red-900/10 blur-[50px] rounded-[20px] animate-pulse-slow scale-110" />
                      <div className="absolute inset-0 bg-red-800/20 blur-[40px] rounded-[20px] animate-pulse-medium scale-110" />
                      <div className="absolute inset-0 bg-red-700/30 blur-[30px] rounded-[20px] animate-pulse-fast scale-110" />
                      
                      {/* Neural network lines */}
                      <div className="absolute inset-0 opacity-50 scale-[1.2]">
                        <div className="absolute h-[1px] w-10 bg-gradient-to-r from-transparent via-red-800 to-transparent top-1/4 -left-4 animate-neural-1" />
                        <div className="absolute h-[1px] w-10 bg-gradient-to-r from-transparent via-red-800 to-transparent bottom-1/4 -right-4 animate-neural-2" />
                        <div className="absolute w-[1px] h-10 bg-gradient-to-b from-transparent via-red-800 to-transparent -top-4 left-1/4 animate-neural-3" />
                        <div className="absolute w-[1px] h-10 bg-gradient-to-b from-transparent via-red-800 to-transparent -bottom-4 right-1/4 animate-neural-4" />
                      </div>

                      {/* Enhanced Brain icon with RGB border */}
                      <div className="relative z-10 group animate-heartbeat">
                        {/* RGB Border Container */}
                        <div className="absolute -inset-[2px] rounded-[20px]">
                          {/* Moving RGB gradient border */}
                          <div className="absolute inset-[-2px] rounded-[20px] animate-rgb-spin group-hover:animate-rgb-spin-fast">
                            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)] rounded-[20px] group-hover:bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)]" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-[20px] animate-border-flow group-hover:animate-border-flow-fast" />
                          <div className="absolute inset-0 rounded-[20px] bg-black/95">
                            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#8B000030] via-[#42000030] to-[#69000030] animate-rgb-spin-reverse group-hover:animate-rgb-spin-reverse-fast group-hover:from-[#8B000050] group-hover:via-[#42000050] group-hover:to-[#69000050]" />
                          </div>
                        </div>
                        
                        {/* Icon container */}
                        <div className="relative bg-black rounded-[20px] p-7 md:p-9 transition-transform duration-300 group-hover:scale-[0.98]">
                          <Image 
                            src="/images/brain.svg" 
                            alt="Mindscape Brain Logo"
                            className="h-20 w-20 md:h-28 md:w-28 transform transition-all duration-300 group-hover:scale-[0.98] animate-brain-pulse-enhanced"
                            width={80}
                            height={80}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Floating particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-[20px] pointer-events-none scale-[1.3]">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-particle-2 bottom-[20%] right-[20%]" />
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-particle-3 top-[50%] right-[30%]" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </FlexibleSection>
      
      {/* Stats banner at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-r from-black via-black/95 to-black backdrop-blur-sm border-t border-white/5 py-3 hidden md:block">
        <FlexibleSection 
          fullWidth={fullWidth} 
          className="w-full"
          noPadding={false}
        >
          <div className="flex justify-end items-center w-full">
            <div className="text-white/70 flex items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Shield className="h-4 w-4 mr-2 text-red-400" />
              <span className="text-sm">Enterprise-grade security</span>
            </div>
          </div>
        </FlexibleSection>
      </div>
    </div>
  )
}

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
  
  @keyframes svg-blink {
    0% { 
      filter: brightness(1) drop-shadow(0 0 5px rgba(220, 38, 38, 0.5));
      opacity: 0.85;
    }
    50% { 
      filter: brightness(1.5) drop-shadow(0 0 15px rgba(220, 38, 38, 0.9));
      opacity: 1;
    }
    100% { 
      filter: brightness(1) drop-shadow(0 0 5px rgba(220, 38, 38, 0.5));
      opacity: 0.85;
    }
  }
  
  .animate-svg-blink {
    animation: svg-blink 1.5s ease-in-out infinite;
  }

  @keyframes brain-pulse {
    0% { 
      filter: brightness(1) drop-shadow(0 0 3px rgba(255, 0, 0, 0.7));
      transform: scale(1);
    }
    25% {
      filter: brightness(1.3) drop-shadow(0 0 8px rgba(255, 0, 0, 0.8));
      transform: scale(1.04);
    }
    50% { 
      filter: brightness(1.5) drop-shadow(0 0 12px rgba(255, 0, 0, 0.9));
      transform: scale(1.08);
    }
    75% {
      filter: brightness(1.3) drop-shadow(0 0 8px rgba(255, 0, 0, 0.8));
      transform: scale(1.04);
    }
    100% { 
      filter: brightness(1) drop-shadow(0 0 3px rgba(255, 0, 0, 0.7));
      transform: scale(1);
    }
  }
  
  .animate-brain-pulse {
    animation: brain-pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    will-change: filter, transform;
  }

  @keyframes brain-pulse-enhanced {
    0% { 
      filter: brightness(1) drop-shadow(0 0 5px rgba(255, 0, 0, 0.7));
      transform: scale(1);
    }
    25% {
      filter: brightness(1.4) drop-shadow(0 0 12px rgba(255, 0, 0, 0.85));
      transform: scale(1.05);
    }
    50% { 
      filter: brightness(1.8) drop-shadow(0 0 18px rgba(255, 0, 0, 1));
      transform: scale(1.1);
    }
    75% {
      filter: brightness(1.4) drop-shadow(0 0 12px rgba(255, 0, 0, 0.85));
      transform: scale(1.05);
    }
    100% { 
      filter: brightness(1) drop-shadow(0 0 5px rgba(255, 0, 0, 0.7));
      transform: scale(1);
    }
  }

  @keyframes svg-pulse-intense {
    0% { 
      filter: brightness(1) drop-shadow(0 0 8px rgba(255, 0, 0, 0.7));
      transform: scale(1);
      opacity: 0.9;
    }
    50% { 
      filter: brightness(1.6) drop-shadow(0 0 20px rgba(255, 0, 0, 1));
      transform: scale(1.12);
      opacity: 1;
    }
    100% { 
      filter: brightness(1) drop-shadow(0 0 8px rgba(255, 0, 0, 0.7));
      transform: scale(1);
      opacity: 0.9;
    }
  }

  .animate-brain-pulse-enhanced {
    animation: brain-pulse-enhanced 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    will-change: filter, transform;
  }

  .animate-svg-pulse-intense {
    animation: svg-pulse-intense 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    will-change: filter, transform, opacity;
  }
`


