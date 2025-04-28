"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect, useRef, MouseEvent as ReactMouseEvent, useMemo } from "react"
import { 
  Award, 
  BookOpen, 
  Briefcase, 
  Code, 
  FileText, 
  GraduationCap, 
  Linkedin, 
  Mail, 
  Medal as MedalIcon, 
  Phone, 
  Star, 
  User,
  BrainCircuit,
  Network,
  Cpu,
  Calculator,
  ChevronRight,
  DollarSign
} from "lucide-react"
import { StandardBackground } from "@/components/shared/background"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const ACHIEVEMENTS = [
  "Employee of the Month (Sep 2022) for outstanding contributions",
  "Presented Big Data Analytics project at IBA CICT Impact (February 2023)",
  "Participated in JPMorgan Chase Software Engineering Virtual Experience Program",
  "Participated in Accenture North America Data Analytics and Visualization Virtual Experience Program"
]

const EDUCATION = [
  {
    degree: "BS – Computer Science",
    institution: "Iqra University, Karachi, Pakistan",
    period: "Sep 2016 - 2021",
    details: "Major Courses: Artificial Intelligence, Data Engineering, Machine Learning, Probability & Statistics, Project Management, Software Engineering, Multivariate Calculus",
    project: "Student Distraction Detection Using Computer Vision and Deep Learning (Project Leader & Back-end Developer)"
  }
]

const EXPERIENCE = [
  {
    role: "Big Data Solutions Architect",
    company: "International Client - Freelance (Remote)",
    period: "Jul 2023 - Present",
    responsibilities: [
      "Optimized Big Data Performance: Enhanced Hadoop environments in Cloudera, significantly boosting performance and reliability",
      "Fortified System Security: Conducted proactive updates and integrated cutting-edge technologies to maintain robust defenses",
      "Drove Innovation: Integrated advanced tools to elevate data processing capabilities and operational efficiency",
      "Provided Expert-Level Support: Delivered high-level 3rd-tier technical support, resolving complex issues for data engineers and scientists",
      "Streamlined Linux Administration: Improved system reliability and performance through efficient management with RedHat",
      "Mastered Cloudera Management: Deployed and managed Cloudera clusters, ensuring optimal operation of HDFS, Kafka, Impala, Hive, StreamSets, and YARN",
      "Advanced Data Science Initiatives: Leveraged technical expertise to drive actionable insights and enhance data workflows"
    ]
  },
  {
    role: "Financial Data Analyst",
    company: "Speridian Technologies, LLC - Karachi, Pakistan",
    period: "Mar 2022 - Oct 2023",
    responsibilities: [
      "Automated daily reporting with Python and SQL, significantly boosting efficiency",
      "Delivered BI solutions by collaborating with cross-functional teams",
      "Cut reporting time from 5 hours to 15 minutes through automation with Oracle Analytics",
      "Translated business needs into actionable big data insights",
      "Created BI dashboards and KPIs for targeted analysis",
      "Automated Excel reports and developed custom macros, improving productivity and accuracy"
    ]
  },
  {
    role: "AI Engineer Intern",
    company: "Optimizia - Karachi, Pakistan",
    period: "Mar 2021 - Sep 2021",
    responsibilities: [
      "Developing and implementing computer vision algorithms with Deep Neural Networks",
      "Custom data set preparation, labeling",
      "Agile workflow development"
    ]
  },
  {
    role: "Business Analyst",
    company: "The Sparks Foundation - Remote",
    period: "Mar 2021 - Mar 2021",
    responsibilities: [
      "Worked on projects and learned a lot by experimenting on different datasets",
      "Performed exploratory data analysis and provided BI solutions"
    ]
  }
]

const CERTIFICATIONS = [
  "Career Essentials in Generative AI by Microsoft and LinkedIn",
  "Data Science Professional Certification (Coursera)",
  "Python for Everybody Specialization (Process)",
  "Scrum Foundation Professional Certification",
  "Neural Networks and Deep Learning",
  "Statistics for Machine Learning",
  "Six Sigma White Belt Certification",
  "Machine Learning - AWS",
  "Advanced Deep Learning with Keras (Data Camp)",
  "Ethics in the Age of Generative AI (LinkedIn)"
]

