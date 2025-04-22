"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Database, LineChart, Lock, Zap } from "lucide-react"

const features = [
  {
    id: "ai",
    icon: <Brain className="h-6 w-6" />,
    title: "Advanced AI Models",
    description: "Our proprietary AI models are trained on vast datasets to deliver accurate predictions and insights.",
    image: "https://images.unsplash.com/photo-1677442135136-760c813220e2?q=80&w=2070&auto=format&fit=crop",
    color: "from-primary to-purple-600",
  },
  {
    id: "data",
    icon: <Database className="h-6 w-6" />,
    title: "Real-time Data Processing",
    description: "Process millions of data points in real-time to make informed decisions when they matter most.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    color: "from-teal-500 to-secondary",
  },
  {
    id: "analytics",
    icon: <LineChart className="h-6 w-6" />,
    title: "Predictive Analytics",
    description: "Forecast trends and anticipate market changes with our advanced predictive analytics tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "security",
    icon: <Lock className="h-6 w-6" />,
    title: "Enterprise-grade Security",
    description: "Your data is protected with state-of-the-art encryption and security protocols.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "performance",
    icon: <Zap className="h-6 w-6" />,
    title: "High-Performance Computing",
    description: "Leverage our high-performance computing infrastructure for complex calculations and simulations.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2068&auto=format&fit=crop",
    color: "from-yellow-500 to-amber-600",
  },
]

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-[100px]"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-secondary/10 blur-[120px]"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gradient glow-sm">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
            Discover the advanced capabilities that set our platform apart.
          </p>
        </div>

        <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8 p-1 glass-dark">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
              >
                <div className="p-1">{feature.icon}</div>
                <span className="text-sm font-medium">{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      <div
                        className={`inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-r ${feature.color} text-white`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                      <ul className="space-y-2">
                        {[1, 2, 3].map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            <span>Feature benefit {item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative rounded-xl overflow-hidden glass-card"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 rounded-xl`}
                      ></div>
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        className="w-full h-auto rounded-xl relative z-10"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

                      {/* Glossy reflection */}
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30"
                        style={{ height: "30%" }}
                      ></div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

