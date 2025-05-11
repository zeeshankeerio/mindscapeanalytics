import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  chartType?: string;
  setChartType?: (type: 'donut' | 'pie' | 'radial' | '3d') => void;
  customMessage?: string;
  customActions?: React.ReactNode;
}

/**
 * A reusable error fallback component for segmentation visualizations
 * Displays error details and provides reset/recovery options
 */
export function SegmentationErrorFallback({
  error,
  resetErrorBoundary,
  chartType,
  setChartType,
  customMessage,
  customActions
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
      <p className="text-sm text-muted-foreground mb-4">
        {customMessage || `Could not render visualization: ${error.message}`}
      </p>
      
      {/* Chart type selection buttons if chart type state is provided */}
      {chartType && setChartType && (
        <div className="flex gap-2 mb-4">
          <Button 
            variant={chartType !== 'donut' ? 'outline' : 'default'} 
            size="sm"
            onClick={() => {
              setChartType('donut');
              resetErrorBoundary();
            }}
          >
            Donut Chart
          </Button>
          <Button 
            variant={chartType !== 'pie' ? 'outline' : 'default'} 
            size="sm"
            onClick={() => {
              setChartType('pie');
              resetErrorBoundary();
            }}
          >
            Pie Chart
          </Button>
        </div>
      )}
      
      {/* Custom actions if provided */}
      {customActions || (
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetErrorBoundary}
        >
          Try Again
        </Button>
      )}
    </div>
  );
} 