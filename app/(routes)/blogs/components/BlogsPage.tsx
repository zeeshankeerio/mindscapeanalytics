"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { POSTS_PER_PAGE } from "@/data/constants"
import { client } from "@/sanity/lib/client"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { Category, Post } from "@/types/postTypes"
import {
  CategorieQuery,
  featuredQuery,
  postsCountQuery,
  postsQuery,
} from "@/lib/queries"
import { Input } from "@/components/ui/input"
import BlogCard from "@/components/BlogCard"
import FeaturedBlog from "@/components/FeaturedBlog"
import { Filter } from "@/components/filter"
import PaginationComponent from "@/components/Pagination"

const BlogsPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [featuredPost, setFeaturedPost] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category") || "all"
  const currentPage = parseInt(searchParams.get("page") || "1", POSTS_PER_PAGE)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [posts, featuredPost, categories, totalPosts] = await Promise.all(
          [
            client.fetch(
              postsQuery(selectedCategory, currentPage, POSTS_PER_PAGE)
            ),
            client.fetch(featuredQuery),
            client.fetch(CategorieQuery),
            client.fetch(postsCountQuery(selectedCategory)),
          ]
        )

        const calculatedTotalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

        setPosts(posts)
        setFeaturedPost(featuredPost)
        setCategories(categories)
        setTotalPages(calculatedTotalPages)
      } catch (err) {
        console.error(err)
        setError("Failed to load posts. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCategory, currentPage])

  const filteredPosts = posts
    .filter(
      (post) =>
        activeCategory === "All" ||
        post.categories.some((cat) => cat?.title === activeCategory)
    )
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.small_description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <div className="mx-auto flex flex-col space-y-20 px-4 py-12 md:px-0 md:text-start">
      {featuredPost.length > 0 && <FeaturedBlog featured_post={featuredPost} />}

      <div className="flex items-center justify-between">
        <Filter
          categories={["All", ...categories.map((category) => category.title)]}
          onFilterChange={handleCategoryChange}
          activeCategory={activeCategory}
        />
        <Input
          type="search"
          placeholder="Search posts..."
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <section>
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
              {filteredPosts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlogCard post={post} key={post._id} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredPosts.length === 0 && !loading && !error && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No posts found.</p>
          </div>
        )}
      </section>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        category={selectedCategory}
      />
    </div>
  )
}

export default BlogsPage
