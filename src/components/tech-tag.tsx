import React from "react"
import { TECH_STACK } from "@/data/portfolio/tech-stack"

import { Tag } from "@/components/ui/tag"

const KEY_MAP: Record<string, string> = {
  js: "javascript",
  nextjs: "nextdotjs",
  "shadcn-ui": "shadcnui",
  radixui: "radixui",
  "base-ui": "baseui",
  "react-navigation": "react",
  nodejs: "nodedotjs",
  claude: "anthropic",
}

const LOCAL_ICONS: Record<string, string> = {
  html: "/icons/html.svg",
  css: "/icons/css.svg",
  prisma: "/icons/prisma.svg",
  typeorm: "/icons/typeorm.svg",
  sqlite: "/icons/sqlite.svg",
  postgresql: "/icons/postgresql.svg",
  mysql: "/icons/mysql.svg",
  nestjs: "/icons/nestjs.svg",
  typescript: "/icons/typescript.svg",
  js: "/icons/javascript.svg",
}

const aliasMap: Record<string, string> = {
  javascript: "js",
  nextjs: "nextjs",
  "next.js": "nextjs",
  nestjs: "nestjs",
  typescript: "typescript",
  react: "react",
  nodejs: "nodejs",
  "node.js": "nodejs",
  html: "html",
  html5: "html",
  css: "css",
  css3: "css",
  prisma: "prisma",
  typeorm: "typeorm",
}

export function findTechBySkill(skill: string) {
  const cleanSkill = skill
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
  const mappedKey = aliasMap[cleanSkill] || cleanSkill

  return TECH_STACK.find(
    (tech) =>
      tech.key.toLowerCase().replace(/[^a-z0-9]/g, "") === mappedKey ||
      tech.title.toLowerCase().replace(/[^a-z0-9]/g, "") === cleanSkill
  )
}

export function TechTag({ skill }: { skill: string }) {
  const tech = findTechBySkill(skill)

  if (!tech) {
    return <Tag>{skill}</Tag>
  }

  const slug = KEY_MAP[tech.key] || tech.key
  const owner = tech.github?.split("/")[0] || tech.github
  const logoSrc = owner ? `https://github.com/${owner}.png` : null
  const localIcon = LOCAL_ICONS[tech.key]

  return (
    <a
      href={tech.href}
      target="_blank"
      rel="noopener"
      aria-label={tech.title}
      className="flex items-center gap-1.5 rounded-xs bg-zinc-50 px-1.5 py-0.5 text-xs tracking-wide text-foreground ring-1 ring-border/80 transition-colors duration-200 select-none hover:bg-accent-muted dark:bg-zinc-900 [&_img]:size-3.5"
    >
      {localIcon ? (
        <img
          className="size-3.5 rounded-xs object-cover"
          src={localIcon}
          alt={`${tech.title} icon`}
        />
      ) : logoSrc ? (
        <img
          className="size-3.5 rounded-xs object-cover"
          src={logoSrc}
          alt={`${tech.title} icon`}
        />
      ) : tech.theme ? (
        <>
          <img
            className="hidden size-3.5 [html.light_&]:block"
            src={`https://cdn.simpleicons.org/${slug}/09090b`}
            alt={`${tech.title} light icon`}
          />
          <img
            className="hidden size-3.5 [html.dark_&]:block"
            src={`https://cdn.simpleicons.org/${slug}/f4f4f5`}
            alt={`${tech.title} dark icon`}
          />
        </>
      ) : (
        <img
          className="size-3.5"
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={`${tech.title} icon`}
        />
      )}
      {tech.title}
    </a>
  )
}
