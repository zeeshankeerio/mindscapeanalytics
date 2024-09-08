import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText, PortableTextReactComponents } from "next-sanity"

import { WorkplacePolicy } from "@/types/postTypes"
import { workplacePolicyQuery } from "@/lib/queries"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const Components: Partial<PortableTextReactComponents> = {
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

const Policy = async () => {
  const policy: WorkplacePolicy = await client.fetch(workplacePolicyQuery)

  if (!policy) {
    return null
  }

  return (
    <>
      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto flex flex-col items-center space-y-12 px-4 py-20 md:px-0 md:text-start">
            <header className="mb-12 text-center">
              <h1 className="mb-2 text-2xl font-bold md:text-4xl">
                Workplace <span className="text-primary">Policies</span>
              </h1>
              <p className="text-muted-foreground text-md md:text-xl">
                Ensuring a safe, productive, and inclusive environment
              </p>
            </header>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="pt-0">
        <div className="relative">
          <div className="mx-auto mb-12 flex flex-col items-center px-4 md:px-0 md:text-start">
            <div className="prose prose-h3:text-primary prose-h3:text-xl md:prose-h3:text-3xl max-w-full md:max-w-4xl ">
              <PortableText value={policy.body} components={Components} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Policy
