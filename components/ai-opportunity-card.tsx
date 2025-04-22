import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OpportunityData {
  id: string;
  title: string;
  description: string;
  impact: number;
  effort: number;
  category: string;
}

interface AIOpportunityCardProps {
  title?: string;
  description?: string;
  opportunities?: OpportunityData[];
  onViewDetails?: (id: string) => void;
}

export function AIOpportunityCard({
  title = "AI Opportunities",
  description = "Identified opportunities for AI implementation",
  opportunities = [
    {
      id: "opp1",
      title: "Predictive Inventory Management",
      description: "AI-powered system to optimize inventory levels based on predictive demand analysis",
      impact: 85,
      effort: 60,
      category: "operations"
    },
    {
      id: "opp2",
      title: "Customer Support Chatbot",
      description: "Advanced chatbot to handle common customer inquiries and support requests",
      impact: 70,
      effort: 45,
      category: "customer-service"
    },
    {
      id: "opp3",
      title: "Marketing Campaign Optimization",
      description: "AI algorithms to optimize ad spend and campaign targeting based on performance data",
      impact: 80,
      effort: 55,
      category: "marketing"
    }
  ],
  onViewDetails = () => {}
}: AIOpportunityCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Brain className="h-5 w-5 mr-2 text-indigo-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {opportunities.map((opp) => (
            <div key={opp.id} className="space-y-2">
              <div className="flex justify-between">
                <h4 className="font-medium text-sm">{opp.title}</h4>
                <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                  {opp.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{opp.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Impact</span>
                    <span>{opp.impact}%</span>
                  </div>
                  <Progress value={opp.impact} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Effort</span>
                    <span>{opp.effort}%</span>
                  </div>
                  <Progress value={opp.effort} className="h-2" />
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-1 text-xs" 
                onClick={() => onViewDetails(opp.id)}
              >
                View details
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 