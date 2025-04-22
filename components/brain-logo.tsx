"use client"

import { cn } from "@/lib/utils"

interface BrainLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  showTagline?: boolean
}

export default function BrainLogo({ 
  className = "", 
  size = "md",
  showTagline = true 
}: BrainLogoProps) {
  // Define sizing variations
  const sizes = {
    sm: {
      container: "h-8",
      logoSize: { width: 30, height: 30 },
      titleSize: "text-sm",
      taglineSize: "text-xs"
    },
    md: {
      container: "h-10",
      logoSize: { width: 36, height: 36 },
      titleSize: "text-lg",
      taglineSize: "text-xs"
    },
    lg: {
      container: "h-12",
      logoSize: { width: 44, height: 44 },
      titleSize: "text-xl",
      taglineSize: "text-sm"
    },
    xl: {
      container: "h-16",
      logoSize: { width: 56, height: 56 },
      titleSize: "text-2xl",
      taglineSize: "text-base"
    }
  }

  const currentSize = sizes[size]

  return (
    <div className={cn(
      "flex items-center", 
      currentSize.container,
      className
    )}>
      <div className="relative flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-black p-2 border border-purple-900/30 shadow-lg">
        <svg 
          width={currentSize.logoSize.width} 
          height={currentSize.logoSize.height} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Neural network brain icon with animated pulse effect */}
          <circle cx="50" cy="50" r="48" stroke="url(#brainGradient)" strokeWidth="2" fill="none" />
          
          {/* Main brain shape */}
          <path 
            d="M50 20C35 20 25 30 25 45C25 60 35 70 50 70C65 70 75 60 75 45C75 30 65 20 50 20Z" 
            stroke="url(#pulseGradient)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-pulse"
          />
          
          {/* Brain connections */}
          <path 
            d="M50 25C40 30 35 40 40 50M50 25C60 30 65 40 60 50M35 45H65M40 65C45 55 55 55 60 65" 
            stroke="#8B5CF6" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Neural nodes */}
          <circle cx="50" cy="25" r="3" fill="#C4B5FD" />
          <circle cx="35" cy="45" r="3" fill="#C4B5FD" />
          <circle cx="65" cy="45" r="3" fill="#C4B5FD" />
          <circle cx="40" cy="65" r="3" fill="#C4B5FD" />
          <circle cx="60" cy="65" r="3" fill="#C4B5FD" />
          <circle cx="50" cy="45" r="5" fill="#8B5CF6" className="animate-pulse" />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="brainGradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="pulseGradient" x1="25" y1="20" x2="75" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full w-1/2 h-1/2 mx-auto my-auto"></div>
      </div>
      
      <div className="ml-3 flex flex-col">
        <span className={cn(
          "font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 font-sans",
          currentSize.titleSize
        )}>
          NEUROSYNC
        </span>
        
        {showTagline && (
          <span className={cn(
            "text-gray-300/90 font-light italic tracking-wide",
            currentSize.taglineSize
          )}>
            Unleashing Neural Intelligence
          </span>
        )}
      </div>
    </div>
  )
} 