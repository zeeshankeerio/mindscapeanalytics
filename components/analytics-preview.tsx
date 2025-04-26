"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  PieChart,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CalendarIcon,
  ChevronDown,
  Download,
  RefreshCw,
  Zap,
  Clock,
  Users,
  DollarSign,
  Percent,
  Filter,
  Settings,
  Maximize2,
  Share2,
  Brain,
  Shield,
  Pause,
  Play,
  BarChart,
  Table,
  BarChart3,
} from "lucide-react"

// Import Recharts components
import {
  Line,
  Bar,
  Pie,
  Cell,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Brush,
  LineChart,
  AreaChart,
  Sector,
} from "recharts"

// Import chart components
import { ChartContainer } from "@/components/ui/chart"

// Generate deterministic data for charts
const generateErrorDistribution = () => [
  { name: "Network", value: 35, trend: "+5%", color: "#ef4444" },
  { name: "Server", value: 25, trend: "-2%", color: "#dc2626" },
  { name: "Client", value: 20, trend: "+3%", color: "#b91c1c" },
  { name: "Database", value: 15, trend: "-1%", color: "#991b1b" },
  { name: "Other", value: 5, trend: "0%", color: "#7f1d1d" },
];

// Generate deterministic time series data
const generateTimeSeriesData = (days = 30) => {
  const data = [];
  const now = new Date();
  let baseValue = 1000;
  let baseSecondaryValue = 800;
  let baseTertiaryValue = 600;

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some realistic variation
    const dailyVariation = Math.sin(i * 0.2) * 0.1;
    const weeklyTrend = Math.sin(i * 0.1) * 0.05;
    const randomNoise = (Math.random() - 0.5) * 0.05;
    
    const value = baseValue * (1 + dailyVariation + weeklyTrend + randomNoise);
    const secondaryValue = baseSecondaryValue * (1 + dailyVariation * 0.8 + weeklyTrend * 0.7 + randomNoise * 0.6);
    const tertiaryValue = baseTertiaryValue * (1 + dailyVariation * 0.6 + weeklyTrend * 0.5 + randomNoise * 0.4);

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(value),
      secondaryValue: Math.round(secondaryValue),
      tertiaryValue: Math.round(tertiaryValue)
    });
  }
  return data;
};

// Generate deterministic revenue data
const generateRevenueData = (months = 12) => {
  const data = [];
  const now = new Date();
  const currentMonth = now.getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let i = months - 1; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = now.getFullYear() - (currentMonth < i ? 1 : 0);

    data.push({
      name: `${monthNames[monthIndex]} ${year}`,
      actual: 100000,
      target: 110000,
      expenses: 40000,
      profit: 60000,
    });
  }
  return data;
};

// Generate deterministic user data
const generateUserData = (days = 30) => {
  const data = [];
  const now = new Date();
  let totalUsers = 10000;

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const weekendFactor = date.getDay() === 0 || date.getDay() === 6 ? 0.7 : 1;

    data.push({
      date: date.toISOString().split("T")[0],
      totalUsers,
      activeUsers: Math.floor(totalUsers * 0.4 * weekendFactor),
      newUsers: 200,
      freeUsers: Math.floor(totalUsers * 0.7),
      proUsers: Math.floor(totalUsers * 0.2),
      enterpriseUsers: Math.floor(totalUsers * 0.1),
      avgSessionTime: 10,
      bounceRate: 25,
    });
  }
  return data;
};

// Generate deterministic product usage data
const generateProductUsageData = () => {
  const features = [
    "AI Assistant",
    "Data Visualization",
    "Predictive Analytics",
    "Document Processing",
    "Image Recognition",
    "Sentiment Analysis",
    "Anomaly Detection",
    "Recommendation Engine",
  ];

  return features.map((feature, index) => ({
    name: feature,
    usage: 75,
    growth: 20,
    users: 5000,
  }));
};

// Generate deterministic geographic data
const generateGeoData = () => [
    { name: "North America", value: 40 },
    { name: "Europe", value: 30 },
    { name: "Asia Pacific", value: 20 },
    { name: "Latin America", value: 7 },
    { name: "Africa", value: 3 },
];

// Generate deterministic radar data
const generateRadarData = () => [
    {
      segment: "Enterprise",
      "AI Usage": 90,
      "Data Volume": 95,
      "API Calls": 80,
      "Support Tickets": 40,
      "Feature Adoption": 85,
    },
    {
      segment: "SMB",
      "AI Usage": 70,
      "Data Volume": 60,
      "API Calls": 65,
      "Support Tickets": 55,
      "Feature Adoption": 75,
    },
    {
      segment: "Startup",
      "AI Usage": 85,
      "Data Volume": 40,
      "API Calls": 90,
      "Support Tickets": 30,
      "Feature Adoption": 95,
    },
];

// Generate forecast data
const generateForecastData = (months = 6) => {
  const data = []
  const now = new Date()
  const currentMonth = now.getMonth()

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Historical data (past 6 months)
  for (let i = 6; i >= 1; i--) {
    const monthIndex = (currentMonth - i + 12) % 12
    const year = now.getFullYear() - (currentMonth < i ? 1 : 0)

    data.push({
      name: `${monthNames[monthIndex]} ${year}`,
      actual: Math.floor(10000 + Math.random() * 5000),
      forecast: null,
      lowerBound: null,
      upperBound: null,
    })
  }

  // Current month
  data.push({
    name: `${monthNames[currentMonth]} ${now.getFullYear()}`,
    actual: Math.floor(15000 + Math.random() * 2000),
    forecast: Math.floor(15000 + Math.random() * 2000),
    lowerBound: Math.floor(14000),
    upperBound: Math.floor(17000),
  })

  // Future months
  const lastActual = data[data.length - 1].actual
  for (let i = 1; i <= months; i++) {
    const monthIndex = (currentMonth + i) % 12
    const year = now.getFullYear() + Math.floor((currentMonth + i) / 12)

    const forecastValue = lastActual * (1 + 0.05 * i) * (1 + (Math.random() * 0.1 - 0.05))
    const uncertainty = 0.1 + i * 0.05 // Uncertainty increases with time

    data.push({
      name: `${monthNames[monthIndex]} ${year}`,
      actual: null,
      forecast: Math.floor(forecastValue),
      lowerBound: Math.floor(forecastValue * (1 - uncertainty)),
      upperBound: Math.floor(forecastValue * (1 + uncertainty)),
    })
  }

  return data
}

