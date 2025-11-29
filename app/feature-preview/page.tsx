"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Info, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import NewsTicker from "@/components/news-ticker"
import TechStackShowcase from "@/components/tech-stack-showcase"

export default function FeaturePreviewPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80"></div>
      
      {/* Header section */}
      <header className="relative z-10 pt-16 md:pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-gradient-to-r from-red-900/30 to-red-900/10 text-red-400 border-red-900/30 hover:bg-white/10 backdrop-blur-sm">
              FEATURE PREVIEW
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 animate-gradient-x">
                Feature Preview
              </span>
              {" "}Page
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-8">
              This page demonstrates upcoming features and components that will be available in the full release of Mindscape Analytics.
            </p>
          </motion.div>
        </div>
      </header>
      
      {/* Preview Banner */}
      <section className="relative z-20 mb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="bg-gradient-to-r from-red-950/40 via-black/50 to-red-950/40 border border-red-900/20 rounded-lg p-4 md:p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="bg-red-500/20 p-2 rounded-full mt-1">
                <Info className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Preview Features</h3>
                <p className="text-white/70 mb-4">
                  The components on this page are currently in development. They may be subject to changes before the final release.
                  We welcome your feedback on these preview features.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="border-red-500/20 hover:bg-red-500/10 group">
                    <span>Send Feedback</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="ghost" className="hover:bg-white/5">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Ticker */}
      <section className="relative z-20 mb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Enhanced News Ticker</h2>
            <p className="text-white/70 mb-6">
              Our improved news ticker now supports dynamic colored backgrounds for different news categories.
            </p>
          </div>
          <div className="hidden md:block">
            <NewsTicker />
          </div>
        </div>
      </section>
      
      {/* Screenshot Preview */}
      <section className="relative z-20 mb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Visual Preview</h2>
            <p className="text-white/70 mb-6">
              A screenshot of the Tech Stack Showcase component on the main landing page.
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-red-900/20"></div>
            <img 
              src="/images/tech-showcase-preview.png" 
              alt="Tech Stack Showcase Preview" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
              <Badge className="mb-2 bg-red-500/20 text-red-400 border-red-500/30">
                SCREENSHOT
              </Badge>
              <h3 className="text-xl font-bold mb-1">Tech Stack Showcase</h3>
              <p className="text-white/70 text-sm max-w-2xl">
                This component displays our enterprise technology stack with interactive filters and detailed information cards.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tech Stack Showcase */}
      <section className="relative z-20 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Tech Stack Showcase</h2>
            <p className="text-white/70 mb-6">
              Explore the advanced technologies that power Mindscape Analytics.
            </p>
          </div>
          <TechStackShowcase fullWidth={false} />
        </div>
      </section>

      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-x {
          animation: gradient-x 10s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </main>
  )
} 