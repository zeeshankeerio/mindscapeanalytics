"use client";

import React from "react";
import { XCircle, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cva } from "class-variance-authority";
import { useNotifications, Notification, NotificationType } from "@/providers/notifications-provider";

const notificationVariants = cva(
  "fixed z-50 p-4 rounded-lg shadow-lg flex items-start gap-3 border animate-slide-in",
  {
    variants: {
      type: {
        success: "bg-green-50 border-green-200 text-green-800",
        error: "bg-red-50 border-red-200 text-red-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        info: "bg-blue-50 border-blue-200 text-blue-800",
      },
      position: {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4", 
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
      },
    },
    defaultVariants: {
      type: "info",
      position: "top-right",
    },
  }
);

const iconMap: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

function NotificationItem({ notification }: { notification: Notification }) {
  const { removeNotification } = useNotifications();
  
  return (
    <div 
      className={notificationVariants({ type: notification.type })}
      role="alert"
    >
      <div className="flex-shrink-0">
        {iconMap[notification.type]}
      </div>
      <div className="flex-1">
        {notification.title && (
          <h3 className="font-medium">{notification.title}</h3>
        )}
        <p className="text-sm mt-1">{notification.message}</p>
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className="flex-shrink-0 ml-2 text-gray-500 hover:text-gray-700"
        aria-label="Close notification"
      >
        <XCircle className="h-5 w-5" />
      </button>
    </div>
  );
}

export function NotificationsContainer({ 
  position = "top-right"
}: { 
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" 
}) {
  const { notifications } = useNotifications();
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="fixed z-50 space-y-2" style={{ 
      top: position.startsWith("top") ? "1rem" : "auto",
      bottom: position.startsWith("bottom") ? "1rem" : "auto",
      right: position.endsWith("right") ? "1rem" : "auto",
      left: position.endsWith("left") ? "1rem" : "auto",
    }}>
      {notifications.map((notification) => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
        />
      ))}
    </div>
  );
} 