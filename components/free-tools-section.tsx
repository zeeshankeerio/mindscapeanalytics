"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Users, ArrowRight, Download, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ROICalculatorModal from "@/components/roi-calculator-modal"
import CustomerSegmentationModal from "@/components/customer-segmentation-modal"

export default function FreeToolsSection() {
    const [roiModalOpen, setRoiModalOpen] = useState(false)
    const [segmentationModalOpen, setSegmentationModalOpen] = useState(false)

    const tools = [
        {
            id: "roi-calculator",
            title: "Advanced ROI Calculator",
            description: "Calculate your AI investment returns with industry-specific benchmarks and export",
            icon: Calculator,
            features: [
                "Industry-specific presets",
                "5-year cash flow projections",
                "Instant calculations",
                "Export results"
            ],
            onClick: () => setRoiModalOpen(true),
            gradient: "from-blue-600/20 to-cyan-600/20",
            iconColor: "text-blue-500",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            hoverColor: "hover:border-blue-500/40"
        },
        {
            id: "customer-segmentation",
            title: "Customer Segmentation Tool",
            description: "Analyze customer segments with AI-powered insights and actionable recommendations",
            icon: Users,
            features: [
                "Behavioral analysis",
                "Engagement scoring",
                "Growth predictions",
                "Export capabilities"
            ],
            onClick: () => setSegmentationModalOpen(true),
            gradient: "from-purple-600/20 to-pink-600/20",
            iconColor: "text-purple-500",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20",
            hoverColor: "hover:border-purple-500/40"
        }
    ]

    return (
        <>
            <section className="relative py-16 md:py-24 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20">
                            Free Tools
                        </Badge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                            Try Our Free Tools
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Experience the power of our AI-driven analytics with these professional-grade tools
                        </p>
                    </motion.div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <Card className={`group relative overflow-hidden bg-black/40 backdrop-blur-xl border ${tool.borderColor} ${tool.hoverColor} transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 h-full`}>
                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    {/* Animated Border Glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent`} />
                                        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent`} />
                                    </div>

                                    <CardHeader className="relative z-10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-xl ${tool.bgColor} ${tool.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                                <tool.icon className="h-8 w-8" />
                                            </div>
                                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                                Free
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-2xl mb-2 group-hover:text-red-400 transition-colors">
                                            {tool.title}
                                        </CardTitle>
                                        <CardDescription className="text-white/60 text-base">
                                            {tool.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="relative z-10 space-y-6">
                                        {/* Features List */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {tool.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2 text-sm text-white/70"
                                                >
                                                    <div className={`h-1.5 w-1.5 rounded-full ${tool.bgColor} ${tool.iconColor}`} />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <Button
                                            onClick={tool.onClick}
                                            className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white group/btn"
                                            size="lg"
                                        >
                                            <span>Try {tool.title.split(' ')[0]} Tool</span>
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>

                                        {/* Stats Preview */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <div className="flex items-center gap-2 text-xs text-white/50">
                                                <Download className="h-3.5 w-3.5" />
                                                <span>Export Results</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-white/50">
                                                <TrendingUp className="h-3.5 w-3.5" />
                                                <span>Instant Analysis</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <p className="text-white/60 mb-4">
                            Want access to our full suite of enterprise tools?
                        </p>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 text-white"
                            onClick={() => window.location.href = '/contact'}
                        >
                            Contact Sales
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Modals */}
            <ROICalculatorModal open={roiModalOpen} onOpenChange={setRoiModalOpen} />
            <CustomerSegmentationModal open={segmentationModalOpen} onOpenChange={setSegmentationModalOpen} />
        </>
    )
}
