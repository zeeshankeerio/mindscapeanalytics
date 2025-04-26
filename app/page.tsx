"use client"

import HyperHero from "@/components/hyper-hero"
import FeaturesSection from "@/components/features-section"
import AICapabilitiesShowcase from "@/components/ai-capabilities-showcase"
import ProjectsShowcase from "@/components/projects-showcase"
import AnalyticsPreview from "@/components/analytics-preview"
import EnhancedIndustrySolutions from "@/components/enhanced-industry-solutions"
import TechStackShowcase from "@/components/tech-stack-showcase"
import TestimonialCarousel from "@/components/testimonial-carousel"
import IntegrationPartners from "@/components/integration-partners"
import TeamSection from "@/components/team-section"
import EnhancedCTASection from "@/components/enhanced-cta-section"
import { SectionDivider } from "@/components/section-divider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingChatWidget } from "@/components/floating-chat-widget"
import { CookieConsent } from "@/components/cookie-consent"
import InteractiveDemoSection from "@/components/interactive-demo-section"
import NewsTicker from "@/components/news-ticker"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Database } from "lucide-react"

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
      <header className="relative z-10 w-full overflow-hidden">
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
      <section id="features" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FeaturesSection />
        </div>
      </section>
      
      {/* 2. INDUSTRY SOLUTIONS - Vertical Focus */}
      <section id="solutions" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <EnhancedIndustrySolutions />
        </div>
      </section>
      
      {/* 3. AI CAPABILITIES - Advanced Features */}
      <section id="ai-capabilities" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AICapabilitiesShowcase />
        </div>
      </section>
      
      {/* 5. INTERACTIVE DEMOS - Showcase Key Features */}
      <section id="interactive-demo" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <InteractiveDemoSection />
        </div>
      </section>
      
      {/* 6. ENTERPRISE ANALYTICS SUITE - Data Visualization */}
      <section id="analytics" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnalyticsPreview />
        </div>
      </section>
      
      {/* 7. OUR PROJECTS - Innovations */}
      <section id="projects" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ProjectsShowcase />
        </div>
      </section>
      
      {/* 8. TECHNOLOGY STACK - Our Technology */}
      <section id="tech-stack" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <TechStackShowcase />
        </div>
      </section>
      
      {/* Testimonials - Social Proof */}
      <section id="testimonials" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <TestimonialCarousel />
        </div>
      </section>
      
      {/* Partners - Integration Ecosystem */}
      <section id="partners" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <IntegrationPartners />
        </div>
      </section>
      
      {/* Team Section - Who We Are */}
      <section id="team" className="relative z-10 w-full py-12 overflow-hidden">
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/20 rounded-full blur-[90px] opacity-30 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/20 rounded-full blur-[90px] opacity-30 animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <TeamSection />
        </div>
      </section>
      
      {/* Start Today - Call to Action */}
      <section id="start-today" className="relative z-10 w-full py-12 overflow-hidden">
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
    </main>
  )
} 