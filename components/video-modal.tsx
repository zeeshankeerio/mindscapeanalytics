"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title?: string
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setError(null)
    }
  }, [isOpen])

  // Handle video events
  const handleVideoLoadStart = () => {
    setIsLoading(true)
    setError(null)
  }

  const handleVideoCanPlay = () => {
    setIsLoading(false)
  }

  const handleVideoError = () => {
    setIsLoading(false)
    setError("Failed to load video. Please try again later.")
  }

  const handleVideoEnded = () => {
    onClose()
  }

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label={title || "Video player"}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video"
            onClick={e => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <p className="text-white mb-4">{error}</p>
                  <Button onClick={onClose} variant="outline" className="text-white">
                    Close
                  </Button>
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover rounded-lg"
              controls
              onLoadStart={handleVideoLoadStart}
              onCanPlay={handleVideoCanPlay}
              onError={handleVideoError}
              onEnded={handleVideoEnded}
            />
            <button
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70"
              onClick={onClose}
              aria-label="Close video"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 