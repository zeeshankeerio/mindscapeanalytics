import EnhancedROICalculator from "@/components/enhanced-roi-calculator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ROIPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">ROI Calculator</h1>
        <p className="text-white/70">Calculate the return on investment for AI solutions</p>
      </div>

      <Card className="bg-black/30 border-white/10">
        <CardHeader>
          <CardTitle>AI ROI Calculator</CardTitle>
          <CardDescription>Estimate the financial impact of implementing AI solutions</CardDescription>
        </CardHeader>
        <CardContent>
          <EnhancedROICalculator />
        </CardContent>
      </Card>
    </div>
  )
}

