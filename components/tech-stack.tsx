"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const technologies = [
  {
    name: "Python",
    description: "Our primary language for data science and machine learning",
    icon: "🐍",
  },
  {
    name: "TensorFlow",
    description: "Deep learning framework for neural networks",
    icon: "🧠",
  },
  {
    name: "PyTorch",
    description: "Advanced machine learning library",
    icon: "🔥",
  },
  {
    name: "React",
    description: "Frontend library for interactive UIs",
    icon: "⚛️",
  },
  {
    name: "Node.js",
    description: "Backend JavaScript runtime environment",
    icon: "🟢",
  },
  {
    name: "AWS",
    description: "Cloud computing services for scalable infrastructure",
    icon: "☁️",
  },
  {
    name: "Docker",
    description: "Containerization platform for consistent deployments",
    icon: "🐳",
  },
  {
    name: "Kubernetes",
    description: "Container orchestration for automated deployment",
    icon: "🚢",
  },
]

export default function TechStack() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">Our Technology Stack</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-[800px] mx-auto">
            We leverage cutting-edge technologies to deliver powerful, scalable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{tech.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{tech.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        /* Extra small screens */
        @media (min-width: 480px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  )
}

