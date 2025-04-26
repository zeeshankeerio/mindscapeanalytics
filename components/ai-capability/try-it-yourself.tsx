"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw } from "lucide-react"

// Define type here instead of importing to avoid circular dependency
type CapabilityId = "nlp" | "cv" | "ml" | "gen-ai" | "doc-ai" | "code-ai";

interface TryItYourselfProps {
  capability: CapabilityId;
  prompts: string[];
}

interface NLPResult {
  type: 'nlp';
  sentiment: string;
  confidence: number;
  entities: string[];
  language: string;
}

interface CVResult {
  type: 'cv';
  objects: number;
  confidence: number;
  processTime: string;
}

interface MLResult {
  type: 'ml';
  prediction: number;
  accuracy: number;
  confidence: number;
}

interface GenAIResult {
  type: 'gen-ai';
  generatedText: string;
  tokens: number;
  generationTime: string;
}

interface DocAIResult {
  type: 'doc-ai';
  extractedFields: number;
  accuracy: number;
  processTime: string;
}

interface CodeAIResult {
  type: 'code-ai';
  linesGenerated: number;
  quality: number;
  generationTime: string;
  generatedCode?: string;
}

type AIResult = 
  | NLPResult
  | CVResult
  | MLResult
  | GenAIResult
  | DocAIResult
  | CodeAIResult
  | { type: 'unknown'; message: string };

