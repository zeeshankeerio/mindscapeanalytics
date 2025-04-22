"use client"

import { useState, useRef, useEffect, ReactNode, MouseEvent } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Building2, 
  Briefcase, 
  ShoppingBag, 
  Stethoscope, 
  Landmark, 
  Plane, 
  Lightbulb, 
  ChevronRight, 
  PieChart,
  Clock,
  BarChart4,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Sparkles,
  Brain,
  ChartBar,
  Shield,
  Users,
  FileText,
  Code,
  MessageSquare,
  Database,
  Check,
  Network,
  Activity,
  LineChart,
  Wifi,
  Cloud,
  ShoppingCart,
  Mail,
  GitBranch,
  Package,
  ShieldCheck,
  Minus,
  ArrowUp,
  ArrowDown,
  Server,
  BarChart,
  Plus,
  RefreshCw,
  Rocket,
  Loader2,
  Trophy,
  TrendingUp,
  Scale,
  Calculator,
  BookOpen,
  Play,
  Lock,
  Copy,
  Leaf,
  AlertTriangle,
  AlertCircle,
  LayoutGrid,
  LayoutList,
  Table,
  Route,
  Bell,
  CheckCircle,
  MoreHorizontal,
  X
} from "lucide-react"
import { default as NextImage } from "next/image"
import "@/styles/industry-solutions.css"

// Define interfaces for better type safety
interface Stat {
  label: string;
  value: string;
  icon: ReactNode;
}

interface CaseStudy {
  client: string;
  challenge: string;
  solution: string;
  results: string | string[];
  imageUrl?: string;
  testimonial?: Testimonial;
  logo?: string;
}

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  benefits: string[];
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  imageUrl?: string;
}

interface BlockchainSolution {
  title: string;
  description: string;
  icon: ReactNode;
  benefits: string[];
  useCase: string;
  technology: string;
  maturityLevel: "Emerging" | "Growing" | "Established";
  implementationTime: string;
}

interface Industry {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  benefits: string[];
  caseStudy: CaseStudy;
  stats: Stat[];
  technologies: string[];
  color: string;
  image: string;
  particleColor: string;
  solutions?: string[];
  metrics?: {
    [key: string]: string;
  };
  features?: Feature[];
  testimonials?: Testimonial[];
  aiSolutions?: AISolution[];
  edgeSolutions?: EdgeSolution[];
  paasFeatures?: PaaSFeature[];
  integrations?: Integration[];
  deploymentOptions?: DeploymentOption[];
  securityFeatures?: SecurityFeature[];
  complianceStandards?: ComplianceStandard[];
  solutionPackages?: SolutionPackage[];
  blockchainSolutions?: BlockchainSolution[];
  futureTrends?: FutureTrend[];
  techReadiness?: TechReadiness;
  implementationRoadmap?: ImplementationRoadmap;
  sustainabilityImpact?: SustainabilityImpact;
}

interface AISolution {
  title: string;
  description: string;
  icon: ReactNode;
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
  icon: ReactNode;
  features: string[];
  deployment: {
    locations: string[];
    requirements: string[];
    connectivity: string[];
  };
}

interface Card3DProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number;
}

// Add new interfaces for enhanced features
interface PaaSFeature {
  title: string;
  description: string;
  icon: ReactNode;
  benefits: string[];
}

interface Integration {
  name: string;
  category: string;
  icon: ReactNode;
  description: string;
}

interface DeploymentOption {
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
}

interface SecurityFeature {
  title: string;
  description: string;
  icon: ReactNode;
  standards: string[];
  certifications: string[];
  features: string[];
}

