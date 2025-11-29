import { useState, useEffect } from 'react'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import { AlertCircle, CheckCircle2, Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NetworkStatusProps {
  className?: string
}

export function NetworkStatus({ className }: NetworkStatusProps) {
  const { online, effectiveConnectionType } = useNetworkStatus()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  
  // Only show the offline warning after a delay to avoid flashing on quick disconnections
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    
    if (!online) {
      timeoutId = setTimeout(() => {
        setVisible(true)
        setDismissed(false)
      }, 2000)
    } else {
      // When coming back online, show the indicator briefly then hide it
      setVisible(true)
      setDismissed(false)
      timeoutId = setTimeout(() => {
        setVisible(false)
      }, 3000)
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [online])
  
  // Don't render if we're online and the notification is no longer visible
  if ((online && !visible) || dismissed) {
    return null
  }
  
  return (
    <div 
      className={cn(
        "fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg px-3 py-2 text-sm shadow-lg transition-opacity",
        online 
          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
          : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
        className
      )}
    >
      {online ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          <span>Back online</span>
          <div className="ml-2 text-xs opacity-70">
            {effectiveConnectionType && `(${effectiveConnectionType})`}
          </div>
        </>
      ) : (
        <>
          <AlertCircle className="h-4 w-4" />
          <span>You're offline</span>
          <button 
            onClick={() => setDismissed(true)}
            className="ml-2 rounded-md p-1 text-xs opacity-70 hover:bg-black/10 hover:opacity-100"
          >
            Dismiss
          </button>
        </>
      )}
    </div>
  )
} 