"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  mockModelPerformance,
  mockPerformanceData,
  mockUsageData,
} from "@/lib/mock-data"
import { BarChart, Brain, Database, LineChart } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor your models and API performance
        </p>
      </div>

      {/* Performance Overview */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockModelPerformance.reduce((acc, curr) => acc + curr.accuracy, 0) / mockModelPerformance.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all models
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Latency</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockModelPerformance.reduce((acc, curr) => acc + curr.averageLatency, 0) / mockModelPerformance.length).toFixed(1)}ms
            </div>
            <p className="text-xs text-muted-foreground">
              Across all models
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockModelPerformance.reduce((acc, curr) => acc + curr.totalRequests, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dataset Usage</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">
              Storage utilization
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Model Performance */}
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">Model Performance</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockModelPerformance.map((model) => (
            <Card key={model.modelId}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{model.name}</CardTitle>
                <div className="rounded-full bg-red-600/10 p-2">
                  <Brain className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-sm font-medium">{model.accuracy.toFixed(1)}%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Latency</p>
                    <p className="text-sm font-medium">{model.averageLatency.toFixed(1)}ms</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Requests</p>
                    <p className="text-sm font-medium">{model.totalRequests.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-sm font-medium">{model.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* API Usage */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">API Usage</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockUsageData.map((endpoint) => (
            <Card key={endpoint.endpoint}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{endpoint.endpoint}</CardTitle>
                <div className="rounded-full bg-red-600/10 p-2">
                  <BarChart className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Requests</p>
                    <p className="text-sm font-medium">{endpoint.requests.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Errors</p>
                    <p className="text-sm font-medium">{endpoint.errors.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Latency</p>
                    <p className="text-sm font-medium">{endpoint.latency.toFixed(1)}ms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