interface ComplianceStandard {
  name: string;
  description: string;
  icon: ReactNode;
  requirements: string[];
  certifications: string[];
  industrySpecific: boolean;
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

// Add new interfaces for futuristic features
interface TechReadiness {
  level: number; // 1-9 scale
  description: string;
  timeToMaturity: string;
  riskFactors: string[];
  mitigationStrategies: string[];
}

interface FutureTrend {
  name: string;
  description: string;
  impactLevel: "Low" | "Medium" | "High" | "Transformative";
  timeHorizon: "Near-term" | "Mid-term" | "Long-term";
  marketPotential: string;
  disruptionPotential: string;
  icon: ReactNode;
}

interface ImplementationRoadmap {
  phases: {
    name: string;
    duration: string;
    description: string;
    milestones: string[];
    resources: string[];
    keyDeliverables: string[];
  }[];
  totalDuration: string;
  criticalPath: string[];
  keyRisks: string[];
}

interface SustainabilityImpact {
  score: number; // 0-100
  environmentalBenefit: string;
  carbonReduction: string;
  socialImpact: string;
  governanceEnhancement: string;
}

// Comprehensive industry data combining both implementations
const industries: Industry[] = [
  {
    id: "finance",
    title: "Financial Services",
    icon: <Landmark className="h-6 w-6" />,
    description:
      "AI-powered risk assessment, fraud detection, and personalized financial recommendations for banks and financial institutions.",
    benefits: [
      "Reduce fraud by up to 60% with real-time transaction monitoring",
      "Automate 85% of routine customer service inquiries",
      "Increase portfolio performance by 12-18% with AI-driven insights",
      "Reduce operational costs by 35% through process automation",
    ],
    caseStudy: {
      client: "Global Investment Bank",
      challenge: "Needed to improve fraud detection while reducing false positives",
      solution: "Implemented our AI-powered risk assessment platform with custom ML models",
      results: "Reduced fraud by 62% while decreasing false positives by 42%",
      testimonial: {
        name: "Sarah Johnson",
        role: "Chief Security Officer",
        company: "Global Investment Bank",
        quote: "The implementation exceeded our expectations, delivering substantial improvements in fraud detection accuracy while significantly reducing false positives."
      }
    },
    stats: [
      { label: "ROI", value: "280%", icon: <PieChart className="h-4 w-4" /> },
      { label: "Implementation", value: "6 weeks", icon: <Clock className="h-4 w-4" /> },
    ],
    technologies: ["Machine Learning", "NLP", "Predictive Analytics", "Pattern Recognition"],
    color: "from-blue-500 to-blue-700",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#3b82f6",
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
    paasFeatures: [
      {
        title: "Financial Data Pipeline",
        description: "Secure, compliant data processing pipelines designed for financial institutions",
        icon: <Shield className="h-6 w-6" />,
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
        icon: <ChartBar className="h-6 w-6" />,
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
        icon: <ChartBar className="h-6 w-6" />,
        description: "Real-time financial data integration with Bloomberg Terminal"
      },
      {
        name: "Plaid",
        category: "Banking",
        icon: <Shield className="h-6 w-6" />,
        description: "Secure banking data access and account verification"
      }
    ],
    deploymentOptions: [
      {
        title: "Financial Private Cloud",
        description: "Secure, isolated cloud environment for financial institutions",
        icon: <Shield className="h-6 w-6" />,
        features: [
          "FINRA and SEC compliant infrastructure",
          "Dedicated hardware for maximum security",
          "Physical isolation for sensitive workloads",
          "24/7 security monitoring and compliance audits"
        ]
      }
    ],
    securityFeatures: [
      {
        title: "Enterprise Security Suite",
        description: "Comprehensive security solution for financial institutions",
        icon: <Shield className="h-6 w-6" />,
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
        icon: <Shield className="h-6 w-6" />,
        requirements: [
          "GDPR compliance",
          "SOX compliance",
          "Basel III",
          "MiFID II"
        ],
        certifications: ["ISO 27001", "SOC 2", "PCI DSS"],
        industrySpecific: true
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
        icon: <Brain className="h-6 w-6" />,
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
        icon: <ChartBar className="h-6 w-6" />,
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
        icon: <Cpu className="h-6 w-6" />,
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
    blockchainSolutions: [
      {
        title: "Secure Payment Network",
        description: "Blockchain-based payment infrastructure for fast, secure transactions",
        icon: <ShieldCheck className="h-6 w-6" />,
        benefits: [
          "Reduce transaction costs by 80% compared to traditional systems",
          "Enable near-instant settlement across borders",
          "Eliminate payment reconciliation discrepancies",
          "Enhance security with cryptographic verification"
        ],
        useCase: "Implemented for a banking network processing $10B in monthly transactions",
        technology: "Stellar, Custom consensus mechanism",
        maturityLevel: "Established",
        implementationTime: "4-8 months"
      },
      {
        title: "Digital Asset Custody",
        description: "Institutional-grade custody solution for digital assets and cryptocurrencies",
        icon: <Lock className="h-6 w-6" />,
        benefits: [
          "Military-grade security for digital asset storage",
          "Multi-signature authorization workflows",
          "Regulatory compliant custody infrastructure",
          "Insurance coverage for stored assets"
        ],
        useCase: "Securing over $2B in digital assets for financial institutions",
        technology: "Multi-party computation, Hardware security modules",
        maturityLevel: "Growing",
        implementationTime: "3-6 months"
      }
    ],
    futureTrends: [
      {
        name: "Quantum-Resistant Cryptography",
        description: "Preparing financial systems for the quantum computing era with advanced cryptographic methods",
        impactLevel: "High",
        timeHorizon: "Mid-term",
        marketPotential: "$8.6B by 2028",
        disruptionPotential: "Complete overhaul of security infrastructure",
        icon: <Shield className="h-6 w-6" />
      },
      {
        name: "Central Bank Digital Currencies",
        description: "Integration with national digital currencies and regulatory frameworks",
        impactLevel: "Transformative",
        timeHorizon: "Near-term",
        marketPotential: "Potentially affects entire global economy",
        disruptionPotential: "Redefining monetary policy and banking",
        icon: <Landmark className="h-6 w-6" />
      }
    ],
    techReadiness: {
      level: 7,
      description: "Technologies are mature with ongoing refinements for scale and security",
      timeToMaturity: "1-2 years",
      riskFactors: ["Regulatory changes", "Integration complexity", "Security vulnerabilities"],
      mitigationStrategies: ["Regulatory sandbox testing", "Modular architecture", "Continuous security audits"]
    },
    implementationRoadmap: {
      phases: [
        {
          name: "Assessment & Planning",
          duration: "4-6 weeks",
          description: "Comprehensive analysis of current systems and integration points",
          milestones: ["System audit complete", "Requirements documentation", "Stakeholder approval"],
          resources: ["Business analysts", "Solution architects", "Compliance experts"],
          keyDeliverables: ["Gap analysis", "Implementation plan", "Risk assessment"]
        },
        {
          name: "Development & Integration",
          duration: "3-4 months",
          description: "Core solution development and integration with existing systems",
          milestones: ["API development", "Security implementation", "Integration testing"],
          resources: ["Full-stack developers", "Security engineers", "QA team"],
          keyDeliverables: ["Functional modules", "Integration points", "Test reports"]
        },
        {
          name: "Deployment & Optimization",
          duration: "1-2 months",
          description: "Production deployment with performance monitoring and optimization",
          milestones: ["Production deployment", "Performance baseline", "Optimization cycles"],
          resources: ["DevOps engineers", "Performance analysts", "User experience team"],
          keyDeliverables: ["Production system", "Performance reports", "Optimization roadmap"]
        }
      ],
      totalDuration: "6-8 months",
      criticalPath: ["Regulatory approval", "Legacy system integration", "Security validation"],
      keyRisks: ["Compliance delays", "Integration complexity", "Performance under load"]
    },
    sustainabilityImpact: {
      score: 82,
      environmentalBenefit: "35% reduction in paper usage through digitization",
      carbonReduction: "27% decrease in carbon footprint from optimized processing",
      socialImpact: "Financial inclusion for 200M+ underbanked individuals",
      governanceEnhancement: "Transparent audit trails and regulatory compliance"
    }
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: <Stethoscope className="h-6 w-6" />,
    description:
      "Advanced diagnostic support, patient outcome prediction, and operational efficiency improvements for healthcare providers.",
    benefits: [
      "Improve diagnostic accuracy by up to 40% with AI assistance",
      "Reduce patient readmission rates by 28% with predictive analytics",
      "Optimize resource allocation, saving 22% in operational costs",
      "Accelerate drug discovery by analyzing billions of molecular combinations",
    ],
    caseStudy: {
      client: "National Hospital Network",
      challenge: "Needed to improve diagnostic accuracy and reduce readmissions",
      solution: "Deployed our healthcare AI platform across 12 hospitals",
      results: "38% improvement in early diagnosis and 26% reduction in readmissions",
      testimonial: {
        name: "Dr. Michael Chen",
        role: "Director of Medical Operations",
        company: "National Hospital Network",
        quote: "The AI-powered diagnostic tools have dramatically improved our early detection capabilities, leading to better patient outcomes and reduced costs."
      }
    },
    stats: [
      { label: "ROI", value: "320%", icon: <PieChart className="h-4 w-4" /> },
      { label: "Implementation", value: "8 weeks", icon: <Clock className="h-4 w-4" /> },
    ],
    technologies: ["Computer Vision", "Time Series Analysis", "Reinforcement Learning", "Medical NLP"],
    color: "from-green-500 to-green-700",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#22c55e",
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
    aiSolutions: [
      {
        title: "AI-Powered Diagnostics",
        description: "Advanced image recognition for accurate medical diagnosis",
        icon: <Brain className="h-6 w-6" />,
        capabilities: [
          "Medical image analysis",
          "Symptom pattern recognition",
          "Disease progression prediction",
          "Treatment recommendation"
        ],
        useCases: [
          "Radiology image analysis",
          "Pathology slide analysis",
          "Dermatology condition assessment",
          "Ophthalmology screening"
        ],
        performance: {
          accuracy: 97.5,
          latency: 120,
          scalability: 800
        }
      },
      {
        title: "Patient Flow Optimization",
        description: "Intelligent scheduling and resource allocation systems",
        icon: <ChartBar className="h-6 w-6" />,
        capabilities: [
          "Predictive patient flow modeling",
          "Resource allocation optimization",
          "Wait time prediction",
          "Staff scheduling automation"
        ],
        useCases: [
          "Emergency department optimization",
          "Surgical suite scheduling",
          "Outpatient clinic management",
          "Hospital bed allocation"
        ],
        performance: {
          accuracy: 94.2,
          latency: 30,
          scalability: 1200
        }
      }
    ]
  },
  {
    id: "retail",
    title: "Retail & E-commerce",
    icon: <ShoppingBag className="h-6 w-6" />,
    description:
      "Personalized shopping experiences, inventory optimization, and demand forecasting for retail businesses.",
    benefits: [
      "Increase conversion rates by 35% with personalized recommendations",
      "Reduce inventory costs by 28% with AI-powered demand forecasting",
      "Optimize pricing in real-time based on market conditions",
      "Enhance customer service with 24/7 AI assistants",
    ],
    caseStudy: {
      client: "International Retail Chain",
      challenge: "Needed to optimize inventory and improve personalization",
      solution: "Implemented our retail analytics and recommendation engine",
      results: "32% increase in sales and 25% reduction in overstock situations",
      testimonial: {
        name: "Emma Rodriguez",
        role: "VP of Digital Transformation",
        company: "International Retail Chain",
        quote: "The personalized recommendation system has completely transformed our online shopping experience, dramatically increasing both conversion rates and customer satisfaction."
      }
    },
    stats: [
      { label: "ROI", value: "245%", icon: <PieChart className="h-4 w-4" /> },
      { label: "Implementation", value: "5 weeks", icon: <Clock className="h-4 w-4" /> },
    ],
    technologies: ["Recommendation Systems", "Demand Forecasting", "Customer Segmentation", "Dynamic Pricing"],
    color: "from-purple-500 to-purple-700",
    image: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2095&auto=format&fit=crop",
    particleColor: "#a855f7",
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
    aiSolutions: [
      {
        title: "Personalized Recommendation Engine",
        description: "AI-driven product recommendations based on customer behavior and preferences",
        icon: <Brain className="h-6 w-6" />,
        capabilities: [
          "Behavioral pattern analysis",
          "Cross-selling and upselling",
          "Seasonal trend adaptation",
          "A/B testing optimization"
        ],
        useCases: [
          "Product recommendations",
          "Bundle suggestions",
          "Personalized promotions",
          "Content personalization"
        ],
        performance: {
          accuracy: 92.8,
          latency: 80,
          scalability: 3000
        }
      },
      {
        title: "Inventory Optimization System",
        description: "AI-powered demand forecasting and inventory management",
        icon: <ChartBar className="h-6 w-6" />,
        capabilities: [
          "Demand pattern prediction",
          "Stock level optimization",
          "Supplier performance analysis",
          "Seasonal adjustment modeling"
        ],
        useCases: [
          "Stock level optimization",
          "Reorder point calculation",
          "Supplier selection",
          "Warehouse allocation"
        ],
        performance: {
          accuracy: 91.5,
          latency: 60,
          scalability: 2500
        }
      }
    ],
    blockchainSolutions: [
      {
        title: "Product Authentication Platform",
        description: "Blockchain-based solution for verifying product authenticity",
        icon: <CheckCircle2 className="h-6 w-6" />,
        benefits: [
          "Combat counterfeit products with tamper-proof verification",
          "Enable customers to verify product authenticity",
          "Track product lifecycle from manufacture to sale",
          "Build customer trust and brand loyalty"
        ],
        useCase: "Implemented for luxury goods manufacturer, reducing counterfeits by 85%",
        technology: "NFT, QR code integration, Mobile verification",
        maturityLevel: "Growing",
        implementationTime: "2-4 months"
      },
      {
        title: "Loyalty Token System",
        description: "Tokenized loyalty program with transferable rewards",
        icon: <Trophy className="h-6 w-6" />,
        benefits: [
          "Increase customer engagement with tokenized rewards",
          "Enable customers to trade and share loyalty points",
          "Create secondary markets for loyalty tokens",
          "Provide transparent reward issuance and redemption"
        ],
        useCase: "Boosted customer retention by 45% for retail chain with 500+ locations",
        technology: "ERC-20 tokens, Custom wallet integration",
        maturityLevel: "Emerging",
        implementationTime: "3-5 months"
      }
    ]
  },
  {
    id: "manufacturing-2",
    title: "Manufacturing",
    icon: <Building2 className="h-6 w-6" />,
    description:
      "Predictive maintenance, quality control automation, and supply chain optimization for manufacturing companies.",
    benefits: [
      "Reduce equipment downtime by up to 45% with predictive maintenance",
      "Improve quality control accuracy by 38% with computer vision",
      "Optimize supply chain efficiency, reducing costs by 22%",
      "Increase production throughput by 15-20% with AI scheduling",
    ],
    caseStudy: {
      client: "Global Automotive Manufacturer",
      challenge: "Needed to reduce equipment failures and improve quality",
      solution: "Deployed our predictive maintenance and quality control AI",
      results: "42% reduction in unplanned downtime and 35% fewer defects",
      testimonial: {
        name: "James Wilson",
        role: "Chief Operations Officer",
        company: "Global Automotive Manufacturer",
        quote: "The predictive maintenance system has been a game-changer for our production lines. We've seen dramatic reductions in downtime and significant improvements in product quality."
      }
    },
    stats: [
      { label: "ROI", value: "310%", icon: <PieChart className="h-4 w-4" /> },
      { label: "Implementation", value: "10 weeks", icon: <Clock className="h-4 w-4" /> },
    ],
    technologies: ["IoT Integration", "Predictive Maintenance", "Computer Vision", "Digital Twin"],
    color: "from-yellow-500 to-yellow-700",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#eab308",
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
    aiSolutions: [
      {
        title: "Predictive Maintenance System",
        description: "AI-driven system that predicts equipment failures before they occur",
        icon: <Brain className="h-6 w-6" />,
        capabilities: [
          "Equipment health monitoring",
          "Failure pattern recognition",
          "Maintenance scheduling optimization",
          "Resource allocation planning"
        ],
        useCases: [
          "Production line monitoring",
          "Equipment maintenance scheduling",
          "Spare parts inventory management",
          "Downtime reduction"
        ],
        performance: {
          accuracy: 96.2,
          latency: 40,
          scalability: 1500
        }
      },
      {
        title: "Quality Control Automation",
        description: "Computer vision and AI for automated quality inspection",
        icon: <ChartBar className="h-6 w-6" />,
        capabilities: [
          "Visual defect detection",
          "Dimensional measurement",
          "Surface quality assessment",
          "Process deviation detection"
        ],
        useCases: [
          "Product inspection",
          "Assembly verification",
          "Packaging quality control",
          "Material defect detection"
        ],
        performance: {
          accuracy: 99.8,
          latency: 70,
          scalability: 2000
        }
      }
    ],
    blockchainSolutions: [
      {
        title: "Supply Chain Traceability",
        description: "End-to-end blockchain tracking for manufacturing supply chains",
        icon: <Network className="h-6 w-6" />,
        benefits: [
          "Track raw materials from source to finished product",
          "Verify ethical sourcing and sustainability claims",
          "Enable rapid response to supply chain disruptions",
          "Streamline regulatory compliance and reporting"
        ],
        useCase: "Implemented for automotive manufacturer across 15 countries and 200+ suppliers",
        technology: "Hyperledger Fabric, IoT integration",
        maturityLevel: "Established",
        implementationTime: "6-12 months"
      },
      {
        title: "Digital Twin Certification",
        description: "Blockchain-verified digital twins for manufacturing assets",
        icon: <Copy className="h-6 w-6" />,
        benefits: [
          "Create tamper-proof records of physical assets",
          "Maintain verified maintenance and performance history",
          "Enable secure sharing of asset data with partners",
          "Enhance resale value with verifiable history"
        ],
        useCase: "Tracking 10,000+ industrial equipment units with complete digital records",
        technology: "IPFS, Ethereum, IoT sensors",
        maturityLevel: "Growing",
        implementationTime: "4-8 months"
      }
    ]
  },
  {
    id: "insurance",
    title: "Insurance",
    icon: <Briefcase className="h-6 w-6" />,
    description: "Risk assessment, claims processing automation, and fraud detection for insurance companies.",
    benefits: [
      "Accelerate claims processing by 75% with AI automation",
      "Reduce fraudulent claims by 48% with advanced detection",
      "Improve risk assessment accuracy by 32%",
      "Enhance customer satisfaction with faster service",
    ],
    caseStudy: {
      client: "Leading Insurance Provider",
      challenge: "Needed to streamline claims processing and detect fraud",
      solution: "Implemented our insurance AI platform",
      results: "70% faster claims processing and 45% reduction in fraudulent payouts",
      testimonial: {
        name: "Patricia Lawson",
        role: "Head of Claims Processing",
        company: "Leading Insurance Provider",
        quote: "The AI-powered claims system has revolutionized our processing efficiency while simultaneously improving our fraud detection capabilities. Our customers and our bottom line are both benefiting enormously."
      }
    },
    stats: [
      { label: "ROI", value: "290%", icon: <PieChart className="h-4 w-4" /> },
      { label: "Implementation", value: "7 weeks", icon: <Clock className="h-4 w-4" /> },
    ],
    technologies: ["Document Processing", "Anomaly Detection", "Risk Modeling", "Auto Classification"],
    color: "from-red-500 to-red-700",
    image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#ef4444",
    aiSolutions: [
      {
        title: "Claims Processing Automation",
        description: "AI-powered document processing and claims assessment",
        icon: <Brain className="h-6 w-6" />,
        capabilities: [
          "Document extraction and classification",
          "Damage assessment automation",
          "Claims routing optimization",
          "Fraud pattern detection"
        ],
        useCases: [
          "Claims document processing",
          "Damage assessment",
          "Claims triage",
          "Fraud detection"
        ],
        performance: {
          accuracy: 95.5,
          latency: 90,
          scalability: 1800
        }
      }
    ]
  },
  {
    id: "travel",
    title: "Travel & Hospitality",
    icon: <Plane className="h-6 w-6" />,
    description:
      "Dynamic pricing, personalized travel recommendations, and operational efficiency for travel companies.",
    benefits: [
      "Increase booking conversion rates by 28% with personalized offers",
      "Optimize pricing in real-time based on demand patterns",
      "Improve customer satisfaction with AI-powered recommendations",
      "Reduce operational costs by 25% through automation",
    ],
    caseStudy: {
      client: "International Hotel Chain",
      challenge: "Needed to optimize pricing and improve personalization",
      solution: "Deployed our travel AI platform across 200+ properties",
      results: "24% revenue increase and 30% improvement in customer satisfaction",
    },
    stats: [
      { label: "ROI", value: "215%", icon: <PieChart className="h-4 w-4" /> },
      { label: "Implementation", value: "6 weeks", icon: <Clock className="h-4 w-4" /> },
    ],
    technologies: ["Dynamic Pricing", "Personalization", "Sentiment Analysis", "Demand Forecasting"],
    color: "from-cyan-500 to-cyan-700",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    particleColor: "#06b6d4",
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
    aiSolutions: [
      {
        title: "Dynamic Pricing Engine",
        description: "AI-powered pricing optimization for maximum revenue",
        icon: <Brain className="h-6 w-6" />,
        capabilities: [
          "Demand forecasting",
          "Competitive price analysis",
          "Seasonal adjustment modeling",
          "Customer segment pricing"
        ],
        useCases: [
          "Hotel room pricing",
          "Airline ticket pricing",
          "Package tour pricing",
          "Car rental pricing"
        ],
        performance: {
          accuracy: 93.7,
          latency: 50,
          scalability: 2200
        }
      }
    ]
  },
];

// Animated card with 3D effect
function Card3D({ children, className = "", onClick = () => {}, intensity = 0.5 }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position variables
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Smooth spring physics for rotation
  const rotateX = useSpring(useTransform(y, [-100, 100], [10 * intensity, -10 * intensity]), {
    stiffness: 100,
    damping: 30
  })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10 * intensity, 10 * intensity]), {
    stiffness: 100,
    damping: 30
  })
  
