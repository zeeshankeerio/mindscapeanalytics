"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Book, Code, FileText, MessageSquare, HelpCircle, ChevronRight, Terminal, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-24">
        <SidebarProvider>
          <div className="flex flex-1 pt-16">
            <Sidebar className="pt-4" collapsible="icon">
              <SidebarHeader>
                <div className="px-4 py-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input placeholder="Search docs..." className="bg-white/5 border-white/10 pl-9 py-2 text-sm" />
                  </div>
                </div>
              </SidebarHeader>

              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive>
                          <FileText className="h-4 w-4" />
                          <span>Introduction</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Terminal className="h-4 w-4" />
                          <span>Installation</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Code className="h-4 w-4" />
                          <span>Quick Start</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Core Concepts</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>AI Models</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Data Processing</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Training</span>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>Supervised Learning</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>Unsupervised Learning</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>Reinforcement Learning</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Deployment</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>API Reference</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Authentication</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Models</span>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>Vision API</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>NLP API</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>Prediction API</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Data</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Analytics</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Guides</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Best Practices</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Security</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Performance</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <span>Troubleshooting</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <div className="flex-1 overflow-auto">
              <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
                <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
                  <span>Documentation</span>
                  <span>/</span>
                  <span>Getting Started</span>
                  <span>/</span>
                  <span className="text-white">Introduction</span>
                </div>

                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-4">Introduction to Mindscape AI Platform</h1>
                  <p className="text-xl text-white/70">
                    Welcome to the Mindscape AI Platform documentation. This guide will help you get started with our AI
                    solutions and show you how to integrate them into your applications.
                  </p>
                </div>

                <div className="prose prose-invert max-w-none">
                  <h2>What is Mindscape AI Platform?</h2>
                  <p>
                    Mindscape AI Platform is a comprehensive suite of artificial intelligence tools and services designed
                    to help businesses leverage the power of AI without the complexity typically associated with AI
                    development. Our platform provides pre-trained models, customizable solutions, and easy-to-use APIs
                    for a wide range of AI applications.
                  </p>

                  <h2>Key Features</h2>
                  <ul>
                    <li>
                      <strong>Computer Vision:</strong> Image recognition, object detection, and visual content analysis.
                    </li>
                    <li>
                      <strong>Natural Language Processing:</strong> Text analysis, sentiment detection, and language
                      generation.
                    </li>
                    <li>
                      <strong>Predictive Analytics:</strong> Forecast trends and outcomes based on historical data.
                    </li>
                    <li>
                      <strong>Custom AI Models:</strong> Train and deploy custom models tailored to your specific needs.
                    </li>
                    <li>
                      <strong>Real-time Analytics:</strong> Monitor and analyze data streams in real-time.
                    </li>
                  </ul>

                  <h2>Getting Started</h2>
                  <p>To get started with the Mindscape AI Platform, you'll need to:</p>
                  <ol>
                    <li>Create an account on the Mindscape AI Platform</li>
                    <li>Generate API keys for authentication</li>
                    <li>Install the Mindscape AI SDK</li>
                    <li>Choose the AI services you want to use</li>
                    <li>Integrate the services into your application</li>
                  </ol>

                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-bold mb-4">Quick Installation</h3>
                    <div className="bg-black/60 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
                      <pre>npm install @mindscape/ai-sdk</pre>
                    </div>
                    <p className="text-white/70">
                      For more detailed installation instructions, see the{" "}
                      <a href="#" className="text-red-500 hover:underline">
                        Installation Guide
                      </a>
                      .
                    </p>
                  </div>

                  <h2>Basic Usage Example</h2>
                  <p>Here's a simple example of how to use the Mindscape AI SDK for image recognition:</p>

                  <div className="bg-black/60 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
                    <pre>{`import { MindscapeAI } from '@mindscape/ai-sdk';

// Initialize the SDK with your API key
const mindscape = new MindscapeAI({
  apiKey: 'YOUR_API_KEY'
});

// Use the image recognition service
const result = await mindscape.vision.analyze({
  image: 'https://example.com/image.jpg',
  features: ['objects', 'labels', 'text']
});

console.log(result);`}</pre>
                  </div>

                  <p>
                    This example shows how to initialize the SDK with your API key and use the vision service to analyze
                    an image for objects, labels, and text.
                  </p>

                  <h2>Next Steps</h2>
                  <p>Now that you have a basic understanding of the Mindscape AI Platform, you can:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-500/50 transition-colors duration-300">
                      <CardContent className="p-6">
                        <Terminal className="h-6 w-6 text-red-500 mb-3" />
                        <h3 className="text-lg font-bold mb-2">Installation Guide</h3>
                        <p className="text-white/70 mb-4">
                          Learn how to install and configure the Mindscape AI SDK for your project.
                        </p>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto text-red-500 hover:text-red-400 hover:bg-transparent"
                        >
                          Read Installation Guide
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-500/50 transition-colors duration-300">
                      <CardContent className="p-6">
                        <Code className="h-6 w-6 text-red-500 mb-3" />
                        <h3 className="text-lg font-bold mb-2">Quick Start</h3>
                        <p className="text-white/70 mb-4">
                          Get up and running quickly with our step-by-step quick start guide.
                        </p>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto text-red-500 hover:text-red-400 hover:bg-transparent"
                        >
                          View Quick Start
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <h2>Support</h2>
                  <p>If you need help with the Mindscape AI Platform, you can:</p>
                  <ul>
                    <li>
                      Check our{" "}
                      <a href="#" className="text-red-500 hover:underline">
                        FAQ
                      </a>{" "}
                      for answers to common questions
                    </li>
                    <li>
                      Join our{" "}
                      <a href="#" className="text-red-500 hover:underline">
                        Community Forum
                      </a>{" "}
                      to connect with other developers
                    </li>
                    <li>
                      Contact our{" "}
                      <a href="#" className="text-red-500 hover:underline">
                        Support Team
                      </a>{" "}
                      for technical assistance
                    </li>
                  </ul>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      Previous: Overview
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Next: Installation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-lg font-bold mb-4">Was this page helpful?</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      Yes, it was helpful
                    </Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      No, it needs improvement
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}

