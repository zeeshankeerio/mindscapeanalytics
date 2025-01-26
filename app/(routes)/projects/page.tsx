"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PROJECTS_PER_PAGE } from "@/data/constants"
import { client } from "@/sanity/lib/client"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import type { Category, Project } from "@/types/projectTypes"
import {
  CategorieQuery,
  projectsCountQuery,
  projectsQuery,
} from "@/lib/queries"
import { Input } from "@/components/ui/input"
import FAQs from "@/components/FAQs"
import { Filter } from "@/components/filter"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import PaginationComponent from "@/components/Pagination"
import { ProjectCard } from "@/components/project-card"

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category") || "all"
  const currentPage = Number.parseInt(
    searchParams.get("page") || "1",
    PROJECTS_PER_PAGE
  )

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [fetchedProjects, fetchedCategories, totalProjects] =
          await Promise.all([
            client.fetch(
              projectsQuery(selectedCategory, currentPage, PROJECTS_PER_PAGE)
            ),
            client.fetch(CategorieQuery),
            client.fetch(projectsCountQuery(selectedCategory)),
          ])

        const calculatedTotalPages = Math.ceil(
          totalProjects / PROJECTS_PER_PAGE
        )

        setProjects(fetchedProjects)
        setCategories(fetchedCategories)
        setTotalPages(calculatedTotalPages)
      } catch (err) {
        console.error(err)
        setError("Failed to load projects. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCategory, currentPage])

  const filteredProjects = projects
    .filter(
      (project) =>
        activeCategory === "All" ||
        project.categories.some((cat) => cat?.title === activeCategory)
    )
    .filter(
      (project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.small_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <>
      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto flex flex-col items-center space-y-12 px-4 py-20 md:px-0">
            <div className="bg-background min-h-screen w-full px-4 py-12 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12 text-center"
                >
                  <h1 className="text-primary text-4xl font-bold ">
                    Our Projects
                  </h1>
                  <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                    Explore our portfolio of innovative solutions and successful
                    implementations across various industries and technologies.
                  </p>
                </motion.div>

                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <Filter
                    categories={[
                      "All",
                      ...categories.map((category) => category.title),
                    ]}
                    onFilterChange={handleCategoryChange}
                    activeCategory={activeCategory}
                  />
                  <Input
                    type="search"
                    placeholder="Search projects..."
                    className="max-w-sm"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>

                {loading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="text-primary size-8 animate-spin" />
                  </div>
                )}

                {error && (
                  <div className="py-12 text-center">
                    <p className="text-red-500">{error}</p>
                  </div>
                )}

                <AnimatePresence>
                  {!loading && !error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                      {filteredProjects.map((project) => (
                        <motion.div
                          key={project._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
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
                            tags={project.tags || []}
                            {...project}
                            slug={`/projects/${project.slug.current}`}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {filteredProjects.length === 0 && !loading && !error && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No projects found.</p>
                  </div>
                )}

                <div className="mt-8">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <FAQs />
    </>
  )
}

export default Projects
