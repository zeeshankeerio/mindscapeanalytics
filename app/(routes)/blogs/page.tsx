import Link from "next/link"
import { client } from "@/sanity/lib/client"
import groq from "groq"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"

// Define the type for a post
type Post = {
  _id: string
  title: string
  slug: string | { current: string }
  publishedAt: string
}

type IndexProps = {
  posts: Post[]
}

export default async function IndexPage() {
  // Fetch posts directly in the component
  const posts: Post[] = await client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
  `)

  return (
    <MaxWidthWrapper className="min-h-screen">
      <div className="">
        <h1>Welcome to the blog!</h1>
        {posts.length > 0 && (
          <ul>
            {posts.map(
              ({ _id, title = "", slug = "", publishedAt = "" }) =>
                (slug as { current: string }).current && (
                  <li key={_id}>
                    <Link
                      href={`/blogs/${(slug as { current: string }).current}`}
                    >
                      {title}
                    </Link>{" "}
                    ({new Date(publishedAt).toDateString()})
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </MaxWidthWrapper>
  )
}
