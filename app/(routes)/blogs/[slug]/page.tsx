import { type Metadata, type ResolvingMetadata } from "next"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText, PortableTextReactComponents } from "@portabletext/react"

import { Post } from "@/types/postTypes"
import { postPage } from "@/lib/queries"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import CodeHighlighter from "@/components/CodeBlock"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post: Post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
          mainImage,
          title,
          "author": author->name,
          publishedAt,
          _updatedAt,
      }`,
    { slug: params.slug }
  )
  const metadata: Metadata = {
    title: `${post?.title}`,
    authors: [{ name: post?.author }],
    openGraph: {
      title: `${post?.title}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post?.author],
    },
  }
  if (post?.mainImage) {
    metadata.openGraph!.images = [{ url: urlFor(post.mainImage).url() }]
  }
  return metadata
}

const ptComponents: Partial<PortableTextReactComponents> = {
  types: {
    code: ({ value }) => {
      return <CodeHighlighter language={value.language} code={value.code} />
    },
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <Image
          alt={value.alt || " "}
          src={urlFor(value)
            .width(320)
            .height(240)
            .fit("max")
            .auto("format")
            .url()}
          width={320}
          height={240}
          loading="lazy"
        />
      )
    },
  },
}

type PostProps = {
  post: {
    title: string
    name: string
    categories: string[]
    authorImage: any
    body: any[]
    mainImage: any
    publishedAt: string
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const post: PostProps["post"] = await client.fetch(postPage, { slug })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <MaxWidthWrapper className="min-h-screen">
      <div className="relative">
        <div className="mx-auto flex flex-col space-y-20 px-4 py-12 md:px-0 md:text-start">
          <header className="relative mb-8 h-96">
            <div className="relative mb-8 h-96 bg-black">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.mainImage.alt}
                width={1920}
                height={1080}
                className="size-full rounded object-cover opacity-50"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="px-4 text-center text-4xl font-bold invert md:text-5xl">
                {post.title}
              </h1>
            </div>
          </header>

          <div className="container mx-auto flex flex-col gap-8 px-4 lg:flex-row">
            <article className="lg:w-2/3">
              <div className="mb-8 rounded-lg p-6">
                <div className="mb-6 flex items-center">
                  <Avatar className="mr-4 size-12">
                    <AvatarImage
                      src={urlFor(post.authorImage).url()}
                      alt="Author"
                    />
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{post.name}</h2>
                    <p className="">
                      {new Date(post.publishedAt).toDateString()}
                    </p>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <PortableText value={post.body} components={ptComponents} />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
