import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

import { Post } from "@/types/postTypes"
import { buttonVariants } from "@/components/ui/button"

type Props = {
  featured_post: Post[]
}

const FeaturedBlog = ({ featured_post }: Props) => {
  return (
    <section>
      {featured_post.length > 0 && (
        <div>
          {featured_post.map((post) => (
            <section
              key={post._id}
              className="bg-muted rounded-3xl py-6 md:py-12 lg:py-20"
            >
              <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-2 lg:col-span-1">
                  <Image
                    src={urlFor(post.mainImage).url() as string}
                    width={1200}
                    height={1000}
                    alt={post.title}
                    className="aspect-square overflow-hidden rounded-lg object-cover object-center"
                  />
                </div>
                <div className="space-y-4">
                  <div className="bg-primary text-primary-foreground inline-block rounded-lg px-3 py-1 text-sm">
                    Featured
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {post.body[0].children[0].text}
                  </p>
                  <Link
                    href="/blogs/[slug]"
                    as={`/blogs/${post.slug.current}`}
                    className={buttonVariants()}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  )
}

export default FeaturedBlog
