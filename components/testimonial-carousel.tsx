"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QuoteIcon, Play, CheckCircle2, X } from "lucide-react"
import Image from "next/image"
import { VideoModal } from "@/components/video-modal"

// Enhanced testimonials data with more details
const testimonials = [
  {
    id: 1,
    quote:
      "Mindscape AI has completely transformed our data analytics workflow. The natural language querying feature has made data accessible to everyone in our organization, regardless of their technical background.",
    author: "Sarah Johnson",
    title: "Data Analytics Director",
    company: "CloudFront Technologies",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop",
    logo: "https://placehold.co/200x60/2563eb/ffffff?text=CloudFront",
    rating: 5,
    industry: "Technology",
    metrics: [
      { label: "Productivity Increase", value: "45%" },
      { label: "Time Saved", value: "12hrs/week" },
      { label: "User Adoption", value: "98%" }
    ],
    videoUrl: "/videos/testimonials/cloudfront-demo.mp4",
    achievements: [
      "Reduced data analysis time by 60%",
      "Increased team productivity by 45%",
      "Achieved 98% user satisfaction"
    ]
  },
  {
    id: 2,
    quote:
      "The predictive analytics capabilities of Mindscape AI allowed us to anticipate market trends with remarkable accuracy. We've increased our forecasting accuracy by 34% since implementation.",
    author: "Michael Chen",
    title: "Chief Strategy Officer",
    company: "NexGen Financial",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=987&auto=format&fit=crop",
    logo: "https://placehold.co/200x60/1e40af/ffffff?text=NexGen",
    rating: 5,
    industry: "Finance",
    metrics: [
      { label: "Forecast Accuracy", value: "94%" },
      { label: "Cost Reduction", value: "28%" },
      { label: "ROI", value: "320%" }
    ],
    videoUrl: "/videos/testimonials/nexgen-demo.mp4",
    achievements: [
      "Improved forecasting accuracy by 34%",
      "Reduced operational costs by 28%",
      "Achieved 320% ROI in 6 months"
    ]
  },
  {
    id: 3,
    quote:
      "Implementing Mindscape AI's solutions resulted in a 47% reduction in operational costs while simultaneously improving our customer service response times by 62%. The ROI has been exceptional.",
    author: "Dr. Amelia Rodriguez",
    title: "Chief Innovation Officer",
    company: "HealthPulse Medical",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1022&auto=format&fit=crop",
    logo: "https://placehold.co/200x60/15803d/ffffff?text=HealthPulse",
    rating: 5,
    industry: "Healthcare",
    metrics: [
      { label: "Cost Reduction", value: "47%" },
      { label: "Response Time", value: "-62%" },
      { label: "Patient Satisfaction", value: "92%" }
    ],
    videoUrl: "/videos/testimonials/healthpulse-demo.mp4",
    achievements: [
      "Reduced operational costs by 47%",
      "Improved response times by 62%",
      "Achieved 92% patient satisfaction"
    ]
  },
  {
    id: 4,
    quote:
      "The custom AI models Mindscape developed for our manufacturing processes have dramatically reduced defect rates and improved quality control. Their team's expertise and support have been invaluable.",
    author: "Robert Tanaka",
    title: "VP of Operations",
    company: "TechManu Industries",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=987&auto=format&fit=crop",
    logo: "https://placehold.co/200x60/ca8a04/ffffff?text=TechManu",
    rating: 5,
    industry: "Manufacturing",
    metrics: [
      { label: "Defect Reduction", value: "78%" },
      { label: "Quality Score", value: "99.9%" },
      { label: "Efficiency Gain", value: "45%" }
    ],
    videoUrl: "/videos/testimonials/techmanu-demo.mp4",
    achievements: [
      "Reduced defect rates by 78%",
      "Achieved 99.9% quality score",
      "Increased production efficiency by 45%"
    ]
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [showVideo, setShowVideo] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  // Get unique industries
  const industries = useMemo(() => 
    Array.from(new Set(testimonials.map(t => t.industry))),
    []
  )

  // Filter testimonials by industry
  const filteredTestimonials = useMemo(() => 
    selectedIndustry 
      ? testimonials.filter(t => t.industry === selectedIndustry)
      : testimonials,
    [selectedIndustry]
  )

  const testimonial = filteredTestimonials[current]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % filteredTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, filteredTestimonials.length])

  // Handle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        setIsVideoLoading(true)
        setVideoError(null)
        videoRef.current.play().catch(error => {
          setVideoError("Failed to play video. Please try again.")
          setIsVideoPlaying(false)
        })
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  // Handle video events
  const handleVideoLoadStart = () => {
    setIsVideoLoading(true)
    setVideoError(null)
  }

  const handleVideoCanPlay = () => {
    setIsVideoLoading(false)
  }

  const handleVideoError = () => {
    setIsVideoLoading(false)
    setVideoError("Failed to load video. Please try again later.")
    setIsVideoPlaying(false)
  }

  const handleVideoEnded = () => {
    setIsVideoPlaying(false)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      setCurrent((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1))
    } else if (e.key === "ArrowRight") {
      setCurrent((prev) => (prev + 1) % filteredTestimonials.length)
    } else if (e.key === "Escape" && isVideoPlaying) {
      toggleVideo()
    }
  }

  return (
    <section 
      ref={ref}
      className="py-16 relative overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 text-center">
          <Badge className="mb-3 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10">
            SUCCESS STORIES
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What Our <span className="text-red-500">Clients</span> Say
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what industry leaders have to say about their experience with Mindscape AI.
          </p>
        </div>

        {/* Industry filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedIndustry === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedIndustry(null)}
            className="rounded-full"
          >
            All Industries
          </Button>
          {industries.map((industry) => (
            <Button
              key={industry}
              variant={selectedIndustry === industry ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedIndustry(industry)}
              className="rounded-full"
            >
              {industry}
            </Button>
          ))}
        </div>

        {/* Main carousel container */}
        <div 
          className="max-w-6xl mx-auto relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onFocus={() => setIsAutoPlaying(false)}
          onBlur={() => setIsAutoPlaying(true)}
          aria-live="polite"
        >
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden p-6 md:p-8 lg:p-12 relative">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>
            
            {/* Quote icon */}
            <QuoteIcon className="absolute top-6 left-6 h-12 w-12 text-red-500/20" />
            
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center md:items-start md:flex-row gap-8 will-change-transform"
                  aria-current={true}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${current + 1} of ${filteredTestimonials.length}`}
                >
                  {/* Author image and video */}
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 opacity-20 z-10"></div>
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-cover"
                      />
                      {testimonial.videoUrl && (
                        <div 
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          onClick={() => {
                            setShowVideo(true)
                          }}
                        >
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Company logo */}
                    <div className="mt-3 w-full h-8 flex items-center justify-center rounded-md bg-white/5 backdrop-blur-sm overflow-hidden">
                      <Image
                        src={testimonial.logo}
                        alt={`${testimonial.company} logo`}
                        width={120}
                        height={30}
                        className="object-contain max-h-6"
                      />
                    </div>
                  </div>
                  
                  {/* Testimonial content */}
                  <div className="flex-1">
                    <div className="mb-6">
                      {/* Star rating */}
                      <div className="flex mb-4" aria-label={`Rated ${testimonial.rating} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={`star-${i}`}
                            className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-600"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <motion.blockquote
                        className="text-xl md:text-2xl font-medium leading-relaxed text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        "{testimonial.quote}"
                      </motion.blockquote>
                    </div>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {testimonial.metrics.map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="bg-white/5 rounded-lg p-3 text-center"
                        >
                          <div className="text-2xl font-bold text-red-500">{metric.value}</div>
                          <div className="text-sm text-white/70">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white/70 mb-2">Key Achievements</h4>
                      <ul className="space-y-1">
                        {testimonial.achievements.map((achievement, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="flex items-center text-sm text-white/80"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Author info */}
                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <div className="font-semibold text-lg text-white">{testimonial.author}</div>
                      <div className="text-white/70">
                        {testimonial.title}, {testimonial.company}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-center mt-8 gap-3 items-center">
            {/* Previous button */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/20"
              onClick={() => setCurrent((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1))}
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Button>
            
            {/* Indicators */}
            <div className="flex gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === current ? "bg-red-500" : "bg-white/20"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Next button */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/20"
              onClick={() => setCurrent((prev) => (prev + 1) % filteredTestimonials.length)}
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Video modal */}
      <VideoModal
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        videoUrl={testimonial.videoUrl}
        title={`${testimonial.author}'s Testimonial`}
      />
    </section>
  )
}

