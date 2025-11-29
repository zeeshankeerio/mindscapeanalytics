"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
    Calculator,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Clock,
    DollarSign,
    Zap,
    TrendingUp
} from "lucide-react"

const services = [
    { id: "chatbot", name: "AI Chatbot", basePrice: 5000, icon: "🤖" },
    { id: "webapp", name: "Web App", basePrice: 8000, icon: "💻" },
    { id: "mobileapp", name: "Mobile App", basePrice: 12000, icon: "📱" },
    { id: "uiux", name: "UI/UX Design", basePrice: 3000, icon: "🎨" },
    { id: "automation", name: "Automation", basePrice: 4000, icon: "⚡" },
    { id: "api", name: "API Integration", basePrice: 2500, icon: "🔌" }
]

const complexityMultipliers = {
    simple: { label: "Simple", multiplier: 1, desc: "Basic features" },
    moderate: { label: "Standard", multiplier: 1.5, desc: "Most popular" },
    complex: { label: "Advanced", multiplier: 2.5, desc: "Enterprise" }
}

export default function InstantQuoteCalculator() {
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [complexity, setComplexity] = useState<keyof typeof complexityMultipliers>("moderate")
    const [timeline, setTimeline] = useState([8])
    const [showQuote, setShowQuote] = useState(false)
    const [email, setEmail] = useState("")

    const toggleService = (serviceId: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        )
        setShowQuote(false)
    }

    const calculateQuote = () => {
        const baseTotal = services
            .filter(s => selectedServices.includes(s.id))
            .reduce((sum, s) => sum + s.basePrice, 0)

        const multiplier = complexityMultipliers[complexity].multiplier
        const timelineMultiplier = timeline[0] < 4 ? 1.3 : timeline[0] < 8 ? 1.1 : 1

        return Math.round(baseTotal * multiplier * timelineMultiplier)
    }

    const handleGetQuote = () => {
        if (selectedServices.length > 0) {
            setShowQuote(true)
        }
    }

    const handleEmailQuote = () => {
        if (email) {
            alert(`Quote details will be sent to ${email}`)
            // TODO: Implement actual email sending
        }
    }

    const estimatedQuote = calculateQuote()
    const estimatedTime = Math.ceil(timeline[0] * selectedServices.length * complexityMultipliers[complexity].multiplier / 2)

    return (
        <section className="py-12 md:py-16 relative overflow-hidden bg-black">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/10 blur-[120px]"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-8">
                    <Badge className="mb-3 bg-gradient-to-r from-red-500/20 to-purple-500/20 text-white border-red-500/30">
                        <Calculator className="h-3 w-3 mr-1" />
                        INSTANT QUOTE
                    </Badge>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
                        Get Your <span className="text-red-500">Instant Estimate</span>
                    </h2>
                    <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                        Calculate your project cost in seconds. Transparent pricing, no surprises!
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden">
                        <CardContent className="p-6 md:p-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Left Column - Inputs */}
                                <div className="space-y-6">
                                    {/* Service Selection */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-red-400" />
                                            Select Services
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {services.map((service) => (
                                                <motion.div
                                                    key={service.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div
                                                        onClick={() => toggleService(service.id)}
                                                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedServices.includes(service.id)
                                                                ? 'border-red-500 bg-red-500/10'
                                                                : 'border-white/10 bg-white/5 hover:border-white/20'
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-2xl">{service.icon}</span>
                                                            <Checkbox
                                                                checked={selectedServices.includes(service.id)}
                                                                className="pointer-events-none"
                                                            />
                                                        </div>
                                                        <div className="text-sm font-semibold">{service.name}</div>
                                                        <div className="text-xs text-white/60">From ${service.basePrice.toLocaleString()}</div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Complexity */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Complexity Level</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {Object.entries(complexityMultipliers).map(([key, value]) => (
                                                <div
                                                    key={key}
                                                    onClick={() => {
                                                        setComplexity(key as keyof typeof complexityMultipliers)
                                                        setShowQuote(false)
                                                    }}
                                                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${complexity === key
                                                            ? 'border-red-500 bg-red-500/10'
                                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="font-semibold text-sm mb-1">{value.label}</div>
                                                    <div className="text-xs text-white/60">{value.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">
                                            Timeline: <span className="text-red-400">{timeline[0]} weeks</span>
                                        </h3>
                                        <Slider
                                            value={timeline}
                                            onValueChange={(value) => {
                                                setTimeline(value)
                                                setShowQuote(false)
                                            }}
                                            min={2}
                                            max={24}
                                            step={1}
                                            className="mb-2"
                                        />
                                        <div className="flex justify-between text-xs text-white/60">
                                            <span>Rush (2w)</span>
                                            <span>Standard (8-12w)</span>
                                            <span>Flexible (24w)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Quote Display */}
                                <div className="flex flex-col justify-center">
                                    {!showQuote ? (
                                        <div className="text-center py-8">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                                                <Calculator className="h-10 w-10 text-red-400" />
                                            </div>
                                            <p className="text-white/60 mb-6">
                                                Select services and click calculate to see your instant estimate
                                            </p>
                                            <Button
                                                onClick={handleGetQuote}
                                                disabled={selectedServices.length === 0}
                                                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                                                size="lg"
                                            >
                                                <Calculator className="mr-2 h-5 w-5" />
                                                Calculate Instant Quote
                                            </Button>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="space-y-4"
                                        >
                                            {/* Price Display */}
                                            <div className="bg-gradient-to-br from-red-600/20 to-purple-600/20 border border-red-500/30 rounded-xl p-6 text-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10"></div>
                                                <div className="relative z-10">
                                                    <div className="text-sm text-white/70 mb-2">Estimated Project Cost</div>
                                                    <div className="text-4xl md:text-5xl font-bold text-red-400 mb-4">
                                                        ${estimatedQuote.toLocaleString()}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        <div className="flex items-center justify-center gap-2 bg-black/40 rounded-lg p-2">
                                                            <Clock className="h-4 w-4 text-red-400" />
                                                            <span>{estimatedTime} weeks</span>
                                                        </div>
                                                        <div className="flex items-center justify-center gap-2 bg-black/40 rounded-lg p-2">
                                                            <Zap className="h-4 w-4 text-yellow-400" />
                                                            <span>Fast delivery</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Selected Services */}
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-semibold text-white/70">Included Services:</h4>
                                                {selectedServices.map(serviceId => {
                                                    const service = services.find(s => s.id === serviceId)
                                                    return (
                                                        <div key={serviceId} className="flex items-center gap-2 text-sm bg-white/5 rounded-lg p-2">
                                                            <CheckCircle className="h-4 w-4 text-red-400" />
                                                            <span>{service?.icon} {service?.name}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            {/* Email Capture */}
                                            <div className="space-y-2">
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="bg-black/40 border-white/10"
                                                    />
                                                    <Button
                                                        onClick={handleEmailQuote}
                                                        disabled={!email}
                                                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 whitespace-nowrap"
                                                    >
                                                        Email Quote
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-center text-white/50">
                                                    Get detailed quote & free consultation
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Stats */}
                            {showQuote && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 pt-6 border-t border-white/10"
                                >
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
                                                <TrendingUp className="h-4 w-4" />
                                                <span className="text-sm font-semibold">Transparent</span>
                                            </div>
                                            <p className="text-xs text-white/60">No hidden fees</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
                                                <DollarSign className="h-4 w-4" />
                                                <span className="text-sm font-semibold">Flexible</span>
                                            </div>
                                            <p className="text-xs text-white/60">Payment plans</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
                                                <Sparkles className="h-4 w-4" />
                                                <span className="text-sm font-semibold">Guaranteed</span>
                                            </div>
                                            <p className="text-xs text-white/60">30-day refund</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
