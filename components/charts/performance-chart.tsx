"use client"

import { memo } from "react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart
} from "recharts"

export interface PerformanceChartProps { 
  data: Array<{
    time: number;
    [key: string]: any;
  }>;
  leftDataKey: string;
  rightDataKey: string;
  leftColor: string;
  rightColor: string;
  leftLabel: string;
  rightLabel: string;
}

// Memoized performance chart component for better rendering performance
const PerformanceChart = memo(({ 
  data, 
  leftDataKey, 
  rightDataKey, 
  leftColor, 
  rightColor,
  leftLabel,
  rightLabel
}: PerformanceChartProps) => (
  <>
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis 
            dataKey="time" 
            tick={false}
            stroke="#666"
          />
          <YAxis yAxisId="left" orientation="left" stroke={leftColor} />
          <YAxis yAxisId="right" orientation="right" stroke={rightColor} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
            formatter={(value) => [`${Number(value).toFixed(2)}`, '']}
            labelFormatter={() => 'Current Value'}
          />
          <Line yAxisId="left" type="monotone" dataKey={leftDataKey} stroke={leftColor} activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey={rightDataKey} stroke={rightColor} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="flex justify-between mt-2 text-xs text-white/60">
      <span>◆ {leftLabel}</span>
      <span>◆ {rightLabel}</span>
    </div>
  </>
));

// Add display name for better debugging
PerformanceChart.displayName = 'PerformanceChart';

export default PerformanceChart; 