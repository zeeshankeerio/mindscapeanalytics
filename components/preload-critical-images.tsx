"use client"

import { useEffect } from 'react'

// List of critical images that should be preloaded
// These are typically above-the-fold images on key pages
const CRITICAL_IMAGES = [
  // Homepage critical images
  '/images/brain.svg',
  
  // Very important images
  '/images/optimized/founder-reduced.webp', // Optimized version of founder image
  
  // Logos and brand images
  '/images/optimized/logo-original.webp',
  
  // Icons that appear on every page
  '/icons/icon-192x192.png',
  
  // Add other critical path images here
]

/**
 * Preloads critical images as soon as the component mounts
 * This should be included in the RootLayout or on specific pages where
 * immediate image loading is crucial for user experience
 */
export default function PreloadCriticalImages() {
  useEffect(() => {
    // Don't run during SSR
    if (typeof window === 'undefined') return

    // Function to preload an image by creating a hidden Image element
    const preloadImage = (src: string) => {
      const img = new Image()
      img.src = src
      // No need to append to DOM, browser will cache the image
    }

    // Preload images with requestIdleCallback for better performance
    // This defers the preloading until the browser is idle
    if ('requestIdleCallback' in window) {
      // Give browser 2 seconds to preload images during idle time
      (window as any).requestIdleCallback(
        () => {
          CRITICAL_IMAGES.forEach(preloadImage)
        },
        { timeout: 2000 }
      )
    } else {
      // Fallback for browsers without requestIdleCallback
      // Use setTimeout to defer loading slightly
      setTimeout(() => {
        CRITICAL_IMAGES.forEach(preloadImage)
      }, 300)
    }
  }, [])

  // This component doesn't render anything
  return null
} 