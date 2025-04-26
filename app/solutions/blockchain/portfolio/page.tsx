"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowUpDown,
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart2,
  Activity,
  Plus
} from "lucide-react"

interface PortfolioAsset {
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  value: number
  pnl: number
  pnlPercentage: number
  allocation: number
}

const portfolioAssets: PortfolioAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    quantity: 2.5,
    avgPrice: 45000,
    currentPrice: 65432.10,
    value: 163580.25,
    pnl: 51080.25,
    pnlPercentage: 45.36,
    allocation: 42.5
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    quantity: 15,
    avgPrice: 2800,
    currentPrice: 3456.78,
    value: 51851.70,
    pnl: 9851.70,
    pnlPercentage: 23.45,
    allocation: 13.5
  }
]

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [assets, setAssets] = useState(portfolioAssets)
  const [totalValue, setTotalValue] = useState(0)
  const [totalPnl, setTotalPnl] = useState(0)
  const [totalPnlPercentage, setTotalPnlPercentage] = useState(0)

  // Calculate portfolio metrics
  useEffect(() => {
    const value = assets.reduce((sum, asset) => sum + asset.value, 0)
    const pnl = assets.reduce((sum, asset) => sum + asset.pnl, 0)
    const pnlPercentage = (pnl / (value - pnl)) * 100

    setTotalValue(value)
    setTotalPnl(pnl)
    setTotalPnlPercentage(pnlPercentage)
  }, [assets])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(current => 
        current.map(asset => {
          const priceChange = asset.currentPrice * (Math.random() * 0.002 - 0.001)
          const newPrice = asset.currentPrice + priceChange
          const newValue = newPrice * asset.quantity
          const newPnl = newValue - (asset.avgPrice * asset.quantity)
          const newPnlPercentage = (newPnl / (asset.avgPrice * asset.quantity)) * 100
          
          return {
            ...asset,
            currentPrice: newPrice,
            value: newValue,
            pnl: newPnl,
            pnlPercentage: newPnlPercentage
          }
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Portfolio Management</h1>
          <p className="text-white/70">Track and manage your crypto and stock investments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white/70">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`text-sm mt-1 ${totalPnlPercentage >= 0 ? "text-green-500" : "text-red-500"}`}>
                {totalPnlPercentage >= 0 ? "+" : ""}{totalPnlPercentage.toFixed(2)}% All Time
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white/70">Total Profit/Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${totalPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                {totalPnl >= 0 ? "+" : ""}${totalPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm mt-1 text-white/70">
                Across {assets.length} Assets
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white/70">Portfolio Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button className="flex-1 bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Asset
                </Button>
                <Button variant="outline" className="flex-1 border-white/10">
                  <PieChart className="w-4 h-4 mr-2" />
                  Rebalance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left">Asset</th>
                  <th className="px-4 py-3 text-right">Quantity</th>
                  <th className="px-4 py-3 text-right">Avg Price</th>
                  <th className="px-4 py-3 text-right">Current Price</th>
                  <th className="px-4 py-3 text-right">Value</th>
                  <th className="px-4 py-3 text-right">P/L</th>
                  <th className="px-4 py-3 text-right">P/L %</th>
                  <th className="px-4 py-3 text-right">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
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
                      {asset.quantity.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ${asset.avgPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ${asset.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={asset.pnl >= 0 ? "text-green-500" : "text-red-500"}>
                        {asset.pnl >= 0 ? "+" : ""}${asset.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={asset.pnlPercentage >= 0 ? "text-green-500" : "text-red-500"}>
                        {asset.pnlPercentage >= 0 ? "+" : ""}{asset.pnlPercentage.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500 rounded-full"
                            style={{ width: `${asset.allocation}%` }}
                          ></div>
                        </div>
                        <span>{asset.allocation}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full border-8 border-red-500 flex items-center justify-center mx-auto mb-4">
                    <PieChart className="w-12 h-12" />
                  </div>
                  <p className="text-white/70">Asset allocation visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-full h-32 bg-white/10 rounded-lg mb-4"></div>
                  <p className="text-white/70">Performance chart visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 