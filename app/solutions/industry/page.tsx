"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Stethoscope,
  Briefcase,
  ShoppingBag,
  Factory,
  Truck,
  BarChart,
  Shield,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  Network,
  Activity,
  LineChart,
  Brain,
  Cpu,
  Wifi,
  Cloud,
  Image,
  Users,
  ShoppingCart,
  FileText,
  Plus,
  RefreshCw,
  Rocket,
  Loader2,
  Database,
  Mail,
  GitBranch,
  MessageSquare,
  Code,
  Package,
  ShieldCheck,
  Minus,
  ArrowUp,
  ArrowDown,
  Server,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Types
interface Industry {
  icon: any;
  name: string;
  description: string;
  solutions: string[];
  metrics: {
    [key: string]: string;
  };
  videoUrl?: string;
  caseStudies: CaseStudy[];
  features: Feature[];
  testimonials: Testimonial[];
  paasFeatures?: PaaSFeature[];
  integrations?: Integration[];
  deploymentOptions?: DeploymentOption[];
  advancedFeatures?: AdvancedFeature[];
  solutionPackages?: SolutionPackage[];
  aiSolutions?: AISolution[];
  edgeSolutions?: EdgeSolution[];
  securityFeatures?: SecurityFeature[];
  complianceStandards?: ComplianceStandard[];
}

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  imageUrl?: string;
}

interface Feature {
  title: string;
  description: string;
  icon: any;
  benefits: string[];
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  imageUrl?: string;
}

interface PaaSFeature {
  title: string;
  description: string;
  icon: any;
  benefits: string[];
}

interface Integration {
  name: string;
  category: string;
  icon: any;
  description: string;
}

interface DeploymentOption {
  title: string;
  description: string;
  icon: any;
  features: string[];
}

// Add new interfaces for the interactive demos
interface DemoState {
  activeSimulation: string | null;
  simulationProgress: number;
  simulationResults: SimulationResult | null;
  isSimulationRunning: boolean;
  
  // Add new PaaS-specific demo state
  microservicesCount: number;
  activeNodes: number;
  cpuUtilization: number[];
  memoryUtilization: number[];
  serviceHealth: { [key: string]: 'healthy' | 'degraded' | 'unhealthy' };
  dataIngestionRate: number;
  activeUsers: number;
  responseTime: number[];
  errorRate: number;
}

interface SimulationResult {
  metrics: {
    [key: string]: number;
  };
  insights: string[];
  recommendations: string[];
}

interface VisualizationData {
  labels: string[];
  values: number[];
  colors: string[];
}

// Add new interfaces for advanced features
interface AdvancedFeature {
  title: string;
  description: string;
  icon: any;
  benefits: string[];
  demoUrl?: string;
  technicalDetails: {
    architecture: string[];
    technologies: string[];
    integrations: string[];
  };
}

interface SolutionPackage {
  name: string;
  description: string;
  features: string[];
  pricing: {
    monthly: number;
    annual: number;
    currency: string;
  };
  includedServices: string[];
  customization: string[];
}

// Add new interfaces for advanced solutions
interface AISolution {
  title: string;
  description: string;
  icon: any;
  capabilities: string[];
  useCases: string[];
  performance: {
    accuracy: number;
    latency: number;
    scalability: number;
  };
}

interface EdgeSolution {
  title: string;
  description: string;
  icon: any;
  features: string[];
  deployment: {
    locations: string[];
    requirements: string[];
    connectivity: string[];
  };
}

interface SecurityFeature {
  title: string;
  description: string;
  icon: any;
  standards: string[];
  certifications: string[];
  features: string[];
}

interface ComplianceStandard {
  name: string;
  description: string;
  icon: any;
  requirements: string[];
  certifications: string[];
  industrySpecific: boolean;
}

