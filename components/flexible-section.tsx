"use client"

import React from 'react'
import { getContainerClasses } from '@/lib/container-utils'
import { cn } from '@/lib/utils'

interface FlexibleSectionProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  asContainer?: boolean; // Whether to apply container styles or not
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '8xl' | 'none'; // Maximum width constraint
  id?: string;
}

/**
 * A flexible section component that can be configured for different width behaviors
 */
export function FlexibleSection({
  children,
  className,
  fullWidth = true,
  noPadding = false,
  asContainer = true,
  maxWidth = 'none',
  id
}: FlexibleSectionProps) {
  
  // Always use full width without constraints
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        fullWidth ? "max-w-[100%]" : "",
        className
      )}
    >
      <div className={cn(
        asContainer ? getContainerClasses({ fullWidth, noPadding }) : "w-full",
        "w-full"
      )}>
        {children}
      </div>
    </section>
  )
} 