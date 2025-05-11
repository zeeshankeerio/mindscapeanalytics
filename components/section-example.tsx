"use client"

import { FlexibleSection } from "./flexible-section"
import { getContainerClasses } from "@/lib/container-utils"

/**
 * Example component showing how to update sections to use full width
 * 
 * Two approaches are shown:
 * 1. Using the FlexibleSection component (recommended)
 * 2. Using the getContainerClasses utility directly
 */
export default function SectionExample() {
  return (
    <>
      {/* APPROACH 1: Use the FlexibleSection component (recommended) */}
      <FlexibleSection
        fullWidth={true}  // Makes the section full width on desktop
        className="py-12 bg-black/40"
        id="example-section"
      >
        <h2 className="text-3xl font-bold mb-6">Full Width Section Example</h2>
        <p>This section uses the entire screen width on desktop while maintaining appropriate padding.</p>
        
        {/* Your section content goes here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-black/30 p-6 rounded-lg">Card 1 content</div>
          <div className="bg-black/30 p-6 rounded-lg">Card 2 content</div>
          <div className="bg-black/30 p-6 rounded-lg">Card 3 content</div>
        </div>
      </FlexibleSection>

      {/* APPROACH 2: Use getContainerClasses directly */}
      <section className="py-12 bg-red-900/10">
        <div className={getContainerClasses({ fullWidth: true })}>
          <h2 className="text-3xl font-bold mb-6">Alternative Full Width Approach</h2>
          <p>This is an alternative way to create full-width sections by directly using getContainerClasses.</p>
          
          {/* Your section content goes here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-black/30 p-6 rounded-lg">Card 1 content</div>
            <div className="bg-black/30 p-6 rounded-lg">Card 2 content</div>
            <div className="bg-black/30 p-6 rounded-lg">Card 3 content</div>
          </div>
        </div>
      </section>
    </>
  )
} 