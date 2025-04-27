"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, Search, User, Settings, Menu, HelpCircle, LogOut, ChevronDown } from "lucide-react"
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
  DropdownMenuGroup,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface DashboardHeaderProps {
  heading?: string
}

export function DashboardHeader({ heading }: DashboardHeaderProps) {
  const { unreadNotificationsCount, toggleSidebar, toggleNotificationsPanel } = useDashboard()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header 
      className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-white/10 bg-zinc-950/90 px-3 sm:px-4 backdrop-blur-lg supports-[backdrop-filter]:bg-black/60"
      data-test-id="dashboard-header"
    >
      <div className="flex items-center gap-2 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden text-zinc-400 hover:text-white hover:bg-white/5 h-8 w-8"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {heading && (
        <div className="hidden md:flex items-center gap-2">
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 bg-red-900/10 blur-md rounded-md animate-pulse-slow"></div>
            <div className="relative z-10">
              <div className="relative bg-black rounded-md p-1">
                <Image 
                  src="/images/brain.svg" 
                  alt="Mindscape Brain Logo"
                  width={24}
                  height={24}
                  className="h-4 w-4"
                  style={{
                    filter: 'drop-shadow(0 0 1px #8B0000)'
                  }}
                />
              </div>
            </div>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium flex items-center"
          >
            <span className="text-white">{heading}</span>
            <ChevronDown className="h-3 w-3 ml-1 text-zinc-400" />
          </motion.h1>
        </div>
      )}

      <div className={cn(
        "ml-auto flex items-center gap-2 transition-all duration-300",
        isSearchOpen ? "flex-1" : ""
      )}>
        {isSearchOpen ? (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full h-8 pl-8 pr-4 text-sm bg-white/5 border-white/10 focus:border-red-500/50 focus:ring-red-500/20"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-zinc-400 hover:text-white hover:bg-white/5 h-8 w-8"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Search (Ctrl+K)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative text-zinc-400 hover:text-white hover:bg-white/5 h-8 w-8"
                  onClick={toggleNotificationsPanel}
                  aria-label={`Notifications ${unreadNotificationsCount > 0 ? `(${unreadNotificationsCount} unread)` : ''}`}
                >
                  <Bell className="h-4 w-4" />
                  {unreadNotificationsCount > 0 && (
                    <Badge 
                      className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 bg-red-500 text-white flex items-center justify-center text-[10px]"
                    >
                      {unreadNotificationsCount}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative text-zinc-400 hover:text-white hover:bg-white/5 h-8 w-8 hidden sm:flex"
                  aria-label="Help"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Help & Resources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 pl-0 pr-0 sm:pl-2 sm:pr-2 overflow-hidden gap-2 hover:bg-white/5"
              aria-label="User menu"
            >
              <Avatar className="h-7 w-7 border border-white/10">
                <AvatarImage src="/images/avatar-placeholder.jpg" alt="User" />
                <AvatarFallback className="bg-black text-white text-xs">JD</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-xs font-medium text-zinc-300">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 bg-zinc-900 border-white/10">
            <DropdownMenuLabel className="text-xs font-normal text-zinc-400">
              <div className="flex flex-col">
                <span className="font-medium text-sm text-white">John Doe</span>
                <span className="text-xs text-zinc-400">john.doe@example.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center gap-2 cursor-pointer text-xs">
                  <User className="h-3.5 w-3.5" />
                  Profile
                  <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer text-xs">
                  <Settings className="h-3.5 w-3.5" />
                  Settings
                  <DropdownMenuShortcut>⇧S</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-xs text-red-400 focus:text-red-300">
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
              <DropdownMenuShortcut>⇧Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Add styles for animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `}</style>
    </header>
  )
} 