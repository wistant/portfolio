import { SOCIAL_LINKS } from "@/data/portfolio/social-links"

import { cn } from "@/lib/utils"

import { Panel } from "../panel"
import { SocialLinkItem } from "./social-link-item"

export function SocialLinks() {
  return (
    <Panel className="before:content-none after:content-none">
      <h2 className="sr-only">Social Links</h2>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-2 gap-2 md:grid-cols-3">
          <div className="border-r border-line" />
          <div className="border-l border-line md:border-x" />
          <div className="border-l border-line max-md:hidden" />
        </div>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {SOCIAL_LINKS.map((link, index) => {
            return (
              <li
                key={index}
                className={cn(
                  "max-md:nth-[2n+1]:screen-line-top max-md:nth-[2n+1]:screen-line-bottom",
                  "md:nth-[3n+1]:screen-line-top md:nth-[3n+1]:screen-line-bottom"
                )}
              >
                <SocialLinkItem {...link} />
              </li>
            )
          })}
        </ul>
      </div>
    </Panel>
  )
}
