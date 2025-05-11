"use client"

import { useState, useRef, useMemo, useCallback, useEffect } from "react"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Code, Eye, FileText, MessageSquare, Wand2, BarChart3, ArrowLeftRight, Play, RotateCcw, PlayCircle, MousePointerClick, Check, ArrowRight, ActivityIcon, Settings, MoveRight, Info, Zap, ChevronRight, ChevronDown, InfoIcon, Plus, Download, Trophy, X, CheckCircle } from "lucide-react"
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

// Added capabilities data
const capabilities: CapabilityData[] = [
  {
    id: "nlp",
    title: "Natural Language Processing",
    shortTitle: "NLP",
    icon: <MessageSquare className="h-4 w-4" />,
    description: "Enterprise-grade natural language processing for text analysis, sentiment detection, and language understanding. Process and analyze text data at scale.",
    features: [
      "Advanced text classification and categorization",
      "Sentiment analysis with 94% accuracy",
      "Named entity recognition and extraction",
      "Multi-language support for global operations",
      "Customizable language models for your domain",
      "Real-time text processing and analysis"
    ],
    demo: <div>NLP Demo</div>
  },
  {
    id: "cv",
    title: "Computer Vision",
    shortTitle: "Vision",
    icon: <Eye className="h-4 w-4" />,
    description: "State-of-the-art computer vision capabilities for image recognition, object detection, and visual data processing with industry-leading accuracy.",
    features: [
      "High-precision object detection and tracking",
      "Facial recognition with privacy controls",
      "Image classification and categorization",
      "Visual anomaly detection for quality control",
      "Scene understanding and context recognition",
      "Low-light and adverse condition performance"
    ],
    demo: <div>Computer Vision Demo</div>
  },
  {
    id: "ml",
    title: "Machine Learning",
    shortTitle: "ML",
    icon: <Brain className="h-4 w-4" />,
    description: "Comprehensive machine learning platform with automated model training, evaluation, and deployment for predictive analytics and data insights.",
    features: [
      "Automated model selection and hyperparameter tuning",
      "Distributed training for large datasets",
      "Model explainability and transparency tools",
      "Feature engineering automation",
      "Continuous learning and model updating",
      "Transfer learning from pre-trained models"
    ],
    demo: <div>Machine Learning Demo</div>
  },
  {
    id: "gen-ai",
    title: "Generative AI",
    shortTitle: "Gen AI",
    icon: <Wand2 className="h-4 w-4" />,
    description: "Creative content generation using advanced transformer models for text, images, and multimedia content creation with high coherence and relevance.",
    features: [
      "High-quality creative text generation",
      "Context-aware content creation",
      "Style and tone customization",
      "Multi-modal content generation",
      "Content optimization for specific platforms",
      "Enterprise-grade safety filters and controls"
    ],
    demo: <div>Generative AI Demo</div>
  },
  {
    id: "doc-ai",
    title: "Document Intelligence",
    shortTitle: "Docs",
    icon: <FileText className="h-4 w-4" />,
    description: "Intelligent document processing system for automated data extraction, classification, and analysis from structured and unstructured documents.",
    features: [
      "OCR with 99.7% character recognition accuracy",
      "Automated form field extraction and processing",
      "Document classification and routing",
      "Table and structured data extraction",
      "Integration with document management systems",
      "Compliance verification and validation"
    ],
    demo: <div>Document AI Demo</div>
  },
  {
    id: "code-ai",
    title: "Code Intelligence",
    shortTitle: "Code",
    icon: <Code className="h-4 w-4" />,
    description: "AI-powered code generation, optimization, and analysis for developers to increase productivity, quality, and maintainability of software projects.",
    features: [
      "Intelligent code completion and suggestions",
      "Automated code review and quality analysis",
      "Bug detection and security vulnerability scanning",
      "Code optimization and refactoring assistance",
      "Documentation generation from code",
      "Support for 20+ programming languages"
    ],
    demo: <div>Code AI Demo</div>
  }
];

