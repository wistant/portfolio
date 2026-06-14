import "server-only"

import { unstable_cache } from "next/cache"
import { formatISO, subDays } from "date-fns"

import { GITHUB_USERNAME } from "@/config/site"
import type { Activity } from "@/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

function generateMockContributions(): Activity[] {
  const contributions: Activity[] = []
  const today = new Date()
  for (let i = 365; i >= 0; i--) {
    const date = formatISO(subDays(today, i), { representation: "date" })
    // Simulate realistic contributions (mostly 0s, with some levels 1-4)
    const rand = Math.random()
    let level = 0
    if (rand > 0.85) level = 4
    else if (rand > 0.7) level = 3
    else if (rand > 0.5) level = 2
    else if (rand > 0.3) level = 1

    const count = level === 0 ? 0 : level * 2 + Math.floor(Math.random() * 3)
    contributions.push({ date, count, level })
  }
  return contributions
}

async function fetchContributions(): Promise<Activity[] | null> {
  try {
    const baseUrl =
      process.env.GITHUB_CONTRIBUTIONS_API_URL ||
      `https://github-contributions-api.jogruber.de`

    const timeout = 5000
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const res = await fetch(`${baseUrl}/v4/${GITHUB_USERNAME}?y=last`, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Cache at fetch level for 1 hour
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      console.warn(
        `GitHub API responded with status ${res.status}. Falling back to mock data.`
      )
      return null
    }
    const data = (await res.json()) as GitHubContributionsResponse
    if (!data.contributions || data.contributions.length === 0) {
      return null
    }
    return data.contributions
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const isAbort = error instanceof Error && error.name === "AbortError"

    if (!(process.env.NODE_ENV === "development" && isAbort)) {
      console.warn(
        `Failed to fetch GitHub contributions (${message}). Using mock data fallback.`
      )
    }
    return null
  }
}

let devCachePromise: Promise<Activity[] | null> | null = null

async function getCachedDevContributions(): Promise<Activity[]> {
  if (!devCachePromise) {
    devCachePromise = fetchContributions()
  }
  const data = await devCachePromise
  if (data) {
    return data
  }
  // Clear on failure so subsequent reloads will retry fetching
  devCachePromise = null
  return generateMockContributions()
}

async function getProductionContributions(): Promise<Activity[]> {
  const data = await fetchContributions()
  return data || generateMockContributions()
}

export const getGitHubContributions =
  process.env.NODE_ENV === "development"
    ? getCachedDevContributions
    : unstable_cache(
        getProductionContributions,
        ["github-contributions"],
        { revalidate: 86400 } // Cache for 1 day in production
      )
