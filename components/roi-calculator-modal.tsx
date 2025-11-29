"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import EnhancedROICalculator from "@/components/enhanced-roi-calculator"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import { useState } from "react"

interface ROICalculatorModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export default function ROICalculatorModal({ isOpen, onOpenChange }: ROICalculatorModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl w-[95vw] h-[90vh] overflow-y-auto p-0 bg-black/95 border-white/10 backdrop-blur-xl">
                <div className="p-1">
                    <EnhancedROICalculator />
                </div>
            </DialogContent>
        </Dialog>
    )
}
