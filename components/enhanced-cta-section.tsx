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
        "relative overflow-hidden py-24 md:py-32",
        "bg-black",
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-black to-blue-500/10"></div>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-red-500/20 blur-[120px] opacity-70"
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
        className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px] opacity-70"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-purple-500/20 blur-[100px] opacity-50"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Left content - CTA copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className="max-w-2xl"
          >
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Badge className="py-1.5 px-4 text-sm bg-red-500/30 text-red-400 hover:bg-red-500/40 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 mr-2" />
                  {badge}
                </Badge>
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
            >
              {title.split(' ').map((word, i) => (
                <span key={`title-word-${i}`} className={i % 4 === 1 ? "text-red-500" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 mb-8"
            >
              {description}
            </motion.p>

            {/* Client logos */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={controls}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <p className="text-white/50 text-sm mb-4">Trusted by industry leaders</p>
              <div className="flex flex-wrap gap-6 items-center">
                {clients.map((client, index) => (
                  <motion.div
                    key={client}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-white/50 font-semibold"
                  >
                    {client}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key features */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={controls}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <div className="grid grid-cols-2 gap-5">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: activeFeature === index ? 1.05 : 1,
                      boxShadow: activeFeature === index ? "0 10px 30px -10px rgba(220, 38, 38, 0.2)" : "none" 
                    }}
                    transition={{ 
                      delay: 0.6 + index * 0.1,
                      duration: 0.3
                    }}
                    className={`p-4 rounded-xl border ${
                      activeFeature === index 
                        ? "border-red-500/50 bg-gradient-to-br from-black to-red-950/30" 
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    } transition-all duration-300 ease-out cursor-pointer`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className={`p-2 rounded-full w-fit mb-3 ${
                      activeFeature === index ? "bg-red-500/20" : "bg-white/10"
                    }`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/60">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsPrimaryHovering(true)}
                onHoverEnd={() => setIsPrimaryHovering(false)}
              >
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 w-full sm:w-auto"
                  onClick={handlePrimaryButtonClick}
                >
                  {primaryButtonText}
                  <motion.div
                    animate={{ x: isPrimaryHovering ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                  
                  {/* Pulsing effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    initial={{ boxShadow: "0 0 0 0 rgba(220, 38, 38, 0)" }}
                    animate={{ 
                      boxShadow: isPrimaryHovering 
                        ? "0 0 0 4px rgba(220, 38, 38, 0.3)" 
                        : "0 0 0 0 rgba(220, 38, 38, 0)" 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsSecondaryHovering(true)}
                onHoverEnd={() => setIsSecondaryHovering(false)}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="relative w-full sm:w-auto border-white/20 bg-white/5 hover:bg-white/10"
                  onClick={handleSecondaryButtonClick}
                >
                  {secondaryButtonText}
                  <motion.div
                    animate={{ 
                      rotate: isSecondaryHovering ? 45 : 0,
                      x: isSecondaryHovering ? 2 : 0,
                      y: isSecondaryHovering ? -2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right content - Testimonial Showcase & 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={controls}
            transition={{ delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* 3D Card Effect */}
              <motion.div
                ref={cardRef}
                style={{
                  transform: `perspective(1000px) rotateX(${calculateTransform.rotateX}deg) rotateY(${calculateTransform.rotateY}deg)`,
                  transformStyle: "preserve-3d"
                }}
                className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-2xl"
              >
                {/* Testimonial carousel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-4"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="flex">
                        {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-xl italic text-white/90 mb-6 text-center">
                      "{testimonials[testimonialIndex].quote}"
                    </p>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-purple-600 mb-3 flex items-center justify-center text-2xl font-bold">
                        {testimonials[testimonialIndex].author.charAt(0)}
                      </div>
                      <h4 className="font-medium text-lg">{testimonials[testimonialIndex].author}</h4>
                      <p className="text-white/60">{testimonials[testimonialIndex].role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Pagination dots */}
                <div className="flex justify-center mt-6 gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTestimonialIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === testimonialIndex ? "bg-red-500" : "bg-white/20"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Floating elements for 3D effect */}
                <div 
                  style={{ transform: "translateZ(40px)" }}
                  className="absolute top-4 right-4 p-3 bg-red-500/20 rounded-full"
                >
                  <TrendingUp className="w-5 h-5 text-red-400" />
                </div>
                <div 
                  style={{ transform: "translateZ(30px)" }}
                  className="absolute bottom-8 left-4 p-3 bg-blue-500/20 rounded-full"
                >
                  <Lock className="w-5 h-5 text-blue-400" />
                </div>
              </motion.div>

              {/* Stats counter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-10 right-10 bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-xl"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-white/70 text-sm">Businesses Transformed</p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="text-2xl font-bold"
                    >
                      10,000+
                    </motion.p>
                  </div>
                  <div className="w-px h-10 bg-white/20"></div>
                  <div>
                    <p className="text-white/70 text-sm">Avg. ROI Increase</p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 1 }}
                      className="text-2xl font-bold text-red-500"
                    >
                      320%
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 