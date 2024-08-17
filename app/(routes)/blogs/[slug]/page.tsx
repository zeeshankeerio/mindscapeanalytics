import { GetStaticPathsContext, GetStaticPropsContext } from "next"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"
import groq from "groq"

// Sanity image builder function
function urlFor(source: any) {
  return imageUrlBuilder(client).image(source)
}

// PortableText component configuration
const ptComponents = {
  types: {
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
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post: PostProps["post"] = await client.fetch(query, { slug })

  if (!post) {
    return <div>Post not found</div>
  }

  const {
    title = "Missing title",
    name = "Missing name",
    categories = [],
    authorImage,
    body = [],
  } = post

  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories.length > 0 && (
        <ul>
          Posted in
          {categories.map((category: string) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
      {authorImage && (
        <div>
          <Image
            src={urlFor(authorImage).width(50).url()}
            alt={`${name}'s picture`}
            width={50}
            height={50}
          />
        </div>
      )}
      <PortableText value={body} components={ptComponents} />
    </article>
  )
}

// GROQ query to fetch the post data
const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

// Function to generate static paths
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return slugs.map((slug) => ({ slug }))
}
