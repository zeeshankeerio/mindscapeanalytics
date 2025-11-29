"use client"

import { useEffect, useState, useCallback } from "react"
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
import { LucideIcon } from "lucide-react"

// Define the type for menu items to ensure correct badge variants
type NavItemType = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
  badge?: {
    text: string;
    variant: "default" | "outline" | "secondary" | "destructive";
  };
  group?: string;
};

// Update mainNavItems with as const to preserve literal types
const mainNavItems: NavItemType[] = [
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
];

// Apply the same type assertions to other nav item arrays
const resourcesNavItems: NavItemType[] = [
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
];

const userNavItems: NavItemType[] = [
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
];

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

// Define types for our NavItem components
interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  sidebarOpen: boolean;
  isRoi: boolean;
  handleNavigation: () => void;
  className?: string;
}

interface DesktopNavItemProps {
  item: NavItemType;
  isActive: boolean;
  isRoi: boolean;
  className?: string;
}

interface MobileNavItemProps {
  item: NavItemType;
  isActive: boolean;
  isRoi: boolean;
}

// Create a separate NavItem component to properly handle the conditional tooltip rendering
const NavItem = ({ item, isActive, sidebarOpen, isRoi, handleNavigation, className }: NavItemProps) => {
  if (!sidebarOpen) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5",
                "justify-center p-2",
                isRoi && "text-red-400",
                className
              )}
              onClick={handleNavigation}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            {item.title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5",
        isRoi && "text-red-400",
        className
      )}
      onClick={handleNavigation}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.title}</span>
      {item.badge && (
        <Badge variant={item.badge.variant} className="ml-auto">
          {item.badge.text}
        </Badge>
      )}
    </Link>
  );
};

