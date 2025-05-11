"use client"

import { useState, useRef, useEffect, ReactNode, MouseEvent, useMemo } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
  BarChart,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Sparkles,
  Brain,
  Shield,
  Users,
  FileText,
  Database,
  Check,
  Network,
  Package,
  ShieldCheck,
  Minus,
  ArrowUp,
  ArrowDown,
  Plus,
  RefreshCw,
  Rocket,
  Loader2,
  TrendingUp,
  Scale,
  Calculator,
  Lock,
  Copy,
  AlertCircle,
  LayoutGrid,
  LayoutList,
  CheckCircle,
  Info,
  Trophy,
  X,
  Sliders,
  ChevronDown,
  Download
} from "lucide-react"
import Image from "next/legacy/image"
import "@/styles/industry-solutions.css"
import MindscapeBrainLogo from "@/components/mindscape-brain-logo"

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

// Add new advanced comparison interface around line 150 after other interfaces
interface ComparisonAnalysis {
  industries: string[];
  metricsData: {
    [industry: string]: {
      [metric: string]: number;
    }
  };
  keyDifferences: {
    [metric: string]: {
      bestPerformer: string;
      percentageDiff: number;
    }
  };
  commonFeatures: string[];
  uniqueFeatures: {
    [industry: string]: string[];
  };
  overallScore: {
    [industry: string]: number;
  };
  recommendedIndustry?: string;
  analysisTimestamp: string;
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
    color: "from-blue-600 via-blue-500 to-blue-700",
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
        icon: <BarChart className="h-6 w-6" />,
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
        icon: <BarChart className="h-6 w-6" />,
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
        icon: <MindscapeBrainLogo variant="icon-only" size="sm" />,
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
        icon: <BarChart className="h-6 w-6" />,
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
        icon: <MindscapeBrainLogo variant="icon-only" size="sm" />,
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
        icon: <BarChart className="h-6 w-6" />,
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
        icon: <MindscapeBrainLogo variant="icon-only" size="sm" />,
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
        icon: <BarChart className="h-6 w-6" />,
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
        icon: <MindscapeBrainLogo variant="icon-only" size="sm" />,
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
        icon: <MindscapeBrainLogo variant="icon-only" size="sm" />,
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

// Enhanced Industry Card with simplified design
function EnhancedIndustryCard({ 
  industry, 
  isActive = false, 
  onClick,
  compareMode = false,
  isCompared = false,
  onCompareToggle
}: { 
  industry: Industry; 
  isActive?: boolean;
  onClick?: () => void;
  compareMode?: boolean;
  isCompared?: boolean;
  onCompareToggle?: () => void;
}) {
  return (
    <div
      className="h-full w-full cursor-pointer transition-all duration-200"
      onClick={onClick}
    >
      <div
        className={`w-full h-full py-3 px-3 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-2 relative overflow-hidden border shadow-lg ${
          isActive
            ? "bg-gradient-to-br from-red-500/20 to-red-600/5 border-red-500/30 shadow-red-900/10"
            : "bg-black/50 border-white/10 hover:border-white/20 shadow-black/20"
        }`}
      >
        <div className={`p-2 rounded-lg bg-gradient-to-br ${industry.color} shadow-md`}>
          {industry.icon}
        </div>
        <h3 className="font-medium text-center text-sm">{industry.title}</h3>
        
        {isActive && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-red-500"></div>
        )}
        
        {compareMode && (
          <div 
            className="absolute top-2 right-2 z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onCompareToggle && onCompareToggle();
            }}
          >
            <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
              isCompared 
                ? 'bg-red-500 text-white shadow-md shadow-red-900/20' 
                : 'bg-white/10 text-white/70 border border-white/20'
            }`}>
              {isCompared ? (
                <Check className="h-3 w-3" />
              ) : (
                <Plus className="h-3 w-3" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Solution Card with simplified design
function EnhancedSolutionCard({
  title,
  description,
  icon,
  benefits,
  color = "from-blue-500 to-blue-700",
  onActionClick
}: {
  title: string;
  description: string;
  icon: ReactNode;
  benefits: string[];
  color?: string;
  onActionClick?: () => void;
}) {
  return (
    <div className="h-full">
      <div className="p-3 bg-black/50 border border-white/10 rounded-lg hover:border-blue-500/30 transition-all duration-200 h-full shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-3 mb-2">
            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${color} flex-shrink-0 shadow-md`}>
              {icon}
            </div>
            <div>
              <h3 className="font-medium mb-0.5 text-sm">{title}</h3>
              <p className="text-xs text-white/70">{description}</p>
            </div>
          </div>
          
          {benefits.length > 0 && (
            <div className="mt-2 space-y-1">
              <h4 className="text-[10px] font-medium text-white/50 uppercase tracking-wider">Benefits</h4>
              <ul className="space-y-1">
                {benefits.slice(0, 3).map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <div className="p-0.5 rounded-full bg-blue-500/20 text-blue-400 mt-0.5 shrink-0">
                      <Check className="h-2 w-2" />
                    </div>
                    <span className="text-xs text-white/80">{benefit}</span>
                  </li>
                ))}
                {benefits.length > 3 && (
                  <li className="text-[10px] text-white/50 pl-3.5">+ {benefits.length - 3} more</li>
                )}
              </ul>
            </div>
          )}
          
          {onActionClick && (
            <div className="mt-auto pt-2 text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-6 text-blue-400 hover:text-blue-300 hover:bg-transparent"
                onClick={onActionClick}
              >
                <span className="flex items-center gap-1 text-[10px]">
                  Learn more
                  <ArrowRight className="h-2.5 w-2.5" />
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EnhancedIndustrySolutions() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>(industries[0])
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobile, setIsMobile] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [comparedIndustries, setComparedIndustries] = useState<string[]>([])
  const [showRoiCalculator, setShowRoiCalculator] = useState(false)
  const [viewMode, setViewMode] = useState("card"); // or "list"
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [roiInputs, setRoiInputs] = useState({
    employees: 100,
    currentCost: 10000,
    efficiency: 30
  })
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [isScrollPaused, setIsScrollPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Create a consistent badge map for solutions to ensure they don't change on rerender
  const [solutionBadges, setSolutionBadges] = useState<{[key: string]: {type: string | null, index: number}}>({});
  
  // Initialize solution badges on first render or when solutions change
  useEffect(() => {
    if (activeIndustry.solutions && activeIndustry.solutions.length > 0) {
      const newBadges: {[key: string]: {type: string | null, index: number}} = {};
      activeIndustry.solutions.forEach((solution, index) => {
        const random = Math.random();
        let badgeType = null;
        if (random > 0.6) badgeType = "new";
        else if (random > 0.3) badgeType = "popular";
        newBadges[solution] = { type: badgeType, index };
      });
      setSolutionBadges(newBadges);
    }
  }, [activeIndustry.id, activeIndustry.solutions]);
  
  const [viewOptions, setViewOptions] = useState({
    solutions: "card", // or "list"
    ai: "card", // or "list"
    futureTrends: "card", // or "list"
  });
  
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

  // Calculate ROI based on inputs
  const calculateRoi = () => {
    const annualSavings = (roiInputs.currentCost * (roiInputs.efficiency / 100)) * 12
    const estimatedRoi = (annualSavings / 50000) * 100 // Assuming implementation cost of $50,000
    return {
      annualSavings: annualSavings.toFixed(0),
      estimatedRoi: estimatedRoi.toFixed(0),
      paybackPeriod: (50000 / annualSavings * 12).toFixed(1)
    }
  }

  // Handle ROI input changes
  const handleRoiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRoiInputs({
      ...roiInputs,
      [name]: parseInt(value, 10)
    })
  }

  const roiResults = calculateRoi()
  
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
  
  const activeTabData = {
    solutions: activeIndustry.solutions || [],
    ai: activeIndustry.aiSolutions || [],
    futureTrends: activeIndustry.futureTrends || [],
  };
  
  return (
    <div className="relative w-full">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px] animate-pulse-slow"></div>
      
      <div className="relative z-10">
        {/* Updated header with two-column layout for desktop and stacked for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10 items-center">
          {/* Left column: Title and description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-3 md:mb-4 inline-flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Badge 
                  variant="outline"
                  className="text-xs sm:text-sm font-medium bg-red-500/10 backdrop-blur-sm border-red-500/30 text-red-400 shadow-glow-sm shadow-red-500/20 px-3 py-1 sm:px-4 sm:py-1.5"
                >
                  INDUSTRY SOLUTIONS
                </Badge>
              </motion.div>
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
            >
              Tailored <span className="text-red-500">AI Solutions</span> for Your Industry
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xs sm:text-sm md:text-base text-white/70 max-w-md"
            >
              Explore industry-specific AI solutions designed to transform your business with cutting-edge technologies.
            </motion.p>
          </motion.div>

          {/* Right column: Compare and View Mode controls */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-2 sm:gap-3 justify-start md:justify-end mt-2 md:mt-0"
          >
            <Button 
              variant="outline" 
              className={`${compareMode ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'border-white/20 hover:border-red-500/40'} backdrop-blur-sm transition-all duration-300 hover:shadow-glow-sm hover:shadow-red-500/20 text-xs sm:text-sm p-2 sm:px-3 h-8 sm:h-9 md:h-10`}
              onClick={() => setCompareMode(!compareMode)}
            >
              <Sliders className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 mr-1 sm:mr-1.5 md:mr-2" />
              {compareMode ? "Exit Comparison" : "Compare Industries"}
            </Button>
            
            <div className="flex shadow-sm overflow-hidden rounded-md bg-black/40 backdrop-blur-md border border-white/10">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10 rounded-none ${viewMode === "card" ? 'bg-white/10 text-white' : 'text-white/50'}`}
                onClick={() => setViewMode("card")}
              >
                <LayoutGrid className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10 rounded-none ${viewMode === "list" ? 'bg-white/10 text-white' : 'text-white/50'}`}
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Industry selector - Mobile and Desktop versions - Improved for better mobile layout */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          {isMobile ? (
            <div className="relative">
              <Button 
                variant="outline" 
                className="w-full justify-between border-white/10 bg-black/20 backdrop-blur-sm text-left font-normal text-sm py-2 h-auto"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <div className="flex items-center">
                  <div className="mr-2 flex-shrink-0">
                    {activeIndustry.icon}
                  </div>
                  <span className="truncate">{activeIndustry.title}</span>
                </div>
                <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
              </Button>
              
              {showMobileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-50 mt-1 w-full bg-black/90 border border-white/10 rounded-md overflow-hidden max-h-60 overflow-y-auto scrollbar-hide"
                >
                  {industries.map((industry) => (
                    <div
                      key={industry.id}
                      className={`flex items-center p-2.5 cursor-pointer hover:bg-white/5 ${activeIndustry.id === industry.id ? 'bg-white/10' : ''}`}
                      onClick={() => {
                        handleIndustryChange(industry.id);
                        setShowMobileMenu(false);
                      }}
                    >
                      <div className="mr-2 flex-shrink-0">
                        {industry.icon}
                      </div>
                      <span className="text-sm">{industry.title}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <Tabs 
                defaultValue={activeIndustry.id} 
                value={activeIndustry.id} 
                onValueChange={handleIndustryChange}
                className="w-full"
              >
                <TabsList className="bg-black/20 border border-white/10 p-1 min-w-max">
                  {industries.map((industry) => (
                    <TabsTrigger 
                      key={industry.id} 
                      value={industry.id}
                      className="data-[state=active]:bg-white/10 whitespace-nowrap text-sm"
                    >
                      <div className="flex items-center gap-2">
                        {industry.icon}
                        <span>{industry.title}</span>
                        {compareMode && (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleIndustryComparison(industry.id);
                            }}
                            className={`ml-1 p-0.5 rounded-md ${comparedIndustries.includes(industry.id) ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/40 hover:text-white/60'}`}
                          >
                            {comparedIndustries.includes(industry.id) ? (
                              <CheckCircle className="h-3.5 w-3.5" />
                            ) : (
                              <Plus className="h-3.5 w-3.5" />
                            )}
                          </div>
                        )}
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}
        </div>

        {/* Industry content - enhanced with better mobile layout and more detailed information */}
        {compareMode ? (
          <div className="mb-6">
            {comparedIndustries.length > 0 ? (
              <div className="space-y-6">
                {/* Toggle switches */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <Button
                    variant="ghost" 
                    size="sm" 
                    className={`px-3 py-1.5 text-xs font-medium ${viewMode === "card" ? "bg-white/10 text-white" : "text-white/60"}`}
                    onClick={() => setViewMode("card")}
                  >
                    <LayoutGrid className="h-3.5 w-3.5 mr-1.5" />
                    <span>Card View</span>
                  </Button>
                  <Button
                    variant="ghost" 
                    size="sm" 
                    className={`px-3 py-1.5 text-xs font-medium ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/60"}`}
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="h-3.5 w-3.5 mr-1.5" />
                    <span>List View</span>
                  </Button>
                  
                  {/* Add advanced visualization toggle */}
                  <Button
                    variant="ghost" 
                    size="sm" 
                    className="px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/5 ml-auto"
                  >
                    <BarChart className="h-3.5 w-3.5 mr-1.5" />
                    <span>Advanced Analysis</span>
                  </Button>
                </div>

                {/* Industry cards - improved with better mobile layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {comparedIndustries.map(id => {
                    const industry = industries.find(i => i.id === id);
                    if (!industry) return null;
                    
                    return (
                      <div key={id} className="group relative overflow-hidden border border-white/10 bg-black/30 hover:bg-black/40 rounded-lg transition-all duration-300">
                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#000] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Top gradient effect matching industry color */}
                        <div className={`absolute top-0 left-0 right-0 h-1 ${industry.color.replace('-500', '-400').replace('-600', '-500').replace('-700', '-600')}`}></div>
                        
                        <div className="p-3 sm:p-4">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 relative">
                            <div className={`p-1.5 rounded-lg ${industry.color.replace('from-', '').replace('to-', '').split(' ')[0]}`}>
                              {industry.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm sm:text-base">{industry.title}</h4>
                              <p className="text-[10px] text-white/50">{industry.technologies.length} technologies · {industry.solutions?.length || 0} solutions</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 sm:space-y-3 relative">
                            <div>
                              <h5 className="text-xs font-medium text-white/70 mb-1 sm:mb-1.5">Top Benefits</h5>
                              <ul className="space-y-1 sm:space-y-1.5">
                                {industry.benefits.slice(0, 2).map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <div className="p-0.5 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                                      <Check className="h-2 w-2" />
                                    </div>
                                    <span className="text-xs text-white/80 line-clamp-1">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="pt-2 mt-2 border-t border-white/10">
                              <div className="flex items-center justify-between gap-3 sm:gap-4">
                                <div>
                                  <div className="text-[9px] sm:text-[10px] text-white/50 mb-0.5 sm:mb-1">ROI</div>
                                  <div className="text-xs sm:text-sm font-bold text-white">
                                    {industry.stats.find(s => s.label === "ROI")?.value || 'N/A'}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[9px] sm:text-[10px] text-white/50 mb-0.5 sm:mb-1">Implementation</div>
                                  <div className="text-xs sm:text-sm font-bold text-white">
                                    {industry.stats.find(s => s.label === "Implementation")?.value || 'N/A'}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full mt-1 text-[10px] h-6 sm:h-7 hover:bg-white/10 text-white/80 hover:text-white group/btn px-2 sm:px-3"
                              onClick={() => handleIndustryChange(id)}
                            >
                              <span>View Details</span>
                              <ArrowRight className="ml-1 w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Add the advanced comparison visualization component */}
                <div className="mt-8 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Detailed Industry Comparison</h3>
                    <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Advanced Analytics</Badge>
                  </div>
                  <AdvancedIndustryComparison 
                    selectedIndustries={comparedIndustries}
                    industryData={industries}
                  />
                </div>
              </div>
            ) : (
              <div className="relative border border-white/5 bg-black/30 rounded-lg p-4 sm:p-6 text-center">
                <div className="flex flex-col items-center justify-center py-6 sm:py-10 max-w-sm mx-auto">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/40 border border-white/10 mb-3 sm:mb-4 flex items-center justify-center">
                    <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-white/30" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium mb-2">Compare Industries</h3>
                  <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6">
                    Select at least two industries to compare their features, benefits, and performance metrics.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {industries.slice(0, 5).map(industry => (
                      <Button
                        key={industry.id}
                        variant="outline"
                        size="sm"
                        className={`border-white/10 bg-black/30 hover:border-${industry.color.split(' ')[0].replace('from-', '')}/50 text-xs h-8 sm:h-9`}
                        onClick={() => toggleIndustryComparison(industry.id)}
                      >
                        <div className="flex items-center gap-1.5">
                          {industry.icon}
                          <span className="text-xs">{industry.title}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Single industry view - Enhanced with more detailed content and better mobile layout
          <div className="mb-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Main industry info section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col space-y-4">
                  <div className="bg-black/30 rounded-lg border border-white/10 p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">About {activeIndustry.title}</h3>
                    <p className="text-sm text-white/70 mb-4">{activeIndustry.description}</p>
                    
                    <h4 className="text-sm font-medium text-white/80 mb-2 flex items-center">
                      <Check className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {activeIndustry.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="p-0.5 rounded-full bg-red-500/20 text-red-400 mt-0.5">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-sm text-white/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="bg-black/30 rounded-lg border border-white/10 p-4 sm:p-6 h-full">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-medium">Industry Metrics</h3>
                      <Badge variant="outline" className="bg-black/30 text-white/60 text-xs">
                        {activeIndustry.technologies.length} Technologies
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {activeIndustry.stats.map((stat, index) => (
                        <div key={index} className="bg-black/20 p-3 rounded-lg border border-white/5">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <div className="text-red-400">
                              {stat.icon}
                            </div>
                            <div className="text-xs text-white/50">{stat.label}</div>
                          </div>
                          <div className="font-bold text-lg">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white/80 flex items-center">
                        <Zap className="h-3.5 w-3.5 text-yellow-500 mr-1.5" />
                        Core Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeIndustry.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="bg-black/20 text-white/70 text-xs border-white/10">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Solutions Section - Enhanced with details */}
              {activeIndustry.aiSolutions && activeIndustry.aiSolutions.length > 0 && (
                <div className="bg-black/30 rounded-lg border border-white/10 p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-medium flex items-center">
                      <Brain className="h-4 w-4 text-purple-500 mr-1.5 sm:mr-2" />
                      <span>AI Solutions for {activeIndustry.title}</span>
                    </h3>
                    <Button variant="outline" size="sm" className="h-7 sm:h-8 text-xs border-white/10 text-white/70">
                      View All
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {activeIndustry.aiSolutions.map((solution, idx) => (
                      <div key={idx} className="bg-black/20 rounded-lg border border-white/5 p-3 sm:p-4">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10 text-purple-400 flex-shrink-0">
                            {solution.icon}
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-medium mb-0.5 sm:mb-1">{solution.title}</h4>
                            <p className="text-xs text-white/60 line-clamp-2">{solution.description}</p>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t border-white/5 mt-2">
                          <div className="grid grid-cols-3 gap-1 text-center text-xs">
                            <div>
                              <div className="text-[10px] text-white/50 mb-0.5">Accuracy</div>
                              <div className="font-medium text-green-400">{solution.performance.accuracy}%</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-white/50 mb-0.5">Latency</div>
                              <div className="font-medium text-white/80">{solution.performance.latency}ms</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-white/50 mb-0.5">Scale</div>
                              <div className="font-medium text-blue-400">{solution.performance.scalability}+</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Case Study Section */}
              <div className="bg-black/30 rounded-lg border border-white/10 overflow-hidden">
                <div className="md:flex">
                  <div className="p-4 sm:p-6 md:w-1/2">
                    <Badge className="mb-2 bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">CASE STUDY</Badge>
                    <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">Success Story: {activeIndustry.caseStudy.client}</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-white/90 mb-1">Challenge</h4>
                        <p className="text-sm text-white/70">{activeIndustry.caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white/90 mb-1">Solution</h4>
                        <p className="text-sm text-white/70">{activeIndustry.caseStudy.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white/90 mb-1">Results</h4>
                        <p className="text-sm text-white/70">{activeIndustry.caseStudy.results}</p>
                      </div>
                    </div>
                    
                    {activeIndustry.caseStudy.testimonial && (
                      <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                            {activeIndustry.caseStudy.testimonial.imageUrl ? (
                              <Image 
                                src={activeIndustry.caseStudy.testimonial.imageUrl} 
                                alt={activeIndustry.caseStudy.testimonial.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <Users className="h-5 w-5 text-white/70" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{activeIndustry.caseStudy.testimonial.name}</div>
                            <div className="text-xs text-white/60">
                              {activeIndustry.caseStudy.testimonial.role}, {activeIndustry.caseStudy.testimonial.company}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs italic text-white/80">"{activeIndustry.caseStudy.testimonial.quote}"</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:w-1/2 bg-black/10 relative h-48 sm:h-64 md:h-auto">
                    {activeIndustry.image && (
                      <div className="absolute inset-0">
                        <Image
                          src={activeIndustry.image}
                          alt={activeIndustry.title}
                          layout="fill"
                          objectFit="cover"
                          className="opacity-60 mix-blend-luminosity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Additional Solutions & Reports Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeIndustry.solutions && activeIndustry.solutions.length > 0 && (
                  <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                    <h3 className="text-base font-medium mb-3 flex items-center">
                      <Package className="h-3.5 w-3.5 text-cyan-500 mr-1.5" />
                      Available Solutions
                    </h3>
                    
                    <ul className="space-y-2">
                      {activeIndustry.solutions.slice(0, 5).map((solution, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></div>
                            <span className="text-sm text-white/80">{solution}</span>
                          </div>
                          {solutionBadges[solution]?.type && (
                            <Badge className={`text-[10px] ${
                              solutionBadges[solution].type === 'new' 
                                ? 'bg-green-500/10 text-green-400' 
                                : 'bg-yellow-500/10 text-yellow-400'
                            }`}>
                              {solutionBadges[solution].type}
                            </Badge>
                          )}
                        </li>
                      ))}
                      {activeIndustry.solutions.length > 5 && (
                        <li className="text-xs text-white/50 pl-3.5">+ {activeIndustry.solutions.length - 5} more</li>
                      )}
                    </ul>
                  </div>
                )}
                
                <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                  <h3 className="text-base font-medium mb-3 flex items-center">
                    <FileText className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                    Industry Reports
                  </h3>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={generateIndustryReport}
                      disabled={isGeneratingReport}
                      className="w-full justify-between bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm h-9"
                    >
                      <div className="flex items-center">
                        <FileText className="h-3.5 w-3.5 mr-1.5 text-red-400" />
                        {activeIndustry.title} Industry Report
                      </div>
                      {isGeneratingReport ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Download className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    
                    <Button 
                      onClick={() => setShowRoiCalculator(true)}
                      className="w-full justify-between bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm h-9"
                    >
                      <div className="flex items-center">
                        <Calculator className="h-3.5 w-3.5 mr-1.5 text-green-400" />
                        Calculate ROI
                      </div>
                      <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
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
  );
}

// Add new advanced data visualization component after the Card3D component (around line 1295)
function AdvancedIndustryComparison({ 
  selectedIndustries,
  industryData
}: { 
  selectedIndustries: string[]
  industryData: Industry[]
}) {
  // Generate comparison data
  const comparisonData = useMemo(() => {
    if (selectedIndustries.length < 2) return null;
    
    const selectedData = industryData.filter(ind => selectedIndustries.includes(ind.id));
    
    // Create metrics data map
    const metricsData: {[industry: string]: {[metric: string]: number}} = {};
    const allMetrics = new Set<string>();
    
    selectedData.forEach(industry => {
      metricsData[industry.id] = {};
      
      // Add ROI as a metric
      const roiStat = industry.stats.find(s => s.label === "ROI");
      if (roiStat) {
        const roiValue = parseInt(roiStat.value.replace('%', ''));
        metricsData[industry.id]["ROI"] = roiValue;
        allMetrics.add("ROI");
      }
      
      // Add efficiency from metrics if available
      if (industry.metrics?.efficiency) {
        const efficiencyMatch = industry.metrics.efficiency.match(/(\d+)%/);
        if (efficiencyMatch) {
          metricsData[industry.id]["Efficiency"] = parseInt(efficiencyMatch[1]);
          allMetrics.add("Efficiency");
        }
      }
      
      // Add accuracy from metrics if available
      if (industry.metrics?.accuracy) {
        const accuracyMatch = industry.metrics.accuracy.match(/(\d+\.?\d*)%/);
        if (accuracyMatch) {
          metricsData[industry.id]["Accuracy"] = parseFloat(accuracyMatch[1]);
          allMetrics.add("Accuracy");
        }
      }
      
      // Generate time savings metric from implementation stats
      const implStat = industry.stats.find(s => s.label === "Implementation");
      if (implStat) {
        const weeks = parseInt(implStat.value.match(/(\d+)/)?.[1] || "8");
        metricsData[industry.id]["Implementation Time"] = weeks;
        allMetrics.add("Implementation Time");
      }
      
      // Add additional metrics based on benefits
      if (industry.benefits.length > 0) {
        industry.benefits.forEach(benefit => {
          const matchResult = benefit.match(/(\d+)%/);
          if (matchResult) {
            const metricName = benefit.split(' by ')[0].trim();
            metricsData[industry.id][metricName] = parseInt(matchResult[1]);
            allMetrics.add(metricName);
          }
        });
      }
    });
    
    // Calculate key differences
    const keyDifferences: {
      [metric: string]: {
        bestPerformer: string;
        percentageDiff: number;
      }
    } = {};
    
    // Only process metrics that are available for all industries
    const commonMetrics = Array.from(allMetrics).filter(metric => 
      selectedData.every(industry => metricsData[industry.id][metric] !== undefined)
    );
    
    commonMetrics.forEach(metric => {
      let bestValue = -Infinity;
      let bestIndustry = "";
      let worstValue = Infinity;
      
      // Find best and worst performers
      selectedData.forEach(industry => {
        const value = metricsData[industry.id][metric];
        
        // For implementation time, lower is better
        if (metric === "Implementation Time") {
          if (value < worstValue) {
            worstValue = value;
            bestIndustry = industry.id;
          }
        } else {
          if (value > bestValue) {
            bestValue = value;
            bestIndustry = industry.id;
          }
        }
      });
      
      // Calculate percentage difference between best and second best
      let secondBest = metric === "Implementation Time" ? Infinity : -Infinity;
      selectedData.forEach(industry => {
        if (industry.id !== bestIndustry) {
          const value = metricsData[industry.id][metric];
          if (metric === "Implementation Time") {
            if (value < secondBest) {
              secondBest = value;
            }
          } else {
            if (value > secondBest) {
              secondBest = value;
            }
          }
        }
      });
      
      // Calculate percentage difference 
      if (metric === "Implementation Time") {
        if (secondBest !== Infinity && worstValue !== 0) {
          const diff = ((secondBest - worstValue) / secondBest) * 100;
          keyDifferences[metric] = {
            bestPerformer: bestIndustry,
            percentageDiff: diff
          };
        }
      } else {
        if (secondBest !== -Infinity && secondBest !== 0) {
          const diff = ((bestValue - secondBest) / secondBest) * 100;
          keyDifferences[metric] = {
            bestPerformer: bestIndustry,
            percentageDiff: diff
          };
        }
      }
    });
    
    // Find common and unique features
    const allFeatures = new Set<string>();
    const featureCount: {[feature: string]: number} = {};
    
    selectedData.forEach(industry => {
      // Combine solutions and technologies for features comparison
      const features = [...(industry.solutions || []), ...industry.technologies];
      
      features.forEach(feature => {
        allFeatures.add(feature);
        featureCount[feature] = (featureCount[feature] || 0) + 1;
      });
    });
    
    const commonFeatures = Array.from(allFeatures).filter(
      feature => featureCount[feature] === selectedData.length
    );
    
    const uniqueFeatures: {[industry: string]: string[]} = {};
    selectedData.forEach(industry => {
      const features = [...(industry.solutions || []), ...industry.technologies];
      uniqueFeatures[industry.id] = features.filter(
        feature => featureCount[feature] === 1
      );
    });
    
    // Calculate overall score (simple weighted average)
    const overallScore: {[industry: string]: number} = {};
    selectedData.forEach(industry => {
      let scoreTotal = 0;
      let scoreCount = 0;
      
      // ROI weight: 0.3
      if (metricsData[industry.id]["ROI"]) {
        scoreTotal += (metricsData[industry.id]["ROI"] / 300) * 100 * 0.3;
        scoreCount += 0.3;
      }
      
      // Efficiency weight: 0.25
      if (metricsData[industry.id]["Efficiency"]) {
        scoreTotal += (metricsData[industry.id]["Efficiency"] / 100) * 100 * 0.25;
        scoreCount += 0.25;
      }
      
      // Accuracy weight: 0.2
      if (metricsData[industry.id]["Accuracy"]) {
        scoreTotal += (metricsData[industry.id]["Accuracy"] / 100) * 100 * 0.2;
        scoreCount += 0.2;
      }
      
      // Implementation time (inverse) weight: 0.15
      if (metricsData[industry.id]["Implementation Time"]) {
        // Lower is better, so invert the scale (12 weeks as max)
        const implScore = (1 - (metricsData[industry.id]["Implementation Time"] / 12)) * 100;
        scoreTotal += implScore * 0.15;
        scoreCount += 0.15;
      }
      
      // Features count weight: 0.1
      const featuresScore = ((industry.solutions?.length || 0) / 10) * 100;
      scoreTotal += featuresScore * 0.1;
      scoreCount += 0.1;
      
      overallScore[industry.id] = scoreCount > 0 ? Math.round(scoreTotal / scoreCount) : 50;
    });
    
    // Determine recommended industry
    let recommendedIndustry: string | undefined = undefined;
    let highestScore = -1;
    
    Object.entries(overallScore).forEach(([industry, score]) => {
      if (score > highestScore) {
        highestScore = score;
        recommendedIndustry = industry;
      }
    });
    
    return {
      industries: selectedIndustries,
      metricsData,
      keyDifferences,
      commonFeatures,
      uniqueFeatures,
      overallScore,
      recommendedIndustry,
      analysisTimestamp: new Date().toISOString()
    };
  }, [selectedIndustries, industryData]);
  
  if (!comparisonData || selectedIndustries.length < 2) {
    return (
      <div className="text-center p-4">
        <p className="text-white/60">Select at least two industries to compare</p>
      </div>
    );
  }
  
  // Get industry titles
  const getIndustryTitle = (id: string) => {
    return industryData.find(ind => ind.id === id)?.title || id;
  };
  
  // Get industry color
  const getIndustryColor = (id: string) => {
    const industry = industryData.find(ind => ind.id === id);
    if (!industry) return "bg-gray-500";
    
    return industry.color.replace("from-", "bg-").split(" ")[0];
  };
  
  return (
    <div className="space-y-6">
      {/* Overall Score Comparison */}
      <div className="bg-black/30 rounded-lg border border-white/10 p-4">
        <h3 className="text-base font-medium mb-4">Industry Solution Scores</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedIndustries.map(industryId => {
            const score = comparisonData.overallScore[industryId] || 0;
            const isRecommended = industryId === comparisonData.recommendedIndustry;
            
            return (
              <div 
                key={industryId}
                className={`relative p-4 rounded-lg border ${isRecommended ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 bg-black/20'}`}
              >
                {isRecommended && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    Recommended
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${getIndustryColor(industryId)}`}>
                    {industryData.find(ind => ind.id === industryId)?.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{getIndustryTitle(industryId)}</h4>
                    <p className="text-xs text-white/60">Industry solution</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Overall Score</span>
                    <span className="font-medium">{score}/100</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getIndustryColor(industryId).replace('bg-', 'bg-')}`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(comparisonData.metricsData[industryId] || {}).slice(0, 4).map(([metric, value]) => (
                    <div key={metric} className="bg-black/20 p-2 rounded">
                      <div className="text-white/50 text-[10px] mb-0.5">{metric}</div>
                      <div className="font-medium">
                        {metric === "Implementation Time" ? `${value} weeks` : `${value}%`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Key Differences */}
      {Object.keys(comparisonData.keyDifferences).length > 0 && (
        <div className="bg-black/30 rounded-lg border border-white/10 p-4">
          <h3 className="text-base font-medium mb-4">Key Differences</h3>
          
          <div className="space-y-3">
            {Object.entries(comparisonData.keyDifferences).map(([metric, { bestPerformer, percentageDiff }]) => (
              <div key={metric} className="bg-black/20 p-3 rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">{metric}</h4>
                  <Badge className={`${getIndustryColor(bestPerformer).replace('bg-', 'bg-')}/20 text-white/90 border-white/10`}>
                    {Math.abs(percentageDiff).toFixed(0)}% {percentageDiff >= 0 ? 'better' : 'worse'}
                  </Badge>
                </div>
                
                <div className="flex items-center">
                  <div className={`p-1.5 rounded-md ${getIndustryColor(bestPerformer)} mr-2`}>
                    {industryData.find(ind => ind.id === bestPerformer)?.icon}
                  </div>
                  <div className="text-sm">
                    <span className="text-white/80">{getIndustryTitle(bestPerformer)}</span>
                    <span className="text-white/50 text-xs ml-2">leads in this metric</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Common Features */}
      {comparisonData.commonFeatures.length > 0 && (
        <div className="bg-black/30 rounded-lg border border-white/10 p-4">
          <h3 className="text-base font-medium mb-3">Common Features</h3>
          
          <div className="flex flex-wrap gap-2">
            {comparisonData.commonFeatures.map((feature, idx) => (
              <Badge key={idx} className="bg-white/10 text-white/80 border-white/20">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {/* Unique Features */}
      <div className="bg-black/30 rounded-lg border border-white/10 p-4">
        <h3 className="text-base font-medium mb-3">Unique Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {selectedIndustries.map(industryId => {
            const uniqueFeats = comparisonData.uniqueFeatures[industryId] || [];
            
            return (
              <div key={industryId} className="bg-black/20 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1 rounded-md ${getIndustryColor(industryId)}`}>
                    {industryData.find(ind => ind.id === industryId)?.icon}
                  </div>
                  <h4 className="text-sm font-medium">{getIndustryTitle(industryId)}</h4>
                </div>
                
                {uniqueFeats.length > 0 ? (
                  <div className="space-y-1">
                    {uniqueFeats.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <div className="p-0.5 rounded-full bg-green-500/20 text-green-400 mt-0.5">
                          <Check className="h-2 w-2" />
                        </div>
                        <span className="text-xs text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-white/50 italic">No unique features</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
