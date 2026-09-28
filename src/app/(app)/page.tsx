import type { Metadata } from "next"
import { getDocsByCategory } from "@/data/doc/documents"
import { SPONSORS } from "@/data/sponsor-data"

import { BlocksSeparator } from "@/components/blocks-separator"

import { Blog } from "./blog/components"
import { Certifications } from "./certifications/components"
import { ProfileHeroServer } from "./components/home/profile/profile-hero-server"
import { About } from "./components/home/sections/about"
import { Experiences } from "./components/home/sections/experiences"
import { GitHubContributions } from "./components/home/sections/github-contributions"
import { Insights } from "./components/home/sections/insights"
import { Sponsors } from "./components/home/sections/sponsors"
import { TechStack } from "./components/home/sections/tech-stack"
import { Projects } from "./projects/components"

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
        {/* Hero: Polaroid photo + animated intro + social */}
        <ProfileHeroServer />

        <BlocksSeparator />
        <BlocksSeparator />

        {/*Header of portfolio*/}
        <About />
        <GitHubContributions />
        <TechStack />
        <BlocksSeparator />

        {/*Experiences*/}
        <BlocksSeparator />
        <BlocksSeparator />
        <Experiences />
        <BlocksSeparator />

        {/*Projects*/}
        <BlocksSeparator />
        <BlocksSeparator />
        <Projects />
        <BlocksSeparator />

        {SPONSORS.length > 0 && (
          <>
            <BlocksSeparator />
            <BlocksSeparator />
            <Sponsors />
            <BlocksSeparator />
          </>
        )}

        {/* Blog */}
        <BlocksSeparator />
        <BlocksSeparator />
        <Blog />
        <BlocksSeparator />

        {hasCerts && (
          <>
            {/*Certifications*/}
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
