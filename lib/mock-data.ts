import {
  Brain,
  Eye,
  MessageSquare,
  BarChart,
  User,
  Shield,
  Bell,
  Key,
  Database,
  Cloud,
  CreditCard,
  Book,
  Code,
  Terminal,
  Zap,
} from "lucide-react"
import type {
  Model,
  Project,
  Dataset,
  PerformanceData,
  UsageData,
  ModelPerformance,
  DocSection,
  SettingSection,
  CodeExamples,
} from "@/types"

// User data
export const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "ADMIN" as const,
  avatar: "/avatars/john.png",
  permissions: ["read", "write", "admin"],
  isAuthenticated: true, // Always authenticated
  apiKeys: ["api-key-1234567890"],
  subscription: {
    plan: "Enterprise",
    status: "active",
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
  }
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

// Models data
export const mockModels: Model[] = [
  {
    id: "1",
    name: "Vision Transformer v2",
    type: "Vision",
    status: "active",
    accuracy: 98.5,
    totalRequests: 125000,
    lastUpdated: "2024-03-31T10:00:00Z",
    version: "2.3.0",
    latency: 45,
  },
  {
    id: "2",
    name: "BERT Language Model",
    type: "Language",
    status: "training",
    accuracy: 94.2,
    totalRequests: 89000,
    lastUpdated: "2024-03-31T09:30:00Z",
    version: "1.8.5",
    latency: 32,
  },
  {
    id: "3",
    name: "Recommendation Engine",
    type: "Analytics",
    status: "error",
    accuracy: 89.7,
    totalRequests: 210000,
    lastUpdated: "2024-03-31T09:00:00Z",
    version: "3.1.2",
    latency: 120,
  },
  {
    id: "4",
    name: "Sentiment Analyzer",
    type: "Language",
    status: "active",
    accuracy: 92.8,
    totalRequests: 45000,
    lastUpdated: "2024-03-31T08:30:00Z",
    version: "2.0.1",
    latency: 28,
  },
]

// Projects data
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Vision AI Assistant",
    description: "Computer vision model for real-time object detection and scene understanding",
    type: "Vision",
    status: "active",
    progress: 85,
    lastUpdated: "2024-03-31T10:00:00Z",
    models: ["1"],
    datasets: ["1"],
  },
  {
    id: "2",
    name: "Smart Chat Bot",
    description: "Advanced conversational AI for customer support automation",
    type: "Language",
    status: "active",
    progress: 60,
    lastUpdated: "2024-03-31T09:30:00Z",
    models: ["2", "4"],
    datasets: ["2"],
  },
  {
    id: "3",
    name: "Market Predictor",
    description: "AI-powered market analysis and prediction system",
    type: "Analytics",
    status: "active",
    progress: 92,
    lastUpdated: "2024-03-31T09:00:00Z",
    models: ["3"],
    datasets: ["3"],
  },
  {
    id: "4",
    name: "Neural Translator",
    description: "Multi-language translation model with context understanding",
    type: "Language",
    status: "archived",
    progress: 25,
    lastUpdated: "2024-03-30T15:00:00Z",
    models: ["2"],
    datasets: ["2"],
  },
]

// Datasets data
export const mockDatasets: Dataset[] = [
  {
    id: "1",
    name: "Customer Transactions",
    type: "tabular",
    size: 1024 * 1024 * 2400, // 2.4GB
    records: 1200000,
    lastUpdated: "2024-03-31T10:00:00Z",
    usagePercentage: 75,
    schema: {
      id: "string",
      amount: "number",
      timestamp: "string",
      category: "string",
    },
  },
  {
    id: "2",
    name: "Product Images",
    type: "image",
    size: 1024 * 1024 * 15800, // 15.8GB
    records: 450000,
    lastUpdated: "2024-03-31T09:30:00Z",
    usagePercentage: 85,
    schema: {
      id: "string",
      image: "string",
      category: "string",
      metadata: "object",
    },
  },
  {
    id: "3",
    name: "User Reviews",
    type: "text",
    size: 1024 * 1024 * 856, // 856MB
    records: 2100000,
    lastUpdated: "2024-03-31T09:00:00Z",
    usagePercentage: 65,
    schema: {
      id: "string",
      text: "string",
      rating: "number",
      sentiment: "string",
    },
  },
  {
    id: "4",
    name: "Sensor Readings",
    type: "tabular",
    size: 1024 * 1024 * 4200, // 4.2GB
    records: 8500000,
    lastUpdated: "2024-03-31T08:30:00Z",
    usagePercentage: 45,
    schema: {
      id: "string",
      timestamp: "string",
      value: "number",
      sensor_id: "string",
    },
  },
]

