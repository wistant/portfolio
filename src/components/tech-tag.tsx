import React from "react"
import { findTechBySkill, LOCAL_ICONS } from "@/data/portfolio/tech-stack"

import { Tag } from "@/components/ui/tag"

export function TechTag({ skill }: { skill: string }) {
  const tech = findTechBySkill(skill)

  if (!tech) {
    return <Tag>{skill}</Tag>
  }

  const localIcon = LOCAL_ICONS[tech.key]

  return (
    <a
      href={tech.href}
      target="_blank"
      rel="noopener"
      aria-label={tech.title}
      className="flex items-center gap-1.5 rounded-xs bg-zinc-50 px-1.5 py-0.5 text-xs tracking-wide text-foreground ring-1 ring-border/80 transition-colors duration-200 select-none hover:bg-accent-muted dark:bg-zinc-900 [&_img]:size-3.5"
    >
      {localIcon && (
        <img
          className="size-3.5 rounded-xs object-cover"
          src={localIcon}
          alt={`${tech.title} icon`}
        />
      )}
      {tech.title}
    </a>
  )
}
