"use client"

import { useState, useRef, useMemo, useCallback, useEffect } from "react"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Code, Eye, FileText, MessageSquare, Wand2, BarChart3, ArrowLeftRight, Play, RotateCcw, PlayCircle, MousePointerClick, Check, ArrowRight, ActivityIcon, Settings, MoveRight, Info } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

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
  icon: React.ReactNode;
  description: string;
  features: string[];
  demo: React.ReactNode;
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

// Tabs fade animation
const tabFadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
}

// Enhanced section animations
const sectionVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8
    }
  }
}

// Component for each capability tab content
const CapabilityTabContent = ({ 
  capability, 
  metrics, 
  prompts, 
  modelSettings, 
  onModelSettingsChange, 
  toggleCapabilityComparison
}: { 
  capability: CapabilityData
  metrics: MetricItem[]
  prompts: string[]
  modelSettings: {
    temperature: number
    maxTokens: number
    topP: number
  }
  onModelSettingsChange: (setting: string, value: number) => void
  toggleCapabilityComparison: (id: CapabilityId) => void
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <div className="space-y-6 md:space-y-8">
        <Card className="border-white/10 bg-gradient-to-br from-black/90 to-zinc-900/90 overflow-hidden relative rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
          <CardContent className="p-6 md:p-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`capability-${capability.id}`}
            >
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl text-red-500 border border-red-500/20 shadow-md shadow-red-500/10">
                  {capability.icon}
                </div>
                <div>
                  <Badge className="mb-1 text-xs px-2 py-0.5 bg-red-500/10 text-red-400 border-red-500/20">
                    ENTERPRISE READY
                  </Badge>
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {capability.title}
                  </h3>
                </div>
              </motion.div>

              <motion.p variants={itemVariants} className="text-white/80 mb-8 text-base md:text-lg leading-relaxed">
                {capability.description}
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4">
                <h4 className="text-sm md:text-base font-medium text-white/90 flex items-center">
                  <Check className="mr-2 h-4 w-4 text-red-500" />
                  Key Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  {capability.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      variants={itemVariants}
                      className="flex items-center gap-3 text-white/80 text-sm md:text-base bg-white/5 rounded-lg p-3 border border-white/5"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shadow-sm shadow-red-500/5">
                        <Check className="w-3 h-3 text-red-500" />
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Button 
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-none rounded-xl text-sm shadow-md shadow-red-900/20"
                    onClick={() => toggleCapabilityComparison(capability.id)}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Performance Metrics
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white/80 hover:text-white border-white/20 hover:border-white/40 hover:bg-white/5 rounded-xl text-sm group"
                  >
                    Documentation
                    <MoveRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-gradient-to-br from-black/90 to-zinc-900/90 overflow-hidden rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/90 to-red-600/90"></div>
          <CardContent className="p-6 md:p-8">
            <h3 className="text-base md:text-lg font-semibold mb-6 flex items-center">
              <BarChart3 className="mr-2 h-4 w-4 text-red-500" />
              Performance Metrics
            </h3>
            <PerformanceComparison metrics={metrics} />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 md:space-y-8">
        <Card className="border-white/10 bg-gradient-to-br from-black/90 to-zinc-900/90 h-full rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/90 to-red-600/90"></div>
          <CardHeader className="p-6 md:p-8 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-red-500" />
                <CardTitle className="text-base md:text-lg font-semibold">Live Demonstration</CardTitle>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/5">
                      <Settings className="h-4 w-4 text-white/50" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Configure demo settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 pt-4">
            <CapabilityDemo capability={capability} />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-gradient-to-br from-black/90 to-zinc-900/90 overflow-hidden rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/80 to-red-600/80"></div>
          <CardHeader className="p-6 md:p-8 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MousePointerClick className="h-4 w-4 text-red-500" />
                <CardTitle className="text-base md:text-lg font-semibold">Try It Yourself</CardTitle>
              </div>
              <Badge variant="outline" className="glass-effect text-white/70 border-white/10">
                Interactive
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 pt-4">
            <TryItYourself 
              capability={capability.id} 
              prompts={prompts} 
            />
            
            {/* Add model parameters UI for generative capabilities */}
            {(capability.id === "gen-ai" || capability.id === "code-ai" || capability.id === "nlp") && (
              <ModelParameters 
                settings={modelSettings}
                onChange={onModelSettingsChange}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Model parameters component
function ModelParameters({ 
  settings, 
  onChange 
}: { 
  settings: { temperature: number; maxTokens: number; topP: number }; 
  onChange: (setting: string, value: number) => void 
}) {
  return (
    <div className="bg-gradient-to-br from-black/80 to-zinc-900/80 rounded-xl border border-white/10 backdrop-blur-sm overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <label htmlFor="temperature-slider" className="text-xs text-white/90 font-medium">Temperature</label>
            </div>
            <span className="text-xs font-mono bg-black/40 px-1.5 py-0.5 rounded-sm border border-white/10">
              {settings.temperature.toFixed(1)}
            </span>
          </div>
          <Slider
            id="temperature-slider"
            value={[settings.temperature * 10]}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => onChange("temperature", value[0] / 10)}
            className="my-2"
            aria-label="Adjust temperature"
          />
          <p className="text-[10px] text-white/50">Randomness vs. determinism</p>
        </div>
        
        <div className="p-4 space-y-2 bg-white/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <label htmlFor="max-tokens-slider" className="text-xs text-white/90 font-medium">Max Tokens</label>
            </div>
            <span className="text-xs font-mono bg-black/40 px-1.5 py-0.5 rounded-sm border border-white/10">
              {settings.maxTokens}
            </span>
          </div>
          <Slider
            id="max-tokens-slider"
            value={[settings.maxTokens]}
            min={10}
            max={300}
            step={10}
            onValueChange={(value) => onChange("maxTokens", value[0])}
            className="my-2"
            aria-label="Adjust maximum tokens"
          />
          <p className="text-[10px] text-white/50">Length of generated output</p>
        </div>
        
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <label htmlFor="top-p-slider" className="text-xs text-white/90 font-medium">Top P</label>
            </div>
            <span className="text-xs font-mono bg-black/40 px-1.5 py-0.5 rounded-sm border border-white/10">
              {settings.topP.toFixed(1)}
            </span>
          </div>
          <Slider
            id="top-p-slider"
            value={[settings.topP * 10]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => onChange("topP", value[0] / 10)}
            className="my-2"
            aria-label="Adjust top P"
          />
          <p className="text-[10px] text-white/50">Diversity vs. specificity</p>
        </div>
      </div>
      
      <div className="px-4 py-3 border-t border-white/10 bg-black/40 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Settings className="h-3 w-3 text-white/60" />
          <span className="text-xs text-white/60">Model: GPT-4</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-6 px-2 py-0 text-xs bg-black/40 border-white/10 hover:bg-red-500/10 hover:border-red-500/20"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

// Remove the AnimatedBackground component and replace with minimal background
const MinimalBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 z-0"></div>
);

// Define capability data
const CAPABILITY_DATA: CapabilityData[] = [
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
const PERFORMANCE_METRICS = {
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

export default function AICapabilitiesShowcase() {
  // State management with hooks
  const [activeTab, setActiveTab] = useState<CapabilityId>("nlp")
  const [showCapabilityComparison, setShowCapabilityComparison] = useState(false)
  const [modelSettings, setModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 150,
    topP: 0.9
  })
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid')
  const [hoveredCard, setHoveredCard] = useState<CapabilityId | null>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [filterTag, setFilterTag] = useState<string | null>(null)
  
  // Error handling
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Error in AI Capabilities component:', error);
      setErrorMessage(error.message || 'Unknown error');
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  // Memoize the current capability data for better performance
  const activeCapability = useMemo(() => 
    CAPABILITY_DATA.find((c) => c.id === activeTab),
    [activeTab]
  )
  
  // Event handlers as callbacks
  const toggleCapabilityComparison = useCallback((capabilityId: CapabilityId) => {
    setActiveTab(capabilityId)
    setShowCapabilityComparison(prev => !prev)
  }, [])

  const handleModelSettingsChange = useCallback((setting: string, value: number) => {
    setModelSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }, [])
  
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as CapabilityId)
    setViewMode('detail')
  }, [])

  const handleBackToGrid = useCallback(() => {
    setViewMode('grid')
  }, [])
  
  const handleFilterChange = useCallback((tag: string | null) => {
    setFilterTag(tag);
  }, []);

  // Horizontal scroll handling
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!horizontalScrollRef.current) return
    
    if (e.key === 'ArrowRight') {
      horizontalScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    } else if (e.key === 'ArrowLeft') {
      horizontalScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }, [])

  const scrollToCard = useCallback((index: number) => {
    if (!horizontalScrollRef.current) return
    
    const cardWidth = 350 // Approximate width of card + margin
    const scrollPosition = index * cardWidth
    
    horizontalScrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
    
    setActiveCardIndex(index)
  }, [])

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!horizontalScrollRef.current) return
      
      const scrollPosition = horizontalScrollRef.current.scrollLeft
      const cardWidth = 350 // Should match the card width + margin
      const newActiveIndex = Math.round(scrollPosition / cardWidth)
      
      if (newActiveIndex !== activeCardIndex && newActiveIndex >= 0 && newActiveIndex < CAPABILITY_DATA.length) {
        setActiveCardIndex(newActiveIndex)
      }
    }
    
    const scrollContainer = horizontalScrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [activeCardIndex, CAPABILITY_DATA.length])

  // Fallback capability data
  const safeCAPABILITY_DATA = useMemo(() => {
    if (!CAPABILITY_DATA || !Array.isArray(CAPABILITY_DATA) || CAPABILITY_DATA.length === 0) {
      console.warn('No capability data found, using fallback data');
      return [
        {
          id: "nlp" as CapabilityId,
          title: "Natural Language Processing",
          shortTitle: "NLP",
          icon: <MessageSquare className="h-4 w-4" />,
          description: "Advanced text understanding and processing capabilities",
          features: ["Text Analysis", "Sentiment Detection", "Entity Recognition"],
          demo: <div>NLP Demo</div>
        }
      ];
    }
    return CAPABILITY_DATA;
  }, []);

  return (
    <section id="ai-capabilities" className="relative py-16 md:py-24 w-full overflow-hidden bg-black">
      {/* Replace animated background with minimal background */}
      <MinimalBackground />
      
      {/* Animation keyframes for card effects */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px 5px rgba(239, 68, 68, 0.1); }
          50% { box-shadow: 0 0 30px 10px rgba(239, 68, 68, 0.2); }
        }
        
        .card-hover-effect:hover {
          animation: pulse-glow 2s infinite;
          transform: translateY(-8px);
          transition: transform 0.3s ease-out;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .gradient-shift-bg {
          background: linear-gradient(90deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2));
          background-size: 200% 100%;
          animation: gradient-shift 5s ease infinite;
        }

        .card-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-15deg);
          animation: card-shine-anim 4s infinite;
        }

        @keyframes card-shine-anim {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }

        .auto-scroll {
          animation: auto-scroll 60s linear infinite;
        }

        @keyframes auto-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-350px * 3)); }
        }

        .auto-scroll:hover {
          animation-play-state: paused;
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .capability-box {
          transition: all 0.3s ease;
        }
        
        .capability-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.3);
        }
        
        .capability-box.active {
          border-color: rgba(239, 68, 68, 0.6);
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(0, 0, 0, 0.8));
        }
        
        .micro-indicator {
          transition: all 0.3s ease;
          transform: scale(0);
        }
        
        .active .micro-indicator {
          transform: scale(1);
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-14"
        >
          <div>
            <Badge className="mb-3 md:mb-4 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white hover:from-red-600/80 hover:to-red-700/80 border-none shadow-md shadow-red-500/20 px-2 py-1 md:px-3 md:py-1.5 text-xs">
              ADVANCED CAPABILITIES
            </Badge>
            <h2 
              id="ai-capabilities-heading" 
              className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/90"
            >
              AI Capabilities Showcase
            </h2>
            <p className="text-base md:text-xl text-white/80 max-w-2xl">
              Explore our cutting-edge AI technologies powering next-generation solutions
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Button
              size="sm"
              variant="outline"
              className="text-white/80 hover:text-white border-red-500/20 hover:border-red-500/40 rounded-xl shadow-sm"
              onClick={() => handleTabChange("nlp")}
            >
              <ActivityIcon className="mr-2 h-4 w-4" />
              Explore Capabilities
            </Button>
          </div>
        </motion.div>

        {/* Error fallback */}
        {hasError ? (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-white mb-2">Something went wrong</h3>
            <p className="text-white/70 mb-4">{errorMessage}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700"
            >
              Reload Page
            </Button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div 
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Modern filter tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFilterChange(null)}
                    className={`rounded-full px-4 py-2 text-xs ${
                      filterTag === null ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-black/40 border-white/10 text-white/70'
                    }`}
                  >
                    All
                  </Button>
                  {['Language', 'Vision', 'Generation', 'Analysis'].map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange(tag)}
                      className={`rounded-full px-4 py-2 text-xs ${
                        filterTag === tag ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-black/40 border-white/10 text-white/70'
                      }`}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
                
                {/* Modern capability grid with small boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {safeCAPABILITY_DATA.map((capability) => (
                    <motion.div
                      key={capability.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleTabChange(capability.id)}
                      className={`capability-box cursor-pointer rounded-xl border bg-black/50 backdrop-blur-sm p-4 flex flex-col items-center text-center ${
                        activeTab === capability.id ? 'active border-red-500/60' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="relative">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/5 flex items-center justify-center mb-3">
                          <div className={`text-red-400 transition-all duration-300 ${activeTab === capability.id ? 'scale-110' : ''}`}>
                            {capability.icon}
                          </div>
                        </div>
                        <div className="micro-indicator absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></div>
                      </div>
                      <span className="text-sm font-medium text-white">{'shortTitle' in capability ? capability.shortTitle : capability.title}</span>
                      <span className="text-xs text-white/60 mt-1 line-clamp-2">
                        {capability.features[0]}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Selected capability preview */}
                {activeCapability && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-5 rounded-xl border border-red-500/20 bg-gradient-to-br from-black/90 to-zinc-900/70 backdrop-blur-md"
                  >
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 h-8 w-8 sm:h-10 sm:w-10">
                          {activeCapability.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <Badge className="mb-2 text-xs px-2 py-0.5 bg-red-500/10 text-red-400 border-red-500/20">
                          SELECTED CAPABILITY
                        </Badge>
                        <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                          {activeCapability.title}
                        </h3>
                        <p className="text-white/70 text-sm sm:text-base max-w-2xl">
                          {activeCapability.description}
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => setViewMode('detail')}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg shadow-md shadow-red-900/10"
                      >
                        Explore Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {activeCapability.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="mt-1 h-4 w-4 rounded-full bg-red-500/10 flex items-center justify-center">
                            <Check className="h-2.5 w-2.5 text-red-400" />
                          </div>
                          <span className="text-sm text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Compact capability cards list */}
                <div className="mt-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg sm:text-xl font-medium flex items-center gap-2">
                      <Brain className="h-5 w-5 text-red-400" />
                      All AI Capabilities
                    </h3>
                    <Badge variant="outline" className="px-2 py-1 text-xs border-red-500/20 text-white/70 bg-black/40">
                      {safeCAPABILITY_DATA.length} Total
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {safeCAPABILITY_DATA.map((capability) => (
                      <motion.div
                        key={capability.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleTabChange(capability.id)}
                        className="cursor-pointer p-4 rounded-lg border border-white/10 hover:border-red-500/20 bg-gradient-to-br from-black/80 to-zinc-900/60 backdrop-blur-sm flex items-start gap-4"
                      >
                        <div className="p-3 rounded-md bg-gradient-to-br from-red-500/10 to-red-600/5 flex-shrink-0">
                          <div className="text-red-400 h-5 w-5">
                            {capability.icon}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{capability.title}</h4>
                          <p className="text-xs text-white/60 line-clamp-2">{capability.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {capability.features.slice(0, 2).map((feature, idx) => (
                              <Badge 
                                key={idx} 
                                variant="outline" 
                                className="px-1.5 py-0.5 text-[10px] border-white/10 text-white/50"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
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
                <div className="sticky top-0 z-20 bg-gradient-to-b from-black via-black/95 to-transparent pb-6">
                  <div className="flex items-center justify-between py-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleBackToGrid}
                      className="flex items-center gap-2 text-white/80 hover:text-white bg-black/60 hover:bg-black/80 border border-white/10 hover:border-red-500/20 rounded-lg shadow-sm"
                    >
                      <ArrowRight className="h-4 w-4 rotate-180" />
                      <span>Back to Capabilities</span>
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500/20 text-red-400 border-none px-2 py-1">
                        Enterprise
                      </Badge>
                      <Badge className="bg-white/10 text-white/70 border-none px-2 py-1">
                        v2.0
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 shadow-lg shadow-red-500/5">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 text-red-500">
                        {activeCapability?.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl md:text-3xl font-semibold tracking-tight">
                        {activeCapability?.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/70 mt-1 max-w-2xl">
                        {activeCapability?.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {activeCapability && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-4">
                    <div className="space-y-6 md:space-y-8">
                      {/* Features Card */}
                      <Card className="border-white/10 bg-gradient-to-br from-black/90 to-zinc-900/90 overflow-hidden relative rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                        <CardHeader className="p-6 md:p-8 pb-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-red-500" />
                              <CardTitle className="text-base md:text-lg font-semibold">Key Features</CardTitle>
                            </div>
                            <Badge variant="outline" className="text-xs border-red-500/20 text-white/70">
                              {activeCapability.features.length} Total
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-4">
                          <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key={`capability-${activeCapability.id}-features`}
                          >
                            <div className="grid grid-cols-1 gap-3">
                              {activeCapability.features.map((feature, index) => (
                                <motion.div
                                  key={feature}
                                  variants={itemVariants}
                                  className="flex items-center gap-3 bg-gradient-to-r from-black/80 to-black/60 hover:from-red-500/5 hover:to-red-500/0 p-3 rounded-lg border border-white/10 hover:border-red-500/20 transition-all duration-300"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shadow-sm">
                                    <Check className="w-4 h-4 text-red-500" />
                                  </div>
                                  <span className="text-sm md:text-base text-white/90">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </CardContent>
                      </Card>

                      {/* Performance Metrics Card */}
                      <Card className="border-white/10 bg-gradient-to-br from-black/90 to-zinc-900/90 overflow-hidden rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/90 to-red-600/90"></div>
                        <CardHeader className="p-6 md:p-8 pb-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4 text-red-500" />
                              <CardTitle className="text-base md:text-lg font-semibold">Performance Metrics</CardTitle>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/5">
                                    <Info className="h-4 w-4 text-white/50" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                  <p className="text-xs max-w-60">Performance metrics based on internal benchmarks</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-4">
                          <PerformanceComparison metrics={PERFORMANCE_METRICS[activeTab]} />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                      {/* Live Demo Card */}
                      <Card className="border-white/10 bg-gradient-to-br from-black/90 to-zinc-900/90 h-full rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/90 to-red-600/90"></div>
                        <CardHeader className="p-6 md:p-8 pb-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <PlayCircle className="h-4 w-4 text-red-500" />
                              <CardTitle className="text-base md:text-lg font-semibold">Live Demonstration</CardTitle>
                            </div>
                            <Badge variant="outline" className="glass-effect text-white/70 border-red-500/20">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1.5"></div>
                              Live
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-4">
                          <div className="bg-black/30 border border-white/10 rounded-lg p-4 mb-4">
                            <p className="text-xs text-white/60 mb-2">This is a live demonstration of {activeCapability.title}. Interact with the demo to see it in action.</p>
                          </div>
                          <CapabilityDemo capability={activeCapability} />
                        </CardContent>
                      </Card>

                      {/* Try It Yourself Card */}
                      <Card className="border-white/10 bg-gradient-to-br from-black/90 to-zinc-900/90 overflow-hidden rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/80 to-red-600/80"></div>
                        <CardHeader className="p-6 md:p-8 pb-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MousePointerClick className="h-4 w-4 text-red-500" />
                              <CardTitle className="text-base md:text-lg font-semibold">Try It Yourself</CardTitle>
                            </div>
                            <Badge variant="outline" className="glass-effect text-white/70 border-white/10">
                              Interactive
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-4">
                          <TryItYourself 
                            capability={activeCapability.id} 
                            prompts={INTERACTIVE_PROMPTS[activeTab]} 
                          />
                          
                          {/* Model parameters UI with modern styling */}
                          {(activeCapability.id === "gen-ai" || activeCapability.id === "code-ai" || activeCapability.id === "nlp") && (
                            <div className="mt-6 pt-6 border-t border-white/10">
                              <div className="flex items-center gap-2 mb-4">
                                <Settings className="h-4 w-4 text-red-400" />
                                <h4 className="text-sm font-medium text-white/90">Model Parameters</h4>
                              </div>
                              <ModelParameters 
                                settings={modelSettings}
                                onChange={handleModelSettingsChange}
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
                
                {/* Related capabilities section */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Brain className="h-5 w-5 text-red-400" />
                      Related Capabilities
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleBackToGrid}
                      className="text-white/70 border-white/10 hover:border-red-500/20 text-xs rounded-lg"
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {safeCAPABILITY_DATA
                      .filter(c => c.id !== activeTab)
                      .slice(0, 4)
                      .map((capability) => (
                        <motion.div
                          key={capability.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => handleTabChange(capability.id)}
                          className="cursor-pointer p-4 rounded-lg border border-white/10 hover:border-red-500/20 bg-black/80 backdrop-blur-sm flex flex-col items-center text-center gap-2"
                        >
                          <div className="p-2 rounded-lg bg-red-500/10 flex-shrink-0">
                            <div className="text-red-400 h-5 w-5">
                              {capability.icon}
                            </div>
                          </div>
                          <h4 className="text-sm font-medium">{'shortTitle' in capability ? capability.shortTitle : capability.title}</h4>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        
        {/* AI particles effect for visual enhancement */}
        <div id="particles-container" className="absolute inset-0 z-0 pointer-events-none">
          {/* The particle effect container, which will be populated by AIParticlesEffect */}
          <AIParticlesEffect activeTab={activeTab} />
        </div>
      </div>
    </section>
  )
}

