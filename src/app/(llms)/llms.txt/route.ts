import { execSync } from "child_process"
import { getDocsByCategory } from "@/data/doc/documents"

import { SITE_INFO } from "@/config/site"

function getLatestCommitInfo() {
  try {
    const info = execSync(
      'git log -1 --format="%s — by %an on %ad" --date=short'
    )
      .toString()
      .trim()
    return info
  } catch {
    return "No recent git commit history available."
  }
}

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  const blogs = getDocsByCategory("blog")
  const projects = getDocsByCategory("projects")
  const latestCommit = getLatestCommitInfo()

  const content = `# wistant.me

> A minimal, pixel-perfect developer portfolio, shadcn component registry, and technical blog built by Wistant Kode.

- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, MDX, Vercel
- **Source Code**: https://github.com/wistant/portfolio
- **Last Coded**: ${latestCommit}

## Navigation Index

- [About](${SITE_INFO.url}/about.md): Personal developer bio, core vision, and expertise outline.
- [Experience](${SITE_INFO.url}/experience.md): Professional work history, past engineering roles, and achievements.
- [Projects](${SITE_INFO.url}/projects.md): Selected project descriptions and code case studies.
- [Certifications](${SITE_INFO.url}/certifications.md): Professional credentials, certifications, and technical badges.
- [Sponsors](${SITE_INFO.url}/sponsors.md): Sponsoring tiers, details, and active supporters list.

## Blog Posts

${blogs.map((item) => `- [${item.metadata.title}](${SITE_INFO.url}/doc.mdx/${item.slug}): ${item.metadata.description}`).join("\n")}

## Project Case Studies

${projects.map((item) => `- [${item.metadata.title}](${SITE_INFO.url}/doc.mdx/${item.slug}): ${item.metadata.description}`).join("\n")}
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
