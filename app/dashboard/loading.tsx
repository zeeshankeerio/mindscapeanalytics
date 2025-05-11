"use client"

import { motion } from "framer-motion"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"
import { Icons } from "@/components/icons"

export default function DashboardLoading() {
  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <DashboardSkeleton />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center px-10 py-16 backdrop-blur-sm bg-black/40 rounded-lg border border-white/5">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="mb-6"
        >
          <Icons.logo className="h-12 w-12 text-primary" />
        </motion.div>
        
        <h2 className="text-2xl font-bold mb-2">Loading Dashboard</h2>
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          Preparing your AI-powered analytics and insights...
        </p>
        
        <div className="w-full max-w-md">
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: i * 0.2,
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 0.5
                }}
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                style={{ 
                  transformOrigin: "0% 50%",
                  width: `${100 - i * 15}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

