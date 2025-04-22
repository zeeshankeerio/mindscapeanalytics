import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Database, Brain, Zap, Rocket, Clock, ExternalLink, Play, Star, Shield, Activity, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

// Define proper types for all projects
interface BaseProject {
  title: string
  description: string
  category: string
  icon: React.ComponentType<any>
  features: string[]
  status: string
  techStack: string[]
  progress: number
}

interface CurrentProject extends BaseProject {
  href: string
  demo: string
  demoType: 'video' | 'iframe' | 'external'
}

interface UpcomingProject extends BaseProject {
  launchDate: string
}

// Current projects with proper typing
const currentProjects: CurrentProject[] = [
  {
    title: "ContentForge",
    description: "AI-powered content creation platform for digital marketers",
    category: "AI Content Generation",
    icon: Brain,
    href: "/projects/contentforge",
    features: ["One-Click Generation", "SEO Optimization", "Multi-Platform Support"],
    status: "Alpha Testing",
    demo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    demoType: "iframe",
    techStack: ["Next.js", "OpenAI", "TailwindCSS"],
    progress: 85
  },
  {
    title: "Blockchain Platform",
    description: "Enterprise-grade blockchain solution with DeFi and NFT capabilities",
    category: "Blockchain",
    icon: Database,
    href: "/solutions/blockchain",
    features: ["Smart Contracts", "Cross-Chain Support", "NFT Marketplace"],
    status: "Beta",
    demo: "https://demo.blockchain.com",
    demoType: "external",
    techStack: ["Solidity", "Ethereum", "IPFS"],
    progress: 70
  },
  {
    title: "AI Analytics",
    description: "Advanced analytics platform powered by machine learning",
    category: "Data Analytics",
    icon: Code,
    href: "/solutions/genai",
    features: ["Real-time Processing", "Predictive Analytics", "Custom Dashboards"],
    status: "Live",
    demo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    demoType: "iframe",
    techStack: ["Python", "TensorFlow", "React"],
    progress: 100
  }
]

// Upcoming projects with proper typing
const upcomingProjects: UpcomingProject[] = [
  {
    title: "Quantum AI",
    description: "Next-generation quantum computing platform for AI applications",
    category: "Quantum Computing",
    icon: Rocket,
    features: ["Quantum ML", "Hybrid Algorithms", "Secure Computing"],
    status: "Coming Soon",
    launchDate: "Q3 2024",
    techStack: ["Qiskit", "Python", "TensorFlow"],
    progress: 30
  },
  {
    title: "NeuroSync",
    description: "Brain-computer interface for enhanced productivity",
    category: "Neurotechnology",
    icon: Brain,
    features: ["Neural Networks", "Real-time Processing", "Adaptive Learning"],
    status: "In Development",
    launchDate: "Q4 2024",
    techStack: ["Python", "PyTorch", "React Native"],
    progress: 15
  },
  {
    title: "Blockchain 2.0",
    description: "Next-gen blockchain with zero-knowledge proofs",
    category: "Blockchain",
    icon: Database,
    features: ["ZK-SNARKs", "Scalability", "Privacy"],
    status: "In Research",
    launchDate: "Q1 2025",
    techStack: ["Rust", "Zero-Knowledge Proofs", "Web3"],
    progress: 5
  }
]

// Enhanced particle effect component
const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-red-500/20"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            opacity: Math.random() * 0.5 + 0.2
          }}
        />
      ))}
    </div>
  )
}

// Enhanced feature badge with animation
const FeatureBadge = ({ feature }: { feature: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-sm text-white/70 group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ 
          rotate: isHovered ? [0, 15, -15, 0] : 0,
          scale: isHovered ? [1, 1.2, 1] : 1,
          color: isHovered ? "#ef4444" : "#ef4444"
        }}
        transition={{ duration: 0.5 }}
      >
        <Zap className="h-4 w-4 text-red-500 group-hover:text-red-400" />
      </motion.div>
      <span className="group-hover:text-white transition-colors duration-300">{feature}</span>
    </motion.li>
  )
}

