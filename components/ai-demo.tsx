"use client"

import type React from "react"

import Image from "next/image";
import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, ImageIcon, Download, Copy, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Sample AI responses
const sampleResponses = [
  "Based on the data analysis, I recommend focusing on customer retention strategies. The churn rate has increased by 15% in the last quarter, primarily due to pricing concerns and competitor offerings.",
  "The image classification model has achieved 94.3% accuracy on the test dataset. The confusion matrix shows excellent performance across all categories, with minor misclassifications between 'cat' and 'dog' classes.",
  "I've analyzed your sales data and found a strong seasonal pattern. Q4 consistently outperforms other quarters by 35-40%. I recommend adjusting your inventory planning to account for this pattern.",
  "The sentiment analysis of customer reviews reveals predominantly positive feedback (72%), with specific praise for product quality and customer service. Areas for improvement include shipping times and packaging.",
  "Based on the predictive model, we forecast a 23% increase in website traffic over the next month. This is likely due to your recent marketing campaigns and seasonal trends in your industry.",
]

// Sample image generation prompts
const sampleImagePrompts = [
  "A futuristic city with flying cars and holographic advertisements",
  "A serene mountain landscape at sunset with a lake reflection",
  "A photorealistic portrait of a cybernetic being with glowing eyes",
  "An abstract representation of artificial intelligence as a neural network",
  "A detailed illustration of a space station orbiting Earth",
]

// Sample generated images
const sampleImages = [
  "/placeholder.svg?height=512&width=512",
  "/placeholder.svg?height=512&width=512",
  "/placeholder.svg?height=512&width=512",
  "/placeholder.svg?height=512&width=512",
  "/placeholder.svg?height=512&width=512",
]

