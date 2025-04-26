"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react"
import { useDashboard } from "@/providers/dashboard-context"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function NotificationsPanel() {
  const { 
    notifications, 
    unreadNotificationsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    removeNotification 
  } = useDashboard()
  
  const [isOpen, setIsOpen] = useState(false)
  
  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const panel = document.getElementById('notifications-panel')
      const button = document.getElementById('notifications-trigger')
      
      if (
        panel && 
        !panel.contains(event.target as Node) && 
        button && 
        !button.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close notifications panel when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen])

  // Prevent scrolling when notifications panel is open on mobile
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "info":
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }
  
  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/20 hover:bg-green-500/20"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/20"
      case "error":
        return "bg-red-500/10 border-red-500/20 hover:bg-red-500/20"
      case "info":
      default:
        return "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20"
    }
  }
  
  const formatTimestamp = (timestamp: Date) => {
    // Check if it's today
    const today = new Date()
    const date = new Date(timestamp)
    
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }
    
    // Check if it's yesterday
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }
    
    // Otherwise return the full date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
           ` at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }
  
  return (
    <>
      {/* Notification trigger button */}
      <Button 
        id="notifications-trigger"
        variant="ghost" 
        size="icon" 
        className="fixed top-4 right-4 sm:right-6 z-50 bg-black/30 backdrop-blur-lg text-white/80 hover:text-white hover:bg-black/50 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications ${unreadNotificationsCount > 0 ? `(${unreadNotificationsCount} unread)` : ''}`}
      >
        <Bell className="h-5 w-5" />
        {unreadNotificationsCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-600 text-white flex items-center justify-center text-xs"
          >
            {unreadNotificationsCount}
          </Badge>
        )}
      </Button>
      
      {/* Notifications panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Semi-transparent backdrop on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 z-30"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              id="notifications-panel"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-[90%] sm:w-[380px] max-w-sm bg-black/90 backdrop-blur-xl border-l border-white/10 shadow-xl shadow-black/40"
              aria-label="Notifications panel"
              role="dialog"
              aria-modal="true"
            >
              <Card className="h-full bg-transparent border-none shadow-none rounded-none">
                <CardHeader className="border-b border-white/10 pb-4 px-3 sm:px-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                      <Bell className="h-4 w-4 text-red-500" />
                      Notifications
                      {unreadNotificationsCount > 0 && (
                        <Badge className="bg-red-600 text-white hover:bg-red-700 ml-2 text-xs">
                          {unreadNotificationsCount} new
                        </Badge>
                      )}
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsOpen(false)}
                      className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                      aria-label="Close notifications panel"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={markAllNotificationsAsRead}
                      className="text-xs border-white/20 hover:border-white/40 text-white/70 hover:text-white hover:bg-white/5"
                    >
                      Mark all as read
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm"
                      className="text-xs text-white/70 hover:text-white"
                    >
                      Clear all
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 h-[calc(100%-11rem)]">
                  {notifications.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <Bell className="h-6 w-6 text-white/20" />
                      </div>
                      <h3 className="text-lg font-medium text-white/80">No notifications</h3>
                      <p className="text-sm text-white/60 mt-1">
                        You're all caught up! New notifications will appear here.
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-full px-2">
                      <div className="space-y-2 p-3">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              "group relative rounded-lg border p-3 transition-all duration-200 ease-in-out",
                              getNotificationBgColor(notification.type),
                              notification.read ? "opacity-70" : "opacity-100"
                            )}
                            onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                            role="button"
                            tabIndex={0}
                            aria-label={`${notification.title} - ${notification.read ? 'Read' : 'Unread'}`}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                !notification.read && markNotificationAsRead(notification.id);
                              }
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p className={cn(
                                    "text-sm font-medium flex-1",
                                    notification.read ? "text-white/70" : "text-white"
                                  )}>
                                    {notification.title}
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeNotification(notification.id);
                                    }}
                                    aria-label="Delete notification"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-xs text-white/60 mb-1.5">{notification.message}</p>
                                <p className="text-xs text-white/40">
                                  {formatTimestamp(notification.timestamp)}
                                </p>
                              </div>
                            </div>
                            
                            {!notification.read && (
                              <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
                
                <CardFooter className="border-t border-white/10 py-3 px-4">
                  <Button 
                    variant="outline"
                    className="w-full border-white/20 hover:border-white/40 text-white/70 hover:text-white hover:bg-white/5"
                  >
                    View all notifications
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 