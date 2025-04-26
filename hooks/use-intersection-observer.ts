"use client"

import { useEffect, useState, useRef, RefObject } from 'react'

interface UseIntersectionObserverProps {
  ref: RefObject<Element>
  threshold?: number | number[]
  rootMargin?: string
  freezeOnceVisible?: boolean
}

/**
 * Custom hook that observes when an element enters the viewport
 */
export function useIntersectionObserver({
  ref,
  threshold = 0.1,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Don't observe if ref is not available or on SSR
    if (!ref.current || typeof IntersectionObserver === 'undefined') {
      return
    }
    
    // If we already saw it and freeze option is enabled, don't re-observe
    if (freezeOnceVisible && isIntersecting) {
      return
    }

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { 
        threshold, 
        rootMargin 
      }
    )

    observer.observe(ref.current)
    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [ref, threshold, rootMargin, freezeOnceVisible, isIntersecting])

  return isIntersecting
} 