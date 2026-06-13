import Link from "next/link"
import { getDocBySlug } from "@/data/doc/documents"
import { PROJECTS } from "@/data/portfolio/projects"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
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

      <div className="relative py-4">
        {/* Background Vertical Separator Lines */}
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-line"></div>
          <div className="border-l border-line"></div>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visibleProjects.map((project) => (
            <li
              key={project.id}
              className={cn(
                "max-sm:screen-line-top max-sm:screen-line-bottom",
                "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom",
                "p-4"
              )}
            >
              <ProjectCard
                project={project}
                hasLocalPage={!!getDocBySlug(project.id)}
              />
            </li>
          ))}
        </ul>
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
