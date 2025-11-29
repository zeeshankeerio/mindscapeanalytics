"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Brain, 
  MessageSquare, 
  ArrowRight, 
  Database, 
  Zap, 
  Code, 
  Lock,
  BarChart,
  Users,
  FileText,
  Cpu,
  Network,
  Layers,
  Cloud,
  Workflow,
  Shield,
  Sparkles,
  Bot,
  Microscope,
  Palette,
  Globe,
  Clock,
  User,
  Paperclip,
  Mic,
  Image,
  Upload,
  Search,
  Play,
  Pause,
  Download,
  Share,
  Copy,
  Check,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Add these type definitions before the component
interface AnalysisResult {
  toxicity: number;
  bias: number;
  hateSpeech: number;
  misinformation: number;
}

interface SearchResult {
  title: string;
  match: number;
  content: string;
}

interface AgentActivity {
  agent: string;
  status: string;
  action: string;
  progress?: number;
}

export default function GenAISolutionsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [promptInput, setPromptInput] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)
  const [promptVars, setPromptVars] = useState({
    tone: "professional",
    product: "AI assistant",
    key_feature: "natural language understanding"
  })
  const [selectedModel, setSelectedModel] = useState("MindscapeGPT-4.5")
  const [isCopied, setIsCopied] = useState(false)
  const [isShared, setIsShared] = useState(false)
  const [activeDemo, setActiveDemo] = useState("text")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [transcriptionText, setTranscriptionText] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [translatedText, setTranslatedText] = useState("")
  const [contentToAnalyze, setContentToAnalyze] = useState("")
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null)
  const [taskDescription, setTaskDescription] = useState("")
  const [agentStatus, setAgentStatus] = useState({
    research: "waiting",
    analysis: "waiting",
    output: "waiting"
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [trainingConfig, setTrainingConfig] = useState({
    baseModel: "MindscapeGPT-4.5",
    trainingData: "Company Documentation",
    epochs: 3,
    learningRate: 0.5,
    batchSize: 2
  })
  const [trainingProgress, setTrainingProgress] = useState({
    dataPreparation: "complete",
    modelFineTuning: 0.66,
    evaluation: "pending"
  })
  
  // Add agentActivities state
  const [agentActivities, setAgentActivities] = useState<AgentActivity[]>([
    { agent: "Research Agent", status: "waiting", action: "Gathering information...", progress: 0 },
    { agent: "Analysis Agent", status: "waiting", action: "Analyzing data...", progress: 0 },
    { agent: "Output Agent", status: "waiting", action: "Preparing response...", progress: 0 }
  ]);
  
  // Function to handle demo interactions
  const handleDemoInteraction = (demoType: string, action: string) => {
    switch(demoType) {
      case "multimodal":
        if (action === "upload") {
          // Simulate image upload
          setUploadedImage("sample-image.jpg")
          toast.success("Image uploaded successfully")
        } else if (action === "record") {
          setIsRecording(!isRecording)
          if (!isRecording) {
            toast.info("Recording started")
            // Simulate recording after 3 seconds
            setTimeout(() => {
              setIsRecording(false)
              setTranscriptionText("This is a simulated transcription of your speech about AI technology.")
              toast.success("Recording completed")
            }, 3000)
          } else {
            toast.info("Recording stopped")
          }
        }
        break
      case "contextual":
        if (action === "generate") {
          setIsGenerating(true)
          // Simulate generation after 1.5 seconds
          setTimeout(() => {
            setGeneratedContent("Based on our conversation about Japan, I recommend considering the Japan Rail Pass for efficient travel between cities. The pass offers unlimited travel on most JR trains, including the Shinkansen, for a fixed period. For local transit in Tokyo, an IC card like Suica or Pasmo would be convenient. Would you like specific information about transportation in any particular city?")
            setIsGenerating(false)
            toast.success("Response generated")
          }, 1500)
        }
        break
      case "multilingual":
        if (action === "translate") {
          // Simulate translation
          setTranslatedText("これはAIテクノロジーに関する翻訳されたテキストです。")
          toast.success("Text translated successfully")
        }
        break
      case "ethical":
        if (action === "analyze") {
          // Simulate content analysis
          setAnalysisResults({
            toxicity: 0.25,
            bias: 0.2,
            hateSpeech: 0.1,
            misinformation: 0.15
          })
          toast.success("Content analysis completed")
        }
        break
      case "realtime":
        if (action === "generate") {
          setIsGenerating(true)
          // Simulate real-time generation
          setTimeout(() => {
            setGeneratedContent("Here's a real-time generated response to your query about AI applications in healthcare. The model processed your request in just 42ms, demonstrating our platform's exceptional performance.")
            setIsGenerating(false)
            toast.success("Response generated in 42ms")
          }, 100)
        }
        break
      case "agent":
        if (action === "execute") {
          // Simulate agent workflow
          setAgentStatus({
            research: "active",
            analysis: "waiting",
            output: "waiting"
          })
          
          // Update agent activities for UI
          setAgentActivities([
            { agent: "Research Agent", status: "active", action: "Gathering information...", progress: 10 },
            { agent: "Analysis Agent", status: "waiting", action: "Waiting for research...", progress: 0 },
            { agent: "Output Agent", status: "waiting", action: "Waiting for analysis...", progress: 0 }
          ]);
          
          // Simulate research agent completing
          setTimeout(() => {
            setAgentStatus({
              research: "complete",
              analysis: "active",
              output: "waiting"
            })
            
            // Update agent activities for UI
            setAgentActivities([
              { agent: "Research Agent", status: "complete", action: "Information gathered successfully", progress: 100 },
              { agent: "Analysis Agent", status: "active", action: "Processing data and identifying patterns...", progress: 30 },
              { agent: "Output Agent", status: "waiting", action: "Waiting for analysis...", progress: 0 }
            ]);
            
            // Simulate analysis agent completing
            setTimeout(() => {
              setAgentStatus({
                research: "complete",
                analysis: "complete",
                output: "active"
              })
              
              // Update agent activities for UI
              setAgentActivities([
                { agent: "Research Agent", status: "complete", action: "Information gathered successfully", progress: 100 },
                { agent: "Analysis Agent", status: "complete", action: "Analysis completed with high confidence", progress: 100 },
                { agent: "Output Agent", status: "active", action: "Generating recommendations...", progress: 60 }
              ]);
              
              // Simulate output agent completing
              setTimeout(() => {
                setAgentStatus({
                  research: "complete",
                  analysis: "complete",
                  output: "complete"
                })
                
                // Update agent activities for UI
                setAgentActivities([
                  { agent: "Research Agent", status: "complete", action: "Information gathered successfully", progress: 100 },
                  { agent: "Analysis Agent", status: "complete", action: "Analysis completed with high confidence", progress: 100 },
                  { agent: "Output Agent", status: "complete", action: "Response generated and optimized", progress: 100 }
                ]);
                
                setGeneratedContent("Based on our research and analysis, here's a comprehensive plan for implementing AI in your customer service workflow. The solution includes natural language processing for query understanding, sentiment analysis for customer satisfaction monitoring, and automated response generation for common inquiries.")
                toast.success("Task completed by AI agents")
              }, 1500)
            }, 1500)
          }, 1500)
        }
        break
      case "knowledge":
        if (action === "query") {
          // Simulate knowledge base query
          setSearchResults([
            { title: "Document Title", match: 0.98, content: "This document contains highly relevant information matching your query..." },
            { title: "Another Document", match: 0.87, content: "This document contains relevant information related to your search..." },
            { title: "Third Document", match: 0.76, content: "This document contains somewhat relevant information for your query..." }
          ])
          toast.success("Knowledge base queried successfully")
        }
        break
      case "training":
        if (action === "start") {
          // Simulate model training
          toast.info("Training started")
          setTrainingProgress({
            dataPreparation: "complete",
            modelFineTuning: 0.1,
            evaluation: "pending"
          })
          
          // Simulate training progress
          const interval = setInterval(() => {
            setTrainingProgress(prev => {
              if (prev.modelFineTuning >= 1) {
                clearInterval(interval)
                return {
                  dataPreparation: "complete",
                  modelFineTuning: 1,
                  evaluation: "complete"
                }
              }
              return {
                ...prev,
                modelFineTuning: Math.min(prev.modelFineTuning + 0.1, 1)
              }
            })
          }, 500)
          
          // Complete training after 5 seconds
          setTimeout(() => {
            clearInterval(interval)
            setTrainingProgress({
              dataPreparation: "complete",
              modelFineTuning: 1,
              evaluation: "complete"
            })
            toast.success("Model training completed")
          }, 5000)
        }
        break
      case "vector":
        if (action === "search") {
          // Simulate vector search
          setSearchResults([
            { title: "Document Title", match: 0.98, content: "This document contains highly relevant information matching your query..." },
            { title: "Another Document", match: 0.87, content: "This document contains relevant information related to your search..." },
            { title: "Third Document", match: 0.76, content: "This document contains somewhat relevant information for your query..." }
          ])
          toast.success("Vector search completed")
        }
        break
      case "prompt":
        if (action === "generate") {
          // Simulate prompt generation
          setGeneratedContent("Create a professional marketing email for our new AI-powered fitness tracker that highlights its adaptive coaching capabilities.")
          toast.success("Prompt generated")
        }
        break
      default:
        break
    }
  }
  
  // Function to copy content to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    toast.success("Copied to clipboard")
    setTimeout(() => setIsCopied(false), 2000)
  }
  
  // Function to share content
  const shareContent = () => {
    setIsShared(true)
    toast.success("Content shared")
    setTimeout(() => setIsShared(false), 2000)
  }
  
  // Function to handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedImage(URL.createObjectURL(file))
      toast.success("Image uploaded successfully")
    }
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Advanced AI</Badge>
              <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">PaaS</Badge>
              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Enterprise Ready</Badge>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Real-Time</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
                Next-Gen AI
              </span>{" "}
              <br />Platform
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Deploy cutting-edge AI models instantly with our comprehensive Platform-as-a-Service solution. 
              Enterprise-grade infrastructure with real-time capabilities and unmatched performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white border-none">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 backdrop-blur-sm">
                View Live Demo
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-purple-600 border-2 border-black flex items-center justify-center text-xs text-white font-medium">
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/70">
                <span className="text-white font-medium">2500+</span> enterprises already using our platform
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
            <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl overflow-hidden">
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              <div className="pt-3 pb-2 px-2 bg-black/60 rounded-t-lg border-b border-white/10 mb-4 flex items-center">
                <div className="flex-1 overflow-hidden">
                  <div className="animate-pulse bg-white/5 h-4 w-3/4 rounded"></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-500">Live</span>
                </div>
              </div>
              
              <div className="aspect-video rounded-lg overflow-hidden bg-black/70 border border-white/5 mb-4 flex flex-col items-center justify-center p-4">
                <div className="w-full overflow-hidden">
                  <div className="typewriter w-full font-mono text-sm text-white/80 mb-2">
                    <p className="mb-1">{'>'} Summarize the latest AI trends</p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="bg-black/40 rounded p-2"
                    >
                      <p className="text-green-400 mb-1">1. Multimodal AI models integrating text, vision, and audio</p>
                      <p className="text-green-400 mb-1">2. Real-time processing for immediate insights</p>
                      <p className="text-green-400">3. Enterprise-specific fine-tuning with proprietary data</p>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 1.5 }}
                    className="h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full mt-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center justify-center bg-black/30 p-2 rounded-lg border border-white/5">
                  <div className="text-sm font-mono text-white mb-1">99.8%</div>
                  <div className="text-xs text-white/50">Accuracy</div>
                </div>
                <div className="flex flex-col items-center justify-center bg-black/30 p-2 rounded-lg border border-white/5">
                  <div className="text-sm font-mono text-white mb-1">42ms</div>
                  <div className="text-xs text-white/50">Latency</div>
                </div>
                <div className="flex flex-col items-center justify-center bg-black/30 p-2 rounded-lg border border-white/5">
                  <div className="text-sm font-mono text-white mb-1">12B+</div>
                  <div className="text-xs text-white/50">Parameters</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 max-w-2xl mx-auto bg-black/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Enterprise GenAI Platform</h2>
                <p className="text-white/70 mb-6">
                  Our comprehensive GenAI Platform-as-a-Service combines cutting-edge large language models with 
                  enterprise-grade security, scalability, and customization capabilities to help businesses 
                  across all industries revolutionize their operations.
                </p>
                <p className="text-white/70 mb-6">
                  From content generation and analysis to process automation and customer engagement,
                  our AI platform is designed to solve real business challenges while ensuring
                  data privacy, compliance, and seamless integration with your existing infrastructure.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-4xl font-bold text-red-500 mb-2">99.9%</div>
                    <div className="text-sm text-white/70">System Uptime</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-4xl font-bold text-red-500 mb-2">45%</div>
                    <div className="text-sm text-white/70">Avg. Productivity Boost</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-4xl font-bold text-red-500 mb-2">30+</div>
                    <div className="text-sm text-white/70">Enterprise Customers</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
                    <div className="text-sm text-white/70">Expert Support</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Brain className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Advanced LLM Architecture</h3>
                    <p className="text-white/70">
                      Our proprietary large language models are trained on diverse datasets and fine-tuned for specific business domains to deliver optimal results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Database className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Custom Training & Fine-tuning</h3>
                    <p className="text-white/70">
                      Tailor our models to your specific business needs with custom training on your proprietary data and domain-specific fine-tuning.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Zap className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Enterprise-ready Deployment</h3>
                    <p className="text-white/70">
                      Deploy via our secure cloud API or on-premise solutions with enterprise-grade security, compliance controls, and scalable infrastructure.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Cpu className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Optimized Inference Engine</h3>
                    <p className="text-white/70">
                      High-performance inference engine with hardware acceleration support for faster response times and lower operational costs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Network className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">API-First Architecture</h3>
                    <p className="text-white/70">
                      Comprehensive REST and GraphQL APIs with SDKs for all major programming languages and frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Platform Architecture */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Platform Architecture</h3>
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Layers className="h-5 w-5 text-blue-500" />
                      </div>
                      <h4 className="font-medium text-white">Infrastructure Layer</h4>
                    </div>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span>Scalable cloud infrastructure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span>Global edge deployment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span>On-premise options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span>Auto-scaling capabilities</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Brain className="h-5 w-5 text-purple-500" />
                      </div>
                      <h4 className="font-medium text-white">AI Model Layer</h4>
                    </div>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                        <span>Multiple model architectures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                        <span>Continuous model updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                        <span>Custom model training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                        <span>Model versioning & A/B testing</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-red-500/10 rounded-lg">
                        <Workflow className="h-5 w-5 text-red-500" />
                      </div>
                      <h4 className="font-medium text-white">Application Layer</h4>
                    </div>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>Pre-built AI applications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>Custom app development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>Integration frameworks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>Workflow automation</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Shield className="h-5 w-5 text-green-500" />
                      </div>
                      <h4 className="font-medium text-white">Security & Compliance</h4>
                    </div>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>End-to-end encryption</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>SOC 2 Type II certified</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>GDPR, CCPA, HIPAA compliant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>Data residency options</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Code className="h-5 w-5 text-yellow-500" />
                      </div>
                      <h4 className="font-medium text-white">Developer Experience</h4>
                    </div>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <span>Comprehensive SDKs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <span>Developer portal & documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <span>CI/CD integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <span>Sandbox environment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Features Tab */}
          <TabsContent value="features" className="mt-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Advanced GenAI Features</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Discover the cutting-edge capabilities that make our generative AI platform industry-leading.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-2">
                  {[
                    "Multimodal Capabilities", 
                    "Contextual Understanding", 
                    "Multilingual Support", 
                    "Ethical AI Framework", 
                    "Real-time Processing",
                    "Agent Orchestration",
                    "Knowledge Integration",
                    "Custom Model Training",
                    "Vector Search & Embeddings",
                    "Prompt Engineering Tools"
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedFeature === index
                          ? "bg-red-500/10 border border-red-500/20 text-white"
                          : "bg-black/20 border border-white/5 text-white/70 hover:bg-black/30"
                      }`}
                      onClick={() => setSelectedFeature(index)}
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {[
                      "Multimodal Capabilities", 
                      "Contextual Understanding", 
                      "Multilingual Support", 
                      "Ethical AI Framework", 
                      "Real-time Processing",
                      "Agent Orchestration",
                      "Knowledge Integration",
                      "Custom Model Training",
                      "Vector Search & Embeddings",
                      "Prompt Engineering Tools"
                    ][selectedFeature]}
                  </h3>
                  
                  <div className="aspect-video bg-black/50 rounded-lg mb-6 flex items-center justify-center">
                    <Brain className="h-16 w-16 text-red-500/40" />
                  </div>
                  
                  <p className="text-white/70 mb-4">
                    {[
                      "Process and generate content across multiple modalities including text, images, and audio. Our AI can understand the relationships between different types of data to provide comprehensive insights and creative outputs.",
                      "Our models maintain context over extended conversations and documents, enabling deeper understanding and more coherent responses even in complex, multi-turn interactions.",
                      "Support for 95+ languages with near-native fluency, enabling global deployment and localized content generation with cultural nuances preserved.",
                      "Built-in safeguards against bias, harmful content, and misuse, with transparent operations and governance controls that align with your organizational values.",
                      "Process and generate responses in milliseconds, enabling real-time applications like live customer support, dynamic content creation, and interactive experiences.",
                      "Create and orchestrate AI agents that can work together to solve complex tasks, with built-in memory, planning, and tool-use capabilities.",
                      "Seamlessly integrate your proprietary knowledge bases, documents, and data sources with our AI models for accurate, domain-specific responses.",
                      "Train custom models on your proprietary data with our intuitive training pipeline, including data preparation, model selection, and performance evaluation tools.",
                      "Powerful vector search capabilities with pre-trained embeddings for semantic search, recommendation systems, and content similarity analysis.",
                      "Advanced prompt engineering tools with templates, versioning, and A/B testing to optimize your AI interactions and improve response quality."
                    ][selectedFeature]}
                  </p>
                  
                  {/* Interactive Demo Section */}
                  <div className="mt-8 border border-white/10 rounded-lg overflow-hidden">
                    <div className="bg-black/30 p-4 border-b border-white/10 flex items-center justify-between">
                      <h4 className="font-medium text-white">Live Demo</h4>
                      <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                    </div>
                    
                    <div className="p-4">
                      {/* Multimodal Capabilities Demo */}
                      {selectedFeature === 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                              <Image className="h-8 w-8 text-purple-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Image Analysis</h5>
                              <p className="text-sm text-white/70">Upload an image to analyze its content</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                              <div className="text-sm text-white/50 mb-2">Input</div>
                              {uploadedImage ? (
                                <div className="h-32 rounded bg-black/50 flex items-center justify-center overflow-hidden relative">
                                  <img src={uploadedImage} alt="Uploaded" className="max-h-full max-w-full object-contain" />
                                  <button 
                                    onClick={() => setUploadedImage(null)}
                                    className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-white/70 hover:text-white"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <label className="h-32 rounded bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                  />
                                  <Upload className="h-6 w-6 text-white/30" />
                                </label>
                              )}
                            </div>
                            <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                              <div className="text-sm text-white/50 mb-2">Analysis</div>
                              <div className="h-32 rounded bg-black/50 p-3 text-sm text-white/70 overflow-y-auto">
                                {uploadedImage ? (
                                  <div>
                                    <p className="mb-2">Image Analysis Results:</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                      <li>Primary subject: Person</li>
                                      <li>Setting: Office environment</li>
                                      <li>Objects detected: Computer, desk, chair</li>
                                      <li>Colors: Blue, white, gray</li>
                                      <li>Estimated confidence: 94%</li>
                                    </ul>
                                  </div>
                                ) : (
                                  <p>Upload an image to see AI-powered analysis of its content, objects, and context.</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                              <Mic className="h-8 w-8 text-red-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Speech Recognition</h5>
                              <p className="text-sm text-white/70">Convert speech to text in real-time</p>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`h-2 w-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-red-500/50'}`}></div>
                              <span className="text-sm text-white/70">{isRecording ? 'Recording in progress...' : 'Click to start recording'}</span>
                            </div>
                            <div className="h-16 rounded bg-black/50 p-3 text-sm text-white/70 flex items-center justify-center">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className={`border-white/10 text-white ${isRecording ? 'bg-red-500/20 border-red-500/30' : ''}`}
                                onClick={() => handleDemoInteraction("multimodal", "record")}
                              >
                                {isRecording ? 'Stop Recording' : 'Start Recording'}
                              </Button>
                            </div>
                            {transcriptionText && (
                              <div className="mt-3 p-2 bg-black/50 rounded text-sm text-white/70">
                                <p className="font-medium mb-1">Transcription:</p>
                                <p>{transcriptionText}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Contextual Understanding Demo */}
                      {selectedFeature === 1 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                              <MessageSquare className="h-8 w-8 text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Conversation Memory</h5>
                              <p className="text-sm text-white/70">Experience context-aware responses</p>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="space-y-3">
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                                  <User className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-white/90">I'm planning a trip to Japan next month. What should I pack?</p>
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 flex-shrink-0">
                                  <Brain className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <div className="bg-black/30 rounded-lg p-3 text-white/80">
                                    <p>For a trip to Japan, consider packing:</p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                      <li>Lightweight, breathable clothing suitable for the season</li>
                                      <li>Comfortable walking shoes</li>
                                      <li>Power adapter (Japan uses Type A/B plugs, 100V)</li>
                                      <li>Portable WiFi or SIM card</li>
                                      <li>Basic Japanese phrases guide</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                                  <User className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-white/90">What about transportation within Japan?</p>
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 flex-shrink-0">
                                  <Brain className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <div className="bg-black/30 rounded-lg p-3 text-white/80">
                                    <p>For transportation in Japan:</p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                      <li>Japan Rail Pass is highly recommended for inter-city travel</li>
                                      <li>IC cards like Suica or Pasmo are convenient for local transit</li>
                                      <li>Trains are punctual and extensive throughout the country</li>
                                      <li>Consider booking Shinkansen tickets in advance during peak seasons</li>
                                    </ul>
                                    <p className="mt-2">Would you like specific information about any particular city's transportation system?</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                                  <User className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex gap-2">
                                    <Input 
                                      placeholder="Ask a follow-up question..." 
                                      className="bg-black/50 border-white/10 text-white"
                                      value={promptInput}
                                      onChange={(e) => setPromptInput(e.target.value)}
                                    />
                                    <Button 
                                      size="sm" 
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                      onClick={() => handleDemoInteraction("contextual", "generate")}
                                      disabled={isGenerating || !promptInput}
                                    >
                                      {isGenerating ? (
                                        <div className="flex items-center gap-1">
                                          <div className="h-3 w-3 rounded-full bg-white/70 animate-pulse"></div>
                                          <span>Generating...</span>
                                        </div>
                                      ) : 'Ask'}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              
                              {generatedContent && (
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 flex-shrink-0">
                                    <Brain className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="bg-black/30 rounded-lg p-3 text-white/80">
                                      <p>{generatedContent}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Multilingual Support Demo */}
                      {selectedFeature === 2 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                              <Globe className="h-8 w-8 text-green-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Language Translation</h5>
                              <p className="text-sm text-white/70">Translate between 95+ languages with cultural context</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm text-white/50">Source</div>
                                <select 
                                  className="bg-black/50 border border-white/10 rounded text-xs text-white/70 px-2 py-1"
                                  value={selectedLanguage}
                                  onChange={(e) => setSelectedLanguage(e.target.value)}
                                >
                                  <option>English</option>
                                  <option>Spanish</option>
                                  <option>French</option>
                                  <option>German</option>
                                  <option>Japanese</option>
                                  <option>Chinese</option>
                                  <option>Russian</option>
                                  <option>Arabic</option>
                                </select>
                              </div>
                              <textarea 
                                className="w-full h-32 bg-black/50 border border-white/10 rounded p-2 text-white/70 text-sm resize-none"
                                placeholder="Enter text to translate..."
                                value={promptInput}
                                onChange={(e) => setPromptInput(e.target.value)}
                              ></textarea>
                            </div>
                            <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm text-white/50">Target</div>
                                <select 
                                  className="bg-black/50 border border-white/10 rounded text-xs text-white/70 px-2 py-1"
                                  value={selectedLanguage === "English" ? "Japanese" : "English"}
                                  onChange={(e) => {
                                    // In a real app, this would update the target language
                                    // For demo, we'll just swap with source
                                    setSelectedLanguage(e.target.value === "English" ? "Japanese" : "English")
                                  }}
                                >
                                  <option>Japanese</option>
                                  <option>English</option>
                                  <option>Spanish</option>
                                  <option>French</option>
                                  <option>German</option>
                                  <option>Chinese</option>
                                  <option>Russian</option>
                                  <option>Arabic</option>
                                </select>
                              </div>
                              <div className="w-full h-32 bg-black/50 border border-white/10 rounded p-2 text-white/70 text-sm overflow-y-auto">
                                {translatedText ? (
                                  <p>{translatedText}</p>
                                ) : (
                                  <p>Translation will appear here...</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-center">
                            <Button 
                              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                              onClick={() => handleDemoInteraction("multilingual", "translate")}
                              disabled={!promptInput}
                            >
                              Translate
                            </Button>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Cultural Context:</div>
                            <div className="bg-black/50 border border-white/10 rounded p-3 text-sm text-white/70">
                              <p className="mb-2">Our translation engine preserves cultural nuances and context:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Maintains formal/informal tone appropriate for the target language</li>
                                <li>Preserves idioms and expressions that may not have direct translations</li>
                                <li>Adapts content to be culturally appropriate and sensitive</li>
                                <li>Provides alternative translations for ambiguous terms</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Ethical AI Framework Demo */}
                      {selectedFeature === 3 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                              <Shield className="h-8 w-8 text-yellow-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Content Safety</h5>
                              <p className="text-sm text-white/70">See how our AI detects and filters harmful content</p>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-white/70">Input text for content analysis:</div>
                                <Badge className="bg-yellow-500/20 text-yellow-500">Safety Check</Badge>
                              </div>
                              <textarea 
                                className="w-full h-24 bg-black/50 border border-white/10 rounded p-2 text-white/70 text-sm resize-none"
                                placeholder="Enter text to analyze for safety..."
                                value={contentToAnalyze}
                                onChange={(e) => setContentToAnalyze(e.target.value)}
                              ></textarea>
                              <Button 
                                className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 text-white"
                                onClick={() => handleDemoInteraction("ethical", "analyze")}
                                disabled={!contentToAnalyze}
                              >
                                Analyze Content
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Safety Analysis Results:</div>
                            {analysisResults ? (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/70">Toxicity</span>
                                  <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${
                                        (analysisResults as AnalysisResult).toxicity < 0.3 ? 'bg-green-500' : 
                                        (analysisResults as AnalysisResult).toxicity < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${(analysisResults as AnalysisResult).toxicity * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/70">Bias</span>
                                  <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${
                                        (analysisResults as AnalysisResult).bias < 0.3 ? 'bg-green-500' : 
                                        (analysisResults as AnalysisResult).bias < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${(analysisResults as AnalysisResult).bias * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/70">Hate Speech</span>
                                  <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${
                                        (analysisResults as AnalysisResult).hateSpeech < 0.3 ? 'bg-green-500' : 
                                        (analysisResults as AnalysisResult).hateSpeech < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${(analysisResults as AnalysisResult).hateSpeech * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/70">Misinformation</span>
                                  <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${
                                        (analysisResults as AnalysisResult).misinformation < 0.3 ? 'bg-green-500' : 
                                        (analysisResults as AnalysisResult).misinformation < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${(analysisResults as AnalysisResult).misinformation * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div className="mt-3 p-2 bg-black/50 rounded text-sm">
                                  <p className="text-white/70 mb-1">Recommendation:</p>
                                  <p className="text-white">
                                    {(analysisResults as AnalysisResult).toxicity > 0.7 || (analysisResults as AnalysisResult).hateSpeech > 0.7 ? 
                                      "Content flagged for review. Contains potentially harmful elements." :
                                      (analysisResults as AnalysisResult).toxicity > 0.3 || (analysisResults as AnalysisResult).bias > 0.3 || (analysisResults as AnalysisResult).hateSpeech > 0.3 || (analysisResults as AnalysisResult).misinformation > 0.3 ?
                                      "Content has some concerning elements. Consider revision." :
                                      "Content appears safe and appropriate."}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/70">Toxicity</span>
                                  <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full w-1/4 bg-green-500 rounded-full"></div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/70">Bias</span>
                                  <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full w-1/5 bg-green-500 rounded-full"></div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/70">Hate Speech</span>
                                  <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full w-1/10 bg-green-500 rounded-full"></div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/70">Misinformation</span>
                                  <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full w-1/6 bg-green-500 rounded-full"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Ethical AI Framework:</div>
                            <div className="bg-black/50 border border-white/10 rounded p-3 text-sm text-white/70">
                              <p className="mb-2">Our platform implements comprehensive ethical safeguards:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Content filtering and moderation</li>
                                <li>Bias detection and mitigation</li>
                                <li>Transparency in AI decision-making</li>
                                <li>Regular audits and updates to safety measures</li>
                                <li>Compliance with global AI ethics guidelines</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Real-time Processing Demo */}
                      {selectedFeature === 4 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                              <Mic className="h-8 w-8 text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Voice Processing</h5>
                              <p className="text-sm text-white/70">Experience real-time voice-to-text conversion</p>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-white/70">Voice Input:</div>
                                <Badge className="bg-blue-500/20 text-blue-500">Live</Badge>
                              </div>
                              <div className="h-24 bg-black/50 border border-white/10 rounded p-2 text-white/70 text-sm overflow-y-auto">
                                {transcriptionText ? (
                                  <p>{transcriptionText}</p>
                                ) : (
                                  <p>Transcription will appear here...</p>
                                )}
                              </div>
                              <Button 
                                className={`w-full ${
                                  isRecording 
                                    ? 'bg-gradient-to-r from-red-600 to-pink-600' 
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                                } text-white`}
                                onClick={() => handleDemoInteraction("realtime", "toggleRecording")}
                              >
                                {isRecording ? 'Stop Recording' : 'Start Recording'}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Processing Features:</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <span>Noise Reduction</span>
                                </div>
                              </div>
                              <div className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <span>Speaker Detection</span>
                                </div>
                              </div>
                              <div className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <span>Punctuation</span>
                                </div>
                              </div>
                              <div className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <span>Language Detection</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Agent Orchestration Demo */}
                      {selectedFeature === 5 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 flex items-center justify-center">
                              <Network className="h-8 w-8 text-purple-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">AI Agent Workflow</h5>
                              <p className="text-sm text-white/70">Watch AI agents collaborate to complete complex tasks</p>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-white/70">Task Description:</div>
                                <Badge className="bg-purple-500/20 text-purple-500">Multi-Agent</Badge>
                              </div>
                              <textarea 
                                className="w-full h-24 bg-black/50 border border-white/10 rounded p-2 text-white/70 text-sm resize-none"
                                placeholder="Describe a complex task for AI agents to solve..."
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                              ></textarea>
                              <Button 
                                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                                onClick={() => handleDemoInteraction("agent", "execute")}
                                disabled={!taskDescription}
                              >
                                Execute Task
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Agent Activity:</div>
                            <div className="space-y-2">
                              {agentActivities.map((activity, index) => (
                                <div key={index} className="bg-black/50 border border-white/10 rounded p-2 text-sm">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-white/70">{activity.agent}</span>
                                    <span className="text-xs text-white/50">{activity.status}</span>
                                  </div>
                                  <p className="text-white/70">{activity.action}</p>
                                  {activity.progress && (
                                    <div className="mt-1 w-full h-1 bg-black/50 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-purple-500 rounded-full transition-all duration-300"
                                        style={{ width: `${activity.progress}%` }}
                                      ></div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Agent Capabilities:</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <span>Task Planning</span>
                                </div>
                              </div>
                              <div className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <span>Resource Allocation</span>
                                </div>
                              </div>
                              <div className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <span>Error Recovery</span>
                                </div>
                              </div>
                              <div className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <span>Progress Monitoring</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Knowledge Integration Demo */}
                      {selectedFeature === 6 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                              <Database className="h-8 w-8 text-cyan-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Knowledge Base Integration</h5>
                              <p className="text-sm text-white/70">Connect to your proprietary data sources</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                              <div className="text-sm text-white/50 mb-2">Available Knowledge Bases</div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
                                  <span className="text-sm text-white/70">Company Documentation</span>
                                  <Badge className="bg-cyan-500/20 text-cyan-500 text-xs">Connected</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
                                  <span className="text-sm text-white/70">Product Catalog</span>
                                  <Badge className="bg-cyan-500/20 text-cyan-500 text-xs">Connected</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
                                  <span className="text-sm text-white/70">Customer Support KB</span>
                                  <Badge className="bg-cyan-500/20 text-cyan-500 text-xs">Connected</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
                                  <span className="text-sm text-white/70">Research Papers</span>
                                  <Badge className="bg-cyan-500/20 text-cyan-500 text-xs">Connected</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                              <div className="text-sm text-white/50 mb-2">Query Knowledge Base</div>
                              <textarea 
                                className="w-full h-24 bg-black/50 border border-white/10 rounded p-2 text-white/70 text-sm resize-none mb-2"
                                placeholder="Ask a question about your knowledge base..."
                              ></textarea>
                              <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                                Query
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Response with Knowledge Integration:</div>
                            <div className="bg-black/50 border border-white/10 rounded p-3 text-white/70 text-sm min-h-[100px]">
                              <p>Your knowledge-enhanced response will appear here...</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Custom Model Training Demo */}
                      {selectedFeature === 7 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                              <Cpu className="h-8 w-8 text-orange-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Model Training Pipeline</h5>
                              <p className="text-sm text-white/70">Train custom models on your data</p>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-white/70">Training Configuration:</div>
                                <Badge className="bg-orange-500/20 text-orange-500">Custom</Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs text-white/50 block mb-1">Base Model</label>
                                  <select className="w-full bg-black/50 border border-white/10 rounded text-sm text-white/70 px-3 py-2">
                                    <option>MindscapeGPT-4.5</option>
                                    <option>MindscapeGPT-3.5</option>
                                    <option>CodeAssist-3</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-xs text-white/50 block mb-1">Training Data</label>
                                  <select className="w-full bg-black/50 border border-white/10 rounded text-sm text-white/70 px-3 py-2">
                                    <option>Company Documentation</option>
                                    <option>Customer Interactions</option>
                                    <option>Product Information</option>
                                  </select>
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-xs text-white/50 block mb-1">Training Parameters</label>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/70">Epochs</span>
                                    <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                      <div className="h-full w-3/4 bg-orange-500 rounded-full"></div>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/70">Learning Rate</span>
                                    <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                      <div className="h-full w-1/2 bg-orange-500 rounded-full"></div>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/70">Batch Size</span>
                                    <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                      <div className="h-full w-2/3 bg-orange-500 rounded-full"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white">
                                Start Training
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Training Progress:</div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">Data Preparation</span>
                                <Badge className="bg-green-500/20 text-green-500 text-xs">Complete</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">Model Fine-tuning</span>
                                <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                  <div className="h-full w-2/3 bg-orange-500 rounded-full"></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">Evaluation</span>
                                <Badge className="bg-yellow-500/20 text-yellow-500 text-xs">Pending</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Vector Search Demo */}
                      {selectedFeature === 8 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                              <Search className="h-8 w-8 text-pink-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Semantic Search</h5>
                              <p className="text-sm text-white/70">Find similar content using vector embeddings</p>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-white/70">Search Query:</div>
                                <Badge className="bg-pink-500/20 text-pink-500">Vector</Badge>
                              </div>
                              <input 
                                type="text" 
                                className="w-full bg-black/50 border border-white/10 rounded p-2 text-white/70 text-sm"
                                placeholder="Enter a search query..."
                              />
                              <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white">
                                Search
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Search Results:</div>
                            <div className="space-y-2">
                              <div className="p-3 rounded bg-black/30 border border-white/5">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-white">Document Title</span>
                                  <span className="text-xs text-white/50">98% match</span>
                                </div>
                                <p className="text-xs text-white/70">This document contains highly relevant information matching your query...</p>
                              </div>
                              <div className="p-3 rounded bg-black/30 border border-white/5">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-white">Another Document</span>
                                  <span className="text-xs text-white/50">87% match</span>
                                </div>
                                <p className="text-xs text-white/70">This document contains relevant information related to your search...</p>
                              </div>
                              <div className="p-3 rounded bg-black/30 border border-white/5">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-white">Third Document</span>
                                  <span className="text-xs text-white/50">76% match</span>
                                </div>
                                <p className="text-xs text-white/70">This document contains somewhat relevant information for your query...</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Prompt Engineering Demo */}
                      {selectedFeature === 9 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                              <Code className="h-8 w-8 text-violet-500" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">Prompt Templates</h5>
                              <p className="text-sm text-white/70">Create and test optimized prompts</p>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-white/70">Prompt Template:</div>
                                <Badge className="bg-violet-500/20 text-violet-500">Engineering</Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs text-white/50 block mb-1">Template Type</label>
                                  <select className="w-full bg-black/50 border border-white/10 rounded text-sm text-white/70 px-3 py-2">
                                    <option>Marketing Copy</option>
                                    <option>Technical Documentation</option>
                                    <option>Customer Support</option>
                                    <option>Creative Writing</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-xs text-white/50 block mb-1">Tone</label>
                                  <select className="w-full bg-black/50 border border-white/10 rounded text-sm text-white/70 px-3 py-2">
                                    <option>Professional</option>
                                    <option>Casual</option>
                                    <option>Friendly</option>
                                    <option>Authoritative</option>
                                  </select>
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-xs text-white/50 block mb-1">Prompt Template</label>
                                <textarea 
                                  className="w-full h-24 bg-black/50 border border-white/10 rounded p-2 text-white/70 text-sm resize-none"
                                  placeholder="Enter your prompt template with variables in {curly braces}..."
                                >Create a {promptVars.tone || 'professional'} marketing email for our new {promptVars.product || 'product'} that highlights its {promptVars.key_feature || 'key features'}.</textarea>
                              </div>
                              
                              <div>
                                <label className="text-xs text-white/50 block mb-1">Variables</label>
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <input 
                                      type="text" 
                                      className="w-full bg-black/50 border border-white/10 rounded p-2 text-white/70 text-xs"
                                      placeholder="tone"
                                    />
                                  </div>
                                  <div>
                                    <input 
                                      type="text" 
                                      className="w-full bg-black/50 border border-white/10 rounded p-2 text-white/70 text-xs"
                                      placeholder="product"
                                    />
                                  </div>
                                  <div>
                                    <input 
                                      type="text" 
                                      className="w-full bg-black/50 border border-white/10 rounded p-2 text-white/70 text-xs"
                                      placeholder="key_feature"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                                Generate Prompt
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Generated Prompt:</div>
                            <div className="bg-black/50 border border-white/10 rounded p-3 text-white/70 text-sm">
                              <p>Create a professional marketing email for our new AI-powered fitness tracker that highlights its adaptive coaching capabilities.</p>
                            </div>
                          </div>
                          
                          <div className="border border-white/10 rounded-lg p-3 bg-black/30">
                            <div className="text-sm text-white/70 mb-2">Prompt Performance:</div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">Clarity</span>
                                <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                  <div className="h-full w-4/5 bg-violet-500 rounded-full"></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">Specificity</span>
                                <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                  <div className="h-full w-3/4 bg-violet-500 rounded-full"></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">Effectiveness</span>
                                <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                                  <div className="h-full w-5/6 bg-violet-500 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h4 className="font-medium text-white mb-2">Key Benefits</h4>
                      <ul className="space-y-2 text-white/70">
                        {[
                          ["Rich multimedia content", "Enhanced user experiences", "Unified data processing"],
                          ["More natural interactions", "Reduced repetition", "Enhanced problem-solving"],
                          ["Global market reach", "Inclusive communication", "Local market insights"],
                          ["Risk mitigation", "Brand protection", "Regulatory compliance"],
                          ["Improved user satisfaction", "Operational efficiency", "Competitive advantage"],
                          ["Complex task automation", "Reduced human intervention", "Scalable workflows"],
                          ["Domain expertise", "Reduced hallucinations", "Personalized responses"],
                          ["Competitive advantage", "Domain specialization", "Proprietary AI assets"],
                          ["Semantic search", "Content recommendations", "Similarity analysis"],
                          ["Optimized responses", "Consistent outputs", "Reduced costs"]
                        ][selectedFeature].map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h4 className="font-medium text-white mb-2">Use Cases</h4>
                      <ul className="space-y-2 text-white/70">
                        {[
                          ["Content marketing", "Product design", "Educational materials"],
                          ["Customer support", "Document analysis", "Research assistance"],
                          ["Global marketing", "International support", "Cross-cultural research"],
                          ["Healthcare applications", "Financial services", "Public sector solutions"],
                          ["Live customer service", "Instant translations", "Real-time analytics"],
                          ["Customer service automation", "Research assistants", "Data analysis workflows"],
                          ["Knowledge management", "Customer support", "Research and development"],
                          ["Industry-specific solutions", "Proprietary AI models", "Competitive differentiation"],
                          ["Semantic search engines", "Recommendation systems", "Content similarity analysis"],
                          ["Customer service optimization", "Content generation", "Data extraction"]
                        ][selectedFeature].map((useCase, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Use Cases Tab */}
          <TabsContent value="use-cases" className="mt-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Industry Use Cases</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Explore how our generative AI solutions solve real-world challenges across various industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  industry: "Financial Services",
                  icon: <BarChart className="h-8 w-8 text-blue-500" />,
                  useCases: [
                    "Automated financial report generation",
                    "Personalized investment advisory",
                    "Fraud detection and prevention",
                    "Regulatory compliance documentation"
                  ]
                },
                {
                  industry: "Healthcare",
                  icon: <Users className="h-8 w-8 text-green-500" />,
                  useCases: [
                    "Medical documentation assistance",
                    "Patient communication enhancement",
                    "Research literature analysis",
                    "Clinical decision support"
                  ]
                },
                {
                  industry: "Legal",
                  icon: <FileText className="h-8 w-8 text-yellow-500" />,
                  useCases: [
                    "Contract analysis and generation",
                    "Legal research automation",
                    "Case law summarization",
                    "Compliance monitoring"
                  ]
                },
                {
                  industry: "Media & Entertainment",
                  icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
                  useCases: [
                    "Content creation and ideation",
                    "Personalized recommendation systems",
                    "Scriptwriting assistance",
                    "Automated subtitling and localization"
                  ]
                },
                {
                  industry: "E-commerce & Retail",
                  icon: <Database className="h-8 w-8 text-red-500" />,
                  useCases: [
                    "Product description generation",
                    "Personalized marketing content",
                    "Customer support automation",
                    "Sentiment analysis and trend prediction"
                  ]
                },
                {
                  industry: "Software Development",
                  icon: <Code className="h-8 w-8 text-cyan-500" />,
                  useCases: [
                    "Code generation and optimization",
                    "Documentation automation",
                    "Bug identification and fixes",
                    "Test case generation"
                  ]
                }
              ].map((item, index) => (
                <motion.div
                  key={item.industry}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full"
                >
                  <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <div className="p-2 bg-black/50 rounded-lg border border-white/5">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.industry}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {item.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/70">
                          <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="w-full mt-6 text-white hover:text-red-400 hover:bg-white/5 group">
                      View Case Studies
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Pricing Tab */}
          <TabsContent value="pricing" className="mt-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Flexible Pricing Options</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Choose the plan that best fits your organizational needs and scale as you grow.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "$499",
                  description: "Perfect for small teams and individual projects",
                  features: [
                    "Access to core GenAI models",
                    "5 million tokens per month",
                    "Standard API access",
                    "Basic support",
                    "3 user accounts"
                  ]
                },
                {
                  name: "Professional",
                  price: "$1,499",
                  description: "Ideal for growing companies with advanced needs",
                  features: [
                    "Access to all GenAI models",
                    "20 million tokens per month",
                    "Advanced API integration",
                    "Priority support",
                    "10 user accounts",
                    "Custom model fine-tuning",
                    "Enhanced security controls"
                  ],
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "Tailored solutions for large organizations",
                  features: [
                    "Unlimited access to all models",
                    "Custom token allocation",
                    "Dedicated API infrastructure",
                    "24/7 premium support",
                    "Unlimited user accounts",
                    "Advanced model customization",
                    "On-premise deployment option",
                    "Dedicated account manager",
                    "Custom security and compliance"
                  ]
                }
              ].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className={`relative bg-black/40 backdrop-blur-sm border rounded-xl overflow-hidden h-full ${
                    plan.popular 
                      ? "border-red-500/50 shadow-lg shadow-red-500/10" 
                      : "border-white/10"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-white/70">/month</span>}
                    </div>
                    <p className="text-white/70 text-sm mb-6">{plan.description}</p>
                    
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? "bg-red-600 hover:bg-red-700 text-white" 
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </div>
                  
                  <div className="p-6 border-t border-white/10">
                    <p className="text-sm font-medium text-white mb-4">Features include:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                          <div className="rounded-full bg-green-500/20 p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              className="h-3 w-3 text-green-500"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 mt-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Need a custom solution?</h3>
                  <p className="text-white/70">
                    Contact our sales team to discuss your specific requirements and get a tailored quote.
                  </p>
                </div>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap">
                  Contact Sales
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Live Demo & Playground */}
      <section className="container mx-auto px-4 py-20 border-t border-white/10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-red-500/20 to-purple-500/20 text-white mb-4">Try It Now</Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Experience Real-Time AI</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Test our cutting-edge AI models directly in your browser with zero setup. See the power of our platform in action.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Select Model</h3>
                <Badge className="bg-green-500/20 text-green-500">Live</Badge>
              </div>
              
              <div className="space-y-3 mb-6">
                {[
                  { name: "MindscapeGPT-4.5", description: "Advanced language model for general tasks", params: "22B" },
                  { name: "CodeAssist-3", description: "Specialized for code generation and analysis", params: "15B" },
                  { name: "ImageCraft Pro", description: "Text-to-image generation model", params: "8B" },
                  { name: "VoiceForge", description: "Text-to-speech with natural inflection", params: "5B" },
                  { name: "DataAnalyst", description: "Specialized for data analysis and insights", params: "12B" },
                ].map((model, index) => (
                  <div 
                    key={model.name}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      index === 0
                        ? "bg-gradient-to-r from-red-500/10 to-purple-500/10 border-red-500/30"
                        : "bg-black/30 border border-white/5 hover:bg-black/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{model.name}</span>
                      <span className="text-xs text-white/50">{model.params}</span>
                    </div>
                    <p className="text-sm text-white/70 mt-1">{model.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/70 block mb-2">Temperature</label>
                  <div className="h-1 bg-black/50 rounded-full relative">
                    <div className="absolute h-1 w-1/4 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></div>
                    <div className="absolute h-3 w-3 bg-white rounded-full -top-1 left-1/4 -ml-1.5"></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-white/70 block mb-2">Response Length</label>
                  <div className="h-1 bg-black/50 rounded-full relative">
                    <div className="absolute h-1 w-1/2 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></div>
                    <div className="absolute h-3 w-3 bg-white rounded-full -top-1 left-1/2 -ml-1.5"></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>Concise</span>
                    <span>Detailed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <div className="border-b border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <h3 className="font-medium text-white">MindscapeGPT-4.5 Playground</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-black/50 text-white/70">42ms Latency</Badge>
                  <Button variant="outline" size="sm" className="h-8 px-2 text-sm border-white/10 text-white/70">
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 px-2 text-sm border-white/10 text-white/70">
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="h-96 overflow-y-auto p-4 bg-black/30 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90">Generate a creative marketing campaign for a new AI-powered fitness tracker that adapts to user behavior.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 flex-shrink-0">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-black/30 rounded-lg p-4 text-white/80">
                      <h4 className="font-bold text-white mb-3">Marketing Campaign: "Evolve With You"</h4>
                      
                      <h5 className="font-medium text-purple-400 mb-2">Campaign Concept:</h5>
                      <p className="mb-3">A fitness tracker that learns and evolves as you do, highlighting the AI's ability to adapt to the user's changing fitness level, goals, and preferences.</p>
                      
                      <h5 className="font-medium text-purple-400 mb-2">Key Messaging:</h5>
                      <ul className="list-disc pl-5 mb-3 space-y-1">
                        <li>"The only fitness tracker that knows you better than you know yourself"</li>
                        <li>"Adaptive intelligence that evolves with every step"</li>
                        <li>"From beginner to elite - one device that grows with you"</li>
                      </ul>
                      
                      <h5 className="font-medium text-purple-400 mb-2">Campaign Elements:</h5>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Before/After testimonial videos showing how the tracker adapted to users' journeys</li>
                        <li>Interactive landing page where visitors "train" an AI and see how it learns</li>
                        <li>Social media challenge: #EvolveWithMe - tracking fitness progress</li>
                        <li>Influencer partnerships with fitness transformations showcasing adaptive coaching</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Enter your prompt here..." 
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                        <button className="text-white/50 hover:text-white transition-colors">
                          <Paperclip className="h-5 w-5" />
                        </button>
                        <button className="text-white/50 hover:text-white transition-colors">
                          <Mic className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-red-600 to-purple-600 text-white">
                    Generate
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-white/50">Optimized for business content</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-white/50">Try examples:</div>
                    <Badge className="bg-black/30 text-white/70 hover:bg-black/50 cursor-pointer">Write a blog</Badge>
                    <Badge className="bg-black/30 text-white/70 hover:bg-black/50 cursor-pointer">Analyze data</Badge>
                    <Badge className="bg-black/30 text-white/70 hover:bg-black/50 cursor-pointer">Generate code</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white">
            Explore API Documentation
          </Button>
          <p className="text-white/50 text-sm mt-2">Over 100+ endpoints for seamless integration</p>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-black/60 via-black/70 to-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <Badge className="bg-white/10 backdrop-blur-sm text-white mb-4">Enterprise Ready</Badge>
              <h2 className="text-3xl font-bold text-white mb-6">
                Deploy AI Solutions in Minutes, Not Months
              </h2>
              <p className="text-white/70 mb-8">
                Our real-time GenAI platform lets you integrate cutting-edge AI capabilities into your products and workflows instantly. Join leading organizations transforming their business with our modern PaaS solution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 backdrop-blur-sm">
                  Schedule Demo
                </Button>
              </div>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-white/50">Uptime SLA</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-white">50ms</div>
                  <div className="text-sm text-white/50">Avg Response Time</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-sm text-white/50">API Endpoints</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-white/50">Expert Support</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Instant Deployment</h3>
                    <p className="text-sm text-white/70">
                      Deploy AI models with a single API call. No infrastructure management needed.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Enterprise Security</h3>
                    <p className="text-sm text-white/70">
                      SOC 2 Type II compliant with end-to-end encryption and data sovereignty options.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
                    <Workflow className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Flexible Integration</h3>
                    <p className="text-sm text-white/70">
                      Native SDKs for all major programming languages and frameworks with CI/CD support.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
                    <Database className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Scalable Infrastructure</h3>
                    <p className="text-sm text-white/70">
                      Auto-scaling to handle millions of requests without performance degradation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-3">
              <span className="text-white/70">Trusted by:</span>
              <div className="flex space-x-4">
                {["Acme Inc.", "TechCorp", "GlobalFin", "MediaGroup"].map((company) => (
                  <span key={company} className="text-white font-medium">{company}</span>
                ))}
              </div>
            </div>
            <Button variant="link" className="text-white group">
              <span>View Success Stories</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
} 