export function TryItYourself({ capability, prompts }: TryItYourselfProps) {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<AIResult | null>(null)
  const [selectedPrompt, setSelectedPrompt] = useState("")
  const [showTypingEffect, setShowTypingEffect] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [typingSpeed, setTypingSpeed] = useState(30) // ms per character
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Reset when capability changes
    setInput("")
    setResult(null)
    setSelectedPrompt("")
    setError(null)
  }, [capability])
  
  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt)
    setInput(prompt)
    // Reset results when changing prompt
    setResult(null)
    setError(null)
  }
  
  const handleSubmit = () => {
    if (!input.trim()) return
    
    setIsProcessing(true)
    setResult(null)
    setError(null)
    
    // Simulate processing delay
    setTimeout(() => {
      try {
        // Generate mock results based on capability
        let mockResult: AIResult
      
        switch(capability) {
          case "nlp":
            mockResult = {
              type: 'nlp',
              sentiment: Math.random() > 0.5 ? "Positive" : "Negative",
              confidence: Math.floor(75 + Math.random() * 20),
              entities: ["Product", "Service", "Company"],
              language: "English"
            }
            break
            
          case "cv":
            mockResult = {
              type: 'cv',
              objects: Math.floor(1 + Math.random() * 5),
              confidence: Math.floor(80 + Math.random() * 15),
              processTime: (0.2 + Math.random() * 0.8).toFixed(2)
            }
            break
            
          case "ml":
            mockResult = {
              type: 'ml',
              prediction: Math.floor(1000 + Math.random() * 9000),
              accuracy: Math.floor(85 + Math.random() * 10),
              confidence: Math.floor(80 + Math.random() * 15)
            }
            break
            
          case "gen-ai":
            const generatedText = "This is a sample generated text based on your prompt. It demonstrates the capabilities of our advanced generative AI system. The model can produce coherent, contextually relevant content that follows the style and intent specified in your instructions. It can be used for creative writing, business communication, content generation, and more."
            mockResult = {
              type: 'gen-ai',
              generatedText,
              tokens: Math.floor(40 + Math.random() * 30),
              generationTime: (0.5 + Math.random() * 2).toFixed(2)
            }
            
            // Start typing effect for generative AI
            setTypedText("")
            setShowTypingEffect(true)
            
            let charIndex = 0
            const typeNextChar = () => {
              if (charIndex < generatedText.length) {
                setTypedText(generatedText.substring(0, charIndex + 1))
                charIndex++
                setTimeout(typeNextChar, typingSpeed)
              }
            }
            
            typeNextChar()
            break
            
          case "doc-ai":
            mockResult = {
              type: 'doc-ai',
              extractedFields: Math.floor(3 + Math.random() * 5),
              accuracy: Math.floor(90 + Math.random() * 8),
              processTime: (0.3 + Math.random() * 0.7).toFixed(2)
            }
            break
            
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
}`
          
            mockResult = {
              type: 'code-ai',
              linesGenerated: 19,
              quality: Math.floor(85 + Math.random() * 10),
              generationTime: (0.8 + Math.random() * 2).toFixed(2),
              generatedCode: codeExample
            }
          
            // Start typing effect for code generation
            setTypedText("")
            setShowTypingEffect(true)
          
            let codeIndex = 0
            const typeNextCodeChar = () => {
              if (codeIndex < codeExample.length) {
                setTypedText(codeExample.substring(0, codeIndex + 1))
                codeIndex++
                setTimeout(typeNextCodeChar, typingSpeed / 2) // Type code faster
              }
            }
          
            typeNextCodeChar()
            break
            
          default:
            mockResult = { type: 'unknown', message: "Processed successfully" }
        }
      
        setResult(mockResult)
      } catch (err) {
        // Handle any errors that might occur during processing
        console.error("Error processing request:", err)
        setError("An error occurred while processing your request. Please try again.")
      } finally {
        setIsProcessing(false)
      }
    }, 1500)
  }
  
  const reset = () => {
    setInput("")
    setResult(null)
    setSelectedPrompt("")
    setShowTypingEffect(false)
    setTypedText("")
    setError(null)
  }
  
  // Render different result visualizations based on capability
  const renderResults = () => {
    if (error) {
      return (
        <div className="bg-red-900/30 border border-red-600/30 rounded-lg p-4 text-center">
          <p className="text-red-400">{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 border-red-500/30 text-red-400 hover:bg-red-900/20"
            onClick={() => setError(null)}
          >
            Dismiss
          </Button>
        </div>
      )
    }
    
    if (!result) return null
    
    switch(result.type) {
      case "nlp":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Sentiment</p>
                <div className="flex items-center">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${result.sentiment === "Positive" ? "bg-red-500" : "bg-red-700"}`} 
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  <span className={`ml-2 font-medium ${result.sentiment === "Positive" ? "text-red-500" : "text-red-700"}`}>
                    {result.sentiment}
                  </span>
                </div>
              </div>
              
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Confidence</p>
                <p className="text-lg font-medium">{result.confidence}%</p>
              </div>
            </div>
            
            <div className="bg-black/60 p-3 rounded-lg border border-white/10">
              <p className="text-sm text-white/70 mb-1">Entities</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {result.entities.map((entity, index) => (
                  <span key={index} className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
        
      case "gen-ai":
        return (
          <div className="space-y-4">
            <div className="bg-black/60 p-3 rounded-lg border border-white/10 text-sm leading-relaxed relative">
              <div className="mb-2 flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${isProcessing ? "bg-red-600" : "bg-red-500"} mr-2`}></div>
                  <p className="text-xs text-white/70">Generated Text</p>
                </div>
                {/* Adding a "copy" button */}
                {showTypingEffect && typedText && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0 opacity-50 hover:opacity-100 absolute top-2 right-2"
                    onClick={() => {
                      navigator.clipboard.writeText(typedText)
                    }}
                    aria-label="Copy generated text"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </Button>
                )}
              </div>
              
              <div>
                {showTypingEffect ? (
                  <p className="text-white/90 whitespace-pre-wrap">
                    {typedText}
                    <span className="inline-block w-1 h-4 ml-0.5 bg-white/70 animate-blink"></span>
                  </p>
                ) : (
                  <p className="text-white/90 whitespace-pre-wrap">
                    {result.generatedText}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Tokens</p>
                <p className="text-lg font-medium">{result.tokens}</p>
              </div>
              
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Gen Time</p>
                <p className="text-lg font-medium">{result.generationTime}s</p>
              </div>
              
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Quality</p>
                <div className="flex items-center">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-red-500" 
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <span className="ml-2 font-medium">90%</span>
                </div>
              </div>
            </div>
          </div>
        )
        
      case "code-ai":
        return (
          <div className="space-y-4">
            <div className="bg-black/60 p-3 rounded-lg border border-white/10 text-sm leading-relaxed relative">
              <div className="mb-2 flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${isProcessing ? "bg-red-600" : "bg-red-500"} mr-2`}></div>
                  <p className="text-xs text-white/70">Generated Code</p>
                </div>
                {/* Adding a "copy" button */}
                {showTypingEffect && typedText && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0 opacity-50 hover:opacity-100 absolute top-2 right-2"
                    onClick={() => {
                      navigator.clipboard.writeText(typedText)
                    }}
                    aria-label="Copy generated code"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </Button>
                )}
              </div>
              
              <div className="font-mono text-xs bg-black/50 p-2 rounded overflow-auto max-h-[300px]">
                {showTypingEffect ? (
                  <p className="text-white/90 whitespace-pre-wrap">
                    {typedText}
                    <span className="inline-block w-1 h-4 ml-0.5 bg-white/70 animate-blink"></span>
                  </p>
                ) : (
                  <p className="text-white/90 whitespace-pre-wrap">
                    {result.generatedCode}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Lines</p>
                <p className="text-lg font-medium">{result.linesGenerated}</p>
              </div>
              
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Gen Time</p>
                <p className="text-lg font-medium">{result.generationTime}s</p>
              </div>
              
              <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 mb-1">Quality</p>
                <div className="flex items-center">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-red-500" 
                      style={{ width: `${result.quality}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 font-medium">{result.quality}%</span>
                </div>
              </div>
            </div>
          </div>
        )
        
      default:
        return (
          <div className="space-y-2">
            {Object.entries(result).map(([key, value]) => (
              key !== 'type' && (
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
              )
            ))}
          </div>
        )
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handlePromptSelect(prompt)}
            className={`text-xs px-2 py-1 rounded-full border transition-all duration-300 ${
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
          className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white/90 text-sm min-h-[80px] focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all duration-300"
          aria-label="Enter your prompt"
        />
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit} 
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition-all duration-300 relative overflow-hidden group"
            disabled={isProcessing || !input.trim()}
            aria-label="Run prompt"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/30 to-red-500/0 opacity-0 group-hover:opacity-100"
              animate={{ 
                x: ['-100%', '100%'],
                transition: { repeat: Infinity, duration: 1.5, ease: 'linear' }
              }}
            />
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
            className="border-white/10 text-white/70 hover:bg-white/5 flex items-center gap-2 transition-all duration-300"
            aria-label="Reset"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
      
      {(result || isProcessing || error) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="bg-black/40 border border-white/10 rounded-lg p-4 shadow-lg"
        >
          <h4 className="text-sm font-medium mb-3 text-white/80">Results</h4>
          {isProcessing ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center">
                <div className="relative h-10 w-10">
                  <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                </div>
                <p className="text-sm text-white/70 mt-3">Processing your request...</p>
              </div>
            </div>
          ) : (
            renderResults()
          )}
        </motion.div>
      )}
    </div>
  )
} 