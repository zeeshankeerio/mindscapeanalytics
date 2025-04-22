"use client"

import { useState } from "react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
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
  Layers
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  status: "development" | "alpha" | "beta"
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
}

const projects: Project[] = [
  {
    id: "1",
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
    ]
  },
  {
    id: "2",
    title: "AnnotateAI",
    description: "A sophisticated image data annotation tool designed for machine learning teams. Features advanced automation, quality control, and collaboration tools to streamline the annotation process for computer vision projects.",
    shortDescription: "Advanced image annotation for ML teams",
    status: "development",
    features: [
      "AI-assisted annotation",
      "Real-time collaboration",
      "Quality control system",
      "Custom annotation types",
      "Version control",
      "Export to multiple formats"
    ],
    techStack: [
      "TensorFlow.js",
      "React",
      "WebGL",
      "MongoDB",
      "Node.js",
      "Docker"
    ],
    timeline: {
      start: "March 2024",
      estimatedCompletion: "Q4 2024",
      currentPhase: "Core Development"
    },
    demo: {
      type: "screenshot",
      url: "/demos/annotateai"
    },
    team: {
      size: 12,
      roles: ["Computer Vision Experts", "Full-stack Developers", "UI/UX Designers", "QA Engineers"]
    },
    metrics: [
      { label: "Annotation Speed", value: "3x Faster" },
      { label: "Accuracy", value: "99.8%" },
      { label: "Team Efficiency", value: "60% Increase" }
    ]
  },
  {
    id: "3",
    title: "FinSight Pro",
    description: "A comprehensive financial analysis and dashboard platform powered by AI. Provides real-time insights, predictive analytics, and customizable dashboards for financial professionals and businesses.",
    shortDescription: "AI-powered financial analysis platform",
    status: "beta",
    features: [
      "Real-time market analysis",
      "Predictive analytics",
      "Custom dashboard builder",
      "Risk assessment",
      "Portfolio optimization",
      "Automated reporting"
    ],
    techStack: [
      "Python",
      "React",
      "D3.js",
      "PostgreSQL",
      "Redis",
      "Kubernetes"
    ],
    timeline: {
      start: "November 2023",
      estimatedCompletion: "Q2 2024",
      currentPhase: "Beta Testing"
    },
    demo: {
      type: "video",
      url: "/demos/finsight"
    },
    team: {
      size: 15,
      roles: ["Data Scientists", "Financial Analysts", "Full-stack Developers", "Security Experts"]
    },
    metrics: [
      { label: "Analysis Speed", value: "10x Faster" },
      { label: "Prediction Accuracy", value: "92%" },
      { label: "ROI Improvement", value: "35% Higher" }
    ]
  }
]

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black z-0"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 bg-red-500/10 text-red-500 border-red-500/20">
              Coming Soon
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Next-Gen AI Solutions
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Discover our cutting-edge projects that are shaping the future of AI applications
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group h-full hover:border-red-500/50 transition-colors duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge 
                          variant="outline" 
                          className={`${
                            project.status === "development" ? "bg-blue-500/10 text-blue-500" :
                            project.status === "alpha" ? "bg-purple-500/10 text-purple-500" :
                            "bg-green-500/10 text-green-500"
                          }`}
                        >
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-white/60">{project.timeline.currentPhase}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        {project.id === "1" && <PenTool className="w-8 h-8 text-red-500" />}
                        {project.id === "2" && <ImageIcon className="w-8 h-8 text-blue-500" />}
                        {project.id === "3" && <LineChart className="w-8 h-8 text-green-500" />}
                        <h3 className="text-2xl font-bold group-hover:text-red-500 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      
                      <p className="text-white/70 mb-6">{project.shortDescription}</p>

                      <div className="mt-auto">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {project.metrics.map((metric, index) => (
                            <div key={index} className="bg-black/30 p-3 rounded-lg">
                              <div className="text-sm text-white/60">{metric.label}</div>
                              <div className="text-lg font-bold text-red-500">{metric.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.slice(0, 3).map((tech, index) => (
                            <Badge key={index} variant="outline" className="bg-black/20 text-white/60 border-white/10">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          variant="ghost"
                          className="w-full justify-center text-red-500 hover:text-red-400 hover:bg-white/5 group"
                        >
                          View Project
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 border border-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-white/70">{selectedProject.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-red-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>Started: {selectedProject.timeline.start}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-red-500" />
                      <span>Estimated Completion: {selectedProject.timeline.estimatedCompletion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-red-500" />
                      <span>Team Size: {selectedProject.team.size}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-black/20 text-white/60 border-white/10">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setSelectedProject(null)}>
                  Close
                </Button>
                <Button className="bg-red-500 hover:bg-red-600">
                  Request Early Access
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  )
} 