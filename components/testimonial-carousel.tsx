"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import Image from "next/image"

// Real testimonials from Fiverr
const testimonials = [
  {
    id: 1,
    quote: "Mindscape is an exceptional AI developer who delivered exactly what I needed. Their expertise in AI and machine learning is impressive, and they were able to implement complex features with precision. The communication was excellent throughout the project, and they were always responsive to my questions and requests. I highly recommend their services for anyone looking for top-notch AI development work.",
    author: "michael_rodriguez",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "2 months ago"
  },
  {
    id: 2,
    quote: "Working with Mindscape was a great experience. They have a deep understanding of AI technologies and were able to provide valuable insights throughout the project. The final product exceeded my expectations, and I'm very satisfied with the results. I would definitely work with them again for future AI projects.",
    author: "aisha_patel",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "3 months ago"
  },
  {
    id: 3,
    quote: "Mindscape delivered a high-quality AI solution that perfectly matched our requirements. Their technical skills are outstanding, and they were able to handle complex AI algorithms with ease. The project was completed on time, and the results were exactly what we needed. I'm very impressed with their work and would recommend them to anyone looking for AI development services.",
    author: "dr_elena_volkov",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    date: "1 month ago"
  },
  {
    id: 4,
    quote: "I'm extremely satisfied with the AI solution provided by Mindscape. They demonstrated excellent technical expertise and were able to implement complex AI features that significantly improved our system's performance. The communication was smooth, and they were always available to address any concerns. I would definitely work with them again for future projects.",
    author: "dr_raj_patel",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    date: "2 weeks ago"
  }
]

// Avatar component with error handling
function Avatar({ src, alt }: { src: string, alt: string }) {
  const [imgError, setImgError] = useState(false)
  
  if (imgError) {
    return (
      <div className="w-12 h-12 rounded-full bg-red-500/30 flex items-center justify-center">
        <span className="text-white font-medium text-lg">{alt.charAt(0).toUpperCase()}</span>
      </div>
    )
  }
  
  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-xl group transition-all duration-300 w-[300px] h-[400px] bg-black/40 border border-white/10 hover:bg-black/60"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Quote icon */}
      <Quote className="absolute top-4 left-4 h-8 w-8 text-red-500/20 group-hover:text-red-500/40 transition-colors" />
      
      {/* Content */}
      <div className="p-6 h-full flex flex-col">
        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          ))}
        </div>
        
        {/* Quote */}
        <p className="text-white/70 text-sm leading-relaxed flex-grow italic mb-6">"{testimonial.quote}"</p>
        
        {/* Author info */}
        <div className="flex items-center gap-4 mt-auto">
          <Avatar src={testimonial.image} alt={testimonial.author} />
          <div>
            <h3 className="text-white font-medium">{testimonial.author}</h3>
            <p className="text-white/50 text-sm">{testimonial.date}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(true)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  // Auto-scroll functionality (reverse direction)
  useEffect(() => {
    if (!scrollContainerRef.current || !isAutoScrolling) return

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        const maxScroll = scrollWidth - clientWidth
        
        if (scrollLeft <= 0) {
          // Reset to end
          scrollContainerRef.current.scrollTo({
            left: maxScroll,
            behavior: 'smooth'
          })
        } else {
          // Scroll left (reverse direction)
          scrollContainerRef.current.scrollTo({
            left: scrollLeft - 1,
            behavior: 'smooth'
          })
        }

        // Update arrow visibility
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(scrollLeft < maxScroll)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isAutoScrolling])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false)
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
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">CLIENT REVIEWS</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            What Our <span className="text-red-500">Clients</span> Say
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 rounded-full bg-black/50 border border-white/10 hover:bg-black/70 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}

          {/* Testimonials Grid */}
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
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="flex-none w-[300px]">
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
          
          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 rounded-full bg-black/50 border border-white/10 hover:bg-black/70 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

