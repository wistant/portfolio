import Link from "next/link"
import { getDocBySlug } from "@/data/doc/documents"
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

      <div className="grid grid-cols-1 gap-4 border-b border-line p-4 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            hasLocalPage={!!getDocBySlug(project.id)}
          />
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
