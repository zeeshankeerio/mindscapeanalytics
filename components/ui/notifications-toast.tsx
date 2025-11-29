import { useNotifications } from "@/providers/notifications-context"

export function NotificationsToast() {
  const { notifications, removeNotification } = useNotifications()

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col gap-2 overflow-hidden">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`animate-slide-in flex w-full items-start gap-2 rounded-lg border p-4 shadow-sm ${
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
            aria-label="Close notification"
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
  )
} 