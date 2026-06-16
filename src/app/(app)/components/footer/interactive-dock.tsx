import { RssIcon } from "lucide-react"

import {
  GITHUB_USERNAME,
  LINKEDIN_USERNAME,
  SITE_INFO,
  X_HANDLE,
} from "@/config/site"
import { Dock, DockIcon } from "@/components/ui/dock"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Icons } from "@/components/icons"

const dockItems = [
  {
    href: `${SITE_INFO.url}/llms.txt`,
    label: "llms.txt",
    icon: <Icons.json className="size-4.5" />,
  },
  {
    href: `https://x.com/${X_HANDLE}?utm_source=${SITE_INFO.url}`,
    label: "Twitter / X",
    icon: <Icons.x className="size-4" />,
  },
  {
    href: `https://github.com/${GITHUB_USERNAME}?utm_source=wistant.me`,
    label: "GitHub",
    icon: <Icons.github className="size-4" />,
  },
  {
    href: `https://www.linkedin.com/in/${LINKEDIN_USERNAME}?utm_source=wistant.me`,
    label: "LinkedIn",
    icon: <Icons.linkedin className="size-4" />,
  },
  {
    href: `${SITE_INFO.url}/rss`,
    label: "RSS Feed",
    icon: <RssIcon className="size-4" />,
  },
]

export default function FooterDock() {
  return (
    <div className="flex justify-center">
      <Dock className="border-line bg-muted/10">
        {dockItems.map((item) => (
          <DockIcon
            key={item.label}
            className="border border-border/50 bg-background/40 transition-colors hover:bg-muted/60"
          >
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="flex size-full items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                }
              />
              <TooltipContent
                side="top"
                align="center"
                className="font-mono text-[10px] tracking-wide select-none"
              >
                {item.label}
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </div>
  )
}
