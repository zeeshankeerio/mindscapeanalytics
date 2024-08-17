import React from "react"

import { cn } from "@/lib/utils"

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-2.5 py-8 md:px-20",
        className
      )}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper
