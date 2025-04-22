import AIVisionDemo from "@/components/ai-vision-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VisionPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Computer Vision Demo</h1>
        <p className="text-white/70">Try our advanced computer vision capabilities</p>
      </div>

      <Card className="bg-black/30 border-white/10">
        <CardHeader>
          <CardTitle>Vision AI Demo</CardTitle>
          <CardDescription>Upload images or use your camera to analyze visual content</CardDescription>
        </CardHeader>
        <CardContent>
          <AIVisionDemo />
        </CardContent>
      </Card>
    </div>
  )
}

