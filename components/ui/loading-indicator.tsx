"use client"

import React from "react"
import { cn } from "@/lib/utils"

type LoadingIndicatorProps = {
  size?: "sm" | "md" | "lg"
  color?: "default" | "primary" | "secondary" | "white"
  className?: string
}

export function LoadingIndicator({
  size = "md",
  color = "default",
  className,
}: LoadingIndicatorProps) {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  }

  const colorMap = {
    default: "border-gray-300 border-t-gray-800",
    primary: "border-red-300 border-t-red-700",
    secondary: "border-blue-300 border-t-blue-700",
    white: "border-white/20 border-t-white",
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "rounded-full animate-spin",
          sizeMap[size],
          colorMap[color],
          className
        )}
      />
    </div>
  )
} 