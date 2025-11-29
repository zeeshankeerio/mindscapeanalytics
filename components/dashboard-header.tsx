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
    title: "ROI Calculator",
    href: "/dashboard/roi",
    icon: LineChart,
    description: "Calculate investment returns",
    highlight: true
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
  const { toggleSidebar, user, setSidebarOpen, sidebarOpen } = useDashboard()
  const pathname = usePathname()
  const [isTablet, setIsTablet] = useState(false)
  
  // Monitor scroll position for subtle header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Detect tablet size for responsive behavior
  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkTablet();
    
    const handleResize = () => {
      checkTablet();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
  
  // Function to handle sidebar toggling according to device type
  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen(true); // Open sidebar on mobile
    } else {
      toggleSidebar(); // Use regular toggle on desktop/tablet
    }
  };

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
        {/* Toggle button - appropriate for each device type */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "text-white hover:bg-white/10",
            // Only show on mobile and tablet
            (!isMobile && !isTablet) && "hidden", 
            // Make button slightly larger on mobile for better touch targets
            isMobile && "h-10 w-10"
          )}
          onClick={handleSidebarToggle}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu className={cn("h-5 w-5", isMobile && "h-6 w-6")} />
          <span className="sr-only">Toggle Navigation</span>
        </Button>

        {/* Breadcrumb navigation - simpler on mobile */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          {isMobile ? (
            // Simplified breadcrumbs for mobile
            <h1 className="font-medium text-white truncate">
              {breadcrumbs.length > 0 
                ? breadcrumbs[breadcrumbs.length - 1].label 
                : "Dashboard"}
            </h1>
          ) : (
            // Full breadcrumbs for tablet and desktop
            breadcrumbs.length > 0 ? (
              <div className="flex items-center">
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
                {breadcrumbs.map((crumb, i) => (
                  <div key={i} className="flex items-center">
                    <span className="mx-1 text-zinc-600">/</span>
                    <Link 
                      href={crumb.href} 
                      className={cn(
                        "hover:text-white transition-colors",
                        i === breadcrumbs.length - 1 && "text-white font-medium"
                      )}
                    >
                      {crumb.label}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="text-white font-medium">Dashboard</h1>
            )
          )}
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