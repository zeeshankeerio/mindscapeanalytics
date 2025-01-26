import { type Metadata, type ResolvingMetadata } from "next"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText, PortableTextReactComponents } from "@portabletext/react"

import { Project } from "@/types/projectTypes"
import { projectPage } from "@/lib/queries"
import CodeHighlighter from "@/components/CodeBlock"
import FormattedDate from "@/components/FormattedDate"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project: Project | null = await client.fetch(projectPage, {
    slug: params.slug,
  })

  const baseMetadata = await parent

  return {
    title: project?.name || "Project Not Found",
    robots: {
      index: true,
      follow: true,
    },
    description: project?.small_description || "",
    openGraph: {
      type: "article",
      title: project?.name || "Project Not Found",
      description: project?.small_description || "",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${"/projects"}/${params.slug}`,
      publishedTime: project?.publishedAt || "",
      images: [
        {
          url: project?.imageGallery?.[0]?.asset?.url || "/opengraph-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

const ptComponents: Partial<PortableTextReactComponents> = {
  types: {
    code: ({ value }) => (
      <CodeHighlighter language={value.language} code={value.code} />
    ),
    image: ({ value }) => (
      <figure className="group relative my-8 overflow-hidden">
        <Image
          alt={value.alt || "Project content image"}
          src={
            urlFor(value).width(1440).height(900).url() || "/placeholder.svg"
          }
          width={1440}
          height={900}
          className="group-hover:scale-98 rounded-lg border transition-transform duration-300 ease-in-out"
          placeholder="blur"
          blurDataURL={urlFor(value).width(20).quality(20).url()}
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm opacity-80">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project: Project | null = await client.fetch(projectPage, {
    slug: params.slug,
  })

  if (!project) {
    return (
      <MaxWidthWrapper className="min-h-screen">
        <div className="flex h-[50vh] items-center justify-center">
          <h1 className="text-3xl font-medium">Project Not Found</h1>
        </div>
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper className="mt-8 min-h-screen">
      <article className="relative">
        <section className="relative mb-16 h-[60vh] max-h-[800px]">
          <div className="absolute inset-0">
            {project.imageGallery ? (
              <Image
                src={project.imageGallery[0].asset.url || "/placeholder.svg"}
                alt={project.imageGallery[0].asset.url || "Project showcase"}
                fill
                className="rounded-3xl object-cover"
                priority
              />
            ) : (
              <div className="size-full bg-gradient-to-br from-gray-100 to-gray-200" />
            )}
          </div>
          <div className="relative flex h-full items-end justify-start bg-gradient-to-t from-gray-950 via-transparent to-transparent">
            <div className="container pb-12 pt-24">
              <div className="max-w-2xl invert">
                <div className="mb-4 block text-sm opacity-80">
                  {project.publishedAt && (
                    <FormattedDate dateString={project.publishedAt} />
                  )}
                </div>
                <h1 className="text-5xl font-medium leading-tight tracking-tight">
                  {project.name}
                </h1>
                {project.small_description && (
                  <p className="mt-4 text-xl opacity-90">
                    {project.small_description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="container mb-24">
          <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
            <PortableText value={project.body} components={ptComponents} />
          </div>
        </section>
      </article>
    </MaxWidthWrapper>
  )
}
