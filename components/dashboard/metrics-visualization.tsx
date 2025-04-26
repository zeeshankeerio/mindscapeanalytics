"use client"

import { useMemo } from 'react'
import { motion } from "framer-motion"

interface MetricsProps {
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    trainingTime?: number;
    inferenceTime?: number;
  }
}

export function MetricsVisualization({ metrics }: MetricsProps) {
  const data = useMemo(() => [
    { name: "Accuracy", value: metrics.accuracy },
    { name: "Precision", value: metrics.precision },
    { name: "Recall", value: metrics.recall },
    { name: "F1 Score", value: metrics.f1Score },
  ], [metrics.accuracy, metrics.precision, metrics.recall, metrics.f1Score]);
  
  return (
    <div className="p-4 bg-background/60 rounded-lg border border-primary/10">
      <h4 className="text-sm font-medium mb-3">Performance Metrics</h4>
      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div 
            key={item.name} 
            className="space-y-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{item.name}</span>
              <span className="text-xs font-medium">{item.value.toFixed(1)}%</span>
            </div>
            <div className="relative h-2 w-full bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="absolute h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 