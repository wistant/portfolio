import { RssIcon } from "lucide-react"

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site"
import { Dock, DockIcon } from "@/components/ui/dock"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Icons } from "@/components/icons"

export function SiteFooter() {
  const dockItems = [
    {
      href: `${SITE_INFO.url}/llms.txt`,
      label: "llms.txt",
      icon: <Icons.json className="size-4.5" />,
    },
    {
      href: "https://x.com/iamnwistant?utm_source=wistant.me",
      label: "Twitter / X",
      icon: <Icons.x className="size-4" />,
    },
    {
      href: "https://github.com/wistant?utm_source=wistant.me",
      label: "GitHub",
      icon: <Icons.github className="size-4" />,
    },
    {
      href: "https://www.linkedin.com/in/wistant?utm_source=wistant.me",
      label: "LinkedIn",
      icon: <Icons.linkedin className="size-4" />,
    },
    {
      href: `${SITE_INFO.url}/rss`,
      label: "RSS Feed",
      icon: <RssIcon className="size-4" />,
    },
  ]

  return (
    <footer className="max-w-screen overflow-x-hidden px-2 pb-16">
      <div className="screen-line-top mx-auto border-x border-line pt-12 group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        {/* Subtle Credits & Copyright */}
        <div className="mb-6 flex flex-col items-center justify-center gap-2 px-4 text-center font-mono text-[11px] text-muted-foreground/60 select-none">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            <span>Built with care by</span>
            <a
              href="https://x.com/iamwistant"
              target="_blank"
              rel="noopener"
              className="font-medium text-foreground underline decoration-border/60 underline-offset-2 transition-colors hover:decoration-foreground"
            >
              Wistant
            </a>
            <span>&bull;</span>
            <span>Source available on</span>
            <a
              href={SOURCE_CODE_GITHUB_URL}
              target="_blank"
              rel="noopener"
              className="font-medium text-foreground underline decoration-border/60 underline-offset-2 transition-colors hover:decoration-foreground"
            >
              GitHub
            </a>
          </p>
          <p>
            Inspired by{" "}
            <a
              href="https://chanhdai.com"
              target="_blank"
              rel="noopener"
              className="underline decoration-border/60 underline-offset-2 transition-colors hover:decoration-foreground"
            >
              chanhdai.com
            </a>{" "}
            &bull; tailwindcss &bull; shadcn &bull; vercel
          </p>
        </div>

        {/* macOS Style Interactive Dock */}
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

        {/* Bottom Bar: Copyright & DMCA & Shortcut */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line/60 px-4 pt-5 font-mono text-[10px] text-muted-foreground/50 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2 max-sm:text-center">
            <span>
              &copy; {new Date().getFullYear()} {SITE_INFO.name}. All rights
              reserved.
            </span>
            <span className="opacity-30 max-sm:hidden">&bull;</span>
            <a
              href={
                process.env.NEXT_PUBLIC_DMCA_URL ||
                "https://www.dmca.com/ProtectionPro.aspx"
              }
              target="_blank"
              rel="noopener"
              aria-label="DMCA.com Protection Status"
              className="opacity-45 transition-opacity duration-200 hover:opacity-100"
            >
              <Icons.dmca className="h-4 w-auto" />
            </a>
          </div>

          <div className="flex items-center gap-1 select-none">
            <span>press</span>
            <kbd className="inline-flex h-4.5 items-center rounded border border-border bg-muted/50 px-1 text-[9px] font-bold text-foreground">
              ⌘K
            </kbd>
            <span>to search</span>
          </div>
        </div>

        {/* Grid Corner Highlights */}
        <div className="*:absolute *:z-2 *:flex *:size-2 *:border *:border-line *:bg-background">
          <div className="bottom-[-3.5px] left-[-4.5px]" />
          <div className="right-[-4.5px] bottom-[-3.5px]" />
        </div>
      </div>
    </footer>
  )
}