export default function AIDemo() {
  const [activeTab, setActiveTab] = useState("chat")
  const [prompt, setPrompt] = useState("")
  const [imagePrompt, setImagePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [response, setResponse] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [imageHistory, setImageHistory] = useState<{ prompt: string; image: string }[]>([])
  const [model, setModel] = useState("gpt-4o")
  const [imageModel, setImageModel] = useState("dall-e-3")
  const [temperature, setTemperature] = useState(0.7)
  const [imageQuality, setImageQuality] = useState("standard")
  const [imageStyle, setImageStyle] = useState("vivid")
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  // Handle form submission for text generation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isGenerating) return

    // Add user message to chat
    setChatHistory((prev) => [...prev, { role: "user", content: prompt }])

    // Start generating
    setIsGenerating(true)
    setProgress(0)
    setResponse(null)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 5
      })
    }, 100)

    // Simulate typing effect with a random response
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
      setResponse(randomResponse)
      setChatHistory((prev) => [...prev, { role: "assistant", content: randomResponse }])
      setIsGenerating(false)
      setProgress(100)
      setPrompt("")
    }, 2000)
  }

  // Handle form submission for image generation
  const handleImageGeneration = (e: React.FormEvent) => {
    e.preventDefault()
    if (!imagePrompt.trim() || isGenerating) return

    // Start generating
    setIsGenerating(true)
    setProgress(0)
    setGeneratedImage(null)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 3
      })
    }, 100)

    // Simulate image generation with a random sample
    setTimeout(() => {
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
      setGeneratedImage(randomImage)
      setImageHistory((prev) => [...prev, { prompt: imagePrompt, image: randomImage }])
      setIsGenerating(false)
      setProgress(100)
      setImagePrompt("")
    }, 3000)
  }

  // Copy response to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)

    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  // Download generated image
  const downloadImage = () => {
    if (!generatedImage) return

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `ai-generated-image-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Image downloaded",
      description: "The generated image has been downloaded.",
    })
  }

  // Clear chat history
  const clearChat = () => {
    setChatHistory([])
    setResponse(null)

    toast({
      title: "Chat cleared",
      description: "Your conversation history has been cleared.",
    })
  }

  // Clear image history
  const clearImageHistory = () => {
    setImageHistory([])
    setGeneratedImage(null)

    toast({
      title: "Image history cleared",
      description: "Your generated images have been cleared.",
    })
  }

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="chat">Text Generation</TabsTrigger>
          <TabsTrigger value="image">Image Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          {/* Chat history */}
          <div
            ref={chatContainerRef}
            className="border border-white/10 rounded-lg p-4 h-[300px] overflow-y-auto bg-black/20"
          >
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/50">
                <Sparkles className="h-8 w-8 mb-2" />
                <p>Start a conversation with the AI assistant</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-red-500/20 text-white"
                          : "bg-black/40 border border-white/10 text-white"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>

                      {message.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 mt-2 opacity-50 hover:opacity-100"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Model selection and advanced options */}
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="flex items-center gap-2">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-[180px] bg-black/50 border-white/10">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                  <SelectItem value="llama-3">Llama 3</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                className="border-white/10 hover:bg-white/5"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              >
                {showAdvancedOptions ? "Hide Options" : "Advanced Options"}
              </Button>
            </div>

            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5" onClick={clearChat}>
              Clear Chat
            </Button>
          </div>

          {/* Advanced options */}
          {showAdvancedOptions && (
            <div className="p-4 rounded-lg bg-black/30 border border-white/10 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="temperature">Temperature: {temperature}</Label>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={2}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />
                <p className="text-xs text-white/50">
                  Lower values produce more focused and deterministic responses. Higher values produce more creative and
                  varied responses.
                </p>
              </div>
            </div>
          )}

          {/* Input form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <Textarea
              placeholder="Ask the AI assistant anything..."
              className="min-h-[100px] bg-black/50 border-white/10 resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />

            <div className="flex justify-end">
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={!prompt.trim() || isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          {/* Generated image display */}
          <div className="border border-white/10 rounded-lg p-4 min-h-[300px] bg-black/20 flex items-center justify-center">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center text-white/50">
                <Loader2 className="h-8 w-8 mb-2 animate-spin" />
                <p>Generating image... {Math.round(progress)}%</p>
              </div>
            ) : generatedImage ? (
              <div className="relative">
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt="AI generated"
                  className="max-h-[400px] rounded-lg"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-black/50 border-white/10"
                    onClick={downloadImage}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-white/50">
                <ImageIcon className="h-8 w-8 mb-2" />
                <p>Enter a prompt to generate an image</p>
              </div>
            )}
          </div>

          {/* Model selection and advanced options */}
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="flex items-center gap-2">
              <Select value={imageModel} onValueChange={setImageModel}>
                <SelectTrigger className="w-[180px] bg-black/50 border-white/10">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                  <SelectItem value="dall-e-2">DALL-E 2</SelectItem>
                  <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                  <SelectItem value="midjourney">Midjourney</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                className="border-white/10 hover:bg-white/5"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              >
                {showAdvancedOptions ? "Hide Options" : "Advanced Options"}
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-white/10 hover:bg-white/5"
              onClick={clearImageHistory}
            >
              Clear History
            </Button>
          </div>

          {/* Advanced options */}
          {showAdvancedOptions && (
            <div className="p-4 rounded-lg bg-black/30 border border-white/10 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quality">Quality</Label>
                  <Select value={imageQuality} onValueChange={setImageQuality}>
                    <SelectTrigger id="quality" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/10">
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="hd">HD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Style</Label>
                  <Select value={imageStyle} onValueChange={setImageStyle}>
                    <SelectTrigger id="style" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/10">
                      <SelectItem value="vivid">Vivid</SelectItem>
                      <SelectItem value="natural">Natural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Input form */}
          <form onSubmit={handleImageGeneration} className="space-y-2">
            <Textarea
              placeholder="Describe the image you want to generate..."
              className="min-h-[100px] bg-black/50 border-white/10 resize-none"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              disabled={isGenerating}
            />

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="bg-black/50 border-white/10 cursor-pointer hover:bg-black/70"
                  onClick={() => setImagePrompt(sampleImagePrompts[0])}
                >
                  Futuristic City
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-black/50 border-white/10 cursor-pointer hover:bg-black/70"
                  onClick={() => setImagePrompt(sampleImagePrompts[1])}
                >
                  Landscape
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-black/50 border-white/10 cursor-pointer hover:bg-black/70"
                  onClick={() => setImagePrompt(sampleImagePrompts[2])}
                >
                  Portrait
                </Badge>
              </div>

              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700"
                disabled={!imagePrompt.trim() || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Image history */}
          {imageHistory.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Recent Generations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {imageHistory
                  .slice()
                  .reverse()
                  .slice(0, 4)
                  .map((item, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.prompt}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 rounded-md">
                        <p className="text-xs text-white line-clamp-3">{item.prompt}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

