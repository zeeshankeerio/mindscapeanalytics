"use client"

import { Fragment } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  title: string
  href: string
  disabled?: boolean
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center space-x-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isFirst = index === 0
          
          return (
            <Fragment key={item.href}>
              <li className="flex items-center">
                {isFirst && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1.5 h-3.5 w-3.5 text-muted-foreground"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                )}
                {item.disabled ? (
                  <span className={cn(
                    "text-xs font-medium",
                    isLast 
                      ? "text-foreground" 
                      : "text-muted-foreground",
                    isFirst ? "ml-0" : ""
                  )}>
                    {item.title}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-xs font-medium hover:text-foreground",
                      isLast 
                        ? "text-foreground pointer-events-none" 
                        : "text-muted-foreground",
                      isFirst ? "ml-0" : ""
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
              
              {!isLast && (
                <li className="flex items-center">
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
} 