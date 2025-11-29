"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowRight, 
  BarChart3, 
  Clock, 
  DollarSign, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Users
} from "lucide-react"
import Image from "next/image"

// Case studies data
const caseStudies = [
  {
    id: 1,
    title: "Global Financial Institution",
    subtitle: "AI-Powered Risk Assessment",
    industry: "Finance",
    challenge: "A leading global bank needed to reduce fraud detection time and improve accuracy while handling millions of transactions daily.",
    solution: "Implemented Mindscape AI's advanced fraud detection system with real-time transaction analysis and predictive modeling.",
    results: [
      { 
        metric: "Fraud Detection Accuracy", 
        value: "99.8%", 
        improvement: "+12%", 
        icon: <BarChart3 className="w-5 h-5" /> 
      },
      { 
        metric: "Processing Time", 
        value: "0.8s", 
        improvement: "-75%", 
        icon: <Clock className="w-5 h-5" /> 
      },
      { 
        metric: "Cost Reduction", 
        value: "$12M", 
        improvement: "Annually", 
        icon: <DollarSign className="w-5 h-5" /> 
      },
      { 
        metric: "Customer Satisfaction", 
        value: "92%", 
        improvement: "+18%", 
        icon: <Users className="w-5 h-5" /> 
      }
    ],
    testimonial: {
      quote: "Mindscape AI's solution has transformed our risk management operations. The system's ability to learn and adapt has made it an invaluable asset to our security infrastructure.",
      author: "Dr. James Wilson",
      title: "Chief Risk Officer",
      company: "Global Financial Corp"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    logo: "https://placehold.co/200x60/1e40af/ffffff?text=Global+Financial"
  },
  {
    id: 2,
    title: "Healthcare Provider Network",
    subtitle: "Predictive Patient Care",
    industry: "Healthcare",
    challenge: "A regional healthcare network needed to improve patient outcomes while reducing operational costs and wait times.",
    solution: "Deployed Mindscape AI's predictive analytics platform to optimize resource allocation and patient care pathways.",
    results: [
      { 
        metric: "Patient Wait Time", 
        value: "8min", 
        improvement: "-62%", 
        icon: <Clock className="w-5 h-5" /> 
      },
      { 
        metric: "Diagnostic Accuracy", 
        value: "96%", 
        improvement: "+15%", 
        icon: <BarChart3 className="w-5 h-5" /> 
      },
      { 
        metric: "Operational Costs", 
        value: "$8.5M", 
        improvement: "Saved Annually", 
        icon: <DollarSign className="w-5 h-5" /> 
      },
      { 
        metric: "Patient Satisfaction", 
        value: "94%", 
        improvement: "+22%", 
        icon: <Users className="w-5 h-5" /> 
      }
    ],
    testimonial: {
      quote: "The implementation of Mindscape AI's predictive analytics has revolutionized our patient care. We've seen remarkable improvements in both efficiency and outcomes.",
      author: "Dr. Sarah Martinez",
      title: "Medical Director",
      company: "HealthCare Network"
    },
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    logo: "https://placehold.co/200x60/15803d/ffffff?text=HealthCare+Network"
  },
  {
    id: 3,
    title: "Manufacturing Enterprise",
    subtitle: "Smart Factory Transformation",
    industry: "Manufacturing",
    challenge: "A global manufacturer faced increasing production inefficiencies and quality control issues across multiple facilities.",
    solution: "Implemented Mindscape AI's IoT analytics platform with predictive maintenance and quality control systems.",
    results: [
      { 
        metric: "Production Efficiency", 
        value: "87%", 
        improvement: "+23%", 
        icon: <TrendingUp className="w-5 h-5" /> 
      },
      { 
        metric: "Defect Rate", 
        value: "0.12%", 
        improvement: "-78%", 
        icon: <PieChart className="w-5 h-5" /> 
      },
      { 
        metric: "Downtime Reduction", 
        value: "62%", 
        improvement: "Less", 
        icon: <Clock className="w-5 h-5" /> 
      },
      { 
        metric: "ROI", 
        value: "320%", 
        improvement: "First Year", 
        icon: <DollarSign className="w-5 h-5" /> 
      }
    ],
    testimonial: {
      quote: "Mindscape AI's solution has transformed our manufacturing operations. The predictive maintenance capabilities alone have saved us millions in prevented downtime.",
      author: "Robert Chen",
      title: "Operations Director",
      company: "Global Manufacturing Inc"
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    logo: "https://placehold.co/200x60/ca8a04/ffffff?text=Global+Manufacturing"
  },
  {
    id: 4,
    title: "Retail Chain",
    subtitle: "Customer Experience Revolution",
    industry: "Retail",
    challenge: "A national retail chain needed to personalize customer experiences and optimize inventory management across hundreds of stores.",
    solution: "Deployed Mindscape AI's customer analytics and inventory optimization platform with real-time insights.",
    results: [
      { 
        metric: "Sales Increase", 
        value: "32%", 
        improvement: "YoY", 
        icon: <TrendingUp className="w-5 h-5" /> 
      },
      { 
        metric: "Inventory Accuracy", 
        value: "99.2%", 
        improvement: "+15%", 
        icon: <BarChart3 className="w-5 h-5" /> 
      },
      { 
        metric: "Customer Retention", 
        value: "78%", 
        improvement: "+24%", 
        icon: <Users className="w-5 h-5" /> 
      },
      { 
        metric: "Marketing ROI", 
        value: "285%", 
        improvement: "Improvement", 
        icon: <LineChart className="w-5 h-5" /> 
      }
    ],
    testimonial: {
      quote: "Mindscape AI has revolutionized how we understand and serve our customers. The personalized recommendations have significantly increased our average order value.",
      author: "Jennifer Lee",
      title: "Chief Customer Officer",
      company: "National Retail Chain"
    },
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    logo: "https://placehold.co/200x60/2563eb/ffffff?text=National+Retail"
  }
]

export default function CaseStudiesSection() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCase, setSelectedCase] = useState(caseStudies[0])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter case studies by industry
  const filteredCaseStudies = activeTab === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.industry.toLowerCase() === activeTab.toLowerCase())

  // Get unique industries for tabs
  const industries = ["all", ...Array.from(new Set(caseStudies.map(study => study.industry.toLowerCase())))]

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Industry filter tabs */}
        <Tabs 
          defaultValue="all" 
          className="mb-12"
          onValueChange={setActiveTab}
        >
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
            {industries.map((industry) => (
              <TabsTrigger 
                key={industry} 
                value={industry}
                className="capitalize"
              >
                {industry}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCaseStudies.map((study) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-red-900/20 to-black/20 backdrop-blur-md rounded-xl border border-red-500/20 overflow-hidden hover:border-red-500/40 transition-all duration-300 cursor-pointer group shadow-xl shadow-black/20"
                  onClick={() => {
                    setSelectedCase(study)
                    setIsModalOpen(true)
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {study.industry}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-white">{study.title}</h3>
                      <p className="text-blue-300">{study.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-white/70 mb-4 line-clamp-2">{study.challenge}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {study.results.slice(0, 2).map((result, index) => (
                        <div key={index} className="bg-gradient-to-br from-red-900/20 to-black/20 rounded-lg p-3 border border-red-500/20 hover:border-red-500/30 transition-colors">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-red-400">{result.icon}</div>
                            <div className="text-sm text-white/70">{result.metric}</div>
                          </div>
                          <div className="text-xl font-bold text-white">{result.value}</div>
                          <div className="text-xs text-red-400">{result.improvement}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-900/20 to-black/20 flex items-center justify-center overflow-hidden border border-red-500/20">
                          <Image
                            src={study.logo}
                            alt={`${study.title} logo`}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                        <div className="text-sm text-white/70">
                          {study.testimonial.author.split(' ')[0]}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 group-hover:bg-red-500/10">
                        View Case Study
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-red-900 to-black hover:from-red-800 hover:to-black text-white border-0">
              Schedule a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30">
              View All Case Studies
            </Button>
          </div>
          <p className="mt-4 text-white/60 text-sm">
            See how Mindscape AI can transform your business
          </p>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/90 border border-white/10 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={selectedCase.image}
                  alt={selectedCase.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {selectedCase.industry}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedCase.title}</h2>
                  <p className="text-blue-300 text-lg">{selectedCase.subtitle}</p>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-white mb-4">The Challenge</h3>
                    <p className="text-white/70">{selectedCase.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">The Solution</h3>
                    <p className="text-white/70">{selectedCase.solution}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {selectedCase.results.map((result, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-blue-400">{result.icon}</div>
                        <div className="text-sm text-white/70">{result.metric}</div>
                      </div>
                      <div className="text-2xl font-bold text-white">{result.value}</div>
                      <div className="text-sm text-green-400">{result.improvement}</div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white/5 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={selectedCase.logo}
                        alt={`${selectedCase.title} logo`}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <blockquote className="text-lg text-white italic mb-4">
                        "{selectedCase.testimonial.quote}"
                      </blockquote>
                      <div className="font-semibold text-white">{selectedCase.testimonial.author}</div>
                      <div className="text-white/70">
                        {selectedCase.testimonial.title}, {selectedCase.testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Get Similar Results
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 