// Data
const industries: Industry[] = [
  {
    icon: Building2,
    name: "Financial Services",
    description: "Transform financial operations with AI-powered analytics and automation",
    solutions: [
      "Risk Assessment & Fraud Detection",
      "Algorithmic Trading",
      "Customer Service Automation",
      "Credit Scoring",
      "Market Analysis",
    ],
    metrics: {
      efficiency: "40% reduction in operational costs",
      accuracy: "99.9% fraud detection rate",
      time: "60% faster loan processing",
    },
    videoUrl: "https://example.com/financial-services-demo.mp4",
    caseStudies: [
      {
        company: "Global Bank Corp",
        industry: "Financial Services",
        challenge: "Manual risk assessment causing delays and errors",
        solution: "Implemented AI-powered risk assessment system",
        results: [
          "90% faster risk assessment",
          "50% reduction in false positives",
          "$2M annual cost savings",
        ],
        imageUrl: "/images/case-studies/global-bank.jpg",
      },
      {
        company: "FinTech Solutions",
        industry: "Financial Services",
        challenge: "Inefficient customer service and high response times",
        solution: "Deployed AI chatbot and automation platform",
        results: [
          "75% reduction in response time",
          "24/7 customer support",
          "85% customer satisfaction rate",
        ],
        imageUrl: "/images/case-studies/fintech-solutions.jpg",
      },
    ],
    features: [
      {
        title: "Real-time Fraud Detection",
        description: "Advanced AI algorithms that detect fraudulent transactions in real-time",
        icon: Shield,
        benefits: [
          "Instant notification of suspicious activities",
          "Reduced false positives through machine learning",
          "Adaptive learning from new fraud patterns",
        ],
      },
      {
        title: "Predictive Analytics",
        description: "Forecast market trends and customer behavior with high accuracy",
        icon: BarChart,
        benefits: [
          "Data-driven investment decisions",
          "Personalized financial recommendations",
          "Risk assessment and mitigation strategies",
        ],
      },
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "CTO",
        company: "Global Bank Corp",
        quote: "Mindscape's AI solutions have revolutionized our risk assessment process, saving us millions in potential fraud losses.",
        imageUrl: "/images/testimonials/sarah-johnson.jpg",
      },
      {
        name: "Michael Chen",
        role: "Head of Innovation",
        company: "FinTech Solutions",
        quote: "The AI-powered customer service platform has transformed our ability to serve customers 24/7 with consistent quality.",
        imageUrl: "/images/testimonials/michael-chen.jpg",
      },
    ],
    paasFeatures: [
      {
        title: "Financial Data Pipeline",
        description: "Secure, compliant data processing pipelines designed for financial institutions",
        icon: Shield,
        benefits: [
          "GDPR and CCPA compliant data flows",
          "End-to-end encryption for sensitive financial data",
          "Real-time transaction processing and analytics",
          "Automated regulatory reporting capabilities"
        ]
      },
      {
        title: "Scalable Transaction Processing",
        description: "Elastic infrastructure that scales with transaction volume",
        icon: BarChart,
        benefits: [
          "Handles 100,000+ transactions per second",
          "Automatic scaling during peak demand periods",
          "99.999% uptime SLA for critical financial services",
          "Geographic redundancy and disaster recovery"
        ]
      }
    ],
    integrations: [
      {
        name: "Bloomberg Terminal",
        category: "Financial Data",
        icon: BarChart,
        description: "Real-time financial data integration with Bloomberg Terminal"
      },
      {
        name: "Plaid",
        category: "Banking",
        icon: Shield,
        description: "Secure banking data access and account verification"
      }
    ],
    deploymentOptions: [
      {
        title: "Financial Private Cloud",
        description: "Secure, isolated cloud environment for financial institutions",
        icon: Shield,
        features: [
          "FINRA and SEC compliant infrastructure",
          "Dedicated hardware for maximum security",
          "Physical isolation for sensitive workloads",
          "24/7 security monitoring and compliance audits"
        ]
      },
      {
        title: "Hybrid Deployment",
        description: "Seamless integration between on-premises systems and cloud services",
        icon: BarChart,
        features: [
          "Legacy core banking system integration",
          "Secure API gateway for controlled data access",
          "Consistent security policies across environments",
          "Gradual migration path for critical systems"
        ]
      }
    ],
    advancedFeatures: [
      {
        title: "AI-Powered Risk Analytics",
        description: "Advanced machine learning models for real-time risk assessment and fraud detection",
        icon: Shield,
        benefits: [
          "Real-time transaction monitoring",
          "Behavioral pattern analysis",
          "Automated risk scoring",
          "Regulatory compliance automation"
        ],
        demoUrl: "/demos/risk-analytics",
        technicalDetails: {
          architecture: [
            "Microservices-based architecture",
            "Real-time event processing",
            "Distributed machine learning pipeline"
          ],
          technologies: [
            "TensorFlow",
            "Apache Kafka",
            "Kubernetes",
            "GraphQL"
          ],
          integrations: [
            "SWIFT",
            "FIX Protocol",
            "Payment Gateways",
            "Core Banking Systems"
          ]
        }
      },
      {
        title: "Intelligent Trading Platform",
        description: "Next-generation algorithmic trading with AI-driven market analysis",
        icon: BarChart,
        benefits: [
          "Market sentiment analysis",
          "Automated trading strategies",
          "Portfolio optimization",
          "Risk management automation"
        ],
        demoUrl: "/demos/trading-platform",
        technicalDetails: {
          architecture: [
            "Event-driven architecture",
            "High-frequency trading engine",
            "Real-time market data processing"
          ],
          technologies: [
            "Python",
            "CUDA",
            "Redis",
            "WebSocket"
          ],
          integrations: [
            "Market Data Feeds",
            "Exchange APIs",
            "Order Management Systems",
            "Risk Management Systems"
          ]
        }
      }
    ],
    solutionPackages: [
      {
        name: "Enterprise Risk Suite",
        description: "Comprehensive risk management and compliance solution",
        features: [
          "Real-time risk monitoring",
          "Automated compliance reporting",
          "Custom risk models",
          "Integration with existing systems"
        ],
        pricing: {
          monthly: 5000,
          annual: 50000,
          currency: "USD"
        },
        includedServices: [
          "24/7 Technical Support",
          "Regular Security Audits",
          "Custom Model Training",
          "API Access"
        ],
        customization: [
          "Custom Risk Models",
          "Integration Development",
          "Workflow Automation",
          "Reporting Templates"
        ]
      }
    ],
    aiSolutions: [
      {
        title: "AI-Powered Risk Analytics",
        description: "Advanced machine learning models for real-time risk assessment and fraud detection",
        icon: Brain,
        capabilities: [
          "Real-time transaction monitoring",
          "Behavioral pattern analysis",
          "Automated risk scoring",
          "Regulatory compliance automation"
        ],
        useCases: [
          "Fraud detection",
          "Credit risk assessment",
          "Market risk analysis",
          "Compliance monitoring"
        ],
        performance: {
          accuracy: 99.9,
          latency: 50,
          scalability: 1000
        }
      },
      {
        title: "Intelligent Trading Platform",
        description: "Next-generation algorithmic trading with AI-driven market analysis",
        icon: BarChart,
        capabilities: [
          "Market sentiment analysis",
          "Automated trading strategies",
          "Portfolio optimization",
          "Risk management automation"
        ],
        useCases: [
          "Algorithmic trading",
          "Portfolio management",
          "Market analysis",
          "Risk assessment"
        ],
        performance: {
          accuracy: 98.5,
          latency: 10,
          scalability: 5000
        }
      }
    ],
    edgeSolutions: [
      {
        title: "Edge Trading Platform",
        description: "Low-latency trading execution at the edge",
        icon: Cpu,
        features: [
          "Ultra-low latency execution",
          "Local order processing",
          "Real-time market data",
          "Automated trading strategies"
        ],
        deployment: {
          locations: ["NY4", "LD4", "TY3", "SG1"],
          requirements: ["10Gbps connectivity", "99.999% uptime", "Redundant power"],
          connectivity: ["Direct market access", "Cross-connect options", "Redundant routes"]
        }
      }
    ],
    securityFeatures: [
      {
        title: "Enterprise Security Suite",
        description: "Comprehensive security solution for financial institutions",
        icon: Shield,
        standards: ["ISO 27001", "SOC 2", "PCI DSS"],
        certifications: ["FIPS 140-2", "Common Criteria"],
        features: [
          "End-to-end encryption",
          "Multi-factor authentication",
          "Access control",
          "Audit logging"
        ]
      }
    ],
    complianceStandards: [
      {
        name: "Financial Services Compliance",
        description: "Comprehensive compliance framework for financial institutions",
        icon: Shield,
        requirements: [
          "GDPR compliance",
          "SOX compliance",
          "Basel III",
          "MiFID II"
        ],
        certifications: ["ISO 27001", "SOC 2", "PCI DSS"],
        industrySpecific: true
      }
    ]
  },
  {
    icon: Stethoscope,
    name: "Healthcare",
    description: "Enhance patient care and streamline medical operations",
    solutions: [
      "Medical Image Analysis",
      "Patient Data Analytics",
      "Treatment Optimization",
      "Resource Management",
      "Predictive Diagnostics",
    ],
    metrics: {
      accuracy: "95% diagnostic accuracy",
      time: "50% reduced wait times",
      satisfaction: "85% patient satisfaction",
    },
    videoUrl: "https://example.com/healthcare-demo.mp4",
    caseStudies: [
      {
        company: "HealthCare Plus",
        industry: "Healthcare",
        challenge: "Inefficient patient data management and diagnosis",
        solution: "Deployed AI diagnostic assistant and analytics platform",
        results: [
          "95% diagnostic accuracy",
          "40% reduced patient wait times",
          "60% faster reporting",
        ],
        imageUrl: "/images/case-studies/healthcare-plus.jpg",
      },
      {
        company: "MedTech Innovations",
        industry: "Healthcare",
        challenge: "Limited access to specialized medical expertise in remote areas",
        solution: "Implemented AI-powered telemedicine platform with diagnostic capabilities",
        results: [
          "80% reduction in specialist referral wait times",
          "90% patient satisfaction with remote consultations",
          "30% cost savings on healthcare delivery",
        ],
        imageUrl: "/images/case-studies/medtech-innovations.jpg",
      },
    ],
    features: [
      {
        title: "AI-Powered Diagnostics",
        description: "Advanced image recognition for accurate medical diagnosis",
        icon: Lightbulb,
        benefits: [
          "Early detection of conditions",
          "Reduced diagnostic errors",
          "Support for rare disease identification",
        ],
      },
      {
        title: "Patient Flow Optimization",
        description: "Intelligent scheduling and resource allocation systems",
        icon: BarChart,
        benefits: [
          "Reduced wait times",
          "Optimized staff allocation",
          "Improved patient experience",
        ],
      },
    ],
    testimonials: [
      {
        name: "Dr. Emily Rodriguez",
        role: "Chief Medical Officer",
        company: "HealthCare Plus",
        quote: "The AI diagnostic assistant has become an invaluable tool for our medical team, improving accuracy and saving critical time.",
        imageUrl: "/images/testimonials/emily-rodriguez.jpg",
      },
      {
        name: "James Wilson",
        role: "Operations Director",
        company: "MedTech Innovations",
        quote: "Mindscape's AI solutions have transformed our ability to deliver quality healthcare to remote communities.",
        imageUrl: "/images/testimonials/james-wilson.jpg",
      },
    ],
    paasFeatures: [
      {
        title: "Healthcare Data Lake",
        description: "HIPAA-compliant data storage and analytics platform",
        icon: Stethoscope,
        benefits: [
          "Secure storage for patient records and medical imaging",
          "Advanced analytics for population health management",
          "Machine learning models for treatment optimization",
          "Real-time patient monitoring and alerts"
        ]
      },
      {
        title: "Clinical Decision Support",
        description: "AI-powered diagnosis and treatment recommendation system",
        icon: Lightbulb,
        benefits: [
          "Evidence-based treatment recommendations",
          "Drug interaction and allergy warnings",
          "Patient-specific risk assessment",
          "Integration with electronic health records"
        ]
      }
    ],
    integrations: [
      {
        name: "Epic Systems",
        category: "Electronic Health Records",
        icon: Stethoscope,
        description: "Bidirectional integration with Epic EHR systems"
      },
      {
        name: "Phillips Healthcare",
        category: "Medical Devices",
        icon: Stethoscope,
        description: "Real-time data integration with medical imaging and monitoring devices"
      }
    ],
    deploymentOptions: [
      {
        title: "HIPAA Compliant Cloud",
        description: "Fully compliant cloud environment for healthcare applications",
        icon: Shield,
        features: [
          "End-to-end encryption for PHI data",
          "Audit logging for all data access",
          "Geographic data residency controls",
          "Automated compliance reporting"
        ]
      },
      {
        title: "Edge Computing for Healthcare",
        description: "Process sensitive data locally at healthcare facilities",
        icon: Stethoscope,
        features: [
          "Low-latency processing for critical applications",
          "Local data processing with cloud analytics",
          "Works in environments with limited connectivity",
          "Reduces bandwidth requirements for medical imaging"
        ]
      }
    ]
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Optimize production processes and quality control with AI-driven automation",
    solutions: [
      "Predictive Maintenance",
      "Quality Control Automation",
      "Supply Chain Optimization",
      "Production Planning",
      "Energy Efficiency",
    ],
    metrics: {
      efficiency: "35% increase in production efficiency",
      quality: "99.8% defect detection rate",
      maintenance: "45% reduction in downtime",
    },
    videoUrl: "https://example.com/manufacturing-demo.mp4",
    caseStudies: [
      {
        company: "Smart Factory Solutions",
        industry: "Manufacturing",
        challenge: "High defect rates and frequent equipment failures",
        solution: "Implemented AI-powered quality control and predictive maintenance system",
        results: [
          "80% reduction in defect rates",
          "60% decrease in unplanned downtime",
          "$3M annual savings in maintenance costs",
        ],
        imageUrl: "/images/case-studies/smart-factory.jpg",
      },
    ],
    features: [
      {
        title: "Predictive Maintenance",
        description: "AI-driven system that predicts equipment failures before they occur",
        icon: BarChart,
        benefits: [
          "Reduced equipment downtime",
          "Optimized maintenance schedules",
          "Extended equipment lifespan",
        ],
      },
    ],
    testimonials: [
      {
        name: "David Chen",
        role: "Operations Director",
        company: "Smart Factory Solutions",
        quote: "The predictive maintenance system has revolutionized our operations, significantly reducing downtime and maintenance costs.",
        imageUrl: "/images/testimonials/david-chen.jpg",
      },
    ],
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    description: "Transform customer experience and optimize inventory management",
    solutions: [
      "Demand Forecasting",
      "Inventory Optimization",
      "Personalized Marketing",
      "Customer Analytics",
      "Price Optimization",
    ],
    metrics: {
      sales: "25% increase in sales conversion",
      inventory: "40% reduction in stockouts",
      engagement: "75% customer engagement rate",
    },
    videoUrl: "https://example.com/retail-demo.mp4",
    caseStudies: [
      {
        company: "Global Retail Co",
        industry: "Retail",
        challenge: "Inefficient inventory management and poor customer targeting",
        solution: "Deployed AI-powered inventory and customer analytics platform",
        results: [
          "35% reduction in inventory costs",
          "45% increase in customer satisfaction",
          "28% growth in repeat purchases",
        ],
        imageUrl: "/images/case-studies/global-retail.jpg",
      },
    ],
    features: [
      {
        title: "Smart Inventory Management",
        description: "AI-powered system for optimal inventory levels and demand forecasting",
        icon: BarChart,
        benefits: [
          "Reduced stockouts and overstock",
          "Optimized supply chain",
          "Improved cash flow",
        ],
      },
    ],
    testimonials: [
      {
        name: "Lisa Thompson",
        role: "Retail Operations Manager",
        company: "Global Retail Co",
        quote: "The AI-powered inventory management system has transformed our operations, leading to significant cost savings and improved customer satisfaction.",
        imageUrl: "/images/testimonials/lisa-thompson.jpg",
      },
    ],
  },
  {
    icon: Truck,
    name: "Logistics",
    description: "Optimize route planning and delivery operations with AI",
    solutions: [
      "Route Optimization",
      "Fleet Management",
      "Warehouse Automation",
      "Delivery Tracking",
      "Demand Forecasting",
    ],
    metrics: {
      efficiency: "30% reduction in delivery times",
      fuel: "25% decrease in fuel consumption",
      accuracy: "99.9% delivery accuracy",
    },
    videoUrl: "https://example.com/logistics-demo.mp4",
    caseStudies: [
      {
        company: "FastTrack Logistics",
        industry: "Logistics",
        challenge: "Inefficient route planning and high fuel costs",
        solution: "Implemented AI-powered route optimization and fleet management",
        results: [
          "40% reduction in fuel costs",
          "35% faster delivery times",
          "50% decrease in route planning time",
        ],
        imageUrl: "/images/case-studies/fasttrack.jpg",
      },
    ],
    features: [
      {
        title: "Smart Route Optimization",
        description: "AI-driven system for optimal route planning and real-time adjustments",
        icon: BarChart,
        benefits: [
          "Reduced fuel consumption",
          "Faster deliveries",
          "Improved customer satisfaction",
        ],
      },
    ],
    testimonials: [
      {
        name: "Mark Wilson",
        role: "Operations Director",
        company: "FastTrack Logistics",
        quote: "The AI route optimization system has dramatically improved our delivery efficiency and reduced costs across our entire fleet.",
        imageUrl: "/images/testimonials/mark-wilson.jpg",
      },
    ],
  },
];

