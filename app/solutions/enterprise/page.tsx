"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { 
  Building, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight, 
  LineChart, 
  MessagesSquare, 
  Database, 
  Check, 
  Brain, 
  CheckCircle2,
  ChevronRight,
  Clock,
  Code,
  Cpu,
  FileText,
  GitBranch,
  Globe,
  HardDrive,
  Lock,
  Network,
  Plus,
  RefreshCw,
  Server,
  Settings,
  Sparkles,
  Workflow,
  BarChart,
  Cloud,
  ShoppingCart,
  Share2,
  FileSearch,
  ScanSearch,
  BarChart4,
  ChevronDown,
  ChevronUp,
  Copy,
  MessageSquare,
  Activity,
  CpuIcon,
  PieChart,
  AreaChart,
  Layers,
  Target,
  Lightbulb,
  ArrowUpRight,
  Bot,
  Share,
  WifiIcon,
  GaugeCircle,
  type LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

// Enterprise Solution Interfaces
interface EnterpriseSolution {
  icon: any;
  title: string;
  description: string;
  link: string;
  capabilities?: Capability[];
  features?: Feature[];
  pricing?: PricingTier[];
  integrations?: Integration[];
  deployments?: Deployment[];
  metrics?: {
    [key: string]: string;
  };
}

interface Capability {
  title: string;
  description: string;
  icon: any;
  benefits: string[];
}

interface Feature {
  name: string;
  description: string;
  icon: any;
  value: string;
  enterprise: boolean;
}

interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  popular?: boolean;
  cta: string;
}

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  logo?: string;
}

interface Deployment {
  title: string;
  description: string;
  icon: any;
  features: string[];
}

interface Integration {
  name: string;
  category: string;
  icon: any;
  description: string;
}

interface DemoMetrics {
  cpu: number[];
  memory: number[];
  network: number[];
  throughput: number[];
  users: number;
  requests: number;
  responseTime: number;
  errorRate: number;
  availability: number;
  regionData: {
    name: string;
    users: number;
    performance: number;
  }[];
  modelPerformance: {
    name: string;
    accuracy: number;
    latency: number;
  }[];
  serviceHealth: {
    name: string;
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptime: number;
  }[];
  costBreakdown: {
    category: string;
    value: number;
  }[];
}

// Add AI features types
interface AIFeature {
  name: string;
  description: string;
  icon: LucideIcon;
  useCases: string[];
  benefits: string[];
  workflow: {
    step: string;
    description: string;
  }[];
  techStack: string[];
  implementation: string;
}

// Add industry-specific data
const industryFocus = [
  {
    name: "Financial Services",
    icon: Building,
    description: "AI-powered risk management, fraud detection, and personalized banking experiences",
    metrics: {
      fraudReduction: "45%",
      operationalCost: "-32%",
      customerRetention: "+28%"
    }
  },
  {
    name: "Healthcare",
    icon: Plus,
    description: "Clinical decision support, patient outcome prediction, and operational efficiency",
    metrics: {
      diagnosisAccuracy: "+37%",
      patientWaitTime: "-41%",
      readmissionRate: "-26%"
    }
  },
  {
    name: "Manufacturing",
    icon: Settings,
    description: "Predictive maintenance, quality control, and supply chain optimization",
    metrics: {
      downtimeReduction: "52%",
      defectDetection: "+64%",
      inventoryOptimization: "+31%"
    }
  },
  {
    name: "Retail",
    icon: ShoppingCart,
    description: "Demand forecasting, personalized recommendations, and inventory optimization",
    metrics: {
      salesIncrease: "+29%",
      inventoryTurnover: "+43%",
      customerLifetimeValue: "+38%"
    }
  }
];

// Enhanced enterprise solutions data
const enterpriseSolutions: EnterpriseSolution[] = [
  {
    icon: Brain,
    title: "Enterprise AI Platform",
    description: "A comprehensive platform for developing, deploying, and managing AI solutions at scale across your organization.",
    link: "#platform",
    capabilities: [
      {
        title: "Model Development",
        description: "Build, train, and fine-tune AI models with our comprehensive development environment",
        icon: Code,
        benefits: [
          "Support for all major ML frameworks",
          "Extensive pre-trained model library",
          "Automated hyperparameter optimization",
          "Distributed training across multiple nodes"
        ]
      },
      {
        title: "Enterprise Deployment",
        description: "Deploy models securely and efficiently across your organization",
        icon: Server,
        benefits: [
          "One-click deployment to production",
          "Model versioning and rollback capabilities",
          "A/B testing infrastructure",
          "Automated CI/CD pipelines for models"
        ]
      },
      {
        title: "Monitoring & Governance",
        description: "Ensure models perform as expected with comprehensive monitoring",
        icon: Shield,
        benefits: [
          "Real-time model performance dashboards",
          "Drift detection and alerting",
          "Explainability and transparency tools",
          "Compliance and governance controls"
        ]
      }
    ],
    pricing: [
      {
        name: "Standard",
        description: "For organizations getting started with AI",
        price: {
          monthly: 5000,
          annual: 50000
        },
        features: [
          "Up to 10 models in production",
          "5TB of training data storage",
          "8-hour support response time",
          "Basic model monitoring",
          "Standard SLA (99.9% uptime)"
        ],
        cta: "Get Started"
      },
      {
        name: "Professional",
        description: "For growing organizations with advanced AI needs",
        price: {
          monthly: 12000,
          annual: 120000
        },
        features: [
          "Up to 50 models in production",
          "20TB of training data storage",
          "4-hour support response time",
          "Advanced model monitoring",
          "Enhanced SLA (99.95% uptime)",
          "Model explainability tools",
          "Custom model training"
        ],
        popular: true,
        cta: "Talk to Sales"
      },
      {
        name: "Enterprise",
        description: "For large organizations with mission-critical AI deployments",
        price: {
          monthly: 25000,
          annual: 250000
        },
        features: [
          "Unlimited models in production",
          "Unlimited training data storage",
          "1-hour support response time",
          "Complete monitoring suite",
          "Premium SLA (99.99% uptime)",
          "Advanced governance features",
          "Dedicated support team",
          "Custom integrations and deployment"
        ],
        cta: "Contact Us"
      }
    ],
    integrations: [
      {
        name: "AWS",
        category: "Cloud",
        icon: Server,
        description: "Deploy models directly to AWS infrastructure"
      },
      {
        name: "Azure",
        category: "Cloud",
        icon: Cloud,
        description: "Seamlessly integrate with Microsoft Azure services"
      },
      {
        name: "Google Cloud",
        category: "Cloud",
        icon: Globe,
        description: "Connect with Google Cloud services and infrastructure"
      },
      {
        name: "Snowflake",
        category: "Data",
        icon: Database,
        description: "Direct integration with Snowflake data warehouse"
      },
      {
        name: "Databricks",
        category: "Data",
        icon: FileText,
        description: "Connect to Databricks for data processing and analytics"
      },
      {
        name: "GitHub",
        category: "DevOps",
        icon: GitBranch,
        description: "Integrate with GitHub for version control and CI/CD"
      }
    ],
    deployments: [
      {
        title: "Private Cloud",
        description: "Deploy in your own cloud environment with complete control",
        icon: Lock,
        features: [
          "Run in your AWS, Azure, or GCP account",
          "Complete data isolation and security",
          "Compliance with your organization's policies",
          "Integration with existing cloud resources"
        ]
      },
      {
        title: "Hybrid Cloud",
        description: "Combine on-premises and cloud deployments seamlessly",
        icon: RefreshCw,
        features: [
          "Deploy models where they make the most sense",
          "Keep sensitive data on-premises",
          "Unified management across environments",
          "Smooth migration path from on-prem to cloud"
        ]
      },
      {
        title: "On-Premises",
        description: "Deploy within your own data centers for maximum control",
        icon: HardDrive,
        features: [
          "Complete data sovereignty",
          "Air-gapped deployment options",
          "Integration with existing infrastructure",
          "Support for regulated industries"
        ]
      }
    ]
  },
  {
    icon: Database,
    title: "Data Analytics & Insights",
    description: "Transform your business data into actionable insights with our advanced analytics and machine learning solutions.",
    link: "#analytics",
    capabilities: [
      {
        title: "Data Processing",
        description: "Process large volumes of data efficiently and reliably",
        icon: Settings,
        benefits: [
          "Distributed data processing",
          "Real-time stream processing",
          "Batch data processing",
          "ETL pipeline automation"
        ]
      },
      {
        title: "Advanced Analytics",
        description: "Apply sophisticated analytical techniques to extract insights",
        icon: BarChart,
        benefits: [
          "Statistical analysis and modeling",
          "Predictive analytics",
          "Prescriptive analytics",
          "Anomaly detection and forecasting"
        ]
      },
      {
        title: "Data Visualization",
        description: "Visualize insights with interactive dashboards and reports",
        icon: LineChart,
        benefits: [
          "Interactive dashboard creation",
          "Custom visualization capabilities",
          "Embedded analytics",
          "Report automation and scheduling"
        ]
      }
    ]
  },
  {
    icon: MessagesSquare,
    title: "AI Assistants & Automation",
    description: "Custom AI assistants and automation solutions to streamline workflows and enhance employee productivity.",
    link: "#assistants"
  },
  {
    icon: LineChart,
    title: "Predictive Business Intelligence",
    description: "Anticipate market trends and customer behavior with our predictive analytics and forecasting tools.",
    link: "#intelligence"
  },
  {
    icon: Users,
    title: "Enterprise Training & Adoption",
    description: "Comprehensive training programs to ensure successful AI adoption throughout your organization.",
    link: "#training"
  },
  {
    icon: Shield,
    title: "Governance & Compliance",
    description: "Built-in governance controls and compliance features to meet regulatory requirements in any industry.",
    link: "#governance"
  }
]

