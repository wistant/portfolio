import type { Metadata } from "next"
import { getDocsByCategory } from "@/data/doc/documents"
import { SPONSORS } from "@/data/sponsor-data"

import { cn } from "@/lib/utils"

import { Blog } from "./(pages)/blog/components"
import { Certifications } from "./(pages)/certifications/components"
import { Projects } from "./(pages)/projects/components"
import { ProfileCover } from "./components/home/profile/cover"
import { ProfileHeader } from "./components/home/profile/header"
import { SocialLinks } from "./components/home/profile/social"
import { About } from "./components/home/sections/about"
import { Experiences } from "./components/home/sections/experiences"
import { GitHubContributions } from "./components/home/sections/github-contributions"
import { Insights } from "./components/home/sections/insights"
import { Sponsors } from "./components/home/sections/sponsors"
import { TechStack } from "./components/home/sections/tech-stack"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  const hasCerts = getDocsByCategory("certifications").length > 0

  return (
    <>
      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <ProfileCover />
        <ProfileHeader />
        <SocialLinks />
        <Separator />

        <Separator />
        <Separator />
        <About />
        <GitHubContributions />
        <TechStack />
        <Separator />

        <Separator />
        <Separator />
        <Experiences />
        <Separator />

        {SPONSORS.length > 0 && (
          <>
            <Separator />
            <Separator />
            <Sponsors />
            <Separator />
          </>
        )}

        <Separator />
        <Separator />
        <Blog />
        <Separator />

        <Separator />
        <Separator />
        <Projects />
        <Separator />

        {hasCerts && (
          <>
            <Separator />
            <Separator />
            <Certifications />
            <Separator />
          </>
        )}

        <Insights />
        <Separator />
      </div>
    </>
  )
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
