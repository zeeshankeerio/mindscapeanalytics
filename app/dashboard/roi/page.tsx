"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EnhancedROICalculator from "@/components/enhanced-roi-calculator"
import ROICalculator from "@/components/roi-calculator"
import ROIShowcase from "@/components/roi-showcase"
import ROIStrategyComparison from "@/components/roi-strategy-comparison"
import ROIMetricsDashboard from "@/components/roi-metrics-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart4, TrendingUp, Download, Share2, ChartPieIcon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ROIPage() {
  return (
    <div className="p-6 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)] -z-10"></div>
      <div className="fixed top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 blur-[120px] -z-10 animate-pulse"></div>
      <div className="fixed bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/20 to-pink-600/20 blur-[150px] -z-10 animate-pulse"></div>
      <div className="fixed top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-red-600/20 to-amber-600/20 blur-[80px] -z-10 animate-pulse"></div>
      
      {/* Animated sparkles */}
      <div className="pointer-events-none fixed inset-0 -z-5 overflow-hidden">
        <div className="absolute -left-40 top-20 h-2 w-2 rounded-full bg-blue-500/50 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] animate-float"></div>
        <div className="absolute right-20 top-1/3 h-3 w-3 rounded-full bg-purple-500/50 shadow-[0_0_10px_2px_rgba(168,85,247,0.5)] animate-float-slow"></div>
        <div className="absolute left-1/4 bottom-40 h-2 w-2 rounded-full bg-emerald-500/50 shadow-[0_0_10px_2px_rgba(16,185,129,0.5)] animate-float-medium"></div>
        <div className="absolute right-1/3 bottom-20 h-2.5 w-2.5 rounded-full bg-amber-500/50 shadow-[0_0_10px_2px_rgba(245,158,11,0.5)] animate-float"></div>
        <div className="absolute left-1/2 top-40 h-2 w-2 rounded-full bg-red-500/50 shadow-[0_0_10px_2px_rgba(239,68,68,0.5)] animate-float-slow"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">ROI Analytics Dashboard</h1>
            <p className="text-white/70">Comprehensive analysis of AI investment impact across your business</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]" onClick={() => {
              // Trigger export from the visible calculator component
              const exportBtn = document.querySelector('[data-export-report]') as HTMLButtonElement;
              if (exportBtn) {
                exportBtn.click();
              }
            }}>
              <Download className="h-4 w-4 mr-1" />
              Export Report
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        <Tabs defaultValue="advanced-calculator" className="mb-8">
          <TabsList className="bg-black/30 border border-white/20 mb-6 p-1 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            <TabsTrigger 
              value="advanced-calculator" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all"
            >
              Advanced ROI Calculator
            </TabsTrigger>
            <TabsTrigger 
              value="scenario-comparison" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all"
            >
              Scenario Comparison
            </TabsTrigger>
            <TabsTrigger 
              value="metrics-dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white transition-all"
            >
              Metrics Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="showcase" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all"
            >
              Success Stories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="advanced-calculator" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gradient-to-br from-black/40 to-black/60 border-green-500/20 shadow-[0_0_25px_rgba(74,222,128,0.1)] backdrop-blur-lg hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                    Annual ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">+215.7%</div>
                  <p className="text-white/70 text-sm">Based on current parameters</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-black/40 to-black/60 border-blue-500/20 shadow-[0_0_25px_rgba(96,165,250,0.1)] backdrop-blur-lg hover:shadow-[0_0_30px_rgba(96,165,250,0.15)] transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <BarChart4 className="h-4 w-4 mr-2 text-blue-400" />
                    Payback Period
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">5.2 months</div>
                  <p className="text-white/70 text-sm">Return on initial investment</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-black/40 to-black/60 border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.1)] backdrop-blur-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <ChartPieIcon className="h-4 w-4 mr-2 text-purple-400" />
                    5-Year Net Benefit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-500 text-transparent bg-clip-text">$2.43M</div>
                  <p className="text-white/70 text-sm">Total projected return</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-br from-black/40 to-black/60 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] backdrop-blur-lg mb-6">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
                      <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">Enterprise AI ROI Calculator</span>
                    </CardTitle>
                    <CardDescription>Advanced analysis with industry-specific parameters and benchmarks</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border-red-500/20 w-fit shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                    Enhanced Accuracy
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <EnhancedROICalculator />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-black/40 to-black/60 border-amber-500/20 shadow-[0_0_25px_rgba(251,191,36,0.1)] backdrop-blur-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] transition-all">
                <CardHeader>
                  <CardTitle className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">Implementation Best Practices</CardTitle>
                  <CardDescription>Maximize your ROI with these proven strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-black/50 to-black/70 border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                      <h3 className="text-md font-semibold mb-2 text-amber-400">1. Start with a clear business objective</h3>
                      <p className="text-sm text-white/70">Define specific, measurable goals that align with your organizational strategy before implementing AI solutions.</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gradient-to-br from-black/50 to-black/70 border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                      <h3 className="text-md font-semibold mb-2 text-amber-400">2. Prioritize high-value use cases</h3>
                      <p className="text-sm text-white/70">Focus on projects with clear financial impact and manageable complexity for early wins and momentum.</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gradient-to-br from-black/50 to-black/70 border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                      <h3 className="text-md font-semibold mb-2 text-amber-400">3. Account for total cost of ownership</h3>
                      <p className="text-sm text-white/70">Include ongoing maintenance, training, integration, and infrastructure costs in your calculations.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-black/40 to-black/60 border-cyan-500/20 shadow-[0_0_25px_rgba(8,145,178,0.1)] backdrop-blur-lg hover:shadow-[0_0_30px_rgba(8,145,178,0.15)] transition-all">
                <CardHeader>
                  <CardTitle className="bg-gradient-to-r from-cyan-400 to-teal-500 text-transparent bg-clip-text">ROI Acceleration Strategies</CardTitle>
                  <CardDescription>Ways to shorten time-to-value for AI initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-black/50 to-black/70 border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                      <h3 className="text-md font-semibold mb-2 text-cyan-400">Phased implementation approach</h3>
                      <p className="text-sm text-white/70">Break complex projects into smaller, manageable phases to deliver value incrementally and validate assumptions early.</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gradient-to-br from-black/50 to-black/70 border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                      <h3 className="text-md font-semibold mb-2 text-cyan-400">Cross-functional team collaboration</h3>
                      <p className="text-sm text-white/70">Involve both technical and business stakeholders to ensure solutions address real operational challenges.</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gradient-to-br from-black/50 to-black/70 border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                      <h3 className="text-md font-semibold mb-2 text-cyan-400">Continuous improvement cycle</h3>
                      <p className="text-sm text-white/70">Implement feedback loops and model retraining processes to ensure solutions improve over time.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scenario-comparison" className="mt-0">
            <Card className="bg-gradient-to-br from-black/40 to-black/60 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] backdrop-blur-lg mb-6">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">AI Strategy Comparison</CardTitle>
                <CardDescription>Compare different AI implementation approaches side by side</CardDescription>
              </CardHeader>
              <CardContent>
                <ROIStrategyComparison />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics-dashboard" className="mt-0">
            <Card className="bg-gradient-to-br from-black/40 to-black/60 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] backdrop-blur-lg mb-6">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">ROI Analytics & Insights</CardTitle>
                <CardDescription>Advanced metrics and industry-specific benchmarks for AI investment planning</CardDescription>
              </CardHeader>
              <CardContent>
                <ROIMetricsDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="showcase" className="mt-0">
            <div className="bg-gradient-to-br from-black/40 to-black/60 border border-amber-500/20 rounded-lg shadow-[0_0_30px_rgba(245,158,11,0.1)] backdrop-blur-lg mb-6">
              <ROIShowcase />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

