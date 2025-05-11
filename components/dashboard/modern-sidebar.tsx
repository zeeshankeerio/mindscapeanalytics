"use client"

import { useEffect, useState } from "react"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDashboard } from "@/providers/dashboard-context"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
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
  Clock,
  Activity,
  Sun,
  Moon,
  Laptop,
  MoreHorizontal,
  HelpCircle,
  Heart,
  Shield,
  BookOpen,
  Layers,
  UserCircle,
  BrainCircuit,
  X,
  Menu,
  TrendingUp,
  DollarSign
} from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ScrollArea } from "../ui/scroll-area"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

// Menu item definitions
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
    icon: TrendingUp,
    description: "Calculate investment returns",
    group: "analytics"
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
  },
  {
    title: "Pricing",
    href: "/dashboard/pricing",
    icon: DollarSign,
    description: "Pricing estimator",
    badge: {
      text: "New",
      variant: "default" as const
    }
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

// Sidebar error boundary component
class SidebarErrorBoundary extends React.Component<
  { children: React.ReactNode }, 
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Sidebar error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <aside className="fixed inset-y-0 left-0 z-30 w-16 flex-col bg-gradient-to-br from-zinc-950 to-zinc-900 shadow-xl border-r border-white/5">
          <div className="flex h-14 items-center justify-center border-b border-white/5">
            <div className="w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center">
              <span className="text-primary font-bold">M</span>
            </div>
          </div>
          <div className="p-2 mt-4">
            <p className="text-xs text-center text-red-400 px-1">Menu Error</p>
            <button 
              className="w-full mt-2 text-xs text-center py-1 bg-red-900/30 rounded border border-red-900/50 text-red-400"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        </aside>
      );
    }

    return this.props.children;
  }
}

