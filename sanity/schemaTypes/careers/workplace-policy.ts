import { DocumentTextIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const workplace_policy = defineType({
  name: "workplace_policy",
  title: "Workplace Policy",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
})
