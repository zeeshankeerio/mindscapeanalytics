"use client"

import dynamic from "next/dynamic"

const ThreeScene = dynamic(() => import("@/components/three-scene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
    ),
})

export default function NeuralNetworkSection() {
    return (
        <div className="w-full h-[500px] md:h-[600px]">
            <ThreeScene />
        </div>
    )
}
