#!/usr/bin/env node

/**
 * Section Update Script
 * 
 * This script will help you update all sections in your application
 * to use the FlexibleSection component or getContainerClasses utility.
 * 
 * Usage:
 * 1. Run: node scripts/update-all-sections.js
 * 2. The script will output the code changes you should make
 */

console.log('===== MINDSCAPE ANALYTICS SECTION UPDATER =====');
console.log('This script will help you update all sections to use the new flexible layout system.');
console.log('\n');

console.log('STEP 1: Identify all sections in your codebase');
console.log('Look for patterns like:');
console.log(`
<section className="...">
  <div className="container mx-auto px-4 md:px-6">
    {/* Section content */}
  </div>
</section>
`);
console.log('\n');

console.log('STEP 2: Convert components to FlexibleSection');
console.log('For each section, replace with:');
console.log(`
// Before
<section className="py-12 bg-black">
  <div className="container mx-auto px-4 md:px-6">
    <h2>Section Title</h2>
    <p>Section content...</p>
  </div>
</section>

// After
import { FlexibleSection } from "@/components/flexible-section"

<FlexibleSection
  fullWidth={true}  // Set to true for full-width sections
  className="py-12 bg-black"
>
  <h2>Section Title</h2>
  <p>Section content...</p>
</FlexibleSection>
`);
console.log('\n');

console.log('STEP 3: For direct container usage, use getContainerClasses');
console.log('For components where you don\'t want to change the structure:');
console.log(`
// Before
<section className="py-12 bg-black">
  <div className="container mx-auto px-4 md:px-6">
    <h2>Section Title</h2>
    <p>Section content...</p>
  </div>
</section>

// After
import { getContainerClasses } from "@/lib/container-utils"

<section className="py-12 bg-black">
  <div className={getContainerClasses({ fullWidth: true })}>
    <h2>Section Title</h2>
    <p>Section content...</p>
  </div>
</section>
`);
console.log('\n');

console.log('STEP 4: Check and update component props where necessary');
console.log('If your component accepts a fullWidth prop, update it to pass to FlexibleSection:');
console.log(`
// Component definition
interface MyComponentProps {
  fullWidth?: boolean;
  // other props...
}

export function MyComponent({ fullWidth = false, ...props }: MyComponentProps) {
  return (
    <FlexibleSection fullWidth={fullWidth} className="...">
      {/* Component content */}
    </FlexibleSection>
  );
}
`);
console.log('\n');

console.log('STEP 5: Update your layout components');
console.log('Make sure your top-level layout components (like RootLayoutContent) support fullWidth:');
console.log(`
interface RootLayoutContentProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function RootLayoutContent({ children, fullWidth = false }: RootLayoutContentProps) {
  // Pass fullWidth to child components that need it
  return (
    <>
      <EnhancedHeader fullWidth={fullWidth} />
      <main>
        {children}
      </main>
      <Footer fullWidth={fullWidth} />
    </>
  );
}
`);
console.log('\n');

console.log('SUMMARY OF CHANGES:');
console.log('   - import { FlexibleSection } from "@/components/flexible-section"');
console.log('   - import { getContainerClasses } from "@/lib/container-utils"');
console.log('   - Replace container divs with FlexibleSection or getContainerClasses');
console.log('   - Update components to accept and propagate fullWidth prop');
console.log('\n');

console.log('BENEFITS:');
console.log('   - Consistent layout across all pages');
console.log('   - Responsive design that works on all devices');
console.log('   - Easy to update all sections at once');
console.log('   - Maintainable and scalable code'); 