"use client"

import { cn } from "@/lib/utils"

interface MindscapeBrainLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "icon-only"
  showTagline?: boolean
}

export default function MindscapeBrainLogo({ 
  className = "", 
  size = "md",
  variant = "default",
  showTagline = true 
}: MindscapeBrainLogoProps) {
  // Define sizing variations
  const sizes = {
    sm: {
      container: "h-8",
      iconSize: 30,
      borderWidth: 1.5,
      titleSize: "text-xs",
      taglineSize: "text-[10px]"
    },
    md: {
      container: "h-10",
      iconSize: 40,
      borderWidth: 1.5,
      titleSize: "text-base",
      taglineSize: "text-xs"
    },
    lg: {
      container: "h-12",
      iconSize: 48,
      borderWidth: 1.5,
      titleSize: "text-lg",
      taglineSize: "text-xs"
    },
    xl: {
      container: "h-16",
      iconSize: 64,
      borderWidth: 2,
      titleSize: "text-xl",
      taglineSize: "text-sm"
    }
  }

  const currentSize = sizes[size]
  
  const iconOnly = (
    <div 
      className="relative flex items-center justify-center overflow-hidden bg-black"
      style={{ 
        width: currentSize.iconSize, 
        height: currentSize.iconSize,
        borderRadius: 8,
      }}
    >
      {/* Brain Icon */}
      <svg
        width="90%"
        height="90%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brain-inspired logo with connections */}
        <rect width="24" height="24" rx="6" fill="#D10000" fillOpacity="0.1" />

        {/* Main brain shape */}
        <path
          d="M12 3.75C7.85786 3.75 4.5 7.10786 4.5 11.25C4.5 15.3921 7.85786 18.75 12 18.75C16.1421 18.75 19.5 15.3921 19.5 11.25C19.5 7.10786 16.1421 3.75 12 3.75Z"
          stroke="#D10000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neural network connections */}
        <path
          d="M9 7.5L12 11.25L15 7.5M9 15L12 11.25L15 15M7.5 11.25H16.5"
          stroke="#D10000"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central node */}
        <circle cx="12" cy="11.25" r="1.5" fill="#D10000" />

        {/* Outer nodes */}
        <circle cx="7.5" cy="11.25" r="1.1" fill="#B00000" />
        <circle cx="16.5" cy="11.25" r="1.1" fill="#B00000" />
        <circle cx="9" cy="7.5" r="1.1" fill="#B00000" />
        <circle cx="15" cy="7.5" r="1.1" fill="#B00000" />
        <circle cx="9" cy="15" r="1.1" fill="#B00000" />
        <circle cx="15" cy="15" r="1.1" fill="#B00000" />
      </svg>
    </div>
  );

  if (variant === "icon-only") {
    return iconOnly;
  }

  return (
    <div className={cn(
      "flex items-center", 
      currentSize.container,
      className
    )}>
      {iconOnly}
      
      <div className="flex flex-col ml-3">
        <span className={cn(
          "font-bold tracking-tight font-sans whitespace-nowrap mt-1.5",
          currentSize.titleSize
        )}>
          <span className="text-white">Mindscape</span>
          <span className="text-red-500 ml-2">Analytics</span>
        </span>
        
        {showTagline && (
          <span className={cn(
            "text-gray-300 font-light tracking-wide mt-1",
            currentSize.taglineSize
          )}>
            Where AI Meets Innovation
          </span>
        )}
      </div>
    </div>
  )
}