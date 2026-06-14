import { execSync } from "child_process"
import { getDocsByCategory } from "@/data/doc/documents"
import { EXPERIENCES } from "@/data/portfolio/experiences"
import { PROJECTS } from "@/data/portfolio/projects"
import { SOCIAL_LINKS } from "@/data/portfolio/social-links"
import { TECH_STACK } from "@/data/portfolio/tech-stack"
import { USER } from "@/data/portfolio/user"
import { format } from "date-fns"

import { SITE_INFO } from "@/config/site"
import { getLLMText } from "@/lib/get-llm-text"

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

const aboutText = `## About

${USER.about.trim()}

### Personal Information

- First Name: ${USER.firstName}
- Last Name: ${USER.lastName}
- Display Name: ${USER.displayName}
- Location: ${USER.address}
- Website: ${USER.website}

### Social Links

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join("\n")}

### Tech Stack

${TECH_STACK.filter((item) => item.showInStack !== false)
  .map((item) => `- [${item.title}](${item.href})`)
  .join("\n")}\n`

const experienceText = `## Experience

${EXPERIENCES.map((item) =>
  item.positions
    .map((position) => {
      const skills = position.skills?.map((skill) => skill).join(", ") || "N/A"
      return `### ${position.title} | ${item.companyName}\n\nDuration: ${position.employmentPeriod.start} - ${position.employmentPeriod.end || "Present"}\n\nSkills: ${skills}\n\n${position.description?.trim()}`
    })
    .join("\n\n")
).join("\n\n")}
`

const projectsText = `## Projects

${PROJECTS.map((item) => {
  const skills = `\n\nSkills: ${item.skills.join(", ")}`
  const description = item.description ? `\n\n${item.description.trim()}` : ""
  return `### ${item.title}\n\nProject URL: ${item.link}${skills}${description}`
}).join("\n\n")}
`

async function getMDXContentSection(category: string, urlPrefix: string) {
  const docs = getDocsByCategory(category)
  const text = await Promise.all(
    docs.map(
      async (item) =>
        `---\ntitle: "${item.metadata.title}"\ndescription: "${item.metadata.description}"\nlast_updated: "${format(new Date(item.metadata.updatedAt), "MMMM d, yyyy")}"\nsource: "${SITE_INFO.url}/${urlPrefix}/${item.slug}"\n---\n\n${await getLLMText(item)}`
    )
  )
  return text.join("\n\n")
}

async function getContent() {
  const latestCommit = getLatestCommitInfo()
  const blogsContent = await getMDXContentSection("blog", "blog")
  const projectsContent = await getMDXContentSection("projects", "projects")

  return `<SYSTEM>This document contains comprehensive information about ${USER.displayName}'s professional profile, portfolio, and blog content. It includes personal details, work experience, projects, achievements, certifications, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${USER.displayName}'s background, skills, and expertise as a Software Architect/Engineer.</SYSTEM>

# wistant.me

> A minimal, pixel-perfect dev portfolio, shadcn registry, and blog to showcase my work as a Software Architect/Engineer.

**Last Coded**: ${latestCommit}

${aboutText}
${experienceText}
${projectsText}

## Blog Posts

${blogsContent}

## Project Case Studies

${projectsContent}`
}

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(await getContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
