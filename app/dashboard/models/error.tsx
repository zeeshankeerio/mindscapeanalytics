"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCcw } from "lucide-react"

export default function ModelsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Models error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] px-4">
      <Card className="w-full max-w-md border-destructive/50">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">Models Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground pb-2">
          <p className="mb-2">
            {error?.message || "An unexpected error occurred while loading models."}
          </p>
          <p className="text-xs text-muted-foreground/70">
            {error?.digest ? `Error ID: ${error.digest}` : ""}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <Button 
            variant="outline" 
            onClick={reset} 
            className="w-full sm:w-auto"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/dashboard">
              Return to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 