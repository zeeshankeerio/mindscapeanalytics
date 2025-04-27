"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        // Move faster at the beginning, slower toward the end
        const increment = Math.max(1, 10 - Math.floor(prev / 10))
        const newProgress = prev + increment
        
        if (newProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return newProgress
      })
    }, 150)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-50">
      <div className="flex flex-col items-center max-w-md text-center px-4">
    <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
          className="mb-8"
    >
          <div className="flex items-center justify-center">
            <svg 
              width="60" 
              height="60" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-500"
            >
              <path 
                d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 5V3" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M19 12H21" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 19V21" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M3 12H5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-white">Loading Dashboard</h2>
          <p className="text-white/70 text-sm">
            Preparing your AI workspace...
          </p>
        </motion.div>
        
          <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full mt-8"
        >
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
          />
        </div>
          <div className="flex justify-between mt-2 text-xs text-white/60">
            <span>Initializing</span>
            <span>{progress}%</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 