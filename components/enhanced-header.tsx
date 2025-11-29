"use client"

import MainNavigation from "@/components/main-navigation"

interface EnhancedHeaderProps {
  fullWidth?: boolean;
}

export default function EnhancedHeader({ fullWidth = true }: EnhancedHeaderProps) {
  return <MainNavigation fullWidth={true} />
}

