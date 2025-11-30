"use client"

import { useState } from "react"
import {
  Book,
  Code,
  FileText,
  Search,
  Terminal,
  Zap,
  ChevronRight,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Info,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { codeExamples } from "@/lib/mock-data"
import type { DocSection, CodeLanguage } from "@/types"

// Documentation sections
const sections = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: Zap,
    subsections: ["Introduction", "Quick Start", "Installation", "Authentication"],
  },
  {
    id: "api-reference",
    name: "API Reference",
    icon: Code,
    subsections: ["REST API", "Python SDK", "Node.js SDK", "Endpoints"],
  },
  {
    id: "guides",
    name: "Guides & Tutorials",
    icon: Book,
    subsections: [
      "Basic Concepts",
      "Model Training",
      "Deployment",
      "Best Practices",
    ],
  },
  {
    id: "examples",
    name: "Code Examples",
    icon: Terminal,
    subsections: ["Python", "JavaScript", "Curl", "WebSocket"],
  },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string>("getting-started")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>("python")
  const [activeTab, setActiveTab] = useState("basic-concepts")

  const renderContent = () => {
    switch (activeSection) {
      case "getting-started":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Getting Started with Mindscape</h2>
            <p className="text-muted-foreground">
              Welcome to Mindscape! This guide will help you get started with our AI platform.
            </p>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Quick Tip</AlertTitle>
              <AlertDescription>
                Make sure you have a valid API key before proceeding. You can find your API key in the dashboard settings.
              </AlertDescription>
            </Alert>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Quick Start</h3>
              <p className="text-muted-foreground">
                Follow these steps to begin using Mindscape:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Sign up for a Mindscape account</li>
                <li>Create your first project</li>
                <li>Upload your dataset</li>
                <li>Train your first model</li>
                <li>Deploy and monitor your model</li>
              </ol>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Installation</h3>
              <p className="text-muted-foreground">
                Choose your preferred method to install the Mindscape SDK:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <h4 className="font-semibold">Python</h4>
                  <pre className="mt-2 rounded bg-muted p-2 text-sm">
                    pip install mindscape
                  </pre>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold">JavaScript</h4>
                  <pre className="mt-2 rounded bg-muted p-2 text-sm">
                    npm install @mindscape/sdk
                  </pre>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        )
      case "api-reference":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">API Reference</h2>
            <p className="text-muted-foreground">
              Comprehensive documentation for the Mindscape API.
            </p>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Version</AlertTitle>
              <AlertDescription>
                This documentation is for API version 1.0.0. Make sure to include the version in your requests.
              </AlertDescription>
            </Alert>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Authentication</h3>
              <p className="text-muted-foreground">
                All API requests require authentication using your API key:
              </p>
              <Card className="p-4">
                <pre className="rounded bg-muted p-2 text-sm">
                  Authorization: Bearer your_api_key
                </pre>
                <Button variant="outline" size="sm" className="mt-2">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </Card>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Endpoints</h3>
              <Tabs defaultValue="models" className="w-full">
                <TabsList>
                  <TabsTrigger value="models">Models</TabsTrigger>
                  <TabsTrigger value="datasets">Datasets</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="models" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-semibold">Models API</h4>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1">GET /v1/models</code> - List all models
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1">POST /v1/models</code> - Create a new model
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1">GET /v1/models/{"{id}"}</code> - Get model details
                      </p>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="datasets" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-semibold">Datasets API</h4>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1">GET /v1/datasets</code> - List all datasets
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1">POST /v1/datasets</code> - Upload a new dataset
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1">GET /v1/datasets/{"{id}"}</code> - Get dataset details
                      </p>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="projects" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-semibold">Projects API</h4>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1">GET /v1/projects</code> - List all projects
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1">POST /v1/projects</code> - Create a new project
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <code className="rounded bg-muted px-1">GET /v1/projects/{"{id}"}</code> - Get project details
                      </p>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )
      case "guides":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Guides & Tutorials</h2>
            <p className="text-muted-foreground">
              Learn how to use Mindscape effectively with our comprehensive guides.
            </p>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="basic-concepts">Basic Concepts</TabsTrigger>
                <TabsTrigger value="model-training">Model Training</TabsTrigger>
                <TabsTrigger value="deployment">Deployment</TabsTrigger>
                <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
              </TabsList>
              <TabsContent value="basic-concepts" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Understanding Mindscape</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">What is Mindscape?</h4>
                      <p className="text-muted-foreground">
                        Mindscape is a powerful AI platform that helps you build, train, and deploy machine learning models.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Features</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Easy-to-use API and SDKs</li>
                        <li>Scalable infrastructure</li>
                        <li>Real-time monitoring</li>
                        <li>Advanced analytics</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Getting Started</h4>
                      <p className="text-muted-foreground">
                        Follow our quick start guide to create your first model in minutes.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="model-training" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Training Your First Model</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Data Preparation</h4>
                      <p className="text-muted-foreground">
                        Learn how to prepare and format your data for training.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Training Process</h4>
                      <p className="text-muted-foreground">
                        Understand the training process and how to monitor progress.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Model Evaluation</h4>
                      <p className="text-muted-foreground">
                        Learn how to evaluate your model's performance.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="deployment" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Deploying Your Model</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Deployment Options</h4>
                      <p className="text-muted-foreground">
                        Explore different deployment options and choose the best one for your needs.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Monitoring</h4>
                      <p className="text-muted-foreground">
                        Learn how to monitor your deployed model's performance.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Scaling</h4>
                      <p className="text-muted-foreground">
                        Understand how to scale your model as your needs grow.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="best-practices" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Data Management</h4>
                      <p className="text-muted-foreground">
                        Learn best practices for managing your data and datasets.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Model Optimization</h4>
                      <p className="text-muted-foreground">
                        Tips for optimizing your model's performance.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Security</h4>
                      <p className="text-muted-foreground">
                        Best practices for securing your models and data.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )
      case "examples":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Code Examples</h2>
            <p className="text-muted-foreground">
              Learn how to use Mindscape with practical code examples.
            </p>
            <div className="flex items-center gap-2">
              {["python", "javascript", "curl"].map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  className={
                    selectedLanguage === lang
                      ? "bg-red-600 hover:bg-red-700"
                      : "border-white/10"
                  }
                  onClick={() => setSelectedLanguage(lang as CodeLanguage)}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </Button>
              ))}
            </div>

            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Example: Model Creation and Training</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      navigator.clipboard.writeText(codeExamples[selectedLanguage])
                    }
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-lg bg-black/60 overflow-x-auto">
                  <code className="text-sm font-mono">
                    {codeExamples[selectedLanguage]}
                  </code>
                </pre>
              </CardContent>
            </Card>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-white/10">
                <FileText className="mr-2 h-4 w-4" />
                View More Examples
              </Button>
              <Button variant="outline" className="border-white/10">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in CodeSandbox
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Documentation</h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive guides and API documentation for Mindscape.
        </p>
      </div>
      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-6">
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-1">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection(section.id)}
                  >
                    <section.icon className="mr-2 h-4 w-4" />
                    {section.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex-1">
          <Card className="p-6">
            {renderContent()}
          </Card>
        </div>
      </div>
    </div>
  )
} 