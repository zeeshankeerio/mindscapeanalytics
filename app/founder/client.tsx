"use client"

import { motion } from 'framer-motion'

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: [20, 0]
      }}
      transition={{ 
        duration: 0.7,
        ease: "easeOut"
      }}
      className="min-h-screen w-full overflow-x-hidden"
    >
      {children}
    </motion.div>
  )
} 