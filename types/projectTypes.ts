import { SanityDocument } from "@sanity/client"
import { PortableTextBlock } from "@sanity/types"

export interface Project extends SanityDocument {
  _id: string // Unique identifier for the project
  name: string // Name of the project
  slug: {
    current: string // Slug used for navigation (e.g., URL-friendly string)
    _type: string // Type of the slug field
  }
  small_description: string // Brief description of the project
  body: PortableTextBlock[]
  categories: {
    _id: string // Unique identifier for the category
    title: string // Category name
  }[] // Associated categories
  imageGallery: {
    _type: string // Image type
    _key: string // Unique key for the image in the gallery
    asset: {
      _id: string // Asset identifier
      url: string // Image URL
    }
  }[] // Array of images
  _createdAt: string // Creation timestamp (ISO format)
  _updatedAt: string // Last updated timestamp (ISO format)
  publishedAt?: string // Optional publish timestamp (ISO format)
  tags?: string[] // Optional list of tags for the project
}

export interface Category {
  _type: "category"
  title: string
  slug: {
    _type: "slug"
    current: string
  }
}

export interface ImageAsset {
  _type: "image"
  asset: {
    _type: "reference"
    _ref: string
  }
}
