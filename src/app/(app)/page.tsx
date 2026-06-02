import type { Metadata } from "next"

import { cn } from "@/lib/utils"

import { About } from "./components/about"
import { Blog } from "./components/blog"
import { Experiences } from "./components/experiences"
import { GitHubContributions } from "./components/github-contributions"
import { Insights } from "./components/insights"
import { ProfileHeader } from "./components/profile-header"
import { Projects } from "./components/projects"
import { SocialLinks } from "./components/social-links"
import { TechStack } from "./components/tech-stack"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      {/*<Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />*/}

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <ProfileHeader />

        <SocialLinks />
        <Separator />

        <Separator />
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

        <Separator />
        <Separator />
        <Experiences />
        <Separator />

        {/*<Sponsors />*/}
        <Separator />

        <Separator />
        <Blog />
        <Separator />

        <Separator />
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

// function getPageJsonLd(): WithContext<PageSchema> {
//   return {
//     "@context": "https://schema.org",
//     "@type": "ProfilePage",
//     dateCreated: new Date(USER.dateCreated).toISOString(),
//     dateModified: new Date().toISOString(),
//     mainEntity: {
//       "@type": "Person",
//       name: USER.displayName,
//       identifier: USER.username,
//       image: USER.avatar,
//     },
//   }
// }

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
