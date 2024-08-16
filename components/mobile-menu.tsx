import React from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

const MobileMenu = ({
  menuItems,
}: {
  menuItems: { label: string; href: string }[]
}) => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <MenuIcon size={32} className="text-primary cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex size-full flex-col items-stretch rounded-lg p-6 shadow-xl">
        <SheetHeader>
          <nav className="mt-8">
            <ul className="flex flex-col items-center space-y-12">
              {menuItems.map((item, index) => (
                <li key={index} className="flex w-full flex-col items-start">
                  <Link
                    href={item.href}
                    className="text-primary text-5xl font-bold"
                  >
                    {item.label}
                  </Link>
                  <div className="bg-primary mt-4 h-1 w-full" />
                </li>
              ))}
            </ul>
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
