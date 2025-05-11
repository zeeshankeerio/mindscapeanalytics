"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Brain,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Code,
  Database,
  Layers,
  Lightbulb,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InnovationRoadmap() {
  const [activeTab, setActiveTab] = useState("current")

  const roadmapItems = {
    current: [
      {
        title: "Advanced GenAI Models",
        description:
          "State-of-the-art generative AI models for text, image, and code generation with enhanced customization capabilities.",
        status: "Released",
        date: "Q1 2023",
        icon: <Brain className="h-10 w-10 text-red-500" />,
        features: [
          "Multi-modal content generation",
          "Domain-specific fine-tuning",
          "Enterprise security controls",
          "Customizable outputs",
        ],
      },
      {
        title: "Real-time Analytics Engine",
        description:
          "Process and analyze data streams in real-time with our high-performance distributed computing platform.",
        status: "Released",
        date: "Q2 2023",
        icon: <Zap className="h-10 w-10 text-red-500" />,
        features: [
          "Sub-second processing latency",
          "Scalable to millions of events/sec",
          "Anomaly detection",
          "Automated alerting",
        ],
      },
      {
        title: "Enterprise Knowledge Graph",
        description: "Connect and contextualize your organization's data with our enterprise knowledge graph solution.",
        status: "Released",
        date: "Q3 2023",
        icon: <Layers className="h-10 w-10 text-red-500" />,
        features: ["Entity resolution", "Relationship mapping", "Semantic search", "Knowledge discovery"],
      },
    ],
    upcoming: [
      {
        title: "Multimodal AI Assistant",
        description:
          "Next-generation AI assistant that can understand and process text, images, audio, and video inputs simultaneously.",
        status: "Beta",
        date: "Q1 2024",
        icon: <Sparkles className="h-10 w-10 text-red-500" />,
        features: [
          "Cross-modal understanding",
          "Context-aware responses",
          "Enterprise knowledge integration",
          "Customizable personas",
        ],
      },
      {
        title: "Autonomous Data Fabric",
        description:
          "Self-organizing data infrastructure that automatically discovers, catalogs, and optimizes data assets.",
        status: "Alpha",
        date: "Q2 2024",
        icon: <Database className="h-10 w-10 text-red-500" />,
        features: [
          "Automated data discovery",
          "Self-optimizing storage",
          "Intelligent data governance",
          "Cross-system data virtualization",
        ],
      },
      {
        title: "Federated Learning Platform",
        description: "Train AI models across distributed data sources without centralizing sensitive data.",
        status: "Development",
        date: "Q3 2024",
        icon: <Code className="h-10 w-10 text-red-500" />,
        features: [
          "Privacy-preserving learning",
          "Cross-organization collaboration",
          "Regulatory compliance",
          "Differential privacy controls",
        ],
      },
    ],
    future: [
      {
        title: "Quantum-Enhanced AI",
        description: "AI algorithms optimized for quantum computing to solve previously intractable problems.",
        status: "Research",
        date: "2025",
        icon: <Lightbulb className="h-10 w-10 text-red-500" />,
        features: [
          "Quantum algorithm acceleration",
          "Complex optimization problems",
          "Quantum-resistant security",
          "Hybrid classical-quantum processing",
        ],
      },
      {
        title: "Neuro-Symbolic AI",
        description: "Combining neural networks with symbolic reasoning for more explainable and robust AI systems.",
        status: "Research",
        date: "2025",
        icon: <Brain className="h-10 w-10 text-red-500" />,
        features: [
          "Explainable AI decisions",
          "Logical reasoning capabilities",
          "Knowledge incorporation",
          "Reduced training data requirements",
        ],
      },
      {
        title: "Autonomous AI Agents",
        description:
          "Self-improving AI systems that can autonomously solve complex business problems with minimal human oversight.",
        status: "Concept",
        date: "2026",
        icon: <Rocket className="h-10 w-10 text-red-500" />,
        features: [
          "Self-directed learning",
          "Multi-step planning",
          "Autonomous decision-making",
          "Human-AI collaboration framework",
        ],
      },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Released":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/20">Released</Badge>
      case "Beta":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/20">Beta</Badge>
      case "Alpha":
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/20">Alpha</Badge>
      case "Development":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">In Development</Badge>
      case "Research":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/20">Research</Badge>
      case "Concept":
        return <Badge className="bg-white/20 text-white/80 border-white/20">Concept</Badge>
      default:
        return <Badge className="bg-white/20 text-white/80 border-white/20">{status}</Badge>
    }
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">INNOVATION</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Our <span className="text-red-500">Innovation</span> Roadmap
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore our current capabilities and upcoming innovations that will shape the future of AI
          </p>
        </div>

        <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <TabsList className="bg-black/50 border border-white/10 p-1">
              <TabsTrigger value="current" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <Clock className="h-4 w-4 mr-2" />
                Current Capabilities
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming Releases
              </TabsTrigger>
              <TabsTrigger value="future" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <Rocket className="h-4 w-4 mr-2" />
                Future Vision
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(roadmapItems).map(([key, items]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full hover:border-red-500/50 transition-all duration-300 group">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                            {item.icon}
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(item.status)}
                            <Badge variant="outline" className="bg-white/5 border-white/10">
                              <Calendar className="h-3 w-3 mr-1" />
                              {item.date}
                            </Badge>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-white/70 mb-4">{item.description}</p>

                        <div className="mt-auto">
                          <h4 className="font-medium mb-2">Key Features</h4>
                          <ul className="space-y-1 mb-4">
                            {item.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-red-500 flex-shrink-0" />
                                <span className="text-white/80">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Button
                            variant="ghost"
                            className="p-0 h-auto text-red-500 hover:text-red-400 hover:bg-transparent group"
                          >
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl">
            <h3 className="text-xl font-bold mb-2">Want to shape our roadmap?</h3>
            <p className="text-white/70 mb-4">
              Join our customer advisory board to influence our product direction and get early access to new features.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Join Advisory Board
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

