"use client"

import { memo } from "react"
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart as RechartsAreaChart
} from "recharts"

export interface AreaChartProps { 
  data: Array<{
    time: number;
    [key: string]: any;
  }>;
  dataKeys: string[];
  colors: string[];
  labels: string[];
  fillOpacity?: number;
  curved?: boolean;
  stacked?: boolean;
}

// Memoized area chart component for better rendering performance
const AreaChart = memo(({ 
  data, 
  dataKeys,
  colors,
  labels,
  fillOpacity = 0.6,
  curved = true,
  stacked = false
}: AreaChartProps) => (
  <>
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          <defs>
            {dataKeys.map((key, index) => (
              <linearGradient key={`gradient-${key}`} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>
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
            <Area 
              key={key} 
              type={curved ? "monotone" : "linear"}
              dataKey={key} 
              stackId={stacked ? "1" : undefined}
              stroke={colors[index % colors.length]} 
              fillOpacity={fillOpacity}
              fill={`url(#color-${key})`}
            />
          ))}
        </RechartsAreaChart>
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
AreaChart.displayName = 'AreaChart';

export default AreaChart; 