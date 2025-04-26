"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import EnhancedHeader from "@/components/enhanced-header"
import Footer from "@/components/footer"

interface RootLayoutContentProps {
  children: React.ReactNode
  inter: any // Font
}

export default function RootLayoutContent({ children, inter }: RootLayoutContentProps) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')
  const isDocs = pathname?.startsWith('/docs')
  
  // Hide footer for pages with sidebar (dashboard, docs)
  const showFooter = !isDashboard && !isDocs

  return (
    <body className={`${inter.className} antialiased`} suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative min-h-screen bg-gradient-to-b from-black to-zinc-950">
          {!isDashboard && <EnhancedHeader />}
          <div className="relative z-10">
            {children}
          </div>
          {showFooter && <Footer />}
        </div>
      </ThemeProvider>
    </body>
  )
} 