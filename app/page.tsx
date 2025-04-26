"use client"

import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Database } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SectionDivider } from "@/components/section-divider"
import { FloatingChatWidget } from "@/components/floating-chat-widget"
import { CookieConsent } from "@/components/cookie-consent"

// Import only the news ticker component directly as it's visible immediately
import NewsTicker from "@/components/news-ticker"

// Dynamically import heavy components with proper loading skeletons
const HyperHero = dynamic(() => import("@/components/hyper-hero"), { 
  ssr: true,
  loading: () => <div className="h-[80vh] bg-black/30 animate-pulse rounded-lg" aria-label="Loading hero section..." role="progressbar"></div>
})

// Defer below-the-fold content loading to improve core web vitals
const FeaturesSection = dynamic(() => import("@/components/features-section"), {
  ssr: false, // Important: Only render on client to reduce server load
  loading: () => <div className="h-96 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading features section..." role="progressbar"></div>
})

const AICapabilitiesShowcase = dynamic(() => import("@/components/ai-capabilities-showcase"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading AI capabilities section..." role="progressbar"></div>
})

// Add more explicit chunk names for better bundle splitting
const ProjectsShowcase = dynamic(() => import(/* webpackChunkName: "projects-showcase" */ "@/components/projects-showcase"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading projects section..." role="progressbar"></div>
})

const AnalyticsPreview = dynamic(() => import(/* webpackChunkName: "analytics-preview" */ "@/components/analytics-preview"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading analytics preview section..." role="progressbar"></div>
})

const EnhancedIndustrySolutions = dynamic(() => import(/* webpackChunkName: "industry-solutions" */ "@/components/enhanced-industry-solutions"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading industry solutions section..." role="progressbar"></div>
})

const TechStackShowcase = dynamic(() => import(/* webpackChunkName: "tech-stack" */ "@/components/tech-stack-showcase"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading tech stack section..." role="progressbar"></div>
})

const TestimonialCarousel = dynamic(() => import(/* webpackChunkName: "testimonials" */ "@/components/testimonial-carousel"), {
  ssr: false,
  loading: () => <div className="h-64 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading testimonials section..." role="progressbar"></div>
})

const IntegrationPartners = dynamic(() => import(/* webpackChunkName: "integration" */ "@/components/integration-partners"), {
  ssr: false,
  loading: () => <div className="h-64 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading integration partners section..." role="progressbar"></div>
})

const TeamSection = dynamic(() => import(/* webpackChunkName: "team-section" */ "@/components/team-section"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading team section..." role="progressbar"></div>
})

const EnhancedCTASection = dynamic(() => import(/* webpackChunkName: "cta-section" */ "@/components/enhanced-cta-section"), {
  ssr: false,
  loading: () => <div className="h-64 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading call to action section..." role="progressbar"></div>
})

const InteractiveDemoSection = dynamic(() => import(/* webpackChunkName: "interactive-demo" */ "@/components/interactive-demo-section"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/30 animate-pulse rounded-lg mt-10" aria-label="Loading interactive demo section..." role="progressbar"></div>
})

// Feature data
const features = [
  {
    title: "Blockchain Solutions",
    description: "Enterprise-grade blockchain platform with DeFi, NFT, and cross-chain capabilities",
    icon: Database,
    color: "red",
  },
  // ... existing features ...
];

// Solution data
const solutions = [
  {
    title: "Blockchain Platform",
    description: "Build, deploy, and scale blockchain applications with our comprehensive PaaS solution",
    icon: Database,
    color: "red",
    href: "/solutions/blockchain",
  },
  // ... existing solutions ...
];

// Background gradient styles
const backgroundStyles = {
  global: "fixed inset-0 w-full",
  gradient: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black z-0",
  overlay: "bg-gradient-to-b from-red-950/30 via-black/0 to-transparent z-0 opacity-40",
  particles: "fixed inset-0 w-full h-full overflow-hidden z-0",
  grid: "absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]",
  glow: "absolute rounded-full bg-red-500/10 blur-[100px] animate-pulse-slow"
};

// Section background styles
const sectionBackgroundStyles = {
  container: "absolute inset-0 w-full h-full",
  glow: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900/20 rounded-full blur-[120px] opacity-30 animate-pulse-slow"
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Global Background Elements */}
      <div className={`${backgroundStyles.global} ${backgroundStyles.gradient}`} aria-hidden="true"></div>
      <div className={`${backgroundStyles.global} ${backgroundStyles.overlay}`} aria-hidden="true"></div>
      
      {/* Animated Background Particles */}
      <div className={backgroundStyles.particles} aria-hidden="true">
        <div className={backgroundStyles.grid}></div>
        <div className={`${backgroundStyles.glow} top-1/4 right-1/4 w-64 h-64`}></div>
        <div className={`${backgroundStyles.glow} bottom-1/4 left-1/4 w-80 h-80 blur-[120px]`}></div>
      </div>
      
      {/* Hero Section - First Impression */}
      <header className="relative z-10 w-full overflow-hidden" role="banner" aria-labelledby="main-heading">
        <motion.div 
          style={{ y, opacity }}
          className="container mx-auto px-4 md:px-6"
        >
          <HyperHero />
        </motion.div>
        
        {/* News Ticker - Now positioned under HyperHero */}
        <div className="mt-2 relative">
          <NewsTicker />
        </div>
      </header>
      
      {/* 1. POWERFUL FEATURES - Core Capabilities */}
      <section id="features" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="features-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FeaturesSection />
        </div>
      </section>
      
      {/* 2. INDUSTRY SOLUTIONS - Vertical Focus */}
      <section id="solutions" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="solutions-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <EnhancedIndustrySolutions />
        </div>
      </section>
      
      {/* 3. AI CAPABILITIES - Advanced Features */}
      <section id="ai-capabilities" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="ai-capabilities-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AICapabilitiesShowcase />
        </div>
      </section>
      
      {/* 5. INTERACTIVE DEMOS - Showcase Key Features */}
      <section id="interactive-demo" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="interactive-demo-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <InteractiveDemoSection />
        </div>
      </section>
      
      {/* 6. ENTERPRISE ANALYTICS SUITE - Data Visualization */}
      <section id="analytics" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="analytics-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnalyticsPreview />
        </div>
      </section>
      
      {/* 7. OUR PROJECTS - Innovations */}
      <section id="projects" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="projects-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ProjectsShowcase />
        </div>
      </section>
      
      {/* 8. TECHNOLOGY STACK - Our Technology */}
      <section id="tech-stack" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="tech-stack-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <TechStackShowcase />
        </div>
      </section>
      
      {/* Testimonials - Social Proof */}
      <section id="testimonials" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="testimonials-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <TestimonialCarousel />
        </div>
      </section>
      
      {/* Partners - Integration Ecosystem */}
      <section id="partners" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="partners-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <IntegrationPartners />
        </div>
      </section>
      
      {/* Team Section - Who We Are */}
      <section id="team" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="team-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/20 rounded-full blur-[90px] opacity-30 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/20 rounded-full blur-[90px] opacity-30 animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <TeamSection />
        </div>
      </section>
      
      {/* Start Today - Call to Action */}
      <section id="start-today" className="relative z-10 w-full py-12 overflow-hidden" aria-labelledby="cta-heading">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <EnhancedCTASection />
        </div>
      </section>
      
      {/* Floating Elements - User Experience */}
      <ScrollToTop />
      <FloatingChatWidget />
      <CookieConsent />
      
      {/* Skip to main content link for accessibility */}
      <a href="#features" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-red-900 text-white px-4 py-2 rounded">Skip to main content</a>
    </main>
  )
} 