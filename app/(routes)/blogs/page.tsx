import { Suspense } from "react"

import Loading from "@/components/Loading"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

import BlogsPage from "./components/BlogsPage"

export default function IndexPage() {
  return (
    <MaxWidthWrapper className="min-h-screen">
      <div className="relative">
        <div className="mx-auto flex flex-col space-y-20 px-4 py-12 md:px-0 md:text-start">
          <section>
            <div className="space-y-6">
              <h1 className="text-muted-foreground text-md font-medium uppercase">
                OUR THOUGHTS ON DIGITAL, DATA & AI
              </h1>
              <h2 className="text-primary font-mono text-2xl font-bold">
                Imagine. Innovate. Execute.
              </h2>
            </div>
          </section>
          <section>
            <Suspense fallback={<Loading />}>
              <BlogsPage />
            </Suspense>
          </section>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
