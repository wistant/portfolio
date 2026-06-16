import type {
  ContributionConfig,
  GitHubContribution,
} from "@/types/opensource-contributions"
import { GITHUB_USERNAME } from "@/config/site"

export const CONTRIBUTION_CONFIG: ContributionConfig = {
  username: GITHUB_USERNAME,
  targetRepos: [
    "shoperzz/shoperzz",
    "vendurehq/vendure",
    "nestjs/nest",
    "wistant/portfolio",
  ],
  pinnedPRs: [
    { owner: "shoperzz", repo: "shoperzz", number: 42 },
    { owner: "vendurehq", repo: "vendure", number: 189 },
  ],
}

export const MOCK_CONTRIBUTIONS: GitHubContribution[] = [
  {
    id: 1,
    title:
      "feat(core): implement high-performance cache interceptor for distributed systems",
    url: "https://github.com/nestjs/nest/pull/42012",
    repository: "nestjs/nest",
    repositoryUrl: "https://github.com/nestjs/nest",
    type: "pr",
    status: "merged",
    createdAt: "2026-05-10T14:22:00Z",
    closedAt: "2026-05-12T10:00:00Z",
    number: 42012,
    labels: [
      { name: "type: feature", color: "0e8a16" },
      { name: "status: merged", color: "6f42c1" },
    ],
  },
  {
    id: 2,
    title:
      "fix(graphql): resolve database connection pooling issues under heavy loads",
    url: "https://github.com/vendurehq/vendure/pull/189",
    repository: "vendurehq/vendure",
    repositoryUrl: "https://github.com/vendurehq/vendure",
    type: "pr",
    status: "merged",
    createdAt: "2026-04-15T09:15:00Z",
    closedAt: "2026-04-16T16:30:00Z",
    number: 189,
    labels: [
      { name: "bug", color: "d73a4a" },
      { name: "GraphQL", color: "a2eeef" },
    ],
  },
  {
    id: 3,
    title:
      "feat(admin): implement complete role-based access control dashboard UI",
    url: "https://github.com/shoperzz/shoperzz/pull/42",
    repository: "shoperzz/shoperzz",
    repositoryUrl: "https://github.com/shoperzz/shoperzz",
    type: "pr",
    status: "open",
    createdAt: "2026-06-01T11:00:00Z",
    number: 42,
    labels: [
      { name: "enhancement", color: "a2eeef" },
      { name: "frontend", color: "c5def5" },
    ],
  },
  {
    id: 4,
    title: "perf(core): optimize memory leak in hot reload module",
    url: "https://github.com/nestjs/nest/pull/41982",
    repository: "nestjs/nest",
    repositoryUrl: "https://github.com/nestjs/nest",
    type: "pr",
    status: "closed",
    createdAt: "2026-03-20T08:00:00Z",
    closedAt: "2026-03-22T09:00:00Z",
    number: 41982,
    labels: [
      { name: "performance", color: "d876e3" },
      { name: "wontfix", color: "ffffff" },
    ],
  },
  {
    id: 5,
    title: "docs(llms): update general index endpoints and structure manifests",
    url: "https://github.com/wistant/portfolio/pull/8",
    repository: "wistant/portfolio",
    repositoryUrl: "https://github.com/wistant/portfolio",
    type: "pr",
    status: "merged",
    createdAt: "2026-06-16T18:00:00Z",
    closedAt: "2026-06-16T19:30:00Z",
    number: 8,
    labels: [{ name: "documentation", color: "0075ca" }],
  },
  {
    id: 6,
    title: "issue: core module crashes on custom multi-tenant configuration",
    url: "https://github.com/shoperzz/shoperzz/issues/12",
    repository: "shoperzz/shoperzz",
    repositoryUrl: "https://github.com/shoperzz/shoperzz",
    type: "issue",
    status: "open",
    createdAt: "2026-06-05T12:00:00Z",
    number: 12,
    labels: [
      { name: "bug", color: "d73a4a" },
      { name: "critical", color: "e11d48" },
    ],
  },
  {
    id: 7,
    title: "issue: support dynamic schema extensions via graphql-tools",
    url: "https://github.com/vendurehq/vendure/issues/88",
    repository: "vendurehq/vendure",
    repositoryUrl: "https://github.com/vendurehq/vendure",
    type: "issue",
    status: "closed",
    createdAt: "2026-02-10T10:00:00Z",
    closedAt: "2026-02-15T18:00:00Z",
    number: 88,
    labels: [{ name: "feature request", color: "fbca04" }],
  },
]
