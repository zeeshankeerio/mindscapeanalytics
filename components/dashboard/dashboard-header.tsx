"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search, User, Settings, Menu } from "lucide-react"
import { useDashboard } from "@/providers/dashboard-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  heading?: string
}

export function DashboardHeader({ heading }: DashboardHeaderProps) {
  const { unreadNotificationsCount, toggleSidebar } = useDashboard()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden text-muted-foreground"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {heading && (
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">{heading}</h1>
        </div>
      )}

      <div className={cn(
        "ml-auto flex items-center gap-4 transition-all duration-300",
        isSearchOpen ? "flex-1" : ""
      )}>
        {isSearchOpen ? (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 bg-muted/50 border-muted"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(true)}
            className="text-muted-foreground"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}

        <div className="hidden md:flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative text-muted-foreground"
            aria-label={`Notifications ${unreadNotificationsCount > 0 ? `(${unreadNotificationsCount} unread)` : ''}`}
          >
            <Bell className="h-5 w-5" />
            {unreadNotificationsCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white flex items-center justify-center text-xs"
              >
                {unreadNotificationsCount}
              </Badge>
            )}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full overflow-hidden"
              aria-label="User menu"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/avatar-placeholder.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
} 