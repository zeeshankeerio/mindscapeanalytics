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
import { FlexibleSection } from "@/components/flexible-section"
import { getContainerClasses } from "@/lib/container-utils"
import AIChatbot from "@/components/ai-chatbot"
import UnifiedChat from "@/components/unified-chat"

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

  // Ensure we have default values as fallbacks for transform to prevent null issues
  const y = useTransform(scrollYProgress, [0, 1], [0, -50], { clamp: false })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], { clamp: false })

  return (
    <main ref={containerRef} className="min-h-screen w-full max-w-[100vw] bg-black text-white relative overflow-x-hidden">
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
      <FlexibleSection
        id="hero"
        fullWidth={true}
        className="relative z-10 overflow-hidden"
        noPadding
      >
        <motion.div 
          style={{ y, opacity }}
        >
          <HyperHero fullWidth={true} />
        </motion.div>
      </FlexibleSection>
      
      {/* News Ticker below Hero - consistent layout */}
      <div className="hidden md:block">
        <NewsTicker />
      </div>
      
      {/* 1. POWERFUL FEATURES - Core Capabilities */}
      <FlexibleSection
        id="features"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <FeaturesSection fullWidth={true} />
      </FlexibleSection>
      
      {/* 2. OUR PROJECTS - Innovations - Moved here to be after Features */}
      <FlexibleSection
        id="projects"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
          <ProjectsShowcase />
      </FlexibleSection>
      
      {/* 3. INDUSTRY SOLUTIONS - Vertical Focus */}
      <FlexibleSection
        id="solutions"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
          <EnhancedIndustrySolutions />
      </FlexibleSection>
      
      {/* 4. AI CAPABILITIES - Advanced Features */}
      <FlexibleSection
        id="ai-capabilities"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
          <AICapabilitiesShowcase />
      </FlexibleSection>
      
      {/* 5. INTERACTIVE DEMOS - Showcase Key Features */}
      <FlexibleSection
        id="interactive-demo"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
          <InteractiveDemoSection />
      </FlexibleSection>
      
      {/* 6. ENTERPRISE ANALYTICS SUITE - Data Visualization */}
      <FlexibleSection
        id="analytics"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
          <AnalyticsPreview />
      </FlexibleSection>
      
      {/* 7. TECHNOLOGY STACK - Our Technology */}
      <FlexibleSection
        id="tech-stack"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
          <TechStackShowcase />
      </FlexibleSection>
      
      {/* Testimonials - Social Proof */}
      <FlexibleSection
        id="testimonials"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
          <TestimonialCarousel />
      </FlexibleSection>
      
      {/* Partners - Integration Ecosystem */}
      <FlexibleSection
        id="partners"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
          <IntegrationPartners />
      </FlexibleSection>
      
      {/* Team Section - Who We Are */}
      <FlexibleSection
        id="team"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/20 rounded-full blur-[90px] opacity-30 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/20 rounded-full blur-[90px] opacity-30 animate-pulse-slow"></div>
        </div>
          <TeamSection />
      </FlexibleSection>
      
      {/* Start Today - Call to Action */}
      <FlexibleSection
        id="start-today"
        fullWidth={true}
        className="relative z-10 py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
          <EnhancedCTASection />
      </FlexibleSection>
      
      {/* Floating Elements - User Experience */}
      <ScrollToTop />
      <UnifiedChat initialStyle="floating" allowStyleToggle={true} theme="landing" />
      
      {/* Existing chat widgets - comment these out if using UnifiedChat */}
      {/* <FloatingChatWidget /> */}
      {/* <AIChatbot /> */}
      <CookieConsent />
    </main>
  )
} 