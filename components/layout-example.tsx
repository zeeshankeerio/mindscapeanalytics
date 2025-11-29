"use client"

import React from 'react'
import { FlexibleSection } from './flexible-section'
import { getContainerClasses } from '@/lib/container-utils'

interface LayoutExampleProps {
  fullWidth?: boolean;
}

/**
 * Example component showcasing different ways to implement the layout patterns
 * This serves as a reference for developers updating the codebase
 */
export default function LayoutExample({ fullWidth = true }: LayoutExampleProps) {
  return (
    <div className="space-y-24">
      {/* 
        PATTERN 1: Using FlexibleSection (Recommended)
        This is the simplest way to create a section with proper layout
      */}
      <FlexibleSection
        fullWidth={fullWidth}
        className="py-16 bg-gradient-to-b from-black/40 to-black/20"
      >
        <h2 className="text-3xl font-bold mb-6">Pattern 1: FlexibleSection Component</h2>
        <p className="text-lg text-white/70 mb-8">
          This approach uses the FlexibleSection component which handles container 
          classes automatically. This is the recommended approach for most sections.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-medium mb-2">Simple Implementation</h3>
            <p className="text-white/70">Just wrap your content in FlexibleSection and set fullWidth prop</p>
          </div>
          <div className="bg-black/30 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-medium mb-2">Consistent Layout</h3>
            <p className="text-white/70">Works correctly on mobile and desktop with proper padding</p>
          </div>
          <div className="bg-black/30 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-medium mb-2">Propagate Props</h3>
            <p className="text-white/70">Can pass the fullWidth prop from parent components</p>
          </div>
        </div>
      </FlexibleSection>

      {/* 
        PATTERN 2: Using getContainerClasses directly
        Use when you need to maintain existing section structure
      */}
      <section className="py-16 bg-gradient-to-b from-black/30 to-black/10">
        <div className={getContainerClasses({ fullWidth })}>
          <h2 className="text-3xl font-bold mb-6">Pattern 2: Direct Container Classes</h2>
          <p className="text-lg text-white/70 mb-8">
            This approach uses the getContainerClasses utility directly. Use when 
            you need to maintain the existing section structure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-medium mb-2">Keep Section Tags</h3>
              <p className="text-white/70">Maintain your existing section structure</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-medium mb-2">Direct Control</h3>
              <p className="text-white/70">Configure container options directly with parameters</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-medium mb-2">Additional Options</h3>
              <p className="text-white/70">Set noPadding and additional className options</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 
        PATTERN 3: Mixed widths in one page 
        Showing how you can mix constrained and full-width sections
      */}
      <div className="space-y-6">
        <FlexibleSection
          fullWidth={true}
          className="py-8 bg-red-900/10"
        >
          <h2 className="text-3xl font-bold mb-2">Pattern 3: Full-Width Section</h2>
          <p className="text-white/70">This section uses the full width of the viewport</p>
        </FlexibleSection>
        
        <FlexibleSection
          fullWidth={false}
          className="py-8 bg-black/30"
        >
          <h2 className="text-3xl font-bold mb-2">Constrained Width Section</h2>
          <p className="text-white/70">This section uses the default constrained width</p>
        </FlexibleSection>
        
        <FlexibleSection
          fullWidth={false}
          maxWidth="xl"
          className="py-8 bg-black/30"
        >
          <h2 className="text-3xl font-bold mb-2">Custom Max-Width Section</h2>
          <p className="text-white/70">This section uses a custom max-width of xl</p>
        </FlexibleSection>
      </div>
      
      {/* 
        PATTERN 4: Component that accepts fullWidth prop
        Shows how to create components that support fullWidth
      */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Pattern 4: Component Implementation</h2>
        <div className="bg-black/20 p-8 rounded-xl">
          <div className="mb-4 font-mono text-sm text-white/70 bg-black/40 p-4 rounded-lg">
            <p>{`interface MyComponentProps {`}</p>
            <p>{`  fullWidth?: boolean;`}</p>
            <p>{`  // other props...`}</p>
            <p>{`}`}</p>
            <br />
            <p>{`export function MyComponent({ fullWidth = false, ...props }: MyComponentProps) {`}</p>
            <p>{`  return (`}</p>
            <p>{`    <FlexibleSection fullWidth={fullWidth} className="...">`}</p>
            <p>{`      {/* Component content */}`}</p>
            <p>{`    </FlexibleSection>`}</p>
            <p>{`  );`}</p>
            <p>{`}`}</p>
          </div>
          <p className="text-white/70">
            Components should accept and propagate the fullWidth prop to enable
            layout consistency across the application.
          </p>
        </div>
      </div>
    </div>
  )
} 