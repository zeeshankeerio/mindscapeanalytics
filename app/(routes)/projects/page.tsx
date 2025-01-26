import React, { Suspense } from "react"

import Loading from "@/components/Loading"

import Projects from "./components/ProjectsComponent"

type Props = {}

const ProjectsPage = (props: Props) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Projects />
      </Suspense>
    </>
  )
}

export default ProjectsPage
