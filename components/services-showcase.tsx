"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Globe,
    MessageSquare,
    Palette,
    Workflow,
    Brain,
    Smartphone,
    ArrowRight,
    Check
} from "lucide-react"
import Link from "next/link"

const services = [
    {
        id: "web-development",
        title: "Web Development",
        description: "Custom web applications with cutting-edge tech",
        icon: Globe,
        color: "blue",
        href: "/services/web-application-development",
        features: ["React & Next.js", "Responsive Design", "SEO Optimized"]
    },
    {
        id: "chatbot-ai",
        title: "AI Chatbots",
        description: "Intelligent conversational AI solutions",
        icon: MessageSquare,
        color: "green",
        href: "/services/generative-ai-solutions",
        features: ["24/7 Support", "Multi-language", "Smart Learning"]
    },
    {
        id: "ui-ux-design",
        title: "UI/UX Design",
        description: "Beautiful interfaces that drive conversions",
        icon: Palette,
        color: "purple",
        href: "/services/ux-ui-design",
        features: ["User Research", "Prototyping", "Design Systems"]
    },
    {
        id: "automation",
        title: "Automation",
        description: "Streamline operations intelligently",
        icon: Workflow,
        color: "orange",
        href: "/services/ai-powered-automation",
        features: ["Process Automation", "Integration", "Workflow Design"]
    },
    {
        id: "ai-ml",
        title: "AI & ML",
        description: "Advanced AI solutions for business",
        icon: Brain,
        color: "red",
        href: "/services/generative-ai-solutions",
        features: ["Predictive Analytics", "Custom Models", "Data Science"]
    },
    {
        id: "mobile-apps",
        title: "Mobile Apps",
        description: "Native & cross-platform excellence",
        icon: Smartphone,
        color: "cyan",
        href: "/services/mobile-app-development",
        features: ["iOS & Android", "Cross-platform", "App Store Ready"]
    }
]

const colorVariants = {
    blue: {
        gradient: "from-blue-500 to-blue-600",
        shadow: "shadow-blue-500/20",
        hoverShadow: "group-hover:shadow-blue-500/40"
    },
    green: {
        gradient: "from-green-500 to-green-600",
        shadow: "shadow-green-500/20",
        hoverShadow: "group-hover:shadow-green-500/40"
    },
    purple: {
        gradient: "from-purple-500 to-purple-600",
        shadow: "shadow-purple-500/20",
        hoverShadow: "group-hover:shadow-purple-500/40"
    },
    orange: {
        gradient: "from-orange-500 to-orange-600",
        shadow: "shadow-orange-500/20",
        hoverShadow: "group-hover:shadow-orange-500/40"
    },
    red: {
        gradient: "from-red-500 to-red-600",
        shadow: "shadow-red-500/20",
        hoverShadow: "group-hover:shadow-red-500/40"
    },
    cyan: {
        gradient: "from-cyan-500 to-cyan-600",
        shadow: "shadow-cyan-500/20",
        hoverShadow: "group-hover:shadow-cyan-500/40"
    }
}

export default function ServicesShowcase() {
    return (
        <section className="relative py-16">
            <div className="container mx-auto px-4">
                {/* Compact Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="bg-red-500/10 border-red-500/20 text-red-400 px-3 py-1 mb-4 text-xs">
                            OUR SERVICES
                        </Badge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 mb-3"
                    >
                        Comprehensive AI Solutions
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-base text-white/60 max-w-2xl mx-auto"
                    >
                        Cutting-edge solutions tailored to your business needs
                    </motion.p>
                </div>

                {/* Single Row of 6 Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {services.map((service, index) => {
                        const colors = colorVariants[service.color as keyof typeof colorVariants]
                        const Icon = service.icon

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <Link href={service.href}>
                                    <Card className={`group relative h-full bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm transition-all duration-300 overflow-hidden cursor-pointer shadow-xl ${colors.shadow} hover:shadow-2xl ${colors.hoverShadow} hover:-translate-y-2`}>
                                        {/* Gradient Overlay on Hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                        <CardContent className="relative p-6 flex flex-col h-full min-h-[280px]">
                                            {/* Icon */}
                                            <div className={`mb-4 p-3 rounded-xl bg-gradient-to-br ${colors.gradient} transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg self-start`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-base font-bold mb-2 text-white group-hover:text-white transition-colors">
                                                {service.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-xs text-white/60 mb-4 leading-relaxed">
                                                {service.description}
                                            </p>

                                            {/* Features List */}
                                            <ul className="space-y-2 mb-4 flex-grow">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-white/50">
                                                        <Check className="h-3 w-3 mt-0.5 flex-shrink-0 text-white/40" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Arrow Icon */}
                                            <div className="mt-auto pt-4 border-t border-white/5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Learn more</span>
                                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                                        <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
