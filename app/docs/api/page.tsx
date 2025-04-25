"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  ChevronRight,
  Code,
  Copy,
  ExternalLink,
  FileText,
  Home,
  Search,
  Terminal,
  Check,
  Cpu,
  Database,
  Image,
  MessageSquare,
  BarChart2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"

export default function ApiDocsPage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("python")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MainNavigation />

      <div className="flex-1 pt-24">
        {/* Hero section */}
        <div className="bg-black border-b border-white/10">
          <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">API Documentation</h1>
              <p className="text-xl text-white/70 mb-8">
                Integrate Mindscape's powerful AI capabilities directly into your applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-600 hover:bg-red-700">
                  <Terminal className="mr-2 h-4 w-4" />
                  Get API Key
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <FileText className="mr-2 h-4 w-4" />
                  View SDK Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="mb-6">
                  <Input
                    placeholder="Search documentation..."
                    className="bg-black/50 border-white/10 focus-visible:ring-red-500"
                    startAdornment={<Search className="h-4 w-4 text-white/50" />}
                  />
                </div>

                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Introduction
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <Terminal className="mr-2 h-4 w-4" />
                    Authentication
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Rate Limits
                  </Button>

                  <div>
                    <Button variant="ghost" className="w-full justify-between text-white bg-white/5">
                      <div className="flex items-center">
                        <Cpu className="mr-2 h-4 w-4" />
                        API Reference
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>

                    <div className="ml-6 mt-1 space-y-1">
                      <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/5 pl-4">
                        <ChevronRight className="mr-2 h-3 w-3" />
                        Models
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5 pl-4"
                      >
                        <ChevronRight className="mr-2 h-3 w-3" />
                        Computer Vision
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5 pl-4"
                      >
                        <ChevronRight className="mr-2 h-3 w-3" />
                        Natural Language
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5 pl-4"
                      >
                        <ChevronRight className="mr-2 h-3 w-3" />
                        Predictive Analytics
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    SDK Documentation
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Tutorials
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <div className="prose prose-invert max-w-none">
                <h1>Models API Reference</h1>
                <p className="lead">
                  The Models API provides access to Mindscape's suite of AI models for various tasks including text
                  generation, image analysis, and predictive analytics.
                </p>

                <div className="not-prose">
                  <div className="flex items-center gap-2 mb-6">
                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">GET</Badge>
                    <code className="bg-white/5 px-2 py-1 rounded text-white/90">/v1/models</code>
                    <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">Stable</Badge>
                  </div>
                </div>

                <p>
                  Returns a list of the currently available models, and provides basic information about each one such
                  as the owner and availability.
                </p>

                <h2>Request</h2>

                <div className="not-prose bg-black/50 border border-white/10 rounded-lg overflow-hidden mb-8">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-500">GET</Badge>
                      <code className="text-sm">/v1/models</code>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() =>
                        copyToClipboard(
                          'curl https://api.mindscape.ai/v1/models \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
                        )
                      }
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="p-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="bg-black/50 border border-white/10">
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                      </TabsList>

                      <TabsContent value="python" className="mt-4">
                        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                          <code className="text-white/90">
                            {`import requests

api_key = "YOUR_API_KEY"
headers = {
    "Authorization": f"Bearer {api_key}"
}

response = requests.get("https://api.mindscape.ai/v1/models", headers=headers)
models = response.json()

print(models)`}
                          </code>
                        </pre>
                      </TabsContent>

                      <TabsContent value="javascript" className="mt-4">
                        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                          <code className="text-white/90">
                            {`const apiKey = "YOUR_API_KEY";

fetch("https://api.mindscape.ai/v1/models", {
  headers: {
    "Authorization": \`Bearer \${apiKey}\`
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));`}
                          </code>
                        </pre>
                      </TabsContent>

                      <TabsContent value="curl" className="mt-4">
                        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                          <code className="text-white/90">
                            {`curl https://api.mindscape.ai/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                          </code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <h2>Response</h2>

                <div className="not-prose bg-black/50 border border-white/10 rounded-lg overflow-hidden mb-8">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500/20 text-blue-500">Response</Badge>
                      <code className="text-sm">200: OK</code>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() =>
                        copyToClipboard(
                          '{\n  "object": "list",\n  "data": [\n    {\n      "id": "mindscape-vision-v1",\n      "object": "model",\n      "created": 1686935002,\n      "owned_by": "mindscape-ai",\n      "capabilities": {\n        "image-recognition": true,\n        "object-detection": true\n      },\n      "permission": []\n    },\n    {\n      "id": "mindscape-nlp-v2",\n      "object": "model",\n      "created": 1686935002,\n      "owned_by": "mindscape-ai",\n      "capabilities": {\n        "text-generation": true,\n        "embedding": true\n      },\n      "permission": []\n    }\n  ]\n}',
                        )
                      }
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <pre className="p-4 bg-black/30 overflow-x-auto">
                    <code className="text-white/90">
                      {`{
  "object": "list",
  "data": [
    {
      "id": "mindscape-vision-v1",
      "object": "model",
      "created": 1686935002,
      "owned_by": "mindscape-ai",
      "capabilities": {
        "image-recognition": true,
        "object-detection": true
      },
      "permission": []
    },
    {
      "id": "mindscape-nlp-v2",
      "object": "model",
      "created": 1686935002,
      "owned_by": "mindscape-ai",
      "capabilities": {
        "text-generation": true,
        "embedding": true
      },
      "permission": []
    }
  ]
}`}
                    </code>
                  </pre>
                </div>

                <h2>Available Models</h2>

                <p>
                  Mindscape offers a variety of specialized AI models for different tasks. Here are the main categories:
                </p>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-red-500/20 p-2 rounded-lg">
                        <Image className="h-5 w-5 text-red-500" />
                      </div>
                      <h3 className="text-lg font-medium">Computer Vision Models</h3>
                    </div>
                    <p className="text-white/70 mb-3">
                      Models specialized in image recognition, object detection, and scene understanding.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <code>mindscape-vision-v1</code>
                        <Badge className="bg-green-500/20 text-green-500">Stable</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <code>mindscape-vision-v2-beta</code>
                        <Badge className="bg-yellow-500/20 text-yellow-500">Beta</Badge>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-medium">NLP Models</h3>
                    </div>
                    <p className="text-white/70 mb-3">Models for text generation, understanding, and embedding.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <code>mindscape-nlp-v1</code>
                        <Badge className="bg-green-500/20 text-green-500">Stable</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <code>mindscape-nlp-v2</code>
                        <Badge className="bg-green-500/20 text-green-500">Stable</Badge>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <Database className="h-5 w-5 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-medium">Embedding Models</h3>
                    </div>
                    <p className="text-white/70 mb-3">Models for creating vector embeddings of text and images.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <code>mindscape-embed-v1</code>
                        <Badge className="bg-green-500/20 text-green-500">Stable</Badge>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <BarChart2 className="h-5 w-5 text-green-500" />
                      </div>
                      <h3 className="text-lg font-medium">Predictive Models</h3>
                    </div>
                    <p className="text-white/70 mb-3">Models for time-series forecasting and predictive analytics.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <code>mindscape-predict-v1</code>
                        <Badge className="bg-green-500/20 text-green-500">Stable</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <code>mindscape-forecast-v1</code>
                        <Badge className="bg-yellow-500/20 text-yellow-500">Beta</Badge>
                      </li>
                    </ul>
                  </div>
                </div>

                <h2>Error Codes</h2>

                <p>The API uses standard HTTP response codes to indicate the success or failure of requests.</p>

                <div className="not-prose overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="px-4 py-2 text-left">Code</th>
                        <th className="px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-500/20 text-green-500">200 - OK</Badge>
                        </td>
                        <td className="px-4 py-3 text-white/70">The request was successful.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">
                          <Badge className="bg-yellow-500/20 text-yellow-500">400 - Bad Request</Badge>
                        </td>
                        <td className="px-4 py-3 text-white/70">
                          The request was malformed or contained invalid parameters.
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">
                          <Badge className="bg-red-500/20 text-red-500">401 - Unauthorized</Badge>
                        </td>
                        <td className="px-4 py-3 text-white/70">Authentication failed or API key is missing.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">
                          <Badge className="bg-red-500/20 text-red-500">403 - Forbidden</Badge>
                        </td>
                        <td className="px-4 py-3 text-white/70">
                          The API key doesn't have permission to perform the request.
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">
                          <Badge className="bg-red-500/20 text-red-500">404 - Not Found</Badge>
                        </td>
                        <td className="px-4 py-3 text-white/70">The requested resource doesn't exist.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">
                          <Badge className="bg-red-500/20 text-red-500">429 - Too Many Requests</Badge>
                        </td>
                        <td className="px-4 py-3 text-white/70">You've exceeded your rate limit or quota.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">
                          <Badge className="bg-red-500/20 text-red-500">500 - Server Error</Badge>
                        </td>
                        <td className="px-4 py-3 text-white/70">Something went wrong on our end.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 pt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-blue-500 mb-1">Note</h4>
                      <p className="text-white/70">
                        All API requests must include your API key in the Authorization header. You can obtain an API
                        key from your
                        <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
                          {" "}
                          dashboard
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                <h2>Next Steps</h2>

                <p>
                  Now that you understand how to list available models, you can explore specific endpoints for each
                  model type:
                </p>

                <ul>
                  <li>
                    <Link href="/docs/api/vision" className="text-red-400 hover:text-red-300">
                      Computer Vision API
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/api/nlp" className="text-red-400 hover:text-red-300">
                      Natural Language Processing API
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/api/predictive" className="text-red-400 hover:text-red-300">
                      Predictive Analytics API
                    </Link>
                  </li>
                </ul>

                <div className="not-prose flex items-center justify-between mt-12 pt-6 border-t border-white/10">
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                    Authentication
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    Computer Vision API
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

