"use client"

import { motion } from "framer-motion"

interface SectionDividerProps {
  variant?: "gradient" | "dots" | "wave" | "shadow"
  color?: "red" | "blue" | "purple" | "green"
  className?: string
}

export function SectionDivider({ variant = "gradient", color = "red", className = "" }: SectionDividerProps) {
  // Always default to red color scheme regardless of the passed color
  const currentColor = "red"
  
  const colorMap = {
    red: {
      from: "from-red-500",
      to: "to-red-500",
      fill: "fill-red-500",
      shadow: "shadow-red-500/20",
    },
    blue: {
      from: "from-red-500",
      to: "to-red-500",
      fill: "fill-red-500",
      shadow: "shadow-red-500/20",
    },
    purple: {
      from: "from-red-500",
      to: "to-red-500",
      fill: "fill-red-500",
      shadow: "shadow-red-500/20",
    },
    green: {
      from: "from-red-500",
      to: "to-red-500",
      fill: "fill-red-500",
      shadow: "shadow-red-500/20",
    },
  }

  if (variant === "gradient") {
    return (
      <div className={`relative h-32 w-full overflow-hidden ${className}`}>
        <div className={`absolute inset-0 w-full bg-gradient-to-b from-transparent ${colorMap[currentColor].to}/10`}></div>
        <div className={`absolute inset-0 w-full bg-gradient-to-b ${colorMap[currentColor].from}/5 to-transparent`}></div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={`py-12 w-full flex justify-center ${className}`}>
        <motion.div
          className="flex space-x-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`h-3 w-3 rounded-full ${colorMap[currentColor].fill}/70 ${colorMap[currentColor].shadow}`}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 2,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    )
  }

  if (variant === "wave") {
    return (
      <div className={`relative h-32 w-full overflow-hidden ${className}`}>
        <svg
          className="absolute w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
            className={`${colorMap[currentColor].fill} opacity-10`}
          />
          <path
            d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
            className={`${colorMap[currentColor].fill} opacity-5`}
          />
        </svg>
        <div className={`absolute inset-0 w-full bg-gradient-to-b from-transparent ${colorMap[currentColor].to}/5`}></div>
      </div>
    )
  }

  if (variant === "shadow") {
    return (
      <div className={`relative h-24 w-full overflow-hidden ${className}`}>
        <div className={`absolute inset-0 w-full bg-gradient-to-b from-transparent to-black/5 ${colorMap[currentColor].shadow}`}></div>
      </div>
    )
  }

  return null
}

