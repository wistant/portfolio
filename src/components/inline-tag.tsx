"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface InlineTagProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Explicit icon: local icon name (e.g. "react", "typescript"), remote URL, or emoji */
  icon?: string
  /** Text label to display if children is not provided */
  label?: string
  /** Raw SVG string if provided directly */
  svg?: string
  /** Explicit link URL (same as href) */
  to?: string
  /** Explicitly disable icon rendering */
  noIcon?: boolean
}

// Map common technology names / keywords to their high-res local SVGs or official favicons
const TECH_ICON_MAP: Record<string, string> = {
  // Core languages & runtimes
  typescript: "/icons/typescript.svg",
  ts: "/icons/typescript.svg",
  javascript: "/icons/js.svg",
  js: "/icons/js.svg",
  python: "/icons/python.svg",
  rust: "/icons/rust.svg",
  go: "/icons/go.svg",
  golang: "/icons/go.svg",
  nodejs: "/icons/nodejs.svg",
  node: "/icons/nodejs.svg",
  bun: "/icons/bun.svg",
  deno: "/icons/deno.svg",

  // Frameworks & Libraries
  react: "/icons/react.svg",
  reactjs: "/icons/react.svg",
  nextjs: "/icons/nextjs.svg",
  next: "/icons/nextjs.svg",
  nestjs: "/icons/nestjs.svg",
  nest: "/icons/nestjs.svg",
  vue: "/icons/vue.svg",
  vuejs: "/icons/vue.svg",
  angular: "/icons/angular.svg",
  svelte: "/icons/svelte.svg",
  astro: "/icons/astro.svg",
  express: "/icons/express.svg",
  expressjs: "/icons/express.svg",
  fastify: "/icons/fastify.svg",
  trpc: "/icons/trpc.svg",
  graphql: "/icons/graphql.svg",
  zod: "/icons/zod.svg",
  vite: "/icons/vitejs.svg",
  vitejs: "/icons/vitejs.svg",
  turbopack: "/icons/turbopack.svg",
  turborepo: "/icons/turborepo.svg",

  // Styling & UI
  tailwindcss: "/icons/tailwindcss.svg",
  tailwind: "/icons/tailwindcss.svg",
  shadcn: "/icons/shadcn-ui.svg",
  shadcnui: "/icons/shadcn-ui.svg",

  // Databases & Backend Services
  postgresql: "/icons/postgresql.svg",
  postgres: "/icons/postgresql.svg",
  mongodb: "/icons/mongodb.svg",
  mongo: "/icons/mongodb.svg",
  redis: "/icons/redis.svg",
  prisma: "/icons/prisma.svg",
  supabase: "/icons/supabase-icon.svg",
  docker: "/icons/docker.svg",
  stripe: "/icons/stripe.svg",

  // Cloud & Platforms
  vercel: "/icons/vercel.svg",
  cloudflare: "/icons/cloudflare.svg",
  aws: "/icons/aws/aws.svg",
  azure: "/icons/microsoft-azure.svg",
  git: "/icons/git.svg",
  github: "/icons/github.svg",
  gitlab: "/icons/gitlab.svg",

  // Specific Tools & Engines
  vendure: "https://www.google.com/s2/favicons?domain=vendure.io&sz=64",
}

// Brand domains mapped to local icons
const DOMAIN_BRAND_MAP: Record<string, string> = {
  "github.com": "/icons/github.svg",
  "gitlab.com": "/icons/gitlab.svg",
  "x.com": "/icons/SocialIcons/x.svg",
  "twitter.com": "/icons/SocialIcons/twitter.svg",
  "linkedin.com": "/icons/SocialIcons/linkedin.svg",
  "youtube.com": "/icons/SocialIcons/youtube.svg",
  "anthropic.com": "/icons/anthropic.svg",
  "apple.com": "/icons/apple.svg",
  "android.com": "/icons/android.svg",
  "docker.com": "/icons/docker.svg",
}

function isEmoji(str: string): boolean {
  if (!str) return false
  const emojiRegex = /\p{Extended_Pictographic}/u
  return emojiRegex.test(str.trim()) && str.trim().length <= 4
}

function extractDomain(urlStr: string): string | null {
  try {
    const parsed = new URL(urlStr)
    return parsed.hostname.replace(/^www\./, "")
  } catch {
    return null
  }
}

interface ElementWithProps {
  children?: React.ReactNode
  src?: unknown
}

function extractText(node: React.ReactNode): string {
  if (!node) return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) {
    return (node as React.ReactNode[])
      .map((child) => extractText(child))
      .join("")
  }
  if (React.isValidElement<ElementWithProps>(node) && node.props.children) {
    return extractText(node.props.children)
  }
  return ""
}

