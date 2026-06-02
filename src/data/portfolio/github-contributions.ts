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

async function fetchContributions(): Promise<Activity[]> {
  try {
    const baseUrl =
      process.env.GITHUB_CONTRIBUTIONS_API_URL ||
      `https://github-contributions-api.jogruber.de`
    const res = await fetch(`${baseUrl}/v4/${GITHUB_USERNAME}?y=last`, {
      next: { revalidate: 3600 }, // Cache at fetch level for 1 hour
    })
    if (!res.ok) {
      console.warn(
        `GitHub API responded with status ${res.status}. Falling back to mock data.`
      )
      return generateMockContributions()
    }
    const data = (await res.json()) as GitHubContributionsResponse
    if (!data.contributions || data.contributions.length === 0) {
      return generateMockContributions()
    }
    return data.contributions
  } catch (error) {
    console.warn(
      "Failed to fetch GitHub contributions, using mock data fallback.",
      error
    )
    return generateMockContributions()
  }
}

export const getGitHubContributions =
  process.env.NODE_ENV === "development"
    ? fetchContributions
    : unstable_cache(
        fetchContributions,
        ["github-contributions"],
        { revalidate: 86400 } // Cache for 1 day in production
      )
