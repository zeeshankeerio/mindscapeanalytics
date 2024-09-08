import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { Calendar } from "lucide-react"

import { Post } from "@/types/postTypes"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  post: Post
}

const BlogCard = ({ post }: Props) => {
  return (
    <Card
      key={post.slug.current}
      className="group mx-auto max-h-[600px] min-h-[600px] w-full max-w-md shadow-lg transition-shadow duration-300 hover:shadow-xl md:max-w-lg lg:max-w-xl"
    >
      <Image
        src={urlFor(post.mainImage).url() as string}
        width={800}
        height={600}
        alt={post.mainImage.alt || "Blog post image"}
        className="aspect-video w-full rounded-t-lg object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
      <CardHeader>
        <CardDescription>
          <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
            {post.categories.map((category) => (
              <span key={category._id} className="text-muted-foreground">
                {category.title}
              </span>
            ))}
          </div>
        </CardDescription>
        <CardTitle>
          <h3 className="mt-2 text-lg font-bold md:text-xl">{post.title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex w-full items-center justify-between ">
          <div className="flex items-center">
            <Image
              src={urlFor(post.author.image).url() as string}
              width={25}
              height={25}
              alt={post.author.name}
              className="mr-2 rounded-full"
            />
            <span className="text-muted-foreground text-sm md:text-base">
              {post.author.name}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center text-sm md:text-base">
            <Calendar size={20} className="mr-2 " />
            <span className="">
              {new Date(post.publishedAt).toDateString()}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground max-h-24 min-h-24 text-sm md:text-base">
          {post.small_description}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href="/blogs/[slug]"
          as={`/blogs/${post.slug.current}`}
          className={buttonVariants()}
          prefetch={false}
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BlogCard
