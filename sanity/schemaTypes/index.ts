import { type SchemaTypeDefinition } from "sanity"

import { authorType } from "./authorType"
import { blockContentType } from "./blockContentType"
import { workplace_policy } from "./careers/workplace-policy"
import { categoryType } from "./categoryType"
import { featuredType } from "./featuredTypes"
import { postType } from "./postType"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    featuredType,
    workplace_policy,
  ],
}
