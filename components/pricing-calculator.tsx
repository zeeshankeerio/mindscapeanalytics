"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PricingCalculator() {
  const [users, setUsers] = useState(5)
  const [dataProcessing, setDataProcessing] = useState(100)
  const [aiModels, setAiModels] = useState(5)
  const [isAnnual, setIsAnnual] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [plan, setPlan] = useState("starter")
  const [savings, setSavings] = useState(0)

  // Calculate price based on selected options
  useEffect(() => {
    let basePrice = 0

    // Determine base price by plan
    if (users <= 5 && dataProcessing <= 100 && aiModels <= 5) {
      basePrice = 99
      setPlan("starter")
    } else if (users <= 20 && dataProcessing <= 500 && aiModels <= 20) {
      basePrice = 249
      setPlan("professional")
    } else {
      basePrice = 499
      setPlan("business")
    }

    // Add extra costs for exceeding plan limits
    if (plan === "starter") {
      if (users > 5) basePrice += (users - 5) * 15
      if (dataProcessing > 100) basePrice += Math.ceil((dataProcessing - 100) / 50) * 20
      if (aiModels > 5) basePrice += (aiModels - 5) * 25
    } else if (plan === "professional") {
      if (users > 20) basePrice += (users - 20) * 10
      if (dataProcessing > 500) basePrice += Math.ceil((dataProcessing - 500) / 100) * 15
      if (aiModels > 20) basePrice += (aiModels - 20) * 20
    }

    // Apply annual discount
    const monthlyPrice = basePrice
    const annualPrice = Math.round(basePrice * 0.8)

    setTotalPrice(isAnnual ? annualPrice : monthlyPrice)
    setSavings(isAnnual ? (monthlyPrice - annualPrice) * 12 : 0)
  }, [users, dataProcessing, aiModels, isAnnual, plan])

  return (
    <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">Custom Pricing Calculator</h3>
          <p className="text-white/70">
            Adjust the sliders below to estimate your monthly cost based on your specific needs.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <label htmlFor="users" className="font-medium">
                  Team Members
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-white/40 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Number of users who can access the platform</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-mono bg-black/30 px-2 py-1 rounded text-sm">{users} users</span>
            </div>
            <Slider
              id="users"
              min={1}
              max={50}
              step={1}
              value={[users]}
              onValueChange={(value) => setUsers(value[0])}
              className="[&>span]:bg-red-500"
            />
            <div className="flex justify-between text-xs text-white/50">
              <span>1</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <label htmlFor="data" className="font-medium">
                  Data Processing
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-white/40 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Monthly data processing capacity in GB</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-mono bg-black/30 px-2 py-1 rounded text-sm">{dataProcessing} GB</span>
            </div>
            <Slider
              id="data"
              min={50}
              max={2000}
              step={50}
              value={[dataProcessing]}
              onValueChange={(value) => setDataProcessing(value[0])}
              className="[&>span]:bg-red-500"
            />
            <div className="flex justify-between text-xs text-white/50">
              <span>50 GB</span>
              <span>1 TB</span>
              <span>2 TB</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <label htmlFor="models" className="font-medium">
                  AI Model Deployments
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-white/40 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Number of AI models you can deploy simultaneously</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-mono bg-black/30 px-2 py-1 rounded text-sm">{aiModels} models</span>
            </div>
            <Slider
              id="models"
              min={1}
              max={30}
              step={1}
              value={[aiModels]}
              onValueChange={(value) => setAiModels(value[0])}
              className="[&>span]:bg-red-500"
            />
            <div className="flex justify-between text-xs text-white/50">
              <span>1</span>
              <span>15</span>
              <span>30</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Switch
                  id="billing-cycle"
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-red-500"
                />
                <label htmlFor="billing-cycle" className="font-medium cursor-pointer">
                  Annual billing
                </label>
                {isAnnual && <Badge className="bg-red-500 text-white border-0">Save 20%</Badge>}
              </div>
              {isAnnual && savings > 0 && <span className="text-sm text-white/70">You save ${savings}/year</span>}
            </div>

            <div className="bg-black/30 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold">
                    {plan === "starter" ? "Starter" : plan === "professional" ? "Professional" : "Business"} Plan
                  </h4>
                  <p className="text-sm text-white/70">
                    {plan === "starter"
                      ? "Perfect for small teams and startups"
                      : plan === "professional"
                        ? "Ideal for growing businesses"
                        : "For larger teams with advanced needs"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">${totalPrice}</div>
                  <div className="text-sm text-white/70">per month{isAnnual ? ", billed annually" : ""}</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Up to {users} team members</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{dataProcessing} GB data processing</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Up to {aiModels} AI model deployments</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    {plan === "starter"
                      ? "Email support"
                      : plan === "professional"
                        ? "Priority email & chat support"
                        : "24/7 priority support"}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

