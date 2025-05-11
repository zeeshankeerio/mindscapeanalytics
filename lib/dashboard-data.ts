// Sample API usage data for the dashboard
export const apiUsageSampleData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      name: "Prediction API",
      data: [12500, 14000, 15700, 18900, 21200, 19800, 22500, 24100, 26800, 28900, 31200, 32800]
    },
    {
      name: "NLP API",
      data: [9800, 10200, 11500, 12100, 13700, 12900, 15100, 16400, 17800, 19200, 20900, 22100]
    },
    {
      name: "Vision API",
      data: [4200, 5100, 6200, 7800, 8900, 9500, 10800, 12300, 13700, 15200, 16900, 18400]
    },
    {
      name: "Data Processing API",
      data: [3100, 3800, 4500, 5200, 6100, 5800, 7200, 8500, 9800, 11200, 12800, 14100]
    }
  ],
  total: 989400
}

// Sample model performance data
export const modelPerformanceData = [
  {
    id: "model-1",
    name: "Text Classification",
    accuracy: 94.2,
    f1Score: 0.93,
    precision: 0.92,
    recall: 0.94,
    latency: 41, // ms
    version: "2.3.1",
    lastUpdated: "2023-10-15",
    status: "active"
  },
  {
    id: "model-2",
    name: "Named Entity Recognition",
    accuracy: 92.7,
    f1Score: 0.91,
    precision: 0.89,
    recall: 0.93,
    latency: 28, // ms
    version: "1.8.4",
    lastUpdated: "2023-09-22",
    status: "active"
  },
  {
    id: "model-3",
    name: "Sentiment Analysis",
    accuracy: 89.5,
    f1Score: 0.88,
    precision: 0.86,
    recall: 0.90,
    latency: 35, // ms
    version: "3.1.2",
    lastUpdated: "2023-11-03",
    status: "active"
  },
  {
    id: "model-4",
    name: "Image Classification",
    accuracy: 96.1,
    f1Score: 0.95,
    precision: 0.94,
    recall: 0.96,
    latency: 67, // ms
    version: "4.0.0",
    lastUpdated: "2023-11-17",
    status: "active"
  },
  {
    id: "model-5",
    name: "Object Detection",
    accuracy: 91.8,
    f1Score: 0.90,
    precision: 0.88,
    recall: 0.92,
    latency: 84, // ms
    version: "2.5.3",
    lastUpdated: "2023-10-29",
    status: "active"
  },
  {
    id: "model-6",
    name: "Recommendation Engine",
    accuracy: 87.3,
    f1Score: 0.85,
    precision: 0.83,
    recall: 0.87,
    latency: 102, // ms
    version: "1.4.7",
    lastUpdated: "2023-09-08",
    status: "maintenance"
  }
]

// Sample projects data
export const projectsData = [
  {
    id: "proj-1",
    name: "Customer Churn Prediction",
    description: "AI model to predict customer churn based on behavioral and engagement metrics",
    status: "active",
    progress: 78,
    team: ["user-1", "user-3", "user-5"],
    lastActive: "2023-11-19T14:32:45Z",
    modelId: "model-1",
    createdAt: "2023-08-12T09:15:22Z"
  },
  {
    id: "proj-2",
    name: "Content Recommendation System",
    description: "Personalized content recommendation engine using collaborative filtering",
    status: "active",
    progress: 92,
    team: ["user-2", "user-4", "user-6", "user-7"],
    lastActive: "2023-11-20T10:12:33Z",
    modelId: "model-6",
    createdAt: "2023-07-25T11:42:18Z"
  },
  {
    id: "proj-3",
    name: "Visual Product Search",
    description: "Computer vision model to identify products from user-submitted images",
    status: "active",
    progress: 64,
    team: ["user-1", "user-5", "user-8"],
    lastActive: "2023-11-18T16:45:29Z",
    modelId: "model-4",
    createdAt: "2023-09-04T13:27:55Z"
  },
  {
    id: "proj-4",
    name: "Customer Support Automation",
    description: "NLP system for automating responses to common customer inquiries",
    status: "paused",
    progress: 45,
    team: ["user-2", "user-3", "user-7"],
    lastActive: "2023-11-14T09:08:12Z",
    modelId: "model-3",
    createdAt: "2023-10-10T08:33:41Z"
  },
  {
    id: "proj-5",
    name: "Fraud Detection System",
    description: "Real-time transaction monitoring and anomaly detection",
    status: "active",
    progress: 87,
    team: ["user-4", "user-6", "user-8", "user-9"],
    lastActive: "2023-11-20T11:55:02Z",
    modelId: "model-2",
    createdAt: "2023-08-30T15:19:36Z"
  }
]

// Sample business insights data
export const businessInsightsData = {
  revenueImpact: {
    total: 1250000,
    byProduct: [
      { name: "Enterprise AI", value: 525000 },
      { name: "DataOps Platform", value: 320000 },
      { name: "ML Consulting", value: 220000 },
      { name: "API Credits", value: 185000 }
    ],
    trend: "+15.3%"
  },
  costReduction: {
    total: 780000,
    byCategory: [
      { name: "Manual Processing", value: 340000 },
      { name: "Error Reduction", value: 210000 },
      { name: "Process Optimization", value: 130000 },
      { name: "Resource Allocation", value: 100000 }
    ],
    trend: "+22.7%"
  },
  customerImpact: {
    total: 24500,
    metrics: [
      { name: "Retention Increase", value: "12.5%" },
      { name: "CSAT Score", value: "92/100" },
      { name: "Engagement Rate", value: "+28.3%" },
      { name: "Support Ticket Reduction", value: "-42.6%" }
    ]
  }
} 