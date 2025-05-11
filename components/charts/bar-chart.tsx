"use client"

import { memo } from "react"
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart
} from "recharts"

export interface BarChartProps { 
  data: Array<{
    time: number;
    [key: string]: any;
  }>;
  dataKeys: string[];
  colors: string[];
  labels: string[];
}

// Memoized bar chart component for better rendering performance
const BarChart = memo(({ 
  data, 
  dataKeys,
  colors,
  labels
}: BarChartProps) => (
  <>
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis 
            dataKey="time" 
            tick={false}
            stroke="#666"
          />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
            formatter={(value) => [`${Number(value).toFixed(2)}`, '']}
            labelFormatter={() => 'Current Value'}
          />
          {dataKeys.map((key, index) => (
            <Bar 
              key={key} 
              dataKey={key} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
    <div className="flex justify-between mt-2 text-xs text-white/60">
      {labels.map((label, index) => (
        <span key={index}>◆ {label}</span>
      ))}
    </div>
  </>
));

// Add display name for better debugging
BarChart.displayName = 'BarChart';

export default BarChart; 