// Case studies with enhanced data
const caseStudies: CaseStudy[] = [
  {
    company: "Global Financial Services",
    industry: "Banking",
    challenge: "Legacy systems hampering innovation and customer experience",
    solution: "Implemented our Enterprise AI Platform with custom ML models for risk assessment and customer insights",
    results: [
      "30% reduction in fraud incidents",
      "45% faster loan approvals",
      "$25M annual cost savings"
    ],
    logo: "/images/case-study-finance.webp"
  },
  {
    company: "NorthStar Healthcare",
    industry: "Healthcare",
    challenge: "Inefficient resource allocation and patient flow management",
    solution: "Deployed predictive analytics and AI-powered scheduling systems across 12 hospitals",
    results: [
      "22% improvement in patient satisfaction",
      "15% reduction in wait times",
      "18% increase in operational efficiency"
    ],
    logo: "/images/case-study-healthcare.webp"
  },
  {
    company: "TechGlobal Manufacturing",
    industry: "Manufacturing",
    challenge: "Quality control issues and production inefficiencies",
    solution: "Implemented computer vision AI and predictive maintenance systems",
    results: [
      "40% reduction in defect rates",
      "35% decrease in unplanned downtime",
      "$15M savings in maintenance costs"
    ],
    logo: "/images/case-study-manufacturing.webp"
  }
]

// Implementation phases for enterprise deployment
const implementationPhases = [
  {
    name: "Discovery & Planning",
    description: "Comprehensive assessment of your organization's needs and objectives",
    duration: "2-4 weeks",
    deliverables: [
      "Requirements documentation",
      "Technical architecture plan",
      "Implementation roadmap",
      "ROI forecast and metrics"
    ],
    icon: Sparkles
  },
  {
    name: "Pilot Development",
    description: "Creation of initial implementation with core functionality",
    duration: "4-8 weeks",
    deliverables: [
      "Working pilot deployment",
      "Initial integration with systems",
      "Test plans and scenarios",
      "User feedback collection"
    ],
    icon: Code
  },
  {
    name: "Enterprise Deployment",
    description: "Scaling the solution across your organization",
    duration: "6-12 weeks",
    deliverables: [
      "Production deployment",
      "Complete system integration",
      "Performance optimization",
      "Security hardening"
    ],
    icon: Server
  },
  {
    name: "Training & Adoption",
    description: "Ensuring your team is equipped to utilize the platform effectively",
    duration: "2-4 weeks",
    deliverables: [
      "User training sessions",
      "Admin training sessions",
      "Documentation and guides",
      "Knowledge transfer"
    ],
    icon: Users
  },
  {
    name: "Ongoing Support",
    description: "Continuous improvement and support for your enterprise solution",
    duration: "Continuous",
    deliverables: [
      "24/7 technical support",
      "Regular updates and enhancements",
      "Performance monitoring",
      "Strategic consultation"
    ],
    icon: RefreshCw
  }
]

// Expanded initial demo metrics
const initialDemoMetrics: DemoMetrics = {
  cpu: [25, 30, 28, 35, 32, 38, 42],
  memory: [40, 42, 45, 42, 48, 50, 52],
  network: [18, 22, 25, 30, 28, 32, 30],
  throughput: [150, 180, 210, 250, 220, 280, 300],
  users: 1250,
  requests: 450,
  responseTime: 42,
  errorRate: 0.05,
  availability: 99.99,
  regionData: [
    { name: "North America", users: 520, performance: 95 },
    { name: "Europe", users: 380, performance: 92 },
    { name: "Asia Pacific", users: 270, performance: 88 },
    { name: "South America", users: 80, performance: 85 }
  ],
  modelPerformance: [
    { name: "Prediction Model", accuracy: 94.2, latency: 28 },
    { name: "Classification", accuracy: 92.7, latency: 35 },
    { name: "NLP Model", accuracy: 88.5, latency: 42 },
    { name: "Vision Model", accuracy: 95.1, latency: 56 }
  ],
  serviceHealth: [
    { name: "API Gateway", status: 'healthy', uptime: 99.995 },
    { name: "ML Pipeline", status: 'healthy', uptime: 99.98 },
    { name: "Data Processing", status: 'healthy', uptime: 99.99 },
    { name: "Storage Layer", status: 'healthy', uptime: 100 }
  ],
  costBreakdown: [
    { category: "Compute", value: 42 },
    { category: "Storage", value: 28 },
    { category: "Network", value: 15 },
    { category: "ML Services", value: 15 }
  ]
}

// Demo scenarios for interactive visualization
const demoScenarios = [
  {
    name: "Normal Operations",
    description: "Baseline metrics under typical workload conditions",
    duration: 10
  },
  {
    name: "High Traffic Spike",
    description: "Simulate a 400% increase in traffic and user activity",
    duration: 15
  },
  {
    name: "Model Training",
    description: "Simulate resource usage during intensive model training",
    duration: 12
  },
  {
    name: "Failover Scenario",
    description: "Test system resilience with a simulated component failure",
    duration: 8
  }
]

