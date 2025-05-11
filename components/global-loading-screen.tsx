"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

interface GlobalLoadingScreenProps {
  disableOnPaths?: string[] // Paths where loading screen should be disabled
}

export function GlobalLoadingScreen({ disableOnPaths = ["/dashboard"] }: GlobalLoadingScreenProps) {
  const [loading, setLoading] = useState(true)
  const [imagesPreloaded, setImagesPreloaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Initial page load effect
  useEffect(() => {
    // Check if we should disable the loader on this path
    const shouldDisable = disableOnPaths.some(path => pathname?.startsWith(path))
    
    if (shouldDisable) {
      setLoading(false)
      return
    }
    
    const preloadImages = async () => {
      // Key images that should be preloaded before showing content
      const criticalImages = [
        '/images/logo.png',
        '/images/brain.svg',
        '/images/optimized/founder-reduced.webp'
      ];
      
      try {
        // Create an array of promises for loading each image
        const imagePromises = criticalImages.map(src => {
          return new Promise((resolve, reject) => {
            const img = new globalThis.Image();
            img.onload = () => resolve(src);
            img.onerror = () => resolve(src); // Still proceed even if an image fails
            img.src = src;
          });
        });
        
        // Progress simulation for loading
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress > 90) {
            clearInterval(progressInterval);
            progress = 90; // Max before complete
          }
          setLoadingProgress(Math.min(progress, 90));
        }, 200);
        
        // Wait for all images to be loaded
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
        setLoadingProgress(100);
        clearInterval(progressInterval);
        
        // Hide loading screen after preloading is complete plus a small delay
        setTimeout(() => {
          setLoading(false)
        }, 800);
      } catch (error) {
        console.error('Error preloading images:', error);
        setLoadingProgress(100);
        setLoading(false);
      }
    };

    // Set up the event listener for when the DOM is fully loaded
    const handleLoad = () => {
      // Preload images before hiding the loading screen
      preloadImages();
    }

    // If document is already loaded, trigger the handler
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      
      // Fallback timer in case the load event doesn't fire
      const timer = setTimeout(() => {
        if (!imagesPreloaded) {
          preloadImages();
        }
      }, 2000)
      
      return () => {
        window.removeEventListener("load", handleLoad)
        clearTimeout(timer)
      }
    }
  }, [disableOnPaths, pathname, imagesPreloaded])

  // Navigation event listener for page transitions
  useEffect(() => {
    // Function to determine whether to show loading on navigation
    const shouldShowLoading = (from: string, to: string) => {
      // Show loading screen when navigating back to home from any page except dashboard
      const isNavigatingToHome = to === '/';
      const isFromDashboard = from.startsWith('/dashboard');
      
      return isNavigatingToHome && !isFromDashboard;
    };
    
    // Create a global state variable to track if we're navigating between pages
    if (typeof window !== 'undefined') {
      window.__isNavigating = false;
    }
    
    // Store current pathname for comparison
    let previousPath = pathname || '';
    
    // Function to handle navigation start
    const handleNavigationStart = (url: string) => {
      // Only show loading when needed
      if (shouldShowLoading(previousPath, url)) {
        setIsNavigating(true);
        setLoading(true);
        // Reset loading progress for navigation events
        setLoadingProgress(0);
        
        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress > 90) {
            clearInterval(progressInterval);
            progress = 90; // Max before complete
          }
          setLoadingProgress(Math.min(progress, 90));
        }, 200);
        
        // Store interval for cleanup
        window.__loadingProgressInterval = progressInterval;
      }
    };
    
    // Function to handle navigation end
    const handleNavigationEnd = () => {
      // Update previous path for next navigation
      previousPath = window.location.pathname;
      
      // Clear any running intervals
      if (window.__loadingProgressInterval) {
        clearInterval(window.__loadingProgressInterval);
        delete window.__loadingProgressInterval;
      }
      
      // Complete the loading progress
      setLoadingProgress(100);
      
      // Hide loading screen after a short delay
      setTimeout(() => {
        setIsNavigating(false);
        setLoading(false);
      }, 500);
    };
    
    // Listen for popstate (back/forward navigation)
    const handlePopState = (e: PopStateEvent) => {
      const currentPath = window.location.pathname;
      if (shouldShowLoading(previousPath, currentPath)) {
        setIsNavigating(true);
        setLoading(true);
        
        // Reset and simulate loading progress
        setLoadingProgress(0);
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress > 90) {
            clearInterval(progressInterval);
            progress = 90;
          }
          setLoadingProgress(Math.min(progress, 90));
        }, 200);
        
        // Store interval for cleanup
        window.__loadingProgressInterval = progressInterval;
        
        setTimeout(() => {
          // Clear interval and complete progress
          if (window.__loadingProgressInterval) {
            clearInterval(window.__loadingProgressInterval);
            delete window.__loadingProgressInterval;
          }
          setLoadingProgress(100);
          
          // Hide loading screen
          setTimeout(() => {
            setIsNavigating(false);
            setLoading(false);
          }, 500);
        }, 1000);
      }
    };
    
    // Listen for page navigation events
    window.addEventListener('popstate', handlePopState);
    
    // Setup route change monitoring
    let originalPushState: History['pushState'];
    if (typeof window !== 'undefined') {
      originalPushState = window.history.pushState;
      window.history.pushState = function(...args) {
        const result = originalPushState.apply(this, args);
        handleNavigationStart(args[2] as string);
        setTimeout(handleNavigationEnd, 1000);
        return result;
      };
    }
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      
      // Clear any running intervals
      if (typeof window !== 'undefined' && window.__loadingProgressInterval) {
        clearInterval(window.__loadingProgressInterval);
        delete window.__loadingProgressInterval;
      }
      
      // Restore original pushState
      if (typeof window !== 'undefined' && originalPushState) {
        window.history.pushState = originalPushState;
      }
    };
  }, [pathname, router]);

  // Skip rendering if it should be disabled on this path
  if (disableOnPaths.some(path => pathname?.startsWith(path)) && !isNavigating) {
    return null;
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
        >
          <div className="flex flex-col items-center justify-center w-[90%] sm:w-full max-w-md px-4">
            {/* Brain Logo from HyperHero */}
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute inset-0 bg-black/20 blur-[180px] rounded-full transform scale-[2]" />
              
              {/* Logo and text container */}
              <div className="relative flex flex-col items-center">
                {/* Brain icon with glow */}
                <div className="relative scale-[1.2] sm:scale-[1.35] md:scale-[1.6]">
                  {/* Multiple layered glows */}
                  <div className="absolute inset-0 bg-red-900/10 blur-[50px] rounded-[20px] animate-pulse-slow scale-110" />
                  <div className="absolute inset-0 bg-red-800/20 blur-[40px] rounded-[20px] animate-pulse-medium scale-110" />
                  <div className="absolute inset-0 bg-red-700/30 blur-[30px] rounded-[20px] animate-pulse-fast scale-110" />
                  
                  {/* Neural network lines */}
                  <div className="absolute inset-0 opacity-50 scale-[1.2]">
                    <div className="absolute h-[1px] w-10 bg-gradient-to-r from-transparent via-red-800 to-transparent top-1/4 -left-4 animate-neural-1" />
                    <div className="absolute h-[1px] w-10 bg-gradient-to-r from-transparent via-red-800 to-transparent bottom-1/4 -right-4 animate-neural-2" />
                    <div className="absolute w-[1px] h-10 bg-gradient-to-b from-transparent via-red-800 to-transparent -top-4 left-1/4 animate-neural-3" />
                    <div className="absolute w-[1px] h-10 bg-gradient-to-b from-transparent via-red-800 to-transparent -bottom-4 right-1/4 animate-neural-4" />
                  </div>

                  {/* Enhanced Brain icon with RGB border */}
                  <div className="relative z-10 group animate-heartbeat">
                    {/* RGB Border Container */}
                    <div className="absolute -inset-[2px] rounded-[20px]">
                      {/* Moving RGB gradient border */}
                      <div className="absolute inset-[-2px] rounded-[20px] animate-rgb-spin group-hover:animate-rgb-spin-fast">
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)] rounded-[20px] group-hover:bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)]" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-[20px] animate-border-flow group-hover:animate-border-flow-fast" />
                      <div className="absolute inset-0 rounded-[20px] bg-black/95">
                        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#8B000030] via-[#42000030] to-[#69000030] animate-rgb-spin-reverse group-hover:animate-rgb-spin-reverse-fast group-hover:from-[#8B000050] group-hover:via-[#42000050] group-hover:to-[#69000050]" />
                      </div>
                    </div>
                    
                    {/* Icon container */}
                    <div className="relative bg-black rounded-[20px] p-6 sm:p-9 transition-transform duration-300 group-hover:scale-[0.98]">
                      <div className="absolute inset-0 bg-red-900/10 rounded-[20px] blur-[10px] animate-pulse"></div>
                      <Image 
                        src="/images/brain.svg" 
                        alt="Mindscape Brain Logo"
                        className="h-20 w-20 sm:h-28 sm:w-28 transform transition-all duration-300 group-hover:scale-[0.98] animate-brain-pulse-enhanced animate-blink relative z-10"
                        width={112}
                        height={112}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mindscape Analytics Text */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-[82px] mb-12 text-center"
            >
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80 [text-shadow:_0_2px_20px_rgb(255,255,255_/_20%)]">
                  Mindscape
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500/80 via-red-400 to-red-500/80 ml-2">
                  Analytics
                </span>
              </h1>
              <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2 font-light">Where AI Meets Innovation</p>
            </motion.div>
            
            {/* Enhanced Loading Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <span className="text-[10px] sm:text-xs text-white/60">
                  {imagesPreloaded ? "Initializing..." : "Loading resources..."}
                </span>
                <span className="text-[10px] sm:text-xs text-white/60 font-mono">
                  {Math.round(loadingProgress)}%
                </span>
              </div>
              
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-glow-sm shadow-red-600/30"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {/* Small pulsing indicators */}
              <div className="flex justify-between mt-4">
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"
                      style={{ 
                        animationDelay: `${i * 0.3}s`,
                        opacity: loadingProgress < 100 ? 0.6 : 0,
                        transition: 'opacity 0.3s ease-in-out' 
                      }}
                    />
                  ))}
                </div>
                {loadingProgress >= 100 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs text-white/80 flex items-center"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                    Ready
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Add TypeScript declaration to allow our custom property on window
declare global {
  interface Window {
    __isNavigating?: boolean;
    __loadingProgressInterval?: NodeJS.Timeout;
  }
} 