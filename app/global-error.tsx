"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
          <div className="max-w-md text-center">
            <h1 className="text-6xl font-bold mb-4 text-red-500">Critical Error</h1>
            <h2 className="text-2xl font-bold mb-4">Application crashed</h2>
            <p className="mb-8 text-gray-400">
              We apologize for the inconvenience. The application has encountered a critical error.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => reset()}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 