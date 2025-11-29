"use client"

import { memo } from "react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart
} from "recharts"

export interface LineChartProps { 
  data: Array<{
    time: number;
    [key: string]: any;
  }>;
  dataKeys: string[];
  colors: string[];
  labels: string[];
  curved?: boolean;
}

// Memoized line chart component for better rendering performance
const LineChart = memo(({ 
  data, 
  dataKeys,
  colors,
  labels,
  curved = true
}: LineChartProps) => (
  <>
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
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
            <Line 
              key={key} 
              type={curved ? "monotone" : "linear"}
              dataKey={key} 
              stroke={colors[index % colors.length]} 
              dot={{ stroke: colors[index % colors.length], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
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
LineChart.displayName = 'LineChart';

export default LineChart; 