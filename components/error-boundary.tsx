"use client"

import React, { Component, ReactNode, ErrorInfo } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error: error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    const { onReset } = this.props
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
    if (onReset) {
      onReset()
    }
  }

  render() {
    const { children, fallback } = this.props
    const { hasError, error } = this.state

    if (hasError) {
      if (fallback) {
        return fallback
      }
      
      // Default error UI
      return (
        <div className="min-h-[300px] w-full flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-black/50 backdrop-blur-md border border-red-500/20 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <h2 className="text-lg font-semibold">Something went wrong</h2>
            </div>
            
            <p className="text-white/70 mb-4">
              {error?.message || "An unexpected error occurred. Please try again or contact support if the issue persists."}
            </p>
            
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload Page
              </Button>
              <Button onClick={this.handleReset}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return children
  }
}

