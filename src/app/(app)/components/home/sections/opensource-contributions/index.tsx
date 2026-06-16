import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  GitMerge,
  GitPullRequest,
  XCircle,
} from "lucide-react"

import { getOpenSourceContributions } from "@/lib/opensource-contributions"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel"

export async function OpenSourceContributions() {
  const contributions = await getOpenSourceContributions()
  const displayContributions = contributions.slice(0, 5)

  if (contributions.length === 0) {
    return null
  }

  return (
    <Panel id="opensource-preview">
      <PanelHeader className="flex items-center justify-between py-2">
        <PanelTitle>Open Source Contributions 🌐</PanelTitle>
      </PanelHeader>

      <PanelContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {displayContributions.map((contrib) => {
            const isPR = contrib.type === "pr"
            const isMerged = contrib.status === "merged"
            const isOpen = contrib.status === "open"

            let Icon = CircleDot
            let iconColor = "text-green-600 dark:text-green-400 bg-green-500/10"

            if (isPR) {
              if (isMerged) {
                Icon = GitMerge
                iconColor =
                  "text-purple-600 dark:text-purple-400 bg-purple-500/10"
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
              <div
                key={contrib.id}
                className="group flex items-start gap-3 rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-border/60 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50"
              >
                <div className={`mt-0.5 rounded-md p-1.5 ${iconColor}`}>
                  <Icon className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={contrib.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {contrib.repository}
                    </a>
                    <span className="text-xs text-muted-foreground/60">•</span>
                    <span className="text-xs text-muted-foreground">
                      #{contrib.number}
                    </span>
                    <span className="text-xs text-muted-foreground/60">•</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(contrib.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <a
                    href={contrib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 line-clamp-2 block text-sm leading-snug font-medium text-foreground transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    {contrib.title}
                  </a>

                  {contrib.labels && contrib.labels.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {contrib.labels.map((label) => (
                        <span
                          key={label.name}
                          className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium"
                          style={{
                            backgroundColor: `#${label.color}15`,
                            color: `#${label.color}`,
                            border: `1px solid #${label.color}30`,
                          }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-end pt-1">
          <Link
            href="/opensource"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all contributions
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </PanelContent>
    </Panel>
  )
}
