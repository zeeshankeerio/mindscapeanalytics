"use client"

import { motion } from "framer-motion"
import { BrainIcon } from "@/components/ui/brain-icon"

interface MindscapeAnimatedLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  showTagline?: boolean
  darkMode?: boolean
  className?: string
}

export default function MindscapeAnimatedLogo({
  size = "md",
  showText = true,
  showTagline = true,
  darkMode = true,
  className = "",
}: MindscapeAnimatedLogoProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: "scale-[0.6]",
      brain: "h-16 w-16",
      padding: "p-6",
      title: "text-3xl",
      subtitle: "text-xl",
      tagline: "text-base",
    },
    md: {
      container: "scale-[0.8]",
      brain: "h-20 w-20",
      padding: "p-8",
      title: "text-4xl",
      subtitle: "text-2xl",
      tagline: "text-lg",
    },
    lg: {
      container: "scale-[1.2]",
      brain: "h-24 w-24",
      padding: "p-10",
      title: "text-5xl",
      subtitle: "text-3xl",
      tagline: "text-xl",
    },
    xl: {
      container: "scale-[1.5]",
      brain: "h-28 w-28",
      padding: "p-12",
      title: "text-6xl",
      subtitle: "text-4xl",
      tagline: "text-2xl",
    },
  }

  const textColor = darkMode ? "white" : "black"
  const textColorRGB = darkMode ? "255, 255, 255" : "0, 0, 0"

  return (
    <div className={`relative flex flex-col items-center ${className} ${sizeConfig[size].container}`}>
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-black/20 blur-[180px] rounded-full transform scale-[2]" />
      
      {/* Logo and text container */}
      <div className="relative flex flex-col items-center">
        {/* Brain icon with glow */}
        <div className="relative scale-[1.4]">
          {/* Multiple layered glows */}
          <div className="absolute inset-0 bg-red-600/10 blur-[40px] rounded-[20px] animate-pulse-slow" />
          <div className="absolute inset-0 bg-red-500/20 blur-[30px] rounded-[20px] animate-pulse-medium" />
          <div className="absolute inset-0 bg-red-400/30 blur-[20px] rounded-[20px] animate-pulse-fast" />
          
          {/* Neural network lines */}
          <div className="absolute inset-0 opacity-50 scale-[1.2]">
            <div className="absolute h-[1px] w-8 bg-gradient-to-r from-transparent via-red-500 to-transparent top-1/4 -left-3 animate-neural-1" />
            <div className="absolute h-[1px] w-8 bg-gradient-to-r from-transparent via-red-500 to-transparent bottom-1/4 -right-3 animate-neural-2" />
            <div className="absolute w-[1px] h-8 bg-gradient-to-b from-transparent via-red-500 to-transparent -top-3 left-1/4 animate-neural-3" />
            <div className="absolute w-[1px] h-8 bg-gradient-to-b from-transparent via-red-500 to-transparent -bottom-3 right-1/4 animate-neural-4" />
          </div>

          {/* Enhanced Brain icon with RGB border */}
          <div className="relative z-10 group">
            {/* RGB Border Container */}
            <div className="absolute -inset-[2px] rounded-[20px]">
              {/* Moving RGB gradient border */}
              <div className="absolute inset-[-2px] rounded-[20px] animate-rgb-spin group-hover:animate-rgb-spin-fast">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#ff0000,#00ff00,#0000ff,#ff0000)] rounded-[20px] group-hover:bg-[conic-gradient(from_0deg,#ff0000,#00ffff,#ff00ff,#ff0000)]" />
              </div>
              
              {/* Moving highlight effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-[20px] animate-border-flow group-hover:animate-border-flow-fast" />
              
              {/* Inner border glow */}
              <div className="absolute inset-0 rounded-[20px] bg-black">
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#ff000030] via-[#00ff0030] to-[#0000ff30] animate-rgb-spin-reverse group-hover:animate-rgb-spin-reverse-fast group-hover:from-[#ff000050] group-hover:via-[#00ffff50] group-hover:to-[#ff00ff50]" />
              </div>
            </div>
            
            {/* Icon container */}
            <div className={`relative bg-black rounded-[20px] ${sizeConfig[size].padding} transition-transform duration-300 group-hover:scale-[0.98]`}>
              <BrainIcon 
                className={`${sizeConfig[size].brain} text-red-500 transform transition-all duration-300 group-hover:text-red-400`}
                style={{
                  filter: 'drop-shadow(0 0 12px rgb(239 68 68 / 0.4))'
                }}
              />
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-[20px] pointer-events-none scale-[1.3]">
            <div className="absolute w-1.5 h-1.5 bg-red-500 rounded-full animate-particle-1 top-[20%] left-[20%]" />
            <div className="absolute w-1.5 h-1.5 bg-red-400 rounded-full animate-particle-2 bottom-[20%] right-[20%]" />
            <div className="absolute w-1 h-1 bg-red-300 rounded-full animate-particle-3 top-[50%] right-[30%]" />
          </div>
        </div>

        {/* Logo text with enhanced styling */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10 space-y-6 text-center"
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <h1 className={`${sizeConfig[size].title} font-extrabold tracking-tight font-sans mt-6`}>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${textColor} via-${textColor} to-${textColor}/80 [text-shadow:_0_2px_20px_rgb(${textColorRGB}_/_20%)]`}>
                    Mindscape
                  </span>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-red-500/80 via-red-400 to-red-500/80 ml-2`}>
                    Analytics
                  </span>
                </h1>
                <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 blur-2xl -z-10" />
              </motion.div>
              
              {showTagline && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`${sizeConfig[size].tagline} text-${textColor}/80 font-light mt-2`}
                >
                  Where AI Meets Innovation
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

<style jsx global>{`
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }

  @keyframes pulse-medium {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }

  @keyframes pulse-fast {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.15); }
  }

  @keyframes neural-1 {
    0% { transform: translateX(-10px) scaleX(0.5); opacity: 0; }
    50% { transform: translateX(0) scaleX(1); opacity: 1; }
    100% { transform: translateX(10px) scaleX(0.5); opacity: 0; }
  }

  @keyframes neural-2 {
    0% { transform: translateX(10px) scaleX(0.5); opacity: 0; }
    50% { transform: translateX(0) scaleX(1); opacity: 1; }
    100% { transform: translateX(-10px) scaleX(0.5); opacity: 0; }
  }

  @keyframes neural-3 {
    0% { transform: translateY(-10px) scaleY(0.5); opacity: 0; }
    50% { transform: translateY(0) scaleY(1); opacity: 1; }
    100% { transform: translateY(10px) scaleY(0.5); opacity: 0; }
  }

  @keyframes neural-4 {
    0% { transform: translateY(10px) scaleY(0.5); opacity: 0; }
    50% { transform: translateY(0) scaleY(1); opacity: 1; }
    100% { transform: translateY(-10px) scaleY(0.5); opacity: 0; }
  }

  @keyframes particle-1 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(5px, -5px); }
    50% { transform: translate(10px, 0); }
    75% { transform: translate(5px, 5px); }
  }

  @keyframes particle-2 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-5px, 5px); }
    50% { transform: translate(-10px, 0); }
    75% { transform: translate(-5px, -5px); }
  }

  @keyframes particle-3 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-3px, -3px); }
    50% { transform: translate(0, -6px); }
    75% { transform: translate(3px, -3px); }
  }

  @keyframes rgb-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes rgb-spin-reverse {
    100% { transform: rotate(0deg); }
    0% { transform: rotate(360deg); }
  }

  @keyframes border-flow {
    0% {
      transform: translateX(-200%) rotate(45deg);
      opacity: 0;
    }
    30%, 70% {
      opacity: 1;
    }
    100% {
      transform: translateX(200%) rotate(45deg);
      opacity: 0;
    }
  }

  @keyframes rgb-spin-fast {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes rgb-spin-reverse-fast {
    100% { transform: rotate(0deg); }
    0% { transform: rotate(360deg); }
  }

  @keyframes border-flow-fast {
    0% {
      transform: translateX(-200%) rotate(45deg);
      opacity: 0;
    }
    30%, 70% {
      opacity: 1;
    }
    100% {
      transform: translateX(200%) rotate(45deg);
      opacity: 0;
    }
  }

  .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
  .animate-pulse-medium { animation: pulse-medium 2.5s ease-in-out infinite; }
  .animate-pulse-fast { animation: pulse-fast 2s ease-in-out infinite; }
  .animate-neural-1 { animation: neural-1 3s ease-in-out infinite; }
  .animate-neural-2 { animation: neural-2 3s ease-in-out infinite; animation-delay: 0.5s; }
  .animate-neural-3 { animation: neural-3 3s ease-in-out infinite; animation-delay: 1s; }
  .animate-neural-4 { animation: neural-4 3s ease-in-out infinite; animation-delay: 1.5s; }
  .animate-particle-1 { animation: particle-1 4s ease-in-out infinite; }
  .animate-particle-2 { animation: particle-2 4s ease-in-out infinite; animation-delay: 1s; }
  .animate-particle-3 { animation: particle-3 4s ease-in-out infinite; animation-delay: 2s; }
  .animate-rgb-spin { animation: rgb-spin 4s linear infinite; }
  .animate-rgb-spin-reverse { animation: rgb-spin-reverse 4s linear infinite; }
  .animate-border-flow { animation: border-flow 2s linear infinite; }
  .animate-rgb-spin-fast { animation: rgb-spin-fast 2s linear infinite; }
  .animate-rgb-spin-reverse-fast { animation: rgb-spin-reverse-fast 2s linear infinite; }
  .animate-border-flow-fast { animation: border-flow-fast 1s linear infinite; }
`}</style> 