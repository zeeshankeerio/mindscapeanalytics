"use client"

import React, { Suspense, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import EnhancedHeader from "@/components/enhanced-header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { GlobalLoadingScreen } from "@/components/global-loading-screen"
import { NavigationEvents } from "@/components/navigation-events"

// A fallback component for the navigation events suspense
function NavigationEventsFallback() {
  return null;
}

// Add an image prefetcher component
function ImagePrefetcher() {
  useEffect(() => {
    // Prefetch critical images for better performance
    const criticalImages = [
      '/images/logo.png',
      '/images/brain.svg',
      '/images/optimized/founder-reduced.webp'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  return null;
}

interface RootLayoutContentProps {
  children: React.ReactNode
  inter: any // Font
  fullWidth?: boolean // Added option for full-width layout
}

export default function RootLayoutContent({ 
  children, 
  inter,
  fullWidth = true // Set default to true
}: RootLayoutContentProps) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')
  const isDocs = pathname?.startsWith('/docs')
  
  // Track when initial loading is complete
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  
  useEffect(() => {
    // Mark initial load as complete after a short delay
    const timer = setTimeout(() => {
      setInitialLoadComplete(true)
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Explicitly define pages that should NOT have a footer
  const pagesWithoutFooter = [
    isDashboard, // Dashboard pages
    isDocs,      // Documentation pages
  ]
  
  // Show footer if not in the exclusion list
  const showFooter = !pagesWithoutFooter.some(Boolean)

  return (
    <body className={`${inter.className} antialiased zoom-fix w-full max-w-[100vw]`} suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {/* Prefetch critical images */}
        <ImagePrefetcher />
        
        {/* Monitor navigation events - wrapped in Suspense */}
        <Suspense fallback={<NavigationEventsFallback />}>
          <NavigationEvents />
        </Suspense>
        
        {/* Global Loading Screen */}
        <GlobalLoadingScreen disableOnPaths={["/dashboard"]} />
        
        <div className="relative min-h-screen min-w-[320px] w-full max-w-[100vw] bg-gradient-to-b from-black to-zinc-950">
          {!isDashboard && <EnhancedHeader fullWidth={true} />}
          
          <div className="w-full max-w-[100vw] relative z-10 zoom-friendly">
            {/* Wrap children in a div with a key to force remount on route change */}
            <div key={pathname}>
              {children}
            </div>
          </div>
          
          {/* Main footer - consistently applied to all pages except excluded ones */}
          {showFooter && <Footer key="main-footer" fullWidth={true} />}
          <Toaster />
        </div>
      </ThemeProvider>
    </body>
  )
} 