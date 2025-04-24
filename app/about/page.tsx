"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Brain, Code, Database, LineChart, Users, Zap, Linkedin, Twitter, Github, Mail, ShieldIcon, TargetIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { TeamMemberCard } from "./teamcard"
import Head from "next/head"
import Image from "next/image"

// Add CSS for animations and effects
import "./styles/animations.css"

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 })
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
    <>
      <Head>
        <title>About Us - Mindscape Analytics</title>
        <meta name="description" content="Learn about Mindscape Analytics - A leading AI company dedicated to making advanced artificial intelligence accessible and impactful for businesses worldwide." />
        <meta name="keywords" content="AI, artificial intelligence, machine learning, data science, enterprise solutions" />
        <meta property="og:title" content="About Mindscape Analytics" />
        <meta property="og:description" content="Discover our mission, values, and the team behind Mindscape Analytics - Pioneering the future of AI." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mindscape.ai/about" />
      </Head>

      <main className="relative">
      <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 relative overflow-hidden section-transition"
            aria-labelledby="hero-heading"
      >
        {/* Background elements */}
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" aria-hidden="true"></div>
            <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px] animate-pulse-slow" aria-hidden="true"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px] animate-pulse-slow" aria-hidden="true"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 button-hover">OUR STORY</Badge>
                <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold tracking-tight mb-6 gradient-text">
              Pioneering the Future of <span className="text-red-500">AI</span>
            </h1>
            <p className="text-xl text-white/70 mb-8">
              We're a team of AI researchers, engineers, and industry experts dedicated to making advanced artificial
              intelligence accessible and impactful for businesses worldwide.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white/70 mb-6">
                At Mindscape Analytics, our mission is to democratize artificial intelligence by creating powerful,
                accessible solutions that solve real business problems. We believe that AI should be a force for
                positive transformation, helping organizations of all sizes make better decisions, optimize operations,
                and deliver exceptional experiences.
              </p>
              <p className="text-white/70 mb-6">
                Founded in 2018 by Zeeshan Keerio, an AI enthusiast and technical visionary, Mindscape Analytics has grown into a leader in
                enterprise AI solutions, serving clients across finance, healthcare, retail, manufacturing, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105 button-hover">
                  Our Approach
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-105 button-hover">
                  Meet Our Team
                </Button>
              </div>
            </div>
            <div className="relative">
                  <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" aria-hidden="true"></div>
                  <Image
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop"
                alt="Our Team"
                    width={800}
                    height={600}
                className="w-full h-auto rounded-xl border border-white/10 relative z-10 shadow-[0_0_30px_rgba(255,0,0,0.15)] hover:shadow-[0_0_50px_rgba(255,0,0,0.25)] transition-all duration-300 image-hover"
                    priority
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        ref={valuesRef}
        initial={{ opacity: 0, y: 20 }}
        animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-black to-black/90 relative overflow-hidden section-transition"
            aria-labelledby="values-heading"
      >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.1),transparent_70%)]" aria-hidden="true"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">OUR VALUES</Badge>
                <h2 id="values-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Guided by <span className="text-red-500">Principles</span>
            </h2>
            <p className="text-xl text-white/70">
              Our core values shape everything we do, from how we build our products to how we interact with our
              clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description:
                  "We constantly push the boundaries of what's possible with AI, investing heavily in R&D to develop cutting-edge solutions.",
                    icon: <Brain className="h-10 w-10 text-red-500" aria-hidden="true" />,
              },
              {
                title: "Integrity",
                description:
                  "We believe in ethical AI development and transparent business practices, ensuring our clients can trust both our technology and our team.",
                    icon: <ShieldIcon className="h-10 w-10 text-red-500" aria-hidden="true" />,
              },
              {
                title: "Impact",
                description:
                  "We measure our success by the tangible results we deliver for our clients, focusing on solutions that drive real business value.",
                    icon: <TargetIcon className="h-10 w-10 text-red-500" aria-hidden="true" />,
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-red-500/50 transition-colors duration-300 card-hover"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 bg-red-500/10 rounded-lg w-fit group-hover:bg-red-500/20 transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        ref={teamRef}
        initial={{ opacity: 0, y: 20 }}
        animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black relative overflow-hidden section-transition"
            aria-labelledby="team-heading"
      >
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" aria-hidden="true"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 button-hover">OUR TEAM</Badge>
                <h2 id="team-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
              Meet Our <span className="text-red-500">Experts</span>
            </h2>
            <p className="text-xl text-white/70">
              Our diverse team brings together expertise in AI research, software engineering, data science, and
              industry-specific knowledge.
            </p>
          </motion.div>

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
              <motion.div 
                      key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                      className="flex-none w-80"
              >
                      <TeamMemberCard member={member} index={index} />
              </motion.div>
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
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        ref={missionRef}
        initial={{ opacity: 0, y: 20 }}
        animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-black to-black/90 relative overflow-hidden section-transition"
            aria-labelledby="timeline-heading"
      >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.1),transparent_70%)]" aria-hidden="true"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 button-hover">OUR JOURNEY</Badge>
                <h2 id="timeline-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
              From Vision to <span className="text-red-500">Reality</span>
            </h2>
            <p className="text-xl text-white/70">Our journey from a small research team to a global AI leader.</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/10" aria-hidden="true"></div>

            {/* Timeline items */}
            {[
              {
                year: "2018",
                title: "Founded",
                description:
                  "Mindscape Analytics was founded by Zeeshan Keerio with a vision to democratize AI for businesses and help organizations leverage artificial intelligence technologies.",
              },
              {
                year: "2019",
                title: "First Enterprise Client",
                description:
                  "Secured our first major enterprise client and delivered a custom AI solution that reduced operational costs by 35%.",
              },
              {
                year: "2020",
                title: "Series A Funding",
                description:
                  "Raised $12M in Series A funding to accelerate product development and expand our team of AI researchers and engineers.",
              },
              {
                year: "2021",
                title: "Platform Launch",
                description:
                  "Launched our flagship AI platform, enabling businesses to build, deploy, and manage custom AI solutions without deep technical expertise.",
              },
              {
                year: "2022",
                title: "Global Expansion",
                description:
                  "Opened offices in London, Singapore, and Tokyo to better serve our growing international client base.",
              },
              {
                year: "2023",
                title: "Series B Funding",
                description:
                  "Secured $45M in Series B funding to further enhance our platform capabilities and expand into new markets.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-12 ${index % 2 === 0 ? "md:text-right" : ""}`}
              >
                <div className={`md:flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="md:w-1/2 p-4">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_20px_rgba(255,0,0,0.1)] card-hover">
                      <div className="text-red-500 font-bold text-xl mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2 relative">
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-red-500 z-10 timeline-dot"></div>
                      <div
                        className={`h-px w-16 ${index % 2 === 0 ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-red-500 to-transparent`}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* Mobile timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:hidden">
                  <div className="h-4 w-4 rounded-full bg-red-500 z-10 timeline-dot"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Us Section */}
      <motion.section 
        ref={ctaRef}
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black relative overflow-hidden section-transition"
            aria-labelledby="join-heading"
      >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.15),transparent_70%)]" aria-hidden="true"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,0,0.2)] card-hover">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                    <h2 id="join-heading" className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Join Our Team</h2>
                <p className="text-white/70 mb-6">
                  We're always looking for talented individuals who are passionate about AI and want to make a real
                  impact. Explore our open positions and become part of our journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105 button-hover">
                    View Open Positions
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-105 button-hover">
                    Our Culture
                  </Button>
                </div>
              </div>
              <div className="relative">
                    <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-3xl opacity-50 animate-pulse-slow" aria-hidden="true"></div>
                    <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team Collaboration"
                      width={800}
                      height={600}
                  className="w-full h-auto rounded-xl border border-white/10 relative z-10 image-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      </div>
      </main>
    </>
  )
}

// Sample team members data
const teamMembers = [
  {
    name: "Zeeshan Keerio",
    role: "Founder & CEO",
    bio: "Visionary AI specialist with extensive experience in developing cutting-edge artificial intelligence solutions. Combining technical expertise with strategic business acumen to transform industries through AI innovation. Committed to making advanced analytics accessible to enterprises worldwide.",
    image: "/founder.jpg",
    department: "Leadership",
    achievements: [
      "Founded Mindscape Analytics in 2018",
      "Led development of enterprise AI solutions",
      "Built successful AI consulting practice",
      "Pioneered innovative AI applications in multiple industries"
    ],
    education: [
      "Institute of Business Administration",
      "Specialized in Data Science and AI"
    ],
    experience: [
      "10+ years in AI and Data Science",
      "Enterprise AI Solutions Architect",
      "AI Research and Development Lead"
    ],
    social: {
    linkedin: "https://www.linkedin.com/in/zeeshan-keerio/",
    twitter: "#",
    github: "#",
    }
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Former VP of Engineering at Amazon Web Services, specializing in distributed systems and cloud architecture. Led multiple successful cloud infrastructure projects.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop",
    department: "Leadership",
    achievements: [
      "Scaled AWS infrastructure to handle 1M+ concurrent users",
      "Developed innovative cloud architecture patterns",
      "Led multiple successful cloud migration projects"
    ],
    education: [
      "Stanford University - Computer Science",
      "MIT - Distributed Systems"
    ],
    experience: [
      "15+ years in cloud architecture",
      "VP of Engineering at AWS",
      "Senior Cloud Architect at Google"
    ],
    social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    }
  },
  {
    name: "Aisha Patel",
    role: "Chief Product Officer",
    bio: "Product leader with experience at Netflix and Spotify. Expert in building AI-powered products that users love. Focused on creating intuitive and impactful user experiences.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2370&auto=format&fit=crop",
    department: "Leadership",
    achievements: [
      "Led product strategy for 3 successful AI products",
      "Increased user engagement by 200%",
      "Developed innovative product roadmaps"
    ],
    education: [
      "Harvard Business School - MBA",
      "UC Berkeley - Product Management"
    ],
    experience: [
      "12+ years in product management",
      "Product Lead at Netflix",
      "Senior PM at Spotify"
    ],
    social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    }
  },
  {
    name: "Dr. Elena Volkov",
    role: "Head of AI Research",
    bio: "Specializes in natural language processing and large language models. Previously worked on GPT models at OpenAI. Published multiple papers in top AI conferences.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2361&auto=format&fit=crop",
    department: "Research",
    achievements: [
      "Published 20+ papers in top AI conferences",
      "Developed novel NLP architectures",
      "Contributed to GPT model development"
    ],
    education: [
      "PhD in Computer Science - Stanford",
      "MSc in Machine Learning - MIT"
    ],
    experience: [
      "8+ years in AI research",
      "Research Scientist at OpenAI",
      "NLP Lead at DeepMind"
    ],
    social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    }
  },
  {
    name: "Dr. Raj Patel",
    role: "Principal Research Scientist",
    bio: "Expert in reinforcement learning and robotics. Ph.D. from MIT with 15+ years of research experience. Developed innovative RL algorithms for real-world applications.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2187&auto=format&fit=crop",
    department: "Research",
    achievements: [
      "Developed award-winning RL algorithms",
      "Led robotics research initiatives",
      "Published in top-tier AI journals"
    ],
    education: [
      "PhD in AI - MIT",
      "MSc in Robotics - Carnegie Mellon"
    ],
    experience: [
      "15+ years in AI research",
      "Research Lead at MIT",
      "Robotics Scientist at Boston Dynamics"
    ],
    social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    }
  },
  {
    name: "Dr. Maya Johnson",
    role: "Computer Vision Lead",
    bio: "Pioneering work in object detection and image segmentation. Previously at NVIDIA Research, leading computer vision projects for autonomous systems.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop",
    department: "Research",
    achievements: [
      "Developed state-of-the-art object detection models",
      "Led computer vision research at NVIDIA",
      "Published in top computer vision conferences"
    ],
    education: [
      "PhD in Computer Vision - UC Berkeley",
      "MSc in Computer Science - Stanford"
    ],
    experience: [
      "10+ years in computer vision",
      "Research Lead at NVIDIA",
      "Computer Vision Scientist at Tesla"
    ],
    social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    }
  },
  {
    name: "James Wilson",
    role: "VP of Engineering",
    bio: "Scaling engineering teams and systems at high-growth companies for over 15 years. Expert in building robust, scalable AI infrastructure.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2187&auto=format&fit=crop",
    department: "Engineering",
    achievements: [
      "Scaled engineering team from 10 to 100+ engineers",
      "Built high-performance AI infrastructure",
      "Led successful product launches"
    ],
    education: [
      "MS in Computer Science - Georgia Tech",
      "BS in Software Engineering - MIT"
    ],
    experience: [
      "15+ years in engineering leadership",
      "VP Engineering at multiple startups",
      "Senior Engineering Manager at Google"
    ],
    social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    }
  },
  {
    name: "Sophia Kim",
    role: "Lead ML Engineer",
    bio: "Expert in deploying ML models at scale. Previously led ML infrastructure at Spotify, building recommendation systems used by millions.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop",
    department: "Engineering",
    achievements: [
      "Built scalable ML infrastructure at Spotify",
      "Developed real-time recommendation systems",
      "Optimized ML model deployment pipelines"
    ],
    education: [
      "MS in Machine Learning - Columbia",
      "BS in Computer Science - NYU"
    ],
    experience: [
      "8+ years in ML engineering",
      "ML Lead at Spotify",
      "ML Engineer at Netflix"
    ],
    social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    }
  },
  {
    name: "David Chen",
    role: "Backend Engineering Lead",
    bio: "Distributed systems expert with experience building high-performance, scalable backends. Specializes in microservices architecture and cloud-native applications.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2187&auto=format&fit=crop",
    department: "Engineering",
    achievements: [
      "Built scalable microservices architecture",
      "Led backend system optimization",
      "Developed high-performance APIs"
    ],
    education: [
      "MS in Computer Science - CMU",
      "BS in Software Engineering - UC Berkeley"
    ],
    experience: [
      "10+ years in backend engineering",
      "Backend Lead at Uber",
      "Senior Engineer at Twitter"
    ],
    social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    }
  },
  {
    name: "Emma Wilson",
    role: "Director of Product",
    bio: "Product visionary who previously led product teams at Microsoft and Salesforce. Expert in AI product strategy and user experience design.",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=2089&auto=format&fit=crop",
    department: "Product",
    achievements: [
      "Led successful AI product launches",
      "Developed innovative product strategies",
      "Increased user adoption by 300%"
    ],
    education: [
      "MBA - Wharton School",
      "BS in Human-Computer Interaction - Stanford"
    ],
    experience: [
      "12+ years in product management",
      "Product Director at Microsoft",
      "Senior PM at Salesforce"
    ],
    social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    }
  }
]

