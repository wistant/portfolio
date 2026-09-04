import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { FadeIn } from "@/components/animations/fade-in"
import { Button } from "@/components/base/ui/button"
import { Panel } from "@/components/panel"

import AllPosts from "./all-posts"
import BlogBlocTitle from "./bloc-title"

export function Blog() {
  return (
    <FadeIn>
      <Panel id="blog">
        <BlogBlocTitle />
        <AllPosts />
        <div className="screen-line-top flex justify-center py-2">
          <Button
            className="gap-2 border-none pr-2.5 pl-3"
            size="sm"
            nativeButton={false}
            render={<Link href="/blog" />}
          >
            All Blog Posts
            <ArrowRightIcon />
          </Button>
        </div>
      </Panel>
    </FadeIn>
  )
}
