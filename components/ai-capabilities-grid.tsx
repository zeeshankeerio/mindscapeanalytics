"use client"

import { useState, useMemo, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Brain, Code, Eye, FileText, MessageSquare, Wand2, BarChart3, ArrowRight, Settings, MoveRight, ArrowLeft, ChevronLeft } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Import components used for capability details
import { CapabilityDemo } from "@/components/ai-capability/capability-demo"
import { PerformanceComparison } from "@/components/ai-capability/performance-comparison"
import { TryItYourself } from "@/components/ai-capability/try-it-yourself"
import { AIParticlesEffect } from "@/components/ai-capability/particles-effect"

// Type definitions
export type CapabilityId = "nlp" | "cv" | "ml" | "gen-ai" | "doc-ai" | "code-ai"

interface MetricItem {
  name: string
  value: number
  color: string
}

interface CapabilityData {
  id: CapabilityId
  title: string
  shortTitle?: string
  icon: React.ReactNode
  description: string
  features: string[]
  demo: React.ReactNode
  bgColor?: string
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

// Define capability data
const CAPABILITY_DATA: CapabilityData[] = [
  {
    id: "nlp",
    title: "Natural Language Processing",
    shortTitle: "NLP",
    icon: <MessageSquare className="h-7 w-7" />,
    description:
      "Our advanced NLP models understand context, sentiment, and intent to deliver human-like text understanding and generation.",
    features: [
      "Sentiment Analysis",
      "Named Entity Recognition",
      "Text Classification",
      "Language Translation",
      "Question Answering",
    ],
    bgColor: "from-red-500/20 to-red-600/5",
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
    icon: <Eye className="h-7 w-7" />,
    bgColor: "from-orange-500/20 to-orange-600/5",
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
    icon: <Brain className="h-7 w-7" />,
    bgColor: "from-blue-500/20 to-blue-600/5",
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
    icon: <Wand2 className="h-7 w-7" />,
    bgColor: "from-purple-500/20 to-purple-600/5",
    description:
      "Our generative AI creates new content, designs, and solutions based on learned patterns and specific requirements.",
    features: ["Text Generation", "Image Synthesis", "Code Generation", "Design Creation", "Content Personalization"],
    demo: <div>Generative AI Demo</div>,
  },
  {
    id: "doc-ai",
    title: "Document AI",
    shortTitle: "Doc AI",
    icon: <FileText className="h-7 w-7" />,
    bgColor: "from-green-500/20 to-green-600/5",
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
    icon: <Code className="h-7 w-7" />,
    bgColor: "from-yellow-500/20 to-yellow-600/5",
    description:
      "Our Code AI assists developers by generating, reviewing, and optimizing code across multiple programming languages.",
    features: ["Code Generation", "Code Completion", "Bug Detection", "Code Refactoring", "Documentation Generation"],
    demo: <div>Code AI Demo</div>,
  },
];

// Performance metrics for each capability
const PERFORMANCE_METRICS = {
  "nlp": [
    { name: "Accuracy", value: 92, color: "bg-red-500" },
    { name: "Speed", value: 87, color: "bg-red-600" },
    { name: "Scale", value: 95, color: "bg-red-700" },
    { name: "Efficiency", value: 89, color: "bg-red-800" },
  ],
  "cv": [
    { name: "Accuracy", value: 94, color: "bg-orange-500" },
    { name: "Speed", value: 82, color: "bg-orange-600" },
    { name: "Scale", value: 88, color: "bg-orange-700" },
    { name: "Efficiency", value: 91, color: "bg-orange-800" },
  ],
  "ml": [
    { name: "Accuracy", value: 96, color: "bg-blue-500" },
    { name: "Speed", value: 79, color: "bg-blue-600" },
    { name: "Scale", value: 93, color: "bg-blue-700" },
    { name: "Efficiency", value: 85, color: "bg-blue-800" },
  ],
  "gen-ai": [
    { name: "Accuracy", value: 91, color: "bg-purple-500" },
    { name: "Speed", value: 84, color: "bg-purple-600" },
    { name: "Scale", value: 97, color: "bg-purple-700" },
    { name: "Efficiency", value: 88, color: "bg-purple-800" },
  ],
  "doc-ai": [
    { name: "Accuracy", value: 98, color: "bg-green-500" },
    { name: "Speed", value: 90, color: "bg-green-600" },
    { name: "Scale", value: 85, color: "bg-green-700" },
    { name: "Efficiency", value: 92, color: "bg-green-800" },
  ],
  "code-ai": [
    { name: "Accuracy", value: 93, color: "bg-yellow-500" },
    { name: "Speed", value: 85, color: "bg-yellow-600" },
    { name: "Scale", value: 90, color: "bg-yellow-700" },
    { name: "Efficiency", value: 94, color: "bg-yellow-800" },
  ],
};

// Interactive prompts for "Try it yourself" section
const INTERACTIVE_PROMPTS = {
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

// Enhanced background animation component
const AnimatedBackground = ({ animate = true }) => {
  if (!animate) return null;
  
  return (
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
          className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-blue-500/30 to-purple-600/30 blur-[10rem]"
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
          className="absolute top-1/2 right-1/3 w-[25rem] h-[25rem] rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-600/20 blur-[8rem]"
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
  );
};

// Model parameters component
function ModelParameters({ 
  settings, 
  onChange,
  activeTab
}: { 
  settings: { temperature: number; maxTokens: number; topP: number };
  onChange: (setting: string, value: number) => void;
  activeTab: CapabilityId;
}) {
  // Get the primary color based on capability
  const getSliderStyles = () => {
    const colorMap = {
      'nlp': 'rgb(239, 68, 68)', // red-600
      'cv': 'rgb(234, 88, 12)', // orange-600
      'ml': 'rgb(37, 99, 235)', // blue-600
      'gen-ai': 'rgb(147, 51, 234)', // purple-600
      'doc-ai': 'rgb(22, 163, 74)', // green-600
      'code-ai': 'rgb(202, 138, 4)', // yellow-600
    };
    
    const baseColor = colorMap[activeTab] || colorMap['nlp'];
    
    return {
      track: {
        backgroundColor: `${baseColor}30`, // 30% opacity
      },
      range: {
        backgroundColor: baseColor,
      },
      thumb: {
        backgroundColor: baseColor,
        borderColor: baseColor,
      }
    };
  };
  
  const styles = getSliderStyles();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 bg-black/30 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="temperature-slider" className="text-sm text-white/70">Temperature</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{settings.temperature.toFixed(1)}</span>
        </div>
        <div className="slider-wrapper" style={{
          '--track-bg': styles.track.backgroundColor,
          '--range-bg': styles.range.backgroundColor,
          '--thumb-bg': styles.thumb.backgroundColor,
          '--thumb-border': styles.thumb.borderColor,
        } as React.CSSProperties}>
          <Slider
            id="temperature-slider"
            value={[settings.temperature * 10]}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => onChange("temperature", value[0] / 10)}
            className="my-1.5 custom-slider"
            aria-label="Adjust temperature"
          />
        </div>
        <p className="text-xs text-white/50">Controls randomness: lower is more deterministic</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="max-tokens-slider" className="text-sm text-white/70">Max Tokens</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{settings.maxTokens}</span>
        </div>
        <div className="slider-wrapper" style={{
          '--track-bg': styles.track.backgroundColor,
          '--range-bg': styles.range.backgroundColor,
          '--thumb-bg': styles.thumb.backgroundColor,
          '--thumb-border': styles.thumb.borderColor,
        } as React.CSSProperties}>
          <Slider
            id="max-tokens-slider"
            value={[settings.maxTokens]}
            min={10}
            max={300}
            step={10}
            onValueChange={(value) => onChange("maxTokens", value[0])}
            className="my-1.5 custom-slider"
            aria-label="Adjust maximum tokens"
          />
        </div>
        <p className="text-xs text-white/50">Maximum length of generated output</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="top-p-slider" className="text-sm text-white/70">Top P</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{settings.topP.toFixed(1)}</span>
        </div>
        <div className="slider-wrapper" style={{
          '--track-bg': styles.track.backgroundColor,
          '--range-bg': styles.range.backgroundColor,
          '--thumb-bg': styles.thumb.backgroundColor,
          '--thumb-border': styles.thumb.borderColor,
        } as React.CSSProperties}>
          <Slider
            id="top-p-slider"
            value={[settings.topP * 10]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => onChange("topP", value[0] / 10)}
            className="my-1.5 custom-slider"
            aria-label="Adjust top P"
          />
        </div>
        <p className="text-xs text-white/50">Nucleus sampling: diversity vs. specificity</p>
      </div>
      <style jsx global>{`
        .slider-wrapper .custom-slider [data-orientation=horizontal] {
          background-color: var(--track-bg) !important;
        }
        .slider-wrapper .custom-slider [data-orientation=horizontal] > div {
          background-color: var(--range-bg) !important;
        }
        .slider-wrapper .custom-slider [role=slider] {
          background-color: var(--thumb-bg) !important;
          border-color: var(--thumb-border) !important;
        }
      `}</style>
    </div>
  );
}

