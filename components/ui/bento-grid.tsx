"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./button"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 gap-4 md:auto-rows-[16rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  services,
  title,
  icon,
}: {
  className?: string
  title?: string
  services?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "group/bento bg-primary/75 shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent p-2 transition duration-200 hover:shadow-xl",
        className
      )}
    >
      <div className="text-primary-foreground flex size-full flex-col items-end justify-start gap-8 px-4 py-6">
        <div className="flex size-full flex-col justify-start space-y-2 text-start">
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="flex size-full items-end justify-between text-start text-sm">
            {services}
            {icon}
          </div>
        </div>
        <div className="flex size-full items-end justify-start gap-8">
          <Link
            href={"/services"}
            className={`${buttonVariants({
              variant: "outline",
            })} bg-transparent`}
          >
            Learn More &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
