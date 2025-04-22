"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Code, FileText, MessageSquare, Image, Video, Sparkles, Zap, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GenAISolutions() {
  const [activeTab, setActiveTab] = useState("text")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const genAICategories = [
    {
      id: "text",
      label: "Text Generation",
      icon: <MessageSquare className="h-4 w-4" />,
      description: "Advanced language models for content creation, summarization, and more",
      solutions: [
        {
          title: "Content Creation",
          description:
            "Generate high-quality blog posts, articles, product descriptions, and marketing copy tailored to your brand voice.",
          features: [
            "Brand voice customization",
            "SEO optimization",
            "Multi-language support",
            "Content strategy integration",
          ],
          icon: <FileText className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Increased content production by 300% for a leading e-commerce platform while maintaining consistent brand voice.",
        },
        {
          title: "Conversational AI",
          description:
            "Build sophisticated chatbots and virtual assistants that understand context and provide natural responses.",
          features: ["Context awareness", "Multi-turn conversations", "Intent recognition", "Sentiment analysis"],
          icon: <MessageSquare className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Reduced customer service costs by 45% while improving satisfaction scores by 28% for a financial services company.",
        },
        {
          title: "Code Generation",
          description:
            "Accelerate development with AI-powered code generation, completion, and refactoring suggestions.",
          features: ["Multi-language support", "Documentation generation", "Bug detection", "Performance optimization"],
          icon: <Code className="h-10 w-10 text-red-500" />,
          caseStudy: "Increased developer productivity by 35% and reduced time-to-market by 40% for a SaaS startup.",
        },
      ],
    },
    {
      id: "image",
      label: "Image Generation",
      icon: <Image className="h-4 w-4" />,
      description: "Create and edit images with state-of-the-art diffusion models",
      solutions: [
        {
          title: "Product Visualization",
          description:
            "Generate photorealistic product images for marketing, e-commerce, and design iterations without expensive photo shoots.",
          features: ["Style customization", "Background variations", "Lighting adjustments", "Multi-angle generation"],
          icon: <Image className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Reduced product photography costs by 80% while increasing conversion rates by 15% for a retail chain.",
        },
        {
          title: "Design Assistance",
          description: "Accelerate creative workflows with AI-generated design concepts, variations, and enhancements.",
          features: ["Brand consistency", "Style transfer", "Design iteration", "Asset generation"],
          icon: <Layers className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Reduced design iteration time by 60% and increased creative output by 200% for a marketing agency.",
        },
        {
          title: "Content Enhancement",
          description:
            "Upscale, restore, and enhance existing images with AI-powered tools for perfect visual content.",
          features: ["Resolution upscaling", "Noise reduction", "Color enhancement", "Object removal"],
          icon: <Sparkles className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Restored and enhanced 50,000+ historical images for a museum, preserving cultural heritage with 95% quality improvement.",
        },
      ],
    },
    {
      id: "video",
      label: "Video Generation",
      icon: <Video className="h-4 w-4" />,
      description: "Create and edit video content with cutting-edge AI models",
      solutions: [
        {
          title: "Automated Video Production",
          description:
            "Transform text scripts into fully rendered videos with AI-generated scenes, narration, and animations.",
          features: ["Script-to-video conversion", "Voice synthesis", "Scene generation", "Style customization"],
          icon: <Video className="h-10 w-10 text-red-500" />,
          caseStudy: "Reduced video production costs by 70% and production time by 85% for an educational platform.",
        },
        {
          title: "Video Editing & Enhancement",
          description: "Automate video editing tasks and enhance footage quality with AI-powered tools.",
          features: ["Automatic editing", "Color grading", "Stabilization", "Resolution upscaling"],
          icon: <Zap className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Streamlined post-production workflow by 60% for a media company, reducing editing time from days to hours.",
        },
        {
          title: "Personalized Video Content",
          description:
            "Create customized video experiences for individual users at scale with AI-driven personalization.",
          features: ["Dynamic content insertion", "Viewer-specific messaging", "Behavioral adaptation", "A/B testing"],
          icon: <Layers className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Increased engagement by 47% and conversion rates by 32% with personalized video marketing for an e-commerce platform.",
        },
      ],
    },
    {
      id: "multimodal",
      label: "Multimodal AI",
      icon: <Layers className="h-4 w-4" />,
      description: "Combine text, image, and video understanding in powerful multimodal models",
      solutions: [
        {
          title: "Intelligent Document Processing",
          description:
            "Extract, analyze, and understand information from documents combining text, tables, and images.",
          features: ["Layout analysis", "Data extraction", "Cross-reference validation", "Automated workflows"],
          icon: <FileText className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Automated document processing for a financial institution, reducing processing time by 90% and errors by 75%.",
        },
        {
          title: "Visual Question Answering",
          description:
            "Build systems that can answer questions about visual content, combining vision and language understanding.",
          features: ["Image comprehension", "Contextual responses", "Domain adaptation", "Multilingual support"],
          icon: <Brain className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Deployed visual QA system for a retail chain, improving customer self-service by 65% and reducing support tickets by 40%.",
        },
        {
          title: "Content Intelligence",
          description: "Analyze and understand multimedia content at scale for insights, moderation, and organization.",
          features: ["Content categorization", "Sentiment analysis", "Brand safety monitoring", "Trend identification"],
          icon: <Sparkles className="h-10 w-10 text-red-500" />,
          caseStudy:
            "Implemented content intelligence platform for a media company, improving content performance by 38% and audience engagement by 45%.",
        },
      ],
    },
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">GENERATIVE AI</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Next-Generation <span className="text-red-500">GenAI</span> Solutions
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Harness the power of cutting-edge generative AI models to transform your business processes, enhance
            creativity, and deliver exceptional customer experiences.
          </p>
        </div>

        <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <TabsList className="bg-black/50 border border-white/10 p-1">
              {genAICategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {genAICategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="mb-8 max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">{category.label}</h3>
                <p className="text-white/70">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {category.solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full hover:border-red-500/50 transition-all duration-300 relative">
                      {/* Animated border effect */}
                      {hoveredCard === index && (
                        <>
                          <motion.span
                            className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-red-500 to-transparent"
                            initial={{ x: "100%" }}
                            animate={{ x: "-100%" }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <motion.span
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <motion.span
                            className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-red-500 to-transparent"
                            initial={{ y: "-100%" }}
                            animate={{ y: "100%" }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <motion.span
                            className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-red-500 to-transparent"
                            initial={{ y: "100%" }}
                            animate={{ y: "-100%" }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                        </>
                      )}

                      <CardHeader className="pb-2">
                        <div className="p-3 bg-red-500/10 rounded-lg w-fit mb-4">{solution.icon}</div>
                        <CardTitle className="text-xl">{solution.title}</CardTitle>
                        <CardDescription className="text-white/70">{solution.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <h4 className="font-medium mb-2">Key Features</h4>
                        <ul className="space-y-1 mb-4">
                          {solution.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                              <span className="text-white/80">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="bg-black/30 rounded-lg p-3 border border-white/10 mt-4">
                          <h4 className="text-sm font-medium mb-1">Case Study</h4>
                          <p className="text-sm text-white/70">{solution.caseStudy}</p>
                        </div>
                      </CardContent>

                      <CardFooter>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto text-red-500 hover:text-red-400 hover:bg-transparent group"
                        >
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Explore All GenAI Solutions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

