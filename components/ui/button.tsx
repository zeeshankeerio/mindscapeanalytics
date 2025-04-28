import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: 
          "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 after:absolute after:inset-0 after:z-[-1] after:opacity-0 after:transition-opacity hover:after:opacity-100 after:bg-gradient-to-r after:from-primary/90 after:to-primary",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground hover:brightness-110 hover:shadow-lg hover:shadow-destructive/20 after:absolute after:inset-0 after:z-[-1] after:opacity-0 after:transition-opacity hover:after:opacity-100 after:bg-gradient-to-r after:from-destructive/90 after:to-destructive",
        outline:
          "border border-input bg-background/30 backdrop-blur-sm hover:bg-accent/20 hover:text-accent-foreground hover:border-accent/50 hover:shadow-md hover:shadow-accent/10",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground hover:brightness-110 hover:shadow-md hover:shadow-secondary/20 after:absolute after:inset-0 after:z-[-1] after:opacity-0 after:transition-opacity hover:after:opacity-100 after:bg-gradient-to-r after:from-secondary/90 after:to-secondary",
        ghost: 
          "hover:bg-accent/20 hover:text-accent-foreground hover:shadow-sm relative after:absolute after:inset-0 after:rounded-md after:bg-white/5 after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        link: 
          "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        glow:
          "bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white hover:brightness-110 shadow-inner shadow-white/5 hover:shadow-lg hover:shadow-red-700/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 font-semibold",
        xl: "h-12 rounded-md px-10 text-base font-semibold",
        icon: "h-10 w-10",
        pill: "h-10 rounded-full px-6",
        "pill-sm": "h-8 rounded-full px-4 text-xs",
        "pill-lg": "h-12 rounded-full px-8 text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withShine?: boolean
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, withShine = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          withShine && "group",
          withShine && "before:absolute before:-inset-full before:h-full before:w-1/3 before:z-5 before:block before:transform before:-skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 group-hover:before:opacity-100 group-hover:before:animate-shine"
        )}
        ref={ref}
        aria-disabled={props.disabled}
        {...props}
      />
    )
  }
)
ButtonComponent.displayName = "Button"

export { ButtonComponent as Button, buttonVariants }
