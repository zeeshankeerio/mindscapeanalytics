# Layout Migration Guide

This guide outlines the process of migrating all sections in the application to use the `FlexibleSection` component or `getContainerClasses` utility for consistent layout.

## Background

Mindscape Analytics is transitioning from fixed-width layouts to a more flexible system that allows toggling between constrained and full-width layouts. This migration ensures consistency across the application and improves the responsive behavior on different devices.

## Implementation

### 1. Container Utilities

The core utility is the `getContainerClasses` function found in `lib/container-utils.ts`. This utility returns Tailwind CSS classes based on layout options.

```tsx
import { getContainerClasses } from '@/lib/container-utils'

<div className={getContainerClasses({ 
  fullWidth: true,   // Toggle between full-width and constrained width
  noPadding: false,  // Control horizontal padding
  className: "..."   // Additional classes
})}>
  Content here
</div>
```

### 2. FlexibleSection Component

For most sections, use the `FlexibleSection` component that wraps the container utility:

```tsx
import { FlexibleSection } from '@/components/flexible-section'

<FlexibleSection
  fullWidth={true}
  className="py-12 bg-black"
  maxWidth="xl"  // Optional: "sm" | "md" | "lg" | "xl" | "2xl" | "8xl" | "none"
  id="my-section" // Optional
>
  <h2>Section Title</h2>
  <p>Section content...</p>
</FlexibleSection>
```

## Migration Checklist

### ✅ Completed Items

1. Created `getContainerClasses` utility in `lib/container-utils.ts`
2. Created `FlexibleSection` component in `components/flexible-section.tsx`
3. Updated `EnhancedHeader` and `Footer` components to support `fullWidth` prop
4. Created `layout-example.tsx` component to demonstrate layout patterns
5. Added a layout examples page at `/layout-examples`
6. Created a migration script at `scripts/update-all-sections.js`
7. Updated documentation in README.md

### 🔄 Remaining Tasks

1. Audit all section components and identify those needing updates
2. Replace standard container divs with `FlexibleSection` or `getContainerClasses`
3. Update component props to pass `fullWidth` where needed
4. Test all pages in various viewport sizes
5. Update any page-specific layout components

## How to Migrate a Section

### Step 1: Identify Sections to Migrate

Look for patterns like:

```html
<section className="...">
  <div className="container mx-auto px-4 md:px-6">
    {/* Section content */}
  </div>
</section>
```

### Step 2: Choose Migration Strategy

**Option A: FlexibleSection Component (Recommended)**

```tsx
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
  fullWidth={true}
  className="py-12 bg-black"
>
  <h2>Section Title</h2>
  <p>Section content...</p>
</FlexibleSection>
```

**Option B: Direct Container Utility**

```tsx
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
```

### Step 3: Update Component Props (if applicable)

If your component is used in multiple places, update it to accept a `fullWidth` prop:

```tsx
interface MyComponentProps {
  fullWidth?: boolean;
  // other props...
}

export function MyComponent({ fullWidth = false }: MyComponentProps) {
  return (
    <FlexibleSection fullWidth={fullWidth} className="...">
      {/* Component content */}
    </FlexibleSection>
  );
}
```

### Step 4: Test Thoroughly

Test your changes in:
- Mobile view
- Tablet view
- Desktop view
- Extra-large screens

## Resources

- Script: `node scripts/update-all-sections.js`
- Example Page: `/layout-examples`
- Example Component: `components/layout-example.tsx`
- GitHub Discussion: [Link to discussion thread] 