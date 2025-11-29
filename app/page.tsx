"use client"

import HyperHero from "@/components/hyper-hero"
import ServicesShowcase from "@/components/services-showcase"

import ProjectsShowcase from "@/components/projects-showcase"
import EnhancedIndustrySolutions from "@/components/enhanced-industry-solutions"
import TechStackShowcase from "@/components/tech-stack-showcase"
import TestimonialCarousel from "@/components/testimonial-carousel"

import EnhancedCTASection from "@/components/enhanced-cta-section"
import { SectionDivider } from "@/components/section-divider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingChatWidget } from "@/components/floating-chat-widget"
import { CookieConsent } from "@/components/cookie-consent"
import UnifiedAIPlatform from "@/components/unified-ai-platform"
import SocialProofSection from "@/components/social-proof-section"
import WhyChooseUs from "@/components/why-choose-us"
import AffiliateProgramSection from "@/components/affiliate-program-section"
import InstantQuoteCalculator from "@/components/instant-quote-calculator"

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

// Background gradient styles - Optimized for performance
const backgroundStyles = {
  global: "fixed inset-0 w-full",
  gradient: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black z-0", // Reduced opacity
  overlay: "bg-gradient-to-b from-red-950/20 via-black/0 to-transparent z-0 opacity-30", // Reduced opacity
  particles: "fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none", // Added pointer-events-none
  grid: "absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]",
  glow: "absolute rounded-full bg-red-500/5 blur-[80px]" // Removed animation, reduced blur and opacity
};

// Section background styles - Optimized
const sectionBackgroundStyles = {
  container: "absolute inset-0 w-full h-full pointer-events-none", // Added pointer-events-none
  glow: "hidden" // Hiding per-section glows to significantly improve scroll performance
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




      {/* 1. OUR SERVICES - What We Offer */}
      <FlexibleSection
        id="services"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>
        <ServicesShowcase />
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

      {/* AI Capabilities & Interactive Demos - Unified Platform Section */}
      <FlexibleSection
        id="ai-platform"
        fullWidth={true}
        className="relative z-10 py-12 md:py-24 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.glow}></div>
          <div className={sectionBackgroundStyles.glow}></div>
        </div>

        <UnifiedAIPlatform />
      </FlexibleSection>


      {/* 6. TECHNOLOGY STACK - Our Technology */}
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

      {/* INSTANT QUOTE - Lead Generation */}
      <FlexibleSection
        id="instant-quote"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <InstantQuoteCalculator />
      </FlexibleSection>

      {/* AFFILIATE PROGRAM - Growth Engine */}
      <FlexibleSection
        id="affiliate-program"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <AffiliateProgramSection />
      </FlexibleSection>

      {/* WHY CHOOSE US - USA-Based Advantages */}
      <FlexibleSection
        id="why-choose-us"
        fullWidth={true}
        className="relative z-10 py-6 md:py-12 overflow-hidden"
      >
        <WhyChooseUs />
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