function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function resolveIconSource(
  iconProp?: string,
  href?: string,
  labelText?: string
): {
  type: "emoji" | "svg-string" | "img" | "none"
  src?: string
  emoji?: string
} {
  // 1. Explicit icon takes top priority
  if (iconProp) {
    const trimmed = iconProp.trim()

    if (isEmoji(trimmed)) {
      return { type: "emoji", emoji: trimmed }
    }

    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("/")
    ) {
      return { type: "img", src: trimmed }
    }

    const clean = trimmed.replace(/\.svg$/, "")
    const known = TECH_ICON_MAP[normalizeKey(clean)]
    if (known) {
      return { type: "img", src: known }
    }
    return { type: "img", src: `/icons/${clean}.svg` }
  }

  // 2. Intelligent inference from the label text (e.g. "TypeScript", "React", "NestJS")
  // This ensures [TypeScript](https://github.com/topics/typescript) shows the TypeScript logo, NOT GitHub!
  if (labelText) {
    const normalizedLabel = normalizeKey(labelText)
    if (TECH_ICON_MAP[normalizedLabel]) {
      return { type: "img", src: TECH_ICON_MAP[normalizedLabel] }
    }
  }

  // 3. Inference from URL path (e.g. github.com/topics/typescript or github.com/nestjs/nest)
  if (href) {
    try {
      const parsed = new URL(href)
      const pathParts = parsed.pathname.toLowerCase().split("/").filter(Boolean)
      for (const part of pathParts) {
        const normalizedPart = normalizeKey(part)
        if (TECH_ICON_MAP[normalizedPart]) {
          return { type: "img", src: TECH_ICON_MAP[normalizedPart] }
        }
      }
    } catch {
      // ignore
    }
  }

  // 4. Check domain name for technology match (e.g. typescript.io -> typescript icon)
  if (href) {
    const domain = extractDomain(href)
    if (domain) {
      const domainName = domain.split(".")[0]
      const normalizedDomain = normalizeKey(domainName)
      if (TECH_ICON_MAP[normalizedDomain]) {
        return { type: "img", src: TECH_ICON_MAP[normalizedDomain] }
      }

      // If the domain is a known brand (e.g. github.com, x.com, etc.)
      if (DOMAIN_BRAND_MAP[domain]) {
        return { type: "img", src: DOMAIN_BRAND_MAP[domain] }
      }

      // Automatically fetch the website's live favicon via Google's 64px Favicon service
      return {
        type: "img",
        src: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      }
    }
  }

  return { type: "none" }
}

function hasImageChild(node: React.ReactNode): boolean {
  if (!node) return false
  if (React.isValidElement<ElementWithProps>(node)) {
    const type = node.type
    const typeName =
      typeof type === "string"
        ? type
        : typeof type === "function"
          ? type.name
          : typeof type === "object" && type !== null && "displayName" in type
            ? String((type as { displayName?: unknown }).displayName ?? "")
            : ""

    if (
      typeName === "img" ||
      typeName === "picture" ||
      typeName === "svg" ||
      typeName.toLowerCase().includes("image")
    ) {
      return true
    }
    if (node.props.src) return true
    if (node.props.children) return hasImageChild(node.props.children)
  }
  if (Array.isArray(node)) {
    return (node as React.ReactNode[]).some((child) => hasImageChild(child))
  }
  return false
}

export function InlineTag({
  icon,
  label,
  svg,
  href,
  to,
  noIcon = false,
  className,
  children,
  ...props
}: InlineTagProps) {
  const linkTarget = to ?? href
  const displayText = children ?? label
  const labelString = extractText(displayText)
  const isImageLink = hasImageChild(displayText)
  const [imgError, setImgError] = React.useState(false)

  // Internal jump or page links (#about, /blog) do not auto-fetch external favicons
  const isInternal =
    linkTarget &&
    (linkTarget.startsWith("#") ||
      (linkTarget.startsWith("/") && !linkTarget.startsWith("//")))

  const hasTechIcon =
    Boolean(labelString) && Boolean(TECH_ICON_MAP[normalizeKey(labelString)])

  const shouldRenderIcon =
    !noIcon &&
    !isImageLink &&
    (Boolean(icon) ||
      Boolean(svg) ||
      hasTechIcon ||
      (Boolean(linkTarget) && !isInternal))

  const iconInfo = shouldRenderIcon
    ? svg
      ? { type: "svg-string" as const }
      : resolveIconSource(icon, linkTarget, labelString)
    : { type: "none" as const }

  const renderIconBadge = () => {
    if (!shouldRenderIcon || iconInfo.type === "none" || imgError) return null

    if (iconInfo.type === "emoji") {
      return (
        <span
          className="inline-flex size-[1.15em] shrink-0 items-center justify-center text-[1em] leading-none select-none"
          aria-hidden="true"
        >
          {iconInfo.emoji}
        </span>
      )
    }

    if (iconInfo.type === "svg-string" && svg) {
      return (
        <span
          className="inline-flex size-[1.15em] shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-border/40 bg-zinc-100 p-[1.5px] align-[-0.18em] dark:bg-zinc-800/80 [&_svg]:size-full"
          dangerouslySetInnerHTML={{ __html: svg }}
          aria-hidden="true"
        />
      )
    }

    if (iconInfo.type === "img" && iconInfo.src) {
      return (
        <span
          className="inline-flex size-[1.15em] shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-border/40 bg-zinc-100 p-[1.5px] align-[-0.18em] shadow-xs select-none dark:bg-zinc-800/80"
          aria-hidden="true"
        >
          <img
            src={iconInfo.src}
            alt=""
            width={16}
            height={16}
            loading="lazy"
            onError={() => setImgError(true)}
            className="size-full object-contain"
          />
        </span>
      )
    }

    return null
  }

  // Linked version
  if (linkTarget) {
    const isExternal =
      linkTarget.startsWith("http://") || linkTarget.startsWith("https://")

    return (
      <a
        href={linkTarget}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(
          "group inline-flex items-baseline gap-1 font-medium text-foreground transition-colors hover:text-foreground",
          className
        )}
        {...props}
      >
        <span className="inline-flex shrink-0 self-center no-underline">
          {renderIconBadge()}
        </span>
        <span className="underline decoration-border/80 underline-offset-[3px] transition-colors group-hover:decoration-foreground">
          {displayText}
        </span>
      </a>
    )
  }

  // Unlinked inline tag
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1 font-medium text-foreground",
        className
      )}
    >
      <span className="inline-flex shrink-0 self-center">
        {renderIconBadge()}
      </span>
      <span>{displayText}</span>
    </span>
  )
}

// Aliases for user convenience in MDX/Markdown
export const Tag = InlineTag
export const Inline = InlineTag
export const Tech = InlineTag
