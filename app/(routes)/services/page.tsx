import React from "react"
import Image from "next/image"
import { Services } from "@/data/data"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const page = () => {
  return (
    <div className="relative">
      <MaxWidthWrapper>
        <div className="mx-auto flex flex-col items-center space-y-12 py-20 text-center md:text-start">
          <h1 className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl">
            Services
          </h1>
        </div>
      </MaxWidthWrapper>
      {Services.map((service, index) => (
        <div key={index}>
          <div className="flex flex-col gap-4 md:flex-row md:gap-20">
            <div className="bg-primary text-primary-foreground flex w-fit items-center gap-4 rounded-r-full px-6 py-8 md:justify-center md:gap-x-4 md:px-9 md:py-0">
              <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">
                {service.title}
              </h2>
              {service.logo}
            </div>
            <div className="text-muted-foreground w-full px-4 md:w-2/5 md:px-0">
              <p>{service.description}</p>
            </div>
          </div>

          <MaxWidthWrapper>
            <div className="mx-auto flex flex-col items-center space-y-12 py-20 md:text-start">
              <h3 className="text-muted-foreground text-2xl font-semibold">
                {service.h2}
              </h3>
              <div className="grid grid-cols-2 gap-11 md:grid-cols-5">
                {service.logos.map((logo, index) => (
                  <Image
                    key={index}
                    src={logo.image}
                    className="size-16 object-contain object-center"
                    alt={logo.alt}
                    width={65}
                    height={65}
                  />
                ))}
              </div>
              <div>
                <div className="flex w-full flex-col items-start md:flex-row md:justify-between">
                  <div className="flex w-full flex-col space-y-7 md:w-3/5">
                    <div className="mb-6 md:mb-0">
                      <h2 className="text-muted-foreground text-2xl font-semibold">
                        Benefits of Our {service.title} Services
                      </h2>
                    </div>
                    {service.features.map((feature, index) => (
                      <article
                        key={index}
                        className="mb-12 flex w-full flex-col items-start justify-start sm:flex-row"
                      >
                        <h3 className="text-muted-foreground text-3xl sm:mr-4 md:text-5xl">
                          {feature.no}.
                        </h3>
                        <div className="flex w-full flex-col items-start space-y-5">
                          <h4 className="text-2xl md:text-4xl">
                            {feature.title}
                          </h4>
                          <div className="bg-primary h-px w-full" />
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="mt-6 w-full md:mt-0 md:w-auto">
                    <Image
                      src={service.image.image}
                      alt={service.image.alt}
                      className="h-auto w-full rounded-3xl object-cover object-center md:h-[1070px] md:w-[376px]"
                      width={376}
                      height={1070}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      ))}
    </div>
  )
}

export default page
