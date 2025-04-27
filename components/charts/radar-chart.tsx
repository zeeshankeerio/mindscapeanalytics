"use client"

import { memo } from "react"
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

export interface RadarChartProps { 
  data: Array<{
    subject: string;
    [key: string]: any;
  }>;
  dataKeys: string[];
  colors: string[];
  fillOpacity?: number;
  showLegend?: boolean;
}

// Memoized radar chart component for better rendering performance
const RadarChart = memo(({ 
  data, 
  dataKeys,
  colors,
  fillOpacity = 0.6,
  showLegend = false
}: RadarChartProps) => (
  <>
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#444" />
          <PolarAngleAxis dataKey="subject" stroke="#888" />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} stroke="#666" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
            formatter={(value) => [`${Number(value).toFixed(2)}`, '']}
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
          {dataKeys.map((key, index) => (
            <Radar 
              key={key} 
              name={key} 
              dataKey={key} 
              stroke={colors[index % colors.length]} 
              fill={colors[index % colors.length]} 
              fillOpacity={fillOpacity} 
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
    {!showLegend && (
      <div className="flex justify-between mt-2 text-xs text-white/60">
        {dataKeys.map((key, index) => (
          <span key={index}>◆ {key}</span>
        ))}
      </div>
    )}
  </>
));

// Add display name for better debugging
RadarChart.displayName = 'RadarChart';

export default RadarChart; 