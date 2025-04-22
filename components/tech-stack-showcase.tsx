"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Brain,
  Database,
  Cloud,
  Shield,
  Code,
  BarChart2,
  Layers,
  TabletSmartphone,
  HardDrive,
  Server,
  Terminal,
  Network,
  Cpu,
  BarChart,
  FileCode,
  GitBranch,
  Eye,
  Lock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  CheckCircle2,
  XCircle,
  CheckCircle,
  Check,
  BrainCircuit,
  Copy,
  ScanSearch,
  Search,
  FilterX,
  Filter,
  Zap,
  Star
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag } from "@/components/ui/tag"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import dynamic from "next/dynamic"

// Dynamically import the ThreeModelViewer to prevent SSR issues
const ThreeModelViewer = dynamic(() => import('@/components/three-model-viewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center bg-black/20 rounded-lg">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-red-500"></div>
    </div>
  ),
})

type TechCategory = {
  title: string
  icon: React.ReactNode
  badges: TechItem[]
  description: string
  modelType?: string
  color?: string
}

type TechItem = {
  name: string
  description: string
  documentation?: string
  implementation?: string
  codeExample?: string
  features?: string[]
  alternatives?: { name: string; pros: string[]; cons: string[] }[]
  score?: number
  expertiseLevel?: "beginner" | "intermediate" | "advanced"
}

// New type for detailed comparison
interface ComparisonItem {
  name: string;
  features: {
    performance: number;
    scalability: number;
    complexity: number;
    community: number;
    security: number;
  };
  pros: string[];
  cons: string[];
}

interface ComparisonCategory {
  category: string;
  title: string;
  description: string;
  items: ComparisonItem[];
}

