"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockDatasets } from "@/lib/mock-data"
import { Database, Plus, Search } from "lucide-react"

export default function DatasetsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Datasets</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your training and validation datasets
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Dataset
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search datasets..."
            className="pl-8"
          />
        </div>
      </div>

      {/* Datasets Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDatasets.map((dataset) => (
          <Card key={dataset.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dataset.name}</CardTitle>
              <div className="rounded-full bg-red-600/10 p-2">
                <Database className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="text-sm font-medium">{dataset.type}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="text-sm font-medium">{dataset.size}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Records</p>
                  <p className="text-sm font-medium">{dataset.records.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Usage</p>
                  <p className="text-sm font-medium">{dataset.usagePercentage}%</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">
                    {new Date(dataset.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 