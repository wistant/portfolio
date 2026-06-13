import Link from "next/link"
import { PROJECTS } from "@/data/portfolio/projects"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel"
import { ProjectCard } from "./project-card"

export function Projects() {
  // Show 4 projects for a balanced 2x2 grid layout
  const visibleProjects = PROJECTS.slice(0, 4)

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          My Projects 💻
          <PanelTitleSup>[{PROJECTS.length}]</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-line">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {PROJECTS.length > 4 && (
        <div className="flex h-12 items-center justify-center pb-px">
          <Button
            className="gap-2 border-none pr-2.5 pl-3"
            size="sm"
            nativeButton={false}
            render={<Link href="/projects" />}
          >
            Voir plus
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
      )}
    </Panel>
  )
}
