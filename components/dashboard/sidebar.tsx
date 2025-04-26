"use client"

import { useEffect, useState } from "react"
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
  Zap,
  Layers,
  BookOpen,
  UserCircle,
  BrainCircuit,
  Command,
  X, 
  Menu,
  Braces
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

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Models",
    href: "/dashboard/models",
    icon: BrainCircuit,
  },
  {
    title: "Datasets",
    href: "/dashboard/datasets",
    icon: Database,
  },
  {
    title: "Assistant",
    href: "/dashboard/assistant",
    icon: Bot,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageSquare,
  },
  {
    title: "Insights",
    href: "/dashboard/insights",
    icon: LineChart,
  }
]

const resourcesNavItems = [
  {
    title: "API Docs",
    href: "/dashboard/api-docs",
    icon: Braces,
  },
  {
    title: "Documentation",
    href: "/dashboard/docs",
    icon: BookOpen,
  },
  {
    title: "Knowledge Base",
    href: "/dashboard/knowledge",
    icon: Layers,
  }
]

const userNavItems = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  }
]

export function DashboardSidebar() {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useDashboard()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  // Auto-collapse sidebar on mobile/small screens with improved breakpoints
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
      setIsMobileView(isMobile || isTablet)
      
      // Auto-collapse when screen gets small
      if (isMobile && sidebarOpen) {
        setSidebarOpen(false)
      } else if (!isMobile && !isTablet && !sidebarOpen) {
        // Auto-expand when screen gets large enough and sidebar is closed
        setSidebarOpen(true)
      }
    }

    // Initial check
    handleResize()

    // Add resize listener with debounce for better performance
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 100)
    }
    
    window.addEventListener('resize', debouncedResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [sidebarOpen, setSidebarOpen])

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isMobileMenuOpen])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobileView) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, isMobileView])
  
  const sidebarWidth = !sidebarOpen ? "w-[70px]" : "w-[260px]"
  
  const handleNavigation = () => {
    if (isMobileView) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Mobile menu button - improved touch target */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden h-10 w-10 bg-black/30 backdrop-blur-lg text-white/80 hover:text-white hover:bg-black/50 rounded-full"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar with improved responsive behavior */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 bottom-0 border-r border-white/10 bg-black/80 backdrop-blur-xl h-full z-50 shadow-xl shadow-black/40 transition-all duration-300 ease-in-out",
          sidebarWidth,
          isMobileView && !isMobileMenuOpen && "-translate-x-full md:translate-x-0"
        )}
        animate={{ 
          width: !sidebarOpen ? 70 : 260,
          x: isMobileView && !isMobileMenuOpen ? -300 : 0
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              {sidebarOpen ? (
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-6 w-6 text-blue-500" />
                  <span className="font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Mindscape
                  </span>
                </div>
              ) : (
                <BrainCircuit className="h-6 w-6 text-blue-500" />
              )}
            </Link>
            
            {/* Close button for mobile view - improved touch target */}
            {isMobileView && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden h-10 w-10 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
            
            {/* Collapse toggle for desktop view - improved touch target */}
            {!isMobileView && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hidden md:flex h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {!sidebarOpen ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          
          {/* Search */}
          <div className={cn(
            "px-3 pt-4 pb-2",
            !sidebarOpen && "px-2"
          )}>
            {!sidebarOpen ? (
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                <Input 
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 h-9 bg-white/5 border-white/10 text-sm text-white/70 placeholder:text-white/50 focus:ring-blue-500"
                />
              </div>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-full h-9 bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                      aria-label="Search"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Search
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          {/* Navigation */}
          <ScrollArea className="flex-1 py-2">
            <div className={cn(
              "flex flex-col gap-1 px-3",
              !sidebarOpen && "px-2"
            )}>
              {/* Main nav group */}
              <div className="mb-4">
                {!sidebarOpen && (
                  <h4 className="text-white/50 text-xs font-medium mb-2 px-3">MAIN</h4>
                )}
                
                {mainNavItems.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  
                  return !sidebarOpen ? (
                    <TooltipProvider key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-center h-9 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                              isActive && "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 hover:text-blue-500"
                            )}
                            onClick={handleNavigation}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <item.icon className="h-5 w-5" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 h-9 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                        isActive && "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 hover:text-blue-500"
                      )}
                      onClick={handleNavigation}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  )
                })}
              </div>
              
              {/* Resources nav group */}
              <div className="mb-4">
                {!sidebarOpen && (
                  <h4 className="text-white/50 text-xs font-medium mb-2 px-3">RESOURCES</h4>
                )}
                
                {resourcesNavItems.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  
                  return !sidebarOpen ? (
                    <TooltipProvider key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-center h-9 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                              isActive && "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 hover:text-blue-500"
                            )}
                            onClick={handleNavigation}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <item.icon className="h-5 w-5" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 h-9 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                        isActive && "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 hover:text-blue-500"
                      )}
                      onClick={handleNavigation}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  )
                })}
              </div>
              
              {/* User nav group */}
              <div>
                {!sidebarOpen && (
                  <h4 className="text-white/50 text-xs font-medium mb-2 px-3">USER</h4>
                )}
                
                {userNavItems.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  
                  return !sidebarOpen ? (
                    <TooltipProvider key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-center h-9 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                              isActive && "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 hover:text-blue-500"
                            )}
                            onClick={handleNavigation}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <item.icon className="h-5 w-5" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 h-9 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                        isActive && "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 hover:text-blue-500"
                      )}
                      onClick={handleNavigation}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </ScrollArea>
          
          {/* User profile & command palette */}
          <div className="mt-auto border-t border-white/10 py-3 px-4">
            <div className="flex items-center gap-2 mb-3">
              {!sidebarOpen && (
                <Button 
                  variant="secondary" 
                  className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10 text-white/80 font-normal"
                >
                  <Command className="h-4 w-4 mr-2" />
                  <span className="text-sm">Command Palette</span>
                  <kbd className="ml-auto bg-white/10 text-white/40 rounded px-1.5 py-0.5 text-[10px]">⌘K</kbd>
                </Button>
              )}
            </div>
            
            {!sidebarOpen && (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/images/avatar-placeholder.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">John Doe</p>
                  <p className="text-xs text-white/60 truncate">john.doe@example.com</p>
                </div>
                <Zap className="h-4 w-4 text-yellow-500" />
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  )
} 