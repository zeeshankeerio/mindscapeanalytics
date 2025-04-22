import type * as React from "react"

const Chart = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}

const ChartContainer = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}

const ChartTooltip = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}

const ChartTooltipContent = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}

const ChartLegend = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}

const ChartLegendItem = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem }

