"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"
import { 
  ArrowRight, 
  BarChart2, 
  ChartPie, 
  Copy, 
  Download, 
  FileSpreadsheet, 
  LineChart as LineChartIcon, 
  Plus, 
  Save, 
  Trash2
} from "lucide-react"

// Strategy presets
const strategyPresets = {
  conservative: {
    name: "Conservative Approach",
    description: "Lower risk, gradual implementation with modest returns",
    implementationCost: 120000,
    annualMaintenanceCost: 24000,
    revenueIncrease: 5,
    costReduction: 8,
    timeToImplement: 6,
    employeeProductivity: 10,
    customerSatisfaction: 7,
    riskFactor: 3,
    timeHorizon: 5
  },
  balanced: {
    name: "Balanced Approach",
    description: "Moderate risk and investment with solid returns",
    implementationCost: 180000,
    annualMaintenanceCost: 36000,
    revenueIncrease: 12,
    costReduction: 15,
    timeToImplement: 4,
    employeeProductivity: 18,
    customerSatisfaction: 15,
    riskFactor: 5,
    timeHorizon: 5
  },
  aggressive: {
    name: "Aggressive Approach",
    description: "Higher investment and risk with potential for significant returns",
    implementationCost: 300000,
    annualMaintenanceCost: 60000,
    revenueIncrease: 25,
    costReduction: 30,
    timeToImplement: 3,
    employeeProductivity: 35,
    customerSatisfaction: 20,
    riskFactor: 8,
    timeHorizon: 5
  },
  phased: {
    name: "Phased Implementation",
    description: "Gradual rollout with increasing investment over time",
    implementationCost: 90000,
    annualMaintenanceCost: 45000,
    revenueIncrease: 8,
    costReduction: 10,
    timeToImplement: 8,
    employeeProductivity: 12,
    customerSatisfaction: 10,
    riskFactor: 4,
    timeHorizon: 5
  },
  comprehensive: {
    name: "Comprehensive Transformation",
    description: "Full-scale implementation across all business units",
    implementationCost: 450000,
    annualMaintenanceCost: 75000,
    revenueIncrease: 35,
    costReduction: 40,
    timeToImplement: 10,
    employeeProductivity: 45,
    customerSatisfaction: 30,
    riskFactor: 9,
    timeHorizon: 5
  }
}

// Chart colors
const COLORS = ["#ff0000", "#00C49F", "#FFBB28", "#FF8042", "#a855f7"];

