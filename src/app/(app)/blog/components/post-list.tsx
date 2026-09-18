import type { Doc } from "@/types/document"
import { cn } from "@/lib/utils"
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/animations/fade-in"
import { PostItem } from "@/components/post-item"

export function PostList({ posts }: { posts: Doc[] }) {
  return (
    <div className="relative pt-4">
      <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
        <div className="border-r border-line" />
        <div className="border-l border-line" />
      </div>

      <StaggerGroup
        as="ul"
        staggerDelay={0.06}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {posts.map((post, index) => (
          <StaggerItem
            as="li"
            key={post.slug}
            className={cn(
              "max-sm:screen-line-top max-sm:screen-line-bottom",
              "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom"
            )}
          >
            <PostItem
              post={post}
              imageLoading={index <= 3 ? "eager" : "lazy"}
            />
          </StaggerItem>
        ))}

        {posts.length === 0 && (
          <li className="screen-line-top screen-line-bottom p-4">
            <p className="font-mono text-sm">No posts found.</p>
          </li>
        )}
      </StaggerGroup>
    </div>
  )
}

