import React from "react"

import FAQs from "@/components/FAQs"
import { ContactForm } from "@/components/Form"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const page = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto flex flex-col items-center space-y-12 py-20 text-center md:text-start">
            <div className="mt-1 text-center">
              <h1 className="text-3xl font-semibold uppercase md:text-6xl">
                Contact Us
              </h1>
              <p className="text-sm font-medium md:text-lg">
                Contact us and let&apos;s bring your vision to life
              </p>
            </div>
            <div>
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <FAQs />
    </>
  )
}

export default page