const techStackCategories: TechCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: <Brain className="h-5 w-5" />,
    description: "State-of-the-art machine learning frameworks and libraries for advanced AI capabilities.",
    modelType: "neuralNetwork",
    color: "#ef4444",
    badges: [
      { 
        name: "TensorFlow", 
        description: "Open-source library for machine learning and artificial intelligence. Used for our recommendation engine and predictive analytics modules.",
        documentation: "https://www.tensorflow.org/",
        features: [
          "High-level Keras API for quick prototyping",
          "TensorFlow Extended (TFX) for production pipelines",
          "TensorFlow.js for client-side ML"
        ],
        implementation: "Core recommendation engine and predictive analytics",
        score: 95,
        expertiseLevel: "advanced",
        codeExample: `
import tensorflow as tf
from tensorflow import keras

# Define a sequential model
model = keras.Sequential([
  keras.layers.Dense(128, activation='relu', input_shape=(784,)),
  keras.layers.Dropout(0.2),
  keras.layers.Dense(10, activation='softmax')
])

# Compile the model
model.compile(
  optimizer='adam',
  loss='sparse_categorical_crossentropy',
  metrics=['accuracy']
)`,
        alternatives: [
          {
            name: "PyTorch",
            pros: ["Dynamic computation graph", "More pythonic syntax"],
            cons: ["Less production-oriented tools", "Smaller ecosystem"]
          }
        ]
      },
      { 
        name: "PyTorch", 
        description: "Open-source ML framework known for its flexibility and dynamic computation graph. Used for research and prototype development.",
        documentation: "https://pytorch.org/",
        implementation: "Research models and prototype development",
        features: [
          "Dynamic computation graph",
          "Torchscript for production deployment",
          "Strong GPU acceleration"
        ],
        codeExample: `
import torch
import torch.nn as nn
import torch.nn.functional as F

class SimpleNetwork(nn.Module):
    def __init__(self):
        super(SimpleNetwork, self).__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
        
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.dropout(x, 0.2, training=self.training)
        x = self.fc2(x)
        return F.log_softmax(x, dim=1)
        `
      },
      { 
        name: "Scikit-learn", 
        description: "Machine learning library for classical ML algorithms. Used for feature engineering and baseline models."
      },
      { 
        name: "Hugging Face", 
        description: "NLP library with pre-trained transformer models. Powers our text analysis and generation features."
      },
      { 
        name: "ONNX Runtime", 
        description: "Cross-platform inference engine for ML models. Enables deployment across various environments."
      },
    ],
  },
  {
    title: "Data Processing",
    icon: <Database className="h-5 w-5" />,
    description: "Robust data processing frameworks for handling massive datasets with speed and reliability.",
    modelType: "dataFlow",
    color: "#3b82f6",
    badges: [
      { 
        name: "Apache Spark", 
        description: "Distributed computing system for big data processing. Handles our large-scale data transformations."
      },
      { 
        name: "Kafka", 
        description: "Distributed event streaming platform for high-throughput data pipelines. Core of our real-time data architecture."
      },
      { 
        name: "PostgreSQL", 
        description: "Advanced open-source relational database with JSON capabilities. Primary transactional database."
      },
      { 
        name: "Redis", 
        description: "In-memory data structure store used as cache and message broker. Speeds up frequent operations."
      },
      { 
        name: "MongoDB", 
        description: "Document-oriented NoSQL database. Used for flexible schema data storage."
      },
    ],
  },
  {
    title: "Cloud Infrastructure",
    icon: <Cloud className="h-5 w-5" />,
    description: "Enterprise-grade cloud infrastructure for scalable and reliable deployments.",
    modelType: "cloud",
    color: "#10b981",
    badges: [
      { 
        name: "AWS", 
        description: "Comprehensive cloud platform for compute, storage, and ML services. Primary cloud provider."
      },
      { 
        name: "Kubernetes", 
        description: "Container orchestration system for automated deployment and scaling. Manages our microservices."
      },
      { 
        name: "Docker", 
        description: "Containerization platform for consistent environments. Foundation of our deployment strategy."
      },
      { 
        name: "Terraform", 
        description: "Infrastructure as code tool for provisioning and management. Automates our infrastructure setup."
      },
      { 
        name: "Prometheus", 
        description: "Monitoring and alerting toolkit. Provides visibility into our systems performance."
      },
    ],
  },
  {
    title: "Security & Compliance",
    icon: <Shield className="h-5 w-5" />,
    description: "Comprehensive security protocols and compliance frameworks for enterprise-grade protection.",
    modelType: "network",
    color: "#8b5cf6",
    badges: [
      { 
        name: "OAuth 2.0", 
        description: "Industry-standard protocol for authorization. Secures our API access."
      },
      { 
        name: "Vault", 
        description: "Tool for managing secrets and protecting sensitive data. Safeguards our credentials."
      },
      { 
        name: "JWT", 
        description: "JSON Web Tokens for secure information transmission. Used in authentication flows."
      },
      { 
        name: "OWASP", 
        description: "Security standards and tools to prevent common vulnerabilities. Guides our security practices."
      },
      { 
        name: "SOC2", 
        description: "Compliance framework for data security. Ensures we meet industry standards."
      },
    ],
  },
  {
    title: "APIs & Integration",
    icon: <Code className="h-5 w-5" />,
    description: "Flexible API frameworks for seamless integration and interoperability.",
    badges: [
      { 
        name: "GraphQL", 
        description: "Query language for APIs with efficient data loading. Powers our client-facing APIs."
      },
      { 
        name: "REST", 
        description: "Architectural style for distributed systems. Used for internal service communication."
      },
      { 
        name: "gRPC", 
        description: "High-performance RPC framework. Enables fast microservice communication."
      },
      { 
        name: "Swagger", 
        description: "API documentation and design tools. Keeps our API documentation current."
      },
      { 
        name: "Webhooks", 
        description: "HTTP callbacks for real-time notifications. Enables event-driven integrations."
      },
    ],
  },
  {
    title: "Analytics & Visualization",
    icon: <BarChart2 className="h-5 w-5" />,
    description: "Powerful analytics tools for deriving insights and creating impactful visualizations.",
    badges: [
      { 
        name: "ElasticSearch", 
        description: "Distributed search and analytics engine. Powers our advanced search capabilities."
      },
      { 
        name: "Kibana", 
        description: "Visualization and exploration tool for ElasticSearch. Provides insights into log data."
      },
      { 
        name: "Looker", 
        description: "BI and analytics platform. Delivers business insights from our data warehouses."
      },
      { 
        name: "D3.js", 
        description: "JavaScript library for data visualizations. Creates custom interactive dashboards."
      },
      { 
        name: "Tableau", 
        description: "Visual analytics platform for business intelligence. Generates executive reports."
      },
    ],
  },
  {
    title: "Development Tools",
    icon: <Layers className="h-5 w-5" />,
    description: "Modern development tools for efficient collaboration and rapid iteration.",
    badges: [
      { 
        name: "Git", 
        description: "Distributed version control system. Core of our code management strategy."
      },
      { 
        name: "GitHub Actions", 
        description: "CI/CD automation platform. Automates our testing and deployment processes."
      },
      { 
        name: "Jest", 
        description: "JavaScript testing framework. Ensures our front-end code quality."
      },
      { 
        name: "PyTest", 
        description: "Python testing framework. Validates our ML model performance."
      },
      { 
        name: "TypeScript", 
        description: "Typed superset of JavaScript. Makes our codebase more maintainable."
      },
    ],
  },
  {
    title: "Architecture",
    icon: <Network className="h-5 w-5" />,
    description: "Scalable architecture patterns for building robust enterprise-grade systems.",
    badges: [
      { 
        name: "Microservices", 
        description: "Architectural style for building distributed applications. Enables independent scaling."
      },
      { 
        name: "Event-Driven", 
        description: "Design pattern focused on event production and consumption. Creates loosely coupled systems."
      },
      { 
        name: "CQRS", 
        description: "Command Query Responsibility Segregation for separating read/write operations. Optimizes performance."
      },
      { 
        name: "Serverless", 
        description: "Architecture pattern without server management. Reduces operational complexity."
      },
      { 
        name: "API Gateway", 
        description: "Single entry point for all clients. Simplifies client-server interactions."
      },
    ],
  },
]