// Add integrations data model
const integrations: Integration[] = [
  {
    name: "SQL Server",
    category: "Database",
    icon: Database,
    description: "Connect with Microsoft SQL Server for enterprise data storage"
  },
  {
    name: "Salesforce",
    category: "CRM",
    icon: Building2,
    description: "Integrate with Salesforce CRM for customer relationship management"
  },
  {
    name: "Mailchimp",
    category: "Marketing",
    icon: Mail,
    description: "Connect with Mailchimp for email marketing campaigns"
  },
  {
    name: "Tableau",
    category: "Analytics",
    icon: LineChart,
    description: "Visualize data with Tableau integration"
  },
  {
    name: "GitHub",
    category: "DevOps",
    icon: GitBranch,
    description: "Integrate with GitHub for version control and CI/CD"
  },
  {
    name: "Slack",
    category: "Communication",
    icon: MessageSquare,
    description: "Connect with Slack for team communications and alerts"
  }
];

export default function IndustrySolutionsPage() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>(industries[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(50);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [roiInputs, setRoiInputs] = useState({
    annualRevenue: "",
    employees: "",
    industry: "",
    currentEfficiency: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add state for the interactive demos
  const [demoState, setDemoState] = useState<DemoState>({
    activeSimulation: null,
    simulationProgress: 0,
    simulationResults: null,
    isSimulationRunning: false,
    
    // PaaS-specific demo state
    microservicesCount: 6,
    activeNodes: 3,
    cpuUtilization: [30, 25, 40, 20, 35, 15],
    memoryUtilization: [45, 30, 60, 25, 50, 20],
    serviceHealth: {
      'api-gateway': 'healthy',
      'auth-service': 'healthy',
      'data-processor': 'healthy',
      'analytics-engine': 'healthy',
      'notification-service': 'healthy',
      'storage-service': 'healthy'
    },
    dataIngestionRate: 1250,
    activeUsers: 432,
    responseTime: [42, 38, 45, 40, 39, 41],
    errorRate: 0.05
  });
  
  const [visualizationData, setVisualizationData] = useState<VisualizationData>({
    labels: [],
    values: [],
    colors: []
  });
  
  // Add new state variables for PaaS features
  const [activeDeploymentOption, setActiveDeploymentOption] = useState<DeploymentOption | null>(null);
  const [showArchitectureDiagram, setShowArchitectureDiagram] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  
  // Add new state variables for advanced features
  const [activeFeature, setActiveFeature] = useState<AdvancedFeature | null>(null);
  const [showFeatureDemo, setShowFeatureDemo] = useState(false);
  const [activePackage, setActivePackage] = useState<SolutionPackage | null>(null);
  const [showPackageDetails, setShowPackageDetails] = useState(false);
  
  // Add new state for modern PaaS UI elements
  const [activePaasFeature, setActivePaasFeature] = useState<string>("microservices");
  const [deploymentType, setDeploymentType] = useState<string>("hybrid");
  const [showApiFlow, setShowApiFlow] = useState(false);
  const [resourceMetrics, setResourceMetrics] = useState({
    cpu: [25, 30, 45, 28, 35, 42, 38],
    memory: [40, 45, 55, 48, 50, 57, 52],
    network: [15, 25, 35, 28, 22, 30, 27],
    storage: [30, 32, 40, 35, 38, 42, 36]
  });
  const [clusterNodes, setClusterNodes] = useState(3);
  const [activeServices, setActiveServices] = useState(8);
  const [showDataFlowDiagram, setShowDataFlowDiagram] = useState(false);
  
  // Function to handle demo interactions with proper TypeScript typing
  const handleDemoInteraction = (action: string, value: string): void => {
    switch (action) {
      case "startSimulation":
        startSimulation(value);
        break;
      case "stopSimulation":
        stopSimulation();
        break;
      case "visualizeData":
        visualizeIndustryData(value);
        break;
      case "scaleService":
        scaleService(value);
        break;
      case "simulateLoad":
        simulateLoad(parseInt(value));
        break;
      case "toggleFailover":
        toggleFailover();
        break;
      default:
        break;
    }
  };
  
  // Simulation functions
  const startSimulation = (simulationType: string): void => {
    // Reset previous simulation state
    setDemoState({
      ...demoState,
      activeSimulation: simulationType,
      simulationProgress: 0,
      isSimulationRunning: true,
      simulationResults: null
    });
    
    // Start progress timer
    const interval = setInterval(() => {
      setDemoState((prev) => {
        if (prev.simulationProgress >= 100) {
          clearInterval(interval);
          // Generate simulation results when complete
          const results = generateSimulationResults(simulationType);
          return {
            ...prev,
            isSimulationRunning: false,
            simulationResults: results
          };
        }
        return {
          ...prev,
          simulationProgress: prev.simulationProgress + 10
        };
      });
    }, 500);
  };
  
  const stopSimulation = (): void => {
    setDemoState({
      ...demoState,
      isSimulationRunning: false
    });
  };
  
  // Generate simulation results based on industry type
  const generateSimulationResults = (simulationType: string): SimulationResult => {
    switch (simulationType) {
      case "financial":
        return {
          metrics: {
            costReduction: 42,
            fraudDetection: 95,
            customerSatisfaction: 88,
            processEfficiency: 74
          },
          insights: [
            "High-risk transactions identified in real-time",
            "Customer service automation saving 2,400 hours monthly",
            "Personalized financial recommendations driving 28% increase in engagement"
          ],
          recommendations: [
            "Implement advanced fraud pattern detection",
            "Expand predictive analytics to new market segments",
            "Integrate customer feedback loop for continuous AI improvement"
          ]
        };
      case "healthcare":
        return {
          metrics: {
            diagnosticAccuracy: 92,
            patientWaitTime: 65,
            operationalEfficiency: 78,
            treatmentOptimization: 84
          },
          insights: [
            "Early disease detection improved by 37%",
            "Patient scheduling optimization reduced wait times by 65%",
            "Resource allocation efficiency increased by 42%"
          ],
          recommendations: [
            "Expand medical imaging AI to additional departments",
            "Implement predictive patient outcome modeling",
            "Develop personalized treatment recommendation system"
          ]
        };
      case "manufacturing":
        return {
          metrics: {
            downTimeReduction: 68,
            qualityImprovement: 87,
            supplyChainOptimization: 72,
            energyEfficiency: 45
          },
          insights: [
            "Predictive maintenance prevented 12 major equipment failures",
            "Quality control automation reduced defects by 37%",
            "Supply chain optimization cut inventory costs by 23%"
          ],
          recommendations: [
            "Implement digital twin technology for complex machinery",
            "Expand IoT sensor network for comprehensive monitoring",
            "Develop AI-powered production scheduling system"
          ]
        };
      default:
        return {
          metrics: {
            improvement: 75,
            efficiency: 80,
            satisfaction: 85,
            costReduction: 40
          },
          insights: [
            "AI implementation showing positive ROI within 6 months",
            "Process automation reducing manual workload by 65%",
            "Data-driven decision making improving outcomes by 47%"
          ],
          recommendations: [
            "Expand AI integration to additional business processes",
            "Develop comprehensive analytics dashboard",
            "Implement continuous learning system for AI models"
          ]
        };
    }
  };
  
  // Data visualization function
  const visualizeIndustryData = (industryType: string): void => {
    switch (industryType) {
      case "financial":
        setVisualizationData({
          labels: ["Fraud Detection", "Process Automation", "Risk Assessment", "Customer Engagement", "Market Analysis"],
          values: [92, 78, 85, 67, 81],
          colors: ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6"]
        });
        break;
      case "healthcare":
        setVisualizationData({
          labels: ["Diagnostic Accuracy", "Patient Care", "Resource Allocation", "Research Assistance", "Administrative"],
          values: [89, 76, 82, 94, 68],
          colors: ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"]
        });
        break;
      case "manufacturing":
        setVisualizationData({
          labels: ["Predictive Maintenance", "Quality Control", "Supply Chain", "Production Planning", "Energy Efficiency"],
          values: [87, 91, 74, 82, 68],
          colors: ["#f59e0b", "#22c55e", "#3b82f6", "#8b5cf6", "#ef4444"]
        });
        break;
      default:
        setVisualizationData({
          labels: ["Efficiency", "Quality", "Cost Reduction", "Innovation", "Customer Satisfaction"],
          values: [80, 75, 68, 82, 77],
          colors: ["#3b82f6", "#22c55e", "#ef4444", "#8b5cf6", "#f59e0b"]
        });
        break;
    }
    
    toast.success("Data visualization updated");
  };

  // Handle scroll for floating navigation
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sections = ["hero", "overview", "solutions", "metrics", "cta"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate ROI based on inputs
  const calculateRoi = () => {
    const revenue = parseFloat(roiInputs.annualRevenue) || 0;
    const employees = parseInt(roiInputs.employees) || 0;
    const efficiency = parseInt(roiInputs.currentEfficiency) || 0;
    
    const potentialSavings = revenue * 0.15; // 15% of revenue
    const productivityGain = employees * 20000; // $20k per employee
    const efficiencyImprovement = (revenue * efficiency * 0.01); // Current efficiency improvement
    
    return {
      annualSavings: potentialSavings + productivityGain + efficiencyImprovement,
      roi: ((potentialSavings + productivityGain + efficiencyImprovement) / (revenue * 0.05)) * 100,
      paybackPeriod: (revenue * 0.05) / ((potentialSavings + productivityGain + efficiencyImprovement) / 12),
    };
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Your consultation request has been submitted successfully!");
    setFormData({
      name: "",
      email: "",
      company: "",
      industry: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open case study modal
  const openCaseStudy = (caseStudy: CaseStudy) => {
    setActiveCaseStudy(caseStudy);
    setShowCaseStudyModal(true);
  };

  // Close case study modal
  const closeCaseStudyModal = () => {
    setShowCaseStudyModal(false);
    setTimeout(() => setActiveCaseStudy(null), 300); // Wait for animation to complete
  };

  // Fix the type error for select element onChange handler
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // PaaS-specific demo functions
  const scaleService = (serviceType: string): void => {
    // Scale up the number of microservices
    setDemoState(prev => {
      const newCount = prev.microservicesCount + 2;
      
      // Generate new utilization data for the scaled services
      const newCpuUtil = [...prev.cpuUtilization];
      const newMemUtil = [...prev.memoryUtilization];
      
      while (newCpuUtil.length < newCount) {
        newCpuUtil.push(Math.floor(Math.random() * 30) + 10);
        newMemUtil.push(Math.floor(Math.random() * 40) + 20);
      }
      
      // Reduce simulated response time and increase data ingestion capacity
      const newResponseTime = prev.responseTime.map(time => Math.max(time * 0.7, 25));
      
      return {
        ...prev,
        microservicesCount: newCount,
        activeNodes: prev.activeNodes + 1,
        cpuUtilization: newCpuUtil,
        memoryUtilization: newMemUtil,
        dataIngestionRate: prev.dataIngestionRate * 1.5,
        responseTime: newResponseTime
      };
    });
    
    toast.success(`Scaled ${serviceType} services to handle increased load`);
  };
  
  const simulateLoad = (loadFactor: number): void => {
    // Simulate increased load on the system
    setDemoState(prev => {
      // Increase CPU and memory utilization based on load factor
      const newCpuUtil = prev.cpuUtilization.map(util => 
        Math.min(Math.floor(util * (1 + loadFactor / 10)), 95));
      
      const newMemUtil = prev.memoryUtilization.map(util => 
        Math.min(Math.floor(util * (1 + loadFactor / 10)), 90));
      
      // Increase response time under load
      const newResponseTime = prev.responseTime.map(time => 
        Math.min(time * (1 + loadFactor / 20), 500));
      
      return {
        ...prev,
        cpuUtilization: newCpuUtil,
        memoryUtilization: newMemUtil,
        activeUsers: prev.activeUsers * (1 + loadFactor / 5),
        responseTime: newResponseTime,
        errorRate: prev.errorRate * (1 + loadFactor / 20)
      };
    });
    
    toast.success(`Simulating ${loadFactor}x increased user load`);
  };
  
  const toggleFailover = (): void => {
    // Simulate a failover scenario with a degraded service
    setDemoState(prev => {
      const services = {...prev.serviceHealth};
      
      if (services['data-processor'] === 'healthy') {
        services['data-processor'] = 'degraded';
        toast.warning("Data processor service degraded - activating failover");
      } else {
        services['data-processor'] = 'healthy';
        toast.success("Failover complete - all services restored");
      }
      
      return {
        ...prev,
        serviceHealth: services
      };
    });
  };

  // Video control functions
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
      setVolume(value);
    }
  };

  // Scale cluster simulation
  const scaleCluster = (amount: number) => {
    setClusterNodes(prev => Math.max(1, prev + amount));
    toast.success(`Cluster ${amount > 0 ? 'scaled up' : 'scaled down'} to ${clusterNodes + amount} nodes`);
    
    // Simulate impact on metrics
    setResourceMetrics(prev => {
      const scaleFactor = amount > 0 ? 0.8 : 1.2;
      return {
        cpu: prev.cpu.map(val => Math.max(10, Math.min(95, val * scaleFactor))),
        memory: prev.memory.map(val => Math.max(15, Math.min(90, val * scaleFactor))),
        network: prev.network.map(val => Math.max(5, Math.min(95, val * scaleFactor))),
        storage: prev.storage.map(val => Math.max(10, Math.min(90, val * scaleFactor)))
      };
    });
  };

  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* Modern Hero with Animated Elements */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-indigo-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0"></div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/5 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-3/4 left-2/3 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-float-reverse"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-cyan-500/15 rounded-full blur-xl animate-pulse"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="px-3 py-1 text-sm bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/30 text-blue-300">
                  ENTERPRISE PLATFORM-AS-A-SERVICE
                </Badge>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-indigo-200">
                  Industry-Specific
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                  Cloud Platform Solutions
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-300 max-w-lg"
              >
                Deploy, scale, and optimize your industry-specific applications with our enterprise-grade PaaS built for mission-critical workloads.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-md px-6 py-3 font-medium text-lg">
                  Deploy Your Platform
                </Button>
                <Button variant="outline" className="border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-white rounded-md px-6 py-3 font-medium text-lg flex items-center gap-2">
                  <Play className="h-4 w-4" /> Watch Demo
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-8 pt-4"
              >
                <div className="flex -space-x-2">
                  {['AWS', 'GCP', 'Azure', 'IBM'].map((cloud, i) => (
                    <div key={cloud} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-blue-500/30 flex items-center justify-center text-xs font-bold">
                      {cloud.substring(0, 2)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-400">
                  Multi-cloud compatibility
                </div>
              </motion.div>
            </div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10"
              >
                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-1">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-black/30">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-xs text-gray-400 flex-1 text-center">Platform Dashboard</div>
                  </div>
                  <div className="relative aspect-[16/9] bg-black/50">
                    {/* Platform Dashboard Preview */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-2">
                      <div className="col-span-2 row-span-2 rounded bg-black/80 border border-white/10 p-3 flex flex-col">
                        <div className="text-xs text-gray-400 mb-2">Resource Utilization</div>
                        <div className="flex-1 flex items-end">
                          {[35, 45, 60, 50, 65, 40, 55].map((val, i) => (
                            <div key={i} className="h-full flex-1 flex flex-col justify-end px-0.5">
                              <div 
                                className="bg-gradient-to-t from-blue-500 to-indigo-500 rounded-sm" 
                                style={{height: `${val}%`}}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-2 row-span-1 rounded bg-black/80 border border-white/10 p-3 flex flex-col">
                        <div className="text-xs text-gray-400 mb-1">Active Services</div>
                        <div className="text-xl font-bold text-blue-400">12</div>
                        <div className="mt-auto flex justify-between items-center">
                          <div className="text-xs text-green-400">99.2% Uptime</div>
                          <div className="h-1 w-20 bg-black/50 rounded-full overflow-hidden">
                            <div className="h-full w-[99.2%] bg-green-500"></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 row-span-1 rounded bg-black/80 border border-white/10 p-3 flex flex-col">
                        <div className="text-xs text-gray-400">Nodes</div>
                        <div className="text-xl font-bold text-indigo-400">5</div>
                        <div className="flex gap-1 mt-auto">
                          {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="h-2 w-2 rounded-full bg-indigo-500"></div>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-1 row-span-1 rounded bg-black/80 border border-white/10 p-3 flex flex-col">
                        <div className="text-xs text-gray-400">API Calls</div>
                        <div className="text-xl font-bold text-blue-400">2.4k/s</div>
                        <div className="mt-auto text-xs text-blue-300">+18% ↑</div>
                      </div>
                      <div className="col-span-2 row-span-1 rounded bg-black/80 border border-white/10 p-3 flex flex-col">
                        <div className="text-xs text-gray-400 mb-2">Deployments</div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1 items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <div className="text-xs">Successful</div>
                          </div>
                          <div className="text-xs font-medium">36</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1 items-center">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <div className="text-xs">Pending</div>
                          </div>
                          <div className="text-xs font-medium">2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Annotations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -right-4 top-1/4 bg-blue-900/90 bg-opacity-80 backdrop-blur-sm rounded px-3 py-2 text-xs border border-blue-500/30 shadow-lg"
              >
                Auto-scaling enabled
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -left-4 bottom-1/4 bg-indigo-900/90 bg-opacity-80 backdrop-blur-sm rounded px-3 py-2 text-xs border border-indigo-500/30 shadow-lg"
              >
                Multi-region deployment
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Industry Selector with Modern UI */}
      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-3 overflow-x-auto hide-scrollbar gap-1">
            <div className="text-blue-400 mr-3 font-medium">Industries:</div>
            {industries.map((industry) => (
              <Button
                key={industry.name}
                variant={activeIndustry.name === industry.name ? "default" : "ghost"}
                size="sm"
                className={`rounded-full flex items-center gap-1.5 whitespace-nowrap px-4 ${
                  activeIndustry.name === industry.name
                    ? "bg-blue-600/90 hover:bg-blue-700/90 text-white"
                    : "hover:bg-white/10 text-gray-300"
                }`}
                onClick={() => setActiveIndustry(industry)}
              >
                <industry.icon className="h-4 w-4" />
                <span>{industry.name}</span>
              </Button>
            ))}
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="rounded-full text-blue-400 border-blue-500/30 bg-blue-500/10">
                <Sparkles className="h-4 w-4 mr-1" /> Compare Industries
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities Overview - Enhanced with interactive elements */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-black to-blue-950/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1 mb-4">
              PLATFORM CAPABILITIES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Enterprise-Grade PaaS for {activeIndustry.name}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our purpose-built cloud platform provides all the tools and capabilities needed to deploy, 
              scale, and manage mission-critical {activeIndustry.name.toLowerCase()} applications.
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="serverless">Serverless</TabsTrigger>
              <TabsTrigger value="servicemesh">Service Mesh</TabsTrigger>
              <TabsTrigger value="ai-ml">AI/ML</TabsTrigger>
              <TabsTrigger value="edge">Edge Computing</TabsTrigger>
              <TabsTrigger value="security">Security & Compliance</TabsTrigger>
              <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab - Enhanced with metrics and live status */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-950/10 space-y-4">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Server className="h-6 w-6 mr-2 text-blue-400" />
                      Platform Health
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-black/40 border border-white/10 flex flex-col">
                        <div className="text-xs text-gray-400 mb-1">Uptime</div>
                        <div className="text-xl font-bold text-green-400">99.99%</div>
                        <div className="mt-auto text-xs text-green-300 flex items-center">
                          <ArrowUp className="h-3 w-3 mr-1" /> 30 days
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-black/40 border border-white/10 flex flex-col">
                        <div className="text-xs text-gray-400 mb-1">Response Time</div>
                        <div className="text-xl font-bold text-blue-400">45ms</div>
                        <div className="mt-auto text-xs text-green-300 flex items-center">
                          <ArrowDown className="h-3 w-3 mr-1" /> 12% vs last week
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-black/40 border border-white/10 flex flex-col">
                        <div className="text-xs text-gray-400 mb-1">Active Services</div>
                        <div className="text-xl font-bold text-indigo-400">{activeServices}</div>
                        <div className="mt-auto text-xs text-blue-300 flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div> All operational
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-black/40 border border-white/10 flex flex-col">
                        <div className="text-xs text-gray-400 mb-1">Region Status</div>
                        <div className="flex mt-1 mb-auto gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mt-auto text-xs text-blue-300">5/5 regions online</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          Platform Load
                        </span>
                        <span className="text-green-400">Normal</span>
                      </div>
                      <div className="h-2 rounded-full bg-black/50 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 rounded-xl border border-purple-500/20 bg-purple-950/10 space-y-4">
                      <h3 className="text-xl font-bold flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                        {activeIndustry.name} Optimizations
                      </h3>
                      <div className="space-y-2">
                        {activeIndustry.paasFeatures?.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="p-1.5 rounded-full bg-purple-500/20 text-purple-300 mt-0.5">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{feature.title}</div>
                              <div className="text-xs text-muted-foreground">{feature.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="link" className="p-0 h-auto text-sm text-purple-400 hover:text-purple-300 flex items-center">
                        View all optimizations
                        <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                    
                    <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-950/10 space-y-4">
                      <h3 className="text-xl font-bold flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-blue-400" />
                        Compliance Status
                      </h3>
                      <div className="space-y-3">
                        {activeIndustry.complianceStandards?.slice(0, 3).map((compliance, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="p-1.5 rounded-full bg-blue-500/20 text-blue-300 mt-0.5">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{compliance.name}</div>
                              <div className="text-xs text-muted-foreground">Fully compliant</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="link" className="p-0 h-auto text-sm text-blue-400 hover:text-blue-300 flex items-center">
                        View compliance details
                        <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-6 rounded-xl border border-white/10 bg-black/40 space-y-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-400" />
                      Live Platform Metrics
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPU Utilization</span>
                          <span>{resourceMetrics.cpu[6]}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-black/50 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: `${resourceMetrics.cpu[6]}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Memory Usage</span>
                          <span>{resourceMetrics.memory[6]}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-black/50 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full" style={{ width: `${resourceMetrics.memory[6]}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Network I/O</span>
                          <span>{resourceMetrics.network[6]}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-black/50 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{ width: `${resourceMetrics.network[6]}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Storage I/O</span>
                          <span>{resourceMetrics.storage[6]}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-black/50 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: `${resourceMetrics.storage[6]}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-xl border border-white/10 bg-black/40 space-y-4">
                    <h3 className="text-lg font-bold flex items-center justify-between">
                      <div className="flex items-center">
                        <Cpu className="h-5 w-5 mr-2 text-blue-400" />
                        Resource Scaling
                      </div>
                      <Badge variant="outline" className="text-xs">Live Control</Badge>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-sm text-gray-400">Node Count: {clusterNodes}</label>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0" 
                            onClick={() => scaleCluster(-1)}
                            disabled={clusterNodes <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Slider 
                            value={[clusterNodes]} 
                            min={1} 
                            max={10} 
                            step={1} 
                            className="flex-1"
                            onValueChange={(value: number[]) => setClusterNodes(value[0])}
                          />
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => scaleCluster(1)}
                            disabled={clusterNodes >= 10}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => simulateLoad(clusterNodes * 10)}
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                        Apply Changes
                      </Button>
                      
                      <div className="text-xs text-gray-400">
                        Scaling nodes affects resources, performance, and cost. Changes apply immediately in this demo.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-b from-black/60 to-blue-950/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-blue-400" />
                    Key Technology Stack
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg border border-white/10 bg-black/40 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-blue-900/30 flex items-center justify-center mb-2">
                        <Cloud className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-sm font-medium">Kubernetes</div>
                      <div className="text-xs text-muted-foreground">Orchestration</div>
                    </div>
                    
                    <div className="p-3 rounded-lg border border-white/10 bg-black/40 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-purple-900/30 flex items-center justify-center mb-2">
                        <Network className="h-6 w-6 text-purple-400" />
                      </div>
                      <div className="text-sm font-medium">Istio</div>
                      <div className="text-xs text-muted-foreground">Service Mesh</div>
                    </div>
                    
                    <div className="p-3 rounded-lg border border-white/10 bg-black/40 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-indigo-900/30 flex items-center justify-center mb-2">
                        <Database className="h-6 w-6 text-indigo-400" />
                      </div>
                      <div className="text-sm font-medium">PostgreSQL</div>
                      <div className="text-xs text-muted-foreground">Database</div>
                    </div>
                    
                    <div className="p-3 rounded-lg border border-white/10 bg-black/40 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-blue-900/30 flex items-center justify-center mb-2">
                        <LineChart className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-sm font-medium">Prometheus</div>
                      <div className="text-xs text-muted-foreground">Monitoring</div>
                    </div>
                    
                    <div className="p-3 rounded-lg border border-white/10 bg-black/40 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-green-900/30 flex items-center justify-center mb-2">
                        <Shield className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="text-sm font-medium">Vault</div>
                      <div className="text-xs text-muted-foreground">Security</div>
                    </div>
                    
                    <div className="p-3 rounded-lg border border-white/10 bg-black/40 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-red-900/30 flex items-center justify-center mb-2">
                        <Zap className="h-6 w-6 text-red-400" />
                      </div>
                      <div className="text-sm font-medium">Redis</div>
                      <div className="text-xs text-muted-foreground">Caching</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-b from-black/60 to-blue-950/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <GitBranch className="h-5 w-5 mr-2 text-blue-400" />
                    Deployment Pipeline
                  </h3>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="relative pl-8">
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-blue-500/30"></div>
                      <div className="absolute left-1.5 top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                      <div className="py-1">
                        <div className="text-sm font-medium">Code Commit</div>
                        <div className="text-xs text-muted-foreground">Secure source control with branch protection</div>
                      </div>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-blue-500/30"></div>
                      <div className="absolute left-1.5 top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                      <div className="py-1">
                        <div className="text-sm font-medium">CI Automation</div>
                        <div className="text-xs text-muted-foreground">Automated testing and security scanning</div>
                      </div>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-blue-500/30"></div>
                      <div className="absolute left-1.5 top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                      <div className="py-1">
                        <div className="text-sm font-medium">Artifact Building</div>
                        <div className="text-xs text-muted-foreground">Container and package creation with versioning</div>
                      </div>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-blue-500/30"></div>
                      <div className="absolute left-1.5 top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                      <div className="py-1">
                        <div className="text-sm font-medium">Staging Deployment</div>
                        <div className="text-xs text-muted-foreground">Automated deployment to staging environment</div>
                      </div>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-blue-500/30"></div>
                      <div className="absolute left-1.5 top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                      <div className="py-1">
                        <div className="text-sm font-medium">Integration Testing</div>
                        <div className="text-xs text-muted-foreground">Automated end-to-end testing on staging</div>
                      </div>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-1.5 top-1 h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="py-1">
                        <div className="text-sm font-medium">Production Deployment</div>
                        <div className="text-xs text-muted-foreground">Zero-downtime production deployment</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-4 w-full text-sm">
                    <Rocket className="h-3.5 w-3.5 mr-2" />
                    View CI/CD Demo
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Serverless Tab - With interactive demo */}
            <TabsContent value="serverless" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Serverless Computing</h3>
                    <p className="text-muted-foreground">
                      Build and run applications without thinking about servers. Pay only for the compute time you consume.
                    </p>
                    
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-blue-900/20 border border-blue-500/30">
                          <Zap className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Function-as-a-Service (FaaS)</h4>
                          <p className="text-sm text-muted-foreground">
                            Execute code in response to events without provisioning servers
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-xs">Auto-scaling</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-xs">Event-driven</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-xs">Pay-per-use</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-xs">Zero maintenance</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-purple-900/20 border border-purple-500/30">
                          <Database className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Serverless Databases</h4>
                          <p className="text-sm text-muted-foreground">
                            Auto-scaling database services with built-in high availability
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-xs">Automatic backups</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-xs">Point-in-time recovery</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-xs">Global distribution</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-xs">Built-in encryption</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-950/10">
                    <h4 className="text-lg font-bold mb-4">Code Sample: Serverless Function</h4>
                    <pre className="bg-black/80 p-4 rounded-md text-xs text-blue-300 overflow-x-auto">
{`// Example serverless function for ${activeIndustry.name}
export async function processTransaction(event, context) {
  // Log the event for audit purposes
  console.log('Processing transaction:', event.id);
  
  // Validate the transaction data
  const validationResult = await validateTransaction(event.data);
  if (!validationResult.valid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: validationResult.error })
    };
  }
  
  // Process the transaction
  const result = await storeTransaction(event.data);
  
  // Trigger downstream event for analytics
  await context.events.publish('transaction.processed', {
    id: event.id,
    result: result.id,
    timestamp: new Date().toISOString()
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, transactionId: result.id })
  };
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-6 rounded-xl border border-white/10 bg-black/40 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold">Live Function Demo</h4>
                      <Badge variant="outline" className={`${demoState.isSimulationRunning ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                        {demoState.isSimulationRunning ? 'Running' : 'Ready'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm text-gray-400">Function Configuration</label>
                      <Select defaultValue="nodejs">
                        <SelectTrigger className="w-full bg-black/50 border-white/10">
                          <SelectValue placeholder="Runtime" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nodejs">Node.js 18</SelectItem>
                          <SelectItem value="python">Python 3.10</SelectItem>
                          <SelectItem value="java">Java 17</SelectItem>
                          <SelectItem value="go">Go 1.20</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Memory (MB)</label>
                          <Select defaultValue="256">
                            <SelectTrigger className="w-full bg-black/50 border-white/10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="128">128 MB</SelectItem>
                              <SelectItem value="256">256 MB</SelectItem>
                              <SelectItem value="512">512 MB</SelectItem>
                              <SelectItem value="1024">1024 MB</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Timeout</label>
                          <Select defaultValue="30">
                            <SelectTrigger className="w-full bg-black/50 border-white/10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10 sec</SelectItem>
                              <SelectItem value="30">30 sec</SelectItem>
                              <SelectItem value="60">60 sec</SelectItem>
                              <SelectItem value="300">5 min</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mt-4">
                      <label className="text-sm text-gray-400">Test Event</label>
                      <Select defaultValue="transaction">
                        <SelectTrigger className="w-full bg-black/50 border-white/10">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transaction">Transaction Processing</SelectItem>
                          <SelectItem value="auth">Authentication</SelectItem>
                          <SelectItem value="analytics">Data Analytics</SelectItem>
                          <SelectItem value="notification">Notification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700" 
                      onClick={() => startSimulation('serverless')}
                      disabled={demoState.isSimulationRunning}
                    >
                      {demoState.isSimulationRunning ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run Function
                        </>
                      )}
                    </Button>
                    
                    {demoState.isSimulationRunning && (
                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{demoState.simulationProgress}%</span>
                        </div>
                        <Progress value={demoState.simulationProgress} className="h-2" />
                      </div>
                    )}
                    
                    {demoState.simulationResults && !demoState.isSimulationRunning && (
                      <div className="mt-4 space-y-3">
                        <div className="p-3 rounded-lg bg-green-950/20 border border-green-500/30">
                          <div className="text-sm font-medium text-green-400 flex items-center">
                            <Check className="h-4 w-4 mr-1.5" />
                            Execution Successful
                          </div>
                          <div className="text-xs text-gray-400 mt-1">Completed in 78ms</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Metrics</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 rounded bg-black/40 border border-white/10">
                              <div className="text-xs text-gray-400">Cold Start</div>
                              <div className="text-sm">No</div>
                            </div>
                            <div className="p-2 rounded bg-black/40 border border-white/10">
                              <div className="text-xs text-gray-400">Memory Used</div>
                              <div className="text-sm">128 MB</div>
                            </div>
                            <div className="p-2 rounded bg-black/40 border border-white/10">
                              <div className="text-xs text-gray-400">Billed Time</div>
                              <div className="text-sm">100ms</div>
                            </div>
                            <div className="p-2 rounded bg-black/40 border border-white/10">
                              <div className="text-xs text-gray-400">Cost</div>
                              <div className="text-sm">$0.0000021</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Add other TabsContent sections (servicemesh, ai-ml, etc.) with similar structure */}
            
          </Tabs>
        </div>
      </section>

      {/* Solution Packages Section - Enhanced with more robust features */}
      <section className="py-12 bg-gradient-to-b from-black to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <Badge variant="outline" className="mb-3 border-blue-500/50 text-blue-400 px-3">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Solution Packages
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tailored Solutions for {activeIndustry.name}</h2>
            <p className="text-muted-foreground">
              Choose the package that fits your organization's needs with our flexible pricing options
            </p>
          </div>

          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="billing-monthly" 
                name="billing" 
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                defaultChecked 
              />
              <label htmlFor="billing-monthly" className="text-sm font-medium cursor-pointer">Monthly</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="billing-annual" 
                name="billing" 
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary" 
              />
              <label htmlFor="billing-annual" className="text-sm font-medium cursor-pointer">Annual <span className="text-green-500 text-xs ml-1">Save 20%</span></label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {activeIndustry.solutionPackages ? (
              activeIndustry.solutionPackages.map((pkg, index) => (
                <div 
                  key={index}
                  className={`rounded-xl border ${
                    index === 1 
                      ? "border-blue-500/50 bg-blue-950/20" 
                      : "border-white/10 bg-black/30"
                  } p-6 space-y-4 relative overflow-hidden group h-full flex flex-col justify-between hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300`}
                >
                  {index === 1 && (
                    <div className="absolute -right-12 -top-3 rotate-45 bg-blue-500 text-white px-10 py-1 text-xs font-medium">
                      Popular
                    </div>
                  )}
                  
                  <div>
                    <div className="space-y-2 mb-4">
                      <h4 className="text-xl font-bold">{pkg.name}</h4>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    </div>
                    
                    <div className="flex items-end gap-2 mb-4">
                      <div className="text-3xl font-bold">
                        {pkg.pricing.currency === "USD" ? "$" : pkg.pricing.currency}
                        {pkg.pricing.monthly.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">/month</div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="rounded-full p-1 bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-md border border-white/10 p-3 mb-6 bg-black/20">
                      <div className="text-sm font-medium mb-2">Included Services</div>
                      <div className="space-y-2">
                        {pkg.includedServices.slice(0, 3).map((service, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="rounded-full p-0.5 bg-blue-500/20 text-blue-400 mt-0.5 shrink-0">
                              <Check className="h-3 w-3" />
                            </div>
                            <span className="text-xs text-muted-foreground">{service}</span>
                          </div>
                        ))}
                        {pkg.includedServices.length > 3 && (
                          <div className="text-xs text-blue-400 hover:underline cursor-pointer">
                            +{pkg.includedServices.length - 3} more services
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className={`w-full ${
                      index === 1 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : "bg-white/10 hover:bg-white/20 border border-white/20"
                    }`}>
                      Get Started
                    </Button>
                    
                    <Button variant="ghost" className="w-full text-xs text-blue-400 h-8">
                      Request Demo
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-900/20 text-blue-400 mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Enterprise Solutions</h3>
                <p className="text-muted-foreground max-w-lg mx-auto mb-4">
                  Contact our team to discuss tailored enterprise solutions for your specific {activeIndustry.name} needs.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="default">Contact Sales</Button>
                  <Button variant="outline">Download Brochure</Button>
                </div>
              </div>
            )}
          </div>

          {/* Feature comparison grid */}
          {activeIndustry.solutionPackages && activeIndustry.solutionPackages.length > 1 && (
            <div className="mt-16 overflow-x-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Feature Comparison</h3>
              <table className="w-full min-w-[768px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium text-sm w-1/4">Features</th>
                    {activeIndustry.solutionPackages.map((pkg, idx) => (
                      <th key={idx} className={`text-center py-4 px-6 font-medium text-sm ${idx === 1 ? 'text-blue-400' : ''}`}>
                        {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <td className="py-4 px-6 text-sm">Core Features</td>
                    {activeIndustry.solutionPackages.map((pkg, idx) => (
                      <td key={idx} className="py-4 px-6 text-center">
                        <div className="flex justify-center">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-6 text-sm">Technical Support</td>
                    {activeIndustry.solutionPackages.map((pkg, idx) => (
                      <td key={idx} className="py-4 px-6 text-center text-sm">
                        {idx === 0 ? 'Email Support' : idx === 1 ? '24/7 Priority Support' : 'Dedicated Support Team'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <td className="py-4 px-6 text-sm">Custom Integrations</td>
                    {activeIndustry.solutionPackages.map((pkg, idx) => (
                      <td key={idx} className="py-4 px-6 text-center">
                        {idx === 0 ? (
                          <Minus className="h-5 w-5 text-gray-500 mx-auto" />
                        ) : (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-6 text-sm">Advanced Analytics</td>
                    {activeIndustry.solutionPackages.map((pkg, idx) => (
                      <td key={idx} className="py-4 px-6 text-center">
                        {idx === 0 ? (
                          <Minus className="h-5 w-5 text-gray-500 mx-auto" />
                        ) : idx === 1 ? (
                          <div className="flex justify-center items-center gap-1">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-xs">Basic</span>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center gap-1">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-xs">Advanced</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <td className="py-4 px-6 text-sm">SLA Guarantee</td>
                    {activeIndustry.solutionPackages.map((pkg, idx) => (
                      <td key={idx} className="py-4 px-6 text-center text-sm">
                        {idx === 0 ? '99.9%' : idx === 1 ? '99.95%' : '99.99%'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-6 text-sm">Implementation Support</td>
                    {activeIndustry.solutionPackages.map((pkg, idx) => (
                      <td key={idx} className="py-4 px-6 text-center text-sm">
                        {idx === 0 ? 'Self-service' : idx === 1 ? 'Guided Setup' : 'Full Implementation Team'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {/* Testimonial for solution packages */}
          {activeIndustry.testimonials && activeIndustry.testimonials.length > 0 && (
            <div className="mt-16 max-w-4xl mx-auto rounded-xl border border-white/10 bg-black/30 p-8 relative">
              <div className="absolute -top-5 -left-5">
                <div className="text-6xl text-blue-500/20 font-serif">"</div>
              </div>
              <div className="relative z-10">
                <p className="text-xl italic mb-6">{activeIndustry.testimonials[0].quote}</p>
                <div className="flex items-center">
                  <div className="mr-4 w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
                    {activeIndustry.testimonials[0].imageUrl ? (
                      <img 
                        src={activeIndustry.testimonials[0].imageUrl} 
                        alt={activeIndustry.testimonials[0].name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <Users className="h-6 w-6 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold">{activeIndustry.testimonials[0].name}</div>
                    <div className="text-sm text-muted-foreground">
                      {activeIndustry.testimonials[0].role}, {activeIndustry.testimonials[0].company}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5">
                <div className="text-6xl text-blue-500/20 font-serif">"</div>
              </div>
            </div>
          )}
          
          {/* FAQ Section - Simplified to avoid linter errors */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 overflow-hidden">
                <button 
                  className="flex items-center justify-between w-full p-4 text-left focus:outline-none"
                  onClick={() => {}}
                >
                  <span className="font-medium">Can I upgrade my plan later?</span>
                  <ChevronRight className="h-5 w-5 transform rotate-90" />
                </button>
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade your plan at any time. When you upgrade, you'll be prorated for the remainder of your billing cycle.
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg border border-white/10 overflow-hidden">
                <button 
                  className="flex items-center justify-between w-full p-4 text-left focus:outline-none"
                  onClick={() => {}}
                >
                  <span className="font-medium">Is there a free trial available?</span>
                  <ChevronRight className="h-5 w-5 transform rotate-90" />
                </button>
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">
                    Yes, we offer a 14-day free trial for our Starter and Professional packages. Enterprise solutions typically include a proof of concept phase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section - Improved grid layout */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <Badge variant="outline" className="mb-3 border-blue-500/50 text-blue-400 px-3">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Case Studies</h2>
            <p className="text-muted-foreground">
              See how organizations across industries are transforming with our platform
            </p>
          </div>

          {/* Industry Filter */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-black/40 p-1 backdrop-blur-sm border border-white/10">
              <Button
                variant="ghost"
                className={`rounded-md px-4 py-2 text-sm ${
                  activeIndustry.name === "All" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                }`}
                onClick={() => setActiveIndustry({ ...industries[0], name: "All" })}
              >
                All Industries
              </Button>
              {industries.map((industry) => (
                <Button
                  key={industry.name}
                  variant="ghost"
                  className={`rounded-md px-4 py-2 text-sm ${
                    activeIndustry.name === industry.name ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setActiveIndustry(industry)}
                >
                  {industry.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeIndustry.name === "All" 
              ? industries.flatMap(industry => industry.caseStudies)
              : activeIndustry.caseStudies
            ).map((caseStudy, index) => (
              <Card 
                key={index}
                className="group border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col relative"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Image Section */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                  {caseStudy.imageUrl ? (
                    <img 
                      src={caseStudy.imageUrl} 
                      alt={caseStudy.company} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-indigo-900/40">
                      <Building2 className="h-16 w-16 text-white/30" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-white/70" />
                      </div>
                      <div>
                        <div className="text-lg font-bold line-clamp-1">{caseStudy.company}</div>
                        <div className="text-sm text-blue-300/80">{caseStudy.industry}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex-1 space-y-4">
                    {/* Challenge Section */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center">
                          <AlertCircle className="h-3 w-3 text-red-400" />
                        </div>
                        <h4 className="text-sm font-medium text-red-400">Challenge</h4>
                      </div>
                      <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">{caseStudy.challenge}</p>
                    </div>

                    {/* Solution Section */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <Lightbulb className="h-3 w-3 text-blue-400" />
                        </div>
                        <h4 className="text-sm font-medium text-blue-400">Solution</h4>
                      </div>
                      <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">{caseStudy.solution}</p>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <TrendingUp className="h-3 w-3 text-green-400" />
                        </div>
                        <h4 className="text-sm font-medium text-green-400">Results</h4>
                      </div>
                      <div className="space-y-2">
                        {caseStudy.results.map((result, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="rounded-full p-1 bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                              <Check className="h-3 w-3" />
                            </div>
                            <span className="text-xs text-white/70 group-hover:text-white/90 transition-colors">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Button 
                      variant="ghost" 
                      className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-2 h-auto font-medium text-sm flex items-center justify-center gap-2 group/btn"
                      onClick={() => openCaseStudy(caseStudy)}
                    >
                      View Full Case Study
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section - Improved grid and consistent spacing */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="outline" className="mb-3 border-blue-500/50 text-blue-400 px-3">
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              Advanced Capabilities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Advanced Features</h2>
            <p className="text-muted-foreground">
              Cutting-edge capabilities designed specifically for your industry challenges
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-white/10 bg-black/30 overflow-hidden h-full flex flex-col">
              <div className="p-6 space-y-6 flex-1">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 shrink-0">
                    <Brain className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Predictive Analytics Engine</h4>
                    <p className="text-sm text-muted-foreground">AI-powered forecasting and trend analysis customized for {activeIndustry.name}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-sm font-medium">Key Benefits</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 text-sm">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>98.5% prediction accuracy</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Early trend detection</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Anomaly identification</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Custom model training</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-950/30 border border-blue-500/20 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-blue-400">Interactive Demo</div>
                    <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                      Live Preview
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span>Data Processing</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-1.5" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span>Model Training</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-1.5" />
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-950/50">
                    <Play className="h-3.5 w-3.5 mr-1.5" />
                    Run Demo
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 overflow-hidden h-full flex flex-col">
              <div className="p-6 space-y-6 flex-1">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 shrink-0">
                    <Shield className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Security & Compliance Framework</h4>
                    <p className="text-sm text-muted-foreground">Industry-specific security solutions for {activeIndustry.name}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-sm font-medium">Key Benefits</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 text-sm">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Quantum-resistant encryption</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Automated compliance</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Threat intelligence</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Identity-based access</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-indigo-400">Compliance Status</div>
                    <Badge variant="outline" className="text-xs border-indigo-500/30 text-indigo-400">
                      Live Status
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-black/30 rounded p-2.5">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-medium">GDPR</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 rounded p-2.5">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-medium">ISO 27001</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 rounded p-2.5">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-medium">HIPAA</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 rounded p-2.5">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-medium">SOC 2</span>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full border-indigo-500/30 text-indigo-400 hover:bg-indigo-950/50">
                    <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                    Security Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Ecosystem - Improved grid and card consistency */}
      <section className="py-16 bg-gradient-to-b from-black to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="outline" className="mb-3 border-blue-500/50 text-blue-400 px-3">
              <GitBranch className="h-3.5 w-3.5 mr-1.5" />
              Seamless Integration
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Integration Ecosystem</h2>
            <p className="text-muted-foreground">
              Connect with your existing tools and platforms for a unified workflow
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {integrations.map((integration: Integration, index: number) => (
              <div 
                key={index} 
                className="border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-blue-500/30 hover:bg-blue-900/5 transition-all duration-300 h-full group"
              >
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 group-hover:border-blue-500/20 mb-3">
                  <integration.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-sm font-medium">{integration.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{integration.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of content - original sections follow */}
    </div>
  );
} 