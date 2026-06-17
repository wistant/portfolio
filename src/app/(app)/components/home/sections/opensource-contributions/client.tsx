"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  CheckCircle2,
  CircleDot,
  GitMerge,
  GitPullRequest,
  Pin,
} from "lucide-react"

import type { GitHubContribution } from "@/types/opensource-contributions"
import {
  Collapsible,
  CollapsibleChevronsIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import { TechTag } from "@/components/tech-tag"

export function ProjectCard({
  repoName,
  items,
  skills,
  defaultOpen,
}: {
  repoName: string
  items: GitHubContribution[]
  skills: string[]
  defaultOpen: boolean
}) {
  const owner = repoName.split("/")[0]
  const displayItems = items.slice(0, 3)

  return (
    <div className="overflow-hidden rounded-lg border border-border/80 bg-white/40 dark:bg-zinc-950/20">
      <Collapsible className="group/repo-collapsible" defaultOpen={defaultOpen}>
        <CollapsibleTrigger className="block w-full p-3.5 text-left transition-colors outline-none hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src={`https://github.com/${owner}.png`}
                alt={`${owner} logo`}
                className="size-5 rounded-full border border-border/60 object-cover"
                aria-hidden
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
              <a
                href={`https://github.com/${repoName}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevent collapse/expand on title click
                className="font-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-zinc-600 hover:underline dark:hover:text-zinc-300"
              >
                {repoName}
              </a>
              <span className="rounded-xs border border-border/50 bg-zinc-100 px-1 py-px font-mono text-[9px] text-muted-foreground dark:bg-zinc-900">
                {items.length}
              </span>
            </div>
            <div className="shrink-0 text-muted-foreground [&_svg]:h-3.5 [&_svg]:w-3.5">
              <CollapsibleChevronsIcon duration={0.15} />
            </div>
          </div>

          {skills.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1 pl-7">
              {skills.map((skill) => (
                <TechTag key={skill} skill={skill} />
              ))}
            </div>
          )}
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden border-t border-border/30">
          <div className="flex flex-col gap-1.5 bg-zinc-50/20 p-3 dark:bg-zinc-950/10">
            {displayItems.map((contrib) => (
              <ContributionRow key={contrib.id} contrib={contrib} />
            ))}
            {items.length > 3 && (
              <Link
                href="/opensource"
                className="pt-1.5 text-center text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Show {items.length - 3} more contributions in this project
              </Link>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

function ContributionRow({ contrib }: { contrib: GitHubContribution }) {
  const isPR = contrib.type === "pr"
  const isMerged = contrib.status === "merged"
  const isOpen = contrib.status === "open"

  let Icon = CircleDot
  let iconColor = "text-green-600 dark:text-green-400 bg-green-500/10"

  if (isPR) {
    if (isMerged) {
      Icon = GitMerge
      iconColor = "text-purple-600 dark:text-purple-400 bg-purple-500/10"
    } else if (isOpen) {
      Icon = GitPullRequest
      iconColor = "text-green-600 dark:text-green-400 bg-green-500/10"
    } else {
      Icon = GitPullRequest
      iconColor = "text-red-600 dark:text-red-400 bg-red-500/10"
    }
  } else {
    if (isOpen) {
      Icon = CircleDot
      iconColor = "text-green-600 dark:text-green-400 bg-green-500/10"
    } else {
      Icon = CheckCircle2
      iconColor = "text-red-600 dark:text-red-400 bg-red-500/10"
    }
  }

  return (
    <div className="group flex items-start gap-2.5 rounded-md border border-border/20 bg-white/60 p-2.5 transition-all duration-200 hover:border-border/60 hover:bg-white dark:bg-zinc-900/20 dark:hover:bg-zinc-900/60">
      <div className={`mt-0.5 rounded-md p-1 ${iconColor} shrink-0`}>
        <Icon className="size-3" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="font-mono">#{contrib.number}</span>
          <span>•</span>
          <span>
            {formatDistanceToNow(new Date(contrib.createdAt), {
              addSuffix: true,
            })}
          </span>
          {contrib.isPinned && (
            <>
              <span>•</span>
              <span className="flex items-center gap-0.5 font-medium text-amber-600 dark:text-amber-400">
                <Pin className="size-2.5 fill-current" />
                Pinned
              </span>
            </>
          )}
        </div>

        <a
          href={contrib.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 line-clamp-1 block text-xs leading-snug font-medium text-foreground transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          {contrib.title}
        </a>
      </div>
    </div>
  )
}
