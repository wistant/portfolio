import { addQueryParams } from "@/utils/url"
import { ArrowUpRightIcon } from "lucide-react"

import type { SocialLink } from "@/types/social-links"
import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"

export function SocialLinkItem({ icon, title, href }: SocialLink) {
  const isInvertible = title === "X" || title === "GitHub"

  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center gap-4 p-4 pr-2 transition-[background-color] ease-out hover:bg-accent-muted"
      )}
    >
      <div className="relative size-8 shrink-0 [--image-radius:var(--radius-lg)]">
        <img
          className={cn(
            "size-full rounded-(--image-radius) object-cover select-none",
            isInvertible && "dark:invert"
          )}
          src={icon}
          alt={title}
        />
        <div className="pointer-events-none absolute inset-0 rounded-(--image-radius) inset-ring-1 inset-ring-black/10 dark:inset-ring-white/15" />
      </div>

      <h3 className="flex-1 font-medium">
        <a
          href={addQueryParams(href, UTM_PARAMS)}
          target="_blank"
          rel="noopener"
        >
          <span className="absolute inset-0" aria-hidden />
          {title}
        </a>
      </h3>

      <ArrowUpRightIcon className="size-4 text-muted-foreground" />
    </div>
  )
}
