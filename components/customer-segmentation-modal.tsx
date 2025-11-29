"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Target, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CustomerSegmentationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function CustomerSegmentationModal({ open, onOpenChange }: CustomerSegmentationModalProps) {
    // Sample segment data
    const segments = [
        {
            id: 1,
            name: "High-Value Customers",
            size: 15,
            value: "$42,500",
            engagement: 9.2,
            retention: 92,
            color: "bg-green-500",
            trend: "+12%"
        },
        {
            id: 2,
            name: "Regular Customers",
            size: 35,
            value: "$31,000",
            engagement: 7.5,
            retention: 78,
            color: "bg-blue-500",
            trend: "+5%"
        },
        {
            id: 3,
            name: "Occasional Buyers",
            size: 25,
            value: "$15,000",
            engagement: 5.4,
            retention: 45,
            color: "bg-yellow-500",
            trend: "+2%"
        },
        {
            id: 4,
            name: "New Users",
            size: 20,
            value: "$8,500",
            engagement: 4.7,
            retention: 35,
            color: "bg-purple-500",
            trend: "+8%"
        },
        {
            id: 5,
            name: "At-Risk Users",
            size: 5,
            value: "$3,000",
            engagement: 2.1,
            retention: 15,
            color: "bg-red-500",
            trend: "-5%"
        }
    ]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-black/95 border-red-500/20">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Users className="h-6 w-6 text-red-500" />
                        Customer Segmentation Analysis
                    </DialogTitle>
                    <DialogDescription>
                        AI-powered customer insights and behavioral analysis
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-6">
                    {/* Overview Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="bg-white/5 border-white/10">
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold text-white">100%</div>
                                <div className="text-sm text-white/60">Total Coverage</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold text-green-400">$100K</div>
                                <div className="text-sm text-white/60">Total Value</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold text-blue-400">5</div>
                                <div className="text-sm text-white/60">Segments</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold text-purple-400">6.8</div>
                                <div className="text-sm text-white/60">Avg Engagement</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Segments List */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-4">Customer Segments</h3>
                        {segments.map((segment) => (
                            <Card key={segment.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                                            <div className="flex-1">
                                                <div className="font-medium text-white">{segment.name}</div>
                                                <div className="text-sm text-white/60">
                                                    {segment.size}% of customer base
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-6 text-center">
                                            <div>
                                                <div className="text-sm font-medium text-white">{segment.value}</div>
                                                <div className="text-xs text-white/50">Value</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{segment.engagement}</div>
                                                <div className="text-xs text-white/50">Engagement</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{segment.retention}%</div>
                                                <div className="text-xs text-white/50">Retention</div>
                                            </div>
                                            <div>
                                                <Badge className={`${segment.trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {segment.trend}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Recommendations */}
                    <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Target className="h-5 w-5 text-red-500" />
                                AI Recommendations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 bg-black/30 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <TrendingUp className="h-4 w-4 text-green-500 mt-1" />
                                    <div>
                                        <div className="font-medium text-sm">Focus on High-Value Retention</div>
                                        <div className="text-xs text-white/60 mt-1">
                                            Your high-value segment shows strong engagement. Implement loyalty programs to maintain 92% retention.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-black/30 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <Target className="h-4 w-4 text-blue-500 mt-1" />
                                    <div>
                                        <div className="font-medium text-sm">Convert Occasional to Regular</div>
                                        <div className="text-xs text-white/60 mt-1">
                                            25% of customers are occasional buyers. Targeted campaigns could increase purchase frequency.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-black/30 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <Users className="h-4 w-4 text-purple-500 mt-1" />
                                    <div>
                                        <div className="font-medium text-sm">Nurture New Users</div>
                                        <div className="text-xs text-white/60 mt-1">
                                            20% are new users with 8% growth. Onboarding improvements could boost retention by 15%.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Export Button */}
                    <Button
                        className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500"
                        onClick={() => {
                            const data = segments.map(s =>
                                `${s.name}: ${s.size}% | Value: ${s.value} | Engagement: ${s.engagement} | Retention: ${s.retention}% | Trend: ${s.trend}`
                            ).join('\n')
                            const blob = new Blob([`Customer Segmentation Analysis\n\n${data}`], { type: 'text/plain' })
                            const url = URL.createObjectURL(blob)
                            const a = document.createElement('a')
                            a.href = url
                            a.download = 'customer-segmentation.txt'
                            a.click()
                        }}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export Analysis
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
