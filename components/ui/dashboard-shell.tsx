"use client"

/**
 * Main Dashboard Shell Component
 * 
 * This is the primary dashboard shell component used throughout the application.
 * Other dashboard layouts and components (like components/dashboard-shell.tsx) are secondary
 * or deprecated in favor of this component.
 *
 * This component:
 * 1. Provides the outer layout structure for all dashboard pages
 * 2. Incorporates the ModernSidebar navigation component
 * 3. Includes the DashboardHeader for the top navigation bar
 * 4. Handles notifications through the toast system
 * 5. Wraps content in error boundaries for resilience
 */

import React, { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ModernSidebar } from "@/components/dashboard/modern-sidebar"
import { ErrorBoundary } from "@/components/error-boundary"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useDashboard } from "@/providers/dashboard-context"

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "7xl"
}

export function DashboardShell({
  children,
  className,
  maxWidth = "7xl",
}: DashboardShellProps) {
  const { sidebarOpen, setSidebarOpen } = useDashboard()
  const maxWidthClass = maxWidth === "full" ? "w-full" : `max-w-${maxWidth}`
  const { toast } = useToast()
  const [notificationCount, setNotificationCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Detect device viewport sizes with improved breakpoints
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768
      const tabletView = window.innerWidth >= 768 && window.innerWidth < 1024
      
      setIsMobile(mobileView)
      setIsTablet(tabletView)
    }
    
    // Run immediately
    handleResize()
    
    // Use a debounced resize handler for better performance
    let resizeTimer: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 100)
    }
    
    window.addEventListener("resize", debouncedResize)
    
    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  React.useEffect(() => {
    // Simulate random notification count
    setNotificationCount(Math.floor(Math.random() * 5))
  }, [])

  const handleNotificationClick = () => {
    if (notificationCount > 0) {
      toast({
        title: "System notifications",
        description: "You have unread notifications. Check your inbox.",
      })
      setNotificationCount(0)
    }
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-black to-zinc-900 overflow-hidden">
      <ErrorBoundary>
        {/* ModernSidebar component - handles its own visibility on mobile/desktop */}
        <ModernSidebar />
        
        {/* Main content area with dynamic margin based on sidebar state */}
        <div 
          className={cn(
            "flex flex-1 flex-col w-full overflow-hidden transition-all duration-300 ease-in-out",
            // For desktop: apply margin when sidebar is open or collapsed
            !isMobile && sidebarOpen && "ml-[260px]",
            !isMobile && !sidebarOpen && "ml-[70px]",
            // For mobile: always zero margin (mobile uses a drawer overlay instead)
            isMobile && "ml-0"
          )}
        >
          <DashboardHeader 
            notificationCount={notificationCount}
            onNotificationClick={handleNotificationClick}
            isMobile={isMobile}
          />
          <main className={cn(
            "flex-1 w-full overflow-y-auto scrollbar-hide bg-black/40 backdrop-blur-sm supports-[backdrop-filter]:bg-black/40 scroll-smooth",
            // Adjust padding for different viewport sizes
            isMobile ? "p-2" : "p-2 sm:p-4 md:p-6",
            className
          )}>
            <ErrorBoundary>
              <div className={cn(
                "mx-auto w-full", 
                maxWidthClass, 
                "pt-1",
                // Add smaller vertical spacing on mobile
                isMobile && "space-y-3",
                !isMobile && "space-y-6"
              )}>
                {children}
              </div>
            </ErrorBoundary>
          </main>
        </div>
      </ErrorBoundary>
      
      {/* Add styles for touch devices */}
      <style jsx global>{`
        /* Improve touch scrolling on mobile */
        @media (max-width: 767px) {
          ::-webkit-scrollbar {
            display: none;
          }
          
          * {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
          }
          
          /* Only fix position for the main content, not the entire body 
           * to avoid interfering with the mobile drawer */
          main {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  )
} 