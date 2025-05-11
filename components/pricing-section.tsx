"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FlexibleSection } from "./flexible-section"

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Starter",
      description: "For small teams and startups",
      monthlyPrice: 499,
      yearlyPrice: 399,
      features: [
        { name: "Up to 5 team members", included: true },
        { name: "5 AI model deployments", included: true },
        { name: "100GB data processing", included: true },
        { name: "Basic analytics dashboard", included: true },
        { name: "Email support", included: true },
        { name: "API access (100K calls/month)", included: true },
        { name: "Custom AI models", included: false },
        { name: "Advanced security features", included: false },
        { name: "Dedicated account manager", included: false },
        { name: "SLA guarantees", included: false },
        { name: "Enterprise integrations", included: false },
      ],
      cta: "Start Free Trial",
      popular: false,
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/20",
      accentColor: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      name: "Professional",
      description: "For growing businesses",
      monthlyPrice: 1299,
      yearlyPrice: 999,
      features: [
        { name: "Up to 20 team members", included: true },
        { name: "20 AI model deployments", included: true },
        { name: "500GB data processing", included: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Priority email & chat support", included: true },
        { name: "API access (500K calls/month)", included: true },
        { name: "Custom AI models", included: true },
        { name: "Advanced security features", included: true },
        { name: "Dedicated account manager", included: false },
        { name: "SLA guarantees", included: false },
        { name: "Enterprise integrations", included: false },
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/20",
      accentColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: 4999,
      yearlyPrice: 3999,
      features: [
        { name: "Unlimited team members", included: true },
        { name: "Unlimited AI model deployments", included: true },
        { name: "Unlimited data processing", included: true },
        { name: "Custom analytics solutions", included: true },
        { name: "24/7 phone, email & chat support", included: true },
        { name: "API access (unlimited)", included: true },
        { name: "Custom AI models", included: true },
        { name: "Advanced security features", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "SLA guarantees", included: true },
        { name: "Enterprise integrations", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/20",
      accentColor: "bg-purple-500",
      textColor: "text-purple-500",
    },
  ]

  return (
    <FlexibleSection
      fullWidth={true}
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[120px]"></div>

        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">PRICING</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Transparent <span className="text-red-500">Pricing</span> Plans
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs with our flexible pricing options
          </p>

          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 ${billingCycle === "monthly" ? "text-white" : "text-white/60"}`}>Monthly</span>
            <Switch
              checked={billingCycle === "yearly"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
              className="data-[state=checked]:bg-red-500"
            />
            <span className={`ml-3 flex items-center ${billingCycle === "yearly" ? "text-white" : "text-white/60"}`}>
              Yearly
              <Badge className="ml-2 bg-red-500 text-white border-0">Save 20%</Badge>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-5 inset-x-0 flex justify-center">
                  <Badge className="bg-red-500 text-white border-0 px-4 py-1">Most Popular</Badge>
                </div>
              )}

              <Card
                className={`bg-black/40 backdrop-blur-md border ${plan.borderColor} overflow-hidden h-full relative group`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-30 group-hover:opacity-40 transition-opacity duration-300`}
                ></div>

                {/* Glossy reflection */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <p className="text-sm text-white/60 mt-1">{plan.description}</p>
                    </div>
                    <div className={`p-2 rounded-full ${plan.accentColor} text-white`}>
                      <div className="h-5 w-5 flex items-center justify-center">
                        {plan.name === "Starter" ? "S" : plan.name === "Professional" ? "P" : "E"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">
                        ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-white/60 ml-2">/month</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-sm text-white/60 mt-1">Billed annually (${plan.yearlyPrice * 12}/year)</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div
                          className={`mt-1 mr-3 flex-shrink-0 ${feature.included ? plan.accentColor : "bg-white/10"} rounded-full p-1`}
                        >
                          {feature.included ? (
                            <Check className="h-3 w-3 text-white" />
                          ) : (
                            <X className="h-3 w-3 text-white/40" />
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className={feature.included ? "text-white/90" : "text-white/40"}>{feature.name}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-white/40 ml-1.5 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-black/90 border border-white/10 text-white">
                                <p className="text-xs max-w-[200px]">Details about {feature.name.toLowerCase()}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="relative z-10">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl">
            <h3 className="text-xl font-bold mb-2">Need a custom solution?</h3>
            <p className="text-white/70 mb-4">
              Contact our sales team for a tailored package that meets your specific requirements.
            </p>
            <Button className="bg-white text-black hover:bg-white/90">Contact Sales Team</Button>
          </div>
        </div>
    </FlexibleSection>
  )
}

