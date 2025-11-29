# Mindscape AI Platform

A modern AI analytics and insights dashboard for managing machine learning projects, models, and visualizing data.

## Features

- **Modern Dashboard**: Sleek, responsive UI with dark mode support
- **Analytics Visualization**: Charts and metrics for AI performance
- **Project Management**: Track and manage AI projects
- **Model Management**: Monitor and deploy machine learning models
- **User Management**: Team collaboration tools
- **Responsive Design**: Works on desktop, tablet, and mobile

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/mindscape.git
   cd mindscape
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```

### Running the Development Server

#### On Windows:

There are two options:

1. Using PowerShell script:
   ```
   .\run-dev.ps1
   ```

2. Running npm command directly:
   ```
   npm run dev
   ```

#### On Linux/macOS:

1. Using shell script:
   ```
   sh run-dev.sh
   ```

2. Running npm command directly:
   ```
   npm run dev
   ```

Once started, the application will be available at [http://localhost:3000](http://localhost:3000).

## Dashboard Access

Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to access the main dashboard.

## Troubleshooting

### Sidebar not functioning correctly

If the sidebar doesn't collapse or expand properly:
1. Clear browser cache and local storage
2. Restart the development server

### Components not loading

If any dashboard components fail to load:
1. Check the console for errors
2. Ensure all dependencies are installed with `npm install`
3. Try refreshing the page

### Error: "useDashboard must be used within a DashboardProvider"

This error occurs when a component using the dashboard context is not wrapped with the DashboardProvider. Check component hierarchy.

## Project Structure

- `/app` - Next.js app directory with all pages and API routes
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and libraries
- `/providers` - React context providers
- `/public` - Static assets
- `/styles` - Global CSS styles
- `/types` - TypeScript type definitions

## Key Dashboard Components

The dashboard features several key components:

- Modern sidebar with collapsible navigation
- Key metrics visualization
- System health monitoring
- Project overview cards
- Team activity feed
- API usage analytics
- Task management

## Full-Width Layout Guide

To make all sections use 100% width on desktop while maintaining proper spacing and mobile responsiveness, follow these steps:

### Option 1: Use the FlexibleSection Component (Recommended)

Replace your existing section containers with the FlexibleSection component:

```jsx
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

### Option 2: Use the Container Utility Directly

For sections where you don't want to change the component structure, use the getContainerClasses utility:

```jsx
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

### Mixed Width Layouts

For pages with mixed layouts (some sections full-width, others constrained):

```jsx
<FlexibleSection fullWidth={true}>
  {/* This section is full width */}
</FlexibleSection>

<FlexibleSection fullWidth={false} maxWidth="xl">
  {/* This section has constrained width */}
</FlexibleSection>
```

The system is designed to maintain proper mobile layouts while giving you control over desktop widths.

## Flexible Layouts

Mindscape Analytics uses a flexible layout system that allows components to switch between constrained and full-width layouts. This system ensures consistent spacing and responsive behavior across all pages.

### Container Utilities

The core utility for managing layout is the `getContainerClasses` function found in `lib/container-utils.ts`. This function returns the appropriate Tailwind CSS classes based on layout options:

```jsx
import { getContainerClasses } from "@/lib/container-utils"

// Full width container (extends to viewport edges on desktop)
<div className={getContainerClasses({ fullWidth: true })}>
  Content here
</div>

// Standard container (constrained width with max-width)
<div className={getContainerClasses({ fullWidth: false })}>
  Content here
</div>

// No horizontal padding
<div className={getContainerClasses({ noPadding: true })}>
  Content here
</div>
```

### FlexibleSection Component

For most sections, use the `FlexibleSection` component that wraps the container utility:

```jsx
import { FlexibleSection } from "@/components/flexible-section"

// Full width section
<FlexibleSection
  fullWidth={true}
  className="py-12 bg-black"
>
  <h2>Section Title</h2>
  <p>Section content...</p>
</FlexibleSection>

// Constrained width section with custom max-width
<FlexibleSection
  fullWidth={false}
  maxWidth="xl"
  className="py-12 bg-black"
>
  <h2>Section Title</h2>
  <p>Section content...</p>
</FlexibleSection>
```

### Updating Components

When creating new components with sections, follow these patterns:

1. Accept a `fullWidth` prop in your component
2. Pass it through to FlexibleSection or getContainerClasses
3. Set a sensible default (usually `false` for standard width)

Example component implementation:

```jsx
interface MyComponentProps {
  fullWidth?: boolean;
  // other props...
}

export function MyComponent({ fullWidth = false }: MyComponentProps) {
  return (
    <FlexibleSection fullWidth={fullWidth} className="py-12">
      {/* Component content */}
    </FlexibleSection>
  );
}
```

For more examples, see:
- `components/layout-example.tsx` - Demonstrates all layout patterns
- `components/section-example.tsx` - Shows basic implementations

### Converting Existing Sections

To convert existing sections to use the flexible layout system, run:

```
node scripts/update-all-sections.js
```

This script provides guidelines for updating different section types in your codebase.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 