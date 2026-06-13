"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import type { Project } from "@/types/projects"
import { TechTag } from "@/components/tech-tag"

import { ProjectCardActions } from "./project-card-actions"
import { ProjectCardHeader } from "./project-card-header"
import { ProjectCardPreview } from "./project-card-preview"

interface ProjectCardProps {
  project: Project
  hasLocalPage?: boolean
}

export function ProjectCard({
  project,
  hasLocalPage = false,
}: ProjectCardProps) {
  const router = useRouter()
  const [cardHover, setCardHover] = useState<boolean>(false)

  // 1. Resolve Title
  const title = project.title

  // 2. Resolve Mockup Image
  const projectImage = project.projectImage || ""

  // 3. Resolve Background Image or class
  const backgroundImage = project.backgroundImage

  // 4. Resolve Tags / Skills
  const tagList = project.skills || []

  // 5. Resolve Case Study details href and label
  const detailsHref = hasLocalPage ? `/projects/${project.id}` : project.link
  const detailsLabel = hasLocalPage ? "Read Case Study" : "View Live Site"

  return (
    <div
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      onClick={() => router.push(detailsHref)}
      className="group flex w-full h-full cursor-pointer flex-col"
    >
      {/* 1. Preview Area */}
      <ProjectCardPreview
        title={title}
        projectImage={projectImage}
        backgroundImage={backgroundImage}
        pinned={project.pinned}
        cardHover={cardHover}
        themeColor={project.themeColor}
        projectId={project.id}
      />

      {/* 2. Header Area */}
      <ProjectCardHeader title={title} status={project.status} />

      {/* 3. Description */}
      <p className="mt-1.5 line-clamp-2 px-1 text-xs leading-relaxed text-muted-foreground/85">
        {project.shortDescription || project.description}
      </p>

      {/* 4. Tech Stack Badges */}
      {tagList.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1 px-1">
          {tagList.slice(0, 6).map((tag) => (
            <TechTag key={tag} skill={tag} />
          ))}
          {tagList.length > 6 && (
            <span className="inline-flex items-center rounded-xs bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground ring-1 ring-line">
              +{tagList.length - 6}
            </span>
          )}
        </div>
      )}

      {/* 5. Actions Row */}
      <ProjectCardActions
        detailsHref={detailsHref}
        detailsLabel={detailsLabel}
        liveLink={project.link}
        github={project.github}
      />
    </div>
  )
}
