"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowLeftIcon,
  FileTextIcon,
  FolderGit2Icon,
  HomeIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { WistantMark } from "./wistant-mark"

export function NotFound({ className }: { className?: string }) {
  const pathname = usePathname() || ""

  const isBlog = pathname.startsWith("/blog")
  const isProject = pathname.startsWith("/projects")
  const isCert = pathname.startsWith("/certifications")

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back()
    }
  }

  return (
    <div
      className={cn(
        "flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center px-4 text-center select-none",
        className
      )}
    >
      <div className="relative mb-6 flex items-center justify-center">
        <div className="animate-bounce duration-3000">
          <WistantMark className="h-20 w-auto text-foreground/80 transition-transform duration-500 hover:scale-110 hover:rotate-6 dark:text-foreground/90" />
        </div>
      </div>

      <div className="screen-line-top screen-line-bottom w-full max-w-md space-y-4 px-4 py-6">
        <h1 className="text-6xl font-bold tracking-tighter text-foreground/90 tabular-nums">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight">
            {isBlog
              ? "Blog post not found"
              : isProject
                ? "Project not found"
                : isCert
                  ? "Certification not found"
                  : "Page not found"}
          </h2>
          <p className="mx-auto max-w-xs text-sm text-muted-foreground">
            {isBlog
              ? "This post doesn't exist or has been archived. You can explore other articles below."
              : isProject
                ? "This case study doesn't exist or is currently being updated. Check out other projects."
                : isCert
                  ? "This certification review is not available yet. We are preparing more credentials."
                  : "The page you are looking for does not exist, has been moved, or is still under construction."}
          </p>
        </div>
      </div>

      <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
        <Button onClick={handleGoBack} variant="outline" className="gap-2">
          <ArrowLeftIcon className="size-4" />
          <span>Go Back</span>
        </Button>

        <div className="flex gap-2">
          <Button asChild className="flex-1 gap-1.5" variant="secondary">
            <Link href="/">
              <HomeIcon className="size-3.5" />
              <span>Home</span>
            </Link>
          </Button>

          {isBlog ? (
            <Button asChild className="flex-1 gap-1.5" variant="secondary">
              <Link href="/blog">
                <FileTextIcon className="size-3.5" />
                <span>Other Blogs</span>
              </Link>
            </Button>
          ) : isProject ? (
            <Button asChild className="flex-1 gap-1.5" variant="secondary">
              <Link href="/projects">
                <FolderGit2Icon className="size-3.5" />
                <span>Projects</span>
              </Link>
            </Button>
          ) : (
            <Button asChild className="flex-1 gap-1.5" variant="secondary">
              <Link href="/blog">
                <FileTextIcon className="size-3.5" />
                <span>Blog</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