export function ModernSidebar() {
  const { sidebarOpen, setSidebarOpen, toggleSidebar, notifications, unreadNotificationsCount, theme, setTheme } = useDashboard()
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)
  const sidebarRef = React.useRef<HTMLDivElement>(null)
  
  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768 // md breakpoint in Tailwind
      setIsMobile(isMobileView)
      
      // Auto-close sidebar on mobile when resizing to mobile
      if (isMobileView) {
        setSidebarOpen(false)
      } else {
        // Auto-open sidebar on desktop
        setSidebarOpen(true)
      }
    }
    
    // Run the check immediately
    checkMobile()
    
    // Add a more robust resize handler with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize)
    }
  }, [setSidebarOpen])
  
  // Handle swipe gestures on mobile with improved touch detection
  useEffect(() => {
    if (!isMobile) return
    
    const handleTouchStart = (e: TouchEvent) => {
      // Only track horizontal swipes starting from the edge of the screen
      const touchX = e.touches[0].clientX;
      // For opening: only react to touches starting near the left edge (within 30px)
      if (!sidebarOpen && touchX > 30) return;
      // For closing: only react if the sidebar is open and the touch is within the sidebar
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) return;
      
      setTouchStartX(touchX);
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX === 0) return; // No valid touch start recorded
      
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;
      
      // Swipe right to open sidebar (if it's closed)
      if (deltaX > 50 && !sidebarOpen) {
        setSidebarOpen(true);
      }
      // Swipe left to close sidebar (if it's open)
      else if (deltaX < -50 && sidebarOpen) {
        setSidebarOpen(false);
      }
      
      // Reset touch start position
      setTouchStartX(0);
    }
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    }
  }, [isMobile, sidebarOpen, setSidebarOpen, touchStartX]);
  
  // Handle clicks outside the sidebar to close on mobile
  useEffect(() => {
    if (isMobile) {
      const handleClickOutside = (e: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
          setSidebarOpen(false)
        }
      }
      
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isMobile, setSidebarOpen])
  
  // Handle navigation and close search if open - memoized function
  const handleNavigation = React.useCallback(() => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
    
    // Close sidebar automatically on mobile when navigating
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isSearchOpen, isMobile, sidebarOpen, setSidebarOpen]);
  
  // Logo component with animation
  const LogoComponent = React.memo(() => (
    <div className="flex h-14 items-center gap-2 border-b border-white/5 px-3">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative">
          {/* Glow effects */}
          <div className="absolute inset-0 bg-red-900/10 blur-md rounded-xl animate-pulse-slow"></div>
          
          {/* Brain icon with RGB border */}
          <div className="relative z-10 group">
            {/* RGB Border Container */}
            <div className="absolute -inset-[1px] rounded-xl">
              {/* RGB gradient border */}
              <div className="absolute inset-[-1px] rounded-xl animate-rgb-spin-slow">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)] rounded-xl"></div>
              </div>
            </div>
            
            {/* Icon container */}
            <div className="relative bg-black rounded-xl p-2 transition-transform duration-300 group-hover:scale-[0.98]">
              <Image 
                src="/images/brain.svg" 
                alt="Mindscape Brain Logo"
                width={32}
                height={32}
                className="h-6 w-6"
                style={{
                  filter: 'drop-shadow(0 0 1px #8B0000)'
                }}
              />
            </div>
          </div>
        </div>
        
        {sidebarOpen && (
          <div className="transition-opacity duration-200">
            <h1 className="text-lg font-bold tracking-tight font-sans flex items-center">
              <span className="text-white">Mind</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700/80 via-red-600 to-red-700/80">scape</span>
            </h1>
          </div>
        )}
      </Link>

      <div className="ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-zinc-400 hover:text-white hover:bg-white/5 h-8 w-8"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  ));
  
  // Theme switcher component
  const ThemeSwitcher = () => {
    return (
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
    )
  }
  
  // Navigation item component
  type NavItemProps = {
    item: typeof mainNavItems[0]
    collapsed: boolean
    isMobile: boolean
  }
  
  const NavItem = React.memo(({ item, collapsed, isMobile }: NavItemProps) => {
    const isActive = pathname ? (pathname === item.href || pathname.startsWith(`${item.href}/`)) : false
    const Icon = item.icon
    
    // Enhanced for mobile with larger touch targets
    const mobileStyles = isMobile ? "py-3 px-4" : "py-1.5 px-3"
    
    return (
      <TooltipProvider disableHoverableContent={!collapsed || isMobile}>
        <Tooltip delayDuration={collapsed && !isMobile ? 300 : 999999}>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              onClick={handleNavigation}
              className={cn(
                "flex items-center gap-2 rounded-md text-sm transition-colors relative group",
                mobileStyles,
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
              onKeyDown={(e) => handleKeyboardNav(e, item.href)}
              tabIndex={0}
            >
              <div className="flex shrink-0 items-center justify-center">
                <Icon className={cn("h-4 w-4", isMobile && "h-5 w-5", isActive && "text-primary")} />
              </div>
              
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {!collapsed && item.badge && (
                <Badge variant={item.badge.variant} className="ml-auto text-[10px] px-1 py-0 h-4">
                  {item.badge.text}
                </Badge>
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent 
            side="right" 
            className={cn("z-50", (!collapsed || isMobile) && "hidden")}
          >
            <div>
              <p className="font-medium text-xs">{item.title}</p>
              {item.description && (
                <p className="text-[10px] text-muted-foreground">
                  {item.description}
                </p>
              )}
              {item.badge && (
                <Badge 
                  variant={item.badge.variant} 
                  className="mt-1 text-[9px] h-3.5 px-1"
                >
                  {item.badge.text}
                </Badge>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  });
  
  // User menu component
  const UserMenu = () => {
    const { user } = useDashboard()
    
    return (
      <div className={cn(
        "mt-auto p-4 border-t border-white/5",
        !sidebarOpen && "flex justify-center",
        isMobile && sidebarOpen && "p-5" // More padding on mobile
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full flex items-center gap-2 px-2 hover:bg-white/10",
                !sidebarOpen && "w-10 h-10 justify-center p-0",
                isMobile && sidebarOpen && "gap-3 py-2.5" // Larger on mobile
              )}
            >
              <Avatar className={cn("h-8 w-8 border border-white/10", isMobile && sidebarOpen && "h-9 w-9")}>
                <AvatarImage src={user.avatar || ""} alt={user.name} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex flex-col items-start overflow-hidden"
                  >
                    <span className={cn("font-medium text-sm truncate", isMobile && "text-base")}>
                      {user.name}
                    </span>
                    <span className="text-xs text-slate-400 truncate">
                      {user.email}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="ml-auto"
                  >
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={sidebarOpen ? "end" : "center"} className={cn("w-56", isMobile && "w-64")}>
            <DropdownMenuLabel className="flex flex-col">
              <span>{user.name}</span>
              <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userNavItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link 
                  href={item.href} 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handleNavigation}
                >
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
    )
  }
  
  // Actions bar component
  const ActionBar = () => {
    return (
      <div className={cn(
        "flex gap-1 px-2 py-2",
        !sidebarOpen && "flex-col",
        isMobile && sidebarOpen && "gap-2 p-3" // More spacing on mobile
      )}>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-9 w-9 rounded-md text-slate-400 hover:text-white hover:bg-white/10",
            isMobile && "h-10 w-10" // Larger touch target on mobile
          )}
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className={cn("h-[1.2rem] w-[1.2rem]", isMobile && "h-5 w-5")} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-9 w-9 rounded-md text-slate-400 hover:text-white hover:bg-white/10 relative",
            isMobile && "h-10 w-10" // Larger touch target on mobile
          )}
          asChild
        >
          <Link href="/dashboard/notifications" onClick={handleNavigation}>
            <Bell className={cn("h-[1.2rem] w-[1.2rem]", isMobile && "h-5 w-5")} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
              </span>
            )}
          </Link>
        </Button>
        
        <ThemeSwitcher />
      </div>
    )
  }
  
  // Search drawer component when opened
  const SearchDrawer = () => {
    const [searchResults, setSearchResults] = useState<any[]>([])
    
    useEffect(() => {
      // Simulated search function
      if (searchQuery.length > 0) {
        // Simplified example - would connect to real search API
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
    
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl p-4">
          <div className="rounded-lg border border-white/10 bg-black shadow-xl">
            <div className="flex items-center border-b border-white/10 p-4">
              <Search className="mr-2 h-5 w-5 text-slate-400" />
              <Input
                autoFocus
                placeholder="Search..."
                className="flex-1 border-0 bg-transparent text-white placeholder:text-slate-400 focus-visible:ring-0 text-base"
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
                    <Badge variant="outline" className="cursor-pointer hover:bg-white/10" onClick={() => setSearchQuery("dashboard")}>
                      Dashboard
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-white/10" onClick={() => setSearchQuery("analytics")}>
                      Analytics
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-white/10" onClick={() => setSearchQuery("projects")}>
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
  }
  
  // Handle keyboard navigation
  const handleKeyboardNav = (e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      window.location.href = href
    }
  }
  
  // Collapsed width for the sidebar
  const collapsedWidth = "w-[70px]"
  const expandedWidth = "w-[260px]"
  
  // Mobile menu toggler component
  const MobileMenuToggle = () => {
    if (!isMobile) return null
    
    return (
      <button 
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 bg-zinc-900/90 backdrop-blur-sm p-3 rounded-md shadow-lg border border-white/10 
                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900
                 hover:bg-zinc-800 active:bg-zinc-700 transition-all duration-200
                 touch-manipulation w-12 h-12 flex items-center justify-center"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>
    )
  }
  
  return (
    <SidebarErrorBoundary>
      {/* Mobile Menu Button - Only visible on mobile */}
      {isMobile && !sidebarOpen && <MobileMenuToggle />}

      {/* Overlay for mobile - only visible when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 transition-all duration-300 bg-gradient-to-br from-zinc-950 to-zinc-900 shadow-xl border-r border-white/5",
          sidebarOpen ? "w-64" : "w-16",
          isMobile && !sidebarOpen && "-left-20", // Hide further off-screen when closed on mobile
          isMobile && sidebarOpen && "left-0 w-64", // Full width when open on mobile
          !isMobile && "left-0", // Always show on desktop
          "z-40 overflow-y-auto overflow-x-hidden scrollbar-hide"
        )}
      >
        {/* Close button only visible in mobile when sidebar is open */}
        {isMobile && sidebarOpen && (
          <button
            className="absolute top-3.5 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {/* Sidebar Header with Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-white/5 px-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              {/* Glow effects */}
              <div className="absolute inset-0 bg-red-900/10 blur-md rounded-xl animate-pulse-slow"></div>
              
              {/* Brain icon with RGB border */}
              <div className="relative z-10 group">
                {/* RGB Border Container */}
                <div className="absolute -inset-[1px] rounded-xl">
                  {/* RGB gradient border */}
                  <div className="absolute inset-[-1px] rounded-xl animate-rgb-spin-slow">
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#8B0000,#420000,#690000,#8B0000)] rounded-xl"></div>
                  </div>
                </div>
                
                {/* Icon container */}
                <div className="relative bg-black rounded-xl p-2 transition-transform duration-300 group-hover:scale-[0.98]">
                  <Image 
                    src="/images/brain.svg" 
                    alt="Mindscape Brain Logo"
                    width={32}
                    height={32}
                    className="h-6 w-6"
                    style={{
                      filter: 'drop-shadow(0 0 1px #8B0000)'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {sidebarOpen && (
              <div className="transition-opacity duration-200">
                <h1 className="text-lg font-bold tracking-tight font-sans flex items-center">
                  <span className="text-white">Mind</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700/80 via-red-600 to-red-700/80">scape</span>
                </h1>
              </div>
            )}
          </Link>

          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-zinc-400 hover:text-white hover:bg-white/5 h-8 w-8"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Sidebar Content */}
        <ScrollArea className="flex-1 overflow-auto">
          <div className={cn(
            "flex flex-col gap-1 p-2",
            !sidebarOpen && "items-center",
            isMobile && sidebarOpen && "gap-2 p-3"
          )}>
            {/* Main Navigation */}
            <div className="mb-2">
              {mainNavItems.map((item, i) => {
                // Check if this is a grouped item
                const isGroupedItem = item.group !== undefined;
                // Check if this is the beginning of a group
                const isPreviousItemInSameGroup = i > 0 && mainNavItems[i-1].group === item.group;
                
                return (
                  <TooltipProvider key={i} delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 transition-colors relative group",
                            isMobile && sidebarOpen ? "py-3" : "py-2",
                            // Add left indentation for grouped items
                            isGroupedItem && sidebarOpen && "pl-6",
                            // Add top margin to visually group with parent
                            isGroupedItem && !isPreviousItemInSameGroup && "mt-0.5",
                            // Add bottom margin to last group item
                            isGroupedItem && (i === mainNavItems.length-1 || mainNavItems[i+1].group !== item.group) && "mb-1",
                            pathname && pathname === item.href && "bg-white/5 text-white font-medium",
                            pathname && !pathname.startsWith(item.href) && "hover:bg-white/5 hover:text-white",
                            !sidebarOpen && "justify-center px-0",
                            isMobile && "active:bg-white/20 active:scale-[0.98]" // Add active state for mobile touch
                          )}
                          onKeyDown={(e) => handleKeyboardNav(e, item.href)}
                        >
                          {/* Active item indicator */}
                          {pathname === item.href && (
                            <motion.div
                              layoutId="sidebar-active-item"
                              className="absolute left-0 w-1 h-5 bg-gradient-to-b from-red-500 to-red-700 rounded-full"
                              transition={{ type: "spring", stiffness: 320, damping: 30 }}
                            />
                          )}
                          
                          {/* Group indicator line for grouped items */}
                          {isGroupedItem && sidebarOpen && (
                            <div className="absolute left-3 h-full w-px bg-white/10" 
                                style={{ 
                                  top: isPreviousItemInSameGroup ? '-50%' : '0',
                                  height: isPreviousItemInSameGroup ? '150%' : '100%'
                                }} 
                            />
                          )}
                          
                          <div className={cn(
                            "flex items-center justify-center transition-transform",
                            pathname === item.href ? "text-white" : "text-zinc-400 group-hover:text-white",
                            pathname === item.href && !sidebarOpen && "scale-110",
                            isMobile && "scale-110" // Slightly larger icons on mobile
                          )}>
                            <item.icon className={cn(
                              "h-5 w-5", 
                              !isMobile && "h-5 w-5",
                              pathname === item.href && "text-red-500"
                            )} />
                          </div>
                          
                          {sidebarOpen && (
                            <span className={cn(
                              "truncate",
                              isGroupedItem && !isMobile && "text-sm text-zinc-300",
                              isGroupedItem && isMobile && "text-zinc-300", // Keep normal size on mobile for grouped items
                              isMobile && "font-medium text-base" // Larger text on mobile
                            )}>
                              {item.title}
                            </span>
                          )}
                          
                          {/* Badge - only show when sidebar is open */}
                          {sidebarOpen && item.badge && (
                            <Badge variant={item.badge.variant} className="ml-auto text-[10px] px-1">
                              {item.badge.text}
                            </Badge>
                          )}
                        </Link>
                      </TooltipTrigger>
                      {!sidebarOpen && (
                        <TooltipContent side="right" className="flex items-center gap-2">
                          {item.title}
                          {item.badge && (
                            <Badge variant={item.badge.variant} className="text-[10px] px-1">
                              {item.badge.text}
                            </Badge>
                          )}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>

            {/* Separator with label */}
            <div className={cn(
              "flex items-center gap-2 px-3 py-2",
              !sidebarOpen && "justify-center"
            )}>
              {sidebarOpen ? (
                <>
                  <Separator className="shrink" />
                  <span className="text-xs font-medium text-zinc-500">Resources</span>
                  <Separator className="shrink" />
                </>
              ) : (
                <Separator className="w-4" />
              )}
            </div>

            {/* Continue with the rest of the sidebar code */}
            <div className="space-y-4">
              <div className="space-y-1">
                {resourcesNavItems.map((item) => (
                  <NavItem 
                    key={item.href} 
                    item={item}
                    collapsed={!sidebarOpen}
                    isMobile={isMobile}
                  />
                ))}
              </div>
              
              <UserMenu />
            </div>
          </div>
        </ScrollArea>

        {/* Add styles for animations */}
        <style jsx global>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }

          @keyframes rgb-spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </aside>
      
      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SearchDrawer />
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarErrorBoundary>
  )
} 