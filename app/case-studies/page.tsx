"use client"

import { useState, useEffect } from "react"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, BarChart2, Brain, ChevronRight, Search, Shield, Zap, Filter, Calendar, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Types for case studies
interface CaseStudy {
  id: string
  title: string
  industry: string
  description: string
  image: string
  date: string
  results: {
    value: string
    label: string
  }[]
  tags: string[]
  featured?: boolean
  client: {
    name: string
    logo: string
    size: string
  }
  challenge: string
  solution: string
  impact: string[]
}

export default function CaseStudiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>(caseStudies)

  useEffect(() => {
    const filtered = caseStudies.filter(study => {
      const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesIndustry = selectedIndustry === "all" || study.industry === selectedIndustry
      const matchesYear = selectedYear === "all" || study.date.includes(selectedYear)
      
      return matchesSearch && matchesIndustry && matchesYear
    })
    setFilteredStudies(filtered)
  }, [searchQuery, selectedIndustry, selectedYear])

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black z-0"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 bg-red-500/10 text-red-500 border-red-500/20">
              Success Stories
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Real-World AI Implementation
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Discover how leading companies are transforming their operations with our AI solutions
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/40 border-white/10"
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-[180px] bg-black/40 border-white/10">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px] bg-black/40 border-white/10">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              </div>
              </div>
              </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredStudies.map((study) => (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CaseStudyCard study={study} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

// Enhanced Case Study Card Component
function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group h-full hover:border-red-500/50 transition-colors duration-300">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative">
          <img 
            src={study.image} 
            alt={study.title} 
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0">{study.industry}</Badge>
          {study.featured && (
            <Badge className="absolute top-4 right-4 bg-yellow-500 text-black border-0">Featured</Badge>
          )}
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <img src={study.client.logo} alt={study.client.name} className="w-6 h-6 rounded-full" />
            <span className="text-sm text-white/60">{study.client.name}</span>
            <span className="text-sm text-white/40">•</span>
            <span className="text-sm text-white/60">{study.client.size}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">{study.title}</h3>
          <p className="text-white/70 mb-4">{study.description}</p>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-white/60">Key Results:</div>
              <div className="text-sm text-white/60 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {study.date}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {study.results.map((result, index) => (
                <div key={index} className="bg-black/30 p-2 rounded-lg text-center group-hover:bg-red-500/10 transition-colors">
                  <div className="text-xl font-bold text-red-500 group-hover:text-white transition-colors">{result.value}</div>
                  <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{result.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {study.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-black/20 text-white/60 border-white/10">
                  {tag}
                </Badge>
              ))}
            </div>

            <Button
              variant="ghost"
              className="w-full justify-center text-red-500 hover:text-red-400 hover:bg-white/5 group"
            >
              Read Case Study
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Updated case studies data with more recent and detailed examples
const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Global Bank Fraud Detection",
    industry: "finance",
    description: "Revolutionary AI system reducing fraud by 87% while decreasing false positives by 62%.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop",
    date: "March 2024",
    results: [
      { value: "87%", label: "Fraud Reduction" },
      { value: "-62%", label: "False Positives" },
      { value: "12 wks", label: "Implementation" },
      { value: "410%", label: "ROI" },
    ],
    tags: ["AI", "Fraud Detection", "Machine Learning", "Real-time"],
    featured: true,
    client: {
      name: "Global Bank Corp",
      logo: "/logos/global-bank.png",
      size: "Enterprise"
    },
    challenge: "High false positive rates in fraud detection causing customer friction",
    solution: "Implemented advanced ML models with real-time processing",
    impact: [
      "Reduced operational costs by 35%",
      "Improved customer satisfaction by 28%",
      "Enhanced detection accuracy by 87%"
    ]
  },
  {
    id: "2",
    title: "Healthcare Diagnostic Imaging",
    industry: "healthcare",
    description: "AI-powered medical image analysis improving diagnostic accuracy and speed.",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2064&auto=format&fit=crop",
    date: "February 2024",
    results: [
      { value: "99.2%", label: "Accuracy" },
      { value: "73%", label: "Faster Analysis" },
      { value: "45%", label: "Cost Reduction" },
      { value: "320%", label: "ROI" },
    ],
    tags: ["Computer Vision", "Healthcare", "Deep Learning"],
    client: {
      name: "MedTech Solutions",
      logo: "/logos/medtech.png",
      size: "Large Enterprise"
    },
    challenge: "Long wait times for diagnostic results",
    solution: "Deployed CNN-based image analysis system",
    impact: [
      "Reduced diagnosis time by 73%",
      "Improved accuracy to 99.2%",
      "Enabled remote diagnostics"
    ]
  },
  {
    id: "3",
    title: "Retail Customer Insights",
    industry: "retail",
    description: "Transforming customer data into actionable insights for personalized marketing.",
    image: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2095&auto=format&fit=crop",
    date: "January 2024",
    results: [
      { value: "28%", label: "Conversion Increase" },
      { value: "42%", label: "Better Targeting" },
      { value: "31%", label: "Higher ROI" },
      { value: "3.5x", label: "Customer LTV" },
    ],
    tags: ["Customer Analytics", "Personalization", "Marketing"],
    client: {
      name: "Retail Giant",
      logo: "/logos/retail-giant.png",
      size: "Enterprise"
    },
    challenge: "Ineffective marketing campaigns",
    solution: "Implemented customer segmentation and predictive analytics",
    impact: [
      "Increased conversion rates by 28%",
      "Improved customer retention by 35%",
      "Enhanced marketing ROI by 31%"
    ]
  },
  {
    id: "4",
    title: "Manufacturing Predictive Maintenance",
    industry: "manufacturing",
    description: "Predicting equipment failures before they happen to minimize downtime.",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop",
    date: "December 2023",
    results: [
      { value: "35%", label: "Downtime Reduction" },
      { value: "42%", label: "Maintenance Savings" },
      { value: "27%", label: "Extended Equipment Life" },
      { value: "280%", label: "ROI" },
    ],
    tags: ["IoT", "Predictive Analytics", "Maintenance"],
    client: {
      name: "Industrial Solutions",
      logo: "/logos/industrial.png",
      size: "Large Enterprise"
    },
    challenge: "Unplanned equipment downtime",
    solution: "Deployed IoT sensors with ML models",
    impact: [
      "Reduced downtime by 35%",
      "Saved 42% on maintenance costs",
      "Extended equipment lifespan"
    ]
  },
  {
    id: "5",
    title: "Insurance Risk Assessment",
    industry: "finance",
    description: "AI-driven risk assessment for more accurate underwriting and pricing.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    date: "November 2023",
    results: [
      { value: "41%", label: "Better Risk Assessment" },
      { value: "23%", label: "Premium Optimization" },
      { value: "18%", label: "Claims Reduction" },
      { value: "290%", label: "ROI" },
    ],
    tags: ["Risk Analysis", "Insurance", "Predictive Modeling"],
    client: {
      name: "InsureTech",
      logo: "/logos/insuretech.png",
      size: "Enterprise"
    },
    challenge: "Inaccurate risk assessment",
    solution: "Implemented ML-based risk scoring",
    impact: [
      "Improved risk assessment by 41%",
      "Optimized premiums by 23%",
      "Reduced claims by 18%"
    ]
  },
  {
    id: "6",
    title: "Pharmaceutical Research",
    industry: "healthcare",
    description: "Accelerating drug discovery with AI-powered molecular analysis.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop",
    date: "October 2023",
    results: [
      { value: "65%", label: "Faster Discovery" },
      { value: "42%", label: "Cost Reduction" },
      { value: "3.2x", label: "More Candidates" },
      { value: "380%", label: "ROI" },
    ],
    tags: ["Drug Discovery", "Molecular Analysis", "Research"],
    client: {
      name: "PharmaTech",
      logo: "/logos/pharmatech.png",
      size: "Large Enterprise"
    },
    challenge: "Slow drug discovery process",
    solution: "Deployed AI for molecular analysis",
    impact: [
      "Accelerated discovery by 65%",
      "Reduced research costs by 42%",
      "Identified more viable candidates"
    ]
  }
]

