"use client"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import { LoadingScreen } from "../../components/loading-screen"
import { DashboardShell } from "../../components/ui/dashboard-shell"
import DashboardLayoutContent from "../../components/dashboard-layout-content"
import { DashboardProvider } from "../../providers/dashboard-context"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Add a small delay to simulate loading and prevent layout shift
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <DashboardProvider>
      <DashboardLayoutContent inter={inter}>
        <DashboardShell maxWidth="full">
          {children}
        </DashboardShell>
      </DashboardLayoutContent>
    </DashboardProvider>
  )
}

