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
  ChevronRight,
} from "lucide-react"
import { useRef } from "react"

const solutions = [
  {
    title: "AI & Machine Learning",
    description: "Advanced AI models and machine learning solutions for complex business challenges.",
    icon: <Brain className="h-6 w-6" />,
    color: "red",
    gradient: "from-red-500/20 to-red-600/20",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics"],
  },
  {
    title: "Data Analytics",
    description: "Transform your data into actionable insights with our powerful analytics platform.",
    icon: <BarChart2 className="h-6 w-6" />,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/20",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    features: ["Real-time Analytics", "Custom Dashboards", "Data Visualization"],
  },
  {
    title: "Process Automation",
    description: "Streamline operations with intelligent workflow automation and optimization.",
    icon: <RefreshCw className="h-6 w-6" />,
    color: "green",
    gradient: "from-green-500/20 to-green-600/20",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    features: ["Workflow Automation", "Task Optimization", "Resource Management"],
  },
  {
    title: "Security & Compliance",
    description: "Enterprise-grade security with comprehensive compliance and data protection.",
    icon: <Shield className="h-6 w-6" />,
    color: "yellow",
    gradient: "from-yellow-500/20 to-yellow-600/20",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.3)]",
    features: ["End-to-end Encryption", "Access Control", "Audit Logging"],
  },
]

export default function SolutionsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={containerRef} className="py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"
      ></motion.div>
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px]"
      ></motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-3 flex justify-center"
          >
            <Badge className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10">
              <Target className="h-3 w-3 mr-1" />
              SOLUTIONS
            </Badge>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Comprehensive <span className="text-red-500">AI-Powered</span> Solutions
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover our suite of AI solutions designed to transform your business operations and drive innovation.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {solutions.map((solution, index) => (
            <motion.div key={index} variants={item}>
              <Card className="group relative bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:scale-[1.02]">
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className={`absolute inset-0 ${solution.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <CardContent className="p-6 space-y-4 relative">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-3 rounded-lg bg-${solution.color}-500/10 group-hover:bg-${solution.color}-500/20 transition-colors`}
                    >
                      {solution.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-white/70 mt-1">{solution.description}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <ul className="space-y-2">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                          <ChevronRight className="h-4 w-4 text-red-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-white hover:text-red-400 hover:bg-white/5 group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white group">
              <span className="flex items-center">
                View All Solutions
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 