// Update the color scheme
const COLORS = ["#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#dc2626", "#ef4444", "#b91c1c"]

// Update the tooltip types
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color?: string;
    dataKey?: string;
    payload?: {
      name: string;
      value: number;
      trend: string;
      color: string;
    };
  }>;
  label?: string;
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: {
    name: string;
    value: number;
  };
  percent: number;
  value: number;
}

// Custom tooltip component with proper types
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-white/80 text-sm font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="font-medium">{entry.name}:</span>
            <span className="text-white/80">
              {typeof entry.value === "number"
                ? entry.dataKey?.toLowerCase().includes("revenue") ||
                  entry.dataKey?.toLowerCase().includes("profit") ||
                  entry.dataKey?.toLowerCase().includes("expense")
                  ? `$${entry.value.toLocaleString()}`
                  : entry.value.toLocaleString()
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Custom active shape for pie chart with proper types
const renderActiveShape = (props: ActiveShapeProps) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#fff" className="text-lg font-medium">
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#fff" className="text-xl font-bold">
        {value.toLocaleString()}
      </text>
      <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#fff" opacity={0.7} className="text-sm">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Pie
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
        dataKey="value"
        data={[{ value: 1 }]}
      />
      <Pie
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        dataKey="value"
        data={[{ value: 1 }]}
      />
    </g>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  positive: boolean;
  delay?: number;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

// Feature card component
function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg p-6 hover:border-white/10 transition-all duration-300"
    >
      <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
        {title}
      </h3>
      <p className="text-sm text-white/70 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Metric card component
function MetricCard({ title, value, trend, icon, positive, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg p-4 hover:border-white/10 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-white/70">{title}</p>
          <p className="text-2xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            {value}
          </p>
        </div>
        <div className="bg-black/50 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-2 text-xs">
        <span className={`${positive ? "text-green-500" : "text-red-500"} font-medium`}>
          {trend}
        </span>
        <span className="text-white/50 ml-1">vs previous</span>
        {positive ? (
          <ArrowUpRight className="h-3 w-3 ml-1 text-green-500" />
        ) : (
          <ArrowDownRight className="h-3 w-3 ml-1 text-red-500" />
        )}
      </div>
    </motion.div>
  )
}

// Custom tooltip component with proper types
interface ChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
  }>;
  label?: string;
}

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface ChartProps {
  cx?: string | number;
  cy?: string | number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  dataKey: string;
  data?: ChartData[];
  opacity?: number;
  label?: (props: { name: string; percent: number }) => string;
  labelLine?: boolean;
}

