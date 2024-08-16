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
                  <h3 className="text-3xl font-bold md:text-6xl md:leading-[80px]">
                    We provide software solutions to help business grow
                  </h3>
                  <p className="text-muted-foreground leading-snug tracking-tight">
                    Our mission is to provide cutting-edge solutions and
                    top-notch training programs that enable our clients to
                    harness the power of data and technology for success.
                    Whether you&apos;re looking to dive into data science,
                    master machine learning algorithms, develop dynamic web
                    applications, or enhance your skills in big data
                    technologies, we&apos;ve got you covered.
                  </p>
                </div>
                <div className="mt-6 flex gap-4 md:mt-14">
                  <Link href="/about" className={buttonVariants()}>
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
