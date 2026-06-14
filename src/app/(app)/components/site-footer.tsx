import { RssIcon } from "lucide-react"

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-top mx-auto border-x border-line pt-6 pb-6 group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        {/* Top Section: Metadata & Credits */}
        <div className="mb-6 flex flex-col items-center justify-center gap-2 px-4 text-center font-mono text-xs text-muted-foreground/80">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            <span>Built with care by</span>
            <a
              className="font-medium text-foreground link-underline transition-colors hover:text-foreground/80"
              href="https://x.com/iamwistant"
              target="_blank"
              rel="noopener"
            >
              Wistant
            </a>
            <span className="text-muted-foreground/35">—</span>
            <span>Source available on</span>
            <a
              className="font-medium text-foreground link-underline transition-colors hover:text-foreground/80"
              href={SOURCE_CODE_GITHUB_URL}
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
          </p>
          <p className="text-[11px] text-muted-foreground/60 transition-colors hover:text-muted-foreground [&_a]:transition-colors [&_a]:hover:text-foreground">
            Inspired by{" "}
            <a
              href="https://chanhdai.com"
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2"
            >
              chanhdai.com
            </a>{" "}
            • tailwindcss.com • shadcn.com • vercel.com
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground/45 select-none">
            &copy; {new Date().getFullYear()} {SITE_INFO.name}. All rights
            reserved.
          </p>
        </div>

        {/* Console / Status Bar Section */}
        <div className="screen-line-top screen-line-bottom flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex h-12 w-full items-center justify-between border-x border-line bg-background px-4 md:max-w-3xl">
            {/* Left Column: System Status */}
            <div className="xs:flex hidden w-28 items-center justify-start gap-2 font-mono text-[10px] tracking-wider text-muted-foreground/80 uppercase select-none">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-foreground">sys: active</span>
            </div>

            {/* Center Column: Social Icons */}
            <div className="flex grow items-center justify-center gap-3.5 sm:gap-4">
              {/* LLMs.txt */}
              <a
                className="flex items-center gap-1.5 font-mono text-xs font-medium text-muted-foreground transition-all duration-200 hover:scale-102 hover:text-foreground max-sm:hidden"
                href={`${SITE_INFO.url}/llms.txt`}
                target="_blank"
                rel="noopener"
              >
                <Icons.json className="size-3.5" />
                <span>llms.txt</span>
              </a>

              <FooterSeparator className="max-sm:hidden" />

              {/* X / Twitter */}
              <a
                className="flex items-center rounded-md p-1 text-muted-foreground transition-all duration-200 hover:scale-108 hover:bg-muted/40 hover:text-foreground"
                href="https://x.com/iamnwistant?utm_source=wistant.me"
                target="_blank"
                rel="noopener"
                aria-label="X"
              >
                <Icons.x className="size-4" />
              </a>

              <FooterSeparator />

              {/* GitHub */}
              <a
                className="flex items-center rounded-md p-1 text-muted-foreground transition-all duration-200 hover:scale-108 hover:bg-muted/40 hover:text-foreground"
                href="https://github.com/wistant?utm_source=wistant.me"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
              >
                <Icons.github className="size-4" />
              </a>

              <FooterSeparator />

              {/* LinkedIn */}
              <a
                className="flex items-center rounded-md p-1 text-muted-foreground transition-all duration-200 hover:scale-108 hover:bg-muted/40 hover:text-foreground"
                href="https://www.linkedin.com/in/wistant?utm_source=wistant.me"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <Icons.linkedin className="size-4" />
              </a>

              <FooterSeparator />

              {/* RSS Feed */}
              <a
                className="flex items-center rounded-md p-1 text-muted-foreground transition-all duration-200 hover:scale-108 hover:bg-muted/40 hover:text-foreground"
                href={`${SITE_INFO.url}/rss`}
                target="_blank"
                rel="noopener"
                aria-label="RSS Feed"
              >
                <RssIcon className="size-4" />
              </a>

              <FooterSeparator />

              {/* DMCA */}
              <a
                className="flex items-center opacity-60 transition-all duration-200 hover:scale-102 hover:opacity-100"
                href={
                  process.env.NEXT_PUBLIC_DMCA_URL ||
                  "https://www.dmca.com/ProtectionPro.aspx"
                }
                target="_blank"
                rel="noopener"
                aria-label="DMCA.com Protection Status"
              >
                <Icons.dmca className="h-4.5 w-auto" />
              </a>
            </div>

            {/* Right Column: Search Shortcut */}
            <div className="hidden w-28 items-center justify-end gap-1 font-mono text-[10px] text-muted-foreground/80 select-none sm:flex">
              <span>press</span>
              <kbd className="inline-flex h-4 items-center rounded border border-border bg-muted/40 px-1 text-[9px] font-bold text-foreground">
                ⌘K
              </kbd>
              <span>to search</span>
            </div>
          </div>
        </div>

        {/* Grid Corner Highlights */}
        <div className="*:absolute *:z-2 *:flex *:size-2 *:border *:border-line *:bg-background">
          <div className="bottom-[-3.5px] left-[-4.5px]" />
          <div className="right-[-4.5px] bottom-[-3.5px]" />
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-24" />
      </div>
    </footer>
  )
}

function FooterSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("h-4 w-px bg-line", className)} {...props} />
}
