"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockModels } from "@/lib/mock-data"
import { Brain, Plus, Search } from "lucide-react"

export default function ModelsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Models</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and monitor your AI models
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Model
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            className="pl-8"
          />
                      </div>
                    </div>

      {/* Models Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockModels.map((model) => (
          <Card key={model.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{model.name}</CardTitle>
              <div className="rounded-full bg-red-600/10 p-2">
                <Brain className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="text-sm font-medium">{model.type}</p>
                        </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-sm font-medium">{model.status}</p>
                      </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-sm font-medium">
                    {model.accuracy.toFixed(1)}%
                  </p>
                    </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Version</p>
                  <p className="text-sm font-medium">{model.version}</p>
                      </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-sm font-medium">
                    {model.totalRequests.toLocaleString()}
                  </p>
                      </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">
                    {new Date(model.lastUpdated).toLocaleDateString()}
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

