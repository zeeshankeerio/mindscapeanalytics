import LayoutExample from "@/components/layout-example"

export const metadata = {
  title: "Layout Examples - Mindscape Analytics",
  description: "Examples of different layout patterns using FlexibleSection and getContainerClasses",
}

export default function LayoutExamplesPage() {
  return (
    <div className="py-20">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3">Layout Examples</h1>
        <p className="text-lg text-white/70">
          Demonstrating the flexible layout system with real-world examples
        </p>
      </div>
      
      <LayoutExample fullWidth={true} />
    </div>
  )
} 