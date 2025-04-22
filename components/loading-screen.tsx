import React from "react"
import { motion } from "framer-motion"
import { Brain } from "lucide-react"

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      aria-live="polite"
      aria-label="Loading application"
      role="status"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-red-900/20 blur-xl rounded-full animate-pulse"></div>
          <div className="relative bg-black rounded-full p-6 border border-red-800/30">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Brain className="h-14 w-14 text-red-600" />
            </motion.div>
          </div>
        </div>
        
        <motion.h1 
          className="text-xl font-bold text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Mindscape Analytics
        </motion.h1>
        
        <div className="flex items-center gap-2 mt-2">
          <motion.div
            className="h-2 w-2 rounded-full bg-red-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-red-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.3, delay: 0.1 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-red-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4, delay: 0.2 }}
          />
        </div>
        
        <div className="sr-only">Loading application, please wait...</div>
      </div>
    </motion.div>
  )
} 