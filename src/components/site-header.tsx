import dynamic from "next/dynamic"
import Link from "next/link"
import { getAllDocs } from "@/data/doc/documents"

import type { DocPreview } from "@/types/document"
import { MAIN_NAV } from "@/config/site"
import { Separator } from "@/components/ui/separator"
import { NavDesktop } from "@/components/nav-desktop"
import { NavItemGitHub } from "@/components/nav-item-github"
import { ThemeToggle } from "@/components/theme-toggle"
import { WistantMark } from "@/components/wistant-mark"

const BrandContextMenu = dynamic(
  () => import("@/components/brand-context-menu")
)

const CommandMenu = dynamic(() => import("@/components/command-menu"))

export function SiteHeader() {
  const docs = getAllDocs()

  // Minimize data serialized to client component - only send necessary fields
  const docPreviews: DocPreview[] = docs.map((doc) => ({
    slug: doc.slug,
    title: doc.metadata.title,
    category: doc.metadata.category,
  }))

  return (
    <header className="sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2">
      <div className="screen-line-top screen-line-bottom mx-auto flex h-12 items-center justify-between gap-2 border-x border-line px-2 group-has-data-[slot=layout-wide]/layout:container after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl">
        <BrandContextMenu>
          <Link href="/" aria-label="Home">
            <WistantMark className="h-8 shrink-0" />
          </Link>
        </BrandContextMenu>

        <div className="flex-1" />

        <NavDesktop items={MAIN_NAV} />

        <div className="flex items-center *:first:mr-2 max-sm:*:data-[slot=command-menu-trigger]:hidden">
          <CommandMenu docs={docPreviews} enabledHotkeys />
          <NavItemGitHub />
          <Separator
            orientation="vertical"
            className="mx-2 data-vertical:h-4 data-vertical:self-center"
          />
          <ThemeToggle />
        </div>

        {/* <div className="absolute top-[-3.5px] left-[-4.5px] z-2 flex size-2 border border-line bg-background" /> */}
        {/* <div className="absolute top-[-3.5px] right-[-4.5px] z-2 flex size-2 border border-line bg-background" /> */}
      </div>
    </header>
  )
}
