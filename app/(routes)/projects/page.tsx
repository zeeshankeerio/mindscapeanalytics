import React, { Suspense } from "react"

import Loading from "@/components/Loading"

import Projects from "./components/ProjectsComponent"

const ProjectsPage = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Projects />
      </Suspense>
    </>
  )
}

export default ProjectsPage
