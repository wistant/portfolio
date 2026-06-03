import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getDocsByCategory } from "@/data/doc/documents"
import { format } from "date-fns"
import { AwardIcon, ExternalLinkIcon } from "lucide-react"

import type { Doc } from "@/types/document"
import { X_HANDLE } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"

const title = "Certifications"
const description =
  "Professional badges, certifications, and technical credentials."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/certifications",
  },
  openGraph: {
    url: "/certifications",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [ogImage],
  },
}

export default function CertificationsPage() {
  const certs = getDocsByCategory("certifications")

  // Group certifications by group
  const groupedCerts: Record<string, Doc[]> = {}
  certs.forEach((cert) => {
    const groupName = cert.metadata.group || "Technical Credentials"
    if (!groupedCerts[groupName]) {
      groupedCerts[groupName] = []
    }
    groupedCerts[groupName].push(cert)
  })

  const groupKeys = Object.keys(groupedCerts)

  return (
    <div className="min-h-svh space-y-8">
      <PageHeading>
        <PageHeadingTagline>Certifications</PageHeadingTagline>
        <PageHeadingTitle>
          Professional badges, certifications, and technical credentials.
        </PageHeadingTitle>
      </PageHeading>

      {groupKeys.length === 0 ? (
        <div className="screen-line-top screen-line-bottom p-4">
          <p className="font-mono text-sm">No certifications found.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupKeys.map((groupName, index) => (
            <div key={groupName} className="space-y-8">
              {index > 0 && <Separator />}
              <div className="space-y-4">
                {/* Group Title and Line Separator */}
                <div className="flex items-center" aria-hidden="true">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground/80 uppercase">
                    {groupName}
                  </span>
                  <div className="ml-4 flex-grow border-t border-dashed border-line/60" />
                </div>

                {/* Grid of Certifications in this group */}
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {groupedCerts[groupName].map((cert) => {
                    const logoUrl = cert.metadata.logo
                    const dateStr = cert.metadata.createdAt
                      ? format(new Date(cert.metadata.createdAt), "MM.yyyy")
                      : ""

                    return (
                      <li
                        key={cert.slug}
                        className="group relative flex flex-col gap-4 rounded-xl border border-line/50 bg-zinc-50/30 p-4 transition-all duration-200 hover:border-line hover:bg-accent-muted dark:bg-zinc-900/10"
                      >
                        <div className="flex gap-4">
                          {/* Logo column */}
                          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-line/50 bg-background p-1 select-none">
                            {logoUrl ? (
                              <Image
                                src={logoUrl}
                                alt={`${cert.metadata.title} logo`}
                                width={48}
                                height={48}
                                className="size-11 object-contain"
                                unoptimized
                              />
                            ) : (
                              <AwardIcon className="size-6 text-muted-foreground" />
                            )}
                          </div>

                          {/* Text details column */}
                          <div className="flex flex-col justify-between space-y-1.5">
                            <div>
                              <h3 className="text-base leading-tight font-semibold group-hover:text-foreground">
                                <Link href={`/certifications/${cert.slug}`}>
                                  <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                  />
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
                        </div>

                        <p className="text-sm leading-normal text-muted-foreground">
                          {cert.metadata.description}
                        </p>

                        {/* Footer Actions */}
                        <div className="z-10 mt-auto flex items-center justify-between pt-2">
                          <Link
                            href={`/certifications/${cert.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:no-underline"
                          >
                            Read review
                            <span className="font-mono transition-transform duration-200 group-hover:translate-x-0.5">
                              →
                            </span>
                          </Link>

                          {cert.metadata.credentialUrl && (
                            <Button
                              variant="outline"
                              size="xs"
                              className="h-7 gap-1.5 text-xs"
                              asChild
                            >
                              <a
                                href={cert.metadata.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLinkIcon className="size-3" />
                                <span>Verify</span>
                              </a>
                            </Button>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-4" />
    </div>
  )
}

export function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-line",
        "before:absolute before:left-[-100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56",
        className
      )}
    >
      <div
        className="absolute -top-1.25 -left-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      />
      <div
        className="absolute -top-1.25 -right-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      />
    </div>
  )
}