// Tech stack comparison data
const techStackComparisons: ComparisonCategory[] = [
  {
    category: "ml-frameworks",
    title: "ML Frameworks",
    description: "Comparison of machine learning frameworks used in our AI solutions",
    items: [
      {
        name: "TensorFlow",
        features: {
          performance: 85,
          scalability: 90,
          complexity: 70,
          community: 95,
          security: 85
        },
        pros: [
          "Mature deployment tools",
          "Strong integration with cloud services",
          "Excellent mobile support",
          "Robust serving infrastructure"
        ],
        cons: [
          "Steeper learning curve",
          "Less flexible for research"
        ]
      },
      {
        name: "PyTorch",
        features: {
          performance: 90,
          scalability: 80,
          complexity: 60,
          community: 90,
          security: 80
        },
        pros: [
          "Dynamic computation graph",
          "More pythonic interface",
          "Easier debugging",
          "Preferred in research"
        ],
        cons: [
          "Less mature deployment tools",
          "Fewer mobile options"
        ]
      },
      {
        name: "JAX",
        features: {
          performance: 95,
          scalability: 85,
          complexity: 85,
          community: 75,
          security: 80
        },
        pros: [
          "High performance",
          "Functional design",
          "Native GPU/TPU support",
          "Composable transformations"
        ],
        cons: [
          "Smaller ecosystem",
          "Steeper learning curve",
          "Fewer deployment options"
        ]
      }
    ]
  },
  {
    category: "databases",
    title: "Database Solutions",
    description: "Comparison of database technologies employed in our platform",
    items: [
      {
        name: "PostgreSQL",
        features: {
          performance: 80,
          scalability: 85,
          complexity: 60,
          community: 95,
          security: 90
        },
        pros: [
          "ACID compliance",
          "JSON support",
          "Advanced features",
          "Strong consistency"
        ],
        cons: [
          "Horizontal scaling challenges",
          "Complex setup for high availability"
        ]
      },
      {
        name: "MongoDB",
        features: {
          performance: 85,
          scalability: 90,
          complexity: 55,
          community: 90,
          security: 80
        },
        pros: [
          "Flexible schema",
          "Horizontal scaling",
          "Native sharding",
          "Document model"
        ],
        cons: [
          "Eventual consistency model",
          "Higher storage requirements"
        ]
      },
      {
        name: "Redis",
        features: {
          performance: 98,
          scalability: 80,
          complexity: 50,
          community: 85,
          security: 75
        },
        pros: [
          "Extremely fast performance",
          "In-memory operations",
          "Data structures",
          "Pub/sub capabilities"
        ],
        cons: [
          "Limited persistence",
          "Memory-constrained",
          "Less query flexibility"
        ]
      }
    ]
  },
  {
    category: "cloud-infra",
    title: "Cloud Infrastructure",
    description: "Comparison of cloud services and infrastructure technologies",
    items: [
      {
        name: "AWS",
        features: {
          performance: 90,
          scalability: 95,
          complexity: 75,
          community: 95,
          security: 90
        },
        pros: [
          "Comprehensive service offerings",
          "Mature ecosystem",
          "Global infrastructure",
          "Advanced security features"
        ],
        cons: [
          "Complex pricing",
          "Steep learning curve"
        ]
      },
      {
        name: "GCP",
        features: {
          performance: 92,
          scalability: 90,
          complexity: 70,
          community: 85,
          security: 90
        },
        pros: [
          "Superior ML/AI services",
          "Strong data analytics",
          "Global network performance",
          "Better default configs"
        ],
        cons: [
          "Fewer services overall",
          "Smaller market share"
        ]
      },
      {
        name: "Azure",
        features: {
          performance: 85,
          scalability: 90,
          complexity: 75,
          community: 90,
          security: 95
        },
        pros: [
          "Strong enterprise integration",
          "Better Windows support",
          "Hybrid cloud solutions",
          "Compliance certifications"
        ],
        cons: [
          "Less intuitive interface",
          "Inconsistent documentation"
        ]
      }
    ]
  }
];

