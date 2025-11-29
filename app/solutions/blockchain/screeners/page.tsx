"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  ArrowUpDown,
  Search,
  Filter,
  RefreshCcw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart2,
  Activity
} from "lucide-react"

interface Asset {
  symbol: string
  name: string
  price: number
  change24h: number
  volume: number
  marketCap: number
  rsi: number
  macd: number
  signal: "Buy" | "Sell" | "Hold"
}

const cryptoAssets: Asset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 65432.10,
    change24h: 2.5,
    volume: 28500000000,
    marketCap: 1250000000000,
    rsi: 58.5,
    macd: 245.32,
    signal: "Buy"
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3456.78,
    change24h: -1.8,
    volume: 15000000000,
    marketCap: 415000000000,
    rsi: 45.2,
    macd: -125.45,
    signal: "Hold"
  }
]

const stockAssets: Asset[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.32,
    change24h: 1.2,
    volume: 52000000,
    marketCap: 2850000000000,
    rsi: 62.4,
    macd: 2.45,
    signal: "Buy"
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 384.45,
    change24h: -0.8,
    volume: 25000000,
    marketCap: 2950000000000,
    rsi: 48.6,
    macd: -1.25,
    signal: "Hold"
  }
]

export default function MarketScreenersPage() {
  const [activeTab, setActiveTab] = useState("crypto")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(cryptoAssets)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Asset
    direction: "asc" | "desc"
  }>({ key: "marketCap", direction: "desc" })
  const [isLoading, setIsLoading] = useState(false)

  // Filter and sort assets
  useEffect(() => {
    setIsLoading(true)
    const assets = activeTab === "crypto" ? cryptoAssets : stockAssets
    
    let filtered = assets.filter(asset => 
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    filtered.sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
    })

    setFilteredAssets(filtered)
    setIsLoading(false)
  }, [activeTab, searchQuery, sortConfig])

  // Handle sort
  const handleSort = (key: keyof Asset) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc"
    }))
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFilteredAssets(current => 
        current.map(asset => ({
          ...asset,
          price: asset.price * (1 + (Math.random() * 0.002 - 0.001)),
          change24h: asset.change24h + (Math.random() * 0.4 - 0.2),
          volume: asset.volume * (1 + (Math.random() * 0.01 - 0.005)),
          rsi: Math.min(Math.max(asset.rsi + (Math.random() * 2 - 1), 0), 100),
          macd: asset.macd + (Math.random() * 10 - 5)
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Market Screeners</h1>
          <p className="text-white/70">Real-time market analysis and screening tools</p>
        </div>

        <Tabs defaultValue="crypto" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by symbol or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <Button variant="outline" className="border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="border-white/10">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white/70">Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Assets</span>
                  <span>{filteredAssets.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bullish Signals</span>
                  <span className="text-green-500">
                    {filteredAssets.filter(a => a.signal === "Buy").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bearish Signals</span>
                  <span className="text-red-500">
                    {filteredAssets.filter(a => a.signal === "Sell").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white/70">Technical Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>RSI Overbought</span>
                  <span className="text-red-500">
                    {filteredAssets.filter(a => a.rsi > 70).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>RSI Oversold</span>
                  <span className="text-green-500">
                    {filteredAssets.filter(a => a.rsi < 30).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>MACD Crossovers</span>
                  <span className="text-blue-500">
                    {filteredAssets.filter(a => Math.abs(a.macd) < 1).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white/70">Market Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Positive Change</span>
                  <span className="text-green-500">
                    {filteredAssets.filter(a => a.change24h > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Negative Change</span>
                  <span className="text-red-500">
                    {filteredAssets.filter(a => a.change24h < 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>High Volume</span>
                  <span>
                    {filteredAssets.filter(a => a.volume > 1000000000).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left">
                    <button
                      className="flex items-center text-white/70 hover:text-white"
                      onClick={() => handleSort("symbol")}
                    >
                      Asset
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button
                      className="flex items-center text-white/70 hover:text-white ml-auto"
                      onClick={() => handleSort("price")}
                    >
                      Price
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button
                      className="flex items-center text-white/70 hover:text-white ml-auto"
                      onClick={() => handleSort("change24h")}
                    >
                      24h Change
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button
                      className="flex items-center text-white/70 hover:text-white ml-auto"
                      onClick={() => handleSort("volume")}
                    >
                      Volume
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button
                      className="flex items-center text-white/70 hover:text-white ml-auto"
                      onClick={() => handleSort("marketCap")}
                    >
                      Market Cap
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button
                      className="flex items-center text-white/70 hover:text-white ml-auto"
                      onClick={() => handleSort("rsi")}
                    >
                      RSI
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button
                      className="flex items-center text-white/70 hover:text-white ml-auto"
                      onClick={() => handleSort("macd")}
                    >
                      MACD
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">Signal</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <motion.tr
                    key={asset.symbol}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{asset.symbol}</div>
                        <div className="text-sm text-white/70">{asset.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={asset.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                        {asset.change24h >= 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      ${(asset.volume / 1000000).toFixed(2)}M
                    </td>
                    <td className="px-4 py-3 text-right">
                      ${(asset.marketCap / 1000000000).toFixed(2)}B
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={
                        asset.rsi > 70 ? "text-red-500" : 
                        asset.rsi < 30 ? "text-green-500" : 
                        "text-white/70"
                      }>
                        {asset.rsi.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={asset.macd >= 0 ? "text-green-500" : "text-red-500"}>
                        {asset.macd.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Badge className={
                        asset.signal === "Buy" ? "bg-green-500/20 text-green-500" :
                        asset.signal === "Sell" ? "bg-red-500/20 text-red-500" :
                        "bg-yellow-500/20 text-yellow-500"
                      }>
                        {asset.signal}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 