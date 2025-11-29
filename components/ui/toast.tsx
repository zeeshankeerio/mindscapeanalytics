"use client"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
  title: string
  description?: string
}

export function Toast({
  className,
  variant = "default",
  title,
  description,
  ...props
}: ToastProps) {
  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 min-w-[300px] rounded-md border p-4 shadow-lg",
        variant === "default" && "bg-white text-gray-900 border-gray-200",
        variant === "destructive" && "bg-red-600 text-white border-red-600",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
    </div>
  )
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 right-0 z-[100] flex w-full flex-col items-end gap-2 p-4 sm:max-w-[420px]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`w-full rounded-lg border p-4 shadow-lg ${
              toast.variant === "destructive"
                ? "border-red-500/20 bg-red-500/10 text-red-500"
                : "border-white/10 bg-black/80 backdrop-blur-md text-white"
            }`}
          >
            <div className="flex justify-between gap-2">
              <div className="flex-1">
                <div className="font-medium">{toast.title}</div>
                {toast.description && <div className="mt-1 text-sm opacity-90">{toast.description}</div>}
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md" onClick={() => dismiss(toast.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

