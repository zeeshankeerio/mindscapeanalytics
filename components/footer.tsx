"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Twitter, ChevronRight, Mail, MapPin, Phone, ArrowRight, Brain, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

import { footerNav, siteConfig } from "@/config/site-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Add responsive state to optimize for different screen sizes
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  
  // Add state for email input
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(true)
  
  // Add error handling for external links
  const [linkError, setLinkError] = useState(false)
  
  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }
    
    // Set initial values
    handleResize()
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  
  // Validate email format
  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setIsEmailValid(true) // Reset validation state on change
  }
  
  const handleSubscribe = () => {
    if (!email || !validateEmail(email)) {
      setIsEmailValid(false)
      return
    }
    
    // Handle subscription logic
    console.log("Subscribed with:", email)
    setEmail("")
  }
  
  // Safe link handler to prevent errors
  const handleExternalLink = (url: string, e: React.MouseEvent) => {
    try {
      window.open(url, "_blank", "noopener,noreferrer")
    } catch (error) {
      setLinkError(true)
      console.error("Error opening link:", error)
      e.preventDefault()
    }
  }

  return (
    <footer className="relative bg-black border-t border-white/10 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
      
      {/* Neural network node decorations */}
      <div className="absolute top-1/4 left-10 w-1 h-1 bg-red-500 rounded-full opacity-50" 
           style={{ boxShadow: "0 0 20px 5px rgba(239, 68, 68, 0.3)" }} />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-red-600 rounded-full opacity-40"
           style={{ boxShadow: "0 0 30px 8px rgba(220, 38, 38, 0.4)" }} />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-500 rounded-full opacity-30"
           style={{ boxShadow: "0 0 25px 6px rgba(239, 68, 68, 0.3)" }} />
           
      {/* Gradient line top border enhancement */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-16">
        {/* Newsletter Subscription Section */}
        <div className="mb-16 rounded-2xl p-8 backdrop-blur-sm bg-gradient-to-r from-black/80 to-black/40 border border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold mb-2">Stay updated with Mindscape</h2>
              <p className="text-white/70">Get the latest AI insights, product updates, and industry news delivered to your inbox.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className={`bg-white/5 border-white/10 focus-visible:ring-red-500 flex-1 ${!isEmailValid ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                value={email}
                onChange={handleEmailChange}
                aria-label="Email for newsletter"
              />
              {!isEmailValid && <p className="text-red-500 text-xs mt-1 absolute top-full left-0">Please enter a valid email address</p>}
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white group transition-all duration-300 overflow-hidden relative"
                onClick={handleSubscribe}
                aria-label="Subscribe to newsletter"
              >
                <span className="inline-flex items-center group-hover:-translate-x-2 transition-transform duration-300">Subscribe</span>
                <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 absolute right-4 transition-all duration-300" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              {/* Custom Logo from Hyper Hero section */}
              <div className="relative flex flex-col items-start">
                <div className="flex items-center gap-4 group">
                  {/* Brain icon container with animated glow effects */}
                  <div className="relative">
                    {/* Outer glow effect */}
                    <div className="absolute -inset-1 bg-red-800/20 blur-lg rounded-2xl"></div>
                    
                    {/* Main container */}
                    <div className="relative z-10 group">
                      {/* Border glow container */}
                      <div className="absolute -inset-[1.5px] rounded-2xl">
                        <div className="absolute inset-0 bg-red-700 rounded-2xl opacity-90"></div>
                      </div>
                      
                      {/* Icon container */}
                      <div className="relative bg-black rounded-2xl p-3 transition-all duration-300 group-hover:scale-[0.98]">
                      <img 
                          src="/images/brain.svg" 
                          alt="Mindscape Brain Logo"
                          className="h-14 w-14"
                          style={{
                            filter: 'drop-shadow(0 0 1px #8B0000)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text part */}
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight font-sans">
                      <span className="text-white">Mindscape</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700/80 via-red-600 to-red-700/80 ml-2">Analytics</span>
                    </h1>
                    <p className="text-sm text-white/70 mt-1">Where AI Meets Innovation</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Transforming businesses with advanced AI solutions. Our platform helps enterprises harness the power of
              artificial intelligence to drive innovation and growth.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-white/70">
                  AI Innovation Center<br />
                  Tech District, Digital City 10011
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-500" />
                <a href="mailto:admin@mindscapeanalytics.com" className="text-white/70 hover:text-white transition-colors">
                  admin@mindscapeanalytics.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-500" />
                <a href="tel:+11234567890" className="text-white/70 hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300"
                aria-label="Twitter"
                onClick={(e) => handleExternalLink(siteConfig.links.twitter, e)}
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/mindscapeanalytics/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300"
                aria-label="LinkedIn"
                onClick={(e) => handleExternalLink("https://www.linkedin.com/company/mindscapeanalytics/", e)}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300"
                aria-label="GitHub"
                onClick={(e) => handleExternalLink(siteConfig.links.github, e)}
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerNav.main.map((section, i) => (
            <div key={i}>
                  <h3 className="font-medium text-lg mb-4 pb-2 border-b border-white/10">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j}>
                        <Link 
                          href={item.href} 
                          className="text-white/70 hover:text-white transition-colors flex items-center group"
                        >
                          <ChevronRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-400" />
                          <span className="group-hover:translate-x-1 transition-transform duration-300">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="relative">
          {/* Separator with gradient */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-white/60 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
            © {currentYear} {siteConfig.name}. All rights reserved.
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-6">
            {footerNav.secondary?.map((item, i) => (
                <Link 
                  key={i} 
                  href={item.href} 
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
      
      {/* Error notification for link errors */}
      {linkError && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>Failed to open external link. Please try again later.</p>
            <Button 
              size="sm" 
              variant="ghost" 
              className="ml-2 hover:bg-red-700" 
              onClick={() => setLinkError(false)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes pulse-medium {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes rgb-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  )
}

