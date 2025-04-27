import AICapabilitiesGrid from "@/components/ai-capabilities-grid"

export const metadata = {
  title: "AI Capabilities Explorer | Mindscape",
  description: "Explore our cutting-edge AI technologies powering next-generation solutions"
}

export default function AICapabilitiesPage() {
  return (
    <main className="min-h-screen bg-black">
      <AICapabilitiesGrid />
    </main>
  )
} 