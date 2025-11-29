"use client"

interface MetricItem {
  name: string;
  value: number;
  color: string;
}

interface PerformanceComparisonProps {
  metrics: MetricItem[];
}

export function PerformanceComparison({ metrics }: PerformanceComparisonProps) {
  return (
    <div className="rounded-lg bg-black/40 border border-white/10 p-4 space-y-3">
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/70">{metric.name}</span>
              <span className="text-white/90">{metric.value}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${metric.color}`}
                style={{ width: `${metric.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 