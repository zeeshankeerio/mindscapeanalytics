"use client"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

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
