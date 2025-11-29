"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Flag,
    DollarSign,
    Zap,
    Shield,
    CheckCircle,
    Clock,
    Award,
    HeadphonesIcon,
    ArrowRight,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { useRef, useState } from "react"

const advantages = [
    {
        icon: Flag,
        title: "USA-Based",
        description: "Wyoming LLC",
        highlight: "Same timezone, US legal framework",
        color: "from-blue-500 to-blue-600",
        iconColor: "text-blue-400"
    },
    {
        icon: DollarSign,
        title: "Transparent",
        description: "Fixed Pricing",
        highlight: "No hidden fees or surprises",
        color: "from-green-500 to-green-600",
        iconColor: "text-green-400"
    },
    {
        icon: Zap,
        title: "Fast Delivery",
        description: "MVP in 2-4 weeks",
        highlight: "Daily progress updates",
        color: "from-yellow-500 to-yellow-600",
        iconColor: "text-yellow-400"
    },
    {
        icon: Shield,
        title: "Secure",
        description: "SOC 2 Compliant",
        highlight: "Enterprise-grade security",
        color: "from-purple-500 to-purple-600",
        iconColor: "text-purple-400"
    },
    {
        icon: Award,
        title: "Guaranteed",
        description: "30-Day Money-Back",
        highlight: "Free revisions included",
        color: "from-red-500 to-red-600",
        iconColor: "text-red-400"
    },
    {
        icon: HeadphonesIcon,
        title: "24/7 Support",
        description: "Always Available",
        highlight: "Dedicated account manager",
        color: "from-cyan-500 to-cyan-600",
        iconColor: "text-cyan-400"
    }
]

export default function WhyChooseUs() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320
            const currentScroll = scrollContainerRef.current.scrollLeft
            const newScroll = direction === "left"
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount

            scrollContainerRef.current.scrollTo({
                left: newScroll,
                behavior: "smooth"
            })

            setTimeout(() => {
                if (scrollContainerRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
                    setShowLeftArrow(scrollLeft > 0)
                    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
                }
            }, 300)
        }
    }

    return (
        <section className="py-8 md:py-12 relative overflow-hidden bg-black">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/10 blur-[120px]"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-8">
                    <Badge className="mb-3 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">WHY CHOOSE US</Badge>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
                        Your Success is <span className="text-red-500">Our Priority</span>
                    </h2>
                    <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                        We're not just another agency - we're your dedicated partner in digital transformation
                    </p>
                </div>

                {/* Horizontal Scrollable Cards */}
                <div className="relative">
                    {/* Left Arrow */}
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 rounded-full bg-black/80 border border-white/20 hover:bg-black/90 transition-colors hidden md:block"
                        >
                            <ChevronLeft className="h-5 w-5 text-white" />
                        </button>
                    )}

                    {/* Cards Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                        onScroll={(e) => {
                            const target = e.target as HTMLDivElement
                            setShowLeftArrow(target.scrollLeft > 0)
                            setShowRightArrow(
                                target.scrollLeft < target.scrollWidth - target.clientWidth - 10
                            )
                        }}
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {advantages.map((advantage, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="flex-none w-72 snap-start"
                            >
                                <Card className="bg-black/40 backdrop-blur-xl border border-white/10 h-full hover:border-red-500/30 transition-all duration-300 group relative overflow-hidden">
                                    {/* Gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                    <CardContent className="p-5 relative z-10">
                                        {/* Icon */}
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                            <advantage.icon className="h-7 w-7 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold mb-1">{advantage.title}</h3>
                                        <p className="text-sm font-semibold text-white/80 mb-2">{advantage.description}</p>

                                        {/* Highlight */}
                                        <div className="flex items-start gap-2 text-sm text-white/70">
                                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>{advantage.highlight}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    {showRightArrow && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 rounded-full bg-black/80 border border-white/20 hover:bg-black/90 transition-colors hidden md:block"
                        >
                            <ChevronRight className="h-5 w-5 text-white" />
                        </button>
                    )}
                </div>

                {/* CTA Section - Compact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <Card className="bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-500/30 inline-block">
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-8 w-8 text-red-400" />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold">Limited Availability</p>
                                        <p className="text-xs text-white/70"><span className="text-green-400 font-bold">2 spots</span> left this month</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
                                        <a href="#instant-quote">
                                            Get Quote
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="border-white/20 hover:bg-white/10" asChild>
                                        <a href="mailto:zeeshan.keerio@mindscapeanalytics.com">
                                            Email Us
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    )
}
