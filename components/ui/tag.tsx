import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30",
        secondary: "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30",
        outline: "border border-white/20 bg-black/40 text-white/70 hover:bg-white/10 hover:text-white",
        ghost: "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant }), className)} {...props} />
  )
}

export { Tag, tagVariants } 