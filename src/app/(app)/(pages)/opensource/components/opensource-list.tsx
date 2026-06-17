"use client"

import { useMemo, useState } from "react"
import { CONTRIBUTION_CONFIG } from "@/data/portfolio/opensource-contributions"
import { format } from "date-fns"
import {
  CheckCircle2,
  CircleDot,
  Compass,
  GitMerge,
  GitPullRequest,
  Pin,
  Search,
  X,
} from "lucide-react"

import type { GitHubContribution } from "@/types/opensource-contributions"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Collapsible,
  CollapsibleChevronsIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import { Panel, PanelContent } from "@/components/panel"
import { TechTag } from "@/components/tech-tag"

// Helper to map repo to languages/skills
function getSkillsForRepo(repo: string): string[] {
  const name = repo.toLowerCase()
  if (name.includes("nestjs/nest") || name.includes("nestjs/")) {
    return ["TypeScript", "Node.js", "NestJS"]
  }
  if (name.includes("vendurehq/vendure") || name.includes("vendure/")) {
    return ["TypeScript", "Node.js", "GraphQL", "PostgreSQL"]
  }
  if (name.includes("shoperzz/shoperzz") || name.includes("shoperzz/")) {
    return ["TypeScript", "Next.js", "NestJS", "GraphQL", "React"]
  }
  if (name.includes("wistant/portfolio") || name.includes("portfolio")) {
    return ["TypeScript", "Next.js", "React", "Tailwind CSS"]
  }
  return ["TypeScript"]
}

