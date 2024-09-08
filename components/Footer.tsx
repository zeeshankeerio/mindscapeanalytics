import React from "react"
import Link from "next/link"
import { Mail, MapPinIcon } from "lucide-react"

import MaxWidthWrapper from "./MaxWidthWrapper"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/blogs" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const Footer = () => {
  return (
    <MaxWidthWrapper className="bg-accent">
      <div className="flex flex-col justify-between gap-x-12 px-4 py-12 md:px-0">
        <h3 className="-mb-8 text-center text-4xl font-semibold sm:text-start md:-mb-12 md:text-5xl">
          Let&apos;s Connect
        </h3>
        <div className="mt-8 flex size-full flex-col items-center gap-4 sm:flex-row md:mt-0">
          <div className="flex-1">
            <hr />
          </div>
          <div className="mt-8 sm:mt-0">
            <Link
              href={"/contact"}
              className="bg-primary text-primary-foreground hover:bg-primary/75 flex size-24 items-center justify-center rounded-full md:size-36"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-x-16 font-medium sm:flex-row md:mt-16 md:gap-x-64">
          <div className="w-full space-y-4 sm:w-1/2 md:space-y-8">
            <p>We collaborate with ambitious brands and people worldwide.</p>
            <p>
              Elevate your business with Mindscape Analytics We offer innovative
              solutions in AI, data science, React development, UX/UI design,
              big data management, microservices, and generative AI
              applications. Partner with us to transform insights into action
              and achieve your goals with cutting-edge technology.
            </p>
          </div>
          <div className="mt-8 w-full space-y-4 sm:mt-0 sm:w-2/3 md:space-y-8">
            <div className="flex items-center gap-4">
              <Mail size={24} />{" "}
              <Link href="mailto:mindscape@mindscapeanalytics.com">
                admin@mindscapeanalytics.com
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <MapPinIcon size={24} /> Estonia, Europe
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-11 flex size-full flex-col items-center justify-between gap-y-8 px-4 sm:flex-row sm:gap-y-0 md:px-0">
        <div>
          <ul className="flex gap-6 md:gap-9">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>
            All Rights<sup>&#174;</sup> Reserved
            <span className="font-medium"> Mindscape Analytics</span>
          </p>
        </div>
      </div>
      <br></br>
    </MaxWidthWrapper>
  )
}

export default Footer