// Enhanced code block with syntax highlighting and copy functionality
const CodeBlock = ({ code, language = "javascript" }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-black/60 px-4 py-2 text-xs text-white/70 border-b border-white/10">
        <span>{language}</span>
        <button 
          onClick={handleCopy} 
          className="flex items-center gap-1 hover:text-white transition-colors p-1"
        >
          {copied ? (
            <>
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <ScrollArea className="h-[300px] w-full border-white/10">
        <pre className="p-4 text-sm overflow-auto">
          <code>{code}</code>
        </pre>
      </ScrollArea>
    </div>
  )
}

// Feature comparison component
const TechComparison = ({ data }: { data: ComparisonCategory }) => {
  return (
    <div className="space-y-6">
      <div className="text-sm text-white/70">{data.description}</div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.items.map((item) => (
          <Card key={item.name} className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">{item.name}</h4>
              
              <div className="space-y-3 mb-6">
                {Object.entries(item.features).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/70 capitalize">{key}</span>
                      <span className="text-xs font-medium">{value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-red-500" 
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-xs font-semibold text-green-400 mb-1">PROS</h5>
                  <ul className="text-xs space-y-1">
                    {item.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-xs font-semibold text-red-400 mb-1">CONS</h5>
                  <ul className="text-xs space-y-1">
                    {item.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Tech detail dialog component
const TechDetailDialog = ({ tech }: { tech: TechItem }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full ml-1 opacity-50 hover:opacity-100">
          <Info className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl border-white/10 bg-black/90 backdrop-blur-md text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">{tech.name}</DialogTitle>
          <DialogDescription className="text-white/70">
            {tech.description}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 py-4">
            {tech.features && (
              <div>
                <h4 className="text-md font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Key Features
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tech.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-green-500/70 mt-0.5" />
                      <span className="text-sm text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {tech.implementation && (
              <div>
                <h4 className="text-md font-semibold mb-2 flex items-center">
                  <BrainCircuit className="h-4 w-4 mr-2 text-blue-500" />
                  Implementation Context
                </h4>
                <p className="text-sm text-white/80">
                  {tech.implementation}
                </p>
              </div>
            )}
            
            {tech.codeExample && (
              <div>
                <h4 className="text-md font-semibold mb-2 flex items-center">
                  <Code className="h-4 w-4 mr-2 text-purple-500" />
                  Example Implementation
                </h4>
                <CodeBlock code={tech.codeExample} />
              </div>
            )}
            
            {tech.alternatives && (
              <div>
                <h4 className="text-md font-semibold mb-2 flex items-center">
                  <GitBranch className="h-4 w-4 mr-2 text-yellow-500" />
                  Alternative Technologies
                </h4>
                <div className="space-y-4">
                  {tech.alternatives.map((alt, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-md">
                      <h5 className="font-medium text-sm mb-2">{alt.name}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs text-green-400 mb-1">PROS</h6>
                          <ul className="space-y-1">
                            {alt.pros.map((pro, j) => (
                              <li key={j} className="flex items-start gap-1 text-xs">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-white/80">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-xs text-red-400 mb-1">CONS</h6>
                          <ul className="space-y-1">
                            {alt.cons.map((con, j) => (
                              <li key={j} className="flex items-start gap-1 text-xs">
                                <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-white/80">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {tech.documentation && (
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/20 text-white/90"
                  onClick={() => window.open(tech.documentation, '_blank')}
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Documentation
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// New component for skill level indicator
const SkillLevelIndicator = ({ level }: { level: "beginner" | "intermediate" | "advanced" }) => {
  const getColor = () => {
    switch (level) {
      case "beginner": return "bg-green-500";
      case "intermediate": return "bg-yellow-500";
      case "advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  }
  
  const getLabel = () => {
    switch (level) {
      case "beginner": return "Beginner-Friendly";
      case "intermediate": return "Intermediate";
      case "advanced": return "Advanced";
      default: return "Not Specified";
    }
  }
  
  return (
    <div className="flex items-center gap-1.5">
      <div className={`h-2 w-2 rounded-full ${getColor()}`}></div>
      <span className="text-xs text-white/70">{getLabel()}</span>
    </div>
  );
}

// New animation variants for tech cards - enhancing transitions
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // Faster staggered reveal
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0] // Custom easing for smoother animation
    }
  }),
  expanded: { 
    scale: 1.02, 
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 }
  },
  collapsed: { 
    scale: 1, 
    boxShadow: "none",
    transition: { duration: 0.2 }
  }
};

// New fade-in animation for elements
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function TechStackShowcase() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Changed to true for better performance
    threshold: 0.1,
  })
  
  const [activeCategory, setActiveCategory] = useState("all")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [selectedComparison, setSelectedComparison] = useState(techStackComparisons[0].category)
  const [activeImplementation, setActiveImplementation] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [animating, setAnimating] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Add state for tech filtering
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  // Add lazy loading ref for performance optimization
  const comparisonsRef = useRef<HTMLDivElement>(null)
  const { ref: comparisonInViewRef, inView: comparisonsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  // New function to get all unique tags from tech items
  const getAllTags = () => {
    const tags = new Set<string>();
    techStackCategories.forEach(category => {
      category.badges.forEach(badge => {
        tags.add(badge.name);
      });
    });
    return Array.from(tags);
  };
  
  const allTags = getAllTags();
  
  // Enhanced filter function for tech items with performance optimizations
  const filterTechItems = (items: TechItem[]) => {
    // If no filters, avoid unnecessary processing
    if (!searchTerm && selectedTags.length === 0) return items;
    
    const searchTermLower = searchTerm.toLowerCase();
    
    return items.filter(item => {
      // Filter by search term
      const matchesSearch = !searchTerm || 
        item.name.toLowerCase().includes(searchTermLower) ||
        (item.description && item.description.toLowerCase().includes(searchTermLower));
      
      // Filter by selected tags
      const matchesTags = selectedTags.length === 0 || selectedTags.includes(item.name);
      
      return matchesSearch && matchesTags;
    });
  };

  const toggleCategory = (category: string) => {
    setAnimating(true);
    setTimeout(() => {
      if (expandedCategory === category) {
        setExpandedCategory(null);
      } else {
        setExpandedCategory(category);
      }
      setAnimating(false);
    }, 200); // Faster transition
  }

  // Function to toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Function to clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };
  
  // Performance optimization - memoize filtered tech items
  const getFilteredCategories = useMemo(() => {
    return techStackCategories.filter(category => {
      const filteredBadges = filterTechItems(category.badges);
      return filteredBadges.length > 0;
    });
  }, [searchTerm, selectedTags]);

  // New implementation showcase section
  const implementationExamples = [
    {
      id: "ai-pipeline",
      title: "AI Pipeline",
      description: "How we implement end-to-end ML pipelines for enterprise needs",
      tags: ["TensorFlow", "Kubernetes", "Kafka", "PostgreSQL"],
      code: `
# MLFlow pipeline definition
name: Enterprise ML Pipeline

components:
  - name: data_ingestion
    implementation: kafka_consumer
    config:
      topic: raw_data
      group: ml_pipeline
      bootstrap_servers: kafka-cluster:9092

  - name: data_preprocessing
    implementation: spark_job
    config:
      jar: s3://pipeline/processors/data-cleaner.jar
      args:
        - "--input=kafka"
        - "--output=feature-store"

  - name: feature_engineering
    implementation: python_component
    code: |
      import pandas as pd
      from feature_store import FeatureStore
      
      def process(data):
          # Extract temporal features
          data['day_of_week'] = data['timestamp'].dt.dayofweek
          data['hour_of_day'] = data['timestamp'].dt.hour
          
          # Normalize numerical features
          for col in ['metric1', 'metric2', 'metric3']:
              data[f'{col}_normalized'] = (data[col] - data[col].mean()) / data[col].std()
          
          # One-hot encode categorical features
          categorical_cols = ['category', 'location', 'device_type']
          data = pd.get_dummies(data, columns=categorical_cols)
          
          return data
      
  - name: model_training
    implementation: tensorflow_component
    config:
      model_type: neural_network
      hyperparameters:
        learning_rate: 0.001
        batch_size: 64
        epochs: 100
        early_stopping_patience: 10
      compute:
        instance_type: gpu_optimized
        instance_count: 4
      
  - name: model_evaluation
    implementation: python_component
    code: |
      from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
      
      def evaluate(model, test_data):
          predictions = model.predict(test_data.X)
          metrics = {
              'accuracy': accuracy_score(test_data.y, predictions),
              'precision': precision_score(test_data.y, predictions, average='weighted'),
              'recall': recall_score(test_data.y, predictions, average='weighted'),
              'f1': f1_score(test_data.y, predictions, average='weighted')
          }
          return metrics
      
  - name: model_deployment
    implementation: kubernetes_deployment
    config:
      image: registry.company.com/ml-serving:latest
      resources:
        requests:
          cpu: "1"
          memory: "2Gi"
        limits:
          cpu: "2"
          memory: "4Gi"
      replicas: 3
      autoscaling:
        enabled: true
        min_replicas: 3
        max_replicas: 10
        target_cpu_utilization: 70
`,
      diagram: "/images/ai-pipeline-diagram.svg"
    },
    {
      id: "event-driven",
      title: "Event-Driven Architecture",
      description: "Implementation of our event-driven microservices pattern",
      tags: ["Kafka", "gRPC", "Microservices", "Event-Driven"],
      code: `
// Event Producer Service
import { Kafka, Producer } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

// Kafka configuration
const kafka = new Kafka({
  clientId: 'data-processor-service',
  brokers: process.env.KAFKA_BROKERS.split(','),
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  }
});

// Create a producer
const producer = kafka.producer();

// Connect to Kafka
await producer.connect();

// Define event schema
interface DataProcessedEvent {
  eventId: string;
  eventType: 'DATA_PROCESSED';
  timestamp: string;
  payload: {
    datasetId: string;
    processingType: string;
    status: 'SUCCESS' | 'FAILURE';
    resultLocation?: string;
    metrics?: Record<string, number>;
    errors?: string[];
  };
}

// Event publishing function
export async function publishDataProcessedEvent(
  datasetId: string,
  processingType: string,
  status: 'SUCCESS' | 'FAILURE',
  resultLocation?: string,
  metrics?: Record<string, number>,
  errors?: string[]
): Promise<void> {
  const event: DataProcessedEvent = {
    eventId: uuidv4(),
    eventType: 'DATA_PROCESSED',
    timestamp: new Date().toISOString(),
    payload: {
      datasetId,
      processingType,
      status,
      resultLocation,
      metrics,
      errors
    }
  };
  
  // Produce event to Kafka topic
  await producer.send({
    topic: 'data-processing-events',
    messages: [
      { 
        key: datasetId,
        value: JSON.stringify(event)
      }
    ],
  });
}`,
      diagram: "/images/event-driven-diagram.svg"
    },
    {
      id: "security",
      title: "Security Implementation",
      description: "Our approach to application security with OAuth 2.0 and JWT",
      tags: ["OAuth 2.0", "JWT", "Spring Security", "HashiCorp Vault"],
      code: `
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/public/**").permitAll()
                .antMatchers("/actuator/health").permitAll()
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            .and()
            .apply(new JwtConfigurer(tokenProvider));
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }
    
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}

// Secret Management with HashiCorp Vault
@Configuration
@EnableConfigurationProperties(VaultProperties.class)
public class VaultConfig {
    
    @Autowired
    private VaultProperties vaultProperties;
    
    @Bean
    public VaultTemplate vaultTemplate() {
        VaultEndpoint endpoint = VaultEndpoint.create(
            vaultProperties.getHost(), 
            vaultProperties.getPort()
        );
        
        ClientAuthentication clientAuthentication = new TokenAuthentication(
            vaultProperties.getToken()
        );
        
        VaultTemplate vaultTemplate = new VaultTemplate(
            endpoint, 
            clientAuthentication
        );
        
        return vaultTemplate;
    }
    
    @Bean
    public SecretManager secretManager(VaultTemplate vaultTemplate) {
        return new VaultSecretManager(vaultTemplate, vaultProperties.getSecretPath());
    }
}`,
      diagram: "/images/security-implementation-diagram.svg"
    }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden" ref={ref}>
      {/* Enhanced background effects with parallax */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-red-500/5 blur-[150px]"
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px]"
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      <motion.div 
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px]"
        animate={{ 
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 4
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">TECHNOLOGY</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Our Technology Stack
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Cutting-edge technologies powering enterprise-grade AI solutions
          </p>
        </motion.div>

        {/* Enhanced search and filter section with animations */}
        <motion.div 
          className="mb-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input 
                type="text"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/40 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 w-full md:w-[300px] transition-all duration-300"
              />
        </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedTags.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-9 bg-black/40 border-white/10 hover:bg-white/10 text-white/70 transition-colors duration-300"
                >
                  <FilterX className="mr-2 h-3.5 w-3.5" />
                  Clear Filters
                </Button>
              )}
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9 bg-black/40 border-white/10 hover:bg-white/10 text-white/70 transition-colors duration-300"
                  >
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    Filter
                    {selectedTags.length > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white h-5 px-1.5 text-xs">{selectedTags.length}</Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-xl border border-white/10">
                  <DialogHeader>
                    <DialogTitle>Filter Technologies</DialogTitle>
                    <DialogDescription>
                      Select specific technologies to display
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 max-h-[300px] overflow-y-auto p-1">
                    {allTags.map(tag => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        className={`justify-start h-auto py-2 px-3 transition-all duration-300 ${
                          selectedTags.includes(tag)
                            ? "bg-red-500/20 border-red-500/50 text-white"
                            : "bg-black/40 border-white/10 text-white/70 hover:bg-black/60"
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
            <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: selectedTags.includes(tag) ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="mr-2 h-4 w-4" />
                        </motion.div>
                        {tag}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-advanced"
                  checked={showAdvanced}
                  onCheckedChange={setShowAdvanced}
                  className="data-[state=checked]:bg-red-500"
                />
                <Label htmlFor="show-advanced" className="text-sm text-white/70">Show Advanced Details</Label>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {getFilteredCategories.map((category, index) => {
            const filteredBadges = filterTechItems(category.badges);
            const isExpanded = expandedCategory === category.title;
            const categoryColor = category.color?.replace('#', '') || 'red-500';
            
            return (
              <motion.div
                key={category.title}
                custom={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={isExpanded ? {} : { scale: 1.02 }}
                className={`relative col-span-1 ${isExpanded ? 'md:col-span-3 lg:col-span-4 transition-all duration-500' : 'transition-all duration-300'}`}
                onMouseEnter={() => setHoveredCard(category.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card 
                  className={`h-full backdrop-blur-md border transition-all duration-300 overflow-hidden
                    ${isExpanded 
                      ? `border-${categoryColor}/50 bg-gradient-to-b from-black/80 to-black/40`
                      : 'border-white/10 bg-black/40 hover:border-white/20'
                    }
                  `}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <motion.div 
                          className={`p-2 rounded-lg mr-3 transition-colors duration-500 ${
                            hoveredCard === category.title || isExpanded 
                              ? `bg-${categoryColor}/20 text-${categoryColor}` 
                              : 'bg-white/10 text-white/80'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {category.icon}
                        </motion.div>
                        <h3 className="text-xl font-semibold">{category.title}</h3>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 w-8 p-0 rounded-full transition-colors duration-300 ${
                            hoveredCard === category.title || isExpanded ? `text-${categoryColor} hover:text-${categoryColor}` : ''
                          }`}
                          onClick={() => toggleCategory(category.title)}
                          disabled={animating}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </motion.div>
                    </div>

                    <p className="text-white/70 mb-4 text-sm">{category.description}</p>

                    {isExpanded ? (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="space-y-6 pt-2"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredBadges.map((badge, badgeIndex) => (
                            <motion.div
                              key={badge.name}
              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: badgeIndex * 0.05, duration: 0.4 }}
                              whileHover={{ 
                                scale: 1.02,
                                boxShadow: `0 5px 15px -5px rgba(${categoryColor === 'red-500' ? '239,68,68' : '255,255,255'},0.1)`,
                                borderColor: `rgba(${categoryColor === 'red-500' ? '239,68,68' : '255,255,255'},0.3)`
                              }}
                              className={`border border-white/10 rounded-lg p-4 bg-black/40 transition-all duration-300`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold flex items-center">
                                  {badge.name}
                                  {(badge.documentation || badge.codeExample || badge.features) && (
                                    <TechDetailDialog tech={badge} />
                                  )}
                                </h4>
                                {badge.expertiseLevel && <SkillLevelIndicator level={badge.expertiseLevel} />}
                              </div>
                              <p className="text-sm text-white/70 mb-2">{badge.description}</p>
                              
                              {showAdvanced && badge.score && (
                                <motion.div 
                                  className="mt-3"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                  <div className="flex justify-between items-center text-xs mb-1">
                                    <span className="text-white/50">Adoption Score</span>
                                    <span className="font-medium">{badge.score}%</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                      className={`h-full rounded-full bg-${categoryColor}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${badge.score}%` }}
                                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* 3D Visualization for expanded category */}
                        {category.modelType && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-8 border border-white/10 rounded-lg overflow-hidden bg-black/20 h-[300px]"
                          >
                            <ThreeModelViewer 
                              type={category.modelType} 
                              nodeCount={128} 
                              connectionCount={256} 
                              color={category.color || "#ef4444"} 
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {filteredBadges.slice(0, 5).map((badge) => (
                          <TooltipProvider key={badge.name}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Tag className={`text-xs cursor-default transition-colors duration-300 ${
                                  hoveredCard === category.title ? `bg-${categoryColor}/20 text-white` : ''
                                }`}>{badge.name}</Tag>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{badge.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                        {filteredBadges.length > 5 && (
                          <Tag className="text-xs cursor-default bg-white/10">+{filteredBadges.length - 5} more</Tag>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Implementation Showcase Section with enhanced animations */}
        <motion.div 
          className="mt-24 mb-12"
          ref={comparisonInViewRef}
          initial="hidden"
          animate={comparisonsInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">IMPLEMENTATION</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Architecture Implementations
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Explore real-world implementations of our technology stack in enterprise architectures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {implementationExamples.map((example, index) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 20 }}
                animate={comparisonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card 
                  className={`bg-black/30 backdrop-blur-md border transition-all duration-300 cursor-pointer overflow-hidden ${
                    activeImplementation === example.id 
                      ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]" 
                      : "border-white/10 hover:border-white/20 hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
                  }`}
                  onClick={() => setActiveImplementation(
                    activeImplementation === example.id ? null : example.id
                  )}
                >
                <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                    <p className="text-sm text-white/70 mb-4">{example.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {example.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs bg-black/40">{tag}</Badge>
                      ))}
                    </div>
                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 p-0 h-auto flex items-center gap-1">
                        {activeImplementation === example.id ? "Hide Details" : "View Implementation"}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
                  </div>

          <AnimatePresence>
            {activeImplementation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="overflow-hidden"
              >
                <Card className="bg-black/40 border border-white/10 backdrop-blur-md">
                  <CardContent className="p-6">
                    {implementationExamples.filter(example => example.id === activeImplementation).map((example) => (
                      <div key={example.id} className="space-y-6">
                        <h3 className="text-2xl font-semibold mb-4">{example.title} Implementation</h3>
                        
                        <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg">
                          <CodeBlock code={example.code} />
                        </div>
                        
                        <div className="flex justify-end">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              className="border-white/20 text-white/90 hover:bg-white/10"
                              onClick={() => setActiveImplementation(null)}
                            >
                              Close
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="mt-24 mb-12"
          ref={comparisonsRef}
          initial="hidden"
          animate={comparisonsInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">TECHNOLOGY COMPARISONS</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Stack Comparison
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              How our technology choices compare and why we selected them
            </p>
          </div>
          
          <Tabs 
            defaultValue={techStackComparisons[0].category}
            value={selectedComparison} 
            onValueChange={setSelectedComparison} 
            className="w-full"
          >
            <TabsList className="grid w-full md:w-fit mx-auto grid-cols-1 md:grid-cols-3 mb-8 bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-xl">
              {techStackComparisons.map((comparison) => (
                <TabsTrigger 
                  key={comparison.category}
                  value={comparison.category}
                  className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500/20 data-[state=active]:to-red-600/20 data-[state=active]:border-red-500/50 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.3)] rounded-lg border border-transparent data-[state=active]:border-red-500/50 transition-all duration-300"
                >
                  {comparison.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="mt-8">
              {techStackComparisons.map((comparison) => (
                <TabsContent key={comparison.category} value={comparison.category}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <TechComparison data={comparison} />
                  </motion.div>
                </TabsContent>
          ))}
        </div>
          </Tabs>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={comparisonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/20 font-semibold">
            Learn More About Our Technology
              <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