export function OpenSourceList({
  contributions,
}: {
  contributions: GitHubContribution[]
}) {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | "pr" | "issue">("all")
  const [statusFilter, setStatusFilter] = useState<
    "all" | "open" | "merged" | "closed"
  >("all")

  // Filter contributions: exclude own repos unless included or pinned
  const filteredContributions = useMemo(() => {
    const username = CONTRIBUTION_CONFIG.username

    return contributions.filter((item) => {
      // 1. Exclude own repositories unless included or pinned
      const repoOwner = item.repository.split("/")[0]
      const isOwnRepo = repoOwner.toLowerCase() === username.toLowerCase()
      const isIncluded = CONTRIBUTION_CONFIG.includePersonalRepos?.some(
        (r) => r.toLowerCase() === item.repository.toLowerCase()
      )

      if (isOwnRepo && !isIncluded && !item.isPinned) return false

      // 2. Search matches
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.repository.toLowerCase().includes(search.toLowerCase())

      // 3. Type matches
      const matchesType = typeFilter === "all" || item.type === typeFilter

      // 4. Status matches
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter

      return matchesSearch && matchesType && matchesStatus
    })
  }, [contributions, search, typeFilter, statusFilter])

  // Group by repository and sort items in each group (pinned first)
  const groupedContributions = useMemo(() => {
    const groups: Record<
      string,
      { repoUrl: string; items: GitHubContribution[]; skills: string[] }
    > = {}
    filteredContributions.forEach((item) => {
      if (!groups[item.repository]) {
        groups[item.repository] = {
          repoUrl: item.repositoryUrl,
          items: [],
          skills: getSkillsForRepo(item.repository),
        }
      }
      groups[item.repository].items.push(item)
    })

    // Sort items inside each repo group: pinned first, then date desc
    Object.values(groups).forEach((g) => {
      g.items.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    })

    return groups
  }, [filteredContributions])

  // Calculate stats based on filtered contributions
  const stats = useMemo(() => {
    const total = filteredContributions.length
    const prs = filteredContributions.filter((c) => c.type === "pr").length
    const issues = filteredContributions.filter(
      (c) => c.type === "issue"
    ).length
    const merged = filteredContributions.filter(
      (c) => c.status === "merged"
    ).length

    return { total, prs, issues, merged }
  }, [filteredContributions])

  return (
    <div className="flex flex-col gap-6">
      {/* Metrics Dashboard */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-border/80 bg-zinc-50/50 p-3 dark:bg-zinc-900/40">
          <div className="text-xs font-medium text-muted-foreground">
            Total Contributions
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">
            {stats.total}
          </div>
        </div>
        <div className="rounded-lg border border-border/80 bg-zinc-50/50 p-3 dark:bg-zinc-900/40">
          <div className="text-xs font-medium text-muted-foreground">
            Pull Requests
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">
            {stats.prs}
          </div>
        </div>
        <div className="rounded-lg border border-border/80 bg-zinc-50/50 p-3 dark:bg-zinc-900/40">
          <div className="text-xs font-medium text-muted-foreground">
            Issues Opened
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">
            {stats.issues}
          </div>
        </div>
        <div className="rounded-lg border border-border/80 bg-zinc-50/50 p-3 dark:bg-zinc-900/40">
          <div className="text-xs font-medium text-muted-foreground">
            Merged PRs
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-tight text-purple-600 dark:text-purple-400">
            {stats.merged}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <Panel className="rounded-lg border border-border/80 before:content-none">
        <PanelContent className="flex flex-col gap-4 p-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <InputGroup className="w-full rounded-md shadow-none">
                <InputGroupInput
                  placeholder="Search contributions or repos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon align="inline-start">
                  <Search className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                {search && (
                  <InputGroupAddon align="inline-end" className="pr-1.5">
                    <InputGroupButton
                      className="rounded-xs border-none"
                      size="icon-xs"
                      onClick={() => setSearch("")}
                    >
                      <X className="size-3.5" />
                    </InputGroupButton>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/40 pt-1">
            {/* Type selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Type:
              </span>
              <div className="inline-flex rounded-md border border-border/50 bg-zinc-100 p-0.5 dark:bg-zinc-900">
                {(["all", "pr", "issue"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`rounded-sm px-2.5 py-0.5 text-xs font-medium transition-all ${
                      typeFilter === type
                        ? "bg-white text-foreground shadow-xs dark:bg-zinc-800"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type === "all" ? "All" : type === "pr" ? "PRs" : "Issues"}
                  </button>
                ))}
              </div>
            </div>

            {/* Status selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Status:
              </span>
              <div className="inline-flex rounded-md border border-border/50 bg-zinc-100 p-0.5 dark:bg-zinc-900">
                {(["all", "open", "merged", "closed"] as const).map(
                  (status) => {
                    if (typeFilter === "issue" && status === "merged")
                      return null
                    return (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`rounded-sm px-2.5 py-0.5 text-xs font-medium capitalize transition-all ${
                          statusFilter === status
                            ? "bg-white text-foreground shadow-xs dark:bg-zinc-800"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {status}
                      </button>
                    )
                  }
                )}
              </div>
            </div>
          </div>
        </PanelContent>
      </Panel>

      {/* Result list grouped by Repository with Collapsible */}
      <div className="flex flex-col gap-4">
        {filteredContributions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/80 py-12 text-center">
            <Compass className="size-8 animate-pulse text-muted-foreground/60" />
            <h3 className="mt-2 text-sm font-semibold text-foreground">
              No contributions found
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {Object.entries(groupedContributions).map(
              ([repoName, { items, skills }]) => {
                const owner = repoName.split("/")[0]
                return (
                  <div
                    key={repoName}
                    className="overflow-hidden rounded-lg border border-border/80 bg-white/40 dark:bg-zinc-950/20"
                  >
                    <Collapsible
                      className="group/repo-collapsible"
                      defaultOpen={true}
                    >
                      <CollapsibleTrigger className="block w-full p-4 text-left transition-colors outline-none hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://github.com/${owner}.png`}
                              alt={`${owner} logo`}
                              className="size-6 rounded-full border border-border/60 object-cover"
                              aria-hidden
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                              }}
                            />
                            <a
                              href={`https://github.com/${repoName}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()} // Prevent expand on click
                              className="font-mono text-base font-semibold tracking-tight text-foreground transition-colors hover:text-zinc-600 hover:underline dark:hover:text-zinc-300"
                            >
                              {repoName}
                            </a>
                            <span className="rounded-xs border border-border/50 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground dark:bg-zinc-900">
                              {items.length}{" "}
                              {items.length === 1
                                ? "contribution"
                                : "contributions"}
                            </span>
                          </div>
                          <div className="shrink-0 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
                            <CollapsibleChevronsIcon duration={0.15} />
                          </div>
                        </div>

                        {/* Project technologies */}
                        {skills.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5 pl-9">
                            {skills.map((skill) => (
                              <TechTag key={skill} skill={skill} />
                            ))}
                          </div>
                        )}
                      </CollapsibleTrigger>

                      <CollapsibleContent className="overflow-hidden border-t border-border/30">
                        <div className="flex flex-col gap-2 bg-zinc-50/20 p-4 dark:bg-zinc-950/10">
                          {items.map((contrib) => (
                            <ContributionRow
                              key={contrib.id}
                              contrib={contrib}
                            />
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )
              }
            )}
          </div>
        )}
      </div>
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
    <div className="group flex items-start gap-3 rounded-md border border-border/40 bg-white/60 p-3 transition-all duration-200 hover:border-border/80 hover:bg-white dark:bg-zinc-900/20 dark:hover:bg-zinc-900/60">
      <div className={`mt-0.5 rounded-md p-1.5 ${iconColor} shrink-0`}>
        <Icon className="size-3.5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">#{contrib.number}</span>
          <span className="text-muted-foreground/60">•</span>
          <span>{format(new Date(contrib.createdAt), "MMM d, yyyy")}</span>
          {contrib.isPinned && (
            <>
              <span className="text-muted-foreground/60">•</span>
              <span className="flex items-center gap-0.5 font-medium text-amber-600 dark:text-amber-400">
                <Pin className="size-3 fill-current" />
                Pinned
              </span>
            </>
          )}
        </div>

        <a
          href={contrib.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block text-sm leading-snug font-medium text-foreground transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
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
}
