"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Typewriter from "typewriter-effect"

import MaxWidthWrapper from "./MaxWidthWrapper"
import MobileMenu from "./mobile-menu"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  // { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]
const Navbar = () => {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <div className=" h-16">
      <header className="relative px-4 md:px-0">
        <MaxWidthWrapper>
          <nav className="border-primary bg-background flex items-center justify-between rounded-full border-2 px-4 py-2 sm:px-6">
            <div className="text-primary flex items-center gap-2 text-3xl font-bold sm:justify-between">
              <Image
                src="/logo.png"
                alt="mindscape analytics logo"
                width={50}
                height={50}
              />
              <Typewriter
                options={{
                  strings: ["Mindscape"],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  cursor: "",
                }}
              />
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center space-x-4">
                {menuItems.map((item, index) => (
                  <li key={index + 1}>
                    <Link
                      href={item.href}
                      className={`${
                        isActive(item.href)
                          ? "text-primary/70 underline"
                          : "text-primary"
                      } text-bold hover:text-primary/70 underline-offset-4 hover:underline`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="block md:hidden">
              <MobileMenu menuItems={menuItems} />
            </div>
          </nav>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar
