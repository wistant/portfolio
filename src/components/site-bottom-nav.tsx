import dynamic from "next/dynamic"
import { getAllDocs, getDocsByCategory } from "@/data/doc/documents"

import type { DocPreview } from "@/types/document"
import { MOBILE_NAV } from "@/config/site"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const CommandMenu = dynamic(() => import("@/components/command-menu"))
const NavMobile = dynamic(() => import("@/components/nav-mobile"))

export function SiteBottomNav() {
  const docs = getAllDocs()
  const hasCerts = getDocsByCategory("certifications").length > 0

  // Minimize data serialized to client component - only send necessary fields
  const docPreviews: DocPreview[] = docs.map((doc) => ({
    slug: doc.slug,
    title: doc.metadata.title,
    category: doc.metadata.category,
  }))

  const mobileNavItems = hasCerts
    ? MOBILE_NAV
    : MOBILE_NAV.filter((item) => item.href !== "/certifications")

  return (
    <div
      className={cn(
        "fixed! bottom-[calc(--spacing(2)+env(safe-area-inset-bottom,0))] left-1/2 z-50 flex w-fit -translate-x-1/2 items-center rounded-xl bg-popover py-1 pr-1 pl-2.5 shadow-md ring ring-foreground/10 sm:hidden dark:ring-foreground/20",
        "*:data-[slot=command-menu-trigger]:min-w-20 *:data-[slot=command-menu-trigger]:gap-2 *:data-[slot=command-menu-trigger]:rounded-none *:data-[slot=command-menu-trigger]:border-none *:data-[slot=command-menu-trigger]:bg-transparent *:data-[slot=command-menu-trigger]:px-0 *:data-[slot=command-menu-trigger]:hover:bg-transparent *:data-[slot=command-menu-trigger]:active:scale-none"
      )}
    >
      <CommandMenu docs={docPreviews} />
      <Separator
        orientation="vertical"
        className="mr-1 ml-2.5 data-vertical:h-6 data-vertical:self-center"
      />
      <NavMobile items={mobileNavItems} />
    </div>
  )
}
