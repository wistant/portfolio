import type { Metadata } from "next"
import { getDocsByCategory } from "@/data/doc/documents"
import { SPONSORS } from "@/data/sponsor-data"

import { cn } from "@/lib/utils"
import { BlocksSeparator } from "@/components/blocks-separator"

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
import { OpenSourceContributions } from "./components/home/sections/opensource-contributions"
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
        <BlocksSeparator />

        <BlocksSeparator />
        <BlocksSeparator />
        <About />
        <OpenSourceContributions />
        <GitHubContributions />
        <TechStack />
        <BlocksSeparator />

        <BlocksSeparator />
        <BlocksSeparator />
        <Experiences />
        <BlocksSeparator />

        {SPONSORS.length > 0 && (
          <>
            <BlocksSeparator />
            <BlocksSeparator />
            <Sponsors />
            <BlocksSeparator />
          </>
        )}

        <BlocksSeparator />
        <BlocksSeparator />
        <Blog />
        <BlocksSeparator />

        <BlocksSeparator />
        <BlocksSeparator />
        <Projects />
        <BlocksSeparator />

        {hasCerts && (
          <>
            <BlocksSeparator />
            <BlocksSeparator />
            <Certifications />
            <BlocksSeparator />
          </>
        )}

        <Insights />
        <BlocksSeparator />
      </div>
    </>
  )
}