// AI Features Data
const aiFeatures: AIFeature[] = [
  {
    name: "Predictive Analytics",
    description: "Leverage historical data and machine learning to forecast business outcomes and identify trends",
    icon: BarChart4,
    useCases: [
      "Sales forecasting and demand planning",
      "Customer churn prediction",
      "Inventory optimization",
      "Risk assessment and fraud detection"
    ],
    benefits: [
      "15-30% improvement in forecast accuracy",
      "Reduced operational costs through optimized resource allocation",
      "Early identification of business risks and opportunities",
      "Data-driven decision making across all departments"
    ],
    workflow: [
      {
        step: "Data Collection & Preparation",
        description: "Gather and clean historical data from relevant business systems"
      },
      {
        step: "Model Development",
        description: "Build and train machine learning models specific to your business needs"
      },
      {
        step: "Prediction Generation",
        description: "Deploy models to generate ongoing predictions and forecasts"
      },
      {
        step: "Business Integration",
        description: "Incorporate predictions into business processes and decision workflows"
      }
    ],
    techStack: ["TensorFlow", "PyTorch", "Scikit-learn", "Apache Spark", "Kubernetes"],
    implementation: "Implementation typically takes 8-12 weeks, beginning with a proof of concept focused on a specific business area before scaling across the organization."
  },
  {
    name: "Document Intelligence",
    description: "Extract and analyze information from documents using advanced OCR and NLP",
    icon: FileSearch,
    useCases: [
      "Automated invoice and receipt processing",
      "Contract analysis and management",
      "Compliance documentation review",
      "Customer document processing"
    ],
    benefits: [
      "80% reduction in manual document processing time",
      "Improved accuracy with 95%+ extraction precision",
      "Standardized document handling across departments",
      "Enhanced compliance with automatic audit trails"
    ],
    workflow: [
      {
        step: "Document Ingestion",
        description: "Upload or integrate document sources through APIs or direct scanning"
      },
      {
        step: "Information Extraction",
        description: "Automatically identify and extract key fields and data points"
      },
      {
        step: "Validation & Enhancement",
        description: "Apply business rules to validate extracted data and enhance with contextual information"
      },
      {
        step: "Integration & Workflow",
        description: "Push processed information to relevant systems and trigger appropriate workflows"
      }
    ],
    techStack: ["Transformer-based NLP", "Computer Vision", "Azure Form Recognizer", "Amazon Textract", "Google Document AI"],
    implementation: "Standard implementation takes 6-10 weeks, with custom models requiring additional training time based on document complexity."
  },
  {
    name: "Conversational AI",
    description: "Intelligent virtual assistants and chatbots that understand natural language and business context",
    icon: MessageSquare,
    useCases: [
      "24/7 customer support automation",
      "Employee self-service for HR and IT",
      "Sales qualification and lead generation",
      "Internal knowledge management assistance"
    ],
    benefits: [
      "70% resolution of common support queries without human intervention",
      "Reduced support costs while maintaining high satisfaction",
      "Consistent experience across all interaction channels",
      "Scalable support during peak demand periods"
    ],
    workflow: [
      {
        step: "Intent Modeling",
        description: "Define and train the system on common user requests and conversational flows"
      },
      {
        step: "Knowledge Integration",
        description: "Connect relevant data sources and APIs to provide accurate responses"
      },
      {
        step: "Conversation Design",
        description: "Create natural dialogue flows with appropriate tone and personality"
      },
      {
        step: "Continuous Improvement",
        description: "Monitor interactions and refine responses based on user feedback"
      }
    ],
    techStack: ["GPT-4", "BERT", "Azure Bot Service", "Amazon Lex", "Vector Databases"],
    implementation: "Basic implementation can be completed in 4-8 weeks, with ongoing refinement and expansion of capabilities."
  },
  {
    name: "Computer Vision",
    description: "AI-powered image and video analysis for object detection, classification, and visual inspection",
    icon: ScanSearch,
    useCases: [
      "Quality control and defect detection",
      "Security and surveillance monitoring",
      "Retail analytics and shopper behavior",
      "Medical image analysis and diagnostics"
    ],
    benefits: [
      "Up to 99% accuracy in visual inspection tasks",
      "24/7 monitoring capability without fatigue",
      "Real-time alerts for anomalies or security concerns",
      "Scalable processing of vast image and video datasets"
    ],
    workflow: [
      {
        step: "Visual Data Collection",
        description: "Gather and annotate representative images or video from your environment"
      },
      {
        step: "Model Training",
        description: "Develop and fine-tune vision models specific to your detection needs"
      },
      {
        step: "Deployment & Integration",
        description: "Install necessary hardware and integrate with existing systems"
      },
      {
        step: "Monitoring & Alerting",
        description: "Establish threshold-based alerts and reporting dashboards"
      }
    ],
    techStack: ["TensorFlow", "PyTorch", "OpenCV", "NVIDIA TensorRT", "Azure Computer Vision"],
    implementation: "Implementation timeframe ranges from 8-16 weeks depending on hardware requirements and complexity of detection needs."
  }
];

