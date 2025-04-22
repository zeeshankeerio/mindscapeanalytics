"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Brain,
  Code,
  Link,
  Palette,
  Sparkles,
  Database,
  LineChart,
  Smartphone,
  Globe,
  Shield,
  Cpu,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  features?: string[]
}

export default function ServiceCard({ title, description, icon, features = [] }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    switch (icon) {
      case "BarChart":
        return <BarChart className="h-10 w-10 text-primary" />
      case "Brain":
        return <Brain className="h-10 w-10 text-primary" />
      case "Code":
        return <Code className="h-10 w-10 text-primary" />
      case "Link":
        return <Link className="h-10 w-10 text-primary" />
      case "Palette":
        return <Palette className="h-10 w-10 text-primary" />
      case "Sparkles":
        return <Sparkles className="h-10 w-10 text-primary" />
      case "Database":
        return <Database className="h-10 w-10 text-primary" />
      case "LineChart":
        return <LineChart className="h-10 w-10 text-primary" />
      case "Smartphone":
        return <Smartphone className="h-10 w-10 text-primary" />
      case "Globe":
        return <Globe className="h-10 w-10 text-primary" />
      case "Shield":
        return <Shield className="h-10 w-10 text-primary" />
      case "Cpu":
        return <Cpu className="h-10 w-10 text-primary" />
      default:
        return <BarChart className="h-10 w-10 text-primary" />
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
      <Card className="h-full overflow-hidden group glass-card border-white/10 transition-all duration-300 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <CardHeader className="pb-2 relative z-10">
          <motion.div
            className="mb-2 relative"
            animate={isHovered ? { rotate: [0, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {getIcon()}
            <div className="absolute -inset-4 rounded-full bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </motion.div>
          <CardTitle className="text-xl text-gradient">{title}</CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <p className="text-muted-foreground mb-4">{description}</p>

          {features.length > 0 && (
            <ul className="space-y-2 mb-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isHovered ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span className="text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
          >
            <Button variant="ghost" size="sm" className="text-primary p-0 h-auto group">
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

