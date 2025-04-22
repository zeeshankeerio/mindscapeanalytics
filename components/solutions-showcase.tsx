"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  Heart, 
  BarChart4, 
  Building2, 
  Briefcase, 
  Brain, 
  Cpu, 
  Database, 
  Zap, 
  ArrowRight, 
  Sparkles,
  Globe, 
  ShieldCheck, 
  Share2,
  ChevronRight,
  BarChart,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle2,
  Check
} from "lucide-react"

// Define solutions outside component for better performance
const solutions = [
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Transform patient care with AI-powered diagnostics and predictive analytics. Our healthcare solutions reduce misdiagnosis rates by 42%, optimize clinical workflows, and improve patient outcomes through intelligent data analysis.",
    icon: Heart,
    color: "red",
    features: [
      "Clinical decision support with 98% accuracy",
      "Predictive patient outcome modeling",
      "Medical imaging analysis & anomaly detection",
      "Real-time resource allocation optimization",
      "Secure patient data management & compliance",
    ],
    stats: [
      { label: "Diagnosis Accuracy", value: "98%", icon: CheckCircle2 },
      { label: "Time Saved", value: "60%", icon: Clock },
      { label: "Patient Satisfaction", value: "95%", icon: Users },
    ],
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop",
    altText: "Healthcare AI analytics dashboard showing patient data and diagnostic tools",
    casestudy: {
      company: "MediTech Innovations",
      challenge: "Faced 28% misdiagnosis rate and excessive wait times in radiology department",
      solution: "Implemented AI-powered diagnostic assistance platform with medical imaging analysis",
      result: "Reduced misdiagnosis rates by 42% and cut patient wait times by 35% within 6 months of implementation.",
      quote: "Mindscape AI has revolutionized how we analyze medical imagery and predict patient outcomes.",
      author: "Dr. Sarah Chen, Chief Medical Officer"
    },
    techStack: ["Computer Vision", "Natural Language Processing", "Predictive Analytics", "Secure Cloud Infrastructure"],
    metrics: [
      { label: "Implementation Time", value: "4-6 weeks" },
      { label: "ROI Period", value: "3-4 months" }
    ]
  },
  {
    id: "finance",
    title: "Financial Analytics",
    description: "Empower financial institutions with AI-driven fraud detection and risk management. Our solutions deliver real-time threat analysis with 99.8% accuracy, identify market trends, and optimize investment portfolios while ensuring regulatory compliance.",
    icon: BarChart4,
    color: "blue",
    features: [
      "Real-time fraud detection with 99.8% accuracy",
      "Automated risk assessment and compliance",
      "Market trend prediction & trading signals",
      "Portfolio optimization based on risk tolerance",
      "Regulatory compliance monitoring & reporting",
    ],
    stats: [
      { label: "Fraud Detection", value: "99.8%", icon: ShieldCheck },
      { label: "Risk Accuracy", value: "94%", icon: BarChart },
      { label: "Cost Reduction", value: "48%", icon: DollarSign },
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    altText: "Financial analytics dashboard showing market data, trend analysis, and risk assessment tools",
    casestudy: {
      company: "Global Investment Bank",
      challenge: "Struggling with false positives in fraud detection and manual market analysis processes",
      solution: "Deployed our AI-powered risk assessment platform with real-time transaction monitoring",
      result: "Identified $14.2M in potential fraud transactions and improved trading algorithms by 23% in the first quarter.",
      quote: "The predictive capabilities have given us a significant advantage in market analysis and risk assessment.",
      author: "Michael Roberts, Head of Risk Management"
    },
    techStack: ["Time Series Analysis", "Neural Networks", "Natural Language Processing", "Anomaly Detection"],
    metrics: [
      { label: "Implementation Time", value: "6-8 weeks" },
      { label: "ROI Period", value: "2-3 months" }
    ]
  },
  {
    id: "retail",
    title: "Retail Intelligence",
    description: "Revolutionize retail with AI-powered customer insights and inventory management. Our solutions increase sales by 32%, optimize inventory to reduce costs by 47%, and boost customer retention through personalized marketing and trend prediction.",
    icon: Building2,
    color: "green",
    features: [
      "Customer behavior analysis & segmentation",
      "Demand forecasting with 94% accuracy",
      "Dynamic pricing optimization",
      "Automated supply chain management",
      "Personalized marketing recommendations",
    ],
    stats: [
      { label: "Sales Increase", value: "32%", icon: TrendingUp },
      { label: "Inventory Efficiency", value: "47%", icon: Database },
      { label: "Customer Retention", value: "39%", icon: Users },
    ],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    altText: "Retail intelligence dashboard showing customer behavior analytics, inventory management, and sales forecasting",
    casestudy: {
      company: "RetailGiant Corp",
      challenge: "Facing inventory inefficiencies with 24% overstock and 18% stockout rates",
      solution: "Implemented demand forecasting and inventory optimization AI solution",
      result: "Reduced overstock by 37% while simultaneously decreasing stockouts by 42% through intelligent inventory prediction.",
      quote: "The customer behavior insights have completely transformed our marketing approach and inventory management.",
      author: "Jessica Williams, Director of Operations"
    },
    techStack: ["Recommendation Systems", "Demand Forecasting", "Customer Segmentation", "Price Optimization"],
    metrics: [
      { label: "Implementation Time", value: "5-7 weeks" },
      { label: "ROI Period", value: "3-5 months" }
    ]
  },
  {
    id: "manufacturing",
    title: "Manufacturing AI",
    description: "Optimize production with AI-powered predictive maintenance and quality control. Our manufacturing solutions reduce downtime by 78%, improve product quality by 45%, and decrease maintenance costs by 29% through real-time equipment monitoring.",
    icon: Briefcase,
    color: "yellow",
    features: [
      "Predictive maintenance reducing downtime by 78%",
      "Automated quality control with computer vision",
      "Production line optimization & scheduling",
      "Supply chain forecasting & resilience",
      "Equipment efficiency monitoring with IoT",
    ],
    stats: [
      { label: "Downtime Reduction", value: "78%", icon: Clock },
      { label: "Quality Improvement", value: "45%", icon: CheckCircle2 },
      { label: "Cost Savings", value: "29%", icon: DollarSign },
    ],
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop",
    altText: "Manufacturing AI dashboard showing equipment monitoring, predictive maintenance alerts, and production metrics",
    casestudy: {
      company: "PrecisionTech Manufacturing",
      challenge: "Experiencing frequent unplanned downtime and high maintenance costs",
      solution: "Deployed IoT sensors with AI-powered predictive maintenance system",
      result: "Achieved 78% reduction in unplanned downtime and 23% decrease in maintenance costs through predictive maintenance.",
      quote: "The ability to predict equipment failures before they happen has completely transformed our maintenance strategy.",
      author: "Robert Tanaka, VP of Operations"
    },
    techStack: ["IoT Integration", "Anomaly Detection", "Computer Vision", "Digital Twin Modeling"],
    metrics: [
      { label: "Implementation Time", value: "8-10 weeks" },
      { label: "ROI Period", value: "4-6 months" }
    ]
  },
  {
    id: "blockchain",
    title: "Blockchain Solutions",
    description: "Enterprise-grade blockchain platform with DeFi, NFT, and cross-chain capabilities. Our solutions enable secure, scalable, and interoperable blockchain applications with advanced analytics and real-time monitoring.",
    icon: Database,
    color: "purple",
    features: [
      "Cross-chain integration with 50+ supported networks",
      "DeFi protocol integration & yield optimization",
      "NFT marketplace & collection management",
      "Real-time blockchain analytics & monitoring",
      "Enterprise-grade security & compliance",
    ],
    stats: [
      { label: "Transaction Speed", value: "10K TPS", icon: Zap },
      { label: "Network Uptime", value: "99.99%", icon: ShieldCheck },
      { label: "Cost Reduction", value: "65%", icon: DollarSign },
    ],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
    altText: "Blockchain platform dashboard showing network metrics, DeFi analytics, and cross-chain capabilities",
    casestudy: {
      company: "CryptoFinance Corp",
      challenge: "Facing scalability issues and high transaction costs across multiple blockchain networks",
      solution: "Implemented our cross-chain blockchain platform with DeFi integration",
      result: "Achieved 65% reduction in transaction costs and 10x increase in processing capacity across networks.",
      quote: "The platform's cross-chain capabilities and DeFi integration have transformed our blockchain operations.",
      author: "Alex Chen, CTO"
    },
    techStack: ["Cross-Chain Bridges", "Smart Contracts", "DeFi Protocols", "NFT Standards"],
    metrics: [
      { label: "Implementation Time", value: "6-8 weeks" },
      { label: "ROI Period", value: "3-4 months" }
    ]
  },
];