function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/10 p-2 rounded-lg text-xs">
        <p className="text-white/70">{label}</p>
        {payload.map((entry: { name: string; value: number }, index: number) => (
          <p key={index} className="text-white font-medium">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function CustomPieChart(props: ChartProps) {
  return (
    <Pie
      {...props}
      data={props.data || []}
      dataKey={props.dataKey}
      cx={props.cx || "50%"}
      cy={props.cy || "50%"}
      innerRadius={props.innerRadius || 0}
      outerRadius={props.outerRadius || 100}
      fill={props.fill || "#8884d8"}
      label={props.label}
      labelLine={props.labelLine}
    />
  );
}

// Add proper types for chart data
interface ErrorData {
  name: string;
  value: number;
  trend: string;
  color: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ErrorData;
  }>;
  label?: string;
}

// Update the chart section with proper types and client-side rendering
const ErrorDistributionChart = () => {
  const [mounted, setMounted] = useState(false);
  const errorData = useMemo(() => generateErrorDistribution(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-black/30 rounded-xl p-6 border border-red-500/5 h-[400px] flex items-center justify-center">
        <div className="text-white/60">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 rounded-xl p-6 border border-red-500/5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-lg font-semibold text-white">Error Distribution</h4>
          <p className="text-sm text-white/60">Real-time error tracking and analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-black/40 border-red-500/10 hover:bg-red-500/10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="bg-black/40 border-red-500/10 hover:bg-red-500/10">
            <Maximize2 className="h-4 w-4 mr-2" />
            Expand
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={errorData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {errorData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                onClick={() => {
                  console.log(`Clicked on ${entry.name}`);
                }}
              />
            ))}
          </Pie>
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                if (!data) return null;
                return (
                  <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
                    <p className="text-white/80 text-sm font-medium mb-2">{data.name}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
                      <span className="font-medium">Value:</span>
                      <span className="text-white/80">{data.value}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <span className={`${data.trend.startsWith('+') ? 'text-green-500' : data.trend.startsWith('-') ? 'text-red-500' : 'text-white/60'}`}>
                        {data.trend}
                      </span>
                      <span className="text-white/60">vs previous</span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span className="text-white/80 text-sm">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Add new interfaces for tab content
interface TabContentProps {
  activeTab: string;
  metrics: {
    totalRevenue: number;
    activeUsers: number;
    conversionRate: number;
    processingTime: number;
  };
  timeSeriesData: any[];
  revenueData: any[];
  userData: any[];
  productUsageData: any[];
  geoData: any[];
  radarData: any[];
}

// Add new interfaces for radar data
interface RadarDataPoint {
  segment: string;
  "AI Usage": number;
  "Data Volume": number;
  "API Calls": number;
  "Support Tickets": number;
  "Feature Adoption": number;
}

// Update the RadarClickEvent interface
interface RadarClickEvent {
  segment: string;
  [key: string]: any;
  event?: React.MouseEvent<SVGElement, MouseEvent>;
}

// Add new interface for Radar click handler
interface RadarClickHandlerProps {
  data: RadarDataPoint;
  event: React.MouseEvent<SVGElement, MouseEvent>;
}

// Add new interfaces for advanced analytics features
interface AdvancedAnalyticsFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: {
    label: string;
    value: string;
    trend: string;
  }[];
}

// Add new data generation functions
const generateAdvancedMetrics = () => ({
  dataProcessing: {
    throughput: "2.5M",
    latency: "50ms",
    accuracy: "99.99%",
    uptime: "99.999%"
  },
  aiCapabilities: {
    modelAccuracy: "98.5%",
    trainingTime: "2.5h",
    inferenceSpeed: "100ms",
    activeModels: "25"
  },
  security: {
    threatDetection: "99.9%",
    falsePositives: "0.01%",
    complianceScore: "100%",
    dataEncryption: "AES-256"
  }
});

// Add new component for advanced feature cards
const AdvancedFeatureCard = ({ feature, delay }: { feature: AdvancedAnalyticsFeature; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-black/40 backdrop-blur-sm border border-red-500/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 bg-red-500/10 rounded-lg">
        {feature.icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-white/60 text-sm mb-4">{feature.description}</p>
        <div className="grid grid-cols-2 gap-4">
          {feature.metrics.map((metric, index) => (
            <div key={index} className="bg-black/20 rounded-lg p-3">
              <p className="text-white/40 text-xs mb-1">{metric.label}</p>
              <p className="text-white font-medium">{metric.value}</p>
              <p className="text-red-400 text-xs">{metric.trend}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Add new components for each tab
const OverviewTab = ({ metrics, timeSeriesData }: TabContentProps) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'line' | 'area'>('line');

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    return timeSeriesData.slice(-days);
  }, [timeSeriesData, timeRange]);

  // Calculate trends
  const calculateTrend = (data: any[], key: string) => {
    const recent = data.slice(-7);
    const previous = data.slice(-14, -7);
    const recentAvg = recent.reduce((sum, item) => sum + item[key], 0) / recent.length;
    const previousAvg = previous.reduce((sum, item) => sum + item[key], 0) / previous.length;
    const change = ((recentAvg - previousAvg) / previousAvg) * 100;
    return {
      value: change.toFixed(1),
      positive: change > 0,
    };
  };

  const trends = {
    value: calculateTrend(filteredData, 'value'),
    secondaryValue: calculateTrend(filteredData, 'secondaryValue'),
    tertiaryValue: calculateTrend(filteredData, 'tertiaryValue'),
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <MetricCard 
          title="Revenue Generated" 
          value={`$${(metrics.totalRevenue / 1000000).toFixed(2)}M`} 
          trend={`${trends.value.value}%`}
          icon={<DollarSign className="h-6 w-6 text-red-500" />}
          positive={trends.value.positive}
          delay={0.1}
        />
        <MetricCard 
          title="Active Users" 
          value={metrics.activeUsers.toLocaleString()} 
          trend={`${trends.secondaryValue.value}%`}
          icon={<Users className="h-6 w-6 text-red-400" />}
          positive={trends.secondaryValue.positive}
          delay={0.2}
        />
        <MetricCard 
          title="Conversion Rate" 
          value={`${metrics.conversionRate}%`} 
          trend={`${trends.tertiaryValue.value}%`}
          icon={<Percent className="h-6 w-6 text-red-500" />}
          positive={trends.tertiaryValue.positive}
          delay={0.3}
        />
        <MetricCard 
          title="Processing Time" 
          value={`${metrics.processingTime}s`} 
          trend="-35%"
          icon={<Clock className="h-6 w-6 text-red-400" />}
          positive={true}
          delay={0.4}
        />
      </div>

      {/* Time Series Chart */}
      <div className="bg-black/30 rounded-xl p-6 border border-red-500/5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-lg font-semibold text-white">Performance Trends</h4>
            <p className="text-sm text-white/60">Real-time performance monitoring and analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px] bg-black/40 border-red-500/10">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-black/40 border-red-500/10 hover:bg-red-500/10"
              onClick={() => setChartType(chartType === 'line' ? 'area' : 'line')}
            >
              {chartType === 'line' ? 'Switch to Area' : 'Switch to Line'}
            </Button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTertiary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#b91c1c" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
              dataKey="date" 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
                      <p className="text-white/80 text-sm font-medium mb-2">
                        {new Date(data.date).toLocaleDateString()}
                      </p>
                      <div className="space-y-1">
                        {payload.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-white/80">{entry.name}:</span>
                            <span className="text-white/60">{entry.value?.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {chartType === 'line' ? (
              <>
                <Line 
                  type="monotone"
                  dataKey="value"
                  name="Primary Metric"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#ef4444' }}
                />
                <Line 
                  type="monotone"
                  dataKey="secondaryValue"
                  name="Secondary Metric"
                  stroke="#dc2626" 
                  strokeWidth={2}
                  dot={{ fill: '#dc2626', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#dc2626' }}
                />
                <Line 
                  type="monotone"
                  dataKey="tertiaryValue"
                  name="Tertiary Metric"
                  stroke="#b91c1c" 
                  strokeWidth={2}
                  dot={{ fill: '#b91c1c', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#b91c1c' }}
                />
              </>
            ) : (
              <>
                <Area
                  type="monotone"
                  dataKey="value"
                  name="Primary Metric"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
                <Area
                  type="monotone"
                  dataKey="secondaryValue"
                  name="Secondary Metric"
                  stroke="#dc2626"
                  fillOpacity={1}
                  fill="url(#colorSecondary)"
                />
                <Area
                  type="monotone"
                  dataKey="tertiaryValue"
                  name="Tertiary Metric"
                  stroke="#b91c1c"
                  fillOpacity={1}
                  fill="url(#colorTertiary)"
                />
              </>
            )}
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => (
                <span className="text-white/80 text-sm">{value}</span>
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AnalyticsTab = ({ revenueData, userData, productUsageData }: TabContentProps) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  // Handle metric selection
  const handleMetricSelect = (metric: string) => {
    setSelectedMetric(metric);
  };

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    return revenueData.slice(-days);
  }, [revenueData, timeRange]);

  return (
    <div className="space-y-8">
      {/* Revenue Analysis */}
      <div className="bg-black/30 rounded-xl p-6 border border-red-500/5">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-white">Revenue Analysis</h4>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px] bg-black/40 border-red-500/10">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-black/40 border-red-500/10 hover:bg-red-500/10"
              onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}
            >
              {chartType === 'bar' ? 'Switch to Line' : 'Switch to Bar'}
            </Button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
              dataKey="name" 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60' }}
            />
            <YAxis 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {chartType === 'bar' ? (
              <>
                <Bar 
                  dataKey="actual" 
                  fill="#ef4444" 
                  name="Actual"
                  onClick={(data) => handleMetricSelect('actual')}
                />
                <Bar 
                  dataKey="target" 
                  fill="#dc2626" 
                  name="Target"
                  onClick={(data) => handleMetricSelect('target')}
                />
              </>
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="actual" 
                  stroke="#ef4444" 
                  name="Actual"
                  onClick={(data) => handleMetricSelect('actual')}
                />
                <Line
                  type="monotone"
                  dataKey="target" 
                  stroke="#dc2626" 
                  name="Target"
                  onClick={(data) => handleMetricSelect('target')}
                />
              </>
            )}
            <Line
              type="monotone"
              dataKey="profit" 
              stroke="#b91c1c" 
              name="Profit"
              onClick={(data) => handleMetricSelect('profit')}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* User Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black/30 rounded-xl p-6 border border-red-500/5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-white">User Growth</h4>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px] bg-black/40 border-red-500/10">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userData.slice(-(timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis 
                dataKey="date"
                stroke="#ffffff60"
                tick={{ fill: '#ffffff60' }}
              />
              <YAxis 
                stroke="#ffffff60"
                tick={{ fill: '#ffffff60' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="totalUsers" 
                stroke="#ef4444"
                name="Total Users"
                onClick={(data) => handleMetricSelect('totalUsers')}
              />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="#dc2626" 
                name="Active Users"
                onClick={(data) => handleMetricSelect('activeUsers')}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-black/30 rounded-xl p-6 border border-red-500/5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-white">Product Usage</h4>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-black/40 border-red-500/10 hover:bg-red-500/10"
              onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}
            >
              {chartType === 'bar' ? 'Switch to Line' : 'Switch to Bar'}
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={productUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis 
                dataKey="name" 
                stroke="#ffffff60"
                tick={{ fill: '#ffffff60' }}
              />
              <YAxis 
                stroke="#ffffff60"
                tick={{ fill: '#ffffff60' }}
              />
              <Tooltip content={<CustomTooltip />} />
              {chartType === 'bar' ? (
                <Bar 
                  dataKey="usage" 
                  fill="#ef4444" 
                  name="Usage %"
                  onClick={(data) => handleMetricSelect('usage')}
                />
              ) : (
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#ef4444" 
                  name="Usage %"
                  onClick={(data) => handleMetricSelect('usage')}
                />
              )}
              <Line 
                type="monotone" 
                dataKey="growth" 
                stroke="#dc2626" 
                name="Growth %"
                onClick={(data) => handleMetricSelect('growth')}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Calculate average performance for a segment
const calculateSegmentAverage = (segment: RadarDataPoint): number => {
  const values = Object.values(segment).slice(1) as number[];
  return values.reduce((a, b) => a + b, 0) / values.length;
};

const ReportsTab = ({ geoData, radarData }: TabContentProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'excel'>('csv');
  const [filterOptions, setFilterOptions] = useState({
    dateRange: 'all',
    segments: ['Enterprise', 'SMB', 'Startup'],
    metrics: ['AI Usage', 'Data Volume', 'API Calls', 'Support Tickets', 'Feature Adoption']
  });

  // Handle export functionality
  const handleExport = (type: 'geo' | 'radar') => {
    console.log(`Exporting ${type} data in ${exportFormat} format...`);
    // Implement actual export logic here
  };

  // Handle filter changes
  const handleFilterChange = (type: 'dateRange' | 'segments' | 'metrics', value: any) => {
    setFilterOptions(prev => ({
      ...prev,
      [type]: value
    }));
    console.log('Filter options updated:', { type, value });
  };

  // Add click handler for radar chart
  const handleRadarClick = ({ data, event }: RadarClickHandlerProps) => {
    event.stopPropagation();
    setSelectedSegment(data.segment);
  };

  return (
    <div className="space-y-8">
      {/* Geographic Distribution */}
      <div className="bg-black/30 rounded-xl p-6 border border-red-500/5">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-white">Geographic Distribution</h4>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="bg-black/40 border-red-500/10 hover:bg-red-500/10">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 bg-black/90 border-red-500/10">
                <div className="space-y-2">
                  <p className="text-sm text-white/80">Export Format</p>
                  <Select value={exportFormat} onValueChange={(value: 'csv' | 'pdf' | 'excel') => setExportFormat(value)}>
                    <SelectTrigger className="bg-black/40 border-red-500/10">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={() => handleExport('geo')}
                  >
                    Export Data
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="bg-black/40 border-red-500/10 hover:bg-red-500/10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-black/90 border-red-500/10">
                <div className="space-y-4">
                  <p className="text-sm text-white/80">Date Range</p>
                  <Select 
                    value={filterOptions.dateRange} 
                    onValueChange={(value) => handleFilterChange('dateRange', value)}
                  >
                    <SelectTrigger className="bg-black/40 border-red-500/10">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                      <SelectItem value="1y">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={geoData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  onClick={(data) => setSelectedRegion(data.name)}
                >
                  {geoData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className={`cursor-pointer transition-opacity duration-200 ${
                        selectedRegion === entry.name ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                      }`}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
                          <p className="text-white/80 text-sm font-medium mb-2">{data.name}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[geoData.findIndex(d => d.name === data.name) % COLORS.length] }}></div>
                            <span className="font-medium">Value:</span>
                            <span className="text-white/80">{data.value}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-white/80">Regional Breakdown</h5>
            {geoData.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedRegion === region.name ? 'bg-red-500/10' : 'hover:bg-white/5'
                }`}
                onClick={() => setSelectedRegion(region.name)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-white/80">{region.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/60">{region.value}%</span>
                  <div className="w-24 h-2 bg-black/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${region.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Radar */}
      <div className="bg-black/30 rounded-xl p-6 border border-red-500/5">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-white">Performance Radar</h4>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="bg-black/40 border-red-500/10 hover:bg-red-500/10">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 bg-black/90 border-red-500/10">
                <div className="space-y-2">
                  <p className="text-sm text-white/80">Export Format</p>
                  <Select value={exportFormat} onValueChange={(value: 'csv' | 'pdf' | 'excel') => setExportFormat(value)}>
                    <SelectTrigger className="bg-black/40 border-red-500/10">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={() => handleExport('radar')}
                  >
                    Export Data
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="bg-black/40 border-red-500/10 hover:bg-red-500/10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-black/90 border-red-500/10">
                <div className="space-y-4">
                  <p className="text-sm text-white/80">Segments</p>
                  <div className="space-y-2">
                    {['Enterprise', 'SMB', 'Startup'].map((segment) => (
                      <div key={segment} className="flex items-center space-x-2">
                        <Switch
                          checked={filterOptions.segments.includes(segment)}
                          onCheckedChange={(checked) => {
                            const newSegments = checked
                              ? [...filterOptions.segments, segment]
                              : filterOptions.segments.filter(s => s !== segment);
                            handleFilterChange('segments', newSegments);
                          }}
                        />
                        <label className="text-sm text-white/80">{segment}</label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-white/80">Metrics</p>
                  <div className="space-y-2">
                    {['AI Usage', 'Data Volume', 'API Calls', 'Support Tickets', 'Feature Adoption'].map((metric) => (
                      <div key={metric} className="flex items-center space-x-2">
                        <Switch
                          checked={filterOptions.metrics.includes(metric)}
                          onCheckedChange={(checked) => {
                            const newMetrics = checked
                              ? [...filterOptions.metrics, metric]
                              : filterOptions.metrics.filter(m => m !== metric);
                            handleFilterChange('metrics', newMetrics);
                          }}
                        />
                        <label className="text-sm text-white/80">{metric}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis 
                  dataKey="segment" 
                  stroke="#ffffff60"
                  tick={{ fill: '#ffffff60' }}
                />
                <PolarRadiusAxis 
                  stroke="#ffffff60"
                  tick={{ fill: '#ffffff60' }}
                />
                {filterOptions.segments.includes('Enterprise') && (
                  <Radar
                    name="Enterprise"
                    dataKey="Enterprise"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                    onClick={(event) => {
                      const data = radarData.find(d => d.segment === 'Enterprise');
                      if (data) handleRadarClick({ data, event });
                    }}
                  />
                )}
                {filterOptions.segments.includes('SMB') && (
                  <Radar
                    name="SMB"
                    dataKey="SMB"
                    stroke="#dc2626"
                    fill="#dc2626"
                    fillOpacity={0.6}
                    onClick={(event) => {
                      const data = radarData.find(d => d.segment === 'SMB');
                      if (data) handleRadarClick({ data, event });
                    }}
                  />
                )}
                {filterOptions.segments.includes('Startup') && (
                  <Radar
                    name="Startup"
                    dataKey="Startup"
                    stroke="#b91c1c"
                    fill="#b91c1c"
                    fillOpacity={0.6}
                    onClick={(event) => {
                      const data = radarData.find(d => d.segment === 'Startup');
                      if (data) handleRadarClick({ data, event });
                    }}
                  />
                )}
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-white/80 text-sm">{value}</span>
                  )}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-white/80">Segment Performance</h5>
            {radarData.map((segment, index) => (
              <motion.div
                key={segment.segment}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedSegment === segment.segment ? 'bg-red-500/10' : 'hover:bg-white/5'
                }`}
                onClick={() => setSelectedSegment(segment.segment)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-white/80">{segment.segment}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/60">{calculateSegmentAverage(segment)}%</span>
                  <div className="w-24 h-2 bg-black/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateSegmentAverage(segment)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Update the DashboardControls component to accept props
interface DashboardControlsProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  showRealTimeData: boolean;
  setShowRealTimeData: (value: boolean) => void;
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
}

const DashboardControls = ({
  timeRange,
  setTimeRange,
  showRealTimeData,
  setShowRealTimeData,
  autoRefresh,
  setAutoRefresh
}: DashboardControlsProps) => (
  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
    <div className="flex items-center gap-4">
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-[180px] bg-black/40 border-red-500/20">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-red-500/20">
          <SelectItem value="1h">Last Hour</SelectItem>
          <SelectItem value="24h">Last 24 Hours</SelectItem>
          <SelectItem value="7d">Last 7 Days</SelectItem>
          <SelectItem value="30d">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        className="border-red-500/20 hover:bg-red-500/10"
        onClick={() => setShowRealTimeData(!showRealTimeData)}
      >
        {showRealTimeData ? (
          <>
            <Pause className="mr-2 h-4 w-4" />
            Pause Stream
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Start Stream
          </>
        )}
      </Button>
    </div>
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        className="border-red-500/20 hover:bg-red-500/10"
        onClick={() => setAutoRefresh(!autoRefresh)}
      >
        {autoRefresh ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Auto-refresh
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Manual refresh
          </>
        )}
      </Button>
      <Button className="bg-red-500 hover:bg-red-600">
        <Download className="mr-2 h-4 w-4" />
        Export Data
      </Button>
    </div>
  </div>
)

// Update the RealTimeDataStream component to accept props
interface RealTimeDataStreamProps {
  streamingData: any[];
  streamingMetrics: {
    throughput: number;
    latency: number;
    accuracy: number;
    activeConnections: number;
  };
}

const RealTimeDataStream = ({ streamingData, streamingMetrics }: RealTimeDataStreamProps) => (
  <div>
    <Card className="bg-black/40 border-red-500/10">
      <CardHeader>
        <CardTitle>Real-time Data Stream</CardTitle>
        <CardDescription>Streaming data processed with sub-millisecond latency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-sm text-white/60">Throughput</div>
              <div className="text-2xl font-bold">{streamingMetrics.throughput} ops/s</div>
              <div className="text-xs text-green-400">+5.2% from avg</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-sm text-white/60">Latency</div>
              <div className="text-2xl font-bold">{streamingMetrics.latency} ms</div>
              <div className="text-xs text-green-400">-12.5% from avg</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-sm text-white/60">Accuracy</div>
              <div className="text-2xl font-bold">{streamingMetrics.accuracy}%</div>
              <div className="text-xs text-green-400">+0.3% from last hour</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-sm text-white/60">Active Connections</div>
              <div className="text-2xl font-bold">{streamingMetrics.activeConnections}</div>
              <div className="text-xs text-red-400">+12 new connections</div>
            </div>
          </div>
          <div className="h-[200px] bg-black/20 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={streamingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="#ffffff60"
                  tick={{ fill: '#ffffff60' }}
                />
                <YAxis 
                  stroke="#ffffff60"
                  tick={{ fill: '#ffffff60' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Data Volume"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="secondary"
                  name="Processing Rate" 
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Add new type definitions for predictive insights and interactive exploration
interface PredictiveInsight {
  title: string;
  description: string;
  probability: number;
  impact: 'low' | 'medium' | 'high';
  timeframe: string;
  category: 'revenue' | 'users' | 'performance' | 'security';
}

interface ExplorationOption {
  id: string;
  name: string;
  description: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
  dataRequirements: string[];
}

// Generate predictive insights
const generatePredictiveInsights = (): PredictiveInsight[] => [
  {
    title: "Revenue Increase Opportunity",
    description: "Based on current user behavior patterns, adjusting pricing tiers could increase revenue by 18-22%",
    probability: 0.87,
    impact: 'high',
    timeframe: '3-6 months',
    category: 'revenue'
  },
  {
    title: "User Churn Risk Alert",
    description: "Enterprise customers showing decreased platform usage - potential churn risk for 7% of accounts",
    probability: 0.76,
    impact: 'high',
    timeframe: '1-2 months',
    category: 'users'
  },
  {
    title: "Performance Optimization Potential",
    description: "Database query patterns suggest index optimization could improve overall API response time by 34%",
    probability: 0.92,
    impact: 'medium',
    timeframe: 'immediate',
    category: 'performance'
  },
  {
    title: "Security Enhancement Opportunity",
    description: "Unusual access patterns detected - implementing additional verification could prevent 98% of suspicious activities",
    probability: 0.81,
    impact: 'high',
    timeframe: 'immediate',
    category: 'security'
  }
];

// Generate data exploration options
const generateExplorationOptions = (): ExplorationOption[] => [
  {
    id: 'user-segmentation',
    name: 'User Segmentation Analysis',
    description: 'Segment users by behavior, demographics and engagement to identify high-value groups',
    complexity: 'intermediate',
    dataRequirements: ['User profiles', 'Activity logs', 'Transaction history']
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detection System',
    description: 'Identify unusual patterns and outliers across system metrics and user behavior',
    complexity: 'advanced',
    dataRequirements: ['System logs', 'User activity', 'Historical baselines']
  },
  {
    id: 'correlation-analysis',
    name: 'Multi-factor Correlation Analysis',
    description: 'Discover hidden relationships between different data points and business outcomes',
    complexity: 'advanced',
    dataRequirements: ['Business KPIs', 'User actions', 'External factors']
  },
  {
    id: 'predictive-modeling',
    name: 'Custom Predictive Modeling',
    description: 'Build and deploy custom ML models to predict specific business outcomes',
    complexity: 'advanced',
    dataRequirements: ['Historical data', 'Feature definitions', 'Success criteria']
  }
];

// Add components for the new sections
interface PredictiveInsightCardProps {
  insight: PredictiveInsight;
  index: number;
}

const PredictiveInsightCard = ({ insight, index }: PredictiveInsightCardProps) => {
  const impactColors = {
    low: 'bg-yellow-500/20 text-yellow-500',
    medium: 'bg-orange-500/20 text-orange-500',
    high: 'bg-red-500/20 text-red-500'
  };
  const categoryIcons = {
    revenue: <DollarSign className="h-5 w-5" />,
    users: <Users className="h-5 w-5" />,
    performance: <Activity className="h-5 w-5" />,
    security: <Shield className="h-5 w-5" />
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-black/40 backdrop-blur-sm border border-red-500/10 rounded-xl p-5 hover:border-red-500/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-red-500/10 rounded-lg">
          {categoryIcons[insight.category]}
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{insight.title}</h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${impactColors[insight.impact]}`}>
              {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
            </span>
            <span className="text-xs text-white/60">
              {Math.round(insight.probability * 100)}% Confidence
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-white/70 mb-3">{insight.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/50">Timeline: {insight.timeframe}</span>
        <Button variant="ghost" size="sm" className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10">
          Explore Details
        </Button>
      </div>
    </motion.div>
  );
};

interface DataExplorationCardProps {
  option: ExplorationOption;
  index: number;
}

const DataExplorationCard = ({ option, index }: DataExplorationCardProps) => {
  const complexityColors = {
    basic: 'bg-green-500/20 text-green-500',
    intermediate: 'bg-blue-500/20 text-blue-500',
    advanced: 'bg-purple-500/20 text-purple-500'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl p-5 hover:bg-black/40 hover:border-red-500/10 transition-all duration-300"
    >
      <div className="mb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-white mb-1">{option.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${complexityColors[option.complexity]}`}>
            {option.complexity}
          </span>
        </div>
        <p className="text-sm text-white/70">{option.description}</p>
      </div>
      
      <div className="mb-4">
        <h4 className="text-xs font-medium text-white/60 mb-2">Data Requirements:</h4>
        <div className="flex flex-wrap gap-2">
          {option.dataRequirements.map((req, i) => (
            <span key={i} className="text-xs bg-white/5 text-white/70 px-2 py-1 rounded-md">
              {req}
            </span>
          ))}
        </div>
      </div>
      
      <Button size="sm" className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/10">
        Start Exploration
      </Button>
    </motion.div>
  );
};

const StreamingDataVisualizer = () => {
  const [streamView, setStreamView] = useState<'chart' | 'table'>('chart');
  
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Real-time Data Streams</h3>
          <p className="text-sm text-white/60">Live data processing visualization with sub-second latency</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            className={`${streamView === 'chart' ? 'bg-red-500/10 text-red-400' : 'text-white/60'}`}
            onClick={() => setStreamView('chart')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Chart View
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={`${streamView === 'table' ? 'bg-red-500/10 text-red-400' : 'text-white/60'}`}
            onClick={() => setStreamView('table')}
          >
            <Table className="h-4 w-4 mr-2" />
            Table View
          </Button>
        </div>
      </div>
      
      <div className="h-[300px] mb-4 relative bg-black/40 rounded-lg border border-white/5 flex items-center justify-center">
        {streamView === 'chart' ? (
          <div className="absolute inset-0 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={Array.from({ length: 60 }, (_, i) => ({
                  time: i,
                  value: Math.floor(Math.random() * 100) + 50,
                  secondary: Math.floor(Math.random() * 70) + 30,
                }))}
              >
                <defs>
                  <linearGradient id="streamColorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="streamColorSecondary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fill: '#ffffff40' }} />
                <YAxis tick={{ fill: '#ffffff40' }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#streamColorValue)"
                />
                <Area
                  type="monotone"
                  dataKey="secondary"
                  stroke="#dc2626"
                  fillOpacity={1}
                  fill="url(#streamColorSecondary)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="absolute inset-0 p-4 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 px-4 text-left text-white/70">Timestamp</th>
                  <th className="py-2 px-4 text-left text-white/70">Event Type</th>
                  <th className="py-2 px-4 text-left text-white/70">Source</th>
                  <th className="py-2 px-4 text-left text-white/70">Value</th>
                  <th className="py-2 px-4 text-left text-white/70">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }, (_, i) => {
                  const eventTypes = ['DATA_INSERT', 'USER_ACTION', 'SYSTEM_EVENT', 'API_CALL'];
                  const sources = ['Web App', 'Mobile App', 'API Gateway', 'Background Service'];
                  const statuses = ['Processed', 'Pending', 'Failed', 'Warning'] as const;
                  const statusColors = {
                    'Processed': 'text-green-500',
                    'Pending': 'text-yellow-500',
                    'Failed': 'text-red-500',
                    'Warning': 'text-orange-500'
                  };
                  
                  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
                  const source = sources[Math.floor(Math.random() * sources.length)];
                  const status = statuses[Math.floor(Math.random() * statuses.length)];
                  
                  return (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-2 px-4 text-white/80">{new Date().toISOString().substring(11, 23)}</td>
                      <td className="py-2 px-4 text-white/80">{eventType}</td>
                      <td className="py-2 px-4 text-white/80">{source}</td>
                      <td className="py-2 px-4 text-white/80">{Math.floor(Math.random() * 1000)}</td>
                      <td className={`py-2 px-4 ${statusColors[status]}`}>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
          <Brain className="h-32 w-32 text-red-500" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="py-1 px-3 bg-black/60 rounded-full border border-white/10 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            <span className="text-xs text-white/80">Live Processing</span>
          </div>
          <div className="py-1 px-3 bg-black/60 rounded-full border border-white/10 flex items-center">
            <span className="text-xs text-white/80">1.2k events/sec</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs bg-black/50 border-white/10 hover:bg-red-500/10 hover:text-red-400">
            <Pause className="h-3 w-3 mr-1" /> Pause
          </Button>
          <Button variant="outline" size="sm" className="text-xs bg-black/50 border-white/10 hover:bg-red-500/10 hover:text-red-400">
            <Download className="h-3 w-3 mr-1" /> Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function AnalyticsPreview() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")
  const [date, setDate] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [showRealTimeData, setShowRealTimeData] = useState(false)
  const chartContainerRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  
  // Initialize data with deterministic values
  const [revenueData] = useState(generateRevenueData())
  const [timeSeriesData] = useState(generateTimeSeriesData())
  const [userData] = useState(generateUserData())
  const [productUsageData] = useState(generateProductUsageData())
  const [geoData] = useState(generateGeoData())
  const [radarData] = useState(generateRadarData())
  const [errorDistribution] = useState(generateErrorDistribution())

  // Dashboard metrics with deterministic values
  const [metrics] = useState({
    totalRevenue: 2750400,
    activeUsers: 18432,
    conversionRate: 3.76,
    processingTime: 0.86
  })

  // Add new state for advanced features
  const [advancedMetrics] = useState(generateAdvancedMetrics());
  
  // Define advanced features
  const advancedFeatures: AdvancedAnalyticsFeature[] = [
    {
      title: "Real-time Data Processing",
      description: "Enterprise-grade data processing with sub-millisecond latency and advanced error handling",
      icon: <Zap className="h-6 w-6 text-red-500" />,
      metrics: [
        { label: "Throughput", value: advancedMetrics.dataProcessing.throughput, trend: "+15% vs last month" },
        { label: "Latency", value: advancedMetrics.dataProcessing.latency, trend: "-25% improvement" },
        { label: "Accuracy", value: advancedMetrics.dataProcessing.accuracy, trend: "99.99% consistent" },
        { label: "Uptime", value: advancedMetrics.dataProcessing.uptime, trend: "5 9's SLA" }
      ]
    },
    {
      title: "AI-Powered Analytics",
      description: "Advanced machine learning models for predictive analytics and anomaly detection",
      icon: <Brain className="h-6 w-6 text-red-500" />,
      metrics: [
        { label: "Model Accuracy", value: advancedMetrics.aiCapabilities.modelAccuracy, trend: "+2.5% improvement" },
        { label: "Training Time", value: advancedMetrics.aiCapabilities.trainingTime, trend: "-40% faster" },
        { label: "Inference Speed", value: advancedMetrics.aiCapabilities.inferenceSpeed, trend: "Real-time" },
        { label: "Active Models", value: advancedMetrics.aiCapabilities.activeModels, trend: "+5 new models" }
      ]
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade security with advanced threat detection and compliance monitoring",
      icon: <Shield className="h-6 w-6 text-red-500" />,
      metrics: [
        { label: "Threat Detection", value: advancedMetrics.security.threatDetection, trend: "Real-time" },
        { label: "False Positives", value: advancedMetrics.security.falsePositives, trend: "-50% reduction" },
        { label: "Compliance Score", value: advancedMetrics.security.complianceScore, trend: "100% maintained" },
        { label: "Encryption", value: advancedMetrics.security.dataEncryption, trend: "Military-grade" }
      ]
    }
  ];

  // Add new state for predictive insights and exploration options
  const [predictiveInsights] = useState(generatePredictiveInsights());
  const [explorationOptions] = useState(generateExplorationOptions());
  const [activeInsightCategory, setActiveInsightCategory] = useState<string | null>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Update the section header and layout
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url(/images/grid.svg)] bg-repeat opacity-5"></div>
      <div className="absolute -top-1/2 left-1/4 w-[1000px] h-[1000px] rounded-full bg-red-500/5 blur-[150px] opacity-30"></div>
      <div className="absolute -bottom-1/3 right-1/3 w-[800px] h-[800px] rounded-full bg-red-500/5 blur-[120px] opacity-30"></div>
      
      {/* Enhanced animated data particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`data-particle-${i}`}
          className={`absolute w-1 h-8 rounded-full will-change-transform opacity-40 ${
            i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-red-400' : 'bg-red-600'
          }`}
          style={{
            boxShadow: `0 0 12px ${i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#f87171' : '#dc2626'}`
          }}
          initial={{
            x: Math.random() * 100 + "%",
            y: "100%",
            opacity: 0.1,
          }}
          animate={{
            x: Math.random() * 100 + "%",
            y: "0%",
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Enhanced Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-1 mb-6 bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-700/20 rounded-full"
          >
            <div className="bg-black/90 backdrop-blur-sm px-6 py-2 rounded-full flex items-center space-x-2 border border-red-500/20">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 5, 0],
                  scale: [1, 1.1, 1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse"
                }}
              >
                <PieChart className="h-5 w-5 text-red-500 mr-2" />
              </motion.div>
              <span className="text-sm font-semibold tracking-wider text-white/90">ENTERPRISE ANALYTICS SUITE</span>
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
              Advanced Data
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-600">
              Analytics Platform
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Transform complex data into actionable insights with our enterprise-grade analytics platform. 
            Leverage AI-powered predictions, real-time visualization, and advanced analytics to drive business growth.
          </motion.p>
          
          {/* Enhanced key metrics showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            <MetricCard 
              title="Revenue Generated" 
              value={`$${(metrics.totalRevenue / 1000000).toFixed(2)}M`} 
              trend="+12.5%"
              icon={<DollarSign className="h-6 w-6 text-red-500" />}
              positive={true}
              delay={0.1}
            />
            
            <MetricCard 
              title="Active Users" 
              value={metrics.activeUsers.toLocaleString()} 
              trend="+8.2%"
              icon={<Users className="h-6 w-6 text-red-400" />}
              positive={true}
              delay={0.2}
            />
            
            <MetricCard 
              title="Conversion Rate" 
              value={`${metrics.conversionRate}%`} 
              trend="+1.8%"
              icon={<Percent className="h-6 w-6 text-red-500" />}
              positive={true}
              delay={0.3}
            />
            
            <MetricCard 
              title="Processing Time" 
              value={`${metrics.processingTime}s`} 
              trend="-35%"
              icon={<Clock className="h-6 w-6 text-red-400" />}
              positive={true}
              delay={0.4}
            />
          </motion.div>
        </div>

        {/* Advanced Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {advancedFeatures.map((feature, index) => (
            <AdvancedFeatureCard 
              key={index}
              feature={feature}
              delay={0.1 * index}
            />
          ))}
        </motion.div>

        {/* Enhanced Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          <FeatureCard 
            title="Real-time Data Processing"
            description="Process and visualize your data streams in real-time with sub-second latency and advanced error handling"
            icon={<Zap className="h-7 w-7 text-red-500" />}
            delay={0.1}
          />
          
          <FeatureCard 
            title="AI-Powered Predictions"
            description="Leverage advanced machine learning models for accurate forecasting, anomaly detection, and trend analysis"
            icon={<TrendingUp className="h-7 w-7 text-red-400" />}
            delay={0.2}
          />
          
          <FeatureCard 
            title="Interactive Visualizations"
            description="Create sophisticated dashboards with 50+ chart types, custom widgets, and advanced filtering capabilities"
            icon={<Activity className="h-7 w-7 text-red-500" />}
            delay={0.3}
          />
        </motion.div>

        {/* New section: Real-time Data Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Real-time Data
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700"> Visualization</span>
            </h2>
            <p className="text-white/70 max-w-3xl">
              Monitor your data streams in real-time with interactive visualizations and instant insights. 
              Our platform processes millions of events per second with sub-millisecond latency.
            </p>
          </div>
          
          <StreamingDataVisualizer />
        </motion.div>
        
        {/* New section: Predictive Insights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="mb-8">
            <div className="flex flex-wrap justify-between items-end gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  AI-Powered
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700"> Predictive Insights</span>
                </h2>
                <p className="text-white/70 max-w-3xl">
                  Advanced machine learning algorithms continuously analyze your data to identify 
                  opportunities, risks, and actionable insights for your business.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs ${activeInsightCategory === null ? 'bg-red-500/10 text-red-400' : 'text-white/60'}`}
                  onClick={() => setActiveInsightCategory(null)}
                >
                  All Insights
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs ${activeInsightCategory === 'revenue' ? 'bg-red-500/10 text-red-400' : 'text-white/60'}`}
                  onClick={() => setActiveInsightCategory('revenue')}
                >
                  Revenue
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs ${activeInsightCategory === 'users' ? 'bg-red-500/10 text-red-400' : 'text-white/60'}`}
                  onClick={() => setActiveInsightCategory('users')}
                >
                  Users
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs ${activeInsightCategory === 'performance' ? 'bg-red-500/10 text-red-400' : 'text-white/60'}`}
                  onClick={() => setActiveInsightCategory('performance')}
                >
                  Performance
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs ${activeInsightCategory === 'security' ? 'bg-red-500/10 text-red-400' : 'text-white/60'}`}
                  onClick={() => setActiveInsightCategory('security')}
                >
                  Security
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictiveInsights
              .filter(insight => activeInsightCategory === null || insight.category === activeInsightCategory)
              .map((insight, index) => (
                <PredictiveInsightCard key={index} insight={insight} index={index} />
              ))
            }
          </div>
        </motion.div>
        
        {/* New section: Interactive Data Exploration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Interactive
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700"> Data Exploration</span>
            </h2>
            <p className="text-white/70 max-w-3xl">
              Explore your data with powerful tools designed for deep analysis. Uncover patterns, 
              correlations, and insights with our interactive exploration platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {explorationOptions.map((option, index) => (
              <DataExplorationCard key={option.id} option={option} index={index} />
            ))}
          </div>
        </motion.div>
        
        {/* Enhanced Dashboard Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 flex flex-wrap justify-between items-center gap-6 bg-black/60 backdrop-blur-md p-6 border border-red-500/10 rounded-2xl"
        >
          <div className="flex items-center gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-black/40 border border-red-500/10">
                <TabsTrigger value="overview" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">Overview</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">Analytics</TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <DashboardControls
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            showRealTimeData={showRealTimeData}
            setShowRealTimeData={setShowRealTimeData}
            autoRefresh={autoRefresh}
            setAutoRefresh={setAutoRefresh}
          />
        </motion.div>
        
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <OverviewTab
              activeTab={activeTab}
              metrics={metrics}
              timeSeriesData={timeSeriesData}
              revenueData={revenueData}
              userData={userData}
              productUsageData={productUsageData}
              geoData={geoData}
              radarData={radarData}
            />
          )}
          {activeTab === "analytics" && (
            <AnalyticsTab
              activeTab={activeTab}
              metrics={metrics}
              timeSeriesData={timeSeriesData}
              revenueData={revenueData}
              userData={userData}
              productUsageData={productUsageData}
              geoData={geoData}
              radarData={radarData}
            />
          )}
          {activeTab === "reports" && (
            <ReportsTab
              activeTab={activeTab}
              metrics={metrics}
              timeSeriesData={timeSeriesData}
              revenueData={revenueData}
              userData={userData}
              productUsageData={productUsageData}
              geoData={geoData}
              radarData={radarData}
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}

