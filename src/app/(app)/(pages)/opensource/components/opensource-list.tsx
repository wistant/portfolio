"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import {
  CheckCircle2,
  CircleDot,
  Compass,
  GitFork,
  GitMerge,
  GitPullRequest,
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
import { Panel, PanelContent } from "@/components/panel"

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
  const [groupByRepo, setGroupByRepo] = useState(false)

  // 1. Calculate Stats
  const stats = useMemo(() => {
    const total = contributions.length
    const prs = contributions.filter((c) => c.type === "pr").length
    const issues = contributions.filter((c) => c.type === "issue").length
    const merged = contributions.filter((c) => c.status === "merged").length

    return { total, prs, issues, merged }
  }, [contributions])

  // 2. Filter list
  const filteredContributions = useMemo(() => {
    return contributions.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.repository.toLowerCase().includes(search.toLowerCase())

      const matchesType = typeFilter === "all" || item.type === typeFilter

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter

      return matchesSearch && matchesType && matchesStatus
    })
  }, [contributions, search, typeFilter, statusFilter])

  // 3. Group by Repository if toggled
  const groupedContributions = useMemo(() => {
    if (!groupByRepo) return null

    const groups: Record<
      string,
      { repoUrl: string; items: GitHubContribution[] }
    > = {}
    filteredContributions.forEach((item) => {
      if (!groups[item.repository]) {
        groups[item.repository] = {
          repoUrl: item.repositoryUrl,
          items: [],
        }
      }
      groups[item.repository].items.push(item)
    })

    return groups
  }, [filteredContributions, groupByRepo])

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
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search Input */}
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

            {/* Toggle Grouping */}
            <button
              onClick={() => setGroupByRepo(!groupByRepo)}
              className={`flex items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors select-none ${
                groupByRepo
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950"
                  : "border-border bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <GitFork className="size-3.5" />
              Group by repo
            </button>
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

      {/* Result list */}
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
        ) : groupByRepo && groupedContributions ? (
          /* Grouped list */
          <div className="flex flex-col gap-6">
            {Object.entries(groupedContributions).map(
              ([repoName, { repoUrl, items }]) => (
                <div key={repoName} className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 px-1">
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-semibold text-foreground transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      {repoName}
                    </a>
                    <span className="rounded-xs border border-border/50 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground dark:bg-zinc-900">
                      {items.length}{" "}
                      {items.length === 1 ? "contribution" : "contributions"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {items.map((contrib) => (
                      <ContributionRow
                        key={contrib.id}
                        contrib={contrib}
                        showRepo={false}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          /* Flat list */
          <div className="flex flex-col gap-2">
            {filteredContributions.map((contrib) => (
              <ContributionRow
                key={contrib.id}
                contrib={contrib}
                showRepo={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ContributionRow({
  contrib,
  showRepo,
}: {
  contrib: GitHubContribution
  showRepo: boolean
}) {
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
    <div className="group flex items-start gap-3 rounded-lg border border-border/80 bg-white/40 p-3 transition-all duration-200 hover:border-border hover:bg-zinc-50/50 dark:bg-zinc-950/20 dark:hover:bg-zinc-900/40">
      <div className={`mt-0.5 rounded-md p-1.5 ${iconColor} shrink-0`}>
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {showRepo && (
            <>
              <a
                href={contrib.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {contrib.repository}
              </a>
              <span className="text-xs text-muted-foreground/60">•</span>
            </>
          )}
          <span className="text-xs text-muted-foreground">
            #{contrib.number}
          </span>
          <span className="text-xs text-muted-foreground/60">•</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(contrib.createdAt), "MMM d, yyyy")}
          </span>
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
