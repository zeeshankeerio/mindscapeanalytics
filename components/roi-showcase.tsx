"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Clock, TrendingUp, BarChart, ArrowRight, CheckCircle2 } from "lucide-react"
import { Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function ROIShowcase() {
  const [companySize, setCompanySize] = useState(100)
  const [implementationMonths, setImplementationMonths] = useState(3)
  const [annualRevenue, setAnnualRevenue] = useState(10000000)
  const [activeTab, setActiveTab] = useState("calculator")

  // Calculate ROI metrics
  const monthlyRevenue = annualRevenue / 12
  const employeeCost = companySize * 5000 // Average monthly cost per employee
  const implementationCost = 50000 + companySize * 500 // Base cost + per employee
  const monthlySavings = employeeCost * 0.2 // 20% efficiency savings
  const revenueIncrease = monthlyRevenue * 0.15 // 15% revenue increase
  const monthlyBenefit = monthlySavings + revenueIncrease
  const breakevenMonths = Math.ceil(implementationCost / monthlyBenefit)
  const yearOneROI = ((monthlyBenefit * 12 - implementationCost) / implementationCost) * 100
  const yearThreeROI = ((monthlyBenefit * 36 - implementationCost) / implementationCost) * 100

  // Generate chart data
  const generateChartData = () => {
    const data = []
    const cumulativeCost = implementationCost
    let cumulativeBenefit = 0

    for (let month = 0; month <= 36; month++) {
      // During implementation, only costs accrue
      if (month < implementationMonths) {
        data.push({
          month,
          costs: cumulativeCost,
          benefits: 0,
          net: -cumulativeCost,
        })
      } else {
        cumulativeBenefit += monthlyBenefit
        data.push({
          month,
          costs: cumulativeCost,
          benefits: cumulativeBenefit,
          net: cumulativeBenefit - cumulativeCost,
        })
      }
    }
    return data
  }

  const chartData = generateChartData()

  // Find breakeven point for the chart
  const breakevenPoint = chartData.findIndex((d) => d.net >= 0)

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-green-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-red-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">ROI</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Calculate Your <span className="text-red-500">Return on Investment</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how our AI solutions can deliver measurable business value for your organization
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-black/20 border border-white/10 p-1 w-full flex justify-center mb-8">
              <TabsTrigger value="calculator" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                ROI Calculator
              </TabsTrigger>
              <TabsTrigger
                value="case-studies"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                Success Stories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Input Your Business Parameters</h3>

                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="company-size">Company Size (Employees)</Label>
                          <span className="text-white/70">{companySize}</span>
                        </div>
                        <Slider
                          id="company-size"
                          min={10}
                          max={1000}
                          step={10}
                          value={[companySize]}
                          onValueChange={(value) => setCompanySize(value[0])}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-sm text-white/50">
                          <span>10</span>
                          <span>1000</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="implementation-time">Implementation Time (Months)</Label>
                          <span className="text-white/70">{implementationMonths}</span>
                        </div>
                        <Slider
                          id="implementation-time"
                          min={1}
                          max={12}
                          step={1}
                          value={[implementationMonths]}
                          onValueChange={(value) => setImplementationMonths(value[0])}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-sm text-white/50">
                          <span>1</span>
                          <span>12</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="annual-revenue" className="mb-2 block">
                          Annual Revenue ($)
                        </Label>
                        <Input
                          id="annual-revenue"
                          type="number"
                          value={annualRevenue}
                          onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                          className="bg-white/5 border-white/10"
                        />
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-lg font-medium mb-4">Implementation Details</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>AI model training and customization</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Integration with existing systems</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>User training and onboarding</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Ongoing support and optimization</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Your Projected ROI</h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/60 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <p className="text-sm text-white/70">Implementation Cost</p>
                        </div>
                        <p className="text-xl font-bold">${implementationCost.toLocaleString()}</p>
                      </div>

                      <div className="bg-black/60 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <p className="text-sm text-white/70">Break-even Point</p>
                        </div>
                        <p className="text-xl font-bold">{breakevenMonths} months</p>
                      </div>

                      <div className="bg-black/60 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-red-500" />
                          <p className="text-sm text-white/70">1-Year ROI</p>
                        </div>
                        <p className="text-xl font-bold">{yearOneROI.toFixed(0)}%</p>
                      </div>

                      <div className="bg-black/60 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <BarChart className="h-4 w-4 text-purple-500" />
                          <p className="text-sm text-white/70">3-Year ROI</p>
                        </div>
                        <p className="text-xl font-bold">{yearThreeROI.toFixed(0)}%</p>
                      </div>
                    </div>

                    <div className="h-[300px] mb-6">
                      <ChartContainer
                        config={{
                          costs: {
                            label: "Costs",
                            color: "hsl(var(--chart-1))",
                          },
                          benefits: {
                            label: "Benefits",
                            color: "hsl(var(--chart-2))",
                          },
                          net: {
                            label: "Net Value",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-net)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-net)" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                              dataKey="month"
                              stroke="rgba(255,255,255,0.5)"
                              label={{
                                value: "Months",
                                position: "insideBottom",
                                offset: -5,
                                fill: "rgba(255,255,255,0.5)",
                              }}
                            />
                            <YAxis
                              stroke="rgba(255,255,255,0.5)"
                              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="costs"
                              stroke="var(--color-costs)"
                              fillOpacity={0}
                              strokeWidth={2}
                            />
                            <Area
                              type="monotone"
                              dataKey="benefits"
                              stroke="var(--color-benefits)"
                              fillOpacity={0}
                              strokeWidth={2}
                            />
                            <Area
                              type="monotone"
                              dataKey="net"
                              stroke="var(--color-net)"
                              fill="url(#colorNet)"
                              strokeWidth={2}
                            />
                            {/* Breakeven point marker */}
                            {breakevenPoint > 0 && (
                              <Line
                                type="monotone"
                                dataKey="month"
                                data={[{ month: breakevenPoint, net: 0 }]}
                                stroke="#ffffff"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={{ r: 6, fill: "#ef4444", strokeWidth: 2, stroke: "#ffffff" }}
                              />
                            )}
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    <div className="bg-black/60 p-4 rounded-lg border border-white/10 mb-6">
                      <h4 className="font-medium mb-2">Monthly Benefits Breakdown</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-white/70 mb-1">Efficiency Savings</p>
                          <p className="text-lg font-medium">${monthlySavings.toLocaleString()}/mo</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/70 mb-1">Revenue Increase</p>
                          <p className="text-lg font-medium">${revenueIncrease.toLocaleString()}/mo</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Get Detailed ROI Report
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="case-studies" className="mt-0">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    company: "Global Financial Services",
                    industry: "Banking",
                    roi: "320%",
                    timeframe: "18 months",
                    savings: "$4.2M annually",
                    quote:
                      "The AI platform transformed our operations, reducing manual processes by 75% and improving customer satisfaction scores by 40%.",
                  },
                  {
                    company: "TechCorp International",
                    industry: "Technology",
                    roi: "280%",
                    timeframe: "12 months",
                    savings: "$2.8M annually",
                    quote:
                      "Implementing the AI solution allowed us to scale our customer support while maintaining quality, resulting in 35% cost reduction.",
                  },
                  {
                    company: "HealthPlus Network",
                    industry: "Healthcare",
                    roi: "410%",
                    timeframe: "24 months",
                    savings: "$5.6M annually",
                    quote:
                      "The predictive analytics platform helped us optimize resource allocation and improve patient outcomes, with readmission rates dropping by 28%.",
                  },
                ].map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-red-500">{study.industry}</Badge>
                          <Badge className="bg-white/10">{study.timeframe}</Badge>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{study.company}</h3>

                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm text-white/70">ROI Achieved</p>
                            <p className="text-2xl font-bold">{study.roi}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-white/70 mb-1">Annual Savings</p>
                          <p className="text-lg font-medium">{study.savings}</p>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                          <p className="italic text-white/80">"{study.quote}"</p>
                        </div>

                        <Button variant="outline" className="mt-6 w-full border-white/10 hover:bg-white/10">
                          Read Full Case Study
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

