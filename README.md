# Mindscape AI Platform

## Project Overview

This is an AI platform for enterprise use, showcasing advanced AI capabilities through a modern React-based web application.

## Recent Updates

### TypeScript Compatibility with React 19

We've addressed TypeScript compatibility issues for React 19 by:

1. Adding custom type definitions for Lucide React icons
2. Adding custom type definitions for UI components
3. Updating the TypeScript configuration to include these definitions
4. Adding React 19 compatibility by augmenting global React types

### Development Notes

When working with React 19 and third-party libraries, you may encounter type compatibility issues. We've implemented the following solutions:

- Custom type declarations in the `types/` directory
- Augmented React types to ensure compatibility with third-party components
- Updated TypeScript configuration to recognize our custom type declarations

## Features

- Interactive 3D visualizations of AI models, cloud infrastructure, edge computing, and security operations
- Real-time simulations with adjustable parameters
- Responsive UI with adaptive layouts for all device sizes
- Modern, sleek design with animations and transitions

## Technology Stack

- **Frontend:** Next.js, React, TypeScript, TailwindCSS
- **UI Components:** shadcn/ui, Radix UI
- **Animation:** Framer Motion
- **3D Visualization:** Three.js

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mindscape.git
   cd mindscape
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Interactive Demos

The platform includes several interactive demos:

- **AI/ML Visualization:** Explore neural network architecture with real-time training simulations
- **Cloud Infrastructure:** Monitor cloud resources with auto-scaling capabilities
- **Edge Computing:** Experience low-latency processing at the network edge
- **Security Operations:** View threat detection and response systems in action

## Building for Production

```bash
npm run build
# or
pnpm build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 