// Analytics data
export const mockPerformanceData: PerformanceData[] = Array.from(
  { length: 24 },
  (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
    accuracy: 95 + Math.random() * 3,
    latency: 100 + Math.random() * 150,
    requests: Math.floor(Math.random() * 1000),
  })
)

export const mockUsageData: UsageData[] = [
  {
    endpoint: "Vision API",
    requests: 50000,
    errors: 150,
    latency: 120,
  },
  {
    endpoint: "Text API",
    requests: 35000,
    errors: 100,
    latency: 80,
  },
  {
    endpoint: "Recommendation API",
    requests: 25000,
    errors: 75,
    latency: 150,
  },
]

export const mockModelPerformance: ModelPerformance[] = [
  {
    modelId: "1",
    name: "Vision Transformer v2",
    accuracy: 98.5,
    averageLatency: 45,
    totalRequests: 125000,
    status: "active",
  },
  {
    modelId: "2",
    name: "BERT Language Model",
    accuracy: 94.2,
    averageLatency: 32,
    totalRequests: 89000,
    status: "training",
  },
  {
    modelId: "3",
    name: "Recommendation Engine",
    accuracy: 89.7,
    averageLatency: 120,
    totalRequests: 210000,
    status: "error",
  },
]

// Documentation sections
export const docSections: DocSection[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: Zap,
    subsections: ["Introduction", "Quick Start", "Installation", "Authentication"],
  },
  {
    id: "api-reference",
    name: "API Reference",
    icon: Code,
    subsections: ["REST API", "Python SDK", "Node.js SDK", "Endpoints"],
  },
  {
    id: "guides",
    name: "Guides & Tutorials",
    icon: Book,
    subsections: ["Basic Concepts", "Model Training", "Deployment", "Best Practices"],
  },
  {
    id: "examples",
    name: "Code Examples",
    icon: Terminal,
    subsections: ["Python", "JavaScript", "Curl", "WebSocket"],
  },
]

// Settings sections
export const settingSections: SettingSection[] = [
  {
    id: "profile",
    name: "Profile Settings",
    icon: User,
    description: "Manage your account details and preferences",
  },
  {
    id: "security",
    name: "Security",
    icon: Shield,
    description: "Configure your security settings and API keys",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
    description: "Choose what updates you want to hear about",
  },
  {
    id: "api",
    name: "API Settings",
    icon: Key,
    description: "View and manage your API keys",
  },
  {
    id: "storage",
    name: "Storage",
    icon: Database,
    description: "Configure your data storage preferences",
  },
  {
    id: "billing",
    name: "Billing",
    icon: CreditCard,
    description: "Manage your subscription and billing details",
  },
]

// Code examples
export const codeExamples: CodeExamples = {
  python: `from mindscape import Client

client = Client(api_key="your_api_key")

# Create a new model
model = client.create_model(
    name="My Model",
    type="classification",
    config={
        "architecture": "transformer",
        "layers": 12,
        "heads": 8
    }
)

# Train the model
model.train(
    dataset_id="dataset_123",
    epochs=10,
    batch_size=32
)

# Make predictions
predictions = model.predict(
    data=["sample1", "sample2"],
    batch_size=32
)`,
  javascript: `import { Client } from '@mindscape/sdk';

const client = new Client({
  apiKey: 'your_api_key'
});

// Create a new model
const model = await client.createModel({
  name: 'My Model',
  type: 'classification',
  config: {
    architecture: 'transformer',
    layers: 12,
    heads: 8
  }
});

// Train the model
await model.train({
  datasetId: 'dataset_123',
  epochs: 10,
  batchSize: 32
});

// Make predictions
const predictions = await model.predict({
  data: ['sample1', 'sample2'],
  batchSize: 32
});`,
  curl: `# Create a new model
curl -X POST https://api.mindscape.ai/v1/models \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Model",
    "type": "classification",
    "config": {
      "architecture": "transformer",
      "layers": 12,
      "heads": 8
    }
  }'

# Train the model
curl -X POST https://api.mindscape.ai/v1/models/model_123/train \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataset_id": "dataset_123",
    "epochs": 10,
    "batch_size": 32
  }'

# Make predictions
curl -X POST https://api.mindscape.ai/v1/models/model_123/predict \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": ["sample1", "sample2"],
    "batch_size": 32
  }'`,
} 