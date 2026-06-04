import type { ImageProps } from "next/image"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

import type { Doc } from "@/types/document"

export function PostItem({
  post,
  imageLoading = "lazy",
}: {
  post: Doc
  imageLoading?: ImageProps["loading"]
}) {
  return (
    <div className="relative flex h-full flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent-muted">
      {post.metadata.image && (
        <div className="relative select-none [--image-radius:var(--radius-xl)]">
          <Image
            className="w-full h-auto rounded-(--image-radius) select-none"
            src={post.metadata.image}
            alt={post.metadata.title}
            width={1200}
            height={630}
            quality={100}
            loading={imageLoading}
            style={{ width: "100%", height: "auto" }}
            unoptimized
          />
          <div className="pointer-events-none absolute inset-0 rounded-(--image-radius) inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10" />
        </div>
      )}

      <div className="flex flex-col gap-1 p-2">
        <h3 className="text-lg leading-snug font-medium text-balance">
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute inset-0" aria-hidden />
            {post.metadata.title}
          </Link>

          {post.metadata.new && (
            <span
              className="pointer-events-none ml-2 inline-block size-2 -translate-y-px rounded-full bg-info"
              aria-label="New"
            />
          )}
        </h3>

        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm text-muted-foreground">
            <time dateTime={new Date(post.metadata.createdAt).toISOString()}>
              {format(new Date(post.metadata.createdAt), "dd.MM.yyyy")}
            </time>
          </dd>
        </dl>
      </div>
    </div>
  )
}