// Custom tooltip for charts
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
              {entry.name.toLowerCase().includes('roi') || entry.name.toLowerCase().includes('percent') 
                ? `${entry.value.toLocaleString()}%` 
                : entry.name.toLowerCase().includes('cost') || entry.name.toLowerCase().includes('revenue') || entry.name.toLowerCase().includes('benefit')
                  ? `$${entry.value.toLocaleString()}`
                  : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ROIStrategyComparison() {
  const [strategies, setStrategies] = useState([
    { ...strategyPresets.conservative, id: 'strategy-1' },
    { ...strategyPresets.balanced, id: 'strategy-2' }
  ]);
  
  const [activeChart, setActiveChart] = useState("cashflow");
  const [annualRevenue, setAnnualRevenue] = useState(10000000);
  const [employeeCount, setEmployeeCount] = useState(100);
  const [discountRate, setDiscountRate] = useState(5);
  
  // Calculate ROI metrics for all strategies
  const calculateROIMetrics = () => {
    return strategies.map(strategy => {
      const yearlyData = [];
      let totalInvestment = strategy.implementationCost;
      let totalRevenue = 0;
      let totalCostSavings = 0;
      let cumulativeCashFlow = -strategy.implementationCost;
      let paybackPeriod = null;
      
      // Implementation period (no benefits during this time)
      const implementationMonths = strategy.timeToImplement;
      const implementationYears = implementationMonths / 12;
      
      // Calculate yearly metrics
      for (let year = 1; year <= strategy.timeHorizon; year++) {
        // Adjust benefits based on implementation time
        const yearFraction = year <= implementationYears ? 
          Math.max(0, (year - implementationYears + 1)) : 1;
        
        // Annual costs
        const yearlyMaintenanceCost = strategy.annualMaintenanceCost;
        
        // Annual benefits (adjusted for implementation time)
        const yearlyRevenueIncrease = (annualRevenue * (strategy.revenueIncrease / 100)) * yearFraction;
        const yearlyCostReduction = (annualRevenue * 0.4 * (strategy.costReduction / 100)) * yearFraction; // Assuming costs are 40% of revenue
        const yearlyProductivityGain = (employeeCount * 75000 * (strategy.employeeProductivity / 100)) * yearFraction; // Assuming $75k avg employee cost
        
        // Total yearly benefit
        const yearlyBenefit = yearlyRevenueIncrease + yearlyCostReduction + yearlyProductivityGain;
        
        // Net cash flow
        const netCashFlow = yearlyBenefit - yearlyMaintenanceCost - (year === 1 ? strategy.implementationCost : 0);
        
        // Cumulative cash flow
        cumulativeCashFlow += netCashFlow;
        
        // Check for payback period (first year with positive cumulative cash flow)
        if (paybackPeriod === null && cumulativeCashFlow > 0) {
          // Rough estimate of the month within this year when payback occurs
          const previousCumulativeCashFlow = cumulativeCashFlow - netCashFlow;
          const monthFraction = Math.abs(previousCumulativeCashFlow) / Math.abs(netCashFlow);
          paybackPeriod = (year - 1) * 12 + Math.ceil(monthFraction * 12);
        }
        
        // NPV calculation
        const npv = netCashFlow / Math.pow(1 + (discountRate / 100), year);
        
        // Update totals
        totalInvestment += yearlyMaintenanceCost;
        totalRevenue += yearlyRevenueIncrease;
        totalCostSavings += yearlyCostReduction + yearlyProductivityGain;
        
        // Add to yearly data
        yearlyData.push({
          year: `Year ${year}`,
          investment: year === 1 ? strategy.implementationCost + yearlyMaintenanceCost : yearlyMaintenanceCost,
          revenue: yearlyRevenueIncrease,
          savings: yearlyCostReduction + yearlyProductivityGain,
          netCashFlow: netCashFlow,
          cumulativeCashFlow: cumulativeCashFlow,
          npv: npv,
        });
      }
      
      // Calculate ROI
      const totalBenefits = totalRevenue + totalCostSavings;
      const roi = ((totalBenefits - totalInvestment) / totalInvestment) * 100;
      
      // Calculate IRR (simplified approximation)
      const irr = (roi / strategy.timeHorizon) + (discountRate / 2);
      
      return {
        ...strategy,
        yearlyData,
        totalInvestment,
        totalRevenue,
        totalCostSavings,
        totalBenefits,
        netBenefit: totalBenefits - totalInvestment,
        roi,
        irr,
        paybackPeriod: paybackPeriod || (strategy.timeHorizon * 12), // Default to max if no payback
        riskAdjustedROI: roi * (1 - (strategy.riskFactor / 10))
      };
    });
  };
  
  const roiData = calculateROIMetrics();
  
  // Prepare chart data
  const prepareChartData = () => {
    switch (activeChart) {
      case "cashflow":
        // Prepare cash flow chart data
        return Array.from({ length: roiData[0].yearlyData.length }, (_, i) => {
          const yearData: any = { name: `Year ${i + 1}` };
          roiData.forEach((strategy, index) => {
            yearData[`${strategy.name} Net Cash Flow`] = strategy.yearlyData[i].netCashFlow;
            yearData[`${strategy.name} Color`] = COLORS[index % COLORS.length];
          });
          return yearData;
        });
        
      case "cumulative":
        // Prepare cumulative cash flow chart data
        return Array.from({ length: roiData[0].yearlyData.length }, (_, i) => {
          const yearData: any = { name: `Year ${i + 1}` };
          roiData.forEach((strategy, index) => {
            yearData[`${strategy.name} Cumulative`] = strategy.yearlyData[i].cumulativeCashFlow;
            yearData[`${strategy.name} Color`] = COLORS[index % COLORS.length];
          });
          return yearData;
        });
        
      case "roi":
        // Prepare ROI comparison data
        return roiData.map(strategy => ({
          name: strategy.name,
          ROI: Math.round(strategy.roi),
          "Risk-Adjusted ROI": Math.round(strategy.riskAdjustedROI),
          IRR: Math.round(strategy.irr),
          color: COLORS[roiData.indexOf(strategy) % COLORS.length]
        }));
        
      case "payback":
        // Prepare payback period data
        return roiData.map(strategy => ({
          name: strategy.name,
          "Payback (Months)": strategy.paybackPeriod,
          color: COLORS[roiData.indexOf(strategy) % COLORS.length]
        }));
        
      case "radar":
        // Prepare radar chart data for strategy comparison
        return roiData.map(strategy => ({
          name: strategy.name,
          "ROI": Math.min(100, Math.round(strategy.roi / 3)), // Scale for radar chart
          "Risk": strategy.riskFactor * 10,
          "Speed": 100 - (strategy.timeToImplement * 8.33), // Convert months to 0-100 scale
          "Cost Efficiency": 100 - ((strategy.implementationCost / 500000) * 100), // Scale based on max cost
          "Revenue Impact": strategy.revenueIncrease * 2.5, // Scale percentage to 0-100
          color: COLORS[roiData.indexOf(strategy) % COLORS.length]
        }));
        
      default:
        return [];
    }
  };
  
  const chartData = prepareChartData();
  
  // Add a new strategy
  const addStrategy = () => {
    if (strategies.length < 5) {
      const newStrategy = { 
        ...strategyPresets.conservative, 
        id: `strategy-${strategies.length + 1}`,
        name: `Strategy ${strategies.length + 1}`
      };
      setStrategies([...strategies, newStrategy]);
    }
  };
  
  // Remove a strategy
  const removeStrategy = (id: string) => {
    if (strategies.length > 1) {
      setStrategies(strategies.filter(s => s.id !== id));
    }
  };
  
  // Update strategy
  const updateStrategy = (id: string, preset: string) => {
    setStrategies(strategies.map(s => 
      s.id === id ? { ...strategyPresets[preset as keyof typeof strategyPresets], id } : s
    ));
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toLocaleString()}`;
  };
  
  // Render different chart types
  const renderChart = () => {
    switch (activeChart) {
      case "cashflow":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {roiData.map((strategy, index) => (
                <Bar 
                  key={strategy.id} 
                  dataKey={`${strategy.name} Net Cash Flow`} 
                  name={`${strategy.name}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case "cumulative":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {roiData.map((strategy, index) => (
                <Line 
                  key={strategy.id} 
                  type="monotone" 
                  dataKey={`${strategy.name} Cumulative`} 
                  name={`${strategy.name}`} 
                  stroke={COLORS[index % COLORS.length]} 
                  activeDot={{ r: 8 }} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case "roi":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" tickFormatter={(value) => `${value}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="ROI" name="ROI %" fill="#ff0000" />
              <Bar dataKey="Risk-Adjusted ROI" name="Risk-Adjusted ROI %" fill="#00C49F" />
              <Bar dataKey="IRR" name="IRR %" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case "payback":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Payback (Months)" name="Payback Period (Months)" fill="#ff0000" />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case "radar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData[0]}>
              <PolarGrid stroke="#555" />
              <PolarAngleAxis dataKey="name" stroke="#888" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888" />
              {roiData.map((strategy, index) => (
                <Radar 
                  key={strategy.id}
                  name={strategy.name} 
                  dataKey={strategy.name} 
                  stroke={COLORS[index % COLORS.length]} 
                  fill={COLORS[index % COLORS.length]} 
                  fillOpacity={0.3} 
                />
              ))}
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 col-span-1">
          <CardContent className="p-6 space-y-6">
            <div>
              <Label htmlFor="annual-revenue" className="mb-2 block">Annual Revenue ($)</Label>
              <Input
                id="annual-revenue"
                type="number"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="bg-white/5 border-white/10"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="employee-count">Employee Count</Label>
                <span className="text-white/70">{employeeCount}</span>
              </div>
              <Slider
                id="employee-count"
                min={10}
                max={1000}
                step={10}
                value={[employeeCount]}
                onValueChange={(value) => setEmployeeCount(value[0])}
                className="mb-2"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="discount-rate">Discount Rate (%)</Label>
                <span className="text-white/70">{discountRate}%</span>
              </div>
              <Slider
                id="discount-rate"
                min={1}
                max={20}
                step={0.5}
                value={[discountRate]}
                onValueChange={(value) => setDiscountRate(value[0])}
                className="mb-2"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Strategy Comparison</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addStrategy}
                disabled={strategies.length >= 5}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Strategy
              </Button>
            </div>
            
            <div className="space-y-4">
              {strategies.map((strategy, index) => (
                <div key={strategy.id} className="flex items-center gap-3 bg-black/30 p-3 rounded-md border border-white/5">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  
                  <Select 
                    value={Object.keys(strategyPresets).find(
                      key => strategyPresets[key as keyof typeof strategyPresets].name === strategy.name
                    ) || ''}
                    onValueChange={(value) => updateStrategy(strategy.id, value)}
                  >
                    <SelectTrigger className="bg-black/50 border-white/10 flex-1">
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/10">
                      {Object.keys(strategyPresets).map((key) => (
                        <SelectItem key={key} value={key}>
                          {strategyPresets[key as keyof typeof strategyPresets].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Badge variant="outline" className="bg-white/5 border-white/10">
                    ROI: {Math.round(roiData[index].roi)}%
                  </Badge>
                  
                  <Badge variant="outline" className="bg-white/5 border-white/10">
                    {roiData[index].paybackPeriod < 12 
                      ? `${roiData[index].paybackPeriod} months` 
                      : `${(roiData[index].paybackPeriod / 12).toFixed(1)} years`}
                  </Badge>
                  
                  {strategies.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeStrategy(strategy.id)}
                      className="ml-auto h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-black/40 backdrop-blur-md border border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={activeChart === "cashflow" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveChart("cashflow")}
              className="flex items-center gap-1"
            >
              <BarChart2 className="h-4 w-4" />
              Cash Flow
            </Button>
            <Button 
              variant={activeChart === "cumulative" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveChart("cumulative")}
              className="flex items-center gap-1"
            >
              <LineChartIcon className="h-4 w-4" />
              Cumulative Return
            </Button>
            <Button 
              variant={activeChart === "roi" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveChart("roi")}
              className="flex items-center gap-1"
            >
              <ArrowRight className="h-4 w-4" />
              ROI Comparison
            </Button>
            <Button 
              variant={activeChart === "payback" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveChart("payback")}
              className="flex items-center gap-1"
            >
              <ChartPie className="h-4 w-4" />
              Payback Period
            </Button>
            <Button 
              variant={activeChart === "radar" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveChart("radar")}
              className="flex items-center gap-1"
            >
              <ChartPie className="h-4 w-4" />
              Strategy Radar
            </Button>
            
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
          
          {renderChart()}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {roiData.map((strategy, index) => (
              <div key={strategy.id} className="bg-black/30 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <h4 className="font-medium">{strategy.name}</h4>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Investment:</span>
                    <span>{formatCurrency(strategy.totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Benefits:</span>
                    <span>{formatCurrency(strategy.totalBenefits)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Net Benefit:</span>
                    <span className={strategy.netBenefit >= 0 ? "text-green-500" : "text-red-500"}>
                      {formatCurrency(strategy.netBenefit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">ROI:</span>
                    <span className={strategy.roi >= 0 ? "text-green-500" : "text-red-500"}>
                      {Math.round(strategy.roi)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Risk-Adjusted ROI:</span>
                    <span>{Math.round(strategy.riskAdjustedROI)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Payback Period:</span>
                    <span>
                      {strategy.paybackPeriod < 12 
                        ? `${strategy.paybackPeriod} months` 
                        : `${(strategy.paybackPeriod / 12).toFixed(1)} years`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 