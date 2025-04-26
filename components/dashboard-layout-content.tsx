"use client"

import React from "react"
import { ThemeProvider } from "@/components/theme-provider"

interface DashboardLayoutContentProps {
  children: React.ReactNode
  inter: any // Font
}

export default function DashboardLayoutContent({ children, inter }: DashboardLayoutContentProps) {
  return (
    <body className={`${inter.className} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative min-h-screen bg-gradient-to-b from-black to-zinc-950">
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </ThemeProvider>
    </body>
  )
} 