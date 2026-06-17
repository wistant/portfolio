import Link from "next/link"
import { CONTRIBUTION_CONFIG } from "@/data/portfolio/opensource-contributions"
import { ArrowRight } from "lucide-react"

import type { GitHubContribution } from "@/types/opensource-contributions"
import { getOpenSourceContributions } from "@/lib/opensource-contributions"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel"

import { ProjectCard } from "./client"

// Helper to map repo to languages/skills
function getSkillsForRepo(repo: string): string[] {
  const name = repo.toLowerCase()
  if (name.includes("nestjs/nest") || name.includes("nestjs/")) {
    return ["TypeScript", "Node.js", "NestJS"]
  }
  if (name.includes("vendurehq/vendure") || name.includes("vendure/")) {
    return ["TypeScript", "Node.js", "GraphQL"]
  }
  if (name.includes("shoperzz/shoperzz") || name.includes("shoperzz/")) {
    return ["TypeScript", "Next.js", "NestJS", "GraphQL"]
  }
  if (name.includes("wistant/portfolio") || name.includes("portfolio")) {
    return ["TypeScript", "Next.js", "React"]
  }
  return ["TypeScript"]
}

export async function OpenSourceContributions() {
  const contributions = await getOpenSourceContributions()
  const username = CONTRIBUTION_CONFIG.username

  // Filter out personal repositories unless explicitly included or pinned
  const filtered = contributions.filter((item) => {
    const repoOwner = item.repository.split("/")[0]
    const isOwnRepo = repoOwner.toLowerCase() === username.toLowerCase()
    const isIncluded = CONTRIBUTION_CONFIG.includePersonalRepos?.some(
      (r) => r.toLowerCase() === item.repository.toLowerCase()
    )
    return !isOwnRepo || isIncluded || item.isPinned
  })

  // Group and sort by repository (pinned items first inside groups)
  const groups: Record<
    string,
    { items: GitHubContribution[]; skills: string[] }
  > = {}
  filtered.forEach((item) => {
    if (!groups[item.repository]) {
      groups[item.repository] = {
        items: [],
        skills: getSkillsForRepo(item.repository),
      }
    }
    groups[item.repository].items.push(item)
  })

  // Sort items in each group: pinned first, then by date desc
  Object.values(groups).forEach((g) => {
    g.items.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  })

  const displayGroups = Object.entries(groups).slice(0, 3)

  if (filtered.length === 0) {
    return null
  }

  return (
    <Panel id="opensource-preview">
      <PanelHeader className="flex items-center justify-between py-2">
        <PanelTitle>Open Source Contributions 🌐</PanelTitle>
      </PanelHeader>

      <PanelContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {displayGroups.map(([repoName, { items, skills }], index) => (
            <ProjectCard
              key={repoName}
              repoName={repoName}
              items={items}
              skills={skills}
              defaultOpen={index === 0}
            />
          ))}
        </div>

        <div className="flex justify-end pt-1">
          <Link
            href="/opensource"
            className="group inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all contributions
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </PanelContent>
    </Panel>
  )
}
