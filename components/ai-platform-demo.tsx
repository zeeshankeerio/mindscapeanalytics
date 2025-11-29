"use client"

import { useState } from "react"
import { ArrowRight, Brain, Check, Copy, FileText, Loader2, MessageSquare, Search, BarChart2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function AIPlatformDemo() {
  const [activeTab, setActiveTab] = useState("vision")

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">Interactive Demo</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Experience Our <span className="text-red-500">AI Platform</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore the capabilities of our AI platform through these interactive demos. See how our technology can
            transform your business.
          </p>
        </div>

        <Tabs defaultValue="vision" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-black/50 border border-white/10 p-1">
              <TabsTrigger value="vision" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <Search className="h-4 w-4 mr-2" />
                Computer Vision
              </TabsTrigger>
              <TabsTrigger value="nlp" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                Natural Language
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <BarChart2 className="h-4 w-4 mr-2" />
                Predictive Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="vision" className="mt-0">
            <VisionDemo />
          </TabsContent>

          <TabsContent value="nlp" className="mt-0">
            <NLPDemo />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <AnalyticsDemo />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

// Computer Vision Demo
function VisionDemo() {
  const [selectedImage, setSelectedImage] = useState("car1")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [confidence, setConfidence] = useState(0)

  const images = {
    car1: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    car2: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    car3: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop",
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    setResults(null)
    setConfidence(0)

    // Simulate progress
    const interval = setInterval(() => {
      setConfidence((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setConfidence(100)

      const resultData = {
        car1: {
          objects: [
            { label: "Car", confidence: 0.98, bbox: [50, 100, 500, 300] },
            { label: "Road", confidence: 0.95, bbox: [0, 350, 600, 150] },
            { label: "Sky", confidence: 0.92, bbox: [0, 0, 600, 100] },
          ],
          attributes: {
            make: "Vintage Ford Mustang",
            color: "Red",
            condition: "Excellent",
            environment: "Rural road",
          },
        },
        car2: {
          objects: [
            { label: "Car", confidence: 0.99, bbox: [100, 150, 400, 250] },
            { label: "Building", confidence: 0.85, bbox: [0, 0, 200, 200] },
            { label: "Road", confidence: 0.93, bbox: [0, 400, 600, 100] },
          ],
          attributes: {
            make: "BMW M4",
            color: "Blue",
            condition: "New",
            environment: "Urban street",
          },
        },
        car3: {
          objects: [
            { label: "Car", confidence: 0.97, bbox: [150, 100, 350, 250] },
            { label: "Person", confidence: 0.88, bbox: [50, 200, 100, 200] },
            { label: "Road", confidence: 0.94, bbox: [0, 350, 600, 150] },
          ],
          attributes: {
            make: "Audi R8",
            color: "White",
            condition: "Good",
            environment: "Test track",
          },
        },
      }

      setResults(resultData[selectedImage as keyof typeof resultData])
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
        <CardHeader>
          <CardTitle>Computer Vision Analysis</CardTitle>
          <CardDescription>Upload or select an image to analyze</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {Object.entries(images).map(([key, url]) => (
                <div
                  key={key}
                  className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedImage === key
                      ? "border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  onClick={() => setSelectedImage(key)}
                >
                  <img src={url || "/placeholder.svg"} alt={`Car ${key}`} className="w-full h-32 object-cover" />
                  {selectedImage === key && (
                    <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <img
                src={images[selectedImage as keyof typeof images] || "/placeholder.svg"}
                alt="Selected image"
                className="w-full h-auto"
              />

              {results && (
                <div className="absolute inset-0">
                  {results.objects.map((obj: any, i: number) => (
                    <div
                      key={i}
                      className="absolute border-2 border-red-500 rounded-sm flex items-start justify-between"
                      style={{
                        left: `${obj.bbox[0]}px`,
                        top: `${obj.bbox[1]}px`,
                        width: `${obj.bbox[2]}px`,
                        height: `${obj.bbox[3]}px`,
                      }}
                    >
                      <div className="bg-red-500 text-white text-xs px-1 py-0.5 rounded-sm">
                        {obj.label} ({Math.round(obj.confidence * 100)}%)
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing image...</span>
                  <span>{confidence}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
            )}

            <Button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze Image
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>Detected objects and attributes</CardDescription>
        </CardHeader>
        <CardContent>
          {!results && !isAnalyzing && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Search className="h-12 w-12 text-white/20 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Analysis Yet</h3>
              <p className="text-white/60 max-w-md">
                Select an image and click the "Analyze Image" button to see AI-powered computer vision results.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
              <h3 className="text-xl font-medium mb-2">Analyzing Image</h3>
              <p className="text-white/60 max-w-md">
                Our AI is processing the image to detect objects, attributes, and context.
              </p>
            </div>
          )}

          {results && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Detected Objects</h3>
                <div className="space-y-3">
                  {results.objects.map((obj: any, i: number) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>{obj.label}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-white/70">Confidence: </span>
                        <span className="font-medium">{Math.round(obj.confidence * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Vehicle Attributes</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(results.attributes).map(([key, value]) => (
                    <div key={key} className="bg-white/5 rounded-lg p-3">
                      <div className="text-sm text-white/70 mb-1 capitalize">{key}</div>
                      <div className="font-medium">{value as string}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">AI Insights</h3>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/80">
                    This appears to be a {results.attributes.make} in {results.attributes.color.toLowerCase()} color.
                    The vehicle is in {results.attributes.condition.toLowerCase()} condition and is located in a{" "}
                    {results.attributes.environment.toLowerCase()} environment.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Detailed Report
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Natural Language Processing Demo
function NLPDemo() {
  const [input, setInput] = useState("")
  const [task, setTask] = useState("sentiment")
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const processText = () => {
    if (!input.trim()) return

    setIsProcessing(true)
    setResults(null)

    // Simulate API call
    setTimeout(() => {
      let resultData

      if (task === "sentiment") {
        const score = Math.random()
        let sentiment

        if (score > 0.7) sentiment = "Positive"
        else if (score > 0.4) sentiment = "Neutral"
        else sentiment = "Negative"

        resultData = {
          sentiment,
          score: score.toFixed(2),
          emotions: {
            joy: (Math.random() * 0.5 + (sentiment === "Positive" ? 0.5 : 0)).toFixed(2),
            sadness: (Math.random() * 0.5 + (sentiment === "Negative" ? 0.5 : 0)).toFixed(2),
            anger: (Math.random() * 0.3).toFixed(2),
            fear: (Math.random() * 0.3).toFixed(2),
            surprise: (Math.random() * 0.3).toFixed(2),
          },
          keywords: input
            .split(" ")
            .filter((word) => word.length > 4)
            .slice(0, 5)
            .map((word) => ({ word, relevance: (Math.random() * 0.5 + 0.5).toFixed(2) })),
        }
      } else if (task === "summarize") {
        resultData = {
          summary:
            input.split(" ").length > 20
              ? input
                  .split(" ")
                  .slice(0, input.split(" ").length / 3)
                  .join(" ") + "..."
              : "Text is too short to summarize effectively.",
        }
      } else if (task === "translate") {
        resultData = {
          translated: input.split("").reverse().join(""),
          sourceLanguage: "English",
          targetLanguage: "Spanish",
          confidence: (Math.random() * 0.2 + 0.8).toFixed(2),
        }
      }

      setResults(resultData)
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
        <CardHeader>
          <CardTitle>Natural Language Processing</CardTitle>
          <CardDescription>Enter text to analyze or process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Task</label>
              <Select value={task} onValueChange={setTask}>
                <SelectTrigger className="bg-black/50 border-white/10">
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="sentiment">Sentiment Analysis</SelectItem>
                  <SelectItem value="summarize">Text Summarization</SelectItem>
                  <SelectItem value="translate">Translation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Enter Text</label>
              <Textarea
                placeholder="Enter text to analyze..."
                className="bg-black/50 border-white/10 min-h-[200px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <Button
              onClick={processText}
              disabled={isProcessing || !input.trim()}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Process Text
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>
            {task === "sentiment"
              ? "Sentiment analysis and emotion detection"
              : task === "summarize"
                ? "Text summarization"
                : "Translation results"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!results && !isProcessing && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <MessageSquare className="h-12 w-12 text-white/20 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Analysis Yet</h3>
              <p className="text-white/60 max-w-md">
                Enter some text and select a task to see AI-powered natural language processing results.
              </p>
            </div>
          )}

          {isProcessing && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
              <h3 className="text-xl font-medium mb-2">Processing Text</h3>
              <p className="text-white/60 max-w-md">Our AI is analyzing your text to extract insights and meaning.</p>
            </div>
          )}

          {results && task === "sentiment" && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div
                  className={`text-center p-6 rounded-full ${
                    results.sentiment === "Positive"
                      ? "bg-green-500/20 text-green-500"
                      : results.sentiment === "Neutral"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-red-500/20 text-red-500"
                  }`}
                >
                  <div className="text-4xl font-bold mb-1">{results.sentiment}</div>
                  <div>Score: {results.score}</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Emotion Analysis</h3>
                <div className="space-y-3">
                  {Object.entries(results.emotions).map(([emotion, score]) => (
                    <div key={emotion} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="capitalize">{emotion}</span>
                        <span>{(Number(score) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={Number(score) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Key Phrases</h3>
                <div className="flex flex-wrap gap-2">
                  {results.keywords.map((keyword: any, i: number) => (
                    <Badge key={i} className="bg-white/10 hover:bg-white/20">
                      {keyword.word} ({keyword.relevance})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {results && task === "summarize" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Summary</h3>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/80">{results.summary}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-sm text-white/70 mb-1">Original Length</div>
                    <div className="font-medium">{input.split(" ").length} words</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-sm text-white/70 mb-1">Summary Length</div>
                    <div className="font-medium">{results.summary.split(" ").length} words</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-sm text-white/70 mb-1">Compression Ratio</div>
                    <div className="font-medium">
                      {Math.round((results.summary.split(" ").length / input.split(" ").length) * 100)}%
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-sm text-white/70 mb-1">Processing Time</div>
                    <div className="font-medium">1.2 seconds</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {results && task === "translate" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Translation</h3>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between text-sm text-white/70 mb-2">
                    <span>
                      {results.sourceLanguage} → {results.targetLanguage}
                    </span>
                    <span>Confidence: {(Number(results.confidence) * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-white/80">{results.translated}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Alternative Translations</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-white/70 mb-1">Alternative 1</div>
                    <p>{results.translated.split("").sort().join("")}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-white/70 mb-1">Alternative 2</div>
                    <p>{results.translated.split(" ").sort().join(" ")}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Translation
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Refine Translation
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Predictive Analytics Demo
function AnalyticsDemo() {
  const [dataset, setDataset] = useState("sales")
  const [timeframe, setTimeframe] = useState("monthly")
  const [isLoading, setIsLoading] = useState(false)
  const [showPrediction, setShowPrediction] = useState(false)

  const generatePrediction = () => {
    setIsLoading(true)
    setShowPrediction(false)

    setTimeout(() => {
      setIsLoading(false)
      setShowPrediction(true)
    }, 2000)
  }

  const salesData = [
    { name: "Jan", actual: 4000, predicted: null },
    { name: "Feb", actual: 3000, predicted: null },
    { name: "Mar", actual: 5000, predicted: null },
    { name: "Apr", actual: 4500, predicted: null },
    { name: "May", actual: 6000, predicted: null },
    { name: "Jun", actual: 5500, predicted: null },
    { name: "Jul", actual: 6500, predicted: null },
    { name: "Aug", actual: 7000, predicted: null },
    { name: "Sep", actual: 8000, predicted: null },
    { name: "Oct", actual: 7500, predicted: null },
    { name: "Nov", actual: null, predicted: 8500 },
    { name: "Dec", actual: null, predicted: 9500 },
  ]

  const customerData = [
    { name: "Jan", actual: 1200, predicted: null },
    { name: "Feb", actual: 1300, predicted: null },
    { name: "Mar", actual: 1400, predicted: null },
    { name: "Apr", actual: 1350, predicted: null },
    { name: "May", actual: 1500, predicted: null },
    { name: "Jun", actual: 1600, predicted: null },
    { name: "Jul", actual: 1650, predicted: null },
    { name: "Aug", actual: 1700, predicted: null },
    { name: "Sep", actual: 1800, predicted: null },
    { name: "Oct", actual: 1850, predicted: null },
    { name: "Nov", actual: null, predicted: 1950 },
    { name: "Dec", actual: null, predicted: 2100 },
  ]

  const inventoryData = [
    { name: "Jan", actual: 500, predicted: null },
    { name: "Feb", actual: 450, predicted: null },
    { name: "Mar", actual: 480, predicted: null },
    { name: "Apr", actual: 520, predicted: null },
    { name: "May", actual: 550, predicted: null },
    { name: "Jun", actual: 500, predicted: null },
    { name: "Jul", actual: 480, predicted: null },
    { name: "Aug", actual: 460, predicted: null },
    { name: "Sep", actual: 440, predicted: null },
    { name: "Oct", actual: 420, predicted: null },
    { name: "Nov", actual: null, predicted: 400 },
    { name: "Dec", actual: null, predicted: 380 },
  ]

  const getDataset = () => {
    switch (dataset) {
      case "sales":
        return salesData
      case "customers":
        return customerData
      case "inventory":
        return inventoryData
      default:
        return salesData
    }
  }

  const getDatasetTitle = () => {
    switch (dataset) {
      case "sales":
        return "Sales Forecast"
      case "customers":
        return "Customer Growth Prediction"
      case "inventory":
        return "Inventory Optimization"
      default:
        return "Predictive Analytics"
    }
  }

  const getDatasetDescription = () => {
    switch (dataset) {
      case "sales":
        return "Monthly sales forecast based on historical data"
      case "customers":
        return "Customer acquisition and retention prediction"
      case "inventory":
        return "Optimal inventory levels to minimize costs"
      default:
        return "Predictive analytics based on historical data"
    }
  }

  const getDatasetMetric = () => {
    switch (dataset) {
      case "sales":
        return "Revenue ($)"
      case "customers":
        return "Customers"
      case "inventory":
        return "Units"
      default:
        return "Value"
    }
  }

  const getInsights = () => {
    switch (dataset) {
      case "sales":
        return [
          "Sales are projected to increase by 26.7% in Q4 compared to Q3",
          "December is expected to be the highest revenue month of the year",
          "Year-over-year growth is estimated at 18.2%",
          "Seasonal patterns indicate stronger performance in second half of year",
        ]
      case "customers":
        return [
          "Customer base is projected to grow by 13.5% by year end",
          "Retention rate is estimated at 87% based on historical patterns",
          "Customer acquisition cost is decreasing as growth accelerates",
          "Projected to reach 2,000+ customers milestone in December",
        ]
      case "inventory":
        return [
          "Inventory levels are optimally decreasing by 9.5% in Q4",
          "Carrying costs projected to decrease by 12% with optimization",
          "Stockout risk remains below 2% with recommended levels",
          "Just-in-time inventory strategy showing positive results",
        ]
      default:
        return []
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
        <CardHeader>
          <CardTitle>Predictive Model Configuration</CardTitle>
          <CardDescription>Configure and run predictive analytics models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Dataset</label>
              <Select value={dataset} onValueChange={setDataset}>
                <SelectTrigger className="bg-black/50 border-white/10">
                  <SelectValue placeholder="Select a dataset" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="sales">Sales Data</SelectItem>
                  <SelectItem value="customers">Customer Data</SelectItem>
                  <SelectItem value="inventory">Inventory Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Prediction Timeframe</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="bg-black/50 border-white/10">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Model Parameters</label>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs text-white/70">Confidence Level</label>
                    <Select defaultValue="95">
                      <SelectTrigger className="bg-black/50 border-white/10 h-8 text-sm">
                        <SelectValue placeholder="Confidence" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                        <SelectItem value="99">99%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs text-white/70">Seasonality</label>
                    <Select defaultValue="auto">
                      <SelectTrigger className="bg-black/50 border-white/10 h-8 text-sm">
                        <SelectValue placeholder="Seasonality" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs text-white/70">Forecast Horizon</label>
                    <Select defaultValue="2">
                      <SelectTrigger className="bg-black/50 border-white/10 h-8 text-sm">
                        <SelectValue placeholder="Horizon" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        <SelectItem value="1">1 period</SelectItem>
                        <SelectItem value="2">2 periods</SelectItem>
                        <SelectItem value="4">4 periods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs text-white/70">Algorithm</label>
                    <Select defaultValue="arima">
                      <SelectTrigger className="bg-black/50 border-white/10 h-8 text-sm">
                        <SelectValue placeholder="Algorithm" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        <SelectItem value="arima">ARIMA</SelectItem>
                        <SelectItem value="prophet">Prophet</SelectItem>
                        <SelectItem value="lstm">LSTM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={generatePrediction}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Prediction...
                  </>
                ) : (
                  <>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Generate Prediction
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden lg:col-span-2">
        <CardHeader>
          <CardTitle>{getDatasetTitle()}</CardTitle>
          <CardDescription>{getDatasetDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
              <h3 className="text-xl font-medium mb-2">Generating Prediction</h3>
              <p className="text-white/60 max-w-md">
                Our AI is analyzing historical data patterns to generate accurate predictions.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <ChartContainer
                config={{
                  actual: {
                    label: "Actual Data",
                    color: "hsl(var(--chart-1))",
                  },
                  predicted: {
                    label: "Predicted Data",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getDataset()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="var(--color-actual)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    {showPrediction && (
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>

              {showPrediction && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Prediction Insights</h3>
                    <div className="space-y-2">
                      {getInsights().map((insight, i) => (
                        <div key={i} className="flex gap-2">
                          <div className="h-5 w-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                          </div>
                          <p className="text-white/80">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Model Performance</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-white/70 mb-1">Accuracy</div>
                        <div className="font-medium">94.8%</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-white/70 mb-1">MAPE</div>
                        <div className="font-medium">5.2%</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-white/70 mb-1">R² Score</div>
                        <div className="font-medium">0.89</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-white/70 mb-1">Confidence</div>
                        <div className="font-medium">95%</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                        <FileText className="mr-2 h-4 w-4" />
                        Export Detailed Report
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

