import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Check, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RecommendationData {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: 'immediate' | 'short-term' | 'long-term';
  implemented: boolean;
}

interface RecommendationsCardProps {
  title?: string;
  description?: string;
  recommendations?: RecommendationData[];
  onImplement?: (id: string) => void;
  onViewAll?: () => void;
}

export function RecommendationsCard({
  title = "Recommendations",
  description = "AI-driven recommendations for business improvement",
  recommendations = [
    {
      id: "rec1",
      title: "Optimize website checkout flow",
      description: "Simplify the checkout process to reduce cart abandonment by an estimated 12%",
      priority: 'high',
      timeframe: 'immediate',
      implemented: false
    },
    {
      id: "rec2",
      title: "Implement customer feedback system",
      description: "Add post-purchase surveys to gather structured customer feedback",
      priority: 'medium',
      timeframe: 'short-term',
      implemented: true
    },
    {
      id: "rec3",
      title: "Expand product range in high-margin categories",
      description: "Analysis shows opportunity for 20% revenue growth in premium accessories",
      priority: 'medium',
      timeframe: 'long-term',
      implemented: false
    }
  ],
  onImplement = () => {},
  onViewAll = () => {}
}: RecommendationsCardProps) {
  // Color mapping for priority badges
  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-orange-100 text-orange-800 border-orange-200",
    low: "bg-green-100 text-green-800 border-green-200"
  };
  
  // Icon mapping for timeframe indicators
  const timeframeIcons = {
    immediate: <Clock className="h-3 w-3 text-red-500" />,
    'short-term': <Clock className="h-3 w-3 text-orange-500" />,
    'long-term': <Clock className="h-3 w-3 text-green-500" />
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className={`p-3 rounded-md border ${rec.implemented ? 'bg-muted/30 border-muted' : 'bg-white border-muted'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-medium text-sm ${rec.implemented ? 'text-muted-foreground line-through' : ''}`}>
                  {rec.title}
                </h4>
                <Badge className={`${priorityColors[rec.priority]}`}>
                  {rec.priority}
                </Badge>
              </div>
              
              <p className={`text-xs ${rec.implemented ? 'text-muted-foreground' : 'text-gray-600'}`}>
                {rec.description}
              </p>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  {timeframeIcons[rec.timeframe]}
                  <span className="ml-1">{rec.timeframe}</span>
                </div>
                
                {!rec.implemented ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs" 
                    onClick={() => onImplement(rec.id)}
                  >
                    Implement
                    <Check className="ml-1 h-3 w-3" />
                  </Button>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    Implemented
                  </Badge>
                )}
              </div>
            </div>
          ))}
          
          <Button variant="ghost" size="sm" className="w-full" onClick={onViewAll}>
            View all recommendations
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 