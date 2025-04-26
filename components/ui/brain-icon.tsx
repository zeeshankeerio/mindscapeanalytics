"use client"

import { cn } from "@/lib/utils"

interface BrainIconProps {
  className?: string
  size?: number
  color?: string
  secondaryColor?: string
  variant?: "default" | "simple" | "animated"
  animateConnections?: boolean
  style?: React.CSSProperties
}

export function BrainIcon({
  className = "",
  size = 32,
  color = "#D10000",
  secondaryColor = "#B00000",
  variant = "default",
  animateConnections = false,
  style = {}
}: BrainIconProps) {
  // Lighten primary color for the background fill
  const bgColor = `${color}1A` // 10% opacity version of the color

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={style}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "relative z-10", 
          animateConnections && "animate-pulse-slow"
        )}
      >
        {/* Background rectangle with rounded corners */}
        <rect width="24" height="24" rx="6" fill={bgColor} />

        {/* Main brain shape - circular outline */}
        <path
          d="M12 3.75C7.85786 3.75 4.5 7.10786 4.5 11.25C4.5 15.3921 7.85786 18.75 12 18.75C16.1421 18.75 19.5 15.3921 19.5 11.25C19.5 7.10786 16.1421 3.75 12 3.75Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neural network connections */}
        <path
          d="M9 7.5L12 11.25L15 7.5M9 15L12 11.25L15 15M7.5 11.25H16.5"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animateConnections ? "animate-pulse-medium" : ""}
        />

        {/* Central node */}
        <circle cx="12" cy="11.25" r="1.5" fill={color} />

        {/* Outer nodes */}
        <circle cx="7.5" cy="11.25" r="1.1" fill={secondaryColor} />
        <circle cx="16.5" cy="11.25" r="1.1" fill={secondaryColor} />
        <circle cx="9" cy="7.5" r="1.1" fill={secondaryColor} />
        <circle cx="15" cy="7.5" r="1.1" fill={secondaryColor} />
        <circle cx="9" cy="15" r="1.1" fill={secondaryColor} />
        <circle cx="15" cy="15" r="1.1" fill={secondaryColor} />
      </svg>
      
      {/* Optional subtle glow effect for the animated variant */}
      {variant === "animated" && (
        <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full w-1/2 h-1/2 mx-auto my-auto animate-pulse-slow"></div>
      )}
    </div>
  )
} 