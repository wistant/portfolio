import type { Metadata } from "next"
import { PROJECTS } from "@/data/portfolio/projects"

import { X_HANDLE } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { ProjectCard } from "@/app/(app)/components/projects/project-card"

const title = "Projects"
const description =
  "Dedicated showcase of open-source engines, developer tools, and digital architecture."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    url: "/projects",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [ogImage],
  },
}

export function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-line",
        "before:absolute before:left-[-100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56",
        className
      )}
    >
      <div
        className="absolute -top-1.25 -left-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      />
      <div
        className="absolute -top-1.25 -right-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      />
    </div>
  )
}

export default function Page() {
  const openSource = PROJECTS.filter(
    (p) => p.skills.includes("Open Source") || p.id === "propellent-landing"
  )
  const client = PROJECTS.filter(
    (p) =>
      p.skills.includes("Company Project") ||
      p.skills.includes("Client Project") ||
      p.id === "interlock-landing"
  )
  const rest = PROJECTS.filter(
    (p) => !openSource.includes(p) && !client.includes(p)
  )

  return (
    <div className="min-h-svh">
      <PageHeading>
        <PageHeadingTagline>Projects</PageHeadingTagline>
        <PageHeadingTitle>
          Open-source software, high-end tools, and architectures.
        </PageHeadingTitle>
        <PageHeadingDescription>
          A curated collection of developer packages, extensions, and products
          crafted for global scale.
        </PageHeadingDescription>
      </PageHeading>

      <div className="h-4" />
      <div className="screen-line-bottom h-px" />

      {/* Open Source Engines & Tools */}
      {openSource.length > 0 && (
        <div className="border-x border-line">
          <div className="border-b border-line bg-accent-muted/40 px-4 py-3 select-none">
            <h2 className="text-base font-semibold tracking-tight">
              Open Source Engines & Tools 💻
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-line">
            {openSource.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {openSource.length > 0 && client.length > 0 && <Separator />}

      {/* Client & Company Architectures */}
      {client.length > 0 && (
        <div className="border-x border-line">
          <div className="border-b border-line bg-accent-muted/40 px-4 py-3 select-none">
            <h2 className="text-base font-semibold tracking-tight">
              Client & Company Architectures 🏢
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-line">
            {client.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {client.length > 0 && rest.length > 0 && <Separator />}

      {/* Landings, Frontend & Experiential Apps */}
      {rest.length > 0 && (
        <div className="screen-line-bottom border-x border-line">
          <div className="border-b border-line bg-accent-muted/40 px-4 py-3 select-none">
            <h2 className="text-base font-semibold tracking-tight">
              Landings, Frontend & Experiential Apps 🎨
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-line">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      <div className="h-4" />
    </div>
  )
}
