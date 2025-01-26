"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { motion } from "framer-motion"

import type { Project } from "@/types/projectTypes"
import { latestProjectsQuery } from "@/lib/queries"
import { ProjectCard } from "@/components/project-card"

const LatestProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        const fetchedProjects = await client.fetch(latestProjectsQuery)
        setProjects(fetchedProjects)
      } catch (err) {
        console.error(err)
        setError("Failed to load latest projects.")
      } finally {
        setLoading(false)
      }
    }

    fetchLatestProjects()
  }, [])

  if (loading) return <div>Loading latest projects...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard
            title={project.name}
            description={project.small_description}
            image={project.imageGallery?.[0]?.asset.url || ""}
            category={project.categories
              .map((category) => category.title)
              .join(", ")}
            date={new Date(project._createdAt).toDateString()}
            {...project}
            slug={`/projects/${project.slug.current}`}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default LatestProjects
