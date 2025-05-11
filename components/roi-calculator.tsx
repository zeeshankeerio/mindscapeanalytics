"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Calculator, DollarSign, LineChart, Percent, Clock, BarChart2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useToast } from "@/hooks/use-toast"

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
  const [solutionType, setSolutionType] = useState("predictiveAnalytics")
  const { toast } = useToast()

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
    
    // Solution type multipliers
    const solutionFactors = {
      predictiveAnalytics: { costMultiplier: 1.0, savingsMultiplier: 1.2, revenueMultiplier: 1.3 },
      computerVision: { costMultiplier: 1.2, savingsMultiplier: 1.4, revenueMultiplier: 1.1 },
      nlp: { costMultiplier: 1.1, savingsMultiplier: 1.3, revenueMultiplier: 1.2 },
      recommendation: { costMultiplier: 0.9, savingsMultiplier: 1.1, revenueMultiplier: 1.4 },
      automation: { costMultiplier: 1.1, savingsMultiplier: 1.5, revenueMultiplier: 1.0 },
    }

    // Base costs
    const baseMonthlyCost = 5000 * sizeMultipliers[companySize as keyof typeof sizeMultipliers]
    const implementationCost = 20000 * sizeMultipliers[companySize as keyof typeof sizeMultipliers]
      * solutionFactors[solutionType as keyof typeof solutionFactors].costMultiplier

    // Data volume impact
    const dataVolumeMultiplier = 1 + dataVolume / 1000

    // AI adoption impact
    const aiAdoptionMultiplier = aiAdoption / 100

    // Industry factors
    const industryFactor = industryFactors[industry as keyof typeof industryFactors]
    
    // Solution factors
    const solutionFactor = solutionFactors[solutionType as keyof typeof solutionFactors]

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

      // Calculate yearly savings and revenue with solution type factored in
      const yearlyCostSavings =
        yearlySubscriptionCost * 2 * industryFactor.costSavings * yearlyAdoptionMultiplier 
        * dataVolumeMultiplier * solutionFactor.savingsMultiplier
      const yearlyRevenueGrowth =
        yearlySubscriptionCost * 3 * industryFactor.revenueGrowth * yearlyAdoptionMultiplier 
        * dataVolumeMultiplier * solutionFactor.revenueMultiplier

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
  }, [industry, companySize, dataVolume, aiAdoption, timeframe, solutionType])

  // Export report as CSV
  const exportReport = () => {
    // Format currency for CSV output
    const formatCurrency = (value: number) => {
      return value.toFixed(2);
    };

    // Create CSV header
    let csv = "ROI Analysis Report for " + industry.charAt(0).toUpperCase() + industry.slice(1) + " Industry\n";
    csv += "Generated on: " + new Date().toLocaleDateString() + "\n\n";
    
    // Add input parameters
    csv += "Input Parameters\n";
    csv += "Industry:," + industry.charAt(0).toUpperCase() + industry.slice(1) + "\n";
    csv += "Solution Type:," + solutionType.replace(/([A-Z])/g, ' $1').trim() + "\n";
    csv += "Company Size:," + companySize.charAt(0).toUpperCase() + companySize.slice(1) + "\n";
    csv += "Data Volume:," + dataVolume + " GB\n";
    csv += "AI Adoption Level:," + aiAdoption + "%\n";
    csv += "Analysis Timeframe:," + (timeframe === "1year" ? "1 Year" : timeframe === "3years" ? "3 Years" : "5 Years") + "\n\n";
    
    // Add summary results
    csv += "Summary Results\n";
    csv += "Total Investment:,$" + formatCurrency(roi.totalInvestment) + "\n";
    csv += "Total Cost Savings:,$" + formatCurrency(roi.totalSavings) + "\n";
    csv += "Total Revenue Growth:,$" + formatCurrency(roi.totalRevenue) + "\n";
    csv += "Net Benefit:,$" + formatCurrency(roi.netBenefit) + "\n";
    csv += "Return on Investment:," + roi.roi.toFixed(2) + "%\n";
    csv += "Payback Period:," + Math.floor(roi.paybackPeriod / 12) + " years " + (roi.paybackPeriod % 12) + " months\n\n";
    
    // Add benefits breakdown
    csv += "Benefits Breakdown\n";
    csv += "Operational Cost Savings:,$" + formatCurrency(roi.totalSavings * 0.6) + "\n";
    csv += "Productivity Improvements:,$" + formatCurrency(roi.totalSavings * 0.4) + "\n";
    csv += "New Revenue Opportunities:,$" + formatCurrency(roi.totalRevenue * 0.7) + "\n";
    csv += "Customer Retention Value:,$" + formatCurrency(roi.totalRevenue * 0.3) + "\n\n";
    
    // Add yearly data
    csv += "Year by Year Analysis\n";
    csv += "Year,Investment,Cost Savings,Revenue Growth,Net Benefit\n";
    
    // Add data rows
    roi.yearlyData.forEach((yearData) => {
      csv += `${yearData.year},`;
      csv += `$${formatCurrency(yearData.investment)},`;
      csv += `$${formatCurrency(yearData.savings)},`;
      csv += `$${formatCurrency(yearData.revenue)},`;
      csv += `$${formatCurrency(yearData.netBenefit)}\n`;
    });
    
    // Add recommendations section
    csv += "\nRecommendations and Insights\n";
    
    // Generate recommendations based on ROI values
    if (roi.roi > 150) {
      csv += "1. This investment shows exceptional ROI potential. Consider accelerating implementation.\n";
    } else if (roi.roi > 50) {
      csv += "1. This investment shows good ROI potential. Proceed with planned implementation.\n";
    } else {
      csv += "1. This investment shows moderate ROI. Consider evaluating cost reduction opportunities.\n";
    }
    
    if (roi.paybackPeriod < 12) {
      csv += "2. With a quick payback period, this represents a low-risk investment opportunity.\n";
    } else if (roi.paybackPeriod < 24) {
      csv += "2. The medium-term payback period indicates balanced risk and return.\n";
    } else {
      csv += "2. The longer payback period suggests higher risk. Consider phased implementation.\n";
    }
    
    csv += "3. For " + industry + " organizations, typical ROI ranges from " + (roi.roi * 0.8).toFixed(0) + "% to " + (roi.roi * 1.2).toFixed(0) + "% for similar implementations.\n";
    
    // Create download link
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `roi_analysis_${industry}_${solutionType}.csv`);
    link.click();
    
    toast({
      title: "Report Exported",
      description: "Your detailed ROI analysis has been exported as CSV.",
    });
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)] -z-10"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-red-500/20 blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-blue-500/20 blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-purple-500/20 blur-[90px] -z-10 animate-pulse"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <Card className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md border border-white/10 shadow-[0_5px_30px_rgba(0,0,0,0.3)] overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-transparent bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text" />
                <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">Input Parameters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry" className="bg-black/50 border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
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
                <Label htmlFor="solutionType">AI Solution Type</Label>
                <Select value={solutionType} onValueChange={setSolutionType}>
                  <SelectTrigger id="solutionType" className="bg-black/50 border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                    <SelectValue placeholder="Select solution type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="predictiveAnalytics">Predictive Analytics</SelectItem>
                    <SelectItem value="computerVision">Computer Vision</SelectItem>
                    <SelectItem value="nlp">Natural Language Processing</SelectItem>
                    <SelectItem value="recommendation">Recommendation Systems</SelectItem>
                    <SelectItem value="automation">Automation & Workflow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="companySize">Company Size</Label>
                <Select value={companySize} onValueChange={setCompanySize}>
                  <SelectTrigger id="companySize" className="bg-black/50 border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
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
                  <span className="text-white/70 text-sm font-medium">{dataVolume} GB</span>
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
                  <span className="text-white/70 text-sm font-medium">{aiAdoption}%</span>
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
                  <SelectTrigger id="timeframe" className="bg-black/50 border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="3years">3 Years</SelectItem>
                    <SelectItem value="5years">5 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-[0_5px_15px_rgba(244,63,94,0.25)] transition-all duration-300">
                Recalculate ROI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <Card className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md border border-white/10 shadow-[0_5px_30px_rgba(0,0,0,0.3)] overflow-hidden h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text" />
                <span className="bg-gradient-to-r from-blue-400 via-violet-500 to-purple-500 text-transparent bg-clip-text">ROI Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-black/30 to-black/50 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text" />
                      <span className="text-sm text-white/70">Total Investment</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">${roi.totalInvestment.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-black/30 to-black/50 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text" />
                      <span className="text-sm text-white/70">Net Benefit</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">${roi.netBenefit.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-black/30 to-black/50 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="h-4 w-4 text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text" />
                      <span className="text-sm text-white/70">ROI</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">{roi.roi}%</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-black/30 to-black/50 border-purple-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text" />
                      <span className="text-sm text-white/70">Payback Period</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
                      {Math.floor(roi.paybackPeriod / 12)} years {roi.paybackPeriod % 12} months
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="bg-black/50 border border-white/20 mb-4 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                  <TabsTrigger
                    value="chart"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all"
                  >
                    <LineChart className="h-4 w-4 mr-2" />
                    ROI Chart
                  </TabsTrigger>
                  <TabsTrigger
                    value="breakdown"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all"
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Detailed Breakdown
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chart" className="mt-0">
                  <div className="h-[300px] p-3 bg-gradient-to-br from-black/20 to-black/40 rounded-lg border border-white/10 shadow-[0_5px_20px_rgba(0,0,0,0.2)]">
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
                  <div className="space-y-6 p-4 bg-gradient-to-br from-black/20 to-black/40 rounded-lg border border-white/10 shadow-[0_5px_20px_rgba(0,0,0,0.2)]">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">Investment Breakdown</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5 hover:bg-black/40 transition-colors">
                          <span className="text-white/70">Implementation Cost</span>
                          <span className="text-amber-400">${Math.round(roi.totalInvestment * 0.2).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5 hover:bg-black/40 transition-colors">
                          <span className="text-white/70">Subscription Fees</span>
                          <span className="text-amber-400">${Math.round(roi.totalInvestment * 0.7).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5 hover:bg-black/40 transition-colors">
                          <span className="text-white/70">Training & Support</span>
                          <span className="text-amber-400">${Math.round(roi.totalInvestment * 0.1).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-medium bg-gradient-to-r from-teal-400 to-emerald-500 text-transparent bg-clip-text">Benefits Breakdown</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5 hover:bg-black/40 transition-colors">
                          <span className="text-white/70">Operational Cost Savings</span>
                          <span className="text-emerald-400">${Math.round(roi.totalSavings * 0.6).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5 hover:bg-black/40 transition-colors">
                          <span className="text-white/70">Productivity Improvements</span>
                          <span className="text-emerald-400">${Math.round(roi.totalSavings * 0.4).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5 hover:bg-black/40 transition-colors">
                          <span className="text-white/70">New Revenue Opportunities</span>
                          <span className="text-emerald-400">${Math.round(roi.totalRevenue * 0.7).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5 hover:bg-black/40 transition-colors">
                          <span className="text-white/70">Customer Retention Value</span>
                          <span className="text-emerald-400">${Math.round(roi.totalRevenue * 0.3).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="bg-gradient-to-br from-black/40 to-black/60 rounded-lg p-4 border border-white/10 shadow-[0_5px_20px_rgba(0,0,0,0.2)]">
                <h3 className="text-lg font-medium mb-2 bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text">ROI Summary</h3>
                <p className="text-white/70">
                Based on your inputs, implementing a {solutionType.replace(/([A-Z])/g, ' $1').toLowerCase()} solution in your {industry} organization would yield
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
                <Button 
                  variant="outline" 
                  className="border-white/20 bg-gradient-to-br from-black/30 to-black/50 hover:bg-black/60 shadow-[0_5px_15px_rgba(0,0,0,0.2)] transition-all"
                  onClick={exportReport}
                  data-export-report
                >
                  Download Detailed Report
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

