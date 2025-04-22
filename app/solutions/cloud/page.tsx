"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Cloud, 
  Database, 
  Shield, 
  Zap, 
  Server, 
  Network, 
  Code, 
  Check,
  Globe,
  Lock,
  PieChart,
  Settings,
  Layers,
  RefreshCw,
  CloudRain,
  BarChart,
  Activity,
  ChevronRight,
  LineChart,
  ArrowRight,
  CheckCircle2,
  CpuIcon,
  FileText,
  Users,
  CreditCard,
  BadgeAlert,
  HardDrive
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

interface CloudProvider {
  name: string;
  logo: string;
  features: string[];
  regions: number;
  certifications: string[];
  color: string;
}

const cloudProviders: CloudProvider[] = [
  {
    name: "AWS",
    logo: "/images/aws-logo.svg",
    features: ["EC2", "S3", "RDS", "Lambda", "EKS"],
    regions: 25,
    certifications: ["SOC 1/2/3", "ISO 27001", "PCI DSS", "HIPAA"],
    color: "#FF9900"
  },
  {
    name: "Azure",
    logo: "/images/azure-logo.svg",
    features: ["VMs", "Blob Storage", "SQL", "Functions", "AKS"],
    regions: 60,
    certifications: ["SOC 1/2/3", "ISO 27001", "PCI DSS", "HIPAA"],
    color: "#0078D4"
  },
  {
    name: "Google Cloud",
    logo: "/images/gcp-logo.svg",
    features: ["Compute Engine", "Cloud Storage", "Cloud SQL", "Cloud Functions", "GKE"],
    regions: 33,
    certifications: ["SOC 1/2/3", "ISO 27001", "PCI DSS", "HIPAA"],
    color: "#4285F4"
  }
];

