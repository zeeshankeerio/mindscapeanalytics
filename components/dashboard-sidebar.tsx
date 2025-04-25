"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  BarChart,
  Brain,
  Grid,
  Database,
  Sparkles,
  Users,
  FileBarChart2,
  TrendingUp,
  FileText,
  MessageSquare,
  Camera,
  User,
  CreditCard,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

// Main navigation organized by categories
const mainNavigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-400",
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
    color: "text-yellow-400",
  },
  {
    name: "Models",
    href: "/dashboard/models",
    icon: Brain,
    color: "text-purple-400",
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: Grid,
    color: "text-green-400",
  },
  {
    name: "Datasets",
    href: "/dashboard/datasets",
    icon: Database,
    color: "text-orange-400",
  },
]

// Business intelligence navigation
const businessNavigation = [
  {
    name: "Insights",
    href: "/dashboard/insights",
    icon: Sparkles,
    color: "text-amber-400",
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: Users,
    color: "text-indigo-400",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileBarChart2,
    color: "text-cyan-400",
  },
  {
    name: "ROI Calculator",
    href: "/dashboard/roi",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
]

// AI tools navigation section
const aiToolsNavigation = [
  {
    name: "Knowledge Base",
    href: "/dashboard/knowledge",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    name: "AI Assistant",
    href: "/dashboard/assistant",
    icon: MessageSquare,
    color: "text-green-400",
  },
  {
    name: "Vision AI",
    href: "/dashboard/vision",
    icon: Camera,
    color: "text-violet-400",
  },
]

// Account and settings navigation
const accountNavigation = [
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
    color: "text-pink-400",
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    color: "text-teal-400",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "text-gray-400",
  },
]

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col bg-background/50 backdrop-blur-sm transition-all duration-300 shadow-lg",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-lg font-bold">Dashboard</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hover:bg-accent/10"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
          <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <nav className="space-y-6">
          <div>
            {!isCollapsed && (
              <h2 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                Main
              </h2>
            )}
            <div className="space-y-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-accent/10 text-accent-foreground shadow-md"
                      : "hover:bg-accent/5 hover:text-accent-foreground hover:shadow-sm"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", item.color)} />
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              ))}
            </div>
          </div>

          <div>
            {!isCollapsed && (
              <h2 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                Business Intelligence
              </h2>
            )}
            <div className="space-y-1">
              {businessNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-accent/10 text-accent-foreground shadow-md"
                      : "hover:bg-accent/5 hover:text-accent-foreground hover:shadow-sm"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", item.color)} />
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              ))}
            </div>
          </div>

          <div>
            {!isCollapsed && (
              <h2 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                AI Tools
              </h2>
            )}
            <div className="space-y-1">
              {aiToolsNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-accent/10 text-accent-foreground shadow-md"
                      : "hover:bg-accent/5 hover:text-accent-foreground hover:shadow-sm"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", item.color)} />
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className="p-4">
        <div className="space-y-1">
          {accountNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                pathname === item.href
                  ? "bg-accent/10 text-accent-foreground shadow-md"
                  : "hover:bg-accent/5 hover:text-accent-foreground hover:shadow-sm"
              )}
            >
              <item.icon className={cn("h-4 w-4", item.color)} />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

