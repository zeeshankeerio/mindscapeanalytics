"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error boundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-red-500">
            Something went wrong
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button
            variant="outline"
            className="mt-4 border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20"
            onClick={() => {
              this.setState({ hasError: false })
              window.location.reload()
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

