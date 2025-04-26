"use client"

import { cn } from "@/lib/utils"

interface BarChartIconProps {
  className?: string
  size?: number
  color?: string
  secondaryColor?: string
  variant?: "default" | "simple" | "animated"
  animateConnections?: boolean
}

export function BarChartIcon({
  className = "",
  size = 32,
  color = "#D10000",
  secondaryColor = "#B00000",
  variant = "default",
  animateConnections = false
}: BarChartIconProps) {
  // Lighten primary color for the background fill
  const bgColor = `${color}1A` // 10% opacity version of the color

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
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

        {/* Bar chart elements */}
        <rect x="5" y="14" width="2" height="4" rx="1" fill={color} />
        <rect x="9" y="12" width="2" height="6" rx="1" fill={color} />
        <rect x="13" y="9" width="2" height="9" rx="1" fill={color} />
        <rect x="17" y="6" width="2" height="12" rx="1" fill={color} />
        
        {/* Base line */}
        <line x1="4" y1="18" x2="20" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Data points */}
        <circle cx="6" cy="14" r="1" fill={secondaryColor} />
        <circle cx="10" cy="12" r="1" fill={secondaryColor} />
        <circle cx="14" cy="9" r="1" fill={secondaryColor} />
        <circle cx="18" cy="6" r="1" fill={secondaryColor} />
      </svg>
      
      {/* Optional subtle glow effect for the animated variant */}
      {variant === "animated" && (
        <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full w-1/2 h-1/2 mx-auto my-auto animate-pulse-slow"></div>
      )}
    </div>
  )
} 