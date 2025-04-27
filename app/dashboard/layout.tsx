"use client"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ModernSidebar } from "@/components/dashboard/modern-sidebar"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingScreen } from "@/components/loading-screen"
import DashboardLayoutContent from "@/components/dashboard-layout-content"
import { DashboardProvider, useDashboard } from "@/providers/dashboard-context"
import { Toaster } from "@/components/ui/toaster"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"
import { cn } from "@/lib/utils"
import { LoadingIndicator } from "@/components/loading-indicator"
import { NotificationsProvider } from "@/providers/notifications-provider"
import { CommandMenu } from "@/components/dashboard/command-menu"

const inter = Inter({ subsets: ["latin"] })

// Wrapper for the dashboard content that uses the dashboard context
function DashboardLayoutWithContext({
  children,
}: {
  children: React.ReactNode
}) {
  const { sidebarOpen, setSidebarOpen, isLoading } = useDashboard()
  const [isMounted, setIsMounted] = useState(false)

  // Handle initial client-side mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Automatically collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else if (window.innerWidth >= 1024 && !sidebarOpen) {
        setSidebarOpen(true)
      }
    }
    
    // Set initial state based on screen size
    handleResize()
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize)
    
    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize)
  }, [setSidebarOpen, sidebarOpen])

  if (isLoading || !isMounted) {
    return <LoadingScreen />
  }

  return (
    <DashboardLayoutContent inter={inter}>
      <div className="flex h-screen bg-gradient-to-br from-black to-zinc-900 overflow-hidden">
        <ErrorBoundary>
          <ModernSidebar />
          
          <div className={cn(
            "flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out",
            sidebarOpen ? "lg:ml-[260px]" : "lg:ml-[70px]"
          )}>
            <DashboardHeader 
              heading="Dashboard" 
            />
            <main className="flex-1 overflow-y-auto scrollbar-hide bg-black/40 backdrop-blur-sm supports-[backdrop-filter]:bg-black/40 p-2 sm:p-4 md:p-6 scroll-smooth">
              <ErrorBoundary>
                <div className="mx-auto w-full max-w-8xl pb-12">
                  <NotificationsProvider>
                    {isLoading && <LoadingIndicator />}
                    {children}
                  </NotificationsProvider>
                </div>
              </ErrorBoundary>
            </main>
          </div>
        </ErrorBoundary>

        {/* Global notifications panel */}
        <NotificationsPanel />
      </div>
      
      {/* Command Menu */}
      <CommandMenu />
      
      {/* Toast notifications */}
      <Toaster />
    </DashboardLayoutContent>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Wrap all dashboard content with the DashboardProvider
  return (
    <DashboardProvider>
      <DashboardLayoutWithContext>
        {children}
      </DashboardLayoutWithContext>
    </DashboardProvider>
  )
}

