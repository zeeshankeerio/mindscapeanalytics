"use client"

import { Badge } from "@/components/ui/badge"
import { Flag, Shield, CheckCircle } from "lucide-react"

export default function USABasedBadge({ variant = "default" }: { variant?: "default" | "large" | "minimal" }) {
    if (variant === "large") {
        return (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-red-600/20 border border-blue-500/30 rounded-lg backdrop-blur-sm">
                <Flag className="h-5 w-5 text-blue-400" />
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">USA-Based Company</span>
                    <span className="text-xs text-white/70">Wyoming LLC</span>
                </div>
                <Shield className="h-4 w-4 text-green-400" />
            </div>
        )
    }

    if (variant === "minimal") {
        return (
            <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600/30">
                <Flag className="h-3 w-3 mr-1" />
                USA-Based
            </Badge>
        )
    }

    return (
        <Badge className="bg-gradient-to-r from-blue-600/20 to-red-600/20 text-white border-blue-500/30 hover:bg-blue-600/30">
            <Flag className="h-3 w-3 mr-1" />
            🇺🇸 USA-Based LLC
            <CheckCircle className="h-3 w-3 ml-1 text-green-400" />
        </Badge>
    )
}
