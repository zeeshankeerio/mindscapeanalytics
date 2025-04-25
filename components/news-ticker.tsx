"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, AlertCircle, Clock, Zap, PlayCircle, PauseCircle, Info, ExternalLink, Lock, User, Settings, FileCode } from "lucide-react"

type NewsItem = {
  id: number
  text: string
  color: "red" | "white"
  icon?: "alert" | "clock" | "zap" | "lock" | "user" | "settings" | "code" | null
  priority?: "breaking" | "standard" | "update" | null
  details?: string
  link?: string
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
      link: "#ai-features"
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
      link: "#sign-up"
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

  // Render news item with zig-zag styling
  const ZigZagElement = ({ item, index }: { item: NewsItem; index: number }) => {
    // Base classes
    const baseClasses = `
      relative flex items-center h-9 px-4 py-1 mx-1 
      ${item.priority === "breaking" ? "bg-gradient-to-r from-red-900/80 to-red-950/90" : "bg-gradient-to-r from-black/70 to-red-950/70"} 
      shadow-lg transform-gpu 
      ${item.link ? "cursor-pointer" : "cursor-default"}
    `;
    
    // Style and animation properties
    const styleProps = {
      clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
      transformOrigin: index % 2 === 0 ? "bottom" : "top"
    };
    
    const animationProps = {
      skewX: isPaused ? 0 : [0, 2, 0, -2, 0],
      y: isPaused ? 0 : index % 2 === 0 ? [0, -2, 0, 2, 0] : [0, 2, 0, -2, 0]
    };
    
    const transitionProps = {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror" as const,
      delay: index * 0.1
    };
    
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
        style={styleProps}
        animate={animationProps}
        transition={transitionProps}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        onHoverStart={handleHoverStart}
        onHoverEnd={() => setHoveredItem(null)}
        id={`news-item-${index}`}
        whileHover={{ scale: 1.03, zIndex: 20 }}
        onClick={(e) => handleLinkClick(e, item.link)}
      >
        {/* Flag ripple effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-wave-slow"></div>
        </div>
        
        {/* Priority badges */}
        {item.priority === "breaking" && (
          <span className="inline-flex items-center bg-red-600/80 text-white text-[9px] px-1.5 py-0.5 rounded-sm mr-2 font-bold uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: 'Impact, sans-serif' }}>
            Breaking
          </span>
        )}
        
        {item.priority === "update" && (
          <span className="inline-flex items-center bg-blue-600/80 text-white text-[9px] px-1.5 py-0.5 rounded-sm mr-2 font-bold uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: 'Impact, sans-serif' }}>
            Update
          </span>
        )}
        
        {/* News item content */}
        <span className={`font-sans text-xs leading-none whitespace-nowrap ${
          item.color === "red" 
            ? "text-red-400 font-bold drop-shadow-[0_0_3px_rgba(239,68,68,0.5)]" 
            : "text-white font-medium drop-shadow-[0_0_2px_rgba(255,255,255,0.25)]"
          } transition-colors duration-300 flex items-center`}
        >
          {item.icon && (
            <span className={`mr-1.5 ${item.color === "red" ? "text-red-400" : "text-white/80"}`}>
              <IconComponent type={item.icon} />
            </span>
          )}
          
          <span className="font-bold mr-1 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            {item.text.split(':')[0]}:
          </span>
          <span className="font-light tracking-wide max-w-[150px] truncate" style={{ fontFamily: 'Arial, sans-serif' }}>
            {item.text.split(':')[1]}
          </span>
        </span>
        
        {/* Icon indicators */}
        {item.details && (
          <Info className="h-3 w-3 ml-1.5 opacity-60 flex-shrink-0" />
        )}
        
        {item.link && (
          <ExternalLink className="h-3 w-3 ml-2 opacity-60 flex-shrink-0" />
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
        <ZigZagElement key={`first-${item.id}`} item={item} index={index} />
      ))
    );
    
    // Second set
    allItemSets.push(
      newsItems.map((item, index) => (
        <ZigZagElement key={`second-${item.id}`} item={item} index={index + newsItems.length} />
      ))
    );
    
    // Third set
    allItemSets.push(
      newsItems.map((item, index) => (
        <ZigZagElement key={`third-${item.id}`} item={item} index={index + newsItems.length * 2} />
      ))
    );
    
    return allItemSets.flat();
  }, [newsItems, isPaused, hoveredItem]);

  return (
    <div 
      className="w-full h-[0.6in] overflow-hidden relative z-20 bg-gradient-to-r from-red-950/60 via-black/70 to-red-950/60"
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
      {/* Subtle texture and patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      
      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] mix-blend-multiply"></div>
      
      {/* Glossy lighting effects */}
      <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white/5 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/40 to-transparent"></div>
      
      {/* Zig-zag news items container */}
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
            className="absolute top-[-80px] transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-2 rounded shadow-lg z-40 max-w-sm text-sm text-white/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ left: `${tooltipPosition.x}px` }}
          >
            <div className="relative">
              <p className="text-xs">{tooltipContent.text}</p>
              {tooltipContent.link && (
                <button 
                  className="mt-1 text-[10px] text-red-400 flex items-center hover:underline"
                  onClick={(e) => handleLinkClick(e, tooltipContent.link)}
                >
                  Learn more <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              )}
              <div className="absolute bottom-[-18px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black/80"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Live badge */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-950 to-red-900/90 backdrop-blur-sm px-2.5 py-0.5 rounded-sm z-30 flex items-center shadow-[0_0_15px_rgba(220,38,38,0.4)]">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1.5"></span>
        <span className="text-[10px] uppercase tracking-wider font-extrabold text-white/95 drop-shadow-[0_0_1px_rgba(255,255,255,0.5)]" style={{ fontFamily: 'Impact, sans-serif' }}>Live</span>
      </div>
      
      {/* Play/Pause control */}
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
        onClick={() => {
          setIsPaused(prev => !prev);
          setHasInteracted(true);
        }}
        aria-label={isPaused ? "Play news ticker" : "Pause news ticker"}
        title={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? (
          <PlayCircle className="h-6 w-6 text-white/80 hover:text-white transition-colors duration-200" />
        ) : (
          <PauseCircle className="h-6 w-6 text-white/80 hover:text-white transition-colors duration-200" />
        )}
      </button>
    </div>
  );
} 