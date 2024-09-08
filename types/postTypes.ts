export interface Post {
  _id: string
  _type: "post"
  title: string
  slug: {
    _type: "slug"
    current: string
  }
  small_description: string
  author: any
  mainImage: {
    _type: "image"
    asset: SanityImageAssetDocument
    alt: string
  }
  categories: Category[]
  publishedAt: string // ISO 8601 date string
  body: BlockContent[] // Array of block content
}

export interface BlockContent {
  _type: "block"
  children: Array<{
    _type: "span"
    text: string
    marks: string[]
  }>
  markDefs: Array<{
    _type: "link"
    href: string
  }>
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote"
  list: "bullet"
}

export interface Category {
  _id: string
  _type: "category"
  title: string
  slug: {
    _type: "slug"
    current: string
  }
  description: string
}

export interface Author {
  _id: string
  _type: "author"
  name: string
  slug: {
    _type: "slug"
    current: string
  }
  image: {
    _type: "image"
    asset: SanityImageAssetDocument
  }
  bio: BlockContent[]
}

export interface SanityImageAssetDocument {
  _id: string
  url: string
}

export interface WorkplacePolicy {
  title: string
  mainImage: {
    _type: "image"
    asset: SanityImageAssetDocument
    alt: string
  }
  body: BlockContent[]
}
