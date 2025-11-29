"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart, ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const lineData = [
  { name: "Jan", value: 1000, value2: 1200 },
  { name: "Feb", value: 1500, value2: 1300 },
  { name: "Mar", value: 1300, value2: 1400 },
  { name: "Apr", value: 1800, value2: 1600 },
  { name: "May", value: 2000, value2: 1800 },
  { name: "Jun", value: 2300, value2: 2100 },
  { name: "Jul", value: 2500, value2: 2400 },
  { name: "Aug", value: 2700, value2: 2300 },
  { name: "Sep", value: 2900, value2: 2600 },
  { name: "Oct", value: 3100, value2: 2800 },
  { name: "Nov", value: 3300, value2: 3000 },
  { name: "Dec", value: 3500, value2: 3200 },
]

const barData = [
  { name: "Category A", value: 4000 },
  { name: "Category B", value: 3000 },
  { name: "Category C", value: 2000 },
  { name: "Category D", value: 2780 },
  { name: "Category E", value: 1890 },
  { name: "Category F", value: 2390 },
]

const areaData = [
  { name: "2018", value: 2400, value2: 1800 },
  { name: "2019", value: 1398, value2: 1200 },
  { name: "2020", value: 9800, value2: 8700 },
  { name: "2021", value: 3908, value2: 3000 },
  { name: "2022", value: 4800, value2: 4300 },
  { name: "2023", value: 3800, value2: 3500 },
]

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function DataVisualization() {
  const [activeChart, setActiveChart] = useState("line")

  return (
    <div className="max-w-5xl mx-auto">
      <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="area">Area Chart</TabsTrigger>
          <TabsTrigger value="pie">Pie Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="line" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={lineData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend content={<ChartLegend />} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                          name="Current Year"
                        />
                        <Line type="monotone" dataKey="value2" stroke="#10b981" strokeWidth={2} name="Previous Year" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bar" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={barData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend content={<ChartLegend />} />
                        <Bar dataKey="value" fill="#3b82f6" name="Value" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="area" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={areaData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend content={<ChartLegend />} />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stackId="1"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          name="Primary"
                        />
                        <Area
                          type="monotone"
                          dataKey="value2"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          name="Secondary"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Market Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                        <Legend content={<ChartLegend />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

