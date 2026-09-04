import { Suspense } from "react"
import { getGitHubContributions } from "@/data/portfolio/github-contributions"

import { FadeIn } from "@/components/animations/fade-in"
import { Panel } from "@/components/panel"

import { GitHubContributionFallback, GitHubContributionGraph } from "./graph"

export function GitHubContributions() {
  const contributions = getGitHubContributions()

  return (
    <FadeIn>
      <Panel className="before:content-none">
        <h2 className="sr-only">GitHub Contributions</h2>

        <Suspense fallback={<GitHubContributionFallback />}>
          <GitHubContributionGraph contributions={contributions} />
        </Suspense>

        <div className="flex h-px" />
      </Panel>
    </FadeIn>
  )
}
