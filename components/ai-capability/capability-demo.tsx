"use client"

import { ReactNode } from "react"
import Image from "next/image"

interface CapabilityProps {
  capability: {
    id: string
    title: string
    icon: ReactNode
    description: string
    features: string[]
    demo: ReactNode
  }
}

export function CapabilityDemo({ capability }: CapabilityProps) {
  return (
    <div className="capability-demo" data-capability-id={capability.id}>
      {capability.demo}
    </div>
  )
} 