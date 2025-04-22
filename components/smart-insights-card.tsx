import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SmartInsightsCardProps {
  title?: string;
  description?: string;
  insights?: Array<{
    id: string;
    content: string;
    category: string;
    confidence: number;
  }>;
  onViewMore?: () => void;
}

export function SmartInsightsCard({
  title = "Smart Insights",
  description = "AI-generated insights based on your business data",
  insights = [
    { 
      id: "1", 
      content: "Customer retention increased by 15% after implementing the new loyalty program", 
      category: "customer", 
      confidence: 95 
    },
    { 
      id: "2", 
      content: "Product A sales are trending 8% higher than forecasted for Q3", 
      category: "sales", 
      confidence: 88 
    },
    { 
      id: "3", 
      content: "Website conversion rate shows opportunity for improvement in the checkout flow", 
      category: "marketing", 
      confidence: 82 
    }
  ],
  onViewMore = () => {}
}: SmartInsightsCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map(insight => (
            <div key={insight.id} className="p-3 bg-muted/50 rounded-md">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
                  {insight.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {insight.confidence}% confidence
                </span>
              </div>
              <p className="text-sm">{insight.content}</p>
            </div>
          ))}
          
          <Button variant="ghost" size="sm" className="w-full mt-2" onClick={onViewMore}>
            View more insights
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 