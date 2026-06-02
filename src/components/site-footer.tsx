import { RssIcon } from "lucide-react"

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { SiteFooterInteractiveLogotype } from "@/components/site-footer-brand"

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-top mx-auto border-x border-line pt-6 pb-6 group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        <div className="mb-6 flex flex-col items-center justify-center gap-2 px-4 text-center font-mono text-xs text-muted-foreground">
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
            <span>—</span>
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
        </div>

        <div className="screen-line-top screen-line-bottom flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex h-12 items-center justify-center gap-4 border-x border-line bg-background px-6">
            <a
              className="flex font-mono text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground max-sm:hidden"
              href={`${SITE_INFO.url}/llms.txt`}
              target="_blank"
              rel="noopener"
            >
              llms.txt
            </a>

            <FooterSeparator className="max-sm:hidden" />

            <a
              className="flex items-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
              href="https://x.com/iamnwistant?utm_source=wistant.me"
              target="_blank"
              rel="noopener"
              aria-label="X"
            >
              <Icons.x className="size-4" />
            </a>

            <FooterSeparator />

            <a
              className="flex items-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
              href="https://github.com/wistant?utm_source=wistant.me"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <Icons.github className="size-4" />
            </a>

            <FooterSeparator />

            <a
              className="flex items-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
              href="https://www.linkedin.com/in/wistant?utm_source=wistant.me"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <Icons.linkedin className="size-4" />
            </a>

            <FooterSeparator />

            <a
              className="flex items-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
              href={`${SITE_INFO.url}/rss`}
              target="_blank"
              rel="noopener"
              aria-label="RSS"
            >
              <RssIcon className="size-4" />
            </a>

            <FooterSeparator />

            <a
              className="flex items-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
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
        </div>

        <div className="*:absolute *:z-2 *:flex *:size-2 *:border *:border-line *:bg-background">
          <div className="bottom-[-3.5px] left-[-4.5px]" />
          <div className="right-[-4.5px] bottom-[-3.5px]" />
        </div>
      </div>

      <SiteFooterInteractiveLogotype />

      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-24" />
      </div>
    </footer>
  )
}

function FooterSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("h-4 w-px bg-line", className)} {...props} />
}
