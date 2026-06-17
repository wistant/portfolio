import { execSync } from "node:child_process"
import { unstable_cache } from "next/cache"
import {
  CONTRIBUTION_CONFIG,
  MOCK_CONTRIBUTIONS,
} from "@/data/portfolio/opensource-contributions"

import type { GitHubContribution } from "@/types/opensource-contributions"

interface GitHubSearchItem {
  id: number
  title: string
  html_url: string
  number: number
  state: string
  created_at: string
  closed_at?: string
  repository_url: string
  pull_request?: {
    merged_at?: string | null
  }
  labels?: Array<{ name: string; color: string }>
}

interface GitHubSearchResponse {
  items: GitHubSearchItem[]
}

async function fetchOpenSourceContributions(): Promise<
  GitHubContribution[] | null
> {
  const { username } = CONTRIBUTION_CONFIG
  // Search for issues and PRs created by the user
  const query = `author:${username}`
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=100`

  const headers: Record<string, string> = {
    "User-Agent": "wistant-portfolio",
    Accept: "application/vnd.github.v3+json",
  }

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`
  }

  // Helper to extract repo name from repository_url: "https://api.github.com/repos/owner/repo" -> "owner/repo"
  const getRepoName = (repoUrl: string): string => {
    const parts = repoUrl.split("/repos/")
    return parts.length > 1 ? parts[1] : ""
  }

  // Helper to get repo web URL from name
  const getRepoWebUrl = (repoName: string): string => {
    return `https://github.com/${repoName}`
  }

  // 1. Try native fetch first
  try {
    const timeout = 6000
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const res = await fetch(url, {
      headers,
      signal: controller.signal,
      next: { revalidate: 3600 }, // Cache at fetch level for 1 hour
    })
    clearTimeout(timeoutId)

    if (res.ok) {
      const data = (await res.json()) as GitHubSearchResponse
      if (data.items) {
        return mapGitHubItems(data.items, getRepoName, getRepoWebUrl)
      }
    }
  } catch {
    // Fail silently and try curl fallback
  }

  // 2. Try curl fallback (handles Node.js DNS/timeout quirks in some environments)
  try {
    const authHeader = process.env.GITHUB_TOKEN
      ? ` -H "Authorization: token ${process.env.GITHUB_TOKEN}"`
      : ""
    const output = execSync(
      `curl -s -H "User-Agent: wistant-portfolio" -H "Accept: application/vnd.github.v3+json"${authHeader} "${url}"`,
      {
        encoding: "utf8",
        timeout: 6000,
      }
    )
    const data = JSON.parse(output) as GitHubSearchResponse
    if (data.items) {
      return mapGitHubItems(data.items, getRepoName, getRepoWebUrl)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(
      `All methods to fetch GitHub search contributions failed (${message}). Using mock data.`
    )
  }

  return null
}

function mapGitHubItems(
  items: GitHubSearchItem[],
  getRepoName: (url: string) => string,
  getRepoWebUrl: (name: string) => string
): GitHubContribution[] {
  return items.map((item) => {
    const repoName = getRepoName(item.repository_url)
    const [owner, repo] = repoName.split("/")
    const isPR = !!item.pull_request
    let status: "open" | "merged" | "closed" = "open"

    if (isPR) {
      if (item.pull_request?.merged_at) {
        status = "merged"
      } else if (item.state === "closed") {
        status = "closed"
      }
    } else {
      status = item.state === "open" ? "open" : "closed"
    }

    const isPinned = CONTRIBUTION_CONFIG.pinnedPRs?.some(
      (pinned) =>
        pinned.owner.toLowerCase() === owner.toLowerCase() &&
        pinned.repo.toLowerCase() === repo.toLowerCase() &&
        pinned.number === item.number
    )

    return {
      id: item.id,
      title: item.title,
      url: item.html_url,
      repository: repoName,
      repositoryUrl: getRepoWebUrl(repoName),
      type: isPR ? "pr" : "issue",
      status,
      createdAt: item.created_at,
      closedAt: item.closed_at,
      number: item.number,
      labels: item.labels?.map((label) => ({
        name: label.name,
        color: label.color,
      })),
      isPinned,
    }
  })
}

let devCachePromise: Promise<GitHubContribution[] | null> | null = null

function getMockContributionsWithPinned(): GitHubContribution[] {
  return MOCK_CONTRIBUTIONS.map((item) => {
    const [owner, repo] = item.repository.split("/")
    const isPinned = CONTRIBUTION_CONFIG.pinnedPRs?.some(
      (pinned) =>
        pinned.owner.toLowerCase() === owner.toLowerCase() &&
        pinned.repo.toLowerCase() === repo.toLowerCase() &&
        pinned.number === item.number
    )
    return { ...item, isPinned }
  })
}

async function getCachedDevContributions(): Promise<GitHubContribution[]> {
  if (!devCachePromise) {
    devCachePromise = fetchOpenSourceContributions()
  }
  const data = await devCachePromise
  if (data) {
    return data
  }
  devCachePromise = null
  return getMockContributionsWithPinned()
}

async function getProductionContributions(): Promise<GitHubContribution[]> {
  const data = await fetchOpenSourceContributions()
  return data || getMockContributionsWithPinned()
}

export const getOpenSourceContributions =
  process.env.NODE_ENV === "development"
    ? getCachedDevContributions
    : unstable_cache(
        getProductionContributions,
        ["opensource-contributions"],
        { revalidate: 86400 } // Cache for 1 day in production
      )
