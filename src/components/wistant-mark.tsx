import type * as React from "react"
import { USER } from "@/data/portfolio/user"

import { cn } from "@/lib/utils"

export function WistantMark({
  className,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img
      src={USER.logo || "https://github.com/wistant.png"}
      alt="Wistant Logo"
      className={cn(
        "aspect-square h-6 w-6 shrink-0 rounded-md border border-line bg-muted/40 object-cover",
        className
      )}
      {...props}
    />
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><clipPath id="clip"><rect width="24" height="24" rx="4" /></clipPath><image href="${USER.logo || "https://github.com/wistant.png"}" width="24" height="24" clip-path="url(#clip)" /></svg>`
}
