"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Code, Eye, FileText, MessageSquare, Wand2, BarChart3, ArrowLeftRight, Play, RotateCcw, PlayCircle, MousePointerClick } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Import extracted components
import { CapabilityDemo } from "@/components/ai-capability/capability-demo"
import { PerformanceComparison } from "@/components/ai-capability/performance-comparison"
import { TryItYourself } from "@/components/ai-capability/try-it-yourself"
import { AIParticlesEffect } from "@/components/ai-capability/particles-effect"

// Type definitions
export type CapabilityId = "nlp" | "cv" | "ml" | "gen-ai" | "doc-ai" | "code-ai";

interface MetricItem {
  name: string;
  value: number;
  color: string;
}

interface CapabilityData {
  id: CapabilityId;
  title: string;
  shortTitle?: string;
  icon: ReactNode;
  description: string;
  features: string[];
  demo: ReactNode;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}
  
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

// Define capability data directly
const capabilityData: CapabilityData[] = [
  {
    id: "nlp",
    title: "Natural Language Processing",
    shortTitle: "NLP",
    icon: <MessageSquare className="h-4 w-4" />,
    description:
      "Our advanced NLP models understand context, sentiment, and intent to deliver human-like text understanding and generation.",
    features: [
      "Sentiment Analysis",
      "Named Entity Recognition",
      "Text Classification",
      "Language Translation",
      "Question Answering",
    ],
    demo: (
      <div className="space-y-4">
        <div className="bg-black/40 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <p className="text-sm text-white/70">Input Text</p>
          </div>
          <p className="text-white/90 p-2 bg-black/40 rounded border border-white/5">
            The new AI platform has significantly improved our customer service response times by 45%.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Sentiment</p>
            <div className="flex items-center">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-red-500 rounded-full"></div>
              </div>
              <span className="ml-2 text-red-500 font-medium">Positive</span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Entities</p>
            <div className="flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">AI platform</span>
              <span className="px-1.5 py-0.5 bg-red-700/20 text-red-400 rounded text-xs">45%</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "cv",
    title: "Computer Vision",
    shortTitle: "Vision",
    icon: <Eye className="h-4 w-4" />,
    description:
      "Our computer vision systems can identify objects, people, text, and activities in images and video with exceptional accuracy.",
    features: [
      "Object Detection",
      "Image Classification",
      "Facial Recognition",
      "Optical Character Recognition",
      "Video Analysis",
    ],
    demo: (
      <div className="space-y-4">
        <div className="relative rounded-lg overflow-hidden aspect-video bg-black/40 border border-white/10">
          <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Computer Vision Demo" width={500} height={300} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0">
            {/* Simulated object detection boxes */}
            <div className="absolute top-[20%] left-[30%] w-[25%] h-[40%] border-2 border-red-500 rounded-md">
              <div className="bg-red-500 text-white text-xs px-1 py-0.5 absolute -top-5">Person (98%)</div>
            </div>
            <div className="absolute top-[50%] left-[10%] w-[20%] h-[30%] border-2 border-red-600 rounded-md">
              <div className="bg-red-600 text-white text-xs px-1 py-0.5 absolute -top-5">Laptop (95%)</div>
            </div>
            <div className="absolute top-[30%] right-[15%] w-[15%] h-[25%] border-2 border-red-700 rounded-md">
              <div className="bg-red-700 text-white text-xs px-1 py-0.5 absolute -top-5">Coffee (92%)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Objects Detected</p>
            <p className="text-lg font-medium">3</p>
          </div>

          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Processing Time</p>
            <p className="text-lg font-medium">0.24s</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ml",
    title: "Machine Learning",
    shortTitle: "ML",
    icon: <Brain className="h-4 w-4" />,
    description:
      "Our machine learning algorithms learn from data patterns to make predictions, classifications, and recommendations.",
    features: [
      "Predictive Analytics",
      "Anomaly Detection",
      "Recommendation Systems",
      "Time Series Forecasting",
      "Clustering & Classification",
    ],
    demo: <div>Machine Learning Demo</div>,
  },
  {
    id: "gen-ai",
    title: "Generative AI",
    shortTitle: "Gen AI",
    icon: <Wand2 className="h-4 w-4" />,
    description:
      "Our generative AI creates new content, designs, and solutions based on learned patterns and specific requirements.",
    features: ["Text Generation", "Image Synthesis", "Code Generation", "Design Creation", "Content Personalization"],
    demo: <div>Generative AI Demo</div>,
  },
  {
    id: "doc-ai",
    title: "Document AI",
    shortTitle: "Doc AI",
    icon: <FileText className="h-4 w-4" />,
    description:
      "Our Document AI extracts, analyzes, and processes information from various document types with high precision.",
    features: [
      "Document Classification",
      "Information Extraction",
      "Form Processing",
      "Contract Analysis",
      "Compliance Checking",
    ],
    demo: <div>Document AI Demo</div>,
  },
  {
    id: "code-ai",
    title: "Code AI",
    shortTitle: "Code AI",
    icon: <Code className="h-4 w-4" />,
    description:
      "Our Code AI assists developers by generating, reviewing, and optimizing code across multiple programming languages.",
    features: ["Code Generation", "Code Completion", "Bug Detection", "Code Refactoring", "Documentation Generation"],
    demo: <div>Code AI Demo</div>,
  },
];

// Performance metrics for each capability
const performanceMetrics = {
  "nlp": [
    { name: "Accuracy", value: 92, color: "bg-red-500" },
    { name: "Speed", value: 87, color: "bg-red-600" },
    { name: "Scale", value: 95, color: "bg-red-700" },
    { name: "Efficiency", value: 89, color: "bg-red-800" },
  ],
  "cv": [
    { name: "Accuracy", value: 94, color: "bg-red-500" },
    { name: "Speed", value: 82, color: "bg-red-600" },
    { name: "Scale", value: 88, color: "bg-red-700" },
    { name: "Efficiency", value: 91, color: "bg-red-800" },
  ],
  "ml": [
    { name: "Accuracy", value: 96, color: "bg-red-500" },
    { name: "Speed", value: 79, color: "bg-red-600" },
    { name: "Scale", value: 93, color: "bg-red-700" },
    { name: "Efficiency", value: 85, color: "bg-red-800" },
  ],
  "gen-ai": [
    { name: "Accuracy", value: 91, color: "bg-red-500" },
    { name: "Speed", value: 84, color: "bg-red-600" },
    { name: "Scale", value: 97, color: "bg-red-700" },
    { name: "Efficiency", value: 88, color: "bg-red-800" },
  ],
  "doc-ai": [
    { name: "Accuracy", value: 98, color: "bg-red-500" },
    { name: "Speed", value: 90, color: "bg-red-600" },
    { name: "Scale", value: 85, color: "bg-red-700" },
    { name: "Efficiency", value: 92, color: "bg-red-800" },
  ],
  "code-ai": [
    { name: "Accuracy", value: 93, color: "bg-red-500" },
    { name: "Speed", value: 85, color: "bg-red-600" },
    { name: "Scale", value: 90, color: "bg-red-700" },
    { name: "Efficiency", value: 94, color: "bg-red-800" },
  ],
};

// Interactive prompts for "Try it yourself" section
const interactivePrompts = {
  "nlp": [
    "Analyze the sentiment of this customer review",
    "Extract key entities from this news article",
    "Summarize this technical document",
    "Classify this text by topic"
  ],
  "cv": [
    "Detect objects in this image",
    "Identify faces in this photo",
    "Read text from this document scan",
    "Analyze this video for activity"
  ],
  "ml": [
    "Predict next month's sales",
    "Detect anomalies in this dataset",
    "Recommend similar products",
    "Forecast time series data"
  ],
  "gen-ai": [
    "Generate a product description",
    "Create a marketing email",
    "Design a logo concept",
    "Write a blog post introduction"
  ],
  "doc-ai": [
    "Extract data from this invoice",
    "Analyze this contract for key terms",
    "Process this form submission",
    "Check this document for compliance"
  ],
  "code-ai": [
    "Generate a React component",
    "Optimize this function for performance",
    "Find bugs in this code snippet",
    "Document this class with comments"
  ]
};

// Add a simple local ModelParameters component
function ModelParameters({ 
  settings, 
  onChange 
}: { 
  settings: { temperature: number; maxTokens: number; topP: number }; 
  onChange: (setting: string, value: number) => void 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 bg-black/30 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="temperature-slider" className="text-sm text-white/70">Temperature</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{settings.temperature.toFixed(1)}</span>
        </div>
        <Slider
          id="temperature-slider"
          value={[settings.temperature * 10]}
          min={0}
          max={10}
          step={1}
          onValueChange={(value) => onChange("temperature", value[0] / 10)}
          className="my-1.5"
          aria-label="Adjust temperature"
        />
        <p className="text-xs text-white/50">Controls randomness: lower is more deterministic</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="max-tokens-slider" className="text-sm text-white/70">Max Tokens</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{settings.maxTokens}</span>
        </div>
        <Slider
          id="max-tokens-slider"
          value={[settings.maxTokens]}
          min={10}
          max={300}
          step={10}
          onValueChange={(value) => onChange("maxTokens", value[0])}
          className="my-1.5"
          aria-label="Adjust maximum tokens"
        />
        <p className="text-xs text-white/50">Maximum length of generated output</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="top-p-slider" className="text-sm text-white/70">Top P</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{settings.topP.toFixed(1)}</span>
        </div>
        <Slider
          id="top-p-slider"
          value={[settings.topP * 10]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => onChange("topP", value[0] / 10)}
          className="my-1.5"
          aria-label="Adjust top P"
        />
        <p className="text-xs text-white/50">Nucleus sampling: diversity vs. specificity</p>
      </div>
    </div>
  );
}

export default function AICapabilitiesShowcase() {
  const [activeTab, setActiveTab] = useState<CapabilityId>("nlp")
  const [showCapabilityComparison, setShowCapabilityComparison] = useState(false)
  const [animateBackground, setAnimateBackground] = useState(true)
  const [modelSettings, setModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 150,
    topP: 0.9
  })
  const [showParticles, setShowParticles] = useState(true)
  
  const toggleCapabilityComparison = (capabilityId: CapabilityId) => {
    setActiveTab(capabilityId)
    setShowCapabilityComparison(prev => !prev)
  }

  const handleModelSettingsChange = (setting: string, value: number) => {
    setModelSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const activeCapability = capabilityData.find((c) => c.id === activeTab)
    
    return (
    <section className="py-28 bg-black relative overflow-hidden" aria-labelledby="ai-capabilities-heading">
      {/* Enhanced animated background */}
      {animateBackground && (
        <>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <motion.div 
              className="absolute top-1/4 left-1/3 w-[35rem] h-[35rem] rounded-full bg-gradient-to-r from-red-500/30 to-red-600/30 blur-[10rem]"
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -30, 30, 0],
                scale: [1, 1.05, 0.95, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-red-600/30 to-red-700/30 blur-[10rem]"
              animate={{
                x: [0, -40, 40, 0],
                y: [0, 40, -40, 0],
                scale: [1, 0.95, 1.05, 1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/3 w-[25rem] h-[25rem] rounded-full bg-gradient-to-r from-red-700/20 to-red-800/20 blur-[8rem]"
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -20, 20, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-3xl pointer-events-none"></div>
        </>
      )}
      
      {/* AI Particles effect */}
      {showParticles && <AIParticlesEffect activeTab={activeTab} />}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14"
        >
          <div>
            <Badge className="mb-4 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white hover:from-red-600/80 hover:to-red-700/80 border-none shadow-lg shadow-red-900/20 px-3 py-1.5">
              ADVANCED CAPABILITIES
            </Badge>
            <h2 
              id="ai-capabilities-heading" 
              className="text-3xl md:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/90"
            >
              AI Capabilities Showcase
          </h2>
            <p className="text-xl text-white/70 max-w-2xl">
              Explore our cutting-edge AI technologies powering next-generation solutions
          </p>
        </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 outline-none bg-transparent border-none cursor-pointer">
                    <Switch
                      id="toggle-animations"
                      checked={animateBackground}
                      onCheckedChange={setAnimateBackground}
                      className="data-[state=checked]:bg-red-600"
                      aria-label="Toggle animations"
                    />
                    <label htmlFor="toggle-animations" className="text-sm text-white/70">Animations</label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle background animations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 outline-none bg-transparent border-none cursor-pointer">
                    <Switch
                      id="toggle-particles"
                      checked={showParticles}
                      onCheckedChange={setShowParticles}
                      className="data-[state=checked]:bg-red-600"
                      aria-label="Toggle particles"
                    />
                    <label htmlFor="toggle-particles" className="text-sm text-white/70">Particles</label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle 3D particles effect</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>

        <Tabs 
          defaultValue="nlp" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as CapabilityId)} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl mb-10 shadow-lg shadow-black/20">
            {capabilityData.map((capability) => (
              <TabsTrigger 
                key={capability.id}
                value={capability.id} 
                className="data-[state=active]:bg-red-600/90 data-[state=active]:text-white rounded-lg transition-all duration-200"
                aria-label={capability.title}
              >
              <div className="flex flex-col items-center gap-1.5 py-1.5">
                  {capability.icon}
                  <span className="text-xs font-medium">{capability.shortTitle || capability.title}</span>
              </div>
                  </TabsTrigger>
            ))}
          </TabsList>

                    <motion.div
            key={activeTab as string}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <Card className="border-white/10 bg-black/40 backdrop-blur-md overflow-hidden relative shadow-xl shadow-black/10 hover:shadow-black/20 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                  <CardContent className="p-8">
                    {activeCapability && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg text-red-500 border border-red-500/10">
                            {activeCapability.icon}
                        </div>
                        <h3 className="text-2xl font-semibold">
                            {activeCapability.title}
                        </h3>
                      </motion.div>

                      <motion.p variants={itemVariants} className="text-white/70 mb-8 text-lg leading-relaxed">
                          {activeCapability.description}
                      </motion.p>

                      <motion.div variants={itemVariants} className="mb-8">
                        <h4 className="text-sm font-medium text-white/90 mb-4 uppercase tracking-wide">Key Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {activeCapability.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              variants={itemVariants}
                              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors duration-200 p-2.5 rounded-lg"
                            >
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span className="text-sm text-white/80">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div variants={itemVariants} className="flex items-center gap-4">
                        <Button 
                          onClick={() => toggleCapabilityComparison(activeTab)}
                          className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md shadow-red-900/20 px-5 relative overflow-hidden group"
                        >
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/30 to-red-500/0 opacity-0 group-hover:opacity-100"
                            animate={{ 
                              x: ['-100%', '100%'],
                              transition: { repeat: Infinity, duration: 1.5, ease: 'linear' }
                            }}
                          />
                          {showCapabilityComparison ? 'Hide Performance' : 'Show Performance'}
                          <BarChart3 className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="border-white/20 hover:bg-white/10">
                          Learn More
                          <ArrowLeftRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                    )}
                  </CardContent>
                </Card>

                <AnimatePresence>
                  {showCapabilityComparison && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border-white/10 bg-black/40 backdrop-blur-md shadow-xl shadow-black/10">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/70 to-red-600/70"></div>
                        <CardContent className="p-8">
                          <h3 className="text-lg font-semibold mb-6 flex items-center">
                            <BarChart3 className="mr-2 h-5 w-5 text-red-500" />
                            Performance Metrics
                          </h3>
                          <PerformanceComparison metrics={performanceMetrics[activeTab]} />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>

              <div className="space-y-8">
                <Card className="border-white/10 bg-black/40 backdrop-blur-md h-full shadow-xl shadow-black/10 hover:shadow-black/20 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/90 to-red-600/90"></div>
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold mb-6 flex items-center">
                      <PlayCircle className="mr-2 h-5 w-5 text-red-500" />
                      Live Demonstration
                    </h3>
                    {activeCapability && <CapabilityDemo capability={activeCapability} />}
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-xl shadow-black/10 hover:shadow-black/20 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/80 to-red-600/80"></div>
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold mb-6 flex items-center">
                      <MousePointerClick className="mr-2 h-5 w-5 text-red-500" />
                      Try It Yourself
                    </h3>
                    <TryItYourself 
                      capability={activeTab} 
                      prompts={interactivePrompts[activeTab]} 
                    />
                    
                    {/* Add model parameters UI for generative capabilities */}
                    {(activeTab === "gen-ai" || activeTab === "code-ai" || activeTab === "nlp") && (
                      <ModelParameters 
                        settings={modelSettings}
                        onChange={handleModelSettingsChange}
                      />
                    )}
                  </CardContent>
                </Card>
        </div>
            </div>
          </motion.div>
        </Tabs>
      </div>
    </section>
  )
}

