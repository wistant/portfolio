import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getDocsByCategory } from "@/data/doc/documents"
import { format } from "date-fns"
import { ArrowLeftIcon, AwardIcon, ExternalLinkIcon } from "lucide-react"

import type { Doc } from "@/types/document"
import { X_HANDLE } from "@/config/site"
import { Button } from "@/components/ui/button"
import { BlocksSeparator } from "@/components/blocks-separator"

import CertificationsPageTitle from "./components/page-title"

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
      <CertificationsPageTitle />

      {groupKeys.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center select-none">
          <div className="relative mb-6 flex items-center justify-center">
            <div className="animate-pulse">
              <AwardIcon className="h-16 w-16 text-muted-foreground/40" />
            </div>
          </div>
          <div className="screen-line-top screen-line-bottom w-full max-w-md space-y-3 px-4 py-6">
            <h2 className="text-xl font-bold tracking-tight">Coming Soon 🏆</h2>
            <p className="mx-auto max-w-xs text-sm text-muted-foreground">
              Technical credentials, cloud badges, and professional
              certifications are currently being synchronized. Please check back
              soon!
            </p>
          </div>
          <div className="mt-8">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/">
                <ArrowLeftIcon className="size-4" />
                <span>Go to Home</span>
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {groupKeys.map((groupName, index) => (
            <div key={groupName} className="space-y-8">
              {index > 0 && <BlocksSeparator />}
              <div className="space-y-4">
                {/* Group Title and Line Separator */}
                <div className="flex items-center" aria-hidden="true">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground/80 uppercase">
                    {groupName}
                  </span>
                  <div className="ml-4 grow border-t border-dashed border-line/60" />
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
