import PricingCalculator from "@/components/pricing-calculator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pricing Calculator</h1>
        <p className="text-white/70">Estimate costs based on your organization's specific needs</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle>Custom Pricing Estimator</CardTitle>
            <CardDescription>Adjust parameters to see estimated costs tailored to your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <PricingCalculator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 