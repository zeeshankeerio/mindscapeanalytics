"use client"

import { useEffect, useState, useCallback, memo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Memoize the loading components for better performance
const BrainLogo = memo(() => (
  <div className="relative flex flex-col items-center">
    <div className="flex items-center gap-4 group">
      {/* Brain icon container with animated glow effects */}
      <div className="relative">
        {/* Outer glow effect - pulsing */}
        <motion.div 
          className="absolute -inset-2 bg-red-800/20 blur-lg rounded-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        
        {/* Main container */}
        <div className="relative z-10 group">
          {/* Border glow container - pulsing */}
          <motion.div 
            className="absolute -inset-[1.5px] rounded-2xl"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-red-700 rounded-2xl opacity-90"></div>
          </motion.div>
          
          {/* Icon container */}
          <div className="relative bg-black rounded-2xl p-3">
            <Image 
              src="/images/brain.svg" 
              alt="Mindscape Brain Logo"
              width={80}
              height={80}
              priority
              style={{
                filter: 'drop-shadow(0 0 2px #8B0000)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
    
    {/* Text part */}
    <div className="mt-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight font-sans">
        <span className="text-white">Mindscape</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700/80 via-red-600 to-red-700/80 ml-2">Analytics</span>
      </h1>
    </div>
  </div>
))

BrainLogo.displayName = 'BrainLogo'

const LoadingText = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="mt-6 text-sm text-white/70"
  >
    <motion.span
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      Loading...
    </motion.span>
  </motion.div>
))

LoadingText.displayName = 'LoadingText'

function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleStart = useCallback(() => {
    setIsLoading(true)
  }, [])

  const handleComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Add event listeners for route changes
    window.addEventListener('beforeunload', handleStart)
    window.addEventListener('load', handleComplete)

    // Add event listeners for Next.js navigation
    const handleRouteChangeStart = () => setIsLoading(true)
    const handleRouteChangeComplete = () => setIsLoading(false)

    window.addEventListener('routeChangeStart', handleRouteChangeStart)
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete)
    window.addEventListener('routeChangeError', handleRouteChangeComplete)

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('load', handleComplete)
      window.removeEventListener('routeChangeStart', handleRouteChangeStart)
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete)
      window.removeEventListener('routeChangeError', handleRouteChangeComplete)
    }
  }, [handleStart, handleComplete])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm will-change-opacity"
        >
          <div className="relative flex flex-col items-center">
            <BrainLogo />
            <LoadingText />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default memo(LoadingOverlay) 