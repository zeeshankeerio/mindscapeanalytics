"use client"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import { DashboardHeader } from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingScreen } from "@/components/loading-screen"
import DashboardLayoutContent from "@/components/dashboard-layout-content"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Persist sidebar state in localStorage
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Get sidebar state from localStorage
    const savedSidebarState = localStorage.getItem('dashboardSidebarOpen')
    if (savedSidebarState !== null) {
      setSidebarOpen(savedSidebarState === 'true')
    }
    
    // Add a small delay to simulate loading and prevent layout shift
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSidebarToggle = (open: boolean) => {
    setSidebarOpen(open)
    localStorage.setItem('dashboardSidebarOpen', String(open))
  }

  if (isLoading) {
    return <LoadingScreen text="Loading dashboard..." />
  }

  return (
    <DashboardLayoutContent inter={inter}>
      <div className="flex h-screen bg-gradient-to-br from-black to-zinc-900 overflow-hidden">
        <ErrorBoundary>
          <DashboardSidebar open={sidebarOpen} onOpenChange={handleSidebarToggle} />
          <div className="flex flex-1 flex-col overflow-hidden">
            <DashboardHeader onMenuClick={() => handleSidebarToggle(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto bg-black/40 backdrop-blur-sm supports-[backdrop-filter]:bg-black/40 p-6">
              <ErrorBoundary>
                <div className="mx-auto max-w-7xl">
                  {children}
                </div>
              </ErrorBoundary>
            </main>
          </div>
        </ErrorBoundary>
      </div>
    </DashboardLayoutContent>
  )
}