  // Shadow effects based on mouse position
  const shadowX = useTransform(x, [-100, 100], [-5 * intensity, 5 * intensity])
  const shadowY = useTransform(y, [-100, 100], [-5 * intensity, 5 * intensity])
  const shadow = useTransform(
    [shadowX, shadowY],
    ([latestX, latestY]) => `${latestX}px ${latestY}px ${15 * intensity}px rgba(0, 0, 0, 0.2)`
  )
  
  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }
  
  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        boxShadow: shadow
      }}
    >
      {children}
    </motion.div>
  )
}

// Particles animation component
function Particles({ color = "#ef4444", count = 15 }) {
  // Using useEffect to ensure client-side only rendering
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
  }>>([]);
  
  useEffect(() => {
    // Generate particles only on the client side
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);
  }, [count]);
  
  // Don't render anything during SSR
  if (particles.length === 0) {
    return null;
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.6
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.6, 0.2, 0.6]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default function EnhancedIndustrySolutions() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>(industries[0])
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobile, setIsMobile] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [comparedIndustries, setComparedIndustries] = useState<string[]>([])
  const [showRoiCalculator, setShowRoiCalculator] = useState(false)
  const [viewMode, setViewMode] = useState<'card' | 'list' | 'matrix'>('card')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [roiInputs, setRoiInputs] = useState({
    employees: 100,
    currentCost: 10000,
    efficiency: 30,
    implementationCost: 50000,
    maintenanceCost: 5000,
    timeHorizon: 5,
    investmentTier: 'standard' as 'basic' | 'standard' | 'enterprise'
  })
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const printRef = useRef<HTMLDivElement>(null)
  const [isPrinting, setIsPrinting] = useState(false)
  const [selectedForPrint, setSelectedForPrint] = useState<'report' | 'roi' | null>(null)
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  
  // Handle industry change
  const handleIndustryChange = (industryId: string) => {
    const industry = industries.find((i) => i.id === industryId)
    if (industry) {
      setActiveIndustry(industry)
    }
  }

  // Toggle industry for comparison
  const toggleIndustryComparison = (industryId: string) => {
    if (comparedIndustries.includes(industryId)) {
      setComparedIndustries(comparedIndustries.filter(id => id !== industryId))
    } else {
      // Limit to 3 industries max for comparison
      if (comparedIndustries.length < 3) {
        setComparedIndustries([...comparedIndustries, industryId])
      }
    }
  }

  // Enhanced ROI calculation with investment tiers
  const calculateRoi = () => {
    // Base cost multipliers based on investment tier
    const tierMultipliers = {
      basic: { cost: 0.6, efficiency: 0.7, maintenance: 0.7 },
      standard: { cost: 1, efficiency: 1, maintenance: 1 },
      enterprise: { cost: 1.8, efficiency: 1.3, maintenance: 1.2 }
    };
    
    const multiplier = tierMultipliers[roiInputs.investmentTier];
    
    // Calculate adjusted implementation and maintenance costs
    const adjustedImplementationCost = roiInputs.implementationCost * multiplier.cost;
    const adjustedMaintenanceCost = roiInputs.maintenanceCost * multiplier.maintenance;
    
    // Calculate adjusted efficiency based on tier
    const adjustedEfficiency = roiInputs.efficiency * multiplier.efficiency;
    
    // Calculate annual savings
    const annualSavings = (roiInputs.currentCost * (adjustedEfficiency / 100)) * 12;
    
    // Calculate ROI
    const totalCost = adjustedImplementationCost + (adjustedMaintenanceCost * roiInputs.timeHorizon);
    const totalSavings = annualSavings * roiInputs.timeHorizon;
    const netBenefit = totalSavings - totalCost;
    const estimatedRoi = (netBenefit / totalCost) * 100;
    
    // Calculate payback period
    const monthlyBenefit = annualSavings / 12;
    const monthlyMaintenance = adjustedMaintenanceCost / 12;
    const monthsToRecoveryImplementation = adjustedImplementationCost / (monthlyBenefit - monthlyMaintenance);
    const paybackPeriod = monthsToRecoveryImplementation;
    
    // Calculate competitor comparison metrics
    const competitorEfficiency = roiInputs.efficiency * 0.7; // Competitors are 30% less efficient
    const competitorSavings = (roiInputs.currentCost * (competitorEfficiency / 100)) * 12;
    const competitorCost = adjustedImplementationCost * 0.9; // Competitors are 10% cheaper
    const competitorRoi = ((competitorSavings * roiInputs.timeHorizon - competitorCost) / competitorCost) * 100;
    
    // Generate sensitivity analysis for different efficiency levels
    const sensitivityAnalysis = [
      { label: 'Low', efficiency: roiInputs.efficiency * 0.7, roi: null as number | null },
      { label: 'Base', efficiency: roiInputs.efficiency, roi: null as number | null },
      { label: 'High', efficiency: Math.min(roiInputs.efficiency * 1.3, 100), roi: null as number | null }
    ];
    
    sensitivityAnalysis.forEach((scenario, index) => {
      const scenarioSavings = (roiInputs.currentCost * (scenario.efficiency / 100)) * 12;
      const scenarioNetBenefit = (scenarioSavings * roiInputs.timeHorizon) - totalCost;
      scenario.roi = (scenarioNetBenefit / totalCost) * 100;
    });
    
    return {
      annualSavings: annualSavings.toFixed(0),
      estimatedRoi: estimatedRoi.toFixed(1),
      paybackPeriod: paybackPeriod.toFixed(1),
      implementationCost: adjustedImplementationCost.toFixed(0),
      maintenanceCost: adjustedMaintenanceCost.toFixed(0),
      totalCost: totalCost.toFixed(0),
      totalSavings: totalSavings.toFixed(0),
      netBenefit: netBenefit.toFixed(0),
      competitorComparison: {
        efficiency: competitorEfficiency.toFixed(1),
        savings: competitorSavings.toFixed(0),
        cost: competitorCost.toFixed(0),
        roi: competitorRoi.toFixed(1)
      },
      sensitivityAnalysis,
      tierMultipliers
    }
  }

  // Handle ROI input changes
  const handleRoiInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle different input types
    if (name === 'investmentTier') {
      setRoiInputs({
        ...roiInputs,
        [name]: value as 'basic' | 'standard' | 'enterprise'
      });
    } else {
      setRoiInputs({
        ...roiInputs,
        [name]: parseInt(value, 10)
      });
    }
  }

  const roiResults = calculateRoi();
  
  // Generate and download industry report
  const generateIndustryReport = () => {
    setIsGeneratingReport(true)
    
    // Simulate report generation with a timeout
    setTimeout(() => {
      // Create report content
      const reportData = {
        title: `${activeIndustry.title} Industry AI Solutions Report`,
        date: new Date().toLocaleDateString(),
        industry: activeIndustry,
        solutions: activeIndustry.solutions || [],
        aiSolutions: activeIndustry.aiSolutions || [],
        blockchainSolutions: activeIndustry.blockchainSolutions || [],
        technologies: activeIndustry.technologies || [],
        benefits: activeIndustry.benefits || [],
        metrics: activeIndustry.metrics || {},
        caseStudy: activeIndustry.caseStudy,
      }
      
      // Convert to JSON string
      const jsonString = JSON.stringify(reportData, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      
      // Create download link and trigger download
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${activeIndustry.title.toLowerCase().replace(/\s+/g, '-')}-industry-report.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setIsGeneratingReport(false)
    }, 1500)
  }
  
  // Generate and download ROI report
  const generateRoiReport = () => {
    setIsGeneratingReport(true)
    
    // Simulate report generation with a timeout
    setTimeout(() => {
      const results = calculateRoi()
      
      // Generate timestamp for report ID
      const reportId = `ROI-${Date.now().toString().slice(-6)}`
      const timestamp = new Date().toISOString()
      
      // Create advanced report content with detailed analysis
      const reportData = {
        reportId: reportId,
        title: `${activeIndustry.title} Advanced ROI Analysis Report`,
        generatedAt: timestamp,
        version: "2.0",
        reportType: "comprehensive",
        industry: {
          id: activeIndustry.id,
          name: activeIndustry.title,
          segment: activeIndustry.id.charAt(0).toUpperCase() + activeIndustry.id.slice(1),
          marketMaturity: activeIndustry.techReadiness?.level || 5,
        },
        inputs: {
          employeeCount: roiInputs.employees,
          monthlyOperationalCost: roiInputs.currentCost,
          projectedEfficiencyGain: roiInputs.efficiency,
          implementationCost: 50000,
          maintenanceCost: 5000,
          trainingCost: 3000,
        },
        analysis: {
          summary: {
            annualSavings: parseInt(results.annualSavings),
            formattedAnnualSavings: `$${results.annualSavings}`,
            roi: parseFloat(results.estimatedRoi),
            formattedRoi: `${results.estimatedRoi}%`,
            paybackPeriod: parseFloat(results.paybackPeriod),
            formattedPaybackPeriod: `${results.paybackPeriod} months`,
            confidenceScore: 85,
            riskLevel: "Low to Medium",
          },
          detailed: {
            fiveYearSavings: parseInt(results.annualSavings) * 5,
            fiveYearCosts: 50000 + (5000 * 5) + 3000,
            netBenefit: (parseInt(results.annualSavings) * 5) - (50000 + (5000 * 5) + 3000),
            costReductionsByDepartment: [
              { department: "Operations", percentage: 35 },
              { department: "Customer Service", percentage: 25 },
              { department: "Administration", percentage: 20 },
              { department: "IT", percentage: 15 },
              { department: "Marketing", percentage: 5 },
            ],
            productivityGains: [
              { area: "Task Automation", percentage: 40 },
              { area: "Decision Making", percentage: 25 },
              { area: "Customer Response", percentage: 20 },
              { area: "Research & Analysis", percentage: 15 },
            ],
          },
          timeline: {
            quarters: [
              { quarter: "Q1", costs: 50000, savings: 0, roi: -100 },
              { quarter: "Q2", costs: 5000, savings: parseInt(results.annualSavings) / 4, roi: -65 },
              { quarter: "Q3", costs: 5000, savings: parseInt(results.annualSavings) / 4, roi: -30 },
              { quarter: "Q4", costs: 5000, savings: parseInt(results.annualSavings) / 4, roi: 5 },
              { quarter: "Q5", costs: 5000, savings: parseInt(results.annualSavings) / 4, roi: 40 },
              { quarter: "Q6", costs: 5000, savings: parseInt(results.annualSavings) / 4, roi: 75 },
              { quarter: "Q7", costs: 5000, savings: parseInt(results.annualSavings) / 4, roi: 110 },
              { quarter: "Q8", costs: 5000, savings: parseInt(results.annualSavings) / 4, roi: 145 },
            ],
            breakEvenPoint: parseFloat(results.paybackPeriod) / 3, // Convert months to quarters
          },
          competitors: {
            averageRoi: Math.floor(parseFloat(results.estimatedRoi) * 0.8),
            averagePaybackPeriod: Math.floor(parseFloat(results.paybackPeriod) * 1.2),
            marketPosition: parseFloat(results.estimatedRoi) > 150 ? "Leader" : "Competitive",
          }
        },
        recommendations: [
          {
            title: `Implement AI solutions in ${activeIndustry.title.toLowerCase()} immediately`,
            description: `With a projected ROI of ${results.estimatedRoi}%, this implementation represents a high-value opportunity with significant returns.`,
            priority: "High",
            timeframe: "Immediate",
            potentialImpact: "Transformative"
          },
          {
            title: `Focus on ${activeIndustry.aiSolutions?.[0]?.title || 'AI automation'} first`,
            description: `Target the highest-impact solutions to achieve quick wins and generate momentum.`,
            priority: "High",
            timeframe: "Month 1-3",
            potentialImpact: "High"
          },
          {
            title: "Establish KPI tracking framework",
            description: "Implement comprehensive tracking to validate ROI achievements and identify optimization opportunities.",
            priority: "Medium",
            timeframe: "Month 1-2",
            potentialImpact: "Medium"
          },
          {
            title: "Develop staff training program",
            description: "Ensure team members can fully leverage new capabilities to maximize return.",
            priority: "Medium",
            timeframe: "Month 2-4",
            potentialImpact: "High"
          }
        ],
        implementationRoadmap: {
          phases: activeIndustry.implementationRoadmap?.phases || [
            {
              name: "Assessment & Planning",
              duration: "4-6 weeks",
              description: "Comprehensive analysis of current systems and integration points",
              milestones: ["System audit complete", "Requirements documentation", "Stakeholder approval"],
              resources: ["Business analysts", "Solution architects", "Compliance experts"],
              keyDeliverables: ["Gap analysis", "Implementation plan", "Risk assessment"]
            },
            {
              name: "Development & Integration",
              duration: "3-4 months",
              description: "Core solution development and integration with existing systems",
              milestones: ["API development", "Security implementation", "Integration testing"],
              resources: ["Full-stack developers", "Security engineers", "QA team"],
              keyDeliverables: ["Functional modules", "Integration points", "Test reports"]
            },
            {
              name: "Deployment & Optimization",
              duration: "1-2 months",
              description: "Production deployment with performance monitoring and optimization",
              milestones: ["Production deployment", "Performance baseline", "Optimization cycles"],
              resources: ["DevOps engineers", "Performance analysts", "User experience team"],
              keyDeliverables: ["Production system", "Performance reports", "Optimization roadmap"]
            }
          ],
          criticalPath: activeIndustry.implementationRoadmap?.criticalPath || ["Requirements definition", "Integration planning", "User training"],
          keyRisks: activeIndustry.implementationRoadmap?.keyRisks || ["Integration complexity", "User adoption", "Data quality"],
          mitigationStrategies: [
            "Phased implementation approach",
            "Comprehensive training program",
            "Regular stakeholder reviews",
            "Dedicated support team"
          ]
        },
        additionalBenefits: [
          {
            category: "Strategic",
            benefits: [
              "Enhanced competitive positioning",
              "Improved decision-making capabilities",
              "Greater business agility"
            ]
          },
          {
            category: "Operational",
            benefits: [
              "Reduced manual effort",
              "Fewer processing errors",
              "Faster transaction processing"
            ]
          },
          {
            category: "Customer",
            benefits: [
              "Improved customer experience",
              "Faster response times",
              "More personalized service"
            ]
          }
        ],
        industryBenchmarks: {
          industryAvgRoi: Math.floor(parseFloat(results.estimatedRoi) * 0.85),
          topQuartileRoi: Math.floor(parseFloat(results.estimatedRoi) * 1.1),
          medianImplementationTime: "6 months",
          averageProductivityGain: `${Math.floor(roiInputs.efficiency * 0.9)}%`,
          topPerformerProductivityGain: `${Math.floor(roiInputs.efficiency * 1.2)}%`
        },
        nextSteps: [
          "Schedule detailed assessment workshop",
          "Identify project stakeholders and teams",
          "Define detailed implementation timeline",
          "Prepare budget and resource allocation plan"
        ],
        disclaimer: "This ROI analysis is based on the provided inputs and industry benchmarks. Actual results may vary based on implementation specifics, market conditions, and other factors.",
        reportGenerated: {
          timestamp: timestamp,
          format: "json",
          version: "2.0"
        }
      }
      
      // Convert to JSON string
      const jsonString = JSON.stringify(reportData, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      
      // Create download link and trigger download
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${activeIndustry.title.toLowerCase().replace(/\s+/g, '-')}-advanced-roi-report-${reportId}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Show success notification
      alert(`Advanced ROI report for ${activeIndustry.title} has been generated successfully!`)
      
      setIsGeneratingReport(false)
    }, 2500) // Slightly longer timeout to simulate complex report generation
  }
  
  // Implement print functionality
  const printReport = (type: 'report' | 'roi') => {
    setSelectedForPrint(type);
    setIsPrinting(true);
    
    setTimeout(() => {
      if (printRef.current) {
        try {
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            printWindow.document.write(`
              <html>
                <head>
                  <title>${type === 'report' ? activeIndustry.title + ' Industry Report' : 'ROI Analysis'}</title>
                  <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .logo { font-weight: bold; font-size: 24px; margin-bottom: 10px; }
                    h1 { margin-bottom: 5px; }
                    .date { color: #666; margin-bottom: 20px; }
                    .section { margin-bottom: 20px; }
                    h2 { border-bottom: 1px solid #eee; padding-bottom: 5px; }
                    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                    table, th, td { border: 1px solid #ddd; }
                    th, td { padding: 10px; text-align: left; }
                    th { background-color: #f8f8f8; }
                    .metric { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 8px 0; }
                    .metric-label { font-weight: bold; }
                    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
                    @media print {
                      body { -webkit-print-color-adjust: exact; }
                      .no-print { display: none; }
                    }
                  </style>
                </head>
                <body>
                  ${printRef.current.innerHTML}
                  <div class="footer">
                    <p>Generated on ${new Date().toLocaleDateString()} | © Mindscape AI Solutions</p>
                    <button class="no-print" onclick="window.print(); setTimeout(() => window.close(), 500);">Print Report</button>
                  </div>
                  <script>
                    window.onload = function() {
                      setTimeout(() => {
                        window.print();
                        setTimeout(() => window.close(), 500);
                      }, 500);
                    }
                  </script>
                </body>
              </html>
            `);
          }
        } catch (error) {
          console.error('Error printing:', error);
        }
      }
    }, 500);
  }
  
  return (
    <div className="max-w-none px-4 md:px-6 py-16 md:py-24 relative">
      {/* Hero section with animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16 w-full max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/5 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-red-400" />
            INDUSTRY SOLUTIONS
          </Badge>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Transform Your Industry with <span className="text-transparent bg-gradient-to-r from-red-400 to-red-500">Advanced AI</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover tailored AI and blockchain solutions designed to address the unique challenges of your industry, 
            improving efficiency, reducing costs, and driving innovation.
          </motion.p>
        </motion.div>
        
        {/* Enhanced Action Buttons */}
        <motion.div 
          className="flex flex-wrap gap-3 mt-8 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button 
            variant="outline" 
            onClick={() => setCompareMode(!compareMode)}
            className={`px-5 py-2.5 ${compareMode ? 
              'bg-gradient-to-r from-red-500/20 to-red-600/10 border-red-500/40 text-white ring-1 ring-red-500/30 ring-offset-1 ring-offset-black/30' : 
              'bg-black/40 border-white/10'}`}
          >
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Compare Industries
              {compareMode && (
                <div className="relative h-2 w-2">
                  <div className="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 bg-red-500 rounded-full"></div>
                </div>
              )}
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setShowRoiCalculator(!showRoiCalculator)}
            className={`px-5 py-2.5 ${showRoiCalculator ? 
              'bg-gradient-to-r from-blue-500/20 to-blue-600/10 border-blue-500/40 text-white ring-1 ring-blue-500/30 ring-offset-1 ring-offset-black/30' : 
              'bg-black/40 border-white/10'}`}
          >
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              ROI Calculator
              {showRoiCalculator && (
                <div className="relative h-2 w-2">
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-purple-600/10 border-purple-500/40 text-white"
            onClick={generateIndustryReport}
            disabled={isGeneratingReport}
          >
            <div className="flex items-center gap-2">
              {isGeneratingReport ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              Download Industry Report
            </div>
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Industry selector - desktop view with card-based grid */}
      <div className="w-full mb-12 max-w-7xl mx-auto">
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
          {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.1 + (index * 0.05) } 
                }}
                className="h-full"
              >
                <Card3D
                  className={`cursor-pointer h-full ${activeIndustry.id === industry.id ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/20' : ''}`}
                  onClick={() => handleIndustryChange(industry.id)}
                  intensity={0.5}
                >
                  <div
                    className={`w-full h-full py-4 px-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-3 group relative overflow-hidden border ${
                      activeIndustry.id === industry.id
                        ? "bg-gradient-to-r from-red-600/20 to-red-500/5 border-red-500/40 shadow-lg shadow-red-500/5"
                        : "bg-black/50 backdrop-blur-md border-white/10 hover:bg-black/60 hover:border-white/20"
                    }`}
                  >
                    {/* Modern shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                      <div className="absolute inset-[-100%] w-[400%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
                    </div>
                    
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${industry.color} transition-transform duration-300 group-hover:scale-110`}>
                      {industry.icon}
                    </div>
                    <h3 className="font-medium text-center">{industry.title}</h3>
                    <p className="text-xs text-white/60 text-center line-clamp-2">{industry.description}</p>
                    
                    {activeIndustry.id === industry.id && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-red-400"></div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center pb-3 transition-opacity duration-300">
                      <span className="text-xs font-medium text-white/90 flex items-center gap-1">
                        <ArrowRight className="h-3 w-3" />
                        View Solutions
                      </span>
                    </div>
                    
                    {compareMode && (
                      <div 
                        className="absolute top-2 right-2 z-10 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleIndustryComparison(industry.id);
                        }}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          comparedIndustries.includes(industry.id) ? 
                            'bg-red-500 text-white' : 
                            'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}>
                          {comparedIndustries.includes(industry.id) ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Plus className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card3D>
              </motion.div>
          ))}
        </div>
        
        {/* Mobile industry selector - horizontal tabs with enhanced UI */}
        <div className="md:hidden w-full mb-8">
            <Tabs defaultValue={activeIndustry.id} onValueChange={handleIndustryChange}>
              <div className="w-full overflow-x-auto pb-3 -mx-4 px-4 scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-white/5">
                <TabsList className="w-max flex justify-start bg-black/50 backdrop-blur-md border border-white/10 p-1.5 gap-1.5 min-w-full rounded-xl">
                {industries.map((industry) => (
                    <TabsTrigger
                      key={industry.id}
                      value={industry.id}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-500 data-[state=active]:text-white px-4 py-2 flex items-center gap-2 rounded-lg whitespace-nowrap transition-all duration-300"
                    >
                      <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                        {industry.icon}
                      </div>
                      <span className="text-sm font-medium">{industry.title}</span>
                      
                      {compareMode && (
                        <div 
                          className="ml-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleIndustryComparison(industry.id);
                          }}
                        >
                          {comparedIndustries.includes(industry.id) ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <Plus className="h-3 w-3 text-white/60" />
                          )}
                        </div>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          
          {/* Mobile selection indicator with animation */}
          <div className="text-center my-4">
            <Badge className="bg-black/30 border-white/10 text-white/70">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeIndustry.color}`}></div>
                <span>Selected: {activeIndustry.title}</span>
            </div>
            </Badge>
          </div>
        </div>
        </div>
        
        {/* Industry content grid - full width with responsive columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-12">
          {/* Left column - Industry overview */}
          <div className="space-y-8 w-full">
            <Card className="w-full border border-white/10 bg-black/30 backdrop-blur-sm h-auto">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${activeIndustry.color.replace('from-', '').replace('to-', '').split(' ')[0]}`}>
                    {activeIndustry.icon}
                  </div>
                  <span className="text-white">{activeIndustry.title}</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  {activeIndustry.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Key Benefits</h4>
                    <ul className="space-y-2">
                      {activeIndustry.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="p-1 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                            <Check className="h-3 w-3" />
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {activeIndustry.stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                          <div className="p-2 rounded-lg bg-white/10 text-white">
                            {stat.icon}
                          </div>
                          <div>
                            <p className="text-sm text-white/70">{stat.label}</p>
                            <p className="font-bold">{stat.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card3D className="w-full" intensity={0.3}>
              <div className="bg-gradient-to-br from-black/80 to-black/60 rounded-xl p-6 backdrop-blur-xl border border-white/10 h-full flex flex-col relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-red-500/20 to-red-500/0 rounded-full blur-3xl pointer-events-none"></div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${activeIndustry.color.replace('from-', '').replace('to-', '').split(' ')[0]}`}>
                    {activeIndustry.icon}
                  </div>
                  <span>Case Study: {activeIndustry.caseStudy.client}</span>
                </h3>
                <div className="space-y-4 flex-grow">
                  <div>
                    <h4 className="text-sm font-medium text-white/70 mb-1">Challenge</h4>
                    <p className="text-sm">{activeIndustry.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/70 mb-1">Solution</h4>
                    <p className="text-sm">{activeIndustry.caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/70 mb-1">Results</h4>
                    <p className="text-sm text-green-400 font-medium">
                      {typeof activeIndustry.caseStudy.results === 'string' 
                        ? activeIndustry.caseStudy.results
                        : activeIndustry.caseStudy.results.join(' • ')}
                    </p>
                  </div>
                </div>
                {activeIndustry.caseStudy.testimonial && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-lg font-bold">
                        {activeIndustry.caseStudy.testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm italic text-white/80 mb-1">"{activeIndustry.caseStudy.testimonial.quote}"</p>
                        <p className="text-xs text-white/60">
                          <span className="font-medium">{activeIndustry.caseStudy.testimonial.name}</span> • {activeIndustry.caseStudy.testimonial.role}, {activeIndustry.caseStudy.testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card3D>
          </div>
          
          {/* Right column - AI Solutions and Technologies */}
          <div className="space-y-8 w-full">
            <Card className="w-full border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden h-auto">
              <div className="relative h-48">
                <NextImage 
                  src={activeIndustry.image} 
                  alt={activeIndustry.title} 
                  className="w-full h-full object-cover"
                  width={300}
                  height={200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">AI Solutions for {activeIndustry.title}</h3>
                </div>
                <Particles color={activeIndustry.particleColor} />
              </div>
              <CardContent className="pt-6 w-full">
                <Tabs defaultValue="solutions" className="w-full">
                  <TabsList className="w-full flex justify-between bg-black/30 backdrop-blur-md border border-white/10 p-1 mb-6 rounded-lg">
                    <TabsTrigger 
                      value="solutions" 
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white px-3 py-1.5 flex-1 text-xs flex items-center justify-center"
                    >
                      <Package className="h-3.5 w-3.5 mr-1.5" />
                      <span>Solutions</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="ai" 
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-3 py-1.5 flex-1 text-xs flex items-center justify-center"
                    >
                      <Brain className="h-3.5 w-3.5 mr-1.5" />
                      <span>AI</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="blockchain" 
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-3 py-1.5 flex-1 text-xs flex items-center justify-center"
                    >
                      <Database className="h-3.5 w-3.5 mr-1.5" />
                      <span>Blockchain</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="future" 
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white px-3 py-1.5 flex-1 text-xs flex items-center justify-center"
                    >
                      <Rocket className="h-3.5 w-3.5 mr-1.5" />
                      <span>Future</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center justify-end mb-4 gap-3 w-full">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`bg-black/20 border-white/10 hover:bg-black/40 ${viewMode === 'card' ? 'bg-gradient-to-r from-gray-900/80 to-black border-white/20' : ''}`}
                      onClick={() => setViewMode('card')}
                    >
                      <LayoutGrid className="h-4 w-4 mr-2" />
                      <span>Card View</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`bg-black/20 border-white/10 hover:bg-black/40 ${viewMode === 'list' ? 'bg-gradient-to-r from-gray-900/80 to-black border-white/20' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <LayoutList className="h-4 w-4 mr-2" />
                      <span>List View</span>
                    </Button>
                  </div>
                  
                  {/* Solutions tab content */}
                  <TabsContent value="solutions" className="space-y-4 min-h-[300px] w-full">
                    {viewMode === 'card' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                        {activeIndustry.solutions?.map((solution, index) => (
                          <Card3D key={index} className="h-full" intensity={0.2}>
                            <div className="p-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-red-500/30 transition-all duration-300 h-full">
                              <div className="flex items-start h-full">
                                <div className="p-2.5 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/30 text-red-400 mr-4 flex-shrink-0">
                                  <Zap className="h-5 w-5" />
                                </div>
                                <div className="flex-grow flex flex-col h-full">
                                  <h4 className="font-medium mb-1">{solution}</h4>
                                  <p className="text-sm text-white/60 flex-grow">
                                    Advanced AI solution tailored for {activeIndustry.title.toLowerCase()} applications.
                                  </p>
                                  <div className="mt-3 pt-3 border-t border-white/10">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="px-0 text-red-400 hover:text-red-300 hover:bg-transparent"
                                    >
                                      <span className="flex items-center gap-1 text-xs">
                                        Learn more
                                        <ArrowRight className="h-3 w-3" />
                                      </span>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card3D>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3 w-full">
                        {activeIndustry.solutions?.map((solution, index) => (
                          <div key={index} className="group">
                            <div className="p-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-red-500/30 transition-all duration-300">
                              <div className="flex items-center">
                                <div className="p-2.5 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/30 text-red-400 mr-4 flex-shrink-0">
                                  <Zap className="h-5 w-5" />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium mb-1">{solution}</h4>
                                  <p className="text-sm text-white/60">
                                    Advanced AI solution tailored for {activeIndustry.title.toLowerCase()} applications.
                                  </p>
                                </div>
                                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ChevronRight className="h-5 w-5 text-red-500" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-black/40 border-white/10 hover:bg-black/60 hover:border-red-500/30"
                        onClick={() => {
                          // Show a modal or navigate to a page with all solutions
                          alert('View all solutions for ' + activeIndustry.title);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span>View All Solutions</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* AI Capabilities tab content */}
                  <TabsContent value="ai" className="space-y-4 min-h-[300px] w-full">
                    {activeIndustry.aiSolutions && activeIndustry.aiSolutions.length > 0 ? (
                      <>
                        {viewMode === 'card' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                            {activeIndustry.aiSolutions.map((solution, index) => (
                              <Card3D key={index} className="h-full" intensity={0.2}>
                                <div className="p-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-blue-500/30 transition-all duration-300 h-full">
                                  <div className="flex items-start h-full">
                                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/30 text-blue-400 mr-4 flex-shrink-0">
                                      {solution.icon || <Brain className="h-5 w-5" />}
                                    </div>
                                    <div className="flex flex-col h-full">
                                      <h3 className="font-medium mb-1">{solution.title}</h3>
                                      <p className="text-sm text-white/70 mb-3">{solution.description}</p>
                                      
                                      <div className="mt-auto pt-3 border-t border-white/10 flex flex-wrap gap-2">
                                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                          {solution.performance.accuracy}% Accuracy
                                        </Badge>
                                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                                          {solution.performance.latency}ms Latency
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Card3D>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3 w-full">
                            {activeIndustry.aiSolutions.map((solution, index) => (
                              <div key={index} className="flex gap-4 p-3 border border-white/10 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
                                <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/30 text-blue-400 flex-shrink-0">
                                  {solution.icon || <Brain className="h-5 w-5" />}
                                </div>
                                <div>
                                  <h3 className="font-medium">{solution.title}</h3>
                                  <p className="text-sm text-white/70 mb-2">{solution.description}</p>
                                  
                                  <div className="mt-2 space-y-2">
                                    <div>
                                      <p className="text-xs font-medium text-white/60 mb-1">Key Capabilities:</p>
                                      <div className="flex flex-wrap gap-1">
                                        {solution.capabilities.map((capability, i) => (
                                          <Badge key={i} variant="outline" className="bg-black/30 text-white/80 border-white/20 text-xs">
                                            {capability}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <p className="text-xs font-medium text-white/60 mb-1">Performance:</p>
                                      <div className="grid grid-cols-3 gap-2">
                                        <div>
                                          <p className="text-xs text-white/50">Accuracy</p>
                                          <div className="flex items-center">
                                            <Progress value={solution.performance.accuracy} className="h-1.5 mr-2" />
                                            <span className="text-xs font-medium">{solution.performance.accuracy}%</span>
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-xs text-white/50">Latency</p>
                                          <div className="flex items-center">
                                            <Progress value={100 - (solution.performance.latency / 2)} className="h-1.5 mr-2" />
                                            <span className="text-xs font-medium">{solution.performance.latency}ms</span>
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-xs text-white/50">Scalability</p>
                                          <div className="flex items-center">
                                            <Progress value={solution.performance.scalability} className="h-1.5 mr-2" />
                                            <span className="text-xs font-medium">{solution.performance.scalability}/10</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-6 flex justify-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-black/40 border-white/10 hover:bg-black/60 hover:border-blue-500/30"
                            onClick={() => {
                              // Show a modal or navigate to a page with all AI solutions
                              alert('View all AI solutions for ' + activeIndustry.title);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span>Explore AI Capabilities</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                          <Brain className="h-8 w-8 text-blue-400/60" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No AI Solutions Available</h3>
                        <p className="text-white/60 max-w-md">
                          This industry doesn't have specific AI solutions defined yet. Check back later for updates.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Blockchain tab content */}
                  <TabsContent value="blockchain" className="space-y-4 min-h-[300px] w-full">
                    {activeIndustry.blockchainSolutions && activeIndustry.blockchainSolutions.length > 0 ? (
                      <>
                        {viewMode === 'card' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                            {activeIndustry.blockchainSolutions.map((solution, index) => (
                              <Card3D key={index} className="h-full" intensity={0.2}>
                                <div className="p-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/30 transition-all duration-300 h-full">
                                  <div className="flex flex-col h-full">
                                    <div className="flex items-start mb-3">
                                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/30 text-purple-400 mr-4 flex-shrink-0">
                                        {solution.icon || <Database className="h-5 w-5" />}
                                      </div>
                                      <div>
                                        <h3 className="font-medium">{solution.title}</h3>
                                        <p className="text-sm text-white/70">{solution.description}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-auto pt-3 border-t border-white/10 space-y-3">
                                      <div>
                                        <p className="text-xs font-medium text-white/60 mb-1">Use Case:</p>
                                        <p className="text-sm">{solution.useCase}</p>
                                      </div>
                                      
                                      <div className="flex items-center justify-between">
                                        <Badge className={`
                                          ${solution.maturityLevel === 'Emerging' && 'bg-blue-500/20 text-blue-400 border-blue-500/20'} 
                                          ${solution.maturityLevel === 'Growing' && 'bg-amber-500/20 text-amber-400 border-amber-500/20'} 
                                          ${solution.maturityLevel === 'Established' && 'bg-green-500/20 text-green-400 border-green-500/20'}
                                        `}>
                                          {solution.maturityLevel}
                                        </Badge>
                                        
                                        <div className="text-xs text-white/60">
                                          <Clock className="h-3 w-3 inline-block mr-1" />
                                          {solution.implementationTime}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Card3D>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3 w-full">
                            {activeIndustry.blockchainSolutions.map((solution, index) => (
                              <div key={index} className="p-4 border border-white/10 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
                                <div className="flex items-start gap-4 mb-3">
                                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/30 text-purple-400 flex-shrink-0">
                                    {solution.icon || <Database className="h-5 w-5" />}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-medium">{solution.title}</h3>
                                      <Badge className={`ml-2 text-xs
                                        ${solution.maturityLevel === 'Emerging' && 'bg-blue-500/20 text-blue-400 border-blue-500/20'} 
                                        ${solution.maturityLevel === 'Growing' && 'bg-amber-500/20 text-amber-400 border-amber-500/20'} 
                                        ${solution.maturityLevel === 'Established' && 'bg-green-500/20 text-green-400 border-green-500/20'}
                                      `}>
                                        {solution.maturityLevel}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-white/70">{solution.description}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                  <div className="space-y-2">
                                    <h4 className="text-sm font-medium flex items-center gap-2">
                                      <Code className="h-4 w-4 text-purple-400" />
                                      Technology
                                    </h4>
                                    <p className="text-sm text-white/70">{solution.technology}</p>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <h4 className="text-sm font-medium flex items-center gap-2">
                                      <Zap className="h-4 w-4 text-purple-400" />
                                      Benefits
                                    </h4>
                                    <ul className="space-y-1">
                                      {solution.benefits.map((benefit, i) => (
                                        <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                                          <CheckCircle className="h-3.5 w-3.5 text-purple-400 mt-0.5 shrink-0" />
                                          <span>{benefit}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                                  <div className="text-sm">
                                    <span className="text-white/60">Implementation Time:</span> {solution.implementationTime}
                                  </div>
                                  
                                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-950/20">
                                    <span className="flex items-center gap-1">
                                      Learn More
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-6 flex justify-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-black/40 border-white/10 hover:bg-black/60 hover:border-purple-500/30"
                            onClick={() => {
                              // Show a modal or navigate to a page with all blockchain solutions
                              alert('Explore all blockchain solutions for ' + activeIndustry.title);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Database className="h-4 w-4 mr-1" />
                              <span>Explore Blockchain Solutions</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                          <Database className="h-8 w-8 text-purple-400/60" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No Blockchain Solutions Available</h3>
                        <p className="text-white/60 max-w-md">
                          This industry doesn't have specific blockchain solutions defined yet. Check back later for updates.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Future Trends tab content */}
                  <TabsContent value="future" className="space-y-4 min-h-[300px] w-full">
                    {activeIndustry.futureTrends && activeIndustry.futureTrends.length > 0 ? (
                      <>
                        {viewMode === 'card' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                            {activeIndustry.futureTrends.map((trend, index) => (
                              <Card3D key={index} className="h-full" intensity={0.2}>
                                <div className="p-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-green-500/30 transition-all duration-300 h-full">
                                  <div className="flex flex-col h-full">
                                    <div className="flex items-start mb-3">
                                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/30 text-green-400 mr-4 flex-shrink-0">
                                        {trend.icon || <Rocket className="h-5 w-5" />}
                                      </div>
                                      <div>
                                        <h3 className="font-medium">{trend.name}</h3>
                                        <p className="text-sm text-white/70">{trend.description}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-auto pt-3 border-t border-white/10">
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <p className="text-xs text-white/50 mb-1">Impact Level</p>
                                          <Badge 
                                            className={`
                                              ${trend.impactLevel === 'Low' && 'bg-blue-500/20 text-blue-400'} 
                                              ${trend.impactLevel === 'Medium' && 'bg-amber-500/20 text-amber-400'} 
                                              ${trend.impactLevel === 'High' && 'bg-orange-500/20 text-orange-400'} 
                                              ${trend.impactLevel === 'Transformative' && 'bg-green-500/20 text-green-400'}
                                            `}
                                          >
                                            {trend.impactLevel}
                                          </Badge>
                                        </div>
                                        <div>
                                          <p className="text-xs text-white/50 mb-1">Time Horizon</p>
                                          <Badge 
                                            variant="outline" 
                                            className="bg-white/5 border-white/10"
                                          >
                                            {trend.timeHorizon}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Card3D>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3 w-full">
                            {activeIndustry.futureTrends.map((trend, index) => (
                              <div key={index} className="p-4 border border-white/10 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
                                <div className="flex items-start gap-4">
                                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/30 text-green-400 flex-shrink-0">
                                    {trend.icon || <Rocket className="h-5 w-5" />}
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex items-center flex-wrap gap-2">
                                      <h3 className="font-medium">{trend.name}</h3>
                                      <Badge 
                                        className={`
                                          ${trend.impactLevel === 'Low' && 'bg-blue-500/20 text-blue-400'} 
                                          ${trend.impactLevel === 'Medium' && 'bg-amber-500/20 text-amber-400'} 
                                          ${trend.impactLevel === 'High' && 'bg-orange-500/20 text-orange-400'} 
                                          ${trend.impactLevel === 'Transformative' && 'bg-green-500/20 text-green-400'}
                                        `}
                                      >
                                        {trend.impactLevel} Impact
                                      </Badge>
                                      <Badge variant="outline" className="bg-white/5 border-white/10">
                                        {trend.timeHorizon}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-white/70 mt-1 mb-3">{trend.description}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                      <div className="space-y-1">
                                        <h4 className="text-xs font-medium text-white/60">Market Potential</h4>
                                        <p className="text-sm">{trend.marketPotential}</p>
                                      </div>
                                      <div className="space-y-1">
                                        <h4 className="text-xs font-medium text-white/60">Disruption Potential</h4>
                                        <p className="text-sm">{trend.disruptionPotential}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-6 flex justify-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-black/40 border-white/10 hover:bg-black/60 hover:border-green-500/30"
                            onClick={() => {
                              // Show a modal or navigate to a page with future trends
                              alert('Explore future trends for ' + activeIndustry.title);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Rocket className="h-4 w-4 mr-1" />
                              <span>Explore Future Trends</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                          <Rocket className="h-8 w-8 text-green-400/60" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Future Trends Coming Soon</h3>
                        <p className="text-white/60 max-w-md">
                          We're working on predicting future trends for this industry. Check back later for insights.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="w-full border border-white/10 bg-black/30 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle>Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {activeIndustry.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-white/5 border-white/10">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* ROI Calculator - full width */}
        {showRoiCalculator && (
          <div 
            id="roi-calculator"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <div className="bg-black/90 border border-white/10 rounded-xl p-6 w-full max-w-5xl relative my-8">
              <button 
                onClick={() => setShowRoiCalculator(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                aria-label="Close ROI calculator"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Advanced ROI Calculator</h3>
                  <p className="text-white/60 text-sm">{activeIndustry.title} - Investment Analysis</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-black/40 border border-white/5 rounded-xl p-5">
                    <h4 className="text-sm font-medium text-white/70 mb-4">Investment Parameters</h4>
                    
                    <div className="space-y-5">
                      {/* Investment Tier Selector */}
                      <div>
                        <label className="block text-sm text-white/70 mb-2">Investment Tier</label>
                        <div className="grid grid-cols-3 gap-2">
                          <div
                            className={`cursor-pointer rounded-lg px-3 py-2 text-center text-sm transition-all ${
                              roiInputs.investmentTier === 'basic' 
                                ? 'bg-gradient-to-r from-green-600/30 to-green-500/10 border border-green-500/40' 
                                : 'bg-black/30 border border-white/10 hover:bg-black/50'
                            }`}
                            onClick={() => setRoiInputs({...roiInputs, investmentTier: 'basic'})}
                          >
                            <div className="text-xs text-white/50 mb-1">Basic</div>
                            <div className="font-medium">$30,000</div>
                          </div>
                          
                          <div
                            className={`cursor-pointer rounded-lg px-3 py-2 text-center text-sm transition-all ${
                              roiInputs.investmentTier === 'standard' 
                                ? 'bg-gradient-to-r from-blue-600/30 to-blue-500/10 border border-blue-500/40' 
                                : 'bg-black/30 border border-white/10 hover:bg-black/50'
                            }`}
                            onClick={() => setRoiInputs({...roiInputs, investmentTier: 'standard'})}
                          >
                            <div className="text-xs text-white/50 mb-1">Standard</div>
                            <div className="font-medium">$50,000</div>
                          </div>
                          
                          <div
                            className={`cursor-pointer rounded-lg px-3 py-2 text-center text-sm transition-all ${
                              roiInputs.investmentTier === 'enterprise' 
                                ? 'bg-gradient-to-r from-purple-600/30 to-purple-500/10 border border-purple-500/40' 
                                : 'bg-black/30 border border-white/10 hover:bg-black/50'
                            }`}
                            onClick={() => setRoiInputs({...roiInputs, investmentTier: 'enterprise'})}
                          >
                            <div className="text-xs text-white/50 mb-1">Enterprise</div>
                            <div className="font-medium">$90,000</div>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-xs text-white/50">
                          <div className="flex items-center gap-1 mb-1">
                            <div className={`w-2 h-2 rounded-full ${
                              roiInputs.investmentTier === 'basic' ? 'bg-green-500' : 
                              roiInputs.investmentTier === 'standard' ? 'bg-blue-500' : 'bg-purple-500'
                            }`}></div>
                            {roiInputs.investmentTier === 'basic' && 'Basic: Core features, limited customization'}
                            {roiInputs.investmentTier === 'standard' && 'Standard: Full feature set, moderate customization'}
                            {roiInputs.investmentTier === 'enterprise' && 'Enterprise: Premium features, full customization'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Number of Employees Slider */}
                      <div>
                        <label className="block text-sm text-white/70 mb-2">Number of Employees</label>
                        <input
                          type="range"
                          name="employees"
                          min="10"
                          max="1000"
                          step="10"
                          value={roiInputs.employees}
                          onChange={handleRoiInputChange}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-white/50 mt-1">
                          <span>10</span>
                          <span>{roiInputs.employees}</span>
                          <span>1000</span>
                        </div>
                      </div>
                      
                      {/* Current Monthly Cost Slider */}
                      <div>
                        <label className="block text-sm text-white/70 mb-2">Current Monthly Cost ($)</label>
                        <input
                          type="range"
                          name="currentCost"
                          min="1000"
                          max="100000"
                          step="1000"
                          value={roiInputs.currentCost}
                          onChange={handleRoiInputChange}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-white/50 mt-1">
                          <span>$1,000</span>
                          <span>${roiInputs.currentCost.toLocaleString()}</span>
                          <span>$100,000</span>
                        </div>
                      </div>
                      
                      {/* Expected Efficiency Gain Slider */}
                      <div>
                        <label className="block text-sm text-white/70 mb-2">Expected Efficiency Gain (%)</label>
                        <input
                          type="range"
                          name="efficiency"
                          min="5"
                          max="70"
                          step="1"
                          value={roiInputs.efficiency}
                          onChange={handleRoiInputChange}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-white/50 mt-1">
                          <span>5%</span>
                          <span>{roiInputs.efficiency}%</span>
                          <span>70%</span>
                        </div>
                      </div>
                      
                      {/* Time Horizon */}
                      <div>
                        <label className="block text-sm text-white/70 mb-2">Time Horizon (Years)</label>
                        <input
                          type="range"
                          name="timeHorizon"
                          min="1"
                          max="10"
                          step="1"
                          value={roiInputs.timeHorizon}
                          onChange={handleRoiInputChange}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-white/50 mt-1">
                          <span>1</span>
                          <span>{roiInputs.timeHorizon}</span>
                          <span>10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  {/* Summary Results */}
                  <div className="bg-black/40 border border-white/5 rounded-xl p-5">
                    <h4 className="text-sm font-medium text-white/70 mb-4">ROI Summary</h4>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-black/60 border border-white/5 rounded-lg p-3">
                        <div className="text-sm text-white/70 mb-1">Annual Savings</div>
                        <div className="text-xl font-bold text-green-500">${parseInt(roiResults.annualSavings).toLocaleString()}</div>
                      </div>
                      
                      <div className="bg-black/60 border border-white/5 rounded-lg p-3">
                        <div className="text-sm text-white/70 mb-1">ROI ({roiInputs.timeHorizon}yr)</div>
                        <div className="text-xl font-bold text-blue-500">{roiResults.estimatedRoi}%</div>
                      </div>
                      
                      <div className="bg-black/60 border border-white/5 rounded-lg p-3">
                        <div className="text-sm text-white/70 mb-1">Payback Period</div>
                        <div className="text-xl font-bold text-amber-500">{roiResults.paybackPeriod} months</div>
                      </div>
                      
                      <div className="bg-black/60 border border-white/5 rounded-lg p-3">
                        <div className="text-sm text-white/70 mb-1">Net Benefit</div>
                        <div className="text-xl font-bold text-purple-500">${parseInt(roiResults.netBenefit).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium uppercase text-white/60 mb-3">Investment Overview</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Implementation Cost</span>
                            <span>${parseInt(roiResults.implementationCost).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Annual Maintenance</span>
                            <span>${parseInt(roiResults.maintenanceCost).toLocaleString()}/year</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Total {roiInputs.timeHorizon}-Year Cost</span>
                            <span>${parseInt(roiResults.totalCost).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Total {roiInputs.timeHorizon}-Year Savings</span>
                            <span>${parseInt(roiResults.totalSavings).toLocaleString()}</span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-white/10 flex justify-between font-medium">
                            <span>Net Benefit</span>
                            <span className="text-purple-500">${parseInt(roiResults.netBenefit).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium uppercase text-white/60 mb-3">Competitor Comparison</h5>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-24 text-xs text-white/70">Efficiency</div>
                            <div className="flex-1 flex items-center gap-2">
                              <div className="h-2 bg-white/5 rounded-full flex-1 overflow-hidden">
                                <div 
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${parseFloat(roiResults.competitorComparison.efficiency)}%` }}
                                ></div>
                              </div>
                              <div className="text-xs">{roiResults.competitorComparison.efficiency}%</div>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center">
                              <ArrowDown className="h-3 w-3 text-red-500" />
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-24 text-xs text-white/70">ROI</div>
                            <div className="flex-1 flex items-center gap-2">
                              <div className="h-2 bg-white/5 rounded-full flex-1 overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${Math.min(parseFloat(roiResults.competitorComparison.roi), 100)}%` }}
                                ></div>
                              </div>
                              <div className="text-xs">{roiResults.competitorComparison.roi}%</div>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center">
                              <ArrowDown className="h-3 w-3 text-red-500" />
                            </div>
                          </div>
                          
                          <div className="mt-2 pt-2 border-t border-white/10">
                            <div className="text-sm flex items-center justify-between">
                              <span className="text-white/70">Your Advantage</span>
                              <span className="font-medium text-green-500">
                                +{(parseFloat(roiResults.estimatedRoi) - parseFloat(roiResults.competitorComparison.roi)).toFixed(1)}% ROI
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sensitivity Analysis */}
                  <div className="bg-black/40 border border-white/5 rounded-xl p-5">
                    <h4 className="text-sm font-medium text-white/70 mb-4">Sensitivity Analysis</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {roiResults.sensitivityAnalysis.map((scenario, index) => (
                        <div 
                          key={index} 
                          className={`rounded-lg border p-4 ${
                            index === 0 ? 'bg-red-500/10 border-red-500/30' : 
                            index === 1 ? 'bg-blue-500/10 border-blue-500/30' : 
                            'bg-green-500/10 border-green-500/30'
                          }`}
                        >
                          <div className="text-sm mb-1">
                            {scenario.label} Estimate
                            {index === 0 && ' (-30%)'}
                            {index === 2 && ' (+30%)'}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-xl font-bold">
                              {scenario.efficiency.toFixed(1)}%
                            </div>
                            <div className="text-xs text-white/60">efficiency</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div 
                              className={`h-2 rounded-full flex-1 ${
                                index === 0 ? 'bg-red-500/50' : 
                                index === 1 ? 'bg-blue-500/50' : 
                                'bg-green-500/50'
                              }`}
                              style={{ width: `${Math.min(scenario.roi || 0, 100)}%` }}
                            ></div>
                            <div className="text-lg font-medium">
                              {scenario.roi !== null ? scenario.roi.toFixed(1) : '0.0'}%
                            </div>
                          </div>
                          <div className="text-xs text-white/60 mt-1">ROI over {roiInputs.timeHorizon} years</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between gap-4">
                    <Button
                      variant="outline"
                      className="w-1/2 py-2.5 bg-black/40 border-white/10 hover:bg-black/60"
                      onClick={generateRoiReport}
                      disabled={isGeneratingReport}
                    >
                      <div className="flex items-center gap-2">
                        {isGeneratingReport ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                        Download Report
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-1/2 py-2.5 bg-black/40 border-white/10 hover:bg-black/60"
                      onClick={() => printReport('roi')}
                      disabled={isPrinting}
                    >
                      <div className="flex items-center gap-2">
                        {isPrinting && selectedForPrint === 'roi' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                          </svg>
                        )}
                        Print Analysis
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Compare Industries Section - full width when visible */}
        {compareMode && (
          <div className="w-full mb-12">
            <Card className="w-full border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 mb-1">
                      <Scale className="h-5 w-5 text-red-400" />
                      Compare Industries
                    </CardTitle>
                    <CardDescription>
                      Select up to 3 industries to compare their features and benefits
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/5 border-white/10 hover:bg-white/10"
                      onClick={() => setComparedIndustries([])}
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                      Reset
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/5 border-white/10 hover:bg-white/10"
                      onClick={() => {
                        // Generate comparison report
                        setIsGeneratingReport(true);
                        
                        setTimeout(() => {
                          const comparedIndustriesData = comparedIndustries
                            .map(id => industries.find(i => i.id === id))
                            .filter(Boolean);
                            
                          const reportData = {
                            title: "Industry Comparison Report",
                            date: new Date().toLocaleDateString(),
                            industries: comparedIndustriesData,
                            comparisonDate: new Date().toISOString()
                          };
                          
                          // Convert to JSON string
                          const jsonString = JSON.stringify(reportData, null, 2)
                          const blob = new Blob([jsonString], { type: 'application/json' })
                          
                          // Create download link and trigger download
                          const url = URL.createObjectURL(blob)
                          const link = document.createElement('a')
                          link.href = url
                          link.download = `industry-comparison-report.json`
                          document.body.appendChild(link)
                          link.click()
                          document.body.removeChild(link)
                          
                          setIsGeneratingReport(false)
                        }, 1500);
                      }}
                      disabled={isGeneratingReport || comparedIndustries.length === 0}
                    >
                      {isGeneratingReport ? (
                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      ) : (
                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                      )}
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {comparedIndustries.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                      <Scale className="h-8 w-8 text-white/40" />
                    </div>
                    <h3 className="text-lg font-medium">No Industries Selected</h3>
                    <p className="text-white/60 max-w-md mx-auto">
                      Select industries from the grid above to compare their features, benefits, and metrics
                    </p>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="bg-white/5 border-white/10"
                        onClick={() => {
                          // Select the first 3 industries automatically for demo
                          setComparedIndustries(industries.slice(0, 3).map(i => i.id));
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Sample Industries
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    {/* Industry Selection Pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {comparedIndustries.map(id => {
                        const industry = industries.find(i => i.id === id);
                        if (!industry) return null;
                        
                        return (
                          <div
                            key={industry.id}
                            className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"
                          >
                            <div className={`p-1 rounded-full bg-gradient-to-br ${industry.color}`}>
                              {industry.icon}
                            </div>
                            <span className="text-sm font-medium">{industry.title}</span>
                            <button
                              className="ml-1 text-white/40 hover:text-white/80 transition-colors"
                              onClick={() => toggleIndustryComparison(industry.id)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}
                      
                      {comparedIndustries.length < 3 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 py-1.5 h-auto bg-white/5 border-white/10 hover:bg-white/10"
                          onClick={() => {
                            // Open selector for adding more industries
                            const remainingIndustries = industries.filter(i => !comparedIndustries.includes(i.id));
                            if (remainingIndustries.length > 0) {
                              // Add the first available industry that's not already selected
                              toggleIndustryComparison(remainingIndustries[0].id);
                            }
                          }}
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add Industry
                        </Button>
                      )}
                    </div>
                    
                    {/* Comparison Table */}
                    <div className="overflow-x-auto pb-4 -mx-6 px-6">
                      <table className="w-full min-w-[800px] border-collapse">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 text-white/60 font-medium sticky left-0 bg-black/40 min-w-[200px]">Features</th>
                            {comparedIndustries.map(id => {
                              const industry = industries.find(i => i.id === id);
                              if (!industry) return null;
                              
                              return (
                                <th key={industry.id} className="py-3 px-4 text-left">
                                  <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${industry.color}`}>
                                      {industry.icon}
                                    </div>
                                    <span>{industry.title}</span>
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Description Row */}
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 font-medium sticky left-0 bg-black/40">Description</td>
                            {comparedIndustries.map(id => {
                              const industry = industries.find(i => i.id === id);
                              if (!industry) return null;
                              
                              return (
                                <td key={industry.id} className="py-3 px-4 text-white/80">
                                  {industry.description}
                                </td>
                              );
                            })}
                          </tr>
                          
                          {/* ROI Row */}
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 font-medium sticky left-0 bg-black/40">ROI</td>
                            {comparedIndustries.map(id => {
                              const industry = industries.find(i => i.id === id);
                              if (!industry) return null;
                              
                              const roi = industry.stats.find(s => s.label === "ROI")?.value || "N/A";
                              
                              return (
                                <td key={industry.id} className="py-3 px-4">
                                  <div className="flex items-center">
                                    <span className="text-green-400 font-bold mr-2">{roi}</span>
                                    <Progress value={parseInt(roi)} max={400} className="h-2 w-24 bg-white/10">
                                      <div className="h-full bg-green-500 rounded-full"></div>
                                    </Progress>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          
                          {/* Implementation Time Row */}
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 font-medium sticky left-0 bg-black/40">Implementation Time</td>
                            {comparedIndustries.map(id => {
                              const industry = industries.find(i => i.id === id);
                              if (!industry) return null;
                              
                              const time = industry.stats.find(s => s.label === "Implementation")?.value || "N/A";
                              
                              return (
                                <td key={industry.id} className="py-3 px-4">
                                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                    {time}
                                  </Badge>
                                </td>
                              );
                            })}
                          </tr>
                          
                          {/* Technologies Row */}
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 font-medium sticky left-0 bg-black/40">Core Technologies</td>
                            {comparedIndustries.map(id => {
                              const industry = industries.find(i => i.id === id);
                              if (!industry) return null;
                              
                              return (
                                <td key={industry.id} className="py-3 px-4">
                                  <div className="flex flex-wrap gap-1">
                                    {industry.technologies.slice(0, 3).map((tech, i) => (
                                      <Badge key={i} variant="outline" className="bg-white/5 border-white/10 text-xs">
                                        {tech}
                                      </Badge>
                                    ))}
                                    {industry.technologies.length > 3 && (
                                      <Badge variant="outline" className="bg-white/5 border-white/10 text-xs">
                                        +{industry.technologies.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          
                          {/* Key Benefits Row */}
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 font-medium sticky left-0 bg-black/40">Key Benefits</td>
                            {comparedIndustries.map(id => {
                              const industry = industries.find(i => i.id === id);
                              if (!industry) return null;
                              
                              return (
                                <td key={industry.id} className="py-3 px-4">
                                  <ul className="space-y-1">
                                    {industry.benefits.slice(0, 2).map((benefit, i) => (
                                      <li key={i} className="flex items-start gap-1.5 text-sm">
                                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 shrink-0" />
                                        <span className="text-white/80">{benefit}</span>
                                      </li>
                                    ))}
                                    {industry.benefits.length > 2 && (
                                      <li className="text-xs text-white/60 pl-5">
                                        +{industry.benefits.length - 2} more benefits
                                      </li>
                                    )}
                                  </ul>
                                </td>
                              );
                            })}
                          </tr>
                          
                          {/* AI Solutions Row */}
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 font-medium sticky left-0 bg-black/40">AI Solutions</td>
                            {comparedIndustries.map(id => {
                              const industry = industries.find(i => i.id === id);
                              if (!industry) return null;
                              
                              return (
                                <td key={industry.id} className="py-3 px-4">
                                  {industry.aiSolutions ? (
                                    <ul className="space-y-1">
                                      {industry.aiSolutions.map((solution, i) => (
                                        <li key={i} className="flex items-start gap-1.5 text-sm">
                                          <Brain className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0" />
                                          <span className="text-white/80">{solution.title}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span className="text-white/40 text-sm">No specific AI solutions</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                          
                          {/* Blockchain Solutions Row */}
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 font-medium sticky left-0 bg-black/40">Blockchain Solutions</td>
                            {comparedIndustries.map(id => {
                              const industry = industries.find(i => i.id === id);
                              if (!industry) return null;
                              
                              return (
                                <td key={industry.id} className="py-3 px-4">
                                  {industry.blockchainSolutions ? (
                                    <ul className="space-y-1">
                                      {industry.blockchainSolutions.map((solution, i) => (
                                        <li key={i} className="flex items-start gap-1.5 text-sm">
                                          <Database className="h-3.5 w-3.5 text-purple-400 mt-0.5 shrink-0" />
                                          <span className="text-white/80">{solution.title}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span className="text-white/40 text-sm">No blockchain solutions</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Success Stories - full width with proper alignment */}
        <div className="w-full mt-20 mb-10">
          <div className="text-center mb-8 w-full">
            <Badge className="mb-3 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/5 px-3 py-1.5 text-sm">
              <Trophy className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
              SUCCESS STORIES
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              See How <span className="text-transparent bg-gradient-to-r from-red-400 to-red-500">Industry Leaders</span> Transform with AI
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {industries.slice(0, 3).map((industry) => (
              <Card3D key={industry.id} className="h-full w-full" intensity={0.2}>
                <div className="bg-gradient-to-br from-black/70 to-gray-900/40 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group h-full hover:border-red-500/30 transition-all duration-300 flex flex-col">
                  <div className="h-40 relative overflow-hidden flex-shrink-0">
                    <NextImage 
                      src={industry.image} 
                      alt={industry.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={300}
                      height={200}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                    
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 flex items-center">
                      <div className={`mr-2 p-1 rounded-full bg-gradient-to-br ${industry.color}`}>
                        {industry.icon}
                      </div>
                      <span className="text-sm font-medium">{industry.title}</span>
                    </div>
                    
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-white text-lg leading-tight">
                        {industry.caseStudy.client}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="space-y-3 flex-grow">
                      <div>
                        <p className="text-sm text-red-400 font-medium mb-1">Challenge</p>
                        <p className="text-sm text-white/80 line-clamp-3">{industry.caseStudy.challenge}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-red-400 font-medium mb-1">Results</p>
                        <p className="text-sm text-green-400 font-medium">
                          {typeof industry.caseStudy.results === 'string' 
                            ? industry.caseStudy.results
                            : industry.caseStudy.results.join(' • ')}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-red-500/30 group"
                    >
                      <span className="flex items-center gap-2">
                        View Full Case Study
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
        
        {/* Blockchain Use Cases - full width when present */}
        {activeIndustry.blockchainSolutions && activeIndustry.blockchainSolutions.length > 0 && (
          <div className="w-full mb-16">
            <div className="text-center mb-8 w-full">
              <Badge className="mb-3 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/5 px-3 py-1.5 text-sm">
                <Database className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
                BLOCKCHAIN USE CASES
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">Blockchain Applications</span> for {activeIndustry.title}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
              {activeIndustry.blockchainSolutions.map((solution, index) => (
                <Card3D key={index} className="h-full" intensity={0.3}>
                  <div className="h-full bg-gradient-to-br from-black/70 to-purple-900/10 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
                    <div className="p-5 flex flex-col h-full">
                      <div className="mb-4">
                        <div className="bg-purple-500/20 rounded-lg p-3 w-fit">
                          {solution.icon || <Database className="h-6 w-6 text-purple-400" />}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2">{solution.title}</h3>
                      <p className="text-sm text-white/70 mb-4">{solution.description}</p>
                      
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-white/50 mb-1">Maturity</p>
                            <Badge 
                              className={`
                                ${solution.maturityLevel === 'Emerging' && 'bg-blue-500/20 text-blue-400'} 
                                ${solution.maturityLevel === 'Growing' && 'bg-amber-500/20 text-amber-400'} 
                                ${solution.maturityLevel === 'Established' && 'bg-green-500/20 text-green-400'}
                              `}
                            >
                              {solution.maturityLevel}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 mb-1">Implementation</p>
                            <p className="text-white/80">{solution.implementationTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card3D>
              ))}
            </div>
            
            <div className="mt-10 mx-auto text-center">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => {
                  // Show a modal or navigate to a page with all blockchain solutions
                  alert('Explore all blockchain solutions for ' + activeIndustry.title);
                }}
              >
                <Database className="h-4 w-4 mr-2" />
                Explore All Blockchain Solutions
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
