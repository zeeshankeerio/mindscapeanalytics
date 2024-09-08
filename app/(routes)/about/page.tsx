import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import FAQs from "@/components/FAQs"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const page = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto flex flex-col items-center space-y-12 px-4 py-20 text-center md:px-0 md:text-start">
            <div className="bg-muted flex flex-col items-center justify-between rounded-[42px] p-2 shadow-md md:flex-row">
              <div className="mb-8 flex flex-1 flex-col items-center justify-between px-6 py-4 md:mb-0 md:items-start md:px-16 md:py-0">
                <div className="size-full space-y-6 md:w-5/6">
                  <h1 className="text-3xl font-bold md:text-6xl md:leading-[80px]">
                    We provide software solutions to help business grow.
                  </h1>
                  <p className="text-muted-foreground leading-snug tracking-tight">
                    Mindscape Analytics is a cutting-edge software and services
                    company dedicated to transforming businesses through
                    advanced technology, data, and AI. As a forward-thinking
                    partner, we specialize in enhancing customer experiences,
                    optimizing operational efficiencies, launching innovative
                    platforms, and capitalizing on data opportunities.
                  </p>
                </div>
                <div className="mt-6 flex gap-4 md:mt-14">
                  <Link href="/contact" className={buttonVariants()}>
                    Get Started <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="flex w-full justify-center md:w-auto">
                <Image
                  src="/images/aboutimage.jpg"
                  alt="hero"
                  width={455}
                  height={580}
                  className="h-auto w-full max-w-[455px] rounded-[36px] object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="relative">
        <MaxWidthWrapper>
          <div className="mx-auto flex flex-col items-center space-y-16 py-20 text-center md:text-start">
            <h1 className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl">
              What We Offer
            </h1>
            <div className="flex flex-col items-center justify-between pt-12 md:flex-row">
              <div className="flex flex-col gap-y-12">
                <div className="w-1/2 text-justify ">
                  <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    Comprehensive Solutions:
                  </h2>
                  <p>
                    We provide fully-managed, end-to-end technology solutions,
                    encompassing strategy, design, engineering, and analytics
                    services, all through a single, unified platform.
                  </p>
                </div>
                <div className="w-1/2 text-justify">
                  <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    Digital + Data + AI:
                  </h2>

                  <p>
                    Our expertise spans the full spectrum of digital and data
                    needs, from building and scaling businesses to transforming
                    operations with technology and artificial intelligence.
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src={"/team-ill.png"}
                  width={400}
                  height={400}
                  className=""
                  alt="Cube"
                />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto px-4 md:px-0">
            <div className="flex size-full items-center">
              <div className="bg-primary h-2 w-12" />
              <div className="bg-muted-foreground h-px w-full" />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto px-4 md:px-0">
            <div className="flex flex-col gap-12 sm:flex-row md:gap-x-32">
              <div>
                <h3 className="text-5xl">Vision</h3>
                <p className="text-md text-muted-foreground w-3/5">
                  We’re dedicated to building a diverse team — in all senses of
                  the word.
                </p>
              </div>
              <div>
                <ul className="space-y-8 text-lg font-medium md:text-2xl">
                  <li>
                    <span className="text-muted-foreground font-normal">
                      1.{" "}
                    </span>
                    Foster collaboration and teamwork.
                  </li>
                  <li>
                    <span className="text-muted-foreground font-normal">
                      2.{" "}
                    </span>
                    Empower creativity and innovation.
                  </li>
                  <li>
                    <span className="text-muted-foreground font-normal">
                      3.{" "}
                    </span>
                    Simplify complex processes.
                  </li>
                  <li>
                    <span className="text-muted-foreground font-normal">
                      4.{" "}
                    </span>
                    Enhance productivity and efficiency.
                  </li>
                  <li>
                    <span className="text-muted-foreground font-normal">
                      5.{" "}
                    </span>
                    Inspire positive change and growth.
                  </li>
                </ul>
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
