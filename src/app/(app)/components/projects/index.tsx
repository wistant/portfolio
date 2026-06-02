import Link from "next/link"
import { PROJECTS } from "@/data/portfolio/projects"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel"
import { ProjectItem } from "./project-item"

export function Projects() {
  const visibleProjects = PROJECTS.slice(0, 5)

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          My Projects 💻
          <PanelTitleSup>[{PROJECTS.length}]</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <ul>
        {visibleProjects.map((project) => (
          <li key={project.id} className="border-b border-line">
            <ProjectItem project={project} />
          </li>
        ))}
      </ul>

      {PROJECTS.length > 5 && (
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
