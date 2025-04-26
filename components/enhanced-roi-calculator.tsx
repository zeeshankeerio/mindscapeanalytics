"use client"

import { useState, useEffect, ClassAttributes, HTMLAttributes, JSX } from "react"
import { Calculator, DollarSign, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Industry presets
const industryPresets = {
  retail: {
    implementationCost: 75000,
    annualMaintenanceCost: 15000,
    revenueIncrease: 8,
    costReduction: 12,
    timeToImplement: 4,
    employeeProductivity: 15,
    customerSatisfaction: 10,
  },
  healthcare: {
    implementationCost: 150000,
    annualMaintenanceCost: 30000,
    revenueIncrease: 5,
    costReduction: 18,
    timeToImplement: 6,
    employeeProductivity: 20,
    customerSatisfaction: 15,
  },
  finance: {
    implementationCost: 200000,
    annualMaintenanceCost: 40000,
    revenueIncrease: 7,
    costReduction: 15,
    timeToImplement: 5,
    employeeProductivity: 12,
    customerSatisfaction: 8,
  },
  manufacturing: {
    implementationCost: 180000,
    annualMaintenanceCost: 25000,
    revenueIncrease: 6,
    costReduction: 20,
    timeToImplement: 8,
    employeeProductivity: 25,
    customerSatisfaction: 5,
  },
  technology: {
    implementationCost: 120000,
    annualMaintenanceCost: 20000,
    revenueIncrease: 10,
    costReduction: 10,
    timeToImplement: 3,
    employeeProductivity: 18,
    customerSatisfaction: 12,
  },
}

// AI solution types
const solutionTypes = {
  predictiveAnalytics: {
    implementationCost: 1.2,
    annualMaintenanceCost: 1.1,
    revenueIncrease: 1.3,
    costReduction: 1.2,
    timeToImplement: 0.9,
    employeeProductivity: 1.2,
    customerSatisfaction: 1.1,
  },
  computerVision: {
    implementationCost: 1.4,
    annualMaintenanceCost: 1.2,
    revenueIncrease: 1.1,
    costReduction: 1.4,
    timeToImplement: 1.2,
    employeeProductivity: 1.3,
    customerSatisfaction: 1.0,
  },
  nlp: {
    implementationCost: 1.3,
    annualMaintenanceCost: 1.3,
    revenueIncrease: 1.2,
    costReduction: 1.1,
    timeToImplement: 1.1,
    employeeProductivity: 1.1,
    customerSatisfaction: 1.4,
  },
  recommendation: {
    implementationCost: 1.1,
    annualMaintenanceCost: 1.0,
    revenueIncrease: 1.4,
    costReduction: 1.0,
    timeToImplement: 0.8,
    employeeProductivity: 1.0,
    customerSatisfaction: 1.3,
  },
  automation: {
    implementationCost: 1.3,
    annualMaintenanceCost: 1.2,
    revenueIncrease: 1.0,
    costReduction: 1.5,
    timeToImplement: 1.0,
    employeeProductivity: 1.5,
    customerSatisfaction: 0.9,
  },
}

// Colors for charts
const COLORS = ["#ff0000", "#ff3333", "#ff6666", "#ff9999", "#ffcccc"]

export default function EnhancedROICalculator() {
  const [activeTab, setActiveTab] = useState("inputs")
  const [industry, setIndustry] = useState("retail")
  const [solutionType, setSolutionType] = useState("predictiveAnalytics")
  const [companySize, setCompanySize] = useState("medium")
  const [annualRevenue, setAnnualRevenue] = useState(5000000)
  const [annualCosts, setAnnualCosts] = useState(3500000)
  const [implementationCost, setImplementationCost] = useState(75000)
  const [annualMaintenanceCost, setAnnualMaintenanceCost] = useState(15000)
  const [revenueIncrease, setRevenueIncrease] = useState(8)
  const [costReduction, setCostReduction] = useState(12)
  const [timeToImplement, setTimeToImplement] = useState(4)
  const [employeeProductivity, setEmployeeProductivity] = useState(15)
  const [customerSatisfaction, setCustomerSatisfaction] = useState(10)
  const [includeIntangibles, setIncludeIntangibles] = useState(true)
  const [timeHorizon, setTimeHorizon] = useState(5)
  const [discountRate, setDiscountRate] = useState(5)
  const [isCalculating, setIsCalculating] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [shouldButtonBlink, setShouldButtonBlink] = useState(false)

  const { toast } = useToast()

  // Apply industry preset
  useEffect(() => {
    const preset = industryPresets[industry as keyof typeof industryPresets]
    const solution = solutionTypes[solutionType as keyof typeof solutionTypes]

    // Apply company size multiplier
    const sizeMultiplier = companySize === "small" ? 0.5 : companySize === "medium" ? 1 : 2

    setImplementationCost(Math.round(preset.implementationCost * solution.implementationCost * sizeMultiplier))
    setAnnualMaintenanceCost(Math.round(preset.annualMaintenanceCost * solution.annualMaintenanceCost * sizeMultiplier))
    setRevenueIncrease(Math.round(preset.revenueIncrease * solution.revenueIncrease * 10) / 10)
    setCostReduction(Math.round(preset.costReduction * solution.costReduction * 10) / 10)
    setTimeToImplement(Math.round(preset.timeToImplement * solution.timeToImplement))
    setEmployeeProductivity(Math.round(preset.employeeProductivity * solution.employeeProductivity * 10) / 10)
    setCustomerSatisfaction(Math.round(preset.customerSatisfaction * solution.customerSatisfaction * 10) / 10)

    // Set default revenue and costs based on company size
    if (companySize === "small") {
      setAnnualRevenue(1000000)
      setAnnualCosts(700000)
    } else if (companySize === "medium") {
      setAnnualRevenue(5000000)
      setAnnualCosts(3500000)
    } else {
      setAnnualRevenue(20000000)
      setAnnualCosts(14000000)
    }
  }, [industry, solutionType, companySize])

  // Effect to start blinking after user makes changes to inputs
  useEffect(() => {
    // Only start blinking when user has made changes and has not yet calculated
    if (!results && (
      companySize !== 'small' || 
      annualRevenue !== 1000000 || 
      annualCosts !== 3500000 ||
      implementationCost !== 75000 ||
      annualMaintenanceCost !== 15000 ||
      revenueIncrease !== 8 ||
      costReduction !== 12 ||
      timeToImplement !== 4 ||
      includeIntangibles !== true ||
      employeeProductivity !== 15 ||
      customerSatisfaction !== 10 ||
      timeHorizon !== 5 ||
      discountRate !== 5
    )) {
      setShouldButtonBlink(true)
    } else {
      setShouldButtonBlink(false)
    }
  }, [
    companySize, annualRevenue, annualCosts, 
    implementationCost, annualMaintenanceCost, revenueIncrease, 
    costReduction, timeToImplement, includeIntangibles, 
    employeeProductivity, customerSatisfaction, timeHorizon, 
    discountRate, results
  ])

  // Calculate ROI
  const calculateROI = () => {
    setIsCalculating(true)

    setTimeout(() => {
      // Calculate yearly cash flows
      const cashFlows = []
      let cumulativeROI = 0
      let npv = -implementationCost
      let paybackPeriod = null

      // Initial investment (year 0)
      cashFlows.push({
        year: 0,
        revenue: 0,
        costs: 0,
        netCashFlow: -implementationCost,
        cumulativeCashFlow: -implementationCost,
        roi: 0,
        npv: -implementationCost,
      })

      // Calculate for each year in the time horizon
      for (let year = 1; year <= timeHorizon; year++) {
        // Implementation period adjustment
        const implementationFactor = year <= timeToImplement ? year / timeToImplement : 1

        // Calculate revenue increase
        const revenueGain = annualRevenue * (revenueIncrease / 100) * implementationFactor

        // Calculate cost reduction
        const costSavings = annualCosts * (costReduction / 100) * implementationFactor

        // Calculate intangible benefits
        let intangibleBenefits = 0
        if (includeIntangibles) {
          const productivityValue = annualCosts * 0.5 * (employeeProductivity / 100) * implementationFactor
          const satisfactionValue = annualRevenue * 0.02 * (customerSatisfaction / 100) * implementationFactor
          intangibleBenefits = productivityValue + satisfactionValue
        }

        // Calculate net cash flow
        const yearlyRevenue = revenueGain + (includeIntangibles ? intangibleBenefits : 0)
        const yearlyCosts = -annualMaintenanceCost
        const yearlySavings = costSavings
        const netCashFlow = yearlyRevenue + yearlyCosts + yearlySavings

        // Calculate cumulative cash flow
        const previousCumulativeCashFlow: number = cashFlows[year - 1].cumulativeCashFlow
        const cumulativeCashFlow = previousCumulativeCashFlow + netCashFlow

        // Calculate ROI for this year
        const yearlyROI = (netCashFlow / implementationCost) * 100
        cumulativeROI += yearlyROI

        // Calculate NPV
        const discountFactor = 1 / Math.pow(1 + discountRate / 100, year)
        const discountedCashFlow = netCashFlow * discountFactor
        npv += discountedCashFlow

        // Determine payback period
        if (paybackPeriod === null && cumulativeCashFlow >= 0) {
          const previousYear = year - 1
          const previousCF = cashFlows[previousYear].cumulativeCashFlow
          const yearFraction = previousYear + Math.abs(previousCF) / netCashFlow
          paybackPeriod = yearFraction
        }

        cashFlows.push({
          year,
          revenue: yearlyRevenue,
          costs: yearlyCosts,
          savings: yearlySavings,
          intangibleBenefits: includeIntangibles ? intangibleBenefits : 0,
          netCashFlow,
          cumulativeCashFlow,
          roi: yearlyROI,
          npv: discountedCashFlow,
        })
      }

      // Calculate IRR (simplified approximation)
      let irr = 0
      if (npv > 0) {
        // Simple approximation based on NPV and initial investment
        irr = (npv / implementationCost) * discountRate
      }

      // Calculate benefit-cost ratio
      const totalBenefits = cashFlows.reduce((sum, cf) => sum + (cf.year > 0 ? cf.netCashFlow : 0), 0)
      const bcRatio = totalBenefits / implementationCost

      // Calculate ROI breakdown
      const roiBreakdown = [
        { name: "Revenue Increase", value: revenueIncrease },
        { name: "Cost Reduction", value: costReduction },
        { name: "Productivity", value: includeIntangibles ? employeeProductivity : 0 },
        { name: "Customer Satisfaction", value: includeIntangibles ? customerSatisfaction : 0 },
      ].filter((item) => item.value > 0)

      // Set results
      setResults({
        cashFlows,
        totalInvestment: implementationCost + annualMaintenanceCost * timeHorizon,
        totalReturns: totalBenefits,
        roi: cumulativeROI,
        npv,
        irr,
        paybackPeriod: paybackPeriod !== null ? paybackPeriod : timeHorizon,
        bcRatio,
        roiBreakdown,
      })

      setIsCalculating(false)
      setActiveTab("results")

      toast({
        title: "ROI Calculation Complete",
        description: "Your AI investment ROI has been calculated successfully.",
      })
    }, 1500)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setIndustry("retail")
    setSolutionType("predictiveAnalytics")
    setCompanySize("medium")
    setIncludeIntangibles(true)
    setTimeHorizon(5)
    setDiscountRate(5)

    toast({
      title: "Reset to Defaults",
      description: "Calculator values have been reset to default settings.",
    })
  }

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results" disabled={!results}>
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-4">
          {/* Company and AI Solution Information */}
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Company & AI Solution</CardTitle>
              <CardDescription>Enter information about your company and the AI solution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/10">
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution-type">AI Solution Type</Label>
                  <Select value={solutionType} onValueChange={setSolutionType}>
                    <SelectTrigger id="solution-type" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select solution type" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/10">
                      <SelectItem value="predictiveAnalytics">Predictive Analytics</SelectItem>
                      <SelectItem value="computerVision">Computer Vision</SelectItem>
                      <SelectItem value="nlp">Natural Language Processing</SelectItem>
                      <SelectItem value="recommendation">Recommendation Systems</SelectItem>
                      <SelectItem value="automation">Process Automation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger id="company-size" className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/10">
                      <SelectItem value="small">Small (&lt; 50 employees)</SelectItem>
                      <SelectItem value="medium">Medium (50-500 employees)</SelectItem>
                      <SelectItem value="large">Large (&gt; 500 employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annual-revenue">Annual Revenue</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
                    <Input
                      id="annual-revenue"
                      type="number"
                      className="pl-8 bg-black/50 border-white/10"
                      value={annualRevenue}
                      onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annual-costs">Annual Operating Costs</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
                    <Input
                      id="annual-costs"
                      type="number"
                      className="pl-8 bg-black/50 border-white/10"
                      value={annualCosts}
                      onChange={(e) => setAnnualCosts(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Implementation Costs */}
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Implementation Costs</CardTitle>
              <CardDescription>Enter the costs associated with implementing the AI solution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="implementation-cost">Initial Implementation Cost</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
                    <Input
                      id="implementation-cost"
                      type="number"
                      className="pl-8 bg-black/50 border-white/10"
                      value={implementationCost}
                      onChange={(e) => setImplementationCost(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenance-cost">Annual Maintenance Cost</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
                    <Input
                      id="maintenance-cost"
                      type="number"
                      className="pl-8 bg-black/50 border-white/10"
                      value={annualMaintenanceCost}
                      onChange={(e) => setAnnualMaintenanceCost(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="time-to-implement">Time to Implement (months)</Label>
                  <span className="text-sm text-white/70">{timeToImplement} months</span>
                </div>
                <Slider
                  id="time-to-implement"
                  min={1}
                  max={24}
                  step={1}
                  value={[timeToImplement]}
                  onValueChange={(value) => setTimeToImplement(value[0])}
                />
              </div>
            </CardContent>
          </Card>

          {/* Expected Benefits */}
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Expected Benefits</CardTitle>
              <CardDescription>Enter the expected benefits from implementing the AI solution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="revenue-increase">Revenue Increase (%)</Label>
                    <span className="text-sm text-white/70">{revenueIncrease}%</span>
                  </div>
                  <Slider
                    id="revenue-increase"
                    min={0}
                    max={30}
                    step={0.1}
                    value={[revenueIncrease]}
                    onValueChange={(value) => setRevenueIncrease(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="cost-reduction">Cost Reduction (%)</Label>
                    <span className="text-sm text-white/70">{costReduction}%</span>
                  </div>
                  <Slider
                    id="cost-reduction"
                    min={0}
                    max={30}
                    step={0.1}
                    value={[costReduction]}
                    onValueChange={(value) => setCostReduction(value[0])}
                  />
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-intangibles">Include Intangible Benefits</Label>
                  <Switch
                    id="include-intangibles"
                    checked={includeIntangibles}
                    onCheckedChange={setIncludeIntangibles}
                  />
                </div>

                {includeIntangibles && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="employee-productivity">Employee Productivity Increase (%)</Label>
                        <span className="text-sm text-white/70">{employeeProductivity}%</span>
                      </div>
                      <Slider
                        id="employee-productivity"
                        min={0}
                        max={30}
                        step={0.1}
                        value={[employeeProductivity]}
                        onValueChange={(value) => setEmployeeProductivity(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="customer-satisfaction">Customer Satisfaction Increase (%)</Label>
                        <span className="text-sm text-white/70">{customerSatisfaction}%</span>
                      </div>
                      <Slider
                        id="customer-satisfaction"
                        min={0}
                        max={30}
                        step={0.1}
                        value={[customerSatisfaction]}
                        onValueChange={(value) => setCustomerSatisfaction(value[0])}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Parameters */}
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Analysis Parameters</CardTitle>
              <CardDescription>Set parameters for the ROI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="time-horizon">Time Horizon (years)</Label>
                    <span className="text-sm text-white/70">{timeHorizon} years</span>
                  </div>
                  <Slider
                    id="time-horizon"
                    min={1}
                    max={10}
                    step={1}
                    value={[timeHorizon]}
                    onValueChange={(value) => setTimeHorizon(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="discount-rate">Discount Rate (%)</Label>
                    <span className="text-sm text-white/70">{discountRate}%</span>
                  </div>
                  <Slider
                    id="discount-rate"
                    min={0}
                    max={20}
                    step={0.5}
                    value={[discountRate]}
                    onValueChange={(value) => setDiscountRate(value[0])}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={resetToDefaults}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button 
                className={`bg-red-600 hover:bg-red-700 ${shouldButtonBlink ? 'animate-attention-pulse' : ''}`} 
                onClick={() => {
                  calculateROI()
                  setShouldButtonBlink(false)
                }} 
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate ROI
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results && (
            <>
              {/* Summary Results */}
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle>ROI Summary</CardTitle>
                  <CardDescription>Key results from the ROI analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-black/20 p-4 rounded-lg">
                      <p className="text-sm text-white/70">Total ROI</p>
                      <p className="text-2xl font-bold">{results.roi.toFixed(1)}%</p>
                      <Badge className="mt-1 bg-green-500/20 text-green-500">
                        {results.roi > 100 ? "Excellent" : results.roi > 50 ? "Good" : "Moderate"}
                      </Badge>
                    </div>

                    <div className="bg-black/20 p-4 rounded-lg">
                      <p className="text-sm text-white/70">Payback Period</p>
                      <p className="text-2xl font-bold">{results.paybackPeriod.toFixed(1)} years</p>
                      <Badge className="mt-1 bg-blue-500/20 text-blue-500">
                        {results.paybackPeriod < 2 ? "Quick" : results.paybackPeriod < 4 ? "Average" : "Long"}
                      </Badge>
                    </div>

                    <div className="bg-black/20 p-4 rounded-lg">
                      <p className="text-sm text-white/70">Net Present Value</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.npv)}</p>
                      <Badge className="mt-1 bg-green-500/20 text-green-500">
                        {results.npv > 0 ? "Positive" : "Negative"}
                      </Badge>
                    </div>

                    <div className="bg-black/20 p-4 rounded-lg">
                      <p className="text-sm text-white/70">Benefit-Cost Ratio</p>
                      <p className="text-2xl font-bold">{results.bcRatio.toFixed(2)}</p>
                      <Badge className="mt-1 bg-green-500/20 text-green-500">
                        {results.bcRatio > 2 ? "Excellent" : results.bcRatio > 1 ? "Good" : "Poor"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cash Flow Chart */}
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle>Cash Flow Analysis</CardTitle>
                  <CardDescription>Projected cash flows over the analysis period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        netCashFlow: {
                          label: "Net Cash Flow",
                          color: "hsl(var(--chart-1))",
                        },
                        cumulativeCashFlow: {
                          label: "Cumulative Cash Flow",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={results.cashFlows} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
                          <YAxis stroke="rgba(255,255,255,0.5)" />
                          <Tooltip />
                          <Bar dataKey="netCashFlow" fill="var(--color-netCashFlow)" name="Net Cash Flow" />
                          <Line
                            type="monotone"
                            dataKey="cumulativeCashFlow"
                            stroke="var(--color-cumulativeCashFlow)"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            name="Cumulative Cash Flow"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* ROI Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-black/30 border-white/10">
                  <CardHeader>
                    <CardTitle>ROI Breakdown</CardTitle>
                    <CardDescription>Contribution of different factors to ROI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={results.roiBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {results.roiBreakdown.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, "Contribution"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-white/10">
                  <CardHeader>
                    <CardTitle>Investment Summary</CardTitle>
                    <CardDescription>Summary of costs and returns</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/70">Initial Investment</span>
                        <span>{formatCurrency(implementationCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Maintenance Costs ({timeHorizon} years)</span>
                        <span>{formatCurrency(annualMaintenanceCost * timeHorizon)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Investment</span>
                        <span className="font-bold">{formatCurrency(results.totalInvestment)}</span>
                      </div>
                      <Separator className="bg-white/10 my-2" />
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Returns</span>
                        <span className="font-bold text-green-500">{formatCurrency(results.totalReturns)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Net Profit</span>
                        <span className="font-bold text-green-500">
                          {formatCurrency(results.totalReturns - results.totalInvestment)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                        <Download className="mr-2 h-4 w-4" />
                        Download Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Cash Flow Table */}
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle>Detailed Cash Flow</CardTitle>
                  <CardDescription>Year-by-year breakdown of cash flows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left p-2">Year</th>
                          <th className="text-right p-2">Revenue Gain</th>
                          <th className="text-right p-2">Cost Savings</th>
                          <th className="text-right p-2">Maintenance</th>
                          {includeIntangibles && <th className="text-right p-2">Intangibles</th>}
                          <th className="text-right p-2">Net Cash Flow</th>
                          <th className="text-right p-2">Cumulative</th>
                          <th className="text-right p-2">ROI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.cashFlows.map((cf: any) => (
                          <tr key={cf.year} className="border-b border-white/10 hover:bg-white/5">
                            <td className="p-2">{cf.year}</td>
                            <td className="text-right p-2">
                              {cf.year === 0 ? "-" : formatCurrency(cf.revenue - (cf.intangibleBenefits || 0))}
                            </td>
                            <td className="text-right p-2">{cf.year === 0 ? "-" : formatCurrency(cf.savings || 0)}</td>
                            <td className="text-right p-2">
                              {cf.year === 0 ? formatCurrency(implementationCost) : formatCurrency(-cf.costs)}
                            </td>
                            {includeIntangibles && (
                              <td className="text-right p-2">
                                {cf.year === 0 ? "-" : formatCurrency(cf.intangibleBenefits || 0)}
                              </td>
                            )}
                            <td className={`text-right p-2 ${cf.netCashFlow >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {formatCurrency(cf.netCashFlow)}
                            </td>
                            <td
                              className={`text-right p-2 ${cf.cumulativeCashFlow >= 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {formatCurrency(cf.cumulativeCashFlow)}
                            </td>
                            <td className="text-right p-2">{cf.year === 0 ? "-" : `${cf.roi.toFixed(1)}%`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 hover:bg-white/5"
                    onClick={() => setActiveTab("inputs")}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Adjust Inputs
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

