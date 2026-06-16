import { SITE_INFO } from "@/config/site"
import { Icons } from "@/components/icons"

export default function FooterCopyRight() {
  return (
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
  )
}
