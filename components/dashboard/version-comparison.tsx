"use client"

import { useMemo } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Import the MetricsVisualization component
import { MetricsVisualization } from "./metrics-visualization"

interface VersionProps {
  versions: Array<{
    id: string;
    version: string;
    status: "active" | "archived" | "deprecated";
    createdAt: Date;
    updatedAt: Date;
    metrics: {
      accuracy: number;
      precision: number;
      recall: number;
      f1Score: number;
      trainingTime: number;
      inferenceTime: number;
    };
    trainingData: {
      size: number;
      samples: number;
      features: number;
    };
    deployment: {
      status: "deployed" | "pending" | "failed";
      instances: number;
      region: string;
      endpoint: string;
    };
  }>
}

export function VersionComparisonView({ versions }: VersionProps) {
  // Only use versions that have complete data
  const validVersions = useMemo(() => 
    versions.filter(v => 
      v.metrics && 
      typeof v.metrics.accuracy === 'number' && 
      typeof v.metrics.precision === 'number'
    ).slice(0, 2),
    [versions]
  );
  
  // Prepare comparison data for chart
  const comparisonData = useMemo(() => {
    if (validVersions.length < 2) return [];
    
    return [
      {
        name: 'Accuracy',
        [validVersions[0].version]: validVersions[0].metrics.accuracy,
        [validVersions[1].version]: validVersions[1].metrics.accuracy,
      },
      {
        name: 'Precision',
        [validVersions[0].version]: validVersions[0].metrics.precision,
        [validVersions[1].version]: validVersions[1].metrics.precision,
      },
      {
        name: 'Recall',
        [validVersions[0].version]: validVersions[0].metrics.recall,
        [validVersions[1].version]: validVersions[1].metrics.recall,
      },
      {
        name: 'F1 Score',
        [validVersions[0].version]: validVersions[0].metrics.f1Score,
        [validVersions[1].version]: validVersions[1].metrics.f1Score,
      },
    ];
  }, [validVersions]);
  
  // Render the comparison view with cards for each version
  return (
    <div className="space-y-4">
      {comparisonData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-64 border border-primary/10 rounded-lg p-4 bg-background/60"
        >
          <h4 className="text-sm font-medium mb-2">Performance Comparison</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={comparisonData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey={validVersions[0].version} fill="#8884d8" />
              <Bar dataKey={validVersions[1].version} fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {validVersions.map((version, index) => (
          <motion.div
            key={version.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Version {version.version}</CardTitle>
                  <Badge variant={version.status === "active" ? "default" : "outline"}>
                    {version.status}
                  </Badge>
                </div>
                <CardDescription>
                  Updated {version.updatedAt.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricsVisualization metrics={version.metrics} />
                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="block text-muted-foreground">Training Time</span>
                    <span className="font-medium">{version.metrics.trainingTime} min</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">Inference Time</span>
                    <span className="font-medium">{version.metrics.inferenceTime} ms</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">Data Size</span>
                    <span className="font-medium">{version.trainingData.size} GB</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">Samples</span>
                    <span className="font-medium">{version.trainingData.samples.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <span className="text-xs text-muted-foreground">
                  Deployment: {version.deployment.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {version.deployment.instances} instances
                </span>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 