// Component for showing capability details
const CapabilityDetail = ({ 
  capability, 
  metrics, 
  prompts, 
  modelSettings, 
  onModelSettingsChange 
}: { 
  capability: CapabilityData;
  metrics: MetricItem[];
  prompts: string[];
  modelSettings: { temperature: number; maxTokens: number; topP: number };
  onModelSettingsChange: (setting: string, value: number) => void;
}) => {
  // Get appropriate color based on capability type
  const getAccentColor = () => {
    switch(capability.id) {
      case 'nlp': return 'from-red-500 to-red-600';
      case 'cv': return 'from-orange-500 to-orange-600';
      case 'ml': return 'from-blue-500 to-blue-600';
      case 'gen-ai': return 'from-purple-500 to-purple-600';
      case 'doc-ai': return 'from-green-500 to-green-600';
      case 'code-ai': return 'from-yellow-500 to-yellow-600';
      default: return 'from-red-500 to-red-600';
    }
  };

  const getDotColor = () => {
    switch(capability.id) {
      case 'nlp': return 'bg-red-500';
      case 'cv': return 'bg-orange-500';
      case 'ml': return 'bg-blue-500';
      case 'gen-ai': return 'bg-purple-500';
      case 'doc-ai': return 'bg-green-500';
      case 'code-ai': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  const getIconColor = () => {
    switch(capability.id) {
      case 'nlp': return 'text-red-500';
      case 'cv': return 'text-orange-500';
      case 'ml': return 'text-blue-500';
      case 'gen-ai': return 'text-purple-500';
      case 'doc-ai': return 'text-green-500';
      case 'code-ai': return 'text-yellow-500';
      default: return 'text-red-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <div className="space-y-6">
        <Card className="border-white/10 bg-black/40 backdrop-blur-md overflow-hidden relative shadow-xl shadow-black/10 hover:shadow-black/20 transition-all duration-300">
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getAccentColor()}`}></div>
          <CardContent className="p-6 md:p-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p variants={itemVariants} className="text-white/70 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                {capability.description}
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4">
                <h4 className="text-base md:text-lg font-medium text-white/90">Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
                  {capability.features.map((feature) => (
                    <motion.li
                      key={feature}
                      variants={itemVariants}
                      className="flex items-start gap-3 text-white/80 text-sm md:text-base"
                    >
                      <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-black/40 flex items-center justify-center border border-white/10`}>
                        <Badge className={`w-2 h-2 ${getDotColor()} p-0`} />
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-xl shadow-black/10 hover:shadow-black/20 transition-all duration-300">
          <CardHeader className="p-6 pb-3">
            <CardTitle className="text-lg font-semibold flex items-center">
              <BarChart3 className={`mr-2 h-5 w-5 ${getIconColor()}`} />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <PerformanceComparison metrics={metrics} />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-xl shadow-black/10 hover:shadow-black/20 transition-all duration-300">
          <CardHeader className="p-6 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={`mr-2 h-5 w-5 ${getIconColor()} opacity-80`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </motion.div>
                Live Demonstration
              </CardTitle>
              <Badge variant="outline" className="bg-black/30 text-white/70 border-white/10">
                Real-time
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <CapabilityDemo capability={capability} />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-xl shadow-black/10 hover:shadow-black/20 transition-all duration-300">
          <CardHeader className="p-6 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                <svg className={`mr-2 h-5 w-5 ${getIconColor()}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Try It Yourself
              </CardTitle>
              <Badge variant="outline" className="bg-black/30 text-white/70 border-white/10">
                Interactive
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <TryItYourself 
              capability={capability.id} 
              prompts={prompts} 
            />
            
            {/* Add model parameters UI for generative capabilities */}
            {(capability.id === "gen-ai" || capability.id === "code-ai" || capability.id === "nlp") && (
              <ModelParameters 
                settings={modelSettings}
                onChange={onModelSettingsChange}
                activeTab={capability.id}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function AICapabilitiesGrid() {
  // State management with hooks for better performance
  const [activeCapabilityId, setActiveCapabilityId] = useState<CapabilityId | null>(null)
  const [animateBackground, setAnimateBackground] = useState(true)
  const [modelSettings, setModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 150,
    topP: 0.9
  })
  const [showParticles, setShowParticles] = useState(true)
  
  // Memoize the current capability data for better performance
  const activeCapability = useMemo(() => 
    activeCapabilityId ? CAPABILITY_DATA.find((c) => c.id === activeCapabilityId) : null,
    [activeCapabilityId]
  )
  
  // Use callbacks for event handlers to prevent unnecessary rerenders
  const handleCapabilitySelect = useCallback((id: CapabilityId) => {
    setActiveCapabilityId(id)
  }, [])

  const handleBackToGrid = useCallback(() => {
    setActiveCapabilityId(null)
  }, [])

  const handleModelSettingsChange = useCallback((setting: string, value: number) => {
    setModelSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }, [])

  // Function to get border gradients based on capability
  const getBorderGradient = (capabilityId: CapabilityId) => {
    switch(capabilityId) {
      case 'nlp': return 'from-red-500/80 to-red-600/80';
      case 'cv': return 'from-orange-500/80 to-orange-600/80';
      case 'ml': return 'from-blue-500/80 to-blue-600/80';
      case 'gen-ai': return 'from-purple-500/80 to-purple-600/80';
      case 'doc-ai': return 'from-green-500/80 to-green-600/80';
      case 'code-ai': return 'from-yellow-500/80 to-yellow-600/80';
      default: return 'from-red-500/80 to-red-600/80';
    }
  };

  const getHoverGradient = (capabilityId: CapabilityId) => {
    switch(capabilityId) {
      case 'nlp': return 'from-red-500/5 to-transparent';
      case 'cv': return 'from-orange-500/5 to-transparent';
      case 'ml': return 'from-blue-500/5 to-transparent';
      case 'gen-ai': return 'from-purple-500/5 to-transparent';
      case 'doc-ai': return 'from-green-500/5 to-transparent';
      case 'code-ai': return 'from-yellow-500/5 to-transparent';
      default: return 'from-red-500/5 to-transparent';
    }
  };

  // Determine the display mode
  const isGridView = activeCapabilityId === null
  
  return (
    <section id="ai-capabilities" className="relative py-16 md:py-24 w-full overflow-hidden bg-black">
      {/* Enhanced animated background */}
      <AnimatedBackground animate={animateBackground} />
      
      {/* AI Particles effect */}
      {showParticles && <AIParticlesEffect activeTab={activeCapabilityId || "nlp"} />}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16"
        >
          <div>
            <Badge className="mb-3 md:mb-4 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white hover:from-red-600/80 hover:to-red-700/80 border-none shadow-lg shadow-red-900/20 px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm">
              ADVANCED CAPABILITIES
            </Badge>
            <h2 
              className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/90"
            >
              AI Capabilities Explorer
            </h2>
            <p className="text-base md:text-xl text-white/70 max-w-2xl">
              Discover our cutting-edge AI technologies powering next-generation solutions
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 flex items-center gap-3">
                  <Settings className="h-4 w-4 text-white/50" />
                  <span className="text-sm text-white/70">Display Settings</span>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64 bg-black/90 backdrop-blur-xl border-white/10">
                <div className="p-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="toggle-animations" className="text-sm text-white/70">Background Effects</label>
                    <Switch
                      id="toggle-animations"
                      checked={animateBackground}
                      onCheckedChange={setAnimateBackground}
                      className="data-[state=checked]:bg-red-600"
                      aria-label="Toggle animations"
                    />
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex items-center justify-between">
                    <label htmlFor="toggle-particles" className="text-sm text-white/70">3D Particles</label>
                    <Switch
                      id="toggle-particles"
                      checked={showParticles}
                      onCheckedChange={setShowParticles}
                      className="data-[state=checked]:bg-red-600"
                      aria-label="Toggle particles"
                    />
                  </div>
                </div>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isGridView ? (
            <motion.div 
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {CAPABILITY_DATA.map((capability) => (
                  <motion.div
                    key={capability.id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCapabilitySelect(capability.id)}
                    className="h-full"
                  >
                    <Card className="h-full cursor-pointer border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-xl hover:shadow-red-900/10 transition-all duration-300 group">
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getBorderGradient(capability.id)} transform origin-left transition-all duration-300 group-hover:h-1.5`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-b ${getHoverGradient(capability.id)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col h-full">
                          <div className={`mb-6 p-3.5 rounded-xl bg-gradient-to-br ${capability.bgColor || 'from-red-500/10 to-red-600/5'} w-16 h-16 flex items-center justify-center border border-white/10`}>
                            <div className="text-white w-8 h-8 flex items-center justify-center">
                              {capability.icon}
                            </div>
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-semibold mb-3">{capability.title}</h3>
                          
                          <p className="text-white/70 text-sm md:text-base mb-6 flex-grow">
                            {capability.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {capability.features.slice(0, 3).map(feature => (
                              <Badge key={feature} variant="outline" className="bg-black/30 text-white/70 border-white/10">
                                {feature}
                              </Badge>
                            ))}
                            {capability.features.length > 3 && (
                              <Badge variant="outline" className="bg-black/30 text-white/70 border-white/10">
                                +{capability.features.length - 3}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="mt-5 text-sm text-white/40 flex items-center group-hover:text-white/60 transition-colors">
                            <ArrowRight className="h-3 w-3 mr-1" />
                            <span>Explore Capabilities</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleBackToGrid}
                  className="text-white/70 hover:text-white hover:bg-white/5 mr-4"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to All Capabilities
                </Button>
                {activeCapability && (
                  <>
                    <Separator orientation="vertical" className="h-6 bg-white/10 mx-2" />
                    <h3 className="text-xl md:text-2xl font-medium ml-4 flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${activeCapability.bgColor || 'from-red-500/10 to-red-600/5'} text-white`}>
                        {activeCapability.icon}
                      </div>
                      {activeCapability.title}
                    </h3>
                  </>
                )}
              </div>
              
              {activeCapability && (
                <CapabilityDetail
                  capability={activeCapability}
                  metrics={PERFORMANCE_METRICS[activeCapability.id]}
                  prompts={INTERACTIVE_PROMPTS[activeCapability.id]}
                  modelSettings={modelSettings}
                  onModelSettingsChange={handleModelSettingsChange}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 