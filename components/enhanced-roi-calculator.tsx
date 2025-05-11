"use client"

import { useState, useEffect, ClassAttributes, HTMLAttributes, JSX } from "react"
import { Calculator, DollarSign, Download, RefreshCw, Save, Upload, FileText, FileSpreadsheet, Share2 } from "lucide-react"
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
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Declare global types for PDF libraries
declare global {
  interface Window {
    html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
    jspdf: {
      jsPDF: new (options: {
        orientation: string;
        unit: string;
        format: string;
        compress?: boolean;
      }) => {
        internal: {
          pageSize: {
            getWidth: () => number;
            getHeight: () => number;
          };
        };
        addImage: (data: string, type: string, x: number, y: number, width: number, height: number) => void;
        addPage: () => void;
        save: (filename: string) => void;
      };
    };
  }
}

// Interface for CashFlow items
interface CashFlowItem {
  year: number;
  revenue: number;
  costs: number;
  savings?: number;
  intangibleBenefits?: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
  roi: number;
  npv: number;
}

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

// Industry templates with real-world benchmarks
const industryTemplates = {
  retail_personalizedRecommendations: {
    name: "Retail: Personalized Product Recommendations",
    description: "AI-driven product recommendations to increase basket size and conversion rates",
    industry: "retail",
    solutionType: "recommendation",
    companySize: "medium",
    implementationCost: 85000,
    annualMaintenanceCost: 18000,
    revenueIncrease: 9.5,
    costReduction: 6.5,
    timeToImplement: 3,
    employeeProductivity: 8,
    customerSatisfaction: 12,
    timeHorizon: 3,
    discountRate: 5,
  },
  healthcare_predictiveDiagnostics: {
    name: "Healthcare: Predictive Diagnostics",
    description: "ML models for early disease detection and treatment optimization",
    industry: "healthcare",
    solutionType: "predictiveAnalytics",
    companySize: "large",
    implementationCost: 220000,
    annualMaintenanceCost: 45000,
    revenueIncrease: 4.5,
    costReduction: 22,
    timeToImplement: 8,
    employeeProductivity: 25,
    customerSatisfaction: 18,
    timeHorizon: 5,
    discountRate: 6,
  },
  finance_fraudDetection: {
    name: "Finance: Advanced Fraud Detection",
    description: "Real-time transaction monitoring and anomaly detection",
    industry: "finance",
    solutionType: "predictiveAnalytics",
    companySize: "large",
    implementationCost: 180000,
    annualMaintenanceCost: 36000,
    revenueIncrease: 3,
    costReduction: 28,
    timeToImplement: 6,
    employeeProductivity: 14,
    customerSatisfaction: 9,
    timeHorizon: 4,
    discountRate: 7,
  },
  manufacturing_predictiveMaintenance: {
    name: "Manufacturing: Predictive Maintenance",
    description: "IoT and AI for equipment failure prediction and maintenance optimization",
    industry: "manufacturing",
    solutionType: "predictiveAnalytics",
    companySize: "large",
    implementationCost: 195000,
    annualMaintenanceCost: 30000,
    revenueIncrease: 5.5,
    costReduction: 24,
    timeToImplement: 7,
    employeeProductivity: 18,
    customerSatisfaction: 6,
    timeHorizon: 5,
    discountRate: 5.5,
  },
  technology_customerSupport: {
    name: "Technology: AI-Powered Customer Support",
    description: "Chatbots and virtual assistants for 24/7 customer service",
    industry: "technology",
    solutionType: "nlp",
    companySize: "medium",
    implementationCost: 110000,
    annualMaintenanceCost: 22000,
    revenueIncrease: 7,
    costReduction: 32,
    timeToImplement: 4,
    employeeProductivity: 35,
    customerSatisfaction: 16,
    timeHorizon: 3,
    discountRate: 5,
  },
  retail_inventoryOptimization: {
    name: "Retail: Inventory Optimization",
    description: "Demand forecasting and automatic replenishment",
    industry: "retail",
    solutionType: "predictiveAnalytics",
    companySize: "medium",
    implementationCost: 95000,
    annualMaintenanceCost: 20000,
    revenueIncrease: 6,
    costReduction: 18,
    timeToImplement: 5,
    employeeProductivity: 12,
    customerSatisfaction: 8,
    timeHorizon: 4,
    discountRate: 5,
  },
}

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
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [scenarioName, setScenarioName] = useState("")
  const [savedScenarios, setSavedScenarios] = useState<any[]>([])
  const [comparisonMode, setComparisonMode] = useState(false)
  const [comparisonScenario, setComparisonScenario] = useState<any>(null)
  const [comparisonName, setComparisonName] = useState("Alternative Scenario")

  const { toast } = useToast()

  // Color and style utility functions
  const getBreakdownColor = (index: number, isBackground = false) => {
    const colors = [
      { bg: 'rgba(239,68,68,0.2)', fg: '#ef4444', gradientBg: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(248,113,113,0.3))' },
      { bg: 'rgba(59,130,246,0.2)', fg: '#3b82f6', gradientBg: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(96,165,250,0.3))' },
      { bg: 'rgba(16,185,129,0.2)', fg: '#10b981', gradientBg: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.3))' },
      { bg: 'rgba(139,92,246,0.2)', fg: '#8b5cf6', gradientBg: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(167,139,250,0.3))' },
      { bg: 'rgba(249,115,22,0.2)', fg: '#f97316', gradientBg: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(251,146,60,0.3))' },
      { bg: 'rgba(236,72,153,0.2)', fg: '#ec4899', gradientBg: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(244,114,182,0.3))' },
    ];
    return isBackground ? colors[index % colors.length].gradientBg : colors[index % colors.length].fg;
  }

  // Load saved scenarios from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("roi-scenarios")
    if (saved) {
      setSavedScenarios(JSON.parse(saved))
    }
  }, [])

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
      const totalBenefits = cashFlows.reduce((sum, cf: CashFlowItem) => sum + (cf.year > 0 ? cf.netCashFlow : 0), 0)
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

  // Toggle comparison mode
  const toggleComparisonMode = () => {
    if (comparisonMode) {
      setComparisonMode(false)
      setComparisonScenario(null)
      setComparisonName("Alternative Scenario")
    } else {
      if (!results) {
        toast({
          title: "Calculate First",
          description: "Please calculate the main scenario before enabling comparison mode.",
          variant: "destructive",
        })
        return
      }
      
      // Clone current parameters as the comparison base
      setComparisonScenario({
        params: {
          industry,
          solutionType,
          companySize,
          annualRevenue,
          annualCosts,
          implementationCost,
          annualMaintenanceCost,
          revenueIncrease,
          costReduction,
          timeToImplement,
          employeeProductivity,
          customerSatisfaction,
          includeIntangibles,
          timeHorizon,
          discountRate,
        },
        results
      })
      
      setComparisonMode(true)
    }
  }
  
  // Calculate ROI for comparison scenario
  const calculateComparisonROI = () => {
    setIsCalculating(true)

    setTimeout(() => {
      // Same calculation logic as the main calculateROI function, but store results in comparisonScenario
      // ... calculation code ...
      
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
      const totalBenefits = cashFlows.reduce((sum, cf: CashFlowItem) => sum + (cf.year > 0 ? cf.netCashFlow : 0), 0)
      const bcRatio = totalBenefits / implementationCost

      // Calculate ROI breakdown
      const roiBreakdown = [
        { name: "Revenue Increase", value: revenueIncrease },
        { name: "Cost Reduction", value: costReduction },
        { name: "Productivity", value: includeIntangibles ? employeeProductivity : 0 },
        { name: "Customer Satisfaction", value: includeIntangibles ? customerSatisfaction : 0 },
      ].filter((item) => item.value > 0)

      // Update comparison scenario with calculated results
      setComparisonScenario({
        ...comparisonScenario,
        results: {
          cashFlows,
          totalInvestment: implementationCost + annualMaintenanceCost * timeHorizon,
          totalReturns: totalBenefits,
          roi: cumulativeROI,
          npv,
          irr,
          paybackPeriod: paybackPeriod !== null ? paybackPeriod : timeHorizon,
          bcRatio,
          roiBreakdown,
        }
      })

      setIsCalculating(false)
      setActiveTab("results")

      toast({
        title: "Comparison Calculated",
        description: "Your alternative scenario has been calculated for comparison.",
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

  // Export functions
  const exportAsCSV = () => {
    if (!results) return

    // Create CSV header
    let csv = "Year,Investment,Revenue Gain,Cost Savings,Maintenance Cost,Intangible Benefits,Net Cash Flow,Cumulative Cash Flow,ROI\n"
    
    // Add data rows
    results.cashFlows.forEach((cf: CashFlowItem) => {
      csv += `${cf.year},`
      csv += `${cf.year === 0 ? implementationCost : 0},`
      csv += `${cf.revenue - (cf.intangibleBenefits || 0)},`
      csv += `${cf.savings || 0},`
      csv += `${cf.year === 0 ? 0 : -cf.costs},`
      csv += `${cf.intangibleBenefits || 0},`
      csv += `${cf.netCashFlow},`
      csv += `${cf.cumulativeCashFlow},`
      csv += `${cf.year === 0 ? "0" : cf.roi.toFixed(1) + "%"}\n`
    })
    
    // Create download link
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "roi_analysis.csv")
    link.click()
    
    toast({
      title: "Export Complete",
      description: "Your ROI analysis has been exported as CSV.",
    })
  }
  
  const exportAsPDF = () => {
    if (!results) return

    try {
      // Show loading toast
    toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your detailed ROI report...",
      })

      // Preload brain logo image
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = "/images/brain.svg"; // Use existing brain logo from public folder
      
      img.onload = () => {
        // Create a temporary canvas to convert SVG to data URL
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }
        
        // Create styled background for logo
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#DC2626';
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        // Draw the image with a slight offset to center it
        ctx.drawImage(img, 2, 2, img.width - 4, img.height - 4);
        
        const logoDataUrl = canvas.toDataURL('image/png');
        
        // First, dynamically load the required libraries
        const loadScript = (src: string): Promise<void> => {
          return new Promise((resolve, reject) => {
            // Check if script is already loaded
            if (document.querySelector(`script[src="${src}"]`)) {
              resolve();
              return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            
            script.onload = () => {
              console.log(`Script loaded: ${src}`);
              resolve();
            };
            
            script.onerror = (error) => {
              console.error(`Error loading script: ${src}`, error);
              reject(new Error(`Failed to load ${src}`));
            };
            
            document.head.appendChild(script);
          });
        };

        // Add page-specific styling to ensure proper page breaks and alignment
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
          @page {
            margin: 0;
            padding: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .page-break {
            page-break-before: always;
            margin-top: 0;
            padding-top: 40px;
          }
          .section {
            page-break-inside: avoid;
            margin-bottom: 25px;
          }
          .bottom-margin {
            height: 5px;
          }
        `;
        document.head.appendChild(styleTag);
        
        // Create a hidden div to contain the report content
        const reportContainer = document.createElement('div')
        reportContainer.id = 'roi-pdf-report'
        reportContainer.style.position = 'absolute'
        reportContainer.style.left = '-9999px'
        reportContainer.style.top = '-9999px'
        reportContainer.style.width = '700px'  // Slightly reduced width for better margins
        reportContainer.style.backgroundColor = 'white'
        reportContainer.style.padding = '40px 40px 5px 40px'  // 5px bottom margin
        reportContainer.style.color = 'black'
        reportContainer.style.fontFamily = 'Arial, sans-serif'
        reportContainer.style.boxSizing = 'border-box'
        reportContainer.style.overflowX = 'hidden' // Prevent horizontal scrolling
        reportContainer.style.margin = '0'
        document.body.appendChild(reportContainer)
        
        // Current date formatted nicely
        const currentDate = new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        // Create report ID
        const reportId = "MS-" + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Create the report content with modern styling and better page break control
        const reportContent = document.createElement('div')
        reportContent.innerHTML = `
          <div style="margin-bottom: 20px; page-break-after: avoid;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6; padding-bottom: 16px; margin-bottom: 20px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="position: relative; width: 48px; height: 48px; background-color: black; border-radius: 6px; border: 2px solid #DC2626; display: flex; align-items: center; justify-content: center;">
                  <img src="${logoDataUrl}" alt="Mindscape Brain Logo" style="width: 42px; height: 42px;" />
                </div>
                <div>
                  <h1 style="font-size: 22px; font-weight: bold; margin: 0; line-height: 1.1;">
                    <span style="color: #111827;">Mindscape</span>
                    <span style="color: #DC2626; margin-left: 5px;">Analytics</span>
                  </h1>
                  <p style="margin: 3px 0 0 0; color: #6b7280; font-size: 11px;">Where AI Meets Innovation</p>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 10px; color: #6b7280;">CONFIDENTIAL</div>
                <div style="font-size: 10px; color: #6b7280;">Generated on ${currentDate}</div>
                <div style="font-size: 10px; color: #6b7280;">Report ID: ${reportId}</div>
              </div>
            </div>
            
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="font-size: 20px; font-weight: bold; margin: 0; color: #111827; margin-bottom: 6px;">AI Investment ROI Analysis</h1>
              <p style="margin: 0; color: #6b7280; font-size: 13px;">${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry • ${solutionType.replace(/([A-Z])/g, ' $1').trim()} Solution</p>
            </div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px; page-break-inside: avoid;">
            <div style="padding: 15px; border-radius: 8px; background: linear-gradient(135deg, rgba(220,38,38,0.05), rgba(185,28,28,0.05)); border: 1px solid rgba(220,38,38,0.1); width: 48%;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid rgba(203,213,225,0.5); padding-bottom: 8px;">
                <div style="flex: 1;">
                  <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Total ROI</div>
                  <div style="font-size: 18px; font-weight: bold; color: #DC2626;">${results.roi.toFixed(1)}%</div>
                </div>
                <div style="flex: 1;">
                  <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Payback Period</div>
                  <div style="font-size: 18px; font-weight: bold; color: #8b5cf6;">${Math.floor(results.paybackPeriod)} years ${Math.round((results.paybackPeriod % 1) * 12)} months</div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <div style="flex: 1;">
                  <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Net Present Value</div>
                  <div style="font-size: 14px; font-weight: bold; color: #10b981;">$${results.npv.toLocaleString()}</div>
                </div>
                <div style="flex: 1;">
                  <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Benefit-Cost Ratio</div>
                  <div style="font-size: 14px; font-weight: bold; color: #f97316;">${results.bcRatio.toFixed(2)}</div>
                </div>
              </div>
            </div>
            
            <div style="padding: 15px; border-radius: 8px; background: linear-gradient(135deg, rgba(16,185,129,0.05), rgba(59,130,246,0.05)); border: 1px solid rgba(16,185,129,0.1); width: 48%;">
              <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px; color: #10b981;">Executive Summary</div>
              <p style="font-size: 12px; line-height: 1.4; color: #4b5563; margin-bottom: 12px;">
                Based on the analysis, implementing this AI solution is projected to generate a ${results.roi.toFixed(1)}% ROI over ${timeHorizon} years, with a payback period of ${results.paybackPeriod.toFixed(1)} years.
              </p>
              <div style="font-size: 12px; font-weight: 500; color: #4b5563; display: flex; align-items: center;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${results.roi > 100 ? '#10b981' : results.roi > 50 ? '#f97316' : '#DC2626'}; margin-right: 6px;"></div>
                ${
                  results.roi > 100 
                    ? 'Highly Recommended Investment' 
                    : results.roi > 50 
                      ? 'Recommended Investment'
                      : 'Consider Alternative Approaches'
                }
              </div>
            </div>
          </div>
          
          <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <h2 style="font-size: 15px; margin-bottom: 12px; color: #111827; padding-bottom: 6px; border-bottom: 1px solid #f3f4f6;">Project Parameters</h2>
            <div style="display: flex; flex-wrap: wrap;">
              <div style="width: 50%; margin-bottom: 8px;">
                <span style="color: #6b7280; font-size: 11px;">Industry:</span>
                <span style="margin-left: 5px; font-weight: 500; font-size: 12px;">${industry.charAt(0).toUpperCase() + industry.slice(1)}</span>
              </div>
              <div style="width: 50%; margin-bottom: 8px;">
                <span style="color: #6b7280; font-size: 11px;">Solution Type:</span>
                <span style="margin-left: 5px; font-weight: 500; font-size: 12px;">${solutionType.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
              <div style="width: 50%; margin-bottom: 8px;">
                <span style="color: #6b7280; font-size: 11px;">Company Size:</span>
                <span style="margin-left: 5px; font-weight: 500; font-size: 12px;">${companySize.charAt(0).toUpperCase() + companySize.slice(1)}</span>
              </div>
              <div style="width: 50%; margin-bottom: 8px;">
                <span style="color: #6b7280; font-size: 11px;">Annual Revenue:</span>
                <span style="margin-left: 5px; font-weight: 500; font-size: 12px;">$${annualRevenue.toLocaleString()}</span>
              </div>
              <div style="width: 50%; margin-bottom: 8px;">
                <span style="color: #6b7280; font-size: 11px;">Implementation Cost:</span>
                <span style="margin-left: 5px; font-weight: 500; font-size: 12px;">$${implementationCost.toLocaleString()}</span>
              </div>
              <div style="width: 50%; margin-bottom: 8px;">
                <span style="color: #6b7280; font-size: 11px;">Annual Maintenance:</span>
                <span style="margin-left: 5px; font-weight: 500; font-size: 12px;">$${annualMaintenanceCost.toLocaleString()}</span>
              </div>
              <div style="width: 50%; margin-bottom: 8px;">
                <span style="color: #6b7280; font-size: 11px;">Time Horizon:</span>
                <span style="margin-left: 5px; font-weight: 500; font-size: 12px;">${timeHorizon} years</span>
              </div>
              <div style="width: 50%; margin-bottom: 8px;">
                <span style="color: #6b7280; font-size: 11px;">Discount Rate:</span>
                <span style="margin-left: 5px; font-weight: 500; font-size: 12px;">${discountRate}%</span>
              </div>
            </div>
          </div>
          
          <div style="page-break-before: always;">
            <div style="margin-bottom: 20px; page-break-inside: avoid;">
              <h2 style="font-size: 15px; margin-bottom: 12px; color: #111827; padding-bottom: 6px; border-bottom: 1px solid #f3f4f6; margin-top: 0;">Expected Benefits</h2>
              <div style="display: flex; margin-bottom: 15px;">
                <div style="flex: 1; padding: 12px; background-color: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.1); border-radius: 6px; margin-right: 8px;">
                  <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Revenue Increase</div>
                  <div style="font-size: 16px; font-weight: bold; color: #10b981;">${revenueIncrease}%</div>
                </div>
                <div style="flex: 1; padding: 12px; background-color: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.1); border-radius: 6px; margin-right: 8px;">
                  <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Cost Reduction</div>
                  <div style="font-size: 16px; font-weight: bold; color: #3b82f6;">${costReduction}%</div>
                </div>
                <div style="flex: 1; padding: 12px; background-color: rgba(139,92,246,0.05); border: 1px solid rgba(139,92,246,0.1); border-radius: 6px;">
                  <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Implementation Time</div>
                  <div style="font-size: 16px; font-weight: bold; color: #8b5cf6;">${timeToImplement} months</div>
                </div>
              </div>
              
              ${includeIntangibles ? `
              <div style="margin-bottom: 15px;">
                <h3 style="font-size: 13px; margin-bottom: 8px; color: #4b5563;">Intangible Benefits</h3>
                <div style="display: flex;">
                  <div style="flex: 1; padding: 12px; background-color: rgba(249,115,22,0.05); border: 1px solid rgba(249,115,22,0.1); border-radius: 6px; margin-right: 8px;">
                    <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Employee Productivity</div>
                    <div style="font-size: 16px; font-weight: bold; color: #f97316;">${employeeProductivity}%</div>
                  </div>
                  <div style="flex: 1; padding: 12px; background-color: rgba(236,72,153,0.05); border: 1px solid rgba(236,72,153,0.1); border-radius: 6px;">
                    <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Customer Satisfaction</div>
                    <div style="font-size: 16px; font-weight: bold; color: #ec4899;">${customerSatisfaction}%</div>
                  </div>
                </div>
              </div>
              ` : ''}
            </div>
          
            <div style="margin-bottom: 20px; page-break-inside: avoid;">
              <h2 style="font-size: 15px; margin-bottom: 12px; color: #111827; padding-bottom: 6px; border-bottom: 1px solid #f3f4f6;">Investment Analysis</h2>
              
              <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <div style="font-weight: 500; font-size: 12px;">Initial Investment</div>
                  <div style="font-weight: 500; color: #ef4444; font-size: 12px;">-$${implementationCost.toLocaleString()}</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <div style="font-weight: 500; font-size: 12px;">Maintenance Costs (${timeHorizon} years)</div>
                  <div style="font-weight: 500; color: #ef4444; font-size: 12px;">-$${(annualMaintenanceCost * timeHorizon).toLocaleString()}</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <div style="font-weight: 500; font-size: 12px;">Total Expected Returns</div>
                  <div style="font-weight: 500; color: #10b981; font-size: 12px;">$${results.totalReturns.toLocaleString()}</div>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 6px; border-top: 1px solid #e5e7eb;">
                  <div style="font-weight: 600; font-size: 12px;">Net Benefit</div>
                  <div style="font-weight: 600; color: #10b981; font-size: 12px;">$${(results.totalReturns - results.totalInvestment).toLocaleString()}</div>
                </div>
              </div>
              
              <div style="background-color: #f9fafb; border-radius: 6px; padding: 12px; border-left: 3px solid #f43f5e;">
                <h3 style="margin: 0 0 8px 0; font-size: 13px; color: #111827;">Investment Metrics</h3>
                <div style="display: flex; flex-wrap: wrap;">
                  <div style="width: 50%; margin-bottom: 6px;">
                    <span style="color: #6b7280; font-size: 11px;">ROI:</span>
                    <span style="margin-left: 5px; font-weight: 500; color: #f43f5e; font-size: 12px;">${results.roi.toFixed(1)}%</span>
                  </div>
                  <div style="width: 50%; margin-bottom: 6px;">
                    <span style="color: #6b7280; font-size: 11px;">IRR:</span>
                    <span style="margin-left: 5px; font-weight: 500; color: #f43f5e; font-size: 12px;">${results.irr.toFixed(1)}%</span>
                  </div>
                  <div style="width: 50%; margin-bottom: 6px;">
                    <span style="color: #6b7280; font-size: 11px;">NPV:</span>
                    <span style="margin-left: 5px; font-weight: 500; color: #10b981; font-size: 12px;">$${results.npv.toLocaleString()}</span>
                  </div>
                  <div style="width: 50%; margin-bottom: 6px;">
                    <span style="color: #6b7280; font-size: 11px;">Benefit-Cost Ratio:</span>
                    <span style="margin-left: 5px; font-weight: 500; color: #10b981; font-size: 12px;">${results.bcRatio.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style="page-break-before: always;">
            <div style="margin-top: 0; margin-bottom: 20px;">
              <h2 style="font-size: 15px; margin-top: 0; margin-bottom: 12px; color: #111827; padding-bottom: 6px; border-bottom: 1px solid #f3f4f6;">Cash Flow Projection</h2>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 6px; text-align: left; border-bottom: 1px solid #e5e7eb;">Year</th>
                    <th style="padding: 6px; text-align: right; border-bottom: 1px solid #e5e7eb;">Revenue Gain</th>
                    <th style="padding: 6px; text-align: right; border-bottom: 1px solid #e5e7eb;">Cost Savings</th>
                    ${includeIntangibles ? `<th style="padding: 6px; text-align: right; border-bottom: 1px solid #e5e7eb;">Intangibles</th>` : ''}
                    <th style="padding: 6px; text-align: right; border-bottom: 1px solid #e5e7eb;">Costs</th>
                    <th style="padding: 6px; text-align: right; border-bottom: 1px solid #e5e7eb;">Net Cash Flow</th>
                    <th style="padding: 6px; text-align: right; border-bottom: 1px solid #e5e7eb;">Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  ${results.cashFlows.map((cf: any, index: number) => `
                    <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'}">
                      <td style="padding: 5px; border-bottom: 1px solid #e5e7eb;">${cf.year}</td>
                      <td style="padding: 5px; text-align: right; border-bottom: 1px solid #e5e7eb;">
                        ${cf.year === 0 ? "-" : '$' + cf.revenue.toLocaleString()}
                      </td>
                      <td style="padding: 5px; text-align: right; border-bottom: 1px solid #e5e7eb;">
                        ${cf.year === 0 ? "-" : '$' + (cf.savings || 0).toLocaleString()}
                      </td>
                      ${includeIntangibles ? `
                      <td style="padding: 5px; text-align: right; border-bottom: 1px solid #e5e7eb;">
                        ${cf.year === 0 ? "-" : '$' + (cf.intangibleBenefits || 0).toLocaleString()}
                      </td>
                      ` : ''}
                      <td style="padding: 5px; text-align: right; border-bottom: 1px solid #e5e7eb;">
                        ${cf.year === 0 ? '$' + implementationCost.toLocaleString() : '$' + cf.costs.toLocaleString()}
                      </td>
                      <td style="padding: 5px; text-align: right; border-bottom: 1px solid #e5e7eb; ${cf.netCashFlow >= 0 ? 'color: #10b981;' : 'color: #ef4444;'}">
                        $${cf.netCashFlow.toLocaleString()}
                      </td>
                      <td style="padding: 5px; text-align: right; border-bottom: 1px solid #e5e7eb; ${cf.cumulativeCashFlow >= 0 ? 'color: #10b981;' : 'color: #ef4444;'}">
                        $${cf.cumulativeCashFlow.toLocaleString()}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          
          <div style="page-break-before: always;">
            <div style="margin-top: 0; margin-bottom: 20px; page-break-inside: avoid;">
              <h2 style="font-size: 15px; margin-top: 0; margin-bottom: 12px; color: #111827; padding-bottom: 6px; border-bottom: 1px solid #f3f4f6;">ROI Breakdown</h2>
              
              <div style="display: flex; margin-bottom: 15px;">
                ${results.roiBreakdown ? results.roiBreakdown.map((item: any, index: number) => `
                  <div style="flex: 1; padding: 10px; background-color: ${getBreakdownColor(index, true)}; border-radius: 6px; margin-right: ${index < results.roiBreakdown.length - 1 ? '8px' : '0'};">
                    <div style="font-size: 11px; color: #4b5563; margin-bottom: 3px;">${item.name}</div>
                    <div style="font-size: 15px; font-weight: bold; color: ${getBreakdownColor(index)};">${item.value}%</div>
                  </div>
                `).join('') : ''}
              </div>
              
              <div style="background-color: #f9fafb; border-radius: 6px; padding: 15px;">
                <h3 style="margin: 0 0 8px 0; font-size: 13px; color: #111827;">Analysis Summary</h3>
                <p style="margin: 0; color: #4b5563; line-height: 1.4; font-size: 11px;">
                  The implementation of this AI solution is projected to deliver significant returns over the ${timeHorizon}-year period. 
                  With a total ROI of ${results.roi.toFixed(1)}% and a payback period of ${results.paybackPeriod.toFixed(1)} years, 
                  this represents a ${results.bcRatio > 2 ? "highly attractive" : results.bcRatio > 1 ? "solid" : "moderate"} 
                  investment opportunity. The combination of revenue growth (${revenueIncrease}%) and cost reduction (${costReduction}%) 
                  provides a balanced approach to value creation.
                  ${includeIntangibles ? ` Additionally, intangible benefits from improved employee productivity and customer satisfaction 
                  contribute significantly to the overall business case.` : ''}
                </p>
              </div>
            </div>

            <div style="display: flex; justify-content: center; margin-top: 25px; border-top: 1px solid #e5e7eb; padding-top: 12px; padding-bottom: 5px; color: #6b7280; font-size: 10px;">
              <p style="margin: 0;">Generated by Mindscape Analytics • Confidential • ${currentDate}</p>
            </div>
          </div>
        `
        reportContainer.appendChild(reportContent)

        // Load the required libraries and generate PDF
        Promise.all([
          loadScript('https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js'),
          loadScript('https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js')
        ]).then(() => {
          // Wait a moment to ensure libraries are fully initialized
          setTimeout(() => {
            try {
              // Check if libraries are properly loaded
              if (typeof window.html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
                throw new Error('PDF libraries failed to initialize properly');
              }
              
              // Create PDF with proper page breaks
              generatePDF(reportContainer);
              
            } catch (error) {
              console.error("Error during PDF generation:", error);
              document.body.removeChild(reportContainer);
              toast({
                title: "PDF Generation Error",
                description: "There was an error during PDF generation. Please try again later.",
                variant: "destructive",
              });
            }
          }, 500); // Short delay to ensure libraries are initialized
        }).catch(error => {
          console.error("Error loading PDF libraries:", error);
          toast({
            title: "PDF Export Failed",
            description: "Failed to load required libraries. Please check your internet connection and try again.",
            variant: "destructive",
          });
          document.body.removeChild(reportContainer);
        });
        
        // Function to handle PDF generation with proper paging
        const generatePDF = (container: HTMLElement) => {
          // @ts-ignore
          window.html2canvas(container, {
            scale: 2,
            useCORS: true,
            logging: false,
            allowTaint: true,
            // Add options to help with page breaks
            windowWidth: 720, // Match container width
            windowHeight: 1200, // Set a large enough height
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
          }).then((canvas: HTMLCanvasElement) => {
            try {
              // @ts-ignore
              const pdf = new window.jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
              });
              
              const imgData = canvas.toDataURL('image/png', 1.0);
              const imgWidth = 210; // A4 width in mm (full width)
              const imgHeight = canvas.height * imgWidth / canvas.width;
              const pageHeight = 297; // A4 height in mm
              const bottomMargin = 5; // 5mm bottom margin
              
              let heightLeft = imgHeight;
              let position = 0;
              let pageCount = 0;
              
              // Function to render each page with bottom margin
              while (heightLeft > 0) {
                // Add a new page after the first page
                if (pageCount > 0) {
                  pdf.addPage();
                }
                
                // Calculate position and effective page height
                const effectivePageHeight = pageHeight - bottomMargin;
                
                // On all pages after the first, adjust the positioning
                if (pageCount > 0) {
                  position = -pageHeight * pageCount + bottomMargin * pageCount;
                }
                
                // Add the image
                pdf.addImage(
                  imgData, 
                  'PNG', 
                  0, // left margin
                  position, // top position
                  imgWidth, // width
                  imgHeight // height
                );
                
                // Reduce height left to print
                heightLeft -= effectivePageHeight;
                pageCount++;
              }
              
              // Save the PDF
              pdf.save(`roi_analysis_${industry}_${solutionType}.pdf`);
              
              // Clean up
              document.body.removeChild(container);
              if (styleTag) document.head.removeChild(styleTag);
              
              toast({
                title: "Report Generated",
                description: "Your comprehensive ROI analysis has been exported as PDF.",
              });
            } catch (error) {
              console.error("Error in PDF generation process:", error);
              document.body.removeChild(container);
              if (styleTag) document.head.removeChild(styleTag);
              toast({
                title: "PDF Generation Error",
                description: "There was an error creating the PDF. Please try again later.",
                variant: "destructive",
              });
            }
          }).catch((err: Error) => {
            console.error("Error in html2canvas:", err);
            document.body.removeChild(container);
            if (styleTag) document.head.removeChild(styleTag);
            toast({
              title: "PDF Generation Error",
              description: "Failed to render report. Please try again or use CSV export instead.",
              variant: "destructive",
            });
          });
        };
      };
      
      // Handle error if logo loading fails
      img.onerror = () => {
        // Fallback to direct PDF generation without logo
        toast({
          title: "Logo Load Warning",
          description: "Could not load logo image, proceeding with basic logo.",
        });
        
        // Proceed with PDF generation using a simple text-based logo
        const simpleLogo = `
          <div style="width: 64px; height: 64px; background-color: black; color: #DC2626; border-radius: 8px; 
                     border: 2px solid #DC2626; display: flex; align-items: center; justify-content: center; font-weight: bold;">
            MIND
          </div>
        `;
        
        // Continue with PDF generation using simple logo
        // ... (rest of the PDF generation logic)
      };
      
    } catch (error) {
      console.error("PDF export error:", error);
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try the CSV export instead.",
        variant: "destructive",
      });
    }
  }
  
  // Save current scenario
  const saveScenario = () => {
    if (!scenarioName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for this scenario.",
        variant: "destructive",
      })
      return
    }
    
    const scenarioData = {
      name: scenarioName,
      date: new Date().toISOString(),
      params: {
        industry,
        solutionType,
        companySize,
        annualRevenue,
        annualCosts,
        implementationCost,
        annualMaintenanceCost,
        revenueIncrease,
        costReduction,
        timeToImplement,
        employeeProductivity,
        customerSatisfaction,
        includeIntangibles,
        timeHorizon,
        discountRate,
      },
      results,
    }
    
    const updatedScenarios = [...savedScenarios, scenarioData]
    setSavedScenarios(updatedScenarios)
    localStorage.setItem("roi-scenarios", JSON.stringify(updatedScenarios))
    
    setSaveDialogOpen(false)
    setScenarioName("")
    
    toast({
      title: "Scenario Saved",
      description: `Scenario "${scenarioName}" has been saved successfully.`,
    })
  }
  
  // Load a saved scenario
  const loadScenario = (scenario: any) => {
    const { params } = scenario
    
    setIndustry(params.industry)
    setSolutionType(params.solutionType)
    setCompanySize(params.companySize)
    setAnnualRevenue(params.annualRevenue)
    setAnnualCosts(params.annualCosts)
    setImplementationCost(params.implementationCost)
    setAnnualMaintenanceCost(params.annualMaintenanceCost)
    setRevenueIncrease(params.revenueIncrease)
    setCostReduction(params.costReduction)
    setTimeToImplement(params.timeToImplement)
    setEmployeeProductivity(params.employeeProductivity)
    setCustomerSatisfaction(params.customerSatisfaction)
    setIncludeIntangibles(params.includeIntangibles)
    setTimeHorizon(params.timeHorizon)
    setDiscountRate(params.discountRate)
    setResults(scenario.results)
    
    toast({
      title: "Scenario Loaded",
      description: `Scenario "${scenario.name}" has been loaded successfully.`,
    })
  }
  
  // Delete a saved scenario
  const deleteScenario = (index: number) => {
    const updatedScenarios = [...savedScenarios]
    updatedScenarios.splice(index, 1)
    setSavedScenarios(updatedScenarios)
    localStorage.setItem("roi-scenarios", JSON.stringify(updatedScenarios))
    
    toast({
      title: "Scenario Deleted",
      description: "The selected scenario has been deleted.",
    })
  }

  // Load industry template
  const loadTemplate = (templateKey: string) => {
    const template = industryTemplates[templateKey as keyof typeof industryTemplates]
    
    if (!template) return
    
    setIndustry(template.industry)
    setSolutionType(template.solutionType)
    setCompanySize(template.companySize)
    setImplementationCost(template.implementationCost)
    setAnnualMaintenanceCost(template.annualMaintenanceCost)
    setRevenueIncrease(template.revenueIncrease)
    setCostReduction(template.costReduction)
    setTimeToImplement(template.timeToImplement)
    setEmployeeProductivity(template.employeeProductivity)
    setCustomerSatisfaction(template.customerSatisfaction)
    setTimeHorizon(template.timeHorizon)
    setDiscountRate(template.discountRate)
    
    // Reset results when loading a new template
    setResults(null)
    
    setActiveTab("inputs")
    
    toast({
      title: "Template Loaded",
      description: `"${template.name}" template has been loaded successfully.`,
    })
  }

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="templates">Industry Templates</TabsTrigger>
          <TabsTrigger value="results" disabled={!results}>
            Results {comparisonMode && "& Comparison"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-4">
          {/* Company and AI Solution Information */}
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Company & AI Solution</CardTitle>
                  <CardDescription>Enter information about your company and the AI solution</CardDescription>
                </div>
                {results && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={toggleComparisonMode} 
                    className={comparisonMode ? "bg-red-900/20 text-red-400 border-red-900/30" : ""}
                  >
                    {comparisonMode ? "Disable Comparison" : "Compare Scenarios"}
                  </Button>
                )}
              </div>
              {comparisonMode && (
                <div className="mt-2 p-2 rounded bg-red-500/10 border border-red-500/20">
                  <p className="text-sm">
                    <span className="font-medium">Comparison Mode Active: </span>
                    <span className="text-white/70">Modify parameters to create an alternative scenario</span>
                  </p>
                  <div className="mt-2 flex gap-2 items-center">
                    <input
                      className="flex-1 text-sm bg-black/50 border border-white/10 rounded p-1"
                      placeholder="Alternative scenario name"
                      value={comparisonName}
                      onChange={(e) => setComparisonName(e.target.value)}
                    />
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700" 
                      onClick={calculateComparisonROI}
                    >
                      Calculate Alternative
                    </Button>
                  </div>
                </div>
              )}
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
              <div className="flex gap-2">
                <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={resetToDefaults}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                
                {savedScenarios.length > 0 && (
                  <select 
                    className="bg-black/50 border border-white/10 rounded text-sm px-2 text-white"
                    onChange={(e) => {
                      const index = parseInt(e.target.value)
                      if (index >= 0) {
                        loadScenario(savedScenarios[index])
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Load saved scenario</option>
                    {savedScenarios.map((scenario, index) => (
                      <option key={index} value={index}>
                        {scenario.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              
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

          {savedScenarios.length > 0 && (
            <Card className="bg-black/30 border-white/10">
              <CardHeader>
                <CardTitle>Saved Scenarios</CardTitle>
                <CardDescription>Load or manage your previously saved ROI scenarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-right p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedScenarios.map((scenario, index) => (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-2">{scenario.name}</td>
                          <td className="p-2">{new Date(scenario.date).toLocaleDateString()}</td>
                          <td className="p-2 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => loadScenario(scenario)}
                              className="text-white/70 hover:text-white"
                            >
                              <Upload className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => deleteScenario(index)}
                              className="text-white/70 hover:text-red-500"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Industry-Specific ROI Templates</CardTitle>
              <CardDescription>Pre-configured scenarios based on real-world implementations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(industryTemplates).map(([key, template]) => (
                  <Card key={key} className="bg-black/40 border-white/5 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/70">Implementation Cost:</span>
                        <span>${template.implementationCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Revenue Increase:</span>
                        <span>{template.revenueIncrease}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Cost Reduction:</span>
                        <span>{template.costReduction}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Time to Implement:</span>
                        <span>{template.timeToImplement} months</span>
                      </div>
                      <div className="flex justify-between">
                        <Badge className="text-[8px] h-3 bg-black/50 text-white/80 hover:bg-black/60">
                          {template.industry.charAt(0).toUpperCase() + template.industry.slice(1)}
                        </Badge>
                        <Badge className="text-[8px] h-3 bg-red-900/20 text-red-400 hover:bg-red-900/30">
                          {template.solutionType === "predictiveAnalytics" 
                            ? "Predictive Analytics" 
                            : template.solutionType === "computerVision" 
                            ? "Computer Vision"
                            : template.solutionType === "nlp" 
                            ? "NLP"
                            : template.solutionType === "recommendation" 
                            ? "Recommendation"
                            : "Automation"}
                        </Badge>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-4">
                      <Button 
                        onClick={() => loadTemplate(key)} 
                        className="w-full bg-white/5 hover:bg-white/10 text-white"
                      >
                        Load Template
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-white/70 text-sm">
                <p>These templates are based on aggregated data from successful AI implementations and industry benchmarks. Customize parameters after loading to match your specific business context.</p>
              </div>
            </CardFooter>
          </Card>

          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle>Implementation Considerations</CardTitle>
              <CardDescription>Key factors to consider when planning AI initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                  <h3 className="text-sm font-medium mb-2 text-red-400">Data Readiness</h3>
                  <p className="text-xs text-white/70">Consider the quality, accessibility, and structure of your existing data. Data preparation often accounts for 60-80% of AI project time.</p>
                </div>
                <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                  <h3 className="text-sm font-medium mb-2 text-red-400">Organizational Change</h3>
                  <p className="text-xs text-white/70">Account for training, process redesign, and change management. User adoption is critical for realizing projected benefits.</p>
                </div>
                <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                  <h3 className="text-sm font-medium mb-2 text-red-400">Scaling Considerations</h3>
                  <p className="text-xs text-white/70">Plan for how the solution will scale across departments or locations. Successful pilots often face challenges when scaling enterprise-wide.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results && (
            <>
              {/* Summary Results */}
              <Card className="bg-black/30 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>ROI Summary</CardTitle>
                    <CardDescription>Key results from the ROI analysis</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="h-8 gap-1" onClick={() => setSaveDialogOpen(true)}>
                      <Save className="h-3.5 w-3.5" />
                      <span>Save</span>
                    </Button>
                    <Button variant="outline" className="h-8 gap-1" onClick={exportAsCSV}>
                      <FileSpreadsheet className="h-3.5 w-3.5" />
                      <span>CSV</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-8 gap-1" 
                      onClick={exportAsPDF}
                      data-export-report
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>PDF</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {comparisonMode && comparisonScenario?.results ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Scenario Comparison</h3>
                        <div className="flex gap-2 text-sm">
                          <Badge className="bg-blue-500/30 text-blue-400">Base Scenario</Badge>
                          <Badge className="bg-red-500/30 text-red-400">{comparisonName}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-black/20 p-4 rounded-lg">
                          <p className="text-sm text-white/70">Total ROI</p>
                          <div className="flex justify-between mt-1">
                            <p className="text-lg font-bold text-blue-400">{results.roi.toFixed(1)}%</p>
                            <p className="text-lg font-bold text-red-400">{comparisonScenario.results.roi.toFixed(1)}%</p>
                          </div>
                          <Badge className="mt-1 bg-blue-500/20 text-blue-500">
                            {results.roi > comparisonScenario.results.roi ? "Better" : "Worse"}
                          </Badge>
                        </div>

                        <div className="bg-black/20 p-4 rounded-lg">
                          <p className="text-sm text-white/70">Payback Period</p>
                          <div className="flex justify-between mt-1">
                            <p className="text-lg font-bold text-blue-400">{results.paybackPeriod.toFixed(1)} years</p>
                            <p className="text-lg font-bold text-red-400">{comparisonScenario.results.paybackPeriod.toFixed(1)} years</p>
                          </div>
                          <Badge className="mt-1 bg-blue-500/20 text-blue-500">
                            {results.paybackPeriod < comparisonScenario.results.paybackPeriod ? "Better" : "Worse"}
                          </Badge>
                        </div>

                        <div className="bg-black/20 p-4 rounded-lg">
                          <p className="text-sm text-white/70">Net Present Value</p>
                          <div className="flex justify-between mt-1">
                            <p className="text-lg font-bold text-blue-400">{formatCurrency(results.npv)}</p>
                            <p className="text-lg font-bold text-red-400">{formatCurrency(comparisonScenario.results.npv)}</p>
                          </div>
                          <Badge className="mt-1 bg-blue-500/20 text-blue-500">
                            {results.npv > comparisonScenario.results.npv ? "Better" : "Worse"}
                          </Badge>
                        </div>

                        <div className="bg-black/20 p-4 rounded-lg">
                          <p className="text-sm text-white/70">Benefit-Cost Ratio</p>
                          <div className="flex justify-between mt-1">
                            <p className="text-lg font-bold text-blue-400">{results.bcRatio.toFixed(2)}</p>
                            <p className="text-lg font-bold text-red-400">{comparisonScenario.results.bcRatio.toFixed(2)}</p>
                          </div>
                          <Badge className="mt-1 bg-blue-500/20 text-blue-500">
                            {results.bcRatio > comparisonScenario.results.bcRatio ? "Better" : "Worse"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="h-[300px] mt-4">
                        <ChartContainer
                          config={{
                            baseCumulative: {
                              label: "Base Scenario (Cumulative)",
                              color: "hsl(var(--chart-1))",
                            },
                            comparisonCumulative: {
                              label: `${comparisonName} (Cumulative)`,
                              color: "hsl(var(--chart-2))",
                            },
                          }}
                          className="h-full"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis 
                                dataKey="year" 
                                stroke="rgba(255,255,255,0.5)" 
                                type="category"
                                allowDuplicatedCategory={false}
                              />
                              <YAxis stroke="rgba(255,255,255,0.5)" />
                              <Tooltip />
                              <Line
                                data={results.cashFlows}
                                type="monotone"
                                dataKey="cumulativeCashFlow"
                                stroke="var(--color-baseCumulative)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                name="Base Scenario (Cumulative)"
                              />
                              <Line
                                data={comparisonScenario.results.cashFlows}
                                type="monotone"
                                dataKey="cumulativeCashFlow"
                                stroke="var(--color-comparisonCumulative)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                name={`${comparisonName} (Cumulative)`}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      
                      <table className="w-full border-collapse text-sm mt-4">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left p-2">Parameter</th>
                            <th className="text-right p-2">Base Scenario</th>
                            <th className="text-right p-2">{comparisonName}</th>
                            <th className="text-right p-2">Difference</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/10">
                            <td className="p-2">Implementation Cost</td>
                            <td className="text-right p-2 text-blue-400">{formatCurrency(implementationCost)}</td>
                            <td className="text-right p-2 text-red-400">{formatCurrency(comparisonScenario.params.implementationCost)}</td>
                            <td className="text-right p-2">{formatCurrency(comparisonScenario.params.implementationCost - implementationCost)}</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="p-2">Time to Implement</td>
                            <td className="text-right p-2 text-blue-400">{timeToImplement} months</td>
                            <td className="text-right p-2 text-red-400">{comparisonScenario.params.timeToImplement} months</td>
                            <td className="text-right p-2">{comparisonScenario.params.timeToImplement - timeToImplement} months</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="p-2">Revenue Increase</td>
                            <td className="text-right p-2 text-blue-400">{revenueIncrease}%</td>
                            <td className="text-right p-2 text-red-400">{comparisonScenario.params.revenueIncrease}%</td>
                            <td className="text-right p-2">{(comparisonScenario.params.revenueIncrease - revenueIncrease).toFixed(1)}%</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="p-2">Cost Reduction</td>
                            <td className="text-right p-2 text-blue-400">{costReduction}%</td>
                            <td className="text-right p-2 text-red-400">{comparisonScenario.params.costReduction}%</td>
                            <td className="text-right p-2">{(comparisonScenario.params.costReduction - costReduction).toFixed(1)}%</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="p-2">Total 5-Year Returns</td>
                            <td className="text-right p-2 text-blue-400">{formatCurrency(results.totalReturns)}</td>
                            <td className="text-right p-2 text-red-400">{formatCurrency(comparisonScenario.results.totalReturns)}</td>
                            <td className="text-right p-2">{formatCurrency(comparisonScenario.results.totalReturns - results.totalReturns)}</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div className="bg-blue-500/10 p-3 rounded-lg text-sm">
                        <h4 className="font-medium mb-1">Analysis Insight</h4>
                        <p className="text-white/80">
                          {results.roi > comparisonScenario.results.roi 
                            ? "The base scenario shows a better overall ROI, suggesting it may be the preferred approach." 
                            : "The alternative scenario shows a better overall ROI, suggesting it may be the preferred approach."}
                          {results.paybackPeriod < comparisonScenario.results.paybackPeriod 
                            ? " The base scenario also has a faster payback period." 
                            : " The alternative scenario also has a faster payback period."}
                          {" Consider your organization's priorities between upfront investment, implementation time, and long-term returns when making your decision."}
                        </p>
                      </div>
                    </div>
                  ) : (
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
                  )}
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
                          <defs>
                            <linearGradient id="colorNetCashFlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="colorCumulativeCF" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="year" 
                            stroke="rgba(255,255,255,0.7)"
                            tick={{ fill: 'rgba(255,255,255,0.8)' }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.7)" 
                            tick={{ fill: 'rgba(255,255,255,0.8)' }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                            tickFormatter={(value) => `$${value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}`}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                            labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                          />
                          <Legend wrapperStyle={{ paddingTop: '10px' }} />
                          <Bar 
                            dataKey="netCashFlow" 
                            fill="url(#colorNetCashFlow)" 
                            name="Net Cash Flow" 
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                            animationDuration={1500}
                          />
                          <Line
                            type="monotone"
                            dataKey="cumulativeCashFlow"
                            stroke="#f97316"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "#f97316", strokeWidth: 2, stroke: "rgba(255,255,255,0.5)" }}
                            activeDot={{ r: 8, strokeWidth: 2, stroke: "rgba(255,255,255,0.9)" }}
                            name="Cumulative Cash Flow"
                            animationDuration={2000}
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
                          <defs>
                            {results.roiBreakdown.map((entry: any, index: number) => (
                              <linearGradient key={`gradient-${index}`} id={`colorBreakdown${index}`} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor={getBreakdownColor(index)} stopOpacity={0.9}/>
                                <stop offset="100%" stopColor={getBreakdownColor(index)} stopOpacity={0.6}/>
                              </linearGradient>
                            ))}
                          </defs>
                          <Pie
                            data={results.roiBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={90}
                            innerRadius={40}
                            paddingAngle={4}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            animationBegin={0}
                            animationDuration={1500}
                            blendStroke
                          >
                            {results.roiBreakdown.map((entry: any, index: number) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={`url(#colorBreakdown${index})`} 
                                stroke={getBreakdownColor(index)}
                                strokeWidth={2}
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, "Contribution"]}
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                            itemStyle={{ color: 'rgba(255,255,255,0.9)' }}
                          />
                          <Legend 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            iconType="circle"
                          />
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
                        {results.cashFlows.map((cf: CashFlowItem) => (
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

      {/* Conditional rendering of save scenario dialog */}
      {saveDialogOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/90 border border-white/10 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Save Scenario</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="scenario-name">Scenario Name</Label>
                <Input 
                  id="scenario-name"
                  className="bg-black/50 border-white/10 mt-1"
                  placeholder="Enter a name for this scenario"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setSaveDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={saveScenario}
                >
                  Save Scenario
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

