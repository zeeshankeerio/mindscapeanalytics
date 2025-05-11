"use client"

import { useEffect, useState } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener
    window.addEventListener('resize', checkIsMobile)

    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

// Alias for backward compatibility
export const useIsMobile = useMobile

