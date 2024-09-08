"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { POSTS_PER_PAGE } from "@/data/constants"
import { client } from "@/sanity/lib/client"

import { Category, Post } from "@/types/postTypes"
import {
  CategorieQuery,
  featuredQuery,
  postsCountQuery,
  postsQuery,
} from "@/lib/queries"
import BlogCard from "@/components/BlogCard"
import BlogCategories from "@/components/BlogCategories"
import FeaturedBlog from "@/components/FeaturedBlog"
import PaginationComponent from "@/components/Pagination"

const BlogsPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [featuredPost, setFeaturedPost] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)

  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category") || "all"
  const currentPage = parseInt(searchParams.get("page") || "1", 10)

  useEffect(() => {
    async function fetchData() {
      const [posts, featuredPost, categories, totalPosts] = await Promise.all([
        client.fetch(postsQuery(selectedCategory, currentPage, POSTS_PER_PAGE)),
        client.fetch(featuredQuery),
        client.fetch(CategorieQuery),
        client.fetch(postsCountQuery(selectedCategory)),
      ])

      const calculatedTotalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

      setPosts(posts)
      setFeaturedPost(featuredPost)
      setCategories(categories)
      setTotalPages(calculatedTotalPages)
    }

    fetchData()
  }, [selectedCategory, currentPage])

  return (
    <div className="mx-auto flex flex-col space-y-20 px-4 py-12 md:px-0 md:text-start">
      {featuredPost.length > 0 && <FeaturedBlog featured_post={featuredPost} />}

      <BlogCategories
        selectedCategory={selectedCategory}
        categories={categories}
      />

      <section>
        {posts.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <BlogCard post={post} key={post._id} />
            ))}
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
