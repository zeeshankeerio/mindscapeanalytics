import { DocumentTextIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "name", // Lowercase for consistency
      title: "Name",
      type: "string",
      description: "Enter the project name.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Uses project name as the source for the slug
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, ""),
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
    defineField({
      title: "Image Gallery",
      name: "imageGallery",
      type: "array",
      of: [
        {
          type: "image",
          title: "Image",
          options: {
            hotspot: true, // Enable hotspot for image cropping
          },
        },
      ],
      options: {
        sortable: true, // Allow users to reorder images
        layout: "grid", // Display images in a grid layout
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(10)
          .error("Gallery must have between 1 and 10 images"),
      initialValue: [
        {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: "image-asset-reference-id",
          },
        },
      ],
      description:
        "Add and manage images for the gallery. Maximum of 10 images.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
      description: "Select the categories relevant to this project.",
      validation: (Rule) =>
        Rule.min(1).error("At least one category is required"),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "The date when this project was published.",
    }),
    defineField({
      name: "small_description",
      title: "Small Description",
      type: "text",
      description: "A brief description of the project for preview or listing.",
      validation: (Rule) =>
        Rule.max(150).warning("Keep it under 150 characters"),
    }),
    defineField({
      name: "body",
      title: "Project Details",
      type: "blockContent",
      description: "Detailed description of the project.",
    }),
  ],
})
