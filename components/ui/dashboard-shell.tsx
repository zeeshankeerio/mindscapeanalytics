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
  const { sidebarOpen } = useDashboard()
  const maxWidthClass = maxWidth === "full" ? "w-full" : `max-w-${maxWidth}`
  const { toast } = useToast()
  const [notificationCount, setNotificationCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
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
        <div className="fixed inset-y-0 left-0 z-40">
          <ModernSidebar />
        </div>
        <div 
          className={cn(
            "flex flex-1 flex-col w-full overflow-hidden transition-all duration-300",
            sidebarOpen ? "lg:ml-64" : "ml-16",
            isMobile && "ml-0"
          )}
        >
          <DashboardHeader 
            notificationCount={notificationCount}
            onNotificationClick={handleNotificationClick}
          />
          <main className={cn(
            "flex-1 w-full overflow-y-auto scrollbar-hide bg-black/40 backdrop-blur-sm supports-[backdrop-filter]:bg-black/40 p-2 sm:p-4 md:p-6 scroll-smooth",
            className
          )}>
            <ErrorBoundary>
              <div className={cn("mx-auto w-full", maxWidthClass, "pt-1")}>
                {children}
              </div>
            </ErrorBoundary>
          </main>
        </div>
      </ErrorBoundary>
    </div>
  )
} 