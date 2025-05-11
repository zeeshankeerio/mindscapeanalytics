"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Keep track of the previous path to detect navigation direction
let previousPath = ""

export function NavigationEvents() {
  const pathname = usePathname()

  useEffect(() => {
    // Skip the initial render
    if (previousPath === "") {
      previousPath = pathname || ""
      return
    }

    // Store the current path in history state for reference during popstate events
    if (typeof window !== 'undefined' && window.history.state) {
      const newState = { ...window.history.state, previousPath }
      window.history.replaceState(newState, "", window.location.href)
    }
    
    // Check if we are coming back from founder page
    const isFromFounderPage = previousPath?.includes('/founder') && pathname === '/'
    
    // Special case: coming back from founder's page to home
    if (isFromFounderPage) {
      // When going back from founder to home, we don't show loading
      console.log("Navigation: Back from founder to home - no loading")
    } 
    
    // Update the previous path for next navigation
    previousPath = pathname || ""
  }, [pathname])

  return null
}