"use client"

/**
 * @deprecated This sidebar implementation is deprecated. 
 * Please use components/dashboard/modern-sidebar.tsx instead.
 * This file will be removed in a future update.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDashboard } from "@/providers/dashboard-context"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  ChevronLeft, 
  ChevronRight, 
  BarChart3, 
  Settings,
  Users,
  MessageSquare,
  FolderKanban,
  Database,
  Bot,
  LineChart,
  Search,
  Braces,
  LogOut,
  Bell,
  Sun,
  Moon,
  Laptop,
  BookOpen,
  Layers,
  UserCircle,
  BrainCircuit,
  X,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

// Navigation items - defined outside the component to prevent recreation on each render
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
    badge: {
      text: "New",
      variant: "default" as const
    }
  },
  {
    title: "Models",
    href: "/dashboard/models",
    icon: BrainCircuit,
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
    badge: {
      text: "Beta",
      variant: "outline" as const
    }
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

export function StableSidebar() {
  const { sidebarOpen, setSidebarOpen, toggleSidebar, notifications, unreadNotificationsCount, theme, setTheme, user } = useDashboard()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  
  // Refs for event listeners and components
  const sidebarRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Debounced resize handler
  const handleResize = useCallback(() => {
    const isMobileView = window.innerWidth < 1024
    setIsMobile(isMobileView)
    
    // Auto-close on mobile view
    if (isMobileView && sidebarOpen) {
      setSidebarOpen(false)
    }
  }, [sidebarOpen, setSidebarOpen])
  
  // Setup resize listener with debounce
  useEffect(() => {
    // Set initial state
    handleResize()
    
    let timeoutId: NodeJS.Timeout
    
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 100)
    }
    
    window.addEventListener('resize', debouncedResize)
    
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [handleResize])
  
  // Handle outside click to close sidebar on mobile
  useEffect(() => {
    if (!isMobile || !sidebarOpen) return
    
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobile, sidebarOpen, setSidebarOpen])
  
  // Handle escape key for search and sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) {
          setIsSearchOpen(false)
        } else if (isMobile && sidebarOpen) {
          setSidebarOpen(false)
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, isMobile, sidebarOpen, setSidebarOpen])
  
  // Close sidebar on navigation for mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile, setSidebarOpen])
  
  // Handle search results
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = [
        ...mainNavItems,
        ...resourcesNavItems
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])
  
  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [isSearchOpen])
  
  // Memoized sidebar width values to prevent recalculation
  const widths = useMemo(() => ({
    collapsed: "w-[70px]",
    expanded: "w-[260px]"
  }), [])
  
  // Logo Component
  const Logo = useCallback(() => (
    <div className="flex h-14 items-center justify-between px-4 border-b border-white/5">
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-primary to-purple-600 text-white font-bold shadow-lg">
          <span>M</span>
        </div>
        
        {sidebarOpen && (
          <span className="font-semibold text-lg text-white overflow-hidden">
            Mindscape
          </span>
        )}
      </Link>
      
      {/* Toggle button - only shown on desktop */}
      {sidebarOpen && !isMobile && (
        <button
          onClick={toggleSidebar}
          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors lg:block hidden"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden block text-slate-400 hover:text-white"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  ), [sidebarOpen, toggleSidebar, isMobile, setSidebarOpen])
  
  // Theme Switcher Component
  const ThemeSwitcher = useCallback(() => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
          {theme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : theme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Laptop className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="h-4 w-4 mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ), [theme, setTheme])
  
  // Action Bar Component
  const ActionBar = useCallback(() => (
    <div className={cn(
      "flex gap-1 px-2 py-2",
      !sidebarOpen && "flex-col"
    )}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
        onClick={() => setIsSearchOpen(true)}
      >
        <Search className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-md text-slate-400 hover:text-white hover:bg-white/10 relative"
        asChild
      >
        <Link href="/dashboard/notifications">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
              {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
            </span>
          )}
        </Link>
      </Button>
      
      <ThemeSwitcher />
    </div>
  ), [sidebarOpen, unreadNotificationsCount, ThemeSwitcher])
  
  // User Menu Component
  const UserMenu = useCallback(() => (
    <div className={cn(
      "mt-auto p-4 border-t border-white/5",
      !sidebarOpen && "flex justify-center"
    )}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center gap-2 px-2 hover:bg-white/10",
              !sidebarOpen && "w-10 h-10 justify-center p-0"
            )}
          >
            <Avatar className="h-8 w-8 border border-white/10">
              <AvatarImage src={user.avatar || ""} alt={user.name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            {sidebarOpen && (
              <div className="flex flex-col items-start overflow-hidden">
                <span className="font-medium text-sm truncate">{user.name}</span>
                <span className="text-xs text-slate-400 truncate">{user.email}</span>
              </div>
            )}
            
            {sidebarOpen && <ChevronRight className="h-4 w-4 ml-auto text-slate-400" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={sidebarOpen ? "end" : "center"} className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userNavItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 text-rose-500 focus:text-rose-500">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ), [sidebarOpen, user])
  
  // Nav Item Component (memoized for performance)
  type NavItemProps = {
    item: typeof mainNavItems[0]
    collapsed: boolean
  }
  
  const NavItem = useCallback(({ item, collapsed }: NavItemProps) => {
    const isActive = pathname ? (pathname === item.href || pathname.startsWith(`${item.href}/`)) : false
    const Icon = item.icon
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 transition-colors relative group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <div className="flex shrink-0 items-center justify-center">
                <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
              </div>
              
              {!collapsed && (
                <span className="font-medium truncate flex-1 overflow-hidden">
                  {item.title}
                </span>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              
              {/* Badge */}
              {item.badge && !collapsed && (
                <Badge variant={item.badge.variant} className="ml-auto text-xs">
                  {item.badge.text}
                </Badge>
              )}
              
              {/* Mobile-only badge indicator (when collapsed) */}
              {item.badge && collapsed && (
                <div className={cn(
                  "absolute -top-1 -right-1 w-2 h-2 rounded-full",
                  item.badge.variant === "default" ? "bg-primary" : "bg-muted border border-white/20"
                )} />
              )}
            </Link>
          </TooltipTrigger>
          
          {/* Show tooltip only when sidebar is collapsed */}
          {collapsed && (
            <TooltipContent side="right" className="flex flex-col gap-1">
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-muted-foreground">{item.description}</div>
              {item.badge && (
                <Badge variant={item.badge.variant} className="self-start text-xs mt-1">
                  {item.badge.text}
                </Badge>
              )}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    )
  }, [pathname])
  
  // Search Modal Component
  const SearchModal = useCallback(() => {
    if (!isSearchOpen) return null
    
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}>
        <div 
          className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="rounded-lg border border-white/10 bg-black shadow-xl">
            <div className="flex items-center border-b border-white/10 p-4">
              <Search className="mr-2 h-5 w-5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="flex-1 border-0 bg-transparent text-white placeholder:text-slate-400 focus:outline-none text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-white/10"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-white" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-slate-400">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.length > 0 ? (
                <div className="p-8 text-center">
                  <p className="text-slate-400">No results found</p>
                </div>
              ) : (
                <div className="p-4 text-center text-slate-400">
                  <p className="mb-2">Type to search...</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-white/10" 
                      onClick={() => setSearchQuery("dashboard")}
                    >
                      Dashboard
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-white/10" 
                      onClick={() => setSearchQuery("analytics")}
                    >
                      Analytics
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-white/10" 
                      onClick={() => setSearchQuery("projects")}
                    >
                      Projects
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }, [isSearchOpen, searchQuery, searchResults])
  
  return (
    <>
      <div 
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col bg-gradient-to-br from-zinc-950 to-zinc-900 shadow-xl border-r border-white/5 transition-all duration-300 ease-in-out",
          sidebarOpen ? widths.expanded : widths.collapsed,
          isMobile && !sidebarOpen && "translate-x-[-100%]",
          isMobile && "w-[260px]"
        )}
      >
        <Logo />
        
        <div className="pt-3 px-2">
          <ActionBar />
        </div>
        
        <div className="mt-2 px-2">
          {!sidebarOpen && !isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="w-full h-8 justify-center rounded-md text-slate-400 hover:text-white hover:bg-white/10 mb-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
          
          <ScrollArea className={cn(
            "flex-1 py-2",
            sidebarOpen ? "px-1" : "px-0"
          )}>
            <div className="space-y-4">
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <NavItem 
                    key={item.href} 
                    item={item}
                    collapsed={!sidebarOpen && !isMobile}
                  />
                ))}
              </div>
              
              <div>
                <div className={cn(
                  "flex items-center px-3 py-2",
                  !sidebarOpen && !isMobile && "justify-center"
                )}>
                  {sidebarOpen && (
                    <span className="text-xs font-medium text-slate-400">
                      RESOURCES
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {resourcesNavItems.map((item) => (
                    <NavItem 
                      key={item.href} 
                      item={item}
                      collapsed={!sidebarOpen && !isMobile}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        
        <UserMenu />
      </div>
      
      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Search modal */}
      <SearchModal />
    </>
  )
} 