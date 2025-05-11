"use client"

import { useState, useEffect } from "react"
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart2,
  Bell,
  Brain,
  ChevronDown,
  Code,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  User,
  X,
  Users,
  Command as CommandIcon,
  Info,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Building,
  Cloud,
  Home,
  Briefcase,
  Building2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Command } from "cmdk"
import { mainNav } from "@/config/site-config"
import { getContainerClasses } from "@/lib/container-utils"

// Update the type definitions for nav items
type NavItem = {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  hasMegaMenu?: boolean;
  highlight?: boolean;
}

// If there are type interfaces instead, update them similarly
interface NavigationItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  hasMegaMenu?: boolean;
  highlight?: boolean;
}

// Update the component to accept fullWidth prop
interface MainNavigationProps {
  fullWidth?: boolean;
}

export default function MainNavigation({ fullWidth = true }: MainNavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "System Update", message: "New features available", type: "info" },
    { id: 2, title: "Security Alert", message: "Unusual activity detected", type: "warning" },
    { id: 3, title: "Performance", message: "System optimization complete", type: "success" },
  ])
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    solutions: false,
    resources: false,
    company: false,
    services: false,
    projects: false,
  })

  // Add error handling for navigation
  const [navigationError, setNavigationError] = useState(false)
  
  // Add responsive state for proper breakpoints
  const [isMobile, setIsMobile] = useState(false)
  
  // Add resize handler for better responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    // Set initial value
    handleResize()
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  
  // Focus trap for accessibility
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, isMobile])

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
      });
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Track scroll progress for animation effects
  useEffect(() => {
    const handleScrollProgress = () => {
      // Calculate how far down the page the user has scrolled
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)
    }
    
    window.addEventListener("scroll", handleScrollProgress)
    return () => window.removeEventListener("scroll", handleScrollProgress)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setIsCommandOpen(true)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const solutions = [
    {
      title: "Industry Solutions",
      href: "/solutions/industry",
      description: "Tailored AI solutions for specific industries",
      icon: <Building className="h-5 w-5 text-red-500" />,
    },
    {
      title: "Blockchain Solutions",
      href: "/solutions/blockchain",
      description: "Enterprise-grade blockchain and Web3 solutions",
      icon: <Code className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Generative AI",
      href: "/solutions/genai",
      description: "Advanced language models and content generation",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Enterprise Solutions",
      href: "/solutions/enterprise",
      description: "Comprehensive AI for large organizations",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Cloud Solutions",
      href: "/solutions/cloud",
      description: "Scalable cloud AI infrastructure",
      icon: <Cloud className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Real Estate Solutions",
      href: "/solutions/real-estate",
      description: "Advanced AI-powered analytics and management for real estate",
      icon: <Home className="h-5 w-5 text-orange-500" />,
    },
  ]

  const resources = [
    {
      title: "Documentation",
      href: "/docs",
      description: "Comprehensive guides and API references",
      icon: <FileText className="h-5 w-5 text-orange-500" />,
    },
    {
      title: "Blog",
      href: "/blog",
      description: "Latest news, updates, and insights",
      icon: <FileText className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Developer Resources",
      href: "/developers",
      description: "SDKs, tools, and integration guides",
      icon: <Code className="h-5 w-5 text-cyan-500" />,
    },
    {
      title: "Support",
      href: "/support",
      description: "Get help from our expert team",
      icon: <HelpCircle className="h-5 w-5 text-red-500" />,
    },
  ]

  const company = [
    {
      title: "About Us",
      href: "/about",
      description: "Learn about our mission and vision",
      icon: <Building2 className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Careers",
      href: "/careers",
      description: "Join our growing team",
      icon: <Briefcase className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Get in touch with our team",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Pricing",
      href: "/pricing",
      description: "View our pricing plans and packages",
      icon: <CreditCard className="h-5 w-5 text-amber-500" />,
    },
  ]

  const services = [
    {
      title: "Strategy & Roadmapping",
      href: "/services/strategy",
      description: "Strategic planning and technology roadmapping for your business",
      icon: <FileText className="h-5 w-5 text-emerald-500" />,
    },
    {
      title: "Implementation & Integration",
      href: "#",
      description: "Coming soon - Enterprise implementation and system integration",
      icon: <Code className="h-5 w-5 text-amber-500" />,
      comingSoon: true,
    },
    {
      title: "Managed Services",
      href: "/services",
      description: "Ongoing management and optimization of your solutions",
      icon: <Settings className="h-5 w-5 text-indigo-500" />,
    },
    {
      title: "Training & Support",
      href: "/services/training",
      description: "Expert training and dedicated support for your team",
      icon: <Users className="h-5 w-5 text-pink-500" />,
    },
  ]

  const projects = [
    {
      title: "Case Studies",
      href: "/case-studies",
      description: "Explore our successful client implementations and outcomes",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Client Portfolio",
      href: "/projects",
      description: "Our complete portfolio of enterprise client projects",
      icon: <BarChart2 className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Success Stories",
      href: "/projects/success-stories",
      description: "Transformative business impacts we've delivered for our clients",
      icon: <CheckCircle2 className="h-5 w-5 text-amber-500" />,
    },
  ]

  const quickActions = [
    {
      title: "Search",
      icon: <Search className="h-4 w-4 text-white/50" />,
      shortcut: "⌘K",
    },
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4 text-white/50" />,
      shortcut: "⌘D",
    },
    {
      title: "Documentation",
      icon: <FileText className="h-4 w-4 text-white/50" />,
      shortcut: "⌘H",
    },
    {
      title: "Settings",
      icon: <Settings className="h-4 w-4 text-white/50" />,
      shortcut: "⌘S",
    },
  ]

  const primaryNavItems: NavItem[] = [
    { title: "Solutions", hasMegaMenu: true },
    { title: "Services", hasMegaMenu: true },
    { title: "Our Projects", hasMegaMenu: true },
    { title: "Resources", hasMegaMenu: true },
    { title: "Company", hasMegaMenu: true },
  ]

  const mobileNavItems: NavItem[] = [
    // Use solution groups for mobile too
    { title: "Solutions", href: "#", icon: <Building className="h-5 w-5" />, hasMegaMenu: true },
    { title: "Industry Solutions", href: "/solutions/industry", icon: <Building className="h-5 w-5" /> },
    { title: "Blockchain Solutions", href: "/solutions/blockchain", icon: <Code className="h-5 w-5" /> },
    { title: "Generative AI", href: "/solutions/genai", icon: <MessageSquare className="h-5 w-5" /> },
    { title: "Enterprise Solutions", href: "/solutions/enterprise", icon: <Brain className="h-5 w-5" /> },
    { title: "Cloud Solutions", href: "/solutions/cloud", icon: <Cloud className="h-5 w-5" /> },
    { title: "Real Estate Solutions", href: "/solutions/real-estate", icon: <Home className="h-5 w-5" /> },
    
    // Services section
    { title: "Services", href: "#", icon: <Settings className="h-5 w-5" />, hasMegaMenu: true },
    { title: "Strategy & Roadmapping", href: "/services/strategy", icon: <FileText className="h-5 w-5" /> },
    { title: "Implementation & Integration", href: "#", icon: <Code className="h-5 w-5" /> },
    { title: "Managed Services", href: "/services", icon: <Settings className="h-5 w-5" /> },
    { title: "Training & Support", href: "/services/training", icon: <Users className="h-5 w-5" /> },
    
    // Projects section
    { title: "Our Projects", href: "#", icon: <FileText className="h-5 w-5" />, hasMegaMenu: true },
    { title: "Case Studies", href: "/case-studies", icon: <FileText className="h-5 w-5" /> },
    { title: "Client Portfolio", href: "/projects", icon: <BarChart2 className="h-5 w-5" /> },
    { title: "Success Stories", href: "/projects/success-stories", icon: <CheckCircle2 className="h-5 w-5" /> },
    
    // Resources section
    { title: "Resources", href: "#", icon: <HelpCircle className="h-5 w-5" />, hasMegaMenu: true },
    { title: "Documentation", href: "/docs", icon: <FileText className="h-5 w-5" /> },
    { title: "Blog", href: "/blog", icon: <FileText className="h-5 w-5" /> },
    { title: "Developer Resources", href: "/developers", icon: <Code className="h-5 w-5" /> },
    { title: "Support", href: "/support", icon: <HelpCircle className="h-5 w-5" /> },
    
    // Company section
    { title: "Company", href: "#", icon: <Building className="h-5 w-5" />, hasMegaMenu: true },
    { title: "About Us", href: "/about", icon: <Building2 className="h-5 w-5" /> },
    { title: "Careers", href: "/careers", icon: <Briefcase className="h-5 w-5" /> },
    { title: "Contact", href: "/contact", icon: <MessageSquare className="h-5 w-5" /> },
    { title: "Pricing", href: "/pricing", icon: <CreditCard className="h-5 w-5" /> },
    
    // Main items
    { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  ]

  // Add error state for mega menu rendering
  const [menuError, setMenuError] = useState(false)
  
  // Add keyboard navigation handler for better accessibility
  const handleKeyNavigation = (e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      window.location.href = href
    }
  }
  
  // Safely render the mega menu content
  const renderMegaMenu = (type: string) => {
    try {
      if (type === "Solutions") {
        return solutions.map((menuItem) => (
          <li key={menuItem.title}>
            <NavigationMenuLink asChild>
              <Link
                href={menuItem.href}
                className="flex p-4 select-none rounded-lg hover:bg-red-900/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-black/20 p-2.5 rounded-xl backdrop-blur-lg group-hover:bg-red-500/10 group-hover:scale-110 transition-all duration-300">
                    {menuItem.icon}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">
                      {menuItem.title}
                    </div>
                    <p className="line-clamp-2 text-xs text-white/70 leading-relaxed">{menuItem.description}</p>
                  </div>
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        ))
      } else if (type === "Resources") {
        return resources.map((menuItem) => (
          <li key={menuItem.title}>
            <NavigationMenuLink asChild>
              <Link
                href={menuItem.href}
                className="flex p-4 select-none rounded-lg hover:bg-red-900/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-black/20 p-2.5 rounded-xl backdrop-blur-lg group-hover:bg-red-500/10 group-hover:scale-110 transition-all duration-300">
                    {menuItem.icon}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">
                      {menuItem.title}
                    </div>
                    <p className="line-clamp-2 text-xs text-white/70 leading-relaxed">{menuItem.description}</p>
                  </div>
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        ))
      } else if (type === "Company") {
        return company.map((menuItem) => (
          <li key={menuItem.title}>
            <NavigationMenuLink asChild>
              <Link
                href={menuItem.href}
                className="flex p-4 select-none rounded-lg hover:bg-red-900/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-black/20 p-2.5 rounded-xl backdrop-blur-lg group-hover:bg-red-500/10 group-hover:scale-110 transition-all duration-300">
                    {menuItem.icon}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">
                      {menuItem.title}
                    </div>
                    <p className="line-clamp-2 text-xs text-white/70 leading-relaxed">{menuItem.description}</p>
                  </div>
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        ))
      } else if (type === "Services") {
        return services.map((menuItem) => (
          <li key={menuItem.title}>
            <NavigationMenuLink asChild>
              <Link
                href={menuItem.href}
                className={`flex p-4 select-none rounded-lg hover:bg-red-900/20 transition-all duration-300 group ${menuItem.comingSoon ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={(e) => menuItem.comingSoon && e.preventDefault()}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-black/20 p-2.5 rounded-xl backdrop-blur-lg group-hover:bg-red-500/10 group-hover:scale-110 transition-all duration-300">
                    {menuItem.icon}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-sm font-medium text-white group-hover:text-red-400 transition-colors flex items-center">
                      {menuItem.title}
                      {menuItem.comingSoon && (
                        <span className="ml-2 text-[9px] uppercase bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">Coming Soon</span>
                      )}
                    </div>
                    <p className="line-clamp-2 text-xs text-white/70 leading-relaxed">{menuItem.description}</p>
                  </div>
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        ))
      } else if (type === "Our Projects") {
        return projects.map((menuItem) => (
          <li key={menuItem.title}>
            <NavigationMenuLink asChild>
              <Link
                href={menuItem.href}
                className="flex p-4 select-none rounded-lg hover:bg-red-900/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-black/20 p-2.5 rounded-xl backdrop-blur-lg group-hover:bg-red-500/10 group-hover:scale-110 transition-all duration-300">
                    {menuItem.icon}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">
                      {menuItem.title}
                    </div>
                    <p className="line-clamp-2 text-xs text-white/70 leading-relaxed">{menuItem.description}</p>
                  </div>
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        ))
      } else {
        return null
      }
    } catch (error) {
      console.error("Error rendering mega menu:", error)
      setMenuError(true)
      return (
        <li className="p-4">
          <div className="bg-red-500/10 p-3 rounded-lg">
            <p className="text-sm text-white">Sorry, there was a problem loading this menu. Please try again later.</p>
          </div>
        </li>
      )
    }
  }
  
  // Optimize navigation item rendering with error handling
  const renderNavItem = (item: NavItem, index: number) => {
    if (item.hasMegaMenu) {
      return (
        <NavigationMenuItem key={`${item.title}-${index}`} className="mx-0.5">
          <NavigationMenuTrigger className="bg-transparent hover:bg-red-900/20 text-white rounded-full text-sm px-3.5 py-1.5 font-medium group">
            {item.title}
            <ChevronDown className="h-4 w-4 ml-0.5 text-white/70 group-hover:text-red-400 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[500px] gap-4 p-6 md:w-[600px] md:grid-cols-2 bg-black/80 backdrop-blur-2xl rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/10 to-transparent"></div>
              {renderMegaMenu(item.title)}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    } else {
      return (
        <NavigationMenuItem key={`${item.title}-${index}`} className="mx-0.5">
          <Link href={item.href || "/"} legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "flex items-center text-sm px-3.5 py-1.5 rounded-full bg-transparent hover:bg-red-900/20 text-white font-medium transition-colors duration-300 ease-in-out",
                pathname === item.href && "bg-red-900/30",
                item.highlight && "bg-gradient-to-r from-red-700/80 to-red-600/80 hover:from-red-600 hover:to-red-500",
              )}
              onKeyDown={(e) => handleKeyNavigation(e, item.href || "/")}
            >
              {item.icon && <span className="mr-1.5">{item.icon}</span>}
              {item.title}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      )
    }
  }

  // Safely render mobile menu items with error handling
  const renderMobileNavItems = () => {
    try {
      // Group items for organization
      const solutionsItems = mobileNavItems.filter(item => 
        item.href?.startsWith('/solutions/') || (item.title === 'Solutions' && item.hasMegaMenu)
      );
      const servicesItems = mobileNavItems.filter(item => 
        (item.title === 'Strategy & Roadmapping' || 
         item.title === 'Implementation & Integration' || 
         item.title === 'Managed Services' || 
         item.title === 'Training & Support') ||
        (item.title === 'Services' && item.hasMegaMenu)
      );
      const projectsItems = mobileNavItems.filter(item => 
        (item.title === 'Case Studies' || 
         item.title === 'Client Portfolio' || 
         item.title === 'Success Stories') ||
        (item.title === 'Our Projects' && item.hasMegaMenu)
      );
      const resourcesItems = mobileNavItems.filter(item => 
        (item.title === 'Documentation' || item.title === 'Blog' || 
         item.title === 'Developer Resources' || item.title === 'Support') ||
        (item.title === 'Resources' && item.hasMegaMenu)
      );
      const companyItems = mobileNavItems.filter(item => 
        (item.title === 'About Us' || item.title === 'Careers' || 
         item.title === 'Contact') ||
        (item.title === 'Company' && item.hasMegaMenu)
      );
      const mainItems = mobileNavItems.filter(item => 
        !item.href?.startsWith('/solutions/') && 
        item.title !== 'Solutions' &&
        item.title !== 'Services' &&
        item.title !== 'Strategy & Roadmapping' &&
        item.title !== 'Implementation & Integration' &&
        item.title !== 'Managed Services' &&
        item.title !== 'Training & Support' &&
        item.title !== 'Our Projects' &&
        item.title !== 'Case Studies' &&
        item.title !== 'Client Portfolio' &&
        item.title !== 'Success Stories' &&
        item.title !== 'Resources' &&
        item.title !== 'Documentation' &&
        item.title !== 'Blog' &&
        item.title !== 'Developer Resources' &&
        item.title !== 'Support' &&
        item.title !== 'About Us' &&
        item.title !== 'Careers' &&
        item.title !== 'Contact' &&
        item.title !== 'Company'
      );

      const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
          ...prev,
          [section]: !prev[section]
        }));
      };

      return (
        <div className="flex flex-col space-y-1 my-2">
          <div className="shadow-inner shadow-black/10 pb-3 mb-2">
            <div className="flex items-center space-x-2 mb-2 px-3">
              <Search className="h-4 w-4 text-white/50" />
              <Input
                placeholder="Search..."
                className="border-none bg-white/5 text-white"
                aria-label="Search in mobile menu"
              />
            </div>
          </div>
          
          {/* Solutions Section */}
          <div className="mb-2">
            <button 
              onClick={() => toggleSection('solutions')}
              className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="text-white/70"><Building className="h-5 w-5" /></div>
                <span className="text-sm font-medium">Solutions</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expandedSections.solutions ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.solutions && (
              <div className="pl-10 space-y-1 mt-1 border-l-2 border-red-900/20 ml-5">
                {solutionsItems.slice(1).map((item, index) => (
            <Link
                    key={`mobile-solutions-${index}`}
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center space-x-2.5 rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors",
                      pathname === item.href ? "bg-red-900/30" : ""
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="text-white/70">{item.icon}</div>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Services Section */}
          <div className="mb-2">
            <button 
              onClick={() => toggleSection('services')}
              className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="text-white/70"><Settings className="h-5 w-5" /></div>
                <span className="text-sm font-medium">Services</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expandedSections.services ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.services && (
              <div className="pl-10 space-y-1 mt-1 border-l-2 border-red-900/20 ml-5">
                {servicesItems.slice(1).map((item, index) => (
                  <Link
                    key={`mobile-services-${index}`}
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center space-x-2.5 rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors",
                      pathname === item.href ? "bg-red-900/30" : "",
                      item.title === "Implementation & Integration" ? "opacity-70" : ""
                    )}
                    onClick={(e) => {
                      if (item.title === "Implementation & Integration") {
                        e.preventDefault();
                      } else {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <div className="text-white/70">{item.icon}</div>
                    <div className="flex flex-col">
                      <span className="text-sm">{item.title}</span>
                      {item.title === "Implementation & Integration" && (
                        <span className="text-[9px] text-amber-400">Coming Soon</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Projects Section */}
          <div className="mb-2">
            <button 
              onClick={() => toggleSection('projects')}
              className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="text-white/70"><FileText className="h-5 w-5" /></div>
                <span className="text-sm font-medium">Our Projects</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expandedSections.projects ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.projects && (
              <div className="pl-10 space-y-1 mt-1 border-l-2 border-red-900/20 ml-5">
                {projectsItems.slice(1).map((item, index) => (
                  <Link
                    key={`mobile-projects-${index}`}
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center space-x-2.5 rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors",
                      pathname === item.href ? "bg-red-900/30" : ""
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="text-white/70">{item.icon}</div>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Resources Section */}
          <div className="mb-2">
            <button 
              onClick={() => toggleSection('resources')}
              className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="text-white/70"><HelpCircle className="h-5 w-5" /></div>
                <span className="text-sm font-medium">Resources</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expandedSections.resources ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.resources && (
              <div className="pl-10 space-y-1 mt-1 border-l-2 border-red-900/20 ml-5">
                {resourcesItems.slice(1).map((item, index) => (
                  <Link
                    key={`mobile-resources-${index}`}
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center space-x-2.5 rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors",
                      pathname === item.href ? "bg-red-900/30" : ""
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="text-white/70">{item.icon}</div>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Company Section */}
          <div className="mb-2">
            <button 
              onClick={() => toggleSection('company')}
              className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="text-white/70"><Building2 className="h-5 w-5" /></div>
                <span className="text-sm font-medium">Company</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expandedSections.company ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.company && (
              <div className="pl-10 space-y-1 mt-1 border-l-2 border-red-900/20 ml-5">
                {companyItems.slice(1).map((item, index) => (
                  <Link
                    key={`mobile-company-${index}`}
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center space-x-2.5 rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors",
                      pathname === item.href ? "bg-red-900/30" : ""
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="text-white/70">{item.icon}</div>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Main Items */}
          {mainItems.map((item, index) => (
            <Link
              key={`mobile-main-${index}`}
              href={item.href || "#"}
              className={cn(
                "flex items-center space-x-2.5 rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors",
                pathname === item.href ? "bg-red-900/30" : ""
              )}
              onClick={() => setIsOpen(false)}
            >
              <div className="text-white/70">{item.icon}</div>
              <span className="text-sm">{item.title}</span>
            </Link>
          ))}

          <div className="shadow-inner shadow-black/10 pt-3 mt-2">
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-black/50 text-white text-xs">JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-white">John Doe</div>
                  <div className="text-xs text-white/50">john@example.com</div>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )
    } catch (error) {
      console.error("Error rendering mobile menu:", error)
      return (
        <div className="flex flex-col p-4">
          <div className="bg-red-500/10 p-3 rounded-lg mb-4">
            <p className="text-sm text-white">Something went wrong. Please refresh the page.</p>
            <Button 
              size="sm" 
              className="mt-2 bg-red-600 hover:bg-red-700" 
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
          
          <Link href="/" className="flex items-center space-x-2.5 rounded-lg px-3 py-2 text-white hover:bg-red-900/20 transition-colors">
            <div className="text-white/70"><Home className="h-5 w-5" /></div>
            <span className="text-sm">Home</span>
          </Link>
        </div>
      )
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 w-full z-50 transition-all duration-300 will-change-transform bg-black/60 backdrop-blur-xl"
      >
        {/* Background effects - simplified for consistent black blur effect */}
        <div className="absolute inset-0 w-full">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
            
        <div className={getContainerClasses({ fullWidth: true, noPadding: false, className: "w-full" })}>
          <div className="flex items-center justify-between h-16 w-full">
            <Link href="/" className="flex items-center gap-2 group relative z-10">
              <div className="relative flex flex-col items-start">
                <div className="flex items-center gap-3 group">
                  {/* Logo container */}
                  <div className="relative">
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
                        <Image src="/images/brain.svg" alt="AI Icon" width={500} height={300} className="h-8 w-8 text-red-700 transform transition-all duration-300 group-hover:text-red-600" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text part */}
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight font-sans">
                      <span className="text-white">Mindscape</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700/80 via-red-600 to-red-700/80 ml-1.5">Analytics</span>
                    </h1>
                    <p className="text-xs text-white/70 mt-0.5">Where AI Meets Innovation</p>
                  </div>
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <NavigationMenu>
                <NavigationMenuList className="rounded-full px-2 py-1.5 flex items-center gap-x-1 shadow-md shadow-black/20 transition-all duration-300 bg-black/30 backdrop-blur-xl">
                  {primaryNavItems.map((item, index) => renderNavItem(item, index))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-red-900/20 rounded-full"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-red-900/20 rounded-full"
                onClick={() => setIsCommandOpen(true)}
              >
                <CommandIcon className="h-5 w-5" />
              </Button>

              <AnimatePresence mode="sync">
                {searchOpen && (
                  <motion.div
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 250, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden"
                  >
                    <Input
                      placeholder="Search..."
                      className="border-none bg-white/5 text-white focus-visible:ring-red-500 rounded-full"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-red-900/20 relative rounded-full"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <div
                        key="notification-badge"
                        className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] font-medium flex items-center justify-center text-white"
                      >
                        {unreadNotifications}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-black/90 backdrop-blur-md shadow-xl shadow-black/20 rounded-xl">
                  <div className="flex items-center justify-between p-2">
                    <DropdownMenuLabel className="text-white/70">Notifications</DropdownMenuLabel>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-white/50 hover:text-white hover:bg-white/5"
                      onClick={() => setUnreadNotifications(0)}
                    >
                      Mark all as read
                    </Button>
                  </div>
                  <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-red-900/30 to-transparent" />
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex items-start space-x-3 p-3 cursor-pointer hover:bg-red-900/20 group"
                      >
                        <div
                          className={cn(
                            "p-1 rounded-md",
                            notification.type === "info" && "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20",
                            notification.type === "warning" && "bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20",
                            notification.type === "success" && "bg-green-500/10 text-green-500 group-hover:bg-green-500/20"
                          )}
                        >
                          {notification.type === "info" && <Info key="info-icon" className="h-4 w-4" />}
                          {notification.type === "warning" && <AlertCircle key="warning-icon" className="h-4 w-4" />}
                          {notification.type === "success" && <CheckCircle2 key="success-icon" className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">
                            {notification.title}
                          </div>
                          <div className="text-xs text-white/50">{notification.message}</div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-red-900/30 to-transparent" />
                  <DropdownMenuItem className="text-center text-white/70 hover:text-white hover:bg-red-900/20 group">
                    <span className="group-hover:text-red-400 transition-colors">View all notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-black/50 hover:bg-red-900/20">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback className="bg-black/50 text-white">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-md shadow-xl shadow-black/20 rounded-xl">
                  <DropdownMenuLabel className="text-white/70">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-red-900/30 to-transparent" />
                  <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 group">
                    <div className="mr-2 group-hover:text-red-400">
                      <User className="h-4 w-4" />
                    </div>
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 group">
                    <div className="mr-2 group-hover:text-red-400">
                      <LayoutDashboard className="h-4 w-4" />
                    </div>
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 group">
                    <div className="mr-2 group-hover:text-red-400">
                      <Settings className="h-4 w-4" />
                    </div>
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-red-900/30 to-transparent" />
                  <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-red-900/20 group">
                    <div className="mr-2 group-hover:text-red-400">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="hidden sm:block">
                <Link href="/dashboard">
                  <Button variant="default" className="ml-2 bg-gradient-to-r from-red-700 to-red-600 text-white hover:from-red-600 hover:to-red-500 rounded-full">
                    <LayoutDashboard className="mr-1.5 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "text-white ml-2 transition-all duration-300",
                  isScrolled ? "hover:bg-black/40" : "hover:bg-red-900/20"
                )}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 h-[calc(100vh-4rem)] bg-black/80 backdrop-blur-xl lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Mobile menu background effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10"></div>
              <div className="absolute top-1/4 left-1/3 w-[200px] h-[200px] rounded-full bg-red-900/5 blur-[80px]"></div>
              <div className="absolute bottom-1/3 right-1/4 w-[150px] h-[150px] rounded-full bg-red-800/5 blur-[100px]"></div>
            </div>
            
            <div className="container mx-auto px-2 sm:px-4 py-2 relative">
              {renderMobileNavItems()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Menu */}
      <AnimatePresence>
        {isCommandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCommandOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="container max-w-lg mx-auto mt-[20vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Command className="rounded-xl shadow-xl bg-black/90 backdrop-blur-xl">
                <div className="flex items-center shadow-inner shadow-black/10 px-4 py-2">
                  <CommandIcon className="mr-2 h-4 w-4 text-white/50" />
                  <input
                    className="flex-1 bg-transparent h-10 outline-none placeholder:text-white/50 text-white border-none"
                    placeholder="Type a command or search..."
                    autoFocus
                  />
                </div>
                <div className="py-2 px-2">
                  <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-semibold text-white/50">
                    {mobileNavItems.map((item) => (
                      <Command.Item
                        key={item.title}
                        className="rounded-lg px-2 py-1.5 cursor-pointer text-white aria-selected:bg-red-900/30 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-white/60 group-aria-selected:text-red-400 group-hover:text-red-400">
                            {item.icon}
                          </div>
                          <span>{item.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChevronRight className="h-4 w-4 text-white/30" />
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                  <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-xs font-semibold text-white/50">
                    {quickActions.map((action) => (
                      <Command.Item
                        key={action.title}
                        className="rounded-lg px-2 py-1.5 cursor-pointer text-white aria-selected:bg-red-900/30 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-white/60 group-aria-selected:text-red-400 group-hover:text-red-400">
                            {action.icon}
                          </div>
                          <span>{action.title}</span>
                        </div>
                        <kbd className="bg-white/5 border-none rounded px-1.5 py-0.5 text-[10px] font-mono text-white/70 shadow-inner shadow-black/20">
                          {action.shortcut}
                        </kbd>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </div>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error notification */}
      {menuError && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>Menu error occurred. Please refresh the page.</p>
            <Button 
              size="sm" 
              variant="ghost" 
              className="ml-2 hover:bg-red-700" 
              onClick={() => setMenuError(false)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </>
  );
}