// Enhanced progress bar with animation
const ProgressBar = ({ progress }: { progress: number }) => {
  const [shown, setShown] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-white/70">
        <span>Progress</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {progress}%
        </motion.span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: shown ? `${progress}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-full"
          style={{
            boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)"
          }}
        />
      </div>
    </div>
  )
}

// Current project card
const CurrentProjectCard = ({ project }: { project: CurrentProject }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15])
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const handleViewProject = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = project.href
  }

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (project.demoType === 'external') {
      window.open(project.demo, '_blank')
    } else {
      setIsDemoOpen(true)
    }
  }

  const Icon = project.icon

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        y,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group perspective-1000"
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <Card className={cn(
        "bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-500 h-full",
        "hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]",
      )}>
        <div className="absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />
        </div>

        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="p-1 rounded-full bg-gradient-to-br from-red-500/20 to-transparent"
              >
                <Icon className="h-6 w-6 text-red-500" />
              </motion.div>
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                {project.status}
              </Badge>
            </div>
            <Badge className="bg-white/10 text-white/80">{project.category}</Badge>
          </div>
          <CardTitle className="text-xl mt-4 group-hover:text-red-400 transition-colors duration-300">{project.title}</CardTitle>
          <CardDescription className="text-white/70">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <FeatureBadge key={i} feature={feature} />
              ))}
            </ul>
            
            <ProgressBar progress={project.progress} />
            
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge variant="outline" className="bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-300">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Link
            href={project.href}
            onClick={handleViewProject}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-600 hover:to-red-800 text-white py-2 px-4 rounded-md transition-all duration-300 hover:scale-105 shadow-lg shadow-red-900/20"
          >
            View Project
            <ArrowRight className="h-4 w-4" />
          </Link>
          {project.demoType !== 'external' ? (
            <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={handleDemoClick}
                  className="flex items-center justify-center gap-2 bg-black/20 border border-white/10 px-4 py-2 rounded-md hover:bg-white/5 transition-all duration-300 hover:scale-105"
                >
                  <Play className="h-4 w-4" />
                  Demo
                </button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border-white/10 max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    <Icon className="h-5 w-5 text-red-500" />
                    {project.title} Demo
                  </DialogTitle>
                </DialogHeader>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={project.demo}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <button
              onClick={handleDemoClick}
              className="flex items-center justify-center gap-2 bg-black/20 border border-white/10 px-4 py-2 rounded-md hover:bg-white/5 transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

// Upcoming project card
const UpcomingProjectCard = ({ project }: { project: UpcomingProject }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15])
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  
  const Icon = project.icon

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        y,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group perspective-1000"
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <Card className={cn(
        "bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-500 h-full",
        "hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]",
      )}>
        <div className="absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />
        </div>
        
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>Coming soon</span>
          </motion.div>
        </div>

        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="p-1 rounded-full bg-gradient-to-br from-red-500/20 to-transparent"
              >
                <Icon className="h-6 w-6 text-red-500" />
              </motion.div>
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                {project.status}
              </Badge>
            </div>
            <Badge className="bg-white/10 text-white/80">{project.category}</Badge>
          </div>
          <CardTitle className="text-xl mt-4 group-hover:text-red-400 transition-colors duration-300">{project.title}</CardTitle>
          <CardDescription className="text-white/70">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <FeatureBadge key={i} feature={feature} />
              ))}
            </ul>
            
            <ProgressBar progress={project.progress} />
            
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge variant="outline" className="bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-300">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Clock className="h-4 w-4 text-red-500" />
              Launch: {project.launchDate}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            variant="outline"
            className="w-full border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-105 button-hover group"
            disabled
          >
            <span>Coming Soon</span>
            <motion.div
              animate={{ 
                x: [0, 5, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              className="ml-2"
            >
              <Clock className="h-4 w-4 text-red-500 group-hover:text-red-400" />
            </motion.div>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  const [selectedTab, setSelectedTab] = useState("current")

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"
        animate={{ 
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px]"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[150px]"
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 button-hover">OUR PROJECTS</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
            Explore Our <span className="text-red-500">Innovations</span>
          </h2>
          <motion.p 
            className="text-xl text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discover our cutting-edge projects and demos that showcase the power of AI and blockchain technology.
          </motion.p>
        </motion.div>

        <Tabs 
          defaultValue="current" 
          className="mb-8"
          value={selectedTab}
          onValueChange={setSelectedTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/40 backdrop-blur-md border border-white/10">
              <TabsTrigger 
                value="current"
                className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Current Projects
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming"
                className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
              >
                <Clock className="h-4 w-4 mr-2" />
                Upcoming Projects
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="current" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CurrentProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {upcomingProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <UpcomingProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            asChild
            variant="outline"
            className="border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-105 button-hover"
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 