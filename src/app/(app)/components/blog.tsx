import Link from "next/link"
import { getAllDocs } from "@/data/doc/documents"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/base/ui/button"
import { PostItem } from "@/components/post-item"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel"

export function Blog() {
  const allPosts = getAllDocs()

  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>
          My Blog 📚
          <PanelTitleSup>[{allPosts.length}]</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

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

      <div className="screen-line-top flex justify-center py-2">
        <Button
          className="gap-2 border-none pr-2.5 pl-3"
          size="sm"
          nativeButton={false}
          render={<Link href="/blog" />}
        >
          All Posts
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
