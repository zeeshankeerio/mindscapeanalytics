"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  TrendingUp, 
  Gift,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Star,
  Rocket
} from "lucide-react"

const commissionTiers = [
  {
    icon: Users,
    title: "Lead Generated",
    amount: "$50",
    description: "Per qualified lead",
    color: "from-red-500 to-orange-500",
    iconBg: "bg-red-500/20"
  },
  {
    icon: Target,
    title: "Meeting Booked",
    amount: "$100",
    description: "Per consultation",
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500/20"
  },
  {
    icon: Sparkles,
    title: "Deal Closed",
    amount: "$200+",
    description: "+ 10% project value",
    color: "from-red-600 to-red-500",
    iconBg: "bg-red-600/20",
    featured: true
  }
]

const benefits = [
  "100% performance-based - zero upfront cost",
  "30-day cookie tracking window",
  "Real-time dashboard & analytics",
  "Weekly automated payouts",
  "Professional marketing materials",
  "Dedicated support team"
]

const steps = [
  { number: "1", title: "Sign Up Free", desc: "Create account in 60 seconds" },
  { number: "2", title: "Share Link", desc: "Promote your unique URL" },
  { number: "3", title: "Earn Money", desc: "Get paid for referrals" }
]

export default function AffiliateProgramSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      alert("Thanks! We'll send you affiliate details shortly.")
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="py-8 md:py-12 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <Badge className="mb-3 bg-gradient-to-r from-red-500/20 to-purple-500/20 text-white border-red-500/30">
            <Gift className="h-3 w-3 mr-1" />
            AFFILIATE PROGRAM
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Earn Up to <span className="text-red-500">$200+</span> Per Referral
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            Join our affiliate program and earn generous commissions. No experience needed!
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Commission Tiers - Horizontal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {commissionTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`bg-black/40 backdrop-blur-xl border ${tier.featured ? 'border-red-500/50 ring-1 ring-red-500/20' : 'border-white/10'} hover:border-red-500/30 transition-all duration-300 relative overflow-hidden group h-full`}>
                  {tier.featured && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                      BEST VALUE
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-4 relative z-10 text-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
                      <tier.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-red-400 mb-0.5">{tier.amount}</div>
                    <h3 className="text-xs font-bold mb-0.5 uppercase tracking-wide">{tier.title}</h3>
                    <p className="text-[10px] text-white/60">{tier.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column - How It Works */}
            <div>
              <Card className="bg-black/40 backdrop-blur-xl border border-white/10 h-full">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-red-400" />
                    How It Works
                  </h3>
                  <div className="space-y-3">
                    {steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-red-400">{step.number}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">{step.title}</h4>
                          <p className="text-xs text-white/70">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Star className="h-3 w-3 text-yellow-400" />
                      What You Get
                    </h4>
                    <div className="grid grid-cols-1 gap-1.5">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Signup CTA */}
            <div className="flex flex-col justify-center">
              <Card className="bg-gradient-to-br from-red-600/10 to-purple-600/10 border border-red-500/30 backdrop-blur-xl h-full">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                  <div className="text-center mb-4">
                    <TrendingUp className="h-10 w-10 text-red-400 mx-auto mb-2" />
                    <h3 className="text-xl font-bold mb-1">Start Earning Today</h3>
                    <p className="text-sm text-white/70">
                      Join hundreds of affiliates earning passive income
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center bg-black/40 rounded-lg p-2">
                      <div className="text-lg font-bold text-red-400">500+</div>
                      <div className="text-[10px] text-white/60">Affiliates</div>
                    </div>
                    <div className="text-center bg-black/40 rounded-lg p-2">
                      <div className="text-lg font-bold text-red-400">$50K+</div>
                      <div className="text-[10px] text-white/60">Paid Out</div>
                    </div>
                    <div className="text-center bg-black/40 rounded-lg p-2">
                      <div className="text-lg font-bold text-red-400">4.9★</div>
                      <div className="text-[10px] text-white/60">Rating</div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-3 mt-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-black/40 border-white/10 h-10 text-sm"
                    />
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white h-10"
                      size="sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Zap className="mr-2 h-4 w-4 animate-pulse" />
                          Joining...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Join Free - Start Earning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-[10px] text-center text-white/50">
                      No credit card required • Instant approval
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
