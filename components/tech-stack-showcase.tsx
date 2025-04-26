"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Database,
  Cloud,
  Shield,
  Code,
  BarChart2,
  Layers,
  TabletSmartphone,
  Search,
  Star,
  Link,
  CheckCircle,
  Filter
} from "lucide-react"

// Define types
type TechCategory = {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  badges: TechBadge[]
  colorClass: string
}

type TechBadge = {
  name: string
  description: string
  score?: number
  expertise?: "beginner" | "intermediate" | "advanced"
  link?: string
}

// Tech stack data
const techStackCategories: TechCategory[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: <Brain className="h-6 w-6" />,
    description: "State-of-the-art machine learning frameworks and libraries for advanced AI capabilities.",
    colorClass: "text-red-500 bg-red-500/20 border-red-500/30",
    badges: [
      { name: "TensorFlow", description: "Open-source library for machine learning and artificial intelligence", score: 95, expertise: "advanced", link: "https://www.tensorflow.org" },
      { name: "PyTorch", description: "Open-source ML framework known for its flexibility and dynamic computation", score: 90, expertise: "advanced", link: "https://pytorch.org" },
      { name: "Scikit-learn", description: "Machine learning library for classical ML algorithms and data preprocessing", score: 85, expertise: "intermediate", link: "https://scikit-learn.org" },
      { name: "Hugging Face", description: "NLP library with pre-trained transformer models for text processing", score: 88, expertise: "intermediate", link: "https://huggingface.co" },
      { name: "ONNX Runtime", description: "Cross-platform inference engine for ML models deployment", score: 82, expertise: "intermediate", link: "https://onnxruntime.ai" }
    ]
  },
  {
    id: "data",
    title: "Data Processing",
    icon: <Database className="h-6 w-6" />,
    description: "Robust data processing frameworks for handling massive datasets with speed and reliability.",
    colorClass: "text-blue-500 bg-blue-500/20 border-blue-500/30",
    badges: [
      { name: "Apache Spark", description: "Distributed computing system for big data processing and analytics", score: 92, expertise: "advanced", link: "https://spark.apache.org" },
      { name: "Kafka", description: "Distributed event streaming platform for high-throughput data pipelines", score: 90, expertise: "advanced", link: "https://kafka.apache.org" },
      { name: "PostgreSQL", description: "Advanced open-source relational database with robust features", score: 95, expertise: "advanced", link: "https://www.postgresql.org" },
      { name: "Redis", description: "In-memory data structure store used as database, cache, and message broker", score: 88, expertise: "intermediate", link: "https://redis.io" },
      { name: "MongoDB", description: "Document-oriented NoSQL database for flexible data models", score: 85, expertise: "intermediate", link: "https://www.mongodb.com" }
    ]
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    icon: <Cloud className="h-6 w-6" />,
    description: "Enterprise-grade cloud infrastructure for scalable and reliable deployments.",
    colorClass: "text-green-500 bg-green-500/20 border-green-500/30",
    badges: [
      { name: "AWS", description: "Comprehensive cloud platform for compute, storage, and ML services", score: 95, expertise: "advanced", link: "https://aws.amazon.com" },
      { name: "Kubernetes", description: "Container orchestration system for automated application deployment", score: 90, expertise: "advanced", link: "https://kubernetes.io" },
      { name: "Docker", description: "Containerization platform for consistent development environments", score: 92, expertise: "advanced", link: "https://www.docker.com" },
      { name: "Terraform", description: "Infrastructure as code tool for provisioning cloud resources", score: 88, expertise: "intermediate", link: "https://www.terraform.io" },
      { name: "Prometheus", description: "Monitoring and alerting toolkit for containerized environments", score: 85, expertise: "intermediate", link: "https://prometheus.io" }
    ]
  },
  {
    id: "security",
    title: "Security & Compliance",
    icon: <Shield className="h-6 w-6" />,
    description: "Comprehensive security protocols and compliance frameworks for enterprise-grade protection.",
    colorClass: "text-purple-500 bg-purple-500/20 border-purple-500/30",
    badges: [
      { name: "OAuth 2.0", description: "Industry-standard protocol for authorization and access delegation", score: 95, expertise: "advanced", link: "https://oauth.net/2/" },
      { name: "Vault", description: "Tool for managing secrets and protecting sensitive data", score: 90, expertise: "advanced", link: "https://www.vaultproject.io/" },
      { name: "JWT", description: "JSON Web Tokens for secure information transmission between parties", score: 92, expertise: "advanced", link: "https://jwt.io/" },
      { name: "OWASP", description: "Security standards and tools to prevent common vulnerabilities", score: 88, expertise: "intermediate", link: "https://owasp.org/" },
      { name: "SOC2", description: "Compliance framework for data security and privacy protection", score: 85, expertise: "intermediate", link: "https://www.aicpa.org/soc" }
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Development",
    icon: <TabletSmartphone className="h-6 w-6" />,
    description: "Modern tools and frameworks for creating beautiful, responsive, and user-friendly interfaces.",
    colorClass: "text-amber-500 bg-amber-500/20 border-amber-500/30",
    badges: [
      { name: "React", description: "JavaScript library for building user interfaces and single-page applications", score: 95, expertise: "advanced", link: "https://reactjs.org/" },
      { name: "Figma", description: "Collaborative interface design tool for prototyping and design systems", score: 90, expertise: "advanced", link: "https://www.figma.com/" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development", score: 92, expertise: "advanced", link: "https://tailwindcss.com/" },
      { name: "Framer Motion", description: "Production-ready motion library for React applications", score: 88, expertise: "intermediate", link: "https://www.framer.com/motion/" },
      { name: "Storybook", description: "Development environment for UI components with isolation testing", score: 85, expertise: "intermediate", link: "https://storybook.js.org/" }
    ]
  },
  {
    id: "api",
    title: "APIs & Integration",
    icon: <Code className="h-6 w-6" />,
    description: "Flexible API frameworks for seamless integration and interoperability.",
    colorClass: "text-indigo-500 bg-indigo-500/20 border-indigo-500/30",
    badges: [
      { name: "GraphQL", description: "Query language for APIs with efficient data loading capabilities", score: 95, expertise: "advanced", link: "https://graphql.org/" },
      { name: "REST", description: "Architectural style for distributed systems and web services", score: 90, expertise: "advanced", link: "https://restfulapi.net/" },
      { name: "gRPC", description: "High-performance RPC framework for service communication", score: 92, expertise: "advanced", link: "https://grpc.io/" },
      { name: "Swagger", description: "API documentation and design tools for standardization", score: 88, expertise: "intermediate", link: "https://swagger.io/" },
      { name: "Webhooks", description: "HTTP callbacks for real-time notifications and events", score: 85, expertise: "intermediate", link: "https://webhook.site/" }
    ]
  },
  {
    id: "analytics",
    title: "Analytics & Visualization",
    icon: <BarChart2 className="h-6 w-6" />,
    description: "Powerful analytics tools for deriving insights and creating impactful visualizations.",
    colorClass: "text-pink-500 bg-pink-500/20 border-pink-500/30",
    badges: [
      { name: "ElasticSearch", description: "Distributed search and analytics engine for data exploration", score: 95, expertise: "advanced", link: "https://www.elastic.co/" },
      { name: "Kibana", description: "Visualization and exploration tool for log and time-series data", score: 90, expertise: "advanced", link: "https://www.elastic.co/kibana/" },
      { name: "Looker", description: "BI and analytics platform for business data modeling and analysis", score: 92, expertise: "advanced", link: "https://looker.com/" },
      { name: "D3.js", description: "JavaScript library for creating dynamic, interactive data visualizations", score: 88, expertise: "intermediate", link: "https://d3js.org/" },
      { name: "Tableau", description: "Visual analytics platform for business intelligence dashboards", score: 85, expertise: "intermediate", link: "https://www.tableau.com/" }
    ]
  },
  {
    id: "web-dev",
    title: "Web Development",
    icon: <Layers className="h-6 w-6" />,
    description: "Modern web development stack for building scalable and performant applications.",
    colorClass: "text-cyan-500 bg-cyan-500/20 border-cyan-500/30",
    badges: [
      { name: "Next.js", description: "React framework for production-grade applications with SSR and static generation", score: 95, expertise: "advanced", link: "https://nextjs.org" },
      { name: "TypeScript", description: "Typed superset of JavaScript for building robust applications", score: 92, expertise: "advanced", link: "https://www.typescriptlang.org" },
      { name: "Node.js", description: "JavaScript runtime for building scalable server-side applications", score: 90, expertise: "advanced", link: "https://nodejs.org" },
      { name: "Prisma", description: "Next-generation ORM for Node.js and TypeScript", score: 88, expertise: "intermediate", link: "https://www.prisma.io" },
      { name: "tRPC", description: "End-to-end typesafe APIs for full-stack applications", score: 85, expertise: "advanced", link: "https://trpc.io" }
    ]
  }
]

export default function TechStackShowcase() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  // Filter categories based on search query
  const filteredCategories = techStackCategories.filter(category => {
    const matchesSearch = 
      searchQuery === "" || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.badges.some(badge => 
        badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        badge.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    
    const matchesCategory = 
      activeCategory === "all" || 
      category.id === activeCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <section className="w-full py-16 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">TECHNOLOGY STACK</Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Our <span className="text-red-500">Technology</span> Stack
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build powerful, scalable, and secure AI solutions.
          </p>
                </div>
                
        {/* Compact Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input 
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/40 border-white/10 text-white placeholder:text-white/50 h-9"
              />
                </div>

            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
              <TabsList className="bg-black/40 border border-white/10 h-9 grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-row gap-0.5 overflow-x-auto scrollbar-hide">
                <TabsTrigger value="all" className="data-[state=active]:bg-white/10 px-2 text-xs h-full">All</TabsTrigger>
                <TabsTrigger value="ai-ml" className="data-[state=active]:bg-red-500/20 px-2 text-xs h-full">AI/ML</TabsTrigger>
                <TabsTrigger value="data" className="data-[state=active]:bg-blue-500/20 px-2 text-xs h-full">Data</TabsTrigger>
                <TabsTrigger value="cloud" className="data-[state=active]:bg-green-500/20 px-2 text-xs h-full">Cloud</TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-purple-500/20 px-2 text-xs h-full">Security</TabsTrigger>
                <TabsTrigger value="ui-ux" className="data-[state=active]:bg-amber-500/20 px-2 text-xs h-full">UI/UX</TabsTrigger>
                <TabsTrigger value="api" className="data-[state=active]:bg-indigo-500/20 px-2 text-xs h-full">APIs</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-500/20 px-2 text-xs h-full">Analytics</TabsTrigger>
                <TabsTrigger value="web-dev" className="data-[state=active]:bg-cyan-500/20 px-2 text-xs h-full">Web Dev</TabsTrigger>
              </TabsList>
            </Tabs>
              </div>
              </div>

        {/* Compact Technology Cards */}
        <div className="mb-12 relative">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-8 text-white/70 bg-black/20 border border-white/10 rounded-lg">
              <Search className="h-6 w-6 mx-auto text-white/30 mb-2" />
              <h3 className="text-base font-medium mb-1">No technologies found</h3>
              <p className="text-xs">Try adjusting your search query or filter selection</p>
              </div>
          ) : (
            <div className="relative overflow-hidden">
              <div className="flex gap-3 animate-scroll">
                {/* First set of cards */}
                {filteredCategories.map((category) => (
                  <Card 
                    key={category.id} 
                    className="group min-w-[260px] sm:min-w-[280px] h-full border border-white/10 bg-black/40 hover:bg-black/60 transition-all duration-300 overflow-hidden backdrop-blur-sm hover:shadow-lg hover:shadow-white/5 hover:scale-[1.01] hover:border-white/20"
                  >
                    <CardHeader className={`py-2 px-3 flex flex-row items-center justify-between border-b border-white/10 ${category.colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${category.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                            {category.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold leading-tight group-hover:text-white transition-colors">{category.title}</h3>
                          <p className="text-[9px] text-white/70 group-hover:text-white/90 transition-colors">{category.badges.length} technologies</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-2 space-y-2 text-xs">
                      <div className="space-y-2">
                        {category.badges.map((badge) => (
                          <div 
                            key={badge.name} 
                            className="group/badge relative bg-black/30 rounded-md border border-white/10 p-2 hover:border-white/30 hover:bg-black/40 transition-all duration-300 hover:shadow-md hover:shadow-white/5"
                          >
                            <div className="flex items-center justify-between gap-1.5 mb-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <div className="font-medium text-xs group-hover/badge:text-white transition-colors">{badge.name}</div>
                                {badge.expertise && (
                                  <Badge variant="outline" className={`text-[8px] px-1.5 py-0 h-4 ${
                                    badge.expertise === "advanced" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                                    badge.expertise === "intermediate" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                                    "bg-green-500/20 text-green-400 border-green-500/30"
                                  }`}>
                                    {badge.expertise}
                                  </Badge>
            )}
          </div>
                              
                              {badge.link && (
                                <a 
                                  href={badge.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white/50 hover:text-white transition-colors p-0.5 hover:bg-white/10 rounded"
                                >
                                  <Link className="h-3 w-3" />
                                </a>
                              )}
    </div>
                            
                            <p className="text-[9px] text-white/70 group-hover/badge:text-white/90 transition-colors mb-1.5 line-clamp-2">
                              {badge.description}
                            </p>
                            
                            {badge.score && (
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <div className="flex-1">
                                  <Progress 
                                    value={badge.score} 
                                    className="h-1 bg-white/10 group-hover/badge:bg-white/20 transition-colors"
              />
        </div>
                                <div className="flex items-center gap-0.5">
                                  <Star className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
                                  <span className="text-[8px] font-medium">{badge.score}%</span>
                  </div>
              </div>
                            )}
            </div>
                        ))}
          </div>
                    </CardContent>
                  </Card>
                ))}
                {/* Duplicate set for seamless loop */}
                {filteredCategories.map((category) => (
                <Card 
                    key={`${category.id}-duplicate`} 
                    className="group min-w-[260px] sm:min-w-[280px] h-full border border-white/10 bg-black/40 hover:bg-black/60 transition-all duration-300 overflow-hidden backdrop-blur-sm hover:shadow-lg hover:shadow-white/5 hover:scale-[1.01] hover:border-white/20"
                  >
                    <CardHeader className={`py-2 px-3 flex flex-row items-center justify-between border-b border-white/10 ${category.colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${category.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                          {category.icon}
                      </div>
                        <div>
                          <h3 className="text-sm font-semibold leading-tight group-hover:text-white transition-colors">{category.title}</h3>
                          <p className="text-[9px] text-white/70 group-hover:text-white/90 transition-colors">{category.badges.length} technologies</p>
                    </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-2 space-y-2 text-xs">
                      <div className="space-y-2">
                        {category.badges.map((badge) => (
                          <div 
                              key={badge.name}
                            className="group/badge relative bg-black/30 rounded-md border border-white/10 p-2 hover:border-white/30 hover:bg-black/40 transition-all duration-300 hover:shadow-md hover:shadow-white/5"
                          >
                            <div className="flex items-center justify-between gap-1.5 mb-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <div className="font-medium text-xs group-hover/badge:text-white transition-colors">{badge.name}</div>
                                {badge.expertise && (
                                  <Badge variant="outline" className={`text-[8px] px-1.5 py-0 h-4 ${
                                    badge.expertise === "advanced" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                                    badge.expertise === "intermediate" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                                    "bg-green-500/20 text-green-400 border-green-500/30"
                                  }`}>
                                    {badge.expertise}
                                  </Badge>
                                )}
                              </div>
                              
                              {badge.link && (
                                <a 
                                  href={badge.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white/50 hover:text-white transition-colors p-0.5 hover:bg-white/10 rounded"
                                >
                                  <Link className="h-3 w-3" />
                                </a>
                              )}
                        </div>
                        
                            <p className="text-[9px] text-white/70 group-hover/badge:text-white/90 transition-colors mb-1.5 line-clamp-2">
                              {badge.description}
                            </p>
                            
                            {badge.score && (
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <div className="flex-1">
                                  <Progress 
                                    value={badge.score} 
                                    className="h-1 bg-white/10 group-hover/badge:bg-white/20 transition-colors"
                                  />
                      </div>
                                <div className="flex items-center gap-0.5">
                                  <Star className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
                                  <span className="text-[8px] font-medium">{badge.score}%</span>
        </div>
          </div>
                            )}
                          </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
            ))}
                  </div>
                        </div>
          )}
          </div>
          
        <style jsx global>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
            will-change: transform;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
          
          /* Add responsive styles for mobile */
          @media (max-width: 640px) {
            .animate-scroll {
              animation-duration: 40s;
            }
          }
        `}</style>
      </div>
    </section>
  )
}

