'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Building, 
  PieChart, 
  Users, 
  Wrench, 
  LineChart, 
  DollarSign,
  Cpu,
  Check,
  Home,
  UserCheck,
  Star,
  BellRing,
  TrendingUp,
  BarChart,
  Map,
  Settings,
  ArrowUpRight,
  Activity,
  Receipt,
  Globe,
  Calendar,
  Lock,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Database,
  Briefcase,
  MapPin,
  Eye,
  LocateFixed,
  ChevronDown,
  Brain,
  Search,
  Filter,
  X,
  Compass,
  Download,
  Info,
  EyeOff
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

// Import the PredictiveAnalytics component dynamically
const DynamicPredictiveAnalytics = dynamic(() => 
  import('../../predictive-analytics').then(mod => mod.PredictiveAnalytics),
  { ssr: false }
);

// Animation variants
export interface AnimationVariant {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  show?: any;
  [key: string]: any; // Add index signature to fix type compatibility with Variants
}

export const item: AnimationVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Container variant for staggered animations
export interface ContainerVariant extends AnimationVariant {
  show: {
    opacity: number;
    transition: {
      staggerChildren: number;
      duration?: number;
      delay?: number;
    };
  };
}

export const container: ContainerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Property analytics card with interactive hover effects
export function FeatureCard({ 
  title, 
  description, 
  icon, 
  index = 0,
  imagePath
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  index?: number;
  imagePath?: string;
}) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Generate a unique gradient based on the index
  const gradientColors = [
    'from-blue-500/20 via-indigo-400/10 to-transparent',
    'from-amber-500/20 via-orange-400/10 to-transparent',
    'from-emerald-500/20 via-green-400/10 to-transparent',
    'from-rose-500/20 via-pink-400/10 to-transparent',
    'from-violet-500/20 via-purple-400/10 to-transparent',
    'from-cyan-500/20 via-sky-400/10 to-transparent',
  ];
  
  const iconColors = [
    'text-blue-600',
    'text-amber-600',
    'text-emerald-600',
    'text-rose-600',
    'text-violet-600',
    'text-cyan-600',
  ];
  
  const gradientIdx = index % gradientColors.length;
  const gradient = gradientColors[gradientIdx];
  const iconColor = iconColors[gradientIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group relative overflow-hidden"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {/* Dynamic gradient background based on index */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 group-hover:opacity-70 transition-all duration-500`} />
      
      {/* Shine effect on hover */}
      <div className="absolute -inset-x-20 top-0 -bottom-40 opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-700">
        <div className="w-40 h-[500px] bg-white/20 rotate-12 transform translate-x-full group-hover:translate-x-[-180%] transition-transform duration-1000 blur-xl"></div>
      </div>
      
      {/* Icon with pulsing effect */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center ${iconColor} mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300 relative z-20`}>
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
        {icon}
        </motion.div>
      </div>
      
      {/* Card content */}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 relative z-20">{title}</h3>
      <p className="text-muted-foreground relative z-20">{description}</p>
      
      {/* Interactive footer that appears on hover */}
      <div className="mt-4 pt-4 relative z-20 opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/0"></div>
        <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent text-primary">
          Learn more
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      {/* Animated border effect on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 via-primary/40 to-primary/10 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
    </motion.div>
  );
}

// Advanced metric card with live animation
export function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  trend = "up" 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ReactNode; 
  trend?: "up" | "down" | "neutral";
}) {
  const [currentValue, setCurrentValue] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0; // Add || 0 for fallback
  
  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const interval = 20; // Update interval in ms
    const steps = duration / interval;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      setCurrentValue(Math.floor(current));
    }, interval);
    
    return () => clearInterval(timer);
  }, [numericValue]);
  
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-blue-500";
  const trendBg = trend === "up" ? "bg-green-500/10" : trend === "down" ? "bg-red-500/10" : "bg-blue-500/10";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary shadow-inner">
          {icon}
        </div>
        <div className={`px-2 py-1 rounded-full ${trendBg} ${trendColor} text-xs font-medium flex items-center`}>
          {trend === "up" ? (
            <TrendingUp className="mr-1 h-3 w-3" />
          ) : trend === "down" ? (
            <TrendingUp className="mr-1 h-3 w-3 transform rotate-180" />
          ) : (
            <Activity className="mr-1 h-3 w-3" />
          )}
          {change}
        </div>
      </div>
      <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl md:text-3xl font-bold mt-1 text-foreground">{currentValue.toLocaleString()}{value.includes('%') ? '%' : ''}</p>
    </motion.div>
  );
}

// Dashboard preview component with animated elements
export function DashboardPreview() {
  return (
    <div className="relative bg-card/90 backdrop-blur-sm border border-primary/20 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-primary/10 flex items-center gap-2 bg-gradient-to-r from-background/90 to-background/60">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-sm font-medium">Property Portfolio Analytics</div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-2.5 w-24 bg-primary/20 rounded-full" />
              <div className="h-2.5 w-8 bg-green-500/20 rounded-full" />
            </div>
            <div className="h-2.5 w-36 bg-primary/15 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-2.5 w-24 bg-primary/20 rounded-full" />
              <div className="h-2.5 w-8 bg-red-500/20 rounded-full" />
            </div>
            <div className="h-2.5 w-32 bg-primary/15 rounded-full" />
          </div>
        </div>
        
        <div className="h-48 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg mb-6 shadow-inner p-4 relative overflow-hidden">
          {/* Animated chart lines */}
          <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none" className="absolute inset-0" aria-hidden="true">
            <motion.path 
              d="M0,100 C50,80 100,120 150,80 C200,40 250,90 300,60 C350,30 400,70 400,60" 
              fill="none" 
              stroke="rgba(239,68,68,0.5)" 
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
            <motion.path 
              d="M0,120 C50,100 100,110 150,95 C200,80 250,100 300,90 C350,80 400,60 400,50" 
              fill="none" 
              stroke="rgba(16,185,129,0.5)" 
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </svg>
          
          {/* Chart labels */}
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[10px] text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-muted-foreground">Occupancy</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center space-x-4">
              <div className="h-2.5 w-16 bg-primary/20 rounded-full" />
              <div className="h-2.5 w-8 bg-primary/15 rounded-full" />
            </div>
            <div className="h-24 bg-gradient-to-br from-primary/10 to-primary/0 rounded-lg shadow-inner"></div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center space-x-4">
              <div className="h-2.5 w-16 bg-primary/20 rounded-full" />
              <div className="h-2.5 w-8 bg-primary/15 rounded-full" />
            </div>
            <div className="h-24 bg-gradient-to-br from-primary/10 to-primary/0 rounded-lg shadow-inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Real estate market insight component
export function MarketInsight({ 
  title, 
  data,
  imageSrc,
  index = 0
}: {
  title: string;
  data: { label: string; value: string }[];
  imageSrc?: string;
  index?: number;
}) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Generate unique color schemes based on index
  const cardColors = [
    { bg: 'from-blue-500/10 to-indigo-500/5', accent: 'bg-blue-500', text: 'text-blue-600' },
    { bg: 'from-amber-500/10 to-orange-500/5', accent: 'bg-amber-500', text: 'text-amber-600' },
    { bg: 'from-emerald-500/10 to-green-500/5', accent: 'bg-emerald-500', text: 'text-emerald-600' },
    { bg: 'from-violet-500/10 to-purple-500/5', accent: 'bg-violet-500', text: 'text-violet-600' },
    { bg: 'from-rose-500/10 to-pink-500/5', accent: 'bg-rose-500', text: 'text-rose-600' },
  ];
  
  const colorIdx = index % cardColors.length;
  const colorScheme = cardColors[colorIdx];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-gradient-to-br ${colorScheme.bg} backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group`}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
    >
      <div className="aspect-video relative overflow-hidden">
        {imageSrc && !imageError ? (
          <>
          <Image
            src={imageSrc}
            alt={title}
            width={500}
            height={300}
            className="group-hover:scale-105 transition-transform duration-700 object-cover w-full h-full"
            onError={handleImageError}
            unoptimized
          />
            {/* Enhanced overlay with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${colorScheme.bg} flex items-center justify-center`}>
            <Building className={`h-12 w-12 ${colorScheme.text} opacity-40`} />
          </div>
        )}
        
        {/* Enhanced title area with animated accent */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <motion.div 
              initial={{ width: 4 }}
              whileHover={{ width: 50 }}
              className={`h-5 ${colorScheme.accent} rounded-full`}
              transition={{ duration: 0.3 }}
            />
          <h3 className="text-xl font-bold text-white drop-shadow-md">{title}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-800/20 last:border-0 group-hover:border-primary/10 transition-colors duration-300">
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className={`text-sm font-semibold ${colorScheme.text}`}>{item.value}</span>
          </div>
        ))}
        
        <Button 
          variant="ghost" 
          className={`w-full justify-between ${colorScheme.text} hover:bg-primary/5 hover:text-primary/90 p-0 h-8`}
        >
          <span className="text-xs">View Market Report</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}

