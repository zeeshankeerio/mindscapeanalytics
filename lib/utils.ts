import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Navigation helper for contact form
export function navigateToContactForm(
  interest: string = "ai-analytics", 
  subject: string = "Getting Started with Mindscape"
) {
  // Create an object with the form parameters
  const params = new URLSearchParams({
    interest,
    subject,
  }).toString()
  
  // Navigate to contact page with form params
  window.location.href = `/contact?${params}`
}
