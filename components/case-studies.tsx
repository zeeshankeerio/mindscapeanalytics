"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ArrowRight, BarChart2, Clock, Users, TrendingUp } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    title: "AI-Powered Fraud Detection",
    client: "Global Financial Institution",
    description: "Implemented an advanced AI system that reduced fraud by 87% while decreasing false positives by 62%.",
    image: "/images/solutions/finance/finance-case-study.jpg",
    results: [
      { value: "87%", label: "Fraud Reduction", icon: <TrendingUp className="h-4 w-4" /> },
      { value: "62%", label: "Fewer False Positives", icon: <BarChart2 className="h-4 w-4" /> },
      { value: "12 wks", label: "Implementation", icon: <Clock className="h-4 w-4" /> },
      { value: "410%", label: "ROI", icon: <TrendingUp className="h-4 w-4" /> },
    ],
    tags: ["Machine Learning", "Fraud Detection", "Financial Services"],
    color: "from-blue-500/20 to-purple-500/20",
    testimonial: "This solution transformed our security operations and saved us millions in fraud prevention."
  },
  {
    id: 2,
    title: "Predictive Maintenance Solution",
    client: "Manufacturing Corporation",
    description: "Developed a predictive maintenance system that reduced downtime by 35% and maintenance costs by 42%.",
    image: "/images/solutions/manufacturing/manufacturing-case-study.jpg",
    results: [
      { value: "35%", label: "Downtime Reduction", icon: <TrendingUp className="h-4 w-4" /> },
      { value: "42%", label: "Cost Savings", icon: <BarChart2 className="h-4 w-4" /> },
      { value: "27%", label: "Extended Equipment Life", icon: <Clock className="h-4 w-4" /> },
      { value: "280%", label: "ROI", icon: <TrendingUp className="h-4 w-4" /> },
    ],
    tags: ["IoT", "Predictive Analytics", "Manufacturing"],
    color: "from-green-500/20 to-teal-500/20",
    testimonial: "Our factory floor efficiency has dramatically improved since implementing this solution."
  },
  {
    id: 3,
    title: "Customer Behavior Analysis",
    client: "E-commerce Platform",
    description: "Created a comprehensive customer behavior analysis tool that increased conversion rates by 28%.",
    image: "/images/solutions/retail/retail-case-study.jpg",
    results: [
      { value: "28%", label: "Conversion Increase", icon: <TrendingUp className="h-4 w-4" /> },
      { value: "42%", label: "Better Targeting", icon: <Users className="h-4 w-4" /> },
      { value: "31%", label: "Higher Engagement", icon: <BarChart2 className="h-4 w-4" /> },
      { value: "3.5x", label: "Customer LTV", icon: <TrendingUp className="h-4 w-4" /> },
    ],
    tags: ["Data Analytics", "E-commerce", "Customer Insights"],
    color: "from-red-500/20 to-orange-500/20",
    testimonial: "We've seen unprecedented growth in our conversion rates thanks to these AI-driven insights."
  },
]

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1))
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextCase = () => {
    setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1))
    setIsAutoPlaying(false)
  }

  const prevCase = () => {
    setActiveIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1))
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">CASE STUDIES</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Real-World <span className="text-red-500">Success</span> Stories
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover how our AI solutions have transformed businesses across industries with measurable results.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <Card className="border-0 overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(255,0,0,0.1)]">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-80 md:h-auto">
                      <div className={`absolute inset-0 bg-gradient-to-br ${caseStudies[activeIndex].color} opacity-40`}></div>
                      <motion.img
                        src={caseStudies[activeIndex].image || "/placeholder.svg"}
                        alt={caseStudies[activeIndex].title}
                        className="object-cover w-full h-full"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent flex flex-col justify-end md:justify-center">
                        <div className="p-6 md:p-10">
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                          >
                            <Badge className="mb-3 bg-red-500 text-white border-0">
                              {caseStudies[activeIndex].tags[0]}
                            </Badge>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                              {caseStudies[activeIndex].title}
                            </h3>
                            <p className="text-white/80 text-lg">{caseStudies[activeIndex].client}</p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 md:p-10 flex flex-col">
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="mb-6"
                      >
                        <p className="text-lg text-white/80 mb-6">{caseStudies[activeIndex].description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {caseStudies[activeIndex].tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-white/5 text-white/80 rounded-full text-sm border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <blockquote className="border-l-2 border-red-500 pl-4 italic text-white/60 my-6">
                          "{caseStudies[activeIndex].testimonial}"
                        </blockquote>
                      </motion.div>

                      <div className="space-y-6 flex-grow">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                        >
                          <h4 className="text-lg font-semibold mb-4 text-white">Key Results</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {caseStudies[activeIndex].results.map((result, idx) => (
                              <motion.div
                                key={idx}
                                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.15)] cursor-pointer"
                                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                                onMouseEnter={() => setHoveredItem(idx)}
                                onMouseLeave={() => setHoveredItem(null)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-red-500 opacity-80 group-hover:opacity-100">
                                    {result.icon}
                                  </div>
                                  <span className="text-xs text-white/60 group-hover:text-white/80">{result.label}</span>
                                </div>
                                <div className="text-2xl font-bold text-white">{result.value}</div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="mt-8"
                      >
                        <Button className="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto group">
                          View Full Case Study
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 hidden md:block">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevCase} 
              className="rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 border border-white/10 text-white w-12 h-12"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 hidden md:block">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextCase} 
              className="rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 border border-white/10 text-white w-12 h-12"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevCase} 
              className="rounded-full md:hidden bg-black/20 backdrop-blur-md hover:bg-black/40 border border-white/10 text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`relative h-2 transition-all duration-300 rounded-full ${
                    index === activeIndex ? "w-10 bg-red-500" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                >
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 bg-red-500 rounded-full"
                      animate={{
                        width: "100%",
                      }}
                      transition={{
                        duration: 8,
                        repeat: isAutoPlaying ? Infinity : 0,
                      }}
                      style={{ originX: 0 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextCase} 
              className="rounded-full md:hidden bg-black/20 backdrop-blur-md hover:bg-black/40 border border-white/10 text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}