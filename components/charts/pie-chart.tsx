"use client"

import { memo } from "react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export interface PieChartProps { 
  data: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  dataKey: string;
  nameKey: string;
  colors: string[];
  labels: Array<{ text: string; color: string }>;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
}

// Memoized pie chart component for better rendering performance
const PieChart = memo(({ 
  data, 
  dataKey,
  nameKey,
  colors,
  labels,
  innerRadius = 40,
  outerRadius = 70,
  paddingAngle = 2
}: PieChartProps) => (
  <>
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            dataKey={dataKey}
            nameKey={nameKey}
            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
            formatter={(value) => [`${value}`, '']}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-white/60">
      {labels.map((label, index) => (
        <span key={index}>◆ <span className={`text-${label.color}`}>{label.text}</span></span>
      ))}
    </div>
  </>
));

// Add display name for better debugging
PieChart.displayName = 'PieChart';

export default PieChart; 