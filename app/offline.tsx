"use client"

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export default function Offline() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-black">
      <div className="w-24 h-24 mb-8 relative">
        <Image 
          src="/icon.png" 
          alt="Mindscape Logo" 
          fill 
          className="object-contain" 
          priority
        />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
        You're offline
      </h1>
      
      <p className="text-white/70 text-center max-w-md mb-8">
        The content you're trying to access is not available offline. Please check your connection and try again.
      </p>
      
      <Button 
        onClick={() => window.location.reload()} 
        className="flex items-center space-x-2 bg-primary"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        <span>Retry</span>
      </Button>
      
      <div className="mt-12 text-white/50 text-sm text-center">
        <p>Mindscape Analytics</p>
        <p className="mt-1">Some features may be limited while offline</p>
      </div>
    </div>
  )
} 