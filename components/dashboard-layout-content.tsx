"use client"

import { useEffect } from "react"
import { NextFont } from "next/dist/compiled/@next/font"
import { useDashboard } from "@/providers/dashboard-context"
import { cn } from "@/lib/utils"

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

  // Meta viewport tag to ensure mobile optimization
  useEffect(() => {
    // Check if the viewport meta tag exists
    let viewportMeta = document.querySelector('meta[name="viewport"]')
    
    // If it doesn't exist, create it
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta')
      viewportMeta.setAttribute('name', 'viewport')
      document.head.appendChild(viewportMeta)
    }
    
    // Set appropriate values for responsive design with improved mobile handling
    viewportMeta.setAttribute(
      'content', 
      'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=0'
    )
    
    // Add touch-action styles to prevent delay on mobile
    const addMobileStyles = () => {
      let styleEl = document.getElementById('mobile-touch-styles')
      if (!styleEl) {
        styleEl = document.createElement('style')
        styleEl.id = 'mobile-touch-styles'
        styleEl.textContent = `
          * {
            -webkit-tap-highlight-color: transparent;
          }
          button, a {
            touch-action: manipulation;
          }
          .fix-ios-input {
            -webkit-transform: translateZ(0);
          }
        `
        document.head.appendChild(styleEl)
      }
    }
    
    // Add mobile styles
    addMobileStyles()
    
    // Clean up
    return () => {
      // Restore default viewport if needed
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0')
      
      // Remove mobile styles
      const styleEl = document.getElementById('mobile-touch-styles')
      if (styleEl) {
        document.head.removeChild(styleEl)
      }
    }
  }, [])

  return (
    <div className={cn(
      inter.className, 
      "w-full h-full overflow-hidden"
    )}>
      {children}
    </div>
  )
} 