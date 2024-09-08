"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MenuItem {
  label: string
  href: string
}

interface MobileMenuProps {
  menuItems: MenuItem[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          className={
            "text-primary flex aspect-square h-fit select-none flex-col items-center justify-center rounded-full"
          }
        >
          <motion.div
            style={{
              width: "20px",
              borderTop: "2px solid",
              transformOrigin: "center",
            }}
            initial={{ translateY: "-3px" }}
            animate={
              isOpen
                ? { rotate: "45deg", translateY: "1px" }
                : { translateY: "-3px", rotate: "0deg" }
            }
            transition={{ bounce: 0, duration: 0.1 }}
          />
          <motion.div
            transition={{ bounce: 0, duration: 0.1 }}
            style={{
              width: "20px",
              borderTop: "2px solid",
              transformOrigin: "center",
            }}
            initial={{ translateY: "3px" }}
            animate={
              isOpen
                ? { rotate: "-45deg", translateY: "-1px" }
                : { translateY: "3px", rotate: "0deg", scaleX: 1 }
            }
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 w-40 rounded-lg  p-2 shadow-lg">
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              href={item.href}
              className="text-primary block w-full rounded-md p-2"
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileMenu
