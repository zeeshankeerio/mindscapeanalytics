"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard"
  
  useEffect(() => {
    // Auto-redirect for development (bypass authentication)
    console.log("Auto-redirecting to dashboard (development mode)")
    router.push(callbackUrl)
  }, [router, callbackUrl])
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="mb-4">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary mx-auto"></div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Development Mode</h1>
        <p className="text-muted-foreground">Auto-redirecting to dashboard...</p>
      </div>
    </div>
  )
} 