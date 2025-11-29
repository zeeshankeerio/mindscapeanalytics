"use client"

import { memo } from "react"
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis
} from "recharts"

export interface ScatterChartProps { 
  data: Array<Array<{
    x: number;
    y: number;
    z?: number;
    [key: string]: any;
  }>>;
  names: string[];
  colors: string[];
  zAxisRange?: [number, number];
  showZAxis?: boolean;
}

// Memoized scatter chart component for better rendering performance
const ScatterChart = memo(({ 
  data, 
  names,
  colors,
  zAxisRange = [20, 100],
  showZAxis = false
}: ScatterChartProps) => (
  <>
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis 
            dataKey="x" 
            name="X"
            stroke="#666"
            domain={['dataMin', 'dataMax']}
            type="number"
          />
          <YAxis 
            dataKey="y" 
            name="Y"
            stroke="#666"
            domain={['dataMin', 'dataMax']}
            type="number"
          />
          {showZAxis && (
            <ZAxis 
              dataKey="z" 
              range={zAxisRange} 
              name="Z"
            />
          )}
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value) => [`${Number(value).toFixed(2)}`, '']}
          />
          {data.map((points, index) => (
            <Scatter 
              key={index} 
              name={names[index]} 
              data={points} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
    <div className="flex justify-between mt-2 text-xs text-white/60">
      {names.map((name, index) => (
        <span key={index}>◆ {name}</span>
      ))}
    </div>
  </>
));

// Add display name for better debugging
ScatterChart.displayName = 'ScatterChart';

export default ScatterChart; 