import { Suspense } from "react"
import type { Metadata } from "next"
import { getAllDocs } from "@/data/doc/documents"

import { X_HANDLE } from "@/config/site"
import { PostList } from "./components/post-list"
import { PostListWithSearch } from "./components/post-list-with-search"
import { PostSearchInput } from "./components/post-search-input"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"

const title = "Blog"
const description = "Writing about code, design, and everything in between."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: "/blog",
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
  const allPosts = getAllDocs()

  return (
    <div className="min-h-svh">
      <PageHeading>
        <PageHeadingTagline>Blog</PageHeadingTagline>
        <PageHeadingTitle>
          Writing about code, design, and everything in between.
        </PageHeadingTitle>
      </PageHeading>

      <div className="h-4" />

      <div className="screen-line-top screen-line-bottom p-2">
        <Suspense
          fallback={
            <div className="flex h-9 w-full rounded-lg border border-input dark:bg-input/30" />
          }
        >
          <PostSearchInput />
        </Suspense>
      </div>

      <Suspense fallback={<PostList posts={allPosts} />}>
        <PostListWithSearch posts={allPosts} />
      </Suspense>

      <div className="h-4" />
    </div>
  )
}