// Add more industries to select from
const additionalIndustries = [
  {
    id: "energy",
    title: "Energy & Utilities",
    icon: Zap,
    color: "purple"
  },
  {
    id: "logistics",
    title: "Logistics & Transport",
    icon: Globe,
    color: "indigo"
  }
];

export default function SolutionsShowcase() {
  const [activeTab, setActiveTab] = useState("healthcare");
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const activeSolution = solutions.find((s) => s.id === activeTab) || solutions[0];
  const IconComponent = activeSolution.icon;

  // Define metrics based on active tab
  const getMetricsForTab = (tab: string) => [
    { label: "Accuracy", value: tab === "healthcare" ? 98 : tab === "finance" ? 99 : tab === "retail" ? 94 : 92 },
    { label: "Efficiency", value: tab === "healthcare" ? 85 : tab === "finance" ? 93 : tab === "retail" ? 87 : 95 },
    { label: "Cost Saving", value: tab === "healthcare" ? 72 : tab === "finance" ? 85 : tab === "retail" ? 78 : 82 },
    { label: "Time Saved", value: tab === "healthcare" ? 76 : tab === "finance" ? 68 : tab === "retail" ? 84 : 90 },
  ];

  // Initialize metrics with values for the active tab
  const [metrics, setMetrics] = useState(() => getMetricsForTab(activeTab));

  useEffect(() => {
    setMetrics(getMetricsForTab(activeTab));
  }, [activeTab]);
  
  // Format values with proper units
  const formatMetricValue = (metric: string, value: number): string => {
    if (metric === "Cost Saving") return `${value}%`;
    if (metric === "Time Saved") return `${value}%`;
    if (metric === "Accuracy") return `${value}%`;
    if (metric === "Efficiency") return `${value}%`;
    return `${value}%`;
  };
  
  // 3D card effect with mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const rotateX = useTransform(mouseY, [0, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 600], [-5, 5]);
  const brightness = useTransform(mouseY, [0, 300], [1.1, 0.9]);

  // Floating labels animation variants
  const floatingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 relative overflow-hidden" 
      id="solutions"
      aria-labelledby="solutions-heading"
      suppressHydrationWarning
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[url(/images/grid.svg)] bg-repeat [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-40"></div>
      <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-red-500/10 blur-[120px] opacity-70"></div>
      <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px] opacity-70"></div>
      
      {/* More sophisticated animated particles with varying sizes */}
      {[...Array(30)].map((_, i) => {
        // Use deterministic values based on index instead of random
        const size = 2 + (i % 4);
        const xPos = ((i * 3.33) % 100);
        const yPos = ((i * 3.33) % 100);
        const duration = 15 + (i % 10);
        const delay = i * 0.2;
        
        return (
        <motion.div
          key={`particle-${i}`}
            className={`absolute rounded-full will-change-transform ${i % 3 === 0 ? 'bg-red-500/40' : i % 3 === 1 ? 'bg-blue-500/30' : 'bg-purple-500/30'}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
          initial={{
              x: `${xPos}%`,
              y: `${yPos}%`,
            scale: 0,
          }}
          animate={{
              x: `${(xPos + 50) % 100}%`,
              y: `${(yPos + 50) % 100}%`,
            scale: [0, 1, 0],
          }}
          transition={{
              duration: duration,
            repeat: Infinity,
              delay: delay,
          }}
        />
        );
      })}

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center justify-center p-1 mb-5 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full"
          >
            <div className="bg-black px-4 py-1.5 rounded-full flex items-center space-x-1">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.2, 1, 1.2, 1] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse"
                }}
              >
                <Sparkles className="h-4 w-4 text-red-500 mr-2" />
              </motion.div>
              <span className="text-xs font-semibold tracking-wider text-white/80">INDUSTRY SOLUTIONS</span>
            </div>
          </motion.div>
          
          <h2 
            id="solutions-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80"
          >
            Industry-Specific <span className="text-red-500">AI Solutions</span>
          </h2>
          <p className="text-md md:text-lg text-white/70 max-w-2xl mx-auto">
            Our specialized AI solutions are tailored to address the unique challenges and opportunities in various industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl shadow-lg p-1">
              {/* List of solutions as standalone navigation */}
              <div className="flex flex-col w-full space-y-1 bg-transparent">
                {solutions.map((solution) => (
                  <button
                    key={solution.id}
                    onClick={() => setActiveTab(solution.id)}
                    className={cn(
                      "relative flex items-center gap-3 h-auto py-3 px-4 rounded-lg text-left transition-all duration-200 w-full",
                      activeTab === solution.id
                        ? `bg-gradient-to-r from-red-600/30 to-red-800/20 text-white border-l-2 border-red-500`
                        : "hover:bg-black/30 text-white/70 hover:text-white"
                    )}
                    aria-selected={activeTab === solution.id}
                  >
                    <div 
                      className={`flex items-center justify-center w-10 h-10 rounded-md p-1.5
                        ${activeTab === solution.id 
                          ? 'bg-gradient-to-br from-red-500/20 to-red-700/20 text-red-500' 
                          : 'bg-black/20 text-white/60'}`}
                    >
                      <solution.icon className="h-full w-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{solution.title}</span>
                      {activeTab === solution.id && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-xs text-white/50 mt-0.5"
                        >
                          AI-powered solution
                        </motion.span>
                      )}
                    </div>
                  </button>
                ))}
                
                {/* Additional Industries */}
                {additionalIndustries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => setActiveTab(industry.id)}
                    className="relative flex items-center gap-3 h-auto py-3 px-4 rounded-lg text-left hover:bg-black/30 text-white/70 hover:text-white transition-all duration-200 w-full"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-md p-1.5 bg-black/20 text-white/60">
                      <industry.icon className="h-full w-full" />
                    </div>
                    <span className="font-medium text-sm">{industry.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            {/* Content display area */}
            <AnimatePresence mode="wait">
                  <motion.div
                key={activeSolution.id}
                initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={activeSolution.image}
                      alt={activeSolution.altText}
                      fill
                      className="object-cover"
                      priority
                    />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

                  <div className="absolute top-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {activeSolution.title}
                      </h3>
                    </div>
                    <p className="text-base text-white/80 max-w-3xl mt-2">
                      {activeSolution.description.split('.')[0]}
                    </p>
              </div>
                  </div>

                {/* Stats banner */}
                <div className="grid grid-cols-3 border-b border-white/5">
                    {activeSolution.stats.map((stat, index) => (
                    <div key={index} className={`p-4 text-center ${index !== activeSolution.stats.length - 1 ? 'border-r border-white/5' : ''}`}>
                      <div className="text-2xl lg:text-3xl font-bold text-red-500" suppressHydrationWarning>{stat.value}</div>
                      <div className="text-sm text-white/70" suppressHydrationWarning>{stat.label}</div>
                        </div>
                    ))}
                  </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  {/* Key Benefits Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg lg:text-xl font-semibold mb-4 flex items-center">
                        <span className="inline-flex items-center justify-center p-1.5 rounded-full bg-red-500/10 mr-2">
                          <CheckCircle2 className="h-5 w-5 text-red-500" />
                        </span>
                        Key Benefits
                  </h4>
                      <ul className="space-y-3">
                    {activeSolution.features.map((feature, index) => (
                      <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2.5 group"
                          >
                            <div className="mt-0.5 p-1 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                              <Check className="h-3.5 w-3.5 text-red-500" />
                        </div>
                            <span className="text-sm group-hover:text-white transition-colors">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                    </div>

                    {/* ROI & Implementation */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-sm font-medium text-white/70">ROI</h5>
                          <div className="p-1.5 rounded-full bg-red-500/10">
                            <TrendingUp className="h-3.5 w-3.5 text-red-500" />
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-white" suppressHydrationWarning>280%</div>
                        <div className="w-full h-1 bg-red-500/20 rounded-full mt-2">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-sm font-medium text-white/70">Implementation</h5>
                          <div className="p-1.5 rounded-full bg-red-500/10">
                            <Clock className="h-3.5 w-3.5 text-red-500" />
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-white" suppressHydrationWarning>6 weeks</div>
                        <div className="w-full h-1 bg-red-500/20 rounded-full mt-2">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics & Tech Stack */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg lg:text-xl font-semibold mb-4 flex items-center">
                        <span className="inline-flex items-center justify-center p-1.5 rounded-full bg-red-500/10 mr-2">
                          <BarChart4 className="h-5 w-5 text-red-500" />
                        </span>
                        Performance Metrics
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {metrics.map((metric, index) => (
                        <motion.div 
                            key={`metric-${index}`} 
                            className="bg-black/30 border border-white/5 rounded-lg p-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm text-white/70 font-medium" suppressHydrationWarning>{metric.label}</p>
                              <p className="text-lg font-bold text-red-500" suppressHydrationWarning>{formatMetricValue(metric.label, metric.value)}</p>
                          </div>
                            <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-red-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${metric.value}%` }}
                                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                              />
                          </div>
                        </motion.div>
                        ))}
                      </div>
                  </div>
                  
                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg lg:text-xl font-semibold mb-4 flex items-center">
                        <span className="inline-flex items-center justify-center p-1.5 rounded-full bg-red-500/10 mr-2">
                          <Cpu className="h-5 w-5 text-red-500" />
                        </span>
                        Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeSolution.techStack.map((tech, index) => (
                        <motion.span
                          key={`tech-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="text-xs bg-black/40 text-white/80 px-3 py-1.5 rounded-full border border-white/5 inline-flex items-center"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></span>
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                    <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border-0 mt-4">
                      <span className="flex items-center">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1.5" />
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Case Study Section */}
                <div className="border-t border-white/5 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-full bg-red-500/10">
                      <BarChart className="h-5 w-5 text-red-500" />
                    </div>
                    <h4 className="text-lg lg:text-xl font-semibold">Case Study</h4>
          </div>

                  <div className="bg-gradient-to-br from-black/60 to-black/40 border border-white/5 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                      {/* Left side - client info */}
                      <div className="p-5 lg:col-span-3 space-y-4">
                        <div>
                          <div className="text-sm text-white/60 mb-1">Client</div>
                          <div className="font-medium" suppressHydrationWarning>{activeSolution.casestudy.company}</div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-white/60 mb-1">Challenge</div>
                            <div className="text-sm">{activeSolution.casestudy.challenge}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-white/60 mb-1">Solution</div>
                            <div className="text-sm">{activeSolution.casestudy.solution}</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-white/60 mb-1">Results</div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="bg-red-500/10 p-3 rounded-lg">
                              <TrendingUp className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="text-sm">
                              <span className="text-red-500 font-medium block">{activeSolution.casestudy.result.split(' ')[1]} {activeSolution.casestudy.result.split(' ')[2]}</span>
                              <span className="text-xs text-white/60">{activeSolution.casestudy.result.split(' ').slice(3).join(' ')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="mt-4 bg-black/40 hover:bg-black/60 text-white border border-white/10 text-xs px-3 h-8">
                          <span className="flex items-center">
                            View Full Case Study
                            <ArrowRight className="h-3 w-3 ml-1.5" />
                          </span>
                        </Button>
                      </div>
                      
                      {/* Right side - testimonial quote */}
                      <div className="lg:col-span-2 bg-gradient-to-r from-red-900/20 to-red-700/10 border-l border-white/5 p-5 relative">
                        <div className="absolute top-4 right-4 text-red-500/20">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        
                        <div className="mt-4">
                          <blockquote className="text-sm italic text-white/90 relative">
                            "{activeSolution.casestudy.quote}"
                          </blockquote>
                          
                          <div className="mt-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-xs">
                              {activeSolution.casestudy.author.split(' ')[0][0]}{activeSolution.casestudy.author.split(' ')[1][0]}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{activeSolution.casestudy.author.split(',')[0]}</div>
                              <div className="text-xs text-white/60">{activeSolution.casestudy.author.split(',')[1]}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

