"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, MessageSquare, Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function SolutionsPage() {
  const cardsRef = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true })

  const solutions = [
    {
      icon: <Brain className="h-10 w-10 text-red-500" />,
      title: "Industry Solutions",
      description: "Tailored AI solutions for specific industries including healthcare, finance, manufacturing, and more.",
      href: "/solutions/industry"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-red-500" />,
      title: "Generative AI Solutions",
      description: "Advanced language models and generative AI capabilities for content creation and automation.",
      href: "/solutions/genai"
    },
    {
      icon: <Search className="h-10 w-10 text-red-500" />,
      title: "Enterprise Solutions",
      description: "Comprehensive AI solutions for large organizations with complex needs.",
      href: "/solutions/enterprise"
    },
    {
      icon: <Brain className="h-10 w-10 text-red-500" />,
      title: "Cloud Solutions",
      description: "Scalable cloud-based AI infrastructure and deployment options.",
      href: "/solutions/cloud"
    },
    {
      icon: <Brain className="h-10 w-10 text-red-500" />,
      title: "Blockchain Solutions",
      description: "Comprehensive blockchain platform with DeFi, NFT, and cross-chain capabilities.",
      href: "/solutions/blockchain"
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI Solutions for Every Need
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover our comprehensive suite of AI solutions designed to transform your business and drive innovation.
          </p>
        </motion.div>

        <motion.div
          ref={cardsRef}
          variants={container}
          initial="hidden"
          animate={cardsInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div key={solution.title} variants={item}>
              <Link href={solution.href}>
                <div className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                      {solution.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-white/70 mt-2">{solution.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="ghost" className="text-white hover:text-red-400 hover:bg-white/5 group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
} 