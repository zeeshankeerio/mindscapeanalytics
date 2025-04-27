"use client"

import { useEffect } from "react"
import Head from "next/head"
import { NextFont } from "next/dist/compiled/@next/font"
import { useDashboard } from "@/providers/dashboard-context"

interface DashboardLayoutContentProps {
  children: React.ReactNode
  inter: NextFont
}

export default function DashboardLayoutContent({ children, inter }: DashboardLayoutContentProps) {
  const { theme } = useDashboard()

  // Handle theme changes
  useEffect(() => {
    const root = document.documentElement
    
    // Remove previous theme class
    root.classList.remove('light', 'dark')
    
    // Apply selected theme
    if (theme === 'system') {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <>
      <Head>
        <title>Mindscape Dashboard</title>
        <meta name="description" content="AI-powered analytics and insights dashboard" />
      </Head>
      <div className={inter.className}>
            {children}
          </div>
    </>
  )
} 