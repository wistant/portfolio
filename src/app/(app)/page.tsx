import type { Metadata } from "next"
import Script from "next/script"
import { USER } from "@/data/portfolio/user"
import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

import { cn } from "@/lib/utils"
import { About } from "@/components/portfolio/about"
import { Blog } from "@/components/portfolio/blog"
import { Experiences } from "@/components/portfolio/experiences"
import { GitHubContributions } from "@/components/portfolio/github-contributions"
import { Insights } from "@/components/portfolio/insights"
import { Overview } from "@/components/portfolio/overview"
import { ProfileActivityMosaicCover } from "@/components/portfolio/profile-activity-mosaic-cover"
import { ProfileHeader } from "@/components/portfolio/profile-header"
import { Projects } from "@/components/portfolio/projects"
import { SocialLinks } from "@/components/portfolio/social-links"
import { TechStack } from "@/components/portfolio/tech-stack"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <ProfileActivityMosaicCover />
        <ProfileHeader />
        <Separator />

        <Overview />
        <SocialLinks />
        <Separator />

        <About />
        {/*<Testimonials />*/}
        <GitHubContributions />
        <TechStack />
      </div>

      {/*<div className="mx-auto xl:container">*/}
      {/*  <Separator />*/}
      {/*  <ComponentsShowcase />*/}
      {/*</div>*/}

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <Separator />

        <Blog />
        <Separator />

        {/*<Sponsors />*/}
        <Separator />

        <Experiences />
        <Separator />

        <Projects />
        <Separator />

        {/*<Awards />*/}
        {/*<Separator />*/}

        {/*<Certifications />*/}
        {/*<Separator />*/}

        {/*<Bookmarks />*/}
        {/*<Separator />*/}

        <Insights />
        <Separator />
      </div>
    </>
  )
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-line",
        "before:absolute before:left-[-100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56",
        className
      )}
    >
      {/* <div
        className="absolute -top-1.25 -left-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      />
      <div
        className="absolute -top-1.25 -right-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      /> */}
    </div>
  )
}
