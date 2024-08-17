import { client } from "@/sanity/lib/client"
import groq from "groq"

const posts = client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
  `)
