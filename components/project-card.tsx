"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  slug: string
  description: string
  image: string
  category: string
  date: string
}

export function ProjectCard({
  title,
  slug,
  description,
  image,
  category,
  date,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-card group relative overflow-hidden rounded-xl border shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-4 top-4 backdrop-blur-sm">
          {category}
        </Badge>
      </div>
      <div className="p-6">
        <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
          <Calendar className="size-4" aria-hidden="true" />
          <time dateTime={date}>{date}</time>
        </div>
        <h3 className="mb-2 text-2xl font-bold">
          <Link href={slug} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button asChild className="group w-full">
          <Link href={slug}>
            View Project
            <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}
