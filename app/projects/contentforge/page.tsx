"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { generateContent } from "@/lib/contentforge"
import {
  PenTool,
  Sparkles,
  Clock,
  Users,
  Zap,
  Brain,
  ArrowRight,
  BarChart2,
  Calendar,
  Target,
  Layers,
  FileText,
  Image as ImageIcon,
  Video,
  Share2,
  Settings,
  CheckCircle2,
  Loader2
} from "lucide-react"

interface ContentForm {
  contentType: string
  topic: string
  keywords: string
  tone: string
}

export default function ContentForgePage() {
  const { toast } = useToast()
  const [form, setForm] = useState<ContentForm>({
    contentType: "blog",
    topic: "",
    keywords: "",
    tone: "professional"
  })
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState("")

  const contentTypes = [
    { value: "blog", label: "Blog Post", icon: FileText },
    { value: "social", label: "Social Media", icon: Share2 },
    { value: "email", label: "Email Campaign", icon: Layers },
    { value: "ad", label: "Advertisement", icon: Target }
  ]

  const handleInputChange = (field: keyof ContentForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    if (!form.topic) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    try {
      const content = await generateContent({
        contentType: form.contentType as any,
        topic: form.topic,
        keywords: form.keywords,
        tone: form.tone
      })
      setGeneratedContent(content)
      setEditedContent(content)
      toast({
        title: "Success",
        description: "Content generated successfully!"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    setGeneratedContent(editedContent)
    setIsEditing(false)
    toast({
      title: "Success",
      description: "Changes saved successfully!"
    })
  }

  const handlePublish = () => {
    // Implement publishing logic here
    toast({
      title: "Success",
      description: "Content published successfully!"
    })
  }

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black z-0"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 bg-red-500/10 text-red-500 border-red-500/20">
              Alpha Testing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              ContentForge
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              AI-powered content creation platform for digital marketers
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Content Generation Panel */}
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Create Content</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-white/60 mb-2 block">Content Type</label>
                    <Select 
                      value={form.contentType} 
                      onValueChange={(value) => handleInputChange("contentType", value)}
                    >
                      <SelectTrigger className="bg-black/40 border-white/10">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="w-4 h-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-white/60 mb-2 block">Topic</label>
                    <Input 
                      placeholder="Enter your content topic" 
                      className="bg-black/40 border-white/10"
                      value={form.topic}
                      onChange={(e) => handleInputChange("topic", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/60 mb-2 block">Keywords</label>
                    <Input 
                      placeholder="Enter keywords (comma separated)" 
                      className="bg-black/40 border-white/10"
                      value={form.keywords}
                      onChange={(e) => handleInputChange("keywords", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/60 mb-2 block">Tone</label>
                    <Select 
                      value={form.tone}
                      onValueChange={(value) => handleInputChange("tone", value)}
                    >
                      <SelectTrigger className="bg-black/40 border-white/10">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="authoritative">Authoritative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Generate Content
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview Panel */}
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Preview</h2>
                
                <div className="space-y-6">
                  <div className="bg-black/30 rounded-lg p-4 min-h-[300px]">
                    {isEditing ? (
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full h-full min-h-[300px] bg-black/40 border-white/10"
                      />
                    ) : generatedContent ? (
                      <div className="prose prose-invert max-w-none">
                        {generatedContent}
                      </div>
                    ) : (
                      <div className="text-white/40 text-center py-12">
                        Generated content will appear here
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Add Video
                    </Button>
                  </div>

                  <div className="flex gap-4">
                    {isEditing ? (
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleSaveEdit}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleEdit}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                    <Button 
                      className="flex-1 bg-red-500 hover:bg-red-600"
                      onClick={handlePublish}
                      disabled={!generatedContent}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Publish
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "One-Click Generation",
                  description: "Generate high-quality content with a single click",
                  icon: Zap
                },
                {
                  title: "SEO Optimization",
                  description: "Automatically optimize content for search engines",
                  icon: Target
                },
                {
                  title: "Multi-Platform",
                  description: "Create content for various platforms and formats",
                  icon: Layers
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-md border border-white/10">
                  <CardContent className="p-6">
                    <feature.icon className="w-8 h-8 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/60">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 