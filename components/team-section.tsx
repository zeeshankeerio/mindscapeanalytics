"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Zeeshan Keerio",
    role: "Founder & CEO",
    bio: "Visionary AI specialist with extensive experience in developing cutting-edge artificial intelligence solutions. Combining technical expertise with strategic business acumen to transform industries through AI innovation.",
    image: "/founder.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/zeeshan-keerio/",
      twitter: "#",
      github: "#",
      email: "mailto:imzeeeshan.ai@gmail.com"
    }
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Former VP of Engineering at Amazon Web Services, specializing in distributed systems and cloud architecture. Led multiple successful cloud infrastructure projects.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "#"
    }
  },
  {
    name: "Aisha Patel",
    role: "Chief Product Officer",
    bio: "Product leader with experience at Netflix and Spotify. Expert in building AI-powered products that users love. Focused on creating intuitive and impactful user experiences.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2370&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "#"
    }
  },
  {
    name: "Dr. Elena Volkov",
    role: "Head of AI Research",
    bio: "Specializes in natural language processing and large language models. Previously worked on GPT models at OpenAI. Published multiple papers in top AI conferences.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2361&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "#"
    }
  },
  {
    name: "Dr. Raj Patel",
    role: "Principal Research Scientist",
    bio: "Expert in reinforcement learning and robotics. Ph.D. from MIT with 15+ years of research experience. Developed innovative RL algorithms for real-world applications.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2187&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "#"
    }
  }
]

function TeamCard({ member, index }: { member: typeof teamMembers[0], index: number }) {
  const isFounder = member.name === "Zeeshan Keerio"
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl group transition-all duration-300 w-[320px] h-[480px] ${
        isFounder 
          ? "bg-gradient-to-br from-red-500/10 to-black/40 border border-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.2)]" 
          : "bg-black/40 border border-white/10"
      }`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image container */}
      <div className="relative h-[280px] overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
        
        {/* Decorative elements */}
        {isFounder && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent z-0" />
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-transparent blur-lg opacity-50 animate-pulse-slow" />
          </>
        )}
        
        <Image
          src={member.image}
          alt={member.name}
          width={500}
          height={500}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isFounder ? "group-hover:scale-110" : "group-hover:scale-105"
          }`}
          priority={index < 3}
        />
        
        {/* Role badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            isFounder 
              ? "bg-red-500/20 text-red-400 border border-red-500/30" 
              : "bg-white/10 text-white/70 border border-white/10"
          }`}>
            {member.role}
          </span>
        </div>
        
        {/* Name */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-2xl font-bold">{member.name}</h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 h-[200px] flex flex-col">
        <p className="text-white/70 text-sm leading-relaxed flex-grow">{member.bio}</p>
        
        {/* Social links */}
        <div className="flex gap-3 pt-4">
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 ${
              isFounder 
                ? "bg-red-500/20 hover:bg-red-500/30 hover:scale-110" 
                : "bg-white/5 hover:bg-white/10 hover:scale-105"
            }`}
            aria-label={`${member.name}'s LinkedIn profile`}
          >
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 ${
              isFounder 
                ? "bg-red-500/20 hover:bg-red-500/30 hover:scale-110" 
                : "bg-white/5 hover:bg-white/10 hover:scale-105"
            }`}
            aria-label={`${member.name}'s GitHub profile`}
          >
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href={member.social.email}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 ${
              isFounder 
                ? "bg-red-500/20 hover:bg-red-500/30 hover:scale-110" 
                : "bg-white/5 hover:bg-white/10 hover:scale-105"
            }`}
            aria-label={`${member.name}'s email`}
          >
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function TeamSection() {
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
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">OUR TEAM</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Meet Our <span className="text-red-500">Expert</span> Team
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Industry leaders and innovators driving the future of AI and software solutions
          </p>
        </div>

        {/* Team Members Slider */}
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

          {/* Team Members Grid */}
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
            {teamMembers.map((member, index) => (
              <div key={member.name} className="flex-none w-80">
                <TeamCard member={member} index={index} />
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

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl">
            <h3 className="text-xl font-bold mb-2">Join Our Team</h3>
            <p className="text-white/70 mb-4">
              We're always looking for talented individuals to join our growing team. Check out our open positions.
            </p>
            <motion.a
              href="#careers"
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

