import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { WistantMark } from "./wistant-mark"

export function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center px-4 text-center",
        className
      )}
    >
      <div className="relative mb-6 flex items-center justify-center">
        <WistantMark className="h-20 w-auto animate-pulse text-muted-foreground/30" />
      </div>

      <h1 className="text-8xl font-bold tracking-tighter text-foreground/90 tabular-nums">
        404
      </h1>

      <p className="mt-2 mb-8 max-w-xs text-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>

      <Button asChild className="group">
        <Link href="/">
          Go to Home
          <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  )
}
