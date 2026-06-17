export interface GitHubContribution {
  id: number
  title: string
  url: string
  repository: string
  repositoryUrl: string
  type: "pr" | "issue"
  status: "open" | "merged" | "closed"
  createdAt: string
  closedAt?: string
  number: number
  labels?: Array<{ name: string; color: string }>
  isPinned?: boolean
}

export interface ContributionConfig {
  username: string
  includePersonalRepos?: string[]
  pinnedPRs?: Array<{ owner: string; repo: string; number: number }>
}
