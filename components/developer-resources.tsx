"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Book, Code, Copy, ExternalLink, FileCode, FileText, Github, Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function DeveloperResources() {
  const [activeTab, setActiveTab] = useState("api")
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedSnippet(id)
    setTimeout(() => setCopiedSnippet(null), 2000)
  }

  const codeSnippets = {
    python: `import mindscape

# Initialize the client with your API key
client = mindscape.Client(api_key="YOUR_API_KEY")

# Use the vision API to analyze an image
result = client.vision.analyze(
    image_url="https://example.com/image.jpg",
    features=["objects", "labels", "text"]
)

# Print the detected objects
for obj in result.objects:
    print(f"Detected {obj.name} with confidence {obj.confidence:.2f}")`,

    javascript: `import { MindscapeAI } from '@mindscape/ai-sdk';

// Initialize the SDK with your API key
const mindscape = new MindscapeAI({
  apiKey: 'YOUR_API_KEY'
});

// Use the vision API to analyze an image
const result = await mindscape.vision.analyze({
  image: 'https://example.com/image.jpg',
  features: ['objects', 'labels', 'text']
});

// Log the detected objects
result.objects.forEach(obj => {
  console.log(\`Detected \${obj.name} with confidence \${obj.confidence.toFixed(2)}\`);
});`,

    curl: `curl -X POST https://api.mindscape.ai/v1/vision/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://example.com/image.jpg",
    "features": ["objects", "labels", "text"]
  }'`,
  }

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of integrating Mindscape AI into your applications.",
      icon: <Book className="h-10 w-10 text-red-500" />,
      link: "#",
      category: "guides",
    },
    {
      title: "API Reference",
      description: "Comprehensive documentation of all API endpoints and parameters.",
      icon: <FileText className="h-10 w-10 text-red-500" />,
      link: "#",
      category: "api",
    },
    {
      title: "SDK Documentation",
      description: "Detailed guides for using our SDKs in various programming languages.",
      icon: <Code className="h-10 w-10 text-red-500" />,
      link: "#",
      category: "sdk",
    },
    {
      title: "Code Examples",
      description: "Sample code for common use cases and integration patterns.",
      icon: <FileCode className="h-10 w-10 text-red-500" />,
      link: "#",
      category: "examples",
    },
    {
      title: "Tutorials",
      description: "Step-by-step tutorials for building applications with Mindscape AI.",
      icon: <Book className="h-10 w-10 text-red-500" />,
      link: "#",
      category: "guides",
    },
    {
      title: "GitHub Repositories",
      description: "Open-source tools, examples, and integrations for Mindscape AI.",
      icon: <Github className="h-10 w-10 text-red-500" />,
      link: "#",
      category: "examples",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-black to-black/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">DEVELOPERS</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Developer <span className="text-red-500">Resources</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to integrate Mindscape AI into your applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full">
              <CardHeader>
                <CardTitle>API Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Get Your API Key</h3>
                  <div className="flex gap-2">
                    <Input
                      value="YOUR_API_KEY"
                      readOnly
                      className="bg-black/50 border-white/10 font-mono text-white/70"
                    />
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-white/60">
                    Sign up for a free account to get your API key and start building with Mindscape AI.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Install the SDK</h3>
                  <div className="bg-black/50 rounded-md p-3 font-mono text-sm text-white/80 flex justify-between items-center">
                    <code>npm install @mindscape/ai-sdk</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-white/60 hover:text-white hover:bg-white/10"
                      onClick={() => copyToClipboard("npm install @mindscape/ai-sdk", "npm")}
                    >
                      {copiedSnippet === "npm" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-black/50 rounded-md p-3 font-mono text-sm text-white/80 flex justify-between items-center">
                    <code>pip install mindscape-ai</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-white/60 hover:text-white hover:bg-white/10"
                      onClick={() => copyToClipboard("pip install mindscape-ai", "pip")}
                    >
                      {copiedSnippet === "pip" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Sign Up for Free API Key
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full">
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="bg-black/50 border border-white/10 mb-4">
                    <TabsTrigger
                      value="javascript"
                      className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                    >
                      JavaScript
                    </TabsTrigger>
                    <TabsTrigger
                      value="python"
                      className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                    >
                      Python
                    </TabsTrigger>
                    <TabsTrigger value="curl" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                      cURL
                    </TabsTrigger>
                  </TabsList>

                  {Object.entries(codeSnippets).map(([language, code]) => (
                    <TabsContent key={language} value={language} className="mt-0">
                      <div className="relative">
                        <pre className="bg-black/50 rounded-md p-4 font-mono text-sm text-white/80 overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 px-2 text-white/60 hover:text-white hover:bg-white/10"
                          onClick={() => copyToClipboard(code, language)}
                        >
                          {copiedSnippet === language ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                  <Globe className="mr-2 h-4 w-4" />
                  View Full API Documentation
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index * 0.1) % 0.5 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full hover:border-red-500/50 transition-all duration-300 group">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="p-3 bg-red-500/10 rounded-lg w-fit mb-4 group-hover:bg-red-500/20 transition-colors">
                    {resource.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-white/70 mb-4">{resource.description}</p>

                  <div className="mt-auto pt-4">
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-red-500 hover:text-red-400 hover:bg-transparent group"
                      asChild
                    >
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        View Resource
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Explore Developer Portal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

