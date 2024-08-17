"use client"

import React from "react"

import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

const founders = [
  {
    id: 1,
    name: "Zeeshan Keerio",
    designation: "CEO",
    image: "/images/zeeshan.jpeg",
  },
  {
    id: 2,
    name: "Muhammad Atif",
    designation: "COO",
    image: "/images/M.Atif.png",
  },
  {
    id: 3,
    name: "Farhan Murad",
    designation: "CDO",
    image: "/images/Farhan.png",
  },
]

export const FoundersCircleProfile = () => {
  return (
    <div className="flex">
      <AnimatedTooltip items={founders} />;
    </div>
  )
}

export default FoundersCircleProfile
