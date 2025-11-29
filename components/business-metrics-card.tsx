import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, TrendingUp, TrendingDown } from "lucide-react";

interface MetricData {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

interface BusinessMetricsCardProps {
  title?: string;
  description?: string;
  metrics?: MetricData[];
}

export function BusinessMetricsCard({
  title = "Business Metrics",
  description = "Key performance indicators",
  metrics = [
    { label: "Revenue", value: "$124,500", change: 12.3, trend: 'up' },
    { label: "Customers", value: "1,245", change: 5.8, trend: 'up' },
    { label: "Conversion Rate", value: "4.2%", change: -0.3, trend: 'down' },
    { label: "Avg. Order Value", value: "$102", change: 3.1, trend: 'up' }
  ]
}: BusinessMetricsCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <BarChart className="h-5 w-5 mr-2 text-purple-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold">{metric.value}</span>
                <div className={`flex items-center text-xs font-medium ${
                  metric.trend === 'up' ? 'text-green-500' : 
                  metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  ) : null}
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 