"use client"

import { useEffect } from "react"
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
      // Check system preference and set up listener for changes
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
      const applySystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        const systemTheme = e.matches ? 'dark' : 'light'
        root.classList.add(systemTheme)
      }
      
      // Apply initial system theme
      applySystemTheme(systemPreference)
      
      // Listen for system theme changes
      systemPreference.addEventListener('change', applySystemTheme)
      
      // Cleanup listener
      return () => systemPreference.removeEventListener('change', applySystemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <div className={inter.className}>
      {children}
    </div>
  )
} 