// Helper function to get metrics for a capability
const getMetrics = (id: CapabilityId): MetricItem[] => {
  switch (id) {
    case "nlp":
      return [
        { name: "Accuracy", value: 94, color: "#10b981" },
        { name: "Speed", value: 88, color: "#3b82f6" },
        { name: "Efficiency", value: 92, color: "#f97316" },
        { name: "Cost", value: 79, color: "#6366f1" }
      ]
    case "cv":
      return [
        { name: "Accuracy", value: 97, color: "#10b981" },
        { name: "Speed", value: 84, color: "#3b82f6" },
        { name: "Efficiency", value: 89, color: "#f97316" },
        { name: "Cost", value: 72, color: "#6366f1" }
      ]
    case "ml":
      return [
        { name: "Accuracy", value: 91, color: "#10b981" },
        { name: "Speed", value: 95, color: "#3b82f6" },
        { name: "Efficiency", value: 87, color: "#f97316" },
        { name: "Cost", value: 83, color: "#6366f1" }
      ]
    case "gen-ai":
      return [
        { name: "Coherence", value: 93, color: "#10b981" },
        { name: "Creativity", value: 96, color: "#3b82f6" },
        { name: "Speed", value: 90, color: "#f97316" },
        { name: "Cost", value: 75, color: "#6366f1" }
      ]
    case "doc-ai":
      return [
        { name: "Extraction", value: 95, color: "#10b981" },
        { name: "Speed", value: 91, color: "#3b82f6" },
        { name: "Accuracy", value: 93, color: "#f97316" },
        { name: "Cost", value: 85, color: "#6366f1" }
      ]
    case "code-ai":
      return [
        { name: "Quality", value: 89, color: "#10b981" },
        { name: "Speed", value: 97, color: "#3b82f6" },
        { name: "Bug Rate", value: 92, color: "#f97316" },
        { name: "Efficiency", value: 86, color: "#6366f1" }
      ]
    default:
      return [
        { name: "Accuracy", value: 90, color: "#10b981" },
        { name: "Speed", value: 90, color: "#3b82f6" },
        { name: "Efficiency", value: 90, color: "#f97316" },
        { name: "Cost", value: 80, color: "#6366f1" }
      ]
  }
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

// Model parameters component
function ModelParameters({ 
  settings,
  onChange 
}: { 
  settings: { temperature: number; maxTokens: number; topP: number }; 
  onChange: (setting: string, value: number) => void 
}) {
  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <h4 className="text-sm font-medium mb-3 flex items-center">
        <Settings className="h-3.5 w-3.5 text-white/70 mr-1.5" />
        <span>Model Parameters</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="h-3.5 w-3.5 text-white/40 ml-1.5 cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="max-w-xs text-xs bg-black/90 border-white/10">
              <p>Adjust these parameters to control the model&apos;s behavior</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h4>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs text-white/70">Temperature: {settings.temperature.toFixed(1)}</label>
            <span className="text-[10px] text-white/50">{settings.temperature === 0 ? 'Deterministic' : settings.temperature > 0.7 ? 'Creative' : 'Balanced'}</span>
          </div>
          <Slider
            value={[settings.temperature]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={(values) => onChange('temperature', values[0])}
            className="my-1"
          />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs text-white/70">Max Tokens: {settings.maxTokens}</label>
            <span className="text-[10px] text-white/50">{settings.maxTokens < 512 ? 'Brief' : settings.maxTokens > 1536 ? 'Detailed' : 'Balanced'}</span>
          </div>
          <Slider
            value={[settings.maxTokens]}
            min={128}
            max={2048}
            step={128}
            onValueChange={(values) => onChange('maxTokens', values[0])}
            className="my-1"
          />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs text-white/70">Top P: {settings.topP.toFixed(1)}</label>
            <span className="text-[10px] text-white/50">{settings.topP < 0.5 ? 'Focused' : settings.topP > 0.8 ? 'Diverse' : 'Balanced'}</span>
          </div>
          <Slider
            value={[settings.topP]}
            min={0.1}
            max={1}
            step={0.1}
            onValueChange={(values) => onChange('topP', values[0])}
            className="my-1"
          />
        </div>
      </div>
    </div>
  );
}

// New advanced visualization component
function AdvancedMetricsVisualization({ 
  metrics,
  showComparison = false,
  comparisonData = null
}: { 
  metrics: MetricItem[]
  showComparison?: boolean
  comparisonData?: { name: string, metrics: MetricItem[] }[] | null
}) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <h4 className="text-xs sm:text-sm font-medium">Performance Analysis</h4>
        <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[9px] sm:text-xs py-0 px-1.5 h-4 sm:h-5">Advanced</Badge>
      </div>
      
      {/* Advanced radar chart representation - better on mobile */}
      <div className="h-48 sm:h-64 w-full relative bg-black/30 rounded-lg border border-white/10 p-2 sm:p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Simulated radar chart with mobile-friendly sizing */}
          <div className="w-36 h-36 sm:w-48 sm:h-48 relative">
            {/* Radar background levels */}
            <div className="absolute inset-0 rounded-full border border-white/5"></div>
            <div className="absolute inset-[10%] rounded-full border border-white/5"></div>
            <div className="absolute inset-[20%] rounded-full border border-white/5"></div>
            <div className="absolute inset-[30%] rounded-full border border-white/5"></div>
            <div className="absolute inset-[40%] rounded-full border border-white/5"></div>
            <div className="absolute inset-[50%] rounded-full border border-white/5"></div>
            <div className="absolute inset-[60%] rounded-full border border-white/5"></div>
            <div className="absolute inset-[70%] rounded-full border border-white/5"></div>
            
            {/* Radar axis lines */}
            <div className="absolute h-full w-[1px] bg-white/10 left-1/2 top-0"></div>
            <div className="absolute w-full h-[1px] bg-white/10 top-1/2 left-0"></div>
            <div className="absolute h-full w-[1px] bg-white/10 left-1/2 top-0 rotate-45 origin-center"></div>
            <div className="absolute h-full w-[1px] bg-white/10 left-1/2 top-0 rotate-[135deg] origin-center"></div>
            
            {/* Metric labels - smaller on mobile */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 sm:-translate-y-3 text-[8px] sm:text-[10px] text-white/60">
              {metrics[0]?.name || "Accuracy"}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 sm:translate-y-3 text-[8px] sm:text-[10px] text-white/60">
              {metrics[1]?.name || "Speed"}
            </div>
            <div className="absolute top-1/2 left-0 -translate-x-2 sm:-translate-x-3 -translate-y-1/2 text-[8px] sm:text-[10px] text-white/60">
              {metrics[2]?.name || "Efficiency"}
            </div>
            <div className="absolute top-1/2 right-0 translate-x-2 sm:translate-x-3 -translate-y-1/2 text-[8px] sm:text-[10px] text-white/60">
              {metrics[3]?.name || "Cost"}
            </div>
            
            {/* Radar data polygon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="rotate-45">
                <polygon 
                  points={`
                    50,${50 - (metrics[0]?.value / 2 || 40)} 
                    ${50 + (metrics[1]?.value / 2 || 40)},50 
                    50,${50 + (metrics[2]?.value / 2 || 40)} 
                    ${50 - (metrics[3]?.value / 2 || 40)},50
                  `}
                  fill="rgba(239, 68, 68, 0.2)"
                  stroke="#ef4444"
                  strokeWidth="1"
                />
                
                {showComparison && comparisonData && comparisonData.map((item, idx) => (
                  <polygon 
                    key={idx}
                    points={`
                      50,${50 - (item.metrics[0]?.value / 2 || 35)} 
                      ${50 + (item.metrics[1]?.value / 2 || 35)},50 
                      50,${50 + (item.metrics[2]?.value / 2 || 35)} 
                      ${50 - (item.metrics[3]?.value / 2 || 35)},50
                    `}
                    fill={`rgba(${idx === 0 ? '59, 130, 246' : idx === 1 ? '16, 185, 129' : '245, 158, 11'}, 0.2)`}
                    stroke={idx === 0 ? '#3b82f6' : idx === 1 ? '#10b981' : '#f59e0b'}
                    strokeWidth="1"
                    strokeDasharray={idx === 0 ? "0" : idx === 1 ? "3,2" : "5,2"}
                  />
                ))}
              </svg>
            </div>
            
            {/* Center point */}
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
        
        {/* Legend for comparison - more compact on mobile */}
        {showComparison && comparisonData && (
          <div className="absolute bottom-1.5 sm:bottom-3 right-1.5 sm:right-3 bg-black/60 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[8px] sm:text-[10px] text-white/80">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 mr-1"></div>
              <span>Current</span>
            </div>
            {comparisonData.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 mr-1 ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Detailed metrics breakdown - Improved for mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-black/20 p-2 sm:p-3 rounded-lg border border-white/5">
            <div className="text-[9px] sm:text-[10px] text-white/50 mb-0.5 sm:mb-1">{metric.name}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm font-medium" style={{ color: metric.color }}>
                {metric.value}%
              </div>
              <div className="text-[8px] sm:text-[10px] text-white/60 px-1 sm:px-1.5 py-0 sm:py-0.5 bg-white/5 rounded-full">
                {metric.value >= 95 ? "Excellent" : metric.value >= 85 ? "Great" : metric.value >= 75 ? "Good" : "Average"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Add a new DetailedComparisonView component after the AdvancedMetricsVisualization component
function DetailedComparisonView({
  capabilities,
  selectedCapabilities,
  activeCapability
}: {
  capabilities: CapabilityData[]
  selectedCapabilities: CapabilityId[]
  activeCapability: CapabilityId
}) {
  // Get full data for selected capabilities
  const selectedCapabilityData = capabilities.filter(c => selectedCapabilities.includes(c.id));
  
  // Generate comparison metrics
  const comparisonMetrics = selectedCapabilityData.map(cap => ({
    id: cap.id,
    name: cap.shortTitle || cap.title,
    metrics: getMetrics(cap.id)
  }));
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Performance Matrix - Improved for mobile */}
      <div className="bg-black/30 rounded-lg border border-white/10 p-3 sm:p-5">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-sm sm:text-base md:text-lg font-medium flex items-center">
            <BarChart3 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
            Performance Matrix
          </h3>
          <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 text-[9px] sm:text-xs">
            {selectedCapabilities.length} capabilities
          </Badge>
        </div>
        
        <div className="overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[400px] text-[11px] sm:text-xs md:text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-1.5 sm:p-2 font-medium text-white/70">Metric</th>
                {comparisonMetrics.map((capMetric) => (
                  <th 
                    key={capMetric.id} 
                    className={`text-center p-1.5 sm:p-2 font-medium ${capMetric.id === activeCapability ? 'text-red-400' : 'text-white/70'}`}
                  >
                    {capMetric.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['Accuracy', 'Speed', 'Efficiency', 'Cost'].map((metricName, idx) => (
                <tr key={metricName} className={idx % 2 === 0 ? 'bg-white/5' : ''}>
                  <td className="p-1.5 sm:p-2 text-white/80">{metricName}</td>
                  {comparisonMetrics.map((capMetric) => {
                    const metric = capMetric.metrics.find(m => m.name === metricName);
                    const value = metric?.value || 0;
                    // Find the best value in this row to highlight
                    const bestValue = Math.max(...comparisonMetrics.map(cm => {
                      const m = cm.metrics.find(m => m.name === metricName);
                      return m?.value || 0;
                    }));
                    const isHighest = value === bestValue;
                    
                    return (
                      <td 
                        key={`${capMetric.id}-${metricName}`} 
                        className={`p-1.5 sm:p-2 text-center ${
                          isHighest 
                            ? 'font-medium text-green-400' 
                            : capMetric.id === activeCapability 
                              ? 'text-white/90' 
                              : 'text-white/70'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                          {isHighest && <Trophy className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-400" />}
                          {value}%
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="bg-black/30 border-t border-white/10">
                <td className="p-1.5 sm:p-2 font-medium text-white/80">Overall</td>
                {comparisonMetrics.map((capMetric) => {
                  // Calculate average of all metrics
                  const avg = Math.round(
                    capMetric.metrics.reduce((sum, m) => sum + m.value, 0) / 
                    capMetric.metrics.length
                  );
                  return (
                    <td 
                      key={`${capMetric.id}-overall`}
                      className={`p-1.5 sm:p-2 text-center font-medium ${
                        capMetric.id === activeCapability 
                          ? 'text-red-400' 
                          : 'text-white/90'
                      }`}
                    >
                      {avg}%
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Advanced Visualization - Improved layout for mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Radar Chart */}
        <div className="bg-black/30 rounded-lg border border-white/10 p-3 sm:p-5">
          <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-4 flex items-center">
            <Zap className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500" />
            Capability Radar
          </h3>
          
          <div className="aspect-square w-full max-w-[300px] mx-auto relative">
            <AdvancedMetricsVisualization 
              metrics={getMetrics(activeCapability)}
              showComparison={true}
              comparisonData={comparisonMetrics.filter(cm => cm.id !== activeCapability)}
            />
          </div>
        </div>
        
        {/* Feature Matrix */}
        <div className="bg-black/30 rounded-lg border border-white/10 p-3 sm:p-5">
          <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-4 flex items-center">
            <Check className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
            Feature Comparison
          </h3>
          
          <div className="space-y-2 sm:space-y-3 max-h-[250px] sm:max-h-[300px] overflow-y-auto scrollbar-hide pr-1 sm:pr-2">
            {/* Generate feature comparison list */}
            {selectedCapabilityData.flatMap(cap => cap.features)
              // Remove duplicates
              .filter((feat, idx, arr) => arr.indexOf(feat) === idx)
              // Sort alphabetically
              .sort()
              .slice(0, 8) // Limit to 8 features for space
              .map(feature => (
                <div key={feature} className="flex items-center text-[11px] sm:text-sm bg-black/20 rounded-lg p-2 sm:p-3 border border-white/5">
                  <span className="text-white/80 flex-grow line-clamp-2 sm:line-clamp-1">{feature}</span>
                  <div className="flex gap-1 sm:gap-2 ml-2 flex-shrink-0">
                    {selectedCapabilityData.map(cap => {
                      const hasFeature = cap.features.includes(feature);
                      return (
                        <div 
                          key={`${cap.id}-${feature}`} 
                          className={`w-6 sm:w-8 flex justify-center ${cap.id === activeCapability ? 'bg-red-500/10 rounded-md' : ''}`}
                        >
                          {hasFeature ? (
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 sm:h-4 sm:w-4 text-red-500/50" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Capability Strength Analysis - Mobile optimized */}
      <div className="bg-black/30 rounded-lg border border-white/10 p-3 sm:p-5">
        <h3 className="text-sm sm:text-base md:text-lg font-medium mb-3 sm:mb-4 flex items-center">
          <Brain className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
          Capability Strength Analysis
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {selectedCapabilityData.map(cap => {
            // Calculate strengths based on metrics
            const metrics = getMetrics(cap.id);
            const topMetrics = [...metrics].sort((a, b) => b.value - a.value).slice(0, 2);
            
            return (
              <div 
                key={cap.id} 
                className={`bg-black/20 p-3 sm:p-4 rounded-lg border ${
                  cap.id === activeCapability ? 'border-red-500/30 bg-red-500/5' : 'border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${cap.id === activeCapability ? 'bg-red-500/20' : 'bg-white/10'} text-${cap.id === activeCapability ? 'red' : 'white'}-400`}>
                    {cap.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm">{cap.title}</h4>
                    <p className="text-[10px] sm:text-xs text-white/60">Optimal use cases</p>
                  </div>
                </div>
                
                <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                  <div>
                    <div className="text-[10px] sm:text-xs text-white/60 mb-0.5 sm:mb-1">Top Strengths</div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {topMetrics.map(metric => (
                        <Badge 
                          key={metric.name} 
                          className="bg-black/30 text-white border border-white/10 py-0 px-1.5 h-[18px] sm:h-5"
                        >
                          <span className="text-[9px] sm:text-[10px]" style={{ color: metric.color }}>{metric.name}: {metric.value}%</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] sm:text-xs text-white/60 mb-0.5 sm:mb-1">Recommended For</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-white/80 line-clamp-2">
                      {cap.id === 'nlp' && 'Text analysis, sentiment detection, and language understanding'}
                      {cap.id === 'cv' && 'Image recognition, object detection, and visual inspection'}
                      {cap.id === 'ml' && 'Predictive analytics, anomaly detection, and pattern recognition'}
                      {cap.id === 'gen-ai' && 'Content creation, text generation, and creative assistance'}
                      {cap.id === 'doc-ai' && 'Document processing, information extraction, and form analysis'}
                      {cap.id === 'code-ai' && 'Code generation, debugging, and development assistance'}
                    </div>
                  </div>
                </div>
                
                <div className="text-[10px] sm:text-xs text-white/60 mb-0.5 sm:mb-1">Effectiveness by Industry</div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
                  {['Finance', 'Healthcare', 'Retail', 'Manufacturing'].map(industry => {
                    // Generate random effectiveness score for demo
                    const score = cap.id === 'nlp' && industry === 'Finance' ? 95 :
                                  cap.id === 'cv' && industry === 'Healthcare' ? 97 : 
                                  cap.id === 'gen-ai' && industry === 'Retail' ? 93 :
                                  cap.id === 'doc-ai' && industry === 'Finance' ? 98 :
                                  cap.id === 'ml' && industry === 'Manufacturing' ? 96 :
                                  cap.id === 'code-ai' && industry === 'Retail' ? 88 :
                                  Math.floor(Math.random() * 30) + 65;
                                  
                    return (
                      <div key={industry} className="flex justify-between items-center">
                        <span className="text-[9px] sm:text-[10px] text-white/70">{industry}</span>
                        <Badge 
                          className={`${
                            score >= 95 ? 'bg-green-500/20 text-green-400' :
                            score >= 85 ? 'bg-blue-500/20 text-blue-400' :
                            score >= 75 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-white/10 text-white/70'
                          } py-0 h-[16px] sm:h-4`}
                        >
                          <span className="text-[8px] sm:text-[9px]">{score}%</span>
                        </Badge>
                      </div>
                    );
                  })}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between text-[9px] sm:text-[10px] h-6 sm:h-7 hover:bg-white/5 text-white/60 hover:text-white"
                >
                  <span>View Detailed Analysis</span>
                  <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Add interactive demo enhancements to the CapabilityDemo component
// Replace the existing placeholder CapabilityDemo implementation in the imports section
function EnhancedCapabilityDemo({ capability }: { capability: CapabilityData }) {
  const [isRunning, setIsRunning] = useState(false);
  const [demoResult, setDemoResult] = useState<string | null>(null);
  const [demoProgress, setDemoProgress] = useState(0);
  const [advancedMode, setAdvancedMode] = useState(false);
  
  // Run the demo with simulated processing
  const runDemo = () => {
    setIsRunning(true);
    setDemoResult(null);
    setDemoProgress(0);
    
    // Simulate demo progress
    const interval = setInterval(() => {
      setDemoProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Generate result based on capability type
            generateDemoResult();
            setIsRunning(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  // Generate demo result based on capability type
  const generateDemoResult = () => {
    switch (capability.id) {
      case 'nlp':
        setDemoResult("Sentiment Analysis Result: Positive (92% confidence)\nEntities: [Organization: Mindscape], [Person: John Doe], [Date: Next Monday]\nKey Topics: Customer Service, Product Feedback, Feature Request");
        break;
      case 'cv':
        setDemoResult("Objects Detected: Person (99.2%), Car (98.7%), Building (95.1%)\nScene Context: Urban Street\nWeather Conditions: Clear Day\nSafety Concerns: None detected");
        break;
      case 'ml':
        setDemoResult("Prediction: Customer likely to convert (87% probability)\nKey Factors: Recent site visits (3+), Product page views (5+), Pricing page visit\nRecommended Action: Send personalized email with limited-time offer");
        break;
      case 'gen-ai':
        setDemoResult("Generated Content:\n\nIntroducing Mindscape, the revolutionary AI analytics platform designed to transform your business data into actionable insights. Our enterprise-grade solution combines powerful machine learning algorithms with intuitive visualization tools, enabling you to make data-driven decisions with confidence.");
        break;
      case 'doc-ai':
        setDemoResult("Document Type: Invoice\nVendor: Acme Corporation\nInvoice #: INV-12345\nDate: 2023-05-15\nAmount: $1,285.50\nTax: $102.84\nTotal: $1,388.34\nExtracted Items: 5 line items with quantities and unit prices");
        break;
      case 'code-ai':
        setDemoResult("```javascript\n// Generated React component\nimport React, { useState, useEffect } from 'react';\n\nconst DataVisualizer = ({ data, config }) => {\n  const [processedData, setProcessedData] = useState([]);\n  \n  useEffect(() => {\n    // Transform data for visualization\n    const transformed = data.map(item => ({\n      id: item.id,\n      value: item.metrics.reduce((sum, m) => sum + m.value, 0),\n      category: item.category,\n      timestamp: new Date(item.timestamp)\n    }));\n    \n    setProcessedData(transformed);\n  }, [data]);\n  \n  return (\n    <div className=\"data-visualizer\">\n      <h2>{config.title}</h2>\n      {/* Visualization component would go here */}\n      <div className=\"metrics-summary\">\n        <p>Total items: {processedData.length}</p>\n        <p>Average value: {processedData.reduce((sum, item) => sum + item.value, 0) / processedData.length}</p>\n      </div>\n    </div>\n  );\n};\n\nexport default DataVisualizer;\n```");
        break;
      default:
        setDemoResult("Demo completed successfully. Results show high accuracy and performance metrics across all test cases.");
    }
  };
  
  // Reset the demo
  const resetDemo = () => {
    setDemoResult(null);
    setDemoProgress(0);
    setIsRunning(false);
  };
  
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="text-[10px] sm:text-xs text-white/60">Demo Mode:</div>
          <div className="flex items-center gap-0.5 bg-black/30 rounded-full p-0.5 sm:p-1">
            <button 
              className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${!advancedMode ? 'bg-red-500 text-white' : 'text-white/60'}`}
              onClick={() => setAdvancedMode(false)}
            >
              Standard
            </button>
            <button 
              className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${advancedMode ? 'bg-red-500 text-white' : 'text-white/60'}`}
              onClick={() => setAdvancedMode(true)}
            >
              Advanced
            </button>
          </div>
        </div>
        
        <Badge className="bg-black/40 text-white/70 border-white/10 text-[9px] sm:text-xs">Real-time Demo</Badge>
      </div>
      
      <div className="bg-black/20 rounded-lg p-2 sm:p-4 border border-white/10 relative overflow-hidden">
        {/* Demo visualization area */}
        <div className="mb-3 sm:mb-4 aspect-video w-full bg-black/30 rounded-md border border-white/5 flex items-center justify-center relative">
          {!demoResult && !isRunning && (
            <div className="text-center p-2 sm:p-4">
              <div className="text-white/40 text-xs sm:text-sm mb-2">
                {capability.id === 'nlp' && 'Text Analysis Demo'}
                {capability.id === 'cv' && 'Visual Recognition Demo'}
                {capability.id === 'ml' && 'Predictive Analytics Demo'}
                {capability.id === 'gen-ai' && 'Content Generation Demo'}
                {capability.id === 'doc-ai' && 'Document Processing Demo'}
                {capability.id === 'code-ai' && 'Code Generation Demo'}
              </div>
              <Button 
                size="sm"
                onClick={runDemo}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 h-7 sm:h-8 text-[10px] sm:text-xs"
              >
                <Play className="mr-1 sm:mr-2 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                Run Demo
              </Button>
            </div>
          )}
          
          {isRunning && (
            <div className="text-center w-full px-3 sm:px-4">
              <div className="text-white/60 text-xs sm:text-sm mb-1.5 sm:mb-2">Processing...</div>
              <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden mb-1">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ease-out"
                  style={{ width: `${demoProgress}%` }}
                ></div>
              </div>
              <div className="text-[9px] sm:text-xs text-white/40">{Math.round(demoProgress)}%</div>
            </div>
          )}
          
          {demoResult && (
            <div className="absolute inset-0 p-2 sm:p-4 overflow-auto font-mono text-[10px] sm:text-xs text-white/80 whitespace-pre-wrap">
              {demoResult}
            </div>
          )}
        </div>
        
        {/* Demo controls */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={resetDemo}
            disabled={isRunning}
            className="text-[10px] sm:text-xs h-6 sm:h-8 border-white/10 text-white/70 px-1.5 sm:px-3"
          >
            <RotateCcw className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
            Reset
          </Button>
          
          {advancedMode && (
            <div className="flex items-center gap-1 sm:gap-2 order-3 sm:order-2 w-full sm:w-auto justify-center">
              <div className="flex items-center gap-1">
                <label className="text-[9px] sm:text-xs text-white/60">Speed:</label>
                <select className="text-[9px] sm:text-xs bg-black/40 border border-white/10 rounded-md px-1 sm:px-2 py-0.5 sm:py-1 text-white/80">
                  <option>Fast</option>
                  <option>Standard</option>
                  <option>Detailed</option>
                </select>
              </div>
              
              <div className="flex items-center gap-1">
                <label className="text-[9px] sm:text-xs text-white/60">Sample:</label>
                <select className="text-[9px] sm:text-xs bg-black/40 border border-white/10 rounded-md px-1 sm:px-2 py-0.5 sm:py-1 text-white/80">
                  <option>Demo A</option>
                  <option>Demo B</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          )}
          
          <Button 
            size="sm"
            disabled={isRunning}
            variant={demoResult ? "ghost" : "default"}
            onClick={runDemo}
            className={`${demoResult ? "text-white/60 hover:text-white hover:bg-white/5" : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0"} text-[10px] sm:text-xs h-6 sm:h-8 order-2 sm:order-3 px-1.5 sm:px-3`}
          >
            <Play className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
            {demoResult ? "Run Again" : "Start Demo"}
          </Button>
        </div>
      </div>
    </div>
  );
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
              Advanced Performance Analysis
            </h3>
            <AdvancedMetricsVisualization metrics={metrics} />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3 md:space-y-5">
        <Card className="border-white/10 bg-gradient-to-br from-black/90 to-zinc-900/90 rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300">
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
            <EnhancedCapabilityDemo capability={capability} />
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

// Remove the AnimatedBackground component and replace with minimal background
const MinimalBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 z-0"></div>
);

// AI Capabilities Showcase Component - Enhanced
const AICapabilitiesShowcase = () => {
  const [activeCapability, setActiveCapability] = useState<CapabilityId>("nlp")
  const [comparisonActive, setComparisonActive] = useState(false)
  const [selectedCapabilities, setSelectedCapabilities] = useState<CapabilityId[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [modelSettings, setModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 1024,
    topP: 0.9
  })
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Handle window resize for mobile detection
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
  
  // Model settings handler
  const handleModelSettingChange = (setting: string, value: number) => {
    setModelSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }
  
  // Enhanced capability comparison function with detailed analysis
  const toggleCapabilityComparison = (id: CapabilityId) => {
    setComparisonActive(true)
    if (selectedCapabilities.includes(id)) {
      setSelectedCapabilities(selectedCapabilities.filter(c => c !== id))
    } else {
      if (selectedCapabilities.length < 3) {
        // Add animation effect when adding a new capability
        const newCapabilities = [...selectedCapabilities, id];
        setSelectedCapabilities(newCapabilities)
        
        // Generate detailed comparison data for visualization
        const comparisonData = {
          primaryMetrics: getMetrics(id),
          secondaryMetrics: selectedCapabilities.map(capId => ({
            id: capId,
            metrics: getMetrics(capId)
          })),
          comparisonDate: new Date().toISOString(),
          comparisonId: `comp-${Date.now()}`
        };
        
        // Store comparison data for visualization
        // This is a placeholder for state that would be used in a real implementation
        console.log("Generated comparison data:", comparisonData);
      }
    }
  }
  
  // Get active capability data
  const activeCapabilityData = capabilities.find(c => c.id === activeCapability)!
  
  // Get metrics for active capability
  const activeMetrics = useMemo(() => getMetrics(activeCapability), [activeCapability])
  
  // Sample prompts for each capability
  const getPrompts = (id: CapabilityId): string[] => {
    switch (id) {
      case "nlp":
        return [
          "Analyze the sentiment of: 'I absolutely love the new features in this update!'",
          "Summarize this text in a few sentences: [paste your text here]",
          "Extract key entities from this news article: [paste article here]"
        ]
      case "cv":
        return [
          "Detect and classify objects in this image",
          "Identify facial expressions in the uploaded photo",
          "Segment the foreground from the background in this picture"
        ]
      case "ml":
        return [
          "Predict customer churn based on this transaction history",
          "Classify these product reviews into categories",
          "Cluster these customer profiles by behavior patterns"
        ]
      case "gen-ai":
        return [
          "Generate a creative story about a space explorer discovering a new planet",
          "Create a marketing description for a new smartphone with advanced AI features",
          "Write a professional email responding to a customer inquiry about our AI services"
        ]
      case "doc-ai":
        return [
          "Extract key information from this invoice",
          "Summarize the main points from this legal contract",
          "Convert this form into structured data"
        ]
      case "code-ai":
        return [
          "Generate a React component for a responsive navigation menu",
          "Explain this Python function and suggest optimizations",
          "Convert this JavaScript function to TypeScript with proper typing"
        ]
      default:
        return ["Sample prompt 1", "Sample prompt 2", "Sample prompt 3"]
    }
  }
  
  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px] animate-pulse-slow"></div>
      
      {activeCapability && <AIParticlesEffect activeTab={activeCapability} />}
      
      <div className="relative z-10">
        {/* Enhanced header section with better mobile responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10 items-center">
          {/* Left column: Title and description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-2 sm:mb-3 md:mb-4 inline-flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Badge 
                  variant="outline"
                  className="text-xs sm:text-sm font-medium bg-red-500/10 backdrop-blur-sm border-red-500/30 text-red-400 shadow-glow-sm shadow-red-500/20 px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5"
                >
                  ADVANCED CAPABILITIES
                </Badge>
              </motion.div>
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold tracking-tight mb-1 sm:mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
            >
              Enterprise-Grade <span className="text-red-500">AI Capabilities</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xs sm:text-sm md:text-base text-white/70 max-w-md"
            >
              Explore our advanced AI capabilities designed to solve complex business challenges across industries.
            </motion.p>
          </motion.div>

          {/* Right column: Additional actions */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-2 sm:gap-3 justify-start md:justify-end mt-2 md:mt-0"
          >
            <Button 
              variant="outline" 
              className={`${comparisonActive ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'border-white/20 hover:border-red-500/40'} backdrop-blur-sm transition-all duration-300 hover:shadow-glow-sm hover:shadow-red-500/20 text-xs sm:text-sm p-2 sm:px-3 h-8 sm:h-9 md:h-10`}
              onClick={() => setComparisonActive(!comparisonActive)}
            >
              <BarChart3 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 mr-1 sm:mr-1.5 md:mr-2" />
              {comparisonActive ? "Exit Comparison" : "Compare Capabilities"}
            </Button>
            
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white border-0 text-xs sm:text-sm p-2 sm:px-3 h-8 sm:h-9 md:h-10"
            >
              <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 mr-1 sm:mr-1.5 md:mr-2" />
              Documentation
            </Button>
          </motion.div>
        </div>
        
        {/* Capability selector - Mobile and Desktop versions */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          {isMobile ? (
            <div className="relative">
              <Button 
                variant="outline" 
                className="w-full justify-between border-white/10 bg-black/20 backdrop-blur-sm text-left font-normal text-sm py-2 h-auto"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <div className="flex items-center">
                  <div className="mr-2 flex-shrink-0 p-1.5 bg-red-500/10 rounded-md">
                    {activeCapabilityData.icon}
                  </div>
                  <span className="truncate">{activeCapabilityData.title}</span>
                </div>
                <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
              </Button>
              
              {showMobileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-50 mt-1 w-full bg-black/90 border border-white/10 rounded-md overflow-hidden max-h-60 overflow-y-auto scrollbar-hide"
                >
                  {capabilities.map((capability) => (
                    <div
                      key={capability.id}
                      className={`flex items-center p-2.5 cursor-pointer hover:bg-white/5 ${activeCapability === capability.id ? 'bg-white/10' : ''}`}
                      onClick={() => {
                        setActiveCapability(capability.id);
                        setShowMobileMenu(false);
                      }}
                    >
                      <div className="mr-2 flex-shrink-0 p-1.5 bg-red-500/10 rounded-md">
                        {capability.icon}
                      </div>
                      <span className="text-sm">{capability.title}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <Tabs 
                defaultValue={activeCapability} 
                value={activeCapability} 
                onValueChange={(value) => setActiveCapability(value as CapabilityId)}
                className="w-full"
              >
                <TabsList className="bg-black/20 border border-white/10 p-1 min-w-max">
                  {capabilities.map((capability) => (
                    <TabsTrigger 
                      key={capability.id} 
                      value={capability.id}
                      className="data-[state=active]:bg-white/10 whitespace-nowrap text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-red-500/10 rounded-md">
                          {capability.icon}
                        </div>
                        <span>{capability.shortTitle || capability.title}</span>
                        {comparisonActive && (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCapabilityComparison(capability.id);
                            }}
                            className={`ml-1 p-0.5 rounded-md ${selectedCapabilities.includes(capability.id) ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/40 hover:text-white/60'}`}
                          >
                            {selectedCapabilities.includes(capability.id) ? (
                              <Check className="h-3.5 w-3.5" />
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
        
        {/* Main content section - conditionally render comparison or single capability view */}
        <AnimatePresence mode="wait">
          {comparisonActive ? (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              {selectedCapabilities.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Display selected capabilities in cards */}
                    {selectedCapabilities.map(id => {
                      const capability = capabilities.find(c => c.id === id);
                      if (!capability) return null;
                      
                      return (
                        <Card key={id} className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/80 to-red-600/80"></div>
                          <CardContent className="p-4 sm:p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                                {capability.icon}
                              </div>
                              <div>
                                <h3 className="font-medium text-sm sm:text-base">{capability.title}</h3>
                                <p className="text-xs text-white/60 line-clamp-1">Specialized AI capability</p>
                              </div>
                            </div>
                            
                            <p className="text-xs md:text-sm text-white/70 mb-4 line-clamp-3">
                              {capability.description}
                            </p>
                            
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-xs font-medium text-white/80 mb-1 flex items-center">
                                  <Check className="h-3 w-3 text-red-500 mr-1" />
                                  Key Metrics
                                </h4>
                                
                                <div className="grid grid-cols-2 gap-2">
                                  {activeMetrics.slice(0, 4).map((metric, idx) => (
                                    <div key={idx} className="bg-black/20 p-2 rounded border border-white/5">
                                      <div className="text-[10px] text-white/50 mb-0.5">{metric.name}</div>
                                      <div className="flex items-center justify-between">
                                        <div className="text-xs font-medium" style={{ color: metric.color }}>
                                          {metric.value}%
                                        </div>
                                        <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full rounded-full" 
                                            style={{ 
                                              width: `${metric.value}%`,
                                              backgroundColor: metric.color
                                            }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="w-full justify-between text-[10px] h-7 hover:bg-white/5 text-white/60 hover:text-white"
                                onClick={() => setActiveCapability(id)}
                              >
                                <span>View Details</span>
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  
                  {selectedCapabilities.length > 1 && (
                    <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/80 to-red-600/80"></div>
                      <CardHeader>
                        <CardTitle className="text-base md:text-lg">Capabilities Comparison</CardTitle>
                        <CardDescription>Compare performance metrics across selected AI capabilities</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DetailedComparisonView 
                          capabilities={capabilities}
                          selectedCapabilities={selectedCapabilities}
                          activeCapability={activeCapability}
                        />
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="text-center bg-black/20 border border-white/10 rounded-lg p-6 sm:p-8">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2">Compare AI Capabilities</h3>
                  <p className="text-sm sm:text-base text-white/60 mb-6 max-w-md mx-auto">
                    Select two or more capabilities to compare their performance metrics, features, and use cases.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {capabilities.slice(0, 3).map(c => (
                      <Button
                        key={c.id}
                        variant="outline"
                        className="border-white/10 bg-black/20 text-sm"
                        onClick={() => toggleCapabilityComparison(c.id)}
                      >
                        <div className="flex items-center gap-1.5">
                          {c.icon}
                          <span>{c.shortTitle || c.title}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="capability-detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CapabilityTabContent 
                capability={activeCapabilityData}
                metrics={activeMetrics}
                prompts={getPrompts(activeCapability)}
                modelSettings={modelSettings}
                onModelSettingsChange={handleModelSettingChange}
                toggleCapabilityComparison={toggleCapabilityComparison}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AICapabilitiesShowcase

