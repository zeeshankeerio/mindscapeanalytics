"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Typewriter from "typewriter-effect"

import { cn } from "@/lib/utils"

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

const Navbar = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => pathname === href

  return (
    <div className="h-16">
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "shadow-md backdrop-blur-md" : "bg-transparent"
        )}
      >
        <MaxWidthWrapper>
          <nav className="flex items-center justify-between">
            <div className="text-primary flex items-center gap-2 text-2xl font-bold sm:justify-between md:text-3xl">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="mindscape analytics logo"
                  width={50}
                  height={50}
                />
              </Link>
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
              <ul className="flex items-center space-x-6">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "hover:text-primary text-sm font-medium transition-colors",
                        isActive(item.href) ? "text-primary" : "text-gray-600"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:text-primary transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </button>
            </div>
          </nav>
        </MaxWidthWrapper>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="shadow-lg md:hidden"
            >
              <MaxWidthWrapper>
                <ul className="space-y-2 py-4">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium transition-colors",
                          isActive(item.href) ? "text-primary" : ""
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </MaxWidthWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  )
}

export default Navbar
