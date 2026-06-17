"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { BannerParticles } from "@/components/banner-particles"
import { COVER_CYCLE_INTERVAL } from "@/config/site"

const COVERS = [
  "/covers/cover1.webp",
  "/covers/cover2.webp",
  "/covers/cover4.webp",
  "/covers/cover5.webp",
]

export function ProfileCover() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)
  const [coverIndex, setCoverIndex] = useState(0)

  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "dark" ? "dark" : "light"

  // Cycle cover image in a loop when theme changes, avoiding synchronous renders during initial mount
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const handle = requestAnimationFrame(() => {
      setCoverIndex((prev) => (prev + 1) % COVERS.length)
    })
    return () => cancelAnimationFrame(handle)
  }, [resolvedTheme])

  // Automatic cover rotation based on configurable time interval
  useEffect(() => {
    if (!COVER_CYCLE_INTERVAL || COVER_CYCLE_INTERVAL <= 0) return

    const interval = setInterval(() => {
      setCoverIndex((prev) => (prev + 1) % COVERS.length)
    }, COVER_CYCLE_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const imageSrc = COVERS[coverIndex]

  const maskStyle = {
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent), linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
    WebkitMaskComposite: "destination-in",
    maskImage:
      "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent), linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
    maskComposite: "intersect",
  }

  const handleCoverClick = () => {
    // Manually cycle through covers when clicked
    setCoverIndex((prev) => (prev + 1) % COVERS.length)
  }

  return (
    <div
      ref={containerRef}
      onClick={handleCoverClick}
      className={cn(
        "group relative flex aspect-2.5/1 cursor-pointer items-center justify-center border-x border-line select-none sm:aspect-3.5/1",
        "screen-line-top screen-line-bottom before:-top-px after:-bottom-px",
        "overflow-hidden bg-background"
      )}
      id="js-cover-mark"
      title="Click to cycle cover image"
    >
      <div className="absolute inset-0 h-full w-full" style={maskStyle}>
        <Image
          width={1200}
          height={400}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-102",
            theme === "dark" ? "object-center" : "object-bottom"
          )}
          src={imageSrc}
          alt="Hero Cover"
          priority
        />
        <BannerParticles />
      </div>

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
