import { Suspense } from "react"
import type { Metadata } from "next"

import { X_HANDLE } from "@/config/site"
import { getOpenSourceContributions } from "@/lib/opensource-contributions"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"

import { OpenSourceList } from "./components/opensource-list"

const title = "Open Source Contributions"
const description =
  "Showcasing my pull requests, issues, and contributions to public open source projects."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/opensource",
  },
  openGraph: {
    url: "/opensource",
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

export default async function Page() {
  const contributions = await getOpenSourceContributions()

  return (
    <div className="min-h-svh">
      <PageHeading>
        <PageHeadingTagline>Open Source</PageHeadingTagline>
        <PageHeadingTitle>
          Public contributions, bug fixes, and feature integrations across the
          ecosystem.
        </PageHeadingTitle>
      </PageHeading>

      <div className="h-4" />

      <Suspense fallback={<div>Loading contributions...</div>}>
        <OpenSourceList contributions={contributions} />
      </Suspense>

      <div className="h-4" />
    </div>
  )
}
