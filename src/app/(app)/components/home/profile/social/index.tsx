"use client"

import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

import { USER } from "@/data/portfolio/user"
import { SOCIAL_LINKS } from "@/data/portfolio/social-links"
import { addQueryParams } from "@/utils/url"
import { UTM_PARAMS } from "@/config/site"

// Per-platform short label for the pill
const SHORT_LABEL: Record<string, string> = {
  x: "X",
  github: "GitHub",
  linkedin: "LinkedIn",
  telegram: "Telegram",
  reddit: "Reddit",
  bluesky: "Bluesky",
}

// Platform accent colors for the card header strip
const ACCENT: Record<string, string> = {
  x: "#000000",
  github: "#24292e",
  linkedin: "#0A66C2",
  telegram: "#2CA5E0",
  reddit: "#FF4500",
  bluesky: "#0085FF",
}

function HoverCard({
  icon,
  title,
  subtitle,
  href,
  id,
}: {
  icon: string
  title: string
  subtitle?: string
  href: string
  id?: string
}) {
  const accent = ACCENT[id ?? ""] ?? "#555"

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      // Card sits above the pill
      className="absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-background shadow-2xl"
    >
      {/* Top accent strip */}
      <div className="h-12 w-full" style={{ backgroundColor: accent }} />

      {/* Avatar — overlaps the strip */}
      <div className="relative -mt-7 px-4">
        <div className="size-14 overflow-hidden rounded-full border-4 border-background bg-muted shadow">
          <img
            src={USER.avatar}
            alt={USER.displayName}
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 pt-2">
        <p className="font-semibold text-foreground">{USER.displayName}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>

        <div className="mt-3 flex items-center gap-2">
          <img
            src={icon}
            alt={title}
            width={14}
            height={14}
            className="size-3.5 shrink-0 object-contain dark:invert"
          />
          <span className="text-xs text-muted-foreground">{title}</span>
        </div>

        <a
          href={addQueryParams(href, UTM_PARAMS)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full rounded-full border border-line py-1.5 text-center text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          View profile
        </a>
      </div>
    </motion.div>
  )
}

function SocialPill({
  icon,
  title,
  subtitle,
  href,
  id,
  index,
}: {
  icon: string
  title: string
  subtitle?: string
  href: string
  id?: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const label = SHORT_LABEL[id ?? ""] ?? title

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <HoverCard
            icon={icon}
            title={title}
            subtitle={subtitle}
            href={href}
            id={id}
          />
        )}
      </AnimatePresence>

      <motion.a
        href={addQueryParams(href, UTM_PARAMS)}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.28, ease: "easeOut" }}
        whileTap={{ scale: 0.95 }}
        className="flex h-8 items-center gap-1.5 rounded-full border border-line bg-background px-3 text-sm text-muted-foreground shadow-sm transition-colors hover:border-foreground/20 hover:text-foreground"
      >
        <img
          src={icon}
          alt={title}
          width={14}
          height={14}
          className="size-3.5 shrink-0 object-contain dark:invert"
        />
        <span>{label}</span>
      </motion.a>
    </div>
  )
}

export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-4 pb-2 pt-1">
      {SOCIAL_LINKS.map((link, i) => (
        <SocialPill
          key={link.id ?? link.title}
          icon={link.icon}
          title={link.title}
          subtitle={link.subtitle}
          href={link.href}
          id={link.id}
          index={i}
        />
      ))}
    </div>
  )
}
