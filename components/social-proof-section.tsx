"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Briefcase, TrendingUp, Star, Shield, Clock, Award } from "lucide-react"
import Image from "next/image"

const stats = [
    {
        icon: Users,
        value: "50+",
        label: "Happy Clients",
        color: "text-blue-400"
    },
    {
        icon: Briefcase,
        value: "100+",
        label: "Projects Delivered",
        color: "text-green-400"
    },
    {
        icon: TrendingUp,
        value: "98%",
        label: "Client Satisfaction",
        color: "text-purple-400"
    },
    {
        icon: Clock,
        value: "24/7",
        label: "Support Available",
        color: "text-red-400"
    }
]

const trustBadges = [
    {
        icon: Shield,
        title: "SSL Secured",
        description: "Bank-level encryption"
    },
    {
        icon: Award,
        title: "USA Based",
        description: "Wyoming LLC"
    },
    {
        icon: CheckCircle,
        title: "Verified",
        description: "Licensed & Insured"
    },
    {
        icon: Star,
        title: "Top Rated",
        description: "5-star reviews"
    }
]

// Placeholder client logos - replace with actual logos
const clientLogos = [
    { name: "TechCorp", placeholder: "TC" },
    { name: "InnovateLabs", placeholder: "IL" },
    { name: "DataFlow", placeholder: "DF" },
    { name: "CloudSync", placeholder: "CS" },
    { name: "AIVentures", placeholder: "AV" },
    { name: "SmartSystems", placeholder: "SS" }
]

export default function SocialProofSection() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-black">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
            <div className="absolute bottom-1/2 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">TRUSTED BY BUSINESSES</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Proven <span className="text-red-500">Results</span>
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Join successful businesses that trust us with their digital transformation
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-500/30 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                                    <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                                    <div className="text-sm text-white/70">{stat.label}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Client Logos */}
                <div className="mb-16">
                    <h3 className="text-center text-lg font-semibold text-white/70 mb-8">Trusted by innovative companies</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
                        {clientLogos.map((client, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-center"
                            >
                                <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <span className="text-xl font-bold text-white/70">{client.placeholder}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {trustBadges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-red-500/30 transition-colors">
                                <CardContent className="p-4 text-center">
                                    <badge.icon className="h-6 w-6 mx-auto mb-2 text-red-400" />
                                    <div className="text-sm font-semibold mb-1">{badge.title}</div>
                                    <div className="text-xs text-white/60">{badge.description}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
