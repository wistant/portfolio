/**
 * Fetch the GitHub star count for a given repository URL.
 * Results are cached and revalidated every hour.
 */
export async function getGithubStars(repoUrl: string): Promise<number | null> {
  try {
    // Extract owner/repo from any GitHub URL format
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/)
    if (!match) return null

    const [, owner, repo] = match
    const cleanRepo = repo.replace(/\.git$/, "")

    const res = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_API_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` }
            : {}),
        },
        // Next.js data cache: revalidate every hour
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) return null

    const data = (await res.json()) as { stargazers_count?: number }
    return data.stargazers_count ?? null
  } catch {
    return null
  }
}

/**
 * Format a raw star count to a compact human-readable string.
 * e.g. 1200 → "1.2k", 850 → "850"
 */
export function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`
  }
  return count.toString()
}
