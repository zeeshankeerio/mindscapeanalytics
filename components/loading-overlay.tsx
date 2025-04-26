"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MindscapeBrainLogo from "@/components/mindscape-brain-logo";

export default function LoadingOverlay() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulated loading progress
    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds for loading simulation
    
    // Only run if we're in the browser (not during SSR)
    if (typeof window !== 'undefined') {
      // Use RequestAnimationFrame for smoother animation
      let animationFrameId: number;
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const nextProgress = Math.min(100, (elapsed / duration) * 100);
        
        setProgress(nextProgress);
        
        if (nextProgress < 100) {
          animationFrameId = requestAnimationFrame(updateProgress);
        } else {
          // Complete loading sequence
          setTimeout(() => {
            setIsLoading(false);
            // Hide the overlay completely after exit animation
            setTimeout(() => setShowContent(true), 500);
          }, 300);
        }
      };
      
      // Start animation
      animationFrameId = requestAnimationFrame(updateProgress);
      
      // Cleanup function
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, []);

  // Don't render anything if done loading and animation complete
  if (showContent) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full border-t-2 border-r-2 border-red-500/30 animate-spin"></div>
              <div className="absolute w-20 h-20 rounded-full border-t-2 border-l-2 border-red-500/60 animate-spin-slow"></div>
              
              <div className="w-24 h-24 text-red-500 relative">
                <MindscapeBrainLogo width={96} height={96} />
              </div>
            </div>
            
            <div className="mt-8 w-64">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <div className="mt-2 text-center text-white/50 text-sm">
                Loading: {Math.round(progress)}%
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 