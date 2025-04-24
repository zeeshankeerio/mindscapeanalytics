"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronRightIcon, Star, Building2, GraduationCap, Brain, Cloud, Database, Rocket, Microscope, Factory } from "lucide-react"

const localPartners = [
  {
    name: "TechHub Karachi",
    shortName: "THK",
    description: "Leading tech incubator and innovation hub in Karachi",
    category: "incubator",
    icon: Rocket,
    color: "from-purple-500/20 to-blue-500/20",
  },
  {
    name: "Pakistani AI Research",
    shortName: "PAIR",
    description: "Premier AI research organization in Pakistan",
    category: "research",
    icon: Brain,
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    name: "Karachi University",
    shortName: "KU",
    description: "Center for AI and Data Science research",
    category: "education",
    icon: GraduationCap,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "PakTech Solutions",
    shortName: "PTS",
    description: "Enterprise software solutions provider",
    category: "enterprise",
    icon: Building2,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "DataPak Analytics",
    shortName: "DPA",
    description: "Data analytics and business intelligence firm",
    category: "analytics",
    icon: Database,
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    name: "PakCloud Services",
    shortName: "PCS",
    description: "Cloud infrastructure and services provider",
    category: "cloud",
    icon: Cloud,
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    name: "PakAI Labs",
    shortName: "PAI",
    description: "AI research and development center",
    category: "research",
    icon: Microscope,
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    name: "Karachi Tech Park",
    shortName: "KTP",
    description: "Technology innovation and business park",
    category: "incubator",
    icon: Factory,
    color: "from-teal-500/20 to-cyan-500/20",
  },
]

export default function IntegrationPartners() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  // Auto-scroll functionality
  useEffect(() => {
    if (!scrollContainerRef.current || !isAutoScrolling) return

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        const maxScroll = scrollWidth - clientWidth
        
        if (scrollLeft >= maxScroll) {
          // Reset to start
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          })
        } else {
          // Scroll right
          scrollContainerRef.current.scrollTo({
            left: scrollLeft + 1,
            behavior: 'smooth'
          })
        }

        // Update arrow visibility
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(scrollLeft < maxScroll)
      }
    }, 50) // Adjust speed by changing this value

    return () => clearInterval(interval)
  }, [isAutoScrolling])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false) // Stop auto-scroll when manually scrolling
      const scrollAmount = 400
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth"
      })

      setShowLeftArrow(newScroll > 0)
      setShowRightArrow(
        newScroll < (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth)
      )

      // Resume auto-scroll after manual scroll
      setTimeout(() => setIsAutoScrolling(true), 5000)
    }
  }

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">ECOSYSTEM</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Local Integration <span className="text-red-500">Partners</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Connect with our network of local partners and technology providers
          </p>
        </div>

        {/* Scrollable Partners Container */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 rounded-full bg-black/50 border border-white/10 hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}

          {/* Partners Grid */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onScroll={(e) => {
              const target = e.target as HTMLDivElement
              setShowLeftArrow(target.scrollLeft > 0)
              setShowRightArrow(
                target.scrollLeft < (target.scrollWidth - target.clientWidth)
              )
            }}
          >
            {localPartners.map((partner, index) => {
              const Icon = partner.icon
              return (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
                  className="flex-none w-80"
            >
                  <Card className="bg-black/40 backdrop-blur-md border border-white/10 h-full group relative overflow-hidden hover:border-red-500/30 transition-colors duration-300">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Glossy reflection */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-500/20 to-transparent rounded-tr-lg"></div>

                <CardContent className="p-6 flex flex-col items-center text-center h-full relative z-10">
                      {/* Partner logo container */}
                      <div className="w-24 h-24 mb-4 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/5 rounded-full transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110"></div>
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" 
                         style={{
                           background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                         }}></div>
                        <div className="relative z-10 flex flex-col items-center">
                          <Icon className="w-12 h-12 text-white/90 mb-2" />
                          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                            {partner.shortName}
                          </span>
                        </div>
                      </div>

                      {/* Partner name with star for featured */}
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold">{partner.name}</h3>
                        {partner.category === "incubator" && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                  </div>

                      {/* Partner description */}
                  <p className="text-white/70 text-sm mb-4 flex-grow">{partner.description}</p>

                      {/* Category badge and action button */}
                      <div className="flex items-center gap-2 w-full justify-between">
                        <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                          {partner.category}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-400 hover:bg-white/5 group"
                        >
                    Learn More
                          <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                      </div>
                </CardContent>
              </Card>
            </motion.div>
              )
            })}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 rounded-full bg-black/50 border border-white/10 hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Become a Partner
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>

          <p className="mt-4 text-white/60 text-sm">
            Interested in partnering with us?{" "}
            <a href="#contact" className="text-red-500 hover:underline">
              Contact our partnership team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