const SKILLS = {
  generalSkills: ["Data Analytics", "Machine Learning", "Big Data", "Agile Methodologies", "Prescriptive Analytics", "Oracle Analytics"],
  technicalSkills: ["Deep Learning", "Statistical Analysis", "Big Data", "Python", "SQL", "Hadoop", "TensorFlow", "Snowflake", "Linux (Basics)", "IBM Cognos", "Watson Studio", "Cloudera", "Tableau", "Power BI", "Git", "Excel & VBS", "Azure AI", "IBM CPLEX", "Oracle Analytics", "StreamSets", "Power Query", "Syniti", "Azure VM", "SSL/TSL Deployment"]
}

const PROJECTS = [
  {
    title: "Mindscape Analytics",
    description: "Developed, designed and launched Mindscape Analytics (www.mindscapeanalytics.com) from scratch in just 1 month of continuous development, creating a comprehensive analytics platform."
  },
  {
    title: "Crypto & Stock Market Prediction Models",
    description: "Developed and deployed machine learning models for predicting cryptocurrency and stock market movements, providing strategic insights for investors."
  },
  {
    title: "Product Recommendation Engine",
    description: "Created a sophisticated recommendation system that analyzes user behavior to suggest personalized product recommendations."
  },
  {
    title: "Customer Segmentation Engine",
    description: "Designed an intelligent customer segmentation solution that identifies distinct customer groups for targeted marketing strategies."
  }
]

// Add image sources array for fallbacks
const founderImageSources = [
  '/founder.jpg',
  '/images/founder.jpg',
  '/images/team/founder.jpg',
  'https://via.placeholder.com/300x300.png?text=Founder'
];

// Reusable Founder Image component
const FounderImage = ({
  width = 300,
  height = 300,
  className = "",
  priority = false,
  fill = false,
  onLoad,
  onError,
  style
}: {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
}) => {
  const [imgSrc, setImgSrc] = useState(founderImageSources[0]);
  const [imgError, setImgError] = useState(false);
  
  return (
    <Image
      src={imgSrc}
      alt="Zeeshan Keerio"
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      className={`${className} ${imgError ? 'opacity-0' : 'opacity-100'}`}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAJAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQYI/8QAIxAAAQMEAgIDAQAAAAAAAAAAAQIDBQAEBhESIQcTCDFRYf/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHBEAAwACAwEAAAAAAAAAAAAAAAECAxEhQTEE/9oADAMBAAIRAxEAPwDWOQZ7iEJ91h8zhOVt1b9jK+5htIBUaUAo6BJoXnPk54q0wvNMSd8l2LV1KMqjmDbtqcLZQ6wsFO1JA3sAjfWtVWGjXOfRLCjlMVfXS7Z9JLLKmyFBSvxJPQGtfnvwxDZtl2Y5NlMPFBaZSl9xDrxTtSFBKCVjf1vfXdZc9xoWrT3PYKYRTIvkN//Z"
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
        ...style
      }}
      onError={(e) => {
        if (!imgError) {
          setImgError(true);
          // Try the next image source if available
          const currentIndex = founderImageSources.indexOf(imgSrc);
          if (currentIndex < founderImageSources.length - 1) {
            setImgSrc(founderImageSources[currentIndex + 1]);
            setImgError(false);
          }
          onError?.();
        }
      }}
      onLoad={() => {
        onLoad?.();
      }}
    />
  );
};

