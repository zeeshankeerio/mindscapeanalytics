# Mindscape Dashboard Module

This directory contains all the components and pages for the Mindscape AI platform dashboard.

## Directory Structure

- `/dashboard` - Main dashboard page
- `/dashboard/dashboard` - Redirects to main dashboard (maintains backward compatibility)
- `/dashboard/models` - AI models management
- `/dashboard/projects` - Projects management
- `/dashboard/datasets` - Datasets management
- `/dashboard/insights` - Analytics and insights
- `/dashboard/analytics` - Detailed analytics
- `/dashboard/assistant` - AI assistant interface
- `/dashboard/chat` - Chat interface
- `/dashboard/api-docs` - API documentation
- `/dashboard/team` - Team management
- `/dashboard/settings` - System settings
- `/dashboard/docs` - Documentation
- `/dashboard/knowledge` - Knowledge base
- `/dashboard/profile` - User profile
- `/dashboard/roi` - Return on investment analytics
- `/dashboard/vision` - Computer vision tools

## Core Features

- **Main Dashboard**: Overview with key metrics, system health, and quick actions
- **Models Management**: Create, train, and monitor AI models
- **Projects**: Manage AI projects and their lifecycles
- **Analytics**: Data visualization and performance metrics
- **Error Handling**: Consistent error handling across all dashboard pages
- **Loading States**: Skeleton loaders for better user experience

## Navigation

The dashboard uses a sidebar navigation component with three main sections:
1. Main navigation (Dashboard, Analytics, Projects, etc.)
2. Resources (API Docs, Documentation, Knowledge Base)
3. User section (Profile, Team, Settings)

## Error Handling

Each page implements:
- Custom error components
- Loading states
- Not found states

## Data Management

Data is sourced from:
- API calls to backend services
- Mock data for demonstration (in development)
- User-specific settings and preferences

## Styling

The dashboard uses:
- Tailwind CSS for styling
- Shadcn UI components
- Responsive design for all screen sizes

## Development

To add a new section to the dashboard:
1. Create a new directory under `/dashboard`
2. Implement a `page.tsx` file as the main component
3. Add error handling with `error.tsx`
4. Add loading states with `loading.tsx`
5. Update the sidebar navigation to include the new section 