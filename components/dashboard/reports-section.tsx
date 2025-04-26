"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Sparkles,
  Settings,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Filter,
  Calendar,
  Download as DownloadIcon,
  Share2,
  MoreVertical,
  FileSpreadsheet,
  FilePieChart,
  FileBarChart,
  FileLineChart,
  FileCheck,
  FileWarning,
  FileClock,
} from "lucide-react"

interface Report {
  id: string
  title: string
  type: "performance" | "security" | "usage" | "financial"
  status: "completed" | "processing" | "failed"
  createdAt: Date
  updatedAt: Date
  size: string
  format: "pdf" | "csv" | "excel"
  description: string
  metrics: {
    name: string
    value: number
    change: number
    trend: "up" | "down"
  }[]
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Monthly Performance Report",
    type: "performance",
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date(),
    size: "2.4MB",
    format: "pdf",
    description: "Comprehensive performance metrics and analysis",
    metrics: [
      {
        name: "API Response Time",
        value: 45,
        change: -5.2,
        trend: "up",
      },
      {
        name: "System Uptime",
        value: 99.9,
        change: 0.1,
        trend: "up",
      },
      {
        name: "Error Rate",
        value: 0.1,
        change: -0.05,
        trend: "up",
      },
    ],
  },
  {
    id: "2",
    title: "Security Audit Report",
    type: "security",
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date(),
    size: "1.8MB",
    format: "pdf",
    description: "Security assessment and vulnerability analysis",
    metrics: [
      {
        name: "Security Score",
        value: 95,
        change: 2.5,
        trend: "up",
      },
      {
        name: "Threats Detected",
        value: 12,
        change: -3,
        trend: "up",
      },
      {
        name: "Patch Compliance",
        value: 98,
        change: 1.2,
        trend: "up",
      },
    ],
  },
  {
    id: "3",
    title: "Usage Analytics Report",
    type: "usage",
    status: "processing",
    createdAt: new Date(),
    updatedAt: new Date(),
    size: "3.2MB",
    format: "excel",
    description: "User activity and resource utilization analysis",
    metrics: [
      {
        name: "Active Users",
        value: 12345,
        change: 8.3,
        trend: "up",
      },
      {
        name: "API Calls",
        value: 2456789,
        change: 12.5,
        trend: "up",
      },
      {
        name: "Storage Usage",
        value: 75,
        change: 5.2,
        trend: "up",
      },
    ],
  },
  {
    id: "4",
    title: "Financial Summary Report",
    type: "financial",
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date(),
    size: "1.5MB",
    format: "csv",
    description: "Revenue and cost analysis",
    metrics: [
      {
        name: "Revenue Growth",
        value: 15.2,
        change: 2.3,
        trend: "up",
      },
      {
        name: "Cost Efficiency",
        value: 92,
        change: 1.5,
        trend: "up",
      },
      {
        name: "Profit Margin",
        value: 28.5,
        change: 0.8,
        trend: "up",
      },
    ],
  },
]

export function ReportsSection() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const handleReportAction = (action: string, report: Report) => {
    switch (action) {
      case "download":
        console.log("Downloading report:", report.title)
        break
      case "share":
        console.log("Sharing report:", report.title)
        break
      case "delete":
        console.log("Deleting report:", report.title)
        break
    }
  }

  const getReportIcon = (type: Report["type"]) => {
    switch (type) {
      case "performance":
        return <FileBarChart className="h-5 w-5" />
      case "security":
        return <FileCheck className="h-5 w-5" />
      case "usage":
        return <FilePieChart className="h-5 w-5" />
      case "financial":
        return <FileSpreadsheet className="h-5 w-5" />
    }
  }

  const getStatusIcon = (status: Report["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "processing":
        return <FileClock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <FileWarning className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and manage system reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                      {getReportIcon(report.type)}
                      <CardTitle className="text-sm font-medium">
                        {report.title}
                      </CardTitle>
                    </div>
                    <Badge
                      variant={
                        report.status === "completed"
                          ? "default"
                          : report.status === "processing"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {report.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {report.description}
                    </p>
                    <div className="space-y-2">
                      {report.metrics.map((metric) => (
                        <div key={metric.name} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {metric.name}
                            </span>
                            <span className="text-xs font-medium">
                              {metric.value}
                              {metric.name.includes("Rate") || metric.name.includes("Percentage")
                                ? "%"
                                : ""}
                            </span>
                          </div>
                          <Progress
                            value={metric.value}
                            className="h-1"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {report.format.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {report.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleReportAction("download", report)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleReportAction("share", report)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleReportAction("delete", report)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports
                  .filter((report) => report.type === "performance")
                  .map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        {getReportIcon(report.type)}
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReportAction("download", report)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Security Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports
                  .filter((report) => report.type === "security")
                  .map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        {getReportIcon(report.type)}
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReportAction("download", report)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Usage Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports
                  .filter((report) => report.type === "usage")
                  .map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        {getReportIcon(report.type)}
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReportAction("download", report)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports
                  .filter((report) => report.type === "financial")
                  .map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        {getReportIcon(report.type)}
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReportAction("download", report)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 