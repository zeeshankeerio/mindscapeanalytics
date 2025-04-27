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

## License

This project is licensed under the MIT License - see the LICENSE file for details. 