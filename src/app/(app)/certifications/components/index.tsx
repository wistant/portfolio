import Link from "next/link"
import { getDocsByCategory } from "@/data/doc/documents"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/panel"

import AllCertifications from "./all-certifications"

export function Certifications() {
  const allCerts = getDocsByCategory("certifications")

  if (allCerts.length === 0) {
    return null
  }

  return (
    <Panel id="certifications">
      <PanelHeader>
        <PanelTitle>
          Certifications 🏆
          <PanelTitleSup>[{allCerts.length}]</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="relative py-4">
        {/* Pattern line separators for grid */}
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-line"></div>
          <div className="border-l border-line"></div>
        </div>
        <AllCertifications />
      </div>

      <div className="screen-line-top flex justify-center py-2">
        <Button
          className="gap-2 border-none pr-2.5 pl-3"
          size="sm"
          nativeButton={false}
          render={<Link href="/certifications" />}
        >
          All Certifications
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </Panel>
  )
}
