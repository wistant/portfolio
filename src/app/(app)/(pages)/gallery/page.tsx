import fs from "fs"
import path from "path"
import type { Metadata } from "next"

import { X_HANDLE } from "@/config/site"
import MasonryGallery from "@/components/mvpblocks/masonry-grid-1"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"

const title = "Gallery"
const description =
  "A curated collection of visual captures, tech setups, and memorable milestones."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    url: "/gallery",
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

export default function Page() {
  const galleryDir = path.join(process.cwd(), "public/gallery")
  let images: string[] = []

  try {
    const filenames = fs.readdirSync(galleryDir)
    images = filenames
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map((file) => `/gallery/${file}`)
  } catch (error) {
    console.error("Failed to read gallery directory:", error)
  }

  return (
    <div>
      <PageHeading>
        <PageHeadingTagline>Gallery</PageHeadingTagline>
        <PageHeadingTitle>Visual captures & memories.</PageHeadingTitle>
        <PageHeadingDescription>
          A premium visual collection of experiences, tech setups, and personal
          captures.
        </PageHeadingDescription>
      </PageHeading>

      <div className="h-4" />
      <div className="screen-line-bottom h-px" />

      <MasonryGallery images={images} />

      <div className="screen-line-top h-4" />
    </div>
  )
}
