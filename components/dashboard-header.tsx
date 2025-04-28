"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Bell, Search, Menu, LayoutDashboard, HelpCircle, PlusCircle, 
  ChevronDown, X, BarChart3, FolderKanban, Database, Bot, 
  MessageSquare, LineChart, Braces, BookOpen, Layers, UserCircle, 
  Users, Settings, LogOut
} from "lucide-react"
import { useDashboard } from "@/providers/dashboard-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Command } from "@/components/ui/command"
import React from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

interface DashboardHeaderProps {
  notificationCount?: number
  onNotificationClick?: () => void
  isMobile?: boolean
}

// Define navigation menu items
const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Platform overview and KPIs"
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    description: "Data visualization and insights"
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
    description: "Manage AI projects and deployments",
  },
  {
    title: "Models",
    href: "/dashboard/models",
    icon: LayoutDashboard,
    description: "ML models and fine-tuning"
  },
  {
    title: "Datasets",
    href: "/dashboard/datasets",
    icon: Database,
    description: "Data repository management"
  },
  {
    title: "Assistant",
    href: "/dashboard/assistant",
    icon: Bot,
    description: "AI assistants and tools",
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageSquare,
    description: "Conversational interfaces"
  },
  {
    title: "Insights",
    href: "/dashboard/insights",
    icon: LineChart,
    description: "Business analytics and metrics"
  }
]

const resourcesNavItems = [
  {
    title: "API Docs",
    href: "/dashboard/api-docs",
    icon: Braces,
    description: "Integration guides and endpoints"
  },
  {
    title: "Documentation",
    href: "/dashboard/docs",
    icon: BookOpen,
    description: "Platform documentation and guides"
  },
  {
    title: "Knowledge Base",
    href: "/dashboard/knowledge",
    icon: Layers,
    description: "FAQs and help resources"
  }
]

const userNavItems = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
    description: "Your account settings"
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
    description: "Team members and roles"
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Platform configurations"
  }
]

export function DashboardHeader({
  notificationCount = 0,
  onNotificationClick,
  isMobile = false,
}: DashboardHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toggleSidebar, user } = useDashboard()
  const pathname = usePathname()
  
  // Monitor scroll position for subtle header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])
  
  // Generate paths for breadcrumb display from pathname
  const generateBreadcrumbs = () => {
    if (!pathname) return []
    
    const segments = pathname.split('/').filter(Boolean)
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`
      return { label: segment.charAt(0).toUpperCase() + segment.slice(1), href }
    })
  }
  
  const breadcrumbs = generateBreadcrumbs()

  // Mock search results - in a real application, these would come from an API or state
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return []
    
    // Simulate search filtering
    return [
      {
        category: "Pages",
        items: [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { name: "Analytics", href: "/dashboard/analytics", icon: Bell },
          { name: "Settings", href: "/dashboard/settings", icon: LayoutDashboard },
        ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
      },
      {
        category: "Projects",
        items: [
          { name: "AI Assistant", href: "/dashboard/projects/ai-assistant", icon: LayoutDashboard },
          { name: "Vision Model", href: "/dashboard/projects/vision-model", icon: Search },
          { name: "Data Analysis", href: "/dashboard/projects/data-analysis", icon: LayoutDashboard },
        ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
      },
    ].filter(category => category.items.length > 0)
  }, [searchQuery])

  return (
    <>
      <div className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-white/5 bg-black/80 backdrop-blur-md transition-all px-4 lg:px-6",
        scrolled && "shadow-md h-14"
      )}>
        {/* Mobile Navigation Menu Button */}
        {isMobile && (
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Navigation Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-zinc-950 border-r border-white/10">
              <div className="flex h-14 items-center px-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 bg-red-900/10 blur-md rounded-md animate-pulse-slow"></div>
                    <div className="relative z-10 bg-black rounded-md p-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L4 9V21H20V9L12 3Z" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <span className="font-bold text-white">Mindscape</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-3 text-zinc-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="py-4 px-2">
                {/* User profile section */}
                <div className="px-3 py-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-white/10">
                      <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-primary/20 text-primary">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{user?.name || "User"}</p>
                      <p className="text-xs text-zinc-400">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                </div>
                
                {/* Main navigation links */}
                <div className="space-y-1 px-2">
                  <h3 className="px-3 mb-2 text-xs text-zinc-500 font-medium">Main Navigation</h3>
                  {mainNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
                
                {/* Resources section */}
                <div className="mt-6 space-y-1 px-2">
                  <h3 className="px-3 mb-2 text-xs text-zinc-500 font-medium">Resources</h3>
                  {resourcesNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
                
                {/* User settings */}
                <div className="mt-6 space-y-1 px-2">
                  <h3 className="px-3 mb-2 text-xs text-zinc-500 font-medium">User Settings</h3>
                  {userNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                      </Link>
                    );
                  })}
                  
                  {/* Sign out button */}
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        {/* Desktop menu toggle */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        )}
        
        {/* Breadcrumb navigation */}
        <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-400">
          <Link href="/dashboard" className="flex items-center gap-1 text-white hover:text-primary transition-colors">
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>
          
          {breadcrumbs.length > 0 && breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-gray-600">/</span>
              <Link href={crumb.href} className={cn(
                "hover:text-primary transition-colors",
                i === breadcrumbs.length - 1 ? "text-primary font-medium" : ""
              )}>
                {crumb.label}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-1 sm:gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/5 text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-9 sm:w-9"
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Create New</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-white/5 text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-9 sm:w-9"
                  onClick={onNotificationClick}
                >
                  <Bell className="h-4 w-4" />
                  {notificationCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/5 text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-9 sm:w-9"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden border border-white/10 p-0"
              >
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                  <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/logout" className="text-red-500">
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[600px] bg-black/90 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription className="text-gray-400">
              Find pages, projects, and resources across the platform
            </DialogDescription>
          </DialogHeader>
          
          <Command className="rounded-lg bg-transparent">
            <CommandInput 
              placeholder="Search anything..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="border-b border-white/10 focus:ring-0 focus:border-primary/50"
            />
            <CommandList className="pt-2 pb-4">
              <CommandEmpty>No results found.</CommandEmpty>
              {searchResults.map((category) => (
                <CommandGroup key={category.category} heading={category.category}>
                  {category.items.map((item) => (
                    <CommandItem
                      key={item.href}
                      onSelect={() => {
                        window.location.href = item.href;
                      }}
                      className="flex items-center gap-2 cursor-pointer p-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
          
          <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
            <div>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded mx-1">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded mx-1">↓</kbd>
              to navigate
            </div>
            <div>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded mx-1">Enter</kbd>
              to select
            </div>
            <div>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded mx-1">Esc</kbd>
              to close
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Add styles for animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `}</style>
    </>
  )
} 