"use client"

import { useRef } from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { DotGridSpotlight } from "@/components/dot-grid-spotlight"

const DOT_COLOR = {
  light: {
    default: "rgba(0, 0, 0, 0.06)",
    active: "rgba(0, 0, 0, 0.12)",
  },
  dark: {
    default: "rgba(255, 255, 255, 0.05)",
    active: "rgba(255, 255, 255, 0.1)",
  },
}

export function ProfileCover() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "dark" ? "dark" : "light"

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex aspect-2.5/1 items-center justify-center border-x border-line select-none sm:aspect-3.5/1",
        "screen-line-top screen-line-bottom before:-top-px after:-bottom-px",
        "overflow-hidden bg-black/0.75 dark:bg-white/1"
      )}
    >
      <DotGridSpotlight
        dotColor={DOT_COLOR[theme]?.default}
        activeDotColor={DOT_COLOR[theme]?.active}
      />

      {/* Creative Cyber-Premium Badges in the corners */}
      <div className="pointer-events-none absolute top-3 left-4 flex items-center gap-2 font-mono text-[9px] tracking-wider text-muted-foreground/60 select-none sm:text-[10px]">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
        </span>
        <span>SYS_OP // ACTIVE_NODE_0x7E4</span>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-3 font-mono text-[9px] tracking-widest text-muted-foreground/40 uppercase select-none sm:text-[10px]">
        wistant.me // dev_env_v4.2
      </div>
    </div>
  )
}
