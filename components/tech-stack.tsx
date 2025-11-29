"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Brain,
  Database,
  Cloud,
  Shield,
  Code,
  Server,
  BarChart2,
  TabletSmartphone
} from "lucide-react"

// Define technology categories
const techCategories = [
  {
    name: "AI & Machine Learning",
    icon: <Brain className="h-5 w-5" />,
    colorClass: "text-red-500 bg-red-500/10 border-red-500/30",
    technologies: [
      { name: "TensorFlow", description: "Deep learning framework for neural networks" },
      { name: "PyTorch", description: "Advanced machine learning library" },
      { name: "Python", description: "Primary language for data science and ML" },
    ]
  },
  {
    name: "Cloud Infrastructure",
    icon: <Cloud className="h-5 w-5" />,
    colorClass: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    technologies: [
      { name: "AWS", description: "Cloud computing services for scalable infrastructure" },
      { name: "Docker", description: "Containerization platform for deployments" },
      { name: "Kubernetes", description: "Container orchestration for automated deployment" },
    ]
  },
  {
    name: "Frontend Development",
    icon: <TabletSmartphone className="h-5 w-5" />,
    colorClass: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    technologies: [
      { name: "React", description: "Frontend library for interactive UIs" },
      { name: "Next.js", description: "React framework for production applications" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    ]
  },
  {
    name: "Backend & APIs",
    icon: <Server className="h-5 w-5" />,
    colorClass: "text-green-500 bg-green-500/10 border-green-500/30",
    technologies: [
      { name: "Node.js", description: "Backend JavaScript runtime environment" },
      { name: "GraphQL", description: "Query language for APIs" },
      { name: "REST", description: "API architecture for web services" },
    ]
  },
  {
    name: "Data Processing",
    icon: <Database className="h-5 w-5" />,
    colorClass: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    technologies: [
      { name: "PostgreSQL", description: "Advanced relational database" },
      { name: "MongoDB", description: "NoSQL database for flexible data models" },
      { name: "Apache Spark", description: "Big data processing framework" },
    ]
  },
  {
    name: "DevOps & Security",
    icon: <Shield className="h-5 w-5" />,
    colorClass: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
    technologies: [
      { name: "CI/CD", description: "Automated testing and deployment" },
      { name: "Terraform", description: "Infrastructure as code" },
      { name: "OAuth 2.0", description: "Industry-standard authentication" },
    ]
  }
]

export default function TechStack() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-3">TECHNOLOGY STACK</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Our <span className="text-primary">Technology</span> Stack
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-[800px] mx-auto">
            We leverage cutting-edge technologies to build powerful, scalable, and secure AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <CardHeader className={`py-3 px-4 flex flex-row items-center gap-2 border-b ${category.colorClass}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + (categoryIndex * 0.1) + (techIndex * 0.05) }}
                      className="p-2 rounded-md bg-background/80 border hover:bg-accent/50 transition-colors"
                    >
                      <div className="font-medium mb-1">{tech.name}</div>
                      <p className="text-sm text-muted-foreground">{tech.description}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

