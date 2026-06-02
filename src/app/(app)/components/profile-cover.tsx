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
        "bg-black/0.75 dark:bg-white/1 overflow-hidden"
      )}
    >
      <DotGridSpotlight
        dotColor={DOT_COLOR[theme]?.default}
        activeDotColor={DOT_COLOR[theme]?.active}
      />

      {/* Creative Cyber-Premium Badges in the corners */}
      <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-wider text-muted-foreground/60 select-none pointer-events-none">
        <span className="relative flex size-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500"></span>
        </span>
        <span>SYS_OP // ACTIVE_NODE_0x7E4</span>
      </div>

      <div className="absolute bottom-3 right-4 font-mono text-[9px] sm:text-[10px] tracking-widest text-muted-foreground/40 select-none pointer-events-none uppercase">
        wistant.me // dev_env_v4.2
      </div>
    </div>
  )
}

