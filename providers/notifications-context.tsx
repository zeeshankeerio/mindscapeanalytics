import { createContext, useContext, useState, ReactNode } from "react"

type NotificationType = "success" | "error" | "warning" | "info"

interface Notification {
  id: string
  type: NotificationType
  message: string
  title?: string
  duration?: number
}

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

interface NotificationsProviderProps {
  children: ReactNode
}

export function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newNotification = { ...notification, id }
    
    setNotifications((prev) => [...prev, newNotification])
    
    // Auto remove notifications after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col gap-2 overflow-hidden">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex w-full items-start gap-2 rounded-lg border p-4 shadow-sm ${
                notification.type === "error"
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : notification.type === "warning"
                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-600"
                  : notification.type === "success"
                  ? "border-green-500 bg-green-500/10 text-green-600"
                  : "border-blue-500 bg-blue-500/10 text-blue-600"
              }`}
            >
              <div className="flex-1">
                {notification.title && <p className="font-medium">{notification.title}</p>}
                <p className="text-sm">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="rounded-full p-1 hover:bg-background/20"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </NotificationsContext.Provider>
  )
} 