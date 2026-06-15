"use client"

import { useRef } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { BannerParticles } from "@/components/banner-particles"

export function ProfileCover() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "dark" ? "dark" : "light"
  const imageSrc = theme === "dark" ? "/covers/cover-dark.webp" : "/covers/cover-light.webp"

  const maskStyle = {
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent), linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
    WebkitMaskComposite: "destination-in",
    maskImage:
      "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent), linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
    maskComposite: "intersect",
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex aspect-2.5/1 items-center justify-center border-x border-line select-none sm:aspect-3.5/1",
        "screen-line-top screen-line-bottom before:-top-px after:-bottom-px",
        "overflow-hidden bg-background"
      )}
      id="js-cover-mark"
    >
      <div className="absolute inset-0 h-full w-full" style={maskStyle}>
        <Image
          width={1000}
          height={1000}
          className={cn(
            "h-full w-full object-cover",
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
