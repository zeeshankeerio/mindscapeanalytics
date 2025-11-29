"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FreeConsultationModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const services = [
    "AI Chatbot Development",
    "Web Application",
    "Mobile App",
    "UI/UX Design",
    "Automation Solutions",
    "Other"
]

const budgetRanges = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+"
]

export default function FreeConsultationModal({ isOpen, onOpenChange }: FreeConsultationModalProps) {
    const { toast } = useToast()
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        timeline: "",
        message: ""
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // TODO: Implement actual form submission
        setTimeout(() => {
            setStep(3)
            setIsSubmitting(false)
            toast({
                title: "Consultation Booked!",
                description: "We'll contact you within 24 hours to schedule your free consultation.",
            })
        }, 1500)
    }

    const resetForm = () => {
        setStep(1)
        setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            service: "",
            budget: "",
            timeline: "",
            message: ""
        })
    }

    const handleClose = () => {
        onOpenChange(false)
        setTimeout(resetForm, 300)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl bg-black/95 border-white/10 backdrop-blur-xl text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {step === 3 ? "You're All Set!" : "Book Your Free Consultation"}
                    </DialogTitle>
                    <DialogDescription className="text-white/70">
                        {step === 1 && "Tell us about your project"}
                        {step === 2 && "Contact information"}
                        {step === 3 && "We'll be in touch soon!"}
                    </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="service">What service are you interested in?</Label>
                                <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10">
                                        {services.map((service) => (
                                            <SelectItem key={service} value={service}>{service}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="budget">Estimated Budget</Label>
                                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                        <SelectValue placeholder="Select budget range" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10">
                                        {budgetRanges.map((range) => (
                                            <SelectItem key={range} value={range}>{range}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="timeline">When do you need this?</Label>
                                <Input
                                    id="timeline"
                                    placeholder="e.g., ASAP, 1-2 months, 3-6 months"
                                    value={formData.timeline}
                                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                                    className="bg-white/5 border-white/10"
                                />
                            </div>

                            <div>
                                <Label htmlFor="message">Tell us about your project</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Describe your project goals and requirements..."
                                    value={formData.message}
                                    onChange={(e) => handleInputChange("message", e.target.value)}
                                    className="bg-white/5 border-white/10 min-h-[100px]"
                                />
                            </div>

                            <Button
                                onClick={() => setStep(2)}
                                className="w-full bg-red-600 hover:bg-red-700"
                                disabled={!formData.service || !formData.budget}
                            >
                                Next Step
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.form
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    className="bg-white/5 border-white/10"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className="bg-white/5 border-white/10"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    className="bg-white/5 border-white/10"
                                />
                            </div>

                            <div>
                                <Label htmlFor="company">Company Name</Label>
                                <Input
                                    id="company"
                                    placeholder="Your Company"
                                    value={formData.company}
                                    onChange={(e) => handleInputChange("company", e.target.value)}
                                    className="bg-white/5 border-white/10"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    variant="outline"
                                    className="flex-1 border-white/10"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-red-600 hover:bg-red-700"
                                >
                                    {isSubmitting ? "Booking..." : "Book Free Consultation"}
                                    <Calendar className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </motion.form>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-10 w-10 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Consultation Booked!</h3>
                            <p className="text-white/70 mb-6 max-w-md mx-auto">
                                Thank you for your interest! We'll review your project details and contact you within 24 hours to schedule your free consultation.
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                                <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                                    <Clock className="h-4 w-4" />
                                    <span>Expected response time: 24 hours</span>
                                </div>
                            </div>
                            <Button onClick={handleClose} className="bg-red-600 hover:bg-red-700">
                                Close
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}
