import dynamic from "next/dynamic"

import { SiteBottomNav } from "@/components/site-bottom-nav"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/app/(app)/components/site-footer"

const ScrollToTop = dynamic(() =>
  import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop)
)

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/layout">
      <SiteHeader />
      <main className="max-w-screen overflow-x-clip px-2">{children}</main>
      <SiteFooter />
      <SiteBottomNav />
      <ScrollToTop />
    </div>
  )
}
