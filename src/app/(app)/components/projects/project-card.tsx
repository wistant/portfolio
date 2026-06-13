"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { addQueryParams } from "@/utils/url"
import { ArrowUpRight, ExternalLink, Pin } from "lucide-react"
import { motion } from "motion/react"

import type { Project } from "@/types/projects"
import { UTM_PARAMS } from "@/config/site"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Icons } from "@/components/icons"
import { TechTag } from "@/components/tech-tag"

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

  const cardVariants = {
    initial: { y: 2 },
    hover: { y: 10 },
  }

  // 1. Resolve Title
  const title = project.title

  // 2. Resolve Mockup Image
  const projectImage = project.projectImage || ""

  // 3. Resolve Background Image or class
  const backgroundImage =
    project.backgroundImage ||
    "bg-gradient-to-br from-indigo-950/25 via-slate-900 to-slate-950"

  // 4. Resolve Tags / Skills
  const tagList = project.skills || []

  // 5. Resolve Top Label
  const topLabel = project.status || project.id

  // 6. Resolve Status
  const statusText = project.status

  // Status Color Mapping
  const getStatusColor = (status: string | undefined) => {
    if (!status)
      return {
        dot: "bg-zinc-400 dark:bg-zinc-600",
        text: "text-muted-foreground",
      }
    switch (status.toLowerCase()) {
      case "ongoing":
      case "live":
        return {
          dot: "bg-emerald-500 animate-pulse",
          text: "text-emerald-500 font-semibold",
        }
      case "building":
        return {
          dot: "bg-amber-500 animate-pulse",
          text: "text-amber-500 font-semibold",
        }
      case "completed":
        return { dot: "bg-blue-500", text: "text-blue-500 font-semibold" }
      default:
        return {
          dot: "bg-zinc-400 dark:bg-zinc-600",
          text: "text-muted-foreground",
        }
    }
  }
  const statusColors = getStatusColor(statusText)

  // 7. Resolve Case Study availability
  const detailsHref = hasLocalPage
    ? `/projects/${project.id}`
    : addQueryParams(project.link, UTM_PARAMS)
  const detailsLabel = hasLocalPage ? "Read Case Study" : "View Live Site"

  // 8. Background configuration
  const isCssGradient =
    backgroundImage.startsWith("bg-") || backgroundImage.startsWith("from-")

  return (
    <div
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      onClick={() => router.push(detailsHref)}
      className="group flex w-full cursor-pointer flex-col"
    >
      {/* Image / Preview Container */}
      <div className="relative aspect-video w-full rounded-none border border-line/80 bg-muted/15 p-1 transition-colors duration-300 group-hover:border-line">
        <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-none border border-line bg-muted">
          {/* Top Label */}
          <span className="absolute top-1.5 left-4 z-20 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase transition-all duration-300 select-none group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:text-foreground">
            {topLabel}
          </span>

          {/* Pin Icon */}
          {project.pinned && (
            <div className="absolute top-1.5 right-1.5 z-20 rounded-full border border-line bg-background/90 p-1 text-muted-foreground/85 shadow-xs select-none">
              <Pin className="size-3 rotate-45 fill-muted-foreground/15" />
            </div>
          )}

          {/* Background Gradient/Pattern */}
          {isCssGradient ? (
            <div
              className={`absolute inset-0 h-full w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100 ${backgroundImage}`}
            />
          ) : (
            <div className="absolute inset-0 h-full w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">
              <Image
                src={backgroundImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Foreground Project Mockup Image */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate={cardHover ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative h-[130px] w-[270px] overflow-hidden rounded-t-lg border border-b-0 border-line bg-background px-1 pt-1 shadow-2xl"
          >
            {projectImage ? (
              <Image
                src={projectImage}
                alt={title}
                width={270}
                height={130}
                className="h-full w-full rounded-t-md object-cover object-top"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="font-mono text-[9px] text-muted-foreground">
                  NO PREVIEW
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Info Details Row */}
      <div className="mt-3 flex items-center justify-between px-1">
        <h3 className="text-sm leading-snug font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        {statusText && (
          <div
            className={`flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase select-none ${statusColors.text}`}
          >
            <span className={`size-1.5 rounded-full ${statusColors.dot}`} />
            <span>{statusText}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="mt-1.5 line-clamp-2 px-1 text-xs leading-relaxed text-muted-foreground/85">
        {project.shortDescription || project.description}
      </p>

      {/* Tech Stack Badges */}
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

      {/* Link and Action Icons */}
      <div className="mt-auto flex items-center justify-between px-1 pt-3">
        <Link
          href={detailsHref}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground transition-colors group-hover:text-foreground hover:text-foreground"
        >
          <span>{detailsLabel}</span>
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5">
          {project.link && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href={addQueryParams(project.link, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                }
              />
              <TooltipContent>View Live Site</TooltipContent>
            </Tooltip>
          )}
          {project.github && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icons.github className="size-3.5" />
                  </a>
                }
              />
              <TooltipContent>GitHub Repository</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}
