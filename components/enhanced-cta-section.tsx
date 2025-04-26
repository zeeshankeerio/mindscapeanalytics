"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn, navigateToContactForm } from "@/lib/utils"
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Rocket, 
  Clock, 
  Users, 
  BarChart4, 
  ChevronRight,
  Play,
  Shield,
  Zap,
  Star,
  Lightbulb,
  TrendingUp,
  Lock
} from "lucide-react"

interface CTASectionProps {
  variant?: "primary" | "secondary" | "centered" | "split" | "enhanced"
  title?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonHref?: string
  badge?: string
  className?: string
}

export default function EnhancedCTASection({
  variant = "enhanced",
  title = "Ready to Transform Your Business with AI?",
  description = "Join thousands of companies already leveraging our AI platform to drive innovation and growth.",
  primaryButtonText = "Access Dashboard",
  secondaryButtonText = "Talk to Sales",
  primaryButtonHref = "/dashboard",
  secondaryButtonHref = "/contact",
  badge = "START TODAY",
  className,
}: CTASectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPrimaryHovering, setIsPrimaryHovering] = useState(false)
  const [isSecondaryHovering, setIsSecondaryHovering] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  const controls = useAnimation()

  const features = [
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Accelerated Growth",
      description: "On average, our customers see a 40% increase in operational efficiency within 3 months."
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Quick Implementation",
      description: "Get up and running in days, not months, with our streamlined onboarding process."
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Dedicated Support",
      description: "24/7 access to our team of AI experts and technical support specialists."
    },
    {
      icon: <BarChart4 className="h-5 w-5" />,
      title: "Measurable ROI",
      description: "Our customers report an average 320% return on investment within the first year."
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with major industry regulations and standards."
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Future-Ready",
      description: "Regular updates ensure you always have access to the latest AI innovations."
    }
  ]

  const testimonials = [
    {
      quote: "Implementing Mindscape AI solutions has transformed how we approach customer service, leading to a 45% increase in satisfaction scores.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp Solutions",
      rating: 5,
      avatar: "/images/testimonials/avatar-1.png"
    },
    {
      quote: "The ROI from Mindscape's platform exceeded our expectations. We've seen a 3x return in just six months.",
      author: "Michael Chen",
      role: "CEO, InnovateTech",
      rating: 5,
      avatar: "/images/testimonials/avatar-2.png"
    },
    {
      quote: "What impressed us most was how quickly we were able to deploy the AI models. From kickoff to production in just three weeks.",
      author: "Emma Rodriguez",
      role: "Product Director, Global Retail Inc.",
      rating: 5,
      avatar: "/images/testimonials/avatar-3.png"
    }
  ]

  // 3D card effect calculation
  const calculateTransform = useMemo(() => {
    if (!cardRef.current || window.innerWidth < 768) return { rotateX: 0, rotateY: 0 };
    
    const card = cardRef.current.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;
    const rotateX = (mousePosition.y - centerY) / 25;
    const rotateY = (centerX - mousePosition.x) / 25;
    
    return { rotateX, rotateY };
  }, [mousePosition, cardRef]);

  // Only add the mousemove listener on desktop devices
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [features.length])

  // Cycle through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Animate on scroll into view
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      })
    }
  }, [isInView, controls])

  // Handle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const handleScroll = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const clients = [
    "Microsoft", "Google", "Amazon", "Apple", "Tesla", "Adobe", "IBM"
  ]

  // Handle contact form navigation
  const handlePrimaryButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // If this is a dashboard button, navigate directly
    if (primaryButtonHref === "/dashboard") {
      window.location.href = primaryButtonHref
    } else {
      // Otherwise link to contact form
      navigateToContactForm("ai-analytics", "Get Started with Mindscape AI")
    }
  }
  
  const handleSecondaryButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigateToContactForm("custom", "Sales Inquiry")
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden py-16 md:py-24 lg:py-32",
        "bg-black",
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-black to-blue-500/10"></div>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 -left-24 w-64 md:w-96 h-64 md:h-96 rounded-full bg-red-500/20 blur-[80px] md:blur-[120px] opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-24 w-64 md:w-96 h-64 md:h-96 rounded-full bg-blue-500/20 blur-[80px] md:blur-[120px] opacity-70"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced variant uses 3D-ish card layout */}
        {variant === "enhanced" && (
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            {/* Left Column - Main CTA Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
            >
              <Badge className="bg-gradient-to-r from-red-500/80 to-red-600/80 text-white border-none shadow-lg shadow-red-900/20 px-2 py-1 md:px-3 md:py-1.5 text-xs">
                {badge}
              </Badge>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                {title}
              </h2>
              
              <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto lg:mx-0">
                {description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Button 
                  size="lg"
                  className="group relative px-6 py-4 text-base font-semibold text-white rounded-full hover:brightness-110 transition-all duration-300 overflow-hidden w-full sm:w-auto"
                  onClick={handlePrimaryButtonClick}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 group-hover:from-red-600 group-hover:via-red-500 group-hover:to-red-600 transition-all duration-500 rounded-full"></div>
                  <div className="absolute -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                  <span className="relative z-10 flex items-center justify-center">
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="group relative px-6 py-4 text-base font-semibold text-white border border-white/30 hover:border-white/50 hover:bg-white/5 rounded-full backdrop-blur-sm transition-all duration-300 overflow-hidden w-full sm:w-auto"
                  onClick={handleSecondaryButtonClick}
                >
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity duration-300"></div>
                  <div className="absolute -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                  <span className="relative z-10 flex items-center justify-center">
                    {secondaryButtonText}
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-8">
                {features.slice(0, 3).map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="flex items-start gap-2"
                  >
                    <div className="p-1.5 md:p-2 bg-red-500/10 rounded-lg text-red-500">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-semibold mb-1">{feature.title}</h3>
                      <p className="text-xs md:text-sm text-white/60">{feature.description.slice(0, 50)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Right Column - Social Proof & Testimonial */}
            <motion.div 
              ref={cardRef}
              className="flex-1 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={controls}
              style={{
                transform: `perspective(1000px) rotateX(${calculateTransform.rotateX}deg) rotateY(${calculateTransform.rotateY}deg)`,
                transition: "transform 0.2s ease-out",
              }}
            >
              <div className="bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 p-4 md:p-6">
                {/* Testimonial */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base md:text-lg font-semibold flex items-center">
                      <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 mr-2" />
                      Client Testimonial
                    </h3>
                    <div className="flex">
                      {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonialIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <blockquote className="text-sm md:text-base text-white/80 italic mb-4">
                        "{testimonials[testimonialIndex].quote}"
                      </blockquote>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                          {testimonials[testimonialIndex].avatar && (
                            <img 
                              src={testimonials[testimonialIndex].avatar} 
                              alt={testimonials[testimonialIndex].author} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="text-sm md:text-base font-medium">{testimonials[testimonialIndex].author}</div>
                          <div className="text-xs md:text-sm text-white/60">{testimonials[testimonialIndex].role}</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Client logos */}
                <div className="border-t border-white/10 pt-4 md:pt-6">
                  <div className="text-xs md:text-sm text-white/60 mb-3">Trusted by industry leaders:</div>
                  <div className="flex flex-wrap gap-4 items-center justify-center">
                    {clients.slice(0, 5).map((client, index) => (
                      <div key={index} className="text-white/40 hover:text-white/70 transition-colors text-xs font-semibold tracking-wider">
                        {client}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6 border-t border-white/10 pt-4 md:pt-6">
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-bold text-red-500">99.9%</div>
                    <div className="text-xs text-white/60">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-bold text-blue-500">24/7</div>
                    <div className="text-xs text-white/60">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-bold text-green-500">500+</div>
                    <div className="text-xs text-white/60">Clients</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Centered variant */}
        {variant === "centered" && (
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-gradient-to-r from-red-500/80 to-red-600/80 text-white border-none shadow-lg shadow-red-900/20 px-2 py-1 md:px-3 md:py-1.5 text-xs">
              {badge}
            </Badge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
              {title}
            </h2>
            
            <p className="text-base md:text-lg text-white/70">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg"
                className="group relative px-6 py-4 text-base font-semibold text-white rounded-full hover:brightness-110 transition-all duration-300 overflow-hidden w-full sm:w-auto"
                onClick={handlePrimaryButtonClick}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 group-hover:from-red-600 group-hover:via-red-500 group-hover:to-red-600 transition-all duration-500 rounded-full"></div>
                <div className="absolute -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                <span className="relative z-10 flex items-center justify-center">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="group relative px-6 py-4 text-base font-semibold text-white border border-white/30 hover:border-white/50 hover:bg-white/5 rounded-full backdrop-blur-sm transition-all duration-300 overflow-hidden w-full sm:w-auto"
                onClick={handleSecondaryButtonClick}
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity duration-300"></div>
                <div className="absolute -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                <span className="relative z-10 flex items-center justify-center">
                  {secondaryButtonText}
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 