import React from "react"
import Image from "next/image"

import FAQs from "@/components/FAQs"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const projectImages = [
  {
    src: "/projects/Foodies.png",
    alt: "Project 1",
  },
  {
    src: "/projects/codify.png",
    alt: "Project 2",
  },
  {
    src: "/projects/flowbord.png",
    alt: "Project 3",
  },

  {
    src: "/projects/dailuhub.png",
    alt: "Project 3",
  },
  {
    src: "/projects/flexify.png",
    alt: "Project 3",
  },
  {
    src: "/projects/service.png",
    alt: "Project 3",
  },

  {
    src: "/projects/flash.png",
    alt: "Project 4",
  },
  {
    src: "/projects/journey.png",
    alt: "Project 5",
  },
  {
    src: "/projects/taskify.png",
    alt: "Project 6",
  },
]

const page = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="relative">
          <div className="mx-auto flex flex-col items-center space-y-12 px-4 py-20 text-center md:px-0 md:text-start">
            <div className="mt-1 text-center">
              <h1 className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl">
                Digital Visions
              </h1>
              <p className="text-lg font-medium">The Fusion of Art and Tech</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {projectImages.map((image, index) => (
                <div key={index} className="relative h-[300px] w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    className="size-full rounded-lg object-cover"
                    width={410}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <FAQs />
    </>
  )
}

export default page
