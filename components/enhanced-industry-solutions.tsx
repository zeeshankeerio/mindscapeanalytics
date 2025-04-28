"use client"

import { useState, useRef, useEffect, ReactNode, MouseEvent } from "react"
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
  Trophy
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

// Enhanced Industry Card with modern design
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
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full w-full"
    >
      <Card3D
        className={`cursor-pointer h-full w-full ${isActive ? 'ring-1 ring-red-500/50' : ''}`}
        onClick={onClick}
        intensity={0.3}
      >
        <div
          className={`w-full h-full py-2 px-2 rounded-lg transition-all duration-300 flex flex-col items-center justify-center gap-1.5 group relative overflow-hidden border ${
            isActive
              ? "bg-gradient-to-r from-red-600/20 to-red-500/5 border-red-500/40"
              : "bg-black/50 backdrop-blur-md border-white/10 hover:bg-black/60 hover:border-white/20"
          }`}
        >
          {/* Modern shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
            <div className="absolute inset-[-100%] w-[400%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
          </div>
          
          <div className={`p-1.5 rounded-lg bg-gradient-to-br ${industry.color} transition-transform duration-300 group-hover:scale-110`}>
            {industry.icon}
          </div>
          <h3 className="font-medium text-center text-xs">{industry.title}</h3>
          
          {isActive && (
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400"></div>
          )}
          
          {compareMode && (
            <div 
              className="absolute top-1 right-1 z-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle && onCompareToggle();
              }}
            >
              <div className={`h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                isCompared 
                  ? 'bg-red-500 text-white' 
                  : 'bg-black/60 text-white/70 border border-white/20'
              }`}>
                {isCompared ? (
                  <Check className="h-2 w-2" />
                ) : (
                  <Plus className="h-2 w-2" />
                )}
              </div>
            </div>
          )}
        </div>
      </Card3D>
    </motion.div>
  );
}

// Enhanced Solution Card with modern design
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
    <Card3D className="h-full" intensity={0.2}>
      <div className="p-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-blue-500/30 transition-all duration-300 h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-3 mb-2">
            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${color} flex-shrink-0`}>
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
    </Card3D>
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
    <div className="w-full px-4 md:px-6 py-10 md:py-16 relative">
      {/* Compact Hero section with standard text sizes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12 w-full mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
        >
          <div className="text-left space-y-3">
            <Badge className="inline-flex items-center bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-red-400" />
              INDUSTRY SOLUTIONS
            </Badge>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Transform Your Industry with Advanced AI
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Discover tailored AI solutions designed for your industry's unique challenges.
            </motion.p>
          </div>
          
          {/* Compact Action Buttons */}
          <motion.div 
            className="flex flex-wrap gap-3 justify-start md:justify-end items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button 
              variant="outline" 
              onClick={() => setCompareMode(!compareMode)}
              className={`${compareMode ? 
                'bg-gradient-to-r from-red-500/20 to-red-600/10 border-red-500/40 text-white' : 
                'bg-black/40 border-white/10'}`}
              size="sm"
            >
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Compare Industries
                {compareMode && (
                  <div className="relative h-2 w-2">
                    <div className="absolute inset-0 bg-red-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setShowRoiCalculator(!showRoiCalculator);
              }}
              className={`${showRoiCalculator ? 
                'bg-gradient-to-r from-blue-500/20 to-blue-600/10 border-blue-500/40 text-white' : 
                'bg-black/40 border-white/10'}`}
              size="sm"
            >
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                ROI Calculator
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="bg-black/40 border-white/10 hover:border-purple-500/40 hover:bg-purple-500/5"
              onClick={generateIndustryReport}
              disabled={isGeneratingReport}
              size="sm"
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
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Compact Industry selector - horizontal scrolling tabs on mobile, compact grid on desktop */}
      <div className="w-full mx-auto mb-10">
        {/* Mobile scrolling tabs */}
        <div className="md:hidden overflow-x-auto hide-scrollbar pb-2">
          <div className="flex space-x-2 min-w-max px-1">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => handleIndustryChange(industry.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                  activeIndustry.id === industry.id
                    ? 'bg-gradient-to-r from-red-600/20 to-red-500/5 border border-red-500/40 text-white'
                    : 'bg-black/40 border border-white/10 text-white/70 hover:text-white hover:bg-black/60'
                }`}
              >
                <div className={`p-1 rounded-md bg-gradient-to-br ${industry.color}`}>
                  {industry.icon}
                </div>
                {industry.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Desktop compact grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-2 w-full mx-auto">
          {industries.map((industry, index) => (
            <EnhancedIndustryCard
              key={industry.id}
              industry={industry}
              isActive={activeIndustry.id === industry.id}
                onClick={() => handleIndustryChange(industry.id)}
              compareMode={compareMode}
              isCompared={comparedIndustries.includes(industry.id)}
              onCompareToggle={() => toggleIndustryComparison(industry.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Solutions Grid - Compact and Efficient Layout */}
      <div className="w-full mx-auto mb-10">
        {/* Solutions Header - Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 items-center">
          <div className="space-y-1.5">
            <Badge variant="outline" className="inline-flex items-center mb-1 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/5 px-2 py-0.5 text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1 text-green-400" />
              {activeIndustry.title.toUpperCase()} SOLUTIONS
            </Badge>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              Tailored for Your Industry
            </h3>
            <p className="text-xs md:text-sm text-white/70">
              Our comprehensive suite of solutions designed specifically for {activeIndustry.title} industry challenges.
            </p>
          </div>
          
          <div className="flex justify-start md:justify-end items-start">
            <Button variant="outline" size="sm" className="text-xs border-white/20 hover:border-green-500/40 h-8 px-3">
              View Case Studies
              <ArrowRight className="ml-1.5 h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Solution Cards - Single Row Layout with Auto-Scroll */}
        <div 
          className="relative overflow-hidden pb-2 w-full" 
          style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
          onMouseEnter={() => setIsScrollPaused(true)}
          onMouseLeave={() => setIsScrollPaused(false)}
        >
          <motion.div 
            className="flex gap-2 w-full"
            initial={{ x: 0 }}
            animate={{ x: isScrollPaused ? undefined : `-${(activeIndustry.solutions?.length || 0) * 132}px` }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
              repeatDelay: 0
            }}
          >
            {/* Solution Cards */}
          {(activeIndustry.solutions || []).map((solution, index) => (
            <motion.div
                key={`card-${solution}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group w-[260px] shrink-0"
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-full rounded-lg border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden hover:border-green-500/30 hover:bg-black/50 transition-all duration-300 relative">
                  {/* Animated gradient border on hover */}
                  <div className="absolute inset-0 p-[1px] rounded-lg bg-gradient-to-r from-transparent via-green-500/30 to-transparent opacity-0 group-hover:opacity-100 blur-[0.5px] -z-10"></div>
                  
                  {/* Top highlight accent */}
                  <div className="absolute h-0.5 w-0 top-0 left-0 bg-gradient-to-r from-green-500 to-green-300 opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-700"></div>
                  
                  <div className="p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium mr-2 line-clamp-1">{solution}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] px-1 py-0 h-3.5 bg-black/40 ${index % 2 === 0 ? 'text-green-400 border-green-500/30' : 'text-blue-400 border-blue-500/30'}`}
                        >
                          {index % 2 === 0 ? 'New' : 'Popular'}
                        </Badge>
                  </div>
                  
                      <p className="text-xs text-white/60 mb-2 line-clamp-2 group-hover:text-white/80 transition-colors">
                      {index % 2 === 0
                        ? `Optimize your ${activeIndustry.title.toLowerCase()} operations with our advanced ${solution.toLowerCase()} solution.`
                        : `Industry-leading ${solution.toLowerCase()} capabilities designed for modern ${activeIndustry.title.toLowerCase()} needs.`
                      }
                    </p>
                    
                      <div className="flex flex-wrap items-center gap-1 text-[10px] text-white/50">
                        <div className="flex items-center p-0.5 px-1.5 rounded-full bg-white/5 border border-white/10">
                          <Clock className="h-2.5 w-2.5 mr-0.5 text-white/40" />
                          <span>4-6 wks</span>
                      </div>
                        <div className="flex items-center p-0.5 px-1.5 rounded-full bg-white/5 border border-white/10">
                          <TrendingUp className="h-2.5 w-2.5 mr-0.5 text-white/40" />
                        <span>High ROI</span>
                      </div>
                        <div className="flex items-center p-0.5 px-1.5 rounded-full bg-white/5 border border-white/10">
                          <Trophy className="h-2.5 w-2.5 mr-0.5 text-white/40" />
                          <span>Top</span>
                    </div>
                  </div>
                      
                      <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                        <div className="flex -space-x-1.5">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 ring-2 ring-black flex items-center justify-center text-[8px] font-medium"
                            >
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                          <div className="w-4 h-4 rounded-full bg-white/10 ring-2 ring-black flex items-center justify-center text-[8px] font-medium">
                            +{5 + index}
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="rounded-full p-0 w-5 h-5 flex items-center justify-center"
                        >
                          <ArrowRight className="h-2.5 w-2.5 text-green-400 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
            
            {/* View all button as a card */}
            <div className="w-[120px] shrink-0 h-full">
              <div 
                className="h-full w-full rounded-lg border border-white/10 bg-black/30 backdrop-blur-md hover:bg-black/50 hover:border-white/20 transition-all duration-300 flex flex-col items-center justify-center p-3 cursor-pointer"
                onClick={() => {
                  // Show a modal or navigate to a page with all solutions
                  alert('View all solutions for ' + activeIndustry.title);
                }}
              >
                <div className="rounded-full w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                  <ArrowRight className="h-3.5 w-3.5 text-white/70" />
                </div>
                <span className="text-xs text-white/70">View All</span>
                <span className="text-[10px] text-white/40 mt-0.5">Solutions</span>
              </div>
        </div>
        
            {/* Duplicate cards for looping effect */}
            {(activeIndustry.solutions || []).map((solution, index) => (
              <motion.div
                key={`duplicate-${solution}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group w-[260px] shrink-0"
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-full rounded-lg border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden hover:border-green-500/30 hover:bg-black/50 transition-all duration-300 relative">
                  {/* Same card structure as above */}
                  <div className="p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium mr-2 line-clamp-1">{solution}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] px-1 py-0 h-3.5 bg-black/40 ${index % 2 === 0 ? 'text-green-400 border-green-500/30' : 'text-blue-400 border-blue-500/30'}`}
                        >
                          {index % 2 === 0 ? 'New' : 'Popular'}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-white/60 mb-2 line-clamp-2 group-hover:text-white/80 transition-colors">
                        {index % 2 === 0
                          ? `Optimize your ${activeIndustry.title.toLowerCase()} operations with our advanced ${solution.toLowerCase()} solution.`
                          : `Industry-leading ${solution.toLowerCase()} capabilities designed for modern ${activeIndustry.title.toLowerCase()} needs.`
                        }
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-1 text-[10px] text-white/50">
                        <div className="flex items-center p-0.5 px-1.5 rounded-full bg-white/5 border border-white/10">
                          <Clock className="h-2.5 w-2.5 mr-0.5 text-white/40" />
                          <span>4-6 wks</span>
                        </div>
                        <div className="flex items-center p-0.5 px-1.5 rounded-full bg-white/5 border border-white/10">
                          <TrendingUp className="h-2.5 w-2.5 mr-0.5 text-white/40" />
                          <span>High ROI</span>
                        </div>
                        <div className="flex items-center p-0.5 px-1.5 rounded-full bg-white/5 border border-white/10">
                          <Trophy className="h-2.5 w-2.5 mr-0.5 text-white/40" />
                          <span>Top</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                        <div className="flex -space-x-1.5">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 ring-2 ring-black flex items-center justify-center text-[8px] font-medium"
                            >
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                          <div className="w-4 h-4 rounded-full bg-white/10 ring-2 ring-black flex items-center justify-center text-[8px] font-medium">
                            +{5 + index}
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="rounded-full p-0 w-5 h-5 flex items-center justify-center"
                        >
                          <ArrowRight className="h-2.5 w-2.5 text-green-400 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Gradient overlays for fading effect */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
        
        {/* We'll add a simple margin below our scrollable area */}
        <div className="h-4"></div>
      </div>
      
      {/* Industry content grid - full width with responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mb-8">
        {/* Left column - Industry overview */}
        <div className="space-y-5 w-full">
          <Card className="w-full border border-white/10 bg-black/30 backdrop-blur-sm h-auto">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className={`p-1.5 rounded-lg ${activeIndustry.color.replace('from-', '').replace('to-', '').split(' ')[0]}`}>
                  {activeIndustry.icon}
                </div>
                <span className="text-white">{activeIndustry.title}</span>
              </CardTitle>
              <CardDescription className="text-sm">
                {activeIndustry.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pt-0">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1.5 text-sm">Key Benefits</h4>
                  <ul className="space-y-1.5">
                    {activeIndustry.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="p-0.5 rounded-full bg-green-500/20 text-green-400 mt-0.5 shrink-0">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <span className="text-xs">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1.5 text-sm">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeIndustry.stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                        <div className="p-1.5 rounded-lg bg-white/10 text-white">
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-xs text-white/70">{stat.label}</p>
                          <p className="text-sm font-bold">{stat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card3D className="w-full" intensity={0.3}>
            <div className="bg-gradient-to-br from-black/80 to-black/60 rounded-xl p-4 backdrop-blur-xl border border-white/10 h-full flex flex-col relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-red-500/20 to-red-500/0 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${activeIndustry.color.replace('from-', '').replace('to-', '').split(' ')[0]}`}>
                  {activeIndustry.icon}
                </div>
                <span>Case Study: {activeIndustry.caseStudy.client}</span>
              </h3>
              <div className="space-y-3 flex-grow">
                <div>
                  <h4 className="text-xs font-medium text-white/70 mb-0.5">Challenge</h4>
                  <p className="text-xs">{activeIndustry.caseStudy.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-white/70 mb-0.5">Solution</h4>
                  <p className="text-xs">{activeIndustry.caseStudy.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-white/70 mb-0.5">Results</h4>
                  <p className="text-xs text-green-400 font-medium">
                    {typeof activeIndustry.caseStudy.results === 'string' 
                      ? activeIndustry.caseStudy.results
                      : activeIndustry.caseStudy.results.join(' • ')}
                  </p>
                </div>
              </div>
              {activeIndustry.caseStudy.testimonial && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold">
                      {activeIndustry.caseStudy.testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs italic text-white/80 mb-1">"{activeIndustry.caseStudy.testimonial.quote}"</p>
                      <p className="text-[10px] text-white/60">
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
        <div className="space-y-5 w-full">
          <Card className="w-full border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden h-auto">
            <div className="relative h-48">
              <Image 
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
                <TabsContent value="solutions" className="space-y-3 min-h-[200px] w-full">
                  {viewMode === 'card' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                      {activeIndustry.solutions?.map((solution, index) => (
                        <EnhancedSolutionCard
                          key={index}
                          title={solution}
                          description={`Advanced AI solution tailored for ${activeIndustry.title.toLowerCase()} applications.`}
                          icon={<MindscapeBrainLogo variant="icon-only" size="sm" />}
                          benefits={[
                            "Reduce operational costs",
                            "Increase efficiency",
                            "Improve customer satisfaction"
                          ]}
                          color="from-blue-500 to-blue-700"
                          onActionClick={() => {
                            // Show a modal or navigate to a page with all solutions
                            alert('View all solutions for ' + activeIndustry.title);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-1.5 w-full">
                      {activeIndustry.solutions?.map((solution, index) => (
                        <div key={index} className="group">
                          <div className="p-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg hover:border-red-500/30 transition-all duration-300">
                            <div className="flex items-center">
                              <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/30 text-red-400 mr-3 flex-shrink-0">
                                <Zap className="h-4 w-4" />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium text-sm">{solution}</h4>
                                <p className="text-xs text-white/60 line-clamp-1">
                                  Advanced AI solution tailored for {activeIndustry.title.toLowerCase()} applications.
                                </p>
                              </div>
                              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight className="h-4 w-4 text-red-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-end mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-black/40 border-white/10 hover:bg-black/60 hover:border-red-500/30 h-7 text-xs px-2"
                      onClick={() => {
                        // Show a modal or navigate to a page with all solutions
                        alert('View all solutions for ' + activeIndustry.title);
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>View All</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </Button>
                  </div>
                </TabsContent>
                
                {/* AI Capabilities tab content */}
                <TabsContent value="ai" className="space-y-3 min-h-[200px] w-full">
                  {activeIndustry.aiSolutions && activeIndustry.aiSolutions.length > 0 ? (
                    <>
                      {viewMode === 'card' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                          {activeIndustry.aiSolutions.map((solution, index) => (
                            <EnhancedSolutionCard
                              key={index}
                              title={solution.title}
                              description={solution.description}
                              icon={solution.icon || <MindscapeBrainLogo variant="icon-only" size="sm" />}
                              benefits={[
                                `${solution.performance.accuracy}% Accuracy`,
                                `${solution.performance.latency}ms Latency`,
                                `${solution.performance.scalability}/10 Scale`
                              ]}
                              color="from-blue-500 to-blue-700"
                              onActionClick={() => {
                                // Show a modal or navigate to a page with all AI solutions
                                alert('View all AI solutions for ' + activeIndustry.title);
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2 w-full">
                          {activeIndustry.aiSolutions.map((solution, index) => (
                            <div key={index} className="flex gap-3 p-2 border border-white/10 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
                              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/30 text-blue-400 flex-shrink-0">
                                {solution.icon || <MindscapeBrainLogo variant="icon-only" size="sm" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm">{solution.title}</h3>
                                <p className="text-xs text-white/70 mb-1 line-clamp-1">{solution.description}</p>
                                
                                <div className="grid grid-cols-3 gap-2 mt-1.5">
                                  <div>
                                    <div className="flex justify-between items-center text-[9px] mb-0.5">
                                      <span className="text-white/60">Accuracy</span>
                                      <span className="text-white/80 font-medium">{solution.performance.accuracy}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full bg-green-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${solution.performance.accuracy}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                      />
                                        </div>
                                      </div>
                                      <div>
                                    <div className="flex justify-between items-center text-[9px] mb-0.5">
                                      <span className="text-white/60">Latency</span>
                                      <span className="text-white/80 font-medium">{solution.performance.latency}ms</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full bg-blue-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${100 - (solution.performance.latency / 200) * 100}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                      />
                                        </div>
                                      </div>
                                      <div>
                                    <div className="flex justify-between items-center text-[9px] mb-0.5">
                                      <span className="text-white/60">Scale</span>
                                      <span className="text-white/80 font-medium">{solution.performance.scalability}</span>
                                        </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full bg-purple-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(solution.performance.scalability / 5000) * 100}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex justify-center mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-black/40 border-white/10 hover:bg-black/60 hover:border-blue-500/30 h-7 text-xs px-2"
                          onClick={() => {
                            // Show a modal or navigate to a page with all AI solutions
                            alert('View all AI solutions for ' + activeIndustry.title);
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Explore AI Capabilities</span>
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                        <MindscapeBrainLogo variant="icon-only" size="sm" />
                      </div>
                      <h3 className="text-base font-medium mb-1">No AI Solutions Available</h3>
                      <p className="text-white/60 max-w-md text-xs">
                        This industry doesn't have specific AI solutions defined yet. Check back later for updates.
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
            <CardHeader className="pb-2 p-3">
              <CardTitle className="text-sm">Technologies</CardTitle>
            </CardHeader>
            <CardContent className="px-3 pt-0 pb-3">
              <div className="flex flex-wrap gap-1.5">
                {activeIndustry.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-white/5 border-white/10 text-xs py-0.5">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
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
                                  <Progress value={(parseInt(roi) / 400) * 100} className="h-2 w-24 bg-white/10">
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
                                        <MindscapeBrainLogo variant="icon-only" size="sm" />
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
      
      {/* AI Solutions Section - Compact Layout */}
      {activeIndustry.aiSolutions && activeIndustry.aiSolutions.length > 0 && (
        <div className="w-full max-w-7xl mx-auto mb-16">
          {/* Two-column header layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-center">
            <div className="space-y-2">
              <Badge variant="outline" className="inline-flex items-center mb-1 bg-blue-500/10 text-blue-400 border-blue-500/30 px-3 py-1">
                <Brain className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
                AI CAPABILITIES
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Advanced AI Technologies
              </h3>
              <p className="text-sm md:text-base text-white/70">
                Cutting-edge AI solutions designed for {activeIndustry.title} industry challenges.
              </p>
            </div>
            
            <div className="flex justify-start md:justify-end items-start">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs bg-black/40 border-white/10"
                onClick={() => setViewOptions({...viewOptions, ai: viewOptions.ai === "card" ? "list" : "card"})}
              >
                {viewOptions.ai === "card" ? (
                  <>
                    <LayoutList className="h-3.5 w-3.5 mr-1.5" />
                    List View
                  </>
                ) : (
                  <>
                    <LayoutGrid className="h-3.5 w-3.5 mr-1.5" />
                    Grid View
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* AI Solutions Cards - Compact grid layout */}
          <div className={`grid gap-4 ${viewOptions.ai === "card" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {activeIndustry.aiSolutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`h-full border border-white/10 bg-black/40 backdrop-blur-md rounded-lg overflow-hidden hover:border-blue-500/30 transition-all duration-300 ${
                  viewOptions.ai === "card" ? "p-4" : "p-4 md:p-5"
                }`}>
                  {viewOptions.ai === "card" ? (
                    <div className="h-full flex flex-col">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                          {solution.icon || <Brain className="h-5 w-5 text-blue-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-medium mb-1">{solution.title}</h4>
                          <p className="text-sm text-white/60 line-clamp-2">{solution.description}</p>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="text-white/60">Performance</span>
                          <span className="text-white/80 font-medium">{solution.performance.accuracy}% accuracy</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${solution.performance.accuracy}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List view layout
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      <div className="shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                        {solution.icon || <Brain className="h-6 w-6 text-blue-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-medium mb-1">{solution.title}</h4>
                        <p className="text-sm text-white/70 mb-3">{solution.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="text-xs text-white/50 uppercase mb-1.5">Key Capabilities</h5>
                            <ul className="space-y-1">
                              {solution.capabilities.slice(0, 3).map((capability, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <Check className="h-3.5 w-3.5 mr-1.5 text-blue-400 mt-0.5 shrink-0" />
                                  <span className="line-clamp-1">{capability}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-xs text-white/50 uppercase mb-1.5">Use Cases</h5>
                            <ul className="space-y-1">
                              {solution.useCases.slice(0, 3).map((useCase, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <Check className="h-3.5 w-3.5 mr-1.5 text-blue-400 mt-0.5 shrink-0" />
                                  <span className="line-clamp-1">{useCase}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="text-white/60">Accuracy</span>
                              <span className="text-white/80 font-medium">{solution.performance.accuracy}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-blue-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${solution.performance.accuracy}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="text-white/60">Speed</span>
                              <span className="text-white/80 font-medium">{solution.performance.latency}ms</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-green-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${100 - (solution.performance.latency / 2)}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="text-white/60">Scale</span>
                              <span className="text-white/80 font-medium">{solution.performance.scalability}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-purple-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(solution.performance.scalability / 5000) * 100}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* ROI Calculator Dialog */}
      <Dialog open={showRoiCalculator} onOpenChange={setShowRoiCalculator}>
        <DialogContent className="sm:max-w-[800px] bg-black/90 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-400" />
              ROI Calculator for {activeIndustry.title}
            </DialogTitle>
            <DialogDescription>
              Estimate your potential return on investment based on your organization's specifics
            </DialogDescription>
          </DialogHeader>
          
          <div className="w-full mb-12">
            <Card className="w-full border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2 mb-1">
                      <Calculator className="h-5 w-5 text-blue-400" />
                      ROI Calculator for {activeIndustry.title}
                    </CardTitle>
                    <CardDescription>
                      Estimate your potential return on investment based on your organization's specifics
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/5 border-white/10 hover:bg-white/10"
                      onClick={() => {
                        // Reset ROI inputs to defaults
                        setRoiInputs({
                          employees: 100,
                          currentCost: 10000,
                          efficiency: 30
                        });
                      }}
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <h3 className="text-base font-medium mb-4">Organization Inputs</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label htmlFor="employees" className="text-sm text-white/70">
                            Employees
                          </label>
                          <span className="text-sm font-medium">{roiInputs.employees}</span>
                        </div>
                        <input
                          id="employees"
                          type="range"
                          min="10"
                          max="1000"
                          step="10"
                          name="employees"
                          value={roiInputs.employees}
                          onChange={handleRoiInputChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label htmlFor="currentCost" className="text-sm text-white/70">
                            Monthly Operational Cost ($)
                          </label>
                          <span className="text-sm font-medium">${roiInputs.currentCost}</span>
                        </div>
                        <input
                          id="currentCost"
                          type="range"
                          min="1000"
                          max="100000"
                          step="1000"
                          name="currentCost"
                          value={roiInputs.currentCost}
                          onChange={handleRoiInputChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label htmlFor="efficiency" className="text-sm text-white/70">
                            Expected Efficiency Gain (%)
                          </label>
                          <span className="text-sm font-medium">{roiInputs.efficiency}%</span>
                        </div>
                        <input
                          id="efficiency"
                          type="range"
                          min="5"
                          max="50"
                          step="1"
                          name="efficiency"
                          value={roiInputs.efficiency}
                          onChange={handleRoiInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={generateRoiReport} 
                      className="w-full mt-4" 
                      disabled={isGeneratingReport}
                    >
                      {isGeneratingReport ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Generate ROI Report
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {/* Results Section */}
                  <div className="space-y-6">
                    <h3 className="text-base font-medium mb-4">ROI Analysis</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-black/30 border-white/10">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-white/70 mb-1">Annual Savings</p>
                            <p className="text-2xl font-bold">${roiResults.annualSavings}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-black/30 border-white/10">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-white/70 mb-1">Estimated ROI</p>
                            <p className="text-2xl font-bold">{roiResults.estimatedRoi}%</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-black/30 border-white/10 col-span-2">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-white/70 mb-1">Payback Period</p>
                            <p className="text-2xl font-bold">{roiResults.paybackPeriod} months</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-4 mt-6">
                      <h4 className="text-sm font-medium">Investment Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">Implementation Cost</span>
                          <span className="font-medium">$50,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">Annual Maintenance</span>
                          <span className="font-medium">$5,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">Break-even Point</span>
                          <span className="font-medium">{roiResults.paybackPeriod} months</span>
                        </div>
                        <div className="border-t border-white/10 my-2 pt-2 flex justify-between text-sm">
                          <span className="text-white/70">5-Year ROI</span>
                          <span className="font-medium">{parseInt(roiResults.estimatedRoi) * 5}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
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
  )
}
