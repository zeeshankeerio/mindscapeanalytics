"use client"

import Image from 'next/image'

interface MindscapeLogoProps {
  className?: string
  variant?: "default" | "white" | "dark" | "light"
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export default function MindscapeLogo({ 
  className = "", 
  variant = "default", 
  size = "md",
  showText = true 
}: MindscapeLogoProps) {
  // Define color variations
  const colors = {
    default: {
      primary: "#8B0000", // Dark red
      secondary: "#630000", // Darker red
      text: "#FFFFFF", // White text
    },
    white: {
      primary: "#FFFFFF",
      secondary: "#F0F0F0",
      text: "#8B0000",
    },
    dark: {
      primary: "#8B0000",
      secondary: "#630000",
      text: "#1A1A1A",
    },
    light: {
      primary: "#8B0000",
      secondary: "#630000",
      text: "#000000",
    }
  }

  // Calculate sizes based on prop
  const sizes = {
    sm: {
      container: "h-6 w-auto",
      svg: { width: 24, height: 24 },
      textSize: "text-sm"
    },
    md: {
      container: "h-8 w-auto",
      svg: { width: 32, height: 32 },
      textSize: "text-lg"
    },
    lg: {
      container: "h-12 w-auto",
      svg: { width: 48, height: 48 },
      textSize: "text-2xl"
    }
  }

  const currentColors = colors[variant]
  const currentSize = sizes[size]

  return (
    <div className={`flex items-center ${currentSize.container} ${className}`}>
      <svg 
        width={currentSize.svg.width} 
        height={currentSize.svg.height} 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={showText ? "mr-2" : ""} 
        aria-hidden="true"
      >
        {/* Brain-inspired logo with connections */}
        <rect width="32" height="32" rx="8" fill={currentColors.primary} fillOpacity="0.1" />

        {/* Main brain shape */}
        <path
          d="M16 5C10.4772 5 6 9.47715 6 15C6 20.5228 10.4772 25 16 25C21.5228 25 26 20.5228 26 15C26 9.47715 21.5228 5 16 5Z"
          stroke={currentColors.primary}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neural network connections */}
        <path
          d="M12 10L16 15L20 10M12 20L16 15L20 20M10 15H22"
          stroke={currentColors.primary}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central node */}
        <circle cx="16" cy="15" r="2" fill={currentColors.primary} />

        {/* Outer nodes */}
        <circle cx="10" cy="15" r="1.5" fill={currentColors.secondary} />
        <circle cx="22" cy="15" r="1.5" fill={currentColors.secondary} />
        <circle cx="12" cy="10" r="1.5" fill={currentColors.secondary} />
        <circle cx="20" cy="10" r="1.5" fill={currentColors.secondary} />
        <circle cx="12" cy="20" r="1.5" fill={currentColors.secondary} />
        <circle cx="20" cy="20" r="1.5" fill={currentColors.secondary} />
      </svg>
      {showText && (
        <span className={`font-bold ${currentSize.textSize} tracking-tight mt-1.5`}>
          <span style={{ color: currentColors.text }}>Mindscape</span>
          <span className="ml-2" style={{ color: currentColors.primary }}>Analytics</span>
        </span>
      )}
    </div>
  )
}