export default function EnterpriseSolutionsPage() {
  const [activeTab, setActiveTab] = useState("solutions")
  const [selectedSolution, setSelectedSolution] = useState<EnterpriseSolution>(enterpriseSolutions[0])
  const [demoMetrics, setDemoMetrics] = useState<DemoMetrics>(initialDemoMetrics)
  const [isAnnualBilling, setIsAnnualBilling] = useState(false)
  const [demoNodeCount, setDemoNodeCount] = useState(3)
  const [isRunningDemo, setIsRunningDemo] = useState(false)
  const [activeFeature, setActiveFeature] = useState("deployment")
  const [selectedIndustry, setSelectedIndustry] = useState(industryFocus[0])
  const [showIndustryModal, setShowIndustryModal] = useState(false)
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [demoScenarioRunning, setDemoScenarioRunning] = useState(false)
  const [demoProgress, setDemoProgress] = useState(0)
  const [activeVisual, setActiveVisual] = useState("performance")
  const [selectedAIFeature, setSelectedAIFeature] = useState<AIFeature>(aiFeatures[0])
  const [showAIModal, setShowAIModal] = useState(false)
  const [expandedUseCases, setExpandedUseCases] = useState(false)
  
  // ROI Calculator state
  const [roiInputs, setRoiInputs] = useState({
    employees: 500,
    annualRevenue: 50000000,
    currentTechSpend: 2000000,
    dataVolume: 5,
    manualProcesses: 60
  })
  const [roiResults, setRoiResults] = useState<null | {
    costReduction: number,
    revenueIncrease: number,
    productivityGain: number,
    timeToValue: number,
    roi: number,
    paybackPeriod: number
  }>(null)

  // Function to handle solution selection
  const handleSolutionSelect = (solution: EnterpriseSolution) => {
    setSelectedSolution(solution);
    toast.success(`${solution.title} selected`);
  }

  // Function to simulate load on the demo system
  const simulateLoad = () => {
    setIsRunningDemo(true);
    
    // Simulate changing metrics over time
    const interval = setInterval(() => {
      setDemoMetrics(prev => ({
        ...prev,
        cpu: [...prev.cpu.slice(1), Math.min(95, prev.cpu[prev.cpu.length - 1] + Math.floor(Math.random() * 10) - 3)],
        memory: [...prev.memory.slice(1), Math.min(95, prev.memory[prev.memory.length - 1] + Math.floor(Math.random() * 8) - 3)],
        network: [...prev.network.slice(1), Math.min(95, prev.network[prev.network.length - 1] + Math.floor(Math.random() * 12) - 5)],
        throughput: [...prev.throughput.slice(1), Math.max(100, prev.throughput[prev.throughput.length - 1] + Math.floor(Math.random() * 50) - 20)],
        users: prev.users + Math.floor(Math.random() * 100) - 40,
        requests: prev.requests + Math.floor(Math.random() * 30) - 10,
        responseTime: Math.max(10, prev.responseTime + Math.floor(Math.random() * 10) - 5),
        errorRate: Math.max(0.01, Math.min(0.2, prev.errorRate + (Math.random() * 0.04) - 0.02)),
        availability: Math.min(100, Math.max(99.5, prev.availability - (Math.random() * 0.1) + 0.05))
      }));
    }, 1500);
    
    // Stop after 15 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsRunningDemo(false);
      toast.success("Load test completed successfully");
      
      // Reset to stable metrics
      setDemoMetrics({
        ...initialDemoMetrics,
        cpu: [28, 32, 30, 34, 33, 35, 30],
        memory: [45, 48, 46, 50, 47, 49, 45],
        network: [20, 25, 22, 28, 24, 26, 22],
        throughput: [200, 220, 210, 230, 215, 225, 205]
      });
    }, 15000);
  }

  // Function to handle node scaling
  const handleNodeScale = (newCount: number) => {
    setDemoNodeCount(newCount);
    
    toast.success(`Cluster scaled to ${newCount} nodes`);
    
    // Simulate changes to metrics based on node count
    setDemoMetrics(prev => ({
      ...prev,
      cpu: prev.cpu.map(val => Math.max(15, val - (newCount - 3) * 5)),
      memory: prev.memory.map(val => Math.max(20, val - (newCount - 3) * 4)),
      responseTime: Math.max(15, prev.responseTime - (newCount - 3) * 5)
    }));
  }

  // Calculate ROI based on inputs
  const calculateROI = () => {
    const { employees, annualRevenue, currentTechSpend, dataVolume, manualProcesses } = roiInputs
    
    // Calculate ROI metrics based on inputs and industry benchmarks
    const costReduction = currentTechSpend * 0.25 // 25% cost reduction
    const revenueIncrease = annualRevenue * 0.08 // 8% revenue increase
    const productivityGain = employees * 12000 // $12K per employee productivity gain
    const timeToValue = 6 - (manualProcesses / 20) // 4-6 months time to value
    
    // Calculate ROI and payback period
    const totalBenefit = costReduction + revenueIncrease + productivityGain
    const implementation = currentTechSpend * 0.5 // Estimated implementation cost
    const roi = (totalBenefit / implementation) * 100
    const paybackPeriod = implementation / (totalBenefit / 12)
    
    setRoiResults({
      costReduction,
      revenueIncrease,
      productivityGain,
      timeToValue,
      roi,
      paybackPeriod
    })
    
    toast.success("ROI calculation complete")
  }

  // Reset ROI calculator
  const resetROI = () => {
    setRoiInputs({
      employees: 500,
      annualRevenue: 50000000,
      currentTechSpend: 2000000,
      dataVolume: 5,
      manualProcesses: 60
    })
    setRoiResults(null)
  }

  // Run a specific demo scenario
  const runDemoScenario = (scenarioName: string) => {
    const scenario = demoScenarios.find(s => s.name === scenarioName);
    if (!scenario) return;
    
    setActiveDemo(scenarioName);
    setDemoScenarioRunning(true);
    setDemoProgress(0);
    
    toast.success(`Running "${scenarioName}" scenario`);
    
    // Update metrics based on the scenario
    let scenarioEffects: Partial<DemoMetrics> = {};
    
    switch(scenarioName) {
      case "High Traffic Spike":
        scenarioEffects = {
          cpu: [65, 72, 78, 85, 82, 88, 92],
          memory: [70, 75, 80, 85, 82, 88, 90],
          network: [60, 68, 75, 80, 78, 82, 85],
          throughput: [600, 750, 820, 900, 880, 950, 980],
          users: 4800,
          requests: 1850,
          responseTime: 68,
          errorRate: 0.12
        };
        break;
      case "Model Training":
        scenarioEffects = {
          cpu: [85, 90, 92, 95, 94, 96, 95],
          memory: [80, 85, 88, 90, 92, 94, 95],
          network: [40, 42, 45, 48, 46, 50, 48],
          throughput: [280, 290, 300, 310, 305, 315, 310],
          users: 950,
          requests: 380,
          responseTime: 55,
          errorRate: 0.03
        };
        break;
      case "Failover Scenario":
        scenarioEffects = {
          cpu: [45, 60, 85, 75, 65, 55, 40],
          memory: [50, 65, 75, 70, 60, 55, 50],
          network: [35, 55, 70, 60, 50, 40, 35],
          throughput: [280, 180, 120, 220, 350, 380, 400],
          users: 1200,
          requests: 430,
          responseTime: 85,
          errorRate: 0.25,
          serviceHealth: [
            { name: "API Gateway", status: 'healthy', uptime: 99.995 },
            { name: "ML Pipeline", status: 'degraded', uptime: 98.5 },
            { name: "Data Processing", status: 'unhealthy', uptime: 95.2 },
            { name: "Storage Layer", status: 'healthy', uptime: 99.99 }
          ]
        };
        break;
      default: // Normal Operations - reset to baseline
        scenarioEffects = { ...initialDemoMetrics };
    }
    
    // Apply scenario effects to demo metrics
    setDemoMetrics(prev => ({
      ...prev,
      ...scenarioEffects
    }));
    
    // Progress bar simulation
    const interval = setInterval(() => {
      setDemoProgress(prev => {
        const newProgress = prev + (100 / (scenario.duration * 2));
        if (newProgress >= 100) {
          clearInterval(interval);
          setDemoScenarioRunning(false);
          toast.success(`"${scenarioName}" scenario completed`);
          return 100;
        }
        return newProgress;
      });
    }, 500);
    
    // Reset after completion
    setTimeout(() => {
      if (scenarioName !== "Normal Operations") {
        setDemoMetrics({...initialDemoMetrics});
      }
      setActiveDemo(null);
      setDemoProgress(0);
    }, scenario.duration * 1000 + 2000);
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* Enhanced Hero Section with PaaS Focus */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="relative bg-black/30 border border-white/10 rounded-2xl p-3 mb-2">
                <div className="flex items-center gap-3 px-3 py-1">
                  <Server className="h-5 w-5 text-purple-400" />
                  <Cloud className="h-5 w-5 text-purple-400" />
                  <Database className="h-5 w-5 text-purple-400" />
                  <Network className="h-5 w-5 text-purple-400" />
                  <Code className="h-5 w-5 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
          
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-4">
            Enterprise Platform as a Service
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-400 to-blue-600">
              Enterprise Cloud Platform
            </span>
            <br />
            <span className="text-white">
              Powering Digital Transformation
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
            A comprehensive enterprise PaaS solution that accelerates development, 
            streamlines operations, and delivers scalable, secure applications across 
            multi-cloud environments.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            <div className="bg-black/30 border border-white/10 rounded-xl p-4 flex flex-col items-center">
              <Cloud className="h-8 w-8 text-purple-400 mb-2" />
              <h3 className="text-sm font-medium">Multi-Cloud</h3>
              <p className="text-xs text-white/60 text-center">Deploy across any cloud provider</p>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-xl p-4 flex flex-col items-center">
              <Zap className="h-8 w-8 text-purple-400 mb-2" />
              <h3 className="text-sm font-medium">Accelerated DevOps</h3>
              <p className="text-xs text-white/60 text-center">Streamline CI/CD workflows</p>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-xl p-4 flex flex-col items-center">
              <Shield className="h-8 w-8 text-purple-400 mb-2" />
              <h3 className="text-sm font-medium">Enterprise Security</h3>
              <p className="text-xs text-white/60 text-center">SOC2 and HIPAA compliant</p>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-xl p-4 flex flex-col items-center">
              <Brain className="h-8 w-8 text-purple-400 mb-2" />
              <h3 className="text-sm font-medium">AI-Powered</h3>
              <p className="text-xs text-white/60 text-center">Built-in ML capabilities</p>
            </div>
          </div>
          
          {/* Industry Focus Selector */}
          <div className="max-w-xl mx-auto bg-black/30 border border-white/10 rounded-xl p-4 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Industry Focus: <span className="text-purple-400">{selectedIndustry.name}</span></h3>
              <Button variant="outline" size="sm" onClick={() => setShowIndustryModal(true)}>
                Change Industry
              </Button>
            </div>
            <p className="text-sm text-white/70 mb-4">{selectedIndustry.description}</p>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(selectedIndustry.metrics).map(([key, value]) => (
                <div key={key} className="bg-black/40 border border-white/10 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className="text-xl font-bold text-purple-400">{String(value)}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Server className="mr-2 h-4 w-4" />
              Deploy Enterprise PaaS
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500/20 hover:border-purple-500/40">
              <FileText className="mr-2 h-4 w-4" />
              Platform Documentation
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="flex items-center">
              <Badge className="bg-black/30 text-white/70 border-white/10 flex gap-2 items-center">
                <img src="/aws-logo.png" alt="AWS" className="h-4 w-4" />
                <span>AWS Partner</span>
              </Badge>
            </div>
            <div className="flex items-center">
              <Badge className="bg-black/30 text-white/70 border-white/10 flex gap-2 items-center">
                <img src="/azure-logo.png" alt="Azure" className="h-4 w-4" />
                <span>Azure Certified</span>
              </Badge>
            </div>
            <div className="flex items-center">
              <Badge className="bg-black/30 text-white/70 border-white/10 flex gap-2 items-center">
                <img src="/gcp-logo.png" alt="GCP" className="h-4 w-4" />
                <span>GCP Ready</span>
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Industry Selection Modal */}
      <Dialog open={showIndustryModal} onOpenChange={setShowIndustryModal}>
        <DialogContent className="bg-black/80 border-white/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Your Industry</DialogTitle>
            <DialogDescription>
              Customize your enterprise solution to match your industry needs
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 my-4">
            {industryFocus.map((industry) => (
              <div 
                key={industry.name}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedIndustry.name === industry.name 
                    ? 'bg-purple-950/30 border-purple-500/50' 
                    : 'bg-black/40 border-white/10 hover:border-white/30'
                }`}
                onClick={() => {
                  setSelectedIndustry(industry);
                  setShowIndustryModal(false);
                  toast.success(`Industry focus updated to ${industry.name}`);
                }}
              >
                <div className="flex gap-3 items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <industry.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="font-medium">{industry.name}</h3>
                </div>
                <p className="text-sm text-white/70">{industry.description}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Navigation Tabs */}
      <Tabs defaultValue="solutions" className="mb-16" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 max-w-xl mx-auto bg-black/20">
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="capabilities">Platform</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="approach">Implementation</TabsTrigger>
        </TabsList>
        
        {/* Solutions Tab - Keep existing with some enhancements */}
        <TabsContent value="solutions" className="mt-8">
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Enterprise AI Solutions</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Comprehensive AI solutions designed to address specific business challenges across your organization
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enterpriseSolutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  onClick={() => handleSolutionSelect(solution)}
                >
                  <Card className={`bg-black/40 border-white/10 hover:border-purple-500/50 transition-colors duration-300 h-full cursor-pointer ${selectedSolution.title === solution.title ? 'border-purple-500/70' : ''}`}>
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                        {solution.icon && <solution.icon className="h-6 w-6 text-purple-400" />}
                      </div>
                      <CardTitle>{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white/70">{solution.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="p-0 h-auto text-sm hover:bg-transparent hover:text-white group text-purple-400">
                        <span>Learn more</span>
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* AI Feature Exploration */}
          <div className="mt-16 bg-black/30 border border-white/10 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">AI Feature Exploration</h2>
                <p className="text-white/70">
                  Discover how specific AI capabilities can transform your business operations
                </p>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowAIModal(true)}
              >
                <Bot className="mr-2 h-4 w-4" />
                Request AI Consultation
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Feature Selector */}
              <div className="space-y-4">
                {aiFeatures.map((feature) => (
                  <div 
                    key={feature.name}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAIFeature.name === feature.name 
                        ? 'bg-purple-950/30 border-purple-500/50' 
                        : 'bg-black/40 border-white/10 hover:border-white/30'
                    }`}
                    onClick={() => setSelectedAIFeature(feature)}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{feature.name}</h3>
                        <p className="text-sm text-white/70 mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Selected AI Feature Details */}
              <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <selectedAIFeature.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold">{selectedAIFeature.name}</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Use Cases */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-white/80">Common Use Cases</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-xs"
                        onClick={() => setExpandedUseCases(!expandedUseCases)}
                      >
                        {expandedUseCases ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {selectedAIFeature.useCases.slice(0, expandedUseCases ? undefined : 2).map((useCase, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0"></div>
                          <span className="text-sm text-white/70">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Implementation Workflow */}
                  <div>
                    <h4 className="text-sm font-medium text-white/80 mb-3">Implementation Workflow</h4>
                    <div className="space-y-4">
                      {selectedAIFeature.workflow.map((step, idx) => (
                        <div key={idx} className="relative pl-8 pb-4">
                          {idx < selectedAIFeature.workflow.length - 1 && (
                            <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-purple-500/30"></div>
                          )}
                          <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <h5 className="text-sm font-medium">{step.step}</h5>
                            <p className="text-xs text-white/70 mt-1">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Key Benefits */}
                  <div>
                    <h4 className="text-sm font-medium text-white/80 mb-2">Key Benefits</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedAIFeature.benefits.slice(0, 4).map((benefit, idx) => (
                        <div key={idx} className="border border-white/10 bg-black/20 rounded-lg p-2 text-xs">
                          <Check className="h-3 w-3 text-purple-400 mb-1" />
                          <span className="text-white/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-medium text-white/80 mb-2">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAIFeature.techStack.map((tech, idx) => (
                        <Badge key={idx} className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Share2 className="mr-2 h-4 w-4" />
                    Explore {selectedAIFeature.name} Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* AI Consultation Modal */}
        <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
          <DialogContent className="bg-black/80 border-white/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule AI Consultation</DialogTitle>
              <DialogDescription>
                Discuss your specific business needs with our AI experts
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter your company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interest">Area of Interest</Label>
                <Select defaultValue={selectedAIFeature.name}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aiFeatures.map(feature => (
                      <SelectItem key={feature.name} value={feature.name}>
                        {feature.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="multiple">Multiple Areas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Additional Details</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your specific challenges or requirements"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => {
                toast.success("Consultation request submitted!");
                setShowAIModal(false);
              }}>
                Submit Request
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowAIModal(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* New Platform Capabilities Tab */}
        <TabsContent value="capabilities" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card className="bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {selectedSolution.title} Platform
                  </CardTitle>
                  <CardDescription>
                    Enterprise-grade infrastructure built for scale and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Platform Capabilities Section */}
                  <div className="space-y-6">
                    {selectedSolution.capabilities?.map((capability, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          {capability.icon && <capability.icon className="h-6 w-6 text-purple-400" />}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">{capability.title}</h3>
                          <p className="text-sm text-white/70">{capability.description}</p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3">
                            {capability.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="mt-1 h-2 w-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                                <span className="text-xs text-white/70">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Deployment Options */}
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Deployment Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedSolution.deployments?.map((deployment, i) => (
                        <div key={i} className="border border-white/10 rounded-lg p-4 bg-black/30 hover:bg-black/40 hover:border-purple-500/30 transition-all">
                          <div className="flex items-center gap-3 mb-3">
                            {deployment.icon && <deployment.icon className="h-5 w-5 text-purple-400" />}
                            <h4 className="font-medium">{deployment.title}</h4>
                          </div>
                          <p className="text-sm text-white/70 mb-3">{deployment.description}</p>
                          <ul className="space-y-1">
                            {deployment.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs">
                                <Check className="h-3.5 w-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                                <span className="text-white/70">{feature}</span>
                              </li>
                            ))}
                            {deployment.features.length > 2 && (
                              <li className="text-xs text-purple-400 hover:underline cursor-pointer">
                                +{deployment.features.length - 2} more features
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Enhanced Live Demo Panel */}
            <div className="space-y-6">
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Enterprise Platform Demo</CardTitle>
                    <Badge className={isRunningDemo || demoScenarioRunning ? "bg-green-500/20 text-green-400" : "bg-purple-500/20 text-purple-400"}>
                      {isRunningDemo || demoScenarioRunning ? "Running" : "Ready"}
                    </Badge>
                  </div>
                  <CardDescription>
                    Simulate enterprise workloads and monitor performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Demo Scenario Selector */}
                  <div>
                    <Label className="mb-2 block">Demo Scenarios</Label>
                    <div className="space-y-2">
                      {demoScenarios.map((scenario) => (
                        <Button 
                          key={scenario.name}
                          variant={activeDemo === scenario.name ? "default" : "outline"} 
                          className={`w-full justify-start text-left h-auto py-2 px-3 ${
                            activeDemo === scenario.name 
                              ? "bg-purple-600 hover:bg-purple-700" 
                              : "border-white/10"
                          }`}
                          onClick={() => runDemoScenario(scenario.name)}
                          disabled={demoScenarioRunning}
                        >
                          <div>
                            <div className="font-medium">{scenario.name}</div>
                            <div className="text-xs text-white/70 mt-1">{scenario.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Demo Progress */}
                  {demoScenarioRunning && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Running: {activeDemo}</span>
                        <span className="text-sm">{Math.round(demoProgress)}%</span>
                      </div>
                      <Progress value={demoProgress} className="h-2" />
                    </div>
                  )}
                  
                  {/* Resource Metrics */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU Utilization</span>
                        <span>{demoMetrics.cpu[demoMetrics.cpu.length - 1]}%</span>
                      </div>
                      <Progress value={demoMetrics.cpu[demoMetrics.cpu.length - 1]} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Memory Usage</span>
                        <span>{demoMetrics.memory[demoMetrics.memory.length - 1]}%</span>
                      </div>
                      <Progress value={demoMetrics.memory[demoMetrics.memory.length - 1]} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Network I/O</span>
                        <span>{demoMetrics.network[demoMetrics.network.length - 1]}%</span>
                      </div>
                      <Progress value={demoMetrics.network[demoMetrics.network.length - 1]} className="h-2" />
                    </div>
                  </div>
                  
                  {/* Advanced Visualization Controls */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-4">
                      <Label>Advanced Visualization</Label>
                      <Select 
                        value={activeVisual} 
                        onValueChange={setActiveVisual}
                      >
                        <SelectTrigger className="w-[180px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">Performance Metrics</SelectItem>
                          <SelectItem value="regional">Regional Distribution</SelectItem>
                          <SelectItem value="models">Model Performance</SelectItem>
                          <SelectItem value="services">Service Health</SelectItem>
                          <SelectItem value="cost">Cost Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Performance Metrics Visualization */}
                    {activeVisual === "performance" && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="border border-white/10 rounded-lg p-3 bg-black/20">
                            <div className="text-xs text-white/50 mb-1">Active Users</div>
                            <div className="text-lg font-semibold">{demoMetrics.users.toLocaleString()}</div>
                          </div>
                          <div className="border border-white/10 rounded-lg p-3 bg-black/20">
                            <div className="text-xs text-white/50 mb-1">Requests/sec</div>
                            <div className="text-lg font-semibold">{demoMetrics.requests}</div>
                          </div>
                          <div className="border border-white/10 rounded-lg p-3 bg-black/20">
                            <div className="text-xs text-white/50 mb-1">Avg. Response Time</div>
                            <div className="text-lg font-semibold">{demoMetrics.responseTime}ms</div>
                          </div>
                          <div className="border border-white/10 rounded-lg p-3 bg-black/20">
                            <div className="text-xs text-white/50 mb-1">Error Rate</div>
                            <div className="text-lg font-semibold">{(demoMetrics.errorRate * 100).toFixed(2)}%</div>
                          </div>
                        </div>
                        
                        <div className="border border-white/10 rounded-lg p-3 bg-black/20 h-32 flex items-center justify-center">
                          <div className="text-center">
                            <Activity className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                            <div className="text-sm font-medium">Performance Dashboard</div>
                            <div className="text-xs text-white/50">Interactive charts would render here</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Regional Distribution Visualization */}
                    {activeVisual === "regional" && (
                      <div className="space-y-3">
                        <div className="border border-white/10 rounded-lg p-3 bg-black/20 h-52">
                          <div className="text-sm font-medium mb-2">Regional User Distribution</div>
                          <div className="grid grid-cols-4 gap-2 h-36">
                            {demoMetrics.regionData.map((region) => (
                              <div 
                                key={region.name} 
                                className="relative flex flex-col justify-end"
                              >
                                <div 
                                  className="bg-purple-600 rounded-t-sm w-full absolute bottom-0"
                                  style={{ height: `${(region.users / 600) * 100}%` }}
                                ></div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-1">
                            {demoMetrics.regionData.map((region) => (
                              <div key={region.name} className="text-xs text-white/60 text-center w-1/4 truncate">
                                {region.name.split(' ')[0]}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {demoMetrics.regionData.map((region) => (
                            <div key={region.name} className="border border-white/10 rounded-lg p-3 bg-black/20">
                              <div className="text-xs text-white/50 mb-1">{region.name}</div>
                              <div className="flex justify-between">
                                <div className="text-sm">{region.users} users</div>
                                <div className="text-sm text-purple-400">{region.performance}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Model Performance Visualization */}
                    {activeVisual === "models" && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          {demoMetrics.modelPerformance.map((model) => (
                            <div key={model.name} className="border border-white/10 rounded-lg p-3 bg-black/20">
                              <div className="text-xs text-white/50 mb-1">{model.name}</div>
                              <div className="flex justify-between items-center mt-1">
                                <div className="text-sm font-medium">{model.accuracy}%</div>
                                <Badge className="bg-purple-500/10 text-purple-400 text-xs h-5">
                                  {model.latency}ms
                                </Badge>
                              </div>
                              <Progress value={model.accuracy} className="h-1.5 mt-2" />
                            </div>
                          ))}
                        </div>
                        
                        <div className="border border-white/10 rounded-lg p-4 bg-black/20">
                          <div className="text-sm font-medium mb-3">Model Performance Matrix</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <Target className="h-4 w-4 text-purple-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Accuracy</div>
                                <div className="text-xs text-white/60">92.6% average</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <Zap className="h-4 w-4 text-purple-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Latency</div>
                                <div className="text-xs text-white/60">40ms average</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <CpuIcon className="h-4 w-4 text-purple-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Compute</div>
                                <div className="text-xs text-white/60">8.5 TFLOPS</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <Layers className="h-4 w-4 text-purple-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Parameters</div>
                                <div className="text-xs text-white/60">2.4B avg</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Service Health Visualization */}
                    {activeVisual === "services" && (
                      <div className="space-y-3">
                        {demoMetrics.serviceHealth.map((service) => (
                          <div 
                            key={service.name} 
                            className={`border rounded-lg p-3 flex justify-between items-center ${
                              service.status === 'healthy' 
                                ? 'border-green-500/30 bg-green-500/5' 
                                : service.status === 'degraded'
                                  ? 'border-yellow-500/30 bg-yellow-500/5'
                                  : 'border-red-500/30 bg-red-500/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                service.status === 'healthy' 
                                  ? 'bg-green-400' 
                                  : service.status === 'degraded'
                                    ? 'bg-yellow-400' 
                                    : 'bg-red-400'
                              }`}></div>
                              <div>
                                <div className="text-sm font-medium">{service.name}</div>
                                <div className="text-xs text-white/60">{service.uptime}% uptime</div>
                              </div>
                            </div>
                            <Badge className={`text-xs ${
                              service.status === 'healthy'
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : service.status === 'degraded'
                                  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                  : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }`}>
                              {service.status}
                            </Badge>
                          </div>
                        ))}
                        
                        <div className="border border-white/10 rounded-lg p-3 bg-black/20">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-medium">Overall System Health</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {activeDemo === "Failover Scenario" ? "96.5%" : "99.98%"}
                            </Badge>
                          </div>
                          <div className="h-16 flex items-center justify-center">
                            <GaugeCircle className="h-10 w-10 text-purple-400" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Cost Analysis Visualization */}
                    {activeVisual === "cost" && (
                      <div className="space-y-3">
                        <div className="border border-white/10 rounded-lg p-4 bg-black/20">
                          <div className="text-sm font-medium mb-3">Cost Distribution</div>
                          <div className="flex space-x-1 h-10 mb-2">
                            {demoMetrics.costBreakdown.map((item, index) => (
                              <div 
                                key={item.category} 
                                className="h-full rounded-sm"
                                style={{ 
                                  width: `${item.value}%`,
                                  backgroundColor: [
                                    '#9333ea', '#a855f7', '#c084fc', '#d8b4fe'
                                  ][index % 4]
                                }}
                              ></div>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {demoMetrics.costBreakdown.map((item) => (
                              <div key={item.category} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
                                <div className="text-xs text-white/70">{item.category}: {item.value}%</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="border border-white/10 rounded-lg p-3 bg-black/20">
                            <div className="text-xs text-white/50 mb-1">Monthly Cost</div>
                            <div className="text-lg font-semibold">$12,850</div>
                          </div>
                          <div className="border border-white/10 rounded-lg p-3 bg-black/20">
                            <div className="text-xs text-white/50 mb-1">Annual Savings</div>
                            <div className="text-lg font-semibold text-green-400">$42,600</div>
                          </div>
                        </div>
                        
                        <div className="border border-white/10 rounded-lg p-3 bg-black/20">
                          <div className="text-xs text-white/50 mb-1">Cost Optimization Opportunities</div>
                          <div className="space-y-2 mt-2">
                            <div className="flex justify-between items-center">
                              <div className="text-xs">Right-sizing compute resources</div>
                              <Badge className="bg-green-500/10 text-green-400 text-xs">$8,200/yr</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-xs">Storage tiering optimization</div>
                              <Badge className="bg-green-500/10 text-green-400 text-xs">$5,400/yr</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Cluster Scaling Controls */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Cluster Nodes: {demoNodeCount}</span>
                      <span className="text-white/70">(1-10 nodes)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => demoNodeCount > 1 && handleNodeScale(demoNodeCount - 1)}
                        disabled={demoNodeCount <= 1 || isRunningDemo || demoScenarioRunning}
                      >
                        <span>-</span>
                      </Button>
                      <Slider 
                        value={[demoNodeCount]} 
                        min={1} 
                        max={10} 
                        step={1} 
                        className="flex-1"
                        onValueChange={(value: number[]) => handleNodeScale(value[0])}
                        disabled={isRunningDemo || demoScenarioRunning}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => demoNodeCount < 10 && handleNodeScale(demoNodeCount + 1)}
                        disabled={demoNodeCount >= 10 || isRunningDemo || demoScenarioRunning}
                      >
                        <span>+</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Demo Controls */}
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700" 
                    onClick={simulateLoad}
                    disabled={isRunningDemo || demoScenarioRunning}
                  >
                    {isRunningDemo ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Running Load Test...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Run Custom Load Test
                      </>
                    )}
                  </Button>
                  
                  <div className="text-xs text-white/50 text-center">
                    Simulates high-traffic enterprise workload
                  </div>
                </CardContent>
              </Card>
              
              {/* Integration Showcase */}
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle>Integration Ecosystem</CardTitle>
                  <CardDescription>
                    Connect with your existing enterprise systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedSolution.integrations?.slice(0, 6).map((integration, i) => (
                      <div key={i} className="flex flex-col items-center p-3 border border-white/10 rounded-lg hover:border-purple-500/30 hover:bg-black/30 transition-all">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
                          {integration.icon && <integration.icon className="h-4 w-4 text-purple-400" />}
                        </div>
                        <div className="text-xs font-medium text-center truncate w-full">
                          {integration.name}
                        </div>
                        <div className="text-[10px] text-white/50 text-center">
                          {integration.category}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedSolution.integrations && selectedSolution.integrations.length > 6 && (
                    <Button variant="ghost" size="sm" className="w-full mt-3 text-xs text-purple-400">
                      View all {selectedSolution.integrations.length} integrations
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Pricing Section */}
          {selectedSolution.pricing && (
            <div className="mt-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Enterprise Pricing</h2>
                <p className="text-white/70">
                  Flexible plans designed for organizations of all sizes
                </p>
                
                <div className="flex items-center justify-center mt-6 mb-8">
                  <div className="flex items-center space-x-2 bg-black/40 p-1.5 rounded-lg border border-white/10">
                    <button
                      className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                        !isAnnualBilling
                          ? "bg-purple-600 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setIsAnnualBilling(false)}
                    >
                      Monthly
                    </button>
                    <button
                      className={`px-4 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2 ${
                        isAnnualBilling
                          ? "bg-purple-600 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setIsAnnualBilling(true)}
                    >
                      Annual <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">Save 20%</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {selectedSolution.pricing.map((tier, index) => (
                  <Card 
                    key={index} 
                    className={`backdrop-blur-sm h-full flex flex-col ${
                      tier.popular 
                        ? "bg-purple-950/30 border-purple-500/50 relative overflow-hidden" 
                        : "bg-black/40 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -right-12 -top-3 rotate-45 bg-purple-600 text-white px-12 py-1 text-xs font-medium">
                        Popular
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle>{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      
                      <div className="mt-4 mb-2">
                        <div className="flex items-end gap-1">
                          <span className="text-3xl font-bold">
                            ${isAnnualBilling 
                              ? Math.floor(tier.price.annual / 12).toLocaleString() 
                              : tier.price.monthly.toLocaleString()}
                          </span>
                          <span className="text-white/70 text-sm mb-1">/month</span>
                        </div>
                        
                        {isAnnualBilling && (
                          <div className="text-sm text-white/70">
                            Billed annually (${tier.price.annual.toLocaleString()})
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      <div className="space-y-3 mb-6">
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <Check className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className={`w-full ${
                          tier.popular 
                            ? "bg-purple-600 hover:bg-purple-700" 
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {tier.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        {/* Keep existing case-studies and approach tabs */}
        <TabsContent value="case-studies" className="mt-8">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className="bg-black/40 border-white/10 hover:border-purple-500/30 transition-colors duration-300 h-full">
                  <CardHeader className="pb-2">
                    <div className="w-full h-32 rounded-lg bg-black/60 flex items-center justify-center mb-4 overflow-hidden">
                      <img 
                        src={study.logo} 
                        alt={study.company} 
                        className="max-h-20 w-auto"
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/400x200/1a1a1a/a855f7?text=${study.company}`
                        }}
                      />
                    </div>
                    <Badge className="mb-2 bg-purple-500/10 text-purple-400 border-purple-500/20">
                      {study.industry}
                    </Badge>
                    <CardTitle>{study.company}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-white/60 mb-1">Challenge:</h4>
                        <p className="text-white/80">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white/60 mb-1">Solution:</h4>
                        <p className="text-white/80">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white/60 mb-1">Results:</h4>
                        <ul className="space-y-1">
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-4 w-4 text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-white/80">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-purple-500/20 hover:border-purple-500/40">
                      Read Full Case Study
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        {/* Implementation Approach Tab - Enhanced with Timeline and ROI Calculator */}
        <TabsContent value="approach" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6">Enterprise Implementation</h2>
                <p className="text-white/70 mb-8">
                  We understand that implementing AI at the enterprise level requires more than just technology—it requires a strategic approach that aligns with your business goals, culture, and existing systems.
                </p>
                
                <div className="space-y-12">
                  {implementationPhases.map((phase, index) => (
                    <div key={index} className="relative pl-10 pb-6">
                      {/* Timeline connector */}
                      {index < implementationPhases.length - 1 && (
                        <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-purple-500/30"></div>
                      )}
                      
                      {/* Phase dot */}
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
                        <phase.icon className="h-4 w-4 text-purple-400" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{phase.name}</h3>
                          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                            {phase.duration}
                          </Badge>
                        </div>
                        <p className="text-white/70 mb-4">{phase.description}</p>
                        <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                          <h4 className="text-sm font-medium mb-2">Deliverables:</h4>
                          <ul className="space-y-1">
                            {phase.deliverables.map((deliverable, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm text-white/80">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-6">
              {/* ROI Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-black/40 border-white/10 overflow-hidden">
                  <CardHeader className="bg-black/30">
                    <CardTitle>Enterprise ROI Calculator</CardTitle>
                    <CardDescription>
                      Estimate the return on investment for your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="employees">Number of Employees</Label>
                        <div className="flex gap-4">
                          <Input
                            id="employees"
                            type="number"
                            value={roiInputs.employees}
                            onChange={(e) => setRoiInputs({...roiInputs, employees: Number(e.target.value)})}
                            className="flex-1"
                          />
                          <Select
                            value={roiInputs.employees.toString()}
                            onValueChange={(value) => setRoiInputs({...roiInputs, employees: Number(value)})}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="100">100</SelectItem>
                              <SelectItem value="500">500</SelectItem>
                              <SelectItem value="1000">1,000</SelectItem>
                              <SelectItem value="5000">5,000</SelectItem>
                              <SelectItem value="10000">10,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="revenue">Annual Revenue (USD)</Label>
                        <Input
                          id="revenue"
                          type="number"
                          value={roiInputs.annualRevenue}
                          onChange={(e) => setRoiInputs({...roiInputs, annualRevenue: Number(e.target.value)})}
                          className="flex-1"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="techSpend">Current Technology Spend (USD/year)</Label>
                        <Input
                          id="techSpend"
                          type="number"
                          value={roiInputs.currentTechSpend}
                          onChange={(e) => setRoiInputs({...roiInputs, currentTechSpend: Number(e.target.value)})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dataVolume">Data Volume (TB/month)</Label>
                        <Slider
                          id="dataVolume"
                          min={1}
                          max={50}
                          step={1}
                          value={[roiInputs.dataVolume]}
                          onValueChange={(value) => setRoiInputs({...roiInputs, dataVolume: value[0]})}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-white/50">
                          <span>1 TB</span>
                          <span>{roiInputs.dataVolume} TB</span>
                          <span>50 TB</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="manualProcesses">Current Manual Processes (%)</Label>
                        <Slider
                          id="manualProcesses"
                          min={10}
                          max={90}
                          step={5}
                          value={[roiInputs.manualProcesses]}
                          onValueChange={(value) => setRoiInputs({...roiInputs, manualProcesses: value[0]})}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-white/50">
                          <span>10%</span>
                          <span>{roiInputs.manualProcesses}%</span>
                          <span>90%</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1 bg-purple-600 hover:bg-purple-700" 
                          onClick={calculateROI}
                        >
                          Calculate ROI
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-white/10"
                          onClick={resetROI}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                    
                    {/* Results Section */}
                    {roiResults && (
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <h3 className="text-xl font-bold mb-4">Projected 3-Year Impact</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                            <div className="text-xs text-white/60 mb-1">Cost Reduction</div>
                            <div className="text-2xl font-bold text-green-400">
                              ${(roiResults.costReduction * 3).toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                            <div className="text-xs text-white/60 mb-1">Revenue Impact</div>
                            <div className="text-2xl font-bold text-green-400">
                              ${(roiResults.revenueIncrease * 3).toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                            <div className="text-xs text-white/60 mb-1">Productivity Gain</div>
                            <div className="text-2xl font-bold text-green-400">
                              ${roiResults.productivityGain.toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                            <div className="text-xs text-white/60 mb-1">ROI</div>
                            <div className="text-2xl font-bold text-purple-400">
                              {roiResults.roi.toFixed(0)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 mt-4">
                          <div className="flex-1 bg-black/30 p-4 rounded-lg border border-white/10">
                            <div className="text-xs text-white/60 mb-1">Payback Period</div>
                            <div className="text-xl font-bold text-purple-400">
                              {roiResults.paybackPeriod.toFixed(1)} months
                            </div>
                          </div>
                          <div className="flex-1 bg-black/30 p-4 rounded-lg border border-white/10">
                            <div className="text-xs text-white/60 mb-1">Time to Value</div>
                            <div className="text-xl font-bold text-purple-400">
                              {roiResults.timeToValue.toFixed(1)} months
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                          Download Detailed ROI Report
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-black/40 border-white/10">
                  <CardHeader>
                    <CardTitle>Enterprise Success Metrics</CardTitle>
                    <CardDescription>
                      Key metrics our enterprise customers achieve
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Time to Value</span>
                        <span className="text-green-400">60% Faster</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Operational Efficiency</span>
                        <span className="text-green-400">45% Improvement</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Cost Reduction</span>
                        <span className="text-green-400">35% Savings</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Decision Accuracy</span>
                        <span className="text-green-400">85% Improvement</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-black/40 border-white/10">
                  <CardHeader>
                    <CardTitle>Implementation Resources</CardTitle>
                    <CardDescription>
                      Supporting your enterprise journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10">
                        <FileText className="h-5 w-5 text-purple-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Enterprise Success Guide</h4>
                          <p className="text-sm text-white/70">Comprehensive guide to implementing AI in enterprise environments</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10">
                        <Users className="h-5 w-5 text-purple-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Executive Workshops</h4>
                          <p className="text-sm text-white/70">Strategic planning sessions for leadership teams</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10">
                        <Workflow className="h-5 w-5 text-purple-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Implementation Templates</h4>
                          <p className="text-sm text-white/70">Pre-built templates and workflows for faster deployment</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10">
                        <Network className="h-5 w-5 text-purple-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Enterprise Community</h4>
                          <p className="text-sm text-white/70">Connect with other enterprise customers to share insights</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button className="w-full bg-purple-600 hover:bg-purple-700 h-auto py-6">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">Schedule Enterprise Consultation</span>
                    <span className="text-xs text-white/80">Get a personalized implementation plan</span>
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 