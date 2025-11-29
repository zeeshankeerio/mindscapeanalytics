"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-r from-red-600 to-red-500 text-white py-2 px-4 text-center overflow-hidden"
        >
          <div className="container mx-auto flex items-center justify-center gap-2">
            <Megaphone className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm font-medium">
              New AI model released! Try our GPT-4o integration with 99.8% accuracy.{" "}
              <a href="#" className="underline font-bold hover:text-white/90">
                Learn more
              </a>
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

