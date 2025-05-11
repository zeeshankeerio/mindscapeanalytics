"use client"

import { useState } from "react"
import { 
  ArrowRight, 
  ArrowUpRight, 
  BarChart2, 
  Calendar, 
  CreditCard, 
  Download, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Share2, 
  TrendingUp, 
  Users
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart,
  Area
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Color palette
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
                : entry.name.toLowerCase().includes('cost') || entry.name.toLowerCase().includes('revenue') || entry.name.toLowerCase().includes('benefit') || entry.name.toLowerCase().includes('savings')
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

export default function ROIMetricsDashboard() {
  const [timeframe, setTimeframe] = useState("yearly");
  const [industry, setIndustry] = useState("technology");
  
  // Simulated data for ROI metrics across industries
  const roiByIndustryData = [
    { name: "Healthcare", roi: 320, implementation: 8, risk: 4 },
    { name: "Finance", roi: 280, implementation: 6, risk: 7 },
    { name: "Retail", roi: 250, implementation: 4, risk: 5 },
    { name: "Manufacturing", roi: 210, implementation: 9, risk: 6 },
    { name: "Technology", roi: 350, implementation: 3, risk: 8 }
  ];
  
  // ROI breakdown by AI capability
  const roiBreakdownData = [
    { name: "Predictive Analytics", value: 40 },
    { name: "Computer Vision", value: 15 },
    { name: "NLP", value: 20 },
    { name: "Recommendation", value: 10 },
    { name: "Automation", value: 15 }
  ];
  
  // Time series data
  const generateTimeSeriesData = () => {
    if (timeframe === "yearly") {
      return [
        { name: "2021", revenue: 5000000, costs: 4200000, savings: 800000, roi: 19 },
        { name: "2022", revenue: 6500000, costs: 4800000, savings: 1700000, roi: 35 },
        { name: "2023", revenue: 8200000, costs: 5300000, savings: 2900000, roi: 55 },
        { name: "2024", revenue: 10500000, costs: 5700000, savings: 4800000, roi: 84 },
        { name: "2025", revenue: 13800000, costs: 6100000, savings: 7700000, roi: 126 }
      ];
    } else if (timeframe === "quarterly") {
      return [
        { name: "Q1 2024", revenue: 2300000, costs: 1400000, savings: 900000, roi: 64 },
        { name: "Q2 2024", revenue: 2600000, costs: 1450000, savings: 1150000, roi: 79 },
        { name: "Q3 2024", revenue: 2800000, costs: 1400000, savings: 1400000, roi: 100 },
        { name: "Q4 2024", revenue: 2800000, costs: 1450000, savings: 1350000, roi: 93 }
      ];
    } else {
      return [
        { name: "Jan", revenue: 820000, costs: 480000, savings: 340000, roi: 71 },
        { name: "Feb", revenue: 780000, costs: 460000, savings: 320000, roi: 70 },
        { name: "Mar", revenue: 830000, costs: 470000, savings: 360000, roi: 77 },
        { name: "Apr", revenue: 890000, costs: 480000, savings: 410000, roi: 85 },
        { name: "May", revenue: 860000, costs: 470000, savings: 390000, roi: 83 },
        { name: "Jun", revenue: 850000, costs: 460000, savings: 390000, roi: 85 }
      ];
    }
  };
  
  const timeSeriesData = generateTimeSeriesData();
  
  // Cost reduction by source
  const costReductionData = [
    { name: "Operational", value: 45 },
    { name: "Labor", value: 25 },
    { name: "Errors", value: 15 },
    { name: "Time", value: 10 },
    { name: "Other", value: 5 }
  ];
  
  // Implementation timeline
  const implementationData = [
    { name: "Planning", start: 0, duration: 1 },
    { name: "Development", start: 1, duration: 2 },
    { name: "Testing", start: 3, duration: 1 },
    { name: "Deployment", start: 4, duration: 1 },
    { name: "Training", start: 4, duration: 2 },
    { name: "Optimization", start: 6, duration: 3 }
  ];
  
  // Format currency values
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toLocaleString()}`;
  };
  
  // Industry-specific insights
  const industryInsights = {
    technology: {
      title: "Technology Industry Insights",
      description: "AI implementation in tech companies shows the highest ROI with the shortest implementation time.",
      keyMetrics: [
        { name: "Average ROI", value: "350%", trend: "up" },
        { name: "Implementation Time", value: "3 months", trend: "down" },
        { name: "Cost Reduction", value: "32%", trend: "up" }
      ],
      recommendations: [
        "Focus on automation and predictive analytics for highest ROI",
        "Implement AI in product development and customer support first",
        "Consider open-source models to reduce costs further"
      ]
    },
    healthcare: {
      title: "Healthcare Industry Insights",
      description: "Healthcare organizations see strong ROI but longer implementation times due to regulatory requirements.",
      keyMetrics: [
        { name: "Average ROI", value: "320%", trend: "up" },
        { name: "Implementation Time", value: "8 months", trend: "neutral" },
        { name: "Cost Reduction", value: "28%", trend: "up" }
      ],
      recommendations: [
        "Prioritize patient care optimization and predictive diagnostics",
        "Ensure compliance with healthcare regulations during implementation",
        "Focus on AI solutions that improve both outcomes and efficiency"
      ]
    },
    finance: {
      title: "Finance Industry Insights",
      description: "Financial institutions benefit from fraud detection and process automation with moderate implementation times.",
      keyMetrics: [
        { name: "Average ROI", value: "280%", trend: "up" },
        { name: "Implementation Time", value: "6 months", trend: "neutral" },
        { name: "Cost Reduction", value: "25%", trend: "up" }
      ],
      recommendations: [
        "Implement fraud detection and risk assessment AI first",
        "Focus on compliance automation to reduce regulatory costs",
        "Use AI for customer segmentation and personalized offerings"
      ]
    },
    retail: {
      title: "Retail Industry Insights",
      description: "Retail businesses see quick implementation with strong returns from recommendation engines and inventory optimization.",
      keyMetrics: [
        { name: "Average ROI", value: "250%", trend: "up" },
        { name: "Implementation Time", value: "4 months", trend: "down" },
        { name: "Cost Reduction", value: "22%", trend: "up" }
      ],
      recommendations: [
        "Prioritize recommendation engines and demand forecasting",
        "Implement computer vision for inventory management",
        "Use AI for personalized marketing campaigns"
      ]
    },
    manufacturing: {
      title: "Manufacturing Industry Insights",
      description: "Manufacturing companies benefit from predictive maintenance and quality control but have longer implementation periods.",
      keyMetrics: [
        { name: "Average ROI", value: "210%", trend: "up" },
        { name: "Implementation Time", value: "9 months", trend: "up" },
        { name: "Cost Reduction", value: "30%", trend: "up" }
      ],
      recommendations: [
        "Focus on predictive maintenance to reduce equipment downtime",
        "Implement quality control AI to reduce defects and waste",
        "Automate supply chain management for better efficiency"
      ]
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">ROI Analytics Dashboard</h2>
          <p className="text-white/70">Advanced metrics and industry benchmarks</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="w-[180px] bg-black/50 border-white/10">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/10">
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px] bg-black/50 border-white/10">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/10">
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-black/30 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Total ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{timeSeriesData[timeSeriesData.length - 1].roi}%</div>
              <Badge className="bg-green-500/20 text-green-500 border-green-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +24%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Cost Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(timeSeriesData[timeSeriesData.length - 1].savings)}</div>
              <Badge className="bg-green-500/20 text-green-500 border-green-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(timeSeriesData[timeSeriesData.length - 1].revenue)}</div>
              <Badge className="bg-green-500/20 text-green-500 border-green-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Implementation Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {roiByIndustryData.find(d => d.name.toLowerCase() === industry)?.implementation || 6} months
              </div>
              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/20">
                <Calendar className="h-3 w-3 mr-1" />
                Avg
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle>ROI Trend Analysis</CardTitle>
            <CardDescription>Performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" tickFormatter={(value) => `${value}%`}/>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="roi" stroke="#ff0000" fillOpacity={1} fill="url(#colorRoi)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle>Financial Impact</CardTitle>
            <CardDescription>Revenue, costs, and savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#00C49F" />
                  <Bar dataKey="costs" name="Costs" fill="#ff0000" />
                  <Bar dataKey="savings" name="Savings" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle>ROI by Capability</CardTitle>
            <CardDescription>Distribution across AI components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roiBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {roiBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle>Cost Reduction Sources</CardTitle>
            <CardDescription>Where savings are generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costReductionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {costReductionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle>{industryInsights[industry as keyof typeof industryInsights].title}</CardTitle>
            <CardDescription>{industryInsights[industry as keyof typeof industryInsights].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {industryInsights[industry as keyof typeof industryInsights].keyMetrics.map((metric, index) => (
                <div key={index} className="bg-black/40 p-3 rounded-lg border border-white/5">
                  <div className="text-sm text-white/70 mb-1">{metric.name}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold">{metric.value}</div>
                    {metric.trend === "up" && (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    )}
                    {metric.trend === "down" && (
                      <ArrowUpRight className="h-4 w-4 text-red-500 transform rotate-90" />
                    )}
                    {metric.trend === "neutral" && (
                      <ArrowRight className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Recommendations</h4>
              <ul className="space-y-2">
                {industryInsights[industry as keyof typeof industryInsights].recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="min-w-[16px] h-4 mt-0.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                    <span className="text-white/80">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-black/30 border-white/10">
        <CardHeader>
          <CardTitle>Industry Benchmark Comparison</CardTitle>
          <CardDescription>How your sector compares to others</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roiByIndustryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#888" />
                <YAxis type="category" dataKey="name" stroke="#888" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="roi" name="ROI %" fill="#ff0000" />
                <Bar dataKey="implementation" name="Implementation Time (months)" fill="#00C49F" />
                <Bar dataKey="risk" name="Risk Factor (1-10)" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 