"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Sparkles } from "lucide-react"
import FreeConsultationModal from "@/components/free-consultation-modal"

interface CTAButtonsProps {
    variant?: "hero" | "section" | "minimal"
    showSecondary?: boolean
}

export default function CTAButtons({ variant = "hero", showSecondary = true }: CTAButtonsProps) {
    const [showConsultation, setShowConsultation] = useState(false)

    if (variant === "minimal") {
        return (
            <>
                <Button
                    onClick={() => setShowConsultation(true)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    <Calendar className="mr-2 h-4 w-4" />
                    Free Consultation
                </Button>
                <FreeConsultationModal
                    isOpen={showConsultation}
                    onOpenChange={setShowConsultation}
                />
            </>
        )
    }

    if (variant === "section") {
        return (
            <>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => setShowConsultation(true)}
                        size="lg"
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        <Calendar className="mr-2 h-5 w-5" />
                        Book Free Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    {showSecondary && (
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/20 hover:bg-white/10"
                            asChild
                        >
                            <a href="#instant-quote">
                                Get Instant Quote
                                <Sparkles className="ml-2 h-5 w-5" />
                            </a>
                        </Button>
                    )}
                </div>
                <FreeConsultationModal
                    isOpen={showConsultation}
                    onOpenChange={setShowConsultation}
                />
            </>
        )
    }

    // Hero variant
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <Button
                    onClick={() => setShowConsultation(true)}
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-900/50 text-lg px-8 py-6"
                >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {showSecondary && (
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-white/20 hover:bg-white/10 text-lg px-8 py-6"
                        asChild
                    >
                        <a href="#instant-quote">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Get Instant Quote
                        </a>
                    </Button>
                )}
            </motion.div>
            <FreeConsultationModal
                isOpen={showConsultation}
                onOpenChange={setShowConsultation}
            />
        </>
    )
}
