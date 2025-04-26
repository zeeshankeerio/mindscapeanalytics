"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronRight, PlayCircle, PauseCircle, AlertCircle, Clock, Zap, Lock, User, Settings, FileCode } from "lucide-react"
import { useInView } from "react-intersection-observer"

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
  // News data - moved outside component to prevent recreations
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

  // State management with useRef for better performance
  const [tickerWidth, setTickerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    content: {text: string, link?: string} | null;
    position: { x: number, y: number };
  }>({
    visible: false,
    content: null,
    position: { x: 0, y: 0 }
  });
  const hasInteractedRef = useRef(false);

  // Container refs
  const tickerContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Animation controls
  const tickerAnimationControls = useAnimation();

  // Optimized intersection observer
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Ref callback that saves the node reference locally
  const setTickerRef = useCallback((node: HTMLDivElement | null) => {
    // Save a reference to the node
    if (node !== null) {
      tickerContainerRef.current = node;
    }
    
    // Forward the ref to inViewRef
    inViewRef(node);
  }, [inViewRef]);

  // Calculate widths for animation
  useEffect(() => {
    if (!contentRef.current || !tickerContainerRef.current) return;
    
    const updateWidths = () => {
      if (tickerContainerRef.current && contentRef.current) {
        setTickerWidth(tickerContainerRef.current.offsetWidth);
        setContentWidth(contentRef.current.offsetWidth);
      }
    };
    
    // Initial measurement
    updateWidths();
    
    // Only run in browser
    if (typeof window !== 'undefined') {
      // Setup ResizeObserver
      const resizeObserver = new ResizeObserver(() => {
        // Defer execution to avoid layout thrashing
        requestAnimationFrame(updateWidths);
      });
      
      if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
      }
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Keyboard interaction to pause/play the ticker
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Space" || e.key === " ") {
        e.preventDefault();
        const newPausedState = !isPausedRef.current;
        isPausedRef.current = newPausedState;
        setIsPaused(newPausedState);
        hasInteractedRef.current = true;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Animation parameters
  const animationParams = useMemo(() => ({
    x: -contentWidth,
    transition: {
      duration: Math.max(8, contentWidth / 35), // Min 8 seconds, scales with width
      ease: "linear",
      repeat: Infinity,
    }
  }), [contentWidth]);

  // Update animation based on visibility
  useEffect(() => {
    if (!inView) {
      tickerAnimationControls.stop();
    } else if (!isPaused) {
      tickerAnimationControls.start(animationParams);
    }
  }, [inView, isPaused, animationParams, tickerAnimationControls]);

  // Auto-hide tooltip after delay
  useEffect(() => {
    if (!tooltipState.visible || isPaused) return;
    
    const timer = setTimeout(() => {
      setTooltipState(prev => ({...prev, visible: false}));
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [tooltipState.visible, isPaused]);

  // Icon selector component
  const IconComponent = useCallback(({ type }: { type: string | null }) => {
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
  }, []);

  // Show tooltip with details
  const showTooltip = useCallback((item: NewsItem, x: number) => {
    if (!item.details) return;
    
    setTooltipState({
      visible: true,
      content: {
        text: item.details,
        link: item.link
      },
      position: { x, y: 0 }
    });
  }, []);

  // Handle link navigation
  const handleLinkClick = useCallback((e: React.MouseEvent, link?: string) => {
    if (!link) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Split text optimization
  const splitText = useCallback((text: string) => {
    const parts = text.split(':');
    return {
      prefix: parts[0] + ':',
      content: parts.slice(1).join(':')
    };
  }, []);

  // Toggle pause state
  const togglePause = useCallback(() => {
    const newPausedState = !isPaused;
    isPausedRef.current = newPausedState;
    setIsPaused(newPausedState);
    
    if (newPausedState) {
      tickerAnimationControls.stop();
    } else {
      tickerAnimationControls.start(animationParams);
    }
    
    hasInteractedRef.current = true;
  }, [isPaused, animationParams, tickerAnimationControls]);

  // News item component
  const NewsItemComponent = useCallback(({ item }: { item: NewsItem }) => {
    const textParts = useMemo(() => splitText(item.text), [item.text]);
    
    const handleHover = useCallback(() => {
      setHoveredItemId(item.id);
      
      if (!tickerContainerRef.current) return;
      
      const itemElement = document.getElementById(`news-item-${item.id}`);
      if (itemElement) {
        const tickerRect = tickerContainerRef.current.getBoundingClientRect();
        const itemRect = itemElement.getBoundingClientRect();
        
        const relativeX = itemRect.left - tickerRect.left + (itemRect.width / 2);
        showTooltip(item, relativeX);
      }
    }, [item]);
    
    return (
      <motion.div 
        className={`
          relative flex items-center h-9 px-4 py-1 mx-1
          ${item.priority === "breaking" ? "bg-gradient-to-r from-red-900/80 to-red-950/90" : "bg-gradient-to-r from-black/70 to-red-950/70"}
          shadow-lg transform-gpu will-change-transform
          ${item.link ? "cursor-pointer" : "cursor-default"}
        `}
        style={{
          clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.03, zIndex: 20 }}
        onHoverStart={handleHover}
        onHoverEnd={() => setHoveredItemId(null)}
        onClick={(e) => handleLinkClick(e, item.link)}
        id={`news-item-${item.id}`}
      >
        {/* Priority badges */}
        {item.priority === "breaking" && (
          <span className="inline-flex items-center bg-red-600/80 text-white text-[9px] px-1.5 py-0.5 rounded-sm mr-2 font-bold uppercase tracking-wider whitespace-nowrap">
            Breaking
          </span>
        )}
        
        {item.priority === "update" && (
          <span className="inline-flex items-center bg-blue-600/80 text-white text-[9px] px-1.5 py-0.5 rounded-sm mr-2 font-bold uppercase tracking-wider whitespace-nowrap">
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
          {item.icon && <IconComponent type={item.icon} />}
          
          <span className="font-bold mr-1 tracking-wide">
            {textParts.prefix}
          </span>
          <span className="font-light tracking-wide max-w-[150px] truncate">
            {textParts.content}
          </span>
        </span>
        
        {/* Minimized indicator icons */}
        {item.details && (
          <span className="h-2 w-2 ml-1.5 opacity-60 flex-shrink-0 bg-white/30 rounded-full" />
        )}
        
        {item.link && (
          <span className="h-2 w-2 ml-1.5 opacity-60 flex-shrink-0 border border-white/30 rounded-full" />
        )}
      </motion.div>
    );
  }, [handleLinkClick, IconComponent, showTooltip, splitText]);

  // Render optimized news items
  const renderedItems = useMemo(() => {
    // Create enough items to fill the container plus overflow
    const visibleItemCount = Math.ceil(Math.min(10, Math.max(3, tickerWidth / 250)));
    
    return newsItems.slice(0, visibleItemCount).map(item => (
      <NewsItemComponent key={`news-${item.id}`} item={item} />
    ));
  }, [newsItems, NewsItemComponent, tickerWidth]);

  return (
    <div 
      className="w-full h-12 md:h-[2.5rem] overflow-hidden relative z-20 bg-gradient-to-r from-red-950/60 via-black/70 to-red-950/60 will-change-transform"
      ref={setTickerRef}
      id="ticker"
      onMouseEnter={togglePause}
      onMouseLeave={() => {
        if (hasInteractedRef.current) {
          togglePause();
          setTooltipState(prev => ({...prev, visible: false}));
        }
      }}
      role="region"
      aria-label="News Banner"
      tabIndex={0}
    >
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=")'}}>
      </div>
      
      {/* News items container */}
      <div className="flex items-center h-full relative z-10 py-1.5">
        <motion.div
          ref={contentRef}
          className="flex items-center gap-0 px-4 will-change-transform"
          initial={{ x: 0 }}
          animate={tickerAnimationControls}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        >
          {renderedItems}
        </motion.div>
      </div>
      
      {/* Tooltip */}
      <AnimatePresence>
        {tooltipState.visible && tooltipState.content && (
          <motion.div 
            className="absolute top-[-70px] transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-2 rounded shadow-lg z-40 max-w-sm text-sm text-white/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ left: `${tooltipState.position.x}px` }}
          >
            <div className="relative">
              <p className="text-xs">{tooltipState.content.text}</p>
              {tooltipState.content.link && (
                <button 
                  className="mt-1 text-[10px] text-red-400 flex items-center hover:underline"
                  onClick={(e) => handleLinkClick(e, tooltipState.content?.link)}
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
      <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-950 to-red-900/90 backdrop-blur-sm px-2 py-0.5 rounded-sm z-30 flex items-center shadow-[0_0_10px_rgba(220,38,38,0.3)]">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1.5"></span>
        <span className="text-[10px] uppercase tracking-wider font-bold text-white/95">Live</span>
      </div>
      
      {/* Play/Pause control */}
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity"
        onClick={togglePause}
        aria-label={isPaused ? "Play news ticker" : "Pause news ticker"}
        title={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? (
          <PlayCircle className="h-5 w-5 text-white/80 hover:text-white transition-colors" />
        ) : (
          <PauseCircle className="h-5 w-5 text-white/80 hover:text-white transition-colors" />
        )}
      </button>
    </div>
  );
} 