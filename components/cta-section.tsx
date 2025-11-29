"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"
import { navigateToContactForm } from "@/lib/utils"

interface CTASectionProps {
  variant?: "primary" | "secondary" | "centered" | "split"
  title?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonHref?: string
  badge?: string
  className?: string
}

// Export both as default and named export to support both import styles
export default function CTASection({
  variant = "primary",
  title = "Transform Your Business with AI",
  description = "Join leading companies using our AI platform to drive innovation and growth. Get started today and see the difference.",
  primaryButtonText = "Start Free Trial",
  secondaryButtonText = "Book a Demo",
  primaryButtonHref = "/register",
  secondaryButtonHref = "/contact",
  badge,
  className,
}: CTASectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPrimaryHovering, setIsPrimaryHovering] = useState(false)
  const [isSecondaryHovering, setIsSecondaryHovering] = useState(false)

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

  const isPrimary = variant === "primary"
  const isCentered = variant === "centered" || variant === "primary"

  // Handle navigation to contact with specific params
  const handlePrimaryButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigateToContactForm("ai-analytics", "Start Free Trial Request")
  }
  
  const handleSecondaryButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigateToContactForm("custom", "Book a Demo Request")
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 md:py-24",
        isPrimary
          ? "bg-black border-t border-white/10"
          : "bg-gradient-to-br from-red-950/30 via-black to-black/80",
        className
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      
      {isPrimary && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        </>
      )}

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-red-500/10 blur-[120px] opacity-70"></div>
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px] opacity-70"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {isCentered ? (
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Floating sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`cta-sparkle-${i}`}
                className="absolute text-yellow-300/70 will-change-transform"
                initial={{
                  x: Math.random() * 100 - 50 + "%",
                  y: Math.random() * 100 - 50 + "%",
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  x: `calc(${Math.random() * 300 - 150}px)`,
                  y: `calc(${Math.random() * 200 - 100}px)`,
                }}
              >
                <Sparkles className="h-3 w-3" />
              </motion.div>
            ))}

            {badge && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-4 flex justify-center"
              >
                <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            >
              {isPrimary ? (
                <>
                  {title.split(' ').map((word, i) => (
                    <span key={`title-word-${i}`} className={i % 3 === 1 ? "text-red-500" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </>
              ) : (
                title
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <div className="relative group">
                <Button
                  className={cn(
                    "bg-red-600 hover:bg-red-700 text-white shadow-lg px-6 py-6 h-auto text-base font-medium rounded-lg relative overflow-hidden flex items-center gap-2",
                    isPrimaryHovering && "bg-red-700"
                  )}
                  onMouseEnter={() => setIsPrimaryHovering(true)}
                  onMouseLeave={() => setIsPrimaryHovering(false)}
                  onClick={handlePrimaryButtonClick}
                  size="lg"
                >
                  <span>{primaryButtonText}</span>
                  <motion.span
                    animate={isPrimaryHovering ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 1, repeat: isPrimaryHovering ? Infinity : 0 }}
                    className="will-change-transform"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                  
                  {/* Animated button gradient background on hover */}
                  {isPrimaryHovering && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-80 will-change-transform"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </Button>
                
                {/* Interactive glow effect that follows mouse on desktops */}
                {isPrimaryHovering && (
                  <div 
                    className="absolute inset-0 -m-2 bg-red-500/20 blur-xl rounded-xl pointer-events-none opacity-70 hidden md:block will-change-transform"
                    style={{
                      transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 20}px, ${(mousePosition.y - window.innerHeight / 2) / 20}px)`,
                    }}
                  />
                )}
              </div>

              <div className="relative group">
                <Button
                  variant="outline"
                  className={cn(
                    "border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white px-6 py-6 h-auto text-base font-medium rounded-lg relative overflow-hidden flex items-center gap-2",
                    isSecondaryHovering && "bg-white/10 border-white/20"
                  )}
                  onMouseEnter={() => setIsSecondaryHovering(true)}
                  onMouseLeave={() => setIsSecondaryHovering(false)}
                  onClick={handleSecondaryButtonClick}
                  size="lg"
                >
                  <span>{secondaryButtonText}</span>
                  <motion.span
                    animate={isSecondaryHovering ? { rotate: [0, 45, 0] } : {}}
                    transition={{ duration: 1.5, repeat: isSecondaryHovering ? Infinity : 0 }}
                    className="will-change-transform"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </Button>
                
                {/* Interactive glow effect that follows mouse on desktops */}
                {isSecondaryHovering && (
                  <div 
                    className="absolute inset-0 -m-2 bg-white/10 blur-xl rounded-xl pointer-events-none opacity-70 hidden md:block will-change-transform"
                    style={{
                      transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 20}px, ${(mousePosition.y - window.innerHeight / 2) / 20}px)`,
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {badge && (
                <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 backdrop-blur-sm mb-4">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              )}

              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              <p className="text-lg text-white/70 mb-8">{description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-8"
            >
              <div className="flex flex-col gap-4">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                  <a href={primaryButtonHref}>
                    <span className="flex items-center">
                      {primaryButtonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </a>
                </Button>

                <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                  <a href={secondaryButtonHref}>{secondaryButtonText}</a>
                </Button>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-white/50">
                    Join thousands of companies already using Mindscape AI to transform their businesses.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

// Also export as named export
export { CTASection }

