import { getDocsByCategory } from "@/data/doc/documents"

import { cn } from "@/lib/utils"
import { PostItem } from "@/components/post-item"

const allPosts = getDocsByCategory("blog")
export default function AllPosts() {
  return (
    <div className="relative py-4">
      <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
        <div className="border-r border-line"></div>
        <div className="border-l border-line"></div>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allPosts.slice(0, 4).map((post) => (
          <li
            key={post.slug}
            className={cn(
              "max-sm:screen-line-top max-sm:screen-line-bottom",
              "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom"
            )}
          >
            <PostItem post={post} imageLoading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  )
}