// Real estate testimonial component
export function RealEstateTestimonial({
  quote,
  author,
  position,
  company,
  image,
  rating = 5
}: {
  quote: string;
  author: string;
  position: string;
  company: string;
  image?: string;
  rating?: number;
}) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <motion.div
      variants={item}
      className="bg-gradient-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      whileHover={{ 
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-16 -mb-16 opacity-40"></div>
      
      <div className="mb-6 relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-4 -left-4 text-primary/40"
          aria-hidden="true"
        >
          <path
            d="M13.3333 26.6667C17.0152 26.6667 20 23.6819 20 20C20 16.3181 17.0152 13.3333 13.3333 13.3333V6.66667C20.6971 6.66667 26.6667 12.6362 26.6667 20C26.6667 27.3638 20.6971 33.3333 13.3333 33.3333V26.6667ZM0 26.6667C3.68186 26.6667 6.66667 23.6819 6.66667 20C6.66667 16.3181 3.68186 13.3333 0 13.3333V6.66667C7.36376 6.66667 13.3333 12.6362 13.3333 20C13.3333 27.3638 7.36376 33.3333 0 33.3333V26.6667Z"
            fill="currentColor"
          />
        </svg>
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-5 relative overflow-hidden">
          {/* Animated mesh gradient background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05"/>
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#meshGradient)" />
            </svg>
          </div>
          
          <p className="text-foreground text-sm leading-relaxed italic relative z-10">&ldquo;{quote}&rdquo;</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-primary/10 flex-shrink-0 ring-2 ring-primary/20 shadow-lg">
          {image && !imageError ? (
            <Image
              src={image}
              alt={author}
              width={56}
              height={56}
              className="object-cover"
              onError={handleImageError}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10">
              <span className="text-primary font-medium">{author[0]}</span>
            </div>
          )}
        </div>
        <div>
          <p className="font-medium text-foreground">{author}</p>
          <p className="text-xs text-muted-foreground">{position}, {company}</p>
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Export the feature icons object for easy access
export const featureIcons = {
  propertyAnalytics: <BarChart3 className="h-5 w-5 text-primary" />,
  tenantExperience: <Users className="h-5 w-5 text-primary" />,
  documentIntelligence: <Receipt className="h-5 w-5 text-primary" />,
  marketIntelligence: <LineChart className="h-5 w-5 text-primary" />,
  portfolioOptimization: <Building className="h-5 w-5 text-primary" />,
  commercialRealEstate: <Map className="h-5 w-5 text-primary" />
}; 

// Interactive VR Property Tour component
export function VRPropertyTour({
  imageSrc,
  propertyName,
  propertyType,
  location
}: {
  imageSrc: string;
  propertyName: string;
  propertyType: string;
  location: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Hotspots data for interactive points in the VR tour
  const hotspots = [
    { x: 25, y: 35, label: 'Living Room', color: 'bg-blue-500' },
    { x: 65, y: 45, label: 'Kitchen', color: 'bg-purple-500' },
    { x: 80, y: 25, label: 'Balcony View', color: 'bg-amber-500' },
    { x: 40, y: 70, label: 'Master Bedroom', color: 'bg-emerald-500' }
  ];
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleHotspotClick = (index: number) => {
    setActiveHotspot(activeHotspot === index ? null : index);
  };
  
  const rotateLeft = () => {
    setRotationAngle(rotationAngle - 15);
  };
  
  const rotateRight = () => {
    setRotationAngle(rotationAngle + 15);
  };
  
  const zoomIn = () => {
    if (zoomLevel < 1.5) setZoomLevel(zoomLevel + 0.1);
  };
  
  const zoomOut = () => {
    if (zoomLevel > 0.8) setZoomLevel(zoomLevel - 0.1);
  };
  
  const resetView = () => {
    setRotationAngle(0);
    setZoomLevel(1);
    setActiveHotspot(null);
  };
  
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl z-0"></div>
      <div className="relative z-10 bg-gray-950/80 rounded-2xl m-0.5 overflow-hidden">
        {/* Main view area */}
        <div className="aspect-video relative overflow-hidden">
          <motion.div
            animate={{ 
              scale: zoomLevel,
              rotate: rotationAngle
            }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-full h-full"
          >
            <Image 
              src={imageSrc} 
              alt={`VR Tour of ${propertyName}`}
              fill
              className="object-cover"
            />
          </motion.div>
          
          {/* VR Tour overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent pointer-events-none"></div>
          
          {/* Interactive hotspots */}
          {hotspots.map((hotspot, i) => (
            <motion.div
              key={i}
              className="absolute cursor-pointer"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              animate={{ 
                scale: [1, activeHotspot === i ? 1.3 : 1.2, 1],
                boxShadow: activeHotspot === i ? "0 0 15px rgba(255,255,255,0.6)" : "0 0 5px rgba(255,255,255,0.3)"
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.3
              }}
              onClick={() => handleHotspotClick(i)}
            >
              <div className={`w-6 h-6 rounded-full ${hotspot.color} flex items-center justify-center`}>
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              
              {/* Hotspot info popup */}
              {activeHotspot === i && (
                <motion.div 
                  className="absolute top-8 left-1/2 -translate-x-1/2 w-40 bg-gray-900/95 backdrop-blur-md rounded-lg p-2 shadow-lg z-30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <p className="text-white text-xs font-medium">{hotspot.label}</p>
                  <div className="mt-1 flex gap-2 justify-center">
                    <button className="text-[10px] text-white/80 hover:text-white">View</button>
                    <button className="text-[10px] text-white/80 hover:text-white">Details</button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
          
          {/* Play/pause button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-purple-600/90 to-blue-600/90 flex items-center justify-center cursor-pointer shadow-lg shadow-purple-900/30"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="5" width="4" height="14" rx="1" fill="white"/>
                <rect x="14" y="5" width="4" height="14" rx="1" fill="white"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L18 12L6 20V4Z" fill="white"/>
              </svg>
            )}
          </motion.div>
        </div>
        
        {/* VR Controls */}
        <div className="bg-gray-900/70 backdrop-blur-md py-4 px-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-white font-medium">{propertyName}</h3>
              <p className="text-white/70 text-sm flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </p>
            </div>
            <Badge className="bg-purple-500/30 text-purple-300 font-medium border-none">
              {propertyType}
            </Badge>
          </div>
          
          {/* Control bar */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white/80 hover:text-white"
                onClick={rotateLeft}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L3 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-900"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4L18 12L6 20V4Z" fill="currentColor"/>
                  </svg>
                )}
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white/80 hover:text-white"
                onClick={rotateRight}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L21 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ y: -2 }}
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white/80 hover:text-white"
                onClick={zoomOut}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white/80 hover:text-white"
                onClick={resetView}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white/80 hover:text-white"
                onClick={zoomIn}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </div>
            
            <div className="flex gap-2">
              <Badge className="bg-blue-500/30 text-blue-300 border-none">360° View</Badge>
              <Badge className="bg-emerald-500/30 text-emerald-300 border-none">VR Ready</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// UAE Mortgage Calculator component
export function UAEMortgageCalculator() {
  const [propertyValue, setPropertyValue] = useState(1500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(5.25); // Updated to current UAE interest rate (2023-2024)
  const [financingType, setFinancingType] = useState<'conventional' | 'islamic'>('conventional');
  const [residencyStatus, setResidencyStatus] = useState<'resident' | 'non-resident'>('resident');
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>('custom');
  const [showEarlyRepayment, setShowEarlyRepayment] = useState(false);
  const [earlyRepaymentYear, setEarlyRepaymentYear] = useState(5);
  const [additionalPayment, setAdditionalPayment] = useState(100000);
  const [showStressTest, setShowStressTest] = useState(false);
  
  // Add new state variables for amortization schedule
  const [showAmortizationSchedule, setShowAmortizationSchedule] = useState(false);
  const [scheduleDisplayYears, setScheduleDisplayYears] = useState<'all' | 'first5' | 'yearly'>('first5');
  
  // Bank-specific rates (updated 2024)
  const bankRates = {
    'custom': { conventional: 5.25, islamic: 4.73 },
    'emirates_nbd': { conventional: 5.49, islamic: 4.99 },
    'adcb': { conventional: 5.35, islamic: 4.89 },
    'mashreq': { conventional: 5.60, islamic: 5.10 },
    'dubai_islamic': { conventional: 0, islamic: 4.85 },
    'adib': { conventional: 0, islamic: 4.80 },
    'hsbc': { conventional: 5.75, islamic: 0 },
    'rak': { conventional: 5.40, islamic: 4.95 },
  };
  
  // Apply bank rate if a specific bank is selected
  useEffect(() => {
    if (selectedBank !== 'custom') {
      const bankRate = financingType === 'islamic' && bankRates[selectedBank as keyof typeof bankRates].islamic > 0 
        ? bankRates[selectedBank as keyof typeof bankRates].islamic
        : bankRates[selectedBank as keyof typeof bankRates].conventional;
      
      if (bankRate > 0) {
        setInterestRate(bankRate);
      }
    }
  }, [selectedBank, financingType]);
  
  // Calculate mortgage details
  const downPaymentAmount = (propertyValue * downPaymentPercent) / 100;
  const loanAmount = propertyValue - downPaymentAmount;
  
  // Monthly payment calculation
  const calculateMonthlyPayment = (rate = interestRate, term = loanTerm, loan = loanAmount) => {
    if (financingType === 'islamic') {
      // Simplified Islamic financing calculation (profit rate)
      const profitRate = rate * 0.9; // Islamic rates typically lower
      const monthlyProfitRate = profitRate / 100 / 12;
      const totalMonths = term * 12;
      return (loan * monthlyProfitRate * Math.pow(1 + monthlyProfitRate, totalMonths)) / (Math.pow(1 + monthlyProfitRate, totalMonths) - 1);
    } else {
      // Conventional mortgage calculation
      const monthlyRate = rate / 100 / 12;
      const totalMonths = term * 12;
      return (loan * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
  };
  
  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - loanAmount;
  
  // Early repayment calculation
  const calculateEarlyRepayment = () => {
    if (earlyRepaymentYear >= loanTerm) return { savings: 0, newTerm: loanTerm };
    
    // Calculate remaining principal at time of early payment
    const monthlyRate = interestRate / 100 / 12;
    const monthsPaid = earlyRepaymentYear * 12;
    const totalMonths = loanTerm * 12;
    
    let remainingPrincipal = loanAmount;
    for (let i = 0; i < monthsPaid; i++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingPrincipal -= principalPayment;
    }
    
    // Subtract additional payment
    const newRemainingPrincipal = Math.max(0, remainingPrincipal - additionalPayment);
    
    // Calculate new loan term or savings with same term
    if (newRemainingPrincipal <= 0) {
      // Loan fully paid
      const newTerm = earlyRepaymentYear;
      const savingsFull = totalPayment - (monthlyPayment * monthsPaid);
      return { savings: savingsFull, newTerm };
    } else {
      // Calculate new payment schedule
      const remainingOriginalPayments = monthlyPayment * (totalMonths - monthsPaid);
      const newMonthlyPayment = calculateMonthlyPayment(interestRate, loanTerm - earlyRepaymentYear, newRemainingPrincipal);
      const newRemainingPayments = newMonthlyPayment * (totalMonths - monthsPaid);
      
      return { 
        savings: remainingOriginalPayments - newRemainingPayments, 
        newTerm: loanTerm,
        newMonthlyPayment
      };
    }
  };
  
  const earlyRepaymentResults = showEarlyRepayment ? calculateEarlyRepayment() : null;
  
  // Stress test calculations
  const stressTestResults = showStressTest ? {
    current: monthlyPayment,
    moderate: calculateMonthlyPayment(interestRate + 1),
    significant: calculateMonthlyPayment(interestRate + 2),
    severe: calculateMonthlyPayment(interestRate + 3)
  } : null;
  
  // UAE-specific fees (updated 2024)
  const registrationFee = residencyStatus === 'resident' ? propertyValue * 0.04 : propertyValue * 0.05;
  const transferFee = 580; // AED fixed fee
  const mortgageRegistrationFee = Math.min(loanAmount * 0.0025, 2500);
  const valuationFee = 3150; // Updated valuation fee
  const knowledgeFee = 10; // Fixed knowledge fee
  const innovationFee = 10; // Fixed innovation fee
  const titleDeedFee = 250; // Title deed issuance fee
  const administrativeFee = isFirstTimeBuyer ? 1000 : 1500; // Administrative trustee fee
  const propertyInsurance = loanAmount * 0.0025; // Annual property insurance (approximate)
  const lifeMortgageInsurance = loanAmount * 0.00275; // Annual life/mortgage insurance
  
  // Total one-time fees
  const totalOneTimeFees = registrationFee + transferFee + mortgageRegistrationFee + valuationFee + 
                          knowledgeFee + innovationFee + titleDeedFee + administrativeFee;
  
  // Annual recurring fees
  const annualRecurringFees = propertyInsurance + lifeMortgageInsurance;
  
  const totalCost = propertyValue + totalInterest + totalOneTimeFees + (annualRecurringFees * loanTerm);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };
  
  // Generate amortization schedule
  const generateAmortizationSchedule = () => {
    const monthlyRate = (financingType === 'islamic' ? interestRate * 0.9 : interestRate) / 100 / 12;
    const totalMonths = loanTerm * 12;
    const monthlyPaymentAmount = calculateMonthlyPayment();
    
    let remainingPrincipal = loanAmount;
    const schedule = [];
    
    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = monthlyPaymentAmount - interestPayment;
      remainingPrincipal -= principalPayment;
      
      // For very last payment, make sure remaining principal becomes exactly 0
      const adjustedRemainingPrincipal = month === totalMonths ? 0 : Math.max(0, remainingPrincipal);
      
      // Calculate percent paid off
      const percentPaidOff = ((loanAmount - adjustedRemainingPrincipal) / loanAmount) * 100;
      
      schedule.push({
        month,
        year: Math.ceil(month / 12),
        payment: monthlyPaymentAmount,
        principalPayment,
        interestPayment,
        remainingPrincipal: adjustedRemainingPrincipal,
        totalPrincipalPaid: loanAmount - adjustedRemainingPrincipal,
        totalInterestPaid: (monthlyPaymentAmount * month) - (loanAmount - adjustedRemainingPrincipal),
        percentPaidOff
      });
    }
    
    // Filter based on display preference
    if (scheduleDisplayYears === 'first5') {
      return schedule.filter(item => item.month <= 60);
    } else if (scheduleDisplayYears === 'yearly') {
      return schedule.filter(item => item.month % 12 === 0 || item.month === 1 || item.month === totalMonths);
    }
    
    return schedule;
  };
  
  // Generate schedule only when needed
  const amortizationSchedule = showAmortizationSchedule ? generateAmortizationSchedule() : [];
  
  // Add affordability calculator state
  const [showAffordabilityCalculator, setShowAffordabilityCalculator] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState(25000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(8000);
  const [existingDebts, setExistingDebts] = useState(2000);
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(50);
  
  // Affordability calculator
  const calculateAffordability = () => {
    // UAE-specific DTI calculation (50% is typical maximum)
    const maxMonthlyPayment = (monthlyIncome * (debtToIncomeRatio / 100)) - existingDebts;
    
    // Cap based on realistic ability to pay after expenses
    const availableAfterExpenses = monthlyIncome - monthlyExpenses - existingDebts;
    const affordableMonthlyPayment = Math.min(maxMonthlyPayment, availableAfterExpenses);
    
    // Calculate affordable loan amount based on current interest rate and loan term
    // P = PMT * [(1 - (1 + r)^(-n)) / r] where PMT is monthly payment, r is monthly rate, n is months
    const monthlyRate = (financingType === 'islamic' ? interestRate * 0.9 : interestRate) / 100 / 12;
    const totalMonths = loanTerm * 12;
    
    // This is the inverse of the mortgage calculation formula
    const affordableLoanAmount = affordableMonthlyPayment * ((1 - Math.pow(1 + monthlyRate, -totalMonths)) / monthlyRate);
    
    // Calculate affordable property value based on down payment percentage
    const affordablePropertyValue = affordableLoanAmount / (1 - (downPaymentPercent / 100));
    
    // Determine required down payment
    const requiredDownPayment = affordablePropertyValue * (downPaymentPercent / 100);
    
    // Calculate various DTI scenarios
    const conservativeDTI = calculateAffordableLoanWithDTI(40);
    const standardDTI = calculateAffordableLoanWithDTI(50);
    const aggressiveDTI = calculateAffordableLoanWithDTI(60);
    
    // Stress test the affordability with higher interest rates
    const stressTestedLoanAmount = calculateAffordableLoanWithRate(interestRate + 2);
    
    return {
      affordableMonthlyPayment,
      affordableLoanAmount,
      affordablePropertyValue,
      requiredDownPayment,
      conservativeDTI,
      standardDTI,
      aggressiveDTI,
      stressTestedLoanAmount,
      stressTestedImpact: ((affordableLoanAmount - stressTestedLoanAmount) / affordableLoanAmount) * 100
    };
  };
  
  // Helper function to calculate affordable loan with different DTI ratio
  const calculateAffordableLoanWithDTI = (dtiRatio: number) => {
    const maxPayment = (monthlyIncome * (dtiRatio / 100)) - existingDebts;
    const availableAfterExpenses = monthlyIncome - monthlyExpenses - existingDebts;
    const payment = Math.min(maxPayment, availableAfterExpenses);
    
    const monthlyRate = (financingType === 'islamic' ? interestRate * 0.9 : interestRate) / 100 / 12;
    const totalMonths = loanTerm * 12;
    
    return payment * ((1 - Math.pow(1 + monthlyRate, -totalMonths)) / monthlyRate);
  };
  
  // Helper function to calculate affordable loan with different interest rate
  const calculateAffordableLoanWithRate = (rate: number) => {
    const maxPayment = (monthlyIncome * (debtToIncomeRatio / 100)) - existingDebts;
    const availableAfterExpenses = monthlyIncome - monthlyExpenses - existingDebts;
    const payment = Math.min(maxPayment, availableAfterExpenses);
    
    const monthlyRate = (financingType === 'islamic' ? rate * 0.9 : rate) / 100 / 12;
    const totalMonths = loanTerm * 12;
    
    return payment * ((1 - Math.pow(1 + monthlyRate, -totalMonths)) / monthlyRate);
  };
  
  const affordabilityResults = showAffordabilityCalculator ? calculateAffordability() : null;
  
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-70" />
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border-none p-6">
            <h3 className="text-xl font-medium text-foreground mb-4">Calculate Your UAE Mortgage</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex justify-between">
                  <span>Property Value (AED)</span>
                  <span className="text-cyan-400">{formatCurrency(propertyValue)}</span>
                </label>
                <div className="h-2 bg-gray-900 rounded-full relative">
                  <div 
                    className="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                    style={{ width: `${Math.min((propertyValue / 5000000) * 100, 100)}%` }}
                  />
                  <input
                    type="range"
                    min="500000"
                    max="5000000"
                    step="50000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex justify-between">
                  <span>Down Payment (%)</span>
                  <span className="text-cyan-400">{downPaymentPercent}%</span>
                </label>
                <div className="h-2 bg-gray-900 rounded-full relative">
                  <div 
                    className="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                    style={{ width: `${downPaymentPercent}%` }}
                  />
                  <input
                    type="range"
                    min="20"
                    max="70"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex justify-between">
                  <span>Loan Term (Years)</span>
                  <span className="text-cyan-400">{loanTerm} years</span>
                </label>
                <div className="h-2 bg-gray-900 rounded-full relative">
                  <div 
                    className="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                    style={{ width: `${(loanTerm / 30) * 100}%` }}
                  />
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex justify-between">
                  <span>{financingType === 'islamic' ? 'Profit Rate' : 'Interest Rate'} (%)</span>
                  <span className="text-cyan-400">{interestRate}%</span>
                </label>
                <div className="h-2 bg-gray-900 rounded-full relative">
                  <div 
                    className="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                    style={{ width: `${(interestRate / 8) * 100}%` }}
                  />
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => {
                      setInterestRate(Number(e.target.value));
                      setSelectedBank('custom');
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={selectedBank !== 'custom'}
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <label className="text-sm text-muted-foreground mb-2 block">Select Bank (Optional)</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-sm text-white"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                >
                  <option value="custom">Custom Rate</option>
                  <option value="emirates_nbd">Emirates NBD</option>
                  <option value="adcb">ADCB</option>
                  <option value="mashreq">Mashreq Bank</option>
                  <option value="dubai_islamic">Dubai Islamic Bank</option>
                  <option value="adib">Abu Dhabi Islamic Bank</option>
                  <option value="hsbc">HSBC</option>
                  <option value="rak">RAK Bank</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedBank !== 'custom' 
                    ? `Using ${financingType === 'islamic' ? 'Islamic' : 'Conventional'} rate from selected bank` 
                    : 'Using custom rate'}
                </p>
              </div>
              
              <div className="pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Financing Type</label>
                    <div className="flex gap-2 mt-1">
                      <button
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          financingType === 'conventional' 
                            ? 'bg-cyan-500 text-white' 
                            : 'bg-gray-800 text-muted-foreground hover:bg-cyan-500/20 hover:text-cyan-400'
                        }`}
                        onClick={() => setFinancingType('conventional')}
                      >
                        Conventional
                      </button>
                      <button
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          financingType === 'islamic' 
                            ? 'bg-cyan-500 text-white' 
                            : 'bg-gray-800 text-muted-foreground hover:bg-cyan-500/20 hover:text-cyan-400'
                        }`}
                        onClick={() => setFinancingType('islamic')}
                      >
                        Islamic
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Residency Status</label>
                    <div className="flex gap-2 mt-1">
                      <button
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          residencyStatus === 'resident' 
                            ? 'bg-cyan-500 text-white' 
                            : 'bg-gray-800 text-muted-foreground hover:bg-cyan-500/20 hover:text-cyan-400'
                        }`}
                        onClick={() => setResidencyStatus('resident')}
                      >
                        UAE Resident
                      </button>
                      <button
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          residencyStatus === 'non-resident' 
                            ? 'bg-cyan-500 text-white' 
                            : 'bg-gray-800 text-muted-foreground hover:bg-cyan-500/20 hover:text-cyan-400'
                        }`}
                        onClick={() => setResidencyStatus('non-resident')}
                      >
                        Non-Resident
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 items-center">
                  <button
                    className={`w-6 h-6 flex items-center justify-center rounded ${
                      isFirstTimeBuyer ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-muted-foreground'
                    }`}
                    onClick={() => setIsFirstTimeBuyer(!isFirstTimeBuyer)}
                  >
                    {isFirstTimeBuyer && <Check className="h-4 w-4" />}
                  </button>
                  <label className="text-sm text-muted-foreground cursor-pointer" onClick={() => setIsFirstTimeBuyer(!isFirstTimeBuyer)}>
                    First-time home buyer
                  </label>
                </div>
                
                <div className="flex gap-3 items-center">
                  <button
                    className={`w-6 h-6 flex items-center justify-center rounded ${
                      showEarlyRepayment ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-muted-foreground'
                    }`}
                    onClick={() => setShowEarlyRepayment(!showEarlyRepayment)}
                  >
                    {showEarlyRepayment && <Check className="h-4 w-4" />}
                  </button>
                  <label className="text-sm text-muted-foreground cursor-pointer" onClick={() => setShowEarlyRepayment(!showEarlyRepayment)}>
                    Calculate early repayment
                  </label>
                </div>
                
                <div className="flex gap-3 items-center">
                  <button
                    className={`w-6 h-6 flex items-center justify-center rounded ${
                      showStressTest ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-muted-foreground'
                    }`}
                    onClick={() => setShowStressTest(!showStressTest)}
                  >
                    {showStressTest && <Check className="h-4 w-4" />}
                  </button>
                  <label className="text-sm text-muted-foreground cursor-pointer" onClick={() => setShowStressTest(!showStressTest)}>
                    Interest rate stress test
                  </label>
                </div>
              </div>
              
              {showEarlyRepayment && (
                <div className="mt-4 space-y-4 bg-cyan-900/20 p-3 rounded-lg border border-cyan-900/30">
                  <h4 className="text-sm font-medium text-cyan-400">Early Repayment Calculator</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex justify-between">
                      <span>Early Repayment in Year</span>
                      <span className="text-cyan-400">Year {earlyRepaymentYear}</span>
                    </label>
                    <div className="h-2 bg-gray-900 rounded-full relative">
                      <div 
                        className="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                        style={{ width: `${(earlyRepaymentYear / loanTerm) * 100}%` }}
                      />
                      <input
                        type="range"
                        min="1"
                        max={loanTerm - 1}
                        step="1"
                        value={earlyRepaymentYear}
                        onChange={(e) => setEarlyRepaymentYear(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex justify-between">
                      <span>Additional Payment</span>
                      <span className="text-cyan-400">{formatCurrency(additionalPayment)}</span>
                    </label>
                    <div className="h-2 bg-gray-900 rounded-full relative">
                      <div 
                        className="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                        style={{ width: `${Math.min((additionalPayment / loanAmount) * 100, 100)}%` }}
                      />
                      <input
                        type="range"
                        min="50000"
                        max={loanAmount}
                        step="50000"
                        value={additionalPayment}
                        onChange={(e) => setAdditionalPayment(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-900/30 rounded-lg p-4 shadow-md">
            <h4 className="text-sm text-muted-foreground mb-2">Down Payment</h4>
            <p className="text-xl font-medium text-foreground">{formatCurrency(downPaymentAmount)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {downPaymentPercent}% of property value
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-900/30 rounded-lg p-4 shadow-md">
            <h4 className="text-sm text-muted-foreground mb-2">Loan Amount</h4>
            <p className="text-xl font-medium text-foreground">{formatCurrency(loanAmount)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {100 - downPaymentPercent}% financing
            </p>
          </div>
        </div>
        
        {/* Add affordability calculator toggle */}
        <div className="flex gap-3 items-center">
          <button
            className={`w-6 h-6 flex items-center justify-center rounded ${
              showAffordabilityCalculator ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-muted-foreground'
            }`}
            onClick={() => setShowAffordabilityCalculator(!showAffordabilityCalculator)}
          >
            {showAffordabilityCalculator && <Check className="h-4 w-4" />}
          </button>
          <label className="text-sm text-muted-foreground cursor-pointer" onClick={() => setShowAffordabilityCalculator(!showAffordabilityCalculator)}>
            Loan affordability calculator
          </label>
        </div>
        
        {/* Affordability calculator inputs */}
        {showAffordabilityCalculator && (
          <div className="mt-4 space-y-4 bg-emerald-900/20 p-3 rounded-lg border border-emerald-900/30">
            <h4 className="text-sm font-medium text-emerald-400">Affordability Calculator</h4>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex justify-between">
                <span>Monthly Income (AED)</span>
                <span className="text-emerald-400">{formatCurrency(monthlyIncome)}</span>
              </label>
              <div className="h-2 bg-gray-900 rounded-full relative">
                <div 
                  className="absolute h-2 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" 
                  style={{ width: `${Math.min((monthlyIncome / 50000) * 100, 100)}%` }}
                />
                <input
                  type="range"
                  min="10000"
                  max="100000"
                  step="1000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex justify-between">
                <span>Monthly Expenses (AED)</span>
                <span className="text-emerald-400">{formatCurrency(monthlyExpenses)}</span>
              </label>
              <div className="h-2 bg-gray-900 rounded-full relative">
                <div 
                  className="absolute h-2 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" 
                  style={{ width: `${Math.min((monthlyExpenses / 30000) * 100, 100)}%` }}
                />
                <input
                  type="range"
                  min="2000"
                  max="30000"
                  step="500"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex justify-between">
                <span>Existing Debt Payments (AED)</span>
                <span className="text-emerald-400">{formatCurrency(existingDebts)}</span>
              </label>
              <div className="h-2 bg-gray-900 rounded-full relative">
                <div 
                  className="absolute h-2 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" 
                  style={{ width: `${Math.min((existingDebts / 10000) * 100, 100)}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={existingDebts}
                  onChange={(e) => setExistingDebts(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex justify-between">
                <span>Debt-to-Income Ratio (%)</span>
                <span className="text-emerald-400">{debtToIncomeRatio}%</span>
              </label>
              <div className="h-2 bg-gray-900 rounded-full relative">
                <div 
                  className="absolute h-2 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" 
                  style={{ width: `${(debtToIncomeRatio / 70) * 100}%` }}
                />
                <input
                  type="range"
                  min="30"
                  max="70"
                  step="5"
                  value={debtToIncomeRatio}
                  onChange={(e) => setDebtToIncomeRatio(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                UAE lenders typically cap DTI at 50% of gross income
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-70" />
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border-none p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-foreground flex items-center">
                {financingType === 'islamic' ? 'Ijara/Murabaha Terms' : 'Mortgage Summary'}
              </h3>
              <Badge className="bg-cyan-500/20 text-cyan-400 font-medium border-none">
                {financingType === 'islamic' ? 'Sharia Compliant' : 'RERA Compliant'}
              </Badge>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-900/5 rounded-lg p-4 border border-cyan-900/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-muted-foreground">Monthly Payment</h4>
                  <span className="text-2xl font-bold text-white">{formatCurrency(monthlyPayment)}</span>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full mb-3">
                  <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[65%]"></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{financingType === 'islamic' ? 'Principal + Profit' : 'Principal + Interest'}</span>
                  <span>{formatCurrency(monthlyPayment)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/40 rounded-lg p-4">
                  <h4 className="text-sm text-muted-foreground mb-1">Total Interest{financingType === 'islamic' ? '/Profit' : ''}</h4>
                  <p className="text-xl font-medium text-cyan-400">{formatCurrency(totalInterest)}</p>
                </div>
                <div className="bg-gray-900/40 rounded-lg p-4">
                  <h4 className="text-sm text-muted-foreground mb-1">Total Payments</h4>
                  <p className="text-xl font-medium text-foreground">{formatCurrency(totalPayment)}</p>
                </div>
                <div className="bg-gray-900/40 rounded-lg p-4">
                  <h4 className="text-sm text-muted-foreground mb-1">UAE One-time Fees</h4>
                  <p className="text-xl font-medium text-foreground">{formatCurrency(totalOneTimeFees)}</p>
                </div>
                <div className="bg-gray-900/40 rounded-lg p-4">
                  <h4 className="text-sm text-muted-foreground mb-1">Annual Insurance</h4>
                  <p className="text-xl font-medium text-foreground">{formatCurrency(annualRecurringFees)}</p>
                </div>
              </div>
              
              <div className="bg-gray-900/40 rounded-lg p-4">
                <h4 className="text-sm text-muted-foreground mb-1">Total Cost of Ownership</h4>
                <p className="text-xl font-medium text-foreground">{formatCurrency(totalCost)}</p>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Property: {formatCurrency(propertyValue)}</span>
                  <span>Fees & Interest: {formatCurrency(totalCost - propertyValue)}</span>
                </div>
              </div>
              
              {showEarlyRepayment && earlyRepaymentResults && (
                <div className="bg-cyan-900/20 border border-cyan-900/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-cyan-400 mb-3">Early Repayment Impact</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Savings</span>
                      <span className="text-lg font-medium text-emerald-400">{formatCurrency(earlyRepaymentResults.savings)}</span>
                    </div>
                    
                    {earlyRepaymentResults.newMonthlyPayment && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">New Monthly Payment</span>
                        <span className="text-lg font-medium text-white">{formatCurrency(earlyRepaymentResults.newMonthlyPayment)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">New Loan Term</span>
                      <span className="text-lg font-medium text-white">{earlyRepaymentResults.newTerm} years</span>
                    </div>
                  </div>
                </div>
              )}
              
              {showStressTest && stressTestResults && (
                <div className="bg-rose-900/20 border border-rose-900/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-rose-400 mb-3">Interest Rate Stress Test</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current ({interestRate}%)</span>
                      <span className="text-lg font-medium text-white">{formatCurrency(stressTestResults.current)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Moderate (+1%)</span>
                      <span className="text-lg font-medium text-yellow-400">{formatCurrency(stressTestResults.moderate)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Significant (+2%)</span>
                      <span className="text-lg font-medium text-amber-400">{formatCurrency(stressTestResults.significant)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Severe (+3%)</span>
                      <span className="text-lg font-medium text-rose-400">{formatCurrency(stressTestResults.severe)}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-3">
                    Central Bank of UAE stress testing assesses your ability to handle rate increases.
                  </p>
                </div>
              )}
              
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Detailed UAE Fees Breakdown
                </h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Registration Fee ({residencyStatus === 'resident' ? '4%' : '5%'})</span>
                    <span>{formatCurrency(registrationFee)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Transfer Fee</span>
                    <span>{formatCurrency(transferFee)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Mortgage Registration</span>
                    <span>{formatCurrency(mortgageRegistrationFee)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Valuation Fee</span>
                    <span>{formatCurrency(valuationFee)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Knowledge & Innovation Fees</span>
                    <span>{formatCurrency(knowledgeFee + innovationFee)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Title Deed</span>
                    <span>{formatCurrency(titleDeedFee)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Administrative Fee</span>
                    <span>{formatCurrency(administrativeFee)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add amortization schedule toggle */}
        <div className="flex gap-3 items-center">
          <button
            className={`w-6 h-6 flex items-center justify-center rounded ${
              showAmortizationSchedule ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-muted-foreground'
            }`}
            onClick={() => setShowAmortizationSchedule(!showAmortizationSchedule)}
          >
            {showAmortizationSchedule && <Check className="h-4 w-4" />}
          </button>
          <label className="text-sm text-muted-foreground cursor-pointer" onClick={() => setShowAmortizationSchedule(!showAmortizationSchedule)}>
            View amortization schedule
          </label>
        </div>
        
        {/* Amortization Schedule Section */}
        {showAmortizationSchedule && amortizationSchedule.length > 0 && (
          <div className="bg-gray-900/40 rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium text-foreground">Amortization Schedule</h4>
              
              <div className="flex bg-gray-900/50 rounded-lg p-1">
                <button
                  className={`px-2 py-0.5 text-xs rounded-md ${scheduleDisplayYears === 'first5' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setScheduleDisplayYears('first5')}
                >
                  First 5 Years
                </button>
                <button
                  className={`px-2 py-0.5 text-xs rounded-md ${scheduleDisplayYears === 'yearly' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setScheduleDisplayYears('yearly')}
                >
                  Yearly
                </button>
                <button
                  className={`px-2 py-0.5 text-xs rounded-md ${scheduleDisplayYears === 'all' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setScheduleDisplayYears('all')}
                >
                  Full Schedule
                </button>
              </div>
            </div>
            
            {/* Principal to Interest Ratio Visualization */}
            <div className="mb-4">
              <h5 className="text-xs text-muted-foreground mb-2">Principal to Interest Ratio</h5>
              <div className="space-y-2">
                {[5, 10, 15, 20, 25].filter(year => year <= loanTerm).map(year => {
                  const yearlyPayment = amortizationSchedule.find(item => item.year === year);
                  if (!yearlyPayment) return null;
                  
                  const principalRatio = (yearlyPayment.principalPayment / yearlyPayment.payment) * 100;
                  const interestRatio = 100 - principalRatio;
                  
                  return (
                    <div key={year} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Year {year}</span>
                        <span className="text-muted-foreground">
                          {principalRatio.toFixed(0)}% Principal / {interestRatio.toFixed(0)}% {financingType === 'islamic' ? 'Profit' : 'Interest'}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-2 bg-cyan-500 rounded-l-full" style={{ width: `${principalRatio}%` }}></div>
                        <div className="h-2 bg-amber-500 rounded-r-full" style={{ width: `${interestRatio}%`, marginLeft: `${principalRatio}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Loan Balance Payoff Curve */}
            <div className="mb-4">
              <h5 className="text-xs text-muted-foreground mb-2">Loan Balance Over Time</h5>
              <div className="h-[120px] relative">
                <svg width="100%" height="100%" viewBox="0 0 365 120" preserveAspectRatio="none">
                  {/* Draw the payoff curve */}
                  <path 
                    d={`M 0 0 ${amortizationSchedule
                      .filter((_, i) => scheduleDisplayYears === 'all' ? i % 12 === 0 || i === 0 || i === amortizationSchedule.length - 1 : true)
                      .map((item, i, arr) => {
                        const x = (i / (arr.length - 1)) * 365;
                        const y = 120 - ((item.percentPaidOff / 100) * 120);
                        return `L ${x} ${y}`;
                      }).join(' ')}`}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                  
                  {/* Add guide lines */}
                  <line x1="0" y1="0" x2="365" y2="0" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1="60" x2="365" y2="60" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1="120" x2="365" y2="120" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
                </svg>
                
                {/* Y-axis labels */}
                <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute left-0 right-0 bottom-0 mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Start</span>
                  <span>Mid</span>
                  <span>End</span>
                </div>
              </div>
            </div>
            
            {/* Detailed Payment Table */}
            <div className="mt-4 max-h-[300px] overflow-y-auto border border-gray-800 rounded-lg">
              <table className="w-full text-xs">
                <thead className="bg-gray-900/60 sticky top-0">
                  <tr className="text-left">
                    <th className="p-2">Payment</th>
                    <th className="p-2">Principal</th>
                    <th className="p-2">{financingType === 'islamic' ? 'Profit' : 'Interest'}</th>
                    <th className="p-2">Balance</th>
                    <th className="p-2">Paid Off</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((payment, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-900/20" : "bg-gray-900/40"}>
                      <td className="p-2">
                        {scheduleDisplayYears === 'yearly' ? 
                          `Year ${payment.year}` : 
                          `Month ${payment.month}`}
                      </td>
                      <td className="p-2 text-cyan-400">{formatCurrency(payment.principalPayment)}</td>
                      <td className="p-2 text-amber-400">{formatCurrency(payment.interestPayment)}</td>
                      <td className="p-2">{formatCurrency(payment.remainingPrincipal)}</td>
                      <td className="p-2">{payment.percentPaidOff.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-3 text-xs text-muted-foreground">
              <p>* Amounts shown are approximate and for illustrative purposes only.</p>
            </div>
          </div>
        )}
        
        {/* Affordability Results */}
        {showAffordabilityCalculator && affordabilityResults && (
          <div className="bg-emerald-900/20 border border-emerald-900/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-emerald-400 mb-3">What You Can Afford</h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/40 rounded-lg p-3">
                  <h5 className="text-xs text-muted-foreground mb-1">Affordable Property</h5>
                  <p className="text-xl font-medium text-emerald-400">{formatCurrency(affordabilityResults.affordablePropertyValue)}</p>
                </div>
                <div className="bg-gray-900/40 rounded-lg p-3">
                  <h5 className="text-xs text-muted-foreground mb-1">Loan Amount</h5>
                  <p className="text-xl font-medium text-white">{formatCurrency(affordabilityResults.affordableLoanAmount)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/40 rounded-lg p-3">
                  <h5 className="text-xs text-muted-foreground mb-1">Down Payment Needed</h5>
                  <p className="text-lg font-medium text-white">{formatCurrency(affordabilityResults.requiredDownPayment)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{downPaymentPercent}% of property value</p>
                </div>
                <div className="bg-gray-900/40 rounded-lg p-3">
                  <h5 className="text-xs text-muted-foreground mb-1">Monthly Payment</h5>
                  <p className="text-lg font-medium text-white">{formatCurrency(affordabilityResults.affordableMonthlyPayment)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{((affordabilityResults.affordableMonthlyPayment / monthlyIncome) * 100).toFixed(0)}% of monthly income</p>
                </div>
              </div>
              
              <div className="bg-gray-900/40 rounded-lg p-3">
                <h5 className="text-xs text-muted-foreground mb-2">DTI Scenarios</h5>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Conservative (40%)</span>
                      <span className="text-white">{formatCurrency(affordabilityResults.conservativeDTI)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full">
                      <div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: `${(affordabilityResults.conservativeDTI / affordabilityResults.aggressiveDTI) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Standard (50%)</span>
                      <span className="text-white">{formatCurrency(affordabilityResults.standardDTI)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full">
                      <div className="h-1.5 bg-amber-500 rounded-full" style={{ width: `${(affordabilityResults.standardDTI / affordabilityResults.aggressiveDTI) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Aggressive (60%)</span>
                      <span className="text-white">{formatCurrency(affordabilityResults.aggressiveDTI)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full">
                      <div className="h-1.5 bg-rose-500 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/40 rounded-lg p-3">
                <h5 className="text-xs text-muted-foreground mb-2">Interest Rate Stress Test</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Loan with current rate ({interestRate}%)</span>
                    <span className="text-sm font-medium text-white">{formatCurrency(affordabilityResults.affordableLoanAmount)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Loan with +2% rate ({(interestRate + 2).toFixed(2)}%)</span>
                    <span className="text-sm font-medium text-amber-400">{formatCurrency(affordabilityResults.stressTestedLoanAmount)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Potential Impact</span>
                    <span className="text-sm font-medium text-rose-400">
                      -{affordabilityResults.stressTestedImpact.toFixed(1)}% (AED {formatCurrency(affordabilityResults.affordableLoanAmount - affordabilityResults.stressTestedLoanAmount)})
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/40 rounded-lg p-3 text-xs text-muted-foreground">
                <p>Affordability is based on your income, expenses, and selected loan parameters. Actual loan approval depends on credit history, employment status, and lender-specific criteria.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrapper component to contain both property search interfaces
export function RealEstateSearch() {
  const [mode, setMode] = useState<'ai' | 'predictive'>('ai');
  
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl opacity-50" />
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border-none p-6 relative">
        <div className="flex justify-end mb-4">
          <div className="flex bg-gray-900/50 rounded-lg p-1">
            <button
              className={`px-3 py-1 text-sm rounded-md ${mode === 'ai' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setMode('ai')}
            >
              AI Property Search
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${mode === 'predictive' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setMode('predictive')}
            >
              Market Analytics
            </button>
          </div>
        </div>
        
        {mode === 'ai' ? <AIPropertySearch /> : <DynamicPredictiveAnalytics />}
      </div>
    </div>
  );
}

// AI-powered Property Search component
export function AIPropertySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState<string>('Dubai'); // Explicitly type as string to avoid Location type conflict
  const [propertyType, setPropertyType] = useState('Any Type');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [bedrooms, setBedrooms] = useState('Any');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Apartments']);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  
  // UAE locations
  const locations = [
    'Dubai', 
    'Abu Dhabi', 
    'Sharjah', 
    'Ajman', 
    'Ras Al Khaimah', 
    'Fujairah', 
    'Umm Al Quwain'
  ];
  
  // Property types
  const propertyTypes = [
    'Any Type',
    'Apartment',
    'Villa',
    'Townhouse',
    'Penthouse',
    'Office',
    'Retail',
    'Warehouse'
  ];
  
  // Price ranges in AED
  const priceRanges = [
    'Any Price',
    'Up to 500,000',
    '500,000 - 1,000,000',
    '1,000,000 - 2,000,000',
    '2,000,000 - 5,000,000',
    '5,000,000 - 10,000,000',
    '10,000,000+'
  ];
  
  // Bedroom options
  const bedroomOptions = [
    'Any',
    'Studio',
    '1',
    '2',
    '3',
    '4',
    '5+',
  ];
  
  // Property filter tags
  const filterTags = [
    { name: 'Apartments', icon: <Home className="h-3 w-3 mr-1" />, color: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' },
    { name: 'Commercial', icon: <Briefcase className="h-3 w-3 mr-1" />, color: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' },
    { name: 'Villas', icon: <MapPin className="h-3 w-3 mr-1" />, color: 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' },
    { name: 'Luxury', icon: <Star className="h-3 w-3 mr-1" />, color: 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' },
    { name: 'Off-Plan', icon: <LocateFixed className="h-3 w-3 mr-1" />, color: 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' },
    { name: 'Waterfront', icon: <Map className="h-3 w-3 mr-1" />, color: 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' },
  ];
  
  // Toggle a filter tag
  const toggleFilter = (filterName: string) => {
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filterName));
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };
  
  // Sample property data (in a real app, this would come from an API)
  const sampleProperties = [
    {
      id: 1,
      title: "Modern Apartment",
      location: "Dubai Marina",
      price: "AED 2,500,000",
      features: "2 Bed • 2 Bath • 1,200 sq.ft",
      image: "/images/real-estate/dubai_home_articture.jpeg",
      isNew: true,
      hasVR: true,
      tags: ["Apartments", "Luxury"]
    },
    {
      id: 2,
      title: "Luxury Villa",
      location: "Palm Jumeirah",
      price: "AED 15,000,000",
      features: "5 Bed • 6 Bath • 7,500 sq.ft",
      image: "/images/real-estate/luxury-villa-meydan-crystal-lagoon1-1.jpg",
      isNew: false,
      hasVR: true,
      tags: ["Villas", "Luxury", "Waterfront"]
    },
    {
      id: 3,
      title: "Penthouse Suite",
      location: "Downtown Dubai",
      price: "AED 8,900,000",
      features: "3 Bed • 4 Bath • 3,600 sq.ft",
      image: "/images/real-estate/Dubai_Marina.jpeg",
      isNew: true,
      hasVR: false,
      tags: ["Apartments", "Luxury"]
    },
    {
      id: 4,
      title: "Commercial Office",
      location: "Business Bay",
      price: "AED 4,200,000",
      features: "Open Plan • 2,800 sq.ft",
      image: "/images/real-estate/dubai-real-estate.jpg",
      isNew: false,
      hasVR: true,
      tags: ["Commercial"]
    },
    {
      id: 5,
      title: "Off-Plan Townhouse",
      location: "Dubai Hills",
      price: "AED 3,750,000",
      features: "4 Bed • 5 Bath • 3,200 sq.ft",
      image: "/images/real-estate/OMNIYAT_Marasi_Marina_Aquisition_UAE.jpg",
      isNew: true,
      hasVR: true,
      tags: ["Off-Plan", "Villas"]
    },
    {
      id: 6,
      title: "Exclusive Palm Jumeirah Duplex",
      location: "Palm Jumeirah",
      price: "AED 28,500,000",
      features: "4 Bed • 5 Bath • 7,200 sq.ft",
      image: "/images/real-estate/Luxury_duplex_Palm_Jumeirah_Dubai.png",
      isNew: true,
      hasVR: true,
      tags: ["Luxury", "Waterfront", "Apartments"]
    }
  ];
  
  // Handle search
  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Filter properties based on selected criteria
      const filtered = sampleProperties.filter(property => {
        // Filter by search term
        if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
            !property.location.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        // Filter by location
        if (location !== 'Dubai' && !property.location.includes(location)) {
          return false;
        }
        
        // Filter by property type
        if (propertyType !== 'Any Type') {
          if (propertyType === 'Apartment' && !property.tags.includes('Apartments')) return false;
          if (propertyType === 'Villa' && !property.tags.includes('Villas')) return false;
          if (propertyType === 'Office' && !property.tags.includes('Commercial')) return false;
        }
        
        // Filter by selected tags
        if (selectedFilters.length > 0 && !selectedFilters.some(tag => property.tags.includes(tag))) {
          return false;
        }
        
        return true;
      });
      
      setSearchResults(filtered);
      setIsSearching(false);
    }, 1500);
  };
  
  const toggleAIRecommendations = () => {
    setShowAIRecommendations(!showAIRecommendations);
    
    // If turning on AI recommendations, update search results
    if (!showAIRecommendations) {
      setIsSearching(true);
      
      // Simulate AI processing delay
      setTimeout(() => {
        // Reorder results based on "AI" preferences - in a real app this would use actual AI
        const aiRecommended = [...sampleProperties].sort((a, b) => {
          // Prioritize luxury properties
          if (a.tags.includes('Luxury') && !b.tags.includes('Luxury')) return -1;
          if (!a.tags.includes('Luxury') && b.tags.includes('Luxury')) return 1;
          
          // Then waterfront
          if (a.tags.includes('Waterfront') && !b.tags.includes('Waterfront')) return -1;
          if (!a.tags.includes('Waterfront') && b.tags.includes('Waterfront')) return 1;
          
          return 0;
        });
        
        setSearchResults(aiRecommended);
        setIsSearching(false);
      }, 2000);
    } else {
      // If turning off, revert to normal search
      handleSearch();
    }
  };
  
  useEffect(() => {
    // Initial search
    handleSearch();
  }, []);
  
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl opacity-50" />
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border-none p-6 relative">
        <div className="flex flex-col space-y-6">
          {/* Main search bar */}
          <div className="flex items-center relative">
            <div className="absolute left-3">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search properties in Dubai, Abu Dhabi, Sharjah..."
              className="w-full px-10 py-3 rounded-lg bg-gray-900/70 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20 transition-all text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-md p-1.5 cursor-pointer"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4 text-white" />
            </motion.div>
          </div>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3">
            {filterTags.map((filter, index) => (
              <Badge 
                key={index} 
                className={`${filter.color} cursor-pointer px-4 py-2 shadow-md ${
                  selectedFilters.includes(filter.name) ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-blue-500/50' : ''
                }`}
                onClick={() => toggleFilter(filter.name)}
              >
                {filter.icon}
                {filter.name}
              </Badge>
            ))}
          </div>
          
          {/* Advanced filters */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Location</label>
              <div className="relative">
                <select 
                  className="w-full px-3 py-2 rounded-lg bg-gray-900/70 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20 appearance-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>{loc}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Property Type</label>
              <div className="relative">
                <select 
                  className="w-full px-3 py-2 rounded-lg bg-gray-900/70 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20 appearance-none"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  {propertyTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Price Range (AED)</label>
              <div className="relative">
                <select 
                  className="w-full px-3 py-2 rounded-lg bg-gray-900/70 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20 appearance-none"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={range}>{range}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Bedrooms</label>
              <div className="relative">
                <select 
                  className="w-full px-3 py-2 rounded-lg bg-gray-900/70 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20 appearance-none"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  {bedroomOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          {/* AI features */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t border-gray-800">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div 
                className={`flex items-center gap-2 cursor-pointer group`}
                onClick={toggleAIRecommendations}
              >
                <div className={`w-8 h-8 rounded-full ${showAIRecommendations ? 'bg-blue-500' : 'bg-blue-500/20'} flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-500/80`}>
                  <Brain className={`h-4 w-4 ${showAIRecommendations ? 'text-white' : 'text-blue-400'} group-hover:text-white`} />
                </div>
                <span className={`text-sm ${showAIRecommendations ? 'text-foreground' : 'text-muted-foreground'} group-hover:text-foreground`}>AI Recommendation</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/40">
                  <Eye className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground">VR Viewings</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/40">
                  <Compass className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground">Area Insights</span>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none shadow-lg"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  Search Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* AI Recommendation alert - shown when AI feature is active */}
        {showAIRecommendations && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 flex items-start gap-3"
          >
            <div className="bg-blue-500/20 rounded-full p-1.5 text-blue-400">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-400">AI-Enhanced Search Active</h4>
              <p className="text-xs text-blue-300/70 mt-1">
                Properties are being sorted based on your browsing history, previous searches, and market trends in your selected areas.
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Search results */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-foreground">Search Results</h3>
            <Badge className="bg-gray-800 text-muted-foreground">
              {searchResults.length} properties found
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {isSearching ? (
              // Loading state
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 rounded-lg overflow-hidden shadow-lg border-none animate-pulse">
                  <div className="h-40 bg-gray-800"></div>
                  <div className="p-4">
                    <div className="h-4 w-2/3 bg-gray-800 rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-gray-800 rounded mb-4"></div>
                    <div className="h-3 w-full bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))
            ) : searchResults.length > 0 ? (
              // Results
              searchResults.map((property) => (
                <motion.div
                  key={property.id}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 rounded-lg overflow-hidden shadow-lg border-none"
                >
                  <div className="relative h-40">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      {property.isNew && (
                        <Badge className="bg-blue-500 text-white font-medium border-none">New</Badge>
                      )}
                      {property.hasVR && (
                        <Badge className="bg-purple-500/90 text-white font-medium border-none">
                          <Eye className="h-3 w-3 mr-1" />
                          VR Tour
                        </Badge>
                      )}
                    </div>
                    {showAIRecommendations && property.tags.includes('Luxury') && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-500/90 text-white font-medium border-none">
                          <Brain className="h-3 w-3 mr-1" />
                          AI Pick
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-foreground">{property.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location}
                        </p>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400 border-none">{property.price}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{property.features}</p>
                    <div className="mt-3 pt-2 border-t border-gray-800 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-[10px] font-bold text-blue-300">MK</div>
                        <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-[10px] font-bold text-purple-300">AR</div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2 hover:bg-blue-500/10 hover:text-blue-400">
                        View
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // No results
              <div className="col-span-3 py-12 flex flex-col items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground opacity-40 mb-3" />
                <h4 className="text-lg font-medium text-foreground">No properties found</h4>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}