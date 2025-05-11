import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  colorful?: boolean;
  badgeTrendReversed?: boolean;
  gridSpan?: string;
}

/**
 * An optimized metric card component for displaying segment metrics
 * Uses React.memo to prevent unnecessary re-renders
 */
const SegmentMetricCard = React.memo(({ 
  title, 
  value, 
  trend, 
  icon, 
  colorful = false,
  badgeTrendReversed = false,
  gridSpan = "col-span-1"
}: MetricCardProps) => {
  const isPositive = badgeTrendReversed ? trend < 0 : trend > 0;
  
  return (
    <div className={`p-4 rounded-lg ${colorful ? 'bg-white/10' : 'bg-muted/30'} ${gridSpan}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-sm font-medium ${colorful ? 'text-white/80' : 'text-muted-foreground'}`}>{title}</h3>
        <div className={`p-1.5 rounded-full ${colorful ? 'bg-white/20' : 'bg-background'}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between mt-2">
        <div className={`text-xl font-semibold ${colorful ? 'text-white' : ''}`}>{value}</div>
        {trend !== 0 && (
          <Badge className={`text-xs ${
            isPositive 
              ? (colorful ? 'bg-emerald-500/30 text-emerald-200' : 'bg-emerald-500/10 text-emerald-500') 
              : (colorful ? 'bg-red-500/30 text-red-200' : 'bg-red-500/10 text-red-500')
          } px-2 py-1`}>
            {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {Math.abs(trend)}%
          </Badge>
        )}
      </div>
    </div>
  );
});

SegmentMetricCard.displayName = 'SegmentMetricCard';

export default SegmentMetricCard; 