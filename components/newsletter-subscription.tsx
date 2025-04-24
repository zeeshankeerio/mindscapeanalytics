"use client"

import React, { useState, useId, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// Define fixed positions for background elements to avoid hydration mismatch
const BACKGROUND_ELEMENTS = [
  { x: 15, y: 47, scale: 0.5, opacity: 0.3 },
  { x: 80, y: 15, scale: 0.7, opacity: 0.4 },
  { x: 45, y: 85, scale: 0.6, opacity: 0.3 },
  { x: 75, y: 75, scale: 0.4, opacity: 0.2 },
  { x: 5, y: 5, scale: 0.8, opacity: 0.3 },
  { x: 60, y: 30, scale: 0.5, opacity: 0.4 },
]

// Define fixed positions for micro dots to avoid hydration mismatch
const MICRO_DOTS = Array.from({ length: 20 }).map((_, i) => ({
  x: 10 + (i * 4) % 80,
  y: 5 + (i * 7) % 90,
  size: 0.5 + (i % 4) * 0.3,
  opacity: 0.2 + (i % 5) * 0.1,
}))

export function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const id = useId()
  
  // Server-side rendering safeguards
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Check for valid email format
  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!email) {
      setError("Please enter your email address")
      return
    }
    
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      toast.success("Thank you for subscribing to our newsletter!")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-8 shadow-xl shadow-black/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted && BACKGROUND_ELEMENTS.map((element, index) => (
          <motion.div
            key={`element-${index}`}
            className="absolute h-20 w-20 bg-gradient-to-br from-red-800/10 to-red-500/10 rounded-full"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              scale: element.scale,
              opacity: element.opacity,
            }}
            animate={{
              x: [0, 10, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {mounted && MICRO_DOTS.map((dot, index) => (
          <motion.div
            key={`dot-${index}`}
            className="absolute bg-red-500/50 rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
            }}
            animate={{
              opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity],
            }}
            transition={{
              duration: 2 + index % 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="relative">
        {isSubmitted ? (
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <motion.div 
              className="h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={mounted ? { scale: [1, 1.05, 1] } : false}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Send className="h-8 w-8 text-red-500" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">Thanks for subscribing!</h3>
            <p className="text-white/70">
              We&apos;ve sent a confirmation to your email. Stay tuned for updates on our latest features and announcements.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Join Our Newsletter</h2>
              <p className="text-white/70 mb-6">
                Stay updated with the latest in AI technology. Don&apos;t worry, we won&apos;t spam your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor={`email-${id}`} className="sr-only">
                  Email address
                </label>
                <Input
                  id={`email-${id}`}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                  disabled={isSubmitting}
                  aria-describedby={error ? `email-error-${id}` : undefined}
                  autoComplete="email"
                />
                {error && (
                  <p id={`email-error-${id}`} className="text-sm text-red-500 mt-1">
                    {error}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <motion.div 
                      className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full mr-2" 
                      animate={mounted ? { rotate: 360 } : false}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// Add default export to maintain compatibility with imports
export default NewsletterSubscription;

