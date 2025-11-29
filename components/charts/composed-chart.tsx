"use client"

import { memo } from "react"
import {
  ComposedChart as RechartsComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

export interface ChartElement {
  type: 'line' | 'bar' | 'area';
  dataKey: string;
  color: string;
  label: string;
  yAxisId?: 'left' | 'right';
  fillOpacity?: number;
}

export interface ComposedChartProps { 
  data: Array<{
    time: number;
    [key: string]: any;
  }>;
  elements: ChartElement[];
  showLegend?: boolean;
}

// Memoized composed chart component for better rendering performance
const ComposedChart = memo(({ 
  data, 
  elements,
  showLegend = false
}: ComposedChartProps) => {
  const hasRightAxis = elements.some(e => e.yAxisId === 'right');
  
  return (
    <>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <XAxis 
              dataKey="time" 
              tick={false}
              stroke="#666"
            />
            <YAxis yAxisId="left" orientation="left" stroke="#666" />
            {hasRightAxis && <YAxis yAxisId="right" orientation="right" stroke="#666" />}
            <Tooltip 
              contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
              formatter={(value) => [`${Number(value).toFixed(2)}`, '']}
              labelFormatter={() => 'Current Value'}
            />
            {showLegend && (
              <Legend 
                iconType="circle" 
                wrapperStyle={{ 
                  fontSize: "12px",
                  color: "white",
                  opacity: 0.6
                }} 
              />
            )}
            
            {elements.map((element, index) => {
              const commonProps = {
                key: element.dataKey,
                dataKey: element.dataKey,
                name: element.label,
                yAxisId: element.yAxisId || 'left',
                stroke: element.color
              };
              
              switch (element.type) {
                case 'line':
                  return <Line type="monotone" {...commonProps} />;
                case 'bar':
                  return <Bar {...commonProps} fill={element.color} />;
                case 'area':
                  return (
                    <Area 
                      type="monotone" 
                      {...commonProps} 
                      fill={element.color} 
                      fillOpacity={element.fillOpacity || 0.6} 
                    />
                  );
                default:
                  return null;
              }
            })}
          </RechartsComposedChart>
        </ResponsiveContainer>
      </div>
      {!showLegend && (
        <div className="flex justify-between mt-2 text-xs text-white/60">
          {elements.map((element, index) => (
            <span key={index}>◆ {element.label}</span>
          ))}
        </div>
      )}
    </>
  );
});

// Add display name for better debugging
ComposedChart.displayName = 'ComposedChart';

export default ComposedChart; 