export default function CloudSolutionsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCloudProvider, setSelectedCloudProvider] = useState<CloudProvider>(cloudProviders[0])
  const [isAnnualBilling, setIsAnnualBilling] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [resourceAllocation, setResourceAllocation] = useState({
    compute: 40,
    storage: 60,
    network: 30
  })
  const [usageMetrics, setUsageMetrics] = useState({
    cpuUtilization: 35,
    memoryUsage: 45,
    storageUsed: 4.2,
    networkBandwidth: 650,
    activeInstances: 8,
    monthlySpend: 12500
  })
  
  // Animation for metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setUsageMetrics(prev => ({
        ...prev,
        cpuUtilization: Math.min(95, Math.max(20, prev.cpuUtilization + (Math.random() * 8 - 4))),
        memoryUsage: Math.min(90, Math.max(30, prev.memoryUsage + (Math.random() * 6 - 3))),
        networkBandwidth: Math.min(950, Math.max(400, prev.networkBandwidth + (Math.random() * 80 - 40))),
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const cloudFeatures = [
    {
      icon: <Database className="h-6 w-6 text-blue-400" />,
      title: "Scalable Storage",
      description: "Unlimited cloud storage for your AI models and datasets with automated backups."
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-400" />,
      title: "High Performance",
      description: "Low-latency inferencing with distributed computing across global datacenters."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      title: "Enterprise Security",
      description: "SOC 2 compliance with end-to-end encryption and role-based access control."
    },
    {
      icon: <Server className="h-6 w-6 text-blue-400" />,
      title: "Dedicated Infrastructure",
      description: "Optional dedicated GPU and TPU instances for high-demand workloads."
    },
    {
      icon: <Network className="h-6 w-6 text-blue-400" />,
      title: "Global Network",
      description: "Edge computing capabilities across our worldwide network of datacenters."
    },
    {
      icon: <Code className="h-6 w-6 text-blue-400" />,
      title: "Developer APIs",
      description: "Comprehensive API access with SDKs for all major programming languages."
    }
  ]

  const pricingTiers = [
    {
      name: "Starter",
      price: "$499",
      description: "For teams getting started with AI in the cloud",
      features: [
        "5 TB cloud storage",
        "Standard compute resources",
        "Up to 10 team members",
        "Basic monitoring",
        "Email support",
        "Standard SLA"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$1,499",
      description: "For growing businesses with advanced AI needs",
      features: [
        "25 TB cloud storage",
        "Premium compute resources",
        "Up to 50 team members",
        "Advanced monitoring",
        "Priority support",
        "99.9% uptime SLA",
        "Custom model deployment"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with mission-critical AI workloads",
      features: [
        "Unlimited cloud storage",
        "Dedicated compute resources",
        "Unlimited team members",
        "Enterprise monitoring",
        "24/7 phone & email support",
        "99.99% uptime SLA",
        "Custom model deployment",
        "Dedicated account manager",
        "On-premise options"
      ],
      highlighted: false
    }
  ]

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* Enhanced Hero Section */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cloud Animation */}
          <div className="relative h-24 mb-8">
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2"
              animate={{ 
                y: [0, -8, 0],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Cloud className="h-16 w-16 text-blue-400/80" />
            </motion.div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm"></div>
            
            <motion.div 
              className="absolute left-1/4 top-1/3"
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Server className="h-8 w-8 text-blue-400/60" />
            </motion.div>
            
            <motion.div 
              className="absolute right-1/4 top-1/2"
              animate={{ 
                y: [0, -6, 0],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{ 
                duration: 3.2, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Database className="h-8 w-8 text-blue-400/60" />
            </motion.div>
          </div>
          
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4">
            Enterprise Cloud Platform
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600">
              Multi-Cloud Infrastructure
            </span>
            <br />
            <span className="text-white">
              For Modern Enterprises
            </span>
          </h1>
          
          {/* Cloud Provider Selector */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-black/30 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Choose Your Cloud Provider</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {cloudProviders.map((provider) => (
                  <div 
                    key={provider.name}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedCloudProvider.name === provider.name 
                        ? `bg-${provider.name.toLowerCase()}-950/20 border-${provider.name.toLowerCase()}-500/50` 
                        : 'bg-black/40 border-white/10 hover:border-white/30'
                    }`}
                    style={{ 
                      borderColor: selectedCloudProvider.name === provider.name 
                        ? `${provider.color}40` 
                        : '',
                      backgroundColor: selectedCloudProvider.name === provider.name 
                        ? `${provider.color}10` 
                        : ''
                    }}
                    onClick={() => {
                      setSelectedCloudProvider(provider);
                      toast.success(`Selected ${provider.name} as your cloud provider`);
                    }}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="h-12 w-12 flex items-center justify-center">
                        <img 
                          src={provider.logo}
                          alt={provider.name} 
                          className="max-h-full max-w-full"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/80x80/0f172a/4b9be5?text=${provider.name}`
                          }}
                        />
                      </div>
                    </div>
                    <h4 className="text-center font-medium">{provider.name}</h4>
                    <div className="text-xs text-center text-white/60 mt-1">{provider.regions} Regions Worldwide</div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">{selectedCloudProvider.name} Features</h4>
                  <Badge 
                    className="bg-black/40"
                    style={{ color: selectedCloudProvider.color }}
                  >
                    Integrated
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {selectedCloudProvider.features.map((feature) => (
                    <div key={feature} className="text-xs bg-black/30 border border-white/10 rounded px-2 py-1.5 flex items-center justify-center">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Server className="mr-2 h-4 w-4" />
              Deploy on {selectedCloudProvider.name}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-500/20 hover:border-blue-500/40"
              onClick={() => setShowContactModal(true)}
            >
              <Users className="mr-2 h-4 w-4" />
              Talk to an Expert
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            {selectedCloudProvider.certifications.slice(0, 3).map((cert) => (
              <Badge key={cert} className="bg-black/30 text-white/70 border-white/10">
                <Shield className="h-3 w-3 mr-1" />
                {cert}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Contact Sales Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="bg-black/80 border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle>Talk to a Cloud Expert</DialogTitle>
            <DialogDescription>
              Get personalized guidance on your cloud strategy
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="Enter your work email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Enter your company name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="provider">Preferred Cloud Provider</Label>
              <Select defaultValue={selectedCloudProvider.name}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cloudProviders.map(provider => (
                    <SelectItem key={provider.name} value={provider.name}>
                      {provider.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="multi">Multi-Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">How can we help?</Label>
              <Textarea id="message" placeholder="Tell us about your cloud requirements" />
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700" 
              onClick={() => {
                toast.success("Your request has been submitted successfully!");
                setShowContactModal(false);
              }}
            >
              Submit Request
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowContactModal(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="mb-16" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 max-w-3xl mx-auto bg-black/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-4">Enterprise Multi-Cloud Management</h2>
                <p className="text-white/70 mb-6">
                  Mindscape's unified cloud platform provides centralized management across AWS, Azure, and Google Cloud, delivering the flexibility of multi-cloud with the simplicity of a single control plane.
                </p>
                <ul className="space-y-3">
                  {[
                    "Single pane of glass for managing all cloud resources",
                    "Automated cost optimization across providers",
                    "Unified security and compliance enforcement",
                    "Cross-cloud backup and disaster recovery",
                    "Intelligent workload placement and migration"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="bg-black/30 border border-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400">99.99%</div>
                    <div className="text-xs text-white/60 mt-1">Platform Uptime</div>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400">42%</div>
                    <div className="text-xs text-white/60 mt-1">Avg. Cost Savings</div>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400">5,800+</div>
                    <div className="text-xs text-white/60 mt-1">Active Deployments</div>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl blur opacity-30"></div>
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="p-1">
                  <img 
                    src="/images/cloud-dashboard.webp" 
                    alt="Cloud Dashboard" 
                    className="rounded-lg w-full h-auto"
                    width={600}
                    height={400}
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400/0f172a/4b9be5?text=Cloud+Management+Console"
                    }}
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium">All Systems Operational</span>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Live Demo</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Multi-Cloud Capabilities */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-10">Multi-Cloud Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-black/30 border border-white/10 rounded-xl p-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
                    <Settings className="h-7 w-7 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Unified Resource Management</h3>
                <p className="text-sm text-white/70 text-center mb-4">
                  Centrally provision, monitor, and manage resources across AWS, Azure, and Google Cloud from a single interface.
                </p>
                <div className="space-y-2">
                  {["VMs", "Containers", "Serverless", "Storage", "Networking"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-black/30 border border-white/10 rounded-xl p-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
                    <BarChart className="h-7 w-7 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Cost Optimization</h3>
                <p className="text-sm text-white/70 text-center mb-4">
                  AI-powered cost analysis and optimization that identifies savings opportunities across all your cloud providers.
                </p>
                <div className="space-y-2">
                  {["Right-sizing", "Reserved Instances", "Spot Instances", "Idle Resource Detection", "Budgeting"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-black/30 border border-white/10 rounded-xl p-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
                    <Lock className="h-7 w-7 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Security & Compliance</h3>
                <p className="text-sm text-white/70 text-center mb-4">
                  Unified security policies and continuous compliance monitoring across your entire multi-cloud estate.
                </p>
                <div className="space-y-2">
                  {["CSPM", "IAM Governance", "Vulnerability Management", "Network Security", "Compliance Monitoring"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cloudFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className="bg-black/40 border-white/10 hover:border-blue-500/50 transition-colors duration-300">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        {/* New Interactive Dashboard Tab */}
        <TabsContent value="dashboard" className="mt-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Cloud Resource Dashboard</CardTitle>
                    <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                  </div>
                  <CardDescription>Real-time monitoring of your cloud environment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Resource Utilization */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Resource Utilization</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPU Utilization</span>
                          <span>{Math.round(usageMetrics.cpuUtilization)}%</span>
                        </div>
                        <Progress value={usageMetrics.cpuUtilization} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Memory Usage</span>
                          <span>{Math.round(usageMetrics.memoryUsage)}%</span>
                        </div>
                        <Progress value={usageMetrics.memoryUsage} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Storage Used</span>
                          <span>{usageMetrics.storageUsed.toFixed(1)} TB / 10 TB</span>
                        </div>
                        <Progress value={usageMetrics.storageUsed * 10} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Network Stats */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Network Performance</h3>
                    <div className="flex gap-4">
                      <div className="flex-1 bg-black/30 border border-white/10 rounded-lg p-4">
                        <div className="text-xs text-white/70 mb-1">Bandwidth</div>
                        <div className="text-xl font-bold">{Math.round(usageMetrics.networkBandwidth)} Mbps</div>
                        <div className="h-12 mt-2 flex items-end">
                          {[...Array(8)].map((_, idx) => (
                            <div 
                              key={idx}
                              className="flex-1 mx-0.5 bg-blue-500/60 rounded-t-sm"
                              style={{ 
                                height: `${Math.min(100, Math.max(15, 40 + Math.sin(idx + Date.now() / 1000) * 30))}%`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 bg-black/30 border border-white/10 rounded-lg p-4">
                        <div className="text-xs text-white/70 mb-1">Active Instances</div>
                        <div className="text-xl font-bold">{usageMetrics.activeInstances}</div>
                        <div className="mt-2 grid grid-cols-4 gap-1">
                          {[...Array(usageMetrics.activeInstances)].map((_, idx) => (
                            <div key={idx} className="h-2.5 w-2.5 bg-blue-500/60 rounded-sm"></div>
                          ))}
                          {[...Array(16 - usageMetrics.activeInstances)].map((_, idx) => (
                            <div key={idx} className="h-2.5 w-2.5 bg-white/10 rounded-sm"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cloud Spend */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium">Monthly Cloud Spend</h3>
                      <Select defaultValue={selectedCloudProvider.name}>
                        <SelectTrigger className="h-8 w-[140px] text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cloudProviders.map(provider => (
                            <SelectItem key={provider.name} value={provider.name}>
                              {provider.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="all">All Providers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-3xl font-bold">${usageMetrics.monthlySpend.toLocaleString()}</div>
                          <div className="text-xs text-green-400 mt-1">
                            <ArrowRight className="h-3 w-3 inline rotate-[-45deg] mr-0.5" />
                            12% under budget
                          </div>
                        </div>
                        <div className="h-16 w-32">
                          <div className="h-full flex items-end">
                            {[...Array(6)].map((_, idx) => (
                              <div 
                                key={idx}
                                className="flex-1 mx-0.5 rounded-t-sm"
                                style={{ 
                                  height: `${30 + idx * 10}%`,
                                  backgroundColor: idx === 4 ? 'rgba(96, 165, 250, 0.7)' : 'rgba(59, 130, 246, 0.3)'
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Resource Allocation Controls */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Resource Allocation</h3>
                    <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="compute" className="text-sm">Compute Allocation</Label>
                            <span className="text-sm">{resourceAllocation.compute} vCPUs</span>
                          </div>
                          <Slider 
                            id="compute"
                            min={4} 
                            max={128}
                            step={4}
                            value={[resourceAllocation.compute]}
                            onValueChange={(value) => setResourceAllocation(prev => ({ ...prev, compute: value[0] }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="storage" className="text-sm">Storage Allocation</Label>
                            <span className="text-sm">{resourceAllocation.storage} TB</span>
                          </div>
                          <Slider 
                            id="storage"
                            min={10} 
                            max={200}
                            step={10}
                            value={[resourceAllocation.storage]}
                            onValueChange={(value) => setResourceAllocation(prev => ({ ...prev, storage: value[0] }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="network" className="text-sm">Network Bandwidth</Label>
                            <span className="text-sm">{resourceAllocation.network} Gbps</span>
                          </div>
                          <Slider 
                            id="network"
                            min={5} 
                            max={100}
                            step={5}
                            value={[resourceAllocation.network]}
                            onValueChange={(value) => setResourceAllocation(prev => ({ ...prev, network: value[0] }))}
                          />
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => toast.success("Resource allocation updated successfully!")}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Apply Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle>Health Status</CardTitle>
                  <CardDescription>Cloud service status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { service: "Compute Services", status: "Operational", icon: CpuIcon },
                      { service: "Storage Services", status: "Operational", icon: HardDrive },
                      { service: "Database Services", status: "Operational", icon: Database },
                      { service: "Network Services", status: "Operational", icon: Network },
                      { service: "Security Services", status: "Maintenance", icon: Shield }
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between p-2 border rounded-lg ${
                          item.status === "Operational" 
                            ? "border-green-500/30 bg-green-500/5" 
                            : "border-yellow-500/30 bg-yellow-500/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className={`h-4 w-4 ${
                            item.status === "Operational" 
                              ? "text-green-400" 
                              : "text-yellow-400"
                          }`} />
                          <span className="text-sm">{item.service}</span>
                        </div>
                        <Badge className={`${
                          item.status === "Operational" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4 border-white/10">
                    View Status Page
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle>Alerts</CardTitle>
                  <CardDescription>Recent system notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <BadgeAlert className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">Auto-scaling triggered</div>
                        <div className="text-xs text-white/70 mt-0.5">Compute cluster scaled up to handle increased load</div>
                        <div className="text-xs text-white/50 mt-1">10 minutes ago</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <BadgeAlert className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">Budget threshold reached</div>
                        <div className="text-xs text-white/70 mt-0.5">Monthly cloud spend reached 85% of budget</div>
                        <div className="text-xs text-white/50 mt-1">2 hours ago</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-white/10 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <BadgeAlert className="h-5 w-5 text-white/60 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">Security scan completed</div>
                        <div className="text-xs text-white/70 mt-0.5">No vulnerabilities detected</div>
                        <div className="text-xs text-white/50 mt-1">Yesterday</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="pricing" className="mt-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Cloud Platform Pricing</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70">Monthly</span>
              <Switch 
                checked={isAnnualBilling} 
                onCheckedChange={setIsAnnualBilling}
              />
              <span className="text-sm text-white/70">Annual <Badge className="ml-1 bg-blue-500/20 text-blue-400">Save 20%</Badge></span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className={`h-full ${tier.highlighted ? 'bg-gradient-to-b from-blue-900/40 to-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-500/10' : 'bg-black/40 border-white/10'}`}>
                  <CardHeader>
                    <Badge className={tier.highlighted ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70'} variant="secondary">
                      {tier.highlighted ? 'Most Popular' : tier.name}
                    </Badge>
                    <CardTitle className="text-2xl mt-4">{tier.name}</CardTitle>
                    <div className="mt-2">
                      {tier.price !== "Custom" ? (
                        <>
                          <span className="text-3xl font-bold">
                            {isAnnualBilling 
                              ? tier.price.startsWith("$") 
                                ? `$${(parseInt(tier.price.slice(1).replace(",", "")) * 0.8).toLocaleString()}`
                                : tier.price
                              : tier.price}
                          </span>
                          <span className="text-white/60 ml-1">{tier.price !== "Custom" && `/${isAnnualBilling ? 'year' : 'month'}`}</span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold">{tier.price}</span>
                      )}
                    </div>
                    <CardDescription className="text-white/70 mt-2">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className={`h-5 w-5 mt-0.5 mr-2 flex-shrink-0 ${tier.highlighted ? 'text-blue-400' : 'text-white/60'}`} />
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full mt-6 ${tier.highlighted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10 hover:bg-white/20'}`}>
                      {tier.price === "Custom" ? (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Contact Sales
                        </>
                      ) : (
                        <>
                          <Server className="mr-2 h-4 w-4" />
                          Get Started
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        {/* Resource Center Tab */}
        <TabsContent value="resources" className="mt-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Cloud Resources</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore our comprehensive library of resources to help you maximize the value of your cloud investment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Multi-Cloud Migration Guide",
                description: "Step-by-step playbook for migrating workloads across cloud providers",
                icon: RefreshCw,
                type: "Guide",
                downloadable: true
              },
              {
                title: "Cloud Cost Optimization",
                description: "Strategies to reduce cloud spend by up to 40% without sacrificing performance",
                icon: PieChart,
                type: "Whitepaper",
                downloadable: true
              },
              {
                title: "Security Best Practices",
                description: "Essential security configurations and policies for enterprise cloud environments",
                icon: Shield,
                type: "Checklist",
                downloadable: true
              },
              {
                title: "Video: Cloud Platform Demo",
                description: "15-minute walkthrough of key platform features and capabilities",
                icon: Globe,
                type: "Video",
                downloadable: false
              },
              {
                title: "DevOps Integration Guide",
                description: "Connecting CI/CD pipelines with our cloud management platform",
                icon: Code,
                type: "Tutorial",
                downloadable: true
              },
              {
                title: "Cloud Architecture Patterns",
                description: "Reference architectures for common enterprise workloads",
                icon: Layers,
                type: "Templates",
                downloadable: true
              }
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className="bg-black/40 border-white/10 hover:border-blue-500/30 transition-all">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit bg-blue-500/10 text-blue-400 mb-2">{resource.type}</Badge>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 mb-4">{resource.description}</CardDescription>
                    <Button 
                      variant={resource.downloadable ? "default" : "outline"} 
                      className={resource.downloadable ? "bg-blue-600 hover:bg-blue-700 w-full" : "border-blue-500/20 w-full"}
                    >
                      {resource.downloadable ? (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Download PDF
                        </>
                      ) : (
                        <>
                          <Globe className="mr-2 h-4 w-4" />
                          Watch Video
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Need expert guidance?</h3>
                <p className="text-white/70">
                  Schedule a 1:1 consultation with a cloud architect to discuss your specific requirements
                </p>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowContactModal(true)}>
                <Users className="mr-2 h-4 w-4" />
                Book a Consultation
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 