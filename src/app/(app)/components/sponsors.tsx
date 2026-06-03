import Link from "next/link"
import { SPONSORS } from "@/data/sponsor-data"
import { addQueryParams } from "@/utils/url"
import { ArrowUpRightIcon, HeartIcon } from "lucide-react"

import { SPONSORSHIP_URL, UTM_PARAMS } from "@/config/site"
import { Button } from "@/components/base/ui/button"

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "./panel"

export function Sponsors() {
  const featuredSponsors = SPONSORS.slice(0, 6)

  return (
    <Panel id="sponsors">
      <PanelHeader>
        <PanelTitle>
          Sponsors 💖
          <PanelTitleSup>[{SPONSORS.length}]</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="space-y-6">
        <p className="font-mono text-sm text-muted-foreground">
          Grateful to the partners and individuals supporting this open-source
          work. You can sponsor my projects by choosing a tier (Platinum, Gold,
          Silver, or Spark Supporter) directly on GitHub.
        </p>

        {featuredSponsors.length > 0 && (
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="border-r border-line" />
              <div className="border-r border-line max-sm:hidden" />
              <div className="border-l border-line" />
            </div>

            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {featuredSponsors.map((item) => (
                <li
                  key={item.name}
                  className="flex h-16 items-center justify-center border-b border-line px-4 text-muted-foreground/60 transition-colors duration-200 hover:text-foreground [&_svg]:max-h-8 [&_svg]:w-full"
                >
                  <a
                    href={addQueryParams(item.url, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${item.name} logo`}
                    className="flex size-full items-center justify-center"
                  >
                    <item.logo aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          <Button
            className="w-full gap-2 border-none pr-2.5 pl-3 sm:w-auto"
            size="sm"
            nativeButton={false}
            render={<a href={SPONSORSHIP_URL} target="_blank" rel="noopener" />}
          >
            Become a Sponsor
            <HeartIcon className="size-3.5 fill-current text-rose-500" />
          </Button>

          <Button
            variant="secondary"
            className="w-full gap-2 border-none pr-2.5 pl-3 sm:w-auto"
            size="sm"
            nativeButton={false}
            render={<Link href="/sponsors" />}
          >
            All Sponsors
            <ArrowUpRightIcon className="size-3.5" />
          </Button>
        </div>
      </PanelContent>
    </Panel>
  )
}
