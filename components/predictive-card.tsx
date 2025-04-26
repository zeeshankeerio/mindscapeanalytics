import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, TrendingUp, TrendingDown, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PredictionData {
  id: string;
  metric: string;
  current: number;
  predicted: number;
  unit: string;
  change: number;
  timeframe: string;
  confidence: number;
  alert?: boolean;
}

interface PredictiveCardProps {
  title?: string;
  description?: string;
  predictions?: PredictionData[];
  onDetails?: (id: string) => void;
}

export function PredictiveCard({
  title = "Predictive Analytics",
  description = "AI forecasts based on historical data",
  predictions = [
    {
      id: "pred1",
      metric: "Monthly Revenue",
      current: 124500,
      predicted: 138000,
      unit: "$",
      change: 10.8,
      timeframe: "Next month",
      confidence: 85,
      alert: false
    },
    {
      id: "pred2",
      metric: "Customer Churn",
      current: 5.2,
      predicted: 4.8,
      unit: "%",
      change: -7.7,
      timeframe: "Next quarter",
      confidence: 72,
      alert: false
    },
    {
      id: "pred3",
      metric: "Inventory Turnover",
      current: 12,
      predicted: 9,
      unit: "days",
      change: -25,
      timeframe: "Next month",
      confidence: 68,
      alert: true
    }
  ],
  onDetails = () => {}
}: PredictiveCardProps) {
  
  // Format number with unit
  const formatValue = (value: number, unit: string) => {
    if (unit === "$") {
      return `${unit}${value.toLocaleString()}`;
    } else {
      return `${value.toLocaleString()}${unit}`;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <LineChart className="h-5 w-5 mr-2 text-blue-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((pred) => (
            <div key={pred.id} className="border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm flex items-center">
                  {pred.metric}
                  {pred.alert && (
                    <AlertTriangle className="h-3 w-3 ml-1 text-amber-500" />
                  )}
                </h4>
                <Badge 
                  variant="outline" 
                  className="text-xs"
                >
                  {pred.timeframe}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 my-2">
                <div>
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="text-sm font-medium">{formatValue(pred.current, pred.unit)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Predicted</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{formatValue(pred.predicted, pred.unit)}</p>
                    <span className={`ml-2 text-xs flex items-center ${
                      pred.change > 0 
                        ? 'text-green-500' 
                        : pred.change < 0 
                          ? 'text-red-500' 
                          : 'text-gray-500'
                    }`}>
                      {pred.change > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(pred.change)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-muted-foreground">
                  Confidence: {pred.confidence}%
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => onDetails(pred.id)}
                >
                  Details
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 