export default function ZeeshanKeerioPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("experience");
  const [imageLoadingState, setImageLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // ROI Calculator state
  const [showRoiCalculator, setShowRoiCalculator] = useState(false);
  const [roiInputs, setRoiInputs] = useState({
    employees: 50,
    annualRevenue: 1000000,
    currentCosts: 700000,
    projectCost: 50000,
    timeframe: 12
  });
  const [roiResults, setRoiResults] = useState<{
    monthlySavings: number;
    annualSavings: number;
    roi: number;
    paybackPeriod: number;
  } | null>(null);
  
  // Handle ROI input changes
  const handleRoiInputChange = (name: string, value: number) => {
    setRoiInputs({
      ...roiInputs,
      [name]: value
    });
  };
  
  // Calculate ROI based on inputs
  const calculateRoi = () => {
    const { employees, annualRevenue, currentCosts, projectCost, timeframe } = roiInputs;
    
    // Calculate productivity gains (20% productivity increase per employee)
    const productivityGain = employees * 2000 * 0.2; // Assuming $2000 cost per employee per month
    
    // Calculate revenue increase (5% of annual revenue, distributed monthly)
    const revenueIncrease = (annualRevenue * 0.05) / 12;
    
    // Calculate cost reduction (10% of current costs, distributed monthly)
    const costReduction = (currentCosts * 0.1) / 12;
    
    // Total monthly savings
    const monthlySavings = productivityGain + revenueIncrease + costReduction;
    
    // Annual savings
    const annualSavings = monthlySavings * 12;
    
    // ROI calculation: (total benefits - cost) / cost * 100
    const roi = ((annualSavings * timeframe / 12) - projectCost) / projectCost * 100;
    
    // Payback period in months
    const paybackPeriod = projectCost / monthlySavings;
    
    setRoiResults({
      monthlySavings,
      annualSavings,
      roi,
      paybackPeriod
    });
    
    return {
      monthlySavings,
      annualSavings,
      roi,
      paybackPeriod
    };
  };
  
  useEffect(() => {
    const handleMouseMove = (e: ReactMouseEvent<HTMLElement, MouseEvent> | MouseEvent) => {
      if (profileRef.current) {
        const rect = profileRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
    return () => window.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
  }, []);
  
  // Generate AI particles with useMemo for better performance
  const aiParticles = useMemo(() => {
    const particles = [];
    for (let i = 0; i < 12; i++) {
      particles.push(
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-red-500/30 to-purple-500/30"
          initial={{ 
            x: Math.random() * 300 - 150, 
            y: Math.random() * 300 - 150,
            opacity: 0
          }}
          animate={{ 
            x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
            y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      );
    }
    return particles;
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Add image preloading effect
  useEffect(() => {
    // Preload all possible founder images to improve user experience
    founderImageSources.forEach(src => {
      if (src.startsWith('http') || src.startsWith('/')) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, []);
  
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-black/95 to-black text-white overflow-x-hidden">
      {/* Advanced dynamic background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-full bg-red-600/5 blur-[60px] sm:blur-[80px] md:blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-[200px] sm:w-[300px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[300px] md:h-[500px] lg:h-[600px] rounded-full bg-purple-600/5 blur-[80px] sm:blur-[100px] md:blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/3 w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] rounded-full bg-blue-600/5 blur-[40px] sm:blur-[60px] md:blur-[100px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        
        {/* AI Neural Network Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,250,0.03)_0,rgba(255,30,86,0.03)_25%,rgba(0,0,0,0)_50%)]"></div>
        
        {/* Digital Circuit Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-red-500/5 to-purple-500/5"></div>
      </div>

      <StandardBackground />

      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20">
        {/* Hero Section with Advanced Effects */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-8 relative overflow-hidden"
        >
          {/* AI Theme Decorative Elements - Optimized for mobile */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="absolute top-10 sm:top-20 right-0 sm:right-10 w-16 sm:w-24 md:w-32 text-red-500/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M45.4,-51.3C58.3,-39.2,68,-24.1,70.9,-7.8C73.8,8.6,70,26.1,59.7,38.9C49.4,51.7,32.5,59.8,14.9,63.5C-2.8,67.1,-21.1,66.3,-36.9,58.9C-52.7,51.5,-66,37.5,-70.9,21.1C-75.8,4.7,-72.3,-14.2,-63.3,-29.4C-54.2,-44.7,-39.6,-56.5,-24.1,-67.4C-8.7,-78.2,7.6,-88.1,22,-83.8C36.3,-79.4,48.8,-60.8,50.8,-47.8"/>
            </svg>
          <svg className="absolute bottom-5 sm:bottom-10 left-2 sm:left-10 w-12 sm:w-20 md:w-24 text-purple-500/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M37.7,-47.4C50.9,-35.9,65.2,-26.2,72.5,-11.6C79.8,3,80.1,22.5,72.1,38.3C64.2,54.1,48,66.1,30.4,71.8C12.9,77.5,-6,76.8,-23.5,71C-41,65.1,-57.1,54.1,-68.3,38.1C-79.5,22.1,-85.8,1.1,-81.5,-17.4C-77.2,-35.9,-62.2,-51.9,-45.9,-63.1C-29.6,-74.3,-12,-79.8,-0.2,-79.5C11.6,-79.3,24.5,-58.9,37.7,-47.4Z"/>
            </svg>
          </div>
          
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            {/* SVG Hero Section with AI Effects */}
            <motion.div 
            className="relative mx-auto lg:mx-0 order-1 lg:order-1 max-w-[220px] xs:max-w-[280px] sm:max-w-[300px] md:max-w-[400px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              ref={profileRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* AI Particles animation */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {aiParticles}
              </div>
              
              {/* Neural network connection lines */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div 
                    key={`network-line-${i}`}
                  className="absolute w-[1px] h-[80px] sm:h-[100px] bg-gradient-to-b from-red-500/0 via-red-500/20 to-red-500/0"
                    style={{
                    left: `${(i + 1) * 16.6}%`,
                    transform: `rotate(${i * 60}deg)`,
                      transformOrigin: 'center'
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                    duration: 3,
                      repeat: Infinity,
                      repeatType: "loop",
                    delay: i * 0.3
                    }}
                  />
                ))}
              </div>
              
              {/* Advanced animated glow effect behind SVG */}
              <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-red-500/30 to-purple-500/30 rounded-full blur-2xl sm:blur-3xl opacity-30 sm:opacity-40"
                animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.4, 0.3],
                rotate: [0, 5, 0]
                }} 
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                aria-hidden="true"
              />
              
              {/* Enhanced Profile Image with 3D effects and fallback handling */}
              <motion.div 
              className="relative w-[180px] h-[180px] xs:w-[200px] xs:h-[200px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(255,0,0,0.25)] group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isHovering ? `perspective(1000px) rotateY(${mousePosition.x * 0.01}deg) rotateX(${-mousePosition.y * 0.01}deg)` : "perspective(1000px)"
                }}
              >
                {/* Digital scan effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent z-20 pointer-events-none"
                  animate={{
                    top: ["-100%", "200%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  repeatDelay: 2
                  }}
                />
                
                {/* Rotating gradient border */}
                <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-red-500/40 via-purple-500/40 to-red-500/40 rounded-full z-0"
                  animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Profile image with advanced hover effects and error handling */}
                <div className="absolute inset-[4px] rounded-full overflow-hidden z-10 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                  {imageLoadingState === 'error' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black z-20">
                    <User className="h-12 w-12 sm:h-16 sm:w-16 text-red-500/50 mb-2" />
                      <p className="text-xs text-red-500/80">Image unavailable</p>
                    </div>
                  )}
                  
                  {imageLoadingState === 'loading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-black z-20">
                      <motion.div
                      className="h-12 w-12 sm:h-16 sm:w-16 border-3 sm:border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  )}
                  
                  <FounderImage
                    width={200}
                    height={200}
                    className={`object-cover transition-transform duration-500 scale-110 group-hover:scale-125 ${imageLoadingState === 'error' ? 'opacity-0' : 'opacity-100'}`}
                    priority
                    onError={() => {
                      // Try the next image source if available
                      if (currentImageIndex < founderImageSources.length - 1) {
                        setCurrentImageIndex(currentImageIndex + 1);
                      } else {
                        // If we've tried all sources, show the error state
                        setImageLoadingState('error');
                      }
                    }}
                    onLoad={() => {
                      setImageLoadingState('loaded');
                    }}
                    style={{
                      filter: "contrast(1.1) saturate(1.15)"
                    }}
                  />
                  
                  {/* AI HUD overlay effect */}
                  <motion.div 
                    className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%)"
                    }}
                  >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 border-2 border-red-500/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-40 sm:h-40 border border-purple-500/20 rounded-full"></div>
                    
                    {/* Small data points around the circle */}
                  {Array.from({ length: 6 }).map((_, i) => (
                      <div 
                        key={`circle-point-${i}`}
                        className="absolute w-1 h-1 bg-red-500/40"
                        style={{
                        top: `${50 + 45 * Math.sin(i * Math.PI / 3)}%`,
                        left: `${50 + 45 * Math.cos(i * Math.PI / 3)}%`
                        }}
                      ></div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Achievement badges with clean styling */}
              <motion.div 
              className="absolute -right-0 xs:-right-2 sm:-right-6 top-0 bg-gradient-to-r from-red-600/90 to-red-700/90 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-2 rounded-full text-[10px] xs:text-xs font-semibold shadow-lg flex items-center gap-1 sm:gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
              <BrainCircuit className="h-2.5 w-2.5 xs:h-3 xs:w-3 text-yellow-300" />
                <span>AI Expert</span>
              </motion.div>
              
              <motion.div 
              className="absolute -left-0 xs:-left-2 sm:-left-4 bottom-10 bg-gradient-to-r from-purple-600/90 to-purple-700/90 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-2 rounded-full text-[10px] xs:text-xs font-semibold shadow-lg flex items-center gap-1 sm:gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
              >
              <Cpu className="h-2.5 w-2.5 xs:h-3 xs:w-3 text-yellow-300" />
                <span>Data Scientist</span>
              </motion.div>
              
              <motion.div 
              className="absolute -right-0 xs:-right-2 sm:-right-6 bottom-1/3 bg-gradient-to-r from-blue-600/90 to-blue-700/90 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-2 rounded-full text-[10px] xs:text-xs font-semibold shadow-lg flex items-center gap-1 sm:gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.05 }}
              >
              <Network className="h-2.5 w-2.5 xs:h-3 xs:w-3 text-yellow-300" />
              <span className="whitespace-nowrap">Big Data Specialist</span>
              </motion.div>
            </motion.div>

            {/* Content Column with AI-themed enhancements */}
            <motion.div 
              className="order-2 lg:order-2 mt-6 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* AI-themed badge with animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-block"
              >
              <Badge className="mb-3 sm:mb-4 bg-gradient-to-r from-red-500/30 to-purple-500/30 text-white hover:from-red-500/40 hover:to-purple-500/40 backdrop-blur-sm px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-xs sm:text-sm shadow-lg relative z-10">
                <BrainCircuit className="inline-block mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  AI INNOVATOR
                </Badge>
              {/* Badge highlight effect - optimized */}
                <motion.div 
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-sm z-0"
                  animate={{
                  opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                  repeatType: "reverse" 
                  }}
                />
              </motion.div>
              
            {/* Name, Title, and Core Info with improved typography */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 relative">
              Zeeshan Keerio
            </h1>
            
              <div className="relative">
              <motion.h2 
                className="text-xl xs:text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400 mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                Big Data Solutions Architect
              </motion.h2>
              
              {/* Animated underline effect */}
              <motion.div 
                className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-red-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </div>
            
            {/* Bio paragraph with improved readability */}
            <motion.p 
              className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
              I drive innovation through applied AI and data science, developing cutting-edge solutions that optimize business processes and create actionable insights. With expertise in machine learning, big data, and advanced analytics, I build robust data-centric applications that solve complex problems.
            </motion.p>

            {/* Stats cards with consistent spacing and alignment */}
                  <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              {[
                { value: "5+", label: "Years Experience", icon: Briefcase, color: "text-blue-400" },
                { value: "10+", label: "Projects Completed", icon: FileText, color: "text-green-400" },
                { value: "12+", label: "Certifications", icon: Award, color: "text-yellow-400" },
                { value: "3", label: "AI Solutions", icon: BrainCircuit, color: "text-red-400" },
              ].map((stat, index) => (
                            <motion.div 
                          key={index}
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(255,255,255,0.1)" }}
                  className="bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3 xs:p-4 sm:p-4 text-center"
                >
                  <div className="flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/10 mx-auto mb-2 sm:mb-3">
                    <stat.icon className={`h-4 w-4 xs:h-5 xs:w-5 ${stat.color}`} />
                    </div>
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">{stat.value}</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/70">{stat.label}</div>
                        </motion.div>
                      ))}
                  </motion.div>
                
            {/* CTA buttons with consistent styling and improved mobile layout */}
                <motion.div 
              className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/20 border-none text-xs xs:text-sm px-4 py-2 h-auto"
              >
                <Mail className="mr-1.5 h-3.5 w-3.5 xs:h-4 xs:w-4" />
                Contact Me
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white/90 backdrop-blur-sm text-xs xs:text-sm px-4 py-2 h-auto"
                onClick={() => setShowRoiCalculator(true)}
              >
                <Calculator className="mr-1.5 h-3.5 w-3.5 xs:h-4 xs:w-4" />
                ROI Calculator
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="border border-white/10 bg-white/5 hover:bg-white/10 w-9 h-9 xs:w-10 xs:h-10 rounded-full"
                asChild
              >
                <Link href="https://www.linkedin.com/in/zeeshankeerio/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 xs:h-5 xs:w-5 text-blue-400" />
                        </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="border border-white/10 bg-white/5 hover:bg-white/10 w-9 h-9 xs:w-10 xs:h-10 rounded-full"
                asChild
              >
                <Link href="tel:+1234567890">
                  <Phone className="h-4 w-4 xs:h-5 xs:w-5 text-green-400" />
                </Link>
              </Button>
                    </motion.div>
                        </motion.div>
                      </div>
      </motion.section>

      {/* Improved Tabs Navigation System */}
      <Tabs 
        defaultValue="experience" 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="mt-8 sm:mt-12 md:mt-16"
      >
        <div className="relative mb-4 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent h-[1px] bottom-0"></div>
          <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 bg-transparent border-0 p-0 gap-2 sm:gap-0">
            {[
              { id: "experience", label: "Experience", icon: Briefcase },
              { id: "skills", label: "Skills", icon: Star },
              { id: "projects", label: "Projects", icon: FileText },
              { id: "education", label: "Education", icon: GraduationCap },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className={`
                  data-[state=active]:text-white data-[state=active]:border-red-500 data-[state=active]:bg-gradient-to-b data-[state=active]:from-red-500/20 data-[state=active]:to-transparent
                  border-b-2 border-transparent px-1 py-2 sm:py-3 transition-all duration-300 font-medium
                  text-white/60 hover:text-white/80 text-xs xs:text-sm sm:text-base flex gap-1 sm:gap-2 justify-center
                `}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-3.5 w-3.5 xs:h-4 xs:w-4" />
                <span className="hidden xs:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
                    </div>
                    
        {/* ... rest of content (tabs content) ... */}
      </Tabs>
                        </div>
    </main>
  )
}

// Trophy icon component since it's missing from lucide-react
function Trophy({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 2l1 13h6l1-13"></path>
      <path d="M8 2h8"></path>
      <path d="M12 12a4 4 0 0 0 4-4V2"></path>
      <path d="M12 12a4 4 0 0 1-4-4V2"></path>
      <path d="M6 13h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Z"></path>
      <path d="m7 17 10 .01"></path>
      <path d="m9 21 6 .01"></path>
      <path d="m12 17 .01 4"></path>
    </svg>
  )
} 

const styles = `
  /* Add these styles to the end of your existing styles */
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`