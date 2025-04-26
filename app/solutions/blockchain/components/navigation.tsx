"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  BarChart2, 
  Wallet, 
  LineChart,
  Settings,
  Bell
} from "lucide-react"

const navigation = [
  {
    name: "Market Screeners",
    href: "/solutions/blockchain/screeners",
    icon: BarChart2
  },
  {
    name: "Portfolio",
    href: "/solutions/blockchain/portfolio",
    icon: Wallet
  },
  {
    name: "Analytics",
    href: "/solutions/blockchain/analytics",
    icon: LineChart
  }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/solutions/blockchain" className="text-xl font-bold text-white mr-8">
              Blockchain Platform
            </Link>
            <nav className="flex space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
              <Settings className="w-5 h-5" />
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 