export function ModernSidebar() {
  const { sidebarOpen, setSidebarOpen, toggleSidebar, notifications, unreadNotificationsCount, theme, setTheme } = useDashboard()
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const sidebarRef = React.useRef<HTMLDivElement>(null)
  const prevPathname = React.useRef(pathname);
  
  // Mobile-only drawer state - separate from main sidebar state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  
  // Sidebar width constants
  const collapsedWidth = "w-[70px]"
  const expandedWidth = "w-[260px]"
  
  // Handle sidebar toggle safely
  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen, setSidebarOpen]);
  
  // Add body class when mobile drawer is open to prevent background scrolling
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isMobile && mobileDrawerOpen) {
        document.body.classList.add('drawer-open');
      } else {
        document.body.classList.remove('drawer-open');
      }
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('drawer-open');
      }
    };
  }, [isMobile, mobileDrawerOpen]);
  
  // Update window width for client-side only calculations
  useEffect(() => {
    const updateWindowDimensions = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      const mobileView = width < 768;
      const tabletView = width >= 768 && width < 1024;
      
      // Update device flags
      setIsMobile(mobileView);
      setIsTablet(tabletView);
    };
    
    // Run immediately
    updateWindowDimensions();
    
    // Add event listener with debounce for performance
    let debounceTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updateWindowDimensions, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(debounceTimer);
    };
  }, []);
  
  // Only close the sidebar on mobile if the pathname actually changes (navigation), not on mount or sidebar open
  useEffect(() => {
    if (isMobile && pathname && prevPathname.current !== pathname) {
      // Close mobile drawer on navigation
      setMobileDrawerOpen(false);
    }
    prevPathname.current = pathname;
  }, [pathname, isMobile]);
  
  // Close search drawer on navigation
  const handleNavigation = useCallback(() => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
    
    // Close mobile drawer when navigating
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  }, [isSearchOpen, setIsSearchOpen, isMobile, setMobileDrawerOpen]);
  
  // Add safe handlers for mobile drawer
  const handleMobileDrawerOpen = useCallback(() => {
    setMobileDrawerOpen(true);
  }, [setMobileDrawerOpen]);
  
  const handleMobileDrawerClose = useCallback(() => {
    setMobileDrawerOpen(false);
  }, [setMobileDrawerOpen]);
  
  // Mobile drawer toggle button - only show on mobile
  const MobileMenuButton = () => {
    if (!isMobile) return null;
    
    return (
      <button
        onClick={handleMobileDrawerOpen}
        className="fixed top-4 left-4 z-[100] bg-zinc-900/90 backdrop-blur-sm p-3 rounded-md shadow-lg border border-white/10 
                 hover:bg-zinc-800 active:bg-zinc-700 transition-all duration-200
                 h-12 w-12 flex items-center justify-center"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>
    );
  };
  
  // Mobile sidebar/drawer component
  const MobileSidebar = () => {
    if (!isMobile) return null;
    
    // Simple mobile nav item that doesn't need tooltips
    const MobileNavItem = ({ item, isActive, isRoi }: MobileNavItemProps) => {
      return (
        <Link
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5",
            isRoi && "bg-red-900/10 text-red-400 border border-red-900/20"
          )}
          onClick={handleNavigation}
        >
          <item.icon className={cn("h-5 w-5", isRoi && "text-red-400")} />
          <span>{item.title}</span>
          {item.badge && (
            <span className="ml-auto text-xs bg-white/20 text-white px-1.5 py-0.5 rounded">
              {item.badge.text}
            </span>
          )}
        </Link>
      );
    };
    
    return (
      <>
        {/* Backdrop overlay */}
        {mobileDrawerOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]" 
            onClick={handleMobileDrawerClose}
          />
        )}
        
        {/* Mobile drawer panel */}
        <div 
          className={cn(
            "fixed inset-y-0 left-0 z-[95] w-[280px] bg-zinc-950 border-r border-white/10 shadow-xl transition-all duration-300 ease-in-out transform",
            mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Header with close button */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="p-2 bg-black rounded-lg">
                  <Image 
                    src="/images/brain.svg" 
                    alt="Mindscape Logo"
                    width={24}
                    height={24}
                    className="h-5 w-5"
                  />
                </div>
              </div>
              <span className="font-bold text-lg text-white">Mindscape</span>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white"
              onClick={handleMobileDrawerClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation content */}
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-4">
              {/* User profile */}
              <div className="mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarImage src="/images/user.jpg" alt="User" />
                    <AvatarFallback className="bg-zinc-800 text-zinc-400">U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">Admin User</p>
                    <p className="text-xs text-zinc-400">admin@mindscape.ai</p>
                  </div>
                </div>
              </div>
              
              {/* Main navigation */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase text-zinc-500 font-medium mb-2">Main Navigation</h3>
                  <div className="space-y-1">
                    {mainNavItems.map((item, i) => {
                      const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                      const isRoi = item.href === "/dashboard/roi";
                      
                      return (
                        <MobileNavItem
                          key={i}
                          item={item}
                          isActive={!!isActive}
                          isRoi={isRoi}
                        />
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs uppercase text-zinc-500 font-medium mb-2">Resources</h3>
                  <div className="space-y-1">
                    {resourcesNavItems.map((item, i) => {
                      const isActive = pathname === item.href;
                      
                      return (
                        <MobileNavItem
                          key={i}
                          item={item}
                          isActive={!!isActive}
                          isRoi={false}
                        />
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs uppercase text-zinc-500 font-medium mb-2">Account</h3>
                  <div className="space-y-1">
                    {userNavItems.map((item, i) => {
                      const isActive = pathname === item.href;
                      
                      return (
                        <MobileNavItem
                          key={i}
                          item={item}
                          isActive={!!isActive}
                          isRoi={false}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Sign out button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button className="flex items-center gap-3 rounded-md px-3 py-2 w-full text-sm text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </>
    );
  };
  
  // Desktop/Tablet sidebar
  const DesktopSidebar = () => {
    if (isMobile) return null;
    
    // Inner function with access to all parent scope variables including handleNavigation
    const DesktopNavItem = ({ item, isActive, isRoi, className }: DesktopNavItemProps) => (
      <NavItem
        item={item}
        isActive={isActive}
        sidebarOpen={sidebarOpen}
        isRoi={isRoi}
        handleNavigation={handleNavigation}
        className={className}
      />
    );
    
    return (
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 transition-all duration-300 bg-gradient-to-br from-zinc-950 to-zinc-900 shadow-xl border-r border-white/5",
          sidebarOpen ? expandedWidth : collapsedWidth,
          "z-30",
          !isMobile && !sidebarOpen && "translate-x-0", // Always show on desktop/tablet (but collapsed)
          "h-screen flex flex-col"
        )}
        aria-label="Main navigation"
      >
        {/* Desktop sidebar content */}
        <div className="flex h-14 items-center gap-2 border-b border-white/5 px-3">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Back to home">
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
              <div className="transition-opacity duration-200 flex flex-col">
                <h1 className="text-lg font-bold tracking-tight font-sans flex items-center">
                  <span className="text-white">Mind</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700/80 via-red-600 to-red-700/80">scape</span>
                </h1>
                <span className="text-[10px] text-zinc-500 -mt-1">Back to Home</span>
              </div>
            )}
          </Link>

          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSidebarToggle}
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
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-3">
            {/* Main Navigation Section */}
            <div>
              <h3 className={cn(
                "text-xs font-medium text-zinc-500 mb-2",
                !sidebarOpen && "sr-only"
              )}>
                Navigation
              </h3>
              
              <nav className="space-y-1">
                {mainNavItems.map((item, i) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  const isRoi = item.href === "/dashboard/roi";
                  
                  return (
                    <DesktopNavItem 
                      key={i}
                      item={item}
                      isActive={!!isActive}
                      isRoi={isRoi}
                      className=""
                    />
                  );
                })}
              </nav>
            </div>
            
            {/* Resources Section */}
            <div>
              <h3 className={cn(
                "text-xs font-medium text-zinc-500 mb-2",
                !sidebarOpen && "sr-only"
              )}>
                Resources
              </h3>
              
              <nav className="space-y-1">
                {resourcesNavItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  
                  return (
                    <DesktopNavItem 
                      key={i}
                      item={item}
                      isActive={!!isActive}
                      isRoi={false}
                      className=""
                    />
                  );
                })}
              </nav>
            </div>
            
            {/* Account Section */}
            <div>
              <h3 className={cn(
                "text-xs font-medium text-zinc-500 mb-2",
                !sidebarOpen && "sr-only"
              )}>
                Account
              </h3>
              
              <nav className="space-y-1">
                {userNavItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  
                  return (
                    <DesktopNavItem 
                      key={i}
                      item={item}
                      isActive={!!isActive}
                      isRoi={false}
                      className=""
                    />
                  );
                })}
              </nav>
            </div>
          </div>
        </ScrollArea>
        
        {/* User Profile */}
        <div className={cn(
          "border-t border-white/10 p-3",
          !sidebarOpen && "p-2"
        )}>
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center gap-2 p-2 text-left text-sm rounded-md hover:bg-white/5",
              !sidebarOpen && "justify-center"
            )}
          >
            <Avatar className="h-8 w-8 border border-white/10">
              <AvatarImage src="/images/user.jpg" alt="User" />
              <AvatarFallback className="bg-zinc-800 text-zinc-400">U</AvatarFallback>
            </Avatar>
            
            {sidebarOpen && (
              <div className="flex-1 truncate">
                <p className="font-medium text-white">Admin User</p>
                <p className="text-xs text-zinc-400 truncate">admin@mindscape.ai</p>
              </div>
            )}
          </Button>
        </div>
      </aside>
    );
  };

  // Handle search query change
  const handleSearchQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);
  
  // Handle search drawer close
  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false);
  }, [setIsSearchOpen]);
  
  // Create a simple SearchDrawer component
  const SearchDrawer = () => {
    return (
      <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
        <div className="bg-zinc-900 border border-white/10 rounded-lg shadow-2xl w-full max-w-xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center">
            <Search className="h-5 w-5 text-zinc-400 mr-2" />
            <input 
              className="flex-1 bg-transparent border-0 text-white outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchQueryChange}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchClose}
              className="text-zinc-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4">
            <p className="text-zinc-400 text-center text-sm">Search results will appear here</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Main render method with conditional rendering of mobile or desktop sidebar
  return (
    <SidebarErrorBoundary>
      {/* Mobile components */}
      <MobileMenuButton />
      <MobileSidebar />
      
      {/* Desktop/Tablet sidebar */}
      <DesktopSidebar />
      
      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="z-[200]"
          >
            <SearchDrawer />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Additional styles */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes rgb-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Hide scrollbar but keep functionality */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          scrollbar-width: none;
        }
        
        /* Prevent body scrolling when mobile drawer is open */
        body.drawer-open {
          overflow: hidden;
          position: fixed;
          width: 100%;
        }
      `}</style>
    </SidebarErrorBoundary>
  )
} 