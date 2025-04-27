"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type DashboardTheme = 'light' | 'dark' | 'system'
export type ViewLayout = 'grid' | 'list'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timestamp: Date
  read: boolean
}

// Mock user for development without authentication
export const mockUser = {
  id: "dev-user",
  name: "Developer",
  email: "dev@example.com",
  role: "ADMIN"
}

// Add the avatar property to the User type
export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface DashboardContextType {
  // User Auth
  user: User
  
  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  sidebarAnimating: boolean
  toggleSidebar: () => void
  theme: DashboardTheme
  setTheme: (theme: DashboardTheme) => void
  
  // User Preferences
  viewLayout: ViewLayout
  setViewLayout: (layout: ViewLayout) => void
  
  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  removeNotification: (id: string) => void
  unreadNotificationsCount: number
  
  // Loading States
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // User Session
  refreshUserSession: () => Promise<void>
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarAnimating, setSidebarAnimating] = useState(false)
  const [theme, setTheme] = useState<DashboardTheme>('dark')
  
  // Toggle sidebar function with animation state
  const toggleSidebar = () => {
    setSidebarAnimating(true)
    setSidebarOpen(prev => !prev)
    // Reset animation state after animation completes
    setTimeout(() => setSidebarAnimating(false), 300)
  }
  
  // User Preferences
  const [viewLayout, setViewLayout] = useState<ViewLayout>('grid')
  
  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  // Loading State
  const [isLoading, setIsLoading] = useState(false)
  
  // Calculate unread notifications count
  const unreadNotificationsCount = notifications.filter(n => !n.read).length
  
  // Load saved preferences from localStorage on mount
  useEffect(() => {
    try {
      // Get sidebar state from localStorage
      const savedSidebarState = localStorage.getItem('dashboardSidebarOpen')
      if (savedSidebarState !== null) {
        setSidebarOpen(savedSidebarState === 'true')
      }
      
      // Get theme from localStorage
      const savedTheme = localStorage.getItem('dashboardTheme') as DashboardTheme
      if (savedTheme) {
        setTheme(savedTheme)
      }
      
      // Get layout from localStorage
      const savedLayout = localStorage.getItem('dashboardViewLayout') as ViewLayout
      if (savedLayout) {
        setViewLayout(savedLayout)
      }
      
      // Load saved notifications
      const savedNotifications = localStorage.getItem('dashboardNotifications')
      if (savedNotifications) {
        try {
          setNotifications(JSON.parse(savedNotifications))
        } catch (error) {
          console.error('Failed to parse saved notifications', error)
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage', error)
    }
  }, [])
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('dashboardSidebarOpen', String(sidebarOpen))
    } catch (error) {
      console.error('Error saving sidebar state to localStorage', error)
    }
  }, [sidebarOpen])
  
  useEffect(() => {
    try {
      localStorage.setItem('dashboardTheme', theme)
    } catch (error) {
      console.error('Error saving theme to localStorage', error)
    }
  }, [theme])
  
  useEffect(() => {
    try {
      localStorage.setItem('dashboardViewLayout', viewLayout)
    } catch (error) {
      console.error('Error saving view layout to localStorage', error)
    }
  }, [viewLayout])
  
  useEffect(() => {
    try {
      localStorage.setItem('dashboardNotifications', JSON.stringify(notifications))
    } catch (error) {
      console.error('Error saving notifications to localStorage', error)
    }
  }, [notifications])
  
  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false
    }
    
    setNotifications(prev => [newNotification, ...prev])
  }
  
  // Mark a notification as read
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }
  
  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }
  
  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }
  
  // Refresh user session
  const refreshUserSession = async () => {
    // This would be implemented with your auth provider
    // For now it's just a placeholder
    return Promise.resolve()
  }
  
  // Update the default user with the avatar property
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Admin User",
    email: "admin@mindscape.ai",
    role: "ADMIN",
    avatar: "/images/avatars/default.png"
  })
  
  return (
    <DashboardContext.Provider
      value={{
        user,
        sidebarOpen,
        setSidebarOpen,
        sidebarAnimating,
        toggleSidebar,
        theme,
        setTheme,
        viewLayout,
        setViewLayout,
        notifications,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        removeNotification,
        unreadNotificationsCount,
        isLoading,
        setIsLoading,
        refreshUserSession
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider. Make sure you have wrapped your component with DashboardProvider.')
  }
  return context
} 