// Model types
export type UserRole = "ADMIN" | "USER"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export type ModelType = "Vision" | "Language" | "Analytics"
export type ModelStatus = "active" | "training" | "error" | "archived"

export interface Model {
  id: string
  name: string
  type: ModelType
  status: ModelStatus
  accuracy: number
  totalRequests: number
  lastUpdated: string
  version: string
  latency: number
}

// Project types
export type ProjectType = "Vision" | "Language" | "Analytics"
export type ProjectStatus = "active" | "archived" | "planning"

export interface Project {
  id: string
  name: string
  description: string
  type: ProjectType
  status: ProjectStatus
  progress: number
  lastUpdated: string
  models: string[]
  datasets: string[]
}

// Dataset types
export type DatasetType = "tabular" | "image" | "text"
export type SchemaType = "string" | "number" | "object"

export interface DatasetSchema {
  [key: string]: SchemaType
}

export interface Dataset {
  id: string
  name: string
  type: DatasetType
  size: number
  records: number
  lastUpdated: string
  usagePercentage: number
  schema: DatasetSchema
}

// Analytics types
export interface PerformanceData {
  timestamp: string
  accuracy: number
  latency: number
  requests: number
}

export interface UsageData {
  endpoint: string
  requests: number
  errors: number
  latency: number
}

export interface ModelPerformance {
  modelId: string
  name: string
  accuracy: number
  averageLatency: number
  totalRequests: number
  status: ModelStatus
}

// Documentation types
export interface DocSection {
  id: string
  name: string
  icon: any // Lucide icon component
  subsections: string[]
}

// Settings types
export interface SettingSection {
  id: string
  name: string
  icon: any // Lucide icon component
  description: string
}

export type CodeLanguage = "python" | "javascript" | "curl"

export type CodeExamples = Record<CodeLanguage, string> 