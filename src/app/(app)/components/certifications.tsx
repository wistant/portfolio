import Image from "next/image"
import Link from "next/link"
import { getDocsByCategory } from "@/data/doc/documents"
import { format } from "date-fns"
import { ArrowRightIcon, AwardIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/base/ui/button"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel"

export function Certifications() {
  const allCerts = getDocsByCategory("certifications")

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

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allCerts.slice(0, 4).map((cert) => {
            const logoUrl = cert.metadata.logo
            const dateStr = cert.metadata.createdAt
              ? format(new Date(cert.metadata.createdAt), "MM.yyyy")
              : ""

            return (
              <li
                key={cert.slug}
                className={cn(
                  "max-sm:screen-line-top max-sm:screen-line-bottom",
                  "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom",
                  "flex flex-col gap-3 p-4 transition-all duration-200 hover:bg-accent-muted/40"
                )}
              >
                <div className="flex gap-4">
                  {/* Logo column */}
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-line/50 bg-background p-1 select-none">
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={`${cert.metadata.title} logo`}
                        width={40}
                        height={40}
                        className="size-9 object-contain"
                        unoptimized
                      />
                    ) : (
                      <AwardIcon className="size-5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Text details column */}
                  <div className="flex flex-col justify-center space-y-0.5">
                    <h3 className="text-sm leading-snug font-semibold hover:text-foreground">
                      <Link href={`/certifications/${cert.slug}`}>
                        {cert.metadata.title}
                      </Link>
                    </h3>
                    {dateStr && (
                      <span className="font-mono text-xs text-muted-foreground">
                        Issued: {dateStr}
                      </span>
                    )}
                  </div>
                </div>

                <p className="line-clamp-2 text-xs leading-normal text-muted-foreground">
                  {cert.metadata.description}
                </p>

                {/* Footer link */}
                <div className="mt-auto pt-1">
                  <Link
                    href={`/certifications/${cert.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:no-underline"
                  >
                    Read review
                    <span className="font-mono">→</span>
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
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
