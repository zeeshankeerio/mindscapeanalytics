import groq from "groq"

import { WorkplacePolicy } from "@/types/postTypes"

export const postsQuery = (
  categorySlug: string,
  page: number,
  postsPerPage: number
) => {
  const offset = (page - 1) * postsPerPage
  return groq`
    *[_type == "post" && publishedAt < now() ${
      categorySlug && categorySlug !== "all"
        ? `&& '${categorySlug}' in categories[]->slug.current`
        : ""
    }] | order(publishedAt desc)[${
      offset > 0 ? offset : 0
    }...${offset + postsPerPage}]{
      _id,
      title,
      slug,
      small_description,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        _id,
        name,
        image{
          asset->{
            url
          }
        }
      },
      categories[]->{
        _id,
        title,
        slug
      },
      publishedAt,
      body
    }
  `
}
// Fetch total count of posts for pagination
export const postsCountQuery = (categorySlug: string) => groq`
  count(*[_type == "post" && publishedAt < now() ${
    categorySlug && categorySlug !== "all"
      ? `&& '${categorySlug}' in categories[]->slug.current`
      : ""
  }])
`

export const postPage = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  mainImage,
  publishedAt,
  body
}`

export const featuredQuery = groq`
*[_type == "featured_post"]{
  _id,
  title,
  slug,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  author->{
    _id,
    name,
    image{
      asset->{
        url
      }
    }
  },
  categories[]->{
    _id,
    title
  },
  publishedAt,
  body
} | order(publishedAt desc)
`
export const CategorieQuery = groq`
*[_type == "category"] | order(order asc){
  _id,
  title,
  slug,
  }`

// Workplace Policy
export const workplacePolicyQuery = groq`
  *[_type == "workplace_policy"][0]{
    title, 
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    body
  }
`
