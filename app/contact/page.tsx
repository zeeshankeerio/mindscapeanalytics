"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, MessageSquare, Phone, MapPin, Calendar, Globe, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactForm from "@/components/contact-form"
import InteractiveMap from "@/components/interactive-map"
import Footer from "@/components/footer"
import { StandardBackground, SectionBackground } from "@/components/shared/background"

// Custom Mail component renamed to MailIcon to avoid conflict
function MailIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

// Custom Building component
function BuildingIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("contact")
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  
  const { ref: formRef, inView } = useInView({ triggerOnce: true })
  
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true })
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true })
  const { ref: mapRef, inView: mapInView } = useInView({ triggerOnce: true })
  const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true })
  
  // Auto-scroll to contact form if URL has parameters
  useEffect(() => {
    // Check if we have URL parameters for the form
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('interest') || urlParams.has('subject')) {
      // Set active tab to contact
      setActiveTab('contact')
      
      // Scroll to contact form section
      const contactSection = document.getElementById('contact-form-section')
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      }
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Apply standard background */}
      <StandardBackground />
      
      <main className="container mx-auto px-4 py-24 relative z-10">
        <section className="relative pt-32 pb-20">
          <SectionBackground />
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">CONTACT US</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 gradient-text">
                Let's <span className="text-red-500">Connect</span>
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Have questions about our solutions or want to discuss how we can help your business?
                Reach out to our team and we'll get back to you as soon as possible.
              </p>
                    </motion.div>

            {/* Rest of your existing code */}
          </div>
        </section>
        
        <section className="py-20 relative">
          <SectionBackground />
          <div className="relative z-10">
      {/* FAQ Section */}
          </div>
        </section>
      </main>
    </div>
  )
}

