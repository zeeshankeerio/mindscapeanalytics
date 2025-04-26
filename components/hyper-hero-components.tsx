"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Code,
  FileCode2,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Feature Card Component
export function FeatureCard({
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
export function StatCard({
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
export function InteractiveDemoCard({
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
export function AIFeatureCard({
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
export function AICodeCard({ delay = 0 }) {
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
export function AITerminalCard({ delay = 0 }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [commandIndex, setCommandIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const commands = [
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
  ]

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

// EnhancedFeatureCard component for improved feature presentation
export function EnhancedFeatureCard({
  icon,
  title,
  description,
  color = "red",
  index = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: "red" | "blue" | "green" | "purple"
  index: number
}) {
  const colorMap = {
    red: "from-red-600/20 to-red-900/10 border-red-800/30 group-hover:border-red-600/50 text-red-500",
    blue: "from-blue-600/20 to-blue-900/10 border-blue-800/30 group-hover:border-blue-600/50 text-blue-500",
    green: "from-green-600/20 to-green-900/10 border-green-800/30 group-hover:border-green-600/50 text-green-500",
    purple: "from-purple-600/20 to-purple-900/10 border-purple-800/30 group-hover:border-purple-600/50 text-purple-500",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2 + (index * 0.1),
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`group relative p-5 rounded-xl backdrop-blur-md border border-white/10 hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-br ${colorMap[color]}`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 h-px w-6 bg-gradient-to-l from-current to-transparent"></div>
        <div className="absolute top-0 right-0 h-6 w-px bg-gradient-to-b from-current to-transparent"></div>
      </div>
      
      <div className="space-y-4">
        {/* Icon with glowing effect */}
        <div className="relative flex">
          <div className={`p-2.5 rounded-lg bg-black/30 backdrop-blur-sm text-current flex items-center justify-center relative z-10 group-hover:scale-110 transform transition-transform duration-300`}>
            <div className="absolute inset-0 rounded-lg bg-current opacity-10 group-hover:opacity-20 transition-opacity"></div>
            {icon}
          </div>
          <div className="absolute -inset-1 bg-current opacity-0 blur-xl group-hover:opacity-10 transition-opacity duration-300 rounded-full" />
        </div>
        
        {/* Content */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1 group-hover:text-current transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
} 