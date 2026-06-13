"use client"

import Link from "next/link"
import { Star, ArrowUpRight, ExternalLink } from "lucide-react"
import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Icons } from "@/components/icons"
import { formatStars } from "@/lib/github"

interface ProjectCardActionsProps {
  detailsHref: string
  detailsLabel: string
  liveLink?: string
  github?: string
  stars?: number | null
}

export function ProjectCardActions({
  detailsHref,
  detailsLabel,
  liveLink,
  github,
  stars,
}: ProjectCardActionsProps) {
  return (
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
        {liveLink && (
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href={addQueryParams(liveLink, UTM_PARAMS)}
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
        {github && (
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icons.github className="size-3.5 shrink-0" />
                  {stars != null && stars > 0 && (
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold leading-none text-amber-400">
                      <Star className="size-2.5 fill-amber-400 text-amber-400" />
                      {formatStars(stars)}
                    </span>
                  )}
                </a>
              }
            />
            <TooltipContent>
              {stars != null && stars > 0
                ? `${stars.toLocaleString()} stars on GitHub`
                : "GitHub Repository"}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  )
}
