import React from "react"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="flex-1 grow">{children}</div>
      <Footer />
    </>
  )
}

export default layout
