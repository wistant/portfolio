import { ArrowUpRightIcon, RssIcon } from "lucide-react"

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-top mx-auto border-x border-line pt-8 pb-6 group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        
        {/* Top Section: Brand Info & Social CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-8">
          
          {/* Left Column: Brand Identifier & Tagline */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-sm font-bold tracking-wider text-foreground select-none uppercase">
                {SITE_INFO.name}
              </span>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80 max-w-sm">
                Crafting pixel-perfect portfolios, blogs, and custom components with atomic commit discipline and clean design aesthetics.
              </p>
            </div>
            
            {/* Quick Context Feeds */}
            <div className="mt-6 flex items-center gap-4 text-xs font-mono">
              <a
                className="flex items-center gap-1.5 text-muted-foreground/70 transition-colors duration-200 hover:text-foreground [&_svg]:size-3.5"
                href={`${SITE_INFO.url}/llms.txt`}
                target="_blank"
                rel="noopener"
              >
                <Icons.json />
                <span>llms.txt</span>
              </a>
              <span className="text-line/60">|</span>
              <a
                className="flex items-center gap-1.5 text-muted-foreground/70 transition-colors duration-200 hover:text-foreground [&_svg]:size-3.5"
                href={`${SITE_INFO.url}/rss`}
                target="_blank"
                rel="noopener"
              >
                <RssIcon className="size-3.5" />
                <span>rss feed</span>
              </a>
            </div>
          </div>

          {/* Right Column: Premium Social Grid & Source Code Card */}
          <div className="flex flex-col items-start md:items-end justify-between gap-6">
            {/* Glassmorphic Social Badges */}
            <div className="flex flex-wrap gap-2">
              {[
                {
                  href: "https://x.com/iamnwistant?utm_source=wistant.me",
                  label: "X",
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
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={item.label}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg border border-border/80 bg-muted/20 text-muted-foreground backdrop-blur-xs transition-all duration-300",
                    "hover:scale-[1.05] hover:border-foreground/30 hover:bg-foreground hover:text-background hover:shadow-[0_0_12px_rgba(0,0,0,0.05)]"
                  )}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            {/* Premium GitHub Repository CTA */}
            <a
              href={SOURCE_CODE_GITHUB_URL}
              target="_blank"
              rel="noopener"
              className={cn(
                "group inline-flex items-center gap-2.5 rounded-lg border border-border bg-muted/10 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-xs transition-all duration-300",
                "hover:scale-[1.02] hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:text-emerald-400"
              )}
            >
              <Icons.github className="size-4 transition-transform duration-300 group-hover:rotate-6" />
              <span className="font-mono text-[10px] tracking-wider uppercase">Source on GitHub</span>
              <ArrowUpRightIcon className="size-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

        </div>

        {/* Bottom Section: Copyright & Site Metadata */}
        <div className="border-t border-line px-6 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-muted-foreground/70 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 max-sm:text-center">
            <span>&copy; {new Date().getFullYear()} {SITE_INFO.name}. All rights reserved.</span>
            <span className="max-sm:hidden opacity-30">&bull;</span>
            <a
              href={
                process.env.NEXT_PUBLIC_DMCA_URL ||
                "https://www.dmca.com/ProtectionPro.aspx"
              }
              target="_blank"
              rel="noopener"
              aria-label="DMCA.com Protection Status"
              className="opacity-50 transition-opacity duration-200 hover:opacity-100"
            >
              <Icons.dmca className="h-4.5 w-auto" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-1.5 opacity-70 transition-opacity duration-200 hover:opacity-100">
            <span>Inspired by</span>
            <a
              href="https://chanhdai.com"
              target="_blank"
              rel="noopener"
              className="font-medium text-foreground underline decoration-border/60 hover:decoration-foreground underline-offset-3 transition-colors"
            >
              chanhdai.com
            </a>
            <span>&bull;</span>
            <span className="text-muted-foreground/60">tailwindcss &bull; shadcn &bull; vercel</span>
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
