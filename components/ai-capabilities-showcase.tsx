"use client"

import { useState, useRef, useEffect } from "react"
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

const capabilities = [
  {
    id: "nlp",
    title: "Natural Language Processing",
    icon: <MessageSquare className="h-6 w-6" />,
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
    icon: <Eye className="h-6 w-6" />,
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
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
            alt="Computer Vision Demo"
            className="w-full h-full object-cover opacity-80"
          />
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
    icon: <Brain className="h-6 w-6" />,
    description:
      "Our machine learning algorithms learn from data patterns to make predictions, classifications, and recommendations.",
    features: [
      "Predictive Analytics",
      "Anomaly Detection",
      "Recommendation Systems",
      "Time Series Forecasting",
      "Clustering & Classification",
    ],
    demo: (
      <div className="space-y-4">
        <div className="bg-black/40 p-4 rounded-lg border border-white/10 h-[180px] relative overflow-hidden">
          {/* Simulated ML prediction graph */}
          <svg viewBox="0 0 400 120" className="w-full h-full absolute inset-0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.5)" />
                <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
              </linearGradient>
            </defs>
            {/* Actual data line */}
            <polyline
              points="0,100 40,80 80,90 120,60 160,70 200,40 240,50 280,30 320,45 360,20 400,30"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
            />
            {/* Prediction line (dashed) */}
            <polyline
              points="400,30 440,20 480,35 520,15 560,25"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeDasharray="5,5"
            />
            {/* Area under the curve */}
            <path
              d="M0,100 40,80 80,90 120,60 160,70 200,40 240,50 280,30 320,45 360,20 400,30 L400,120 L0,120 Z"
              fill="url(#gradient)"
            />
          </svg>
          <div className="absolute bottom-2 right-2 bg-black/60 text-xs text-white/80 px-2 py-1 rounded">
            Prediction Confidence: 92%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Model Accuracy</p>
            <div className="flex items-center">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-red-500 rounded-full"></div>
              </div>
              <span className="ml-2 text-white font-medium">92%</span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Training Data</p>
            <p className="text-lg font-medium">1.2M samples</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "gen-ai",
    title: "Generative AI",
    icon: <Wand2 className="h-6 w-6" />,
    description:
      "Our generative AI creates new content, designs, and solutions based on learned patterns and specific requirements.",
    features: ["Text Generation", "Image Synthesis", "Code Generation", "Design Creation", "Content Personalization"],
    demo: (
      <div className="space-y-4">
        <div className="bg-black/40 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <p className="text-sm text-white/70">Prompt</p>
          </div>
          <p className="text-white/90 p-2 bg-black/40 rounded border border-white/5 text-sm">
            Generate a product description for a smart AI-powered fitness tracker.
          </p>

          <div className="mt-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <p className="text-sm text-white/70">Generated Output</p>
            </div>
            <div className="p-2 bg-black/40 rounded border border-white/5 text-sm">
              <p className="text-white/90">
                <span className="typing-text">
                  Introducing the FitAI Pro: The revolutionary fitness tracker that learns and adapts to your unique
                  body and goals. Powered by advanced AI algorithms, it provides real-time coaching, personalized
                  workout recommendations, and predictive health insights based on your biometric data. With sleek
                  design and 7-day battery life, FitAI Pro is your personal fitness coach on your wrist.
                </span>
                <span className="animate-typing-cursor">|</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Generation Time</p>
            <p className="text-lg font-medium">1.2s</p>
          </div>

          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Model</p>
            <p className="text-lg font-medium">MindscapeGPT</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "doc-ai",
    title: "Document AI",
    icon: <FileText className="h-6 w-6" />,
    description:
      "Our Document AI extracts, analyzes, and processes information from various document types with high precision.",
    features: [
      "Document Classification",
      "Information Extraction",
      "Form Processing",
      "Contract Analysis",
      "Compliance Checking",
    ],
    demo: (
      <div className="space-y-4">
        <div className="bg-black/40 p-4 rounded-lg border border-white/10 relative">
          <div className="absolute right-3 top-3 bg-black/60 text-xs text-white/80 px-2 py-1 rounded">
            Invoice #INV-2023-0042
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-xs text-white/50 mb-1">Extracted From</p>
              <div className="h-20 bg-black/30 rounded border border-white/5 flex items-center justify-center">
                <FileText className="h-8 w-8 text-white/30" />
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-white/50 mb-0.5">Vendor</p>
                <p className="text-sm bg-black/30 p-1 rounded">TechSupplies Inc.</p>
              </div>
              <div>
                <p className="text-xs text-white/50 mb-0.5">Amount</p>
                <p className="text-sm bg-black/30 p-1 rounded">$2,450.00</p>
              </div>
              <div>
                <p className="text-xs text-white/50 mb-0.5">Date</p>
                <p className="text-sm bg-black/30 p-1 rounded">2023-10-15</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Extraction Accuracy</p>
            <div className="flex items-center">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[98%] bg-red-500 rounded-full"></div>
              </div>
              <span className="ml-2 text-white font-medium">98%</span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Processing Time</p>
            <p className="text-lg font-medium">0.8s</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "code-ai",
    title: "Code AI",
    icon: <Code className="h-6 w-6" />,
    description:
      "Our Code AI assists developers by generating, reviewing, and optimizing code across multiple programming languages.",
    features: ["Code Generation", "Code Completion", "Bug Detection", "Code Refactoring", "Documentation Generation"],
    demo: (
      <div className="space-y-4">
        <div className="bg-black/40 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <p className="text-sm text-white/70">Prompt</p>
          </div>
          <p className="text-white/90 p-2 bg-black/40 rounded border border-white/5 text-sm">
            Create a React component for a data visualization dashboard.
          </p>

          <div className="mt-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <p className="text-sm text-white/70">Generated Code</p>
            </div>
            <div className="p-2 bg-black/40 rounded border border-white/5 text-sm font-mono code-scroll overflow-auto max-h-[120px]">
              <pre className="text-white/90">
                {`import React, { useState, useEffect } from 'react';
import { LineChart, BarChart } from './Charts';
import { DataFilter } from './DataFilter';

export function Dashboard({ data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [activeView, setActiveView] = useState('overview');
  
  const handleFilterChange = (filters) => {
    // Apply filters to data
    setFilteredData(applyFilters(data, filters));
  };
  
  return (
    <div className="dashboard-container">
      <h2>Analytics Dashboard</h2>
      <DataFilter onChange={handleFilterChange} />
      <div className="charts-grid">
        <LineChart data={filteredData} />
        <BarChart data={filteredData} />
      </div>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Language</p>
            <p className="text-lg font-medium">React/JSX</p>
          </div>

          <div className="bg-black/40 p-3 rounded-lg border border-white/10">
            <p className="text-sm text-white/70 mb-1">Generation Time</p>
            <p className="text-lg font-medium">1.5s</p>
          </div>
        </div>
      </div>
    ),
  },
]

interface MetricItem {
  name: string;
  value: number;
  color: string;
}

interface CapabilityMetrics {
  nlp: MetricItem[];
  cv: MetricItem[];
  ml: MetricItem[];
  "gen-ai": MetricItem[];
  "doc-ai": MetricItem[];
  "code-ai": MetricItem[];
}

interface InteractivePrompts {
  nlp: string[];
  cv: string[];
  ml: string[];
  "gen-ai": string[];
  "doc-ai": string[];
  "code-ai": string[];
}

// Performance metrics for each capability
const performanceMetrics: CapabilityMetrics = {
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
const interactivePrompts: InteractivePrompts = {
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

type CapabilityId = keyof typeof performanceMetrics;

interface NLPResult {
  sentiment: string;
  confidence: number;
  entities: string[];
  language: string;
}

interface CVResult {
  objects: number;
  confidence: number;
  processTime: string;
}

interface MLResult {
  prediction: number;
  accuracy: number;
  confidence: number;
}

interface GenAIResult {
  generatedText: string;
  tokens: number;
  generationTime: string;
}

interface DocAIResult {
  extractedFields: number;
  accuracy: number;
  processTime: string;
}

interface CodeAIResult {
  linesGenerated: number;
  quality: number;
  generationTime: string;
}

type AIResult = NLPResult | CVResult | MLResult | GenAIResult | DocAIResult | CodeAIResult | { message: string };

interface PerformanceComparisonProps {
  metrics: MetricItem[];
}

// Performance comparison component
function PerformanceComparison({ metrics }: PerformanceComparisonProps) {
  return (
    <div className="rounded-lg bg-black/40 border border-white/10 p-4 space-y-3">
      <h3 className="text-sm font-medium text-white/90">Performance Metrics</h3>
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/70">{metric.name}</span>
              <span className="text-white/90">{metric.value}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-red-600"
                style={{ width: `${metric.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface TryItYourselfProps {
  capability: CapabilityId;
  prompts: string[];
}

// Try it yourself component
function TryItYourself({ capability, prompts }: TryItYourselfProps) {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [showTypingEffect, setShowTypingEffect] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(30); // ms per character
  
  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setInput(prompt);
    // Reset results when changing prompt
    setResult(null);
  };
  
  const handleSubmit = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    setResult(null);
    
    // Simulate processing delay
    setTimeout(() => {
      // Generate mock results based on capability
      let mockResult: AIResult;
      
      switch(capability) {
        case "nlp":
          mockResult = {
            sentiment: Math.random() > 0.5 ? "Positive" : "Negative",
            confidence: Math.floor(75 + Math.random() * 20),
            entities: ["Product", "Service", "Company"],
            language: "English"
          };
          break;
        case "cv":
          mockResult = {
            objects: Math.floor(1 + Math.random() * 5),
            confidence: Math.floor(80 + Math.random() * 15),
            processTime: (0.2 + Math.random() * 0.8).toFixed(2)
          };
          break;
        case "ml":
          mockResult = {
            prediction: Math.floor(1000 + Math.random() * 9000),
            accuracy: Math.floor(85 + Math.random() * 10),
            confidence: Math.floor(80 + Math.random() * 15)
          };
          break;
        case "gen-ai":
          const generatedText = "This is a sample generated text based on your prompt. It demonstrates the capabilities of our advanced generative AI system. The model can produce coherent, contextually relevant content that follows the style and intent specified in your instructions. It can be used for creative writing, business communication, content generation, and more.";
          mockResult = {
            generatedText,
            tokens: Math.floor(40 + Math.random() * 30),
            generationTime: (0.5 + Math.random() * 2).toFixed(2)
          };
          // Start typing effect for generative AI
          setTypedText("");
          setShowTypingEffect(true);
          
          let charIndex = 0;
          const typeNextChar = () => {
            if (charIndex < generatedText.length) {
              setTypedText(generatedText.substring(0, charIndex + 1));
              charIndex++;
              setTimeout(typeNextChar, typingSpeed);
            }
          };
          
          typeNextChar();
          break;
        case "doc-ai":
          mockResult = {
            extractedFields: Math.floor(3 + Math.random() * 5),
            accuracy: Math.floor(90 + Math.random() * 8),
            processTime: (0.3 + Math.random() * 0.7).toFixed(2)
          };
          break;
        case "code-ai":
          const codeExample = `function analyzeData(dataset) {
  // Preprocess the data
  const cleanData = dataset.filter(item => item.value !== null);
  
  // Calculate statistics
  const sum = cleanData.reduce((acc, item) => acc + item.value, 0);
  const average = sum / cleanData.length;
  
  // Identify anomalies
  const anomalies = cleanData.filter(item => 
    Math.abs(item.value - average) > average * 0.5
  );
  
  return {
    total: cleanData.length,
    average: average.toFixed(2),
    anomalies: anomalies.length,
    anomalyPercentage: ((anomalies.length / cleanData.length) * 100).toFixed(1)
  };
}`;
          
          mockResult = {
            linesGenerated: 19,
            quality: Math.floor(85 + Math.random() * 10),
            generationTime: (0.8 + Math.random() * 2).toFixed(2),
            generatedCode: codeExample
          };
          
          // Start typing effect for code generation
          setTypedText("");
          setShowTypingEffect(true);
          
          let codeIndex = 0;
          const typeNextCodeChar = () => {
            if (codeIndex < codeExample.length) {
              setTypedText(codeExample.substring(0, codeIndex + 1));
              codeIndex++;
              setTimeout(typeNextCodeChar, typingSpeed / 2); // Type code faster
            }
          };
          
          typeNextCodeChar();
          break;
        default:
          mockResult = { message: "Processed successfully" };
      }
      
      setResult(mockResult);
      setIsProcessing(false);
    }, 1500);
  };
  
  const reset = () => {
    setInput("");
    setResult(null);
    setSelectedPrompt("");
    setShowTypingEffect(false);
    setTypedText("");
  };
  
  // Render different result visualizations based on capability
  const renderResults = () => {
    if (!result) return null;
    
    switch(capability) {
      case "nlp":
        const nlpResult = result as NLPResult;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Sentiment</p>
                <div className="flex items-center">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${nlpResult.sentiment === "Positive" ? "bg-red-500" : "bg-red-700"}`} 
                      style={{ width: `${nlpResult.confidence}%` }}
                    ></div>
                  </div>
                  <span className={`ml-2 font-medium ${nlpResult.sentiment === "Positive" ? "text-red-500" : "text-red-700"}`}>
                    {nlpResult.sentiment}
                  </span>
                </div>
              </div>
              
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Confidence</p>
                <p className="text-lg font-medium">{nlpResult.confidence}%</p>
              </div>
            </div>
            
            <div className="bg-black/60 p-3 rounded-lg border border-white/10">
              <p className="text-sm text-white/70 mb-1">Entities</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {nlpResult.entities.map((entity, index) => (
                  <span key={index} className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
        
      case "gen-ai":
      case "code-ai":
        const genResult = capability === "gen-ai" 
          ? result as GenAIResult 
          : result as CodeAIResult & { generatedCode: string };
        
        return (
          <div className="space-y-4">
            <div className="bg-black/60 p-3 rounded-lg border border-white/10 text-sm leading-relaxed relative">
              <div className="mb-2 flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${isProcessing ? "bg-red-600" : "bg-red-500"} mr-2`}></div>
                  <p className="text-xs text-white/70">{capability === "gen-ai" ? "Generated Text" : "Generated Code"}</p>
                </div>
                {/* Adding a "copy" button */}
                {showTypingEffect && typedText && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0 opacity-50 hover:opacity-100 absolute top-2 right-2"
                    onClick={() => {
                      navigator.clipboard.writeText(typedText);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </Button>
                )}
              </div>
              
              <div className={capability === "code-ai" ? "font-mono text-xs bg-black/50 p-2 rounded overflow-auto max-h-[300px]" : ""}>
                {showTypingEffect ? (
                  <p className="text-white/90 whitespace-pre-wrap">
                    {typedText}
                    <span className="inline-block w-1 h-4 ml-0.5 bg-white/70 animate-blink"></span>
                  </p>
                ) : (
                  <p className="text-white/90 whitespace-pre-wrap">
                    {capability === "gen-ai" ? genResult.generatedText : (genResult as any).generatedCode}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">{capability === "gen-ai" ? "Tokens" : "Lines"}</p>
                <p className="text-lg font-medium">{capability === "gen-ai" ? genResult.tokens : genResult.linesGenerated}</p>
              </div>
              
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">{capability === "gen-ai" ? "Gen Time" : "Gen Time"}</p>
                <p className="text-lg font-medium">{capability === "gen-ai" ? genResult.generationTime : genResult.generationTime}s</p>
              </div>
              
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Quality</p>
                <div className="flex items-center">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-red-500" 
                      style={{ width: `${capability === "code-ai" ? genResult.quality : 90}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 font-medium">{capability === "code-ai" ? genResult.quality : 90}%</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-2">
            {Object.entries(result).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-sm text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-sm font-medium">
                  {typeof value === 'number' ? 
                    key.includes('Time') ? `${value}s` : 
                    key.includes('confidence') || key.includes('accuracy') || key.includes('quality') ? `${value}%` : 
                    value 
                    : typeof value === 'string' || typeof value === 'number' ? value : Array.isArray(value) ? value.join(', ') : ''}
                </span>
              </div>
            ))}
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handlePromptSelect(prompt)}
            className={`text-xs px-2 py-1 rounded-full border ${
              selectedPrompt === prompt
                ? "bg-red-500/20 border-red-500/50 text-red-400"
                : "bg-black/30 border-white/10 text-white/70 hover:bg-black/40"
            }`}
          >
            {prompt}
          </button>
        ))}
      </div>
      
      <div className="space-y-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter a prompt for ${capability === "code-ai" ? "code generation" : capability === "gen-ai" ? "content generation" : "analysis"}...`}
          className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white/90 text-sm min-h-[80px] focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50"
        />
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit} 
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            disabled={isProcessing || !input.trim()}
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run
              </>
            )}
          </Button>
          
          <Button 
            onClick={reset} 
            variant="outline" 
            className="border-white/10 text-white/70 hover:bg-white/5 flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
      
      {(result || isProcessing) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 border border-white/10 rounded-lg p-4"
        >
          <h4 className="text-sm font-medium mb-3 text-white/80">Results</h4>
          {isProcessing ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 border-4 border-white/10 border-t-red-500 rounded-full animate-spin mb-3"></div>
                <p className="text-sm text-white/70">Processing your request...</p>
              </div>
            </div>
          ) : (
            renderResults()
          )}
        </motion.div>
      )}
    </div>
  );
}

export default function AICapabilitiesShowcase() {
  const [activeTab, setActiveTab] = useState("nlp")
  const [showCapabilityComparison, setShowCapabilityComparison] = useState(false)
  const [animateBackground, setAnimateBackground] = useState(true)
  const [modelSettings, setModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 150,
    topP: 0.9
  })
  
  const toggleCapabilityComparison = (capabilityId) => {
    setActiveTab(capabilityId)
    setShowCapabilityComparison(prev => !prev)
  }

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
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

  // Additional parameters for modern model configuration
  const renderModelParams = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 bg-black/30 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm text-white/70">Temperature</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{modelSettings.temperature.toFixed(1)}</span>
        </div>
        <Slider
          value={[modelSettings.temperature * 10]}
          min={0}
          max={10}
          step={1}
          onValueChange={(value) => setModelSettings({...modelSettings, temperature: value[0] / 10})}
          className="my-1.5"
        />
        <p className="text-xs text-white/50">Controls randomness: lower is more deterministic</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm text-white/70">Max Tokens</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{modelSettings.maxTokens}</span>
        </div>
        <Slider
          value={[modelSettings.maxTokens]}
          min={10}
          max={300}
          step={10}
          onValueChange={(value) => setModelSettings({...modelSettings, maxTokens: value[0]})}
          className="my-1.5"
        />
        <p className="text-xs text-white/50">Maximum length of generated output</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm text-white/70">Top P</label>
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">{modelSettings.topP.toFixed(1)}</span>
        </div>
        <Slider
          value={[modelSettings.topP * 10]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => setModelSettings({...modelSettings, topP: value[0] / 10})}
          className="my-1.5"
        />
        <p className="text-xs text-white/50">Nucleus sampling: diversity vs. specificity</p>
      </div>
    </div>
  )

  return (
    <section className="py-28 bg-black relative overflow-hidden">
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/90">
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
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={animateBackground}
                      onCheckedChange={setAnimateBackground}
                      className="data-[state=checked]:bg-red-600"
                    />
                    <span className="text-sm text-white/70">Animations</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle background animations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>

        <Tabs defaultValue="nlp" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl mb-10 shadow-lg shadow-black/20">
            <TabsTrigger value="nlp" className="data-[state=active]:bg-red-600/90 data-[state=active]:text-white rounded-lg transition-all duration-200">
              <div className="flex flex-col items-center gap-1.5 py-1.5">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs font-medium">NLP</span>
              </div>
                  </TabsTrigger>
            <TabsTrigger value="cv" className="data-[state=active]:bg-red-600/90 data-[state=active]:text-white rounded-lg transition-all duration-200">
              <div className="flex flex-col items-center gap-1.5 py-1.5">
                <Eye className="h-4 w-4" />
                <span className="text-xs font-medium">Vision</span>
            </div>
            </TabsTrigger>
            <TabsTrigger value="ml" className="data-[state=active]:bg-red-600/90 data-[state=active]:text-white rounded-lg transition-all duration-200">
              <div className="flex flex-col items-center gap-1.5 py-1.5">
                <Brain className="h-4 w-4" />
                <span className="text-xs font-medium">ML</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="gen-ai" className="data-[state=active]:bg-red-600/90 data-[state=active]:text-white rounded-lg transition-all duration-200">
              <div className="flex flex-col items-center gap-1.5 py-1.5">
                <Wand2 className="h-4 w-4" />
                <span className="text-xs font-medium">Gen AI</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="doc-ai" className="data-[state=active]:bg-red-600/90 data-[state=active]:text-white rounded-lg transition-all duration-200">
              <div className="flex flex-col items-center gap-1.5 py-1.5">
                <FileText className="h-4 w-4" />
                <span className="text-xs font-medium">Doc AI</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="code-ai" className="data-[state=active]:bg-red-600/90 data-[state=active]:text-white rounded-lg transition-all duration-200">
              <div className="flex flex-col items-center gap-1.5 py-1.5">
                <Code className="h-4 w-4" />
                <span className="text-xs font-medium">Code AI</span>
              </div>
            </TabsTrigger>
          </TabsList>

                    <motion.div
            key={activeTab}
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
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg text-red-500 border border-red-500/10">
                          {capabilities.find(c => c.id === activeTab)?.icon}
                        </div>
                        <h3 className="text-2xl font-semibold">
                          {capabilities.find(c => c.id === activeTab)?.title}
                        </h3>
                      </motion.div>

                      <motion.p variants={itemVariants} className="text-white/70 mb-8 text-lg leading-relaxed">
                        {capabilities.find(c => c.id === activeTab)?.description}
                      </motion.p>

                      <motion.div variants={itemVariants} className="mb-8">
                        <h4 className="text-sm font-medium text-white/90 mb-4 uppercase tracking-wide">Key Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {capabilities.find(c => c.id === activeTab)?.features.map((feature, index) => (
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
                          className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md shadow-red-900/20 px-5"
                        >
                          {showCapabilityComparison ? 'Hide Performance' : 'Show Performance'}
                          <BarChart3 className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="border-white/20 hover:bg-white/10">
                          Learn More
                          <ArrowLeftRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
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
                          <PerformanceComparison 
                            metrics={performanceMetrics[activeTab]} 
                          />
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
                    {capabilities.find(c => c.id === activeTab)?.demo}
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
                    {(activeTab === "gen-ai" || activeTab === "code-ai" || activeTab === "nlp") && renderModelParams()}
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

