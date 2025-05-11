"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, AlertCircle, Clock, Zap, PlayCircle, PauseCircle, Info, ExternalLink, Lock, User, Settings, FileCode } from "lucide-react"
import { FlexibleSection } from "@/components/flexible-section"

type NewsItem = {
  id: number
  text: string
  color: "red" | "white"
  icon?: "alert" | "clock" | "zap" | "lock" | "user" | "settings" | "code" | null
  priority?: "breaking" | "standard" | "update" | null
  details?: string
  link?: string
  dynamicBackground?: "red" | "green" | null
}

export default function NewsTicker() {
  // News data
  const newsItems = useMemo<NewsItem[]>(() => [
    { 
      id: 1, 
      text: "BREAKING: Platform is currently under development", 
      color: "white", 
      icon: "alert", 
      priority: "breaking",
      details: "Our team is working tirelessly to bring you cutting-edge features and a seamless experience.",
    },
    { 
      id: 2, 
      text: "UPCOMING: New AI features coming soon", 
      color: "red", 
      icon: "clock",
      details: "Advanced machine learning algorithms will power new predictive analytics features.",
      link: "#ai-features",
      dynamicBackground: "red"
    },
    { 
      id: 3, 
      text: "IN PROGRESS: Blockchain integration", 
      color: "white", 
      icon: "zap",
      details: "Secure, transparent transactions will be available across our entire platform.",
    },
    { 
      id: 4, 
      text: "LAUNCHING NEXT MONTH: Enhanced data visualization tools", 
      color: "red", 
      icon: "clock", 
      priority: "update",
      details: "Beautiful, interactive charts and dashboards for deeper insights into your data.",
      link: "#data-viz"
    },
    { 
      id: 5, 
      text: "JOIN NOW: Early access program available", 
      color: "white", 
      icon: null,
      details: "Sign up for exclusive early access to upcoming features and provide valuable feedback.",
      link: "#sign-up",
      dynamicBackground: "green"
    },
    { 
      id: 6, 
      text: "JUST RELEASED: Developer API documentation", 
      color: "red", 
      icon: "zap", 
      priority: "breaking",
      details: "Comprehensive guides and references for integrating your applications with our platform.",
      link: "#api-docs"
    },
    { 
      id: 7, 
      text: "UNDER DEVELOPMENT: User authentication system", 
      color: "white", 
      icon: "lock",
      details: "Secure login functionality with multi-factor authentication and social login options.",
      link: "#login"
    },
    { 
      id: 8, 
      text: "COMING SOON: User profile customization", 
      color: "red", 
      icon: "user",
      details: "Personalize your experience with custom avatars, themes, and privacy settings.",
      link: "#profile"
    },
    { 
      id: 9, 
      text: "BETA TESTING: Advanced user permission settings", 
      color: "white", 
      icon: "settings",
      details: "Granular control over user access and permissions for enterprise customers.",
      priority: "update"
    },
    { 
      id: 10, 
      text: "IN DEVELOPMENT: Custom code integration", 
      color: "red", 
      icon: "code",
      details: "Soon you'll be able to inject custom code and extend platform functionality.",
    },
    {
      id: 11,
      text: "NEW: Tech Stack Feature Showcase released",
      color: "white",
      icon: "code",
      details: "Explore our comprehensive technology stack with interactive visualizations and detailed information.",
      link: "#tech-stack",
      dynamicBackground: "green"
    },
    {
      id: 12,
      text: "CRITICAL: Security update required for all users",
      color: "red",
      icon: "alert",
      details: "Important security patches have been released. Please update your applications immediately.",
      priority: "breaking",
      dynamicBackground: "red"
    }
  ], []);

  // State
  const [tickerWidth, setTickerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState<{text: string, link?: string} | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);

  // Refs
  const tickerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculate widths for animation
  useEffect(() => {
    if (!tickerRef.current || !contentRef.current) return;
    
    const updateWidths = () => {
      setTickerWidth(tickerRef.current?.offsetWidth || 0);
      setContentWidth(contentRef.current?.offsetWidth || 0);
    };
    
    updateWidths();
    
    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateWidths, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle keyboard interaction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Space" || e.key === " ") {
        setIsPaused(prev => !prev);
        setHasInteracted(true);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-hide tooltip after delay
  useEffect(() => {
    if (!isTooltipVisible || isPaused) return;
    
    const timer = setTimeout(() => {
      setIsTooltipVisible(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isTooltipVisible, isPaused]);

  // Icon selector component
  const IconComponent = ({ type }: { type: "alert" | "clock" | "zap" | "lock" | "user" | "settings" | "code" | null }) => {
    switch (type) {
      case "alert": return <AlertCircle className="h-3 w-3 mr-1.5" />;
      case "clock": return <Clock className="h-3 w-3 mr-1.5" />;
      case "zap": return <Zap className="h-3 w-3 mr-1.5" />;
      case "lock": return <Lock className="h-3 w-3 mr-1.5" />;
      case "user": return <User className="h-3 w-3 mr-1.5" />;
      case "settings": return <Settings className="h-3 w-3 mr-1.5" />;
      case "code": return <FileCode className="h-3 w-3 mr-1.5" />;
      default: return null;
    }
  };

  // Show tooltip with details
  const showTooltip = (item: NewsItem, x: number) => {
    if (!item.details) return;
    
    setTooltipContent({
      text: item.details,
      link: item.link
    });
    setTooltipPosition({ x, y: 0 });
    setIsTooltipVisible(true);
  };

  // Handle link navigation
  const handleLinkClick = (e: React.MouseEvent, link?: string) => {
    if (!link) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render news item with enhanced styling
  const NewsElement = ({ item, index }: { item: NewsItem; index: number }) => {
    // Enhanced base classes with dynamic background
    const baseClasses = `
      relative flex items-center h-8 px-3 py-1 mx-1.5
      ${item.priority === "breaking" ? "bg-gradient-to-r from-red-900/80 to-red-950/70" : 
        item.dynamicBackground === "red" ? "bg-gradient-to-r from-red-800/60 to-red-900/50" :
        item.dynamicBackground === "green" ? "bg-gradient-to-r from-green-800/60 to-green-900/50" :
        "bg-gradient-to-r from-black/70 to-zinc-900/60"} 
      ${item.link ? "cursor-pointer" : "cursor-default"}
      rounded-sm 
      backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200
    `;
    
    // Handle hover
    const handleHoverStart = () => {
      setHoveredItem(index);
      const parentRect = tickerRef.current?.getBoundingClientRect();
      const itemRect = document.getElementById(`news-item-${index}`)?.getBoundingClientRect();
      
      if (itemRect && parentRect) {
        const relativeX = itemRect.left - parentRect.left + (itemRect.width / 2);
        showTooltip(item, relativeX);
      }
    };
    
    return (
      <motion.div 
        className={baseClasses}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        onHoverStart={handleHoverStart}
        onHoverEnd={() => setHoveredItem(null)}
        id={`news-item-${index}`}
        whileHover={{ scale: 1.02, zIndex: 20 }}
        onClick={(e) => handleLinkClick(e, item.link)}
      >
        {/* Priority badges */}
        {item.priority === "breaking" && (
          <span className="inline-flex items-center bg-gradient-to-r from-red-600/90 to-red-700/90 text-white text-[9px] px-1.5 py-0.5 rounded-sm mr-2 uppercase tracking-widest whitespace-nowrap font-semibold shadow-sm">
            Breaking
          </span>
        )}
        
        {item.priority === "update" && (
          <span className="inline-flex items-center bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white text-[9px] px-1.5 py-0.5 rounded-sm mr-2 uppercase tracking-widest whitespace-nowrap font-semibold shadow-sm">
            Update
          </span>
        )}
        
        {/* News item content */}
        <span className={`font-sans text-xs leading-none whitespace-nowrap ${
          item.color === "red" 
            ? "text-red-400 font-medium" 
            : "text-white/95 font-normal"
          } flex items-center`}
        >
          {item.icon && (
            <span className={`mr-1.5 ${item.color === "red" ? "text-red-400" : "text-white/90"}`}>
              <IconComponent type={item.icon} />
            </span>
          )}
          
          <span className="mr-1 font-semibold tracking-wide">
            {item.text.split(':')[0]}:
          </span>
          <span className="max-w-[160px] truncate tracking-wide">
            {item.text.split(':')[1]}
          </span>
        </span>
        
        {/* Icon indicators */}
        {item.details && (
          <Info className="h-3 w-3 ml-1.5 opacity-70 flex-shrink-0 text-white/90" />
        )}
        
        {item.link && (
          <ExternalLink className="h-3 w-3 ml-2 opacity-70 flex-shrink-0 text-white/90" />
        )}
      </motion.div>
    );
  };

  // Memoize the item rendering to optimize performance
  const renderItems = useMemo(() => {
    const allItemSets = [];
    
    // First set
    allItemSets.push(
      newsItems.map((item, index) => (
        <NewsElement key={`first-${item.id}`} item={item} index={index} />
      ))
    );
    
    // Second set
    allItemSets.push(
      newsItems.map((item, index) => (
        <NewsElement key={`second-${item.id}`} item={item} index={index + newsItems.length} />
      ))
    );
    
    // Third set
    allItemSets.push(
      newsItems.map((item, index) => (
        <NewsElement key={`third-${item.id}`} item={item} index={index + newsItems.length * 2} />
      ))
    );
    
    return allItemSets.flat();
  }, [newsItems, isPaused, hoveredItem]);

  return (
    <FlexibleSection fullWidth={true} className="relative z-20" noPadding>
      <div 
        className="w-full h-[0.6in] overflow-hidden relative bg-gradient-to-r from-red-950/60 via-black/70 to-red-950/60 backdrop-blur-sm shadow-xl"
        ref={tickerRef}
        onMouseEnter={() => {
          setIsPaused(true);
          setHasInteracted(true);
        }}
        onMouseLeave={() => {
          if (hasInteracted) setIsPaused(false);
          setIsTooltipVisible(false);
        }}
        role="region"
        aria-label="News Banner"
        tabIndex={0}
      >
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10"></div>
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Black overlay with 50% transparency */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* News items container */}
        <div className="flex items-center h-full relative z-10 py-2">
          <motion.div
            ref={contentRef}
            className="flex items-center gap-0 px-4"
            animate={{
              x: isPaused ? 'pause' : [0, -contentWidth],
            }}
            transition={{
              x: {
                duration: contentWidth / 30, // Speed based on content width
                ease: "linear",
                repeat: Infinity,
              },
            }}
          >
            {renderItems}
          </motion.div>
        </div>
        
        {/* Tooltip */}
        <AnimatePresence>
          {isTooltipVisible && tooltipContent && (
            <motion.div 
              className="absolute top-[-70px] transform -translate-x-1/2 bg-black/90 px-4 py-2.5 rounded-md shadow-xl z-40 max-w-sm text-sm text-white/95 border border-red-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{ left: `${tooltipPosition.x}px` }}
            >
              <div className="relative">
                <p className="text-xs font-medium leading-relaxed tracking-wide">{tooltipContent.text}</p>
                {tooltipContent.link && (
                  <button 
                    className="mt-2 text-[11px] text-red-400 flex items-center hover:underline group font-medium"
                    onClick={(e) => handleLinkClick(e, tooltipContent.link)}
                  >
                    Learn more <ChevronRight className="h-3 w-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black/90"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Live badge */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-900/90 to-red-800/90 px-2.5 py-1 rounded-sm z-30 flex items-center border border-red-700/50 shadow-sm shadow-red-900/20">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse mr-1.5 shadow-sm shadow-red-400/50"></span>
          <span className="text-[10px] uppercase tracking-widest text-white/95 font-semibold">Live</span>
        </div>
        
        {/* Play/Pause control */}
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center opacity-70 hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
          onClick={() => {
            setIsPaused(prev => !prev);
            setHasInteracted(true);
          }}
          aria-label={isPaused ? "Play news ticker" : "Pause news ticker"}
          title={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <PlayCircle className="h-5 w-5 text-white hover:text-red-400 transition-colors duration-200" />
          ) : (
            <PauseCircle className="h-5 w-5 text-white hover:text-red-400 transition-colors duration-200" />
          )}
        </button>
      </div>
    </FlexibleSection>
  );
} 