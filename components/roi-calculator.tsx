"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Calculator, DollarSign, LineChart, Percent, Clock, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Custom tooltip component for the charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-white/80 text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="font-medium">{entry.name}:</span>
            <span className="text-white/80">
              ${typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ROICalculator() {
  const [industry, setIndustry] = useState("technology")
  const [companySize, setCompanySize] = useState("medium")
  const [dataVolume, setDataVolume] = useState(500)
  const [aiAdoption, setAiAdoption] = useState(50)
  const [timeframe, setTimeframe] = useState("3years")

  const [roi, setRoi] = useState({
    totalInvestment: 0,
    totalSavings: 0,
    totalRevenue: 0,
    netBenefit: 0,
    roi: 0,
    paybackPeriod: 0,
    yearlyData: [] as Array<{
      year: string;
      investment: number;
      savings: number;
      revenue: number;
      netBenefit: number;
    }>,
  })

  // Calculate ROI based on inputs
  useEffect(() => {
    // Base costs and multipliers based on company size
    const sizeMultipliers = {
      small: 0.5,
      medium: 1,
      large: 2,
      enterprise: 4,
    }

    // Industry-specific impact factors
    const industryFactors = {
      technology: { costSavings: 1.2, revenueGrowth: 1.3 },
      finance: { costSavings: 1.4, revenueGrowth: 1.1 },
      healthcare: { costSavings: 1.3, revenueGrowth: 1.2 },
      retail: { costSavings: 1.1, revenueGrowth: 1.4 },
      manufacturing: { costSavings: 1.5, revenueGrowth: 1.0 },
    }

    // Base costs
    const baseMonthlyCost = 5000 * sizeMultipliers[companySize as keyof typeof sizeMultipliers]
    const implementationCost = 20000 * sizeMultipliers[companySize as keyof typeof sizeMultipliers]

    // Data volume impact
    const dataVolumeMultiplier = 1 + dataVolume / 1000

    // AI adoption impact
    const aiAdoptionMultiplier = aiAdoption / 100

    // Industry factors
    const industryFactor = industryFactors[industry as keyof typeof industryFactors]

    // Calculate yearly data
    const years = timeframe === "1year" ? 1 : timeframe === "3years" ? 3 : 5
    const yearlyData = []

    let totalInvestment = implementationCost
    let totalSavings = 0
    let totalRevenue = 0

    for (let year = 1; year <= years; year++) {
      // Costs increase slightly each year
      const yearlySubscriptionCost = baseMonthlyCost * 12 * (1 + (year - 1) * 0.05)

      // Benefits increase more significantly each year as adoption grows
      const adoptionGrowthFactor = 1 + (year - 1) * 0.2
      const yearlyAdoptionMultiplier = Math.min(aiAdoptionMultiplier * adoptionGrowthFactor, 1)

      // Calculate yearly savings and revenue
      const yearlyCostSavings =
        yearlySubscriptionCost * 2 * industryFactor.costSavings * yearlyAdoptionMultiplier * dataVolumeMultiplier
      const yearlyRevenueGrowth =
        yearlySubscriptionCost * 3 * industryFactor.revenueGrowth * yearlyAdoptionMultiplier * dataVolumeMultiplier

      // Update totals
      totalInvestment += yearlySubscriptionCost
      totalSavings += yearlyCostSavings
      totalRevenue += yearlyRevenueGrowth

      // Add to yearly data
      yearlyData.push({
        year: `Year ${year}`,
        investment: Math.round(year === 1 ? yearlySubscriptionCost + implementationCost : yearlySubscriptionCost),
        savings: Math.round(yearlyCostSavings),
        revenue: Math.round(yearlyRevenueGrowth),
        netBenefit: Math.round(
          yearlyCostSavings + yearlyRevenueGrowth - yearlySubscriptionCost - (year === 1 ? implementationCost : 0),
        ),
      })
    }

    // Calculate overall ROI
    const netBenefit = totalSavings + totalRevenue - totalInvestment
    const roiPercent = (netBenefit / totalInvestment) * 100

    // Calculate payback period (in months)
    let cumulativeBenefit = 0
    let paybackPeriod = 0

    for (let i = 0; i < yearlyData.length; i++) {
      const monthlyInvestment = yearlyData[i].investment / 12
      const monthlyBenefit = (yearlyData[i].savings + yearlyData[i].revenue) / 12

      for (let month = 1; month <= 12; month++) {
        cumulativeBenefit += monthlyBenefit - monthlyInvestment
        paybackPeriod++

        if (cumulativeBenefit >= implementationCost) {
          break
        }
      }

      if (cumulativeBenefit >= implementationCost) {
        break
      }
    }

    // Update state
    setRoi({
      totalInvestment: Math.round(totalInvestment),
      totalSavings: Math.round(totalSavings),
      totalRevenue: Math.round(totalRevenue),
      netBenefit: Math.round(netBenefit),
      roi: Math.round(roiPercent),
      paybackPeriod: paybackPeriod,
      yearlyData,
    })
  }, [industry, companySize, dataVolume, aiAdoption, timeframe])

  return (
    <section className="py-24 bg-gradient-to-b from-black to-black/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">ROI CALCULATOR</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Calculate Your <span className="text-red-500">Return on Investment</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how Mindscape Analytics can deliver measurable business value for your organization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-red-500" />
                  <span>ROI Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/10">
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger id="companySize" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/10">
                      <SelectItem value="small">Small (10-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium (51-250 employees)</SelectItem>
                      <SelectItem value="large">Large (251-1000 employees)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="dataVolume">Monthly Data Volume (GB)</Label>
                    <span className="text-white/70 text-sm">{dataVolume} GB</span>
                  </div>
                  <Slider
                    id="dataVolume"
                    min={100}
                    max={5000}
                    step={100}
                    value={[dataVolume]}
                    onValueChange={(value) => setDataVolume(value[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-white/50">
                    <span>100 GB</span>
                    <span>5000 GB</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="aiAdoption">AI Adoption Level (%)</Label>
                    <span className="text-white/70 text-sm">{aiAdoption}%</span>
                  </div>
                  <Slider
                    id="aiAdoption"
                    min={10}
                    max={100}
                    step={5}
                    value={[aiAdoption]}
                    onValueChange={(value) => setAiAdoption(value[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Limited (10%)</span>
                    <span>Full (100%)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="timeframe">Analysis Timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger id="timeframe" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/10">
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="3years">3 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Calculate ROI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-red-500" />
                  <span>ROI Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-white/70">Total Investment</span>
                      </div>
                      <div className="text-2xl font-bold">${roi.totalInvestment.toLocaleString()}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-white/70">Net Benefit</span>
                      </div>
                      <div className="text-2xl font-bold">${roi.netBenefit.toLocaleString()}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Percent className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-white/70">ROI</span>
                      </div>
                      <div className="text-2xl font-bold">{roi.roi}%</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-white/70">Payback Period</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {Math.floor(roi.paybackPeriod / 12)} years {roi.paybackPeriod % 12} months
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="chart" className="w-full">
                  <TabsList className="bg-black/50 border border-white/10 mb-4">
                    <TabsTrigger
                      value="chart"
                      className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                    >
                      <LineChart className="h-4 w-4 mr-2" />
                      ROI Chart
                    </TabsTrigger>
                    <TabsTrigger
                      value="breakdown"
                      className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                    >
                      <BarChart2 className="h-4 w-4 mr-2" />
                      Detailed Breakdown
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="chart" className="mt-0">
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          investment: {
                            label: "Investment",
                            color: "hsl(var(--chart-1))",
                          },
                          savings: {
                            label: "Cost Savings",
                            color: "hsl(var(--chart-2))",
                          },
                          revenue: {
                            label: "Revenue Growth",
                            color: "hsl(var(--chart-3))",
                          },
                          netBenefit: {
                            label: "Net Benefit",
                            color: "hsl(var(--chart-4))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={roi.yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
                            <YAxis stroke="rgba(255,255,255,0.5)" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="investment" fill="var(--color-investment)" name="Investment" />
                            <Bar dataKey="savings" fill="var(--color-savings)" name="Cost Savings" />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue Growth" />
                            <Bar dataKey="netBenefit" fill="var(--color-netBenefit)" name="Net Benefit" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="breakdown" className="mt-0">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Investment Breakdown</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Implementation Cost</span>
                            <span>${Math.round(roi.totalInvestment * 0.2).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Subscription Fees</span>
                            <span>${Math.round(roi.totalInvestment * 0.7).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Training & Support</span>
                            <span>${Math.round(roi.totalInvestment * 0.1).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Benefits Breakdown</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Operational Cost Savings</span>
                            <span>${Math.round(roi.totalSavings * 0.6).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Productivity Improvements</span>
                            <span>${Math.round(roi.totalSavings * 0.4).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">New Revenue Opportunities</span>
                            <span>${Math.round(roi.totalRevenue * 0.7).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Customer Retention Value</span>
                            <span>${Math.round(roi.totalRevenue * 0.3).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <h3 className="text-lg font-medium mb-2">ROI Summary</h3>
                  <p className="text-white/70">
                    Based on your inputs, implementing Mindscape Analytics in your {industry} organization would yield
                    an estimated ROI of <span className="text-red-500 font-medium">{roi.roi}%</span> over{" "}
                    {timeframe === "1year" ? "1 year" : timeframe === "3years" ? "3 years" : "5 years"}, with a payback
                    period of{" "}
                    <span className="text-red-500 font-medium">
                      {Math.floor(roi.paybackPeriod / 12)} years {roi.paybackPeriod % 12} months
                    </span>
                    . This represents a net benefit of{" "}
                    <span className="text-red-500 font-medium">${roi.netBenefit.toLocaleString()}</span> on a total
                    investment of ${roi.totalInvestment.toLocaleString()}.
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="border-white/10 hover:bg-white/5">
                    Download Detailed Report
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

