"use client"

import React, { lazy, Suspense, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import dynamic from "next/dynamic"
import { setupLazyLoading, monitorLongTasks } from "@/lib/performance-utils"

// Dynamically import components with loading fallbacks
const EnhancedHeader = dynamic(() => import("@/components/enhanced-header"), {
  loading: () => <div className="h-16" /> // Simple placeholder with same height
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-24" /> // Simple placeholder with same height
})

// Dynamically import NetworkStatus to avoid affecting initial load
const NetworkStatus = dynamic(() => import("@/components/network-status").then(mod => mod.NetworkStatus), {
  ssr: false
})

interface RootLayoutContentProps {
  children: React.ReactNode
}

export default function RootLayoutContent({ children }: RootLayoutContentProps) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')
  const isDocs = pathname?.startsWith('/docs')
  
  // Hide footer for pages with sidebar (dashboard, docs)
  const showFooter = !isDashboard && !isDocs

  const [mounted, setMounted] = useState(false)
  
  // Setup performance monitoring and optimizations
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Setup lazy loading for images
      setupLazyLoading();
      
      // Monitor for long tasks
      const observer = monitorLongTasks();
      
      // Remove prefetching of missing assets
      
      return () => {
        // Cleanup observer if it exists
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, []);
  
  // After hydration we can access browser APIs
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-zinc-950">
      {!isDashboard && <EnhancedHeader />}
      <div className="relative z-10">
        {children}
      </div>
      {showFooter && <Footer />}
      <NetworkStatus />
    </div>
  )
} 