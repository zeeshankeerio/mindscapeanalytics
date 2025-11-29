"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart2,
  Brain,
  Database,
  FileText,
  Globe,
  Layers,
  Lock,
  Server,
  Shield,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function EnterpriseSolutions() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Solutions" },
    { id: "ai", label: "AI & ML" },
    { id: "data", label: "Big Data" },
    { id: "analytics", label: "Analytics & BI" },
    { id: "cloud", label: "Cloud Solutions" },
    { id: "security", label: "Security" },
  ]

  const solutions = [
    {
      title: "Enterprise AI Platform",
      description:
        "A comprehensive AI platform for large organizations with advanced model training, deployment, and monitoring capabilities.",
      icon: <Brain className="h-10 w-10 text-red-500" />,
      categories: ["ai"],
      features: [
        "Custom model development",
        "Enterprise-grade security",
        "Scalable infrastructure",
        "Seamless integration",
      ],
    },
    {
      title: "Big Data Processing",
      description:
        "Process and analyze massive datasets with our distributed computing platform designed for enterprise workloads.",
      icon: <Database className="h-10 w-10 text-red-500" />,
      categories: ["data"],
      features: [
        "Petabyte-scale processing",
        "Real-time data streams",
        "Data lake architecture",
        "ETL pipeline automation",
      ],
    },
    {
      title: "Business Intelligence Suite",
      description: "Transform your data into actionable insights with our comprehensive BI and analytics platform.",
      icon: <BarChart2 className="h-10 w-10 text-red-500" />,
      categories: ["analytics"],
      features: ["Interactive dashboards", "Automated reporting", "Predictive analytics", "Data visualization"],
    },
    {
      title: "Cloud Infrastructure",
      description: "Secure, scalable, and reliable cloud infrastructure solutions tailored to your enterprise needs.",
      icon: <Server className="h-10 w-10 text-red-500" />,
      categories: ["cloud"],
      features: [
        "Hybrid cloud architecture",
        "Auto-scaling resources",
        "Disaster recovery",
        "Performance optimization",
      ],
    },
    {
      title: "Cybersecurity Platform",
      description:
        "Protect your enterprise with our advanced cybersecurity platform featuring AI-powered threat detection.",
      icon: <Shield className="h-10 w-10 text-red-500" />,
      categories: ["security"],
      features: ["Threat intelligence", "Zero-trust architecture", "Compliance management", "Security automation"],
    },
    {
      title: "Data Governance",
      description:
        "Implement robust data governance frameworks to ensure data quality, privacy, and regulatory compliance.",
      icon: <Lock className="h-10 w-10 text-red-500" />,
      categories: ["data", "security"],
      features: ["Policy management", "Data lineage tracking", "Compliance reporting", "Access control"],
    },
    {
      title: "Enterprise Knowledge Graph",
      description: "Connect and contextualize your organization's data with our enterprise knowledge graph solution.",
      icon: <Globe className="h-10 w-10 text-red-500" />,
      categories: ["ai", "data"],
      features: ["Entity resolution", "Relationship mapping", "Semantic search", "Knowledge discovery"],
    },
    {
      title: "Real-time Analytics",
      description:
        "Monitor and analyze data in real-time to make informed decisions and respond quickly to changing conditions.",
      icon: <Zap className="h-10 w-10 text-red-500" />,
      categories: ["analytics", "data"],
      features: ["Stream processing", "Event-driven architecture", "Anomaly detection", "Alerting system"],
    },
    {
      title: "Enterprise Integration",
      description: "Connect your systems, applications, and data sources with our enterprise integration platform.",
      icon: <Layers className="h-10 w-10 text-red-500" />,
      categories: ["cloud", "data"],
      features: ["API management", "Workflow automation", "Legacy system integration", "Microservices architecture"],
    },
    {
      title: "Compliance & Risk Management",
      description: "Manage regulatory compliance and risk with our AI-powered compliance and risk management solution.",
      icon: <FileText className="h-10 w-10 text-red-500" />,
      categories: ["security", "analytics"],
      features: ["Regulatory tracking", "Risk assessment", "Audit management", "Compliance reporting"],
    },
    {
      title: "Digital Workforce",
      description: "Augment your workforce with AI-powered automation and intelligent assistants.",
      icon: <Users className="h-10 w-10 text-red-500" />,
      categories: ["ai"],
      features: ["Process automation", "Intelligent assistants", "Knowledge workers", "Workflow optimization"],
    },
  ]

  const filteredSolutions =
    activeCategory === "all" ? solutions : solutions.filter((solution) => solution.categories.includes(activeCategory))

  return (
    <section className="py-24 bg-gradient-to-b from-black to-black/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">ENTERPRISE SOLUTIONS</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Comprehensive <span className="text-red-500">Enterprise-Grade</span> Solutions
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Scalable, secure, and reliable solutions designed to meet the complex needs of enterprise organizations.
          </p>
        </div>

        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="flex bg-black/50 border border-white/10 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-red-500 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index * 0.1) % 0.5 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full hover:border-red-500/50 transition-all duration-300 group">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="p-3 bg-red-500/10 rounded-lg w-fit mb-4 group-hover:bg-red-500/20 transition-colors">
                    {solution.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                  <p className="text-white/70 mb-4">{solution.description}</p>

                  <div className="mt-auto">
                    <h4 className="font-medium mb-2">Key Capabilities</h4>
                    <ul className="space-y-1 mb-4">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {solution.categories.map((category) => {
                        const categoryObj = categories.find((c) => c.id === category)
                        return (
                          <Badge key={category} variant="outline" className="bg-white/5 border-white/10">
                            {categoryObj?.label}
                          </Badge>
                        )
                      })}
                    </div>

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

        <div className="mt-16 text-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            View All Enterprise Solutions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

