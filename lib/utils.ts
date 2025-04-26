import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Navigation helper for contact form
export function navigateToContactForm(p0: string, p1: string) {
  const contactForm = document.getElementById('contact-form')
  if (contactForm) {
    contactForm.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.location.href = '/contact'
  }
}

/**
 * Utility functions for performance optimization
 */

// Performance measurement - use this to time critical operations
export function measurePerformance<T>(fn: () => T, label: string): T {
  if (process.env.NODE_ENV === 'development') {
    console.time(label)
    const result = fn()
    console.timeEnd(label)
    return result
  }
  return fn()
}

// Create a requestIdleCallback polyfill
export const requestIdleCallback = 
  typeof window !== 'undefined'
    ? window.requestIdleCallback || 
      ((cb) => {
        const start = Date.now()
        return setTimeout(() => {
          cb({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
          })
        }, 1)
      })
    : null

// Cancel idle callback polyfill
export const cancelIdleCallback = 
  typeof window !== 'undefined'
    ? window.cancelIdleCallback || 
      ((id) => clearTimeout(id))
    : null

// Lazy load a component when it's near the viewport
export function whenInViewport(element: HTMLElement, callback: () => void): () => void {
  // If IntersectionObserver is not available, execute immediately
  if (typeof IntersectionObserver !== 'function') {
    callback()
    return () => {}
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      callback()
      observer.disconnect()
    }
  }, { rootMargin: '200px' }) // Load when within 200px of viewport

  observer.observe(element)
  
  // Return cleanup function
  return () => observer.disconnect()
}

// Prefetch a page when the user hovers over a link
export function prefetchOnHover(path: string): void {
  if (typeof window === 'undefined') return

  const prefetcher = document.createElement('link')
  prefetcher.rel = 'prefetch'
  prefetcher.href = path
  prefetcher.as = 'document'
  
  document.head.appendChild(prefetcher)
  
  // Remove after 5 seconds to free up memory if not used
  setTimeout(() => {
    prefetcher.remove()
  }, 5000)
}

// Lazy load images that aren't visible
export function lazyLoadBackgroundImage(
  element: HTMLElement, 
  url: string
): () => void {
  const loader = new Image()
  loader.onload = () => {
    if (element) {
      element.style.backgroundImage = `url(${url})`
      element.style.opacity = '1'
    }
  }
  
  if (typeof IntersectionObserver === 'function') {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loader.src = url
        observer.disconnect()
      }
    }, { rootMargin: '200px' })
    
    observer.observe(element)
    return () => observer.disconnect()
  } else {
    // Fallback
    loader.src = url
    return () => {}
  }
}
