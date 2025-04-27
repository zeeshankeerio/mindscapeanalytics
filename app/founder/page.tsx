"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect, useRef } from "react"
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
  Cpu
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

export default function ZeeshanKeerioPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("experience");
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (profileRef.current) {
        const rect = profileRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const generateAIParticles = () => {
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
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-black/95 to-black text-white overflow-x-hidden">
      {/* Advanced dynamic background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full bg-red-600/5 blur-[80px] sm:blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] rounded-full bg-purple-600/5 blur-[100px] sm:blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/3 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full bg-blue-600/5 blur-[60px] sm:blur-[100px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        
        {/* AI Neural Network Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,250,0.03)_0,rgba(255,30,86,0.03)_25%,rgba(0,0,0,0)_50%)]"></div>
        
        {/* Digital Circuit Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-red-500/5 to-purple-500/5"></div>
      </div>

      <StandardBackground />

      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* Hero Section with Advanced Effects */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 relative overflow-hidden"
        >
          {/* AI Theme Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="absolute top-20 right-10 w-24 sm:w-32 text-red-500/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M45.4,-51.3C58.3,-39.2,68,-24.1,70.9,-7.8C73.8,8.6,70,26.1,59.7,38.9C49.4,51.7,32.5,59.8,14.9,63.5C-2.8,67.1,-21.1,66.3,-36.9,58.9C-52.7,51.5,-66,37.5,-70.9,21.1C-75.8,4.7,-72.3,-14.2,-63.3,-29.4C-54.2,-44.7,-39.6,-56.5,-24.1,-67.4C-8.7,-78.2,7.6,-88.1,22,-83.8C36.3,-79.4,48.8,-60.8,50.8,-47.8"/>
            </svg>
            <svg className="absolute bottom-10 left-10 w-20 sm:w-24 text-purple-500/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M37.7,-47.4C50.9,-35.9,65.2,-26.2,72.5,-11.6C79.8,3,80.1,22.5,72.1,38.3C64.2,54.1,48,66.1,30.4,71.8C12.9,77.5,-6,76.8,-23.5,71C-41,65.1,-57.1,54.1,-68.3,38.1C-79.5,22.1,-85.8,1.1,-81.5,-17.4C-77.2,-35.9,-62.2,-51.9,-45.9,-63.1C-29.6,-74.3,-12,-79.8,-0.2,-79.5C11.6,-79.3,24.5,-58.9,37.7,-47.4Z"/>
            </svg>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 md:gap-16 items-center">
            {/* Image Column - Advanced Circular Profile Picture with AI Effects */}
            <motion.div 
              className="relative mx-auto lg:mx-0 order-1 lg:order-1 max-w-[300px] sm:max-w-[350px] md:max-w-[400px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              ref={profileRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* AI Particles animation */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {generateAIParticles()}
              </div>
              
              {/* Neural network connection lines */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div 
                    key={`network-line-${i}`}
                    className="absolute w-[1px] h-[100px] bg-gradient-to-b from-red-500/0 via-red-500/20 to-red-500/0"
                    style={{
                      left: `${(i + 1) * 12.5}%`,
                      transform: `rotate(${i * 45}deg)`,
                      transformOrigin: 'center'
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
              
              {/* Advanced animated glow effect behind image */}
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-red-500/30 to-purple-500/30 rounded-full blur-3xl opacity-40"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4],
                  rotate: [0, 10, 0]
                }} 
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                aria-hidden="true"
              />
              
              {/* Circular profile container with animated border and 3D tilt effect */}
              <motion.div 
                className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_40px_rgba(255,0,0,0.3)] group"
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
                    repeatDelay: 1
                  }}
                />
                
                {/* Rotating gradient border */}
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-red-500/50 via-purple-500/50 to-red-500/50 rounded-full z-0"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Profile image with advanced hover effects */}
                <div className="absolute inset-[4px] rounded-full overflow-hidden z-10">
                  <Image
                    src="/founder.jpg"
                    alt="Zeeshan Keerio"
                    fill
                    className="object-cover transition-transform duration-500 scale-110 group-hover:scale-125"
                    priority
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-red-500/30 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-purple-500/20 rounded-full"></div>
                    
                    {/* Small data points around the circle */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div 
                        key={`circle-point-${i}`}
                        className="absolute w-1 h-1 bg-red-500/40"
                        style={{
                          top: `${50 + 45 * Math.sin(i * Math.PI / 4)}%`,
                          left: `${50 + 45 * Math.cos(i * Math.PI / 4)}%`
                        }}
                      ></div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Advanced achievement badges with AI theme - made responsive */}
              <motion.div 
                className="absolute -right-2 sm:-right-6 top-0 bg-gradient-to-r from-red-600/90 to-red-700/90 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 sm:gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220,38,38,0.4)" }}
              >
                <BrainCircuit className="h-3 w-3 text-yellow-300" />
                <span>AI Expert</span>
              </motion.div>
              
              <motion.div 
                className="absolute -left-2 sm:-left-4 bottom-10 bg-gradient-to-r from-purple-600/90 to-purple-700/90 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 sm:gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
              >
                <Cpu className="h-3 w-3 text-yellow-300" />
                <span>Data Scientist</span>
              </motion.div>
              
              <motion.div 
                className="absolute -right-4 sm:-right-10 bottom-1/3 bg-gradient-to-r from-blue-600/90 to-blue-700/90 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 sm:gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
              >
                <Network className="h-3 w-3 text-yellow-300" />
                <span>Big Data Specialist</span>
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
                <Badge className="mb-4 bg-gradient-to-r from-red-500/30 to-purple-500/30 text-white hover:from-red-500/40 hover:to-purple-500/40 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm shadow-lg relative z-10">
                  <BrainCircuit className="inline-block mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  AI INNOVATOR
                </Badge>
                {/* Badge highlight effect */}
                <motion.div 
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-sm z-0"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatType: "mirror" 
                  }}
                />
              </motion.div>
              
              {/* AI-enhanced name display with animated gradient and typing effect */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-md opacity-50 rounded-lg"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    background: [
                      "linear-gradient(90deg, rgba(239,68,68,0.2) 0%, rgba(168,85,247,0.2) 100%)",
                      "linear-gradient(90deg, rgba(168,85,247,0.2) 0%, rgba(59,130,246,0.2) 100%)",
                      "linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(239,68,68,0.2) 100%)"
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Zeeshan Keerio
                </motion.h1>
              </div>
              
              {/* Role badges - enhanced with animations and AI-theme */}
              <motion.div 
                className="flex flex-wrap gap-2 mb-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  variants={fadeIn}
                  className="bg-red-500/10 border border-red-500/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm"
                >
                  <span className="flex items-center text-red-400 text-xs sm:text-sm">
                    <BrainCircuit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    AI & Data Science Expert
                  </span>
                </motion.div>
                
                <motion.div 
                  variants={fadeIn}
                  className="bg-purple-500/10 border border-purple-500/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm"
                >
                  <span className="flex items-center text-purple-400 text-xs sm:text-sm">
                    <Network className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Big Data Architect
                  </span>
                </motion.div>
                
                <motion.div 
                  variants={fadeIn}
                  className="bg-blue-500/10 border border-blue-500/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm"
                >
                  <span className="flex items-center text-blue-400 text-xs sm:text-sm">
                    <Cpu className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Machine Learning Engineer
                  </span>
                </motion.div>
              </motion.div>
              
              {/* Advanced metrics and stats - AI themed */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                {[
                  { label: "Years Experience", value: "7+", icon: Briefcase, color: "text-red-400" },
                  { label: "AI Projects", value: "25+", icon: BrainCircuit, color: "text-purple-400" },
                  { label: "ML Models", value: "40+", icon: Code, color: "text-blue-400" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gradient-to-br from-black/50 to-black/30 border border-white/10 p-2 sm:p-3 rounded-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                  >
                    <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1 sm:mb-2 ${stat.color}`} />
                    <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Enhanced bio with AI-themed styling */}
              <motion.div 
                className="relative mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Animated circuit board background */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-red-500/5 to-purple-500/5"></div>
                  
                  {/* Data points animation */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-red-500/40 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>
                
                {/* Main content - Enhanced AI Expert Profile */}
                <div className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed p-3 sm:p-4 rounded-lg border-l-2 border-red-500/50 relative z-10">
                  <div className="flex items-center mb-2">
                    <BrainCircuit className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 mr-2" />
                    <span className="text-red-400 font-semibold">AI Expert Profile</span>
                  </div>
                  
                  <p className="mb-2">
                    Seasoned AI and Machine Learning Specialist with extensive expertise in developing cutting-edge solutions for complex business challenges across diverse industries.
                  </p>
                  
                  <p>
                    Specializing in neural networks, computer vision, predictive analytics, and natural language processing with a proven track record of delivering high-impact AI systems.
                  </p>
                </div>
              </motion.div>
              
              {/* Enhanced buttons with advanced AI-themed animations */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative"
                >
                  {/* Button glow effect */}
                  <motion.div 
                    className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-500/40 to-purple-700/40 blur-md opacity-70"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <Button className="bg-gradient-to-r from-red-600 to-purple-700 hover:from-red-700 hover:to-purple-800 text-white transition-all duration-300 shadow-lg shadow-red-900/30 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm relative z-10">
                    <Linkedin className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Connect on LinkedIn
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative"
                >
                  <Button variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm shadow-lg px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm relative z-10">
                    <Mail className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Contact
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative"
                >
                  <Button variant="ghost" className="hover:bg-white/5 backdrop-blur-sm shadow-lg px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm relative z-10 group">
                    <FileText className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                    Download CV
                    
                    {/* Download animation */}
                    <motion.div 
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: "mirror" 
                      }}
                    >
                      <svg className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Detailed Information Section with enhanced AI styling */}
        <section className="py-8 sm:py-12 md:py-16 relative">
          {/* AI-themed background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute top-10 right-5 w-48 sm:w-72 text-red-500/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M39.5,-65.3C48.3,-55.1,50.4,-39.7,55.9,-26.3C61.5,-12.9,70.5,-1.5,73.1,11.9C75.7,25.4,71.9,40.9,63.2,53.3C54.4,65.7,40.5,74.9,25.9,77.4C11.2,79.9,-4.1,75.7,-19.9,71.7C-35.7,67.7,-51.9,64,-62.2,54C-72.5,44,-76.8,27.6,-77.9,11.4C-79,-4.8,-76.9,-21,-70.3,-35.6C-63.7,-50.3,-52.6,-63.3,-39.2,-71.4C-25.9,-79.6,-9.9,-82.9,3.3,-88C16.6,-93.1,30.7,-75.5,39.5,-65.3Z" transform="translate(100 100)" />
            </svg>
            <svg className="absolute bottom-10 left-5 w-40 sm:w-64 text-purple-500/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M47.7,-73.6C62.1,-67.5,74.7,-55.1,79.1,-40.5C83.6,-25.9,79.9,-9.1,76.3,6.5C72.8,22.2,69.4,36.7,60.9,47.9C52.5,59.1,38.9,67,24.8,70.8C10.8,74.6,-3.7,74.3,-17,70.1C-30.2,65.9,-42.1,57.8,-49.7,47C-57.2,36.2,-60.4,22.7,-64.2,8.2C-68,-6.3,-72.5,-21.8,-69.3,-35.9C-66.1,-50,-55.2,-62.7,-41.8,-69C-28.4,-75.3,-12.5,-75.2,2.4,-79C17.4,-82.8,33.3,-79.7,47.7,-73.6Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <Tabs defaultValue={activeTab} className="w-full relative z-10" onValueChange={handleTabChange}>
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <TabsList className="grid grid-flow-col auto-cols-auto min-w-max md:grid-cols-6 mb-6 sm:mb-8 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 p-1 rounded-lg backdrop-blur-sm shadow-lg">
                <TabsTrigger value="experience" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-white group">
                  <Briefcase className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-data-[state=active]:text-red-400 transition-colors" />
                  <span className="text-xs sm:text-sm">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-white group">
                  <GraduationCap className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-data-[state=active]:text-red-400 transition-colors" />
                  <span className="text-xs sm:text-sm">Education</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-white group">
                  <Code className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-data-[state=active]:text-red-400 transition-colors" />
                  <span className="text-xs sm:text-sm">Skills</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-white group">
                  <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-data-[state=active]:text-red-400 transition-colors" />
                  <span className="text-xs sm:text-sm">Projects</span>
                </TabsTrigger>
                <TabsTrigger value="ai-projects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-white group relative">
                  <BrainCircuit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-data-[state=active]:text-red-400 transition-colors" />
                  <span className="text-xs sm:text-sm">AI Projects</span>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-white group">
                  <Award className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-data-[state=active]:text-red-400 transition-colors" />
                  <span className="text-xs sm:text-sm">Achievements</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Experience Tab - Keep existing content but add some AI themes */}
            <TabsContent value="experience" className="mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-red-400" />
                  Professional Experience
                  <div className="ml-auto flex items-center text-sm text-white/60">
                    <Cpu className="h-4 w-4 mr-1 text-red-400" />
                    <span>AI-Focused Roles</span>
                  </div>
                </h3>
                
                <div className="space-y-8 overflow-y-auto scrollbar-hide">
                  {EXPERIENCE.map((job, index) => (
                  <motion.div 
                    key={index}
                      className="bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-red-500/20 transition-colors duration-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.1)] relative overflow-hidden group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(220,38,38,0.15)" }}
                    >
                      {/* AI-themed background pattern */}
                      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-repeat opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                      
                      {/* Animated highlight corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-500/20 to-transparent transform origin-top-right -rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                      </div>
                      
                      {/* Content with AI theme */}
                      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4 relative z-10">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500/30 to-purple-600/30 rounded-full flex items-center justify-center">
                          {job.role.includes("AI") || job.role.includes("Data") ? (
                            <BrainCircuit className="h-5 w-5 text-white" />
                          ) : (
                            <Briefcase className="h-5 w-5 text-white" />
                          )}
                    </div>
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{job.role}</h4>
                            <span className="text-sm text-red-400 font-medium bg-red-500/10 px-3 py-1 rounded-full">{job.period}</span>
                          </div>
                          <div className="text-white/70 font-medium mb-3">{job.company}</div>
                          <ul className="space-y-2 mt-4">
                            {job.responsibilities.map((item, itemIndex) => (
                              <motion.li 
                                key={itemIndex} 
                                className="flex items-start gap-2 group/item"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: itemIndex * 0.05 + index * 0.2 }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform"></span>
                                <span className="text-white/70">{item}</span>
                              </motion.li>
                      ))}
                    </ul>
                        </div>
                      </div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
            </TabsContent>
            
            {/* AI Projects Tab - Enhanced Structure */}
            <TabsContent value="ai-projects" className="mt-0 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <BrainCircuit className="mr-2 h-5 w-5 text-red-400" />
                    Advanced AI & ML Portfolio
                  </h3>
                  
                  {/* Category filter */}
                  <div className="flex items-center space-x-2 bg-black/30 p-1 rounded-lg border border-white/10">
                    {["All", "Computer Vision", "NLP", "Predictive", "MLOps"].map((category) => (
                      <button 
                        key={category} 
                        className={`px-3 py-1 text-sm rounded-md ${category === 'All' ? 'bg-red-500/20 text-white' : 'text-white/60 hover:text-white/90'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Featured project */}
                <motion.div
                  className="mb-8 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl overflow-hidden relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(220,38,38,0.15)" }}
                >
                  <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-repeat opacity-5"></div>
                  
                  <div className="flex flex-col md:flex-row">
                    {/* Project visualization */}
                    <div className="md:w-2/5 h-64 md:h-auto relative bg-gradient-to-br from-black/80 to-black/60 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        {/* Neural network visualization */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          <svg viewBox="0 0 200 200" className="w-full max-w-xs">
                            {/* Input layer */}
                            {Array.from({ length: 4 }).map((_, i) => (
                              <g key={`input-${i}`}>
                                <motion.circle 
                                  cx={40} 
                                  cy={50 + i * 35} 
                                  r={4} 
                                  fill="#ef4444" 
                                  animate={{ 
                                    r: [4, 6, 4],
                                    opacity: [0.7, 1, 0.7]
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    delay: i * 0.3,
                                    repeat: Infinity
                                  }}
                                />
                                
                                {/* Connections to hidden layer */}
                                {Array.from({ length: 5 }).map((_, j) => (
                                  <motion.path 
                                    key={`in-hidden-${i}-${j}`}
                                    d={`M ${40} ${50 + i * 35} L ${100} ${40 + j * 30}`}
                                    stroke="#ef4444"
                                    strokeWidth="0.5"
                                    strokeOpacity="0.3"
                                    animate={{
                                      strokeOpacity: [0.1, 0.4, 0.1]
                                    }}
                                    transition={{ 
                                      duration: 1.5,
                                      delay: (i + j) * 0.2,
                                      repeat: Infinity
                                    }}
                                  />
                                ))}
                              </g>
                            ))}
                            
                            {/* Hidden layer */}
                            {Array.from({ length: 5 }).map((_, i) => (
                              <g key={`hidden-${i}`}>
                                <motion.circle 
                                  cx={100} 
                                  cy={40 + i * 30} 
                                  r={4} 
                                  fill="#a855f7" 
                                  animate={{ 
                                    r: [4, 6, 4],
                                    opacity: [0.7, 1, 0.7]
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    delay: i * 0.2 + 0.5,
                                    repeat: Infinity
                                  }}
                                />
                                
                                {/* Connections to output layer */}
                                {Array.from({ length: 3 }).map((_, j) => (
                                  <motion.path 
                                    key={`hidden-out-${i}-${j}`}
                                    d={`M ${100} ${40 + i * 30} L ${160} ${60 + j * 40}`}
                                    stroke="#a855f7"
                                    strokeWidth="0.5"
                                    strokeOpacity="0.3"
                                    animate={{
                                      strokeOpacity: [0.1, 0.4, 0.1]
                                    }}
                                    transition={{ 
                                      duration: 1.5,
                                      delay: (i + j) * 0.15 + 0.7,
                                      repeat: Infinity
                                    }}
                                  />
                                ))}
                              </g>
                            ))}
                            
                            {/* Output layer */}
                            {Array.from({ length: 3 }).map((_, i) => (
                              <motion.circle 
                                key={`output-${i}`}
                                cx={160} 
                                cy={60 + i * 40} 
                                r={4} 
                                fill="#3b82f6" 
                                animate={{ 
                                  r: [4, 6, 4],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ 
                                  duration: 2,
                                  delay: i * 0.3 + 1,
                                  repeat: Infinity
                                }}
                              />
                            ))}
                          </svg>
                        </div>
                      </div>
                      
                      {/* Label overlay */}
                      <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white/70 backdrop-blur-sm">
                        Computer Vision Model
                      </div>
                    </div>
                    
                    {/* Project details */}
                    <div className="p-6 md:p-8 md:w-3/5">
                      <div className="flex items-center mb-2">
                        <Badge className="bg-gradient-to-r from-red-500/20 to-purple-500/20 text-white mr-2">FEATURED</Badge>
                        <Badge className="bg-blue-500/20 text-blue-400">Computer Vision</Badge>
                      </div>
                      
                      <h4 className="text-2xl font-bold mb-3">Advanced Facial Recognition System</h4>
                      <p className="text-white/70 mb-4">
                        Developed a state-of-the-art facial recognition system with 99.7% accuracy using deep convolutional neural networks. Implemented advanced features including age/gender detection, emotion analysis, and spoof detection to prevent fraud.
                      </p>
                      
                      {/* Key achievements */}
                      <div className="mb-4">
                        <h5 className="text-sm uppercase tracking-wider text-white/50 mb-2">Key Achievements</h5>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "99.7% recognition accuracy",
                            "10ms processing time per frame",
                            "Deployed to 50+ enterprise clients",
                            "Anti-spoofing protection"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                              <span className="text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                      </div>
                      
                      {/* Tech stack */}
                      <div>
                        <h5 className="text-sm uppercase tracking-wider text-white/50 mb-2">Technologies</h5>
                        <div className="flex flex-wrap gap-2">
                          {["PyTorch", "OpenCV", "TensorRT", "CUDA", "Docker", "REST API"].map((tech, i) => (
                            <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                
                {/* Project Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Custom Product Recommendation Engine",
                      description: "Built an AI-powered recommendation system using collaborative filtering and deep learning to increase e-commerce conversion rates by 32%.",
                      category: "Predictive",
                      tags: ["Recommendation", "PyTorch", "FastAPI"],
                      image: "/ai-project1.jpg",
                      metrics: { accuracy: 94.2, performance: "+32% conversions" }
                    },
                    {
                      title: "Multilingual Sentiment Analysis API",
                      description: "Developed a sentiment analysis API that processes customer feedback in 12 languages with 92% accuracy using transformer models.",
                      category: "NLP",
                      tags: ["BERT", "Transformers", "API"],
                      image: "/ai-project2.jpg", 
                      metrics: { accuracy: 92.0, languages: 12 }
                    },
                    {
                      title: "Automated Document Processing System",
                      description: "Created an intelligent document processing system that automatically extracts, classifies, and processes information from invoices and contracts.",
                      category: "Computer Vision",
                      tags: ["OCR", "NLP", "Python"],
                      image: "/ai-project3.jpg",
                      metrics: { accuracy: 95.8, timeReduction: "85%" }
                    },
                    {
                      title: "Financial Forecasting Model",
                      description: "Engineered a time-series forecasting system for financial markets that outperforms traditional models by 27% in prediction accuracy.",
                      category: "Predictive",
                      tags: ["Time Series", "LSTM", "Prophet"],
                      image: "/ai-project4.jpg",
                      metrics: { accuracy: 88.5, improvement: "27%" }
                    },
                    {
                      title: "Real-time Object Detection System",
                      description: "Implemented a real-time object detection system for retail inventory management using YOLO architecture with 97.3% accuracy.",
                      category: "Computer Vision",
                      tags: ["YOLO", "TensorFlow", "Edge AI"],
                      image: "/ai-project5.jpg",
                      metrics: { accuracy: 97.3, fps: 30 }
                    },
                    {
                      title: "MLOps Pipeline for Model Deployment",
                      description: "Designed and implemented an end-to-end MLOps pipeline for continuous training, testing, and deployment of ML models at enterprise scale.",
                      category: "MLOps",
                      tags: ["Kubernetes", "CI/CD", "Monitoring"],
                      image: "/ai-project6.jpg",
                      metrics: { deploymentTime: "90% reduction", reliability: "99.9%" }
                    },
                    {
                      title: "Healthcare Diagnostic Assistant",
                      description: "Developed an AI-powered diagnostic assistant that helps identify potential conditions from symptoms with 91% alignment with physician diagnoses.",
                      category: "NLP",
                      tags: ["Medical NLP", "Random Forest", "API"],
                      image: "/ai-project7.jpg",
                      metrics: { accuracy: 91.0, conditions: "500+" }
                    },
                    {
                      title: "Customer Churn Prediction Model",
                      description: "Created a machine learning model to predict customer churn with 94% accuracy, enabling proactive retention strategies.",
                      category: "Predictive",
                      tags: ["XGBoost", "Feature Engineering", "SQL"],
                      image: "/ai-project8.jpg",
                      metrics: { accuracy: 94.0, savings: "$2.1M" }
                    },
                    {
                      title: "Automated Video Content Moderation",
                      description: "Built an automated content moderation system for video platforms that detects inappropriate content in real-time with 96.5% accuracy.",
                      category: "Computer Vision",
                      tags: ["CNN", "Video Analysis", "AWS"],
                      image: "/ai-project9.jpg",
                      metrics: { accuracy: 96.5, processing: "Real-time" }
                    }
                  ].map((project, index) => (
                    <motion.div
                      key={index}
                      className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-br from-black/70 to-black/50 flex flex-col h-full group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 15px 30px rgba(220,38,38,0.15)",
                        borderColor: "rgba(239, 68, 68, 0.3)"
                      }}
                    >
                      {/* Project header with AI theme */}
                      <div className="px-5 py-3 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-red-500/20 to-purple-600/20">
                        <h4 className="font-bold flex items-center text-sm md:text-base">
                          {project.category === "Computer Vision" ? (
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 mr-2 text-red-400" stroke="currentColor">
                              <path d="M2 12.5C2 12.5 5.5 7 12 7C18.5 7 22 12.5 22 12.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M22 12.5C22 12.5 18.5 18 12 18C5.5 18 2 12.5 2 12.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12.5" r="3.5" strokeWidth="1.5"/>
                            </svg>
                          ) : project.category === "NLP" ? (
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 mr-2 text-purple-400" stroke="currentColor">
                              <path d="M8 9H16M8 12H13M8 15H11M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : project.category === "MLOps" ? (
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 mr-2 text-blue-400" stroke="currentColor">
                              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" strokeWidth="1.5" strokeLinecap="round"/>
                              <path d="M12 12L16 10M12 12L14 16M12 12L10 8M12 12L8 14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M19 6L16 9M19 6L16 3M19 6L22 9M19 6L22 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 mr-2 text-green-400" stroke="currentColor">
                              <path d="M20 8V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V8M20 8H4M20 8V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V8" strokeWidth="1.5" strokeLinecap="round"/>
                              <path d="M9 13L11 15L15 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          <span className="truncate">{project.title}</span>
                        </h4>
                        
                        {/* Category indicator */}
                        <Badge 
                          className={`text-xs ${
                            project.category === "Computer Vision" ? "bg-red-500/20 text-red-400" :
                            project.category === "NLP" ? "bg-purple-500/20 text-purple-400" :
                            project.category === "MLOps" ? "bg-blue-500/20 text-blue-400" :
                            "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {project.category}
                        </Badge>
                      </div>
                      
                      {/* Project content */}
                      <div className="p-5 flex-grow flex flex-col">
                        <p className="text-white/70 mb-4 text-sm line-clamp-3">{project.description}</p>
                        
                        {/* AI Metrics */}
                        <div className="mt-auto">
                          <div className="bg-black/30 rounded-lg p-3 mb-4 border border-white/5">
                            <div className="grid grid-cols-2 gap-2 text-center">
                              {Object.entries(project.metrics).map(([key, value], i) => (
                                <div key={i}>
                                  <div className="text-xs text-white/50 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                  <div className="text-sm font-bold text-red-400">{value}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex} 
                                className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* View project link */}
                      <div className="bg-gradient-to-r from-black/80 to-black/80 p-3 border-t border-white/5 relative z-10">
                        <motion.button 
                          className="text-sm text-red-400 hover:text-red-300 flex items-center w-full justify-center font-medium"
                          whileHover={{ x: 5 }}
                        >
                          View project details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Load more button */}
                <div className="mt-8 text-center">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-lg border border-white/10 text-white hover:from-red-500/30 hover:to-purple-500/30 transition-colors flex items-center gap-2 mx-auto"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                  >
                    <span>View more projects</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M19 9L12 16L5 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Keep existing tabs content for other tabs */}
            <TabsContent value="education" className="mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-red-400" />
                  Educational Background
                </h3>
                <div className="space-y-8">
                {EDUCATION.map((edu, index) => (
                  <motion.div 
                    key={index}
                      className="bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden hover:border-red-500/20 transition-colors duration-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.1)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(220,38,38,0.15)" }}
                    >
                      {/* Decorative elements */}
                      <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-red-500/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                      
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500/30 to-purple-600/30 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                        <div className="flex-grow">
                          <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                          <div className="text-red-400 font-medium mb-2">{edu.institution}</div>
                          <div className="text-sm text-white/70 mb-4 bg-white/5 inline-block px-3 py-1 rounded-full">{edu.period}</div>
                          
                          <div className="mt-4 bg-black/20 p-4 rounded-lg border-l-2 border-red-500/50">
                            <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-red-400" />
                              Course Highlights
                            </h5>
                            <p className="text-white/70">{edu.details}</p>
                    </div>
                          
                          <div className="mt-4 bg-black/20 p-4 rounded-lg border-l-2 border-purple-500/50">
                            <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                              <FileText className="h-4 w-4 text-purple-400" />
                              Key Project
                            </h5>
                            <p className="text-white/70">{edu.project}</p>
                      </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Skills Tab */}
            <TabsContent value="skills" className="mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Code className="mr-2 h-5 w-5 text-red-400" />
                  Skills & Expertise
                </h3>
                
                {/* Skill Summary Section */}
                <motion.div 
                  className="bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-purple-500/5 rounded-full -mr-20 -mb-20 blur-3xl"></div>
                  
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="relative z-10">
                      <h4 className="text-lg font-bold mb-3">Professional Overview</h4>
                      <p className="text-white/70 mb-4">
                        With 7+ years of expertise in AI, Big Data, and Machine Learning technologies, I specialize in developing scalable data solutions and intelligent systems that drive business value.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-black/30 p-4 rounded-lg border border-white/5 text-center">
                          <h5 className="text-red-400 text-xl font-bold mb-1">7+</h5>
                          <p className="text-xs text-white/60">Years Experience</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-white/5 text-center">
                          <h5 className="text-purple-400 text-xl font-bold mb-1">25+</h5>
                          <p className="text-xs text-white/60">Projects Completed</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-white/5 text-center">
                          <h5 className="text-blue-400 text-xl font-bold mb-1">10+</h5>
                          <p className="text-xs text-white/60">Certifications</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-white/5 text-center">
                          <h5 className="text-green-400 text-xl font-bold mb-1">40+</h5>
                          <p className="text-xs text-white/60">ML Models Built</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Skill radar chart */}
                    <div className="relative h-64 flex items-center justify-center">
                      {/* Radar background */}
                      <div className="w-48 h-48 rounded-full border border-white/10 absolute"></div>
                      <div className="w-36 h-36 rounded-full border border-white/10 absolute"></div>
                      <div className="w-24 h-24 rounded-full border border-white/10 absolute"></div>
                      <div className="w-12 h-12 rounded-full border border-white/10 absolute"></div>
                      
                      {/* Radar axes */}
                      <div className="w-48 h-1 bg-white/5 absolute transform rotate-0"></div>
                      <div className="w-48 h-1 bg-white/5 absolute transform rotate-45"></div>
                      <div className="w-48 h-1 bg-white/5 absolute transform rotate-90"></div>
                      <div className="w-48 h-1 bg-white/5 absolute transform rotate-135"></div>
                      
                      {/* Radar area */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <polygon 
                            points="50,10 90,40 80,85 20,85 10,40" 
                            fill="url(#skillGradient)" 
                            stroke="rgba(239, 68, 68, 0.6)" 
                            strokeWidth="1"
                            className="opacity-60"
                          />
                          <defs>
                            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(239, 68, 68, 0.2)" />
                              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </motion.div>
                      
                      {/* Skill points */}
                      <motion.div 
                        className="absolute top-10 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-red-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs text-white/80">AI</span>
                      </motion.div>
                      <motion.div 
                        className="absolute top-1/3 left-[85%] transform -translate-y-1/2 w-3 h-3 rounded-full bg-red-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <span className="absolute top-0 left-0 transform translate-x-2 text-xs text-white/80">Data Science</span>
                      </motion.div>
                      <motion.div 
                        className="absolute top-3/4 left-[80%] transform -translate-y-1/2 w-3 h-3 rounded-full bg-red-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <span className="absolute top-0 left-0 transform translate-x-2 text-xs text-white/80">Backend</span>
                      </motion.div>
                      <motion.div 
                        className="absolute top-3/4 left-[20%] transform -translate-y-1/2 w-3 h-3 rounded-full bg-red-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <span className="absolute top-0 right-0 transform -translate-x-2 text-xs text-white/80">Frontend</span>
                      </motion.div>
                      <motion.div 
                        className="absolute top-1/3 left-[15%] transform -translate-y-1/2 w-3 h-3 rounded-full bg-red-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        <span className="absolute top-0 right-0 transform -translate-x-2 text-xs text-white/80">Cloud</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Technical Skills */}
                  <motion.div 
                    className="bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(220,38,38,0.15)" }}
                  >
                    <div className="absolute right-0 bottom-0 w-40 h-40 bg-gradient-to-br from-red-500/10 to-purple-500/5 rounded-full -mr-10 -mb-10 blur-3xl"></div>
                    
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Code className="h-4 w-4 text-red-400" />
                      </div>
                      Technical Expertise
                    </h4>
                    
                    {/* Skill bars with animations */}
                    <div className="space-y-5 relative z-10">
                      {[
                        { skill: "Python", level: 95, color: "from-red-500 to-red-600" },
                        { skill: "Machine Learning", level: 90, color: "from-purple-500 to-purple-600" },
                        { skill: "Deep Learning", level: 88, color: "from-blue-500 to-blue-600" },
                        { skill: "Big Data", level: 92, color: "from-green-500 to-green-600" },
                        { skill: "SQL", level: 85, color: "from-yellow-500 to-yellow-600" }
                      ].map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">{item.skill}</span>
                            <span className="text-red-400">{item.level}%</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                              initial={{ width: '0%' }}
                              animate={{ width: `${item.level}%` }}
                              transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                      {SKILLS.technicalSkills.slice(0, 12).map((skill, index) => (
                        <motion.span 
                          key={index}
                          className="bg-gradient-to-r from-red-500/20 to-red-600/10 px-3 py-1.5 rounded-full text-sm font-medium text-white/90 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.3 }}
                          whileHover={{ y: -3, boxShadow: "0 10px 20px rgba(220,38,38,0.1)" }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                      <motion.span 
                        className="bg-gradient-to-r from-purple-500/20 to-purple-600/10 px-3 py-1.5 rounded-full text-sm font-medium text-white/90 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ y: -3 }}
                      >
                        +{SKILLS.technicalSkills.length - 12} more
                      </motion.span>
                    </div>
                  </motion.div>
                  
                  {/* Professional Skills */}
                  <motion.div 
                    className="bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(220,38,38,0.15)" }}
                  >
                    <div className="absolute left-0 bottom-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-red-500/5 rounded-full -ml-10 -mb-10 blur-3xl"></div>
                    
                    <h4 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-purple-400" />
                      </div>
                      Professional Skills
                    </h4>
                    
                    {/* Circular progress bars */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 relative z-10">
                      {[
                        { skill: "Problem Solving", level: 95, color: "text-red-400" },
                        { skill: "Communication", level: 85, color: "text-purple-400" },
                        { skill: "Leadership", level: 80, color: "text-blue-400" },
                        { skill: "Time Management", level: 90, color: "text-green-400" },
                        { skill: "Adaptability", level: 92, color: "text-yellow-400" },
                        { skill: "Creativity", level: 88, color: "text-pink-400" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.6 }}
                        >
                          <div className="relative mx-auto w-16 h-16 mb-2">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"></circle>
                              <motion.circle 
                                cx="18" 
                                cy="18" 
                                r="16" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2"
                                className={item.color}
                                strokeDasharray="100"
                                strokeDashoffset="100"
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ 
                                  strokeDashoffset: 100 - item.level 
                                }}
                                transition={{ duration: 1.5, delay: index * 0.1 + 0.6 }}
                                strokeLinecap="round"
                                transform="rotate(-90 18 18)"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">{item.level}%</div>
                          </div>
                          <p className="text-xs text-white/80">{item.skill}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                      <h5 className="text-sm uppercase tracking-wider text-white/50 mb-2">General Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS.generalSkills.map((skill, index) => (
                          <motion.span 
                            key={index}
                            className="bg-gradient-to-r from-purple-500/20 to-purple-600/10 px-3 py-1.5 rounded-full text-sm font-medium text-white/90 backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 + 0.5 }}
                            whileHover={{ y: -3, boxShadow: "0 10px 20px rgba(124,58,237,0.1)" }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Tools & Technologies Section */}
                <motion.div 
                  className="mt-8 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-blue-400" />
                    Tools & Technologies
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "TensorFlow", icon: "🧠", category: "ML Framework" },
                      { name: "PyTorch", icon: "🔥", category: "ML Framework" },
                      { name: "Keras", icon: "⚙️", category: "ML API" },
                      { name: "Scikit-learn", icon: "🔬", category: "ML Library" },
                      { name: "Hadoop", icon: "🐘", category: "Big Data" },
                      { name: "Spark", icon: "⚡", category: "Big Data" },
                      { name: "Docker", icon: "🐳", category: "DevOps" },
                      { name: "Kubernetes", icon: "☸️", category: "DevOps" },
                      { name: "Tableau", icon: "📊", category: "Visualization" },
                      { name: "Power BI", icon: "📈", category: "Visualization" },
                      { name: "AWS", icon: "☁️", category: "Cloud" },
                      { name: "Azure", icon: "☁️", category: "Cloud" }
                    ].map((tool, index) => (
                      <motion.div 
                        key={index}
                        className="bg-black/30 p-4 rounded-lg border border-white/10 hover:border-blue-500/30 transition-colors duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.6 }}
                        whileHover={{ y: -3, boxShadow: "0 10px 20px rgba(59,130,246,0.1)" }}
                      >
                        <div className="text-xl mb-1">{tool.icon}</div>
                        <h5 className="font-medium text-white">{tool.name}</h5>
                        <p className="text-xs text-white/50">{tool.category}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            {/* Projects Tab */}
            <TabsContent value="projects" className="mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-red-400" />
                    Portfolio Showcase
                  </h3>
                  
                  {/* Category filter buttons */}
                  <div className="flex items-center gap-2 bg-black/30 p-1 rounded-lg border border-white/10">
                    {["All", "Data & Analytics", "Machine Learning", "Web Development"].map((category) => (
                      <button 
                        key={category} 
                        className={`px-3 py-1 text-sm rounded-md ${category === 'All' ? 'bg-red-500/20 text-white' : 'text-white/60 hover:text-white/90'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured Project - Large Card */}
                <motion.div
                  className="mb-8 bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl overflow-hidden relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(220,38,38,0.15)" }}
                >
                  <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-repeat opacity-5"></div>
                  
                  <div className="flex flex-col md:flex-row">
                    {/* Project Showcase */}
                    <div className="md:w-3/5 h-72 md:h-auto relative bg-gradient-to-br from-black/80 to-black/60 overflow-hidden">
                      <div className="absolute inset-0 p-4">
                        {/* Interactive mockup display */}
                        <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-gray-900">
                          <Image
                            src="/mindscape-showcase.jpg"
                            alt="Mindscape Analytics"
                            fill
                            className="object-cover"
                            priority
                          />
                          
                          {/* Animated overlay elements */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                            <div className="absolute bottom-4 left-4 right-4">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "70%" }}
                                transition={{ delay: 1, duration: 2, ease: "easeOut" }}
                                className="h-1 bg-red-500/70 rounded-full mb-2"
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">www.mindscapeanalytics.com</span>
                                <span className="text-xs text-white/70">Launch Date: 2023</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project details */}
                    <div className="p-6 md:p-8 md:w-2/5">
                      <div className="flex items-center mb-2">
                        <Badge className="bg-gradient-to-r from-red-500/20 to-purple-500/20 text-white mr-2">FEATURED</Badge>
                        <Badge className="bg-blue-500/20 text-blue-400">Personal Project</Badge>
                      </div>
                      
                      <h4 className="text-2xl font-bold mb-3">Mindscape Analytics</h4>
                      <p className="text-white/70 mb-4">
                        Developed, designed and launched Mindscape Analytics from scratch in just 1 month of continuous development, creating a comprehensive analytics platform with advanced data visualization and reporting features.
                      </p>
                      
                      {/* Key achievements */}
                      <div className="mb-4">
                        <h5 className="text-sm uppercase tracking-wider text-white/50 mb-2">Key Achievements</h5>
                        <ul className="grid grid-cols-1 gap-2">
                          {[
                            "Solo-developed in 1 month timeframe",
                            "Full-stack implementation",
                            "Custom analytics dashboard",
                            "Responsive design across devices"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                              <span className="text-white/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Tech stack */}
                      <div>
                        <h5 className="text-sm uppercase tracking-wider text-white/50 mb-2">Technologies</h5>
                        <div className="flex flex-wrap gap-2">
                          {["React.js", "Next.js", "Node.js", "TypeScript", "TailwindCSS", "AWS"].map((tech, i) => (
                            <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <div className="mt-4">
                        <Link href="https://www.mindscapeanalytics.com" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-gradient-to-r from-red-600 to-purple-700 hover:from-red-700 hover:to-purple-800 text-white transition-all duration-300 shadow-lg shadow-red-900/30 px-6 py-2 w-full">
                            Visit Website
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Project Grid - Advanced Portfolio Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {PROJECTS.slice(1).map((project, index) => (
                    <motion.div 
                      key={index}
                      className="bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl overflow-hidden group relative h-full flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 15px 30px rgba(220,38,38,0.15)",
                        borderColor: "rgba(239, 68, 68, 0.3)"
                      }}
                    >
                      {/* Project thumbnail/preview */}
                      <div className="h-48 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-60">
                          <svg className="w-full h-full text-red-500/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M45.4,-51.3C58.3,-39.2,68,-24.1,70.9,-7.8C73.8,8.6,70,26.1,59.7,38.9C49.4,51.7,32.5,59.8,14.9,63.5C-2.8,67.1,-21.1,66.3,-36.9,58.9C-52.7,51.5,-66,37.5,-70.9,21.1C-75.8,4.7,-72.3,-14.2,-63.3,-29.4C-54.2,-44.7,-39.6,-56.5,-24.1,-67.4C-8.7,-78.2,7.6,-88.1,22,-83.8C36.3,-79.4,48.8,-60.8,50.8,-47.8"/>
                          </svg>
                        </div>
                        
                        {/* Project visual representation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {index === 0 ? (
                            <BrainCircuit className="w-20 h-20 text-red-400/50" />
                          ) : index === 1 ? (
                            <svg className="w-20 h-20 text-purple-400/50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M2 12.5C2 12.5 5.5 7 12 7C18.5 7 22 12.5 22 12.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M22 12.5C22 12.5 18.5 18 12 18C5.5 18 2 12.5 2 12.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12.5" r="3.5" strokeWidth="1.5"/>
                            </svg>
                          ) : (
                            <Network className="w-20 h-20 text-blue-400/50" />
                          )}
                        </div>
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <motion.button 
                            className="px-4 py-2 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Details
                          </motion.button>
                        </div>
                      </div>
                      
                      {/* Project content */}
                      <div className="p-6 flex-grow flex flex-col relative z-10">
                        {/* Top element */}
                        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-500/20 to-transparent transform origin-top-right -rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                        </div>
                        
                        <h4 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300 relative z-10">
                          {project.title}
                        </h4>
                        
                        <p className="text-white/70 mb-4 flex-grow relative z-10 line-clamp-3">
                          {project.description}
                        </p>
                        
                        {/* Skills used in project */}
                        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                          {["Machine Learning", "Python", "Data"].slice(0, index + 1).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="text-xs bg-white/10 px-2 py-1 rounded-md text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action footer */}
                      <div className="bg-gradient-to-r from-black/80 to-black/80 p-3 border-t border-white/5 relative z-10">
                        <motion.button 
                          className="text-sm text-red-400 hover:text-red-300 flex items-center w-full justify-center font-medium"
                          whileHover={{ x: 5 }}
                        >
                          View project details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* View All Projects Button */}
                <div className="mt-8 text-center">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-lg border border-white/10 text-white hover:from-red-500/30 hover:to-purple-500/30 transition-colors flex items-center gap-2 mx-auto"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                  >
                    <span>View Complete Portfolio</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements" className="mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                {/* Decorative background elements */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-red-500/5 to-purple-500/3 rounded-full -mr-10 -mt-10 blur-3xl"></div>
                <div className="absolute left-1/4 bottom-1/4 w-48 h-48 bg-gradient-to-tl from-purple-500/5 to-red-500/3 rounded-full blur-3xl"></div>
                
                <h3 className="text-xl font-bold mb-6 flex items-center relative z-10">
                  <Star className="mr-2 h-5 w-5 text-red-400" />
                  Key Achievements
                </h3>
                
                <div className="relative z-10 grid md:grid-cols-2 gap-6">
                  {ACHIEVEMENTS.map((achievement, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl p-5 backdrop-blur-sm flex items-start gap-4 group hover:border-red-500/20 transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(220,38,38,0.15)" }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                        >
                          <Star className="h-5 w-5 text-yellow-400" />
                        </motion.div>
                      </div>
                      <div>
                        <p className="text-white/80">{achievement}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Certifications Section */}
                <motion.div
                  className="mt-12 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Award className="mr-2 h-5 w-5 text-red-400" />
                    Certifications
                </h3>
                  
                  <div className="bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  {CERTIFICATIONS.map((cert, index) => (
                    <motion.div 
                      key={index} 
                          className="flex items-start gap-3 group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + 0.6 }}
                          whileHover={{ x: 5 }}
                    >
                      <Award className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                      <span className="text-white/80">{cert}</span>
                    </motion.div>
                  ))}
                    </div>
                </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="py-16 relative"
        >
          {/* Decorative elements */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-red-500/10 to-purple-500/5 rounded-full -ml-32 blur-3xl"></div>
          <div className="absolute right-0 top-1/3 w-80 h-80 bg-gradient-to-tl from-purple-500/10 to-red-500/5 rounded-full -mr-40 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 text-white px-4 py-1">TESTIMONIALS</Badge>
              <h2 className="text-3xl font-bold">What Partners & Clients Say</h2>
              <div className="mt-4 w-20 h-1 bg-gradient-to-r from-red-500 to-purple-500 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CTO, DataTech Solutions",
                  image: "/testimonial-1.jpg",
                  quote: "Zeeshan's expertise in AI and machine learning transformed our data analytics workflow. His solutions reduced processing time by 65% while improving accuracy.",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  role: "VP of Engineering, AI Innovations",
                  image: "/testimonial-2.jpg",
                  quote: "Working with Zeeshan on our predictive analytics platform was exceptional. His deep technical knowledge and problem-solving abilities are truly impressive.",
                  rating: 5
                },
                {
                  name: "Jessica Miller",
                  role: "Product Manager, CloudScale",
                  image: "/testimonial-3.jpg",
                  quote: "Zeeshan delivered our ML infrastructure project on time and exceeded our expectations. His ability to translate complex concepts into practical solutions is remarkable.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-r from-black/60 to-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(220,38,38,0.15)" }}
                >
                  {/* Decorative quote mark */}
                  <div className="absolute -top-2 -right-2 text-6xl text-red-500/10 font-serif">"</div>
                  
                  <div className="relative z-10">
                    {/* Quote */}
                    <p className="text-white/80 mb-6 relative z-10">"{testimonial.quote}"</p>
                    
                    {/* Rating */}
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                          fill={i < testimonial.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-red-500/30 overflow-hidden flex-shrink-0 bg-black/50">
                        <div className="flex items-center justify-center h-full text-xl">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-xs text-white/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Client logos */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-white/80">Trusted by Leading Organizations</h3>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <motion.div 
                    key={index}
                    className="w-24 h-12 bg-white/5 rounded-lg flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -3, opacity: 0.8 }}
                  >
                    <div className="text-white/40 text-sm font-medium">Client {index + 1}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="py-16 relative"
        >
          {/* Decorative elements */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-red-500/10 to-purple-500/5 rounded-full -ml-32 blur-3xl"></div>
          <div className="absolute right-0 top-1/3 w-80 h-80 bg-gradient-to-tl from-purple-500/10 to-red-500/5 rounded-full -mr-40 blur-3xl"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-black/80 to-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 overflow-hidden">
                {/* Animated grid background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 opacity-5"></div>
                
                {/* Floating particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={`floating-particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-red-500/30"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, Math.random() * 40 - 20],
                      x: [0, Math.random() * 40 - 20],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
              
              <div className="grid md:grid-cols-5 relative z-10">
                {/* Left animated visualization */}
                <div className="md:col-span-2 bg-gradient-to-br from-black/80 to-black/40 p-8 md:p-10 relative overflow-hidden hidden md:block">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <path fill="rgba(239, 68, 68, 0.2)" d="M39.5,-65.3C48.3,-55.1,50.4,-39.7,55.9,-26.3C61.5,-12.9,70.5,-1.5,73.1,11.9C75.7,25.4,71.9,40.9,63.2,53.3C54.4,65.7,40.5,74.9,25.9,77.4C11.2,79.9,-4.1,75.7,-19.9,71.7C-35.7,67.7,-51.9,64,-62.2,54C-72.5,44,-76.8,27.6,-77.9,11.4C-79,-4.8,-76.9,-21,-70.3,-35.6C-63.7,-50.3,-52.6,-63.3,-39.2,-71.4C-25.9,-79.6,-9.9,-82.9,3.3,-88C16.6,-93.1,30.7,-75.5,39.5,-65.3Z" transform="translate(100 100)" />
                </svg>
                  </div>
                  
                  {/* Neural network visualization */}
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-full max-w-[200px] h-[200px] relative">
                      {/* Nodes */}
                      {Array.from({ length: 12 }).map((_, i) => {
                        const row = Math.floor(i / 4);
                        const col = i % 4;
                        return (
                          <motion.div 
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-red-500"
                            style={{
                              left: `${col * 33.33}%`,
                              top: `${row * 50}%`,
                            }}
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [0.4, 0.7, 0.4]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1
                            }}
                          />
                        )
                      })}
                      
                      {/* Connecting lines */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        {Array.from({ length: 3 }).map((_, row) => (
                          <g key={`row-${row}`}>
                            {Array.from({ length: 4 }).map((_, col) => (
                              <g key={`row-${row}-col-${col}`}>
                                {Array.from({ length: 4 }).map((_, nextCol) => (
                                  <motion.path 
                                    key={`${row}-${col}-${nextCol}`}
                                    d={`M ${col * 33.33} ${row * 50} L ${nextCol * 33.33} ${(row+1) * 50}`}
                                    stroke="rgba(239, 68, 68, 0.3)"
                                    strokeWidth="0.5"
                                    strokeDasharray="1 2"
                                    animate={{ 
                                      opacity: [0.1, 0.3, 0.1],
                                      strokeDashoffset: [0, -10]
                                    }}
                                    transition={{ 
                                      duration: 3,
                                      repeat: Infinity,
                                      delay: (col + nextCol) * 0.1
                                    }}
                                  />
                                ))}
                              </g>
                            ))}
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>
                  
                  {/* Inspirational quote */}
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="text-sm italic text-white/60">
                      "The key to artificial intelligence has always been the representation."
                    </div>
                    <div className="text-xs text-white/40 mt-1">— Jeff Hawkins</div>
                  </div>
                </div>
                
                {/* Right content area */}
                <div className="md:col-span-3 p-8 md:p-10">
                  <Badge className="mb-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 text-white px-4 py-1">GET IN TOUCH</Badge>
                  <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Data Strategy?</h2>
                  <p className="text-white/70 mb-6">
                    Let's collaborate on your next data science or AI project. Whether you need expertise in machine learning, big data analytics, or custom AI solutions, I'm here to help turn your vision into reality.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <motion.a 
                      href="mailto:imzeeshan.ai@gmail.com"
                      className="flex items-center gap-3 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="group-hover:text-red-400 transition-colors">imzeeshan.ai@gmail.com</div>
                    </motion.a>
                    
                    <motion.a 
                      href="tel:+923077367967"
                      className="flex items-center gap-3 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="group-hover:text-red-400 transition-colors">+923077367967</div>
                    </motion.a>
                    
                    <motion.a 
                      href="https://linkedin.com/in/zeeshankeerio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 flex items-center justify-center">
                        <Linkedin className="h-5 w-5 text-red-400" />
              </div>
                      <div className="group-hover:text-red-400 transition-colors">linkedin.com/in/zeeshankeerio</div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event/Calendar availability */}
            <div className="mt-12 bg-gradient-to-r from-black/80 to-black/60 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 backdrop-blur-sm shadow-xl text-center md:text-left">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-purple-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold">Available for New Projects</h3>
                <p className="text-white/70 mb-0">Currently accepting new clients and projects starting from July 2023</p>
              </div>
              <motion.button
                className="flex-shrink-0 bg-white/10 hover:bg-white/15 text-white py-2 px-5 rounded-lg border border-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Calendar
              </motion.button>
            </div>
          </div>
        </motion.section>
        
        {/* Quote Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}  
          className="py-16 text-center max-w-3xl mx-auto"
        >
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-red-500/20">"</div>
            <blockquote className="text-xl md:text-2xl italic text-white/80 mb-6 relative z-10">
              The future belongs to those who believe in the beauty of their dreams and harness the power of data to make them a reality.
            </blockquote>
            <div className="flex justify-center items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                  <Image
                  src="/founder.jpg" 
                  alt="Zeeshan Keerio" 
                  width={50} 
                  height={50}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="text-left">
                <div className="font-semibold">Zeeshan Keerio</div>
                <div className="text-sm text-white/60">Founder & CEO, Mindscape Analytics</div>
            </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Add a style tag for global scrollbar hiding */}
      <style jsx global>{`
        /* Hide scrollbar for all scrollable elements */
        ::-webkit-scrollbar {
          display: none;
        }
        
        * {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Custom styling for the scrollable areas */
        .scrollable-content {
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollable-content::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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