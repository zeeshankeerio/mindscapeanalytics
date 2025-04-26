"use client"

import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-16 w-16 relative">
          <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-red-500 animate-spin"></div>
        </div>
        <div className="text-white font-medium animate-pulse">Loading Mindscape...</div>
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-gradient-to-r from-red-500 to-red-800 w-1/3 animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(0); }
          50% { width: 50%; transform: translateX(50%); }
          100% { width: 0%; transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}

